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
  { id: "anatomy-appendicular-skeleton", name: "Appendicular Skeleton", color: "accent",
    icon: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    cards: [
      ["What two bones make up the pectoral girdle?", "The clavicle and scapula."],
      ["Which end of the clavicle articulates with the sternum?", "The medial (sternal) end."],
      ["Which end of the clavicle articulates with the scapula?", "The lateral (acromial) end."],
      ["What ridge on the scapula separates the supraspinous and infraspinous fossae?", "The scapular spine."],
      ["What does the glenoid cavity of the scapula articulate with?", "The head of the humerus, forming the shoulder joint."],
      ["What connects the radius and ulna along their shafts?", "The interosseous membrane."],
      ["How many carpal bones are in the wrist?", "Eight, arranged in two rows of four."],
      ["How many phalanges does the thumb (pollex) have, compared to the other digits?", "Two, versus three for each other digit."],
      ["What three bones fuse to form the coxal (hip) bone?", "The ilium, ischium, and pubis."],
      ["What deep socket on the coxal bone receives the head of the femur?", "The acetabulum."],
      ["How does the female pelvis differ in shape from the male pelvis?", "Wider and shallower, adapted for childbirth."],
      ["What two rounded processes are found at the distal femur?", "The medial and lateral condyles."],
      ["What type of bone is the patella?", "A sesamoid bone, embedded within the quadriceps tendon."],
      ["Which leg bone bears nearly all the body's weight, the tibia or fibula?", "The tibia."],
      ["What forms the lateral ankle prominence?", "The lateral malleolus of the fibula."],
      ["How many tarsal bones are in the foot?", "Seven."],
      ["How many phalanges does the great toe (hallux) have?", "Two, versus three for each other toe."]
    ],
    matchCards: [
      ["Clavicle", "S-shaped pectoral girdle bone"],
      ["Scapula", "Shoulder blade"],
      ["Humerus", "Upper arm bone"],
      ["Olecranon", "Proximal ulna, forms elbow point"],
      ["Radius", "Lateral forearm bone (thumb side)"],
      ["Carpals", "8 wrist bones"],
      ["Coxal bone", "Hip bone (ilium + ischium + pubis)"],
      ["Acetabulum", "Hip socket"],
      ["Femur", "Thigh bone"],
      ["Patella", "Kneecap"],
      ["Tibia", "Shin bone"],
      ["Fibula", "Thin lateral leg bone"],
      ["Tarsals", "7 ankle bones"]
    ]},
  { id: "anatomy-axial-skeleton", name: "Axial Skeleton", color: "accent3",
    icon: '<line x1="12" y1="3" x2="12" y2="21"/><line x1="6" y1="7" x2="18" y2="7"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="6" y1="17" x2="18" y2="17"/>',
    cards: [
      ["What are the two structural types of bone tissue?", "Compact bone and spongy (trabecular) bone."],
      ["What connective tissue covering surrounds the outside of a bone?", "The periosteum."],
      ["Where is the primary ossification center located in a long bone?", "The diaphysis (shaft)."],
      ["What cartilage structure is the main site of long-bone growth in children?", "The epiphyseal (growth) plate."],
      ["Which suture lies between the two parietal bones?", "The sagittal suture."],
      ["Which suture lies between the occipital bone and the parietal bones?", "The lambdoid suture."],
      ["What large opening in the occipital bone transmits the spinal cord?", "The foramen magnum."],
      ["What does the sella turcica of the sphenoid house?", "The pituitary gland."],
      ["What passes through the supra-orbital foramen?", "The supra-orbital nerve and artery."],
      ["What structure of the ethmoid transmits olfactory nerve fibers?", "The cribriform plate."],
      ["Which bone forms the floor of the orbit?", "The maxilla."],
      ["What are the four paranasal sinuses?", "Frontal, sphenoidal, maxillary, and ethmoid."],
      ["How many vertebrae make up the adult vertebral column, excluding the sacrum and coccyx?", "24 — 7 cervical, 12 thoracic, 5 lumbar."],
      ["What is unique about the atlas (C1)?", "It has no vertebral body, only anterior and posterior arches."],
      ["What structure of the axis (C2) allows the head to rotate?", "The dens (odontoid process)."],
      ["How many originally separate vertebrae fuse to form the adult sacrum?", "Five."],
      ["What distinguishes true ribs from false ribs?", "True ribs (1-7) attach directly to the sternum; false ribs (8-12) don't."],
      ["What three parts make up the sternum?", "The manubrium, body, and xiphoid process."]
    ],
    matchCards: [
      ["Foramen magnum", "Spinal cord passage"],
      ["Sella turcica", "Houses the pituitary gland"],
      ["Cribriform plate", "Olfactory nerve fibers pass through"],
      ["Lambdoid suture", "Occipital–parietal junction"],
      ["Sagittal suture", "Between the two parietal bones"],
      ["Atlas (C1)", "No vertebral body, articulates with skull"],
      ["Axis (C2)", "Has the dens, allows head rotation"],
      ["Sacrum", "5 fused vertebrae"],
      ["Coccyx", "3–5 fused vertebrae (tailbone)"],
      ["Manubrium", "Superior part of the sternum"],
      ["Xiphoid process", "Inferior tip of the sternum"],
      ["True ribs", "Ribs 1–7, attach directly to sternum"],
      ["Floating ribs", "Ribs 11–12, no anterior cartilage"]
    ]},
  { id: "anatomy-appendicular-musculature", name: "Appendicular Musculature", color: "accent2",
    icon: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    cards: [
      ["Which nerve innervates the serratus anterior?", "The long thoracic nerve."],
      ["What four muscles make up the rotator cuff?", "Supraspinatus, infraspinatus, teres minor, and subscapularis."],
      ["Which muscle abducts the arm at the shoulder?", "The deltoid."],
      ["What is the \"action line\" of a muscle?", "The direction the muscle pulls when it contracts."],
      ["Where do all three heads of the triceps brachii insert?", "The olecranon of the ulna."],
      ["What action do pronator teres and pronator quadratus produce?", "Pronation of the forearm."],
      ["What are the four groups of muscles that move the thigh?", "Gluteal, lateral rotator, adductor, and iliopsoas groups."],
      ["What three muscles make up the hamstrings?", "Biceps femoris, semimembranosus, and semitendinosus."],
      ["What four muscles make up the quadriceps femoris?", "Vastus lateralis, vastus medialis, vastus intermedius, and rectus femoris."],
      ["Which muscle dorsiflexes the foot?", "Tibialis anterior."],
      ["Which two muscles produce eversion of the foot?", "Fibularis longus and fibularis brevis."],
      ["What distinguishes extrinsic from intrinsic hand/foot muscles?", "Extrinsic muscles originate outside the hand/foot; intrinsic muscles originate within it."],
      ["What three muscles converge to form the pes anserine?", "Gracilis, sartorius, and semitendinosus."],
      ["What muscle allows crossing the leg and flexes both the hip and knee?", "Sartorius."],
      ["Which three muscles make up the anterior compartment of the arm?", "Biceps brachii, brachialis, and coracobrachialis."],
      ["What nerve injury classically causes serratus anterior paralysis?", "A long thoracic nerve lesion."]
    ],
    matchCards: [
      ["Deltoid", "Abducts the arm"],
      ["Rotator cuff", "Supraspinatus, infraspinatus, teres minor, subscapularis"],
      ["Triceps brachii", "Extends the elbow"],
      ["Biceps brachii", "Flexes the elbow and shoulder"],
      ["Gluteus maximus", "Extends the hip"],
      ["Gluteus medius/minimus", "Abduct the hip"],
      ["Iliopsoas", "Major hip flexor"],
      ["Quadriceps femoris", "Extends the knee"],
      ["Hamstrings", "Flex the knee, extend the hip"],
      ["Tibialis anterior", "Dorsiflexes the foot"],
      ["Gastrocnemius/soleus", "Plantar flex the foot"],
      ["Fibularis longus/brevis", "Evert the foot"],
      ["Sartorius", "Crosses the leg, flexes hip & knee"]
    ]},
  { id: "anatomy-axial-musculature", name: "Axial Musculature", color: "accent4",
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    cards: [
      ["What cranial nerve innervates all muscles of facial expression?", "The facial nerve (CN VII)."],
      ["What nerve innervates the muscles of mastication?", "The mandibular branch of the trigeminal nerve (CN V)."],
      ["Which extra-ocular muscle is innervated by CN VI?", "The lateral rectus."],
      ["Which extra-ocular muscle is innervated by CN IV?", "The superior oblique."],
      ["What condition results from dysfunction of the levator palpebrae superioris?", "Ptosis (eyelid droop)."],
      ["Which tongue muscle is innervated by CN X, unlike the other tongue muscles (CN XII)?", "Palatoglossus."],
      ["What does the sternocleidomastoid do when both sides contract together?", "Flexes the neck."],
      ["What nerve innervates the sternocleidomastoid?", "The accessory nerve (CN XI)."],
      ["What three muscles make up the erector spinae group?", "Spinalis, longissimus, and iliocostalis."],
      ["What is the action of the external intercostal muscles?", "Elevate the ribs."],
      ["What is the action of the internal intercostal muscles?", "Depress the ribs."],
      ["What happens to the diaphragm during inhalation?", "It contracts and lowers, increasing thoracic cavity volume."],
      ["What nerve innervates the diaphragm?", "The phrenic nerves (C3-C5)."],
      ["What two triangles make up the perineum?", "The urogenital triangle and the anal triangle."],
      ["What muscle group forms most of the pelvic diaphragm?", "Levator ani (iliococcygeus and pubococcygeus)."],
      ["What connective tissue layer surrounds an individual skeletal muscle fiber?", "The endomysium."]
    ],
    matchCards: [
      ["Orbicularis oris", "Purses the lips"],
      ["Buccinator", "Compresses the cheeks"],
      ["Masseter", "Elevates (closes) the jaw"],
      ["Lateral pterygoid", "Opens the jaw"],
      ["Levator palpebrae superioris", "Elevates the upper eyelid"],
      ["Sternocleidomastoid", "Flexes neck / rotates head"],
      ["Erector spinae", "Extends the vertebral column"],
      ["Quadratus lumborum", "Laterally flexes the vertebral column"],
      ["External intercostals", "Elevate the ribs"],
      ["Internal intercostals", "Depress the ribs"],
      ["Diaphragm", "Major muscle of inhalation"],
      ["Levator ani", "Supports the pelvic organs"],
      ["Rectus abdominis", "Flexes the vertebral column"]
    ]},
  { id: "anatomy-intro", name: "Intro to Anatomy & Terminology", color: "accent",
    icon: '<circle cx="12" cy="12" r="9"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="3" y1="12" x2="21" y2="12"/>',
    cards: [
      ["What does the sagittal plane divide the body into?", "Right and left sections."],
      ["What does the coronal (frontal) plane divide the body into?", "Anterior and posterior sections."],
      ["What does the transverse plane divide the body into?", "Superior and inferior sections."],
      ["What does \"proximal\" mean?", "Closest to a point of reference (generally the body's center)."],
      ["What does \"distal\" mean?", "Farthest from a point of reference."],
      ["What is the difference between superficial and deep?", "Superficial is closest to the body surface; deep is farthest from it."],
      ["What does \"rostral\" mean?", "Situated near the front of the body, often used interchangeably with anterior."],
      ["What does \"caudal\" mean?", "Situated near the bottom/tail end, often used interchangeably with posterior."],
      ["What does \"ipsilateral\" mean?", "On the same side."],
      ["What does \"contralateral\" mean?", "On the opposite side."],
      ["What is flexion?", "Movement that brings ventral surfaces together (e.g., bending the elbow)."],
      ["What is the difference between pronation and supination?", "Pronation rotates the palm posteriorly; supination rotates it anteriorly."],
      ["What are the two subdivisions of the dorsal body cavity?", "Cranial cavity and vertebral cavity."],
      ["What are the two subdivisions of the ventral body cavity?", "Thoracic cavity and abdominopelvic cavity."],
      ["What separates parietal serosa from visceral serosa?", "Parietal serosa lines the cavity wall; visceral serosa covers the organs."],
      ["What are the six levels of structural organization, smallest to largest?", "Chemical, cellular, tissue, organ, organ system, organismal."]
    ],
    matchCards: [
      ["Sagittal plane", "Divides right/left"],
      ["Coronal plane", "Divides anterior/posterior"],
      ["Transverse plane", "Divides superior/inferior"],
      ["Proximal", "Closest to reference point"],
      ["Distal", "Farthest from reference point"],
      ["Superficial", "Closest to body surface"],
      ["Deep", "Farthest from body surface"],
      ["Ipsilateral", "Same side"],
      ["Contralateral", "Opposite side"],
      ["Supine", "Lying on the back"],
      ["Prone", "Lying face down"],
      ["Dermatome", "Skin region supplied by one spinal nerve"]
    ]},
  { id: "anatomy-histology", name: "Histology", color: "accent2",
    icon: '<rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="9" cy="9" r="1.5"/><circle cx="15" cy="9" r="1.5"/><circle cx="9" cy="15" r="1.5"/><circle cx="15" cy="15" r="1.5"/>',
    cards: [
      ["What are the four primary tissue types?", "Epithelial, connective, muscle, and nervous tissue."],
      ["What is the primary function of epithelial tissue?", "Protection."],
      ["What is the basement membrane?", "A nonliving adhesive layer secreted by epithelial cells, made of collagen and glycoproteins."],
      ["What is simple squamous epithelium used for?", "Filtration and exchange (e.g., capillaries, alveoli)."],
      ["What is stratified squamous epithelium used for?", "Protection (e.g., skin, mouth lining)."],
      ["What is the \"matrix\" of connective tissue?", "The nonliving component: ground substance, fluid, and fibers."],
      ["What gives collagen its high tensile strength?", "Its fibrous protein structure, present in nearly all human organs."],
      ["What is areolar (loose) connective tissue used for?", "Packing material; separates muscles so they can slide over each other."],
      ["Why is cartilage slow to heal?", "It is avascular and not innervated."],
      ["What is the most abundant type of cartilage?", "Hyaline cartilage."],
      ["What is the Haversian system (osteon)?", "The structural unit of compact bone."],
      ["What do osteocytes sit within?", "Lacunae, connected by canaliculi."],
      ["What are the four zones of the epiphyseal growth plate?", "Resting, proliferative, hypertrophic, and calcification zones."],
      ["What is distinctive about skeletal muscle fibers?", "Long, cylindrical, multinucleate, with visible striations."],
      ["What do astrocytes form?", "The blood-brain barrier."],
      ["What do oligodendrocytes do?", "Form the myelin sheath in the CNS."],
      ["What do Schwann cells do?", "Form the myelin sheath in the PNS."]
    ],
    matchCards: [
      ["Simple squamous", "Filtration/exchange (capillaries)"],
      ["Stratified squamous", "Protection (skin, mouth)"],
      ["Simple cuboidal", "Reabsorption/secretion (kidney ducts)"],
      ["Areolar tissue", "Loose packing material"],
      ["Dense regular tissue", "Tendons and ligaments"],
      ["Hyaline cartilage", "Most abundant cartilage type"],
      ["Osteon", "Structural unit of compact bone"],
      ["Red marrow", "Produces blood cells"],
      ["Astrocyte", "Forms blood-brain barrier"],
      ["Oligodendrocyte", "Myelinates CNS axons"],
      ["Schwann cell", "Myelinates PNS axons"],
      ["Microglia", "Phagocytic CNS glial cell"]
    ]},
  { id: "anatomy-brain-ans", name: "Brain and the ANS", color: "accent3",
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    cards: [
      ["What are the three basic parts of the brain?", "Cerebrum, cerebellum, and brainstem."],
      ["How is gray and white matter organized in the cerebrum?", "The cerebral cortex (gray matter) covers the surface; white matter lies underneath."],
      ["What do the basal nuclei control?", "The cycles of arm and leg movement when walking (caudate, putamen, globus pallidus)."],
      ["What is the limbic system responsible for?", "Establishing emotional states and facilitating memory storage/retrieval."],
      ["Where is the SA-equivalent \"pacemaker\" structure of CSF flow — i.e., what produces CSF?", "The choroid plexus (ependymal cells)."],
      ["What does the thalamus do?", "Relays information to the cerebrum and processes sensory information."],
      ["What does the hypothalamus regulate?", "Emotions, thirst, and habitual activity."],
      ["What does the cerebellar cortex do?", "Provides subconscious coordination of movement."],
      ["What are the three meningeal layers, outer to inner?", "Dura mater, arachnoid mater, pia mater."],
      ["What is the falx cerebri?", "A dural fold separating the two cerebral hemispheres."],
      ["What creates the blood-brain barrier?", "Tight endothelial cell junctions in brain capillaries."],
      ["What are the three divisions of the ANS?", "Sympathetic, parasympathetic, and enteric nervous system."],
      ["When is the sympathetic division most active?", "During stress, exertion, or emergency (\"fight or flight\")."],
      ["When is the parasympathetic division most active?", "During rest (\"rest and digest\")."],
      ["What neurotransmitter do all parasympathetic neurons release?", "Acetylcholine (cholinergic)."],
      ["What is the enteric nervous system also called?", "\"The brain of the gut.\""]
    ],
    matchCards: [
      ["Cerebrum", "Largest brain part; higher functions"],
      ["Cerebellum", "Coordinates movement"],
      ["Brainstem", "Diencephalon, midbrain, pons, medulla"],
      ["Thalamus", "Relay station for sensory info"],
      ["Hypothalamus", "Regulates emotions, thirst"],
      ["Dura mater", "Outermost meningeal layer"],
      ["Arachnoid mater", "Middle meningeal layer"],
      ["Pia mater", "Innermost meningeal layer"],
      ["Choroid plexus", "Produces CSF"],
      ["Sympathetic division", "Thoracolumbar, fight-or-flight"],
      ["Parasympathetic division", "Craniosacral, rest-and-digest"],
      ["Enteric nervous system", "\"Brain of the gut\""]
    ]},
  { id: "anatomy-nervous-tissue-cbf", name: "Nervous Tissue & Cerebral Blood Flow", color: "accent4",
    icon: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    cards: [
      ["What are the two cell types of nervous tissue?", "Neurons and neuroglia."],
      ["What is a multipolar neuron?", "A neuron with multiple (2+) processes joining the cell body."],
      ["What is a pseudounipolar neuron, and where is it common?", "One process that bifurcates into two; common in the PNS."],
      ["What do afferent neurons do?", "Conduct impulses toward the CNS."],
      ["What do efferent neurons do?", "Conduct impulses away from the CNS."],
      ["What are interneurons, and where are they located?", "Neurons entirely in the CNS that analyze sensory input and coordinate motor output."],
      ["What do astrocytes anchor to, forming the blood-brain barrier?", "Capillaries."],
      ["What do ependymal cells do?", "Line fluid-filled passageways and are involved in CSF production."],
      ["What are the two PNS neuroglia types?", "Satellite cells (surround cell bodies) and Schwann cells (surround axons)."],
      ["What is a node of Ranvier?", "A small gap separating myelin internodes along an axon."],
      ["What arteries supply the brain?", "The paired internal carotid and vertebral arteries."],
      ["What is the Circle of Willis?", "A collateral arterial circuit connecting anterior and posterior cerebral circulation."],
      ["Where do dural venous sinuses lie?", "Between the periosteal and meningeal layers of the dura mater."],
      ["What is unique about the cavernous sinus?", "CN III, IV, V1, V2 run in its wall; CN VI and the internal carotid pass through its center."],
      ["Where does most cranial venous blood ultimately drain?", "Into the internal jugular veins, then the superior vena cava."]
    ],
    matchCards: [
      ["Neuron", "Transmits nerve impulses"],
      ["Neuroglia", "Supporting nervous tissue cells"],
      ["Afferent neuron", "Conducts impulses toward the CNS"],
      ["Efferent neuron", "Conducts impulses away from the CNS"],
      ["Astrocyte", "Forms the blood-brain barrier"],
      ["Ependymal cell", "Lines CSF-filled passageways"],
      ["Schwann cell", "Myelinates PNS axons"],
      ["Internal carotid artery", "Anterior brain circulation"],
      ["Vertebral artery", "Posterior brain circulation"],
      ["Circle of Willis", "Collateral cerebral circulation"],
      ["Cavernous sinus", "Dural sinus with CN III/IV/V1/V2/VI"],
      ["Internal jugular vein", "Main cranial venous outflow"]
    ]},
  { id: "anatomy-spinal-cord-sensory", name: "Spinal Cord & Sensory Receptors", color: "accent",
    icon: '<line x1="12" y1="3" x2="12" y2="21"/><line x1="6" y1="7" x2="18" y2="7"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="6" y1="17" x2="18" y2="17"/>',
    cards: [
      ["How long is the adult spinal cord, and where does it end?", "About 45 cm, ending around L1-L2 (conus medullaris)."],
      ["What is the cauda equina?", "Nerve roots extending from the conus medullaris to the pelvic/lower limb structures."],
      ["Is the dorsal root sensory or motor?", "Sensory (cell bodies in the dorsal root ganglion)."],
      ["Is the ventral root sensory or motor?", "Motor."],
      ["What do the dorsal columns carry?", "Vibration, proprioception, and fine (2-point) touch."],
      ["What does the fasciculus gracilis carry sensation for?", "The lower body (T7 and below)."],
      ["What does the fasciculus cuneatus carry sensation for?", "The upper body (T6 and above)."],
      ["What does the lateral spinothalamic tract carry?", "Pain, pressure, and temperature."],
      ["What does the lateral corticospinal tract control, and where does it decussate?", "Limb movement; decussates in the medulla's pyramids."],
      ["What is the intermediolateral gray horn?", "Contains preganglionic sympathetic neuron cell bodies (T1-L2)."],
      ["What is the difference between general senses and special senses?", "General senses (touch, pain, temp) are distributed throughout the body; special senses (smell, taste, vision, hearing, balance) are in complex sense organs."],
      ["What do nociceptors respond to?", "Pain."],
      ["What do mechanoreceptors respond to?", "Physical distortion of cell membranes (touch, pressure, stretch)."],
      ["What do Golgi tendon organs monitor?", "Tension in tendons."],
      ["What do muscle spindles monitor?", "Length of muscle fibers upon contraction."],
      ["What cranial nerve carries olfactory signals to the brain?", "CN I (olfactory nerve), via the cribriform plate."]
    ],
    matchCards: [
      ["Conus medullaris", "True end of the spinal cord"],
      ["Cauda equina", "Nerve roots below the conus medullaris"],
      ["Dorsal root", "Sensory root of a spinal nerve"],
      ["Ventral root", "Motor root of a spinal nerve"],
      ["Dorsal columns", "Vibration, proprioception, fine touch"],
      ["Spinothalamic tract", "Pain, temperature, crude touch"],
      ["Corticospinal tract", "Voluntary motor control"],
      ["Nociceptor", "Pain receptor"],
      ["Thermoreceptor", "Temperature receptor"],
      ["Mechanoreceptor", "Touch/pressure/stretch receptor"],
      ["Golgi tendon organ", "Monitors tendon tension"],
      ["Muscle spindle", "Monitors muscle fiber length"]
    ]},
  { id: "anatomy-peripheral-cranial-nerves", name: "Peripheral & Cranial Nerves", color: "accent2",
    icon: '<path d="M20 6L9 17l-5-5"/>',
    cards: [
      ["What two branches does every spinal nerve form?", "Dorsal (posterior) ramus and ventral (anterior) ramus."],
      ["What are dermatomes?", "Skin regions supplied by a specific spinal nerve."],
      ["What are the four major nerve plexuses?", "Cervical, brachial, lumbar, and sacral plexuses."],
      ["What spinal levels form the cervical plexus, and what does it innervate?", "C1-C5; innervates neck muscles and the diaphragm (phrenic nerve)."],
      ["What spinal levels form the brachial plexus, and what does it innervate?", "C5-T1; innervates the pectoral girdle and upper limb."],
      ["What does the femoral nerve innervate?", "Quadriceps, sartorius, pectineus, and iliopsoas."],
      ["What does the sciatic nerve innervate?", "Semimembranosus, semitendinosus, and adductor magnus."],
      ["What is a reflex arc?", "The neural wiring of a single reflex, from sensory receptor to effector."],
      ["How many pairs of cranial nerves are there, and where do they emerge from?", "12 pairs, emerging from the brain (not the spinal cord)."],
      ["Which cranial nerve is purely sensory for smell?", "CN I (olfactory nerve)."],
      ["Which cranial nerve is purely sensory for vision?", "CN II (optic nerve)."],
      ["Which cranial nerve innervates the lateral rectus?", "CN VI (abducens nerve)."],
      ["Which cranial nerve innervates the superior oblique?", "CN IV (trochlear nerve)."],
      ["Which cranial nerve is the largest, with three divisions?", "CN V (trigeminal nerve)."],
      ["Which cranial nerve controls facial expression muscles?", "CN VII (facial nerve)."],
      ["Which cranial nerve provides sensory/motor supply for balance and hearing?", "CN VIII (vestibulocochlear nerve)."],
      ["Which cranial nerve is the vagus nerve, and what does it broadly do?", "CN X; carries sensory/motor fibers to/from the respiratory, cardiovascular, and digestive organs."],
      ["Which cranial nerve controls tongue movement?", "CN XII (hypoglossal nerve)."]
    ],
    matchCards: [
      ["CN I", "Olfactory — smell"],
      ["CN II", "Optic — vision"],
      ["CN III", "Oculomotor — most eye muscles"],
      ["CN IV", "Trochlear — superior oblique"],
      ["CN V", "Trigeminal — face sensation, mastication"],
      ["CN VI", "Abducens — lateral rectus"],
      ["CN VII", "Facial — facial expression, taste"],
      ["CN VIII", "Vestibulocochlear — hearing, balance"],
      ["CN IX", "Glossopharyngeal — swallowing, tongue pain"],
      ["CN X", "Vagus — visceral sensory/motor"],
      ["CN XI", "Accessory — SCM, trapezius"],
      ["CN XII", "Hypoglossal — tongue movement"]
    ]},
  { id: "anatomy-integumentary", name: "The Integumentary System", color: "accent3",
    icon: '<path d="M12 2C8 7 5 10.5 5 14a7 7 0 0 0 14 0c0-3.5-3-7-7-12z"/>',
    cards: [
      ["What are the two main layers of the skin?", "Epidermis (superficial) and dermis (deep)."],
      ["Is the epidermis vascular?", "No, it's avascular — nourished by vessels in the dermis."],
      ["What are the five layers of the epidermis, superficial to deep?", "Stratum corneum, lucidum, granulosum, spinosum, and basale."],
      ["What does the stratum basale contain?", "Stem cells (basal cells and melanocytes) that refurbish keratinocytes."],
      ["What does keratohyalin do in the stratum granulosum?", "Coats cells with a lipid-rich, water-resistant substance."],
      ["Where is the stratum lucidum found?", "Thick skin of the palms and soles."],
      ["What produces the fingerprint pattern?", "Epidermal ridges formed by the stratum basale, following dermal papillae."],
      ["What pigment converts to vitamin A and is found in keratinocytes?", "Carotene."],
      ["What does melanin do?", "Prevents skin damage from UV light."],
      ["What are the two layers of the dermis?", "Papillary layer (loose CT) and reticular layer (dense irregular CT)."],
      ["What does the arrector pili muscle do when it contracts?", "Erects the hair, causing goose bumps."],
      ["What is the cutaneous plexus?", "A network of blood vessels in the subcutaneous layer supplying the skin."],
      ["What do Pacinian corpuscles detect?", "Deep touch and high-frequency vibration."],
      ["What do Meissner's corpuscles detect?", "Light touch, movement, and low-frequency vibration."],
      ["What do sebaceous glands produce?", "An oily lipid that coats the hair and epidermis."],
      ["Where are apocrine sweat glands found?", "Axillae, groin, and nipples only."],
      ["What is the difference between the nail body and nail bed?", "Nail body is the external plate; nail bed is the internal component beneath it."]
    ],
    matchCards: [
      ["Epidermis", "Superficial, avascular skin layer"],
      ["Dermis", "Deep, vascular connective tissue skin layer"],
      ["Stratum corneum", "Outermost, dead keratinized layer"],
      ["Stratum basale", "Deepest, stem cell layer"],
      ["Melanocyte", "Produces melanin pigment"],
      ["Merkel cell", "Stimulates sensory nerve endings"],
      ["Arrector pili", "Erects hair, causes goose bumps"],
      ["Sebaceous gland", "Secretes oily lipid"],
      ["Apocrine sweat gland", "Axillae, groin, nipples"],
      ["Merocrine sweat gland", "Found nearly everywhere else"],
      ["Pacinian corpuscle", "Deep touch, high-frequency vibration"],
      ["Meissner's corpuscle", "Light touch, low-frequency vibration"]
    ]},
  { id: "anatomy-eye-ear", name: "Eye and Ear Anatomy", color: "accent4",
    icon: '<circle cx="12" cy="12" r="3"/><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/>',
    cards: [
      ["What are the three tunics of the eye?", "Fibrous tunic (sclera/cornea), vascular tunic (iris/ciliary body/choroid), and neural tunic (retina)."],
      ["What cranial nerve innervates the lateral rectus?", "CN VI."],
      ["What cranial nerve innervates the superior oblique?", "CN IV."],
      ["Which four extra-ocular muscles does CN III innervate?", "Superior rectus, inferior rectus, medial rectus, and inferior oblique."],
      ["What does the iris consist of, and what does it control?", "Blood vessels, pigment, and smooth muscle; controls pupil diameter."],
      ["What are rods and cones responsible for?", "Rods for night vision; cones for color vision."],
      ["What is the fovea centralis?", "100% cones — the area of best color vision."],
      ["What is the optic disc, and why is it called the \"blind spot\"?", "It has 0% rods or cones, so no vision occurs there."],
      ["What does the lacrimal apparatus consist of?", "Lacrimal glands, canaliculi, lacrimal sac, and nasolacrimal duct."],
      ["What fluid fills the anterior cavity of the eye, and where is it produced?", "Aqueous humor, produced at the ciliary body."],
      ["What does vitreous humor do?", "Supports the shape of the eye, lens, and retina."],
      ["What are the three regions of the ear?", "External, middle, and inner ear."],
      ["What are the three auditory ossicles?", "Malleus, incus, and stapes."],
      ["What does the Eustachian (auditory) tube do?", "Equalizes pressure in the middle ear and drains fluid."],
      ["What is the Organ of Corti, and what does it rest on?", "The spiral organ of hearing; rests on the basilar membrane."],
      ["What does the vestibular complex detect?", "Rotation, gravity, and acceleration (equilibrium)."],
      ["What is an otolith?", "Gelatinous material plus statoconia (calcium carbonate crystals) in the utricle/saccule."],
      ["Which cranial nerve carries both hearing and balance signals to the brain?", "CN VIII (vestibulocochlear nerve)."]
    ],
    matchCards: [
      ["Sclera", "White, fibrous outer eye coat"],
      ["Cornea", "Clear, modified sclera"],
      ["Iris", "Colored, controls pupil size"],
      ["Retina", "Neural tunic, contains photoreceptors"],
      ["Fovea centralis", "100% cones, best color vision"],
      ["Optic disc", "Blind spot, no photoreceptors"],
      ["Malleus, incus, stapes", "Auditory ossicles"],
      ["Tympanic membrane", "Eardrum"],
      ["Cochlea", "Snail-shaped hearing organ"],
      ["Organ of Corti", "Sensory organ of hearing"],
      ["Semicircular canals", "Detect rotation"],
      ["Utricle & saccule", "Detect gravity/linear acceleration"]
    ]},
  { id: "anatomy-heart-vessels", name: "Heart and Great Vessels", color: "accent",
    icon: '<path d="M12 21C9 17 3 13 3 8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5-6 9-9 13z"/>',
    cards: [
      ["What are the two layers of the pericardial membrane?", "Visceral pericardium (epicardium) and parietal pericardium."],
      ["What are the three layers of the heart wall?", "Epicardium, myocardium, and endocardium."],
      ["What connects adjacent cardiac muscle cells, allowing coordinated contraction?", "Intercalated discs (desmosomes + gap junctions)."],
      ["Which chamber is the most anterior structure of the heart?", "The right ventricle."],
      ["What does the right atrium receive blood from?", "Superior vena cava, inferior vena cava, and coronary sinus."],
      ["What is the fossa ovalis?", "A fetal remnant of the foramen ovale, in the right atrium."],
      ["Which valve separates the right atrium and right ventricle?", "The tricuspid valve."],
      ["Which valve separates the left atrium and left ventricle?", "The bicuspid (mitral) valve."],
      ["Why is the left ventricle the \"workhorse of the heart\"?", "It has the thickest myocardium, needed to pump blood through the whole systemic circuit."],
      ["What is the moderator band, and where is it found?", "A muscular band with Purkinje fibers, found only in the right ventricle."],
      ["What is the cardiac pacemaker, and where is it located?", "The SA node, in the superior posterior wall of the right atrium."],
      ["What is the conduction pathway after the SA node?", "SA node → AV node → AV bundle → bundle branches → Purkinje fibers."],
      ["Which coronary artery supplies the SA node in 60% of people?", "The right coronary artery (RCA)."],
      ["Where do the left and right coronary arteries branch from?", "The base of the ascending aorta."],
      ["What are the only branches of the ascending aorta?", "The left and right coronary arteries."],
      ["What three vessels does the aortic arch branch into?", "Brachiocephalic trunk, left common carotid artery, and left subclavian artery."],
      ["What organs does the celiac trunk supply?", "Liver, stomach, esophagus, gallbladder, duodenum, pancreas, and spleen."]
    ],
    matchCards: [
      ["Epicardium", "Outer heart wall layer"],
      ["Myocardium", "Cardiac muscle layer"],
      ["Endocardium", "Inner heart wall layer"],
      ["Tricuspid valve", "Right AV valve"],
      ["Mitral (bicuspid) valve", "Left AV valve"],
      ["SA node", "Cardiac pacemaker"],
      ["AV node", "Relays impulse to the ventricles"],
      ["Ascending aorta", "Origin of the coronary arteries"],
      ["Aortic arch", "Gives rise to brachiocephalic, carotid, subclavian"],
      ["Right coronary artery", "Usually supplies SA & AV nodes"],
      ["Celiac trunk", "Supplies liver, stomach, spleen"],
      ["Coronary sinus", "Drains cardiac veins into right atrium"]
    ]},
  { id: "anatomy-vascular-lymphatics", name: "Vascular & Lymphatic Systems", color: "accent2",
    icon: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/><circle cx="12" cy="14" r="2"/>',
    cards: [
      ["What are the three layers of a vessel wall (except capillaries)?", "Intima, media, and adventitia."],
      ["What does the tunica media consist of, and what is it involved in?", "Smooth muscle; vasoconstriction and vasodilation."],
      ["What is the vasa vasorum?", "Blood vessels supplying the walls of the thickest vessels."],
      ["What are examples of elastic arteries?", "The aorta, brachiocephalic trunk, and pulmonary trunk."],
      ["What are the three types of capillaries?", "Continuous, fenestrated, and sinusoid."],
      ["Why do many veins have one-way valves?", "To prevent backflow, helping blood return to the heart against gravity."],
      ["What does the azygos vein drain?", "The esophageal and right intercostal veins, into the superior vena cava."],
      ["Which gonadal vein drains into the renal vein first?", "The left gonadal vein."],
      ["What are the two components of blood?", "Plasma and formed elements (RBCs, WBCs, platelets)."],
      ["What is hematocrit?", "The percentage of whole blood occupied by formed elements."],
      ["What is the structure of a red blood cell?", "A biconcave, anucleated disc containing hemoglobin."],
      ["What are the five types of white blood cells?", "Neutrophils, eosinophils, basophils, monocytes, and lymphocytes."],
      ["What do platelets come from?", "Megakaryocyte fragmentation."],
      ["What does lymph consist of?", "Interstitial fluid, lymphocytes, and macrophages."],
      ["What are the primary lymphatic structures?", "Thymus and red bone marrow."],
      ["What does the thoracic duct drain, and where does it empty?", "Both legs/abdomen and the left side above the diaphragm; empties into the left subclavian vein."],
      ["What does the right lymphatic duct drain?", "The right arm, and right side of the torso/neck/head."],
      ["Where do T cells become immunocompetent?", "In the thymus gland (via thymosin)."]
    ],
    matchCards: [
      ["Tunica intima", "Innermost vessel layer, endothelium"],
      ["Tunica media", "Middle layer, smooth muscle"],
      ["Tunica adventitia", "Outermost vessel layer"],
      ["Arteriole", "Smallest artery"],
      ["Venule", "Smallest vein"],
      ["Azygos vein", "Drains right intercostal veins"],
      ["Erythrocyte", "Red blood cell, carries O2/CO2"],
      ["Leukocyte", "White blood cell, immune function"],
      ["Platelet", "Cell fragment, involved in clotting"],
      ["Thoracic duct", "Largest lymph duct, drains into left subclavian"],
      ["Cisterna chyli", "Saclike origin of the thoracic duct"],
      ["Thymus", "Where T cells become immunocompetent"]
    ]},
  { id: "anatomy-pulmonary", name: "Pulmonary Anatomy", color: "accent3",
    icon: '<path d="M9 3c-3 2-5 6-5 10a5 5 0 0 0 10 0V5M15 3c3 2 5 6 5 10a5 5 0 0 1-10 0V5"/>',
    cards: [
      ["What is the main functional difference between the pharynx and larynx?", "Pharynx passes air and food; larynx passes air only and produces voice."],
      ["What separates the upper from the lower respiratory system?", "The larynx — upper is nose through larynx, lower is trachea through alveoli."],
      ["What is the conducting zone versus the respiratory zone?", "Conducting zone moves/cleans air (nose to terminal bronchioles); respiratory zone is where gas exchange occurs."],
      ["What do goblet cells produce?", "Mucus, trapping inhaled debris."],
      ["How many cartilages make up the larynx?", "9 total — 3 unpaired and 3 paired (6 structures)."],
      ["Which laryngeal cartilage closes over the glottis during swallowing?", "The epiglottis."],
      ["Which laryngeal cartilages are functionally most important for opening/closing the vocal folds?", "The arytenoid cartilages."],
      ["At what level does the trachea bifurcate, and into what?", "At the carina (T5), into right and left primary bronchi."],
      ["Why is aspiration more likely into the right lung?", "The right primary bronchus is steeper, shorter, and wider than the left."],
      ["How many lobes does the right lung have, versus the left?", "Right has three (superior, middle, inferior); left has two (superior, inferior)."],
      ["What is the lingula?", "A tongue-like extension of the left lung's superior lobe, wrapping around the heart."],
      ["What do type I pneumocytes do?", "Form the thin squamous lining where gas exchange occurs."],
      ["What do type II pneumocytes secrete?", "Surfactant, which prevents alveolar collapse."],
      ["What supplies blood to the bronchi and connective tissue of the lungs?", "The bronchial arteries (from the descending thoracic aorta)."],
      ["What separates the visceral and parietal pleura?", "The pleural cavity, containing 5-10 mL of pleural fluid."],
      ["What nerve innervates the diaphragm?", "The phrenic nerve (C3-C5)."],
      ["What do external intercostals do, versus internal intercostals?", "External intercostals elevate ribs (inhalation); internal intercostals depress ribs (exhalation)."],
      ["What are the diaphragm's three hiatuses, and their levels?", "Inferior vena cava (T8), esophagus (T10), and aorta (T12)."]
    ],
    matchCards: [
      ["Pharynx", "Throat — air and food passageway"],
      ["Larynx", "Voice box — air only, voice production"],
      ["Epiglottis", "Closes over glottis during swallowing"],
      ["Trachea", "Windpipe, bifurcates at the carina"],
      ["Right lung", "Three lobes"],
      ["Left lung", "Two lobes, has the cardiac notch"],
      ["Type I pneumocyte", "Gas exchange cell in alveoli"],
      ["Type II pneumocyte", "Secretes surfactant"],
      ["Visceral pleura", "Covers the outer lung surface"],
      ["Parietal pleura", "Lines the thoracic wall"],
      ["Diaphragm", "Primary muscle of respiration"],
      ["Phrenic nerve", "Innervates the diaphragm"]
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
    ]},
  { id: "physio-cellphys-membranes", name: "Cell Physiology & Membranes", color: "accent",
    icon: '<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 4a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"/>',
    cards: [
      ["What is homeostasis?", "The maintenance of a stable internal environment (“milieu interieur”)."],
      ["What is the difference between constitutive and stimulated secretion?", "Constitutive secretion happens randomly/continuously; stimulated secretion requires a trigger."],
      ["What do lysosomes contain?", "Hydrolytic acid hydrolases (phosphatases, nucleases, proteases, lysozymes) that digest material."],
      ["How do peroxisomes differ from lysosomes?", "They're formed by self-replication and contain oxidases instead of acid hydrolases."],
      ["What is autophagy?", "A housekeeping process degrading/recycling obsolete organelles, important when nutrients are scarce."],
      ["What is the maximum number of ATP formed per glucose molecule degraded?", "38 ATP."],
      ["What is the functional diameter of a nuclear pore?", "About 9 nm, permeable to molecules up to ~44,000 MW."],
      ["What is the start codon, and which amino acid does it specify?", "AUG, specifying methionine."],
      ["What are Okazaki fragments?", "Short DNA fragments formed on the lagging strand during replication."],
      ["What is the difference between simple and facilitated diffusion?", "Simple diffusion: lipid-soluble molecules cross directly; facilitated diffusion: water-soluble molecules cross via protein channels."],
      ["What limits the maximum rate (Vmax) of facilitated diffusion?", "The maximum rate of conformational change of the protein transporter."],
      ["What does the Na+-K+ ATPase do?", "Pumps 3 Na+ out and 2 K+ in against their gradients, using ATP."],
      ["What is osmosis?", "Net movement of water across a semipermeable membrane, from high to low water concentration."],
      ["What determines a solution's osmolarity?", "Solute particle density (number of particles), not the mass of solute."],
      ["What is the difference between osmolarity and tonicity?", "Osmolarity is a measure of concentration; tonicity (effective osmotic pressure) depends on both the solute and the membrane's permeability to it."],
      ["Why does a cell in 200 mOsm/L urea swell and burst?", "Urea is a permeant solute that enters the cell, drawing water in with it."],
      ["What is a symporter?", "A cotransporter that moves a substance in the same direction as a driver ion (e.g., Na+)."]
    ],
    matchCards: [
      ["Homeostasis", "Stable internal environment"],
      ["Lysosome", "Hydrolytic digestive enzymes"],
      ["Peroxisome", "Oxidases, self-replicating"],
      ["Autophagy", "Recycles obsolete organelles"],
      ["Nuclear pore", "~9 nm functional diameter"],
      ["Start codon", "AUG (methionine)"],
      ["Facilitated diffusion", "Water-soluble molecules, protein channel"],
      ["Na+-K+ ATPase", "3 Na+ out, 2 K+ in"],
      ["Osmosis", "Net water movement across membrane"],
      ["Osmolarity", "Particle concentration"],
      ["Tonicity", "Effective osmotic pressure"],
      ["Symporter", "Cotransport, same direction as driver ion"]
    ]},
  { id: "physio-membrane-ap-muscle", name: "Membrane Potentials, APs & Muscle", color: "accent2",
    icon: '<path d="M13 2 3 14h7l-1 8 10-12h-7z"/>',
    cards: [
      ["Why is resting Vm close to EK?", "The membrane is far more permeable to K+ than Na+ at rest (~100x more K+ leak channels)."],
      ["What is the electrochemical driving force (VDF) equation?", "VDF = Vm − Eion; positive VDF = efflux, negative VDF = influx."],
      ["What are the four defining properties of an action potential?", "All-or-none, constant amplitude, initiated by depolarization, relies on voltage-gated channels."],
      ["What is the difference between absolute and relative refractory periods?", "Absolute: AP impossible (Na+ channels inactivated); relative: a greater-than-normal stimulus is needed."],
      ["What enables saltatory conduction?", "Myelin plus concentration of Na+/K+ channels only at the nodes of Ranvier."],
      ["What is an EPSP, and what ions mediate it?", "Excitatory postsynaptic potential, mediated by cation channels (Na+, K+, Ca2+)."],
      ["What is an IPSP, and what ions mediate it?", "Inhibitory postsynaptic potential, mediated by K+ or Cl- channels."],
      ["What terminates ACh signaling at the neuromuscular junction?", "Acetylcholinesterase (AChE), which breaks down ACh in the synaptic cleft."],
      ["What triggers Ca2+ release from the SR in skeletal muscle EC coupling?", "Voltage sensed by the T-tubule DHP receptor (Voltage-Activated Calcium Release)."],
      ["What role does troponin C play in muscle contraction?", "It binds Ca2+, triggering the shift that exposes myosin-binding sites on actin."],
      ["What causes rigor mortis?", "Without ATP, myosin heads cannot detach from actin filaments."],
      ["What is the size principle of motor unit recruitment?", "Smaller motor units (Type 1 fibers) are recruited before larger ones (Type 2 fibers)."],
      ["What is a fused tetanus?", "A contraction where individual twitches are no longer resolved due to high AP frequency."],
      ["What ion binds calmodulin (instead of troponin) in smooth muscle?", "Ca2+, activating myosin light chain kinase (MLCK)."],
      ["What is the smooth muscle 'latch state'?", "The ability to maintain force for long periods very efficiently, with low energy cost."]
    ],
    matchCards: [
      ["Resting Vm", "Close to EK (K+ permeability dominates)"],
      ["Action potential", "All-or-none, constant amplitude"],
      ["Absolute refractory period", "AP impossible, Na+ channels inactivated"],
      ["Saltatory conduction", "Myelin + nodes of Ranvier"],
      ["EPSP", "Cation channels, depolarizing"],
      ["IPSP", "K+/Cl- channels, hyperpolarizing"],
      ["Acetylcholinesterase", "Terminates ACh signaling"],
      ["DHP receptor", "Voltage sensor, skeletal muscle T-tubule"],
      ["Troponin C", "Binds Ca2+ in skeletal/cardiac muscle"],
      ["Rigor mortis", "No ATP → myosin can't detach"],
      ["Calmodulin", "Binds Ca2+ in smooth muscle"],
      ["Latch state", "Sustained smooth muscle force, low energy"]
    ]},
  { id: "physio-nervous-sensory", name: "Sensory Physiology & Pain", color: "accent3",
    icon: '<path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 11a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"/>',
    cards: [
      ["What is the labeled line principle?", "Each receptor responds to a limited range of stimuli and has a direct line to the brain."],
      ["What is receptor adaptation?", "A decrease in receptor response to a sustained stimulus."],
      ["What is spatial summation vs. temporal summation?", "Spatial: more fibers stimulated; temporal: increased firing rate in the same fibers."],
      ["What is reciprocal inhibition used for?", "Controlling antagonistic muscle pairs."],
      ["What causes a reverberatory circuit to stop?", "Fatigue of synaptic junctions."],
      ["What tract carries fine touch, vibration, and proprioception?", "The dorsal column-medial lemniscal system."],
      ["What tract carries pain, temperature, and crude touch?", "The anterolateral system."],
      ["What is a dermatome?", "The area of skin supplied by sensory neurons from one spinal nerve ganglion."],
      ["What is lateral inhibition?", "An excited neuron reduces activity of neighboring neurons, sharpening contrast."],
      ["What distinguishes fast pain from slow pain?", "Fast pain: A-delta fibers, sharp, felt in <0.1s; slow pain: C fibers, aching, felt after 1s+."],
      ["What is the main chemical mediator of pain from tissue damage?", "Bradykinin."],
      ["What is Substance P?", "The excitatory transmitter of slow (C-fiber) pain neurons."],
      ["What is the gate theory of pain?", "A-beta tactile fiber stimulation can reduce pain transmission via lateral inhibition."],
      ["What causes referred pain?", "Convergence of visceral and cutaneous afferents onto the same dorsal horn neurons."],
      ["What produces CSF, and how much is made daily?", "The choroid plexus, about 500 mL/day."],
      ["What forms the blood-brain barrier?", "Tight junctions between brain capillary endothelial cells, reinforced by astrocyte end-feet."]
    ],
    matchCards: [
      ["Labeled line principle", "One receptor, one modality, direct brain line"],
      ["Dorsal column-medial lemniscal", "Fine touch, vibration, proprioception"],
      ["Anterolateral system", "Pain, temperature, crude touch"],
      ["Dermatome", "Skin area, one spinal nerve"],
      ["Lateral inhibition", "Sharpens sensory contrast"],
      ["Fast pain", "A-delta fibers, sharp"],
      ["Slow pain", "C fibers, aching"],
      ["Bradykinin", "Main pain mediator from tissue damage"],
      ["Substance P", "Slow-pain transmitter"],
      ["Gate theory", "Touch fibers reduce pain transmission"],
      ["Choroid plexus", "Produces CSF"],
      ["Blood-brain barrier", "Tight endothelial junctions + astrocytes"]
    ]},
  { id: "physio-nervous-motor", name: "Motor Physiology", color: "accent4",
    icon: '<path d="M12 2 4 7v10l8 5 8-5V7z"/>',
    cards: [
      ["What is the difference between alpha and gamma motor neurons?", "Alpha innervate extrafusal fibers (force); gamma innervate intrafusal fibers (spindle sensitivity)."],
      ["What do Renshaw cells do?", "Provide negative feedback inhibition to the alpha motor neuron that excited them."],
      ["What does the muscle spindle sense?", "Muscle length and rate of change in length."],
      ["What does the Golgi tendon organ sense?", "Tendon tension and rate of change in tension."],
      ["What is the stretch reflex, and what fiber mediates it?", "A monosynaptic reflex via Type Ia afferents that opposes muscle stretch."],
      ["What is the crossed-extensor reflex?", "An extensor reflex in the opposite limb following a painful stimulus, pushing the body away."],
      ["Why are alpha and gamma motor neurons co-activated?", "So the spindle stays taut (loaded) as the main muscle shortens."],
      ["What is the size principle?", "Smaller motor units (Type 1) are recruited before larger ones (Type 2)."],
      ["What are Betz cells?", "Giant pyramidal cells in the motor cortex giving rise to fast corticospinal fibers."],
      ["Where do most corticospinal fibers cross to the opposite side?", "In the medulla."],
      ["What is the difference between the pontine and medullary reticular nuclei?", "Pontine excites antigravity muscles; medullary inhibits them."],
      ["What does the macula (utricle/saccule) detect?", "Head orientation relative to gravity, via gravity-sensitive hair cells."],
      ["What do the semicircular ducts detect?", "Angular (rotational) acceleration of the head."],
      ["What is the function of the cerebellum's deep nuclear cells?", "Send excitatory signals then inhibitory signals, damping movement to prevent overshoot."],
      ["What are the four nuclei of the basal ganglia?", "Striatum (caudate + putamen), globus pallidus, substantia nigra, subthalamus."]
    ],
    matchCards: [
      ["Alpha motor neuron", "Extrafusal fibers, force"],
      ["Gamma motor neuron", "Intrafusal fibers, spindle sensitivity"],
      ["Renshaw cell", "Negative feedback inhibition"],
      ["Muscle spindle", "Senses length/rate of change"],
      ["Golgi tendon organ", "Senses tension"],
      ["Stretch reflex", "Monosynaptic, Type Ia"],
      ["Crossed-extensor reflex", "Opposite-limb extension"],
      ["Betz cells", "Fast corticospinal fibers"],
      ["Pontine reticular nuclei", "Excite antigravity muscles"],
      ["Medullary reticular nuclei", "Inhibit antigravity muscles"],
      ["Macula", "Head orientation vs. gravity"],
      ["Semicircular ducts", "Angular acceleration"]
    ]},
  { id: "physio-cns-function", name: "Autonomic NS, Cortex, Memory & Limbic System", color: "accent",
    icon: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 5h2v6h-2zm0 8h2v2h-2z"/>',
    cards: [
      ["What neurotransmitter do all preganglionic autonomic fibers release?", "Acetylcholine."],
      ["What receptor mediates sympathetic effects on the heart?", "Beta-1 adrenergic receptor (ADRB1)."],
      ["What receptor mediates parasympathetic effects on the heart?", "Muscarinic acetylcholine receptor (mAChR)."],
      ["What activates alpha vs. beta adrenergic receptors more strongly?", "NE mostly activates alpha; Epi activates alpha and beta about equally."],
      ["What is the mass discharge of the SNS?", "The fight-or-flight response, triggered by hypothalamic activation from fright/severe pain."],
      ["What area of the dominant hemisphere is responsible for verbal symbolism?", "Wernicke's area."],
      ["What does damage to Broca's area cause?", "Decreased speech capability (motor aphasia)."],
      ["What does destruction of the visual/auditory association areas cause (Wernicke aphasia)?", "Inability to understand written or spoken word."],
      ["What are the three types of memory by duration?", "Immediate (seconds-minutes), short-term (days-weeks), long-term (years-lifetime)."],
      ["What is habituation?", "Progressive decline in response due to fewer active Ca2+ channels with repeated stimulation."],
      ["What structural change underlies long-term memory?", "Increased vesicular release area at the synapse (more synthesized release-site proteins)."],
      ["What deficit results from hippocampal damage?", "Anterograde amnesia (can't form new long-term memories)."],
      ["What deficit results from thalamic damage related to memory?", "Retrograde amnesia (can't recall old memories)."],
      ["What is the amygdala's key role?", "Fear, threat detection, and emotional learning."],
      ["What is the suprachiasmatic nucleus?", "The hypothalamus's master clock, coordinating circadian rhythms."],
      ["Which center takes precedence: reward or punishment?", "Punishment always takes precedence over reward."]
    ],
    matchCards: [
      ["Preganglionic ANS fibers", "Always release ACh"],
      ["Beta-1 receptor", "Sympathetic cardiac effects"],
      ["Muscarinic receptor", "Parasympathetic cardiac effects"],
      ["Wernicke's area", "Verbal symbolism, comprehension"],
      ["Broca's area", "Motor speech coordination"],
      ["Immediate memory", "Seconds to minutes"],
      ["Long-term memory", "Structural synaptic change"],
      ["Habituation", "Fewer active Ca2+ channels"],
      ["Hippocampus", "Anterograde amnesia if damaged"],
      ["Thalamus (memory)", "Retrograde amnesia if damaged"],
      ["Amygdala", "Fear, threat detection"],
      ["Suprachiasmatic nucleus", "Circadian master clock"]
    ]},
  { id: "physio-hearing-taste-smell", name: "Hearing, Taste & Smell", color: "accent2",
    icon: '<path d="M12 2C8 2 5 5 5 9v6l-2 3h18l-2-3V9c0-4-3-7-7-7z"/>',
    cards: [
      ["Why does the tympanic membrane amplify sound?", "Its area is ~17x larger than the oval window, concentrating force."],
      ["What is the attenuation reflex?", "Loud noise triggers stapedius/tensor tympani contraction, reducing sound transmission by 30–40 dB."],
      ["What is the smallest skeletal muscle in the body?", "The stapedius muscle (~1mm long)."],
      ["What percentage of auditory signals do inner hair cells transmit?", "About 90%, despite 3-4x more outer hair cells existing."],
      ["What is the place principle?", "Sound frequency (pitch) is determined by which position along the basilar membrane is maximally stimulated."],
      ["What determines perceived sound amplitude (loudness)?", "How much the basilar membrane is displaced."],
      ["What do the lateral vs. medial superior olivary nuclei detect?", "Lateral: intensity differences between ears; medial: time lag between ears."],
      ["Why is most of what we call 'taste' actually smell?", "The tongue can only detect 5 basic tastes plus texture; complex flavor comes from olfaction."],
      ["What causes umami taste?", "Glutamate."],
      ["Why is bitter taste sensitivity a survival mechanism?", "Many poisons/alkaloids taste bitter, and babies/children are especially sensitive to it."],
      ["What percentage of taste buds are on circumvallate papillae?", "About 50%, forming a V on the posterior tongue."],
      ["Which cranial nerve carries taste from the anterior 2/3 of the tongue?", "Facial nerve (CN VII)."],
      ["What second messenger opens Na+ channels in olfactory transduction?", "cAMP, produced via G-protein activation of adenylyl cyclase."],
      ["What three properties must a substance have to be smelled?", "Volatile, at least slightly water-soluble, and at least slightly lipid-soluble."]
    ],
    matchCards: [
      ["Attenuation reflex", "Stapedius/tensor tympani, protects cochlea"],
      ["Place principle", "Basilar membrane position → pitch"],
      ["Inner hair cells", "~90% of auditory signal"],
      ["Lateral superior olive", "Intensity difference → direction"],
      ["Medial superior olive", "Time lag → direction"],
      ["Umami", "Glutamate"],
      ["Bitter taste", "Poison-detection survival mechanism"],
      ["Circumvallate papillae", "50% of taste buds, posterior V"],
      ["CN VII", "Taste, anterior 2/3 tongue"],
      ["CN IX", "Taste, posterior 1/3 tongue"],
      ["Olfactory transduction", "G-protein → cAMP → Na+ channels"],
      ["Olfactory nerve", "CN I"]
    ]},
  { id: "physio-cardiac", name: "Cardiac Physiology", color: "accent3",
    icon: '<path d="M12 21s-8-5-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-8 11-10 11z"/>',
    cards: [
      ["Why can't cardiac muscle undergo tetany?", "Its long AP/contraction duration and long absolute refractory period prevent summation."],
      ["What separates atrial and ventricular syncytia electrically?", "A fibrous insulator (cardiac skeleton)."],
      ["What produces the ventricular AP's plateau?", "Decreased K+ conductance plus increased Ca2+ conductance (~200 ms)."],
      ["What triggers Ca2+ release in cardiac EC coupling?", "Calcium-activated calcium release: Ca2+ entry via L-type channels triggers ryanodine receptor opening."],
      ["What causes the first vs. second heart sound?", "S1: A-V valve closure; S2: semilunar valve closure."],
      ["What is ejection fraction?", "EF = stroke volume / end-diastolic volume."],
      ["What is preload, and what is it proportional to?", "Passive tension at end-diastole, proportional to EDV."],
      ["What is afterload, and what is it proportional to?", "The pressure the heart must pump against, proportional to mean arterial pressure."],
      ["What is the Frank-Starling mechanism?", "Increased venous return stretches the heart, increasing contraction force, independent of innervation."],
      ["Why is the SA node the heart's pacemaker?", "It has the fastest intrinsic discharge rate (70-80/min)."],
      ["Where does most A-V conduction delay occur?", "The A-V node (~0.09 sec)."],
      ["What does parasympathetic (vagal) stimulation do to the SA node?", "Hyperpolarizes it via increased K+ permeability, slowing heart rate."],
      ["What does norepinephrine do to SA node ion permeability?", "Increases Na+ and Ca2+ permeability, accelerating self-excitation."],
      ["What do 'chronotropic', 'dromotropic', and 'inotropic' mean?", "Rate, conduction velocity, and contractility, respectively."],
      ["Why is the T wave normally positive?", "The last areas to depolarize (outer ventricle) are the first to repolarize."]
    ],
    matchCards: [
      ["Cardiac plateau", "Decreased K+, increased Ca2+ conductance"],
      ["Calcium-activated calcium release", "Cardiac EC coupling trigger"],
      ["S1", "A-V valve closure"],
      ["S2", "Semilunar valve closure"],
      ["Ejection fraction", "SV / EDV"],
      ["Preload", "Proportional to EDV"],
      ["Afterload", "Proportional to mean arterial pressure"],
      ["Frank-Starling mechanism", "Stretch → stronger contraction"],
      ["SA node", "Fastest pacemaker, 70-80/min"],
      ["A-V node delay", "~0.09 sec"],
      ["Chronotropic", "Rate"],
      ["Inotropic", "Contractility"]
    ]},
  { id: "physio-circ-1", name: "Circulatory Physiology I", color: "accent4",
    icon: '<path d="M4 12h4l2-6 4 12 2-6h4"/>',
    cards: [
      ["Which vessel type has the largest total cross-sectional area?", "Capillaries (~1000x the aorta's)."],
      ["Where is most blood volume located?", "The veins (~60%), which serve as a blood reservoir."],
      ["Where does the largest pressure drop in the circulation occur?", "Across the arteriolar-capillary junction."],
      ["What is the Q = ΔP/R equation?", "Flow equals pressure difference divided by resistance."],
      ["How does conductance change with vessel radius?", "It increases with the 4th power of the radius (Poiseuille's law)."],
      ["If a vessel narrows to half its radius, how much does resistance increase?", "About 16-fold."],
      ["How much more distensible are veins than arteries?", "About 8x more distensible."],
      ["What is pulse pressure?", "Systolic minus diastolic pressure (e.g., 120 - 80 = 40 mmHg)."],
      ["What are Korotkoff sounds used for?", "Auscultatory measurement of systolic/diastolic blood pressure."],
      ["What is central venous pressure, and its normal value?", "Right atrial pressure, normally about 0 mmHg."],
      ["What is the vasomotor center (VMC), and where is it located?", "Medullary/pontine reticular substance, controlling arterial pressure."],
      ["What neurotransmitter do sympathetic vasoconstrictor nerves release?", "Norepinephrine."],
      ["What are the four Starling forces governing capillary fluid exchange?", "Capillary hydrostatic pressure, plasma colloid osmotic pressure, interstitial fluid pressure, interstitial colloid osmotic pressure."],
      ["What percentage of filtered capillary fluid is reabsorbed at the venous end?", "About 90%, with the remaining 10% returned via lymphatics."]
    ],
    matchCards: [
      ["Capillaries", "Largest total cross-sectional area"],
      ["Veins", "~60% of blood volume"],
      ["Arteriolar-capillary junction", "Largest pressure drop"],
      ["Q = ΔP/R", "Flow equation"],
      ["Poiseuille's law", "Conductance ∝ r⁴"],
      ["Pulse pressure", "Systolic − diastolic"],
      ["Korotkoff sounds", "Auscultatory BP measurement"],
      ["Central venous pressure", "Right atrial pressure, ~0 mmHg"],
      ["Vasomotor center", "Medulla/pons, controls AP"],
      ["Starling forces", "4 pressures governing capillary exchange"],
      ["Capillary reabsorption", "~90% at venous end"],
      ["Lymphatics", "Return remaining 10% of filtrate"]
    ]},
  { id: "physio-circ-2", name: "Circulatory Physiology II", color: "accent",
    icon: '<path d="M12 3v18M3 12h18"/>',
    cards: [
      ["What is pressure natriuresis?", "The effect of increased pressure to increase Na excretion by the kidney."],
      ["Where is renin synthesized?", "Modified smooth muscle cells in the kidney's afferent arterioles."],
      ["Where is angiotensin I converted to angiotensin II?", "Pulmonary circulation endothelial cells (via ACE)."],
      ["Do long-term TPR changes alone raise long-term arterial pressure?", "No — only changing the renal function curve does."],
      ["What is the Bainbridge reflex?", "Atrial stretch → signals to VMC → increased heart rate via vagal/sympathetic nerves."],
      ["What is the Frank-Starling law of the heart?", "Increased blood inflow stretches the heart, increasing contraction force."],
      ["What is mean systemic filling pressure?", "The equilibrium pressure (~7 mmHg) when all circulatory flow stops."],
      ["What fraction of resistance to venous return comes from veins vs. arterioles?", "~2/3 venous, ~1/3 arteriolar/small artery."],
      ["What is functional hyperemia?", "Increased blood flow when a muscle becomes metabolically active."],
      ["Where are arterial baroreceptors located?", "Carotid sinus and aortic arch."],
      ["At what pressure is the baroreceptor reflex most sensitive?", "About 100 mmHg."],
      ["Why are baroreceptors unimportant for long-term BP control?", "They 'reset'/adapt to sustained pressure changes."],
      ["What triggers the CNS ischemic response?", "Cerebral ischemia → CO2 buildup → VMC stimulation → increased arterial pressure."],
      ["What is normal coronary blood flow at rest?", "~225 mL/min, about 4-5% of cardiac output."],
      ["What is the primary regulator of coronary blood flow?", "Local metabolic factors, especially oxygen."]
    ],
    matchCards: [
      ["Pressure natriuresis", "Pressure increases Na excretion"],
      ["Renin", "Made in afferent arteriole smooth muscle"],
      ["ACE", "Converts ANG I to ANG II (lung)"],
      ["Bainbridge reflex", "Atrial stretch → ↑ heart rate"],
      ["Mean systemic filling pressure", "~7 mmHg equilibrium"],
      ["Functional hyperemia", "Flow ↑ with muscle activity"],
      ["Baroreceptors", "Carotid sinus, aortic arch"],
      ["Baroreceptor sensitivity peak", "~100 mmHg"],
      ["Baroreceptor resetting", "Adapts to sustained pressure change"],
      ["CNS ischemic response", "CO2 buildup → ↑ arterial pressure"],
      ["Coronary blood flow", "~225 mL/min, 4-5% of CO"],
      ["Coronary flow regulator", "Local O2/metabolites"]
    ]},
  { id: "physio-vision", name: "Physiology of Vision", color: "accent2",
    icon: '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7zm11 3.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z"/>',
    cards: [
      ["What is refractive index?", "The ratio of light speed in air to light speed in a substance."],
      ["What fraction of the eye's refractive power comes from the cornea?", "About 2/3."],
      ["What is a diopter?", "The power of a lens that focuses parallel rays at 1 meter."],
      ["What is accommodation?", "Ciliary muscle contraction thickens the lens, increasing refractive power (20→34 diopters)."],
      ["What is presbyopia?", "Age-related inability to accommodate, from lens protein denaturation."],
      ["Where is aqueous humor produced, and how does it drain?", "Produced by ciliary body; drains via trabecular meshwork → canal of Schlemm."],
      ["What determines intraocular pressure?", "Resistance to aqueous humor outflow at the canal of Schlemm."],
      ["What makes the fovea centralis the point of highest acuity?", "Only cones, 1:1 cone-to-bipolar cell ratio, displaced vessels/neurons."],
      ["What is the key sensitivity difference between rods and cones?", "Rods: high sensitivity, night vision; cones: lower sensitivity, day/color vision."],
      ["What happens when a photon is absorbed by retinal in rhodopsin?", "11-cis → all-trans retinal, activating rhodopsin and closing Na+/Ca2+ channels (hyperpolarization)."],
      ["Why does vitamin A deficiency cause night blindness?", "Less retinal available → less rhodopsin → lower retinal light sensitivity."],
      ["What creates the eye's natural blind spot?", "The optic disc, where ganglion axons exit — no rods or cones there."],
      ["What do horizontal cells do?", "Provide inhibitory feedback (lateral inhibition), enhancing contrast."],
      ["What happens at the optic chiasm?", "Nasal retinal fibers cross to the opposite side; temporal fibers stay uncrossed."],
      ["What is the pupillary light reflex pathway?", "Optic nerve → pretectal nuclei → parasympathetic constriction of the pupillary sphincter."]
    ],
    matchCards: [
      ["Refractive index", "Speed of light ratio (air:substance)"],
      ["Diopter", "Lens power unit"],
      ["Accommodation", "Ciliary muscle thickens lens"],
      ["Presbyopia", "Age-related loss of accommodation"],
      ["Canal of Schlemm", "Aqueous humor outflow, sets IOP"],
      ["Fovea centralis", "Cones only, highest acuity"],
      ["Rhodopsin", "Rod photopigment"],
      ["Optic disc", "Blind spot, no photoreceptors"],
      ["Horizontal cells", "Lateral inhibition"],
      ["Optic chiasm", "Nasal fibers cross"],
      ["Pretectal nuclei", "Pupillary light reflex"],
      ["Vitamin A", "Needed to regenerate retinal/rhodopsin"]
    ]},
  { id: "physio-hemostasis", name: "Hemostasis & Blood Coagulation", color: "accent3",
    icon: '<path d="M12 2s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13z"/>',
    cards: [
      ["Why is carbonic anhydrase important in red blood cells?", "It lets most CO2 be carried in blood as bicarbonate."],
      ["How does the biconcave shape of an RBC aid its function?", "Redundant membrane lets it deform to pass through narrow capillaries."],
      ["Besides oxygen transport, what other major role does hemoglobin play?", "An excellent acid-base buffer."],
      ["Why can't platelets reproduce?", "They have no nucleus."],
      ["What gives platelets contractile ability for clot retraction?", "Actin, myosin, and thrombosthenin."],
      ["How do platelets enter circulation?", "Fragmentation of megakaryocytes."],
      ["What are the three steps of hemostasis?", "Vascular spasm, platelet plug formation, coagulation (clot formation)."],
      ["What is the difference between the intrinsic and extrinsic coagulation pathways?", "Intrinsic: activated by contact with damaged vessel/collagen; extrinsic: activated by tissue factor released from damaged tissue."],
      ["What is the common pathway of coagulation?", "Factor X activation leading to prothrombin → thrombin → fibrinogen → fibrin."],
      ["What is the role of vitamin K in coagulation?", "Required for synthesis of clotting factors II, VII, IX, and X."],
      ["What is the function of plasmin?", "Breaks down fibrin clots (fibrinolysis)."],
      ["What is hematopoiesis, and where does it occur in adults?", "Blood cell formation, occurring in red bone marrow."],
      ["What hormone stimulates red blood cell production?", "Erythropoietin, from the kidney."]
    ],
    matchCards: [
      ["Carbonic anhydrase", "CO2 carried as bicarbonate"],
      ["Biconcave RBC shape", "Deformability through capillaries"],
      ["Hemoglobin", "O2 transport + acid-base buffer"],
      ["Platelets", "Anucleate, from megakaryocyte fragments"],
      ["Thrombosthenin", "Platelet contractile protein"],
      ["Vascular spasm", "First hemostasis step"],
      ["Intrinsic pathway", "Contact activation"],
      ["Extrinsic pathway", "Tissue factor activation"],
      ["Vitamin K", "Needed for factors II, VII, IX, X"],
      ["Plasmin", "Breaks down fibrin clots"],
      ["Hematopoiesis", "Blood cell formation, bone marrow"],
      ["Erythropoietin", "Stimulates RBC production, made in kidney"]
    ]},
  { id: "physio-immunology", name: "Blood & Immunology", color: "accent4",
    icon: '<path d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7z"/>',
    cards: [
      ["What is the difference between innate and acquired immunity?", "Innate: nonspecific, immediate; acquired: specific, requires prior exposure/memory."],
      ["What are the major cell types of innate immunity?", "Neutrophils, macrophages, natural killer cells."],
      ["What is the role of B lymphocytes?", "Humoral immunity — differentiate into plasma cells that secrete antibodies."],
      ["What is the role of T lymphocytes?", "Cell-mediated immunity — helper T cells assist, cytotoxic T cells kill infected cells."],
      ["What is an antigen?", "A substance that triggers an immune response."],
      ["What is the function of the complement system?", "A cascade of proteins that opsonize pathogens, promote inflammation, and lyse cells."],
      ["What is the role of the lymph nodes?", "Filter lymph and serve as sites for immune cell activation."],
      ["What is the function of the spleen in immunity?", "Filters blood, removes old RBCs, and mounts immune responses to blood-borne pathogens."],
      ["What is the function of the thymus?", "Site of T-lymphocyte maturation."],
      ["What is passive immunity?", "Immunity from antibodies transferred from another source (e.g., maternal antibodies), not requiring the individual's own immune response."],
      ["What is active immunity?", "Immunity from the individual's own immune system producing antibodies, either from infection or vaccination."],
      ["What are the five classes of antibodies?", "IgG, IgA, IgM, IgD, IgE."]
    ],
    matchCards: [
      ["Innate immunity", "Nonspecific, immediate"],
      ["Acquired immunity", "Specific, memory-based"],
      ["B lymphocytes", "Humoral immunity, antibodies"],
      ["T lymphocytes", "Cell-mediated immunity"],
      ["Complement system", "Opsonization, inflammation, lysis"],
      ["Lymph nodes", "Filter lymph, immune activation"],
      ["Spleen", "Filters blood, RBC removal"],
      ["Thymus", "T-cell maturation"],
      ["Passive immunity", "Transferred antibodies"],
      ["Active immunity", "Self-produced antibodies"],
      ["IgG", "Most abundant antibody class"],
      ["IgA", "Mucosal secretions"]
    ]},
  { id: "physio-gi", name: "Gastrointestinal Physiology", color: "accent",
    icon: '<path d="M6 3v6a4 4 0 0 0 4 4v8m8-18v18M6 13h4"/>',
    cards: [
      ["What cells secrete HCl in the stomach?", "Parietal cells."],
      ["What cells secrete pepsinogen?", "Chief cells."],
      ["What hormone stimulates gastric acid secretion in response to gastric distension/protein?", "Gastrin."],
      ["What hormone inhibits gastric emptying and stimulates gallbladder contraction?", "Cholecystokinin (CCK)."],
      ["What hormone stimulates pancreatic bicarbonate secretion?", "Secretin."],
      ["What is the function of the exocrine pancreas?", "Secretes digestive enzymes (amylase, lipase, proteases) and bicarbonate."],
      ["What is bile made of, and where is it stored?", "Bile salts, cholesterol, bilirubin; stored/concentrated in the gallbladder."],
      ["What is the main function of bile salts in digestion?", "Emulsify fats to aid lipase digestion and micelle formation for absorption."],
      ["What are the major functions of the liver?", "Metabolism (carb/lipid/protein), bile production, detoxification, plasma protein synthesis."],
      ["Where are most nutrients absorbed?", "The small intestine, primarily the jejunum."],
      ["What drives peristalsis in the GI tract?", "Coordinated contraction of circular and longitudinal smooth muscle, controlled by the enteric nervous system."],
      ["What is the defecation reflex?", "Rectal distension triggers reflex relaxation of the internal anal sphincter, with voluntary control of the external sphincter."],
      ["What are the two enteric nervous system plexuses?", "Myenteric (motility) and submucosal (secretion/blood flow)."]
    ],
    matchCards: [
      ["Parietal cells", "Secrete HCl"],
      ["Chief cells", "Secrete pepsinogen"],
      ["Gastrin", "Stimulates acid secretion"],
      ["CCK", "Gallbladder contraction, inhibits emptying"],
      ["Secretin", "Stimulates pancreatic bicarbonate"],
      ["Bile salts", "Emulsify fats"],
      ["Gallbladder", "Stores/concentrates bile"],
      ["Small intestine", "Main site of nutrient absorption"],
      ["Myenteric plexus", "Controls motility"],
      ["Submucosal plexus", "Controls secretion/blood flow"],
      ["Defecation reflex", "Rectal distension → sphincter relaxation"],
      ["Liver", "Metabolism, bile, detox, plasma proteins"]
    ]},
  { id: "physio-metabolism", name: "Metabolism, Nutrition & Thermoregulation", color: "accent2",
    icon: '<path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/>',
    cards: [
      ["What is glycolysis?", "The breakdown of glucose to pyruvate, producing a net 2 ATP without oxygen."],
      ["What is the Krebs (citric acid) cycle's role?", "Oxidizes acetyl-CoA, producing electron carriers (NADH, FADH2) for the electron transport chain."],
      ["Where does beta-oxidation of fatty acids occur?", "The mitochondrial matrix."],
      ["What is deamination, in protein metabolism?", "Removal of the amino group from an amino acid, producing ammonia and a keto acid."],
      ["How is ammonia converted for safe excretion?", "Converted to urea in the liver (urea cycle)."],
      ["What is basal metabolic rate (BMR)?", "The energy expended at rest for basic physiological functions, ~60-80% of total energy needs."],
      ["What is the thermic effect of food (TEF)?", "The energy required to digest, absorb, and metabolize food."],
      ["What is the difference between direct and indirect calorimetry?", "Direct measures body heat output; indirect measures O2 consumption/CO2 production."],
      ["What is the hypothalamic set point for body temperature regulation?", "The preoptic/anterior hypothalamus, which compares actual to target temperature."],
      ["What causes fever?", "Pyrogens (e.g., from infection) reset the hypothalamic set point higher."],
      ["What are the two main mechanisms of heat loss from the skin?", "Radiation/convection and evaporation (sweating)."],
      ["What vitamins are fat-soluble?", "Vitamins A, D, E, and K."],
      ["What is the primary fuel source during prolonged starvation?", "Fatty acids and ketone bodies, sparing protein/glucose."]
    ],
    matchCards: [
      ["Glycolysis", "Glucose → pyruvate, net 2 ATP"],
      ["Krebs cycle", "Oxidizes acetyl-CoA"],
      ["Beta-oxidation", "Fatty acid breakdown, mitochondria"],
      ["Deamination", "Removes amino group"],
      ["Urea cycle", "Converts ammonia to urea (liver)"],
      ["BMR", "60-80% of energy needs"],
      ["TEF", "Energy to digest/absorb food"],
      ["Direct calorimetry", "Measures body heat output"],
      ["Indirect calorimetry", "Measures O2/CO2 exchange"],
      ["Preoptic hypothalamus", "Body temperature set point"],
      ["Fever", "Pyrogens raise the set point"],
      ["Fat-soluble vitamins", "A, D, E, K"]
    ]},
  { id: "physio-pulmonary", name: "Pulmonary Physiology", color: "accent3",
    icon: '<path d="M12 2v10M8 8a4 4 0 0 0-4 8c2 2 4 2 4 2M16 8a4 4 0 0 1 4 8c-2 2-4 2-4 2"/>',
    cards: [
      ["What is compliance of the lung?", "The change in lung volume per unit change in pressure — a measure of how easily the lung stretches."],
      ["What does surfactant do?", "Reduces alveolar surface tension, preventing collapse, produced by type II pneumocytes."],
      ["What is the respiratory membrane composed of?", "Alveolar epithelium, fused basement membranes, and capillary endothelium."],
      ["How is most CO2 transported in the blood?", "As bicarbonate (via carbonic anhydrase in RBCs)."],
      ["How is most O2 transported in the blood?", "Bound to hemoglobin."],
      ["What is the oxygen-hemoglobin dissociation curve?", "A sigmoidal curve relating PO2 to hemoglobin O2 saturation."],
      ["What shifts the O2-hemoglobin curve to the right (Bohr effect)?", "Increased CO2, H+, temperature, and 2,3-DPG — promoting O2 unloading to tissues."],
      ["What are the primary and accessory muscles of inspiration?", "Primary: diaphragm; accessory: external intercostals, scalenes, sternocleidomastoid."],
      ["What controls the basic rhythm of breathing?", "The medullary respiratory centers (dorsal and ventral respiratory groups)."],
      ["What is tidal volume?", "The volume of air moved in a normal breath (~500 mL)."],
      ["What is functional residual capacity (FRC)?", "The volume remaining in the lungs after a normal expiration."],
      ["How does hyperventilation affect blood pH?", "It decreases CO2, raising pH (respiratory alkalosis)."],
      ["What is the Haldane effect?", "Deoxygenated hemoglobin binds CO2 and H+ more readily than oxygenated hemoglobin."]
    ],
    matchCards: [
      ["Lung compliance", "ΔVolume / ΔPressure"],
      ["Surfactant", "Reduces surface tension, type II pneumocytes"],
      ["CO2 transport", "Mostly as bicarbonate"],
      ["O2 transport", "Mostly bound to hemoglobin"],
      ["Bohr effect", "CO2/H+/temp shift curve right"],
      ["Haldane effect", "Deoxy-Hb binds CO2/H+ better"],
      ["Diaphragm", "Primary muscle of inspiration"],
      ["Medullary respiratory centers", "Control breathing rhythm"],
      ["Tidal volume", "~500 mL per normal breath"],
      ["FRC", "Volume after normal expiration"],
      ["Hyperventilation", "↓CO2 → respiratory alkalosis"],
      ["Respiratory membrane", "Alveolar epithelium + capillary endothelium"]
    ]}

];

function findDeck(id) { return DEMO_DECKS.find(function (d) { return d.id === id; }); }
function deckIdFromURL() { return new URLSearchParams(location.search).get("deck"); }

// Real Class Tabs -> Exam Accordion structure, mirroring the main site's
// tab/exam-section pattern. deckIds fill in as real decks are authored per
// class/exam.
var DEMO_CLASSES = [
  { id: "anatomy", name: "Anatomy", exams: [
    { id: "exam1", name: "Exam 1", deckIds: [
      "anatomy-intro", "anatomy-histology", "anatomy-brain-ans",
      "anatomy-nervous-tissue-cbf", "anatomy-spinal-cord-sensory", "anatomy-peripheral-cranial-nerves"
    ] },
    { id: "exam2", name: "Exam 2", deckIds: [
      "anatomy-integumentary", "anatomy-eye-ear", "anatomy-heart-vessels",
      "anatomy-vascular-lymphatics", "anatomy-pulmonary"
    ] },
    { id: "exam3", name: "Exam 3", deckIds: ["anatomy-endocrine-glands", "anatomy-peritoneal"] },
    { id: "exam4", name: "Exam 4", deckIds: [
      "anatomy-appendicular-skeleton", "anatomy-axial-skeleton",
      "anatomy-appendicular-musculature", "anatomy-axial-musculature"
    ] }
  ]},
  { id: "physiology", name: "Physiology", exams: [
    { id: "exam1", name: "Exam 1", deckIds: [
      "physio-cellphys-membranes", "physio-membrane-ap-muscle",
      "physio-nervous-sensory", "physio-nervous-motor", "physio-cns-function"
    ] },
    { id: "exam2", name: "Exam 2", deckIds: [
      "physio-hearing-taste-smell", "physio-cardiac",
      "physio-circ-1", "physio-circ-2", "physio-vision"
    ] },
    { id: "exam3", name: "Exam 3", deckIds: [
      "physio-hemostasis", "physio-immunology", "physio-gi",
      "physio-metabolism", "physio-pulmonary"
    ] },
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
