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

  loadScript(CDN + "firebase-app-compat.js", function () {
    loadScript(CDN + "firebase-auth-compat.js", function () {
      loadScript(CDN + "firebase-firestore-compat.js", function () {
        loadScript(base + "firebase-config.js", function () {
          loadScript(base + "cloud-sync.js");
        });
      });
    });
  });
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
  var wrap = document.querySelector(".wrap");
  if (!wrap) return;

  var HL_UNIT_SELECTOR = "p, li, .cap, .figcap, .callout, td, .io";
  var HL_KEY = "guideHl:" + location.pathname;
  var COLORS = ["yellow", "green", "pink", "blue"];

  var units = Array.prototype.slice.call(wrap.querySelectorAll(HL_UNIT_SELECTOR));
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
  }

  function updateHighlightNote(idx, start, end, note) {
    var list = loadHighlights();
    list.forEach(function (h) {
      if (h.idx === idx && h.start === start && h.end === end) h.note = note;
    });
    saveHighlights(list);
  }

  // note indicator is CSS-only (mark.has-note::after, see theme.css) rather
  // than an inserted child node -- an inserted node would become part of
  // the mark's textContent, which would then get re-extracted into the
  // highlight itself on any future edit and permanently bake the indicator
  // glyph into the "highlighted text," plus it'd shift every future
  // textOffset() computation inside this unit. Setting a class + native
  // title tooltip touches neither.
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

    var textarea = document.createElement("textarea");
    textarea.className = "hl-note-textarea";
    textarea.placeholder = "Add a note about this passage…";
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

    var saveBtn = document.createElement("button");
    saveBtn.type = "button";
    saveBtn.className = "hl-note-btn hl-note-save";
    saveBtn.textContent = "Save note";
    saveBtn.addEventListener("click", function () {
      var note = textarea.value.trim();
      setMarkNote(mark, note);
      updateHighlightNote(idx, start, end, note);
      hideNotePopover();
    });

    row.appendChild(removeBtn);
    row.appendChild(saveBtn);
    notePopover.appendChild(row);
    document.body.appendChild(notePopover);
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
  }

  document.addEventListener("mouseup", function (e) {
    if (toolbar && toolbar.contains(e.target)) return;
    var sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) { hideToolbar(); return; }
    var range = sel.getRangeAt(0);
    if (!wrap.contains(range.commonAncestorContainer)) { hideToolbar(); return; }
    var startUnit = findUnit(range.startContainer);
    var endUnit = findUnit(range.endContainer);
    if (!startUnit || startUnit !== endUnit) { hideToolbar(); return; } // cross-unit selection: unsupported, no-op
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
    if (e.key === "Escape") { hideToolbar(); hideNotePopover(); }
  });
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
