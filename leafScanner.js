const { cropLibrary, pestGuide } = require("./cropKnowledge");

// ============================================================
// GENERIC FALLBACK RULES
// Used only when the crop is missing/unrecognized, i.e. we
// have no crop-specific disease list to work from.
// ============================================================
const diagnosisRules = [
  {
    issue: "Fungal leaf spot / blight",
    keywords: ["spot", "brown", "black", "yellow halo", "blight", "burn", "lesion"],
    severity: "Medium",
    treatment: [
      "Remove badly infected leaves and keep them away from the field.",
      "Avoid overhead irrigation and improve airflow.",
      "Apply mancozeb, chlorothalonil, or copper-based fungicide after local diagnosis."
    ],
    prevention: "Use clean seed, rotate crops, and avoid dense planting."
  },
  {
    issue: "Powdery mildew",
    keywords: ["white powder", "powder", "white dust", "mildew"],
    severity: "Medium",
    treatment: [
      "Remove heavily infected leaves.",
      "Spray wettable sulfur or potassium bicarbonate in early stage.",
      "Use hexaconazole/propiconazole only when disease spreads."
    ],
    prevention: "Keep plants airy and avoid excess nitrogen."
  },
  {
    issue: "Downy mildew",
    keywords: ["downy", "yellow patch", "gray mold", "underside", "water soaked"],
    severity: "High",
    treatment: [
      "Remove infected leaves and reduce leaf wetness.",
      "Use metalaxyl + mancozeb or cymoxanil mixture where locally recommended.",
      "Do not save seed from infected plants."
    ],
    prevention: "Use resistant varieties and water early morning."
  },
  {
    issue: "Virus / leaf curl",
    keywords: ["curl", "mosaic", "yellow vein", "stunted", "wrinkle", "virus"],
    severity: "High",
    treatment: [
      "Remove infected plants early to reduce spread.",
      "Control vectors such as whitefly, aphid, and thrips.",
      "There is no curative pesticide for virus-infected plants."
    ],
    prevention: "Use resistant varieties, clean seedlings, and yellow sticky traps."
  },
  {
    issue: "Nutrient deficiency",
    keywords: ["pale", "yellow", "chlorosis", "purple", "dry edge", "deficiency"],
    severity: "Low-Medium",
    treatment: [
      "Test soil before fertilizer correction.",
      "Apply balanced NPK with compost.",
      "Use micronutrient spray if deficiency is confirmed."
    ],
    prevention: "Maintain organic matter and avoid unbalanced fertilizer."
  },
  {
    issue: "Insect chewing damage",
    keywords: ["hole", "bite", "chewed", "larva", "caterpillar", "borer"],
    severity: "Medium",
    treatment: [
      "Hand-pick larvae where practical and destroy infested leaves/fruits.",
      "Use pheromone or light traps for monitoring.",
      "Apply Bt, spinosad, or emamectin benzoate only above threshold."
    ],
    prevention: "Scout weekly and rotate insecticide groups."
  },
  {
    issue: "Sucking pest damage",
    keywords: ["sticky", "honeydew", "tiny insect", "silver", "thrips", "aphid", "whitefly", "mite"],
    severity: "Medium",
    treatment: [
      "Use yellow/blue sticky traps based on pest type.",
      "Spray neem oil or insecticidal soap at early stage.",
      "Use selective pesticide such as abamectin, spinosad, or buprofezin after identification."
    ],
    prevention: "Keep weeds controlled and avoid unnecessary broad-spectrum pesticide."
  }
];

// ============================================================
// SPECIFIC DISEASE DEFINITIONS
// Each entry is a REAL, exact disease name (not a vague
// category), with its own keywords/severity/treatment/
// prevention. Many diseases occur on more than one crop, so
// they are defined once here and referenced by name in
// CROP_DISEASE_MAP below.
// ============================================================
const DISEASE_INFO = {
  "Bacterial leaf blight": {
    keywords: ["blight", "water soaked", "streak", "wilt", "yellow leaf curl", "dry up"],
    severity: "High",
    treatment: [
      "Drain the field and avoid excess standing water around the base.",
      "Remove and destroy severely infected leaves/plants.",
      "Apply copper-based bactericide or streptocycline where locally approved."
    ],
    prevention: "Use certified disease-free seed and avoid clipping seedling tips before transplanting."
  },
  "Rice blast": {
    keywords: ["diamond", "spindle", "neck rot", "gray center", "blast", "lesion"],
    severity: "High",
    treatment: [
      "Remove and destroy infected tillers/panicles.",
      "Avoid excess nitrogen; balance fertilizer application.",
      "Apply tricyclazole or isoprothiolane fungicide after confirmation."
    ],
    prevention: "Use a blast-resistant variety and avoid continuous water stress."
  },
  "Brown spot": {
    keywords: ["brown spot", "oval", "brown", "spot"],
    severity: "Medium",
    treatment: [
      "Improve soil fertility, especially potassium.",
      "Remove and burn infected straw/stubble after harvest.",
      "Apply mancozeb or propiconazole if the infection is severe."
    ],
    prevention: "Use quality seed and balanced fertilizer, particularly potash."
  },
  "Sheath blight": {
    keywords: ["sheath", "irregular lesion", "lower leaf", "blight"],
    severity: "Medium",
    treatment: [
      "Avoid dense planting and excess nitrogen.",
      "Drain the field periodically to lower humidity near the base.",
      "Apply hexaconazole or validamycin where necessary."
    ],
    prevention: "Maintain proper plant spacing and balanced fertilizer use."
  },
  "Tungro virus": {
    keywords: ["yellow orange", "orange leaf", "stunt", "yellow leaf curl", "virus"],
    severity: "High",
    treatment: [
      "Remove and destroy infected hills as early as possible.",
      "Control the leafhopper vector population.",
      "There is no cure once a plant is infected — focus on prevention and vector control."
    ],
    prevention: "Use a resistant variety and synchronize planting with neighboring fields."
  },
  "Bakanae disease": {
    keywords: ["tall", "spindly", "thin stem", "pale", "yellow"],
    severity: "Medium",
    treatment: [
      "Remove and destroy abnormally tall, thin seedlings.",
      "Use hot-water seed treatment before sowing.",
      "Apply a recommended seed-treatment fungicide."
    ],
    prevention: "Use certified, disease-free seed."
  },

  "Wheat blast": {
    keywords: ["bleached spikelet", "gray", "blast", "head", "eye shaped lesion"],
    severity: "High",
    treatment: [
      "Remove and destroy severely infected plants/heads.",
      "Avoid late sowing, which raises blast risk.",
      "Apply a triazole fungicide (e.g. tebuconazole) at early heading if confirmed."
    ],
    prevention: "Grow a blast-tolerant variety and avoid excess nitrogen near heading stage."
  },
  "Leaf rust": {
    keywords: ["rust", "orange pustule", "reddish brown", "powder rust"],
    severity: "Medium",
    treatment: [
      "Remove volunteer wheat plants nearby.",
      "Apply propiconazole or tebuconazole at first sign of infection.",
      "Monitor the field regularly during humid weather."
    ],
    prevention: "Grow a rust-resistant variety and avoid very early sowing."
  },
  "Loose smut": {
    keywords: ["black powder", "smut", "black head", "dust"],
    severity: "Medium",
    treatment: [
      "Remove and destroy infected earheads before spores are released.",
      "Use a systemic seed-treatment fungicide next season.",
      "Avoid using seed from an infected field."
    ],
    prevention: "Use certified seed treated with fungicide."
  },
  "Karnal bunt": {
    keywords: ["fishy smell", "black powder", "partial bunt", "grain discoloration"],
    severity: "Medium",
    treatment: [
      "Avoid using infected grain as seed.",
      "Practice crop rotation with a non-host crop.",
      "Apply propiconazole spray at flowering in high-risk areas."
    ],
    prevention: "Use a resistant variety and certified seed."
  },

  "Turcicum leaf blight": {
    keywords: ["cigar shaped", "long lesion", "gray green", "blight"],
    severity: "Medium",
    treatment: [
      "Remove and destroy crop debris after harvest.",
      "Rotate with a non-host crop.",
      "Apply mancozeb or propiconazole if severe."
    ],
    prevention: "Use a resistant hybrid and avoid continuous maize monocropping."
  },
  "Maydis leaf blight": {
    keywords: ["rectangular lesion", "tan", "blight"],
    severity: "Medium",
    treatment: [
      "Remove and destroy crop debris after harvest.",
      "Rotate with a non-host crop.",
      "Apply mancozeb or propiconazole if severe."
    ],
    prevention: "Practice crop rotation and residue management."
  },
  "Common rust": {
    keywords: ["rust", "reddish brown pustule", "powder"],
    severity: "Low-Medium",
    treatment: [
      "Monitor the field regularly during cool, humid weather.",
      "Apply fungicide only if severe and before tasseling.",
      "Avoid excess nitrogen."
    ],
    prevention: "Grow a rust-tolerant hybrid."
  },
  "Stalk rot": {
    keywords: ["lodging", "soft stalk", "rot", "wilt", "stalk"],
    severity: "High",
    treatment: [
      "Avoid water stress and nitrogen/potassium imbalance.",
      "Harvest promptly once infected to reduce lodging loss.",
      "Practice crop rotation."
    ],
    prevention: "Maintain balanced potassium fertilization and avoid drought stress."
  },

  "Stem rot": {
    keywords: ["stem", "rot", "black", "wilt"],
    severity: "Medium",
    treatment: [
      "Remove and destroy infected plants.",
      "Improve field drainage.",
      "Treat seed with a recommended fungicide before sowing."
    ],
    prevention: "Practice crop rotation and avoid waterlogging."
  },
  "Black band disease": {
    keywords: ["black band", "ring", "stem", "dark band"],
    severity: "Medium",
    treatment: [
      "Remove and destroy infected plants.",
      "Improve field drainage.",
      "Use disease-free seed next season."
    ],
    prevention: "Use disease-free seed and rotate crops."
  },
  "Root rot": {
    keywords: ["root rot", "wilt", "yellowing", "stunt"],
    severity: "High",
    treatment: [
      "Improve drainage and avoid waterlogging.",
      "Remove and destroy severely affected plants.",
      "Treat seed with fungicide before sowing."
    ],
    prevention: "Ensure a well-drained field and practice crop rotation."
  },

  "Late blight": {
    keywords: ["water soaked", "dark lesion", "white mold underside", "late blight", "rapid spread"],
    severity: "High",
    treatment: [
      "Remove and destroy infected foliage immediately.",
      "Improve field drainage and avoid overhead irrigation.",
      "Apply a mancozeb or metalaxyl-based fungicide promptly."
    ],
    prevention: "Use certified disease-free seed/seedlings and a resistant variety."
  },
  "Early blight": {
    keywords: ["target spot", "concentric ring", "brown", "lower leaf"],
    severity: "Medium",
    treatment: [
      "Remove and destroy lower infected leaves.",
      "Avoid overhead irrigation and improve airflow.",
      "Apply mancozeb or chlorothalonil if the infection spreads."
    ],
    prevention: "Maintain balanced fertilization and avoid plant stress."
  },
  "Bacterial wilt": {
    keywords: ["sudden wilt", "wilt without yellowing", "brown ooze", "vascular"],
    severity: "High",
    treatment: [
      "Remove and destroy wilted plants immediately.",
      "Avoid replanting the same crop in infected soil for several seasons.",
      "Practice strict field sanitation and tool disinfection."
    ],
    prevention: "Use disease-free seed/seedlings and avoid waterlogged soil."
  },
  "Common scab": {
    keywords: ["scab", "rough skin", "corky", "lesion tuber"],
    severity: "Low-Medium",
    treatment: [
      "Maintain slightly acidic soil pH.",
      "Ensure adequate soil moisture during tuber formation.",
      "Avoid excess lime application."
    ],
    prevention: "Rotate crops and avoid alkaline soil conditions."
  },
  "Black scurf": {
    keywords: ["black scurf", "dark sclerotia", "stem canker"],
    severity: "Medium",
    treatment: [
      "Use disease-free seed tubers.",
      "Avoid planting in cold, wet soil.",
      "Treat seed tubers with a recommended fungicide."
    ],
    prevention: "Practice crop rotation and use certified seed."
  },

  "Tomato leaf curl virus": {
    keywords: ["curl", "upward curl", "yellow", "stunt", "virus"],
    severity: "High",
    treatment: [
      "Remove and destroy infected plants early.",
      "Control the whitefly vector population.",
      "There is no curative pesticide for virus-infected plants."
    ],
    prevention: "Use resistant varieties and yellow sticky traps; avoid planting near infected fields."
  },
  "Fusarium wilt": {
    keywords: ["yellowing one side", "wilt", "vascular discoloration"],
    severity: "High",
    treatment: [
      "Remove and destroy wilted plants immediately.",
      "Avoid replanting the same crop family in infected soil.",
      "Improve soil drainage and avoid waterlogging."
    ],
    prevention: "Use resistant varieties and practice crop rotation."
  },
  "Septoria leaf spot": {
    keywords: ["small spot", "gray center", "dark border", "lower leaf"],
    severity: "Medium",
    treatment: [
      "Remove and destroy infected lower leaves.",
      "Avoid overhead irrigation.",
      "Apply chlorothalonil or mancozeb if severe."
    ],
    prevention: "Rotate crops and avoid working in wet foliage."
  },

  "Phomopsis blight": {
    keywords: ["stem canker", "fruit rot", "blight", "dark lesion"],
    severity: "Medium",
    treatment: [
      "Remove and destroy infected fruit and stems.",
      "Avoid overhead irrigation.",
      "Apply mancozeb or copper-based fungicide if severe."
    ],
    prevention: "Rotate crops and avoid dense planting."
  },
  "Little leaf disease": {
    keywords: ["small leaf", "bushy", "yellow", "stunt"],
    severity: "High",
    treatment: [
      "Remove and destroy infected plants to reduce spread.",
      "Control leafhopper vectors.",
      "There is no cure once a plant is infected."
    ],
    prevention: "Use resistant varieties and control vector insects early."
  },
  "Damping off": {
    keywords: ["seedling collapse", "rot at base", "wilt", "collapse"],
    severity: "Medium",
    treatment: [
      "Remove and destroy collapsed seedlings immediately.",
      "Improve drainage and avoid overwatering the nursery bed.",
      "Treat seed/soil with a recommended fungicide before sowing."
    ],
    prevention: "Use well-drained seedbeds and avoid overcrowding seedlings."
  },

  Anthracnose: {
    keywords: ["anthracnose", "sunken spot", "dark spot", "fruit rot"],
    severity: "Medium",
    treatment: [
      "Remove and destroy infected leaves/fruits.",
      "Avoid overhead irrigation and improve airflow.",
      "Apply mancozeb or carbendazim if the infection is severe."
    ],
    prevention: "Use disease-free seed and avoid excess moisture on foliage/fruit."
  },
  "Cercospora leaf spot": {
    keywords: ["frog eye", "gray center", "spot"],
    severity: "Medium",
    treatment: [
      "Remove and destroy infected leaves.",
      "Avoid overhead irrigation.",
      "Apply mancozeb or chlorothalonil if severe."
    ],
    prevention: "Rotate crops and avoid dense planting."
  },
  "Chili leaf curl virus": {
    keywords: ["curl", "upward curl", "yellow", "virus"],
    severity: "High",
    treatment: [
      "Remove and destroy infected plants early.",
      "Control whitefly/thrips vectors.",
      "There is no curative pesticide for virus-infected plants."
    ],
    prevention: "Use resistant varieties and yellow/blue sticky traps."
  },

  "Yellow vein mosaic virus": {
    keywords: ["yellow vein", "mosaic", "yellow leaf curl"],
    severity: "High",
    treatment: [
      "Remove and destroy infected plants early.",
      "Control the whitefly vector population.",
      "There is no curative pesticide for virus-infected plants."
    ],
    prevention: "Use resistant/tolerant varieties and yellow sticky traps."
  },

  "Mosaic virus": {
    keywords: ["mosaic", "mottle", "curl"],
    severity: "High",
    treatment: [
      "Remove and destroy infected plants early.",
      "Control aphid/whitefly vectors.",
      "There is no curative pesticide for virus-infected plants."
    ],
    prevention: "Use resistant varieties and clean, virus-free planting material."
  },
  "Fruit rot": {
    keywords: ["fruit rot", "soft rot", "fruit"],
    severity: "Medium",
    treatment: [
      "Remove and destroy infected fruit promptly.",
      "Avoid fruit contact with wet soil (use mulch/stakes).",
      "Apply mancozeb or carbendazim if severe."
    ],
    prevention: "Improve field drainage and avoid overhead irrigation."
  },

  "Black rot": {
    keywords: ["v shaped lesion", "black vein", "yellow"],
    severity: "High",
    treatment: [
      "Remove and destroy infected plants/debris.",
      "Avoid overhead irrigation.",
      "Use copper-based bactericide where locally approved."
    ],
    prevention: "Use certified disease-free seed and rotate crops."
  },
  "Alternaria leaf spot": {
    keywords: ["dark ring", "concentric spot", "brown"],
    severity: "Medium",
    treatment: [
      "Remove and destroy infected leaves.",
      "Avoid overhead irrigation.",
      "Apply mancozeb or chlorothalonil if severe."
    ],
    prevention: "Rotate crops and maintain balanced fertilization."
  },
  Clubroot: {
    keywords: ["stunt", "wilt", "swollen root"],
    severity: "High",
    treatment: [
      "Remove and destroy infected plants and roots.",
      "Improve soil drainage and raise soil pH with lime.",
      "Avoid replanting brassicas in infected soil for several years."
    ],
    prevention: "Practice long crop rotation and maintain neutral-to-alkaline soil pH."
  },
  "Soft rot": {
    keywords: ["soft rot", "mushy", "foul smell"],
    severity: "High",
    treatment: [
      "Remove and destroy infected plants immediately.",
      "Improve field drainage and avoid injury during handling.",
      "Practice strict field sanitation."
    ],
    prevention: "Avoid waterlogging and handle produce carefully to prevent wounds."
  },

  "Purple blotch": {
    keywords: ["purple", "blotch", "spot", "lesion"],
    severity: "Medium",
    treatment: [
      "Remove and destroy infected leaves.",
      "Avoid overhead irrigation.",
      "Apply mancozeb or chlorothalonil if severe."
    ],
    prevention: "Rotate crops and avoid dense planting."
  },
  "Basal rot": {
    keywords: ["basal", "rot", "bulb"],
    severity: "Medium",
    treatment: [
      "Remove and destroy infected bulbs.",
      "Improve field drainage.",
      "Use disease-free seed bulbs/sets."
    ],
    prevention: "Practice crop rotation and avoid waterlogged soil."
  },
  "Stemphylium blight": {
    keywords: ["tip dieback", "blight"],
    severity: "Medium",
    treatment: [
      "Remove and destroy infected leaf tips.",
      "Avoid overhead irrigation.",
      "Apply a recommended fungicide if severe."
    ],
    prevention: "Rotate crops and maintain balanced fertilization."
  },
  "White rot": {
    keywords: ["white rot", "white mold", "bulb rot"],
    severity: "High",
    treatment: [
      "Remove and destroy infected bulbs and surrounding soil where possible.",
      "Avoid planting in infected fields for several years.",
      "Use disease-free planting material."
    ],
    prevention: "Practice long crop rotation and use certified seed."
  },
  Rust: {
    keywords: ["rust", "orange pustule", "powder"],
    severity: "Medium",
    treatment: [
      "Remove and destroy heavily infected leaves.",
      "Apply propiconazole or tebuconazole at first sign.",
      "Monitor regularly during humid weather."
    ],
    prevention: "Grow rust-tolerant varieties and avoid dense planting."
  },
  "Leaf spot": {
    keywords: ["spot", "brown", "circular"],
    severity: "Low-Medium",
    treatment: [
      "Remove and destroy infected leaves.",
      "Avoid overhead irrigation.",
      "Apply mancozeb if the infection spreads."
    ],
    prevention: "Rotate crops and avoid overcrowding plants."
  },
  "White rust": {
    keywords: ["white rust", "white pustule underside"],
    severity: "Medium",
    treatment: [
      "Remove and destroy infected leaves.",
      "Avoid overhead irrigation.",
      "Apply a recommended fungicide if severe."
    ],
    prevention: "Rotate crops and avoid excess leaf wetness."
  },
  "Cavity spot": {
    keywords: ["sunken lesion root", "cavity", "root"],
    severity: "Low-Medium",
    treatment: [
      "Improve soil drainage.",
      "Avoid excess irrigation close to harvest.",
      "Rotate crops to reduce soil inoculum."
    ],
    prevention: "Ensure well-drained, well-aerated soil."
  },

  "Bean common mosaic virus": {
    keywords: ["mosaic", "mottle", "crinkle"],
    severity: "High",
    treatment: [
      "Remove and destroy infected plants early.",
      "Control aphid vectors.",
      "There is no curative pesticide for virus-infected plants."
    ],
    prevention: "Use virus-free certified seed and resistant varieties."
  },
  "Ascochyta blight": {
    keywords: ["blight", "lesion pod", "spot"],
    severity: "Medium",
    treatment: [
      "Remove and destroy infected plant debris.",
      "Avoid overhead irrigation.",
      "Apply a recommended fungicide if severe."
    ],
    prevention: "Use disease-free seed and rotate crops."
  },

  "Panama disease (Fusarium wilt)": {
    keywords: ["yellowing lower leaf", "wilt", "split pseudostem"],
    severity: "High",
    treatment: [
      "Remove and destroy severely infected plants/mats.",
      "Avoid moving soil or planting material from infected plots.",
      "There is no chemical cure once soil is infected."
    ],
    prevention: "Use resistant/tolerant varieties and clean planting material."
  },
  "Sigatoka leaf spot": {
    keywords: ["streak", "yellow black patch", "spot"],
    severity: "Medium",
    treatment: [
      "Remove and destroy heavily infected leaves.",
      "Improve field drainage and spacing for airflow.",
      "Apply a recommended fungicide if severe."
    ],
    prevention: "Maintain good field sanitation and adequate plant spacing."
  },
  "Banana bunchy top virus": {
    keywords: ["bunchy", "stunt", "dark green streak"],
    severity: "High",
    treatment: [
      "Remove and destroy infected plants (including rhizome) immediately.",
      "Control the banana aphid vector.",
      "There is no cure once a plant is infected."
    ],
    prevention: "Use virus-free planting material and remove infected mats promptly."
  },

  "Bacterial black spot": {
    keywords: ["angular black spot", "leaf"],
    severity: "Medium",
    treatment: [
      "Remove and destroy infected leaves/twigs.",
      "Avoid overhead irrigation.",
      "Apply copper-based bactericide where locally approved."
    ],
    prevention: "Prune for airflow and avoid working on wet foliage."
  },
  "Sooty mould": {
    keywords: ["black coating", "sooty"],
    severity: "Low-Medium",
    treatment: [
      "Control the sap-sucking insects (aphid/whitefly/mealybug) causing honeydew.",
      "Wash affected leaves with mild soap solution.",
      "Improve airflow by pruning dense growth."
    ],
    prevention: "Manage sap-sucking pests early to prevent honeydew buildup."
  },
  "Mango malformation": {
    keywords: ["deformed panicle", "bunchy"],
    severity: "Medium",
    treatment: [
      "Prune and destroy malformed panicles/shoots before flowering.",
      "Avoid excess nitrogen fertilization.",
      "Use disease-free grafting material for new plantings."
    ],
    prevention: "Use certified disease-free planting material and prune affected parts early."
  },

  "Papaya ring spot virus": {
    keywords: ["ring spot", "mosaic", "distort leaf"],
    severity: "High",
    treatment: [
      "Remove and destroy infected plants early.",
      "Control aphid vectors.",
      "There is no curative pesticide for virus-infected plants."
    ],
    prevention: "Use tolerant varieties and isolate new plantings from infected fields."
  },
  "Foot rot": {
    keywords: ["foot rot", "collar rot", "base"],
    severity: "High",
    treatment: [
      "Remove and destroy severely infected plants.",
      "Improve drainage around the base of the plant.",
      "Apply a recommended fungicide drench at the base if caught early."
    ],
    prevention: "Avoid waterlogging at the base and use disease-free planting material."
  },

  "Gummy stem blight": {
    keywords: ["gummy", "stem canker", "black stem"],
    severity: "High",
    treatment: [
      "Remove and destroy infected vines/fruit.",
      "Avoid overhead irrigation and working in wet fields.",
      "Apply a recommended fungicide if severe."
    ],
    prevention: "Rotate crops and use disease-free seed."
  }
};

// ============================================================
// CROP -> DISEASE NAME LIST
// Maps each crop to the exact disease names it is prone to.
// ============================================================
const CROP_DISEASE_MAP = {
  rice: ["Bacterial leaf blight", "Rice blast", "Brown spot", "Sheath blight", "Tungro virus", "Bakanae disease"],
  wheat: ["Wheat blast", "Leaf rust", "Loose smut", "Karnal bunt", "Powdery mildew"],
  maize: ["Turcicum leaf blight", "Maydis leaf blight", "Common rust", "Downy mildew", "Stalk rot"],
  jute: ["Stem rot", "Black band disease", "Anthracnose", "Root rot"],
  potato: ["Late blight", "Early blight", "Bacterial wilt", "Common scab", "Black scurf"],
  tomato: ["Early blight", "Late blight", "Bacterial wilt", "Tomato leaf curl virus", "Fusarium wilt", "Septoria leaf spot"],
  eggplant: ["Phomopsis blight", "Bacterial wilt", "Little leaf disease", "Damping off"],
  chili: ["Anthracnose", "Powdery mildew", "Cercospora leaf spot", "Chili leaf curl virus", "Damping off"],
  okra: ["Yellow vein mosaic virus", "Powdery mildew", "Cercospora leaf spot", "Damping off"],
  cucumber: ["Downy mildew", "Powdery mildew", "Anthracnose", "Mosaic virus"],
  "bottle gourd": ["Powdery mildew", "Downy mildew", "Mosaic virus", "Fruit rot"],
  pumpkin: ["Powdery mildew", "Downy mildew", "Mosaic virus", "Fruit rot"],
  cauliflower: ["Black rot", "Downy mildew", "Alternaria leaf spot", "Clubroot", "Damping off"],
  cabbage: ["Black rot", "Downy mildew", "Alternaria leaf spot", "Clubroot", "Soft rot"],
  onion: ["Purple blotch", "Downy mildew", "Basal rot", "Stemphylium blight"],
  garlic: ["Purple blotch", "White rot", "Rust"],
  spinach: ["Downy mildew", "Leaf spot", "Damping off"],
  "red amaranth": ["Leaf spot", "Damping off", "White rust"],
  carrot: ["Alternaria leaf spot", "Cercospora leaf spot", "Root rot", "Cavity spot"],
  radish: ["Alternaria leaf spot", "Downy mildew", "Clubroot", "Black rot"],
  bean: ["Anthracnose", "Bacterial leaf blight", "Rust", "Powdery mildew", "Bean common mosaic virus"],
  pea: ["Powdery mildew", "Downy mildew", "Rust", "Ascochyta blight"],
  banana: ["Panama disease (Fusarium wilt)", "Sigatoka leaf spot", "Banana bunchy top virus", "Anthracnose"],
  mango: ["Anthracnose", "Powdery mildew", "Bacterial black spot", "Sooty mould", "Mango malformation"],
  papaya: ["Papaya ring spot virus", "Powdery mildew", "Anthracnose", "Foot rot"],
  watermelon: ["Fusarium wilt", "Anthracnose", "Downy mildew", "Gummy stem blight"]
};

// Build { cropKey: [{ issue, keywords, severity, treatment, prevention }, ...] }
const CROP_DISEASE_RULES = Object.entries(CROP_DISEASE_MAP).reduce(
  (acc, [crop, diseaseNames]) => {
    acc[crop] = diseaseNames
      .filter((name) => DISEASE_INFO[name])
      .map((name) => ({ issue: name, ...DISEASE_INFO[name] }));
    return acc;
  },
  {}
);

// ============================================================
// ANALYZE
// ============================================================
function scoreRules(rules, haystack) {
  return rules
    .map((rule) => {
      const hits = rule.keywords.filter((keyword) => haystack.includes(keyword));
      return { rule, hits };
    })
    .filter((item) => item.hits.length)
    .sort((a, b) => b.hits.length - a.hits.length);
}

function analyzeLeaf(input) {
  const cropName = String(input.crop || "").trim();
  const cropKey = cropName.toLowerCase();
  const symptoms = Array.isArray(input.symptoms) ? input.symptoms.join(" ") : String(input.symptoms || "");
  const imageName = String(input.imageName || "");
  const notes = String(input.notes || "");
  const haystack = `${cropName} ${symptoms} ${imageName} ${notes}`.toLowerCase();

  const crop = cropLibrary.find((item) => item.name.toLowerCase() === cropKey);

  // Real, crop-specific disease rules (exact disease names).
  const specificRules = CROP_DISEASE_RULES[cropKey] || [];
  const specificMatches = scoreRules(specificRules, haystack);

  // Old generic categories, used only as a fallback.
  const genericMatches = scoreRules(diagnosisRules, haystack);

  let selected;
  let hitCount = 0;

  if (specificMatches.length) {
    // We know the crop AND matched a specific disease's keywords —
    // this is the exact disease name.
    selected = specificMatches[0].rule;
    hitCount = specificMatches[0].hits.length;
  } else if (specificRules.length) {
    // We know the crop, but no keyword matched strongly. Still
    // prefer a real disease name for this crop over a vague
    // generic label.
    selected = specificRules[0];
    hitCount = 0;
  } else if (genericMatches.length) {
    // Unknown/unlisted crop — fall back to the old generic
    // category matching.
    selected = genericMatches[0].rule;
    hitCount = genericMatches[0].hits.length;
  } else {
    selected = diagnosisRules[0];
    hitCount = 0;
  }

  const pestHints = pestGuide.filter((item) => {
    return item.crops.some((name) => name.toLowerCase() === cropKey) ||
      item.symptoms.toLowerCase().split(/[ ,.;]+/).some((word) => word && haystack.includes(word));
  }).slice(0, 3);

  const confidence = hitCount
    ? Math.min(96, 58 + hitCount * 13)
    : (specificRules.length ? 60 : 52);

  return {
    crop: cropName || "Unknown crop",
    issue: selected.issue,
    confidence,
    severity: selected.severity,
    treatment: selected.treatment,
    prevention: selected.prevention,
    cropRisks: crop ? {
      pests: crop.pests,
      diseases: crop.diseases,
      pesticide: crop.pesticide
    } : null,
    pestHints,
    disclaimer: "Image scanner is a field-assistant prototype. Confirm chemical use with a local agriculture officer and always follow product label dose."
  };
}

module.exports = {
  analyzeLeaf,
  // Exported so visionDiagnosis.js (and anything else) can reuse the
  // same verified disease database instead of duplicating it.
  DISEASE_INFO,
  CROP_DISEASE_MAP,
  diagnosisRules
};