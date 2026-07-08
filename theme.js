(function () {
  var SUN = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
  var MOON = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  var REFRESH = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>';
  var KEYBOARD = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 13h.01M18 13h.01M8 13h8"/></svg>';

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

    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    function open() { overlay.classList.add("open"); }
    function close() { overlay.classList.remove("open"); }
    function toggle() {
      if (overlay.classList.contains("open")) close(); else open();
    }

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

  function init() {
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

    group.appendChild(refreshBtn);
    group.appendChild(themeBtn);
    document.body.appendChild(group);

    var shortcutsHelp = initShortcutsHelp();
    if (shortcutsHelp) {
      var shortcutsBtn = makeCornerBtn("shortcuts-btn", "Keyboard shortcuts");
      shortcutsBtn.innerHTML = KEYBOARD;
      shortcutsBtn.addEventListener("click", shortcutsHelp.open);
      group.insertBefore(shortcutsBtn, refreshBtn);
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
