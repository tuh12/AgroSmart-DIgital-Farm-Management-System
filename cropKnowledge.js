const cropLibrary = [
  {
    name: "Rice",
    type: "Cereal",
    season: "Aman, Aus, Boro",
    soil: "Clay loam with good water holding capacity",
    water: "High",
    duration: "110-155 days",
    pests: ["Stem borer", "Brown planthopper", "Leaf folder"],
    diseases: ["Blast", "Bacterial leaf blight", "Sheath blight"],
    pesticide: "Use chlorantraniliprole for stem borer, pymetrozine for planthopper, and tricyclazole for blast after local expert confirmation.",
    care: "Use clean seed, balanced NPK, field sanitation, alternate wetting and drying, and resistant varieties."
  },
  {
    name: "Wheat",
    type: "Cereal",
    season: "Rabi",
    soil: "Well-drained loam",
    water: "Medium",
    duration: "100-120 days",
    pests: ["Aphid", "Armyworm", "Termite"],
    diseases: ["Leaf rust", "Powdery mildew", "Loose smut"],
    pesticide: "Use imidacloprid for aphid and tebuconazole/propiconazole for rust when threshold is crossed.",
    care: "Avoid late sowing, keep field weed-free, and irrigate at crown root and grain filling stages."
  },
  {
    name: "Maize",
    type: "Cereal",
    season: "Rabi, Kharif",
    soil: "Fertile sandy loam",
    water: "Medium",
    duration: "90-120 days",
    pests: ["Fall armyworm", "Stem borer", "Aphid"],
    diseases: ["Leaf blight", "Downy mildew", "Stalk rot"],
    pesticide: "Use emamectin benzoate or spinetoram for fall armyworm, applied into the whorl under guidance.",
    care: "Scout weekly, keep balanced nitrogen, and avoid waterlogging."
  },
  {
    name: "Jute",
    type: "Fiber",
    season: "Kharif",
    soil: "Silty loam to clay loam",
    water: "High",
    duration: "100-130 days",
    pests: ["Jute hairy caterpillar", "Semilooper", "Mite"],
    diseases: ["Stem rot", "Anthracnose", "Root rot"],
    pesticide: "Use neem extract first; use lambda-cyhalothrin for caterpillar only when infestation is high.",
    care: "Maintain drainage, avoid dense sowing, and rotate with pulses or rice."
  },
  {
    name: "Potato",
    type: "Vegetable",
    season: "Rabi",
    soil: "Loose sandy loam",
    water: "Medium",
    duration: "80-110 days",
    pests: ["Cutworm", "Aphid", "Potato tuber moth"],
    diseases: ["Late blight", "Early blight", "Bacterial wilt"],
    pesticide: "Use mancozeb/chlorothalonil preventively for blight; metalaxyl mix only when late blight risk is high.",
    care: "Use certified seed tubers, ridge properly, and avoid overhead irrigation in humid weather."
  },
  {
    name: "Tomato",
    type: "Vegetable",
    season: "Rabi, Summer protected",
    soil: "Well-drained sandy loam",
    water: "Medium",
    duration: "90-120 days",
    pests: ["Fruit borer", "Whitefly", "Leaf miner"],
    diseases: ["Early blight", "Late blight", "Leaf curl virus", "Wilt"],
    pesticide: "Use pheromone traps for fruit borer, yellow traps for whitefly, and copper/mancozeb for fungal leaf spots.",
    care: "Stake plants, prune lower leaves, mulch, and avoid wet foliage at night."
  },
  {
    name: "Eggplant",
    type: "Vegetable",
    season: "Year-round",
    soil: "Fertile loam",
    water: "Medium",
    duration: "120-160 days",
    pests: ["Fruit and shoot borer", "Jassid", "Whitefly"],
    diseases: ["Phomopsis blight", "Bacterial wilt", "Little leaf"],
    pesticide: "Use pheromone traps and remove infested shoots; apply emamectin benzoate only if borer persists.",
    care: "Remove damaged fruits, keep field clean, and rotate away from solanaceous crops."
  },
  {
    name: "Chili",
    type: "Vegetable",
    season: "Rabi, Kharif",
    soil: "Sandy loam",
    water: "Medium",
    duration: "120-150 days",
    pests: ["Thrips", "Mite", "Aphid"],
    diseases: ["Leaf curl", "Anthracnose", "Dieback"],
    pesticide: "Use abamectin for mite/thrips and copper oxychloride or mancozeb for anthracnose prevention.",
    care: "Use virus-free seedlings, rogue infected plants, and avoid excess nitrogen."
  },
  {
    name: "Okra",
    type: "Vegetable",
    season: "Summer, Kharif",
    soil: "Sandy loam to loam",
    water: "Medium",
    duration: "50-65 days",
    pests: ["Fruit borer", "Jassid", "Whitefly"],
    diseases: ["Yellow vein mosaic", "Powdery mildew", "Root rot"],
    pesticide: "Use yellow traps and neem oil for sucking pests; sulfur works for powdery mildew when needed.",
    care: "Plant resistant varieties and remove virus-infected plants early."
  },
  {
    name: "Cucumber",
    type: "Vegetable",
    season: "Summer, Kharif",
    soil: "Well-drained sandy loam",
    water: "Medium",
    duration: "45-60 days",
    pests: ["Fruit fly", "Red pumpkin beetle", "Aphid"],
    diseases: ["Downy mildew", "Powdery mildew", "Mosaic virus"],
    pesticide: "Use cue-lure traps for fruit fly and sulfur or hexaconazole for powdery mildew after diagnosis.",
    care: "Use trellis, keep leaves dry, and remove infected vines."
  },
  {
    name: "Bottle Gourd",
    type: "Vegetable",
    season: "Summer, Winter",
    soil: "Fertile loam",
    water: "Medium",
    duration: "80-100 days",
    pests: ["Fruit fly", "Red pumpkin beetle", "Aphid"],
    diseases: ["Powdery mildew", "Downy mildew", "Mosaic virus"],
    pesticide: "Use pheromone/cue-lure traps, neem oil, and sulfur for powdery mildew if needed.",
    care: "Support vines, pollinate if fruit set is poor, and remove damaged fruits."
  },
  {
    name: "Pumpkin",
    type: "Vegetable",
    season: "Kharif, Rabi",
    soil: "Sandy loam rich in organic matter",
    water: "Medium",
    duration: "90-120 days",
    pests: ["Fruit fly", "Red pumpkin beetle", "Epilachna beetle"],
    diseases: ["Powdery mildew", "Downy mildew", "Mosaic"],
    pesticide: "Use bait traps and neem oil first; apply recommended insecticide only after threshold crossing.",
    care: "Keep vines off standing water and apply compost before flowering."
  },
  {
    name: "Cauliflower",
    type: "Vegetable",
    season: "Rabi",
    soil: "Fertile loam",
    water: "Medium",
    duration: "75-100 days",
    pests: ["Diamondback moth", "Cabbage caterpillar", "Aphid"],
    diseases: ["Black rot", "Clubroot", "Downy mildew"],
    pesticide: "Use Bt, spinosad, or emamectin for caterpillars; copper-based spray helps black rot management.",
    care: "Use crop rotation, avoid acidic soil for clubroot, and remove infected leaves."
  },
  {
    name: "Cabbage",
    type: "Vegetable",
    season: "Rabi",
    soil: "Loam with good organic matter",
    water: "Medium",
    duration: "90-120 days",
    pests: ["Diamondback moth", "Cutworm", "Aphid"],
    diseases: ["Black rot", "Alternaria leaf spot", "Clubroot"],
    pesticide: "Use Bt/spinosad for DBM and imidacloprid only for severe aphid pressure.",
    care: "Use clean seedlings, rotate crops, and avoid overhead irrigation."
  },
  {
    name: "Onion",
    type: "Vegetable",
    season: "Rabi",
    soil: "Loose sandy loam",
    water: "Low-Medium",
    duration: "100-130 days",
    pests: ["Thrips", "Cutworm", "Mite"],
    diseases: ["Purple blotch", "Stemphylium blight", "Downy mildew"],
    pesticide: "Use blue sticky traps and spinosad for thrips; mancozeb/propiconazole for purple blotch.",
    care: "Avoid waterlogging, keep rows airy, and stop irrigation before harvest."
  },
  {
    name: "Garlic",
    type: "Vegetable",
    season: "Rabi",
    soil: "Well-drained loam",
    water: "Low-Medium",
    duration: "120-150 days",
    pests: ["Thrips", "Mite", "Nematode"],
    diseases: ["White rot", "Purple blotch", "Basal rot"],
    pesticide: "Use clean cloves; apply fungicide seed treatment where white rot history exists.",
    care: "Rotate 3 years away from onion/garlic family and avoid wet soil."
  },
  {
    name: "Spinach",
    type: "Leafy vegetable",
    season: "Winter, Summer varieties",
    soil: "Fertile loam",
    water: "Medium",
    duration: "30-45 days",
    pests: ["Leaf miner", "Aphid", "Cutworm"],
    diseases: ["Downy mildew", "Leaf spot", "Damping off"],
    pesticide: "Use neem oil and yellow traps; avoid harsh pesticide close to harvest.",
    care: "Harvest young leaves, keep field clean, and avoid dense sowing."
  },
  {
    name: "Red Amaranth",
    type: "Leafy vegetable",
    season: "Year-round",
    soil: "Sandy loam",
    water: "Medium",
    duration: "25-35 days",
    pests: ["Leaf caterpillar", "Aphid", "Flea beetle"],
    diseases: ["Leaf spot", "Damping off", "Root rot"],
    pesticide: "Use neem extract and short pre-harvest interval products only if needed.",
    care: "Use compost, light irrigation, and harvest before plants become fibrous."
  },
  {
    name: "Carrot",
    type: "Root vegetable",
    season: "Rabi",
    soil: "Deep loose sandy loam",
    water: "Medium",
    duration: "90-110 days",
    pests: ["Aphid", "Cutworm", "Nematode"],
    diseases: ["Alternaria leaf blight", "Soft rot", "Powdery mildew"],
    pesticide: "Use seed treatment and neem-based control first; use fungicide for confirmed blight.",
    care: "Prepare fine seedbed, thin seedlings, and avoid fresh manure."
  },
  {
    name: "Radish",
    type: "Root vegetable",
    season: "Rabi",
    soil: "Loose sandy loam",
    water: "Medium",
    duration: "35-60 days",
    pests: ["Aphid", "Flea beetle", "Cutworm"],
    diseases: ["White rust", "Downy mildew", "Root rot"],
    pesticide: "Use neem oil for aphid/flea beetle and copper/mancozeb for fungal spots if confirmed.",
    care: "Keep consistent moisture to avoid cracked roots."
  },
  {
    name: "Bean",
    type: "Pulse vegetable",
    season: "Rabi, Kharif varieties",
    soil: "Well-drained loam",
    water: "Medium",
    duration: "60-90 days",
    pests: ["Pod borer", "Aphid", "Bean fly"],
    diseases: ["Rust", "Anthracnose", "Mosaic virus"],
    pesticide: "Use pheromone traps for borer and propiconazole for rust after diagnosis.",
    care: "Use trellis for climbing types and rotate with cereals."
  },
  {
    name: "Pea",
    type: "Pulse vegetable",
    season: "Rabi",
    soil: "Cool well-drained loam",
    water: "Low-Medium",
    duration: "70-100 days",
    pests: ["Aphid", "Pod borer", "Leaf miner"],
    diseases: ["Powdery mildew", "Rust", "Wilt"],
    pesticide: "Use sulfur for powdery mildew and neem oil for aphid at early stage.",
    care: "Avoid heat stress and use support for vine growth."
  },
  {
    name: "Banana",
    type: "Fruit",
    season: "Year-round",
    soil: "Deep fertile loam",
    water: "High",
    duration: "10-14 months",
    pests: ["Weevil", "Nematode", "Aphid"],
    diseases: ["Sigatoka leaf spot", "Panama wilt", "Bunchy top"],
    pesticide: "Use clean suckers, pheromone traps for weevil, and mancozeb/propiconazole for Sigatoka under guidance.",
    care: "Desucker regularly, mulch, support bunches, and maintain drainage."
  },
  {
    name: "Mango",
    type: "Fruit",
    season: "Perennial",
    soil: "Deep well-drained loam",
    water: "Medium",
    duration: "Perennial",
    pests: ["Mango hopper", "Fruit fly", "Mealybug"],
    diseases: ["Anthracnose", "Powdery mildew", "Dieback"],
    pesticide: "Use bait traps for fruit fly and sulfur/hexaconazole for powdery mildew when needed.",
    care: "Prune after harvest, keep orchard clean, and avoid pesticide during pollinator activity."
  },
  {
    name: "Papaya",
    type: "Fruit",
    season: "Year-round",
    soil: "Well-drained sandy loam",
    water: "Medium",
    duration: "8-10 months to fruiting",
    pests: ["Mealybug", "Aphid", "Fruit fly"],
    diseases: ["Papaya ringspot virus", "Anthracnose", "Root rot"],
    pesticide: "Use neem oil/soap for mealybug and copper/mancozeb for anthracnose after diagnosis.",
    care: "Avoid waterlogging and rogue virus-infected plants early."
  },
  {
    name: "Watermelon",
    type: "Fruit vegetable",
    season: "Summer",
    soil: "Sandy loam",
    water: "Medium",
    duration: "75-95 days",
    pests: ["Fruit fly", "Aphid", "Red pumpkin beetle"],
    diseases: ["Powdery mildew", "Downy mildew", "Fusarium wilt"],
    pesticide: "Use bait traps and neem oil; use sulfur or suitable fungicide for confirmed mildew.",
    care: "Use mulch, avoid wet leaves, and keep fruits off direct wet soil."
  }
];

const pestGuide = [
  {
    pest: "Aphid",
    crops: ["Wheat", "Chili", "Okra", "Bean", "Pea", "Spinach"],
    symptoms: "Tiny soft insects under leaves, curled leaves, sticky honeydew, sooty mold.",
    control: "Use yellow sticky traps, conserve ladybird beetles, spray neem oil or insecticidal soap first.",
    pesticide: "Imidacloprid or acetamiprid may be used only at threshold and with label dose."
  },
  {
    pest: "Whitefly",
    crops: ["Tomato", "Eggplant", "Okra", "Chili"],
    symptoms: "White insects fly when leaves are disturbed; leaf curl virus may appear.",
    control: "Use yellow traps, remove infected plants, keep weeds down.",
    pesticide: "Use buprofezin, pyriproxyfen, or spiromesifen after local recommendation."
  },
  {
    pest: "Thrips",
    crops: ["Onion", "Garlic", "Chili"],
    symptoms: "Silver streaks, leaf curling, drying tips, tiny moving insects.",
    control: "Use blue traps, avoid drought stress, remove weed hosts.",
    pesticide: "Spinosad or abamectin can be used with rotation to prevent resistance."
  },
  {
    pest: "Fruit Borer",
    crops: ["Tomato", "Eggplant", "Okra", "Chili"],
    symptoms: "Holes in fruit, larva inside, flower/fruit drop.",
    control: "Use pheromone traps, remove damaged fruit, encourage natural enemies.",
    pesticide: "Emamectin benzoate, spinosad, or Bt based product when infestation crosses threshold."
  },
  {
    pest: "Stem Borer",
    crops: ["Rice", "Maize"],
    symptoms: "Dead heart at vegetative stage and white ear at grain stage.",
    control: "Use light traps, remove stubbles, balanced nitrogen.",
    pesticide: "Chlorantraniliprole or cartap hydrochloride under local extension guidance."
  },
  {
    pest: "Diamondback Moth",
    crops: ["Cabbage", "Cauliflower"],
    symptoms: "Window-like feeding patches and holes on leaves.",
    control: "Use netting, rotate crops, remove crop residue.",
    pesticide: "Bt, spinosad, or emamectin benzoate with strict rotation."
  },
  {
    pest: "Fruit Fly",
    crops: ["Cucumber", "Bottle Gourd", "Pumpkin", "Mango", "Papaya", "Watermelon"],
    symptoms: "Puncture marks, rotting fruit, maggots inside.",
    control: "Use cue-lure traps, bag fruits, collect and bury infested fruit.",
    pesticide: "Protein bait spray or recommended bait insecticide, not blanket spraying."
  },
  {
    pest: "Leaf Miner",
    crops: ["Tomato", "Spinach", "Pea"],
    symptoms: "White winding mines inside leaves.",
    control: "Remove mined leaves, use sticky traps, avoid excess nitrogen.",
    pesticide: "Abamectin or spinosad where infestation is severe."
  },
  {
    pest: "Mite",
    crops: ["Chili", "Jute", "Garlic"],
    symptoms: "Leaf bronzing, curling, fine webbing, stunted growth.",
    control: "Spray water to reduce dust, remove severely affected parts.",
    pesticide: "Abamectin, propargite, or sulfur based miticide as locally recommended."
  }
];

// ============================================================
// FERTILIZER GUIDE
// Approximate per-acre Urea / TSP / MoP doses, based on common
// Bangladesh agronomy (BARC-style) fertilizer recommendation
// ranges. These are GENERAL guidance figures only — actual doses
// should be confirmed with a soil test / local agriculture
// officer, since real requirement depends on existing soil
// nutrient status.
// ============================================================
const fertilizerGuide = {
  rice: { urea: 110, tsp: 50, mop: 45, note: "Split urea into 2-3 doses; apply MoP mostly at final land preparation." },
  wheat: { urea: 100, tsp: 60, mop: 40, note: "Apply full TSP/MoP at sowing; split urea at sowing and first irrigation." },
  maize: { urea: 140, tsp: 70, mop: 60, note: "Split urea into 3 doses; keep balanced potassium for strong stalks." },
  jute: { urea: 60, tsp: 30, mop: 25, note: "Apply half urea at 3 weeks, rest after first weeding." },
  potato: { urea: 120, tsp: 100, mop: 100, note: "Apply full TSP/MoP at planting; split urea at planting and earthing-up." },
  tomato: { urea: 100, tsp: 80, mop: 80, note: "Apply basal dose at transplanting, then split urea every 3-4 weeks." },
  eggplant: { urea: 90, tsp: 70, mop: 70, note: "Apply basal TSP/MoP; top-dress urea after each harvest round." },
  chili: { urea: 80, tsp: 60, mop: 60, note: "Avoid excess nitrogen; split urea into 3 light doses." },
  okra: { urea: 70, tsp: 50, mop: 50, note: "Apply basal dose, then light urea top-dress after first flowering." },
  cucumber: { urea: 60, tsp: 45, mop: 45, note: "Apply basal dose at bed preparation; split urea in 2 doses." },
  "bottle gourd": { urea: 60, tsp: 45, mop: 45, note: "Apply basal dose; top-dress after vines start spreading." },
  pumpkin: { urea: 60, tsp: 45, mop: 45, note: "Apply basal dose; top-dress after vines start spreading." },
  cauliflower: { urea: 100, tsp: 70, mop: 70, note: "Apply basal TSP/MoP; split urea at 2 and 4 weeks after transplanting." },
  cabbage: { urea: 100, tsp: 70, mop: 70, note: "Apply basal TSP/MoP; split urea at 2 and 4 weeks after transplanting." },
  onion: { urea: 90, tsp: 60, mop: 60, note: "Apply basal dose; avoid urea close to bulb maturity." },
  garlic: { urea: 80, tsp: 55, mop: 55, note: "Apply basal dose; stop nitrogen well before harvest." },
  spinach: { urea: 40, tsp: 25, mop: 20, note: "Light, frequent doses since this is a short-duration leafy crop." },
  "red amaranth": { urea: 35, tsp: 20, mop: 20, note: "Light, frequent doses since this is a short-duration leafy crop." },
  carrot: { urea: 60, tsp: 55, mop: 55, note: "Avoid excess nitrogen — it encourages leaf growth over root growth." },
  radish: { urea: 50, tsp: 45, mop: 45, note: "Avoid excess nitrogen — it encourages leaf growth over root growth." },
  bean: { urea: 40, tsp: 60, mop: 40, note: "Legume — needs less nitrogen; keep phosphorus adequate for nodulation." },
  pea: { urea: 35, tsp: 60, mop: 35, note: "Legume — needs less nitrogen; keep phosphorus adequate for nodulation." },
  banana: { urea: 200, tsp: 90, mop: 150, note: "High feeder — apply in split doses through the year, more often around bunching." },
  mango: { urea: 100, tsp: 60, mop: 100, note: "Apply once after harvest and once before flowering, around the tree canopy." },
  papaya: { urea: 90, tsp: 60, mop: 90, note: "Apply in small split doses every 2 months for continuous fruiting." },
  watermelon: { urea: 70, tsp: 50, mop: 60, note: "Apply basal dose; top-dress lightly once vines start spreading." }
};

const DEFAULT_FERTILIZER = { urea: 80, tsp: 40, mop: 40, note: "Generic estimate — this crop is not yet in the detailed fertilizer guide." };

function getFertilizerDose(cropName) {
  const key = String(cropName || "").trim().toLowerCase();
  return fertilizerGuide[key] || null;
}

function getCropLibrary(query = {}) {
  const search = String(query.search || "").trim().toLowerCase();
  const type = String(query.type || "").trim().toLowerCase();

  return cropLibrary.filter((crop) => {
    const matchesSearch = !search || [
      crop.name,
      crop.type,
      crop.season,
      crop.pests.join(" "),
      crop.diseases.join(" ")
    ].join(" ").toLowerCase().includes(search);
    const matchesType = !type || crop.type.toLowerCase().includes(type);
    return matchesSearch && matchesType;
  });
}

module.exports = {
  cropLibrary,
  pestGuide,
  getCropLibrary,
  fertilizerGuide,
  DEFAULT_FERTILIZER,
  getFertilizerDose
};