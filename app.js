// ============================================================
// AgroSmart - Digital Farm Management System
// Complete Frontend JavaScript (fixed)
// ============================================================

const state = {
  token: localStorage.getItem("smartAgroToken"),
  user: null,
  dashboard: null,
  authMode: "login",
  crops: [],
  pests: [],
  lang: "en"
};


// ============================================================
// TRANSLATIONS
// ============================================================

const translations = {
  en: {
    langLabel: "Language",

    eyebrow: "Future-ready farming intelligence",
    title: "AgroSmart-Digital Farm Management System",
    lead: "A digital farming platform powered by crop intelligence, field planning, pest detection, and smart decision support.",
    getStarted: "Get Started",
    tagline: "AI + field monitoring",
    featCropAI: "Crop Analysis",
    featCropAIDesc: "Recommendation engine",
    featPlanner: "Field Planner",
    featPlannerDesc: "Farm operations",

    aboutLabel: "Project overview",
    aboutTitle: "Built for modern agriculture and future farming",
    aboutText: "This project is based on smart farming principles. It combines crop recommendation, field health monitoring, daily task tracking, complaint management, and leaf disease analysis to help farmers work more efficiently and make better decisions.",
    basisTitle: "What this system is based on",
    basis1: "Crop knowledge and vegetable growth patterns",
    basis2: "Soil, weather, and field condition analysis",
    basis3: "Disease and pest identification from leaf images",
    basis4: "Daily farm planning, action tracking, and support",
    basis5: "AI assistance for future smart agriculture innovation",

    galleryLabel: "Crop & vegetable vision",
    galleryTitle: "Field inspiration for smarter growth",
    card1Title: "Rice field",
    card1Text: "High-yield crop planning",
    card2Title: "Vegetable garden",
    card2Text: "Healthy and balanced cultivation",
    card3Title: "Smart cultivation",
    card3Text: "Future-ready to farm intelligence",

    sideManagement: "Management",
    navOverview: "Overview",
    navScanner: "Leaf Scanner",
    navCropAI: "Crop Analysis",
    navLibrary: "Crop Library",
    navFields: "Fields",
    navTasks: "Tasks",
    navComplaints: "Complaints",
    navMarket: "Market Prices",
    navFertilizer: "Fertilizer Calc",
    logout: "Log out",

    marketHeading: "Market Price Log",
    marketSub: "Track your own selling price",
    labelPrice: "Price",
    phPrice: "1200",
    labelUnit: "Unit",
    unitMaund: "Per maund",
    unitKg: "Per kg",
    unitQuintal: "Per quintal",
    labelMarketName: "Market / Bazar",
    phMarketName: "Savar Bazar",
    labelDate: "Date",
    labelNote: "Note",
    phMarketNote: "Optional note, e.g. quality/grade",
    logPriceBtn: "Log Price",
    marketHistoryHeading: "Price History",
    yourEntries: "Your logged entries",
    noMarketPricesYet: "No prices logged yet.",
    marketDisclaimer: "Prices you log here are your own records, not a live market feed.",

    fertilizerHeading: "Fertilizer Calculator",
    fertilizerSub: "Urea / TSP / MoP estimate",
    calculateBtn: "Calculate",
    fertilizerEmptyState: "Select a crop and area to see the fertilizer estimate.",
    fertilizerResultHeading: "Estimated Fertilizer Need",
    perAcreLabel: "Per acre",
    totalLabel: "Total for your area",
    fertilizerGenericNote: "This crop isn't in the detailed guide yet — showing a generic estimate.",
    fertilizerDisclaimer: "General agronomy guidance only. Actual need depends on your soil test — confirm with a local agriculture officer before applying.",

    navWeather: "Weather Alerts",
    navFinance: "Expense/Income",
    navCalendar: "Crop Calendar",
    navContacts: "Extension Contact",
    navSubsidy: "Govt Subsidy",

    weatherHeading: "Weather Alerts",
    weatherSub: "Short-range advisory",
    weatherLoadingState: "Loading weather...",
    labelLocation: "Location",
    refreshBtn: "Refresh",

    financeHeading: "Farm Expense/Income",
    financeSub: "Track money in and out",
    labelEntryType: "Type",
    typeExpense: "Expense",
    typeIncome: "Income",
    labelCategory2: "Category",
    phCategory: "Seed, Fertilizer, Labor, Crop sale...",
    labelAmount: "Amount (Taka)",
    phFinanceNote: "Optional note",
    addEntryBtn: "Add Entry",
    financeSummaryHeading: "Summary",
    thisRecord: "All entries",
    totalIncomeLabel: "Total Income",
    totalExpenseLabel: "Total Expense",
    netProfitLabel: "Net Profit",
    noFinanceYet: "No entries logged yet.",

    calendarHeading: "Crop Calendar",
    calendarSub: "Key milestones by planting date",
    labelPlantingDate: "Planting date",
    generateBtn: "Generate Calendar",
    calendarEmptyState: "Select a crop and planting date to see the schedule.",
    addAsTaskBtn: "Add as Task",
    calendarDisclaimer: "Estimated schedule based on typical crop duration — adjust for your local variety and weather.",

    contactHeading: "My Extension Contacts",
    contactSub: "Save your local officer's info",
    labelName: "Name",
    phContactName: "Officer name",
    labelRole: "Role / Title",
    phContactRole: "Upazila Agriculture Officer",
    labelPhone: "Phone",
    phContactPhone: "01xxxxxxxxx",
    phContactArea: "Upazila / Union",
    saveContactBtn: "Save Contact",
    hotlineHeading: "National Helplines",
    verifiedRef: "Verified reference",
    myContactsHeading: "Your Saved Contacts",
    noContactsYet: "No contacts saved yet.",

    subsidyHeading: "Government Subsidy & Schemes",
    subsidySub: "General reference — confirm locally",
    subsidyDisclaimer: "Scheme details and eligibility change over time. Confirm the latest status with your Upazila Agriculture Office or the DAE (16123) before relying on this.",

    weatherLoading: "Weather loading",

    fieldHealth: "Field Health",
    liveFarmSummary: "Live farm summary",
    alerts: "Alerts",
    today: "Today",
    recentAI: "Recent AI",
    CropProfile: "Crop  profile",
    recentScans: "Recent Scans",
    leafHealth: "Leaf health",
    complaintsHeading: "Complaints",
    supportQueue: "Support queue",

    cropRecommendationHeading: "Crop Recommendation",
    npkWeatherProfile: "NPK + weather profile",
    labelNitrogen: "Nitrogen (N)",
    labelPhosphorus: "Phosphorus (P)",
    labelPotassium: "Potassium (K)",
    labelTemperature: "Temperature C",
    labelHumidity: "Humidity %",
    labelPh: "Soil pH",
    labelRainfall: "Rainfall mm",
    analyzeCropBtn: "Analyze Crop",
    recommendEmptyState: "Run the model to see the best crop, alternatives, and agronomy advice.",

    cropLibraryHeading: "Crop Details Library",
    cropLibrarySub: "Crop, vegetable, pest, pesticide",
    cropSearchPh: "Search rice, tomato, aphid, blight...",
    typeAll: "All types",
    typeVegetables: "Vegetables",
    typeCereals: "Cereals",
    typeFruits: "Fruits",
    typeLeafy: "Leafy",
    typeRoot: "Root",
    pestGuideHeading: "Pest & Pesticide Guide",
    pestGuideSub: "Safe field reference",

    addFieldHeading: "Add Field",
    farmRegistry: "Farm registry",
    labelFieldName: "Field name",
    phFieldName: "South Block",
    phCropRice: "Rice",
    labelArea: "Area (acre)",
    labelSoilType: "Soil type",
    phSoilType: "Clay loam",
    labelIrrigation: "Irrigation",
    irrScheduled: "Scheduled",
    irrActive: "Active",
    irrRainfed: "Rain-fed",
    irrPaused: "Paused",
    labelHealthPct: "Health %",
    saveFieldBtn: "Save Field",
    allFieldsHeading: "All Fields",

    addTaskHeading: "Add Task",
    operations: "Operations",
    labelTaskTitle: "Task title",
    phTaskTitle: "Inspect irrigation line",
    labelDueDate: "Due date",
    labelPriority: "Priority",
    priorityMedium: "Medium",
    priorityHigh: "High",
    priorityLow: "Low",
    createTaskBtn: "Create Task",
    taskBoardHeading: "Task Board",
    openWork: "Open work",

    complaintBoxHeading: "Farmer Complaint Box",
    supportTicket: "Support ticket",
    labelSubject: "Subject",
    phSubject: "Irrigation pump problem",
    labelCategory: "Category",
    catCropDisease: "Crop Disease",
    catPestAttack: "Pest Attack",
    catIrrigation: "Irrigation",
    catMarketPrice: "Market Price",
    catFertilizer: "Fertilizer",
    catGeneral: "General",
    phCropList: "Rice, Tomato, Potato...",
    labelMessage: "Message",
    phComplaintMessage: "Write farmer complaint details here",
    submitComplaintBtn: "Submit Complaint",
    complaintHistoryHeading: "Complaint History",
    farmerSupport: "Farmer support",

    phFullName: "Full name",
    phPhone: "Phone number",
    phLocation: "Farm location",
    phEmail: "Email address",
    phPassword: "Password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    authTitleReset: "Reset Password",
    authKickerReset: "Set a new password for your account",
    resetPasswordBtn: "Update Password",
    resetHelp: "Enter your email and choose a new password.",
    phNewPassword: "New password",
    phConfirmPassword: "Confirm password",
    rememberedPassword: "Remembered your password?",
    errEmailRequired: "Please enter your email address.",
    errPasswordShort: "Password must be at least 6 characters.",
    errPasswordMismatch: "Passwords do not match.",
    resetSuccess: "Password updated. You can sign in now.",

    authTitleLogin: "Welcome Back",
    authTitleSignup: "Create Account",
    authKickerLogin: "Sign in to AgroSmart",
    authKickerSignup: "Create your AgroSmart account",
    signInBtn: "Sign In",
    signUpBtn: "Sign Up",
    alreadyHaveAccount: "Already have an account?",
    noAccount: "Don't have an account?",
    loginLink: "Login",
    signUpLink: "Sign Up",

    welcomePrefix: "Welcome,",

    metricFields: "Fields",
    metricTotalAcre: "Total Area",
    metricAvgHealth: "Average Health",
    metricOpenTasks: "Open Tasks",
    metricComplaints: "Complaints",
    metricLeafScans: "Leaf Scans",

    fieldsCountSuffix: "fields",
    acreWord: "acre",

    noFieldsYet: "No fields added yet.",
    noRecommendationHistory: "No recommendation history yet.",
    noLeafScansYet: "No leaf scans yet.",
    noComplaintsYet: "No complaints yet.",
    noTasksYet: "No tasks yet.",

    bestCropMatch: "Best Crop Match",
    confidenceWord: "confidence",
    waterWord: "water",
    adviceHeading: "Recommended Advice",

    leafScannerHeading: "AI Leaf Scanner",
    imageSymptoms: "Visible Symptoms",
    labelCrop: "Crop",
    labelLeafImage: "Leaf Image",
    labelFieldNote: "Field Note",
    phFieldNote: "Add any additional field observations...",
    symBrown: "Brown spots",
    symYellow: "Yellowing",
    symWhite: "White powder",
    symHoles: "Leaf holes",
    symSticky: "Sticky leaves",
    symPale: "Pale leaves",
    scanLeafBtn: "Scan Leaf",
    uploadLeafHint: "Choose a leaf image to preview",
    chooseImageBtn: "Choose Image",
    scannerEmptyState: "Upload a leaf image and scan it.",

    treatmentHeading: "Treatment",
    observedHeading: "What the AI saw in your photo",
    preventionHeading: "Prevention",
    pesticideNoteLabel: "Pesticide note:",
    possiblePestMatches: "Possible Pest Matches",

    soilLabel: "Soil:",
    pestsLabel: "Pests:",
    diseasesLabel: "Diseases:",
    pesticideLabel: "Pesticide:",

    cropsLabel: "Crops:",
    symptomsLabel: "Symptoms:",
    controlLabel: "Control:",

    doneLabel: "Done",
    deleteLabel: "Delete",
    confirmDelete: "Delete this item? This cannot be undone.",

    knowledgeUnavailable: "Crop knowledge could not be loaded.",
    pestRefUnavailable: "Pest guide could not be loaded.",
    noCropMatched: "No crop matched your search.",

    categoryLabel: "Category",
    priorityLabel: "Priority",
    statusLabel: "Status"
  },

  bn: {
    langLabel: "ভাষা",

    eyebrow: "ভবিষ্যতের জন্য প্রস্তুত কৃষি বুদ্ধিমত্তা",
    title: "আগ্রোস্মার্ট-ডিজিটাল ফার্ম ম্যানেজমেন্ট সিস্টেম",
    lead: "ফসল বুদ্ধিমত্তা, মাঠ পরিকল্পনা, পোকা সনাক্তকরণ এবং স্মার্ট সিদ্ধান্ত সহায়তার মাধ্যমে চালিত একটি ডিজিটাল কৃষি প্ল্যাটফর্ম।",
    getStarted: "শুরু করুন",
    tagline: "AI + মাঠ পর্যবেক্ষণ",
    featCropAI: "ফসল বিশ্লেষণ",
    featCropAIDesc: "সুপারিশ ইঞ্জিন",
    featPlanner: "মাঠ পরিকল্পক",
    featPlannerDesc: "খামারের কার্যক্রম",

    aboutLabel: "প্রকল্প পরিচিতি",
    aboutTitle: "আধুনিক কৃষি ও ভবিষ্যতের চাষাবাদের জন্য তৈরি",
    aboutText: "এই প্রকল্পটি স্মার্ট ফার্মিং নীতির উপর ভিত্তি করে তৈরি। এটি ফসল সুপারিশ, মাঠের স্বাস্থ্য পর্যবেক্ষণ, দৈনিক কাজ ট্র্যাকিং, অভিযোগ ব্যবস্থাপনা এবং পাতার রোগ বিশ্লেষণকে একত্রিত করে, যা কৃষকদের আরও দক্ষভাবে কাজ করতে ও ভালো সিদ্ধান্ত নিতে সাহায্য করে।",
    basisTitle: "এই সিস্টেমটি যার ভিত্তিতে তৈরি",
    basis1: "ফসলের জ্ঞান ও সবজির বৃদ্ধির ধরণ",
    basis2: "মাটি, আবহাওয়া এবং মাঠের অবস্থা বিশ্লেষণ",
    basis3: "পাতার ছবি থেকে রোগ ও পোকা সনাক্তকরণ",
    basis4: "দৈনিক খামার পরিকল্পনা, কার্যক্রম ট্র্যাকিং ও সহায়তা",
    basis5: "ভবিষ্যতের স্মার্ট কৃষি উদ্ভাবনের জন্য AI সহায়তা",

    galleryLabel: "ফসল ও সবজির দৃশ্য",
    galleryTitle: "স্মার্ট বৃদ্ধির জন্য মাঠের অনুপ্রেরণা",
    card1Title: "ধানের জমি",
    card1Text: "উচ্চ ফলনশীল ফসল পরিকল্পনা",
    card2Title: "সবজির বাগান",
    card2Text: "স্বাস্থ্যকর ও ভারসাম্যপূর্ণ চাষ",
    card3Title: "স্মার্ট চাষাবাদ",
    card3Text: "ভবিষ্যতের কৃষি বুদ্ধিমত্তার জন্য প্রস্তুত",

    sideManagement: "ব্যবস্থাপনা",
    navOverview: "সারসংক্ষেপ",
    navScanner: "পাতা স্ক্যানার",
    navCropAI: "ফসল বিশ্লেষণ",
    navLibrary: "ফসল লাইব্রেরি",
    navFields: "জমি",
    navTasks: "কাজ",
    navComplaints: "অভিযোগ",
    navMarket: "বাজার দর",
    navFertilizer: "সার ক্যালকুলেটর",
    logout: "লগ আউট",

    marketHeading: "বাজার দর লগ",
    marketSub: "আপনার নিজের বিক্রির দাম রাখুন",
    labelPrice: "দাম",
    phPrice: "১২০০",
    labelUnit: "একক",
    unitMaund: "প্রতি মণ",
    unitKg: "প্রতি কেজি",
    unitQuintal: "প্রতি কুইন্টাল",
    labelMarketName: "বাজারের নাম",
    phMarketName: "সাভার বাজার",
    labelDate: "তারিখ",
    labelNote: "নোট",
    phMarketNote: "ঐচ্ছিক নোট, যেমন মান/গ্রেড",
    logPriceBtn: "দাম লগ করুন",
    marketHistoryHeading: "দামের ইতিহাস",
    yourEntries: "আপনার লগ করা তথ্য",
    noMarketPricesYet: "এখনও কোনো দাম লগ করা হয়নি।",
    marketDisclaimer: "এখানে লগ করা দাম আপনার নিজের রেকর্ড, লাইভ বাজার তথ্য নয়।",

    fertilizerHeading: "সার ক্যালকুলেটর",
    fertilizerSub: "ইউরিয়া / টিএসপি / এমওপি হিসাব",
    calculateBtn: "হিসাব করুন",
    fertilizerEmptyState: "সারের হিসাব দেখতে ফসল ও জমির পরিমাণ নির্বাচন করুন।",
    fertilizerResultHeading: "আনুমানিক সারের চাহিদা",
    perAcreLabel: "প্রতি একরে",
    totalLabel: "আপনার জমির জন্য মোট",
    fertilizerGenericNote: "এই ফসলটি বিস্তারিত গাইডে নেই — একটি সাধারণ আনুমানিক হিসাব দেখানো হচ্ছে।",
    fertilizerDisclaimer: "এটি শুধুমাত্র সাধারণ কৃষি পরামর্শ। প্রকৃত প্রয়োজন আপনার মাটির পরীক্ষার উপর নির্ভর করে — সার দেওয়ার আগে স্থানীয় কৃষি কর্মকর্তার পরামর্শ নিন।",

    navWeather: "আবহাওয়া সতর্কতা",
    navFinance: "খরচ-আয় হিসাব",
    navCalendar: "ফসল ক্যালেন্ডার",
    navContacts: "কৃষি অফিসার যোগাযোগ",
    navSubsidy: "সরকারি ভর্তুকি",

    weatherHeading: "আবহাওয়া সতর্কতা",
    weatherSub: "স্বল্প-মেয়াদী পরামর্শ",
    weatherLoadingState: "আবহাওয়া তথ্য লোড হচ্ছে...",
    labelLocation: "অবস্থান",
    refreshBtn: "রিফ্রেশ",

    financeHeading: "খামারের খরচ-আয়",
    financeSub: "টাকা আসা-যাওয়ার হিসাব রাখুন",
    labelEntryType: "ধরন",
    typeExpense: "খরচ",
    typeIncome: "আয়",
    labelCategory2: "খাত",
    phCategory: "বীজ, সার, শ্রমিক, ফসল বিক্রি...",
    labelAmount: "পরিমাণ (টাকা)",
    phFinanceNote: "ঐচ্ছিক নোট",
    addEntryBtn: "যুক্ত করুন",
    financeSummaryHeading: "সারসংক্ষেপ",
    thisRecord: "সব হিসাব",
    totalIncomeLabel: "মোট আয়",
    totalExpenseLabel: "মোট খরচ",
    netProfitLabel: "নিট মুনাফা",
    noFinanceYet: "এখনও কোনো হিসাব যুক্ত করা হয়নি।",

    calendarHeading: "ফসল ক্যালেন্ডার",
    calendarSub: "রোপণের তারিখ অনুযায়ী গুরুত্বপূর্ণ কাজ",
    labelPlantingDate: "রোপণের তারিখ",
    generateBtn: "ক্যালেন্ডার তৈরি করুন",
    calendarEmptyState: "সময়সূচী দেখতে ফসল ও রোপণের তারিখ নির্বাচন করুন।",
    addAsTaskBtn: "কাজে যুক্ত করুন",
    calendarDisclaimer: "সাধারণ ফসলের সময়কালের উপর ভিত্তি করে আনুমানিক সময়সূচী — আপনার এলাকার জাত ও আবহাওয়া অনুযায়ী পরিবর্তন করুন।",

    contactHeading: "আমার কৃষি অফিসার যোগাযোগ",
    contactSub: "আপনার স্থানীয় অফিসারের তথ্য সংরক্ষণ করুন",
    labelName: "নাম",
    phContactName: "অফিসারের নাম",
    labelRole: "পদবি",
    phContactRole: "উপজেলা কৃষি অফিসার",
    labelPhone: "ফোন",
    phContactPhone: "০১xxxxxxxxx",
    phContactArea: "উপজেলা / ইউনিয়ন",
    saveContactBtn: "সংরক্ষণ করুন",
    hotlineHeading: "জাতীয় হটলাইন",
    verifiedRef: "যাচাইকৃত তথ্য",
    myContactsHeading: "আপনার সংরক্ষিত যোগাযোগ",
    noContactsYet: "এখনও কোনো যোগাযোগ সংরক্ষণ করা হয়নি।",

    subsidyHeading: "সরকারি ভর্তুকি ও প্রকল্প",
    subsidySub: "সাধারণ তথ্য — স্থানীয়ভাবে নিশ্চিত করে নিন",
    subsidyDisclaimer: "প্রকল্পের বিস্তারিত ও যোগ্যতার শর্ত সময়ে সময়ে পরিবর্তিত হয়। এই তথ্যের উপর নির্ভর করার আগে আপনার উপজেলা কৃষি অফিস বা কৃষি কল সেন্টারে (১৬১২৩) যোগাযোগ করে সর্বশেষ অবস্থা যাচাই করে নিন।",

    weatherLoading: "আবহাওয়া লোড হচ্ছে",

    fieldHealth: "জমির স্বাস্থ্য",
    liveFarmSummary: "লাইভ ফার্ম সারসংক্ষেপ",
    alerts: "সতর্কতা",
    today: "আজ",
    recentAI: "সাম্প্রতিক প্রোফাইল",
    CropProfile: "ফসল প্রোফাইল",
    recentScans: "সাম্প্রতিক স্ক্যান",
    leafHealth: "পাতার স্বাস্থ্য",
    complaintsHeading: "অভিযোগ",
    supportQueue: "সহায়তা সারি",

    cropRecommendationHeading: "ফসল সুপারিশ",
    npkWeatherProfile: "NPK + আবহাওয়া প্রোফাইল",
    labelNitrogen: "নাইট্রোজেন (N)",
    labelPhosphorus: "ফসফরাস (P)",
    labelPotassium: "পটাশিয়াম (K)",
    labelTemperature: "তাপমাত্রা °C",
    labelHumidity: "আর্দ্রতা %",
    labelPh: "মাটির pH",
    labelRainfall: "বৃষ্টিপাত (mm)",
    analyzeCropBtn: "ফসল বিশ্লেষণ করুন",
    recommendEmptyState: "সেরা ফসল, বিকল্প ফসল এবং কৃষি পরামর্শ দেখতে মডেল চালান।",

    cropLibraryHeading: "ফসলের বিস্তারিত লাইব্রেরি",
    cropLibrarySub: "ফসল, সবজি, পোকা, কীটনাশক",
    cropSearchPh: "ধান, টমেটো, জাব পোকা, ব্লাইট... খুঁজুন",
    typeAll: "সব ধরনের",
    typeVegetables: "সবজি",
    typeCereals: "শস্য",
    typeFruits: "ফল",
    typeLeafy: "পাতাজাতীয়",
    typeRoot: "মূলজাতীয়",
    pestGuideHeading: "পোকা ও কীটনাশক গাইড",
    pestGuideSub: "মাঠের নিরাপদ রেফারেন্স",

    addFieldHeading: "জমি যুক্ত করুন",
    farmRegistry: "খামার রেজিস্ট্রি",
    labelFieldName: "জমির নাম",
    phFieldName: "দক্ষিণ ব্লক",
    phCropRice: "ধান",
    labelArea: "এলাকা (একর)",
    labelSoilType: "মাটির ধরন",
    phSoilType: "কাদা দোআঁশ",
    labelIrrigation: "সেচ",
    irrScheduled: "নির্ধারিত",
    irrActive: "সক্রিয়",
    irrRainfed: "বৃষ্টিনির্ভর",
    irrPaused: "স্থগিত",
    labelHealthPct: "স্বাস্থ্য %",
    saveFieldBtn: "জমি সংরক্ষণ করুন",
    allFieldsHeading: "সব জমি",

    addTaskHeading: "কাজ যুক্ত করুন",
    operations: "কার্যক্রম",
    labelTaskTitle: "কাজের শিরোনাম",
    phTaskTitle: "সেচ লাইন পরিদর্শন করুন",
    labelDueDate: "নির্ধারিত তারিখ",
    labelPriority: "অগ্রাধিকার",
    priorityMedium: "মাঝারি",
    priorityHigh: "বেশি",
    priorityLow: "কম",
    createTaskBtn: "কাজ তৈরি করুন",
    taskBoardHeading: "কাজের বোর্ড",
    openWork: "চলমান কাজ",

    complaintBoxHeading: "কৃষক অভিযোগ বক্স",
    supportTicket: "সহায়তা টিকিট",
    labelSubject: "বিষয়",
    phSubject: "সেচ পাম্পের সমস্যা",
    labelCategory: "বিভাগ",
    catCropDisease: "ফসলের রোগ",
    catPestAttack: "পোকার আক্রমণ",
    catIrrigation: "সেচ",
    catMarketPrice: "বাজার মূল্য",
    catFertilizer: "সার",
    catGeneral: "সাধারণ",
    phCropList: "ধান, টমেটো, আলু...",
    labelMessage: "বার্তা",
    phComplaintMessage: "এখানে কৃষকের অভিযোগের বিস্তারিত লিখুন",
    submitComplaintBtn: "অভিযোগ জমা দিন",
    complaintHistoryHeading: "অভিযোগের ইতিহাস",
    farmerSupport: "কৃষক সহায়তা",

    phFullName: "পূর্ণ নাম",
    phPhone: "ফোন নম্বর",
    phLocation: "খামারের অবস্থান",
    phEmail: "ইমেইল অ্যাড্রেস",
    phPassword: "পাসওয়ার্ড",
    rememberMe: "মনে রাখুন",
    forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
    authTitleReset: "পাসওয়ার্ড রিসেট",
    authKickerReset: "আপনার অ্যাকাউন্টের জন্য নতুন পাসওয়ার্ড দিন",
    resetPasswordBtn: "পাসওয়ার্ড আপডেট করুন",
    resetHelp: "আপনার ইমেইল দিন এবং নতুন পাসওয়ার্ড নির্বাচন করুন।",
    phNewPassword: "নতুন পাসওয়ার্ড",
    phConfirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
    rememberedPassword: "পাসওয়ার্ড মনে পড়েছে?",
    errEmailRequired: "দয়া করে আপনার ইমেইল দিন।",
    errPasswordShort: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।",
    errPasswordMismatch: "দুইটি পাসওয়ার্ড মিলছে না।",
    resetSuccess: "পাসওয়ার্ড আপডেট হয়েছে। এখন লগইন করতে পারবেন।",

    authTitleLogin: "আবার স্বাগতম",
    authTitleSignup: "অ্যাকাউন্ট তৈরি করুন",
    authKickerLogin: "AgroSmart-এ লগইন করুন",
    authKickerSignup: "আপনার AgroSmart অ্যাকাউন্ট তৈরি করুন",
    signInBtn: "লগইন",
    signUpBtn: "সাইন আপ",
    alreadyHaveAccount: "ইতোমধ্যে অ্যাকাউন্ট আছে?",
    noAccount: "অ্যাকাউন্ট নেই?",
    loginLink: "লগইন",
    signUpLink: "সাইন আপ",

    welcomePrefix: "স্বাগতম,",

    metricFields: "জমি",
    metricTotalAcre: "মোট এলাকা",
    metricAvgHealth: "গড় স্বাস্থ্য",
    metricOpenTasks: "চলমান কাজ",
    metricComplaints: "অভিযোগ",
    metricLeafScans: "পাতা স্ক্যান",

    fieldsCountSuffix: "টি জমি",
    acreWord: "একর",

    noFieldsYet: "এখনও কোনো জমি যোগ করা হয়নি।",
    noRecommendationHistory: "এখনও কোনো সুপারিশের ইতিহাস নেই।",
    noLeafScansYet: "এখনও কোনো পাতা স্ক্যান করা হয়নি।",
    noComplaintsYet: "এখনও কোনো অভিযোগ নেই।",
    noTasksYet: "এখনও কোনো কাজ নেই।",

    bestCropMatch: "সেরা ফসল",
    confidenceWord: "নির্ভরযোগ্যতা",
    waterWord: "পানি",
    adviceHeading: "সুপারিশকৃত পরামর্শ",

    leafScannerHeading: "পাতা স্ক্যানার",
    imageSymptoms: "দৃশ্যমান লক্ষণ",
    labelCrop: "ফসল",
    labelLeafImage: "পাতার ছবি",
    labelFieldNote: "জমির নোট",
    phFieldNote: "অতিরিক্ত কোনো তথ্য থাকলে লিখুন...",
    symBrown: "বাদামি দাগ",
    symYellow: "হলুদ হয়ে যাওয়া",
    symWhite: "সাদা গুঁড়া",
    symHoles: "পাতায় ছিদ্র",
    symSticky: "আঠালো পাতা",
    symPale: "ফ্যাকাশে পাতা",
    scanLeafBtn: "পাতা স্ক্যান করুন",
    uploadLeafHint: "প্রিভিউ দেখতে পাতার ছবি নির্বাচন করুন",
    chooseImageBtn: "ছবি নির্বাচন করুন",
    scannerEmptyState: "পাতার ছবি আপলোড করে স্ক্যান করুন।",

    treatmentHeading: "চিকিৎসা",
    observedHeading: "ছবিতে যা দেখেছে",
    preventionHeading: "প্রতিরোধ",
    pesticideNoteLabel: "কীটনাশক তথ্য:",
    possiblePestMatches: "সম্ভাব্য পোকার মিল",

    soilLabel: "মাটি:",
    pestsLabel: "পোকা:",
    diseasesLabel: "রোগ:",
    pesticideLabel: "কীটনাশক:",

    cropsLabel: "ফসল:",
    symptomsLabel: "লক্ষণ:",
    controlLabel: "নিয়ন্ত্রণ:",

    doneLabel: "সম্পন্ন",
    deleteLabel: "মুছুন",
    confirmDelete: "এটি মুছে ফেলবেন? আর ফেরানো যাবে না।",

    knowledgeUnavailable: "ফসলের তথ্য লোড করা যায়নি।",
    pestRefUnavailable: "পোকার তথ্য লোড করা যায়নি।",
    noCropMatched: "আপনার অনুসন্ধানের সাথে কোনো ফসল পাওয়া যায়নি।",

    categoryLabel: "বিভাগ",
    priorityLabel: "অগ্রাধিকার",
    statusLabel: "অবস্থা"
  }
};


// ============================================================
// BANGLA DATA
// ============================================================

const CROP_NAME_BN = {
  rice: "ধান",
  wheat: "গম",
  maize: "ভুট্টা",
  jute: "পাট",
  potato: "আলু",
  tomato: "টমেটো",
  eggplant: "বেগুন",
  chili: "মরিচ",
  okra: "ঢেঁড়স",
  cucumber: "শসা",
  "bottle gourd": "লাউ",
  pumpkin: "কুমড়া",
  cauliflower: "ফুলকপি",
  cabbage: "বাঁধাকপি",
  onion: "পেঁয়াজ",
  garlic: "রসুন",
  spinach: "পালং শাক",
  "red amaranth": "লাল শাক",
  carrot: "গাজর",
  radish: "মূলা",
  bean: "শিম",
  pea: "মটরশুঁটি",
  banana: "কলা",
  mango: "আম",
  papaya: "পেঁপে",
  watermelon: "তরমুজ",

  // --- Crops from the recommendation model (cropModel.js) ---
  chickpea: "ছোলা",
  kidneybeans: "রাজমা শিম",
  pigeonpeas: "অড়হর",
  mothbeans: "মথ ডাল",
  mungbean: "মুগ ডাল",
  blackgram: "মাষকলাই (কালো ডাল)",
  lentil: "মসুর ডাল",
  pomegranate: "ডালিম",
  grapes: "আঙুর",
  muskmelon: "ক্ষীরা / বাঙ্গি",
  apple: "আপেল",
  orange: "কমলা",
  coconut: "নারকেল",
  cotton: "তুলা",
  coffee: "কফি"
};

const TYPE_LABEL_BN = {
  Cereal: "শস্য",
  Fiber: "আঁশজাতীয়",
  Vegetable: "সবজি",
  "Leafy vegetable": "পাতাজাতীয় সবজি",
  "Root vegetable": "মূলজাতীয় সবজি",
  "Pulse vegetable": "ডালজাতীয় সবজি",
  Fruit: "ফল",
  "Fruit vegetable": "ফলজাতীয় সবজি"
};

const SEASON_BN = {
  Winter: "শীতকাল",
  Summer: "গ্রীষ্মকাল",
  Monsoon: "বর্ষাকাল",
  "Year-round": "সারা বছর",
  Spring: "বসন্তকাল",
  Autumn: "শরৎকাল",
  Rainy: "বর্ষাকাল",
  Aman: "আমন",
  Aus: "আউশ",
  Boro: "বোরো",
  Rabi: "রবি",
  Kharif: "খরিফ",
  "Kharif-1": "খরিফ-১",
  "Kharif-2": "খরিফ-২",
  "Kharif 1": "খরিফ-১",
  "Kharif 2": "খরিফ-২",
  Perennial: "বহুবর্ষজীবী",
  "Dry season": "শুষ্ক মৌসুম",
  Temperate: "নাতিশীতোষ্ণ অঞ্চলের ফসল"
};

const SEASON_BN_LOWER = Object.fromEntries(
  Object.entries(SEASON_BN).map(([key, value]) => [key.toLowerCase(), value])
);

const WATER_BN = {
  Low: "কম",
  Medium: "মাঝারি",
  High: "বেশি"
};

const PEST_BN = {
  aphid: "জাব পোকা",
  whitefly: "সাদা মাছি",
  thrips: "থ্রিপস",
  "fruit borer": "ফল ছিদ্রকারী পোকা",
  "stem borer": "কাণ্ড ছিদ্রকারী পোকা",
  "diamondback moth": "ডায়মন্ডব্যাক মথ",
  "fruit fly": "ফল মাছি",
  "leaf miner": "পাতা সুড়ঙ্গকারী পোকা",
  mite: "মাকড়",

  // --- More pests found in the crop library ---
  armyworm: "আর্মিওয়ার্ম (সেনা পোকা)",
  "fall armyworm": "ফল আর্মিওয়ার্ম",
  termite: "উইপোকা",
  "brown planthopper": "বাদামি গাছ ফড়িং",
  "green leafhopper": "সবুজ পাতা ফড়িং",
  "white-backed planthopper": "সাদা পিঠ গাছ ফড়িং",
  "leaf folder": "পাতা মোড়ানো পোকা",
  "rice hispa": "ধানের হিস্পা পোকা",
  "gall midge": "গল মিজ (গাঁদি পোকা)",
  "rice bug": "গান্ধি পোকা",
  "yellow stem borer": "হলুদ কাণ্ড ছিদ্রকারী পোকা",
  "pink stem borer": "গোলাপি কাণ্ড ছিদ্রকারী পোকা",
  cutworm: "কাটুই পোকা",
  "shoot borer": "ডগা ছিদ্রকারী পোকা",
  "shoot and fruit borer": "ডগা ও ফল ছিদ্রকারী পোকা",
  "fruit and shoot borer": "ডগা ও ফল ছিদ্রকারী পোকা",
  "pod borer": "শুঁটি ছিদ্রকারী পোকা",
  bollworm: "বলওয়ার্ম",
  "tomato fruit borer": "টমেটোর ফল ছিদ্রকারী পোকা",
  jassid: "জ্যাসিড (পাতা ফড়িং)",
  leafhopper: "পাতা ফড়িং",
  planthopper: "গাছ ফড়িং",
  "red pumpkin beetle": "লাল কুমড়া পোকা",
  "epilachna beetle": "এপিলাকনা বিটল",
  "flea beetle": "ফ্লি বিটল",
  beetle: "বিটল",
  "hairy caterpillar": "শুঁয়োপোকা",
  caterpillar: "শুঁয়োপোকা",
  "cabbage looper": "বাঁধাকপির লুপার পোকা",
  "cabbage butterfly": "বাঁধাকপির প্রজাপতি",
  "cabbage worm": "বাঁধাকপির পোকা",
  "tobacco caterpillar": "তামাকের শুঁয়োপোকা",
  mealybug: "মিলিবাগ",
  "mealy bug": "মিলিবাগ",
  scale: "স্কেল পোকা",
  "scale insect": "স্কেল পোকা",
  nematode: "কৃমি (নেমাটোড)",
  "root knot nematode": "মূল গিঁট কৃমি",
  "spider mite": "লাল মাকড়",
  "red spider mite": "লাল মাকড়",
  "yellow mite": "হলুদ মাকড়",
  "mango hopper": "আমের হপার পোকা",
  "mango weevil": "আমের ঘুণ পোকা",
  "stem weevil": "কাণ্ড ঘুণ পোকা",
  weevil: "ঘুণ পোকা",
  "onion maggot": "পেঁয়াজের ম্যাগট",
  maggot: "ম্যাগট",
  "onion thrips": "পেঁয়াজের থ্রিপস",
  "root maggot": "মূল ম্যাগট",
  "bean fly": "শিমের মাছি",
  "pea weevil": "মটরের ঘুণ পোকা",
  "leaf webber": "পাতা জালকারী পোকা",
  "leaf roller": "পাতা মোড়ানো পোকা",
  "aphids": "জাব পোকা",
  "white grub": "সাদা গ্রাব পোকা",
  grub: "গ্রাব পোকা",
  "jute hairy caterpillar": "পাটের বিছা পোকা",
  "bihar hairy caterpillar": "বিছা পোকা",
  "jute semilooper": "পাটের সেমিলুপার",
  "yellow mite of jute": "পাটের হলুদ মাকড়",
  "potato tuber moth": "আলুর কন্দ মথ",
  "tuber moth": "আলুর কন্দ মথ",
  "colorado beetle": "কলোরাডো বিটল",
  "fruit sucking moth": "ফল শোষক মথ",
  "banana weevil": "কলার ঘুণ পোকা",
  "banana aphid": "কলার জাব পোকা",
  "papaya mealybug": "পেঁপের মিলিবাগ",
  "rice weevil": "ধানের ঘুণ পোকা",
  "snail": "শামুক",
  slug: "স্লাগ (বিনা খোলসের শামুক)",
  rat: "ইঁদুর",
  rodent: "ইঁদুর"
};

const DISEASE_BN = {
  "Fungal leaf spot / blight": "ছত্রাকজনিত পাতার দাগ / ব্লাইট",
  "Powdery mildew": "পাউডারি মিলডিউ",
  "Downy mildew": "ডাউনি মিলডিউ",
  "Virus / leaf curl": "ভাইরাস / পাতা কুঁকড়ানো",
  "Nutrient deficiency": "পুষ্টির ঘাটতি",
  "Insect chewing damage": "পাতা খাওয়া পোকার ক্ষতি",
  "Sucking pest damage": "রস শোষণকারী পোকার ক্ষতি",

  // --- Specific crop diseases (English -> Bangla) ---
  "Bacterial leaf blight": "ব্যাকটেরিয়াল পাতা ব্লাইট (বাদামি পাতা ঝলসানো রোগ)",
  "Rice blast": "ধান ব্লাস্ট রোগ",
  "Brown spot": "বাদামি দাগ রোগ",
  "Sheath blight": "শীথ ব্লাইট রোগ",
  "Tungro virus": "টুংরো ভাইরাস রোগ",
  "Bakanae disease": "বাকানি রোগ",

  "Wheat blast": "গমের ব্লাস্ট রোগ",
  "Leaf rust": "পাতার মরিচা রোগ (রাস্ট)",
  "Loose smut": "লুজ স্মাট রোগ",
  "Karnal bunt": "কারনাল বান্ট রোগ",

  "Turcicum leaf blight": "টার্সিকাম পাতা ব্লাইট",
  "Maydis leaf blight": "মেডিস পাতা ব্লাইট",
  "Common rust": "সাধারণ মরিচা রোগ",
  "Stalk rot": "কাণ্ড পচা রোগ",

  "Stem rot": "কাণ্ড পচা রোগ",
  "Black band disease": "কালো বলয় রোগ",
  Anthracnose: "অ্যানথ্রাকনোজ (কালো দাগ রোগ)",
  "Root rot": "শিকড় পচা রোগ",

  "Late blight": "লেট ব্লাইট (নাবি ধ্বসা)",
  "Early blight": "আর্লি ব্লাইট (আগাম ধ্বসা)",
  "Bacterial wilt": "ব্যাকটেরিয়াল উইল্ট (মোড়ক রোগ)",
  "Common scab": "সাধারণ স্ক্যাব রোগ",
  "Black scurf": "ব্ল্যাক স্কার্ফ রোগ",

  "Tomato leaf curl virus": "টমেটো পাতা কোঁকড়ানো ভাইরাস",
  "Fusarium wilt": "ফিউজারিয়াম উইল্ট",
  "Septoria leaf spot": "সেপ্টোরিয়া পাতার দাগ",

  "Phomopsis blight": "ফোমোপসিস ব্লাইট",
  "Little leaf disease": "লিটল লিফ রোগ",
  "Damping off": "ডেম্পিং অফ (চারা ধ্বসা রোগ)",

  "Cercospora leaf spot": "সারকোস্পোরা পাতার দাগ",
  "Chili leaf curl virus": "মরিচ পাতা কোঁকড়ানো ভাইরাস",

  "Yellow vein mosaic virus": "হলুদ শিরা মোজাইক ভাইরাস",

  "Mosaic virus": "মোজাইক ভাইরাস",
  "Fruit rot": "ফল পচা রোগ",

  "Black rot": "ব্ল্যাক রট (কালো পচা রোগ)",
  "Alternaria leaf spot": "অল্টারনারিয়া পাতার দাগ",
  Clubroot: "ক্লাবরুট রোগ",
  "Soft rot": "নরম পচা রোগ",

  "Purple blotch": "পার্পল ব্লচ (বেগুনি দাগ রোগ)",
  "Basal rot": "গোড়া পচা রোগ",
  "Stemphylium blight": "স্টেমফিলিয়াম ব্লাইট",
  "White rot": "সাদা পচা রোগ",
  Rust: "মরিচা রোগ",

  "Leaf spot": "পাতার দাগ রোগ",
  "White rust": "সাদা মরিচা রোগ",

  "Cavity spot": "ক্যাভিটি স্পট রোগ",

  "Ascochyta blight": "অ্যাসকোকাইটা ব্লাইট",
  "Bean common mosaic virus": "বীন কমন মোজাইক ভাইরাস",

  "Panama disease (Fusarium wilt)": "পানামা রোগ (ফিউজারিয়াম উইল্ট)",
  "Sigatoka leaf spot": "সিগাটোকা পাতার দাগ",
  "Banana bunchy top virus": "কলার বানচি টপ ভাইরাস",

  "Bacterial black spot": "ব্যাকটেরিয়াল কালো দাগ",
  "Sooty mould": "সুটি মোল্ড (কালো ছাতা রোগ)",
  "Mango malformation": "আমের বিকৃতি রোগ",

  "Papaya ring spot virus": "পেঁপে রিং স্পট ভাইরাস",
  "Foot rot": "গোড়া পচা রোগ",

  "Gummy stem blight": "গামি স্টেম ব্লাইট",

  // --- Short / alternate names used in the crop library ---
  Blast: "ব্লাস্ট রোগ",
  "Leaf blight": "পাতা ব্লাইট (পাতা ঝলসানো রোগ)",
  Blight: "ব্লাইট (ধ্বসা রোগ)",
  "Bacterial blight": "ব্যাকটেরিয়াল ব্লাইট",
  "Bacterial leaf spot": "ব্যাকটেরিয়াল পাতার দাগ",
  "Leaf scald": "পাতা ঝলসানো রোগ",
  "False smut": "মিথ্যা স্মাট (আভা রোগ)",
  Smut: "স্মাট রোগ",
  Wilt: "উইল্ট (ঢলে পড়া রোগ)",
  Mildew: "মিলডিউ",
  "Root and stem rot": "শিকড় ও কাণ্ড পচা রোগ",
  "Collar rot": "গলা পচা রোগ",
  "Dry rot": "শুকনা পচা রোগ",
  "Wet rot": "ভেজা পচা রোগ",
  "Leaf curl": "পাতা কোঁকড়ানো রোগ",
  "Leaf curl virus": "পাতা কোঁকড়ানো ভাইরাস",
  "Mosaic": "মোজাইক রোগ",
  "Yellow mosaic": "হলুদ মোজাইক রোগ",
  "Yellow mosaic virus": "হলুদ মোজাইক ভাইরাস",
  "Fruit spot": "ফলের দাগ রোগ",
  "Canker": "ক্যাংকার রোগ",
  "Die back": "ডাইব্যাক (ডগা মরা রোগ)",
  "Dieback": "ডাইব্যাক (ডগা মরা রোগ)",
  "Gray mold": "ধূসর ছাতা রোগ",
  "Grey mold": "ধূসর ছাতা রোগ",
  "Bud rot": "কুঁড়ি পচা রোগ",
  "Seedling blight": "চারা ধ্বসা রোগ",
  "Tip burn": "ডগা পোড়া রোগ",
  "Powdery Mildew": "পাউডারি মিলডিউ",
  "Downy Mildew": "ডাউনি মিলডিউ"
};

// Case-insensitive lookup table (bnList() and the scanner lowercase
// the disease name before looking it up).
const DISEASE_BN_LOWER = Object.fromEntries(
  Object.entries(DISEASE_BN).map(([key, value]) => [key.toLowerCase(), value])
);

// ------------------------------------------------------------
// Per-crop disease list (English names). Bangla names come from
// DISEASE_BN via getCropDiseases().
// ------------------------------------------------------------
const CROP_DISEASES = {
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

// Returns [{ en: "Late blight", bn: "লেট ব্লাইট (নাবি ধ্বসা)" }, ...]
// for a given crop name (case-insensitive).
function getCropDiseases(cropName) {
  const key = String(cropName || "").toLowerCase();
  const list = CROP_DISEASES[key] || [];

  return list.map((diseaseEn) => ({
    en: diseaseEn,
    bn: DISEASE_BN[diseaseEn] || diseaseEn
  }));
}

const SOIL_BN = {
  rice: "দোআঁশ ও কাদামাটি",
  wheat: "উর্বর দোআঁশ মাটি",
  maize: "ভালো নিষ্কাশনযুক্ত দোআঁশ",
  potato: "বেলে দোআঁশ",
  tomato: "উর্বর দোআঁশ",
  eggplant: "দোআঁশ",
  chili: "ভালো নিষ্কাশনযুক্ত দোআঁশ",
  okra: "উর্বর দোআঁশ",
  cucumber: "বেলে দোআঁশ",
  "bottle gourd": "দোআঁশ",
  pumpkin: "দোআঁশ",
  cauliflower: "উর্বর দোআঁশ",
  cabbage: "উর্বর দোআঁশ",
  onion: "বেলে দোআঁশ",
  garlic: "দোআঁশ",
  spinach: "উর্বর দোআঁশ",
  carrot: "বেলে দোআঁশ",
  radish: "বেলে দোআঁশ"
};

const PESTICIDE_BN = {
  rice: "স্থানীয় বিশেষজ্ঞের নিশ্চিতকরণের পর কাণ্ড ছিদ্রকারী পোকার জন্য ক্লোরানট্রানিলিপ্রোল, গাছ ফড়িংয়ের জন্য পাইমেট্রোজিন এবং ব্লাস্ট রোগের জন্য ট্রাইসাইক্লাজল ব্যবহার করুন।",
  wheat: "জাব পোকার জন্য ইমিডাক্লোপ্রিড এবং ক্ষতির সীমা অতিক্রম করলে মরিচা রোগের জন্য টেবুকোনাজল/প্রোপিকোনাজল ব্যবহার করুন।",
  maize: "ফল আর্মিওয়ার্মের জন্য পরামর্শ অনুযায়ী মোচার ভেতরের কেন্দ্রে (হুর্লে) ইমামেকটিন বেনজোয়েট বা স্পাইনেটোরাম প্রয়োগ করুন।"
};

const CARE_BN = {};

const MODEL_NOTES_BN = {
  rice: "উষ্ণ ও আর্দ্র জমিতে, যেখানে নিয়মিত পানি জমে থাকে, সেখানে সবচেয়ে ভালো ফলন হয়।",
  maize: "ভালো নিষ্কাশনযুক্ত দোআঁশ মাটিতে, সুষম নাইট্রোজেন ও মাঝারি বৃষ্টিপাতে ভালো হয়।",
  chickpea: "শীতল ও শুষ্ক আবহাওয়া এবং নিরপেক্ষ থেকে সামান্য ক্ষারীয় মাটি পছন্দ করে।",
  kidneybeans: "মাঝারি ফসফরাস প্রয়োজন এবং পানি নিষ্কাশনের দিকে সতর্ক থাকতে হয়।",
  pigeonpeas: "উষ্ণ আবহাওয়া সহ্য করতে পারে এবং মাটিতে নাইট্রোজেন বাড়ায়।",
  mothbeans: "কম বৃষ্টিপাতের শুষ্ক এলাকার জন্য উপযুক্ত।",
  mungbean: "উষ্ণ ও আর্দ্র সময়ের জন্য স্বল্পমেয়াদী ডালজাতীয় ফসল।",
  blackgram: "মাঝারি আর্দ্রতাযুক্ত উষ্ণ জমিতে ভালো ফলন দেয়।",
  lentil: "হালকা সেচসহ শীতকালীন মৌসুমে সবচেয়ে ভালো হয়।",
  pomegranate: "আর্দ্র এলাকায় পোকামাকড়ের দিকে সতর্ক নজর রাখা প্রয়োজন।",
  banana: "পুষ্টির চাহিদা বেশি; মাটি আর্দ্র ও জৈব পদার্থসমৃদ্ধ রাখুন।",
  mango: "উষ্ণ আবহাওয়া এবং গভীর, ভালো নিষ্কাশনযুক্ত মাটি পছন্দ করে।",
  grapes: "উচ্চ পটাশিয়াম প্রয়োজন এবং মাচা (ট্রেলিস) ব্যবস্থাপনা দরকার।",
  watermelon: "নিয়মিত আর্দ্রতাসহ বেলে দোআঁশ মাটির জন্য উপযুক্ত।",
  muskmelon: "উষ্ণ, রৌদ্রোজ্জ্বল ও কম বৃষ্টিপাতের পরিবেশ পছন্দ করে।",
  apple: "উচ্চ পটাশিয়ামের প্রয়োজন; শুধু শীতল মাইক্রোক্লাইমেটে উপযুক্ত।",
  orange: "ভারসাম্যপূর্ণ pH-যুক্ত ভালো নিষ্কাশনযুক্ত মাটিতে ভালো হয়।",
  papaya: "উষ্ণ ও আর্দ্র খামারের জন্য দ্রুত বর্ধনশীল ফলের ফসল।",
  coconut: "আর্দ্র, উপকূলীয় ও উচ্চ বৃষ্টিপাতের এলাকায় সবচেয়ে ভালো।",
  cotton: "উচ্চ নাইট্রোজেন প্রয়োজন এবং পোকামাকড়ের প্রতি কড়া নজর রাখতে হয়।",
  jute: "উষ্ণ, আর্দ্র ও উচ্চ বৃষ্টিপাতের জমিতে বাংলাদেশের জন্য খুবই উপযোগী।",
  coffee: "ছায়াযুক্ত, উষ্ণ ও ভালো নিষ্কাশনযুক্ত জমি প্রয়োজন।"
};

function bnModelNote(cropName, fallback) {
  const key = String(cropName || "").toLowerCase();
  return isBn() && MODEL_NOTES_BN[key] ? MODEL_NOTES_BN[key] : fallback;
}

const ADVICE_LINE_BN = [
  [
    "Soil is acidic. Apply agricultural lime after local soil testing.",
    "মাটি অম্লীয়। স্থানীয়ভাবে মাটি পরীক্ষার পর কৃষি চুন প্রয়োগ করুন।"
  ],
  [
    "Soil is alkaline. Add organic compost and monitor micronutrient availability.",
    "মাটি ক্ষারীয়। জৈব কম্পোস্ট যোগ করুন এবং অণুপুষ্টির প্রাপ্যতার দিকে নজর রাখুন।"
  ],
  [
    "Soil pH is in a workable range for many crops.",
    "মাটির pH অনেক ফসলের জন্য চাষযোগ্য সীমার মধ্যে আছে।"
  ],
  [
    "Rainfall is low. Plan drip irrigation or short-cycle crops.",
    "বৃষ্টিপাত কম। ড্রিপ সেচ বা স্বল্পমেয়াদী ফসলের পরিকল্পনা করুন।"
  ],
  [
    "Rainfall is high. Keep drainage channels ready and watch fungal disease.",
    "বৃষ্টিপাত বেশি। নিষ্কাশন নালা প্রস্তুত রাখুন এবং ছত্রাকজনিত রোগের দিকে নজর রাখুন।"
  ],
  [
    "Nitrogen is low. Use compost, green manure, or balanced N fertilizer.",
    "নাইট্রোজেন কম। কম্পোস্ট, সবুজ সার বা সুষম নাইট্রোজেন সার ব্যবহার করুন।"
  ]
];

const SEVERITY_BN = {
  low: "কম",
  medium: "মাঝারি",
  high: "বেশি",
  critical: "গুরুতর"
};

const ISSUE_BN = {
  "Fungal leaf spot / blight": "ছত্রাকজনিত পাতার দাগ / ব্লাইট",
  "Powdery mildew": "পাউডারি মিলডিউ",
  "Downy mildew": "ডাউনি মিলডিউ",
  "Virus / leaf curl": "ভাইরাস / পাতা কুঁকড়ানো",
  "Nutrient deficiency": "পুষ্টির ঘাটতি",
  "Insect chewing damage": "পাতা খাওয়া পোকার ক্ষতি",
  "Sucking pest damage": "রস শোষণকারী পোকার ক্ষতি"
};
// ---------- Paddy ML model diseases (Bangla) ----------
const PADDY_BN = {
  "Bacterial Leaf Blight": {
    issue: "ব্যাকটেরিয়াল পাতা ব্লাইট",
    treatment: [
      "আক্রান্ত পাতা পরীক্ষা করুন এবং রোগ ছড়াচ্ছে কিনা লক্ষ্য রাখুন।",
      "অতিরিক্ত নাইট্রোজেন সার এড়িয়ে চলুন এবং জমির পানি সঠিকভাবে ব্যবস্থাপনা করুন।",
      "কোনো রাসায়নিক প্রয়োগের আগে স্থানীয় কৃষি কর্মকর্তার পরামর্শ নিন।"
    ],
    prevention: "সুস্থ বীজ ব্যবহার করুন, সুষম সার প্রয়োগ করুন এবং নিয়মিত জমি পরিদর্শন করুন।"
  },
  "Bacterial Leaf Streak": {
    issue: "ব্যাকটেরিয়াল পাতা স্ট্রিক",
    treatment: [
      "আক্রান্ত গাছ পরীক্ষা করুন এবং রোগের অগ্রগতি পর্যবেক্ষণ করুন।",
      "আক্রান্ত গাছের অংশ এক জমি থেকে অন্য জমিতে নেওয়া এড়িয়ে চলুন।",
      "লক্ষণ ছড়িয়ে পড়লে স্থানীয় কৃষি কর্মকর্তার পরামর্শ নিন।"
    ],
    prevention: "সুস্থ বীজ ব্যবহার করুন এবং জমি ও কৃষি যন্ত্রপাতি পরিষ্কার রাখুন।"
  },
  "Bacterial Panicle Blight": {
    issue: "ব্যাকটেরিয়াল শীষ ব্লাইট",
    treatment: [
      "আক্রান্ত শীষ পরীক্ষা করুন এবং কৃষি কর্মকর্তার কাছ থেকে রোগ নিশ্চিত করুন।",
      "অতিরিক্ত নাইট্রোজেন সার এড়িয়ে চলুন এবং ফসলের সঠিক যত্ন নিন।",
      "স্থানীয়ভাবে অনুমোদিত পরামর্শ ছাড়া কোনো কীটনাশক বা ব্যাকটেরিয়ানাশক প্রয়োগ করবেন না।"
    ],
    prevention: "সুস্থ বীজ ব্যবহার করুন, সুষম সার দিন এবং ফসলের বৃদ্ধির সময় শীষ নিয়মিত পর্যবেক্ষণ করুন।"
  },
  "Rice Blast": {
    issue: "ধানের ব্লাস্ট রোগ",
    treatment: [
      "আক্রান্ত পাতা ও শীষে ছড়িয়ে পড়া দাগ পরীক্ষা করুন।",
      "অতিরিক্ত নাইট্রোজেন সার এড়িয়ে চলুন এবং সুষম পুষ্টি বজায় রাখুন।",
      "স্থানীয়ভাবে অনুমোদিত নিয়ন্ত্রণ ব্যবস্থা সম্পর্কে কৃষি কর্মকর্তার পরামর্শ নিন।"
    ],
    prevention: "সম্ভব হলে প্রতিরোধী জাত, সুস্থ বীজ এবং সুষম সার ব্যবহার করুন।"
  },
  "Brown Spot": {
    issue: "বাদামি দাগ রোগ",
    treatment: [
      "ফসলের পুষ্টি ও মাটির অবস্থা পরীক্ষা করুন।",
      "সুষম সার ও যথাযথ পানি ব্যবস্থাপনা বজায় রাখুন।",
      "লক্ষণ ছড়াতে থাকলে স্থানীয় কৃষি পরামর্শ নিন।"
    ],
    prevention: "সুস্থ বীজ ব্যবহার করুন এবং ফসলের সুষম পুষ্টি বজায় রাখুন।"
  },
  "Dead Heart": {
    issue: "মরা ডিগ (ডেড হার্ট)",
    treatment: [
      "কাণ্ড পরীক্ষা করুন এবং মাজরা পোকার লার্ভা আছে কিনা দেখুন।",
      "নিয়ন্ত্রণ পদ্ধতি বেছে নেওয়ার আগে পোকার ক্ষতি নিশ্চিত করুন।",
      "উপযুক্ত ব্যবস্থাপনা সম্পর্কে স্থানীয় কৃষি কর্মকর্তার পরামর্শ নিন।"
    ],
    prevention: "নিয়মিত জমি পর্যবেক্ষণ করুন এবং ফসলের অবশিষ্টাংশ ও আগাছা যথাযথভাবে পরিষ্কার করুন।"
  },
  "Downy Mildew": {
    issue: "ডাউনি মিলডিউ",
    treatment: [
      "রোগ নিশ্চিত করতে আক্রান্ত গাছ পরীক্ষা করুন।",
      "জমি ও ফসলের যথাযথ ব্যবস্থাপনা বজায় রাখুন।",
      "রোগনাশক ব্যবহারের আগে কৃষি কর্মকর্তার পরামর্শ নিন।"
    ],
    prevention: "সুস্থ বীজ ব্যবহার করুন এবং ফসলের স্বাস্থ্য ও জমির অবস্থা নিয়মিত পর্যবেক্ষণ করুন।"
  },
  "Rice Hispa": {
    issue: "ধানের হিস্পা পোকা",
    treatment: [
      "পাতায় পূর্ণবয়স্ক বিটল ও খাওয়ার ক্ষতি আছে কিনা পরীক্ষা করুন।",
      "নিয়ন্ত্রণ পদ্ধতি বেছে নেওয়ার আগে আক্রমণের মাত্রা পর্যবেক্ষণ করুন।",
      "ক্ষতি ব্যাপক হলে স্থানীয় কৃষি কর্মকর্তার পরামর্শ নিন।"
    ],
    prevention: "নিয়মিত জমি পরিদর্শন করুন এবং আগাছা ও ফসলের অবশিষ্টাংশ যথাযথভাবে পরিচালনা করুন।"
  },
  "Healthy Rice Leaf": {
    issue: "সুস্থ ধানের পাতা",
    treatment: ["এই ছবিতে মডেল কোনো স্পষ্ট রোগ শনাক্ত করেনি।"],
    prevention: "নিয়মিত জমি পর্যবেক্ষণ করুন এবং সুষম ফসল পরিচর্যা চালিয়ে যান।"
  },
  "Rice Tungro": {
    issue: "ধানের টুংরো রোগ",
    treatment: [
      "লক্ষণ পরীক্ষা করুন এবং স্থানীয় কৃষি কর্মকর্তার কাছ থেকে নিশ্চিত হন।",
      "বাহক পোকা ও আক্রান্ত গাছ পর্যবেক্ষণ করুন।",
      "স্থানীয়ভাবে সুপারিশকৃত ব্যবস্থাপনা পরামর্শ অনুসরণ করুন।"
    ],
    prevention: "সুস্থ চারা ব্যবহার করুন এবং বাহক পোকা ও আগাছা নিয়ন্ত্রণে স্থানীয় পরামর্শ অনুসরণ করুন।"
  }
};

const SCAN_DISCLAIMER_BN =
  "ছবি স্ক্যানার একটি মাঠ-সহায়ক প্রোটোটাইপ। রাসায়নিক ব্যবহারের আগে স্থানীয় কৃষি কর্মকর্তার সাথে নিশ্চিত হন এবং সবসময় পণ্যের লেবেলে দেওয়া মাত্রা অনুসরণ করুন।";

const PEST_GUIDE_BN = {
  aphid: {
    symptoms: "পাতার নিচে ছোট নরম পোকা, কোঁকড়ানো পাতা, আঠালো মধুরস এবং কালো ছত্রাক।",
    control: "হলুদ স্টিকি ফাঁদ ব্যবহার করুন এবং প্রাথমিক অবস্থায় নিম তেল বা কীটনাশক সাবান ব্যবহার করুন।",
    pesticide: "স্থানীয় সুপারিশ অনুযায়ী অনুমোদিত কীটনাশক ব্যবহার করুন।"
  },
  whitefly: {
    symptoms: "পাতা নাড়ালে সাদা পোকা উড়ে যায় এবং পাতা কুঁকড়ে যেতে পারে।",
    control: "হলুদ ফাঁদ ব্যবহার করুন এবং আক্রান্ত গাছ অপসারণ করুন।",
    pesticide: "স্থানীয় সুপারিশ অনুযায়ী অনুমোদিত কীটনাশক ব্যবহার করুন।"
  },
  thrips: {
    symptoms: "রূপালি রেখা, পাতা কুঁকড়ানো এবং ছোট চলমান পোকা।",
    control: "নীল ফাঁদ ব্যবহার করুন এবং আগাছা নিয়ন্ত্রণ করুন।",
    pesticide: "স্থানীয় সুপারিশ অনুযায়ী অনুমোদিত কীটনাশক ব্যবহার করুন।"
  },
  "fruit borer": {
    symptoms: "ফলে গর্ত, ভেতরে লার্ভা এবং ফুল বা ফল ঝরে পড়া।",
    control: "ক্ষতিগ্রস্ত ফল অপসারণ করুন এবং ফেরোমন ফাঁদ ব্যবহার করুন।",
    pesticide: "আক্রমণ বেশি হলে অনুমোদিত কীটনাশক ব্যবহার করুন।"
  },
  "stem borer": {
    symptoms: "ডেড হার্ট এবং শীষ পর্যায়ে সাদা শীষ দেখা যেতে পারে।",
    control: "আলোর ফাঁদ ব্যবহার করুন এবং আক্রান্ত অংশ অপসারণ করুন।",
    pesticide: "স্থানীয় কৃষি কর্মকর্তার পরামর্শ অনুযায়ী ব্যবহার করুন।"
  },
  "diamondback moth": {
    symptoms: "পাতায় গর্ত ও জানালার মতো খাওয়ার দাগ।",
    control: "নেট ব্যবহার করুন এবং ফসলের অবশিষ্টাংশ অপসারণ করুন।",
    pesticide: "স্থানীয় সুপারিশ অনুযায়ী অনুমোদিত কীটনাশক ব্যবহার করুন।"
  },
  "fruit fly": {
    symptoms: "ফলে ছিদ্র, পচন এবং ভেতরে পোকার লার্ভা।",
    control: "আক্রান্ত ফল সংগ্রহ করুন এবং ফাঁদ ব্যবহার করুন।",
    pesticide: "সুপারিশকৃত বেইট পদ্ধতি ব্যবহার করুন।"
  },
  "leaf miner": {
    symptoms: "পাতার ভেতরে সাদা আঁকাবাঁকা সুড়ঙ্গ।",
    control: "আক্রান্ত পাতা অপসারণ করুন এবং স্টিকি ফাঁদ ব্যবহার করুন।",
    pesticide: "আক্রমণ বেশি হলে অনুমোদিত কীটনাশক ব্যবহার করুন।"
  },
  mite: {
    symptoms: "পাতা তামাটে হওয়া, কোঁকড়ানো এবং সূক্ষ্ম জাল।",
    control: "ধুলো কমিয়ে পর্যাপ্ত আর্দ্রতা বজায় রাখুন।",
    pesticide: "স্থানীয় সুপারিশ অনুযায়ী অনুমোদিত মাকড়নাশক ব্যবহার করুন।"
  }
};

const CATEGORY_BN = {
  "Crop Disease": "ফসলের রোগ",
  "Pest Attack": "পোকার আক্রমণ",
  Irrigation: "সেচ",
  "Market Price": "বাজার মূল্য",
  Fertilizer: "সার",
  General: "সাধারণ"
};

const IRRIGATION_STATUS_BN = {
  Scheduled: "নির্ধারিত",
  Active: "সক্রিয়",
  "Rain-fed": "বৃষ্টিনির্ভর",
  Paused: "স্থগিত"
};

const PRIORITY_BN = {
  medium: "মাঝারি",
  high: "বেশি",
  low: "কম"
};

const STATUS_BN = {
  open: "চলমান",
  done: "সম্পন্ন"
};

const COMPLAINT_REPLY_BN = {
  "Our support team will follow up soon.": "আমাদের সহায়তা দল শীঘ্রই যোগাযোগ করবে।"
};

const ALERT_BN = {
  "Some fields need attention because health is below 60%.":
    "কিছু জমির স্বাস্থ্য ৬০%-এর নিচে, তাই মনোযোগ প্রয়োজন।",
  "Open field tasks are still pending.": "মাঠের কিছু কাজ এখনো বাকি আছে।",
  "New farmer complaints require follow-up.": "কৃষকের নতুন অভিযোগে যোগাযোগ প্রয়োজন।",
  "Everything looks balanced. Keep the routine checks going.":
    "সবকিছু ভারসাম্যপূর্ণ দেখাচ্ছে। নিয়মিত পরিদর্শন চালিয়ে যান।"
};

const WEATHER_CONDITION_BN = {
  "Sunny intervals": "মাঝে মাঝে রোদ"
};


// ============================================================
// CROP IMAGE DATA
// ============================================================

const cropImageKeywords = {
  rice: "rice,paddy,field",
  wheat: "wheat,field,grain",
  maize: "corn,field,maize",
  jute: "jute,plant,green",
  potato: "potato,vegetable",
  tomato: "tomato,vegetable,red",
  eggplant: "eggplant,aubergine,vegetable",
  chili: "chili,pepper,red",
  okra: "okra,vegetable,green",
  cucumber: "cucumber,vegetable,green",
  "bottle gourd": "gourd,vegetable,green",
  pumpkin: "pumpkin,vegetable,orange",
  cauliflower: "cauliflower,vegetable,white",
  cabbage: "cabbage,vegetable,green",
  onion: "onion,vegetable",
  garlic: "garlic,vegetable",
  spinach: "spinach,leafy,greens",
  "red amaranth": "amaranth,leafy,greens",
  carrot: "carrot,vegetable,orange",
  radish: "radish,vegetable,white",
  bean: "green,beans,vegetable",
  pea: "green,peas,vegetable",
  banana: "banana,fruit,tree",
  mango: "mango,fruit,tropical",
  papaya: "papaya,fruit,tropical",
  watermelon: "watermelon,fruit,red"
};

const typeEmoji = {
  Cereal: "🌾",
  Fiber: "🌿",
  Vegetable: "🥬",
  "Leafy vegetable": "🥬",
  "Root vegetable": "🥕",
  "Pulse vegetable": "🫘",
  Fruit: "🍎",
  "Fruit vegetable": "🍉"
};

const cropWikiTitle = {
  rice: "Rice",
  wheat: "Wheat",
  maize: "Maize",
  jute: "Jute",
  potato: "Potato",
  tomato: "Tomato",
  eggplant: "Eggplant",
  chili: "Chili pepper",
  okra: "Okra",
  cucumber: "Cucumber",
  "bottle gourd": "Calabash",
  pumpkin: "Pumpkin",
  cauliflower: "Cauliflower",
  cabbage: "Cabbage",
  onion: "Onion",
  garlic: "Garlic",
  spinach: "Spinach",
  "red amaranth": "Amaranthus tricolor",
  carrot: "Carrot",
  radish: "Radish",
  bean: "Green bean",
  pea: "Pea",
  banana: "Banana",
  mango: "Mango",
  papaya: "Papaya",
  watermelon: "Watermelon"
};

const cropImageCache = {};


// ============================================================
// HELPER FUNCTIONS
// ============================================================

function isBn() {
  return state.lang === "bn";
}

function t(key) {
  const dict = translations[state.lang] || translations.en;
  return dict[key] !== undefined ? dict[key] : translations.en[key] || key;
}

function title(value) {
  return String(value || "")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function bnName(name) {
  const key = String(name || "").toLowerCase();
  return isBn() && CROP_NAME_BN[key] ? CROP_NAME_BN[key] : title(name);
}

function bnType(type) {
  return isBn() && TYPE_LABEL_BN[type] ? TYPE_LABEL_BN[type] : type;
}

// Handles single seasons ("Winter") and lists ("Aman, Aus, Boro", "Rabi, Kharif").
function bnSeason(season) {
  if (!isBn() || !season) return season;

  return String(season)
    .split(/\s*(?:,|&|\/)\s*/)
    .map((part) => SEASON_BN_LOWER[part.trim().toLowerCase()] || part)
    .join(", ");
}

function bnWater(water) {
  return isBn() && WATER_BN[water] ? WATER_BN[water] : water;
}

// dict keys must be lowercase (use DISEASE_BN_LOWER for diseases).
function bnList(list, dict) {
  return (list || []).map(
    (item) => (isBn() && dict[String(item).toLowerCase()]) || item
  );
}

function bnDuration(duration) {
  if (!isBn()) return duration;

  return String(duration || "")
    .replace(/Perennial/gi, "বহুবর্ষজীবী")
    .replace(/to fruiting/gi, "ফল ধরা পর্যন্ত")
    .replace(/months?/gi, "মাস")
    .replace(/days/gi, "দিন");
}

function bnSoil(cropName, fallback) {
  const key = String(cropName || "").toLowerCase();
  return isBn() && SOIL_BN[key] ? SOIL_BN[key] : fallback;
}

function bnPesticide(cropName, fallback) {
  const key = String(cropName || "").toLowerCase();
  return isBn() && PESTICIDE_BN[key] ? PESTICIDE_BN[key] : fallback;
}

function bnCare(cropName, fallback) {
  const key = String(cropName || "").toLowerCase();
  return isBn() && CARE_BN[key] ? CARE_BN[key] : fallback;
}

function bnPestGuideField(pestName, field, fallback) {
  const key = String(pestName || "").toLowerCase();

  return isBn() && PEST_GUIDE_BN[key] && PEST_GUIDE_BN[key][field]
    ? PEST_GUIDE_BN[key][field]
    : fallback;
}

function bnAdviceLine(line) {
  if (!isBn()) return line;

  const exact = ADVICE_LINE_BN.find(([en]) => en === line);
  if (exact) return exact[1];

  const match = String(line).match(
    /^(.*) is the best match from the current soil and weather profile\.$/
  );

  if (match) {
    return `বর্তমান মাটি ও আবহাওয়া পরিস্থিতিতে ${bnName(match[1])} সবচেয়ে উপযুক্ত ফসল।`;
  }

  return line;
}

function bnIssue(issue) {
  if (!isBn()) return issue;
  return (PADDY_BN[issue] && PADDY_BN[issue].issue) || ISSUE_BN[issue] || issue;
}

function bnSeverity(severity) {
  return isBn() && SEVERITY_BN[severity] ? SEVERITY_BN[severity] : severity;
}

function bnTreatment(issue, list) {
  if (!isBn()) return list || [];
  if (PADDY_BN[issue]) return PADDY_BN[issue].treatment;
  return TREATMENT_BN[issue] || list || [];
}

function bnPrevention(issue, fallback) {
  if (!isBn()) return fallback;
  if (PADDY_BN[issue]) return PADDY_BN[issue].prevention;
  return PREVENTION_BN[issue] || fallback;
}

function bnDisclaimer(fallback) {
  return isBn() ? SCAN_DISCLAIMER_BN : fallback;
}

function bnCategory(category) {
  return isBn() && CATEGORY_BN[category] ? CATEGORY_BN[category] : category;
}

function bnIrrigationStatus(status) {
  return isBn() && IRRIGATION_STATUS_BN[status]
    ? IRRIGATION_STATUS_BN[status]
    : status;
}

function bnPriority(priority) {
  const key = String(priority || "").toLowerCase();
  return isBn() && PRIORITY_BN[key] ? PRIORITY_BN[key] : priority;
}

function bnStatus(status) {
  return isBn() && STATUS_BN[status] ? STATUS_BN[status] : status;
}

function bnReply(reply) {
  return isBn() && COMPLAINT_REPLY_BN[reply] ? COMPLAINT_REPLY_BN[reply] : reply;
}

function bnAlert(alert) {
  return isBn() && ALERT_BN[alert] ? ALERT_BN[alert] : alert;
}

function bnWeatherCondition(condition) {
  return isBn() && WEATHER_CONDITION_BN[condition]
    ? WEATHER_CONDITION_BN[condition]
    : condition;
}


// ============================================================
// CROP IMAGE FUNCTIONS
// ============================================================

async function getCropImageUrl(cropName) {
  const key = String(cropName || "").toLowerCase();

  if (key in cropImageCache) {
    return cropImageCache[key];
  }

  const wikiTitle = cropWikiTitle[key];

  if (!wikiTitle) {
    cropImageCache[key] = null;
    return null;
  }

  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`
    );

    if (!response.ok) {
      throw new Error("Image lookup failed");
    }

    const data = await response.json();
    const url = data?.thumbnail?.source || data?.originalimage?.source || null;

    cropImageCache[key] = url;
    return url;
  } catch (error) {
    console.warn("Crop image lookup failed:", cropName);
    cropImageCache[key] = null;
    return null;
  }
}

function cropImgKey(cropName) {
  return String(cropName || "")
    .toLowerCase()
    .replace(/[^a-z0-9_-]/gi, "_");
}

function getCropEmoji(type) {
  return typeEmoji[type] || "🌱";
}


// ============================================================
// ELEMENTS
// ============================================================

const ELEMENT_IDS = [
  "heroScreen", "infoSection", "showcaseSection", "languageSelect",
  "dashLanguageSelect",
  "dashboardScreen", "menuToggleBtn", "getStartedBtn",
  "authModal", "authBackdrop", "closeAuthBtn", "authForm", "signupFields",
  "authTitle", "authKicker", "authSubmitBtn", "switchText", "switchAuthBtn",
  "authError", "forgotPasswordBtn", "resetFields", "confirmPasswordInput",
  "authRow", "socialRow", "passwordInput", "togglePasswordBtn",
  "logoutBtn", "dateText", "welcomeText",
  "sidebarBrandName", "sidebarBrandSub", "profileChipName", "profileChipSub",
  "weatherPill", "metricGrid", "fieldList", "allFieldList", "fieldCount",
  "alertList", "recentList", "scanList", "complaintSummaryList",
  "recommendForm", "recommendationResult",
  "farmForm", "taskForm", "taskList",
  "scannerForm", "scannerCropSelect", "leafImageInput", "leafPreview",
  "scannerResult",
  "cropSearchInput", "cropTypeSelect", "cropLibraryGrid", "pestGuideGrid",
  "complaintForm", "complaintList",
  "marketForm", "marketCropSelect", "marketList",
  "fertilizerForm", "fertilizerCropSelect", "fertilizerResult",
  "weatherLocationInput", "weatherRefreshBtn", "weatherAlertsContent",
  "financeForm", "financeSummaryGrid", "financeList",
  "calendarForm", "calendarCropSelect", "calendarResult",
  "contactForm", "hotlineList", "contactList",
  "subsidyGrid"
];

const elements = Object.fromEntries(
  ELEMENT_IDS.map((id) => [id, document.getElementById(id)])
);


// ============================================================
// EVENT LISTENERS
// ============================================================

function on(element, eventName, handler) {
  if (element) element.addEventListener(eventName, handler);
}

function setupEventListeners() {
  on(elements.languageSelect, "change", (event) =>
    applyLanguage(event.target.value)
  );

  on(elements.dashLanguageSelect, "change", (event) =>
    applyLanguage(event.target.value)
  );

  on(elements.getStartedBtn, "click", openAuth);
  on(elements.authBackdrop, "click", closeAuth);
  on(elements.closeAuthBtn, "click", closeAuth);

  on(elements.switchAuthBtn, "click", () => {
    // In reset mode the link always goes back to login.
    if (state.authMode === "reset") {
      setAuthMode("login");
    } else {
      switchAuthMode();
    }
  });

  on(elements.forgotPasswordBtn, "click", () => {
    setAuthMode(state.authMode === "reset" ? "login" : "reset");
  });

  on(elements.authForm, "submit", submitAuth);
  on(elements.togglePasswordBtn, "click", togglePassword);
  on(elements.logoutBtn, "click", logout);

  on(elements.menuToggleBtn, "click", () => {
    elements.dashboardScreen?.classList.toggle("sidebar-closed");
    elements.menuToggleBtn.classList.toggle("active");
  });

  on(elements.recommendForm, "submit", submitRecommendation);
  on(elements.farmForm, "submit", submitFarm);
  on(elements.taskForm, "submit", submitTask);
  on(elements.scannerForm, "submit", submitScanner);

  // This is the ONLY leaf image preview listener.
  on(elements.leafImageInput, "change", previewLeafImage);

  on(elements.cropSearchInput, "input", renderCropLibrary);
  on(elements.cropTypeSelect, "change", renderCropLibrary);

  on(elements.complaintForm, "submit", submitComplaint);
  on(elements.marketForm, "submit", submitMarketPrice);
  on(elements.fertilizerForm, "submit", submitFertilizerCalc);
  on(elements.weatherRefreshBtn, "click", loadWeather);
  on(elements.financeForm, "submit", submitFinance);
  on(elements.calendarForm, "submit", submitCalendar);
  on(elements.contactForm, "submit", submitContact);

  // One delegated listener for every row delete (✕) button, in any list.
  document.addEventListener("click", (event) => {
    const button = event.target.closest?.("[data-delete-id]");

    if (button) {
      deleteRecord(button.dataset.deleteKind, button.dataset.deleteId);
    }
  });

  document.querySelectorAll(".side-nav button").forEach((button) => {
    button.addEventListener("click", () => activateSection(button.dataset.section));
  });
}


// ============================================================
// LANGUAGE
// ============================================================

function renderDate() {
  if (!elements.dateText) return;

  elements.dateText.textContent = new Intl.DateTimeFormat(
    isBn() ? "bn-BD" : "en-BD",
    { weekday: "long", month: "long", day: "numeric", year: "numeric" }
  ).format(new Date());
}

function applyLanguage(lang) {
  state.lang = translations[lang] ? lang : "en";

  // Keep the hero dropdown and the dashboard dropdown in sync.
  if (elements.languageSelect) elements.languageSelect.value = state.lang;
  if (elements.dashLanguageSelect) elements.dashLanguageSelect.value = state.lang;

  const dict = translations[state.lang];

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (dict[key]) element.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-ph]").forEach((element) => {
    const key = element.getAttribute("data-i18n-ph");
    if (dict[key]) element.setAttribute("placeholder", dict[key]);
  });

  document.documentElement.setAttribute("lang", state.lang);

  try {
    localStorage.setItem("smartAgroLang", state.lang);
  } catch (error) {
    // Ignore storage errors.
  }

  renderDate();

  if (state.crops.length) {
    populateCropSelect();
    renderCropLibrary();
    renderPestGuide();
  }

  if (state.dashboard) {
    renderDashboard();
  }

  if (
    elements.authModal &&
    !elements.authModal.classList.contains("hidden")
  ) {
    switchAuthMode(true);
  }

  if (elements.leafPreview && !elements.leafImageInput?.files?.length) {
    resetLeafPreview();
  }
}


// ============================================================
// AUTH
// ============================================================

function openAuth() {
  if (!elements.authModal) return;

  // Always open on the clean login form.
  setAuthMode("login");

  elements.authModal.classList.remove("hidden");
  elements.authModal.setAttribute("aria-hidden", "false");
}

function closeAuth() {
  if (!elements.authModal) return;

  elements.authModal.classList.add("hidden");
  elements.authModal.setAttribute("aria-hidden", "true");
}

function setAuthMessage(message, type = "error") {
  if (!elements.authError) return;

  elements.authError.textContent = message || "";
  elements.authError.style.color =
    type === "success" ? "var(--green-700)" : "var(--danger)";
}

// Modes: "login" | "signup" | "reset"
function setAuthMode(mode) {
  state.authMode = mode;
  renderAuthMode();
}

function switchAuthMode(refreshOnly = false) {
  if (!refreshOnly) {
    state.authMode = state.authMode === "login" ? "signup" : "login";
  }

  renderAuthMode();
}

function renderAuthMode() {
  const signup = state.authMode === "signup";
  const reset = state.authMode === "reset";

  elements.signupFields?.classList.toggle("hidden", !signup);
  elements.resetFields?.classList.toggle("hidden", !reset);

  // "Remember me / Forgot password" row and the social buttons
  // make no sense on the reset form.
  elements.authRow?.classList.toggle("hidden", reset);
  elements.socialRow?.classList.toggle("hidden", reset);

  if (elements.passwordInput) {
    elements.passwordInput.placeholder = reset
      ? t("phNewPassword")
      : t("phPassword");

    elements.passwordInput.autocomplete =
      signup || reset ? "new-password" : "current-password";
  }

  if (elements.confirmPasswordInput) {
    elements.confirmPasswordInput.required = reset;

    if (!reset) {
      elements.confirmPasswordInput.value = "";
    }
  }

  if (elements.authTitle) {
    elements.authTitle.textContent = reset
      ? t("authTitleReset")
      : signup
      ? t("authTitleSignup")
      : t("authTitleLogin");
  }

  if (elements.authKicker) {
    elements.authKicker.textContent = reset
      ? t("authKickerReset")
      : signup
      ? t("authKickerSignup")
      : t("authKickerLogin");
  }

  if (elements.authSubmitBtn) {
    elements.authSubmitBtn.textContent = reset
      ? t("resetPasswordBtn")
      : signup
      ? t("signUpBtn")
      : t("signInBtn");
  }

  if (elements.switchText) {
    elements.switchText.textContent = reset
      ? t("rememberedPassword")
      : signup
      ? t("alreadyHaveAccount")
      : t("noAccount");
  }

  if (elements.switchAuthBtn) {
    elements.switchAuthBtn.textContent =
      reset || signup ? t("loginLink") : t("signUpLink");
  }

  if (elements.forgotPasswordBtn) {
    elements.forgotPasswordBtn.textContent = t("forgotPassword");
  }

  setAuthMessage("");
}

function togglePassword() {
  if (!elements.passwordInput) return;

  const isPassword = elements.passwordInput.type === "password";

  elements.passwordInput.type = isPassword ? "text" : "password";

  if (elements.togglePasswordBtn) {
    elements.togglePasswordBtn.textContent = isPassword ? "-" : "o";
  }
}

async function submitAuth(event) {
  event.preventDefault();

  setAuthMessage("");

  const formData = Object.fromEntries(
    new FormData(elements.authForm).entries()
  );

  // ----------------------------------------
  // FORGOT / RESET PASSWORD
  // ----------------------------------------
  if (state.authMode === "reset") {
    const email = String(formData.email || "").trim();
    const password = String(formData.password || "");
    const confirmPassword = String(formData.confirmPassword || "");

    if (!email) {
      setAuthMessage(t("errEmailRequired"));
      return;
    }

    if (password.length < 6) {
      setAuthMessage(t("errPasswordShort"));
      return;
    }

    if (password !== confirmPassword) {
      setAuthMessage(t("errPasswordMismatch"));
      return;
    }

    try {
      await api("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      // Back to login so the farmer can sign in straight away.
      setAuthMode("login");

      if (elements.passwordInput) {
        elements.passwordInput.value = "";
      }

      setAuthMessage(t("resetSuccess"), "success");
    } catch (error) {
      setAuthMessage(error.message);
    }

    return;
  }

  // ----------------------------------------
  // LOGIN / SIGNUP
  // ----------------------------------------
  const endpoint =
    state.authMode === "signup" ? "/api/auth/signup" : "/api/auth/login";

  try {
    const response = await api(endpoint, {
      method: "POST",
      body: JSON.stringify(formData)
    });

    state.token = response.token;
    state.user = response.user;

    localStorage.setItem("smartAgroToken", state.token);

    closeAuth();
    showDashboard();

    await loadDashboard();
  } catch (error) {
    setAuthMessage(error.message);
  }
}

function showDashboard() {
  elements.heroScreen?.classList.add("hidden");
  elements.infoSection?.classList.add("hidden");
  elements.showcaseSection?.classList.add("hidden");
  elements.dashboardScreen?.classList.remove("hidden");

  if (elements.welcomeText) {
    elements.welcomeText.textContent = `${t("welcomePrefix")} ${
      state.user?.name || ""
    }`;
  }

  // Standalone profile card in the topbar — separate from the
  // sidebar branding, which always stays "AgroSmart / Management".
  if (elements.profileChipName) {
    elements.profileChipName.textContent = state.user?.name || "";
  }

  if (elements.profileChipSub) {
    elements.profileChipSub.textContent = state.user?.phone || "";
  }
}

function logout() {
  state.token = null;
  state.user = null;
  state.dashboard = null;

  localStorage.removeItem("smartAgroToken");

  elements.dashboardScreen?.classList.add("hidden");
  elements.heroScreen?.classList.remove("hidden");
  elements.infoSection?.classList.remove("hidden");
  elements.showcaseSection?.classList.remove("hidden");

  if (elements.profileChipName) {
    elements.profileChipName.textContent = "";
  }

  if (elements.profileChipSub) {
    elements.profileChipSub.textContent = "";
  }
}


// ============================================================
// BOOT
// ============================================================

async function boot() {
  let savedLang = "en";

  try {
    savedLang = localStorage.getItem("smartAgroLang") || "en";
  } catch (error) {
    savedLang = "en";
  }

  if (elements.languageSelect) {
    elements.languageSelect.value = savedLang;
  }

  applyLanguage(savedLang);
  renderDate();

  try {
    await loadKnowledge();
  } catch (error) {
    console.error("Knowledge load failed:", error);

    if (elements.cropLibraryGrid) {
      elements.cropLibraryGrid.innerHTML = `<div class="empty-state">${escapeHtml(
        t("knowledgeUnavailable")
      )}</div>`;
    }

    if (elements.pestGuideGrid) {
      elements.pestGuideGrid.innerHTML = `<div class="empty-state">${escapeHtml(
        t("pestRefUnavailable")
      )}</div>`;
    }
  }

  if (window.matchMedia("(max-width: 980px)").matches) {
    elements.dashboardScreen?.classList.add("sidebar-closed");
  }

  if (!state.token) return;

  try {
    const response = await api("/api/auth/me");

    state.user = response.user;

    showDashboard();

    await loadDashboard();
  } catch (error) {
    localStorage.removeItem("smartAgroToken");

    state.token = null;
    state.user = null;
  }
}


// ============================================================
// KNOWLEDGE
// ============================================================

async function loadKnowledge() {
  const [cropResponse, pestResponse] = await Promise.all([
    api("/api/library/crops"),
    api("/api/library/pests")
  ]);

  state.crops = cropResponse.crops || [];
  state.pests = pestResponse.pests || [];

  populateCropSelect();
  renderCropLibrary();
  renderPestGuide();
}

function populateCropSelect() {
  const optionsHtml = state.crops
    .map(
      (crop) =>
        `<option value="${escapeHtml(crop.name)}">${escapeHtml(
          bnName(crop.name)
        )}</option>`
    )
    .join("");

  [
    elements.scannerCropSelect,
    elements.marketCropSelect,
    elements.fertilizerCropSelect,
    elements.calendarCropSelect
  ].forEach((select) => {
    if (select) select.innerHTML = optionsHtml;
  });
}


// ============================================================
// DASHBOARD
// ============================================================

async function loadDashboard() {
  state.dashboard = await api("/api/dashboard");
  renderDashboard();
}

function emptyState(key) {
  return `<div class="empty-state">${escapeHtml(t(key))}</div>`;
}

function renderDashboard() {
  const dashboard = state.dashboard;

  if (!dashboard) return;

  if (elements.weatherPill && dashboard.weather) {
    elements.weatherPill.textContent = `☀️ ${dashboard.weather.temperature}°C | ${
      dashboard.weather.humidity
    }% ${isBn() ? "আর্দ্রতা" : "humidity"} | ${bnWeatherCondition(
      dashboard.weather.condition
    )}`;
  }

  const metrics = [
    ["🌾", t("metricFields"), dashboard.metrics?.fields ?? 0],
    ["📐", t("metricTotalAcre"), dashboard.metrics?.totalArea ?? 0],
    ["💚", t("metricAvgHealth"), `${dashboard.metrics?.avgHealth ?? 0}%`],
    ["✅", t("metricOpenTasks"), dashboard.metrics?.openTasks ?? 0],
    ["📢", t("metricComplaints"), dashboard.metrics?.openComplaints ?? 0],
    ["🩺", t("metricLeafScans"), dashboard.metrics?.scans ?? 0]
  ];

  if (elements.metricGrid) {
    elements.metricGrid.innerHTML = metrics
      .map(
        ([icon, label, value]) =>
          `<article class="metric">
            <span class="metric-ic">${icon}</span>
            <span>${escapeHtml(label)}</span>
            <strong>${escapeHtml(value)}</strong>
          </article>`
      )
      .join("");
  }

  const farms = dashboard.farms || [];

  if (elements.fieldList) {
    elements.fieldList.innerHTML = renderFields(farms);
  }

  if (elements.allFieldList) {
    elements.allFieldList.innerHTML = renderFields(farms);
  }

  if (elements.fieldCount) {
    elements.fieldCount.textContent = `${farms.length} ${t("fieldsCountSuffix")}`;
  }

  if (elements.alertList) {
    elements.alertList.innerHTML = (dashboard.alerts || [])
      .map(
        (alert) =>
          `<div class="alert-item">${escapeHtml(bnAlert(alert))}</div>`
      )
      .join("");
  }

  if (elements.recentList) {
    elements.recentList.innerHTML = dashboard.recommendations?.length
      ? dashboard.recommendations.map(renderRecent).join("")
      : emptyState("noRecommendationHistory");
  }

  if (elements.scanList) {
    elements.scanList.innerHTML = dashboard.scans?.length
      ? dashboard.scans.map(renderScanSummary).join("")
      : emptyState("noLeafScansYet");
  }

  if (elements.complaintSummaryList) {
    elements.complaintSummaryList.innerHTML = dashboard.complaints?.length
      ? dashboard.complaints.map(renderComplaintSummary).join("")
      : emptyState("noComplaintsYet");
  }

  if (elements.taskList) {
    elements.taskList.innerHTML = dashboard.tasks?.length
      ? dashboard.tasks.map(renderTask).join("")
      : emptyState("noTasksYet");
  }

  if (elements.complaintList) {
    elements.complaintList.innerHTML = dashboard.complaints?.length
      ? dashboard.complaints.map(renderComplaint).join("")
      : emptyState("noComplaintsYet");
  }

  bindDashboardButtons();
}

function bindDashboardButtons() {
  document.querySelectorAll("[data-complete-task]").forEach((button) => {
    button.addEventListener("click", () =>
      completeTask(button.dataset.completeTask)
    );
  });

  document.querySelectorAll("[data-delete-task]").forEach((button) => {
    button.addEventListener("click", () =>
      deleteRecord("tasks", button.dataset.deleteTask)
    );
  });

}

function deleteButton(kind, id) {
  return `
    <button
      class="row-delete"
      type="button"
      title="${escapeHtml(t("deleteLabel"))}"
      aria-label="${escapeHtml(t("deleteLabel"))}"
      data-delete-kind="${escapeHtml(kind)}"
      data-delete-id="${escapeHtml(id)}"
    >&#10005;</button>
  `;
}

function renderFields(farms) {
  if (!farms.length) {
    return emptyState("noFieldsYet");
  }

  return farms
    .map((farm) => {
      const health = Math.max(0, Math.min(100, Number(farm.health) || 0));

      return `
        <article class="field-item">
          <div class="field-main">
            <div>
              <strong>${escapeHtml(farm.name)}</strong>
              <span>
                ${escapeHtml(farm.crop)} |
                ${escapeHtml(farm.soilType)} |
                ${escapeHtml(farm.area)}
                ${escapeHtml(t("acreWord"))}
              </span>
            </div>

            <span>${escapeHtml(bnIrrigationStatus(farm.irrigationStatus))}</span>

            ${deleteButton("farms", farm.id)}
          </div>

          <div class="health-bar" aria-label="Health ${health}%">
            <i style="width:${health}%"></i>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderRecent(item) {
  return `
    <article class="recent-item">
      <div class="recent-body">
        <strong>${escapeHtml(bnName(item.primaryCrop))}</strong>
        <span>
          ${escapeHtml(item.confidence)}% ${escapeHtml(t("confidenceWord"))}
          |
          ${new Date(item.createdAt).toLocaleDateString()}
        </span>
      </div>

      ${deleteButton("recommendations", item.id)}
    </article>
  `;
}

function renderScanSummary(item) {
  return `
    <article class="recent-item">
      <div class="recent-body">
        <strong>${escapeHtml(bnIssue(item.issue))}</strong>
        <span>
          ${escapeHtml(bnName(item.crop))}
          |
          ${escapeHtml(item.confidence)}%
          |
          ${escapeHtml(bnSeverity(item.severity))}
        </span>
      </div>

      ${deleteButton("scans", item.id)}
    </article>
  `;
}

function renderComplaintSummary(item) {
  return `
    <article class="recent-item">
      <div class="recent-body">
        <strong>${escapeHtml(item.subject)}</strong>
        <span>
          ${escapeHtml(bnCategory(item.category))}
          |
          ${escapeHtml(bnStatus(item.status))}
        </span>
      </div>

      ${deleteButton("complaints", item.id)}
    </article>
  `;
}

function renderComplaint(item) {
  return `
    <article class="complaint-item">
      <span class="complaint-status">${escapeHtml(bnStatus(item.status))}</span>

      ${deleteButton("complaints", item.id)}

      <h3>${escapeHtml(item.subject)}</h3>

      <p>${escapeHtml(item.message)}</p>

      <p>
        <strong>${isBn() ? "বিভাগ:" : "Category:"}</strong>
        ${escapeHtml(bnCategory(item.category))}
        |
        <strong>${isBn() ? "ফসল:" : "Crop:"}</strong>
        ${escapeHtml(
          item.crop ? bnName(item.crop) : isBn() ? "প্রযোজ্য নয়" : "N/A"
        )}
        |
        <strong>${isBn() ? "অগ্রাধিকার:" : "Priority:"}</strong>
        ${escapeHtml(bnPriority(item.priority))}
      </p>

      <p>
        <strong>${isBn() ? "উত্তর:" : "Reply:"}</strong>
        ${escapeHtml(bnReply(item.reply))}
      </p>
    </article>
  `;
}

function renderTask(task) {
  return `
    <article class="task-item ${task.status === "done" ? "done" : ""}">
      <div class="task-main">
        <div>
          <strong>${escapeHtml(task.title)}</strong>
          <span>
            ${escapeHtml(task.dueDate)}
            |
            ${escapeHtml(bnPriority(task.priority))}
          </span>
        </div>

        <div class="task-actions">
          ${
            task.status === "done"
              ? `<span>${escapeHtml(t("doneLabel"))}</span>`
              : `<button data-complete-task="${escapeHtml(task.id)}" type="button">
                  ${escapeHtml(t("doneLabel"))}
                </button>`
          }

          <button
            class="danger-btn"
            data-delete-task="${escapeHtml(task.id)}"
            type="button"
          >
            ${escapeHtml(t("deleteLabel"))}
          </button>
        </div>
      </div>
    </article>
  `;
}


// ============================================================
// SECTION NAVIGATION
// ============================================================

function activateSection(section) {
  document.querySelectorAll(".side-nav button").forEach((button) => {
    button.classList.toggle("active", button.dataset.section === section);
  });

  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.dataset.view === section);
  });

  if (section === "market") loadMarketPrices();
  if (section === "weather") loadWeather();
  if (section === "finance") loadFinance();
  if (section === "contacts") loadContacts();
  if (section === "subsidy") renderSubsidy();
}


// ============================================================
// CROP RECOMMENDATION
// ============================================================

async function submitRecommendation(event) {
  event.preventDefault();

  const formData = Object.fromEntries(
    new FormData(elements.recommendForm).entries()
  );

  try {
    const response = await api("/api/recommendations/crop", {
      method: "POST",
      body: JSON.stringify(formData)
    });

    renderRecommendation(response.recommendation);

    await loadDashboard();
  } catch (error) {
    if (elements.recommendationResult) {
      elements.recommendationResult.innerHTML = `<div class="empty-state">${escapeHtml(
        error.message
      )}</div>`;
    }
  }
}

function renderRecommendation(result) {
  if (!result) return;

  const primary = result.primary || {};

  if (!elements.recommendationResult) return;

  elements.recommendationResult.innerHTML = `
    <div class="result-hero">
      <span>${escapeHtml(t("bestCropMatch"))}</span>

      <h3>${escapeHtml(bnName(primary.crop))}</h3>

      <p>
        ${escapeHtml(primary.confidence)}% ${escapeHtml(t("confidenceWord"))}
        |
        ${escapeHtml(bnSeason(primary.season))}
        |
        ${escapeHtml(bnWater(primary.water))} ${escapeHtml(t("waterWord"))}
      </p>
      ${
        primary.notes
          ? `<p>${escapeHtml(bnModelNote(primary.crop, primary.notes))}</p>`
          : ""
      }
    </div>

    <div class="crop-grid">
      ${(result.alternatives || [])
        .map(
          (crop) => `
            <article class="crop-card">
              <strong>${escapeHtml(bnName(crop.crop))}</strong>
              <span>
                ${escapeHtml(crop.confidence)}%
                |
                ${escapeHtml(bnSeason(crop.season))}
              </span>
            </article>
          `
        )
        .join("")}
    </div>

    <h3>${escapeHtml(t("adviceHeading"))}</h3>

    <ul class="advice-list">
      ${(result.advice || [])
        .map((item) => `<li>${escapeHtml(bnAdviceLine(item))}</li>`)
        .join("")}
    </ul>
  `;
}


// ============================================================
// LEAF IMAGE PREVIEW
// ============================================================

let leafPreviewUrl = null;

function previewLeafImage() {
  const file = elements.leafImageInput?.files?.[0];

  // Remove old preview URL
  if (leafPreviewUrl) {
    URL.revokeObjectURL(leafPreviewUrl);
    leafPreviewUrl = null;
  }

  // No file
  if (!file) {
    resetLeafPreview();
    return;
  }

  // Image validation
  if (!file.type.startsWith("image/")) {
    alert(
      isBn()
        ? "দয়া করে একটি সঠিক ছবির ফাইল নির্বাচন করুন।"
        : "Please select a valid image file."
    );

    elements.leafImageInput.value = "";
    resetLeafPreview();
    return;
  }

  // Maximum 10 MB
  if (file.size > 10 * 1024 * 1024) {
    alert(
      isBn()
        ? "ছবির আকার সর্বোচ্চ ১০ MB হতে পারে।"
        : "Image size must be less than 10 MB."
    );

    elements.leafImageInput.value = "";
    resetLeafPreview();
    return;
  }

  // Create preview
  leafPreviewUrl = URL.createObjectURL(file);

  if (elements.leafPreview) {
    elements.leafPreview.innerHTML = `
      <img
        src="${leafPreviewUrl}"
        alt="Leaf preview"
        class="leaf-preview-image"
      />
    `;

    elements.leafPreview.classList.add("show");
  }
}

function resetLeafPreview() {
  if (!elements.leafPreview) return;

  elements.leafPreview.classList.remove("show");

  elements.leafPreview.innerHTML = `
    <span>${escapeHtml(t("uploadLeafHint"))}</span>
  `;
}


// ============================================================
// LEAF SCANNER
// ============================================================

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = String(reader.result || "");
      // Strip the "data:image/jpeg;base64," prefix — the API wants raw base64.
      const commaIndex = result.indexOf(",");
      resolve(commaIndex >= 0 ? result.slice(commaIndex + 1) : result);
    };

    reader.onerror = () => reject(new Error("File read failed"));
    reader.readAsDataURL(file);
  });
}

function showScannerMessage(en, bn) {
  elements.scannerResult.innerHTML = `
    <div class="empty-state">${escapeHtml(isBn() ? bn : en)}</div>
  `;
}

async function submitScanner(event) {
  event.preventDefault();

  if (!elements.scannerResult) return;

  // Loading state
  showScannerMessage("Analyzing leaf image...", "পাতা বিশ্লেষণ করা হচ্ছে...");

  const file = elements.leafImageInput?.files?.[0];

  // File required
  if (!file) {
    showScannerMessage(
      "Please upload a leaf image first.",
      "দয়া করে একটি পাতার ছবি আপলোড করুন।"
    );
    return;
  }

  // Validate file
  if (!file.type.startsWith("image/")) {
    showScannerMessage(
      "Please select a valid image file.",
      "দয়া করে একটি সঠিক image file নির্বাচন করুন।"
    );
    return;
  }

  // Validate size
  if (file.size > 10 * 1024 * 1024) {
    showScannerMessage(
      "Image size must be less than 10 MB.",
      "ছবির আকার সর্বোচ্চ ১০ MB হতে পারে।"
    );
    return;
  }

  const formData = new FormData(elements.scannerForm);

  // Convert the image to base64 so the vision model can actually see it.
  let imageBase64;

  try {
    imageBase64 = await fileToBase64(file);
  } catch (error) {
    showScannerMessage(
      "Could not read the image file. Please try again.",
      "ছবি পড়তে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
    );
    return;
  }

  const scannerData = {
    crop: formData.get("crop") || "",
    imageBase64,
    mimeType: file.type || "image/jpeg",
    imageName: file.name,
    notes: formData.get("notes") || "",
    symptoms: formData.getAll("symptoms")
  };

  try {
    const response = await api("/api/scanner/leaf", {
      method: "POST",
      body: JSON.stringify(scannerData)
    });

    if (!response?.result) {
      throw new Error(
        isBn()
          ? "স্ক্যানারের কোনো ফলাফল পাওয়া যায়নি।"
          : "No scanner result was returned."
      );
    }

    renderScannerResult(response.result);

    await loadDashboard();
  } catch (error) {
    console.error("Leaf scanner error:", error);

    elements.scannerResult.innerHTML = `
      <div class="empty-state">
        ${escapeHtml(
          error.message ||
            (isBn() ? "পাতা স্ক্যান করতে সমস্যা হয়েছে।" : "Leaf scanning failed.")
        )}
      </div>
    `;
  }
}

function pestLabel(name) {
  return (isBn() && PEST_BN[String(name).toLowerCase()]) || name;
}

function diseaseLabel(name) {
  return (isBn() && DISEASE_BN_LOWER[String(name).toLowerCase()]) || name;
}

function renderScannerResult(result) {
  if (!elements.scannerResult) return;

  const cropRisks = result.cropRisks || {};
  const pests = cropRisks.pests || [];
  const diseases = cropRisks.diseases || [];
  const pestHints = result.pestHints || [];
  const visibleSymptoms = result.visibleSymptoms || [];
  const treatment = bnTreatment(result.issue, result.treatment);

  elements.scannerResult.innerHTML = `
    <section class="diagnosis-card">

      <div class="diagnosis-head">
        <span>
          ${escapeHtml(bnName(result.crop))}
          |
          ${escapeHtml(result.confidence)}% ${escapeHtml(t("confidenceWord"))}
          |
          ${escapeHtml(bnSeverity(result.severity))}
        </span>

        <h3>${escapeHtml(bnIssue(result.issue))}</h3>
      </div>

      <div class="tag-row">
        ${pests
          .map((item) => `<span class="tag">${escapeHtml(pestLabel(item))}</span>`)
          .join("")}

        ${diseases
          .map((item) => `<span class="tag">${escapeHtml(diseaseLabel(item))}</span>`)
          .join("")}
      </div>

      ${
        result.reasoning || visibleSymptoms.length
          ? `<article class="crop-card">
              <strong>${escapeHtml(t("observedHeading"))}</strong>

              ${
                visibleSymptoms.length
                  ? `<div class="tag-row">
                      ${visibleSymptoms
                        .map((item) => `<span class="tag">${escapeHtml(item)}</span>`)
                        .join("")}
                    </div>`
                  : ""
              }

              ${result.reasoning ? `<p>${escapeHtml(result.reasoning)}</p>` : ""}
            </article>`
          : ""
      }

      <article class="crop-card">
        <strong>${escapeHtml(t("treatmentHeading"))}</strong>

        <ul class="advice-list">
          ${treatment.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>

      <article class="crop-card">
        <strong>${escapeHtml(t("preventionHeading"))}</strong>

        <p>${escapeHtml(bnPrevention(result.issue, result.prevention))}</p>

        ${
          result.cropRisks
            ? `<p>
                <strong>${escapeHtml(t("pesticideNoteLabel"))}</strong>
                ${escapeHtml(bnPesticide(result.crop, result.cropRisks.pesticide))}
              </p>`
            : ""
        }
      </article>

      ${
        pestHints.length
          ? `<article class="crop-card">
              <strong>${escapeHtml(t("possiblePestMatches"))}</strong>

              ${pestHints
                .map(
                  (pest) => `
                    <p>
                      <strong>${escapeHtml(pestLabel(pest.pest))}:</strong>
                      ${escapeHtml(bnPestGuideField(pest.pest, "control", pest.control))}
                      ${escapeHtml(bnPestGuideField(pest.pest, "pesticide", pest.pesticide))}
                    </p>
                  `
                )
                .join("")}
            </article>`
          : ""
      }

      ${
        result.predictions?.length > 1
          ? `<article class="crop-card">
              <strong>${escapeHtml(isBn() ? "অন্যান্য সম্ভাবনা" : "Other possibilities")}</strong>
              <div class="tag-row">
                ${result.predictions
                  .slice(1, 3)
                  .map(
                    (p) =>
                      `<span class="tag">${escapeHtml(diseaseLabel(p.issue))} ${escapeHtml(
                        Math.round(p.confidence)
                      )}%</span>`
                  )
                  .join("")}
              </div>
            </article>`
          : ""
      }

      <p>${escapeHtml(bnDisclaimer(result.disclaimer))}</p>

    </section>
  `;
}


// ============================================================
// CROP LIBRARY
// ============================================================

function renderCropLibrary() {
  if (!elements.cropLibraryGrid) return;

  const search =
    elements.cropSearchInput?.value.trim().toLowerCase() || "";

  const type = elements.cropTypeSelect?.value.trim().toLowerCase() || "";

  const crops = state.crops.filter((crop) => {
    const text = `${crop.name} ${crop.type} ${crop.pests || []} ${
      crop.diseases || []
    }`.toLowerCase();

    return (
      (!search || text.includes(search)) &&
      (!type || String(crop.type || "").toLowerCase().includes(type))
    );
  });

  elements.cropLibraryGrid.innerHTML = crops.length
    ? crops.map(renderCropCard).join("")
    : emptyState("noCropMatched");

  loadCropThumbnails(crops);
}

async function loadCropThumbnails(crops) {
  for (const crop of crops) {
    try {
      const url = await getCropImageUrl(crop.name);

      if (!url) continue;

      const thumb = elements.cropLibraryGrid?.querySelector(
        `.crop-thumb[data-crop="${cropImgKey(crop.name)}"]`
      );

      if (thumb) {
        thumb.style.backgroundImage = `url("${url}")`;

        thumb
          .querySelector(".crop-thumb-emoji")
          ?.classList.add("hidden");
      }
    } catch (error) {
      console.warn("Thumbnail error:", error);
    }
  }
}

function renderCropCard(crop) {
  return `
    <article class="crop-card with-image">

      <div class="crop-thumb" data-crop="${escapeHtml(cropImgKey(crop.name))}">
        <span class="crop-thumb-emoji">${getCropEmoji(crop.type)}</span>
      </div>

      <div class="crop-card-body">

        <h3>${escapeHtml(bnName(crop.name))}</h3>

        <div class="crop-meta">
          <span>${escapeHtml(bnType(crop.type))}</span>
          <span>${escapeHtml(bnSeason(crop.season))}</span>
          <span>${escapeHtml(bnWater(crop.water))} ${escapeHtml(t("waterWord"))}</span>
          <span>${escapeHtml(bnDuration(crop.duration))}</span>
        </div>

        <p>
          <strong>${escapeHtml(t("soilLabel"))}</strong>
          ${escapeHtml(bnSoil(crop.name, crop.soil))}
        </p>

        <p>
          <strong>${escapeHtml(t("pestsLabel"))}</strong>
          ${bnList(crop.pests, PEST_BN).map(escapeHtml).join(", ")}
        </p>

        <p>
          <strong>${escapeHtml(t("diseasesLabel"))}</strong>
          ${bnList(crop.diseases, DISEASE_BN_LOWER).map(escapeHtml).join(", ")}
        </p>

        <p>
          <strong>${escapeHtml(t("pesticideLabel"))}</strong>
          ${escapeHtml(bnPesticide(crop.name, crop.pesticide))}
        </p>

        <p>${escapeHtml(bnCare(crop.name, crop.care))}</p>

      </div>

    </article>
  `;
}


// ============================================================
// PEST GUIDE
// ============================================================

function renderPestGuide() {
  if (!elements.pestGuideGrid) return;

  elements.pestGuideGrid.innerHTML = state.pests
    .map(
      (pest) => `
        <article class="pest-card">

          <h3>${escapeHtml(pestLabel(pest.pest))}</h3>

          <p>
            <strong>${escapeHtml(t("cropsLabel"))}</strong>
            ${bnList(pest.crops, CROP_NAME_BN).map(escapeHtml).join(", ")}
          </p>

          <p>
            <strong>${escapeHtml(t("symptomsLabel"))}</strong>
            ${escapeHtml(bnPestGuideField(pest.pest, "symptoms", pest.symptoms))}
          </p>

          <p>
            <strong>${escapeHtml(t("controlLabel"))}</strong>
            ${escapeHtml(bnPestGuideField(pest.pest, "control", pest.control))}
          </p>

          <p>
            <strong>${escapeHtml(t("pesticideLabel"))}</strong>
            ${escapeHtml(bnPestGuideField(pest.pest, "pesticide", pest.pesticide))}
          </p>

        </article>
      `
    )
    .join("");
}


// ============================================================
// FARM / TASK / COMPLAINT FORMS
// ============================================================

function formToObject(form) {
  return Object.fromEntries(new FormData(form).entries());
}

async function submitFarm(event) {
  event.preventDefault();

  try {
    await api("/api/farms", {
      method: "POST",
      body: JSON.stringify(formToObject(elements.farmForm))
    });

    elements.farmForm.reset();

    await loadDashboard();
  } catch (error) {
    console.error("Farm submission error:", error);
    alert(error.message);
  }
}

async function submitTask(event) {
  event.preventDefault();

  try {
    await api("/api/tasks", {
      method: "POST",
      body: JSON.stringify(formToObject(elements.taskForm))
    });

    elements.taskForm.reset();

    await loadDashboard();
  } catch (error) {
    console.error("Task submission error:", error);
    alert(error.message);
  }
}

async function completeTask(taskId) {
  try {
    await api(`/api/tasks/${encodeURIComponent(taskId)}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "done" })
    });

    await loadDashboard();
  } catch (error) {
    console.error("Complete task error:", error);
    alert(error.message);
  }
}

async function deleteRecord(kind, id) {
  if (!kind || !id) return;

  if (!window.confirm(t("confirmDelete"))) return;

  const endpoint = kind === "scans" ? "/api/scans" : `/api/${kind}`;

  try {
    await api(`${endpoint}/${encodeURIComponent(id)}`, { method: "DELETE" });

    // Market / finance / contacts have their own lists.
    if (kind === "market-prices") {
      await loadMarketPrices();
    } else if (kind === "finance") {
      await loadFinance();
    } else if (kind === "contacts") {
      await loadContacts();
    } else {
      await loadDashboard();
    }
  } catch (error) {
    console.error("Delete error:", error);
    alert(error.message);
  }
}

async function submitComplaint(event) {
  event.preventDefault();

  try {
    await api("/api/complaints", {
      method: "POST",
      body: JSON.stringify(formToObject(elements.complaintForm))
    });

    elements.complaintForm.reset();

    await loadDashboard();
  } catch (error) {
    console.error("Complaint submission error:", error);
    alert(error.message);
  }
}


// ============================================================
// MARKET PRICE TRACKER
// ============================================================

function loadingHtml() {
  return `<div class="empty-state">${escapeHtml(
    isBn() ? "লোড হচ্ছে..." : "Loading..."
  )}</div>`;
}

async function loadMarketPrices() {
  if (!elements.marketList) return;

  elements.marketList.innerHTML = loadingHtml();

  try {
    const response = await api("/api/market-prices");
    renderMarketList(response.marketPrices || []);
  } catch (error) {
    elements.marketList.innerHTML = `<div class="empty-state">${escapeHtml(
      error.message
    )}</div>`;
  }
}

function renderMarketList(items) {
  if (!elements.marketList) return;

  if (!items.length) {
    elements.marketList.innerHTML = emptyState("noMarketPricesYet");
    return;
  }

  elements.marketList.innerHTML = items
    .map(
      (item) => `
        <article class="recent-item">
          <div class="recent-body">
            <strong>${escapeHtml(bnName(item.crop))} — ${escapeHtml(
        item.price
      )} ${escapeHtml(item.unit)}</strong>
            <span>
              ${escapeHtml(
                item.market || (isBn() ? "স্থান উল্লেখ নেই" : "No market noted")
              )}
              |
              ${escapeHtml(item.recordedAt)}
              ${item.notes ? `| ${escapeHtml(item.notes)}` : ""}
            </span>
          </div>
          ${deleteButton("market-prices", item.id)}
        </article>
      `
    )
    .join("");

}

async function submitMarketPrice(event) {
  event.preventDefault();

  try {
    await api("/api/market-prices", {
      method: "POST",
      body: JSON.stringify(formToObject(elements.marketForm))
    });

    elements.marketForm.reset();

    await loadMarketPrices();
  } catch (error) {
    console.error("Market price submission error:", error);
    alert(error.message);
  }
}


// ============================================================
// FERTILIZER CALCULATOR
// ============================================================

async function submitFertilizerCalc(event) {
  event.preventDefault();

  if (!elements.fertilizerResult) return;

  elements.fertilizerResult.innerHTML = `<div class="empty-state">${escapeHtml(
    isBn() ? "হিসাব করা হচ্ছে..." : "Calculating..."
  )}</div>`;

  try {
    const response = await api("/api/fertilizer/calculate", {
      method: "POST",
      body: JSON.stringify(formToObject(elements.fertilizerForm))
    });

    renderFertilizerResult(response.result);
  } catch (error) {
    elements.fertilizerResult.innerHTML = `<div class="empty-state">${escapeHtml(
      error.message
    )}</div>`;
  }
}

function renderFertilizerResult(result) {
  if (!elements.fertilizerResult || !result) return;

  const card = (name, key) => `
    <article class="crop-card">
      <strong>${name}</strong>
      <span>${escapeHtml(t("perAcreLabel"))}: ${escapeHtml(result.perAcre[key])} kg</span>
      <span>${escapeHtml(t("totalLabel"))}: ${escapeHtml(result.totals[key])} kg</span>
    </article>
  `;

  elements.fertilizerResult.innerHTML = `
    <div class="result-hero">
      <span>${escapeHtml(t("fertilizerResultHeading"))}</span>
      <h3>${escapeHtml(bnName(result.crop))} — ${escapeHtml(result.area)} ${escapeHtml(
    t("acreWord")
  )}</h3>
    </div>

    <div class="crop-grid">
      ${card("Urea", "urea")}
      ${card("TSP", "tsp")}
      ${card("MoP", "mop")}
    </div>

    ${
      result.isGeneric
        ? `<p class="empty-state" style="min-height:auto;padding:12px;">${escapeHtml(
            t("fertilizerGenericNote")
          )}</p>`
        : ""
    }

    ${result.note ? `<p>${escapeHtml(result.note)}</p>` : ""}

    <p>${escapeHtml(t("fertilizerDisclaimer"))}</p>
  `;
}


// ============================================================
// WEATHER ALERTS
// Real forecast via Open-Meteo (free, no API key). Rule-based
// farming advisories are generated from the forecast values.
// ============================================================

async function loadWeather() {
  if (!elements.weatherAlertsContent) return;

  const query =
    (elements.weatherLocationInput?.value || "").trim() ||
    (state.user?.location || "").trim() ||
    "Dhaka";

  if (elements.weatherLocationInput && !elements.weatherLocationInput.value) {
    elements.weatherLocationInput.value = query;
  }

  elements.weatherAlertsContent.innerHTML = `<div class="empty-state">${escapeHtml(
    t("weatherLoadingState")
  )}</div>`;

  try {
    const searchName = query.split(",")[0].trim() || "Dhaka";
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?count=1&language=en&format=json&name=${encodeURIComponent(
        searchName
      )}`
    );
    const geoData = await geoRes.json();
    const place = geoData?.results?.[0];

    if (!place) {
      elements.weatherAlertsContent.innerHTML = `<div class="empty-state">${escapeHtml(
        isBn()
          ? "এই অবস্থান পাওয়া যায়নি। অন্য নাম লিখে চেষ্টা করুন।"
          : "Location not found. Try another place name."
      )}</div>`;
      return;
    }

    const lat = place.latitude;
    const lon = place.longitude;
    const placeName = `${place.name}${place.country ? ", " + place.country : ""}`;

    const forecastRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=auto&forecast_days=4`
    );
    const forecast = await forecastRes.json();

    renderWeather(placeName, forecast);
  } catch (error) {
    console.error("Weather fetch failed:", error);
    elements.weatherAlertsContent.innerHTML = `<div class="empty-state">${escapeHtml(
      isBn()
        ? "আবহাওয়া তথ্য আনা যায়নি। আবার চেষ্টা করুন।"
        : "Could not fetch weather. Please try again."
    )}</div>`;
  }
}

function buildWeatherAdvisories(current, daily) {
  const advisories = [];
  const rainProb = daily?.precipitation_probability_max?.[0] ?? 0;
  const maxTemp = daily?.temperature_2m_max?.[0] ?? current?.temperature_2m ?? 0;
  const humidity = current?.relative_humidity_2m ?? 0;
  const wind = current?.wind_speed_10m ?? 0;

  if (rainProb >= 70) {
    advisories.push(
      isBn()
        ? "আগামী কয়েকদিনে ভারী বৃষ্টির সম্ভাবনা — জমিতে পানি নিষ্কাশনের ব্যবস্থা প্রস্তুত রাখুন।"
        : "High chance of heavy rain in the coming days — keep field drainage ready to avoid waterlogging."
    );
  } else if (rainProb <= 15 && maxTemp >= 33) {
    advisories.push(
      isBn()
        ? "বৃষ্টির সম্ভাবনা কম এবং তাপমাত্রা বেশি — সেচের ব্যবস্থা প্রস্তুত রাখুন।"
        : "Low rain chance with high temperature — plan for irrigation."
    );
  }

  if (humidity >= 85) {
    advisories.push(
      isBn()
        ? "আর্দ্রতা বেশি — ছত্রাকজনিত রোগের ঝুঁকি বাড়তে পারে, নিয়মিত পাতা পর্যবেক্ষণ করুন।"
        : "High humidity — increased risk of fungal disease, monitor leaves closely."
    );
  }

  if (wind >= 30) {
    advisories.push(
      isBn()
        ? "বাতাসের গতি বেশি — ছোট চারা ও মাচায় লাগানো গাছ সাপোর্ট দিয়ে রাখুন।"
        : "Strong winds expected — stake or support young/climbing plants."
    );
  }

  if (!advisories.length) {
    advisories.push(
      isBn()
        ? "বর্তমান আবহাওয়া পরিস্থিতি স্বাভাবিক দেখাচ্ছে।"
        : "Current weather conditions look normal."
    );
  }

  return advisories;
}

function renderWeather(placeName, forecast) {
  if (!elements.weatherAlertsContent) return;

  const current = forecast?.current || {};
  const daily = forecast?.daily || {};
  const advisories = buildWeatherAdvisories(current, daily);

  const days = (daily.time || []).slice(0, 4).map((date, index) => ({
    date,
    max: daily.temperature_2m_max?.[index],
    min: daily.temperature_2m_min?.[index],
    rain: daily.precipitation_probability_max?.[index] ?? 0
  }));

  elements.weatherAlertsContent.innerHTML = `
    <div class="result-hero">
      <span>${escapeHtml(placeName)}</span>
      <h3>${escapeHtml(current.temperature_2m ?? "--")}°C</h3>
      <p>
        ${escapeHtml(isBn() ? "আর্দ্রতা" : "Humidity")}: ${escapeHtml(
    current.relative_humidity_2m ?? "--"
  )}%
        |
        ${escapeHtml(isBn() ? "বাতাস" : "Wind")}: ${escapeHtml(
    current.wind_speed_10m ?? "--"
  )} km/h
      </p>
    </div>

    <div class="tag-row" style="margin:16px 0;">
      ${days
        .map(
          (day) =>
            `<span class="tag">${escapeHtml(day.date)}: ${escapeHtml(
              day.min
            )}–${escapeHtml(day.max)}°C, ☔${escapeHtml(day.rain)}%</span>`
        )
        .join("")}
    </div>

    <div class="crop-grid">
      ${advisories
        .map(
          (item) =>
            `<article class="crop-card"><span>⚠️ ${escapeHtml(item)}</span></article>`
        )
        .join("")}
    </div>

    <p>
      ${escapeHtml(
        isBn()
          ? "তথ্যসূত্র: Open-Meteo পূর্বাভাস। এটি সাধারণ পূর্বাভাস, স্থানীয় পরিস্থিতি ভিন্ন হতে পারে।"
          : "Source: Open-Meteo forecast. This is general guidance — local conditions may vary."
      )}
    </p>
  `;
}


// ============================================================
// FARM EXPENSE / INCOME TRACKER
// ============================================================

async function loadFinance() {
  if (!elements.financeList) return;

  elements.financeList.innerHTML = loadingHtml();

  try {
    const response = await api("/api/finance");
    renderFinance(response.entries || []);
  } catch (error) {
    elements.financeList.innerHTML = `<div class="empty-state">${escapeHtml(
      error.message
    )}</div>`;
  }
}

function renderFinance(items) {
  const sumOf = (type) =>
    items
      .filter((item) => item.type === type)
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const income = sumOf("income");
  const expense = sumOf("expense");
  const net = income - expense;

  if (elements.financeSummaryGrid) {
    elements.financeSummaryGrid.innerHTML = `
      <article class="metric">
        <span>${escapeHtml(t("totalIncomeLabel"))}</span>
        <strong>৳${escapeHtml(income.toFixed(0))}</strong>
      </article>
      <article class="metric">
        <span>${escapeHtml(t("totalExpenseLabel"))}</span>
        <strong>৳${escapeHtml(expense.toFixed(0))}</strong>
      </article>
      <article class="metric">
        <span>${escapeHtml(t("netProfitLabel"))}</span>
        <strong>৳${escapeHtml(net.toFixed(0))}</strong>
      </article>
    `;
  }

  if (!elements.financeList) return;

  if (!items.length) {
    elements.financeList.innerHTML = emptyState("noFinanceYet");
    return;
  }

  elements.financeList.innerHTML = items
    .map(
      (item) => `
        <article class="recent-item">
          <div class="recent-body">
            <strong>${item.type === "income" ? "🟢" : "🔴"} ${escapeHtml(
        item.category
      )} — ৳${escapeHtml(item.amount)}</strong>
            <span>
              ${escapeHtml(item.date)}
              ${item.notes ? `| ${escapeHtml(item.notes)}` : ""}
            </span>
          </div>
          ${deleteButton("finance", item.id)}
        </article>
      `
    )
    .join("");

}

async function submitFinance(event) {
  event.preventDefault();

  try {
    await api("/api/finance", {
      method: "POST",
      body: JSON.stringify(formToObject(elements.financeForm))
    });

    elements.financeForm.reset();

    await loadFinance();
  } catch (error) {
    console.error("Finance submission error:", error);
    alert(error.message);
  }
}


// ============================================================
// CROP CALENDAR / REMINDERS
// Purely computed from each crop's known duration; milestones
// can be pushed straight into the existing Tasks board.
// ============================================================

function parseDurationDays(durationStr) {
  if (!durationStr) return null;

  const str = String(durationStr).toLowerCase();

  if (str.includes("perennial")) return null;

  const numbers = (str.match(/\d+(\.\d+)?/g) || []).map(Number);

  if (!numbers.length) return null;

  const avg = numbers.reduce((sum, n) => sum + n, 0) / numbers.length;

  return str.includes("month") ? Math.round(avg * 30) : Math.round(avg);
}

const CALENDAR_MILESTONES = [
  { pct: 0, en: "Land preparation & sowing/transplanting", bn: "জমি প্রস্তুতি ও বীজ বপন/রোপণ" },
  { pct: 0.15, en: "First fertilizer top-dress + early pest scouting", bn: "প্রথম সার প্রয়োগ + পোকামাকড় পর্যবেক্ষণ" },
  { pct: 0.35, en: "Weeding & irrigation check", bn: "নিড়ানি ও সেচ পরীক্ষা" },
  { pct: 0.55, en: "Second fertilizer top-dress + disease scouting", bn: "দ্বিতীয় সার প্রয়োগ + রোগ পর্যবেক্ষণ" },
  { pct: 0.8, en: "Pre-harvest field check", bn: "ফসল তোলার আগে জমি পরীক্ষা" },
  { pct: 1, en: "Expected harvest window", bn: "প্রত্যাশিত ফসল তোলার সময়" }
];

function generateCropCalendar(cropName, plantingDateStr) {
  const crop = state.crops.find(
    (item) => item.name.toLowerCase() === String(cropName).toLowerCase()
  );

  const durationDays = parseDurationDays(crop?.duration) || 100;
  const plantingDate = new Date(plantingDateStr);

  return CALENDAR_MILESTONES.map((step) => {
    const date = new Date(plantingDate.getTime());
    date.setDate(date.getDate() + Math.round(durationDays * step.pct));

    return {
      date: date.toISOString().slice(0, 10),
      title: isBn() ? step.bn : step.en,
      titleEn: step.en
    };
  });
}

function submitCalendar(event) {
  event.preventDefault();

  const formData = formToObject(elements.calendarForm);

  if (!formData.crop || !formData.plantingDate) return;

  const milestones = generateCropCalendar(formData.crop, formData.plantingDate);
  renderCalendarResult(formData.crop, milestones);
}

function renderCalendarResult(cropName, milestones) {
  if (!elements.calendarResult) return;

  elements.calendarResult.innerHTML = `
    <div class="result-hero">
      <span>${escapeHtml(t("calendarHeading"))}</span>
      <h3>${escapeHtml(bnName(cropName))}</h3>
    </div>

    <div class="task-list" style="margin-top:16px;">
      ${milestones
        .map(
          (step) => `
            <article class="task-item">
              <div class="task-main">
                <div>
                  <strong>${escapeHtml(step.title)}</strong>
                  <span>${escapeHtml(step.date)}</span>
                </div>
                <div class="task-actions">
                  <button
                    type="button"
                    data-add-calendar-task
                    data-title="${escapeHtml(step.titleEn)}"
                    data-date="${escapeHtml(step.date)}"
                  >${escapeHtml(t("addAsTaskBtn"))}</button>
                </div>
              </div>
            </article>
          `
        )
        .join("")}
    </div>

    <p>${escapeHtml(t("calendarDisclaimer"))}</p>
  `;

  elements.calendarResult
    .querySelectorAll("[data-add-calendar-task]")
    .forEach((button) => {
      button.addEventListener("click", () =>
        addCalendarTask(button.dataset.title, button.dataset.date)
      );
    });
}

async function addCalendarTask(taskTitle, dueDate) {
  try {
    await api("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title: taskTitle, dueDate, priority: "medium" })
    });

    alert(isBn() ? "কাজ তালিকায় যুক্ত হয়েছে।" : "Added to your task list.");
  } catch (error) {
    alert(error.message);
  }
}


// ============================================================
// EXTENSION OFFICER CONTACTS
// ============================================================

async function loadContacts() {
  renderHotlineList();

  if (!elements.contactList) return;

  elements.contactList.innerHTML = loadingHtml();

  try {
    const response = await api("/api/contacts");
    renderContactList(response.contacts || []);
  } catch (error) {
    elements.contactList.innerHTML = `<div class="empty-state">${escapeHtml(
      error.message
    )}</div>`;
  }
}

function renderHotlineList() {
  if (!elements.hotlineList) return;

  const hotlines = [
    {
      name: isBn() ? "কৃষি কল সেন্টার (DAE)" : "Krishi Call Center (DAE)",
      number: "16123",
      hours: isBn()
        ? "শুক্রবার ও সরকারি ছুটি ছাড়া, সকাল ৯টা - বিকাল ৫টা"
        : "9am–5pm, except Fridays & govt holidays"
    },
    {
      name: isBn() ? "জাতীয় কল সেন্টার" : "National Call Center",
      number: "333",
      hours: "24/7"
    },
    {
      name: isBn() ? "কৃষক বন্ধু ফোন সেবা" : "Krishak Bandhu Phone Seba",
      number: "3331",
      hours: isBn() ? "কর্মদিবসে" : "Business hours"
    }
  ];

  elements.hotlineList.innerHTML = hotlines
    .map(
      (item) => `
        <article class="recent-item">
          <div class="recent-body">
            <strong>${escapeHtml(item.name)} — ${escapeHtml(item.number)}</strong>
            <span>${escapeHtml(item.hours)}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function renderContactList(items) {
  if (!elements.contactList) return;

  if (!items.length) {
    elements.contactList.innerHTML = emptyState("noContactsYet");
    return;
  }

  elements.contactList.innerHTML = items
    .map(
      (item) => `
        <article class="recent-item">
          <div class="recent-body">
            <strong>${escapeHtml(item.name)}${
        item.role ? ` — ${escapeHtml(item.role)}` : ""
      }</strong>
            <span>
              📞 ${escapeHtml(item.phone)}
              ${item.area ? `| ${escapeHtml(item.area)}` : ""}
            </span>
          </div>
          ${deleteButton("contacts", item.id)}
        </article>
      `
    )
    .join("");

}

async function submitContact(event) {
  event.preventDefault();

  try {
    await api("/api/contacts", {
      method: "POST",
      body: JSON.stringify(formToObject(elements.contactForm))
    });

    elements.contactForm.reset();

    await loadContacts();
  } catch (error) {
    console.error("Contact submission error:", error);
    alert(error.message);
  }
}


// ============================================================
// GOVERNMENT SUBSIDY & SCHEMES
// Static reference content. Farmers should confirm current
// status locally since scheme details/eligibility change.
// ============================================================

const SUBSIDY_SCHEMES = [
  {
    en: {
      title: "Farmer Card (Krishak Card)",
      body: "One-time cash assistance (around Tk 2,500) plus access to subsidised fertiliser, seeds, machinery, low-interest loans and crop insurance for eligible landless, marginal and small farmers. Rolling out upazila by upazila."
    },
    bn: {
      title: "কৃষক কার্ড (ফার্মার কার্ড)",
      body: "যোগ্য ভূমিহীন, প্রান্তিক ও ক্ষুদ্র কৃষকদের জন্য এককালীন প্রায় ২,৫০০ টাকা সহায়তা, ভর্তুকিমূল্যে সার/বীজ, কৃষিযন্ত্র, স্বল্প সুদে ঋণ ও ফসল বীমার সুযোগ। ধাপে ধাপে উপজেলা অনুযায়ী চালু হচ্ছে।"
    }
  },
  {
    en: {
      title: "Subsidised Fertiliser",
      body: "Government supplies Urea, TSP, MoP and DAP at subsidised prices through registered dealers to keep input costs manageable for farmers."
    },
    bn: {
      title: "ভর্তুকিমূল্যে সার",
      body: "ইউরিয়া, টিএসপি, এমওপি ও ডিএপি সার নিবন্ধিত ডিলারদের মাধ্যমে ভর্তুকিমূল্যে সরবরাহ করা হয়, যাতে কৃষকের উৎপাদন খরচ নিয়ন্ত্রণে থাকে।"
    }
  },
  {
    en: {
      title: "Agricultural Loan Waiver",
      body: "Agricultural loans up to Tk 10,000 (including interest) have been waived for eligible farmers under a rehabilitation programme."
    },
    bn: {
      title: "কৃষি ঋণ মওকুফ",
      body: "একটি পুনর্বাসন কর্মসূচির আওতায় যোগ্য কৃষকদের ১০,০০০ টাকা পর্যন্ত কৃষি ঋণ (সুদ সহ) মওকুফ করা হয়েছে।"
    }
  },
  {
    en: {
      title: "Low-Interest Crop Loans",
      body: "4% interest loans are available for pulses, oilseeds, spices and maize cultivation, and 5% interest loans in hill districts through Bangladesh Krishi Bank."
    },
    bn: {
      title: "স্বল্প সুদে ফসল ঋণ",
      body: "ডাল, তেলবীজ, মসলা ও ভুট্টা চাষের জন্য ৪% সুদে ঋণ, এবং পাহাড়ি জেলাগুলোতে বাংলাদেশ কৃষি ব্যাংকের মাধ্যমে ৫% সুদে ঋণ পাওয়া যায়।"
    }
  },
  {
    en: {
      title: "Free Seed & Fertiliser Distribution",
      body: "Under the agricultural rehabilitation and incentive programme, free seeds, fertilisers and pesticides are periodically distributed to small and marginal farmers, especially after natural disasters."
    },
    bn: {
      title: "বিনামূল্যে বীজ ও সার বিতরণ",
      body: "কৃষি পুনর্বাসন ও উৎসাহ কর্মসূচির আওতায় ক্ষুদ্র ও প্রান্তিক কৃষকদের মধ্যে, বিশেষ করে প্রাকৃতিক দুর্যোগের পর, নিয়মিত বিরতিতে বিনামূল্যে বীজ, সার ও কীটনাশক বিতরণ করা হয়।"
    }
  }
];

function renderSubsidy() {
  if (!elements.subsidyGrid) return;

  const cards = SUBSIDY_SCHEMES.map((scheme) => {
    const content = isBn() ? scheme.bn : scheme.en;

    return `
      <article class="crop-card">
        <h3>${escapeHtml(content.title)}</h3>
        <p>${escapeHtml(content.body)}</p>
      </article>
    `;
  }).join("");

  elements.subsidyGrid.innerHTML = `
    ${cards}
    <article class="crop-card">
      <p>${escapeHtml(t("subsidyDisclaimer"))}</p>
    </article>
  `;
}


// ============================================================
// API HELPER
// ============================================================

async function api(path, options = {}) {
  let response;

  try {
    const headers = {
      ...(state.token ? { Authorization: `Bearer ${state.token}` } : {}),
      ...(options.headers || {})
    };

    // Do NOT set application/json for FormData.
    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    response = await fetch(path, { ...options, headers });
  } catch (error) {
    console.error("API connection error:", error);

    throw new Error(
      "Cannot connect to the AgroSmart API. Make sure the backend server is running."
    );
  }

  const contentType = response.headers.get("content-type") || "";

  let payload = {};

  if (contentType.includes("application/json")) {
    payload = await response.json().catch(() => ({}));
  } else {
    const text = await response.text().catch(() => "");
    payload = text ? { message: text } : {};
  }

  if (!response.ok) {
    throw new Error(
      payload.message || payload.error || `Request failed (${response.status})`
    );
  }

  return payload;
}


// ============================================================
// START APPLICATION
// ============================================================

setupEventListeners();
boot();
