// Group Study: Kahoot-style live multiplayer quiz sessions, built on top of
// the same Firebase project as cloud-sync.js (see feedback_cloud_sync
// memory) but a completely separate Firestore data model -- gameRooms/*,
// not users/*/kv/*. Loaded by group-host.html and group-join.html only
// (NOT injected site-wide by theme.js, unlike cloud-sync.js -- this is an
// opt-in destination, not an ambient background feature).
//
// Design (see feedback_group_study memory for the full writeup):
// - No Google account needed to host or join -- both sides sign in
//   anonymously (firebase.auth().signInAnonymously()), silent, no popup.
//   This exists purely so Firestore security rules have a stable uid to
//   check ("only the host can advance state," "a player can only write
//   their own score"), not for identity/profile purposes.
// - Host-controlled pacing: lobby -> question -> reveal -> (loop) ->
//   finished. The host is the only writer for the room document itself;
//   each player can only write their own doc in the players subcollection.
// - Scoring is entirely client-side (each player computes and writes their
//   own score) -- deliberately NOT server-validated via a Cloud Function,
//   since Cloud Functions require Firebase's paid Blaze plan even at zero
//   usage, and staying on the free Spark plan was an explicit requirement.
//   This means a technically-inclined player COULD read the correct answer
//   out of GROUP_QUIZZES client-side before answering -- acceptable for a
//   casual study tool among classmates, not a hardened trivia platform.
(function () {
  "use strict";

  window.GroupStudy = {};

  // group-host.html/group-join.html load theme.js for the standard site
  // chrome (corner buttons, dark mode, etc.), and theme.js's own bootstrap
  // is what actually loads the Firebase SDK + firebase-config.js +
  // cloud-sync.js (see that file) -- this file does NOT load the SDK a
  // second time itself (re-running firebase-app-compat.js would reset the
  // global `firebase.apps` registry and break the app cloud-sync.js already
  // initialized). Instead it waits for cloud-sync.js's "firebaseReady"
  // signal before touching `firebase` at all -- a flag for the case this
  // script's own load finishes after that signal already fired, plus the
  // event for the more common case of still-waiting.
  function boot() {
    var auth = firebase.auth();
    var db = firebase.firestore();

    var ROOM_CODE_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // no 0/O/1/I/L, avoids ambiguity
    var SPEED_BONUS_MIN = 500, SPEED_BONUS_MAX = 1000;

  var readyResolvers = [];
  var authReady = false;
  var currentUid = null;
  var anonAttempted = false;

  // cloud-sync.js shares this same Auth instance (LOCAL persistence) for a
  // signed-in Google user. signInAnonymously() always REPLACES whoever is
  // currently signed in -- it doesn't check first -- so calling it
  // unconditionally here used to silently clobber a real Google session
  // with a throwaway anonymous one the moment someone opened this page,
  // breaking cloud sync (writes went to the anonymous UID's own Firestore
  // doc) and leaving the account panel showing a bare "Signed in" with no
  // name/email/photo. A stable uid is all Group Study actually needs (see
  // the file-level comment above), and a real Google uid satisfies that
  // just as well -- so only fall back to anonymous once we've confirmed,
  // via the first onAuthStateChanged callback, that nobody is signed in.
  auth.onAuthStateChanged(function (user) {
    if (user) {
      currentUid = user.uid;
      authReady = true;
      readyResolvers.forEach(function (fn) { fn(user.uid); });
      readyResolvers = [];
    } else if (!anonAttempted) {
      anonAttempted = true;
      auth.signInAnonymously().catch(function (err) {
        console.warn("Group Study: anonymous sign-in failed", err);
        var msg = "Group Study couldn't connect (" + ((err && err.code) || "unknown error") + ").";
        if (err && err.code === "auth/admin-restricted-operation") {
          msg = "Group Study isn't set up yet -- Anonymous sign-in needs to be enabled in the Firebase Console (Authentication -> Sign-in method -> Anonymous).";
        }
        if (window.showToast) window.showToast(msg, 9000);
        else alert(msg);
      });
    }
  });

  function whenReady() {
    return new Promise(function (resolve) {
      if (authReady) resolve(currentUid);
      else readyResolvers.push(resolve);
    });
  }

  function randomCode() {
    var s = "";
    for (var i = 0; i < 5; i++) s += ROOM_CODE_CHARS[Math.floor(Math.random() * ROOM_CODE_CHARS.length)];
    return s;
  }

  function roomRef(code) { return db.collection("gameRooms").doc(code); }
  function playersRef(code) { return roomRef(code).collection("players"); }

  function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  // ---- Host actions ----
  window.GroupStudy.createRoom = function (quizId, opts) {
    opts = opts || {};
    var timedMode = !!opts.timedMode;
    var secondsPerQuestion = opts.secondsPerQuestion || 20;
    // Question order is decided once, at creation, not re-rolled per
    // question -- every player and the host all index into the SAME quiz
    // array via this one shared list, so nobody's "Question 3" ever
    // disagrees with anyone else's. `null` (unshuffled) keeps original
    // array order, matching every room created before this option existed.
    var quiz = (window.GROUP_QUIZZES || {})[quizId];
    var questionCount = quiz ? quiz.questions.length : 0;
    var questionOrder = opts.shuffleQuestions
      ? shuffleArray(Array.from({ length: questionCount }, function (_, i) { return i; }))
      : null;
    return whenReady().then(function (uid) {
      function attempt(triesLeft) {
        var code = randomCode();
        return roomRef(code).get().then(function (snap) {
          if (snap.exists) {
            if (triesLeft <= 0) throw new Error("Could not generate a free room code, try again.");
            return attempt(triesLeft - 1);
          }
          return roomRef(code).set({
            hostUid: uid,
            quizId: quizId,
            status: "lobby",
            currentQuestionIndex: -1,
            currentQuestionStartedAt: null,
            timedMode: timedMode,
            secondsPerQuestion: secondsPerQuestion,
            questionOrder: questionOrder,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          }).then(function () { return code; });
        });
      }
      return attempt(5);
    });
  };

  // Maps a room's 0-based question POSITION (currentQuestionIndex, which
  // both host and players key their per-question state off of regardless
  // of shuffling) to the actual index into currentQuiz.questions. Shared
  // here so group-host.html and group-join.html can't drift on the mapping.
  window.GroupStudy.resolveQuestionIndex = function (room, position) {
    return (room && room.questionOrder) ? room.questionOrder[position] : position;
  };

  window.GroupStudy.startGame = function (code) {
    return roomRef(code).update({
      status: "question",
      currentQuestionIndex: 0,
      currentQuestionStartedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  };

  window.GroupStudy.revealQuestion = function (code) {
    return roomRef(code).update({ status: "reveal" });
  };

  window.GroupStudy.nextQuestion = function (code, nextIndex) {
    return roomRef(code).update({
      status: "question",
      currentQuestionIndex: nextIndex,
      currentQuestionStartedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  };

  window.GroupStudy.finishGame = function (code) {
    return roomRef(code).update({ status: "finished" });
  };

  // Host-initiated early shutdown, distinct from finishGame -- "finished"
  // still shows players the podium/leaderboard for a game that ran its
  // course, while "closed" is the host bailing out mid-session (or after
  // the game ended) and every listener (host's own extra join-as-player
  // tab included -- see group-host.html's hostplayhint) needs to bounce
  // back to a neutral screen rather than sit on stale game state.
  window.GroupStudy.closeRoom = function (code) {
    return roomRef(code).update({ status: "closed" });
  };

  var DEFAULT_AVATAR = "🦊";

  // ---- Player actions ----
  window.GroupStudy.joinRoom = function (code, nickname, avatar) {
    nickname = (nickname || "").trim().slice(0, 24) || "Anonymous";
    avatar = avatar || DEFAULT_AVATAR;
    return whenReady().then(function (uid) {
      return roomRef(code).get().then(function (snap) {
        if (!snap.exists) throw new Error("No room with that code.");
        return playersRef(code).doc(uid).set({
          nickname: nickname,
          avatar: avatar,
          score: 0,
          answers: {},
          joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
          lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true }).then(function () { return { uid: uid, room: snap.data() }; });
      });
    });
  };

  // Firestore (unlike Realtime Database) has no built-in disconnect/presence
  // detection, so "did this player leave" is inferred client-side from a
  // periodic heartbeat rather than a server-pushed event. Deliberately NOT
  // paired with a beforeunload/pagehide "mark left" write -- those fire on
  // an ordinary page reload too (indistinguishable from actually leaving),
  // which would falsely flag every reload-to-resume as a departure. A
  // heartbeat-staleness check trades instant detection for correctness: no
  // false positives, at the cost of a ~25-30s detection delay -- acceptable
  // for a casual live study session. See feedback_group_study memory.
  window.GroupStudy.heartbeat = function (code) {
    return whenReady().then(function (uid) {
      return playersRef(code).doc(uid).update({
        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
      }).catch(function () {});
    });
  };

  // points: speed-bonus curve when timed (1000 for an instant correct
  // answer, decaying to 500 at the full time limit), flat 1000 when untimed
  // -- same rough shape as Kahoot's own scoring, not an exact reproduction.
  function computePoints(correct, timedMode, elapsedMs, secondsPerQuestion) {
    if (!correct) return 0;
    if (!timedMode) return SPEED_BONUS_MAX;
    var frac = Math.max(0, Math.min(1, elapsedMs / (secondsPerQuestion * 1000)));
    return Math.round(SPEED_BONUS_MAX - (SPEED_BONUS_MAX - SPEED_BONUS_MIN) * frac);
  }

  window.GroupStudy.submitAnswer = function (code, questionIndex, choiceIndex, correctIndex, timedMode, elapsedMs, secondsPerQuestion) {
    return whenReady().then(function (uid) {
      var correct = choiceIndex === correctIndex;
      var points = computePoints(correct, timedMode, elapsedMs, secondsPerQuestion);
      var pRef = playersRef(code).doc(uid);
      return db.runTransaction(function (tx) {
        return tx.get(pRef).then(function (doc) {
          var data = doc.data() || { score: 0, answers: {} };
          var answers = data.answers || {};
          if (answers[questionIndex] != null) return; // already answered this question
          answers[questionIndex] = { choice: choiceIndex, correct: correct, points: points };
          tx.update(pRef, { answers: answers, score: (data.score || 0) + points });
        });
      });
    });
  };

  // ---- One-shot getters (used to validate a resume-after-reload attempt
  // before committing to it -- see group-host.html/group-join.html's
  // sessionStorage-based session recovery) ----
  window.GroupStudy.getRoom = function (code) {
    return whenReady().then(function () {
      return roomRef(code).get().then(function (snap) { return snap.exists ? snap.data() : null; });
    });
  };
  window.GroupStudy.getPlayer = function (code, uid) {
    return whenReady().then(function () {
      return playersRef(code).doc(uid).get().then(function (snap) { return snap.exists ? snap.data() : null; });
    });
  };

  // ---- Real-time listeners (both host and players use these) ----
  window.GroupStudy.listenRoom = function (code, cb) {
    return roomRef(code).onSnapshot(function (snap) { if (snap.exists) cb(snap.data()); });
  };
  window.GroupStudy.listenPlayers = function (code, cb) {
    return playersRef(code).orderBy("score", "desc").onSnapshot(function (snap) {
      var players = [];
      snap.forEach(function (doc) { players.push(Object.assign({ uid: doc.id }, doc.data())); });
      cb(players);
    });
  };

    window.GroupStudy.currentUid = function () { return currentUid; };
    window.GroupStudy.whenReady = whenReady;
  }

  if (window.__firebaseReady) boot();
  else window.addEventListener("firebaseReady", boot, { once: true });
})();
