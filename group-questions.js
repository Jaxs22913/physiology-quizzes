// Question banks for Group Study (Kahoot-style live sessions). Kept separate
// from theme.js/group-study.js since this is pure data, not logic.
//
// Each entry is keyed by a stable quiz id (used in the host UI's quiz
// picker and stored on the room doc) and shaped as:
//   { title: string, questions: [ { q: string, choices: string[4], answer: 0-3, exp: string } ] }
// This is a DIFFERENT, deliberately simpler shape than any individual
// quiz file's own in-page question format (which varies across the site's
// 6 quiz-engine families -- see feedback_exam_mode memory) -- ported by
// hand per quiz rather than trying to read each file's bespoke format
// live. To add another quiz to Group Study: extract its question array
// (e.g. via a quick headless-Chrome eval of `JSON.stringify(questions)`
// on the real page, which sidesteps hand-transcribing 30-70 questions)
// into this same {q, choices, answer, exp} shape and add a new key below.
// See feedback_group_study memory for the full design.
window.GROUP_QUIZZES = {
  "gi-physiology": {
    "title": "GI Physiology",
    "questions": [
      {
        "q": "Peristalsis (the propulsive movement of the gut) fundamentally requires...",
        "choices": [
          "The sympathetic nervous system to initiate the contraction",
          "The sphincter of Oddi to open first",
          "The myenteric (Auerbach's) plexus, and can occur without the autonomic nervous system",
          "Complete removal of the enteric nervous system"
        ],
        "answer": 2,
        "exp": "Peristalsis is coordinated by the enteric (myenteric) plexus and proceeds even without autonomic input, though the parasympathetics modulate it. It does not require the sympathetic system to start, the sphincter of Oddi, or removal of the ENS — destroying the ENS actually abolishes it."
      },
      {
        "q": "According to the “law of the gut,” a bolus that distends the intestine causes...",
        "choices": [
          "Contraction on the orad (upstream) side and relaxation on the downstream (aboral) side",
          "Relaxation on both sides at the same time",
          "Contraction ahead of the bolus, pushing it backward",
          "No coordinated response unless the sympathetic nerves fire"
        ],
        "answer": 0,
        "exp": "Distension makes the segment behind the bolus contract while the segment ahead relaxes, propelling contents aborally. Simultaneous relaxation, contraction ahead of the bolus, or dependence on sympathetic input all misdescribe this reflex."
      },
      {
        "q": "Segmentation contractions serve mainly to...",
        "choices": [
          "Rapidly propel chyme toward the colon",
          "Mix chyme with digestive secretions rather than propel it",
          "Keep the sphincters tonically closed",
          "Trigger the defecation reflex"
        ],
        "answer": 1,
        "exp": "Segmentation is a mixing movement that churns chyme with secretions and improves mucosal contact, with little net propulsion. Propulsion is peristalsis, tonic closure is a sphincter role, and the defecation reflex is a separate event."
      },
      {
        "q": "In GI smooth muscle, what is the role of “slow waves”?",
        "choices": [
          "They directly cause every contraction by themselves",
          "They are action potentials that always produce contraction",
          "They inhibit all smooth-muscle activity",
          "They are rhythmic membrane oscillations that set the timing; contraction occurs only when they reach threshold and trigger spike potentials"
        ],
        "answer": 3,
        "exp": "Slow waves are subthreshold oscillations (the basic electrical rhythm); a contraction results only when a slow wave is driven to threshold and fires spike potentials. They do not by themselves cause every contraction, are not always action potentials, and are not purely inhibitory."
      },
      {
        "q": "GI smooth muscle behaves as a functional syncytium because...",
        "choices": [
          "Each cell is individually innervated by its own motor neuron",
          "Gap junctions electrically couple the cells, letting action potentials spread from cell to cell",
          "The cells physically fuse into one giant multinucleated fiber",
          "It has no electrical connections between cells"
        ],
        "answer": 1,
        "exp": "Gap junctions provide low-resistance electrical connections, so a signal spreads through the muscle as a unit. The cells are not each individually innervated, do not truly fuse into one fiber, and are certainly electrically connected."
      },
      {
        "q": "How does autonomic input generally affect GI activity?",
        "choices": [
          "Both divisions stimulate the gut equally",
          "Parasympathetic inhibits and sympathetic stimulates",
          "Parasympathetic input mainly stimulates, and sympathetic input mainly inhibits",
          "Neither division affects gut motility"
        ],
        "answer": 2,
        "exp": "Parasympathetic (vagal/pelvic, ACh) activity generally stimulates motility and secretion, while sympathetic (NE) activity generally inhibits. The other options reverse or deny these effects."
      },
      {
        "q": "The migrating motor complex (MMC) functions to...",
        "choices": [
          "Sweep undigested residue toward the colon between meals, keeping upper-gut bacterial counts low",
          "Mix chyme with enzymes right after a meal",
          "Trigger mass movements in the colon",
          "Neutralize gastric acid"
        ],
        "answer": 0,
        "exp": "The MMC is the interdigestive “housekeeping” pattern that clears residue and bacteria from the upper gut between meals, mediated by motilin. It is not a postprandial mixing pattern, does not drive colonic mass movements, and has no role in neutralizing acid."
      },
      {
        "q": "Which gastric cell secretes both hydrochloric acid and intrinsic factor?",
        "choices": [
          "Chief (peptic) cells",
          "G-cells",
          "Mucous neck cells",
          "Parietal (oxyntic) cells"
        ],
        "answer": 3,
        "exp": "Parietal (oxyntic) cells secrete both HCl and intrinsic factor. Chief cells make pepsinogen, G-cells make gastrin, and mucous neck cells make mucus."
      },
      {
        "q": "Pepsinogen is secreted primarily by which cells?",
        "choices": [
          "Chief (peptic) cells",
          "Parietal cells",
          "G-cells",
          "ECL cells"
        ],
        "answer": 0,
        "exp": "Chief (peptic) cells secrete pepsinogen. Parietal cells make acid and intrinsic factor, G-cells make gastrin, and ECL cells release histamine."
      },
      {
        "q": "How is inactive pepsinogen converted to active pepsin?",
        "choices": [
          "Bile salts activate it in the duodenum",
          "Enterokinase cleaves it at the brush border",
          "It is secreted already active",
          "Gastric acid converts it to pepsin, which then activates more pepsinogen (autocatalysis)"
        ],
        "answer": 3,
        "exp": "Acid converts pepsinogen to pepsin, and the pepsin formed activates still more pepsinogen — an autocatalytic loop. Bile salts and enterokinase act on other substances, and pepsinogen is secreted inactive."
      },
      {
        "q": "Why is intrinsic factor considered the only indispensable component of gastric juice?",
        "choices": [
          "It is required to activate pepsinogen",
          "It neutralizes duodenal acid",
          "It is required for vitamin B12 absorption in the ileum",
          "It emulsifies dietary fat"
        ],
        "answer": 2,
        "exp": "Intrinsic factor binds vitamin B12 so the complex can be absorbed in the ileum, and its loss causes B12 deficiency — which is why it is the one indispensable gastric secretion. It does not activate pepsinogen, neutralize acid, or emulsify fat."
      },
      {
        "q": "Which is a physiological function of gastric acid (HCl)?",
        "choices": [
          "Emulsifying fats for absorption",
          "Converting pepsinogen to pepsin and providing a bacteriostatic environment",
          "Directly absorbing amino acids",
          "Neutralizing chyme entering the duodenum"
        ],
        "answer": 1,
        "exp": "Gastric acid activates pepsinogen to pepsin, begins protein digestion, and limits ingested microbes (bacteriostatic). It does not emulsify fat, absorb amino acids, or neutralize duodenal chyme — that is bicarbonate's role."
      },
      {
        "q": "Gastrin and acetylcholine strongly stimulate acid secretion partly by triggering release of which paracrine agent from ECL cells?",
        "choices": [
          "Somatostatin",
          "Secretin",
          "Motilin",
          "Histamine"
        ],
        "answer": 3,
        "exp": "Gastrin and ACh stimulate ECL cells to release histamine, which powerfully drives parietal-cell acid secretion. Somatostatin and secretin inhibit acid, and motilin governs interdigestive motility."
      },
      {
        "q": "When the antral pH becomes very low, gastrin release is inhibited largely because acid...",
        "choices": [
          "Directly destroys the G-cells",
          "Stimulates somatostatin release, which suppresses gastrin (negative feedback)",
          "Converts gastrin into secretin",
          "Increases histamine release"
        ],
        "answer": 1,
        "exp": "A low antral pH stimulates somatostatin, which inhibits gastrin release — a negative-feedback brake on acid secretion. Acid does not destroy G-cells, convert gastrin to secretin, or raise histamine."
      },
      {
        "q": "Besides stimulating gastric acid secretion, gastrin has what other notable action?",
        "choices": [
          "A trophic effect promoting growth of the oxyntic (gastric) mucosa",
          "Emptying the gallbladder",
          "Stimulating pancreatic enzyme secretion",
          "Inhibiting all gastric secretion"
        ],
        "answer": 0,
        "exp": "Beyond stimulating acid, gastrin is trophic to the oxyntic mucosa, promoting its growth. Gallbladder emptying and pancreatic enzyme secretion are CCK's actions, and gastrin stimulates rather than inhibits gastric secretion."
      },
      {
        "q": "Which luminal stimulus most strongly triggers CCK release from duodenal I-cells?",
        "choices": [
          "Intact triglycerides",
          "Glucose alone",
          "Fatty acids and monoglycerides (products of fat digestion), plus peptides and amino acids",
          "Water"
        ],
        "answer": 2,
        "exp": "CCK release is triggered by fat-digestion products (fatty acids, monoglycerides) and by peptides/amino acids — not by intact triglycerides, glucose alone, or water."
      },
      {
        "q": "A major action of CCK is to...",
        "choices": [
          "Contract the gallbladder and relax the sphincter of Oddi, delivering bile to the intestine",
          "Stimulate gastric acid secretion",
          "Relax the gallbladder so it stores more bile",
          "Neutralize acid by directly secreting bicarbonate"
        ],
        "answer": 0,
        "exp": "CCK contracts the gallbladder and relaxes the sphincter of Oddi, sending bile and pancreatic enzymes into the duodenum. It does not stimulate acid, promote bile storage, or directly secrete bicarbonate."
      },
      {
        "q": "Secretin is called “nature's antacid” because, in response to duodenal acid, it...",
        "choices": [
          "Directly buffers acid within the stomach",
          "Stimulates more gastrin release",
          "Stimulates pancreatic and biliary bicarbonate secretion and inhibits gastric acid",
          "Increases gastric emptying of acid"
        ],
        "answer": 2,
        "exp": "Secretin, released by duodenal acid, drives bicarbonate secretion from pancreas and bile ducts and inhibits gastric acid and gastrin. It does not buffer acid directly in the stomach, raise gastrin, or speed acid emptying."
      },
      {
        "q": "Glucose-dependent insulinotropic peptide (GIP) is notable because it...",
        "choices": [
          "Is the main stimulus for gallbladder contraction",
          "Activates pancreatic proteolytic enzymes",
          "Is released only during fasting",
          "Stimulates insulin release in response to oral nutrients (an incretin effect)"
        ],
        "answer": 3,
        "exp": "GIP is an incretin: oral nutrients trigger it to enhance insulin release (and it inhibits gastric acid). Gallbladder contraction is CCK's role, zymogen activation is enterokinase/trypsin, and GIP is released after eating, not during fasting."
      },
      {
        "q": "Which hormone is released cyclically during fasting to drive the migrating motor complexes?",
        "choices": [
          "Cholecystokinin",
          "Motilin",
          "Secretin",
          "Gastrin"
        ],
        "answer": 1,
        "exp": "Motilin is released cyclically during fasting and drives the migrating motor complexes. CCK, secretin, and gastrin are released in response to a meal and serve digestive rather than interdigestive roles."
      },
      {
        "q": "Which enzyme in saliva begins the digestion of starch in the mouth?",
        "choices": [
          "Pepsin",
          "Trypsin",
          "α-amylase (ptyalin)",
          "Lingual lipase"
        ],
        "answer": 2,
        "exp": "Salivary α-amylase (ptyalin) starts starch digestion in the mouth. Pepsin digests protein in the stomach, trypsin is a pancreatic protease, and lingual lipase acts on fat, not starch."
      },
      {
        "q": "Pepsin works best under what conditions, and what happens as pH rises?",
        "choices": [
          "It works best at alkaline pH and is inactivated by acid",
          "It is optimally active at acidic pH (~1.8–3.5) and is inactivated as pH rises toward neutral",
          "It is equally active across all pH values",
          "It requires bile salts to function"
        ],
        "answer": 1,
        "exp": "Pepsin is optimally active in the acidic stomach (pH ~1.8–3.5) and loses activity as pH climbs toward neutral (irreversibly above pH 7–8). It is not alkaline-optimal, pH-independent, or bile-dependent."
      },
      {
        "q": "After pancreatic amylase acts, where is carbohydrate digestion completed?",
        "choices": [
          "In the stomach by pepsin",
          "Inside the liver",
          "In the colon by bacteria only",
          "At the brush border, by membrane-bound disaccharidases"
        ],
        "answer": 3,
        "exp": "Luminal amylase yields disaccharides and oligosaccharides, and final carbohydrate digestion is completed by brush-border disaccharidases (maltase, sucrase, lactase). It is not finished by gastric pepsin, in the liver, or solely by colonic bacteria."
      },
      {
        "q": "Enterokinase (enteropeptidase) on the intestinal brush border is essential because it...",
        "choices": [
          "Activates trypsinogen to trypsin, which then activates the other pancreatic zymogens",
          "Directly digests triglycerides",
          "Neutralizes gastric acid",
          "Absorbs amino acids"
        ],
        "answer": 0,
        "exp": "Enterokinase converts trypsinogen to trypsin, which then activates chymotrypsinogen, procarboxypeptidase, and more trypsinogen. It does not digest fat, neutralize acid, or absorb amino acids."
      },
      {
        "q": "The final steps of protein digestion (di- and tripeptides to amino acids) occur...",
        "choices": [
          "Only in the stomach lumen",
          "At the brush border and within the cytoplasm of the mucosal cells",
          "Only in the mouth",
          "In the colon"
        ],
        "answer": 1,
        "exp": "Protein digestion finishes at the brush border (oligopeptidases, dipeptidases) and in the enterocyte cytoplasm (di-/tripeptidases). It is not completed in the stomach, mouth, or colon."
      },
      {
        "q": "What is the role of bile salts in fat digestion?",
        "choices": [
          "They emulsify large fat droplets into smaller ones, increasing the surface area for lipase",
          "They chemically break triglycerides into fatty acids",
          "They transport fat directly into the blood",
          "They neutralize stomach acid"
        ],
        "answer": 0,
        "exp": "Bile salts are emulsifiers: they disperse large fat globules into fine droplets, expanding the surface on which pancreatic lipase acts. The chemical breakdown of triglycerides is lipase's job, and bile salts neither carry fat into blood nor neutralize acid."
      },
      {
        "q": "How do the products of fat digestion (monoglycerides and fatty acids) reach the enterocyte surface for absorption?",
        "choices": [
          "Dissolved freely in water and diffusing on their own",
          "Bound to intrinsic factor",
          "Packaged into micelles with bile salts, which ferry them to the brush border",
          "Inside chylomicrons formed in the lumen"
        ],
        "answer": 2,
        "exp": "Because they are poorly water-soluble, monoglycerides and fatty acids are carried in micelles with bile salts to the enterocyte brush border. They do not simply diffuse, bind intrinsic factor, or ride in lumen-formed chylomicrons — chylomicrons form inside the enterocyte."
      },
      {
        "q": "Where are bile salts reabsorbed to be recycled back to the liver?",
        "choices": [
          "In the stomach",
          "In the duodenum",
          "In the colon",
          "In the ileum"
        ],
        "answer": 3,
        "exp": "Bile salts are actively reabsorbed in the ileum and returned to the liver (the enterohepatic circulation). They are not reclaimed in the stomach, duodenum, or colon."
      },
      {
        "q": "The delivery of stored bile into the small intestine after a fatty meal is triggered mainly by...",
        "choices": [
          "Secretin, which contracts the gallbladder",
          "Gastrin, which relaxes the sphincter of Oddi",
          "Motilin, during fasting",
          "CCK, which contracts the gallbladder"
        ],
        "answer": 3,
        "exp": "A fatty or protein-rich meal releases CCK, which contracts the gallbladder and relaxes the sphincter of Oddi to deliver bile. Secretin drives bicarbonate, gastrin governs acid, and motilin acts during fasting."
      },
      {
        "q": "In addition to acting on the pancreas, secretin stimulates the liver/biliary system to secrete...",
        "choices": [
          "Digestive enzymes",
          "Intrinsic factor",
          "Bicarbonate-rich fluid",
          "Larger amounts of bile salts"
        ],
        "answer": 2,
        "exp": "Secretin stimulates the liver and bile ducts (and pancreas) to add bicarbonate-rich fluid that helps neutralize acid. It does not stimulate enzyme, intrinsic-factor, or bile-salt output."
      },
      {
        "q": "The exocrine pancreas serves two key roles as chyme enters the small intestine:",
        "choices": [
          "Absorbing nutrients and storing bile",
          "Supplying digestive enzymes for all nutrient types and bicarbonate to neutralize acid chyme",
          "Producing intrinsic factor and gastrin",
          "Emulsifying fat and reabsorbing bile salts"
        ],
        "answer": 1,
        "exp": "The exocrine pancreas secretes enzymes for carbohydrate, protein, and fat digestion plus bicarbonate to neutralize acidic chyme. It does not absorb nutrients or store bile, make intrinsic factor/gastrin, or emulsify fat (a bile-salt role)."
      },
      {
        "q": "Why are pancreatic proteolytic enzymes secreted as inactive precursors (zymogens)?",
        "choices": [
          "To prevent the pancreas from digesting itself",
          "Because they are only active in the stomach",
          "Because acid is required to synthesize them",
          "To allow them to be absorbed before activation"
        ],
        "answer": 0,
        "exp": "Proteolytic enzymes are stored and secreted as inactive zymogens (with a trypsin inhibitor present) so they cannot digest the pancreas that makes them. They are not stomach-specific, do not require acid for synthesis, and are not absorbed."
      },
      {
        "q": "Once formed, trypsin plays a central role in the intestine by...",
        "choices": [
          "Activating chymotrypsinogen, procarboxypeptidase, and more trypsinogen",
          "Neutralizing acid chyme",
          "Emulsifying fats",
          "Absorbing peptides"
        ],
        "answer": 0,
        "exp": "Trypsin is the master activator: it converts chymotrypsinogen, procarboxypeptidase, and additional trypsinogen to their active forms. Neutralizing acid is bicarbonate's role, emulsifying fat is bile's, and absorption is the mucosa's."
      },
      {
        "q": "Pancreatic acinar cells store a trypsin inhibitor in order to...",
        "choices": [
          "Speed up enzyme activation within the pancreas",
          "Block any trypsin that forms prematurely inside the acinar cells and ducts",
          "Neutralize bicarbonate",
          "Activate chymotrypsin"
        ],
        "answer": 1,
        "exp": "Trypsin inhibitor neutralizes small amounts of trypsin that activate prematurely within acini and ducts, preventing autodigestion; overwhelming it contributes to pancreatitis. It does not accelerate activation, neutralize bicarbonate, or activate chymotrypsin."
      },
      {
        "q": "Pancreatic bicarbonate secretion is important because it...",
        "choices": [
          "Activates trypsinogen directly",
          "Emulsifies dietary fat",
          "Stimulates gastric acid secretion",
          "Neutralizes acidic chyme, creating the pH (~7–8) needed for pancreatic enzymes"
        ],
        "answer": 3,
        "exp": "Pancreatic bicarbonate neutralizes acid entering the duodenum, establishing the near-neutral pH at which pancreatic enzymes work best. It does not activate trypsinogen (enterokinase does), emulsify fat (bile does), or stimulate gastric acid."
      },
      {
        "q": "Pancreatic enzyme secretion versus bicarbonate/fluid secretion are controlled mainly by:",
        "choices": [
          "Both entirely by gastrin",
          "Enzyme output by acid; bicarbonate output by fat",
          "Enzyme secretion by fat and protein (via CCK); bicarbonate/fluid secretion by acid (via secretin)",
          "Both by intrinsic factor"
        ],
        "answer": 2,
        "exp": "Pancreatic enzyme secretion tracks duodenal fat and protein (through CCK), while bicarbonate/fluid secretion tracks duodenal acid (through secretin). Gastrin and intrinsic factor are not the main controllers, and the acid/fat pairing is reversed in the other option."
      },
      {
        "q": "After chylomicrons deliver most of their triglyceride to tissues, the remnants are...",
        "choices": [
          "Excreted in bile unchanged",
          "Reabsorbed in the ileum",
          "Taken up (cleared) by the liver",
          "Converted back into bile salts in the gut"
        ],
        "answer": 2,
        "exp": "After lipoprotein lipase strips triglyceride from chylomicrons in the tissues, the cholesterol-rich remnants are cleared by the liver. They are not excreted intact in bile, reabsorbed in the ileum, or turned into bile salts in the gut."
      },
      {
        "q": "Which lipoprotein returns excess cholesterol from the tissues back to the liver?",
        "choices": [
          "LDL",
          "VLDL",
          "Chylomicrons",
          "HDL"
        ],
        "answer": 3,
        "exp": "HDL performs reverse cholesterol transport, returning excess cholesterol from tissues to the liver. LDL delivers cholesterol to cells, VLDL carries liver-made triglyceride to tissues, and chylomicrons carry dietary fat from the gut."
      },
      {
        "q": "Bile, which is essential for fat emulsification, is produced by which organ?",
        "choices": [
          "The liver",
          "The gallbladder",
          "The pancreas",
          "The duodenal mucosa"
        ],
        "answer": 0,
        "exp": "The liver produces bile continuously; the gallbladder only stores and concentrates it between meals. The pancreas and duodenal mucosa secrete other digestive fluids, not bile."
      },
      {
        "q": "The villi and microvilli of the small intestine are important because they...",
        "choices": [
          "Secrete the pancreatic enzymes",
          "Vastly increase the surface area available for absorption",
          "Neutralize gastric acid",
          "Store bile salts"
        ],
        "answer": 1,
        "exp": "Villi (~10-fold) and microvilli/brush border (~20-fold) hugely amplify the absorptive surface area of the small intestine. They do not secrete pancreatic enzymes, neutralize acid, or store bile salts."
      },
      {
        "q": "Glucose and galactose are absorbed across the intestinal brush border by...",
        "choices": [
          "Simple diffusion down their concentration gradient",
          "Facilitated diffusion that does not use sodium",
          "Endocytosis",
          "Secondary active transport coupled to sodium (SGLT-1)"
        ],
        "answer": 3,
        "exp": "Glucose and galactose share the Na⁺-coupled SGLT-1 carrier, using the sodium gradient (maintained by the Na⁺–K⁺ ATPase) for secondary active transport. They are not absorbed by simple diffusion, sodium-independent facilitated diffusion, or endocytosis."
      },
      {
        "q": "How is fructose absorbed, in contrast to glucose?",
        "choices": [
          "By secondary active transport with sodium",
          "By primary active transport using ATP directly",
          "By facilitated diffusion (GLUT-5), needing no energy or sodium",
          "By endocytosis"
        ],
        "answer": 2,
        "exp": "Fructose crosses via GLUT-5 facilitated diffusion, moving down its gradient without energy or sodium coupling — unlike glucose and galactose. It is not actively transported or taken up by endocytosis."
      },
      {
        "q": "The final products of carbohydrate digestion that are actually absorbed are...",
        "choices": [
          "Monosaccharides, mostly glucose",
          "Disaccharides such as maltose and lactose",
          "Short glucose polymers",
          "Starch fragments"
        ],
        "answer": 0,
        "exp": "Carbohydrates must be reduced to monosaccharides (about 80% glucose, plus fructose and galactose) before absorption. Disaccharides, oligosaccharides, and starch fragments must first be split at the brush border."
      },
      {
        "q": "Which statement about protein absorption is correct?",
        "choices": [
          "Di- and tripeptides use a different carrier than free amino acids and are absorbed faster",
          "Only free amino acids can be absorbed",
          "Whole proteins are absorbed intact in adults",
          "Peptides are absorbed only in the stomach"
        ],
        "answer": 0,
        "exp": "Small di- and tripeptides are taken up by a separate carrier (and hydrolyzed inside the cell), and are actually absorbed faster than free amino acids. Whole proteins are not absorbed intact in adults, and peptide absorption occurs in the small intestine, not the stomach."
      },
      {
        "q": "After fats are reassembled into triglycerides and packaged into chylomicrons, they enter the...",
        "choices": [
          "Portal blood directly",
          "Bile ducts",
          "Lymphatic system (lacteals), because chylomicrons are too large for blood capillaries",
          "Gastric veins"
        ],
        "answer": 2,
        "exp": "Chylomicrons are too large to enter blood capillaries, so they pass into the lacteals and travel via lymph to the thoracic duct before reaching the blood. They do not enter portal blood, bile ducts, or gastric veins directly."
      },
      {
        "q": "Once inside the enterocyte, absorbed monoglycerides and fatty acids are...",
        "choices": [
          "Broken down further into glycerol and carbon dioxide",
          "Reassembled into triglycerides and packaged into chylomicrons",
          "Absorbed directly into the portal vein as free fat",
          "Returned to the lumen"
        ],
        "answer": 1,
        "exp": "Inside the enterocyte, absorbed monoglycerides and fatty acids are re-esterified into triglycerides and packaged (with apoproteins) into chylomicrons. They are not oxidized to CO₂ there, sent into portal blood as free fat, or returned to the lumen."
      },
      {
        "q": "Vitamin B12 (bound to intrinsic factor) is absorbed at which site?",
        "choices": [
          "The stomach",
          "The duodenum",
          "The colon",
          "The ileum"
        ],
        "answer": 3,
        "exp": "The intrinsic-factor–B12 complex is absorbed in the ileum (as are bile salts). The stomach and colon absorb little B12, and the duodenum mainly absorbs other nutrients, iron, and calcium."
      },
      {
        "q": "The intrinsic defecation reflex is initiated when...",
        "choices": [
          "Feces enter and distend the rectum, triggering myenteric-plexus signals",
          "The stomach empties completely",
          "The internal anal sphincter contracts",
          "Bile enters the colon"
        ],
        "answer": 0,
        "exp": "Rectal distension by feces triggers the intrinsic (ENS-mediated) reflex, which contracts the colon/rectum and relaxes the internal anal sphincter. Gastric emptying, sphincter contraction, and bile entering the colon do not initiate it."
      },
      {
        "q": "For defecation to occur, the internal anal sphincter relaxes and then...",
        "choices": [
          "The internal sphincter must contract again",
          "The external anal sphincter must be voluntarily relaxed",
          "The pyloric sphincter must open",
          "Mass movements must stop"
        ],
        "answer": 1,
        "exp": "The internal anal sphincter (smooth muscle) relaxes reflexively, but defecation proceeds only if the external anal sphincter (striated, voluntary) is consciously relaxed. Re-contracting the internal sphincter, opening the pylorus, or stopping mass movements would not allow it."
      },
      {
        "q": "How does the spinal-cord (parasympathetic) defecation reflex relate to the intrinsic reflex?",
        "choices": [
          "It replaces the intrinsic reflex entirely",
          "It is qualitatively different and unrelated",
          "It inhibits defecation",
          "It greatly intensifies the intrinsic reflex via pelvic-nerve parasympathetic fibers"
        ],
        "answer": 3,
        "exp": "The spinal (parasympathetic, S2–S4) reflex reinforces — not replaces — the intrinsic reflex, greatly strengthening colonic and rectal contractions through pelvic-nerve fibers. It is not qualitatively different, unrelated, or inhibitory."
      }
    ]
  }
};
