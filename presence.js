// "Who's studying now" -- a lightweight, fully anonymous presence indicator
// on guide pages, showing a count of other signed-in students currently on
// the SAME guide. Built on the same Firebase project as cloud-sync.js and
// group-study.js (see feedback_cloud_sync / feedback_group_study memories)
// but its own Firestore collection -- presence/{guideId}/viewers/{uid} --
// and, unlike group-study.js, NOT its own auth flow: this reuses whatever
// account cloud-sync.js already has signed in (Google only, per explicit
// product decision -- no anonymous fallback here), and simply does nothing
// at all if nobody is signed in. Automatic for every signed-in user with no
// separate opt-in toggle (contrast with shared-highlights' opt-in setting
// in theme.js's Settings panel) -- see feedback_presence memory for why
// presence and shared highlights ended up with different opt-in models.
//
// Loaded by theme.js's Firebase bootstrap chain, right after cloud-sync.js,
// on every page -- but does nothing at all unless .guide-back-bar is
// present (same guide-detection convention theme.js's own highlighting/
// search/read-aloud features already use), so it's a true no-op everywhere
// else with no wasted Firestore reads/writes.
(function () {
  "use strict";

  if (!document.querySelector(".guide-back-bar")) return;

  var HEARTBEAT_MS = 20000;
  var STALE_MS = 45000; // ~2x heartbeat, same staleness-detection tradeoff group-study.js documents

  function boot() {
    var auth = firebase.auth();
    var db = firebase.firestore();
    var guideId = encodeURIComponent(location.pathname);

    var pill = document.createElement("span");
    pill.id = "presence-pill";
    pill.className = "presence-pill";

    var backBar = document.querySelector(".guide-back-bar");
    if (backBar) backBar.appendChild(pill);

    var heartbeatTimer = null;
    var recheckTimer = null;
    var unsubscribe = null;
    var lastSnapshotDocs = []; // cached [{uid, lastSeenMs}], re-filtered by recheckTimer between snapshots

    function viewersRef() {
      return db.collection("presence").doc(guideId).collection("viewers");
    }

    function writePresence(uid) {
      viewersRef().doc(uid).set({ lastSeen: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true })
        .catch(function () {}); // best-effort -- a failed heartbeat just means this viewer ages out of others' counts a bit early, not worth surfacing to the user
    }

    function startHeartbeat(uid) {
      stopHeartbeat();
      writePresence(uid);
      heartbeatTimer = setInterval(function () { writePresence(uid); }, HEARTBEAT_MS);
    }
    function stopHeartbeat() {
      if (heartbeatTimer) { clearInterval(heartbeatTimer); heartbeatTimer = null; }
    }

    // Presence runs on every page with a .guide-back-bar -- study guides,
    // cram sheets, and the reference/flow supplements alike -- so the pill's
    // wording adapts to the resource type instead of always saying "guide".
    function resourcePhrase() {
      var p = location.pathname.toLowerCase();
      if (p.indexOf("cram-sheet") >= 0) return "on this cram sheet";
      if (p.indexOf("study-guide") >= 0) return "studying this guide";
      return "on this page";
    }

    function renderCount(uid) {
      var now = Date.now();
      var others = lastSnapshotDocs.filter(function (v) {
        return v.uid !== uid && v.lastSeenMs != null && (now - v.lastSeenMs) < STALE_MS;
      });
      if (others.length > 0) {
        pill.textContent = "👥 " + others.length + (others.length === 1 ? " other " : " others ") + resourcePhrase();
        pill.classList.add("visible");
      } else {
        pill.classList.remove("visible");
      }
    }

    function startListening(uid) {
      stopListening();
      unsubscribe = viewersRef().onSnapshot(function (snap) {
        lastSnapshotDocs = [];
        snap.forEach(function (doc) {
          var data = doc.data();
          var ts = data && data.lastSeen;
          // A just-written serverTimestamp() can briefly resolve locally as
          // null before the server ack arrives (Firestore's normal pending-
          // write behavior) -- treating that as "now" is only ever wrong for
          // OTHER people's docs reflecting back our own just-sent write
          // during the round-trip, and even then just means a half-second
          // of counting someone as fresher than they technically are yet.
          var ms = ts ? ts.toMillis() : Date.now();
          lastSnapshotDocs.push({ uid: doc.id, lastSeenMs: ms });
        });
        renderCount(uid);
      }, function () { /* permission-denied before Firestore rules are published, or offline -- silently stay hidden, same as cloud sync's own no-config no-op */ });

      // Snapshot events only fire when something in Firestore actually
      // changes -- a viewer who just closes their tab (or goes offline)
      // without triggering anyone else's write leaves a stale doc that
      // nothing will re-evaluate on its own. This independent timer re-runs
      // the same staleness filter against the last-received data, so the
      // count still correctly decays to zero within STALE_MS even with zero
      // new snapshot events.
      recheckTimer = setInterval(function () { renderCount(uid); }, 15000);
    }
    function stopListening() {
      if (unsubscribe) { unsubscribe(); unsubscribe = null; }
      if (recheckTimer) { clearInterval(recheckTimer); recheckTimer = null; }
    }

    auth.onAuthStateChanged(function (user) {
      if (user && !user.isAnonymous) {
        startHeartbeat(user.uid);
        startListening(user.uid);
      } else {
        stopHeartbeat();
        stopListening();
        pill.classList.remove("visible");
      }
    });

    document.addEventListener("visibilitychange", function () {
      var uid = auth.currentUser && !auth.currentUser.isAnonymous ? auth.currentUser.uid : null;
      if (!uid) return;
      if (document.visibilityState === "visible") writePresence(uid); // catch up immediately after backgrounding instead of waiting up to HEARTBEAT_MS
    });
  }

  if (window.__firebaseReady) boot();
  else window.addEventListener("firebaseReady", boot, { once: true });
})();
