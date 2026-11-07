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
  scanHistory: [],
  openReportId: null,
  liveWeather: null,
  lang: "en"
};

// Last result drawn by each result panel, so a language switch can redraw it.
const lastRender = {};


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
    navScanHistory: "Scan History",
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
    symEye: "Eye-shaped spots",
    symMargin: "Leaf edges yellow/drying",
    symSheath: "Gray lesions on stem base",
    symTall: "Tall thin plant / roots at node",
    symTwisted: "Twisted leaves / stuck panicle",
    symOrange: "Orange-yellow stunted plant",
    symBalls: "Orange/green balls on grains",
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
    statusLabel: "Status",
    severityLabel: "Severity:",
    scanHistoryHeading: "Scan History",
    noScanHistoryYet: "No scans yet. Your scanned leaves will appear here.",
    modelResultLabel: "AI model",
    keywordResultLabel: "Keyword guess",
    lowConfLabel: "Low confidence",
    matchLabel: "match",
    symptomsChosenLabel: "Symptoms selected",
    noteLabel: "Note",
    otherPossLabel: "Other possibilities",
    reportTitle: "Leaf Scan Report",
    backToHistory: "← Back to history",
    printReportBtn: "Print / Save PDF",
    reportIdLabel: "Report ID",
    scannedOnLabel: "Scanned on",
    photoLabel: "Scanned photo",
    openReportLink: "View full report",
    accuracyHeading: "Accuracy & reliability indicators",
    confScoreLabel: "Confidence score",
    reliabilityLabel: "Reliability level",
    bandHigh: "High",
    bandMid: "Medium",
    bandLow: "Low",
    bandScaleNote: "Bands: below 60% = Low, 60–84% = Medium, 85% and above = High.",
    sourceLabel: "Result source",
    sourceModelDesc: "AI image model (MobileNetV2, 224×224 px, rice conditions) analysed your photo.",
    sourceVisionDesc: "A vision AI looked at your photo and chose among 14 rice conditions (or said it could not tell). Its certainty is a rough level, not a measured accuracy.",
    sourceKeywordDesc: "Keyword rules matched your crop, symptoms and note. The photo itself was NOT analysed by AI.",
    marginLabel: "Gap to 2nd guess",
    pointsWord: "pts",
    marginClear: "Clear winner",
    marginMod: "Moderate",
    marginNarrow: "Narrow — could be confused with the 2nd guess",
    valAccLabel: "Model validation accuracy",
    notRecorded: "Not recorded",
    notApplicable: "Not applicable",
    inputsLabel: "Inputs used",
    inPhoto: "Photo",
    inSymptoms: "symptoms",
    inNote: "note",
    interpHigh: "The result is strongly supported. Still confirm before using any chemical.",
    interpMid: "The result is plausible but not certain. Check the other possibilities and confirm locally.",
    interpLow: "The result is uncertain. Treat it only as a hint and retake the photo.",
    kwHeuristicNote: "Keyword confidence is a rough estimate that rises with each matching keyword. It is not a measured accuracy.",
    confDisclaimerNote: "Confidence is the model's own certainty for this photo, not a guaranteed accuracy rate.",
    possibilitiesHeading: "Ranked possibilities",
    noAlternatives: "No alternative guesses were recorded for this scan.",
    inputsHeading: "Your inputs",
    noInputsNote: "No extra symptoms or note were added.",
    cropRisksHeading: "Common risks for this crop",
    nextStepsHeading: "Recommended next steps",
    nsRetake: "Retake the photo in daylight with one leaf filling the frame, then scan again.",
    nsConfirm: "Confirm the diagnosis with your local agriculture officer (Krishi Call Center 16123) before using any chemical.",
    nsMonitor: "Re-scan the same plant after 3–5 days to see whether symptoms are spreading.",
    nsTreat: "Start the listed treatment steps and remove or isolate badly affected leaves.",
    statTotal: "Total scans",
    statAvg: "Average confidence",
    statModel: "AI-model scans",
    statLow: "Low-confidence scans",
    statTop: "Most frequent issue"
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
    navScanHistory: "স্ক্যান ইতিহাস",
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
    symEye: "চোখের মতো দাগ",
    symMargin: "পাতার কিনারা হলুদ/শুকিয়ে যাওয়া",
    symSheath: "গোড়ার খোলে ধূসর দাগ",
    symTall: "লম্বা চিকন গাছ / গিঁটে শিকড়",
    symTwisted: "পাতা পাকানো / শীষ বের হয় না",
    symOrange: "কমলা-হলুদ খর্বাকৃতি গাছ",
    symBalls: "দানায় কমলা/সবুজ গুটি",
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
    statusLabel: "অবস্থা",
    severityLabel: "ঝুঁকি:",
    scanHistoryHeading: "স্ক্যান ইতিহাস",
    noScanHistoryYet: "এখনও কোনো স্ক্যান নেই। স্ক্যান করা পাতাগুলো এখানে দেখা যাবে।",
    modelResultLabel: "AI মডেল",
    keywordResultLabel: "লক্ষণভিত্তিক অনুমান",
    lowConfLabel: "কম নির্ভরযোগ্যতা",
    matchLabel: "মিল",
    symptomsChosenLabel: "নির্বাচিত লক্ষণ",
    noteLabel: "নোট",
    otherPossLabel: "অন্যান্য সম্ভাবনা",
    reportTitle: "পাতা স্ক্যান রিপোর্ট",
    backToHistory: "← ইতিহাসে ফিরুন",
    printReportBtn: "প্রিন্ট / PDF সংরক্ষণ",
    reportIdLabel: "রিপোর্ট আইডি",
    scannedOnLabel: "স্ক্যানের সময়",
    photoLabel: "স্ক্যান করা ছবি",
    openReportLink: "পূর্ণ রিপোর্ট দেখুন",
    accuracyHeading: "নির্ভুলতা ও নির্ভরযোগ্যতার নির্দেশক",
    confScoreLabel: "নির্ভরযোগ্যতার স্কোর",
    reliabilityLabel: "নির্ভরযোগ্যতার স্তর",
    bandHigh: "বেশি",
    bandMid: "মাঝারি",
    bandLow: "কম",
    bandScaleNote: "স্তর: ৬০%-এর নিচে = কম, ৬০–৮৪% = মাঝারি, ৮৫% ও তার বেশি = বেশি।",
    sourceLabel: "ফলাফলের উৎস",
    sourceModelDesc: "AI ছবি-মডেল (MobileNetV2, ২২৪×২২৪ পিক্সেল, ১০টি ধানের অবস্থা) আপনার ছবি বিশ্লেষণ করেছে।",
    sourceVisionDesc: "একটি ভিশন AI আপনার ছবি দেখে ১৪টি ধানের অবস্থার মধ্য থেকে বেছে নিয়েছে (অথবা বলেছে নিশ্চিত নয়)। নির্ভরযোগ্যতা একটি মোটামুটি স্তর, পরিমাপ করা নির্ভুলতা নয়।",
    sourceKeywordDesc: "ফসল, লক্ষণ ও নোটের কীওয়ার্ড মিলিয়ে অনুমান করা হয়েছে। ছবিটি AI দিয়ে বিশ্লেষণ করা হয়নি।",
    marginLabel: "দ্বিতীয় অনুমান থেকে ব্যবধান",
    pointsWord: "পয়েন্ট",
    marginClear: "স্পষ্ট ফলাফল",
    marginMod: "মাঝারি",
    marginNarrow: "সংকীর্ণ — দ্বিতীয় অনুমানের সাথে গুলিয়ে যেতে পারে",
    valAccLabel: "মডেলের যাচাইকৃত নির্ভুলতা",
    notRecorded: "রেকর্ড করা নেই",
    notApplicable: "প্রযোজ্য নয়",
    inputsLabel: "ব্যবহৃত তথ্য",
    inPhoto: "ছবি",
    inSymptoms: "টি লক্ষণ",
    inNote: "নোট",
    interpHigh: "ফলাফলটি যথেষ্ট নির্ভরযোগ্য। তবুও রাসায়নিক ব্যবহারের আগে নিশ্চিত হয়ে নিন।",
    interpMid: "ফলাফলটি সম্ভাব্য, তবে নিশ্চিত নয়। অন্য সম্ভাবনাগুলো দেখুন এবং স্থানীয়ভাবে নিশ্চিত হন।",
    interpLow: "ফলাফলটি অনিশ্চিত। এটিকে শুধু ইঙ্গিত ভাবুন এবং আবার ছবি তুলে স্ক্যান করুন।",
    kwHeuristicNote: "কীওয়ার্ডভিত্তিক স্কোর একটি মোটামুটি অনুমান, যা প্রতিটি মিলে যাওয়া কীওয়ার্ডে বাড়ে। এটি পরিমাপ করা নির্ভুলতা নয়।",
    confDisclaimerNote: "নির্ভরযোগ্যতার স্কোর এই ছবির জন্য মডেলের নিজের নিশ্চয়তা, কোনো নিশ্চিত নির্ভুলতার হার নয়।",
    possibilitiesHeading: "সম্ভাবনার ক্রম",
    noAlternatives: "এই স্ক্যানে অন্য কোনো অনুমান সংরক্ষিত নেই।",
    inputsHeading: "আপনার দেওয়া তথ্য",
    noInputsNote: "অতিরিক্ত কোনো লক্ষণ বা নোট দেওয়া হয়নি।",
    cropRisksHeading: "এই ফসলের সাধারণ ঝুঁকি",
    nextStepsHeading: "পরবর্তী করণীয়",
    nsRetake: "দিনের আলোতে একটি পাতা ফ্রেম ভরে ছবি তুলে আবার স্ক্যান করুন।",
    nsConfirm: "কোনো রাসায়নিক ব্যবহারের আগে স্থানীয় কৃষি কর্মকর্তার (কৃষি কল সেন্টার ১৬১২৩) সাথে নিশ্চিত হন।",
    nsMonitor: "লক্ষণ ছড়াচ্ছে কিনা দেখতে ৩–৫ দিন পর একই গাছ আবার স্ক্যান করুন।",
    nsTreat: "উল্লিখিত চিকিৎসার ধাপ শুরু করুন এবং মারাত্মক আক্রান্ত পাতা সরিয়ে ফেলুন বা আলাদা করুন।",
    statTotal: "মোট স্ক্যান",
    statAvg: "গড় নির্ভরযোগ্যতা",
    statModel: "AI মডেল স্ক্যান",
    statLow: "কম নির্ভরযোগ্য স্ক্যান",
    statTop: "সবচেয়ে বেশি পাওয়া সমস্যা"
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

// ============================================================
// Bangla translations for scan treatment / prevention sentences.
// Keyword-scanner results (all non-rice crops and rice fallback) use these.
// ============================================================
const SCAN_SENTENCE_BN = {
  "Ufra is caused by a nematode: remove and destroy infected plants, stubble and ratoon rice.": "উফরা রোগ নেমাটোড (কৃমি) থেকে হয়: আক্রান্ত গাছ, নাড়া ও গজানো ধান তুলে নষ্ট করুন।",
  "Drain and dry the field after harvest and avoid moving water or plants from infected fields.": "ফসল কাটার পর জমি শুকিয়ে নিন এবং আক্রান্ত জমির পানি বা গাছ অন্য জমিতে নেবেন না।",
  "Ask a local agriculture officer about nematode management; do not apply a pesticide without local advice.": "নেমাটোড দমনের বিষয়ে স্থানীয় কৃষি কর্মকর্তার পরামর্শ নিন; স্থানীয় পরামর্শ ছাড়া কীটনাশক দেবেন না।",
  "Cut and destroy infected panicles carefully (bag them first) so spores do not scatter.": "আক্রান্ত শীষ আগে ব্যাগে ঢেকে সাবধানে কেটে নষ্ট করুন, যাতে স্পোর ছড়িয়ে না পড়ে।",
  "Avoid excess nitrogen fertilizer.": "অতিরিক্ত নাইট্রোজেন সার দেওয়া এড়িয়ে চলুন।",
  "A preventive fungicide at booting/heading may be advised in high-risk seasons - confirm with a local agriculture officer.": "ঝুঁকিপূর্ণ মৌসুমে থোড়/শীষ বের হওয়ার সময় প্রতিরোধমূলক ছত্রাকনাশক লাগতে পারে - স্থানীয় কৃষি কর্মকর্তার সাথে নিশ্চিত হয়ে নিন।",
  "Remove heavily infected leaves.": "মারাত্মক আক্রান্ত পাতা তুলে ফেলুন।",
  "Spray wettable sulfur or potassium bicarbonate in early stage.": "শুরুর দিকে ওয়েটেবল সালফার বা পটাশিয়াম বাইকার্বনেট স্প্রে করুন।",
  "Use hexaconazole/propiconazole only when disease spreads.": "রোগ ছড়াতে থাকলেই কেবল হেক্সাকোনাজল/প্রোপিকোনাজল ব্যবহার করুন।",
  "Remove infected leaves and reduce leaf wetness.": "আক্রান্ত পাতা সরিয়ে ফেলুন এবং পাতা ভেজা থাকার সময় কমান।",
  "Use metalaxyl + mancozeb or cymoxanil mixture where locally recommended.": "স্থানীয়ভাবে সুপারিশ থাকলে মেটালাক্সিল + ম্যানকোজেব বা সাইমোক্সানিল মিশ্রণ ব্যবহার করুন।",
  "Do not save seed from infected plants.": "আক্রান্ত গাছ থেকে বীজ সংরক্ষণ করবেন না।",
  "Drain the field and avoid excess standing water around the base.": "জমির পানি বের করে দিন এবং গোড়ায় অতিরিক্ত পানি জমতে দেবেন না।",
  "Remove and destroy severely infected leaves/plants.": "মারাত্মক আক্রান্ত পাতা/গাছ তুলে নষ্ট করে ফেলুন।",
  "Apply copper-based bactericide or streptocycline where locally approved.": "স্থানীয়ভাবে অনুমোদিত হলে তামাভিত্তিক ব্যাকটেরিয়ানাশক বা স্ট্রেপ্টোসাইক্লিন ব্যবহার করুন।",
  "Remove and destroy infected tillers/panicles.": "আক্রান্ত কুশি/শীষ তুলে নষ্ট করুন।",
  "Avoid excess nitrogen; balance fertilizer application.": "অতিরিক্ত নাইট্রোজেন এড়িয়ে চলুন; সুষম সার দিন।",
  "Apply tricyclazole or isoprothiolane fungicide after confirmation.": "রোগ নিশ্চিত হওয়ার পর ট্রাইসাইক্লাজল বা আইসোপ্রোথিওলেন ছত্রাকনাশক প্রয়োগ করুন।",
  "Improve soil fertility, especially potassium.": "মাটির উর্বরতা, বিশেষ করে পটাশিয়াম বাড়ান।",
  "Remove and burn infected straw/stubble after harvest.": "ফসল কাটার পর আক্রান্ত খড়/নাড়া পুড়িয়ে ফেলুন।",
  "Apply mancozeb or propiconazole if the infection is severe.": "সংক্রমণ মারাত্মক হলে ম্যানকোজেব বা প্রোপিকোনাজল প্রয়োগ করুন।",
  "Avoid dense planting and excess nitrogen.": "ঘন রোপণ ও অতিরিক্ত নাইট্রোজেন এড়িয়ে চলুন।",
  "Drain the field periodically to lower humidity near the base.": "গোড়ার আর্দ্রতা কমাতে মাঝে মাঝে জমির পানি শুকিয়ে দিন।",
  "Apply hexaconazole or validamycin where necessary.": "প্রয়োজনে হেক্সাকোনাজল বা ভ্যালিডামাইসিন প্রয়োগ করুন।",
  "Remove and destroy infected hills as early as possible.": "আক্রান্ত গুছি যত দ্রুত সম্ভব তুলে নষ্ট করুন।",
  "Control the leafhopper vector population.": "বাহক পাতা ফড়িংয়ের সংখ্যা নিয়ন্ত্রণ করুন।",
  "There is no cure once a plant is infected — focus on prevention and vector control.": "একবার আক্রান্ত হলে আর প্রতিকার নেই — প্রতিরোধ ও বাহক পোকা দমনে মনোযোগ দিন।",
  "Remove and destroy abnormally tall, thin seedlings.": "অস্বাভাবিক লম্বা ও সরু চারা তুলে নষ্ট করুন।",
  "Use hot-water seed treatment before sowing.": "বপনের আগে গরম পানিতে বীজ শোধন করুন।",
  "Apply a recommended seed-treatment fungicide.": "সুপারিশকৃত বীজ শোধনের ছত্রাকনাশক ব্যবহার করুন।",
  "Remove and destroy severely infected plants/heads.": "মারাত্মক আক্রান্ত গাছ/শীষ তুলে নষ্ট করুন।",
  "Avoid late sowing, which raises blast risk.": "দেরিতে বপন এড়িয়ে চলুন, কারণ এতে ব্লাস্টের ঝুঁকি বাড়ে।",
  "Apply a triazole fungicide (e.g. tebuconazole) at early heading if confirmed.": "রোগ নিশ্চিত হলে শীষ বের হওয়ার শুরুতে ট্রায়াজোল ছত্রাকনাশক (যেমন টেবুকোনাজল) প্রয়োগ করুন।",
  "Remove volunteer wheat plants nearby.": "আশপাশের স্বেচ্ছায় গজানো গম গাছ তুলে ফেলুন।",
  "Apply propiconazole or tebuconazole at first sign of infection.": "রোগের প্রথম লক্ষণ দেখা দিলেই প্রোপিকোনাজল বা টেবুকোনাজল প্রয়োগ করুন।",
  "Monitor the field regularly during humid weather.": "আর্দ্র আবহাওয়ায় নিয়মিত জমি পর্যবেক্ষণ করুন।",
  "Remove and destroy infected earheads before spores are released.": "স্পোর ছড়ানোর আগেই আক্রান্ত শীষ তুলে নষ্ট করুন।",
  "Use a systemic seed-treatment fungicide next season.": "আগামী মৌসুমে আন্তঃপ্রবাহী (সিস্টেমিক) বীজ শোধনের ছত্রাকনাশক ব্যবহার করুন।",
  "Avoid using seed from an infected field.": "আক্রান্ত জমির বীজ ব্যবহার করবেন না।",
  "Avoid using infected grain as seed.": "আক্রান্ত দানা বীজ হিসেবে ব্যবহার করবেন না।",
  "Practice crop rotation with a non-host crop.": "পোষক নয় এমন ফসলের সাথে ফসলের পালা করুন।",
  "Apply propiconazole spray at flowering in high-risk areas.": "ঝুঁকিপূর্ণ এলাকায় ফুল আসার সময় প্রোপিকোনাজল স্প্রে করুন।",
  "Remove and destroy crop debris after harvest.": "ফসল কাটার পর ফসলের অবশিষ্টাংশ তুলে নষ্ট করুন।",
  "Rotate with a non-host crop.": "পোষক নয় এমন ফসলের সাথে ফসলের পালা করুন।",
  "Apply mancozeb or propiconazole if severe.": "মারাত্মক হলে ম্যানকোজেব বা প্রোপিকোনাজল প্রয়োগ করুন।",
  "Monitor the field regularly during cool, humid weather.": "শীতল ও আর্দ্র আবহাওয়ায় নিয়মিত জমি পর্যবেক্ষণ করুন।",
  "Apply fungicide only if severe and before tasseling.": "মারাত্মক হলে এবং মোচা বের হওয়ার আগে ছত্রাকনাশক প্রয়োগ করুন।",
  "Avoid excess nitrogen.": "অতিরিক্ত নাইট্রোজেন এড়িয়ে চলুন।",
  "Avoid water stress and nitrogen/potassium imbalance.": "পানির চাপ এবং নাইট্রোজেন/পটাশিয়ামের ভারসাম্যহীনতা এড়িয়ে চলুন।",
  "Harvest promptly once infected to reduce lodging loss.": "আক্রান্ত হলে দ্রুত ফসল তুলুন, যাতে গাছ হেলে পড়ার ক্ষতি কমে।",
  "Practice crop rotation.": "ফসলের পালা করুন।",
  "Remove and destroy infected plants.": "আক্রান্ত গাছ তুলে নষ্ট করুন।",
  "Improve field drainage.": "জমির পানি নিষ্কাশন ভালো করুন।",
  "Treat seed with a recommended fungicide before sowing.": "বপনের আগে সুপারিশকৃত ছত্রাকনাশক দিয়ে বীজ শোধন করুন।",
  "Use disease-free seed next season.": "আগামী মৌসুমে রোগমুক্ত বীজ ব্যবহার করুন।",
  "Improve drainage and avoid waterlogging.": "পানি নিষ্কাশন ভালো করুন এবং জলাবদ্ধতা এড়িয়ে চলুন।",
  "Remove and destroy severely affected plants.": "মারাত্মক আক্রান্ত গাছ তুলে নষ্ট করুন।",
  "Treat seed with fungicide before sowing.": "বপনের আগে ছত্রাকনাশক দিয়ে বীজ শোধন করুন।",
  "Remove and destroy infected foliage immediately.": "আক্রান্ত পাতা ও ডগা সঙ্গে সঙ্গে তুলে নষ্ট করুন।",
  "Improve field drainage and avoid overhead irrigation.": "জমির পানি নিষ্কাশন ভালো করুন এবং ওপর থেকে সেচ এড়িয়ে চলুন।",
  "Apply a mancozeb or metalaxyl-based fungicide promptly.": "দ্রুত ম্যানকোজেব বা মেটালাক্সিলভিত্তিক ছত্রাকনাশক প্রয়োগ করুন।",
  "Remove and destroy lower infected leaves.": "নিচের আক্রান্ত পাতা তুলে নষ্ট করুন।",
  "Avoid overhead irrigation and improve airflow.": "ওপর থেকে সেচ এড়িয়ে চলুন এবং বাতাস চলাচলের ব্যবস্থা করুন।",
  "Apply mancozeb or chlorothalonil if the infection spreads.": "রোগ ছড়াতে থাকলে ম্যানকোজেব বা ক্লোরোথ্যালোনিল প্রয়োগ করুন।",
  "Remove and destroy wilted plants immediately.": "ঢলে পড়া গাছ সঙ্গে সঙ্গে তুলে নষ্ট করুন।",
  "Avoid replanting the same crop in infected soil for several seasons.": "আক্রান্ত মাটিতে কয়েক মৌসুম একই ফসল আবার লাগাবেন না।",
  "Practice strict field sanitation and tool disinfection.": "জমি ও যন্ত্রপাতি কঠোরভাবে পরিষ্কার ও জীবাণুমুক্ত রাখুন।",
  "Maintain slightly acidic soil pH.": "মাটির pH সামান্য অম্লীয় রাখুন।",
  "Ensure adequate soil moisture during tuber formation.": "কন্দ তৈরির সময় মাটিতে পর্যাপ্ত আর্দ্রতা বজায় রাখুন।",
  "Avoid excess lime application.": "অতিরিক্ত চুন প্রয়োগ এড়িয়ে চলুন।",
  "Use disease-free seed tubers.": "রোগমুক্ত বীজ আলু ব্যবহার করুন।",
  "Avoid planting in cold, wet soil.": "ঠান্ডা ও ভেজা মাটিতে রোপণ এড়িয়ে চলুন।",
  "Treat seed tubers with a recommended fungicide.": "সুপারিশকৃত ছত্রাকনাশক দিয়ে বীজ আলু শোধন করুন।",
  "Remove and destroy infected plants early.": "আক্রান্ত গাছ শুরুতেই তুলে নষ্ট করুন।",
  "Control the whitefly vector population.": "সাদা মাছি পোকার সংখ্যা নিয়ন্ত্রণ করুন।",
  "There is no curative pesticide for virus-infected plants.": "ভাইরাস আক্রান্ত গাছের কোনো প্রতিকারমূলক কীটনাশক নেই।",
  "Avoid replanting the same crop family in infected soil.": "আক্রান্ত মাটিতে একই ফসল পরিবারের গাছ আবার লাগাবেন না।",
  "Improve soil drainage and avoid waterlogging.": "মাটির পানি নিষ্কাশন ভালো করুন এবং জলাবদ্ধতা এড়িয়ে চলুন।",
  "Remove and destroy infected lower leaves.": "নিচের আক্রান্ত পাতা তুলে নষ্ট করুন।",
  "Avoid overhead irrigation.": "ওপর থেকে সেচ এড়িয়ে চলুন।",
  "Apply chlorothalonil or mancozeb if severe.": "মারাত্মক হলে ক্লোরোথ্যালোনিল বা ম্যানকোজেব প্রয়োগ করুন।",
  "Remove and destroy infected fruit and stems.": "আক্রান্ত ফল ও কাণ্ড তুলে নষ্ট করুন।",
  "Apply mancozeb or copper-based fungicide if severe.": "মারাত্মক হলে ম্যানকোজেব বা তামাভিত্তিক ছত্রাকনাশক প্রয়োগ করুন।",
  "Remove and destroy infected plants to reduce spread.": "রোগ ছড়ানো কমাতে আক্রান্ত গাছ তুলে নষ্ট করুন।",
  "Control leafhopper vectors.": "পাতা ফড়িং বাহক পোকা নিয়ন্ত্রণ করুন।",
  "There is no cure once a plant is infected.": "একবার আক্রান্ত হলে আর প্রতিকার নেই।",
  "Remove and destroy collapsed seedlings immediately.": "ঢলে পড়া চারা সঙ্গে সঙ্গে তুলে নষ্ট করুন।",
  "Improve drainage and avoid overwatering the nursery bed.": "পানি নিষ্কাশন ভালো করুন এবং বীজতলায় বেশি পানি দেওয়া এড়িয়ে চলুন।",
  "Treat seed/soil with a recommended fungicide before sowing.": "বপনের আগে সুপারিশকৃত ছত্রাকনাশক দিয়ে বীজ/মাটি শোধন করুন।",
  "Remove and destroy infected leaves/fruits.": "আক্রান্ত পাতা/ফল তুলে নষ্ট করুন।",
  "Apply mancozeb or carbendazim if the infection is severe.": "সংক্রমণ মারাত্মক হলে ম্যানকোজেব বা কার্বেন্ডাজিম প্রয়োগ করুন।",
  "Remove and destroy infected leaves.": "আক্রান্ত পাতা তুলে নষ্ট করুন।",
  "Apply mancozeb or chlorothalonil if severe.": "মারাত্মক হলে ম্যানকোজেব বা ক্লোরোথ্যালোনিল প্রয়োগ করুন।",
  "Control whitefly/thrips vectors.": "সাদা মাছি/থ্রিপস বাহক পোকা নিয়ন্ত্রণ করুন।",
  "Control aphid/whitefly vectors.": "জাব পোকা/সাদা মাছি বাহক পোকা নিয়ন্ত্রণ করুন।",
  "Remove and destroy infected fruit promptly.": "আক্রান্ত ফল সঙ্গে সঙ্গে তুলে নষ্ট করুন।",
  "Avoid fruit contact with wet soil (use mulch/stakes).": "ফল যেন ভেজা মাটির সংস্পর্শে না আসে (মালচ/খুঁটি ব্যবহার করুন)।",
  "Apply mancozeb or carbendazim if severe.": "মারাত্মক হলে ম্যানকোজেব বা কার্বেন্ডাজিম প্রয়োগ করুন।",
  "Remove and destroy infected plants/debris.": "আক্রান্ত গাছ/আবর্জনা তুলে নষ্ট করুন।",
  "Use copper-based bactericide where locally approved.": "স্থানীয়ভাবে অনুমোদিত হলে তামাভিত্তিক ব্যাকটেরিয়ানাশক ব্যবহার করুন।",
  "Remove and destroy infected plants and roots.": "আক্রান্ত গাছ ও শিকড় তুলে নষ্ট করুন।",
  "Improve soil drainage and raise soil pH with lime.": "মাটির পানি নিষ্কাশন ভালো করুন এবং চুন দিয়ে মাটির pH বাড়ান।",
  "Avoid replanting brassicas in infected soil for several years.": "আক্রান্ত মাটিতে কয়েক বছর ক্রুসিফেরাস (বাঁধাকপি জাতীয়) ফসল আবার লাগাবেন না।",
  "Remove and destroy infected plants immediately.": "আক্রান্ত গাছ সঙ্গে সঙ্গে তুলে নষ্ট করুন।",
  "Improve field drainage and avoid injury during handling.": "জমির পানি নিষ্কাশন ভালো করুন এবং নাড়াচাড়ার সময় আঘাত লাগা এড়িয়ে চলুন।",
  "Practice strict field sanitation.": "জমি ও যন্ত্রপাতি কঠোরভাবে পরিষ্কার রাখুন।",
  "Remove and destroy infected bulbs.": "আক্রান্ত কন্দ/গাঁট তুলে নষ্ট করুন।",
  "Use disease-free seed bulbs/sets.": "রোগমুক্ত বীজ কন্দ/সেট ব্যবহার করুন।",
  "Remove and destroy infected leaf tips.": "আক্রান্ত পাতার ডগা তুলে নষ্ট করুন।",
  "Apply a recommended fungicide if severe.": "মারাত্মক হলে সুপারিশকৃত ছত্রাকনাশক প্রয়োগ করুন।",
  "Remove and destroy infected bulbs and surrounding soil where possible.": "সম্ভব হলে আক্রান্ত কন্দ ও আশপাশের মাটি তুলে নষ্ট করুন।",
  "Avoid planting in infected fields for several years.": "আক্রান্ত জমিতে কয়েক বছর রোপণ করবেন না।",
  "Use disease-free planting material.": "রোগমুক্ত রোপণ উপকরণ ব্যবহার করুন।",
  "Remove and destroy heavily infected leaves.": "মারাত্মক আক্রান্ত পাতা তুলে নষ্ট করুন।",
  "Apply propiconazole or tebuconazole at first sign.": "প্রথম লক্ষণ দেখা দিলেই প্রোপিকোনাজল বা টেবুকোনাজল প্রয়োগ করুন।",
  "Monitor regularly during humid weather.": "আর্দ্র আবহাওয়ায় নিয়মিত পর্যবেক্ষণ করুন।",
  "Apply mancozeb if the infection spreads.": "সংক্রমণ ছড়াতে থাকলে ম্যানকোজেব প্রয়োগ করুন।",
  "Improve soil drainage.": "মাটির পানি নিষ্কাশন ভালো করুন।",
  "Avoid excess irrigation close to harvest.": "ফসল তোলার কাছাকাছি সময়ে অতিরিক্ত সেচ এড়িয়ে চলুন।",
  "Rotate crops to reduce soil inoculum.": "মাটিতে রোগজীবাণু কমাতে ফসলের পালা করুন।",
  "Control aphid vectors.": "জাব পোকা বাহক নিয়ন্ত্রণ করুন।",
  "Remove and destroy infected plant debris.": "আক্রান্ত গাছের অবশিষ্টাংশ তুলে নষ্ট করুন।",
  "Remove and destroy severely infected plants/mats.": "মারাত্মক আক্রান্ত গাছ/ঝাড় তুলে নষ্ট করুন।",
  "Avoid moving soil or planting material from infected plots.": "আক্রান্ত জমি থেকে মাটি বা রোপণ উপকরণ অন্য জমিতে নেবেন না।",
  "There is no chemical cure once soil is infected.": "মাটি একবার আক্রান্ত হলে রাসায়নিক প্রতিকার নেই।",
  "Improve field drainage and spacing for airflow.": "বাতাস চলাচলের জন্য জমির পানি নিষ্কাশন ও গাছের দূরত্ব ঠিক রাখুন।",
  "Remove and destroy infected plants (including rhizome) immediately.": "আক্রান্ত গাছ (কন্দসহ) সঙ্গে সঙ্গে তুলে নষ্ট করুন।",
  "Control the banana aphid vector.": "কলার জাব পোকা বাহক নিয়ন্ত্রণ করুন।",
  "Remove and destroy infected leaves/twigs.": "আক্রান্ত পাতা/ডগা তুলে নষ্ট করুন।",
  "Apply copper-based bactericide where locally approved.": "স্থানীয়ভাবে অনুমোদিত হলে তামাভিত্তিক ব্যাকটেরিয়ানাশক ব্যবহার করুন।",
  "Control the sap-sucking insects (aphid/whitefly/mealybug) causing honeydew.": "মধুরস সৃষ্টিকারী রস শোষক পোকা (জাব পোকা/সাদা মাছি/মিলিবাগ) নিয়ন্ত্রণ করুন।",
  "Wash affected leaves with mild soap solution.": "আক্রান্ত পাতা মৃদু সাবান পানি দিয়ে ধুয়ে দিন।",
  "Improve airflow by pruning dense growth.": "ঘন ডালপালা ছাঁটাই করে বাতাস চলাচল বাড়ান।",
  "Prune and destroy malformed panicles/shoots before flowering.": "ফুল আসার আগে বিকৃত শীষ/ডগা ছেঁটে নষ্ট করুন।",
  "Avoid excess nitrogen fertilization.": "অতিরিক্ত নাইট্রোজেন সার এড়িয়ে চলুন।",
  "Use disease-free grafting material for new plantings.": "নতুন বাগানের জন্য রোগমুক্ত কলমের চারা ব্যবহার করুন।",
  "Remove and destroy severely infected plants.": "মারাত্মক আক্রান্ত গাছ তুলে নষ্ট করুন।",
  "Improve drainage around the base of the plant.": "গাছের গোড়ার চারপাশে পানি নিষ্কাশন ভালো করুন।",
  "Apply a recommended fungicide drench at the base if caught early.": "শুরুতে ধরা পড়লে গোড়ায় সুপারিশকৃত ছত্রাকনাশক ঢেলে দিন।",
  "Remove and destroy infected vines/fruit.": "আক্রান্ত লতা/ফল তুলে নষ্ট করুন।",
  "Avoid overhead irrigation and working in wet fields.": "ওপর থেকে সেচ এবং ভেজা জমিতে কাজ করা এড়িয়ে চলুন।",
  "Remove badly infected leaves and keep them away from the field.": "মারাত্মক আক্রান্ত পাতা তুলে জমি থেকে দূরে ফেলুন।",
  "Apply mancozeb, chlorothalonil, or copper-based fungicide after local diagnosis.": "স্থানীয় রোগ নির্ণয়ের পর ম্যানকোজেব, ক্লোরোথ্যালোনিল বা তামাভিত্তিক ছত্রাকনাশক প্রয়োগ করুন।",
  "Remove infected plants early to reduce spread.": "রোগ ছড়ানো কমাতে আক্রান্ত গাছ শুরুতেই তুলে ফেলুন।",
  "Control vectors such as whitefly, aphid, and thrips.": "সাদা মাছি, জাব পোকা ও থ্রিপসের মতো বাহক পোকা নিয়ন্ত্রণ করুন।",
  "Test soil before fertilizer correction.": "সার দিয়ে ঘাটতি পূরণের আগে মাটি পরীক্ষা করুন।",
  "Apply balanced NPK with compost.": "কম্পোস্টসহ সুষম NPK সার প্রয়োগ করুন।",
  "Use micronutrient spray if deficiency is confirmed.": "ঘাটতি নিশ্চিত হলে অণুপুষ্টি স্প্রে ব্যবহার করুন।",
  "Hand-pick larvae where practical and destroy infested leaves/fruits.": "সম্ভব হলে হাতে লার্ভা ধরে ফেলুন এবং আক্রান্ত পাতা/ফল নষ্ট করুন।",
  "Use pheromone or light traps for monitoring.": "পর্যবেক্ষণের জন্য ফেরোমন বা আলোর ফাঁদ ব্যবহার করুন।",
  "Apply Bt, spinosad, or emamectin benzoate only above threshold.": "ক্ষতির সীমা অতিক্রম করলেই কেবল বিটি, স্পিনোসাড বা ইমামেকটিন বেনজোয়েট প্রয়োগ করুন।",
  "Use yellow/blue sticky traps based on pest type.": "পোকার ধরন অনুযায়ী হলুদ/নীল আঠালো ফাঁদ ব্যবহার করুন।",
  "Spray neem oil or insecticidal soap at early stage.": "শুরুর দিকে নিম তেল বা কীটনাশক সাবান স্প্রে করুন।",
  "Use selective pesticide such as abamectin, spinosad, or buprofezin after identification.": "পোকা শনাক্তের পর অ্যাবামেকটিন, স্পিনোসাড বা বুপ্রোফেজিনের মতো নির্বাচিত কীটনাশক ব্যবহার করুন।",
  "Destroy stubble and volunteer rice, rotate with a non-host crop, and use clean seedlings.": "ফসল কাটার পর নাড়া ও গজানো ধান নষ্ট করুন, পোষক নয় এমন ফসলের সাথে পালা করুন এবং পরিষ্কার চারা ব্যবহার করুন।",
  "Use a tolerant variety, balanced fertilizer, and do not keep seed from heavily infected fields.": "সহনশীল জাত ও সুষম সার ব্যবহার করুন এবং মারাত্মক আক্রান্ত জমি থেকে বীজ রাখবেন না।",
  "Keep plants airy and avoid excess nitrogen.": "গাছের মাঝে বাতাস চলাচল রাখুন এবং অতিরিক্ত নাইট্রোজেন এড়িয়ে চলুন।",
  "Use resistant varieties and water early morning.": "প্রতিরোধী জাত ব্যবহার করুন এবং ভোরবেলা সেচ দিন।",
  "Use certified disease-free seed and avoid clipping seedling tips before transplanting.": "প্রত্যয়িত রোগমুক্ত বীজ ব্যবহার করুন এবং রোপণের আগে চারার ডগা কাটা এড়িয়ে চলুন।",
  "Use a blast-resistant variety and avoid continuous water stress.": "ব্লাস্ট-প্রতিরোধী জাত ব্যবহার করুন এবং ক্রমাগত পানির চাপ এড়িয়ে চলুন।",
  "Use quality seed and balanced fertilizer, particularly potash.": "মানসম্মত বীজ ও সুষম সার, বিশেষ করে পটাশ ব্যবহার করুন।",
  "Maintain proper plant spacing and balanced fertilizer use.": "সঠিক দূরত্বে রোপণ করুন এবং সুষম সার ব্যবহার করুন।",
  "Use a resistant variety and synchronize planting with neighboring fields.": "প্রতিরোধী জাত ব্যবহার করুন এবং প্রতিবেশী জমির সাথে একই সময়ে রোপণ করুন।",
  "Use certified, disease-free seed.": "প্রত্যয়িত রোগমুক্ত বীজ ব্যবহার করুন।",
  "Grow a blast-tolerant variety and avoid excess nitrogen near heading stage.": "ব্লাস্ট-সহনশীল জাত লাগান এবং শীষ বের হওয়ার সময় অতিরিক্ত নাইট্রোজেন এড়িয়ে চলুন।",
  "Grow a rust-resistant variety and avoid very early sowing.": "মরিচা-প্রতিরোধী জাত লাগান এবং খুব আগাম বপন এড়িয়ে চলুন।",
  "Use certified seed treated with fungicide.": "ছত্রাকনাশক দিয়ে শোধিত প্রত্যয়িত বীজ ব্যবহার করুন।",
  "Use a resistant variety and certified seed.": "প্রতিরোধী জাত ও প্রত্যয়িত বীজ ব্যবহার করুন।",
  "Use a resistant hybrid and avoid continuous maize monocropping.": "প্রতিরোধী হাইব্রিড ব্যবহার করুন এবং একই জমিতে ক্রমাগত ভুট্টা চাষ এড়িয়ে চলুন।",
  "Practice crop rotation and residue management.": "ফসলের পালা করুন এবং ফসলের অবশিষ্টাংশ ব্যবস্থাপনা করুন।",
  "Grow a rust-tolerant hybrid.": "মরিচা-সহনশীল হাইব্রিড লাগান।",
  "Maintain balanced potassium fertilization and avoid drought stress.": "সুষম পটাশিয়াম সার দিন এবং খরার চাপ এড়িয়ে চলুন।",
  "Practice crop rotation and avoid waterlogging.": "ফসলের পালা করুন এবং জলাবদ্ধতা এড়িয়ে চলুন।",
  "Use disease-free seed and rotate crops.": "রোগমুক্ত বীজ ব্যবহার করুন এবং ফসলের পালা করুন।",
  "Ensure a well-drained field and practice crop rotation.": "পানি নিষ্কাশনের ভালো ব্যবস্থা রাখুন এবং ফসলের পালা করুন।",
  "Use certified disease-free seed/seedlings and a resistant variety.": "প্রত্যয়িত রোগমুক্ত বীজ/চারা এবং প্রতিরোধী জাত ব্যবহার করুন।",
  "Maintain balanced fertilization and avoid plant stress.": "সুষম সার দিন এবং গাছকে চাপমুক্ত রাখুন।",
  "Use disease-free seed/seedlings and avoid waterlogged soil.": "রোগমুক্ত বীজ/চারা ব্যবহার করুন এবং জলাবদ্ধ মাটি এড়িয়ে চলুন।",
  "Rotate crops and avoid alkaline soil conditions.": "ফসলের পালা করুন এবং ক্ষারীয় মাটি এড়িয়ে চলুন।",
  "Practice crop rotation and use certified seed.": "ফসলের পালা করুন এবং প্রত্যয়িত বীজ ব্যবহার করুন।",
  "Use resistant varieties and yellow sticky traps; avoid planting near infected fields.": "প্রতিরোধী জাত ও হলুদ আঠালো ফাঁদ ব্যবহার করুন; আক্রান্ত জমির কাছে রোপণ এড়িয়ে চলুন।",
  "Use resistant varieties and practice crop rotation.": "প্রতিরোধী জাত ব্যবহার করুন এবং ফসলের পালা করুন।",
  "Rotate crops and avoid working in wet foliage.": "ফসলের পালা করুন এবং ভেজা পাতায় কাজ করা এড়িয়ে চলুন।",
  "Rotate crops and avoid dense planting.": "ফসলের পালা করুন এবং ঘন রোপণ এড়িয়ে চলুন।",
  "Use resistant varieties and control vector insects early.": "প্রতিরোধী জাত ব্যবহার করুন এবং শুরুতেই বাহক পোকা দমন করুন।",
  "Use well-drained seedbeds and avoid overcrowding seedlings.": "ভালো নিষ্কাশনযুক্ত বীজতলা ব্যবহার করুন এবং চারা ঘন করে রাখা এড়িয়ে চলুন।",
  "Use disease-free seed and avoid excess moisture on foliage/fruit.": "রোগমুক্ত বীজ ব্যবহার করুন এবং পাতা/ফলে অতিরিক্ত আর্দ্রতা এড়িয়ে চলুন।",
  "Use resistant varieties and yellow/blue sticky traps.": "প্রতিরোধী জাত এবং হলুদ/নীল আঠালো ফাঁদ ব্যবহার করুন।",
  "Use resistant/tolerant varieties and yellow sticky traps.": "প্রতিরোধী/সহনশীল জাত ও হলুদ আঠালো ফাঁদ ব্যবহার করুন।",
  "Use resistant varieties and clean, virus-free planting material.": "প্রতিরোধী জাত এবং পরিষ্কার, ভাইরাসমুক্ত রোপণ উপকরণ ব্যবহার করুন।",
  "Use certified disease-free seed and rotate crops.": "প্রত্যয়িত রোগমুক্ত বীজ ব্যবহার করুন এবং ফসলের পালা করুন।",
  "Rotate crops and maintain balanced fertilization.": "ফসলের পালা করুন এবং সুষম সার প্রয়োগ বজায় রাখুন।",
  "Practice long crop rotation and maintain neutral-to-alkaline soil pH.": "দীর্ঘমেয়াদী ফসলের পালা করুন এবং মাটির pH নিরপেক্ষ থেকে ক্ষারীয় রাখুন।",
  "Avoid waterlogging and handle produce carefully to prevent wounds.": "জলাবদ্ধতা এড়িয়ে চলুন এবং ক্ষত এড়াতে ফসল সাবধানে নাড়াচাড়া করুন।",
  "Practice crop rotation and avoid waterlogged soil.": "ফসলের পালা করুন এবং জলাবদ্ধ মাটি এড়িয়ে চলুন।",
  "Practice long crop rotation and use certified seed.": "দীর্ঘমেয়াদী ফসলের পালা করুন এবং প্রত্যয়িত বীজ ব্যবহার করুন।",
  "Grow rust-tolerant varieties and avoid dense planting.": "মরিচা-সহনশীল জাত লাগান এবং ঘন রোপণ এড়িয়ে চলুন।",
  "Rotate crops and avoid overcrowding plants.": "ফসলের পালা করুন এবং গাছ ঘন করে লাগানো এড়িয়ে চলুন।",
  "Rotate crops and avoid excess leaf wetness.": "ফসলের পালা করুন এবং পাতা অতিরিক্ত ভেজা থাকা এড়িয়ে চলুন।",
  "Ensure well-drained, well-aerated soil.": "ভালো নিষ্কাশন ও বায়ু চলাচলযুক্ত মাটি নিশ্চিত করুন।",
  "Use virus-free certified seed and resistant varieties.": "ভাইরাসমুক্ত প্রত্যয়িত বীজ ও প্রতিরোধী জাত ব্যবহার করুন।",
  "Use resistant/tolerant varieties and clean planting material.": "প্রতিরোধী/সহনশীল জাত এবং পরিষ্কার রোপণ উপকরণ ব্যবহার করুন।",
  "Maintain good field sanitation and adequate plant spacing.": "জমি পরিষ্কার রাখুন এবং গাছের মাঝে পর্যাপ্ত দূরত্ব বজায় রাখুন।",
  "Use virus-free planting material and remove infected mats promptly.": "ভাইরাসমুক্ত রোপণ উপকরণ ব্যবহার করুন এবং আক্রান্ত ঝাড় দ্রুত সরিয়ে ফেলুন।",
  "Prune for airflow and avoid working on wet foliage.": "বাতাস চলাচলের জন্য ছাঁটাই করুন এবং ভেজা পাতায় কাজ করা এড়িয়ে চলুন।",
  "Manage sap-sucking pests early to prevent honeydew buildup.": "মধুরস জমা রোধে রস শোষক পোকা শুরুতেই দমন করুন।",
  "Use certified disease-free planting material and prune affected parts early.": "প্রত্যয়িত রোগমুক্ত রোপণ উপকরণ ব্যবহার করুন এবং আক্রান্ত অংশ আগেভাগে ছেঁটে ফেলুন।",
  "Use tolerant varieties and isolate new plantings from infected fields.": "সহনশীল জাত ব্যবহার করুন এবং নতুন বাগান আক্রান্ত জমি থেকে আলাদা রাখুন।",
  "Avoid waterlogging at the base and use disease-free planting material.": "গোড়ায় জলাবদ্ধতা এড়িয়ে চলুন এবং রোগমুক্ত রোপণ উপকরণ ব্যবহার করুন।",
  "Rotate crops and use disease-free seed.": "ফসলের পালা করুন এবং রোগমুক্ত বীজ ব্যবহার করুন।",
  "Use clean seed, rotate crops, and avoid dense planting.": "পরিষ্কার বীজ ব্যবহার করুন, ফসলের পালা করুন এবং ঘন রোপণ এড়িয়ে চলুন।",
  "Use resistant varieties, clean seedlings, and yellow sticky traps.": "প্রতিরোধী জাত, পরিষ্কার চারা এবং হলুদ আঠালো ফাঁদ ব্যবহার করুন।",
  "Maintain organic matter and avoid unbalanced fertilizer.": "জৈব পদার্থ বজায় রাখুন এবং অসম সার প্রয়োগ এড়িয়ে চলুন।",
  "Scout weekly and rotate insecticide groups.": "প্রতি সপ্তাহে জমি পর্যবেক্ষণ করুন এবং কীটনাশকের গ্রুপ পর্যায়ক্রমে বদলান।",
  "Keep weeds controlled and avoid unnecessary broad-spectrum pesticide.": "আগাছা নিয়ন্ত্রণে রাখুন এবং অপ্রয়োজনীয় ব্যাপক-ক্রিয়াশীল কীটনাশক এড়িয়ে চলুন।"
};

Object.assign(PESTICIDE_BN, {
  "jute": "আগে নিম নির্যাস ব্যবহার করুন; আক্রমণ বেশি হলেই কেবল শুঁয়োপোকার জন্য ল্যামডা-সাইহ্যালোথ্রিন ব্যবহার করুন।",
  "potato": "ধ্বসা রোগ প্রতিরোধে ম্যানকোজেব/ক্লোরোথ্যালোনিল ব্যবহার করুন; নাবি ধ্বসার ঝুঁকি বেশি হলেই কেবল মেটালাক্সিল মিশ্রণ দিন।",
  "tomato": "ফল ছিদ্রকারী পোকার জন্য ফেরোমন ফাঁদ, সাদা মাছির জন্য হলুদ ফাঁদ এবং পাতার ছত্রাকজনিত দাগের জন্য তামা/ম্যানকোজেব ব্যবহার করুন।",
  "eggplant": "ফেরোমন ফাঁদ ব্যবহার করুন ও আক্রান্ত ডগা তুলে ফেলুন; পোকা থাকলেই কেবল ইমামেকটিন বেনজোয়েট প্রয়োগ করুন।",
  "chili": "মাকড়/থ্রিপসের জন্য অ্যাবামেকটিন এবং অ্যানথ্রাকনোজ প্রতিরোধে কপার অক্সিক্লোরাইড বা ম্যানকোজেব ব্যবহার করুন।",
  "okra": "রস শোষক পোকার জন্য হলুদ ফাঁদ ও নিম তেল ব্যবহার করুন; প্রয়োজনে পাউডারি মিলডিউয়ের জন্য সালফার দিন।",
  "cucumber": "ফল মাছির জন্য কিউ-লিউর ফাঁদ এবং রোগ শনাক্তের পর পাউডারি মিলডিউয়ের জন্য সালফার বা হেক্সাকোনাজল ব্যবহার করুন।",
  "bottle gourd": "ফেরোমন/কিউ-লিউর ফাঁদ, নিম তেল এবং প্রয়োজনে পাউডারি মিলডিউয়ের জন্য সালফার ব্যবহার করুন।",
  "pumpkin": "আগে টোপ ফাঁদ ও নিম তেল ব্যবহার করুন; ক্ষতির সীমা অতিক্রম করলেই কেবল সুপারিশকৃত কীটনাশক দিন।",
  "cauliflower": "শুঁয়োপোকার জন্য বিটি, স্পিনোসাড বা ইমামেকটিন ব্যবহার করুন; ব্ল্যাক রট দমনে তামাভিত্তিক স্প্রে সহায়ক।",
  "cabbage": "ডায়মন্ডব্যাক মথের জন্য বিটি/স্পিনোসাড ব্যবহার করুন এবং মারাত্মক জাব পোকার আক্রমণে কেবল ইমিডাক্লোপ্রিড দিন।",
  "onion": "থ্রিপসের জন্য নীল আঠালো ফাঁদ ও স্পিনোসাড এবং পার্পল ব্লচের জন্য ম্যানকোজেব/প্রোপিকোনাজল ব্যবহার করুন।",
  "garlic": "পরিষ্কার কোয়া ব্যবহার করুন; আগে সাদা পচা রোগ হয়ে থাকলে ছত্রাকনাশক দিয়ে বীজ শোধন করুন।",
  "spinach": "নিম তেল ও হলুদ ফাঁদ ব্যবহার করুন; ফসল তোলার কাছাকাছি সময়ে কড়া কীটনাশক এড়িয়ে চলুন।",
  "red amaranth": "নিম নির্যাস ব্যবহার করুন; প্রয়োজন হলে কেবল স্বল্প অপেক্ষাকালীন (প্রি-হারভেস্ট ইন্টারভ্যাল) কীটনাশক দিন।",
  "carrot": "আগে বীজ শোধন ও নিমভিত্তিক নিয়ন্ত্রণ করুন; ব্লাইট নিশ্চিত হলে ছত্রাকনাশক ব্যবহার করুন।",
  "radish": "জাব পোকা/ফ্লি বিটলের জন্য নিম তেল এবং রোগ নিশ্চিত হলে ছত্রাকজনিত দাগের জন্য তামা/ম্যানকোজেব ব্যবহার করুন।",
  "bean": "ছিদ্রকারী পোকার জন্য ফেরোমন ফাঁদ এবং রোগ শনাক্তের পর মরিচা রোগের জন্য প্রোপিকোনাজল ব্যবহার করুন।",
  "pea": "পাউডারি মিলডিউয়ের জন্য সালফার এবং শুরুতে জাব পোকার জন্য নিম তেল ব্যবহার করুন।",
  "banana": "পরিষ্কার চারা, ঘুণ পোকার জন্য ফেরোমন ফাঁদ এবং পরামর্শ অনুযায়ী সিগাটোকার জন্য ম্যানকোজেব/প্রোপিকোনাজল ব্যবহার করুন।",
  "mango": "ফল মাছির জন্য টোপ ফাঁদ এবং প্রয়োজনে পাউডারি মিলডিউয়ের জন্য সালফার/হেক্সাকোনাজল ব্যবহার করুন।",
  "papaya": "মিলিবাগের জন্য নিম তেল/সাবান এবং রোগ শনাক্তের পর অ্যানথ্রাকনোজের জন্য তামা/ম্যানকোজেব ব্যবহার করুন।",
  "watermelon": "টোপ ফাঁদ ও নিম তেল ব্যবহার করুন; মিলডিউ নিশ্চিত হলে সালফার বা উপযুক্ত ছত্রাকনাশক দিন।"
});

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

// Fallback tables (bnTreatment / bnPrevention look these up; empty = use English text)
const TREATMENT_BN = {};
const PREVENTION_BN = {};

const SEVERITY_BN = {
  low: "কম",
  medium: "মাঝারি",
  high: "বেশি",
  critical: "গুরুতর",
  none: "নেই",
  unknown: "অজানা",
  "low-medium": "কম-মাঝারি"
};

const ISSUE_BN = {
  "Fungal leaf spot / blight": "ছত্রাকজনিত পাতার দাগ / ব্লাইট",
  "Powdery mildew": "পাউডারি মিলডিউ",
  "Downy mildew": "ডাউনি মিলডিউ",
  "Virus / leaf curl": "ভাইরাস / পাতা কুঁকড়ানো",
  "Nutrient deficiency": "পুষ্টির ঘাটতি",
  "Insect chewing damage": "পাতা খাওয়া পোকার ক্ষতি",
  "Sucking pest damage": "রস শোষণকারী পোকার ক্ষতি",
  "Unable to identify": "শনাক্ত করা যায়নি",
  "Ufra disease": "উফরা রোগ",
  "False smut": "লক্ষ্মীর গু (ফলস স্মাট)"
};
// ---------- Paddy ML model diseases (Bangla) ----------
const PADDY_BN = {
  "Bacterial Leaf Blight": {
    issue: "ব্যাকটেরিয়াল পাতা ব্লাইট (পাতা পোড়া রোগ)",
    treatment: ["জমির পানি বের করে দিন এবং গোড়ায় অতিরিক্ত পানি জমতে দেবেন না।", "মারাত্মক আক্রান্ত পাতা/গাছ তুলে নষ্ট করে ফেলুন।", "স্থানীয়ভাবে অনুমোদিত হলে তামাভিত্তিক ব্যাকটেরিয়ানাশক ব্যবহার করুন।"],
    prevention: "রোগমুক্ত প্রত্যয়িত বীজ, প্রতিরোধী জাত ও সুষম নাইট্রোজেন ব্যবহার করুন।",
    pesticide: "স্থানীয়ভাবে অনুমোদিত হলে তামাভিত্তিক ব্যাকটেরিয়ানাশক।"
  },
  "Bacterial Leaf Streak": {
    issue: "ব্যাকটেরিয়াল পাতা স্ট্রিক (পাতার রেখা রোগ)",
    treatment: ["অতিরিক্ত নাইট্রোজেন এড়িয়ে চলুন এবং পাতা ভেজা থাকার সময় কমান।", "মারাত্মক আক্রান্ত পাতা তুলে নষ্ট করুন।", "স্থানীয়ভাবে অনুমোদিত হলে তামাভিত্তিক ব্যাকটেরিয়ানাশক ব্যবহার করুন।"],
    prevention: "পরিষ্কার বীজ ও প্রতিরোধী জাত ব্যবহার করুন; ভেজা জমিতে কাজ করা এড়িয়ে চলুন।",
    pesticide: "স্থানীয়ভাবে অনুমোদিত হলে তামাভিত্তিক ব্যাকটেরিয়ানাশক।"
  },
  "Bacterial Panicle Blight": {
    issue: "ব্যাকটেরিয়াল শীষ ব্লাইট",
    treatment: ["আক্রান্ত হলে কার্যকর প্রতিকার নেই — মারাত্মক আক্রান্ত গাছ সরিয়ে ফেলুন।", "অতিরিক্ত নাইট্রোজেন এড়িয়ে চলুন এবং পানি ব্যবস্থাপনা স্থির রাখুন।", "কোনো ব্যাকটেরিয়ানাশক ব্যবহারের আগে স্থানীয় কৃষি কর্মকর্তার পরামর্শ নিন।"],
    prevention: "প্রত্যয়িত পরিষ্কার বীজ ব্যবহার করুন, অতিরিক্ত নাইট্রোজেন এড়ান এবং ফুল আসার সময় গরমের চাপ এড়াতে সময়মতো রোপণ করুন।",
    pesticide: "স্থানীয় কৃষি কর্মকর্তার পরামর্শ নিন।"
  },
  "Rice Blast": {
    issue: "ধানের ব্লাস্ট রোগ",
    treatment: ["আক্রান্ত কুশি/শীষ তুলে নষ্ট করুন।", "অতিরিক্ত নাইট্রোজেন এড়িয়ে চলুন; সুষম সার দিন।", "রোগ নিশ্চিত হওয়ার পর লেবেলের মাত্রা মেনে ট্রাইসাইক্লাজল বা আইসোপ্রোথিওলেন প্রয়োগ করুন।"],
    prevention: "ব্লাস্ট-প্রতিরোধী জাত ব্যবহার করুন; দেরিতে বা ঘন রোপণ এবং পানির চাপ এড়ান।",
    pesticide: "ট্রাইসাইক্লাজল বা আইসোপ্রোথিওলেন (স্থানীয় বিশেষজ্ঞের নিশ্চিতকরণের পর)।"
  },
  "Brown Spot": {
    issue: "বাদামি দাগ রোগ",
    treatment: ["মাটির উর্বরতা, বিশেষ করে পটাশিয়াম বাড়ান।", "ফসল কাটার পর আক্রান্ত খড়/নাড়া নষ্ট করুন।", "সংক্রমণ মারাত্মক হলে ম্যানকোজেব বা প্রোপিকোনাজল ব্যবহার করুন।"],
    prevention: "সুস্থ শোধিত বীজ ও সুষম সার, বিশেষ করে পটাশ ব্যবহার করুন।",
    pesticide: "ম্যানকোজেব বা প্রোপিকোনাজল (শুধু মারাত্মক হলে)।"
  },
  "Dead Heart": {
    issue: "মরা ডিগ (মাজরা পোকা)",
    treatment: ["আক্রান্ত কুশি ও ডিমের গাদা তুলে নষ্ট করুন।", "মথ ধরতে/পর্যবেক্ষণে আলোর ফাঁদ ব্যবহার করুন।", "স্থানীয় পরামর্শে ক্লোরানট্রানিলিপ্রোল বা কার্টাপ হাইড্রোক্লোরাইড ব্যবহার করুন।"],
    prevention: "ফসল কাটার পর নাড়া সরিয়ে ফেলুন, অতিরিক্ত নাইট্রোজেন এড়ান এবং প্রতিবেশীদের সাথে সময়মতো রোপণ করুন।",
    pesticide: "ক্লোরানট্রানিলিপ্রোল বা কার্টাপ হাইড্রোক্লোরাইড (স্থানীয় সুপারিশ অনুযায়ী)।"
  },
  "Downy Mildew": {
    issue: "ডাউনি মিলডিউ",
    treatment: ["পানি নিষ্কাশন ভালো করুন এবং বীজতলায় পানি জমতে দেবেন না।", "মারাত্মক আক্রান্ত গাছ তুলে নষ্ট করুন।", "রোগ ছড়াতে থাকলে স্থানীয়ভাবে সুপারিশকৃত ছত্রাকনাশক (যেমন মেটালাক্সিল + ম্যানকোজেব) ব্যবহার করুন।"],
    prevention: "ভালো নিষ্কাশনযুক্ত বীজতলা ও প্রতিরোধী জাত ব্যবহার করুন; ঘন রোপণ এড়ান।",
    pesticide: "মেটালাক্সিল + ম্যানকোজেব (শুধু স্থানীয়ভাবে সুপারিশ করা হলে)।"
  },
  "Rice Hispa": {
    issue: "ধানের হিস্পা পোকা",
    treatment: ["বীজতলা/প্রাথমিক অবস্থায় আক্রান্ত পাতার ডগা কেটে নষ্ট করুন।", "ছোট জমিতে হাতে বা জাল দিয়ে পূর্ণবয়স্ক বিটল ধরুন।", "মারাত্মক হলেই কেবল স্থানীয় কৃষি কর্মকর্তার পরামর্শে কীটনাশক ব্যবহার করুন।"],
    prevention: "অতিরিক্ত নাইট্রোজেন এড়ান, জমি আগাছামুক্ত রাখুন এবং জমির আশপাশের ঘাস-আগাছা পরিষ্কার করুন।",
    pesticide: "শুধু স্থানীয় কৃষি অফিসের সুপারিশকৃত কীটনাশক।"
  },
  "Healthy Rice Leaf": {
    issue: "সুস্থ ধানের পাতা",
    treatment: ["চিকিৎসার প্রয়োজন নেই। নিয়মিত জমি পর্যবেক্ষণ চালিয়ে যান।"],
    prevention: "সুষম সার, ভালো নিষ্কাশন ও নিয়মিত পর্যবেক্ষণ বজায় রাখুন।",
    pesticide: ""
  },
  "Rice Tungro": {
    issue: "ধানের টুংরো রোগ",
    treatment: ["আক্রান্ত গুছি শুরুতেই তুলে নষ্ট করুন।", "বাহক সবুজ পাতা ফড়িং নিয়ন্ত্রণ করুন (আলোর ফাঁদ, সুপারিশকৃত কীটনাশক)।", "আক্রান্ত গাছের কোনো প্রতিকার নেই — বাহক পোকা দমনে মনোযোগ দিন।"],
    prevention: "টুংরো-প্রতিরোধী জাত লাগান এবং প্রতিবেশীদের সাথে একই সময়ে রোপণ করুন।",
    pesticide: "শুধু বাহক পোকা দমন, স্থানীয় সুপারিশ অনুযায়ী।"
  },
  "Sheath Blight": {
    issue: "খোলপোড়া রোগ (শীথ ব্লাইট)",
    treatment: ["ঘন রোপণ ও অতিরিক্ত নাইট্রোজেন এড়িয়ে চলুন।", "মাঝে মাঝে জমির পানি শুকিয়ে গোড়ার আর্দ্রতা কমান এবং আগাছা দমন করুন।", "ক্ষত গাছের ওপরের দিকে উঠলে লেবেলের মাত্রা মেনে হেক্সাকোনাজল বা ভ্যালিডামাইসিন প্রয়োগ করুন।"],
    prevention: "সঠিক দূরত্বে রোপণ, সুষম সার এবং ফসল কাটার পর আক্রান্ত নাড়া ও আগাছা সরানো।",
    pesticide: "হেক্সাকোনাজল বা ভ্যালিডামাইসিন (স্থানীয়ভাবে নিশ্চিত হওয়ার পর)।"
  },
  "False Smut": {
    issue: "লক্ষ্মীর গু রোগ (ফলস স্মাট)",
    treatment: ["আক্রান্ত শীষ সাবধানে তুলে নষ্ট করুন (ঝাঁকাবেন না — স্পোর ছড়িয়ে পড়ে)।", "অতিরিক্ত নাইট্রোজেন ও দেরিতে রোপণ এড়ান; ফুল আসার সময় আর্দ্রতা কমান।", "স্থানীয়ভাবে সুপারিশ থাকলে থোড়/শীষ বের হওয়ার শুরুতে প্রোপিকোনাজল বা তামাভিত্তিক ছত্রাকনাশক স্প্রে করুন।"],
    prevention: "পরিষ্কার বীজ ও সহনশীল জাত ব্যবহার করুন, সময়মতো রোপণ করুন এবং সুষম নাইট্রোজেন দিন।",
    pesticide: "থোড়/শীষ অবস্থায় প্রোপিকোনাজল বা তামাভিত্তিক ছত্রাকনাশক (স্থানীয় সুপারিশ অনুযায়ী)।"
  },
  "Ufra": {
    issue: "উফরা রোগ",
    treatment: ["আক্রান্ত গাছ ও নাড়া তুলে নষ্ট করুন; অন্য জমিতে নেবেন না।", "আক্রান্ত জমি থেকে আসা সেচের পানি এড়িয়ে চলুন এবং ফসল কাটার পর জমি শুকান।", "কৃমি (নেমাটোড) দমনের জন্য স্থানীয় কৃষি সম্প্রসারণ অফিস/ব্রি-র পরামর্শ নিন; নিশ্চিত না হয়ে নিয়মিত কীটনাশক দেবেন না।"],
    prevention: "ফসল কাটার পর গভীর চাষ দিয়ে জমি শুকান, গজানো ধান (রাটুন) ও আগাছা নষ্ট করুন, অ-পোষক ফসলের সাথে ফসলের পালা করুন।",
    pesticide: "নেমাটোডনাশক শুধু স্থানীয় কৃষি অফিস পরামর্শ দিলে।"
  },
  "Bakanae (Foot Rot)": {
    issue: "বাকানি রোগ (গোড়া পচা)",
    treatment: ["অস্বাভাবিক লম্বা, সরু, ফ্যাকাশে চারা এবং গোড়ার গিঁটে সাদা শিকড়যুক্ত গাছ তুলে নষ্ট করুন।", "আক্রান্ত জমির বীজ পরবর্তীতে ব্যবহার করবেন না।", "আগামীতে বপনের আগে গরম পানিতে বা সুপারিশকৃত ছত্রাকনাশকে বীজ শোধন করুন।"],
    prevention: "প্রত্যয়িত রোগমুক্ত বীজ ব্যবহার করুন এবং বপনের আগে বীজ শোধন করুন।",
    pesticide: "স্থানীয় সুপারিশ অনুযায়ী বীজ শোধনের ছত্রাকনাশক।"
  },
  "Unable to identify": {
    issue: "শনাক্ত করা যায়নি",
    treatment: ["আক্রান্ত অংশের কাছ থেকে, দিনের আলোতে, পাতা/কাণ্ড/শীষে ফোকাস করে আবার ছবি তুলুন।", "ছবির নিচের দৃশ্যমান লক্ষণগুলো টিক দিয়ে আবার স্ক্যান করুন।", "স্থানীয় কৃষি কর্মকর্তাকে গাছটি দেখান (কৃষি কল সেন্টার ১৬১২৩)।"],
    prevention: "",
    pesticide: ""
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
  return (
    (PADDY_BN[issue] && PADDY_BN[issue].issue) ||
    ISSUE_BN[issue] ||
    DISEASE_BN_LOWER[String(issue).toLowerCase()] ||
    issue
  );
}

function bnSeverity(severity) {
  const key = String(severity || "").toLowerCase();
  return isBn() && SEVERITY_BN[key] ? SEVERITY_BN[key] : title(severity);
}

// Translate one scan sentence; unknown sentences stay in English.
function bnSentence(text) {
  return (isBn() && SCAN_SENTENCE_BN[text]) || text;
}

function bnTreatment(issue, list) {
  if (!isBn()) return list || [];
  if (PADDY_BN[issue]) return PADDY_BN[issue].treatment;
  if (TREATMENT_BN[issue]) return TREATMENT_BN[issue];
  return (list || []).map(bnSentence);
}

function bnPrevention(issue, fallback) {
  if (!isBn()) return fallback;
  if (PADDY_BN[issue]) return PADDY_BN[issue].prevention;
  if (PREVENTION_BN[issue]) return PREVENTION_BN[issue];
  return bnSentence(fallback);
}

function bnPesticideNote(issue, fallback) {
  if (isBn() && PADDY_BN[issue] && PADDY_BN[issue].pesticide) return PADDY_BN[issue].pesticide;
  return fallback;
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
  "scannerResult", "scanHistoryList", "scanHistoryCount", "scanStatsGrid", "scanReport",
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
    syncMenuButton();
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
      event.preventDefault(); // delete button sits inside <summary>; do not toggle the card
      deleteRecord(button.dataset.deleteKind, button.dataset.deleteId);
    }
  });

  document.querySelectorAll(".side-nav button").forEach((button) => {
    button.addEventListener("click", () => {
      activateSection(button.dataset.section);

      // On phones the sidebar is a drawer: close it after choosing a page.
      if (window.matchMedia("(max-width: 980px)").matches) {
        elements.dashboardScreen?.classList.add("sidebar-closed");
        syncMenuButton();
      }
    });
  });

  setupLeafDropzone();
}

// The hamburger turns into an X while the sidebar is OPEN.
function syncMenuButton() {
  const open = !elements.dashboardScreen?.classList.contains("sidebar-closed");
  elements.menuToggleBtn?.classList.toggle("active", open);
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

  renderWeatherPill();
  replayResultPanels();

  if (state.scanHistory?.length) {
    renderScanHistory();

    if (state.openReportId && document.querySelector('.view[data-view="report"].active')) {
      const openScan = state.scanHistory.find((item) => item.id === state.openReportId);
      if (openScan) renderScanReport(openScan);
    }
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

// Redraw result panels (scanner, crop AI, fertilizer, weather, ...) in the
// newly selected language.
function replayResultPanels() {
  try {
    if (lastRender.scanner) renderScannerResult(lastRender.scanner);
    if (lastRender.recommendation) renderRecommendation(lastRender.recommendation);
    if (lastRender.fertilizer) renderFertilizerResult(lastRender.fertilizer);
    if (lastRender.weather) renderWeather(...lastRender.weather);
    if (lastRender.market) renderMarketList(lastRender.market);
    if (lastRender.finance) renderFinance(lastRender.finance);
    if (lastRender.contacts) renderContactList(lastRender.contacts);

    if (lastRender.calendar) {
      const { cropName, plantingDate } = lastRender.calendar;
      renderCalendarResult(cropName, generateCropCalendar(cropName, plantingDate), plantingDate);
    }

    renderHotlineList();
    renderSubsidy();
  } catch (error) {
    console.warn("Language refresh failed:", error);
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
    elements.togglePasswordBtn.textContent = isPassword ? "\u{1F648}" : "\u{1F441}";
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

  // Reload so no data from this account (scan history, results, forms)
  // can still be on screen when somebody else signs in.
  window.location.reload();
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

  syncMenuButton();

  if (!state.token) return;

  try {
    const response = await api("/api/auth/me");

    state.user = response.user;

    showDashboard();

    await loadDashboard();
  } catch (error) {
    // Only drop the session when the server says it is invalid. A network
    // error / server restart must not log the farmer out.
    if (error.status === 401 || error.status === 404) {
      localStorage.removeItem("smartAgroToken");
      state.token = null;
      state.user = null;
    }
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
    if (!select) return;
    const previous = select.value;
    select.innerHTML = optionsHtml;
    if (previous) select.value = previous;
  });
}


// ============================================================
// DASHBOARD
// ============================================================

async function loadDashboard() {
  state.dashboard = await api("/api/dashboard");
  renderDashboard();

  if (!state.liveWeather) loadTopbarWeather();
}

function emptyState(key) {
  return `<div class="empty-state">${escapeHtml(t(key))}</div>`;
}

function renderDashboard() {
  const dashboard = state.dashboard;

  if (!dashboard) return;

  renderWeatherPill();

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

// Real weather for the farmer's location (Open-Meteo, no API key).
const WEATHER_CODE_TEXT = [
  [[0], "Clear sky", "পরিষ্কার আকাশ"],
  [[1, 2, 3], "Partly cloudy", "আংশিক মেঘলা"],
  [[45, 48], "Fog", "কুয়াশা"],
  [[51, 53, 55, 56, 57], "Drizzle", "গুঁড়ি গুঁড়ি বৃষ্টি"],
  [[61, 63, 65, 66, 67, 80, 81, 82], "Rain", "বৃষ্টি"],
  [[71, 73, 75, 77, 85, 86], "Snow", "তুষার"],
  [[95, 96, 99], "Thunderstorm", "বজ্রসহ বৃষ্টি"]
];

function weatherCodeText(code) {
  const hit = WEATHER_CODE_TEXT.find(([codes]) => codes.includes(code));
  return hit ? (isBn() ? hit[2] : hit[1]) : "";
}

function renderWeatherPill() {
  if (!elements.weatherPill) return;

  const w = state.liveWeather;

  if (!w) {
    elements.weatherPill.textContent = t("weatherLoading");
    return;
  }

  const condition = weatherCodeText(w.code);

  elements.weatherPill.textContent = `☀️ ${w.temperature}°C | ${w.humidity}% ${
    isBn() ? "আর্দ্রতা" : "humidity"
  }${condition ? ` | ${condition}` : ""}`;
}

async function loadTopbarWeather() {
  const searchName = (state.user?.location || "").split(",")[0].trim() || "Dhaka";

  try {
    const geoUrl = (name) =>
      `https://geocoding-api.open-meteo.com/v1/search?count=1&language=en&format=json&name=${encodeURIComponent(name)}`;

    let geo = await (await fetch(geoUrl(searchName))).json();
    if (!geo?.results?.length && searchName !== "Dhaka") geo = await (await fetch(geoUrl("Dhaka"))).json();

    const place = geo?.results?.[0];
    if (!place) return;

    const forecast = await (await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`
    )).json();

    const current = forecast?.current;
    if (!current) return;

    state.liveWeather = {
      temperature: Math.round(current.temperature_2m),
      humidity: Math.round(current.relative_humidity_2m),
      code: current.weather_code
    };
    renderWeatherPill();
  } catch (error) {
    console.warn("Topbar weather failed:", error);
  }
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

  if (section === "history") loadScanHistory();
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
  lastRender.recommendation = result;

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
let currentLeafFile = null; // selected photo mone rakhe

function previewLeafImage() {
  const input = elements.leafImageInput;
  const file = input?.files?.[0];

  // File dialog "Cancel" korle browser input khali kore dey.
  // Tokhon purono photo-i abar input-e ferot dao, preview-o thakbe.
  if (!file && currentLeafFile) {
    try {
      const dt = new DataTransfer();
      dt.items.add(currentLeafFile);
      input.files = dt.files;
    } catch (error) {
      // purono browser: kichu korar nai
    }
    return;
  }

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
    input.value = "";
    currentLeafFile = null;
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
    input.value = "";
    currentLeafFile = null;
    resetLeafPreview();
    return;
  }

  // Notun valid photo: purono preview URL chhere dao
  if (leafPreviewUrl) URL.revokeObjectURL(leafPreviewUrl);

  currentLeafFile = file;
  leafPreviewUrl = URL.createObjectURL(file);

  if (elements.leafPreview) {
    elements.leafPreview.innerHTML = `
      <img src="${leafPreviewUrl}" alt="Leaf preview" class="leaf-preview-image" />
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

// Shrinks the photo (max 1280 px, JPEG) before upload. Phone photos are often
// 5-10 MB, which with base64 overhead could exceed the server's JSON limit.
// Falls back to the original file if the browser cannot decode it.
async function prepareImage(file) {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close?.();

    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    return { base64: dataUrl.slice(dataUrl.indexOf(",") + 1), mimeType: "image/jpeg" };
  } catch (error) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result || "");
        const comma = result.indexOf(",");
        resolve({ base64: comma >= 0 ? result.slice(comma + 1) : result, mimeType: file.type || "image/jpeg" });
      };
      reader.onerror = () => reject(new Error("File read failed"));
      reader.readAsDataURL(file);
    });
  }
}

// ---------- scan animation + messages ----------
let scanSafetyTimer = null;

function stopScanBeam() {
  clearTimeout(scanSafetyTimer);
  elements.leafPreview?.classList.remove("scanning");
  elements.leafPreview?.querySelector(".scan-beam")?.remove();
}

function startScanBeam() {
  const box = elements.leafPreview;
  if (!box) return;

  box.classList.add("scanning");

  if (!box.querySelector(".scan-beam")) {
    const beam = document.createElement("div");
    beam.className = "scan-beam";
    box.appendChild(beam);
  }

  // Safety: stop the animation if no result ever arrives.
  clearTimeout(scanSafetyTimer);
  scanSafetyTimer = setTimeout(stopScanBeam, 45000);
}

function showScannerMessage(en, bn) {
  delete lastRender.scanner; // a new scan / message replaces the old result

  const text = isBn() ? bn : en;

  if (/^Analyzing/i.test(en)) {
    startScanBeam();
    elements.scannerResult.innerHTML = `
      <div class="sc-loading">
        <div class="sc-orbit"></div>
        <strong>${escapeHtml(text)}</strong>
        <span>${escapeHtml(
          isBn() ? "রোগ ও পোকার লক্ষণ মিলিয়ে দেখা হচ্ছে" : "Matching leaf patterns against known conditions"
        )}</span>
      </div>`;
    return;
  }

  stopScanBeam();
  elements.scannerResult.innerHTML = `<div class="empty-state">${escapeHtml(text)}</div>`;
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

  // Convert the image to base64 so the model can actually see it.
  let imageBase64;
  let mimeType = file.type || "image/jpeg";

  try {
    const prepared = await prepareImage(file);
    imageBase64 = prepared.base64;
    mimeType = prepared.mimeType;
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
    mimeType,
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
    loadScanHistory();
  } catch (error) {
    console.error("Leaf scanner error:", error);
    stopScanBeam();

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

// ---------- SCAN HISTORY + FULL-PAGE REPORT ----------

// Put your real validation accuracy from Colab here (for example 94.2).
// While it is null the report shows "Not recorded" instead of inventing a number.
const PADDY_MODEL_VAL_ACCURACY = null;

const BAND_COLOR = { high: "#21925c", mid: "#d29c3d", low: "#c24131" };

function isAiSource(source) {
  return source === "paddy-ml" || source === "vision-ai";
}

function safeBn(fn, fallback) {
  try { return fn(); } catch (error) { return fallback; }
}

function clampConf(value) {
  return Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
}

function confBand(conf, lowFlag) {
  if (lowFlag || conf < 60) return "low";
  if (conf < 85) return "mid";
  return "high";
}

function bandLabel(band) {
  return t(band === "high" ? "bandHigh" : band === "mid" ? "bandMid" : "bandLow");
}

function fmtScanDate(iso) {
  return new Date(iso).toLocaleString(isBn() ? "bn-BD" : "en-GB", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
  });
}

async function loadScanHistory() {
  if (!elements.scanHistoryList) return;
  try {
    const response = await api("/api/scans");
    state.scanHistory = response.scans || [];
    renderScanHistory();
  } catch (error) {
    elements.scanHistoryList.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  }
}

function renderScanStats(scans) {
  if (!elements.scanStatsGrid) return;

  if (!scans.length) {
    elements.scanStatsGrid.innerHTML = "";
    return;
  }

  const n = scans.length;
  const avg = Math.round(scans.reduce((sum, s) => sum + clampConf(s.confidence), 0) / n);
  const modelCount = scans.filter((s) => isAiSource(s.source)).length;
  const lowCount = scans.filter((s) => confBand(clampConf(s.confidence), s.lowConfidence) === "low").length;

  const counts = {};
  scans.forEach((s) => { counts[s.issue] = (counts[s.issue] || 0) + 1; });
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const topName = top ? safeBn(() => bnIssue(top[0]), top[0]) : "-";

  const stat = (label, value, sub) => `
    <article class="scan-stat">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      ${sub ? `<em>${escapeHtml(sub)}</em>` : ""}
    </article>`;

  elements.scanStatsGrid.innerHTML = [
    stat(t("statTotal"), n),
    stat(t("statAvg"), `${avg}%`),
    stat(t("statModel"), modelCount, `/ ${n}`),
    stat(t("statLow"), lowCount),
    stat(t("statTop"), topName, top ? `×${top[1]}` : "")
  ].join("");
}

function renderScanHistory() {
  if (!elements.scanHistoryList) return;
  const scans = state.scanHistory || [];

  if (elements.scanHistoryCount) elements.scanHistoryCount.textContent = String(scans.length);

  renderScanStats(scans);

  elements.scanHistoryList.innerHTML = scans.length
    ? scans.map(renderScanHistoryCard).join("")
    : emptyState("noScanHistoryYet");

  elements.scanHistoryList.onclick = (event) => {
    if (event.target.closest("[data-delete-id]")) return;
    const card = event.target.closest("[data-open-report]");
    if (card) openScanReport(card.dataset.openReport);
  };

  elements.scanHistoryList.onkeydown = (event) => {
    if (event.key !== "Enter") return;
    const card = event.target.closest?.("[data-open-report]");
    if (card && event.target === card) openScanReport(card.dataset.openReport);
  };
}

function renderScanHistoryCard(scan) {
  const conf = clampConf(scan.confidence);
  const band = confBand(conf, scan.lowConfidence);
  const issue = safeBn(() => bnIssue(scan.issue), scan.issue);
  const isModel = isAiSource(scan.source);

  const photo = scan.imageUrl
    ? `<img src="${escapeHtml(scan.imageUrl)}" alt="Scanned leaf" loading="lazy" />`
    : `<div class="sh-noimg">🍃</div>`;

  return `
    <article class="scan-hist-card" tabindex="0" role="button" data-open-report="${escapeHtml(scan.id)}">
      <div class="sh-photo">${photo}</div>
      <div class="sh-info">
        <strong>${escapeHtml(issue)}</strong>
        <span>${escapeHtml(bnName(scan.crop))} | ${escapeHtml(fmtScanDate(scan.createdAt))}</span>
        <div class="sh-badges">
          <span class="rp-chip ${band}">${escapeHtml(conf)}% · ${escapeHtml(bandLabel(band))}</span>
          <span class="tag">${escapeHtml(t(isModel ? "modelResultLabel" : "keywordResultLabel"))}</span>
        </div>
        <span class="sh-open">${escapeHtml(t("openReportLink"))} →</span>
      </div>
      ${deleteButton("scans", scan.id)}
    </article>
  `;
}

function openScanReport(id) {
  const scan = (state.scanHistory || []).find((item) => item.id === id);
  if (!scan) return;

  state.openReportId = id;

  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.dataset.view === "report");
  });

  renderScanReport(scan);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderScanReport(scan) {
  if (!elements.scanReport) return;

  const conf = clampConf(scan.confidence);
  const band = confBand(conf, scan.lowConfidence);
  const color = BAND_COLOR[band];
  const isModel = isAiSource(scan.source);

  const issue = safeBn(() => bnIssue(scan.issue), scan.issue);
  const treatment = safeBn(() => bnTreatment(scan.issue, scan.treatment), scan.treatment || []);
  const prevention = safeBn(() => bnPrevention(scan.issue, scan.prevention), scan.prevention || "");
  const preds = (scan.predictions || []).slice(0, 3);
  const symptoms = scan.symptoms || [];
  const risks = scan.cropRisks || null;
  const reportNo = String(scan.id || "").replace(/^scan_/, "").slice(0, 8).toUpperCase();

  // Gap between the 1st and 2nd guess.
  let marginText = "-";
  if (preds.length > 1) {
    const gap = Math.round(Number(preds[0].confidence) - Number(preds[1].confidence));
    const gapKey = gap >= 30 ? "marginClear" : gap >= 15 ? "marginMod" : "marginNarrow";
    marginText = `${gap} ${t("pointsWord")} — ${t(gapKey)}`;
  }

  // Inputs actually used for this result.
  const inputParts = [];
  if (scan.imageUrl || scan.imageName) inputParts.push(t("inPhoto"));
  if (symptoms.length) inputParts.push(`${symptoms.length} ${t("inSymptoms")}`);
  if (scan.notes) inputParts.push(t("inNote"));

  const valAcc = scan.source === "paddy-ml"
    ? (PADDY_MODEL_VAL_ACCURACY != null ? `${PADDY_MODEL_VAL_ACCURACY}%` : t("notRecorded"))
    : t("notApplicable");

  const interp = t(band === "high" ? "interpHigh" : band === "mid" ? "interpMid" : "interpLow");

  const steps =
    band === "low" ? ["nsRetake", "nsConfirm"]
    : band === "mid" ? ["nsConfirm", "nsMonitor"]
    : ["nsTreat", "nsMonitor"];

  const row = (label, value) => `
    <div class="rp-row"><span>${escapeHtml(label)}</span><div>${value}</div></div>`;

  const photo = scan.imageUrl
    ? `<img src="${escapeHtml(scan.imageUrl)}" alt="Scanned leaf" />`
    : `<div class="sh-noimg">🍃</div>`;

  const riskTags = risks
    ? [
        ...(risks.pests || []).map((p) => pestLabel(p)),
        ...(risks.diseases || []).map((d) => diseaseLabel(d))
      ]
    : [];

  elements.scanReport.innerHTML = `
    <div class="rp-toolbar report-actions">
      <button type="button" class="rp-btn" data-report-back>${escapeHtml(t("backToHistory"))}</button>
      <button type="button" class="rp-btn primary" data-report-print>🖨️ ${escapeHtml(t("printReportBtn"))}</button>
    </div>

    <header class="rp-title">
      <div>
        <p>AgroSmart</p>
        <h2>${escapeHtml(t("reportTitle"))}</h2>
      </div>
      <div class="rp-meta">
        <span>${escapeHtml(t("reportIdLabel"))}: <b>${escapeHtml(reportNo)}</b></span>
        <span>${escapeHtml(t("scannedOnLabel"))}: <b>${escapeHtml(fmtScanDate(scan.createdAt))}</b></span>
      </div>
    </header>

    <section class="rp-card rp-hero">
      <div class="rp-photo">${photo}</div>
      <div class="rp-hero-body">
        <p class="sc-crop">${escapeHtml(bnName(scan.crop))}</p>
        <h3>${escapeHtml(issue)}</h3>
        <div class="sh-badges">
          <span class="rp-chip ${band}">${escapeHtml(t("reliabilityLabel"))}: ${escapeHtml(bandLabel(band))}</span>
          <span class="tag">${escapeHtml(t(isModel ? "modelResultLabel" : "keywordResultLabel"))}</span>
          <span class="tag">${escapeHtml(t("severityLabel"))} ${escapeHtml(bnSeverity(scan.severity))}</span>
        </div>
      </div>
      <div class="sc-ring" style="--p:${conf};--c:${color}">
        <b>${escapeHtml(conf)}<small>%</small></b>
        <span>${escapeHtml(t("matchLabel"))}</span>
      </div>
    </section>

    <section class="rp-card">
      <h4>${escapeHtml(t("accuracyHeading"))}</h4>

      ${row(t("confScoreLabel"), `<strong>${escapeHtml(conf)}%</strong>`)}
      ${row(t("reliabilityLabel"), `
        <span class="rp-chip ${band}">${escapeHtml(bandLabel(band))}</span>
        <div class="rp-scale">
          <i class="z low"></i><i class="z mid"></i><i class="z high"></i>
          <b class="mk" style="left:${conf}%"></b>
        </div>
        <small>${escapeHtml(t("bandScaleNote"))}</small>`)}
      ${row(t("sourceLabel"), escapeHtml(t(scan.source === "vision-ai" ? "sourceVisionDesc" : isModel ? "sourceModelDesc" : "sourceKeywordDesc")))}
      ${row(t("marginLabel"), escapeHtml(marginText))}
      ${row(t("valAccLabel"), escapeHtml(valAcc))}
      ${row(t("inputsLabel"), escapeHtml(inputParts.join(" + ") || "-"))}

      <p class="rp-interp ${band}">${escapeHtml(interp)}</p>
      <p class="rp-small">${escapeHtml(t(isModel ? "confDisclaimerNote" : "kwHeuristicNote"))}</p>
    </section>

    <section class="rp-card">
      <h4>${escapeHtml(t("possibilitiesHeading"))}</h4>
      ${
        preds.length
          ? `<div class="sc-bars">${preds.map((p, i) => {
              const w = clampConf(p.confidence);
              const name = safeBn(() => bnIssue(p.issue), p.issue || p.label);
              return `<div class="sc-bar">
                <div><span>${i + 1}. ${escapeHtml(name)}</span><em>${w}%</em></div>
                <div class="sc-track"><i style="--w:${w}%"></i></div>
              </div>`;
            }).join("")}</div>`
          : `<p class="rp-small">${escapeHtml(t("noAlternatives"))}</p>`
      }
    </section>

    <section class="rp-card">
      <h4>${escapeHtml(t("inputsHeading"))}</h4>
      ${
        symptoms.length || scan.notes
          ? `${symptoms.length ? `<p><strong>${escapeHtml(t("symptomsChosenLabel"))}:</strong> ${escapeHtml(symptoms.join(", "))}</p>` : ""}
             ${scan.notes ? `<p><strong>${escapeHtml(t("noteLabel"))}:</strong> ${escapeHtml(scan.notes)}</p>` : ""}`
          : `<p class="rp-small">${escapeHtml(t("noInputsNote"))}</p>`
      }
    </section>

    ${treatment.length ? `
    <section class="rp-card">
      <h4>${escapeHtml(t("treatmentHeading"))}</h4>
      <ol class="sc-steps">${treatment.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ol>
    </section>` : ""}

    ${prevention ? `
    <section class="rp-card">
      <h4>${escapeHtml(t("preventionHeading"))}</h4>
      <p>${escapeHtml(prevention)}</p>
      ${scan.pesticideNote ? `<p><strong>${escapeHtml(t("pesticideNoteLabel"))}</strong> ${escapeHtml(bnPesticideNote(scan.issue, scan.pesticideNote))}</p>` : ""}
    </section>` : ""}

    ${risks ? `
    <section class="rp-card">
      <h4>${escapeHtml(t("cropRisksHeading"))}</h4>
      ${riskTags.length ? `<div class="sc-tags">${riskTags.map((x) => `<span>${escapeHtml(x)}</span>`).join("")}</div>` : ""}
      ${risks.pesticide ? `<p style="margin-top:10px"><strong>${escapeHtml(t("pesticideNoteLabel"))}</strong> ${escapeHtml(bnPesticide(scan.crop, risks.pesticide))}</p>` : ""}
    </section>` : ""}

    <section class="rp-card">
      <h4>${escapeHtml(t("nextStepsHeading"))}</h4>
      <ol class="sc-steps">${steps.map((k) => `<li>${escapeHtml(t(k))}</li>`).join("")}</ol>
    </section>

    ${scan.disclaimer ? `<p class="sc-note">${escapeHtml(bnDisclaimer(scan.disclaimer))}</p>` : ""}
  `;

  elements.scanReport.querySelector("[data-report-back]")
    ?.addEventListener("click", () => activateSection("history"));
  elements.scanReport.querySelector("[data-report-print]")
    ?.addEventListener("click", () => window.print());
}

function severityClass(severity) {
  const s = String(severity || "").toLowerCase();
  if (s === "none" || s === "low") return "ok";
  if (s.includes("high")) return "high";
  if (s.includes("medium")) return "mid";
  return "unk";
}

function ringColor(cls) {
  return { ok: "#3ddc84", mid: "#ffb84d", high: "#ff6b5b", unk: "#8fb5a4" }[cls];
}

function renderScannerResult(result) {
  if (!elements.scannerResult) return;
  stopScanBeam();
  lastRender.scanner = result;

  const issue = bnIssue(result.issue);
  const severityText = bnSeverity(result.severity);
  const treatment = bnTreatment(result.issue, result.treatment) || [];
  const prevention = bnPrevention(result.issue, result.prevention);
  const disclaimer = bnDisclaimer(result.disclaimer);

  const confidence = Math.max(0, Math.min(100, Number(result.confidence) || 0));
  const sevCls = result.lowConfidence ? "unk" : severityClass(result.severity);

  const others = (result.predictions || []).slice(1, 4);
  const pestHints = result.pestHints || [];
  const cropRisks = result.cropRisks || {};
  const tags = [
    ...(cropRisks.pests || []).map(pestLabel),
    ...(cropRisks.diseases || []).map(diseaseLabel)
  ];

  const L = isBn()
    ? { conf: "নির্ভরতা", treat: "করণীয়", prevent: "প্রতিরোধ", other: "অন্য সম্ভাবনা", pest: "কীটনাশক তথ্য", sev: "ঝুঁকি", hints: "সম্ভাব্য পোকার মিল", low: "ফলাফল অনিশ্চিত — ভালো আলোতে আবার ছবি তুলুন।" }
    : { conf: "match", treat: "What to do", prevent: "Prevention", other: "Other possibilities", pest: "Pesticide note", sev: "Severity", hints: "Possible pest matches", low: "Low confidence — retake the photo in good light." };

  elements.scannerResult.innerHTML = `
    <section class="sc-result">

      <div class="sc-head">
        <div class="sc-ring" style="--p:${confidence};--c:${ringColor(sevCls)}">
          <b>${escapeHtml(Math.round(confidence))}<small>%</small></b>
          <span>${escapeHtml(L.conf)}</span>
        </div>
        <div class="sc-id">
          <p class="sc-crop">${escapeHtml(bnName(result.crop))}</p>
          <h3>${escapeHtml(issue)}</h3>
          <span class="sc-sev ${sevCls}">${escapeHtml(L.sev)}: ${escapeHtml(severityText)}</span>
        </div>
      </div>

      ${result.lowConfidence ? `<p class="sc-note">${escapeHtml(L.low)}</p>` : ""}

      ${
        treatment.length
          ? `<article class="sc-card">
              <h4>${escapeHtml(L.treat)}</h4>
              <ol class="sc-steps">${treatment.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
            </article>`
          : ""
      }

      ${
        prevention
          ? `<article class="sc-card">
              <h4>${escapeHtml(L.prevent)}</h4>
              <p>${escapeHtml(prevention)}</p>
              ${result.pesticideNote ? `<p><strong>${escapeHtml(L.pest)}:</strong> ${escapeHtml(bnPesticideNote(result.issue, result.pesticideNote))}</p>` : cropRisks.pesticide ? `<p><strong>${escapeHtml(L.pest)}:</strong> ${escapeHtml(bnPesticide(result.crop, cropRisks.pesticide))}</p>` : ""}
            </article>`
          : ""
      }

      ${
        tags.length
          ? `<article class="sc-card"><div class="sc-tags">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div></article>`
          : ""
      }

      ${
        pestHints.length
          ? `<article class="sc-card">
              <h4>${escapeHtml(L.hints)}</h4>
              ${pestHints.map((pest) => `
                <p><strong>${escapeHtml(pestLabel(pest.pest))}:</strong>
                ${escapeHtml(bnPestGuideField(pest.pest, "control", pest.control))}
                ${escapeHtml(bnPestGuideField(pest.pest, "pesticide", pest.pesticide))}</p>`).join("")}
            </article>`
          : ""
      }

      ${
        others.length
          ? `<article class="sc-card">
              <h4>${escapeHtml(L.other)}</h4>
              <div class="sc-bars">
                ${others.map((p) => {
                  const w = Math.max(2, Math.min(100, Math.round(p.confidence)));
                  return `<div class="sc-bar">
                    <div><span>${escapeHtml(bnIssue(p.issue || p.label))}</span><em>${w}%</em></div>
                    <div class="sc-track"><i style="--w:${w}%"></i></div>
                  </div>`;
                }).join("")}
              </div>
            </article>`
          : ""
      }

      <p class="sc-note">${escapeHtml(disclaimer)}</p>

    </section>
  `;
}

// Drag & drop upload.
function setupLeafDropzone() {
  const zone = document.querySelector(".leaf-upload");
  const input = elements.leafImageInput;
  if (!zone || !input) return;

  ["dragenter", "dragover"].forEach((evt) =>
    zone.addEventListener(evt, (e) => {
      e.preventDefault();
      zone.classList.add("drag");
    })
  );

  ["dragleave", "drop"].forEach((evt) =>
    zone.addEventListener(evt, (e) => {
      e.preventDefault();
      zone.classList.remove("drag");
    })
  );

  zone.addEventListener("drop", (e) => {
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;

    const dt = new DataTransfer();
    dt.items.add(file);
    input.files = dt.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
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
    } else if (kind === "scans") {
      await Promise.all([loadDashboard(), loadScanHistory()]);
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
  lastRender.market = items;

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
  lastRender.fertilizer = result;

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
  lastRender.weather = [placeName, forecast];

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
  lastRender.finance = items;
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

  const perennial = /perennial/i.test(crop?.duration || "");
  const durationDays = parseDurationDays(crop?.duration) || (perennial ? 365 : 100);
  // Parse as UTC and add days in UTC so DST / time zones cannot shift the date.
  const plantingDate = new Date(`${plantingDateStr}T00:00:00Z`);

  return CALENDAR_MILESTONES.map((step) => {
    const date = new Date(plantingDate.getTime());
    date.setUTCDate(date.getUTCDate() + Math.round(durationDays * step.pct));

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
  renderCalendarResult(formData.crop, milestones, formData.plantingDate);
}

function renderCalendarResult(cropName, milestones, plantingDate) {
  if (!elements.calendarResult) return;
  if (plantingDate) lastRender.calendar = { cropName, plantingDate };

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
  lastRender.contacts = items;

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
    // An expired/invalid session anywhere in the app -> back to the login screen.
    if (response.status === 401 && state.token && !path.startsWith("/api/auth/login")) {
      logout();
    }

    const error = new Error(
      payload.message || payload.error || `Request failed (${response.status})`
    );
    error.status = response.status;
    throw error;
  }

  return payload;
}


// ============================================================
// START APPLICATION
// ============================================================

setupEventListeners();
boot();