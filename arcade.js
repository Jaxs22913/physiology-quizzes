// Real decks get added here per class/exam once source content (PPTs, or
// the existing quiz Q&A bank as a fallback -- see arcade-content-policy
// memory) is available. Each deck needs both `cards` (broad concept recall,
// used by Study/Learn/Sprint) and `matchCards` (crisp term:definition pairs,
// used by Match) -- the two modes want differently-shaped content, not one
// shared list.
var DEMO_DECKS = [];

function findDeck(id) { return DEMO_DECKS.find(function (d) { return d.id === id; }); }
function deckIdFromURL() { return new URLSearchParams(location.search).get("deck"); }

// Real Class Tabs -> Exam Accordion structure, mirroring the main site's
// tab/exam-section pattern. Physiology / Exam 4 is the first real
// class+exam pairing; its deckIds fill in as real decks are authored.
var DEMO_CLASSES = [
  { id: "physiology", name: "Physiology", exams: [
    { id: "exam4", name: "Exam 4", deckIds: [] }
  ]}
];

var PROGRESS_KEY = "fc_progress_v1";
var STREAK_KEY = "fc_streak_v1";
var SOUND_KEY = "fc_sound_v1";
var THEME_KEY = "siteTheme";

function todayStr() { return new Date().toISOString().slice(0, 10); }
function addDays(dateStr, days) {
  var d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
  catch (e) { return {}; }
}
function saveProgress(p) { localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); }
var progress = loadProgress();

function cardKey(deckId, idx) { return deckId + ":" + idx; }
function entryFor(deckId, idx) { return progress[cardKey(deckId, idx)]; }
function isDue(entry) { return !entry || entry.due <= todayStr(); }
function boxOf(entry) {
  if (!entry || entry.reps === 0) return "new";
  return entry.interval >= 21 ? "mastered" : "learning";
}

// rating is "again" (don't know) or "good" (know) -- simplified SM-2.
function scheduleCard(entry, rating) {
  entry = entry ? Object.assign({}, entry) : { ease: 2.5, interval: 0, reps: 0 };
  if (rating === "again") {
    entry.reps = 0;
    entry.interval = 0;
    entry.ease = Math.max(1.3, entry.ease - 0.2);
  } else {
    if (entry.reps === 0) entry.interval = 1;
    else if (entry.reps === 1) entry.interval = 6;
    else entry.interval = Math.round(entry.interval * entry.ease);
    entry.reps += 1;
  }
  entry.due = addDays(todayStr(), entry.interval);
  return entry;
}

function getMasteryCounts(deck) {
  var counts = { new: 0, learning: 0, mastered: 0 };
  deck.cards.forEach(function (_, idx) { counts[boxOf(entryFor(deck.id, idx))]++; });
  return counts;
}
function getDueIndexes(deck) {
  var out = [];
  deck.cards.forEach(function (_, idx) { if (isDue(entryFor(deck.id, idx))) out.push(idx); });
  return out;
}

// ---- Streak ----
function loadStreak() {
  try { return JSON.parse(localStorage.getItem(STREAK_KEY)) || { count: 0, last: null }; }
  catch (e) { return { count: 0, last: null }; }
}
function bumpStreak() {
  var s = loadStreak();
  var today = todayStr();
  if (s.last === today) return s;
  var yesterday = addDays(today, -1);
  s.count = (s.last === yesterday) ? s.count + 1 : 1;
  s.last = today;
  localStorage.setItem(STREAK_KEY, JSON.stringify(s));
  renderStreak();
  return s;
}
function renderStreak() {
  var el = document.getElementById("streak-count");
  if (el) el.textContent = loadStreak().count;
}

// ---- Match best times (per deck, ms) ----
var MATCH_BEST_KEY = "fc_match_best_v1";
function loadMatchBests() {
  try { return JSON.parse(localStorage.getItem(MATCH_BEST_KEY)) || {}; }
  catch (e) { return {}; }
}
function getMatchBest(deckId) { return loadMatchBests()[deckId] || null; }
function saveMatchBest(deckId, ms) {
  var bests = loadMatchBests();
  if (!bests[deckId] || ms < bests[deckId]) {
    bests[deckId] = ms;
    localStorage.setItem(MATCH_BEST_KEY, JSON.stringify(bests));
    return true;
  }
  return false;
}
function formatMs(ms) {
  var totalSec = ms / 1000;
  var m = Math.floor(totalSec / 60);
  var s = (totalSec - m * 60).toFixed(1);
  return m > 0 ? m + ":" + (s < 10 ? "0" : "") + s : s + "s";
}

// ---- Sound / haptics ----
var soundOn = localStorage.getItem(SOUND_KEY) !== "0";
var audioCtx = null;
function ensureAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}
function playTone(freq, dur, type) {
  if (!soundOn) return;
  try {
    var ctx = ensureAudio();
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = type || "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur);
  } catch (e) {}
}
function vibrate(ms) { if (navigator.vibrate) navigator.vibrate(ms); }
var SOUNDS = {
  flip: function () { playTone(440, 0.08, "triangle"); },
  again: function () { playTone(200, 0.15, "sawtooth"); },
  good: function () { playTone(520, 0.12); vibrate(15); },
  mastered: function () { playTone(660, 0.1); setTimeout(function () { playTone(880, 0.2); }, 100); vibrate(30); },
  correct: function () { playTone(600, 0.1); },
  wrong: function () { playTone(180, 0.15, "sawtooth"); },
  win: function () { [523, 659, 784, 1047].forEach(function (f, i) { setTimeout(function () { playTone(f, 0.18); }, i * 90); }); },
  // Match game: a distinct tap-and-chime pair so it has its own audio identity
  // rather than borrowing the generic quiz correct/wrong tones.
  select: function () { playTone(500, 0.05, "triangle"); },
  match: function () { playTone(700, 0.09); setTimeout(function () { playTone(950, 0.13); }, 70); vibrate(15); },
  matchWrong: function () { playTone(220, 0.12, "sawtooth"); setTimeout(function () { playTone(160, 0.15, "sawtooth"); }, 80); }
};

// ---- Toast ----
var toastTimer = null;
function showToast(msg, ms) {
  var t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.style.opacity = "1";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { t.style.opacity = "0"; }, ms || 2200);
}

// ---- Confetti ----
function burstConfetti() {
  var colors = ["#2563eb", "#16a34a", "#9333ea", "#f59e0b", "#dc2626"];
  for (var i = 0; i < 50; i++) {
    var el = document.createElement("div");
    el.className = "confetti-piece";
    el.style.left = Math.random() * 100 + "vw";
    el.style.background = colors[i % colors.length];
    el.style.animationDuration = (1.6 + Math.random() * 1.2) + "s";
    el.style.animationDelay = (Math.random() * 0.3) + "s";
    document.body.appendChild(el);
    (function (node) { setTimeout(function () { node.remove(); }, 3200); })(el);
  }
}

// ---- Shared multiple-choice helpers (Learn + Sprint) ----
var LETTERS = ["A", "B", "C", "D"];
function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

// ---- Icons ----
var RESULT_ICON_SVG_OPEN = '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
var AWARD_ICON = RESULT_ICON_SVG_OPEN + '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>';
var BOT_ICON = RESULT_ICON_SVG_OPEN + '<rect x="4" y="4" width="16" height="16" rx="3"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/></svg>';

// Dark mode and sound both live only in the site's shared Settings panel
// now (theme.js's initSettingsPanel(), gated on its isArcade check) --
// Arcade no longer has its own corner theme/sound icons, matching the
// homepage. window.setFCSoundEnabled is that panel's hook into arcade.js's
// in-memory soundOn flag so toggling it there takes effect immediately,
// without a reload, exactly like flipping dark mode does.
window.setFCSoundEnabled = function (on) {
  soundOn = on;
  localStorage.setItem(SOUND_KEY, on ? "1" : "0");
};

// Every page's header (proto-badge/brand/corner-btns/streak-pill) is
// identical markup -- call this once on load to wire it up.
function initHeader() {
  renderStreak();
}

// ---- Gamepad bridge ----
// shared.js only polls and reports raw button-press edges -- it has no idea
// whether the current page is a flip-card, a multiple-choice question, or a
// timed race, so each page sets window.onFCGamepadButton itself to map
// button index -> whatever action makes sense there (mirrors how each page
// also owns its own keydown handler).
window.addEventListener("gamepadconnected", function () { showToast("🎮 Controller connected"); });
(function () {
  var prevButtons = {};
  function poll() {
    var pads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (var i = 0; i < pads.length; i++) {
      var pad = pads[i];
      if (!pad) continue;
      var prev = prevButtons[pad.index] || [];
      pad.buttons.forEach(function (b, bi) {
        var wasPressed = prev[bi] && prev[bi].pressed;
        if (b.pressed && !wasPressed && window.onFCGamepadButton) window.onFCGamepadButton(bi);
      });
      prevButtons[pad.index] = pad.buttons.map(function (b) { return { pressed: b.pressed }; });
    }
    requestAnimationFrame(poll);
  }
  requestAnimationFrame(poll);
})();
