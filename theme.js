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
  var UNIT_SELECTOR = "p, li, .cap, td, .io";
  var RATES = [1, 1.25, 1.5, 1.75, 2];

  function init() {
    var wrap = document.querySelector(".wrap[data-readable]");
    if (!wrap || !("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") return;

    var queue = [];
    var currentIndex = -1;
    var playing = false;
    var rateIdx = 0;

    var bar = document.createElement("div");
    bar.className = "tts-bar";
    bar.id = "tts-bar";

    var playBtn = document.createElement("button");
    playBtn.type = "button";
    playBtn.className = "tts-btn";
    playBtn.setAttribute("aria-label", "Read aloud");
    playBtn.innerHTML = PLAY;

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

    bar.appendChild(playBtn);
    bar.appendChild(stopBtn);
    bar.appendChild(rateBtn);
    document.body.appendChild(bar);

    function buildQueue() {
      queue = Array.prototype.slice.call(wrap.querySelectorAll(UNIT_SELECTOR))
        .filter(function (el) { return el.textContent.trim().length > 0; });
    }

    function clearHighlight() {
      var prev = wrap.querySelector(".tts-active");
      if (prev) prev.classList.remove("tts-active");
    }

    function paintPlayBtn() {
      playBtn.innerHTML = playing ? PAUSE : PLAY;
      playBtn.setAttribute("aria-label", playing ? "Pause reading" : "Read aloud");
    }

    function speakIndex(i) {
      if (!playing) return;
      if (i < 0 || i >= queue.length) { stop(); return; }
      currentIndex = i;
      clearHighlight();
      var el = queue[i];
      el.classList.add("tts-active");
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      var utter = new SpeechSynthesisUtterance(el.textContent.trim());
      utter.rate = RATES[rateIdx];
      utter.onend = function () { if (playing) speakIndex(i + 1); };
      utter.onerror = function () { if (playing) speakIndex(i + 1); };
      speechSynthesis.speak(utter);
    }

    function play() {
      if (queue.length === 0) buildQueue();
      if (queue.length === 0) return;
      playing = true;
      paintPlayBtn();
      speechSynthesis.cancel();
      speakIndex(Math.max(currentIndex, 0));
    }

    function pause() {
      playing = false;
      speechSynthesis.cancel();
      paintPlayBtn();
    }

    function stop() {
      playing = false;
      speechSynthesis.cancel();
      clearHighlight();
      currentIndex = -1;
      paintPlayBtn();
    }

    playBtn.addEventListener("click", function () {
      if (playing) pause(); else play();
    });
    stopBtn.addEventListener("click", stop);
    rateBtn.addEventListener("click", function () {
      rateIdx = (rateIdx + 1) % RATES.length;
      rateBtn.textContent = RATES[rateIdx] + "x";
      if (playing) { speechSynthesis.cancel(); speakIndex(currentIndex); }
    });

    window.addEventListener("pagehide", function () { speechSynthesis.cancel(); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
