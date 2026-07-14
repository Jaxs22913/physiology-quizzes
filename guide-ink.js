// Freehand stylus/Apple Pencil (and mouse) drawing layer for guides, added
// 2026-07-14. Separate from the existing select-text-to-highlight system in
// theme.js -- this is for actually writing/sketching/highlighting with a
// pen, not selecting text. Lives in its own file (like cloud-sync.js/
// group-study.js/presence.js) since it's substantial and self-contained,
// with no dependency on theme.js's highlighting internals.
//
// Persisted to localStorage under "guideInk:" + location.pathname, one
// plain JSON array of strokes -- picked up for free by cloud-sync.js's
// blanket Storage.prototype patch (see feedback_cloud_sync memory), so
// signed-in users get cross-device sync with zero extra code here.
//
// Design notes (see feedback_guide_ink memory for the full writeup):
// - An SVG overlay, not a <canvas>. A canvas spanning a guide's full
//   scroll height (some guides run 10,000-27,000px tall) would need a
//   fixed-size raster backing store proportional to that height regardless
//   of how sparse the actual drawing is -- tens to 100+MB of memory for one
//   layer, a real risk on an iPad actually being used with a Pencil. SVG
//   paths are vector and cost is proportional to stroke complexity, not
//   page height.
// - Points are stored in a fixed 0-1000 viewBox coordinate space
//   representing 0-100% of the wrap's width/height *at draw time* (via
//   SVGPoint.matrixTransform against the SVG's own screen CTM, not manual
//   percentage math), so strokes stay positioned correctly across window
//   resizes and are reasonably robust to minor reflow. stroke-width is set
//   in real CSS pixels via vector-effect="non-scaling-stroke" specifically
//   so pen/highlighter thickness looks consistent regardless of viewport
//   width, instead of also scaling with the viewBox transform.
// - Touch input is deliberately left alone (never preventDefault, never
//   starts a stroke) even while "draw mode" is on -- only pointerType
//   "pen" and "mouse" draw. This is what lets a finger keep scrolling the
//   page normally while an Apple Pencil (or a mouse, as a no-stylus
//   fallback) draws, the same touch/pen split real annotation apps use,
//   rather than a global scroll-vs-draw mode switch.
(function () {
  "use strict";

  if (!document.querySelector(".guide-back-bar")) return;
  var wrap = document.querySelector("body > .wrap") || document.querySelector(".wrap");
  if (!wrap) return;

  var SVG_NS = "http://www.w3.org/2000/svg";
  var VB = 1000; // fixed viewBox size on both axes -- see file header comment
  var INK_KEY = "guideInk:" + location.pathname;
  var PEN_COLORS = [
    { name: "Black", value: "#1f2937" },
    { name: "Red", value: "#dc2626" },
    { name: "Blue", value: "#2563eb" }
  ];
  var HL_COLORS = [
    { name: "Yellow", value: "#fde047" },
    { name: "Green", value: "#86efac" },
    { name: "Pink", value: "#f9a8d4" },
    { name: "Blue", value: "#93c5fd" }
  ];
  var PEN_WIDTH = 2.5;
  var HIGHLIGHTER_WIDTH = 14;
  var HIGHLIGHTER_OPACITY = "0.45";
  var ERASE_RADIUS_VB = 18; // tolerance in viewBox units for the eraser hit-test

  if (getComputedStyle(wrap).position === "static") wrap.style.position = "relative";

  var svg = document.createElementNS(SVG_NS, "svg");
  svg.id = "guide-ink-svg";
  svg.setAttribute("viewBox", "0 0 " + VB + " " + VB);
  svg.setAttribute("preserveAspectRatio", "none");
  wrap.appendChild(svg);

  function resizeSvg() {
    svg.style.height = wrap.scrollHeight + "px";
  }
  resizeSvg();
  // Keeps the SVG's own pixel height in sync with the wrap's actual layout
  // height continuously (not just once at load) -- covers late-loading
  // fonts/content, window resizes, and the "Larger text" setting toggling
  // mid-session, all without needing a fixed delay guess.
  if (window.ResizeObserver) {
    new ResizeObserver(resizeSvg).observe(wrap);
  } else {
    window.addEventListener("resize", resizeSvg);
  }

  function svgPointFromEvent(e) {
    var pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    var ctm = svg.getScreenCTM();
    if (!ctm) return null;
    var p = pt.matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  }

  function pathD(points) {
    if (!points.length) return "";
    var d = "M " + points[0].x.toFixed(2) + "," + points[0].y.toFixed(2);
    for (var i = 1; i < points.length; i++) {
      d += " L " + points[i].x.toFixed(2) + "," + points[i].y.toFixed(2);
    }
    return d;
  }

  function makePathEl(s) {
    var el = document.createElementNS(SVG_NS, "path");
    el.setAttribute("stroke", s.color);
    el.setAttribute("stroke-width", s.width);
    el.setAttribute("fill", "none");
    el.setAttribute("stroke-linecap", "round");
    el.setAttribute("stroke-linejoin", "round");
    el.setAttribute("vector-effect", "non-scaling-stroke");
    if (s.tool === "highlighter") el.setAttribute("opacity", HIGHLIGHTER_OPACITY);
    el.setAttribute("d", pathD(s.points));
    return el;
  }

  function loadStrokes() {
    try { return JSON.parse(localStorage.getItem(INK_KEY)) || []; } catch (e) { return []; }
  }
  function saveStrokes() {
    var plain = strokes.map(function (s) { return { tool: s.tool, color: s.color, width: s.width, points: s.points }; });
    localStorage.setItem(INK_KEY, JSON.stringify(plain));
  }

  var strokes = [];
  loadStrokes().forEach(function (s) {
    s.el = makePathEl(s);
    svg.appendChild(s.el);
    strokes.push(s);
  });

  var currentTool = "pen";
  var currentColor = PEN_COLORS[0].value;
  var drawModeOn = false;
  var liveStroke = null;

  function setDrawMode(on) {
    drawModeOn = on;
    svg.style.pointerEvents = on ? "auto" : "none";
  }

  function onPointerDown(e) {
    if (!drawModeOn || e.pointerType === "touch") return;
    e.preventDefault();
    var p = svgPointFromEvent(e);
    if (!p) return;
    // Capture is a nice-to-have (keeps pointermove/pointerup targeting the
    // SVG even if a fast stroke briefly leaves its bounds) -- not something
    // the rest of this function should depend on succeeding. It can throw
    // (InvalidPointerId) in edge cases the browser doesn't consider the
    // pointer "active" for capture purposes; a failed capture should never
    // block the stroke itself from being drawn and saved.
    try { svg.setPointerCapture(e.pointerId); } catch (err) {}

    if (currentTool === "eraser") {
      liveStroke = { erasing: true };
      eraseNear(p);
      return;
    }
    var s = { tool: currentTool, color: currentColor, width: currentTool === "highlighter" ? HIGHLIGHTER_WIDTH : PEN_WIDTH, points: [p] };
    s.el = makePathEl(s);
    svg.appendChild(s.el);
    liveStroke = s;
  }
  function onPointerMove(e) {
    if (!liveStroke) return;
    if (e.pointerType === "touch") return;
    e.preventDefault();
    var p = svgPointFromEvent(e);
    if (!p) return;
    if (liveStroke.erasing) {
      eraseNear(p);
      return;
    }
    liveStroke.points.push(p);
    liveStroke.el.setAttribute("d", pathD(liveStroke.points));
  }
  function onPointerUp() {
    if (!liveStroke) return;
    if (!liveStroke.erasing) {
      if (liveStroke.points.length > 1) {
        strokes.push(liveStroke);
        saveStrokes();
      } else {
        liveStroke.el.remove(); // a tap, not a drag -- discard rather than leave a stray dot
      }
    }
    liveStroke = null;
  }

  svg.addEventListener("pointerdown", onPointerDown);
  svg.addEventListener("pointermove", onPointerMove);
  svg.addEventListener("pointerup", onPointerUp);
  svg.addEventListener("pointercancel", onPointerUp);

  function eraseNear(p) {
    for (var i = strokes.length - 1; i >= 0; i--) {
      var pts = strokes[i].points;
      for (var j = 0; j < pts.length; j++) {
        var dx = pts[j].x - p.x, dy = pts[j].y - p.y;
        if (dx * dx + dy * dy < ERASE_RADIUS_VB * ERASE_RADIUS_VB) {
          strokes[i].el.remove();
          strokes.splice(i, 1);
          saveStrokes();
          return; // one stroke per movement tick -- avoids wiping several at once on a fast drag
        }
      }
    }
  }

  function undo() {
    var last = strokes.pop();
    if (!last) return;
    last.el.remove();
    saveStrokes();
  }
  function clearAll() {
    if (!strokes.length) return;
    if (!window.confirm("Clear all drawing on this guide? This can't be undone.")) return;
    strokes.forEach(function (s) { s.el.remove(); });
    strokes = [];
    saveStrokes();
  }

  // ---------------- Toolbar UI ----------------
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  var overlay = el("div", "ink-overlay");
  var toolbar = el("div", "ink-toolbar");

  var header = el("div", "ink-header");
  header.appendChild(el("span", null, "Draw"));
  var closeBtn = el("button", "ink-close", "&times;");
  closeBtn.type = "button";
  closeBtn.setAttribute("aria-label", "Stop drawing");
  header.appendChild(closeBtn);
  toolbar.appendChild(header);

  // Draggable by its header, same mechanics as the calculator/study timer.
  (function makeDraggable() {
    var dragging = false, startX, startY, startLeft, startTop;
    header.addEventListener("pointerdown", function (e) {
      if (e.target.closest(".ink-close")) return;
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

  var TOOL_ICONS = {
    pen: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
    highlighter: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 11-6 6v3h3l6-6"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-3.2-3.2a2 2 0 0 1 0-2.8L16 6"/></svg>',
    eraser: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>'
  };

  var toolRow = el("div", "ink-tool-row");
  var toolButtons = {};
  ["pen", "highlighter", "eraser"].forEach(function (t) {
    var btn = el("button", "ink-tool-btn", TOOL_ICONS[t]);
    btn.type = "button";
    btn.setAttribute("aria-label", t.charAt(0).toUpperCase() + t.slice(1));
    btn.title = t.charAt(0).toUpperCase() + t.slice(1);
    btn.addEventListener("click", function () { setTool(t); });
    toolRow.appendChild(btn);
    toolButtons[t] = btn;
  });
  toolbar.appendChild(toolRow);

  var colorRow = el("div", "ink-color-row");
  toolbar.appendChild(colorRow);

  function renderColorRow() {
    colorRow.innerHTML = "";
    if (currentTool === "eraser") return;
    var palette = currentTool === "highlighter" ? HL_COLORS : PEN_COLORS;
    if (palette.every(function (c) { return c.value !== currentColor; })) currentColor = palette[0].value;
    palette.forEach(function (c) {
      var swatch = el("button", "ink-swatch" + (c.value === currentColor ? " active" : ""));
      swatch.type = "button";
      swatch.style.background = c.value;
      swatch.setAttribute("aria-label", c.name);
      swatch.title = c.name;
      swatch.addEventListener("click", function () {
        currentColor = c.value;
        renderColorRow();
      });
      colorRow.appendChild(swatch);
    });
  }

  function setTool(t) {
    currentTool = t;
    Object.keys(toolButtons).forEach(function (k) { toolButtons[k].classList.toggle("active", k === t); });
    renderColorRow();
  }
  setTool("pen");

  var actionsRow = el("div", "ink-actions-row");
  var undoBtn = el("button", "ink-action-btn", "Undo");
  undoBtn.type = "button";
  undoBtn.addEventListener("click", undo);
  var clearBtn = el("button", "ink-action-btn danger", "Clear all");
  clearBtn.type = "button";
  clearBtn.addEventListener("click", clearAll);
  actionsRow.appendChild(undoBtn);
  actionsRow.appendChild(clearBtn);
  toolbar.appendChild(actionsRow);

  overlay.appendChild(toolbar);
  document.body.appendChild(overlay);

  function isOpen() { return overlay.classList.contains("open"); }
  function open() {
    overlay.classList.add("open");
    setDrawMode(true);
  }
  function close() {
    overlay.classList.remove("open");
    setDrawMode(false);
    liveStroke = null;
  }
  function toggle() { if (isOpen()) close(); else open(); }

  // Hard-press-to-open: pressing an Apple Pencil (or any pressure-reporting
  // stylus) firmly against the guide summons the toolbar, without needing
  // to reach for the corner button first. Deliberately listens at the
  // document level rather than on #guide-ink-svg -- the SVG's own
  // pointer-events stays "none" until drawModeOn is true (see
  // setDrawMode()), so it can't receive this pointerdown at all while
  // closed, which is exactly the state this needs to detect a press FROM.
  // Passive (never preventDefault) so a normal-pressure pen touch, and
  // Safari's own built-in Pencil scrolling, are completely unaffected --
  // this only ever *adds* the toolbar-open side effect, never blocks or
  // changes any other behavior. Once open, drawModeOn short-circuits this
  // immediately, so a hard press mid-stroke (e.g. for emphasis) is just
  // part of normal drawing, not a repeated trigger.
  var HARD_PRESS_THRESHOLD = 0.85; // 0-1 range per the Pointer Events spec; untuned against real hardware, see feedback_guide_ink memory
  function checkHardPress(e) {
    if (drawModeOn || e.pointerType !== "pen" || e.pressure < HARD_PRESS_THRESHOLD) return;
    open();
  }
  document.addEventListener("pointerdown", checkHardPress, { passive: true });
  document.addEventListener("pointermove", checkHardPress, { passive: true });

  closeBtn.addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen()) close();
  });

  var cornerGroup = document.getElementById("corner-actions");
  if (cornerGroup) {
    var inkBtn = document.createElement("button");
    inkBtn.type = "button";
    inkBtn.id = "ink-btn";
    inkBtn.className = "corner-btn";
    inkBtn.setAttribute("aria-label", "Draw on this guide");
    inkBtn.title = "Draw on this guide (stylus, Apple Pencil, or mouse)";
    inkBtn.innerHTML = TOOL_ICONS.pen;
    inkBtn.addEventListener("click", toggle);
    cornerGroup.appendChild(inkBtn);
  }

  // One-time hint the first time someone actually opens this on a guide,
  // shown once ever (site-wide, not per-guide) -- same localStorage-flag
  // pattern as the gamepad connect hint.
  if (!localStorage.getItem("inkHintShown")) {
    inkBtn && inkBtn.addEventListener("click", function onceHint() {
      if (localStorage.getItem("inkHintShown")) return;
      localStorage.setItem("inkHintShown", "1");
      if (isOpen() && window.showToast) {
        window.showToast("Draw with a stylus, Apple Pencil, or mouse — your finger still scrolls normally.", 5000);
      }
    });
  }
})();
