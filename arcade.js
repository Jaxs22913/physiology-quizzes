// Real decks get added here per class/exam once source content (PPTs, or
// the existing quiz Q&A bank as a fallback -- see arcade-content-policy
// memory) is available. Each deck needs both `cards` (broad concept recall,
// used by Study/Learn/Sprint) and `matchCards` (crisp term:definition pairs,
// used by Match) -- the two modes want differently-shaped content, not one
// shared list.
//
// anatomy-endocrine-glands and anatomy-peritoneal are both sourced ONLY
// from the Anatomy Exam 3 PPTs (Endocrine for Posting.pptx, GI I & II for
// posting.pptx, 18. NephrologyUrinary System - 2026.pptx) -- per
// anatomy-questions-strict-scope, this stays strictly anatomical (which
// gland/cell type secretes which named hormone; which organ is
// intraperitoneal vs retroperitoneal), never drifting into physiology
// (hormone action/regulation, which the Anatomy PPT itself barely covers
// anyway -- it's a histology/gross-anatomy deck, not a function one).
var DEMO_DECKS = [
  { id: "anatomy-endocrine-glands", name: "Endocrine Glands → Hormones", color: "accent2",
    icon: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
    cards: [
      ["Which adrenal cortex zone secretes aldosterone?", "Zona glomerulosa — outermost zone of the adrenal cortex, cells arranged in an ovoid configuration; secretes mineralocorticoids."],
      ["Which adrenal cortex zone secretes cortisol?", "Zona fasciculata — middle zone, lipid-droplet-laden cells arranged in radial columns; secretes glucocorticoids."],
      ["Which adrenal cortex zone secretes androgens?", "Zona reticularis — innermost cortical zone, loose meshwork configuration."],
      ["What do the chromaffin cells of the adrenal medulla secrete?", "Epinephrine and norepinephrine — chromaffin cells are modified post-ganglionic sympathetic neurons lacking dendrites and axons."],
      ["Which thyroid cells secrete thyroxine (T4) and triiodothyronine (T3)?", "Follicular epithelial cells — simple cuboidal cells surrounding the colloid-filled thyroid follicle."],
      ["Which thyroid cells secrete calcitonin?", "Parafollicular (C) cells — located near the follicular basement lamina, larger and lighter-staining than follicular cells."],
      ["Which parathyroid cells produce parathyroid hormone (PTH)?", "Principal (chief) cells — slightly eosinophilic cytoplasm; oxyphil cells may also secrete PTH but their function is otherwise unknown."],
      ["What hormones does the adenohypophysis's corticotropes release?", "ACTH (adrenocorticotropic hormone) and MSH (melanocyte-stimulating hormone)."],
      ["What hormone do the adenohypophysis's thyrotropes release?", "TSH (thyroid-stimulating hormone)."],
      ["What hormones do the adenohypophysis's gonadotropes release?", "FSH (follicle-stimulating hormone) and LH (luteinizing hormone)."],
      ["What does the neurohypophysis (posterior pituitary lobe) release?", "ADH (antidiuretic hormone) and oxytocin — both actually produced by the hypothalamus and released from the posterior lobe."],
      ["What do the pancreatic islets secrete?", "Insulin and glucagon — the endocrine tissue of the pancreas, scattered as about 1% of pancreatic cells."],
      ["What does the pineal gland secrete?", "Melatonin."],
      ["What does adipose tissue secrete, endocrinologically?", "Leptin and resistin."]
    ],
    matchCards: [
      ["Zona glomerulosa", "Aldosterone"],
      ["Zona fasciculata", "Cortisol"],
      ["Zona reticularis", "Androgens"],
      ["Adrenal medulla (chromaffin cells)", "Epinephrine & norepinephrine"],
      ["Thyroid follicular cells", "Thyroxine (T4) & T3"],
      ["Thyroid parafollicular (C) cells", "Calcitonin"],
      ["Parathyroid chief cells", "Parathyroid hormone (PTH)"],
      ["Adenohypophysis thyrotropes", "TSH"],
      ["Adenohypophysis gonadotropes", "FSH & LH"],
      ["Neurohypophysis", "ADH & oxytocin"],
      ["Pancreatic islets", "Insulin & glucagon"],
      ["Pineal gland", "Melatonin"]
    ]},
  { id: "anatomy-peritoneal", name: "Retroperitoneal vs Intraperitoneal", color: "accent4",
    icon: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    cards: [
      ["Is the stomach intraperitoneal or retroperitoneal?", "Intraperitoneal."],
      ["Why is the duodenum both intra- and retroperitoneal depending on the part?", "Only the superior part (duodenal cap, first portion) is intraperitoneal; the descending, transverse, and ascending parts become retroperitoneal."],
      ["Are the jejunum and ileum intra- or retroperitoneal?", "Intraperitoneal — both are suspended by the mesentery proper, which runs from the duodenojejunal flexure to the right iliac fossa."],
      ["Are the cecum and appendix intra- or retroperitoneal?", "Intraperitoneal."],
      ["Is the ascending colon intra- or retroperitoneal?", "Retroperitoneal — begins at the ileocecal valve, terminates at the right (hepatic) colic flexure."],
      ["Is the transverse colon intra- or retroperitoneal?", "Intraperitoneal — the most mobile portion of the colon, suspended by the transverse mesocolon."],
      ["Is the descending colon intra- or retroperitoneal?", "Retroperitoneal — narrowest-diameter part of the colon, continuous with the sigmoid colon."],
      ["Is the sigmoid colon intra- or retroperitoneal?", "Intraperitoneal — extends into the pelvis, stores fecal material."],
      ["Is the pancreas intra- or retroperitoneal?", "Retroperitoneal."],
      ["Is the spleen intra- or retroperitoneal?", "Intraperitoneal."],
      ["Are the kidneys intra- or retroperitoneal?", "Retroperitoneal — kidneys sit from T12–L3 on the right and T10/11–L2 on the left, anchored to the posterior wall by the renal fascia."],
      ["Are the ureters intra- or retroperitoneal?", "Retroperitoneal — run from the renal pelvis to the posterolateral wall of the bladder base."]
    ],
    matchCards: [
      ["Stomach", "Intraperitoneal"],
      ["Duodenal cap (1st part)", "Intraperitoneal"],
      ["Duodenum (2nd–4th parts)", "Retroperitoneal"],
      ["Jejunum & ileum", "Intraperitoneal"],
      ["Cecum & appendix", "Intraperitoneal"],
      ["Ascending colon", "Retroperitoneal"],
      ["Transverse colon", "Intraperitoneal"],
      ["Descending colon", "Retroperitoneal"],
      ["Sigmoid colon", "Intraperitoneal"],
      ["Pancreas", "Retroperitoneal"],
      ["Spleen", "Intraperitoneal"],
      ["Kidneys", "Retroperitoneal"],
      ["Ureters", "Retroperitoneal"]
    ]},
  // Physiology Exam 4 decks, one per PPT (Renal I, Renal II, Endocrine
  // Physiology I/II/III), sourced only from those PPTs -- unlike the
  // Anatomy decks above, function/mechanism content belongs here, since
  // that's what these lectures actually are.
  { id: "physio-renal-1", name: "Renal I: GFR & Micturition", color: "accent",
    icon: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
    cards: [
      ["What does the trigone of the bladder mark?", "A small triangular area immediately superior to the bladder neck, bounded by the two ureteral openings and the internal urethral orifice."],
      ["What is the detrusor muscle and why does it contract as a unit?", "The smooth muscle of the bladder wall; low-resistance electrical pathways between fused muscle cells let an action potential spread through the entire muscle at once, contracting the whole bladder together."],
      ["Which nerves carry parasympathetic motor fibers to the detrusor muscle?", "Pelvic nerves (S2–S3) — also carry sensory fibers detecting bladder wall stretch."],
      ["Which nerve carries skeletal motor fibers to the external urethral sphincter?", "The pudendal nerve — allows voluntary control of urination."],
      ["Which nerves carry sympathetic innervation to the bladder?", "Hypogastric nerves (from the L2 sympathetic chain) — mainly stimulate blood vessels, with some sensory fibers for fullness/pain."],
      ["What is the micturition reflex?", "An autonomic spinal cord reflex that empties the bladder once wall tension crosses a threshold, and can be inhibited or facilitated by the cerebral cortex and brainstem."],
      ["What is the GFR equation?", "GFR = Kf × Net Filtration Pressure, where Net Filtration Pressure = PG (glomerular hydrostatic) − PB (Bowman's capsule hydrostatic) − πG (glomerular oncotic) + πB (Bowman's capsule oncotic)."],
      ["Which determinant of GFR is most subject to physiological control?", "Glomerular hydrostatic pressure (PG) — Bowman's capsule hydrostatic pressure normally just changes as a function of GFR rather than regulating it."],
      ["What is the myogenic mechanism of renal autoregulation?", "Increased arterial pressure stretches the afferent arteriole, triggering smooth muscle contraction that constricts it — preventing excessive increases in glomerular hydrostatic pressure and stabilizing GFR."],
      ["What is tubuloglomerular feedback?", "Macula densa cells (part of the JGA) monitor NaCl delivery to the distal tubule: more NaCl → adenosine/ATP release → afferent arteriole constricts → GFR falls back toward normal; less NaCl → more renin → more angiotensin II → GFR maintained despite reduced renal perfusion."],
      ["Over what arterial pressure range does renal autoregulation keep GFR and renal blood flow roughly constant?", "Approximately 80–180 mmHg."],
      ["Why is average GFR about 10% lower in women than men?", "Body size and sex are both factors that affect GFR, independent of kidney disease."]
    ],
    matchCards: [
      ["Trigone", "Triangular area above the bladder neck"],
      ["Pelvic nerve", "Parasympathetic motor + sensory to detrusor"],
      ["Pudendal nerve", "Skeletal motor to external sphincter"],
      ["Hypogastric nerve", "Sympathetic, mainly to blood vessels"],
      ["Micturition reflex", "Autonomic spinal reflex that empties the bladder"],
      ["Kf", "Glomerular filtration coefficient"],
      ["PG", "Glomerular hydrostatic pressure — most regulated GFR determinant"],
      ["Myogenic mechanism", "Afferent arteriole stretch → constriction"],
      ["Tubuloglomerular feedback", "Macula densa senses NaCl, adjusts afferent tone"],
      ["Renal autoregulation range", "~80–180 mmHg"]
    ]},
  { id: "physio-renal-2", name: "Renal II: Nephron & RAAS", color: "accent2",
    icon: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    cards: [
      ["What triggers renin release from the JGA?", "Reduced renal perfusion pressure, reduced NaCl delivery to the macula densa, or increased sympathetic stimulation (via β1 adrenoreceptors)."],
      ["Walk through the RAAS cascade from renin to blood pressure.", "Renin converts angiotensinogen to angiotensin I; ACE converts angiotensin I to angiotensin II; angiotensin II increases aldosterone release, Na+ reabsorption, efferent arteriole constriction, ADH release, and thirst — raising blood volume and pressure."],
      ["What does aldosterone do to principal cells and intercalated cells?", "In principal cells: increases Na+ reabsorption and K+ secretion (via Na+/K+ ATPase, ENaC, and ROMK channels). In intercalated cells: increases H+ secretion."],
      ["What triggers ADH release, and what is its mechanism?", "Released when plasma osmolality rises (dehydration) or blood volume/pressure falls; binds V2 receptors on principal cells of the late distal tubule/collecting duct, inserting aquaporin-2 channels into the apical membrane so water moves from tubular fluid back into the bloodstream."],
      ["What does atrial natriuretic peptide (ANP) promote?", "Sodium excretion (natriuresis) and water excretion (diuresis), lowering blood volume and blood pressure — the opposite direction from aldosterone/ADH."],
      ["What does PTH do at the early distal tubule?", "Enhances calcium reabsorption through apical calcium channels (TRPV5); the early distal tubule is also where the macula densa sits and ~5% of filtered NaCl is normally reabsorbed."],
      ["What generates the corticomedullary osmotic gradient in the countercurrent multiplier?", "Active NaCl reabsorption by the water-impermeable thick ascending limb, combined with water movement out of the descending limb — this lets the kidney concentrate urine when ADH is present."],
      ["What is the role of the vasa recta as a countercurrent exchanger?", "Low-volume countercurrent blood flow through the vasa recta maintains the corticomedullary gradient while still supplying blood to the medulla."],
      ["One-line summary: what does each of ADH, aldosterone, angiotensin II, ANP, and PTH mainly do?", "ADH: water reabsorption. Aldosterone: Na+ reabsorption/K+ secretion. Angiotensin II: Na+ and water reabsorption. ANP: Na+ and water excretion. PTH: Ca++ reabsorption/phosphate excretion."]
    ],
    matchCards: [
      ["ADH", "Water reabsorption"],
      ["Aldosterone", "Na+ reabsorption, K+ secretion"],
      ["Angiotensin II", "Na+ and water reabsorption"],
      ["ANP", "Na+ and water excretion"],
      ["PTH (renal action)", "Ca++ reabsorption, phosphate excretion"],
      ["Macula densa", "Senses NaCl delivery, triggers renin release"],
      ["Thick ascending limb", "Water-impermeable, reabsorbs NaCl"],
      ["Vasa recta", "Countercurrent exchanger, preserves medullary gradient"],
      ["ADH target", "V2 receptors, principal cells, aquaporin-2"],
      ["Aldosterone target", "Principal & intercalated cells, late DT/collecting duct"]
    ]},
  { id: "physio-endocrine-1", name: "Endocrine Physiology I: Pituitary & Thyroid", color: "accent3",
    icon: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/>',
    cards: [
      ["Which anterior pituitary cell type produces growth hormone, and what does GH do metabolically?", "Somatotropes; GH increases protein synthesis, increases fat utilization, and decreases carbohydrate utilization."],
      ["Match the anterior pituitary cell types to what they secrete.", "Somatotropes → GH, Corticotropes → ACTH, Thyrotropes → TSH, Gonadotropes → FSH & LH, Lactotropes → Prolactin."],
      ["Where is ADH produced, and where does it act?", "Produced mainly in the supraoptic nuclei of the hypothalamus (80–90%); acts on the kidney and vasculature."],
      ["Where is oxytocin produced, and what does it do?", "Produced in the paraventricular nucleus; acts on breast myoepithelial cells and the uterus to cause milk let-down and uterine contraction."],
      ["What happens to basal metabolic rate, protein metabolism, and thermogenesis with high T3/T4?", "All increase: BMR rises, protein synthesis and proteolysis both rise, and thermogenesis rises — along with increased gluconeogenesis, glycogenolysis, and glycolysis, and decreased serum cholesterol."],
      ["Why does T3 act faster than T4 despite T4 being secreted in greater amounts?", "T3 has a higher affinity for the nuclear thyroid hormone receptor and a shorter latency (6–12 hours) than T4 (2–3 days), even though T4's activity half-life is much longer (~15 days)."],
      ["What are the cardiovascular effects of thyroid hormone?", "Increased cardiac output and tissue blood flow, increased heart rate, and (at slight increases) increased heart contractile strength."],
      ["What hormone from the hypothalamus stimulates prolactin secretion, and how is prolactin normally kept in check?", "Prolactin is unusual in being tonically inhibited — dopamine (as prolactin-inhibiting hormone) suppresses lactotrope secretion rather than a releasing hormone stimulating it."]
    ],
    matchCards: [
      ["Somatotropes", "Growth hormone"],
      ["Corticotropes", "ACTH"],
      ["Thyrotropes", "TSH"],
      ["Gonadotropes", "FSH & LH"],
      ["Lactotropes", "Prolactin"],
      ["ADH", "↑ Water reabsorption (kidney)"],
      ["Oxytocin", "Milk let-down, uterine contraction"],
      ["High T3/T4", "↑ BMR, ↑ thermogenesis"],
      ["Prolactin-inhibiting hormone", "Dopamine"],
      ["GH metabolic effect", "↑ Protein synthesis, ↑ fat use, ↓ carb use"]
    ]},
  { id: "physio-endocrine-2", name: "Endocrine Physiology II: Adrenal, PTH & Pancreas", color: "accent4",
    icon: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
    cards: [
      ["What happens with high vs. low aldosterone?", "High aldosterone: hypokalemia, muscle weakness, slow HR/arrhythmias, cell alkalosis. Low aldosterone: hyperkalemia, increased muscle excitability early on, arrhythmias/V-fib, cell acidosis."],
      ["What does cortisol do to carbohydrate metabolism?", "Increases gluconeogenesis (more enzymes converting amino acids to glucose, more plasma amino acids, more liver glycogen), moderately decreases glucose utilization, and raises blood glucose — its best-known metabolic effect."],
      ["What does cortisol do to protein metabolism, and where is the exception?", "Decreases protein stores almost everywhere (decreased synthesis, increased catabolism, decreased amino acid transport) — except in the liver, where it increases protein synthesis and amino acid uptake."],
      ["How does insulin get glucose into skeletal muscle and fat cells?", "Increases glucose uptake within seconds by increasing membrane permeability/GLUT transporter activity — but insulin does NOT increase glucose transport into the brain, which uses GLUT1 instead."],
      ["How does insulin promote glucose storage in the liver?", "Inactivates liver phosphorylase (which normally splits glycogen to glucose), increases glucokinase (traps glucose in the cell), and increases glycogen synthase — up to 6% of liver mass can become glycogen."],
      ["What does glucagon do, and where is it produced?", "Produced by α cells of the pancreatic islets, acts on the liver; increases glycogenolysis and gluconeogenesis — actions that directly oppose insulin, raising plasma glucose."],
      ["What are the major actions of PTH?", "Increases plasma calcium, increases renal production of 1,25-dihydroxycholecalciferol (active vitamin D), and increases calcium/phosphate release from bone by activating osteocytes and osteoclast proliferation."]
    ],
    matchCards: [
      ["High aldosterone", "Hypokalemia, muscle weakness"],
      ["Low aldosterone", "Hyperkalemia, arrhythmia risk"],
      ["Cortisol + carbs", "↑ Gluconeogenesis, ↑ blood glucose"],
      ["Cortisol + protein (liver)", "↑ Synthesis (exception to rest of body)"],
      ["Insulin + muscle/fat", "↑ Glucose uptake"],
      ["Insulin + brain", "No effect — brain uses GLUT1"],
      ["Glucagon source", "α cells, pancreatic islets"],
      ["Glucagon action", "↑ Glycogenolysis & gluconeogenesis"],
      ["PTH", "↑ Plasma calcium"],
      ["PTH + bone", "Activates osteoclasts, releases Ca/phosphate"]
    ]},
  { id: "physio-endocrine-3", name: "Endocrine Physiology III: Reproductive Hormones", color: "accent",
    icon: '<circle cx="10" cy="14" r="7"/><path d="M21 3l-6.75 6.75M21 3h-6M21 3v6"/>',
    cards: [
      ["What are testosterone's effects on primary/secondary sexual characteristics?", "Enlargement of penis/scrotum/testes, axillary/chest/pubic/facial hair, deepened voice, thicker skin with more sebaceous secretion, increased muscle and bone density, increased RBCs, and minor increased distal-tubule Na+ reabsorption."],
      ["What does testosterone do to metabolism at puberty?", "Increases basal metabolic rate by 5–10%, largely from increased protein anabolism; the resulting higher metabolic rate also increases hematocrit."],
      ["What controls testosterone production?", "GnRH from the hypothalamus (pulses every 1–3 hours) stimulates LH from the anterior pituitary, and LH stimulates testosterone production by the testes."],
      ["What is the dual, cycle-dependent effect of estrogen on GnRH/LH/FSH?", "Estrogen suppresses GnRH/LH/FSH for most of the cycle, but switches to stimulating them preovulatory (the LH surge that triggers ovulation)."],
      ["What is the dual effect of progesterone on GnRH/LH/FSH?", "Progesterone suppresses GnRH/LH/FSH, except preovulatory when it stimulates them, mirroring estrogen's dual pattern."],
      ["What happens hormonally right before a new ovulatory cycle begins?", "Estrogen and progesterone from the corpus luteum fall, which relieves the suppression on GnRH/LH/FSH, allowing a new cycle to begin."],
      ["What do estrogen and progesterone each do to breast tissue during pregnancy?", "Estrogen promotes breast size and duct growth (along with GH, prolactin, cortisol, and insulin); progesterone promotes development of breast lobules, alveoli, and secretory characteristics."],
      ["What does progesterone do to the uterine lining?", "Prepares it for implantation."]
    ],
    matchCards: [
      ["GnRH", "Stimulates LH & FSH release"],
      ["LH (male)", "Stimulates testosterone production"],
      ["Testosterone + puberty", "↑ BMR 5–10%"],
      ["Estrogen (most of cycle)", "Suppresses GnRH/LH/FSH"],
      ["Estrogen (preovulatory)", "Stimulates GnRH/LH/FSH (LH surge)"],
      ["Progesterone", "Prepares uterine lining for implantation"],
      ["Estrogen + breast", "Duct growth"],
      ["Progesterone + breast", "Lobules, alveoli, secretory tissue"]
    ]}
];

function findDeck(id) { return DEMO_DECKS.find(function (d) { return d.id === id; }); }
function deckIdFromURL() { return new URLSearchParams(location.search).get("deck"); }

// Real Class Tabs -> Exam Accordion structure, mirroring the main site's
// tab/exam-section pattern. deckIds fill in as real decks are authored per
// class/exam.
var DEMO_CLASSES = [
  { id: "anatomy", name: "Anatomy", exams: [
    { id: "exam3", name: "Exam 3", deckIds: ["anatomy-endocrine-glands", "anatomy-peritoneal"] }
  ]},
  { id: "physiology", name: "Physiology", exams: [
    { id: "exam4", name: "Exam 4", deckIds: [
      "physio-renal-1", "physio-renal-2",
      "physio-endocrine-1", "physio-endocrine-2", "physio-endocrine-3"
    ] }
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

// ---- Sprint bot speed (how quickly the AI opponent answers) ----
var SPRINT_BOT_SPEED_KEY = "fc_sprint_bot_speed_v1";
function getSprintBotSpeed() {
  var v = localStorage.getItem(SPRINT_BOT_SPEED_KEY);
  return (v === "easy" || v === "hard") ? v : "normal";
}
function saveSprintBotSpeed(speed) { localStorage.setItem(SPRINT_BOT_SPEED_KEY, speed); }

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
