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
      ["Which adrenal cortex zone secretes aldosterone?", "Zona glomerulosa — the outermost zone of the adrenal cortex."],
      ["Which adrenal cortex zone secretes cortisol?", "Zona fasciculata — the middle zone, with cells arranged in radial columns."],
      ["Which adrenal cortex zone secretes androgens?", "Zona reticularis — the innermost cortical zone, with a loose meshwork arrangement."],
      ["What do chromaffin cells of the adrenal medulla secrete?", "Epinephrine and norepinephrine."],
      ["What are adrenal medulla chromaffin cells, developmentally?", "Modified post-ganglionic sympathetic neurons, lacking dendrites and axons."],
      ["Which thyroid cells secrete thyroxine (T4) and triiodothyronine (T3)?", "Follicular epithelial cells — simple cuboidal cells surrounding the colloid-filled follicle."],
      ["Which thyroid cells secrete calcitonin?", "Parafollicular (C) cells — located near the follicular basement lamina."],
      ["Which parathyroid cells produce parathyroid hormone (PTH)?", "Principal (chief) cells — slightly eosinophilic cytoplasm."],
      ["What is notable about parathyroid oxyphil cells?", "May also secrete PTH, but their function is otherwise unknown."],
      ["What hormones does the adenohypophysis's corticotropes release?", "ACTH (adrenocorticotropic hormone) and MSH (melanocyte-stimulating hormone)."],
      ["What hormone do the adenohypophysis's thyrotropes release?", "TSH (thyroid-stimulating hormone)."],
      ["What hormones do the adenohypophysis's gonadotropes release?", "FSH (follicle-stimulating hormone) and LH (luteinizing hormone)."],
      ["What does the neurohypophysis (posterior pituitary lobe) release?", "ADH (antidiuretic hormone) and oxytocin."],
      ["Where are ADH and oxytocin actually produced?", "The hypothalamus — then transported to and released from the posterior pituitary lobe."],
      ["What do the pancreatic islets secrete?", "Insulin and glucagon."],
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
      ["Which part of the duodenum is intraperitoneal?", "The superior part (duodenal cap, first portion)."],
      ["Which parts of the duodenum are retroperitoneal?", "The descending, transverse, and ascending parts."],
      ["Are the jejunum and ileum intra- or retroperitoneal?", "Intraperitoneal — suspended by the mesentery proper (duodenojejunal flexure to right iliac fossa)."],
      ["Are the cecum and appendix intra- or retroperitoneal?", "Intraperitoneal."],
      ["Is the ascending colon intra- or retroperitoneal?", "Retroperitoneal."],
      ["Where does the ascending colon begin and end?", "Begins at the ileocecal valve, ends at the right (hepatic) colic flexure."],
      ["Is the transverse colon intra- or retroperitoneal?", "Intraperitoneal — the most mobile part of the colon, suspended by the transverse mesocolon."],
      ["Is the descending colon intra- or retroperitoneal?", "Retroperitoneal."],
      ["What is distinctive about the descending colon's diameter?", "It's the narrowest-diameter part of the colon."],
      ["Is the sigmoid colon intra- or retroperitoneal?", "Intraperitoneal — extends into the pelvis."],
      ["Is the pancreas intra- or retroperitoneal?", "Retroperitoneal."],
      ["Is the spleen intra- or retroperitoneal?", "Intraperitoneal."],
      ["Are the kidneys intra- or retroperitoneal?", "Retroperitoneal."],
      ["What vertebral levels do the kidneys span?", "T12–L3 on the right, T10/11–L2 on the left."],
      ["What anchors the kidneys to the posterior body wall?", "The renal fascia."],
      ["Are the ureters intra- or retroperitoneal?", "Retroperitoneal."],
      ["Where do the ureters run, from and to?", "From the renal pelvis to the posterolateral wall of the bladder base."]
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
  { id: "physio-renal-1", name: "Renal I: GFR & Micturition", color: "accent",
    icon: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
    cards: [
      ["What does the trigone of the bladder mark?", "A triangular area above the bladder neck, bounded by the two ureteral openings and the internal urethral orifice."],
      ["What is the detrusor muscle?", "The smooth muscle of the bladder wall."],
      ["Why does the detrusor muscle contract as a single unit?", "Low-resistance electrical pathways between fused muscle cells let an action potential spread through the whole muscle at once."],
      ["Which nerves carry parasympathetic motor fibers to the detrusor muscle?", "Pelvic nerves (S2–S3)."],
      ["What sensory role do pelvic nerves also serve?", "Detecting bladder wall stretch."],
      ["Which nerve carries skeletal motor fibers to the external urethral sphincter?", "The pudendal nerve — provides voluntary control of the sphincter."],
      ["Which nerves carry sympathetic innervation to the bladder?", "Hypogastric nerves, from the L2 sympathetic chain."],
      ["What do hypogastric nerve fibers mainly do?", "Stimulate blood vessels, with some sensory fibers for fullness/pain."],
      ["What is the micturition reflex?", "An autonomic spinal cord reflex that empties the bladder once wall tension crosses a threshold."],
      ["What modulates the micturition reflex?", "The cerebral cortex and brainstem — can inhibit or facilitate it."],
      ["What is the GFR equation?", "GFR = Kf × Net Filtration Pressure, where Net Filtration Pressure = PG (glomerular hydrostatic) − PB (Bowman's capsule hydrostatic) − πG (glomerular oncotic) + πB (Bowman's capsule oncotic)."],
      ["Which determinant of GFR is most subject to physiological control?", "Glomerular hydrostatic pressure (PG)."],
      ["How does Bowman's capsule hydrostatic pressure (PB) behave relative to GFR?", "It normally changes as a function of GFR, rather than regulating it."],
      ["What is the myogenic mechanism of renal autoregulation?", "Increased arterial pressure stretches the afferent arteriole, triggering constriction — this limits the rise in glomerular hydrostatic pressure and keeps GFR stable."],
      ["What is tubuloglomerular feedback?", "A GFR-stabilizing mechanism where macula densa cells (part of the JGA) sense NaCl delivery to the distal tubule and adjust afferent arteriole tone."],
      ["What happens when the macula densa senses increased NaCl delivery?", "Adenosine/ATP release constricts the afferent arteriole, so GFR falls back toward normal."],
      ["What happens when the macula densa senses decreased NaCl delivery?", "More renin is released, raising angiotensin II — maintaining GFR despite reduced renal perfusion."],
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
      ["PG", "Glomerular hydrostatic pressure"],
      ["Myogenic mechanism", "Afferent arteriole stretch → constriction"],
      ["Tubuloglomerular feedback", "Macula densa senses NaCl, adjusts afferent tone"],
      ["Renal autoregulation range", "~80–180 mmHg"]
    ]},
  { id: "physio-renal-2", name: "Renal II: Nephron & RAAS", color: "accent2",
    icon: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    cards: [
      ["What triggers renin release from the JGA?", "Reduced renal perfusion pressure, reduced NaCl delivery to the macula densa, or increased sympathetic stimulation (via β1 adrenoreceptors)."],
      ["What does renin do?", "Converts angiotensinogen to angiotensin I."],
      ["What does ACE do?", "Converts angiotensin I to angiotensin II."],
      ["What are angiotensin II's downstream effects?", "Increases aldosterone release, Na+ reabsorption, efferent arteriole constriction, ADH release, and thirst — raising blood volume and pressure."],
      ["What does aldosterone do to principal cells?", "Increases Na+ reabsorption and K+ secretion, via Na+/K+ ATPase, ENaC, and ROMK channels."],
      ["What does aldosterone do to intercalated cells?", "Increases H+ secretion."],
      ["What triggers ADH release?", "Rising plasma osmolality (dehydration) or falling blood volume/pressure."],
      ["What is ADH's mechanism of action?", "Binds V2 receptors on principal cells of the late distal tubule/collecting duct, inserting aquaporin-2 channels into the apical membrane."],
      ["What does atrial natriuretic peptide (ANP) promote?", "Sodium and water excretion (natriuresis/diuresis) — the opposite direction from aldosterone and ADH."],
      ["What does PTH do at the early distal tubule?", "Enhances calcium reabsorption through apical calcium channels (TRPV5)."],
      ["What else is notable about the early distal tubule?", "The macula densa sits here, and ~5% of filtered NaCl is normally reabsorbed."],
      ["What generates the corticomedullary osmotic gradient in the countercurrent multiplier?", "Active NaCl reabsorption by the water-impermeable thick ascending limb, combined with water leaving the descending limb."],
      ["What is the role of the vasa recta as a countercurrent exchanger?", "Low-volume countercurrent blood flow that preserves the corticomedullary gradient while still supplying the medulla."]
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
      ["Which anterior pituitary cell type produces growth hormone?", "Somatotropes."],
      ["What does GH do metabolically?", "Increases protein synthesis, increases fat utilization, and decreases carbohydrate utilization."],
      ["Where is ADH produced?", "Mainly in the supraoptic nuclei of the hypothalamus (80–90%)."],
      ["Where does ADH act?", "The kidney and vasculature."],
      ["Where is oxytocin produced?", "The paraventricular nucleus of the hypothalamus."],
      ["What does oxytocin do?", "Acts on breast myoepithelial cells and the uterus to cause milk let-down and uterine contraction."],
      ["What happens to BMR and thermogenesis with high T3/T4?", "Both increase — basal metabolic rate rises and thermogenesis rises."],
      ["What happens to protein and carbohydrate metabolism with high T3/T4?", "Protein synthesis and proteolysis both increase; gluconeogenesis, glycogenolysis, and glycolysis all increase, while serum cholesterol decreases."],
      ["Why does T3 act faster than T4 despite T4 being secreted in greater amounts?", "T3 has higher receptor affinity and a shorter latency (6–12 hours) than T4 (2–3 days), even though T4's activity half-life is much longer (~15 days)."],
      ["What are the cardiovascular effects of thyroid hormone?", "Increased cardiac output and tissue blood flow, increased heart rate, and increased contractile strength at mild elevations."],
      ["How is prolactin secretion normally controlled, unlike the other anterior pituitary hormones?", "It's tonically inhibited by dopamine (prolactin-inhibiting hormone), rather than stimulated by a releasing hormone."]
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
      ["What happens with high aldosterone?", "Hypokalemia, muscle weakness, slow heart rate/arrhythmias, and cell alkalosis."],
      ["What happens with low aldosterone?", "Hyperkalemia, increased muscle excitability early on, arrhythmias/V-fib, and cell acidosis."],
      ["What does cortisol do to carbohydrate metabolism?", "Increases gluconeogenesis, moderately decreases glucose utilization, and raises blood glucose."],
      ["What does cortisol do to protein metabolism in most tissues?", "Decreases protein stores — decreased synthesis, increased catabolism, decreased amino acid transport."],
      ["Where is the exception to cortisol's usual effect on protein metabolism?", "The liver — cortisol increases protein synthesis and amino acid uptake there."],
      ["How does insulin increase glucose uptake in skeletal muscle and fat cells?", "Increases membrane permeability and GLUT transporter activity, working within seconds."],
      ["Does insulin increase glucose uptake into the brain?", "No — the brain uses GLUT1, which isn't insulin-dependent."],
      ["How does insulin promote glucose storage in the liver?", "Inactivates liver phosphorylase (stops glycogen breakdown), increases glucokinase (traps glucose), and increases glycogen synthase — building liver glycogen."],
      ["Where is glucagon produced, and what does it act on?", "α cells of the pancreatic islets; acts on the liver."],
      ["What does glucagon do to the liver?", "Increases glycogenolysis and gluconeogenesis — the opposite of insulin, raising plasma glucose."],
      ["What does PTH do to plasma calcium and vitamin D production?", "Increases plasma calcium and increases renal production of active vitamin D (1,25-dihydroxycholecalciferol)."],
      ["How does PTH increase calcium/phosphate release from bone?", "By activating osteocytes and promoting osteoclast proliferation."]
    ],
    matchCards: [
      ["High aldosterone", "Hypokalemia, muscle weakness"],
      ["Low aldosterone", "Hyperkalemia, arrhythmia risk"],
      ["Cortisol + carbs", "↑ Gluconeogenesis, ↑ blood glucose"],
      ["Cortisol + protein (liver)", "↑ Synthesis (liver exception)"],
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
      ["What does testosterone do to the genitalia and secondary sex characteristics at puberty?", "Enlarges the penis, scrotum, and testes; promotes axillary/chest/pubic/facial hair and voice deepening."],
      ["What does testosterone do to skin, muscle, and bone?", "Thickens skin with more sebaceous secretion, and increases muscle mass and bone density."],
      ["What does testosterone do to red blood cells and renal Na+ handling?", "Increases RBC production, and causes a minor increase in distal-tubule Na+ reabsorption."],
      ["What does testosterone do to metabolism at puberty?", "Increases basal metabolic rate by 5–10%, largely from increased protein anabolism."],
      ["What does GnRH do in the male reproductive axis?", "Pulses every 1–3 hours from the hypothalamus, stimulating LH release from the anterior pituitary."],
      ["What does LH do in the male reproductive axis?", "Stimulates testosterone production by the testes."],
      ["What does estrogen do to GnRH/LH/FSH for most of the cycle?", "Suppresses them (negative feedback)."],
      ["What does estrogen do to GnRH/LH/FSH preovulatory?", "Switches to stimulating them — this is the LH surge that triggers ovulation."],
      ["What does progesterone do to GnRH/LH/FSH for most of the cycle?", "Suppresses them, like estrogen."],
      ["What does progesterone do to GnRH/LH/FSH preovulatory?", "Switches to stimulating them, mirroring estrogen's pattern."],
      ["What happens hormonally right before a new ovulatory cycle begins?", "Estrogen and progesterone from the corpus luteum fall, relieving suppression on GnRH/LH/FSH and allowing a new cycle to begin."],
      ["What does estrogen do to breast tissue during pregnancy?", "Promotes breast size and duct growth, along with GH, prolactin, cortisol, and insulin."],
      ["What does progesterone do to breast tissue during pregnancy?", "Promotes development of breast lobules, alveoli, and secretory characteristics."],
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
    ]},
  { id: "cam-human-nutrition", name: "Introduction to Human Nutrition", color: "accent3",
    icon: '<path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="9"/>',
    cards: [
      ["What is the definition of nutrition?", "The science that links foods to health."],
      ["What three criteria define an essential nutrient?", "A specific biological function is identified; omitting it from the diet causes a decline in that function; replacing it restores normal function."],
      ["What are the six classes of nutrients?", "Carbohydrates, proteins, lipids, vitamins, minerals, and water."],
      ["Which nutrient classes are macronutrients?", "Carbohydrates, protein, and lipids/fat (plus water) — they provide calories, needed in gram quantities."],
      ["Which nutrient classes are micronutrients?", "Vitamins and minerals — no calories, needed only in milligram/microgram quantities."],
      ["How many kcal per gram do carbohydrates provide?", "About 4 kcal/gram."],
      ["How many kcal per gram does protein provide?", "About 4 kcal/gram."],
      ["How many kcal per gram do lipids provide?", "About 9 kcal/gram."],
      ["How many kcal per gram does alcohol provide?", "7 kcal/gram."],
      ["What is a kilocalorie (kcal)?", "The amount of heat needed to raise the temperature of 1000g (1L) of water by 1°C — the same as a food Calorie (capital C)."],
      ["What BMI range is considered a healthy body weight?", "18.5–24.99."],
      ["What BMI range defines Class 1 obesity?", "30–34.99."],
      ["Per 2018 CDC data cited in this lecture, about what percent of the US population was classified as obese?", "41%."],
      ["What was the majority macronutrient source of calories in the 2018 American diet (NHANES)?", "Carbohydrates — 46.7% of kcal (recommended range 45–65%)."],
      ["Which macronutrient's average intake exceeded its recommended range in the 2018 NHANES data cited?", "Fat — 35.8% of kcal, just above the 20–35% advised range."],
      ["What government agencies set the Dietary Guidelines for Americans?", "USDA and DHHS (Department of Health and Human Services)."],
      ["How often are the Dietary Guidelines for Americans published?", "Every 5 years."],
      ["How does MyPlate divide the plate among food groups?", "Fruits and vegetables cover half; grains occupy about one-fourth; protein occupies the other one-fourth; a cup of dairy is shown alongside."],
      ["What's the difference between nutrient density and energy density?", "Nutrient density compares a nutrient's content to a food's calories; energy density compares a food's calorie content to its weight."],
      ["What credentialing does a Registered Dietitian (RD) require?", "A four-year degree, a post-graduate internship in most cases, and passing the national RD exam through the Academy of Nutrition and Dietetics."],
      ["What is the recommended weekly physical activity target for health promotion, per this lecture?", "150 minutes/week (30–60 minutes on most or all days)."],
      ["What is the recommended alcohol moderation limit per this lecture's lifestyle guidance?", "No more than two drinks per day for men, one for women."]
    ],
    matchCards: [
      ["Carbohydrates", "4 kcal/gram"],
      ["Protein", "4 kcal/gram"],
      ["Lipids (fat)", "9 kcal/gram"],
      ["Alcohol", "7 kcal/gram"],
      ["Macronutrients", "Carbs, protein, lipids (+ water)"],
      ["Micronutrients", "Vitamins & minerals"],
      ["Essential nutrient", "Must be supplied by diet"],
      ["Healthy BMI range", "18.5–24.99"],
      ["Nutrient density", "Nutrient content vs. calories"],
      ["Energy density", "Calorie content vs. food weight"],
      ["MyPlate protein portion", "~1/4 of the plate"],
      ["Dietary Guidelines publisher", "USDA & DHHS"],
      ["Registered Dietitian (RD)", "4-yr degree + internship + national exam"]
    ]},
  { id: "cam-macro-micro-water", name: "Macronutrients, Micronutrients & Water", color: "accent4",
    icon: '<path d="M12 2C8 7 5 10.5 5 14a7 7 0 0 0 14 0c0-3.5-3-7-7-12z"/>',
    cards: [
      ["What is glycogen, and where is it stored?", "Highly branched glucose molecules synthesized in the liver, stored in liver and muscle for quick availability."],
      ["What are the two types of digestible starch?", "Amylopectin (highly branched) and amylose (long, straight chain)."],
      ["What are the three types of dietary fiber?", "Insoluble (nonfermentable), soluble/viscous (fermentable), and functional fiber (isolated nondigestible carbohydrates added to foods)."],
      ["How does soluble fiber help lower blood cholesterol?", "It reduces cholesterol absorption in the gut and reduces cholesterol synthesis in the liver."],
      ["What defines hyperglycemia, per this lecture?", "Fasting blood glucose greater than 125 mg per 100 mL of blood."],
      ["What defines hypoglycemia in a nondiabetic, per this lecture?", "Below 40–50 mg per 100 mL of blood."],
      ["What is the main cause of Type 1 diabetes?", "Autoimmune destruction of the pancreas."],
      ["What is the main cause of Type 2 diabetes?", "Insulin resistance."],
      ["What does the HbA1c test measure?", "Average blood sugar over the past three months."],
      ["What is the RDA for carbohydrate intake in adults?", "130 grams per day."],
      ["What is the Food and Nutrition Board's upper limit for added sugar intake?", "25% of total kcal."],
      ["What structurally distinguishes a saturated fatty acid from an unsaturated one?", "Saturated fatty acids have only single carbon bonds; unsaturated fatty acids have one or more double bonds."],
      ["What are the three types of lipids found in the body?", "Triglycerides, phospholipids, and sterols (cholesterol)."],
      ["What are the two essential fatty acids that must come from the diet?", "Omega-3 (alpha-linolenic acid) and omega-6 (linoleic acid)."],
      ["What does hydrogenation do to an oil?", "Adds hydrogen to a double carbon bond, converting liquid oil into a firmer solid fat."],
      ["Which lipoprotein carries dietary fat from the small intestine to cells?", "Chylomicron."],
      ["Which lipoprotein carries cholesterol made by the liver to cells?", "LDL."],
      ["Why is HDL considered protective against cardiovascular disease?", "It removes cholesterol from the bloodstream and may block oxidation of LDL."],
      ["What percentage of daily calories should come from fat, per the Dietary Guidelines?", "20% to 35% of calories."],
      ["How many amino acids are essential (must be consumed from the diet)?", "9."],
      ["What defines a complete protein?", "It contains ample amounts of all 9 essential amino acids and is readily digestible."],
      ["How is estimated protein need calculated?", "0.8 grams of protein per kilogram of healthy body weight."],
      ["What happens to fluid balance when protein intake is too low?", "Excess fluid builds up in tissues, causing edema."],
      ["What nutrient deficiencies do vegan diets specifically need to watch for?", "Vitamin B12, vitamin D, calcium, iron, zinc, and omega-3 fatty acids."],
      ["Which vitamins are fat-soluble?", "A, D, E, and K."],
      ["Which vitamins are water-soluble?", "The B vitamins and vitamin C."],
      ["Why are fat-soluble vitamin toxicities more of a concern than water-soluble ones?", "Fat-soluble vitamins (A, D, E) aren't readily excreted from the body, unlike water-soluble vitamins, which are excreted in urine."],
      ["What is bioavailability?", "The degree to which an ingested nutrient is digested and absorbed, making it available for the body to use."],
      ["What are the four major minerals covered in this lecture?", "Calcium, phosphorus, magnesium, and sulfur."],
      ["What percentage of the human body is water?", "50% to 70%."],
      ["What urine output level signals dehydration?", "Below 500 mL (2 cups) per day."],
      ["What is hyponatremia?", "A dangerously low blood sodium level, caused by overhydration diluting the blood."],
      ["What are the daily fluid needs for men and women, per this lecture?", "Men: 3 liters (13 cups); women: 2.2 liters (9 cups)."],
      ["What does the DASH diet emphasize?", "High calcium, potassium, and magnesium; low fat and sodium; rich in fruits, vegetables, and low-fat dairy."]
    ],
    matchCards: [
      ["Chylomicron", "Carries dietary fat, intestine → cells"],
      ["VLDL", "Carries liver-made lipids to cells"],
      ["LDL", "Carries cholesterol to cells"],
      ["HDL", "Removes cholesterol from bloodstream"],
      ["Vitamin A", "Vision, gene expression, immune function"],
      ["Vitamin D", "Serum calcium/phosphorus, bone health"],
      ["Vitamin E", "Antioxidant"],
      ["Vitamin K", "Blood clotting, bone metabolism"],
      ["Vitamin B12", "Coenzyme in RBC synthesis"],
      ["Vitamin C", "Connective tissue, antioxidant, iron absorption"],
      ["Folate", "Nucleic acid & RBC synthesis"],
      ["Calcium", "Blood clotting, muscle, bone"],
      ["Iron", "Component of hemoglobin"],
      ["Zinc", "Enzymes, wound healing, growth"],
      ["Iodine", "Component of thyroid hormones"],
      ["Sodium", "Extracellular fluid balance"],
      ["Potassium", "Fluid/electrolyte balance"],
      ["Omega-3 fatty acid", "Alpha-linolenic acid; heart health"]
    ]},
  { id: "cam-special-topics", name: "Special Topics: Malnutrition & Nutrition Support", color: "accent2",
    icon: '<path d="M20 6L9 17l-5-5"/>',
    cards: [
      ["What is malnutrition, per this lecture's definition?", "An acute, subacute, or chronic nutrition state where over- or under-nutrition, with or without inflammation, leads to altered body composition and diminished function."],
      ["What are the three etiology-based nutrition diagnoses used in adults?", "Starvation-related, chronic disease-related, and acute disease/injury-related malnutrition."],
      ["What percentage of hospitalized US adults are estimated to be malnourished?", "20% to 50%."],
      ["How much longer is the hospital length of stay for malnourished older adults?", "40% to 70% longer."],
      ["What BMI range is usually incompatible with life?", "11–13."],
      ["Why doesn't a normal BMI rule out malnutrition?", "Many malnourished patients have normal or above-normal BMIs due to residual obesity or an expanded extracellular fluid volume."],
      ["Which malnutrition marker has the shortest half-life, making it most sensitive to recent change?", "Retinol binding protein — about a 12-hour half-life."],
      ["Why can't albumin alone reliably diagnose malnutrition?", "It's affected by inflammation, stress, renal/liver disease, hydration status, and certain medications — hypoalbuminemia won't improve with nutrition therapy alone if systemic inflammation persists."],
      ["What is enteral nutrition?", "Nutrition delivered to the GI tract using a special tube, bypassing the mouth."],
      ["What is parenteral nutrition?", "Nutrition delivered directly into a vein (IV)."],
      ["What is the guiding principle for choosing enteral over parenteral nutrition?", "\"If the gut works, use it\" — enteral nutrition is more physiologic, lower risk, and more cost-effective."],
      ["What are two contraindications for enteral nutrition (indications for parenteral instead)?", "Severe ileus or feeding intolerance, and intestinal obstruction."],
      ["What's the difference between peripheral (PPN) and total (TPN) parenteral nutrition?", "PPN is delivered through a peripheral line for a few days to 2 weeks with limited calories/osmolarity; TPN needs central access but can provide full nutritional needs."],
      ["What is refeeding syndrome?", "A metabolic complication when nutrition support is given to severely malnourished patients — a shift from catabolism to anabolism drives electrolytes into cells."],
      ["What three electrolyte abnormalities characterize refeeding syndrome?", "Hypophosphatemia, hypokalemia, and hypomagnesemia."],
      ["What must be given before any dextrose in a refeeding-risk patient, and why?", "Thiamine (B1) — the shift to carbohydrate metabolism requires thiamine as a cofactor, and stores are often already depleted."],
      ["What neurological complication can untreated thiamine deficiency during refeeding cause?", "Wernicke's and Korsakoff encephalopathy."],
      ["What micronutrients matter most for pressure wound healing?", "Zinc, vitamin A, and vitamin C — but avoid over-supplementing vitamin A, which can cause toxicity."],
      ["How does nutrition management change in CKD stages 3-5 (pre-dialysis)?", "Reduce sodium, phosphorus, potassium, and protein intake."],
      ["Why is protein restriction no longer recommended in chronic liver disease?", "It doesn't improve hepatic encephalopathy and instead breaks down muscle mass, raising ammonia levels."],
      ["What dietary approach helps manage heart failure?", "Limit sodium and monitor fluid intake, and choose unsaturated, plant-based fats to protect the heart."],
      ["What nutritional priority applies to trauma patients?", "Start nutrition support early — trauma causes a hypermetabolic state with increased calorie and protein needs for wound healing and to prevent lean muscle loss."]
    ],
    matchCards: [
      ["Enteral nutrition", "Tube feeding to the GI tract"],
      ["Parenteral nutrition", "IV nutrition"],
      ["Refeeding syndrome", "Metabolic shift, malnourished + refeeding"],
      ["Hypophosphatemia", "Refeeding syndrome hallmark"],
      ["Thiamine (B1)", "Give before dextrose in refeeding risk"],
      ["Albumin half-life", "3 weeks"],
      ["Prealbumin half-life", "3 days"],
      ["Retinol binding protein half-life", "12 hours"],
      ["Transferrin half-life", "8–10 days"],
      ["TPN", "Central access, full nutrition needs"],
      ["PPN", "Peripheral line, limited osmolarity"],
      ["Pressure wound micronutrients", "Zinc, vitamin A, vitamin C"],
      ["CKD 3-5 diet", "↓ Na, phosphorus, K, protein"],
      ["“If the gut works, use it”", "Enteral nutrition principle"]
    ]},
  { id: "cam-weight-control", name: "Weight Control", color: "accent",
    icon: '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="4"/>',
    cards: [
      ["What is energy balance?", "Energy intake equals energy output — food/beverage energy matches what's expended through metabolism and activity."],
      ["What results from positive energy balance?", "Weight gain — energy intake exceeds energy expended."],
      ["What results from negative energy balance?", "Weight loss — energy expended exceeds intake."],
      ["About how many kcal does 1 pound of weight loss represent?", "Approximately 3,500 kcal."],
      ["What percentage of total energy needs does basal metabolism (BMR) account for?", "60% to 80%."],
      ["What percentage of total energy needs does physical activity account for?", "15% to 30%."],
      ["What percentage of total energy needs does the thermic effect of food (TEF) account for?", "8% to 15%."],
      ["Which macronutrient has the highest thermic effect of food?", "Protein, followed by carbohydrate, then fat."],
      ["What is the single most significant contributor to basal metabolic rate?", "Lean body mass (LBM)."],
      ["What is nonexercise activity thermogenesis (NEAT)?", "Energy burned through body posture, ambulation, and spontaneous movements like fidgeting — not intentional exercise."],
      ["What is adaptive thermogenesis?", "Nonvoluntary heat production triggered by overeating or environmental temperature changes — fidgeting, shivering, maintaining muscle tone and posture."],
      ["What does direct calorimetry measure?", "Body heat output, using an insulated chamber."],
      ["What does indirect calorimetry measure?", "Oxygen intake and carbon dioxide output, used to estimate energy expenditure."],
      ["What BMI range defines “normal” weight?", "18.50–24.99."],
      ["What BMI defines Class III (most severe) obesity?", "≥40.00."],
      ["What are the acceptable body fat percentage ranges for women and men?", "Women: 23–31%; men: 13–21%."],
      ["What waist circumference defines abdominal (android) obesity?", "Greater than 40 inches for men, greater than 35 inches for women."],
      ["What health risks are specifically associated with upper-body (android, “apple”) fat distribution?", "Insulin resistance, fatty liver, and increased risk of cancer, type 2 diabetes, high blood lipids, and heart disease."],
      ["What hormones encourage lower-body (gynoid, “pear”) fat distribution?", "Estrogen and progesterone."],
      ["Which body-fat measurement method is most accurate, but expensive?", "Dual X-ray photon absorptiometry (DXA)."],
      ["What is the recommended rate of weight loss in a sound weight-loss plan?", "1 to 2 pounds per week."],
      ["What are the three key principles of the weight-loss triad?", "Restricting calories, adding physical activity, and adding an appropriate behavioral component."],
      ["About how much should daily calorie intake be reduced to lose about 1 pound of fat per week?", "About 500 kcal per day."],
      ["What are the “3 Ms” of weight-loss maintenance and relapse prevention?", "Motivation, movement, and monitoring."],
      ["What BMI criteria make a patient a candidate for weight-loss medication?", "BMI ≥30, or BMI ≥27 with at least one obesity-related comorbid condition."],
      ["How does orlistat work?", "Reduces fat digestion by about 30% by inhibiting the lipase enzyme in the small intestine."],
      ["What BMI criteria qualify a patient for bariatric surgery?", "BMI ≥40, or BMI ≥35 with obesity-related comorbid conditions."],
      ["What distinguishes gastric bypass from adjustable gastric banding?", "Bypass produces greater weight loss and reroutes the small intestine but carries higher surgical risk and is hard to reverse; banding is reversible with lower deficiency risk but less weight loss."],
      ["What defines underweight, by BMI?", "BMI below 18.5."],
      ["About how many people in the US lived in food-insecure households in 2022, per this lecture?", "44.2 million."],
      ["What are common warning signs of an unreliable “fad” diet?", "Promises rapid weight loss, restricts food selections, relies on personal testimonials, and claims to be a cure-all."]
    ],
    matchCards: [
      ["Positive energy balance", "Intake > output → weight gain"],
      ["Negative energy balance", "Output > intake → weight loss"],
      ["BMR", "60–80% of energy needs"],
      ["NEAT", "Fidgeting, posture, spontaneous movement"],
      ["TEF", "Energy to digest/absorb food"],
      ["Direct calorimetry", "Measures body heat output"],
      ["Indirect calorimetry", "Measures O2/CO2 exchange"],
      ["DXA", "Most accurate body fat measure"],
      ["Android (apple) obesity", "Upper-body fat, insulin resistance"],
      ["Gynoid (pear) obesity", "Lower-body fat, estrogen-driven"],
      ["Weight-loss triad", "Calories, activity, behavior"],
      ["3 Ms of maintenance", "Motivation, movement, monitoring"],
      ["Orlistat", "Inhibits intestinal lipase"],
      ["Semaglutide", "Ozempic/Wegovy"],
      ["Bariatric surgery BMI criteria", "≥40, or ≥35 with comorbidity"],
      ["Underweight BMI", "<18.5"]
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
  ]},
  { id: "cam-nutrition", name: "CAM/Nutrition", exams: [
    { id: "exam1", name: "Exam 1", deckIds: [
      "cam-human-nutrition", "cam-macro-micro-water",
      "cam-special-topics", "cam-weight-control"
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

// Picks `count` distractors for a multiple-choice question, preferring
// answers whose word count is close to the correct answer's -- without
// this, a deck mixing short "which nerve..." answers with long
// "what's the mechanism..." answers lets the correct choice get spotted
// by being the only short/long option in the list, rather than by
// actually knowing the fact (see arcade-content-policy memory). Sorts all
// eligible candidates by length-closeness, keeps a pool of the closest
// 2x`count` (or fewer, on small decks), then shuffles WITHIN that pool so
// repeat sessions still vary instead of always showing the same 3.
function pickDistractors(cards, excludeIdx, correctText, count) {
  var correctWords = correctText.trim().split(/\s+/).length;
  var candidates = cards
    .map(function (c, i) { return { text: c[1], i: i }; })
    .filter(function (c) { return c.i !== excludeIdx && c.text !== correctText; });
  candidates.sort(function (a, b) {
    return Math.abs(a.text.trim().split(/\s+/).length - correctWords) -
           Math.abs(b.text.trim().split(/\s+/).length - correctWords);
  });
  var pool = candidates.slice(0, Math.min(candidates.length, count * 2));
  return shuffle(pool).slice(0, count).map(function (c) { return c.text; });
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
