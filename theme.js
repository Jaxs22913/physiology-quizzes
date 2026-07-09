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

  function start(steps, storageKey) {
    if (localStorage.getItem(storageKey)) return;
    var validSteps = validate(steps);
    if (!validSteps.length) return;
    showPrompt(validSteps, storageKey);
  }

  function run(steps, storageKey) {
    var validSteps = validate(steps);
    if (!validSteps.length) return;
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

    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    function open() { overlay.classList.add("open"); }
    function close() { overlay.classList.remove("open"); }

    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });

    return { open: open };
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

    group.appendChild(refreshBtn);
    group.appendChild(themeBtn);
    document.body.appendChild(group);

    var shortcutsHelp = initShortcutsHelp();
    if (shortcutsHelp) {
      var shortcutsBtn = makeCornerBtn("shortcuts-btn", "Keyboard shortcuts");
      shortcutsBtn.innerHTML = KEYBOARD;
      shortcutsBtn.addEventListener("click", shortcutsHelp.open);
      group.insertBefore(shortcutsBtn, refreshBtn);

      initHaptics();

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
  var UNIT_SELECTOR = "p, li, .cap, .figcap, .callout, td, .io";
  var RATES = [1, 1.25, 1.5, 1.75, 2];

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
    ["B₁₂", "B twelve"]
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
    ["·", ", "],
    ["•", ", "],
    ["≈", " approximately "],
    ["°", " degrees "],
    ["÷", " divided by "],
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

    bar.appendChild(playbackRow);
    bar.appendChild(settingsRow);
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
      queue = Array.prototype.slice.call(wrap.querySelectorAll(UNIT_SELECTOR))
        .filter(function (el) { return el.textContent.trim().length > 0; });
    }

    // Click any paragraph/list item/etc. to start reading from exactly
    // there. Guarded so a click that's actually the tail end of a text
    // selection (drag to highlight, then mouseup fires a click too)
    // doesn't hijack it into "jump to here" instead.
    function wireClickToJump() {
      queue.forEach(function (el, idx) {
        el.classList.add("tts-clickable");
        el.addEventListener("click", function () {
          if (!window.matchMedia("(min-width: 900px)").matches) return;
          if (window.getSelection().toString().length > 0) return;
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
        currentAudio.pause();
        currentAudio = null;
      }
    }

    function speakLive(i, el) {
      var utter = new SpeechSynthesisUtterance(speakableText(el.textContent.trim()));
      utter.rate = RATES[rateIdx];
      if (selectedVoice) utter.voice = selectedVoice;
      utter.onend = function () { if (playing) speakIndex(i + 1); };
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
        audio.onended = function () { if (playing) speakIndex(i + 1); };
        // Missing/failed pre-rendered file for this unit (e.g. a guide only
        // partly through the audio pipeline) -- fall back to live synthesis
        // for just this one paragraph rather than breaking the whole read.
        audio.onerror = function () { speakLive(i, el); };
        audio.play().catch(function () { speakLive(i, el); });
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
    window.__ttsDebug = { queue: queue, speakableText: speakableText };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
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
