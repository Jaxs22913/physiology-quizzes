(function () {
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function validate(steps) {
    return steps.filter(function (s) { return !s.selector || document.querySelector(s.selector); });
  }

  // Neither the "want a tour?" prompt nor the running spotlight/tooltip
  // blocks clicks to the rest of the page, so two tours can otherwise be
  // triggered back to back (e.g. the page-load quiz tour is still up when
  // Exam Mode's own tour fires moments later) and stack visually on top of
  // each other. One flag, shared across every start()/run() call site,
  // keeps only one tour on screen at a time -- a second call while one is
  // already showing is just a no-op rather than a second overlay.
  var active = false;

  function start(steps, storageKey) {
    if (active || localStorage.getItem(storageKey)) return;
    var validSteps = validate(steps);
    if (!validSteps.length) return;
    active = true;
    showPrompt(validSteps, storageKey);
  }

  function run(steps, storageKey) {
    if (active) return;
    var validSteps = validate(steps);
    if (!validSteps.length) return;
    active = true;
    runSteps(validSteps, storageKey);
  }

  function showPrompt(steps, storageKey) {
    var overlay = el("div", "tour-overlay open");
    var card = el("div", "tour-prompt");
    card.appendChild(el("p", "tour-prompt-title", "Want a quick tour?"));
    card.appendChild(el("p", "tour-prompt-text", "Takes about 30 seconds — shows you where the useful stuff lives."));
    var actions = el("div", "tour-prompt-actions");
    var skipBtn = el("button", "tour-btn", "Skip");
    skipBtn.type = "button";
    var goBtn = el("button", "tour-btn primary", "Take the tour");
    goBtn.type = "button";
    actions.appendChild(skipBtn);
    actions.appendChild(goBtn);
    card.appendChild(actions);
    overlay.appendChild(card);
    document.body.appendChild(overlay);

    skipBtn.addEventListener("click", function () {
      localStorage.setItem(storageKey, "1");
      overlay.remove();
      active = false;
    });
    goBtn.addEventListener("click", function () {
      overlay.remove();
      runSteps(steps, storageKey);
    });
  }

  function runSteps(steps, storageKey) {
    var i = 0;
    var spotlight = el("div", "tour-spotlight");
    var tooltip = el("div", "tour-tooltip");
    document.body.appendChild(spotlight);
    document.body.appendChild(tooltip);

    function finish() {
      localStorage.setItem(storageKey, "1");
      spotlight.remove();
      tooltip.remove();
      window.removeEventListener("resize", place);
      active = false;
    }

    function place() {
      var step = steps[i];
      var target = step.selector ? document.querySelector(step.selector) : null;
      if (target) {
        target.scrollIntoView({ block: "center" });
        var r = target.getBoundingClientRect();
        var pad = 8;
        spotlight.style.display = "block";
        spotlight.style.top = (r.top - pad) + "px";
        spotlight.style.left = (r.left - pad) + "px";
        spotlight.style.width = (r.width + pad * 2) + "px";
        spotlight.style.height = (r.height + pad * 2) + "px";

        var tipTop = r.bottom + 16;
        if (tipTop + 170 > window.innerHeight) tipTop = Math.max(16, r.top - 170);
        tooltip.style.top = tipTop + "px";
        tooltip.style.left = Math.min(Math.max(16, r.left), window.innerWidth - 316) + "px";
      } else {
        spotlight.style.display = "none";
        tooltip.style.top = "50%";
        tooltip.style.left = "50%";
      }

      tooltip.innerHTML =
        '<p class="tour-tooltip-step">Step ' + (i + 1) + ' of ' + steps.length + '</p>' +
        '<p class="tour-tooltip-title">' + step.title + '</p>' +
        '<p class="tour-tooltip-text">' + step.text + '</p>' +
        '<div class="tour-tooltip-actions">' +
          '<button type="button" class="tour-btn" id="tour-skip">Skip tour</button>' +
          '<span style="flex:1"></span>' +
          (i > 0 ? '<button type="button" class="tour-btn" id="tour-back">Back</button>' : '') +
          '<button type="button" class="tour-btn primary" id="tour-next">' + (i === steps.length - 1 ? "Done" : "Next") + '</button>' +
        '</div>';

      document.getElementById("tour-skip").addEventListener("click", finish);
      var backBtn = document.getElementById("tour-back");
      if (backBtn) backBtn.addEventListener("click", function () { i--; place(); });
      document.getElementById("tour-next").addEventListener("click", function () {
        if (i === steps.length - 1) { finish(); return; }
        i++; place();
      });
    }

    window.addEventListener("resize", place);
    place();
  }

  window.SiteTour = { start: start, run: run };
})();

(function () {
  var SUN = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
  var MOON = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  var REFRESH = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>';
  var KEYBOARD = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 13h.01M18 13h.01M8 13h8"/></svg>';
  var GEAR = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
  var ARROW_LEFT = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>';
  var CALC = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="11" x2="8" y2="11.01"/><line x1="12" y1="11" x2="12" y2="11.01"/><line x1="16" y1="11" x2="16" y2="11.01"/><line x1="8" y1="15" x2="8" y2="15.01"/><line x1="12" y1="15" x2="12" y2="15.01"/><line x1="16" y1="15" x2="16" y2="15.01"/><line x1="8" y1="19" x2="8" y2="19.01"/><line x1="12" y1="19" x2="12" y2="19.01"/><line x1="16" y1="19" x2="16" y2="19.01"/></svg>';
  var TIMER = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2"/><path d="M9 2h6"/></svg>';

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") || "light";
  }
  function paintIcon(btn, theme) {
    btn.innerHTML = theme === "dark" ? SUN : MOON;
  }
  function setTheme(theme, btn) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("siteTheme", theme);
    if (btn) paintIcon(btn, theme);
  }
  function setTextSize(large) {
    document.documentElement.setAttribute("data-text-size", large ? "large" : "normal");
    localStorage.setItem("textSize", large ? "large" : "normal");
  }
  function setContrast(high) {
    document.documentElement.setAttribute("data-contrast", high ? "high" : "normal");
    localStorage.setItem("contrast", high ? "high" : "normal");
  }
  function initHaptics() {
    if (!("vibrate" in navigator)) return;
    document.addEventListener("click", function (e) {
      if (localStorage.getItem("haptics") !== "1") return;
      var el = e.target.closest && e.target.closest(".opt, .choice");
      if (el) navigator.vibrate(15);
    });
  }

  // Sound effects (added 2026-07-10), same zero-per-quiz-file delegated-click
  // pattern as initHaptics above -- default off, toggled in the settings
  // panel. Synthesized with the Web Audio API (short oscillator tones)
  // rather than shipping audio files, so there's nothing to fetch and it
  // works offline. AudioContext is created lazily on first actual play
  // (always from inside a real click handler) so it starts in a valid,
  // already-user-gestured state instead of "suspended" by autoplay policy.
  //
  // The tone engine itself (getCtx/tone/SOUNDS/playSound) is hoisted to this
  // outer scope and exposed as window.playSiteSound so pages outside the
  // shared quiz engine -- currently group-host.html/group-join.html, which
  // don't have the #shuffle-toggle this file uses to detect "is this a quiz
  // page" and so never call initSoundEffects() below -- can still play the
  // same sounds through the same "soundEffects" localStorage toggle, instead
  // of duplicating this whole engine.
  var audioCtx = null;
  function getCtx() {
    if (!audioCtx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      audioCtx = new AC();
    }
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }
  function tone(ctx, freq, startTime, duration, type, peakGain) {
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = type || "sine";
    osc.frequency.value = freq;
    var t0 = ctx.currentTime + startTime;
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(peakGain || 0.12, t0 + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.02);
  }
  var SOUNDS = {
    select: function (ctx) { tone(ctx, 700, 0, 0.05, "sine", 0.07); },
    correct: function (ctx) {
      tone(ctx, 880, 0, 0.09, "sine", 0.12);
      tone(ctx, 1318.5, 0.08, 0.14, "sine", 0.12);
    },
    wrong: function (ctx) { tone(ctx, 170, 0, 0.18, "sine", 0.12); },
    complete: function (ctx) {
      [523.25, 659.25, 783.99, 1046.5].forEach(function (freq, i) {
        tone(ctx, freq, i * 0.11, i === 3 ? 0.24 : 0.12, "sine", 0.12);
      });
    },
    join: function (ctx) { tone(ctx, 990, 0, 0.06, "sine", 0.08); },
    tick: function (ctx) { tone(ctx, 520, 0, 0.035, "square", 0.04); },
    reveal: function (ctx) {
      tone(ctx, 440, 0, 0.07, "triangle", 0.09);
      tone(ctx, 660, 0.06, 0.12, "triangle", 0.1);
    },
    podium: function (ctx) {
      [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach(function (freq, i) {
        tone(ctx, freq, i * 0.1, i === 4 ? 0.35 : 0.12, "sine", 0.13);
      });
    }
  };
  function playSound(name) {
    if (localStorage.getItem("soundEffects") !== "1") return;
    try {
      var ctx = getCtx();
      if (ctx && SOUNDS[name]) SOUNDS[name](ctx);
    } catch (e) {}
  }
  window.playSiteSound = playSound;

  // Quiz-completion celebration (added 2026-07-17). Confetti piece/keyframe
  // CSS lives in theme.css (ported from arcade.css's existing win-screen
  // confetti, since quiz pages don't load arcade.css). Every quiz template
  // family (see the results-scoring research from this session) renders its
  // percentage as literal "NN%" text somewhere inside #results -- Pattern A's
  // #finalPct, Pattern B's .ring <b>, Pattern C's #pct, Pattern D's .scoresub
  // -- so scraping #results.textContent with a plain regex works across all
  // of them without needing per-template special-casing or touching any of
  // the ~440 individual quiz files.
  function burstConfetti(count) {
    var colors = ["#2563eb", "#16a34a", "#9333ea", "#f59e0b", "#dc2626"];
    for (var i = 0; i < count; i++) {
      (function () {
        var piece = document.createElement("div");
        piece.className = "confetti-piece";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.background = colors[i % colors.length];
        piece.style.animationDuration = (1.6 + Math.random() * 1.2) + "s";
        piece.style.animationDelay = (Math.random() * 0.3) + "s";
        document.body.appendChild(piece);
        setTimeout(function () { piece.remove(); }, 3200);
      })();
    }
  }
  function celebrateScore(results) {
    var match = results.textContent.match(/(\d{1,3})\s*%/);
    var pct = match ? parseInt(match[1], 10) : NaN;
    if (pct === 100) {
      playSound("podium");
      burstConfetti(70);
    } else if (pct >= 75) {
      playSound("complete");
      burstConfetti(30);
    } else {
      playSound("complete");
    }
  }

  function initSoundEffects() {
    document.addEventListener("click", function (e) {
      var opt = e.target.closest && e.target.closest(".opt, .choice");
      if (!opt) return;
      if (opt.classList.contains("correct")) playSound("correct");
      else if (opt.classList.contains("wrong")) playSound("wrong");
      else playSound("select");
    });

    // #results becoming visible is the one truly universal "quiz finished"
    // signal across every family (see feedback_quiz_progress_tracking) --
    // watched generically via MutationObserver instead of a per-file hook,
    // checking computed style so it catches both class-based and inline-
    // style-based hidden/shown toggling.
    var announcedResults = new WeakSet();
    var resultsObserver = new MutationObserver(function () {
      var results = document.getElementById("results");
      if (!results || announcedResults.has(results)) return;
      if (getComputedStyle(results).display !== "none") {
        announcedResults.add(results);
        celebrateScore(results);
      }
    });
    resultsObserver.observe(document.body, { attributes: true, attributeFilter: ["class", "style"], subtree: true });
  }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function makeCornerBtn(id, label) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.id = id;
    btn.className = "corner-btn";
    btn.setAttribute("aria-label", label);
    btn.title = label;
    return btn;
  }

  var SHORTCUT_ROWS = [
    ["Select an answer", "1", "2", "3", "4"],
    ["Next question", "Enter", "→"],
    ["Previous question", "←"],
    ["Controller: select answer", "A", "B", "X", "Y"],
    ["Controller: next / back", "RB", "LB"],
    ["Show this help", "?"],
    ["Close this help", "Esc"]
  ];

  var QUIZ_TOUR_STEPS = [
    {
      selector: "#shuffle-toggle",
      title: "Shuffle question order",
      text: "Turn this on before you start to answer questions in a random order each attempt — handy once you've mostly memorized the fixed order."
    },
    {
      selector: "#shortcuts-btn",
      title: "Keyboard shortcuts",
      text: "Click here — or press ? anytime — to see the shortcuts for picking, advancing and going back. Once you start, a live timer shows up next to it too, and it pauses automatically whenever you close the page."
    }
  ];

  // Shown once, the first time a quiz page actually enters Exam Mode (not
  // at page load like QUIZ_TOUR_STEPS above -- #flagbtn/#navbtn are hidden
  // until then, and a tour step pointing at a hidden element looks broken).
  // Each quiz's own applyExamModeUI() calls window.startExamModeTour()
  // when examMode is true; this is the one shared place the step content
  // and its own "seen" flag live, instead of duplicating both per file.
  var EXAM_MODE_TOUR_STEPS = [
    {
      selector: "#flagbtn",
      title: "Flag questions",
      text: "Mark any question to come back to later — flagged questions are highlighted in the question grid."
    },
    {
      selector: "#navbtn",
      title: "Jump between questions",
      text: "See every question at a glance, jump to any of them in any order, and submit your exam from here once you're done."
    }
  ];
  window.startExamModeTour = function () {
    if (window.SiteTour) window.SiteTour.start(EXAM_MODE_TOUR_STEPS, "tourSeen:exammode");
  };

  // Guide/study-aid pages call this from a sticky .guide-back-bar link (see
  // theme.css) instead of the generic scroll-gated #corner-actions-left
  // button, since guides specifically need to hop back to guides.html to
  // pick a different guide without the button being hidden until scrolled.
  // Real "previous page" when there is one (matches how someone actually
  // got here, e.g. from guides.html); falls back to a guaranteed link to
  // guides.html when there's no same-origin referrer to go back to (opened
  // directly / no browsing history) so the button is never a dead end.
  window.guideGoBack = function () {
    if (document.referrer && document.referrer.indexOf(location.origin) === 0) {
      history.back();
    } else {
      location.href = "../guides.html";
    }
  };

  function initShortcutsHelp() {
    if (!document.getElementById("timerpill")) return null;

    var overlay = document.createElement("div");
    overlay.className = "shortcuts-overlay";
    overlay.id = "shortcuts-overlay";

    var panel = document.createElement("div");
    panel.className = "shortcuts-panel";

    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "shortcuts-close";
    closeBtn.setAttribute("aria-label", "Close");
    closeBtn.innerHTML = "&times;";

    var heading = document.createElement("h3");
    heading.textContent = "Keyboard shortcuts";

    panel.appendChild(closeBtn);
    panel.appendChild(heading);

    SHORTCUT_ROWS.forEach(function (row) {
      var rowEl = document.createElement("div");
      rowEl.className = "shortcuts-row";
      var label = document.createElement("span");
      label.textContent = row[0];
      var keys = document.createElement("span");
      keys.className = "shortcuts-keys";
      for (var i = 1; i < row.length; i++) {
        var kbd = document.createElement("kbd");
        kbd.textContent = row[i];
        keys.appendChild(kbd);
      }
      rowEl.appendChild(label);
      rowEl.appendChild(keys);
      panel.appendChild(rowEl);
    });

    var guideLink = document.createElement("button");
    guideLink.type = "button";
    guideLink.className = "shortcuts-guide-link";
    guideLink.textContent = "Need a guide? Take the tour →";
    panel.appendChild(guideLink);

    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    function open() { overlay.classList.add("open"); }
    function close() { overlay.classList.remove("open"); }
    function toggle() {
      if (overlay.classList.contains("open")) close(); else open();
    }

    guideLink.addEventListener("click", function () {
      close();
      if (window.SiteTour && document.getElementById("shuffle-toggle")) {
        window.SiteTour.run(QUIZ_TOUR_STEPS, "tourSeen:quiz");
      }
    });
    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "?") { e.preventDefault(); toggle(); return; }
      if (e.key === "Escape" && overlay.classList.contains("open")) close();
    });

    return { open: open };
  }

  function makeToggleRow(label, checked, onChange) {
    var row = document.createElement("div");
    row.className = "settings-row";

    var span = document.createElement("span");
    span.textContent = label;

    var switchLabel = document.createElement("label");
    switchLabel.className = "settings-switch";
    var input = document.createElement("input");
    input.type = "checkbox";
    input.checked = checked;
    var track = document.createElement("span");
    track.className = "track";
    var thumb = document.createElement("span");
    thumb.className = "thumb";
    switchLabel.appendChild(input);
    switchLabel.appendChild(track);
    switchLabel.appendChild(thumb);

    input.addEventListener("change", function () { onChange(input.checked); });

    row.appendChild(span);
    row.appendChild(switchLabel);
    return { row: row, input: input };
  }

  function makeActionRow(label, onClick) {
    var row = document.createElement("div");
    row.className = "settings-row quick-action";

    var span = document.createElement("span");
    span.textContent = label;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "settings-action-btn";
    btn.textContent = "Open";
    btn.addEventListener("click", onClick);

    row.appendChild(span);
    row.appendChild(btn);
    return row;
  }

  function initSettingsPanel() {
    var overlay = document.createElement("div");
    overlay.className = "settings-overlay";
    overlay.id = "settings-overlay";

    var panel = document.createElement("div");
    panel.className = "settings-panel";

    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "shortcuts-close";
    closeBtn.setAttribute("aria-label", "Close");
    closeBtn.innerHTML = "&times;";

    var heading = document.createElement("h3");
    heading.textContent = "Settings";

    panel.appendChild(closeBtn);
    panel.appendChild(heading);

    // Quick actions: #refresh-btn/#theme-toggle-btn/#calc-btn/#pomo-btn/
    // #account-btn are always hidden now (see theme.css) -- Settings,
    // Search, Your highlights, and Draw are the only tools that stay as
    // standalone corner icons, everything else lives here instead. These
    // rows are wired by literally delegating to the still-fully-functional
    // -but-hidden buttons (except dark mode, which calls setTheme/
    // paintIcon directly since this row is the *only* way to toggle it now,
    // so there's no other place its state could drift out of sync from).
    // Arcade pages (detected by their edge-decor marquee *dots* -- index.html
    // also has its own unrelated, dot-free ".edge-decor" zigzag strips, so
    // matching on ".edge-decor circle" specifically is what tells the two
    // apart) want their Settings panel identical to the homepage's, right
    // down to #refresh-btn staying a visible standalone icon there instead
    // of living in this panel -- see the matching arcade.css override. The
    // one addition is a Sound effects row: Arcade dropped its own corner
    // sound-toggle icon (see arcade.js's initHeader), so this panel is now
    // the only place to flip arcade.js's fc_sound_v1 flag, same as Dark
    // mode is the only place to flip the site's theme.
    var isArcade = !!document.querySelector(".edge-decor circle");

    var darkModeToggle = makeToggleRow(
      "Dark mode",
      currentTheme() === "dark",
      function (checked) {
        setTheme(checked ? "dark" : "light");
        var tBtn = document.getElementById("theme-toggle-btn");
        if (tBtn) paintIcon(tBtn, checked ? "dark" : "light");
      }
    );
    darkModeToggle.row.classList.add("quick-action");
    panel.appendChild(darkModeToggle.row);

    if (isArcade) {
      var soundToggle = makeToggleRow(
        "Sound effects",
        localStorage.getItem("fc_sound_v1") !== "0",
        function (checked) {
          if (window.setFCSoundEnabled) window.setFCSoundEnabled(checked);
        }
      );
      soundToggle.row.classList.add("quick-action");
      panel.appendChild(soundToggle.row);
    }

    // setTimeout(...,0) defers the delegated click until after this click
    // event's own bubble phase finishes -- calc/account both have their own
    // document-level "click outside closes this" listener, and firing the
    // delegated click synchronously means the *original* click event (whose
    // target is this row's button, not something inside the calc/account
    // panel) is still bubbling and reaches that listener right after,
    // reading the panel as freshly-opened-but-clicked-outside and closing
    // it again in the same tick.
    panel.appendChild(makeActionRow("Calculator", function () {
      close();
      setTimeout(function () {
        var b = document.getElementById("calc-btn");
        if (b) b.click();
      }, 0);
    }));
    panel.appendChild(makeActionRow("Study timer", function () {
      close();
      setTimeout(function () {
        var b = document.getElementById("pomo-btn");
        if (b) b.click();
      }, 0);
    }));
    // #refresh-btn stays a visible icon on the homepage and on Arcade (see
    // theme.css / arcade.css) -- skip the quick-action row on both so it
    // isn't offered in two places.
    if (!document.body.classList.contains("homepage") && !isArcade) {
      panel.appendChild(makeActionRow("Refresh / check for updates", function () {
        var b = document.getElementById("refresh-btn");
        if (b) b.click();
      }));
    }
    panel.appendChild(makeActionRow("Account / sign in", function () {
      close();
      setTimeout(function () {
        var b = document.getElementById("account-btn");
        if (b) b.click();
      }, 0);
    }));

    var textSizeToggle = makeToggleRow(
      "Larger text",
      localStorage.getItem("textSize") === "large",
      function (checked) { setTextSize(checked); }
    );
    panel.appendChild(textSizeToggle.row);

    var contrastToggle = makeToggleRow(
      "High contrast",
      localStorage.getItem("contrast") === "high",
      function (checked) { setContrast(checked); }
    );
    panel.appendChild(contrastToggle.row);

    if (document.getElementById("shuffle-toggle")) {
      var shuffleToggle = makeToggleRow(
        "Shuffle questions by default",
        localStorage.getItem("defaultShuffle") === "1",
        function (checked) { localStorage.setItem("defaultShuffle", checked ? "1" : "0"); }
      );
      panel.appendChild(shuffleToggle.row);

      if ("vibrate" in navigator) {
        var hapticsToggle = makeToggleRow(
          "Haptic feedback",
          localStorage.getItem("haptics") === "1",
          function (checked) { localStorage.setItem("haptics", checked ? "1" : "0"); }
        );
        panel.appendChild(hapticsToggle.row);
      }

      var soundToggle = makeToggleRow(
        "Sound effects",
        localStorage.getItem("soundEffects") === "1",
        function (checked) { localStorage.setItem("soundEffects", checked ? "1" : "0"); }
      );
      panel.appendChild(soundToggle.row);
    }

    // Exam Mode: no per-question feedback until a real submit, free
    // navigation, flagging, a question-jump grid. Opt-in per quiz page via
    // #exam-mode-toggle existing at all (same gating pattern as shuffle).
    if (document.getElementById("exam-mode-toggle")) {
      var examModeToggle = makeToggleRow(
        "Exam Mode by default",
        localStorage.getItem("examModeDefault") === "1",
        function (checked) { localStorage.setItem("examModeDefault", checked ? "1" : "0"); }
      );
      panel.appendChild(examModeToggle.row);

      var hardCutoffToggle = makeToggleRow(
        "Hard time limit by default (1 min/question)",
        localStorage.getItem("hardCutoffDefault") === "1",
        function (checked) { localStorage.setItem("hardCutoffDefault", checked ? "1" : "0"); }
      );
      panel.appendChild(hardCutoffToggle.row);
    }

    // Shared highlights (opt-in, added 2026-07-14) -- OFF by default,
    // unlike "who's studying now" presence, which is automatic for any
    // signed-in user with no toggle at all. Highlighting itself (position +
    // color, never the note text) is materially more personal than an
    // anonymous "someone's here" heartbeat, so this got its own explicit
    // opt-in per product decision -- see feedback_presence memory. Only
    // shown on guide pages at all, matching every other guide-only toggle's
    // gating convention in this panel (shuffle/exam-mode above check for
    // their own quiz-only trigger elements the same way).
    if (document.querySelector(".guide-back-bar")) {
      var shareHlToggle = makeToggleRow(
        "Share my highlights with other students (anonymously)",
        localStorage.getItem("shareHighlights") === "1",
        function (checked) {
          localStorage.setItem("shareHighlights", checked ? "1" : "0");
          window.dispatchEvent(new Event("shareHighlightsChanged"));
        }
      );
      panel.appendChild(shareHlToggle.row);
    }

    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    function open() { overlay.classList.add("open"); }
    function close() { overlay.classList.remove("open"); }

    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });

    return { open: open };
  }

  // Basic four-function calculator, available on every page (quiz or
  // practicum, timed or not) since students may want it regardless of
  // whether a given quiz happens to involve calculations. Deliberately a
  // small non-blocking floating panel near the corner button rather than a
  // full-screen overlay like Settings/Shortcuts -- it needs to stay usable
  // side-by-side with the question, not cover it.
  //
  // To extend to a scientific mode later: add entries to CALC_BINARY_OPS
  // (two-argument, applied via chooseOp/equals the same way +/-/x/div
  // already are) or CALC_UNARY_OPS (one-argument, applied immediately to
  // the current display value -- wire a button the same way the digit/op
  // buttons below are wired, calling applyUnary(CALC_UNARY_OPS[key])) and
  // add the corresponding <button> to .calc-grid. No other changes needed.
  function initCalculator() {
    var CALC_BINARY_OPS = {
      "+": function (a, b) { return a + b; },
      "−": function (a, b) { return a - b; },
      "×": function (a, b) { return a * b; },
      "÷": function (a, b) { return b === 0 ? NaN : a / b; }
    };
    var CALC_UNARY_OPS = {
      // Reserved for a future scientific mode, e.g.:
      // "√": function (x) { return Math.sqrt(x); },
    };

    var overlay = el("div", "calc-overlay");
    var panel = el("div", "calc-panel");

    var header = el("div", "calc-header");
    var title = el("span", null, "Calculator");
    var closeBtn = el("button", "calc-close", "&times;");
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Close calculator");
    header.appendChild(title);
    header.appendChild(closeBtn);

    // Draggable by its header, like a lightweight floating window. Moves the
    // fixed-positioned overlay itself (not the panel inside it) by switching
    // from the default top/right CSS anchor to explicit left/top px once a
    // drag starts; clamped to stay fully on-screen. Position persists across
    // close/reopen for free since overlay is only hidden (display:none via
    // the .open class toggle), never removed/recreated.
    (function makeDraggable() {
      var dragging = false, startX, startY, startLeft, startTop;
      header.addEventListener("pointerdown", function (e) {
        if (e.target.closest(".calc-close")) return;
        dragging = true;
        var r = overlay.getBoundingClientRect();
        startLeft = r.left; startTop = r.top;
        startX = e.clientX; startY = e.clientY;
        overlay.style.left = startLeft + "px";
        overlay.style.top = startTop + "px";
        overlay.style.right = "auto";
        header.setPointerCapture(e.pointerId);
      });
      header.addEventListener("pointermove", function (e) {
        if (!dragging) return;
        var newLeft = startLeft + (e.clientX - startX);
        var newTop = startTop + (e.clientY - startY);
        newLeft = Math.max(4, Math.min(window.innerWidth - overlay.offsetWidth - 4, newLeft));
        newTop = Math.max(4, Math.min(window.innerHeight - overlay.offsetHeight - 4, newTop));
        overlay.style.left = newLeft + "px";
        overlay.style.top = newTop + "px";
      });
      header.addEventListener("pointerup", function () { dragging = false; });
      header.addEventListener("pointercancel", function () { dragging = false; });
    })();

    var display = el("div", "calc-display", "0");
    display.id = "calc-display";

    var grid = el("div", "calc-grid");
    var ROWS = [
      [{ t: "C", action: "clear", cls: "calc-fn" }, { t: "⌫", action: "back", cls: "calc-fn" }, { t: "÷", op: "÷", cls: "calc-op" }, { t: "×", op: "×", cls: "calc-op" }],
      [{ t: "7", d: "7" }, { t: "8", d: "8" }, { t: "9", d: "9" }, { t: "−", op: "−", cls: "calc-op" }],
      [{ t: "4", d: "4" }, { t: "5", d: "5" }, { t: "6", d: "6" }, { t: "+", op: "+", cls: "calc-op" }],
      [{ t: "1", d: "1" }, { t: "2", d: "2" }, { t: "3", d: "3" }, { t: "=", action: "equals", cls: "calc-eq", rowspan: 2 }],
      [{ t: "0", d: "0", cls: "calc-zero", colspan: 2 }, { t: ".", d: "." }]
    ];
    ROWS.forEach(function (row) {
      row.forEach(function (spec) {
        var btn = el("button", "calc-btn" + (spec.cls ? " " + spec.cls : ""), spec.t);
        btn.type = "button";
        if (spec.d != null) btn.dataset.digit = spec.d;
        if (spec.op) btn.dataset.op = spec.op;
        if (spec.action) btn.dataset.action = spec.action;
        if (spec.colspan) btn.style.gridColumn = "span " + spec.colspan;
        if (spec.rowspan) btn.style.gridRow = "span " + spec.rowspan;
        grid.appendChild(btn);
      });
    });

    panel.appendChild(header);
    panel.appendChild(display);
    panel.appendChild(grid);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    var current = "0", pending = null, pendingOp = null, justEvaluated = false;

    function render() { display.textContent = current; }

    function formatResult(n) {
      if (!isFinite(n)) return "Error";
      var rounded = Math.round(n * 1e10) / 1e10;
      return String(rounded);
    }
    function inputDigit(d) {
      if (justEvaluated) { current = "0"; justEvaluated = false; }
      if (d === ".") {
        if (current.indexOf(".") !== -1) return;
        current += ".";
      } else if (current === "0") {
        current = d;
      } else {
        current += d;
      }
      render();
    }
    function clearAll() {
      current = "0"; pending = null; pendingOp = null; justEvaluated = false;
      render();
    }
    function backspace() {
      if (justEvaluated) { clearAll(); return; }
      current = current.length > 1 ? current.slice(0, -1) : "0";
      render();
    }
    function chooseOp(op) {
      if (pendingOp != null && !justEvaluated) equals();
      pending = parseFloat(current);
      pendingOp = op;
      justEvaluated = false;
      current = "0";
    }
    function equals() {
      if (pendingOp == null || pending == null) return;
      var result = CALC_BINARY_OPS[pendingOp](pending, parseFloat(current));
      current = formatResult(result);
      pending = null; pendingOp = null; justEvaluated = true;
      render();
    }
    function applyUnary(fn) {
      current = formatResult(fn(parseFloat(current)));
      justEvaluated = true;
      render();
    }

    grid.addEventListener("click", function (e) {
      var btn = e.target.closest(".calc-btn");
      if (!btn) return;
      if (btn.dataset.digit != null) inputDigit(btn.dataset.digit);
      else if (btn.dataset.op) chooseOp(btn.dataset.op);
      else if (btn.dataset.action === "clear") clearAll();
      else if (btn.dataset.action === "back") backspace();
      else if (btn.dataset.action === "equals") equals();
    });

    function isOpen() { return overlay.classList.contains("open"); }
    function toggle() { overlay.classList.toggle("open"); }
    function close() { overlay.classList.remove("open"); }

    closeBtn.addEventListener("click", close);
    document.addEventListener("click", function (e) {
      if (!isOpen()) return;
      if (panel.contains(e.target) || e.target.closest("#calc-btn")) return;
      close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) close();
    });

    return { toggle: toggle };
  }

  // Study session timer (Pomodoro-style, added 2026-07-14). Same
  // shared-widget pattern as the calculator above -- fully local, zero
  // per-page changes, works on any page (quiz, guide, or homepage). State
  // is keyed by an absolute end-timestamp rather than a plain countdown a
  // setInterval ticks down, so navigating to a different page or a full
  // reload never loses time: remaining time is always `endsAt - Date.now()`,
  // recomputed fresh on every load and every tick, the same trick the
  // quiz-family timers already use for their own pause/resume.
  function initPomodoro() {
    var STATE_KEY = "pomodoroState";
    var DEFAULTS = { phase: "idle", running: false, endsAt: null, remainingMs: null, focusMin: 25, breakMin: 5, completedSessions: 0 };

    function loadState() {
      var s;
      try { s = JSON.parse(localStorage.getItem(STATE_KEY)); } catch (e) { s = null; }
      var out = {};
      for (var k in DEFAULTS) out[k] = (s && s[k] !== undefined) ? s[k] : DEFAULTS[k];
      return out;
    }
    function saveState() { localStorage.setItem(STATE_KEY, JSON.stringify(state)); }

    var state = loadState();

    var overlay = el("div", "pomo-overlay");
    var panel = el("div", "pomo-panel");

    var header = el("div", "pomo-header");
    var title = el("span", null, "Study Timer");
    var closeBtn = el("button", "pomo-close", "&times;");
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Close study timer");
    header.appendChild(title);
    header.appendChild(closeBtn);

    // Draggable by its header -- identical mechanics to the calculator's own
    // makeDraggable() above (see that comment for why left/top instead of
    // the default top/right anchor, and why clamping is needed).
    (function makeDraggable() {
      var dragging = false, startX, startY, startLeft, startTop;
      header.addEventListener("pointerdown", function (e) {
        if (e.target.closest(".pomo-close")) return;
        dragging = true;
        var r = overlay.getBoundingClientRect();
        startLeft = r.left; startTop = r.top;
        startX = e.clientX; startY = e.clientY;
        overlay.style.left = startLeft + "px";
        overlay.style.top = startTop + "px";
        overlay.style.right = "auto";
        header.setPointerCapture(e.pointerId);
      });
      header.addEventListener("pointermove", function (e) {
        if (!dragging) return;
        var newLeft = startLeft + (e.clientX - startX);
        var newTop = startTop + (e.clientY - startY);
        newLeft = Math.max(4, Math.min(window.innerWidth - overlay.offsetWidth - 4, newLeft));
        newTop = Math.max(4, Math.min(window.innerHeight - overlay.offsetHeight - 4, newTop));
        overlay.style.left = newLeft + "px";
        overlay.style.top = newTop + "px";
      });
      header.addEventListener("pointerup", function () { dragging = false; });
      header.addEventListener("pointercancel", function () { dragging = false; });
    })();

    var phaseLabel = el("div", "pomo-phase");
    var display = el("div", "pomo-display", "25:00");
    display.id = "pomo-display";

    var controlsRow = el("div", "pomo-controls");
    var startBtn = el("button", "pomo-action-btn primary", "Start");
    startBtn.type = "button";
    var pauseBtn = el("button", "pomo-action-btn", "Pause");
    pauseBtn.type = "button";
    var resetBtn = el("button", "pomo-action-btn", "Reset");
    resetBtn.type = "button";
    controlsRow.appendChild(startBtn);
    controlsRow.appendChild(pauseBtn);
    controlsRow.appendChild(resetBtn);

    var settingsRow = el("div", "pomo-settings");
    var focusField = el("label", "pomo-field", "Focus");
    var focusInput = document.createElement("input");
    focusInput.type = "number";
    focusInput.min = "1";
    focusInput.max = "120";
    focusInput.id = "pomo-focus-min";
    focusField.appendChild(focusInput);
    focusField.appendChild(document.createTextNode(" min"));
    var breakField = el("label", "pomo-field", "Break");
    var breakInput = document.createElement("input");
    breakInput.type = "number";
    breakInput.min = "1";
    breakInput.max = "60";
    breakInput.id = "pomo-break-min";
    breakField.appendChild(breakInput);
    breakField.appendChild(document.createTextNode(" min"));
    settingsRow.appendChild(focusField);
    settingsRow.appendChild(breakField);

    var sessionsLabel = el("div", "pomo-sessions");

    panel.appendChild(header);
    panel.appendChild(phaseLabel);
    panel.appendChild(display);
    panel.appendChild(controlsRow);
    panel.appendChild(settingsRow);
    panel.appendChild(sessionsLabel);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    focusInput.value = state.focusMin;
    breakInput.value = state.breakMin;
    focusInput.addEventListener("change", function () {
      var v = Math.max(1, Math.min(120, parseInt(focusInput.value, 10) || DEFAULTS.focusMin));
      focusInput.value = v;
      state.focusMin = v;
      saveState();
      render();
    });
    breakInput.addEventListener("change", function () {
      var v = Math.max(1, Math.min(60, parseInt(breakInput.value, 10) || DEFAULTS.breakMin));
      breakInput.value = v;
      state.breakMin = v;
      saveState();
    });

    // Persistent mini-pill -- separate from the panel, visible on EVERY page
    // (not just while the panel happens to be open) whenever a session is
    // actively running, so the countdown is glanceable without reopening the
    // panel each time, the same reason quizzes show #timerpill during an
    // attempt instead of only inside a menu.
    var pill = el("button", "pomo-pill", "");
    pill.type = "button";
    pill.setAttribute("aria-label", "Study timer running — click to open");
    document.body.appendChild(pill);

    function fmt(ms) {
      var totalSec = Math.max(0, Math.ceil(ms / 1000));
      var m = Math.floor(totalSec / 60), s = totalSec % 60;
      return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    }
    function phaseTotalMs() { return (state.phase === "break" ? state.breakMin : state.focusMin) * 60000; }
    function remainingMs() {
      if (state.running && state.endsAt) return state.endsAt - Date.now();
      if (state.remainingMs != null) return state.remainingMs;
      return phaseTotalMs();
    }

    function render() {
      var rem = Math.max(0, remainingMs());
      display.textContent = fmt(rem);
      var label = state.phase === "focus" ? "Focus" : state.phase === "break" ? "Break" : "Ready to focus";
      phaseLabel.textContent = label;
      sessionsLabel.textContent = state.completedSessions > 0
        ? state.completedSessions + " focus session" + (state.completedSessions === 1 ? "" : "s") + " completed"
        : "";
      startBtn.textContent = (state.phase !== "idle" && !state.running) ? "Resume" : "Start";
      startBtn.style.display = state.running ? "none" : "";
      pauseBtn.style.display = state.running ? "" : "none";
      resetBtn.style.display = state.phase !== "idle" ? "" : "none";
      focusInput.disabled = state.phase !== "idle";
      breakInput.disabled = state.phase !== "idle";

      if (state.running) {
        pill.classList.add("visible");
        pill.textContent = (state.phase === "break" ? "☕ " : "🍅 ") + fmt(rem);
        pill.classList.toggle("pomo-pill-break", state.phase === "break");
      } else {
        pill.classList.remove("visible");
      }
    }

    var tickTimer = null;
    function startTicking() {
      stopTicking();
      tickTimer = setInterval(function () {
        if (!state.running) { stopTicking(); return; }
        if (remainingMs() <= 0) { advancePhase(); return; }
        render();
      }, 1000);
    }
    function stopTicking() {
      if (tickTimer) { clearInterval(tickTimer); tickTimer = null; }
    }

    // Focus -> break auto-advances (the whole point of the technique is not
    // having to remember to take the break yourself). Break -> idle does
    // NOT auto-restart another focus round -- silently looping forever while
    // someone stepped away would be a worse outcome than just stopping and
    // waiting for an explicit "Start" again.
    function advancePhase() {
      if (state.phase === "focus") {
        state.completedSessions++;
        state.phase = "break";
        state.running = true;
        state.endsAt = Date.now() + state.breakMin * 60000;
        state.remainingMs = null;
        saveState();
        if (window.playSiteSound) window.playSiteSound("complete");
        if (window.showToast) window.showToast("Focus session done — take a " + state.breakMin + "-minute break.", 5000);
        startTicking();
      } else {
        state.phase = "idle";
        state.running = false;
        state.endsAt = null;
        state.remainingMs = null;
        saveState();
        if (window.playSiteSound) window.playSiteSound("reveal");
        if (window.showToast) window.showToast("Break's over — ready for another focus session?", 5000);
        stopTicking();
      }
      render();
    }

    function start() {
      state.endsAt = Date.now() + (state.phase === "idle" ? state.focusMin * 60000 : (state.remainingMs != null ? state.remainingMs : phaseTotalMs()));
      if (state.phase === "idle") state.phase = "focus";
      state.running = true;
      state.remainingMs = null;
      saveState();
      startTicking();
      render();
    }
    function pause() {
      state.remainingMs = Math.max(0, remainingMs());
      state.running = false;
      state.endsAt = null;
      saveState();
      stopTicking();
      render();
    }
    function reset() {
      state.phase = "idle";
      state.running = false;
      state.endsAt = null;
      state.remainingMs = null;
      saveState();
      stopTicking();
      render();
    }

    startBtn.addEventListener("click", start);
    pauseBtn.addEventListener("click", pause);
    resetBtn.addEventListener("click", reset);
    pill.addEventListener("click", open);

    function isOpen() { return overlay.classList.contains("open"); }
    function open() { overlay.classList.add("open"); render(); }
    function toggle() { if (isOpen()) close(); else open(); }
    function close() { overlay.classList.remove("open"); }

    closeBtn.addEventListener("click", close);
    document.addEventListener("click", function (e) {
      if (!isOpen()) return;
      if (panel.contains(e.target) || e.target.closest("#pomo-btn") || e.target === pill) return;
      close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) close();
    });

    // Catch up on load if a session was left running in a tab/browser that's
    // since been fully closed and reopened (setInterval doesn't survive
    // that) -- a single advancePhase() call, not a fast-forwarding loop
    // through however many phases elapsed during the gap, since exact
    // catch-up accuracy doesn't matter for a casual study timer and a loop
    // here risks looping forever on a very long absence.
    if (state.running && remainingMs() <= 0) {
      advancePhase();
    } else if (state.running) {
      startTicking();
    }
    render();

    return { toggle: toggle };
  }

  function init() {
    document.documentElement.setAttribute("data-text-size", localStorage.getItem("textSize") === "large" ? "large" : "normal");
    document.documentElement.setAttribute("data-contrast", localStorage.getItem("contrast") === "high" ? "high" : "normal");

    var group = document.createElement("div");
    group.id = "corner-actions";

    var refreshBtn = makeCornerBtn("refresh-btn", "Refresh / check for updates");
    refreshBtn.innerHTML = REFRESH;
    refreshBtn.addEventListener("click", function () {
      if ("serviceWorker" in navigator && navigator.serviceWorker.getRegistrations) {
        navigator.serviceWorker.getRegistrations()
          .then(function (regs) { return Promise.all(regs.map(function (r) { return r.update(); })); })
          .catch(function () {})
          .then(function () { location.reload(); });
      } else {
        location.reload();
      }
    });

    var themeBtn = makeCornerBtn("theme-toggle-btn", "Toggle dark mode");
    paintIcon(themeBtn, currentTheme());
    themeBtn.addEventListener("click", function () {
      setTheme(currentTheme() === "dark" ? "light" : "dark", themeBtn);
    });

    var settingsHelp = initSettingsPanel();
    var settingsBtn = makeCornerBtn("settings-btn", "Settings");
    settingsBtn.innerHTML = GEAR;
    settingsBtn.addEventListener("click", settingsHelp.open);
    group.appendChild(settingsBtn);

    var calcHelp = initCalculator();
    var calcBtn = makeCornerBtn("calc-btn", "Calculator");
    calcBtn.innerHTML = CALC;
    calcBtn.addEventListener("click", calcHelp.toggle);
    group.appendChild(calcBtn);

    var pomoHelp = initPomodoro();
    var pomoBtn = makeCornerBtn("pomo-btn", "Study timer");
    pomoBtn.innerHTML = TIMER;
    pomoBtn.addEventListener("click", pomoHelp.toggle);
    group.appendChild(pomoBtn);

    group.appendChild(refreshBtn);
    group.appendChild(themeBtn);
    document.body.appendChild(group);

    // "Back to previous page" -- fixed top-left, mirroring #corner-actions'
    // top-right placement. Only on non-homepage pages (index.html has its
    // own top-left #install-app-btn, and doesn't need this anyway), and only
    // when document.referrer shows the visitor actually arrived via an
    // in-site link -- a same-origin check, not just any referrer -- so the
    // button doesn't sit there uselessly for someone who opened this page
    // directly (typed URL, bookmark, new tab) with no real "previous page"
    // on this site to go back to.
    if (!document.body.classList.contains("homepage") &&
        !document.querySelector(".guide-back-bar") &&
        document.referrer && document.referrer.indexOf(location.origin) === 0) {
      var leftGroup = document.createElement("div");
      leftGroup.id = "corner-actions-left";
      var prevBtn = makeCornerBtn("prevpage-btn", "Back to previous page");
      prevBtn.innerHTML = ARROW_LEFT;
      prevBtn.addEventListener("click", function () { history.back(); });
      leftGroup.appendChild(prevBtn);
      document.body.appendChild(leftGroup);

      // Revealed only after a small scroll -- see the CSS comment on
      // #corner-actions-left for why: every page type puts its own title
      // text right at the top-left with no reserved clearance, so showing
      // this unconditionally from page load would sit on top of it.
      var revealAt = 80;
      var setVisible = function () {
        leftGroup.classList.toggle("visible", window.scrollY > revealAt);
      };
      setVisible();
      window.addEventListener("scroll", setVisible, { passive: true });
    }

    var shortcutsHelp = initShortcutsHelp();
    if (shortcutsHelp) {
      var shortcutsBtn = makeCornerBtn("shortcuts-btn", "Keyboard shortcuts");
      shortcutsBtn.innerHTML = KEYBOARD;
      shortcutsBtn.addEventListener("click", shortcutsHelp.open);
      group.insertBefore(shortcutsBtn, refreshBtn);

      // One-time, site-wide (not per-quiz) heads-up that gamepads work here
      // at all -- the shortcuts panel above has the actual button mapping,
      // but that's opt-in (press ?) and easy to never discover on your own.
      // Shown once ever via localStorage, not once per quiz, so it doesn't
      // nag across 35+ quiz pages; delayed so it doesn't collide with the
      // sign-in/install prompts that can also show on first load.
      if (!localStorage.getItem("gamepadHintShown")) {
        localStorage.setItem("gamepadHintShown", "1");
        setTimeout(function () {
          if (window.showToast) {
            window.showToast("🎮 Controller supported on this quiz — A/B/X/Y to answer, RB/LB to move on/back. Press ? for full controls.", 5500);
          }
        }, 1400);
      }

      initHaptics();
      initSoundEffects();

      var shuffleCb = document.getElementById("shuffle-toggle");
      if (shuffleCb) {
        if (localStorage.getItem("defaultShuffle") === "1") {
          var resumeBanner = document.getElementById("resume-banner");
          var hasProgress = resumeBanner
            ? resumeBanner.style.display === "block"
            : localStorage.getItem("qshuf:" + location.pathname) !== null;
          if (!hasProgress) shuffleCb.checked = true;
        }
        setTimeout(function () {
          window.SiteTour.start(QUIZ_TOUR_STEPS, "tourSeen:quiz");
        }, 700);
      }

      var examModeCb = document.getElementById("exam-mode-toggle");
      if (examModeCb && localStorage.getItem("examModeDefault") === "1") {
        examModeCb.checked = true;
      }
      var hardCutoffCb = document.getElementById("hard-cutoff-toggle");
      if (hardCutoffCb && localStorage.getItem("hardCutoffDefault") === "1") {
        hardCutoffCb.checked = true;
      }
    }

    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("siteTheme")) {
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
          paintIcon(themeBtn, currentTheme());
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

// Read-aloud, desktop-only for now. Opt-in per page: add data-readable to
// the page's .wrap div. Only built for guide-style reference pages, not
// quizzes -- gated on that explicit marker rather than absence-of-quiz
// signals, so it never silently turns on for a page it wasn't meant for.
(function () {
  var PLAY = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
  var PAUSE = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>';
  var STOP = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="5" width="14" height="14"/></svg>';
  var PREV = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="5" width="3" height="14"/><path d="M20 5v14L9 12z"/></svg>';
  var NEXT = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="17" y="5" width="3" height="14"/><path d="M4 5v14l11-7z"/></svg>';
  // .cap/.io are the Physiology guide's caption/objective classes; .figcap/
  // .callout are the Anatomy guide's equivalents (same idea, different
  // names -- each guide's own markup picks whichever it already uses).
  // .io-head/.io-h are the objective-box heading in guides where `.io`
  // itself was reused as a big wrapping box rather than a leaf line (see
  // buildQueue's containment filter, which excludes `.io` in exactly that
  // case) -- two different class names because the two guides that made
  // this choice named it differently (.io-head in the redesigned Anatomy
  // guide, .io-h in Physiology Exam 4); both listed here so either one's
  // heading still gets read on its own.
  var UNIT_SELECTOR = "p, li, .cap, .figcap, .callout, td, .io, .io-head, .io-h";
  var RATES = [1, 1.25, 1.5, 1.75, 2];
  // Each reading unit is its own separate audio clip (or its own separate
  // speechSynthesis utterance) with no trailing silence baked in -- jumping
  // straight from one into the next with zero gap reads as a run-on,
  // since none of the natural inter-sentence pausing a single continuous
  // utterance would have gets carried over between two separate units.
  // A short fixed gap between units restores that breathing room
  // regardless of playback rate.
  var PARAGRAPH_PAUSE_MS = 350;

  // Notation that reads fine on screen (arrows, chemistry sub/superscripts,
  // em dashes) often reads as silence, a mumble, or a literal symbol name
  // when spoken -- voice choice alone can't fix that. Applied in order:
  // whole-term chemistry/physiology substitutions first (most specific),
  // then generic symbols, then a last-resort cleanup for any sub/superscript
  // characters neither list caught.
  var TERM_REPLACEMENTS = [
    ["H₂CO₃", "carbonic acid"],
    ["HCO₃⁻", "bicarbonate"],
    ["Ca²⁺", "calcium"],
    ["Na⁺", "sodium"],
    ["K⁺", "potassium"],
    ["H₂O", "water"],
    ["CO₂", "carbon dioxide"],
    ["O₂", "oxygen"],
    ["H⁺", "hydrogen ion"],
    ["B₁₂", "B twelve"],
    ["Müllerian", "Mullerian"]
  ];
  var SYMBOL_REPLACEMENTS = [
    ["⇌", " in equilibrium with "],
    ["↔", " and "],
    ["→", " leads to "],
    ["←", " comes from "],
    ["↑", " increases "],
    ["↓", " decreases "],
    ["—", ", "],
    ["–", " to "],
    ["−", " minus "],
    ["×", " times "],
    ["≥", " greater than or equal to "],
    ["≤", " less than or equal to "],
    ["≠", " does not equal "],
    ["·", ", "],
    ["•", ", "],
    ["≈", " approximately "],
    ["°", " degrees "],
    ["÷", " divided by "],
    ["…", "..."],
    ["★", ""],
    ["’", "'"],
    ["α", "alpha"],
    ["β", "beta"],
    ["Δ", "Delta"],
    ["δ", "delta"],
    ["π", "pi"],
    ["ω", "omega"],
    ["Ω", "Omega"],
    ["vs.", "versus"]
  ];
  var LEFTOVER_CLEANUP = [
    ["₁", "1"], ["₂", "2"], ["₃", "3"],
    ["²", "2"], ["⁺", " plus"], ["⁻", " minus"]
  ];

  function speakableText(raw) {
    var t = raw;
    TERM_REPLACEMENTS.forEach(function (pair) { t = t.split(pair[0]).join(pair[1]); });
    SYMBOL_REPLACEMENTS.forEach(function (pair) { t = t.split(pair[0]).join(pair[1]); });
    LEFTOVER_CLEANUP.forEach(function (pair) { t = t.split(pair[0]).join(pair[1]); });
    return t.replace(/\s+/g, " ").trim();
  }

  function init() {
    var wrap = document.querySelector(".wrap[data-readable]");
    if (!wrap || !("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") return;

    var queue = [];
    var currentIndex = -1;
    var playing = false;
    var rateIdx = 0;
    var voices = [];
    var selectedVoice = null;
    var currentAudio = null;
    // Pre-rendered audio (see feedback_guides_page memory: say -v Ava +
    // afconvert, generated once per guide) sounds far better than any
    // browser voice, when available. Mapped purely by queue index --
    // "NNN.m4a" for reading unit N -- so re-running that pipeline after
    // editing a guide's content is required to keep them aligned; there's
    // no in-page marker tying a specific paragraph to a specific file.
    var audioDir = wrap.dataset.audioDir || null;

    var bar = document.createElement("div");
    bar.className = "tts-bar";
    bar.id = "tts-bar";

    var prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "tts-btn";
    prevBtn.setAttribute("aria-label", "Previous paragraph");
    prevBtn.innerHTML = PREV;

    var playBtn = document.createElement("button");
    playBtn.type = "button";
    playBtn.className = "tts-btn";
    playBtn.setAttribute("aria-label", "Read aloud");
    playBtn.innerHTML = PLAY;

    var nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "tts-btn";
    nextBtn.setAttribute("aria-label", "Next paragraph");
    nextBtn.innerHTML = NEXT;

    var stopBtn = document.createElement("button");
    stopBtn.type = "button";
    stopBtn.className = "tts-btn";
    stopBtn.setAttribute("aria-label", "Stop reading");
    stopBtn.innerHTML = STOP;

    var rateBtn = document.createElement("button");
    rateBtn.type = "button";
    rateBtn.className = "tts-rate";
    rateBtn.textContent = RATES[rateIdx] + "x";
    rateBtn.setAttribute("aria-label", "Reading speed");

    var voiceSelect = document.createElement("select");
    voiceSelect.className = "tts-voice";
    voiceSelect.setAttribute("aria-label", "Voice");

    // Pre-rendered guides ship two full audio tracks (edge-tts neural
    // voices "Andrew" and "Ava", one male/female pair per guide, under
    // <audioDir>/male/ and <audioDir>/female/) -- a toggle picks between
    // them instead of the live-synthesis voice dropdown, which has no
    // meaning once audio is pre-rendered.
    var GENDERS = ["female", "male"];
    var GENDER_LABELS = { female: "♀ Ava", male: "♂ Andrew" };
    var gender = localStorage.getItem("ttsGender") || "female";
    if (GENDERS.indexOf(gender) === -1) gender = "female";

    var genderBtn = document.createElement("button");
    genderBtn.type = "button";
    genderBtn.className = "tts-rate tts-gender";
    genderBtn.setAttribute("aria-label", "Reading voice");

    function paintGenderBtn() { genderBtn.textContent = GENDER_LABELS[gender]; }
    paintGenderBtn();

    genderBtn.addEventListener("click", function () {
      gender = gender === "female" ? "male" : "female";
      localStorage.setItem("ttsGender", gender);
      paintGenderBtn();
      if (playing) { cancelPlayback(); speakIndex(currentIndex); }
    });

    var playbackRow = document.createElement("div");
    playbackRow.className = "tts-bar-row";
    playbackRow.appendChild(prevBtn);
    playbackRow.appendChild(playBtn);
    playbackRow.appendChild(nextBtn);
    playbackRow.appendChild(stopBtn);

    var settingsRow = document.createElement("div");
    settingsRow.className = "tts-bar-row";
    settingsRow.appendChild(rateBtn);
    // Pre-rendered audio has a fixed voice baked into each file -- the live
    // browser-voice dropdown only makes sense as a fallback for pages
    // without pre-rendered audio; pages that do have it get the male/female
    // toggle instead.
    if (audioDir) settingsRow.appendChild(genderBtn);
    else settingsRow.appendChild(voiceSelect);

    // Mobile-only collapse: the bar's actual controls live in this inner
    // wrapper so the outer .tts-bar can shrink down to just the handle tab
    // (see .tts-handle / .tts-bar.collapsed in theme.css) without any
    // per-row visibility juggling -- collapsing is just "hide this one div."
    var barContent = document.createElement("div");
    barContent.className = "tts-bar-content";
    barContent.appendChild(playbackRow);
    barContent.appendChild(settingsRow);

    // Slim tab, last in DOM order so it sits at the bar's outer (right)
    // edge -- collapsing translates the whole bar left by (100% - handle
    // width), which leaves exactly this handle visible, flush with the
    // screen edge, since translateX(100%) is relative to the bar's own
    // rendered width regardless of how wide its content happens to be.
    var handleBtn = document.createElement("button");
    handleBtn.type = "button";
    handleBtn.className = "tts-handle";
    handleBtn.setAttribute("aria-label", "Hide or show read-aloud controls");
    handleBtn.innerHTML = "&lsaquo;";

    var barCollapsed = localStorage.getItem("ttsBarCollapsed") === "1";
    if (barCollapsed) bar.classList.add("collapsed");
    handleBtn.addEventListener("click", function () {
      var nowCollapsed = bar.classList.toggle("collapsed");
      localStorage.setItem("ttsBarCollapsed", nowCollapsed ? "1" : "0");
    });

    bar.appendChild(barContent);
    bar.appendChild(handleBtn);
    document.body.appendChild(bar);

    // Voice quality/gender is almost entirely down to which installed voice
    // is picked -- rate/pitch tweaks don't fix a robotic-sounding voice.
    // Try known better-sounding (and, per a user request, male) system/
    // browser voices first; user's own pick (persisted) always wins.
    var PREFERRED_VOICES = ["Alex", "Daniel", "Google UK English Male", "Google US English", "Samantha"];

    function pickDefaultVoice() {
      var saved = localStorage.getItem("ttsVoiceName");
      if (saved) {
        var match = voices.filter(function (v) { return v.name === saved; })[0];
        if (match) return match;
      }
      for (var i = 0; i < PREFERRED_VOICES.length; i++) {
        var m = voices.filter(function (v) { return v.name === PREFERRED_VOICES[i]; })[0];
        if (m) return m;
      }
      return voices[0] || null;
    }

    function populateVoiceSelect() {
      voiceSelect.innerHTML = "";
      voices.forEach(function (v) {
        var opt = document.createElement("option");
        opt.value = v.name;
        opt.textContent = v.name + (v.lang ? " (" + v.lang + ")" : "");
        voiceSelect.appendChild(opt);
      });
      selectedVoice = pickDefaultVoice();
      if (selectedVoice) voiceSelect.value = selectedVoice.name;
    }

    function loadVoices() {
      var all = speechSynthesis.getVoices();
      voices = all.filter(function (v) { return v.lang.indexOf("en") === 0; });
      if (voices.length === 0) voices = all;
      if (voices.length > 0) populateVoiceSelect();
    }

    loadVoices();
    if ("onvoiceschanged" in speechSynthesis) {
      speechSynthesis.addEventListener("voiceschanged", loadVoices);
    }

    voiceSelect.addEventListener("change", function () {
      selectedVoice = voices.filter(function (v) { return v.name === voiceSelect.value; })[0] || null;
      if (selectedVoice) localStorage.setItem("ttsVoiceName", selectedVoice.name);
      if (playing) { cancelPlayback(); speakIndex(currentIndex); }
    });

    function buildQueue() {
      var all = Array.prototype.slice.call(wrap.querySelectorAll(UNIT_SELECTOR));
      // Some guides reuse a UNIT_SELECTOR class name (e.g. `.io`, originally
      // a small leaf objective line in the first Physiology guide) as a big
      // wrapping box that itself CONTAINS other matched units -- a heading,
      // then its own `<p>`/`<li>` body. Reading that wrapper as one unit
      // both duplicates everything its children already read on their own
      // right after it, AND runs the wrapper's own child elements' text
      // together with no space at the seams (e.g. a badge "IO 5" jammed
      // against the next heading "Spleen..." reads as "IO 5Spleen"). Only
      // keep matches that don't themselves contain another match -- a
      // wrapper's real content still gets read exactly once, via whichever
      // descendant leaf actually holds it.
      queue = all.filter(function (el) {
        if (el.textContent.trim().length === 0) return false;
        for (var i = 0; i < all.length; i++) {
          if (all[i] !== el && el.contains(all[i])) return false;
        }
        return true;
      });
    }

    // textContent concatenates every descendant text node with zero
    // inserted spacing -- fine for a single run of prose, but a box with
    // sibling elements (e.g. `<span class="io-num">IO 5</span><h3>Spleen
    // ...</h3>`) reads as "IO 5Spleen..." with the words jammed together.
    // Join every text node with a single space instead of relying on
    // however (or whether) the source HTML separates its elements.
    function spokenTextOf(el) {
      var parts = [];
      (function walk(node) {
        if (node.nodeType === 3) {
          if (node.textContent) parts.push(node.textContent);
        } else if (node.nodeType === 1) {
          Array.prototype.forEach.call(node.childNodes, walk);
        }
      })(el);
      return parts.join(" ").replace(/\s+/g, " ").trim();
    }

    // Click any paragraph/list item/etc. to start reading from exactly
    // there. Guarded so a click that's actually the tail end of a text
    // selection (drag to highlight, then mouseup fires a click too)
    // doesn't hijack it into "jump to here" instead.
    //
    // Some guides' markup nests one queue unit inside another (e.g. a
    // `.io` box wrapping its own `<p>`/`<li>` children, and `.io` is
    // itself in UNIT_SELECTOR) -- without stopPropagation, clicking the
    // inner paragraph bubbles up and ALSO fires the outer box's own
    // click-to-jump handler, so a single click issued two competing
    // jumpTo() calls for two different indices. The second call's
    // cancelPlayback() would pause the first call's <audio> before its
    // play() promise had resolved, which rejects that promise -- and
    // since nothing tied that rejection back to whether this was still
    // the active playback, its error handler fired the live-speech
    // fallback on top of the second call's (correctly playing)
    // pre-rendered audio. stopPropagation stops the double-fire outright;
    // speakIndex's `isCurrent()` check (below) is the second line of
    // defense for any other way two speakIndex calls could race.
    function wireClickToJump() {
      queue.forEach(function (el, idx) {
        el.classList.add("tts-clickable");
        el.addEventListener("click", function (e) {
          if (window.getSelection().toString().length > 0) return;
          e.stopPropagation();
          jumpTo(idx);
        });
      });
    }

    function jumpTo(index) {
      if (index < 0 || index >= queue.length) return;
      playing = true;
      paintPlayBtn();
      cancelPlayback();
      speakIndex(index);
    }

    function clearHighlight() {
      var prev = wrap.querySelector(".tts-active");
      if (prev) prev.classList.remove("tts-active");
    }

    function paintPlayBtn() {
      playBtn.innerHTML = playing ? PAUSE : PLAY;
      playBtn.setAttribute("aria-label", playing ? "Pause reading" : "Read aloud");
    }

    function cancelPlayback() {
      speechSynthesis.cancel();
      if (currentAudio) {
        currentAudio.onended = null;
        currentAudio.onerror = null;
        currentAudio.onplaying = null;
        currentAudio.pause();
        currentAudio = null;
      }
    }

    function speakLive(i, el) {
      var utter = new SpeechSynthesisUtterance(speakableText(spokenTextOf(el)));
      utter.rate = RATES[rateIdx];
      if (selectedVoice) utter.voice = selectedVoice;
      utter.onend = function () { if (playing) setTimeout(function () { if (playing) speakIndex(i + 1); }, PARAGRAPH_PAUSE_MS); };
      utter.onerror = function () { if (playing) speakIndex(i + 1); };
      speechSynthesis.speak(utter);
    }

    function speakIndex(i) {
      if (!playing) return;
      if (i < 0 || i >= queue.length) { stop(); return; }
      currentIndex = i;
      clearHighlight();
      var el = queue[i];
      el.classList.add("tts-active");
      el.scrollIntoView({ behavior: "smooth", block: "center" });

      if (audioDir) {
        var num = String(i + 1).padStart(3, "0");
        var audio = new Audio(audioDir + "/" + gender + "/" + num + ".mp3");
        audio.playbackRate = RATES[rateIdx];
        currentAudio = audio;
        var started = false;
        // A stale callback from a SUPERSEDED speakIndex call (e.g. two
        // jumpTo() calls firing back-to-back, or any other future race)
        // must never act -- once a newer call has replaced `currentAudio`,
        // this specific `audio` object is no longer the one in charge.
        function isCurrent() { return currentAudio === audio; }
        // Two independent "did it actually start" signals, unioned, since
        // the 'playing' DOM event alone isn't consistently reliable across
        // browsers/codecs -- a resolved play() promise is the more direct
        // API contract for "the browser accepted and began playback".
        function markStarted() {
          if (started || !isCurrent()) return;
          started = true;
          // A live utterance can still be queued/speaking from an earlier
          // paragraph's fallback (e.g. speechSynthesis.cancel() racing with
          // an utterance that had already started) -- the instant real
          // pre-rendered audio is confirmed playing, forcibly silence any
          // live speech so the two can never be heard at once.
          speechSynthesis.cancel();
        }
        audio.onplaying = markStarted;
        audio.onended = function () {
          if (!isCurrent() || !playing) return;
          setTimeout(function () { if (isCurrent() && playing) speakIndex(i + 1); }, PARAGRAPH_PAUSE_MS);
        };
        // Missing/failed pre-rendered file for this unit (e.g. a guide only
        // partly through the audio pipeline) -- fall back to live synthesis
        // for just this one paragraph rather than breaking the whole read.
        // Guarded on `started`: once the mp3 has actually begun playing, a
        // later error event (e.g. a mid-stream network hiccup) must NOT
        // also kick off live speech on top of audio that's already
        // audible -- that produced both voices overlapping at once. Also
        // guarded on `isCurrent()`: if THIS audio was already superseded
        // by a newer speakIndex call (e.g. play() got aborted by a
        // same-tick cancelPlayback() from a second, bubbled click), its
        // rejected play() promise must not fall back to live speech on
        // top of whatever the newer call is now playing.
        audio.onerror = function () { if (isCurrent() && !started) { audio.pause(); speakLive(i, el); } };
        audio.play().then(markStarted).catch(function () { if (isCurrent() && !started) { audio.pause(); speakLive(i, el); } });
      } else {
        speakLive(i, el);
      }
    }

    function play() {
      if (queue.length === 0) buildQueue();
      if (queue.length === 0) return;
      playing = true;
      paintPlayBtn();
      cancelPlayback();
      speakIndex(Math.max(currentIndex, 0));
    }

    function pause() {
      playing = false;
      cancelPlayback();
      paintPlayBtn();
    }

    function stop() {
      playing = false;
      cancelPlayback();
      clearHighlight();
      currentIndex = -1;
      paintPlayBtn();
    }

    playBtn.addEventListener("click", function () {
      if (playing) pause(); else play();
    });
    stopBtn.addEventListener("click", stop);
    prevBtn.addEventListener("click", function () {
      jumpTo(Math.max((currentIndex < 0 ? 0 : currentIndex) - 1, 0));
    });
    nextBtn.addEventListener("click", function () {
      jumpTo(Math.min((currentIndex < 0 ? -1 : currentIndex) + 1, queue.length - 1));
    });
    rateBtn.addEventListener("click", function () {
      rateIdx = (rateIdx + 1) % RATES.length;
      rateBtn.textContent = RATES[rateIdx] + "x";
      if (playing) { cancelPlayback(); speakIndex(currentIndex); }
    });

    window.addEventListener("pagehide", cancelPlayback);

    buildQueue();
    wireClickToJump();

    // Tooling hook for the pre-rendered-audio generation pipeline (see
    // feedback_guides_page memory) -- lets a one-off script extract the
    // exact same queue/normalized text a live page would speak, so
    // pre-rendered audio matches word-for-word. Not used by the page itself.
    window.__ttsDebug = { queue: queue, speakableText: speakableText, spokenTextOf: spokenTextOf };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

// Cloud sync bootstrap (added 2026-07-10). Dynamically injects the Firebase
// SDK + firebase-config.js + cloud-sync.js, in that order, on every page --
// same zero-per-page-HTML-edit rollout as the calculator widget, since this
// is the one file every page already loads. All the actual auth/sync logic
// lives in cloud-sync.js, kept out of this already-large file. The relative
// path prefix ("../" on subfolder pages, "" at the repo root) is derived
// from this same script's own <script src> rather than hardcoded, so it
// resolves correctly regardless of page depth or hosting subpath.
(function () {
  var thisScript = document.querySelector('script[src$="theme.js"]');
  var base = thisScript ? thisScript.getAttribute("src").replace(/theme\.js$/, "") : "";
  var FIREBASE_VERSION = "10.14.1";
  var CDN = "https://www.gstatic.com/firebasejs/" + FIREBASE_VERSION + "/";

  function loadScript(src, onload) {
    var s = document.createElement("script");
    s.src = src;
    if (onload) s.onload = onload;
    s.onerror = function () { /* offline / blocked -- site stays fully local-only, no error surfaced */ };
    document.head.appendChild(s);
  }

  function startFirebaseChain() {
    loadScript(CDN + "firebase-app-compat.js", function () {
      // auth-compat and firestore-compat each independently extend the
      // global `firebase` namespace (firebase.auth / firebase.firestore) --
      // both only need firebase-app-compat.js to have loaded first, not
      // each other, so loading them in parallel instead of nested/
      // sequential cuts one full network round-trip out of the chain
      // before anything downstream (config, cloud-sync, presence) can
      // start. Dynamically-created <script> tags execute in whichever
      // order they finish downloading, not insertion order, which is fine
      // here since neither depends on the other's code having already run.
      var remaining = 2;
      function next() {
        remaining--;
        if (remaining > 0) return;
        loadScript(base + "firebase-config.js", function () {
          loadScript(base + "cloud-sync.js", function () {
            // presence.js (added 2026-07-14): "who's studying now" on guide
            // pages. Waits for cloud-sync.js's firebaseReady signal itself
            // (see that file's header comment), so chaining it after
            // cloud-sync.js here is only to keep load order predictable,
            // not a hard dependency -- it no-ops instantly on any page
            // without a .guide-back-bar.
            loadScript(base + "presence.js");
          });
        });
      }
      loadScript(CDN + "firebase-auth-compat.js", next);
      loadScript(CDN + "firebase-firestore-compat.js", next);
    });
  }

  // Cloud sync / presence are background enhancements -- nothing on the
  // page needs them to already be usable/readable. Deferring the whole
  // chain's *start* until the browser reports idle time (falling back to a
  // short timeout on Safari, which doesn't implement requestIdleCallback)
  // keeps six-plus network requests from competing with the page's own
  // critical-path rendering, which matters most on a guide with a lot of
  // embedded content still settling right after load.
  var deferIdle = window.requestIdleCallback || function (fn) { setTimeout(fn, 300); };
  deferIdle(startFirebaseChain, { timeout: 2000 });
})();

// Guide text highlighting (added 2026-07-10). Select text anywhere inside a
// guide's .wrap[data-readable] and a small color-swatch toolbar appears;
// picking a color wraps the selection in <mark class="user-hl-COLOR">,
// clicking an existing highlight removes it. Persisted per-guide to
// localStorage, keyed by a stable index into the same "reading unit"
// elements the read-aloud engine above already walks (a separate constant
// here, not shared, since it lives in a different IIFE/closure -- if a
// future guide's caption/callout markup needs new classes in the read-aloud
// engine's UNIT_SELECTOR, add them here too so highlighting covers the same
// elements). Runs independently of read-aloud/speechSynthesis support (that
// module bails out entirely without it; highlighting shouldn't) -- gated on
// .guide-back-bar (present on every guide, read-aloud or not) rather than
// .wrap[data-readable], since that attribute is opt-in per guide (the
// Hormones reference guide deliberately doesn't have it, being a table
// guide with nothing to narrate) and highlighting has no such prerequisite.
(function () {
  if (!document.querySelector(".guide-back-bar")) return;
  // `document.querySelector(".wrap")` (no scoping) grabs the FIRST match
  // in the whole document -- on the redesigned Anatomy Exam 3 guide, that's
  // a small, unrelated `.wrap` reused as a max-width helper INSIDE the
  // masthead header (a coincidental class-name collision, see
  // feedback_guide_highlighting_ux memory), not the real content container.
  // That silently scoped the entire highlighting feature to a tiny header
  // div with almost no text in it -- selecting real guide content then
  // found no unit at all (`findUnit` walks up looking for `data-hl-idx`
  // until it hits `wrap`, but real content isn't even a descendant of the
  // wrong `wrap`), so highlighting looked completely broken with zero
  // feedback. Every guide's real content wrap is a direct child of <body>
  // by convention (same assumption theme.css's dark-mode invert rule makes
  // via `body > .wrap`) -- match that specifically, falling back to the
  // old unscoped lookup only if no guide follows that convention.
  var wrap = document.querySelector("body > .wrap") || document.querySelector(".wrap");
  if (!wrap) return;

  var HL_UNIT_SELECTOR = "p, li, .cap, .figcap, .callout, td, .io, .io-head, .io-h";
  var HL_KEY = "guideHl:" + location.pathname;
  var COLORS = ["yellow", "green", "pink", "blue"];

  // Same containment fix as the read-aloud engine's buildQueue() above --
  // some guides reuse `.io` as a wrapping box around its own `<p>`/`<li>`
  // children (see the read-aloud comment for the full story). Without this,
  // a selection landing on the wrapper itself (rather than its more-specific
  // child) would try to store an offset against the WRONG unit -- the
  // wrapper's un-spaced, concatenated textContent -- silently producing a
  // highlight in the wrong place or none at all.
  var allMatches = Array.prototype.slice.call(wrap.querySelectorAll(HL_UNIT_SELECTOR));
  var units = allMatches.filter(function (el) {
    for (var i = 0; i < allMatches.length; i++) {
      if (allMatches[i] !== el && el.contains(allMatches[i])) return false;
    }
    return true;
  });
  units.forEach(function (u, i) { u.setAttribute("data-hl-idx", i); });

  // Character offset of (node, offset) relative to the full plain text of
  // `unit`. A Range boundary point isn't always (textNode, charIndex) --
  // triple-click-to-select-a-paragraph and selections starting/ending
  // exactly at an element edge (e.g. right before an <em>) instead give
  // (elementNode, childIndex). Manually walking text nodes and comparing
  // node identity misses that second case entirely (silently returns the
  // unit's full length instead of the intended position -- confirmed via a
  // real selectNodeContents()-based test producing a zero-width "highlight"
  // at the very end of the text instead of spanning it). Building a
  // measuring range from the unit's start to this exact boundary point and
  // reading its resolved .toString().length sidesteps the whole problem --
  // Range already knows how to turn either representation into text
  // correctly, so this function doesn't need its own case-handling for it.
  function textOffset(unit, node, offset) {
    var measuring = document.createRange();
    measuring.setStart(unit, 0);
    measuring.setEnd(node, offset);
    return measuring.toString().length;
  }

  // Inverse of textOffset: build a Range for [start, end) plain-text
  // offsets within `unit`. Returns null if the offsets no longer fit inside
  // the unit's current text (e.g. the guide's own content was edited since
  // this highlight was saved) -- callers must skip gracefully, not throw.
  function rangeFromOffsets(unit, start, end) {
    var walker = document.createTreeWalker(unit, NodeFilter.SHOW_TEXT, null);
    var total = 0, n, range = document.createRange();
    var startSet = false, endSet = false;
    while ((n = walker.nextNode())) {
      var len = n.textContent.length;
      if (!startSet && total + len >= start) { range.setStart(n, start - total); startSet = true; }
      if (!endSet && total + len >= end) { range.setEnd(n, end - total); endSet = true; break; }
      total += len;
    }
    return (startSet && endSet) ? range : null;
  }

  function findUnit(node) {
    var el = node.nodeType === 3 ? node.parentElement : node;
    while (el && el !== wrap) {
      if (el.hasAttribute && el.hasAttribute("data-hl-idx")) return el;
      el = el.parentElement;
    }
    return null;
  }

  function loadHighlights() {
    try { return JSON.parse(localStorage.getItem(HL_KEY)) || []; } catch (e) { return []; }
  }
  function saveHighlights(list) { localStorage.setItem(HL_KEY, JSON.stringify(list)); }

  function removeHighlight(mark, idx, start, end) {
    var parent = mark.parentNode;
    while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
    parent.removeChild(mark);
    parent.normalize();
    saveHighlights(loadHighlights().filter(function (h) {
      return !(h.idx === idx && h.start === start && h.end === end);
    }));
    if (sharedHl.enabled && sharedHl.uid) sharedHl.deleteDoc(idx, start, end);
  }

  function updateHighlightNote(idx, start, end, note) {
    var list = loadHighlights();
    list.forEach(function (h) {
      if (h.idx === idx && h.start === start && h.end === end) h.note = note;
    });
    saveHighlights(list);
  }

  function updateHighlightColor(idx, start, end, color) {
    var list = loadHighlights();
    list.forEach(function (h) {
      if (h.idx === idx && h.start === start && h.end === end) h.color = color;
    });
    saveHighlights(list);
  }

  // Keep a floating panel/popover inside the viewport rather than letting it
  // render partly (or entirely) off-screen -- the previous left-only clamp
  // (Math.max(8, ...)) never handled the right/top/bottom edges, which a
  // selection near any of those edges would hit. Called after the element
  // is appended (so its real rendered size via getBoundingClientRect is
  // known) with the *desired* top/left already set; nudges them back into
  // bounds if needed.
  function clampToViewport(el) {
    var pad = 8;
    var rect = el.getBoundingClientRect();
    var left = rect.left, top = rect.top;
    if (rect.right > window.innerWidth - pad) left -= (rect.right - (window.innerWidth - pad));
    if (left < pad) left = pad;
    if (rect.bottom > window.innerHeight - pad) top -= (rect.bottom - (window.innerHeight - pad));
    if (top < pad) top = pad;
    el.style.left = (left + window.scrollX) + "px";
    el.style.top = (top + window.scrollY) + "px";
  }

  // note indicator is CSS-only (mark.has-note::after, see theme.css) rather
  // than an inserted child node -- an inserted node would become part of
  // the mark's textContent, which would then get re-extracted into the
  // highlight itself on any future edit and permanently bake the indicator
  // glyph into the "highlighted text," plus it'd shift every future
  // textOffset() computation inside this unit. Setting a class + native
  // title tooltip touches neither.
  // A drag-selection landing mid-word (e.g. dragging from the middle of
  // "hepatocyte" to the middle of the next word) used to save exactly that
  // partial-word range. mark.user-hl's own padding/border-radius (theme.css)
  // then puts a visible color-block edge right in the middle of the word --
  // reads as if the word had been split into two separate words with a gap
  // between them, even though no actual space character is there. Widening
  // the saved range out to the nearest non-word character on each side
  // (only when that side actually starts/ends mid-word -- a selection that
  // already lands on a real boundary is left untouched) makes that
  // particular visual glitch impossible instead of just narrower.
  function isWordChar(ch) { return !!ch && /[A-Za-z0-9'’-]/.test(ch); }
  function snapToWordBoundaries(unit, start, end) {
    var text = unit.textContent;
    if (isWordChar(text[start])) {
      while (start > 0 && isWordChar(text[start - 1])) start--;
    }
    if (isWordChar(text[end - 1])) {
      while (end < text.length && isWordChar(text[end])) end++;
    }
    return { start: start, end: end };
  }

  function applyHighlight(unit, start, end, color, persist, note) {
    note = note || "";
    var range = rangeFromOffsets(unit, start, end);
    if (!range) return null;
    var mark = document.createElement("mark");
    mark.className = "user-hl user-hl-" + color;
    var idx = Number(unit.getAttribute("data-hl-idx"));
    try {
      var content = range.extractContents();
      mark.appendChild(content);
      range.insertNode(mark);
    } catch (e) { return null; }
    setMarkNote(mark, note);
    mark.addEventListener("click", function (e) {
      e.stopPropagation(); // don't also trigger the unit's click-to-jump handler
      openNotePopover(mark, idx, start, end);
    });
    if (persist) {
      var list = loadHighlights();
      list.push({ idx: idx, start: start, end: end, color: color, note: note });
      saveHighlights(list);
      // Only a genuinely new, user-just-made highlight (persist=true) is
      // pushed out -- NOT the persist=false calls that replay already-saved
      // highlights back onto the page on load, which would otherwise
      // re-write every single one to Firestore on every page view for no
      // reason. Position only (idx/start/end); color and note never leave
      // this device -- see sharedHl below and firestore.rules.
      if (sharedHl.enabled && sharedHl.uid) sharedHl.pushDoc(idx, start, end);
    }
    return mark;
  }

  function setMarkNote(mark, note) {
    mark.dataset.note = note;
    mark.classList.toggle("has-note", !!note);
    mark.title = note ? note : "Click to add a note or remove this highlight";
  }

  // Restore saved highlights. Grouped by unit and applied in descending
  // start-offset order within each unit, so applying an earlier highlight
  // never shifts the DOM structure a later-in-list (but earlier-in-text)
  // one still needs to walk to compute its own range.
  var byUnit = {};
  loadHighlights().forEach(function (h) { (byUnit[h.idx] = byUnit[h.idx] || []).push(h); });
  Object.keys(byUnit).forEach(function (idxStr) {
    var unit = units[Number(idxStr)];
    if (!unit) return; // guide content changed since this was saved -- skip, don't crash
    byUnit[idxStr]
      .slice()
      .sort(function (a, b) { return b.start - a.start; })
      .forEach(function (h) { applyHighlight(unit, h.start, h.end, h.color, false, h.note); });
  });

  var notePopover = null;
  function hideNotePopover() { if (notePopover) { notePopover.remove(); notePopover = null; } }
  function openNotePopover(mark, idx, start, end) {
    hideToolbar();
    hideNotePopover();
    var rect = mark.getBoundingClientRect();
    notePopover = document.createElement("div");
    notePopover.className = "hl-note-popover";
    notePopover.style.top = (rect.bottom + window.scrollY + 6) + "px";
    notePopover.style.left = Math.max(8, rect.left + window.scrollX) + "px";

    // Recolor without deleting and reapplying -- swap the mark's own
    // user-hl-COLOR class and persist it. The currently-applied color gets
    // a visible ring so it reads as "this one's already selected."
    var colorRow = document.createElement("div");
    colorRow.className = "hl-note-colors";
    COLORS.forEach(function (color) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "hl-swatch hl-swatch-" + color;
      b.setAttribute("aria-label", "Change to " + color);
      var currentColor = (mark.className.match(/user-hl-(\w+)/) || [])[1];
      if (color === currentColor) b.classList.add("hl-swatch-current");
      b.addEventListener("mousedown", function (e) {
        e.preventDefault();
        e.stopPropagation();
        mark.className = "user-hl user-hl-" + color + (mark.classList.contains("has-note") ? " has-note" : "");
        updateHighlightColor(idx, start, end, color);
        colorRow.querySelectorAll(".hl-swatch").forEach(function (sw) { sw.classList.remove("hl-swatch-current"); });
        b.classList.add("hl-swatch-current");
      });
      colorRow.appendChild(b);
    });
    notePopover.appendChild(colorRow);

    var textarea = document.createElement("textarea");
    textarea.className = "hl-note-textarea";
    textarea.placeholder = "Add a note about this passage… (⌘/Ctrl+Enter to save)";
    textarea.value = mark.dataset.note || "";
    notePopover.appendChild(textarea);

    var row = document.createElement("div");
    row.className = "hl-note-row";

    var removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "hl-note-btn hl-note-remove";
    removeBtn.textContent = "Remove highlight";
    removeBtn.addEventListener("click", function () {
      removeHighlight(mark, idx, start, end);
      hideNotePopover();
    });

    function save() {
      var note = textarea.value.trim();
      setMarkNote(mark, note);
      updateHighlightNote(idx, start, end, note);
      hideNotePopover();
    }
    var saveBtn = document.createElement("button");
    saveBtn.type = "button";
    saveBtn.className = "hl-note-btn hl-note-save";
    saveBtn.textContent = "Save note";
    saveBtn.addEventListener("click", save);
    textarea.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") { e.preventDefault(); save(); }
    });

    row.appendChild(removeBtn);
    row.appendChild(saveBtn);
    notePopover.appendChild(row);
    document.body.appendChild(notePopover);
    clampToViewport(notePopover);
    textarea.focus();
  }

  var toolbar = null;
  function hideToolbar() { if (toolbar) { toolbar.remove(); toolbar = null; } }
  function showToolbar(range, unit) {
    hideToolbar();
    var rect = range.getBoundingClientRect();
    toolbar = document.createElement("div");
    toolbar.className = "hl-toolbar";
    toolbar.style.top = (rect.top + window.scrollY - 40) + "px";
    toolbar.style.left = Math.max(8, rect.left + window.scrollX) + "px";
    COLORS.forEach(function (color) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "hl-swatch hl-swatch-" + color;
      b.setAttribute("aria-label", "Highlight " + color);
      b.addEventListener("mousedown", function (e) {
        e.preventDefault(); // keep the text selection alive through this click
        // Also stop this mousedown from reaching the document-level listener
        // below -- that listener closes notePopover on any outside click,
        // and without this it would fire (bubbled from this very click)
        // immediately after openNotePopover() runs a few lines down,
        // destroying the popover in the same gesture that created it.
        e.stopPropagation();
        var start = textOffset(unit, range.startContainer, range.startOffset);
        var end = textOffset(unit, range.endContainer, range.endOffset);
        var snapped = snapToWordBoundaries(unit, start, end);
        start = snapped.start;
        end = snapped.end;
        var idx = Number(unit.getAttribute("data-hl-idx"));
        var mark = applyHighlight(unit, start, end, color, true);
        window.getSelection().removeAllRanges();
        hideToolbar();
        // Prompt for an optional note right away -- annotating is meant to
        // feel like one continuous motion with highlighting, not a separate
        // step you have to remember to come back for. Clicking away (the
        // existing document-level mousedown handler below) leaves the
        // highlight in place with no note, same as always.
        if (mark) openNotePopover(mark, idx, start, end);
      });
      toolbar.appendChild(b);
    });
    document.body.appendChild(toolbar);
    clampToViewport(toolbar);
  }

  document.addEventListener("mouseup", function (e) {
    if (toolbar && toolbar.contains(e.target)) return;
    var sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) { hideToolbar(); return; }
    var range = sel.getRangeAt(0);
    if (!wrap.contains(range.commonAncestorContainer)) { hideToolbar(); return; }
    var startUnit = findUnit(range.startContainer);
    var endUnit = findUnit(range.endContainer);
    if (!startUnit || startUnit !== endUnit) {
      // Highlights are stored as a single unit + character offsets, so a
      // selection spanning two different paragraphs/list items has nowhere
      // valid to be saved -- this used to fail completely silently, which
      // in a guide with lots of short adjacent <li>s (easy to accidentally
      // drag a selection across one without meaning to) reads as
      // "highlighting is just broken" rather than "select within one
      // paragraph at a time." A real selection attempt (non-empty, inside
      // the guide) always deserves feedback even when nothing can be saved.
      hideToolbar();
      if (window.showToast) window.showToast("Select text within a single paragraph or list item to highlight it");
      return;
    }
    var commonEl = range.commonAncestorContainer.nodeType === 3
      ? range.commonAncestorContainer.parentElement
      : range.commonAncestorContainer;
    if (commonEl.closest && commonEl.closest("mark.user-hl")) { hideToolbar(); return; } // avoid nested highlights
    showToolbar(range, startUnit);
  });
  document.addEventListener("mousedown", function (e) {
    if (toolbar && !toolbar.contains(e.target)) hideToolbar();
    if (notePopover && !notePopover.contains(e.target)) hideNotePopover();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { hideToolbar(); hideNotePopover(); closeHlPanel(); }
  });

  // "Your highlights" review panel -- without this, a highlight/note is
  // effectively write-only: the only way to ever see it again is to
  // scroll back through the whole guide looking for colored marks. Reads
  // straight from the live <mark> elements in the DOM (not a separately
  // maintained list) so it can never drift out of sync with what's
  // actually on the page.
  var hlPanelOverlay = null;
  function closeHlPanel() { if (hlPanelOverlay) { hlPanelOverlay.remove(); hlPanelOverlay = null; } }
  function openHlPanel() {
    closeHlPanel();
    hideToolbar();
    hideNotePopover();
    var marks = Array.prototype.slice.call(wrap.querySelectorAll("mark.user-hl"));

    hlPanelOverlay = document.createElement("div");
    hlPanelOverlay.className = "hl-panel-overlay open";
    hlPanelOverlay.addEventListener("mousedown", function (e) {
      if (e.target === hlPanelOverlay) closeHlPanel();
    });

    var panel = document.createElement("div");
    panel.className = "hl-panel";

    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "hl-panel-close";
    closeBtn.setAttribute("aria-label", "Close");
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener("click", closeHlPanel);
    panel.appendChild(closeBtn);

    var heading = document.createElement("h3");
    heading.textContent = "Your highlights" + (marks.length ? " (" + marks.length + ")" : "");
    panel.appendChild(heading);

    if (marks.length === 0) {
      var empty = document.createElement("p");
      empty.className = "hl-panel-empty";
      empty.textContent = "No highlights yet — select any text in this guide to add one.";
      panel.appendChild(empty);
    } else {
      var list = document.createElement("div");
      list.className = "hl-panel-list";
      marks.forEach(function (mark) {
        var item = document.createElement("div");
        item.className = "hl-panel-item";

        var color = (mark.className.match(/user-hl-(\w+)/) || [])[1] || "yellow";
        var swatch = document.createElement("span");
        swatch.className = "hl-panel-swatch hl-swatch-" + color;
        item.appendChild(swatch);

        var textWrap = document.createElement("div");
        textWrap.className = "hl-panel-text";
        var excerpt = document.createElement("p");
        excerpt.className = "hl-panel-excerpt";
        excerpt.textContent = "“" + mark.textContent.trim() + "”";
        textWrap.appendChild(excerpt);
        if (mark.dataset.note) {
          var note = document.createElement("p");
          note.className = "hl-panel-note";
          note.textContent = mark.dataset.note;
          textWrap.appendChild(note);
        }
        item.appendChild(textWrap);

        var actions = document.createElement("div");
        actions.className = "hl-panel-actions";

        var jumpBtn = document.createElement("button");
        jumpBtn.type = "button";
        jumpBtn.className = "hl-panel-jump";
        jumpBtn.textContent = "Jump to";
        jumpBtn.addEventListener("click", function () {
          closeHlPanel();
          mark.scrollIntoView({ behavior: "smooth", block: "center" });
          mark.classList.add("hl-flash");
          setTimeout(function () { mark.classList.remove("hl-flash"); }, 1600);
        });

        var delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "hl-panel-delete";
        delBtn.setAttribute("aria-label", "Delete this highlight");
        delBtn.innerHTML = "&times;";
        delBtn.addEventListener("click", function () {
          // Recompute (idx, start, end) fresh from the mark's own current
          // DOM position rather than needing a closure carried from
          // creation time -- self-verifying against actual state, and
          // works identically whether the mark was just created or
          // restored from localStorage on page load.
          var unit = findUnit(mark);
          if (!unit) return;
          var idx = Number(unit.getAttribute("data-hl-idx"));
          var start = textOffset(unit, mark, 0);
          var end = start + mark.textContent.length;
          removeHighlight(mark, idx, start, end);
          openHlPanel(); // simplest correct way to reflect the removal + updated count
        });

        actions.appendChild(jumpBtn);
        actions.appendChild(delBtn);
        item.appendChild(actions);
        list.appendChild(item);
      });
      panel.appendChild(list);
    }

    hlPanelOverlay.appendChild(panel);
    document.body.appendChild(hlPanelOverlay);
  }

  // In-guide search. Lives in this same closure (rather than a separate
  // IIFE) purely to reuse `wrap` -- otherwise unrelated to highlighting.
  // Walks every text node under `wrap` (not the highlight engine's `units`
  // list) because search needs to find matches inside table cells, IO-nav
  // pill labels, chip letters, everything -- not just the paragraph/list
  // granularity highlighting cares about. On the tabbed Anatomy Exam 3
  // guide, `.subj-panel`s the user hasn't clicked into are `display:none`
  // but still fully present in the DOM, so their text is found same as any
  // other guide's -- jumping to a match there re-uses the guide's own
  // `.subj-tab` click handler (see inline <script> at the bottom of that
  // file) to activate the right panel before scrolling, rather than
  // duplicating that panel-switching logic here.
  var searchMarks = [];
  var searchIndex = -1;

  function clearSearchMarks() {
    searchMarks.forEach(function (mark) {
      if (!mark.parentNode) return;
      var parent = mark.parentNode;
      while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
      parent.removeChild(mark);
      parent.normalize();
    });
    searchMarks = [];
    searchIndex = -1;
  }

  function runSearch(query) {
    clearSearchMarks();
    var q = query.trim().toLowerCase();
    if (q.length < 2) { updateSearchCount(); return; }

    // Collect text nodes first, then mutate -- splicing marks into the DOM
    // while a TreeWalker is still mid-walk over it is exactly the kind of
    // live-mutation-during-traversal bug that produces skipped/duplicated
    // nodes, so every node is gathered up front and only touched after.
    var walker = document.createTreeWalker(wrap, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        return node.nodeValue && node.nodeValue.toLowerCase().indexOf(q) !== -1
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      }
    });
    var textNodes = [];
    var n;
    while ((n = walker.nextNode())) textNodes.push(n);

    textNodes.forEach(function (node) {
      var text = node.nodeValue;
      var lower = text.toLowerCase();
      var frag = document.createDocumentFragment();
      var lastEnd = 0, pos;
      while ((pos = lower.indexOf(q, lastEnd)) !== -1) {
        if (pos > lastEnd) frag.appendChild(document.createTextNode(text.slice(lastEnd, pos)));
        var mark = document.createElement("mark");
        mark.className = "search-hit";
        mark.textContent = text.slice(pos, pos + q.length);
        frag.appendChild(mark);
        searchMarks.push(mark);
        lastEnd = pos + q.length;
      }
      if (lastEnd < text.length) frag.appendChild(document.createTextNode(text.slice(lastEnd)));
      node.parentNode.replaceChild(frag, node);
    });

    if (searchMarks.length) goToSearchMatch(0);
    else updateSearchCount();
  }

  function goToSearchMatch(i) {
    if (!searchMarks.length) return;
    if (searchIndex >= 0 && searchMarks[searchIndex]) {
      searchMarks[searchIndex].classList.remove("search-hit-current");
    }
    searchIndex = (i + searchMarks.length) % searchMarks.length;
    var mark = searchMarks[searchIndex];
    mark.classList.add("search-hit-current");

    var panel = mark.closest(".subj-panel");
    if (panel && !panel.classList.contains("active")) {
      var subj = panel.getAttribute("data-subj");
      var tab = Array.prototype.filter.call(
        document.querySelectorAll(".subj-tab"),
        function (t) { return t.dataset.subj === subj; }
      )[0];
      if (tab) tab.click();
    }

    mark.scrollIntoView({ behavior: "smooth", block: "center" });
    updateSearchCount();
  }

  var searchCountEl = null;
  function updateSearchCount() {
    if (!searchCountEl) return;
    searchCountEl.textContent = searchMarks.length
      ? (searchIndex + 1) + " / " + searchMarks.length
      : "0 / 0";
  }

  function initGuideSearch() {
    var backBar = document.querySelector(".guide-back-bar");
    if (!backBar || !backBar.parentNode) return null;

    var bar = document.createElement("div");
    bar.className = "guide-search-bar";
    bar.id = "guide-search-bar";
    bar.innerHTML =
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex:0 0 auto;opacity:.55"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
      '<input type="text" class="guide-search-input" id="guide-search-input" placeholder="Search this guide…" autocomplete="off">' +
      '<span class="guide-search-count" id="guide-search-count"></span>' +
      '<button type="button" class="guide-search-nav" id="guide-search-prev" aria-label="Previous match" title="Previous match (Shift+Enter)">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>' +
      '</button>' +
      '<button type="button" class="guide-search-nav" id="guide-search-next" aria-label="Next match" title="Next match (Enter)">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>' +
      '</button>' +
      '<button type="button" class="guide-search-close" id="guide-search-close" aria-label="Close search">&times;</button>';
    backBar.parentNode.insertBefore(bar, backBar.nextSibling);

    var input = bar.querySelector("#guide-search-input");
    searchCountEl = bar.querySelector("#guide-search-count");
    var prevBtn = bar.querySelector("#guide-search-prev");
    var nextBtn = bar.querySelector("#guide-search-next");
    var closeBtn = bar.querySelector("#guide-search-close");

    var debounceTimer = null;
    input.addEventListener("input", function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () { runSearch(input.value); }, 150);
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        if (e.shiftKey) goToSearchMatch(searchIndex - 1);
        else goToSearchMatch(searchIndex + 1);
      } else if (e.key === "Escape") {
        close();
      }
    });
    prevBtn.addEventListener("click", function () { goToSearchMatch(searchIndex - 1); });
    nextBtn.addEventListener("click", function () { goToSearchMatch(searchIndex + 1); });
    closeBtn.addEventListener("click", close);

    function isOpen() { return bar.classList.contains("open"); }
    function open() {
      bar.classList.add("open");
      input.focus();
    }
    function close() {
      bar.classList.remove("open");
      input.value = "";
      clearSearchMarks();
      updateSearchCount();
    }
    function toggle() { if (isOpen()) close(); else open(); }

    // "/" opens search from anywhere on the guide, same convention as
    // GitHub/Slack -- guides have no other single-key shortcut to collide
    // with (that's quiz-only, gated behind #timerpill, which no guide has).
    // Guarded against firing while any text input/textarea already has
    // focus (typing "/" into the highlight note textarea, for instance)
    // so it only ever acts as a global shortcut, never hijacks real typing.
    document.addEventListener("keydown", function (e) {
      if (e.key !== "/" || isOpen()) return;
      var active = document.activeElement;
      if (active && /^(input|textarea)$/i.test(active.tagName)) return;
      e.preventDefault();
      open();
    });

    return { toggle: toggle };
  }

  var guideSearchHelp = initGuideSearch();

  // Shared highlights (opt-in, added 2026-07-14). Broadcasts each
  // highlight's POSITION ONLY (idx/start/end + owning uid) to
  // sharedHighlights/{guideId}/marks/{uid_idx_start_end} in Firestore --
  // never the color or note text, which stay local-only even when this is
  // on (see firestore.rules and feedback_presence memory for the full
  // design and why this needed its own opt-in toggle, unlike "who's
  // studying now" presence which is automatic). Renders other opted-in
  // signed-in students' shared marks as a distinct, read-only dotted
  // overlay (mark.shared-hl, theme.css) -- never your own, which already
  // render through the normal user-hl system above.
  //
  // `sharedHl` is a plain mutable object (not reassigned wholesale) so that
  // applyHighlight()/removeHighlight() above -- defined and potentially
  // *called* long before Firebase finishes loading -- can safely read
  // `sharedHl.enabled`/`sharedHl.uid` at call time without needing to know
  // whether boot() below has run yet; before boot() ever runs, `enabled`
  // is simply false and both calls are no-ops.
  var sharedHl = {
    enabled: false,
    uid: null,
    pushDoc: function () {},
    deleteDoc: function () {}
  };
  (function () {
    var guideId = encodeURIComponent(location.pathname);
    var sharedMarksByDocId = {}; // Firestore doc id -> rendered <mark> element, so a later snapshot can cleanly clear exactly these and nothing else
    var unsubscribe = null;
    var hintShown = localStorage.getItem("sharedHlHintShown") === "1";

    function isSharingEnabled() { return localStorage.getItem("shareHighlights") === "1"; }
    function markId(uid, idx, start, end) { return uid + "_" + idx + "_" + start + "_" + end; }

    function clearSharedMarks() {
      Object.keys(sharedMarksByDocId).forEach(function (id) {
        var mark = sharedMarksByDocId[id];
        if (!mark.parentNode) return;
        var parent = mark.parentNode;
        while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
        parent.removeChild(mark);
        parent.normalize();
      });
      sharedMarksByDocId = {};
    }

    function renderSharedDoc(doc, data) {
      var unit = units[data.idx];
      if (!unit) return; // guide content changed since this was shared -- skip, don't crash
      var range = rangeFromOffsets(unit, data.start, data.end);
      if (!range) return;
      var mark = document.createElement("mark");
      mark.className = "shared-hl";
      mark.title = "Also highlighted by another student";
      try {
        var content = range.extractContents();
        mark.appendChild(content);
        range.insertNode(mark);
      } catch (e) { return; }
      sharedMarksByDocId[doc.id] = mark;
    }

    function subscribe(db, uid) {
      unsubscribe = db.collection("sharedHighlights").doc(guideId).collection("marks").onSnapshot(function (snap) {
        clearSharedMarks();
        var any = false;
        snap.forEach(function (doc) {
          var data = doc.data();
          if (!data || data.uid === uid) return; // your own highlights already show via the local user-hl system
          renderSharedDoc(doc, data);
          any = true;
        });
        if (any && !hintShown) {
          hintShown = true;
          localStorage.setItem("sharedHlHintShown", "1");
          if (window.showToast) window.showToast("The dotted marks are highlights other students made on this guide.", 5500);
        }
      }, function () { /* permission-denied before Firestore rules are published, or offline -- just stay empty, same as presence.js */ });
    }

    function pushDoc(db, uid, idx, start, end) {
      db.collection("sharedHighlights").doc(guideId).collection("marks").doc(markId(uid, idx, start, end))
        .set({ idx: idx, start: start, end: end, uid: uid, updatedAt: firebase.firestore.FieldValue.serverTimestamp() })
        .catch(function () {});
    }
    function deleteDoc(db, uid, idx, start, end) {
      db.collection("sharedHighlights").doc(guideId).collection("marks").doc(markId(uid, idx, start, end)).delete().catch(function () {});
    }

    function applyState(db, user) {
      var wantsSharing = isSharingEnabled();
      var signedIn = user && !user.isAnonymous;
      if (unsubscribe) { unsubscribe(); unsubscribe = null; }
      clearSharedMarks();
      if (signedIn && wantsSharing) {
        var uid = user.uid;
        sharedHl.enabled = true;
        sharedHl.uid = uid;
        sharedHl.pushDoc = function (idx, start, end) { pushDoc(db, uid, idx, start, end); };
        sharedHl.deleteDoc = function (idx, start, end) { deleteDoc(db, uid, idx, start, end); };
        // Backfill: push every highlight already saved locally, so turning
        // the toggle on (or signing in while it's already on) shares
        // everything made before this exact moment too, not just future
        // ones. Cheap even for a guide with many highlights -- one small
        // write per highlight, throttled by nothing since this only runs
        // on an actual state transition, not on every page load.
        loadHighlights().forEach(function (h) { pushDoc(db, uid, h.idx, h.start, h.end); });
        subscribe(db, uid);
      } else {
        sharedHl.enabled = false;
        sharedHl.uid = null;
        sharedHl.pushDoc = function () {};
        sharedHl.deleteDoc = function () {};
      }
    }

    function boot() {
      var auth = firebase.auth();
      var db = firebase.firestore();
      auth.onAuthStateChanged(function (user) { applyState(db, user); });
      window.addEventListener("shareHighlightsChanged", function () { applyState(db, auth.currentUser); });
    }

    if (window.__firebaseReady) boot();
    else window.addEventListener("firebaseReady", boot, { once: true });
  })();

  // Appended into the existing corner-action button group (id set by the
  // separate corner-buttons IIFE above, which has already run and built it
  // by the time this one executes) rather than duplicating makeCornerBtn's
  // setup here -- same visual button, just added from a different closure.
  var cornerGroup = document.getElementById("corner-actions");
  if (cornerGroup) {
    if (guideSearchHelp) {
      var searchBtn = document.createElement("button");
      searchBtn.type = "button";
      searchBtn.id = "guide-search-btn";
      searchBtn.className = "corner-btn";
      searchBtn.setAttribute("aria-label", "Search this guide");
      searchBtn.title = "Search this guide (/)";
      searchBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
      searchBtn.addEventListener("click", guideSearchHelp.toggle);
      cornerGroup.appendChild(searchBtn);
    }

    var hlPanelBtn = document.createElement("button");
    hlPanelBtn.type = "button";
    hlPanelBtn.id = "hl-panel-btn";
    hlPanelBtn.className = "corner-btn";
    hlPanelBtn.setAttribute("aria-label", "Your highlights");
    hlPanelBtn.title = "Your highlights";
    hlPanelBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';
    hlPanelBtn.addEventListener("click", openHlPanel);
    cornerGroup.appendChild(hlPanelBtn);
  }
})();

// "Test yourself" quiz popup, generic/reusable across any page. Question
// data (title + 5ish {q, choices, correct, explain} objects) is supplied
// by the calling page -- this only owns the modal mechanics: render,
// instant per-question grading, running score, Esc/backdrop-click/X close.
window.openTestYourself = (function () {
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  return function openTestYourself(title, questions) {
    var overlay = el("div", "tq-overlay open");
    var panel = el("div", "tq-panel");

    var closeBtn = el("button", "tq-close", "×");
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Close");

    var heading = el("p", "tq-title", title);
    var scoreEl = el("p", "tq-score");
    var score = 0;
    function updateScore() { scoreEl.textContent = "Score: " + score + " / " + questions.length; }
    updateScore();

    panel.appendChild(closeBtn);
    panel.appendChild(heading);
    panel.appendChild(scoreEl);

    questions.forEach(function (q, qi) {
      var qDiv = el("div", "tq-q");
      qDiv.appendChild(el("p", "tq-qtext", (qi + 1) + ". " + q.q));
      var optsWrap = el("div", "tq-opts");
      var explainEl = el("p", "tq-explain hidden", q.explain || "");
      var answered = false;

      q.choices.forEach(function (choice, ci) {
        var btn = el("button", "tq-opt", choice);
        btn.type = "button";
        btn.addEventListener("click", function () {
          if (answered) return;
          answered = true;
          if (ci === q.correct) {
            btn.classList.add("tq-correct");
            score++;
          } else {
            btn.classList.add("tq-wrong");
            optsWrap.children[q.correct].classList.add("tq-correct");
          }
          Array.prototype.forEach.call(optsWrap.children, function (b) { b.disabled = true; });
          explainEl.classList.remove("hidden");
          updateScore();
        });
        optsWrap.appendChild(btn);
      });

      qDiv.appendChild(optsWrap);
      qDiv.appendChild(explainEl);
      panel.appendChild(qDiv);
    });

    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    function close() {
      overlay.remove();
      document.removeEventListener("keydown", onKey);
    }
    function onKey(e) {
      if (e.key === "Escape") close();
    }

    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
    document.addEventListener("keydown", onKey);
  };
})();

// Exam Mode's question-jump grid, shared across every quiz page rather than
// reimplemented per file (see feedback_exam_mode memory) -- a page supplies
// per-question state via getStatus(i) and jump/submit callbacks, this just
// renders the grid and wires clicks. Generic engine, page-specific data,
// same split as openTestYourself/SiteTour above.
window.openQuestionNav = (function () {
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  return function openQuestionNav(opts) {
    var overlay = el("div", "qnav-overlay open");
    var panel = el("div", "qnav-panel");

    var closeBtn = el("button", "tq-close", "×");
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Close");

    var heading = el("p", "tq-title", "Jump to question");
    var summary = el("p", "qnav-summary");

    panel.appendChild(closeBtn);
    panel.appendChild(heading);
    panel.appendChild(summary);

    var legend = el("div", "qnav-legend");
    legend.appendChild(el("span", "qnav-legend-item", "■ Answered"));
    legend.appendChild(el("span", "qnav-legend-item unanswered", "□ Unanswered"));
    legend.appendChild(el("span", "qnav-legend-item flagged", "⚑ Flagged"));
    panel.appendChild(legend);

    var grid = el("div", "qnav-grid");
    var buttons = [];
    for (var i = 0; i < opts.total; i++) {
      var b = el("button", "qnav-item", String(i + 1));
      b.type = "button";
      (function (idx) {
        b.addEventListener("click", function () { close(); opts.onJump(idx); });
      })(i);
      buttons.push(b);
      grid.appendChild(b);
    }
    panel.appendChild(grid);

    function paint() {
      var unanswered = 0, flagged = 0;
      for (var i = 0; i < opts.total; i++) {
        var st = opts.getStatus(i) || {};
        var cls = "qnav-item";
        if (i === opts.current) cls += " current";
        cls += st.answered ? " answered" : " unanswered";
        if (st.flagged) { cls += " flagged"; flagged++; }
        if (!st.answered) unanswered++;
        buttons[i].className = cls;
      }
      summary.textContent = unanswered + " unanswered, " + flagged + " flagged";
    }
    paint();

    var submitBtn = el("button", "btn qnav-submit", "Submit exam →");
    submitBtn.type = "button";
    submitBtn.addEventListener("click", function () { close(); opts.onSubmit(); });
    panel.appendChild(submitBtn);

    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    function close() {
      overlay.remove();
      document.removeEventListener("keydown", onKey);
    }
    function onKey(e) {
      if (e.key === "Escape") close();
    }

    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
    document.addEventListener("keydown", onKey);

    return { close: close };
  };
})();

// Shared toast (added 2026-07-10) -- generalizes the page-local
// showToast() index.html already had (mailto/install-prompt confirmations)
// so any page, quiz or otherwise, can call window.showToast() the same way.
window.showToast = function (message, duration) {
  duration = duration || 3000;
  var toast = document.getElementById("site-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "site-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  requestAnimationFrame(function () { toast.style.opacity = "1"; });
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(function () { toast.style.opacity = "0"; }, duration);
};

// In-quiz answer-streak feedback (added 2026-07-10). Each MCQ quiz family
// calls window.trackAnswerStreak(correct) as one line inside its own
// choose()-equivalent function, in the normal (non-Exam-Mode) branch only --
// showing "3 in a row!" mid-answer would contradict Exam Mode's whole
// no-feedback-until-submit premise, so callers gate this behind `!examMode`
// themselves rather than this function trying to detect that itself (exam
// mode's own variable name/scope differs slightly family to family).
// Deliberately in-memory only (module-level counter, not localStorage) --
// this is a light in-the-moment nudge for the current sitting, not a stat
// to persist or show elsewhere.
(function () {
  var streak = 0;
  var THRESHOLDS = [3, 5, 10, 15, 20, 25];
  window.trackAnswerStreak = function (correct) {
    if (!correct) { streak = 0; return; }
    streak++;
    if (THRESHOLDS.indexOf(streak) !== -1) {
      window.showToast(streak + " in a row! 🔥");
    } else if (streak > THRESHOLDS[THRESHOLDS.length - 1] && streak % 10 === 0) {
      window.showToast(streak + " in a row! 🔥");
    }
  };
})();

// Pause/Resume for timed quizzes (added 2026-07-10), same "generic engine,
// page supplies data" split as openQuestionNav/openTestYourself above. This
// only renders the full-screen "Paused" overlay and calls opts.onResume when
// the user clicks Resume -- it deliberately does NOT touch any timer state
// itself, since every quiz family's timerAccumMs/timerStartedAt/
// startTimerInterval/stopTimerInterval/saveProgress are page-local globals
// with no shared engine to hook into (see feedback_exam_mode memory). Each
// quiz's own pauseQuiz() is expected to freeze its timer (mirroring the same
// accumulate-on-pause pattern already used for tab-close/resume) and call
// saveProgress() itself, then call window.openPauseOverlay({onResume:...}),
// with onResume restarting the timer the same way resumeQuiz() already does.
window.openPauseOverlay = function (opts) {
  var overlay = document.createElement("div");
  overlay.className = "pause-overlay open";

  var card = document.createElement("div");
  card.className = "pause-card";
  card.innerHTML =
    '<p class="pause-title">Paused</p>' +
    '<p class="pause-text">Your progress and timer are frozen. Take your time — click Resume when you’re ready to continue.</p>';

  var resumeBtn = document.createElement("button");
  resumeBtn.type = "button";
  resumeBtn.className = "pause-resume-btn";
  resumeBtn.textContent = "Resume →";
  card.appendChild(resumeBtn);

  overlay.appendChild(card);
  document.body.appendChild(overlay);

  resumeBtn.addEventListener("click", function () {
    overlay.remove();
    if (opts && opts.onResume) opts.onResume();
  });
};

// Optional gamepad support (added 2026-07-13) -- lets a connected
// controller answer MCQ questions without ever touching the keyboard.
// Bridges gamepad buttons into synthetic keydown events on the SAME keys
// every quiz-engine family's own keyboard shortcuts already listen for
// (a/b/c/d to pick a choice, ArrowRight/Enter to advance, ArrowLeft to go
// back -- see feedback_new_exam_structure_match: "full keyboard navigation
// on every quiz" has been a standing feature since early in the site).
// That means this needs zero per-quiz changes and works identically across
// every family at once, the same "generic engine, page-specific data"
// split used elsewhere in this file -- except here the "page" is just
// whatever keyboard handler already exists.
(function () {
  if (!("getGamepads" in navigator)) return;

  // Standard gamepad mapping: 0-3 are the four face buttons (A/B/X/Y on
  // Xbox-style pads, Cross/Circle/Square/Triangle on PlayStation) -- mapped
  // left-to-right, top-to-bottom onto the on-screen A/B/C/D choice labels.
  var CHOICE_KEYS = { 0: "a", 1: "b", 2: "c", 3: "d" };
  // Right shoulder/trigger/Start advance; left shoulder/trigger goes back --
  // mirrors how a physical controller's "confirm" side is usually the right
  // hand and "cancel/back" the left.
  var NEXT_BUTTONS = [5, 7, 9];
  var PREV_BUTTONS = [4, 6];

  var prevPressed = {};
  var polling = false;

  function fireKey(key) {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: key, bubbles: true, cancelable: true }));
  }

  function pollGamepads() {
    var pads = navigator.getGamepads();
    var anyConnected = false;
    for (var p = 0; p < pads.length; p++) {
      var gp = pads[p];
      if (!gp) continue;
      anyConnected = true;
      var prev = prevPressed[gp.index] || {};
      var now = {};
      for (var i = 0; i < gp.buttons.length; i++) {
        var pressed = gp.buttons[i].pressed || gp.buttons[i].value > 0.5;
        now[i] = pressed;
        if (pressed && !prev[i]) {
          if (CHOICE_KEYS.hasOwnProperty(i)) fireKey(CHOICE_KEYS[i]);
          else if (NEXT_BUTTONS.indexOf(i) !== -1) fireKey("ArrowRight");
          else if (PREV_BUTTONS.indexOf(i) !== -1) fireKey("ArrowLeft");
        }
      }
      prevPressed[gp.index] = now;
    }
    if (anyConnected) requestAnimationFrame(pollGamepads);
    else polling = false;
  }

  window.addEventListener("gamepadconnected", function (e) {
    prevPressed[e.gamepad.index] = {};
    if (window.showToast) window.showToast("Controller connected 🎮 A/B/X/Y answers, RB/RT next, LB/LT back");
    if (!polling) { polling = true; requestAnimationFrame(pollGamepads); }
  });
  window.addEventListener("gamepaddisconnected", function (e) {
    delete prevPressed[e.gamepad.index];
  });
})();

// guide-ink.js bootstrap (added 2026-07-14) -- freehand stylus/Apple Pencil
// drawing layer for guides. Unlike cloud-sync.js's chain, this has no
// Firebase dependency at all (it just writes to localStorage, which
// cloud-sync.js picks up for free via its own Storage.prototype patch if
// that's already loaded) -- so it's injected directly, no waiting on
// anything. Gated on .guide-back-bar HERE (not just inside guide-ink.js
// itself) so the ~35 quiz pages and the homepage never even issue the
// network request for a file they'd immediately no-op on -- one less
// fetch in the critical path on every page that isn't a guide.
(function () {
  if (!document.querySelector(".guide-back-bar")) return;
  var thisScript = document.querySelector('script[src$="theme.js"]');
  var base = thisScript ? thisScript.getAttribute("src").replace(/theme\.js$/, "") : "";
  var s = document.createElement("script");
  s.src = base + "guide-ink.js";
  document.head.appendChild(s);
})();

// Seasonal snowfall (added 2026-07-16) -- December only. Lives here rather
// than in any one page's HTML so every current page picks it up for free
// and every future page does too, as long as it includes theme.js like the
// rest of the site. A plain canvas overlay, fixed to the viewport and
// pushed behind all real content with z-index:-1 -- the same technique
// index.html's own .edge-decor strips already use, just injected instead
// of hardcoded per page.
(function () {
  if (new Date().getMonth() !== 11) return;

  document.body.classList.add("xmas-theme");

  var canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:-1;";
  document.body.insertBefore(canvas, document.body.firstChild);
  var ctx = canvas.getContext("2d");

  var flakes = [];
  // Lighter on narrow/mobile viewports -- fewer flakes to redraw each
  // frame keeps this cheap on weaker mobile GPUs/CPUs.
  var density = window.innerWidth < 700 ? 45 : 90;
  var windStrength = 0.35;

  // Cursor tracking for the mouse-repel effect below. Listens on window
  // (not the canvas, which is pointer-events:none) so page UI on top of
  // the canvas still gets normal clicks/hovers.
  var mouseX = null, mouseY = null;
  var REPEL_RADIUS = 110;
  window.addEventListener("mousemove", function (e) { mouseX = e.clientX; mouseY = e.clientY; });
  window.addEventListener("mouseleave", function () { mouseX = null; mouseY = null; });
  window.addEventListener("touchmove", function (e) {
    if (e.touches.length) { mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY; }
  }, { passive: true });
  window.addEventListener("touchend", function () { mouseX = null; mouseY = null; });

  function resize() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  window.addEventListener("resize", resize);
  resize();

  function makeFlake(randomY) {
    var r = 1.7 + Math.random() * 3.4;
    return {
      x: Math.random() * window.innerWidth,
      y: randomY ? Math.random() * window.innerHeight : -10 - Math.random() * 40,
      r: r,
      speed: 0.5 + r * 0.45 + Math.random() * 0.4,
      drift: Math.random() * Math.PI * 2,
      driftSpeed: 0.005 + Math.random() * 0.01,
      opacity: 0.6 + Math.random() * 0.4,
      // Perturbation velocity from cursor repulsion, decays each frame so
      // a flake scatters on contact then settles back into its normal
      // drift/fall rather than staying permanently displaced.
      vx: 0,
      vy: 0
    };
  }
  for (var s = 0; s < density; s++) flakes.push(makeFlake(true));

  function step() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = "#ffffff";
    for (var i = 0; i < flakes.length; i++) {
      var f = flakes[i];

      if (mouseX !== null) {
        var dx = f.x - mouseX, dy = f.y - mouseY;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0.01) {
          var force = (1 - dist / REPEL_RADIUS) * 1.8;
          f.vx += (dx / dist) * force;
          f.vy += (dy / dist) * force;
        }
      }
      f.vx *= 0.9;
      f.vy *= 0.9;

      f.y += f.speed + f.vy;
      f.drift += f.driftSpeed;
      f.x += Math.sin(f.drift) * (windStrength * 1.6) + f.vx;
      if (f.y > window.innerHeight + 10) { flakes[i] = makeFlake(false); continue; }
      if (f.x < -10) f.x = window.innerWidth + 10;
      if (f.x > window.innerWidth + 10) f.x = -10;
      ctx.globalAlpha = f.opacity;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
})();

// Seasonal Valentine's theme (added 2026-07-17) -- two weeks before Feb 14
// through Feb 14 itself (Jan 31 - Feb 14). Same pattern as the December
// snow feature above: lives in theme.js (not any one page's HTML) so every
// current and future page gets it automatically. Floating hearts behind
// all UI (z-index:-1), plus a homepage-only light-mode pink tint gated on
// the same window via a body class, rather than a permanent theme.css
// color change.
(function () {
  var d = new Date();
  var m = d.getMonth(), day = d.getDate();
  var inWindow = (m === 0 && day === 31) || (m === 1 && day <= 14);
  if (!inWindow) return;

  document.body.classList.add("vday-theme");

  var canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:-1;";
  document.body.insertBefore(canvas, document.body.firstChild);
  var ctx = canvas.getContext("2d");

  var hearts = [];
  // Lighter on narrow/mobile viewports, same reasoning as the snow above.
  var density = window.innerWidth < 700 ? 18 : 34;
  var speedMul = 0.35;
  var COLORS = ["#ec4899", "#f472b6", "#f43f5e", "#fb7185", "#e11d48"];

  // Cursor tracking for the mouse-repel effect below. Listens on window
  // (not the canvas, which is pointer-events:none) so page UI on top of
  // the canvas still gets normal clicks/hovers.
  var mouseX = null, mouseY = null;
  var REPEL_RADIUS = 110;
  window.addEventListener("mousemove", function (e) { mouseX = e.clientX; mouseY = e.clientY; });
  window.addEventListener("mouseleave", function () { mouseX = null; mouseY = null; });
  window.addEventListener("touchmove", function (e) {
    if (e.touches.length) { mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY; }
  }, { passive: true });
  window.addEventListener("touchend", function () { mouseX = null; mouseY = null; });

  function resize() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  window.addEventListener("resize", resize);
  resize();

  function makeHeart(randomY) {
    var s = 6 + Math.random() * 9;
    return {
      x: Math.random() * window.innerWidth,
      y: randomY ? Math.random() * window.innerHeight : window.innerHeight + 10 + Math.random() * 40,
      s: s,
      speed: (0.35 + s * 0.045) * speedMul,
      drift: Math.random() * Math.PI * 2,
      driftSpeed: 0.006 + Math.random() * 0.012,
      opacity: 0.35 + Math.random() * 0.4,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      // Perturbation velocity from cursor repulsion, decays each frame so
      // a heart scatters on contact then settles back into its normal
      // drift/float rather than staying permanently displaced.
      vx: 0,
      vy: 0
    };
  }
  for (var hi = 0; hi < density; hi++) hearts.push(makeHeart(true));

  // Classic two-lobe heart silhouette (flat top notch, round lobes,
  // pointed bottom), drawn at (0,0) sized to `s`, transformed by the
  // caller via ctx.translate/rotate.
  function traceHeart(s) {
    var w = s * 1.8, h = s * 1.7;
    var top = h * 0.28;
    var mid = (h + top) / 2;
    ctx.beginPath();
    ctx.moveTo(0, top);
    ctx.bezierCurveTo(0, 0, -w / 2, 0, -w / 2, top);
    ctx.bezierCurveTo(-w / 2, mid, 0, mid, 0, h);
    ctx.bezierCurveTo(0, mid, w / 2, mid, w / 2, top);
    ctx.bezierCurveTo(w / 2, 0, 0, 0, 0, top);
    ctx.closePath();
  }

  function step() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = 0; i < hearts.length; i++) {
      var h = hearts[i];

      if (mouseX !== null) {
        var dx = h.x - mouseX, dy = h.y - mouseY;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0.01) {
          var force = (1 - dist / REPEL_RADIUS) * 1.8;
          h.vx += (dx / dist) * force;
          h.vy += (dy / dist) * force;
        }
      }
      h.vx *= 0.9;
      h.vy *= 0.9;

      h.y -= h.speed;
      h.y += h.vy;
      h.drift += h.driftSpeed;
      h.x += Math.sin(h.drift) * 0.6 + h.vx;
      var rot = Math.sin(h.drift) * 0.25;

      if (h.y < -20) { hearts[i] = makeHeart(false); continue; }
      if (h.x < -20) h.x = window.innerWidth + 20;
      if (h.x > window.innerWidth + 20) h.x = -20;

      ctx.save();
      ctx.translate(h.x, h.y);
      ctx.rotate(rot);
      ctx.globalAlpha = h.opacity;
      ctx.fillStyle = h.color;
      traceHeart(h.s);
      ctx.fill();
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
})();

// Seasonal Fall/Halloween theme (added 2026-07-17) -- Oct 17-31. Same
// pattern as the December snow / Valentine's hearts above: lives in
// theme.js so every current and future page gets it automatically.
// Tumbling autumn leaves behind all UI (z-index:-1), plus a homepage-only
// light-mode warm tint gated on the same window via a body class.
(function () {
  var d = new Date();
  var m = d.getMonth(), day = d.getDate();
  if (!(m === 9 && day >= 17 && day <= 31)) return;

  document.body.classList.add("fall-theme");

  var canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:-1;";
  document.body.insertBefore(canvas, document.body.firstChild);
  var ctx = canvas.getContext("2d");

  var leaves = [];
  var density = window.innerWidth < 700 ? 18 : 34;
  var speedMul = 0.35;
  var COLORS = ["#ea580c", "#c2410c", "#ca8a04", "#a16207", "#991b1b", "#b45309"];

  // Cursor tracking for the mouse-repel effect below. Listens on window
  // (not the canvas, which is pointer-events:none) so page UI on top of
  // the canvas still gets normal clicks/hovers.
  var mouseX = null, mouseY = null;
  var REPEL_RADIUS = 110;
  window.addEventListener("mousemove", function (e) { mouseX = e.clientX; mouseY = e.clientY; });
  window.addEventListener("mouseleave", function () { mouseX = null; mouseY = null; });
  window.addEventListener("touchmove", function (e) {
    if (e.touches.length) { mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY; }
  }, { passive: true });
  window.addEventListener("touchend", function () { mouseX = null; mouseY = null; });

  function resize() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  window.addEventListener("resize", resize);
  resize();

  function makeLeaf(randomY) {
    var s = 5 + Math.random() * 7;
    return {
      x: Math.random() * window.innerWidth,
      y: randomY ? Math.random() * window.innerHeight : -10 - Math.random() * 40,
      s: s,
      speed: (0.3 + s * 0.05) * speedMul,
      drift: Math.random() * Math.PI * 2,
      driftSpeed: 0.008 + Math.random() * 0.014,
      spin: Math.random() * Math.PI * 2,
      spinSpeed: (Math.random() - 0.5) * 0.04,
      opacity: 0.5 + Math.random() * 0.4,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      // Perturbation velocity from cursor repulsion, decays each frame so
      // a leaf scatters on contact then settles back into its normal
      // drift/fall rather than staying permanently displaced.
      vx: 0,
      vy: 0
    };
  }
  for (var li = 0; li < density; li++) leaves.push(makeLeaf(true));

  // Simple pointed leaf silhouette (two curves from tip to tip), drawn at
  // (0,0) sized to `s`, transformed by the caller via translate/rotate.
  function traceLeaf(s) {
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.quadraticCurveTo(s * 0.9, -s * 0.3, 0, s);
    ctx.quadraticCurveTo(-s * 0.9, -s * 0.3, 0, -s);
    ctx.closePath();
  }

  function step() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = 0; i < leaves.length; i++) {
      var l = leaves[i];

      if (mouseX !== null) {
        var dx = l.x - mouseX, dy = l.y - mouseY;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0.01) {
          var force = (1 - dist / REPEL_RADIUS) * 1.8;
          l.vx += (dx / dist) * force;
          l.vy += (dy / dist) * force;
          l.spinSpeed += (dx > 0 ? 1 : -1) * force * 0.01;
          if (l.spinSpeed > 0.12) l.spinSpeed = 0.12;
          if (l.spinSpeed < -0.12) l.spinSpeed = -0.12;
        }
      }
      l.vx *= 0.9;
      l.vy *= 0.9;

      l.y += l.speed + l.vy;
      l.drift += l.driftSpeed;
      l.spin += l.spinSpeed;
      l.x += Math.sin(l.drift) * 1.1 + l.vx;

      if (l.y > window.innerHeight + 20) { leaves[i] = makeLeaf(false); continue; }
      if (l.x < -20) l.x = window.innerWidth + 20;
      if (l.x > window.innerWidth + 20) l.x = -20;

      ctx.save();
      ctx.translate(l.x, l.y);
      ctx.rotate(l.spin);
      ctx.globalAlpha = l.opacity;
      ctx.fillStyle = l.color;
      traceLeaf(l.s);
      ctx.fill();
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
})();

// Seasonal St. Patrick's theme (added 2026-07-17) -- Mar 3-17. Same
// pattern as the seasonal features above: lives in theme.js so every
// current and future page gets it automatically. Falling four-leaf
// clovers behind all UI (z-index:-1), plus a homepage-only light-mode
// green tint gated on the same window via a body class.
(function () {
  var d = new Date();
  var m = d.getMonth(), day = d.getDate();
  if (!(m === 2 && day >= 3 && day <= 17)) return;

  document.body.classList.add("stpatricks-theme");

  var canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:-1;";
  document.body.insertBefore(canvas, document.body.firstChild);
  var ctx = canvas.getContext("2d");

  var clovers = [];
  var density = window.innerWidth < 700 ? 16 : 30;
  var speedMul = 0.35;
  var COLORS = ["#16a34a", "#22c55e", "#15803d", "#4ade80", "#166534"];

  // Cursor tracking for the mouse-repel effect below. Listens on window
  // (not the canvas, which is pointer-events:none) so page UI on top of
  // the canvas still gets normal clicks/hovers.
  var mouseX = null, mouseY = null;
  var REPEL_RADIUS = 110;
  window.addEventListener("mousemove", function (e) { mouseX = e.clientX; mouseY = e.clientY; });
  window.addEventListener("mouseleave", function () { mouseX = null; mouseY = null; });
  window.addEventListener("touchmove", function (e) {
    if (e.touches.length) { mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY; }
  }, { passive: true });
  window.addEventListener("touchend", function () { mouseX = null; mouseY = null; });

  function resize() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  window.addEventListener("resize", resize);
  resize();

  function makeClover(randomY) {
    var s = 5 + Math.random() * 7;
    return {
      x: Math.random() * window.innerWidth,
      y: randomY ? Math.random() * window.innerHeight : -10 - Math.random() * 40,
      s: s,
      speed: (0.3 + s * 0.05) * speedMul,
      drift: Math.random() * Math.PI * 2,
      driftSpeed: 0.008 + Math.random() * 0.014,
      spin: Math.random() * Math.PI * 2,
      spinSpeed: (Math.random() - 0.5) * 0.035,
      opacity: 0.4 + Math.random() * 0.4,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      // Perturbation velocity from cursor repulsion, decays each frame so
      // a clover scatters on contact then settles back into its normal
      // drift/fall rather than staying permanently displaced.
      vx: 0,
      vy: 0
    };
  }
  for (var ci = 0; ci < density; ci++) clovers.push(makeClover(true));

  // A single heart-shaped leaflet with its point at the local origin (0,0)
  // and its rounded lobes/notch extending outward in -y -- reusing the
  // same classic two-lobe bezier formula as the Valentine's heart, just
  // re-anchored so the tip (not the notch) sits at (0,0).
  function traceLeaflet(s) {
    var w = s * 1.45, h = s * 1.1;
    var top = h * 0.22;
    var mid = (h + top) / 2;
    ctx.moveTo(0, top - h);
    ctx.bezierCurveTo(0, -h, -w / 2, -h, -w / 2, top - h);
    ctx.bezierCurveTo(-w / 2, mid - h, 0, mid - h, 0, 0);
    ctx.bezierCurveTo(0, mid - h, w / 2, mid - h, w / 2, top - h);
    ctx.bezierCurveTo(w / 2, -h, 0, -h, 0, top - h);
  }

  // Four-leaf clover: four heart-shaped leaflets radiating from a shared
  // center point (tips touching in the middle, lobes pointing outward),
  // plus a short stem -- drawn at (0,0) sized to `s`, transformed by the
  // caller via translate/rotate.
  var CLOVER_ANGLES = [0, Math.PI / 2, Math.PI, Math.PI * 1.5];
  function traceClover(s) {
    ctx.beginPath();
    for (var i = 0; i < CLOVER_ANGLES.length; i++) {
      ctx.save();
      ctx.rotate(CLOVER_ANGLES[i]);
      traceLeaflet(s);
      ctx.restore();
    }
    ctx.closePath();
  }
  function strokeCloverStem(s) {
    ctx.beginPath();
    ctx.moveTo(0, s * 0.1);
    ctx.lineTo(0, s * 1.15);
    ctx.lineWidth = Math.max(1, s * 0.16);
    ctx.strokeStyle = "#14532d";
    ctx.stroke();
  }

  function step() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = 0; i < clovers.length; i++) {
      var c = clovers[i];

      if (mouseX !== null) {
        var dx = c.x - mouseX, dy = c.y - mouseY;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0.01) {
          var force = (1 - dist / REPEL_RADIUS) * 1.8;
          c.vx += (dx / dist) * force;
          c.vy += (dy / dist) * force;
          c.spinSpeed += (dx > 0 ? 1 : -1) * force * 0.01;
          if (c.spinSpeed > 0.12) c.spinSpeed = 0.12;
          if (c.spinSpeed < -0.12) c.spinSpeed = -0.12;
        }
      }
      c.vx *= 0.9;
      c.vy *= 0.9;

      c.y += c.speed + c.vy;
      c.drift += c.driftSpeed;
      c.spin += c.spinSpeed;
      c.x += Math.sin(c.drift) * 1.1 + c.vx;

      if (c.y > window.innerHeight + 20) { clovers[i] = makeClover(false); continue; }
      if (c.x < -20) c.x = window.innerWidth + 20;
      if (c.x > window.innerWidth + 20) c.x = -20;

      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.spin);
      ctx.globalAlpha = c.opacity;
      ctx.fillStyle = c.color;
      traceClover(c.s);
      ctx.fill();
      strokeCloverStem(c.s);
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
})();


/* ---- Report-a-mistake: in-page form -> Formspree (added 2026-07-22) ---- */
(function () {
  var FORMSPREE = "https://formspree.io/f/xdaqleod";
  function show() {
    var ov = document.getElementById("report-modal-overlay");
    ov.style.display = "flex";
    document.getElementById("report-status").textContent = "";
    var m = document.getElementById("report-msg"); if (m) { m.value = ""; m.focus(); }
    var e = document.getElementById("report-email"); if (e) e.value = "";
  }
  function hide() { var ov = document.getElementById("report-modal-overlay"); if (ov) ov.style.display = "none"; }
  function send() {
    var msg = (document.getElementById("report-msg").value || "").trim();
    var email = (document.getElementById("report-email").value || "").trim();
    var status = document.getElementById("report-status");
    if (!msg) { status.style.color = "#c93a3a"; status.textContent = "Please describe the mistake first."; return; }
    var btn = document.getElementById("report-send"); btn.disabled = true; btn.textContent = "Sending…";
    status.style.color = "#6b7280"; status.textContent = "";
    var data = { message: msg, page: location.href, quiz: document.title, _subject: "PA Quizzes Bug Report: " + document.title };
    if (email) data.email = email;
    fetch(FORMSPREE, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) })
      .then(function (r) { if (!r.ok) throw new Error("bad"); status.style.color = "#1f8f52"; status.textContent = "Thanks! Your report was sent."; setTimeout(hide, 1500); })
      .catch(function () { status.style.color = "#c93a3a"; status.textContent = "Could not send — please email jaxonluke22913@gmail.com."; })
      .finally(function () { btn.disabled = false; btn.textContent = "Send report"; });
  }
  window.reportMistake = function () {
    if (document.getElementById("report-modal-overlay")) { show(); return; }
    var ov = document.createElement("div");
    ov.id = "report-modal-overlay";
    ov.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.55);display:none;align-items:center;justify-content:center;z-index:6000;padding:16px;";
    ov.innerHTML =
      '<div style="background:#fff;color:#111827;max-width:440px;width:100%;border-radius:14px;padding:22px 22px 18px;box-shadow:0 12px 40px rgba(0,0,0,.35);font-family:system-ui,-apple-system,Segoe UI,sans-serif;">' +
      '<h3 style="margin:0 0 4px;font-size:17px;">Report a mistake</h3>' +
      '<p style="margin:0 0 12px;font-size:13px;color:#6b7280;">Tell us what looks wrong on this page and it will get fixed. Thanks!</p>' +
      '<textarea id="report-msg" rows="4" placeholder="Describe the mistake (which question, what is wrong)…" style="width:100%;box-sizing:border-box;border:1px solid #d1d5db;border-radius:9px;padding:10px;font:14px inherit;resize:vertical;"></textarea>' +
      '<input id="report-email" type="email" placeholder="Your email (optional, for a reply)" style="width:100%;box-sizing:border-box;border:1px solid #d1d5db;border-radius:9px;padding:9px 10px;font:14px inherit;margin-top:8px;">' +
      '<div id="report-status" style="font-size:13px;margin-top:8px;min-height:18px;"></div>' +
      '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:6px;">' +
      '<button id="report-cancel" style="border:none;background:#e5e7eb;color:#111827;border-radius:9px;padding:9px 16px;font:600 14px inherit;cursor:pointer;">Cancel</button>' +
      '<button id="report-send" style="border:none;background:#2563eb;color:#fff;border-radius:9px;padding:9px 18px;font:600 14px inherit;cursor:pointer;">Send report</button>' +
      '</div></div>';
    document.body.appendChild(ov);
    ov.addEventListener("click", function (e) { if (e.target === ov) hide(); });
    document.getElementById("report-cancel").onclick = hide;
    document.getElementById("report-send").onclick = send;
    show();
  };
})();
