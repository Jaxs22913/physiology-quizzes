// Cloud sync: optional Google sign-in + cross-device sync of everything the
// site keeps in localStorage (quiz progress, guide highlights/notes, site
// settings). Loaded dynamically by theme.js on every page, after the
// Firebase SDK + firebase-config.js. See feedback_cloud_sync memory for the
// full design (why localStorage is patched instead of rewriting every quiz
// file, the throttle/merge rules, the reload-on-hydrate tradeoff).
(function () {
  "use strict";

  if (!window.FIREBASE_CONFIG || window.FIREBASE_CONFIG.apiKey === "REPLACE_ME") {
    // Not configured yet -- site stays exactly as it was before this
    // feature existed. No error, no UI, nothing to see.
    return;
  }
  if (typeof firebase === "undefined") return; // SDK failed to load (offline/blocked)

  firebase.initializeApp(window.FIREBASE_CONFIG);
  var auth = firebase.auth();
  var db = firebase.firestore();
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(function () {});

  var META_KEY = "__cloudSyncMeta"; // { [localStorageKey]: lastWriteTimestampMs }
  var RELOAD_GUARD_KEY = "__cloudSyncReloaded"; // sessionStorage, prevents a reload loop
  var THROTTLE_MS = 5000;

  var realSetItem = Storage.prototype.setItem;
  var realGetItem = Storage.prototype.getItem;
  var realRemoveItem = Storage.prototype.removeItem;

  function getMeta() {
    try { return JSON.parse(realGetItem.call(localStorage, META_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function touchMeta(key, ts) {
    var m = getMeta();
    m[key] = ts;
    realSetItem.call(localStorage, META_KEY, JSON.stringify(m));
  }

  var currentUser = null;
  var pendingPush = {};   // key -> setTimeout id
  var lastPushed = {};    // key -> timestamp of last actual Firestore write

  function docRef(key) {
    return db.collection("users").doc(currentUser.uid).collection("kv").doc(encodeURIComponent(key));
  }

  function pushKey(key) {
    if (!currentUser) return;
    lastPushed[key] = Date.now();
    var val = realGetItem.call(localStorage, key);
    var ts = Date.now();
    touchMeta(key, ts);
    if (val === null) {
      docRef(key).delete().catch(function () {});
    } else {
      docRef(key).set({ value: val, updatedAt: ts }).catch(function () {});
    }
  }

  function schedulePush(key) {
    if (!currentUser || key === META_KEY) return;
    var now = Date.now();
    var last = lastPushed[key] || 0;
    if (now - last >= THROTTLE_MS) {
      pushKey(key);
    } else if (!pendingPush[key]) {
      pendingPush[key] = setTimeout(function () {
        delete pendingPush[key];
        pushKey(key);
      }, THROTTLE_MS - (now - last));
    }
  }

  function flushAllPending() {
    Object.keys(pendingPush).forEach(function (key) {
      clearTimeout(pendingPush[key]);
      delete pendingPush[key];
      pushKey(key);
    });
  }
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") flushAllPending();
  });
  window.addEventListener("beforeunload", flushAllPending);

  // Patched on Storage.prototype (shared by localStorage AND sessionStorage)
  // -- gate every override on `this === localStorage` so sessionStorage
  // (tour-seen-this-session flags, the reload guard above, etc.) is never
  // touched or synced.
  Storage.prototype.setItem = function (key, value) {
    realSetItem.call(this, key, value);
    if (this === localStorage && key !== META_KEY) {
      touchMeta(key, Date.now());
      schedulePush(key);
    }
  };
  Storage.prototype.removeItem = function (key) {
    realRemoveItem.call(this, key);
    if (this === localStorage && key !== META_KEY) {
      touchMeta(key, Date.now());
      schedulePush(key);
    }
  };

  function pushAllLocal() {
    var keys = [];
    for (var i = 0; i < localStorage.length; i++) keys.push(localStorage.key(i));
    keys.forEach(function (key) {
      if (key !== META_KEY) schedulePush(key);
    });
  }

  // Pulls every synced key from Firestore; for each one, keeps whichever
  // side (local vs. cloud) has the newer recorded timestamp. This is what
  // makes switching devices safe in both directions: a brand-new device has
  // no local timestamps at all, so cloud always wins; a device that was
  // just used offline has fresher local timestamps, so local wins and gets
  // pushed back up afterward by pushAllLocal(). Returns whether anything
  // actually changed on this device, so the caller can decide whether a
  // reload is warranted.
  function hydrateFromCloud(uid) {
    return db.collection("users").doc(uid).collection("kv").get().then(function (snap) {
      var meta = getMeta();
      var changed = false;
      snap.forEach(function (doc) {
        var key = decodeURIComponent(doc.id);
        var data = doc.data();
        var cloudTs = data.updatedAt || 0;
        var localTs = meta[key] || 0;
        if (cloudTs > localTs) {
          var localVal = realGetItem.call(localStorage, key);
          if (localVal !== data.value) {
            realSetItem.call(localStorage, key, data.value);
            changed = true;
          }
          meta[key] = cloudTs;
        }
      });
      realSetItem.call(localStorage, META_KEY, JSON.stringify(meta));
      return changed;
    });
  }

  window.cloudSignIn = function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider).catch(function (err) {
      console.warn("Sign-in failed:", err && err.message);
    });
  };
  window.cloudSignOut = function () {
    return auth.signOut();
  };

  auth.onAuthStateChanged(function (user) {
    currentUser = user;
    renderAccountUI(user);
    if (user) {
      hydrateFromCloud(user.uid).then(function (changed) {
        pushAllLocal();
        if (changed && !sessionStorage.getItem(RELOAD_GUARD_KEY)) {
          sessionStorage.setItem(RELOAD_GUARD_KEY, "1");
          location.reload();
        }
      }).catch(function (err) {
        console.warn("Cloud sync hydrate failed:", err && err.message);
      });
    }
  });

  // ---------------- UI ----------------
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  var ACCOUNT_ICON = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
  var GOOGLE_G = '<svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59A14.5 14.5 0 0 1 9.5 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.94 23.94 0 0 0 0 24c0 3.86.92 7.51 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.97 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';

  function initAccountButton() {
    if (document.getElementById("account-btn")) return;
    var group = document.getElementById("corner-actions");
    if (!group) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.id = "account-btn";
    btn.className = "corner-btn";
    btn.setAttribute("aria-label", "Account / sign in");
    btn.title = "Account / sign in";
    btn.innerHTML = ACCOUNT_ICON;
    btn.addEventListener("click", openAccountPanel);
    group.appendChild(btn);
  }

  var accountBtnEl = null;
  var accountOverlay = null;

  function renderAccountUI(user) {
    if (!accountBtnEl) {
      initAccountButton();
      accountBtnEl = document.getElementById("account-btn");
    }
    if (accountBtnEl) accountBtnEl.classList.toggle("signed-in", !!user);
    if (accountOverlay) buildAccountPanelBody(user);
  }

  function buildAccountPanelBody(user) {
    var body = accountOverlay.querySelector(".account-body");
    body.innerHTML = "";
    if (user) {
      if (user.photoURL) {
        var img = el("img", "account-avatar");
        img.src = user.photoURL;
        img.alt = "";
        body.appendChild(img);
      }
      var name = el("p", "account-name");
      name.textContent = user.displayName || "Signed in";
      body.appendChild(name);
      var email = el("p", "account-email");
      email.textContent = user.email || "";
      body.appendChild(email);
      var note = el("p", "tour-prompt-text", "Your progress, highlights, and settings sync automatically across any device you sign into with this account.");
      note.style.textAlign = "center";
      body.appendChild(note);
      var signOutBtn = el("button", "tour-btn", "Sign out");
      signOutBtn.type = "button";
      signOutBtn.style.width = "100%";
      signOutBtn.addEventListener("click", function () { window.cloudSignOut(); });
      body.appendChild(signOutBtn);
    } else {
      var intro = el("p", "tour-prompt-text", "Sign in to save your quiz progress, highlights, and settings, and pick up right where you left off on any device.");
      intro.style.textAlign = "center";
      body.appendChild(intro);
      var signInBtn = el("button", "cloudauth-google-btn", GOOGLE_G + "<span>Sign in with Google</span>");
      signInBtn.type = "button";
      signInBtn.addEventListener("click", function () { window.cloudSignIn(); });
      body.appendChild(signInBtn);
    }
  }

  function openAccountPanel() {
    if (!accountOverlay) {
      accountOverlay = el("div", "settings-overlay");
      var panel = el("div", "settings-panel");
      var closeBtn = el("button", "shortcuts-close", "&times;");
      closeBtn.type = "button";
      closeBtn.setAttribute("aria-label", "Close");
      var heading = el("h3", null, "Account");
      var body = el("div", "account-body");
      panel.appendChild(closeBtn);
      panel.appendChild(heading);
      panel.appendChild(body);
      accountOverlay.appendChild(panel);
      document.body.appendChild(accountOverlay);
      closeBtn.addEventListener("click", function () { accountOverlay.classList.remove("open"); });
      accountOverlay.addEventListener("click", function (e) { if (e.target === accountOverlay) accountOverlay.classList.remove("open"); });
      buildAccountPanelBody(currentUser);
    }
    accountOverlay.classList.add("open");
  }

  // One-time, dismissible, shown to everyone regardless of sign-in state
  // (per explicit user request) -- reuses the .tour-overlay/.tour-prompt
  // shell for visual consistency with the site's other one-time prompts.
  var PROMPT_SEEN_KEY = "cloudSyncPromptSeen";
  function maybeShowSignInPrompt() {
    if (localStorage.getItem(PROMPT_SEEN_KEY)) return;
    if (currentUser) { localStorage.setItem(PROMPT_SEEN_KEY, "1"); return; }
    setTimeout(function () {
      if (currentUser) return; // signed in via some other path while we waited
      var overlay = el("div", "tour-overlay open");
      var card = el("div", "tour-prompt");
      card.appendChild(el("p", "tour-prompt-title", "Save your progress across devices"));
      card.appendChild(el("p", "tour-prompt-text", "Sign in with Google to keep your quiz progress, highlights, and settings synced everywhere you use this site. Totally optional — everything already works fine without it."));
      var actions = el("div", "tour-prompt-actions");
      var laterBtn = el("button", "tour-btn", "Maybe later");
      laterBtn.type = "button";
      var goBtn = el("button", "tour-btn primary", GOOGLE_G + " Sign in with Google");
      goBtn.type = "button";
      goBtn.style.display = "inline-flex";
      goBtn.style.alignItems = "center";
      goBtn.style.gap = "8px";
      actions.appendChild(laterBtn);
      actions.appendChild(goBtn);
      card.appendChild(actions);
      overlay.appendChild(card);
      document.body.appendChild(overlay);

      laterBtn.addEventListener("click", function () {
        localStorage.setItem(PROMPT_SEEN_KEY, "1");
        overlay.remove();
      });
      goBtn.addEventListener("click", function () {
        localStorage.setItem(PROMPT_SEEN_KEY, "1");
        overlay.remove();
        window.cloudSignIn();
      });
    }, 1200); // let the page-load tour prompt (if any) claim the screen first
  }

  function boot() {
    initAccountButton();
    accountBtnEl = document.getElementById("account-btn");
    maybeShowSignInPrompt();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
