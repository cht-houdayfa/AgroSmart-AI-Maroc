// Language types
export type LanguageCode = 'darija' | 'ar' | 'fr' | 'en';

// Moroccan Arabic Dialects - different regional variations
export type DarijaDialect = 'sous' | ' Atlas' | 'chaouia' | 'doukkala' | 'rifi' | 'haouz';

// All translations organized by language and dialect
export type Translations = {
  common: {
    appName: string;
    appNameFull: string;
    tagline: string;
    welcome: string;
    loading: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    add: string;
    back: string;
    confirm: string;
    search: string;
    filter: string;
    all: string;
    yes: string;
    no: string;
    status: string;
    actions: string;
    details: string;
    settings: string;
    logout: string;
    language: string;
    dialect: string;
    voiceAssistant: string;
  };
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    phonePlaceholder: string;
    sendOtp: string;
    otpPlaceholder: string;
    otpSent: string;
    verify: string;
    demoFarmer: string;
    demoTechnician: string;
    demoAdmin: string;
    demoLabel: string;
    orUseDemo: string;
  };
  farmer: {
    dashboard: string;
    farm: string;
    irrigation: string;
    calendar: string;
    control: string;
    notifications: string;
    support: string;
    alerts: string;
    help: string;
    soilMoisture: string;
    waterPressure: string;
    flowRate: string;
    valveStatus: string;
    open: string;
    closed: string;
    battery: string;
    batteryHealth: string;
    lastUpdate: string;
    currentCrop: string;
    nextIrrigation: string;
    today: string;
    tomorrow: string;
    wateringNow: string;
    noWatering: string;
    startIrrigation: string;
    stopIrrigation: string;
    manualMode: string;
    autoMode: string;
    aiMode: string;
    aiSuggestion: string;
    acceptSuggestion: string;
    rejectSuggestion: string;
    cropCalendar: string;
    plantingDate: string;
    harvestDate: string;
    growthStage: string;
    fertilizer: string;
    pesticide: string;
    upcomingTasks: string;
    noTasks: string;
    alertLowBattery: string;
    alertLowMoisture: string;
    alertValveIssue: string;
    alertSystemOffline: string;
    createTicket: string;
    ticketSubject: string;
    ticketDescription: string;
    ticketPriority: string;
    ticketLow: string;
    ticketNormal: string;
    ticketHigh: string;
    ticketCritical: string;
    submitTicket: string;
    myTickets: string;
    ticketOpen: string;
    ticketInProgress: string;
    ticketResolved: string;
  };
  technician: {
    mapDashboard: string;
    diagnostics: string;
    qrSetup: string;
    fieldNotes: string;
    farms: string;
    nodes: string;
    onlineNodes: string;
    offlineNodes: string;
    warningNodes: string;
    criticalNodes: string;
    selectFarm: string;
    runDiagnostic: string;
    diagnosticResult: string;
    nodeDetails: string;
    firmwareVersion: string;
    lastSeen: string;
    signalStrength: string;
    replaceBattery: string;
    calibrateSensor: string;
    updateFirmware: string;
    physicalCheck: string;
    noteTitle: string;
    noteContent: string;
    addPhoto: string;
    saveNote: string;
    scanQr: string;
    qrInstructions: string;
    assignNode: string;
    nodeAssigned: string;
    fieldVisit: string;
    completedVisits: string;
    pendingVisits: string;
    openTicketsTitle: string;
    closeTicket: string;
    resolveIssue: string;
  };
  admin: {
    analytics: string;
    networkMap: string;
    predictiveQA: string;
    billingCRM: string;
    otaUpdates: string;
    totalFarms: string;
    totalNodes: string;
    activeUsers: string;
    revenue: string;
    todayRevenue: string;
    monthlyRevenue: string;
    subscriptions: string;
    activePlans: string;
    expiredPlans: string;
    pendingPayments: string;
    invoice: string;
    paid: string;
    unpaid: string;
    overdue: string;
    createSubscription: string;
    renewSubscription: string;
    cancelSubscription: string;
    sendReminder: string;
    deployUpdate: string;
    selectFirmware: string;
    targetDevices: string;
    rolloutPercentage: string;
    rollback: string;
    updateStatus: string;
    updateSuccess: string;
    updateFailed: string;
    networkHealth: string;
    gatewayStatus: string;
    bandwidthUsage: string;
    uptime: string;
    predictions: string;
    maintenanceForecast: string;
    failurePrediction: string;
    anomalyDetection: string;
    healthScore: string;
  };
  languages: {
    darija: string;
    darijaSous: string;
    darijaAtlas: string;
    darijaChaouia: string;
    darijaDoukkala: string;
    darijaRifi: string;
    darijaHaouz: string;
    arabic: string;
    french: string;
    english: string;
  };
};

// Complete translations for each language
export const translations: Record<LanguageCode, Translations> = {
  darija: {
    common: {
      appName: 'AgroSmart',
      appNameFull: 'AgroSmart AI Maroc',
      tagline: 'ضيعتك فراحتك، ذكاء اصطناعي كيخدم معاك',
      welcome: 'مرحبا',
      loading: 'كيتلواد...',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل',
      add: 'زيد',
      back: 'رجع',
      confirm: 'تأكيد',
      search: 'قلب',
      filter: 'فيلتر',
      all: 'الكامل',
      yes: 'أه',
      no: 'لا',
      status: 'الحالة',
      actions: 'الأفعال',
      details: 'التفاصيل',
      settings: 'الإعدادات',
      logout: 'خروج',
      language: 'اللغة',
      dialect: 'اللهجة',
      voiceAssistant: 'حجّاج',
    },
    auth: {
      loginTitle: 'AgroSmart AI Maroc',
      loginSubtitle: 'ضيعتك فراحتك، ذكاء اصطناعي كيخدم معاك',
      phonePlaceholder: '06XXXXXXXX',
      sendOtp: 'صيفط كود التأكيد',
      otpPlaceholder: 'دخل الكود',
      otpSent: 'كود التأكيد تصيفط لـ',
      verify: 'دخول',
      demoFarmer: 'دخول كفلاح (ديمو)',
      demoTechnician: 'دخول كتقني (ديمو)',
      demoAdmin: 'دخول كإدارة (ديمو)',
      demoLabel: 'تجربة مباشرة',
      orUseDemo: 'أو جرب مباشرة',
    },
    farmer: {
      dashboard: 'البلان',
      farm: 'الضيعة',
      irrigation: 'السقي',
      calendar: 'التقويم',
      control: 'تحكم',
      notifications: 'تنبيهات',
      support: 'دعم',
      alerts: 'تنبيهات',
      help: 'مساعدة',
      soilMoisture: 'الرطوبة د التربة',
      waterPressure: 'الضغط د الما',
      flowRate: 'الصبيب',
      valveStatus: 'حالة الصمام',
      open: 'مفتوح',
      closed: 'مغلق',
      battery: 'البطارية',
      batteryHealth: 'صحة البطارية',
      lastUpdate: 'آخر تحديث',
      currentCrop: 'الغلة الحالية',
      nextIrrigation: 'السقي الجاي',
      today: 'اليوم',
      tomorrow: 'غدوة',
      wateringNow: 'كايسقي دابا',
      noWatering: 'كاين سقي',
      startIrrigation: 'بدا السقي',
      stopIrrigation: 'وقف السقي',
      manualMode: 'وضع يدوي',
      autoMode: 'وضع تلقائي',
      aiMode: 'وضع الذكاء الاصطناعي',
      aiSuggestion: 'اقتراح الذكاء الاصطناعي',
      acceptSuggestion: 'قبل',
      rejectSuggestion: 'رفض',
      cropCalendar: 'تقويم الغلة',
      plantingDate: 'تاريخ الزرع',
      harvestDate: 'تاريخ الحصاد',
      growthStage: 'مرحلة النمو',
      fertilizer: 'السماد',
      pesticide: 'المبيدات',
      upcomingTasks: 'المهام الجاية',
      noTasks: 'كاين حتى مهمة',
      alertLowBattery: 'البطارية ضعيفة',
      alertLowMoisture: 'الرطوبة منخفضة',
      alertValveIssue: 'مشكل فالصمام',
      alertSystemOffline: 'النظام ماشي كيخدم',
      createTicket: 'إنشاء تذكرة',
      ticketSubject: 'الموضوع',
      ticketDescription: 'الوصف',
      ticketPriority: 'الأولوية',
      ticketLow: 'منخفضة',
      ticketNormal: 'عادية',
      ticketHigh: 'عالية',
      ticketCritical: 'حرجة',
      submitTicket: 'صيفط التذكرة',
      myTickets: 'تذاكري',
      ticketOpen: 'مفتوحة',
      ticketInProgress: 'قيد المعالجة',
      ticketResolved: 'تم حلها',
    },
    technician: {
      mapDashboard: 'خريطة المزارع',
      diagnostics: 'التشخيص',
      qrSetup: 'تثبيت QR',
      fieldNotes: 'ملاحظات الميدان',
      farms: 'الضيعات',
      nodes: 'العقد',
      onlineNodes: 'عقد متصلة',
      offlineNodes: 'عقد مقطوعة',
      warningNodes: 'عقد بتحذير',
      criticalNodes: 'عقد حرجة',
      selectFarm: 'اختر ضيعة',
      runDiagnostic: 'شغل التشخيص',
      diagnosticResult: 'نتيجة التشخيص',
      nodeDetails: 'تفاصيل العقدة',
      firmwareVersion: 'نسخة الفيرموير',
      lastSeen: 'آخر ظهور',
      signalStrength: 'قوة الإشارة',
      replaceBattery: 'بدل البطارية',
      calibrateSensor: 'عاير الحساس',
      updateFirmware: 'حدث الفيرموير',
      physicalCheck: 'فحص ميداني',
      noteTitle: 'عنوان الملاحظة',
      noteContent: 'محتوى الملاحظة',
      addPhoto: 'زيد صورة',
      saveNote: 'حفظ الملاحظة',
      scanQr: 'مسح QR',
      qrInstructions: 'مسح الكود QR ديال العقدة',
      assignNode: 'تعيين عقدة',
      nodeAssigned: 'العقدة تعينات',
      fieldVisit: 'زيارة ميدانية',
      completedVisits: 'زيارات مكتملة',
      pendingVisits: 'زيارات معلقة',
      openTicketsTitle: 'تذاكر مفتوحة',
      closeTicket: 'سكر التذكرة',
      resolveIssue: 'حل المشكلة',
    },
    admin: {
      analytics: 'التحليلات',
      networkMap: 'خريطة الشبكة',
      predictiveQA: 'الصيانة التنبؤية',
      billingCRM: 'الفواتير وإدارة العملاء',
      otaUpdates: 'تحديثات OTA',
      totalFarms: 'إجمالي الضيعات',
      totalNodes: 'إجمالي العقد',
      activeUsers: 'المستخدمين النشطين',
      revenue: 'الإيرادات',
      todayRevenue: 'إيرادات اليوم',
      monthlyRevenue: 'إيرادات الشهر',
      subscriptions: 'الاشتراكات',
      activePlans: 'خطط نشطة',
      expiredPlans: 'خطط منتهية',
      pendingPayments: 'مدفوعات معلقة',
      invoice: 'فاتورة',
      paid: 'مدفوعة',
      unpaid: 'غير مدفوعة',
      overdue: 'متأخرة',
      createSubscription: 'إنشاء اشتراك',
      renewSubscription: 'تجديد اشتراك',
      cancelSubscription: 'إلغاء اشتراك',
      sendReminder: 'صيفط تذكير',
      deployUpdate: 'نشر تحديث',
      selectFirmware: 'اختر الفيرموير',
      targetDevices: 'الأجهزة المستهدفة',
      rolloutPercentage: 'نسبة النشر',
      rollback: 'تراجع',
      updateStatus: 'حالة التحديث',
      updateSuccess: 'تحديث ناجح',
      updateFailed: 'فشل التحديث',
      networkHealth: 'صحة الشبكة',
      gatewayStatus: 'حالة البوابة',
      bandwidthUsage: 'استخدام النطاق الترددي',
      uptime: 'وقت التشغيل',
      predictions: 'التنبؤات',
      maintenanceForecast: 'توقعات الصيانة',
      failurePrediction: 'توقع الأعطال',
      anomalyDetection: 'كشف الشذوذ',
      healthScore: 'نقاط الصحة',
    },
    languages: {
      darija: 'الدارجة',
      darijaSous: 'دارجة سوس',
      darijaAtlas: 'دارجة الأطلس',
      darijaChaouia: 'دارجة الشاوية',
      darijaDoukkala: 'دارجة دكالة',
      darijaRifi: 'دارجة الريف',
      darijaHaouz: 'دارجة الحوز',
      arabic: 'العربية',
      french: 'الفرنسية',
      english: 'الإنجليزية',
    },
  },
  ar: {
    common: {
      appName: 'AgroSmart',
      appNameFull: 'AgroSmart AI المغرب',
      tagline: 'مزرعتك في راحتك، الذكاء الاصطناعي في خدمتك',
      welcome: 'مرحباً',
      loading: 'جاري التحميل...',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل',
      add: 'إضافة',
      back: 'رجوع',
      confirm: 'تأكيد',
      search: 'بحث',
      filter: 'تصفية',
      all: 'الكل',
      yes: 'نعم',
      no: 'لا',
      status: 'الحالة',
      actions: 'الإجراءات',
      details: 'التفاصيل',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج',
      language: 'اللغة',
      dialect: 'اللهجة',
      voiceAssistant: 'حجّاج',
    },
    auth: {
      loginTitle: 'AgroSmart AI المغرب',
      loginSubtitle: 'مزرعتك في راحتك، الذكاء الاصطناعي في خدمتك',
      phonePlaceholder: '06XXXXXXXX',
      sendOtp: 'إرسال رمز التحقق',
      otpPlaceholder: 'أدخل الرمز',
      otpSent: 'تم إرسال رمز التحقق إلى',
      verify: 'تسجيل الدخول',
      demoFarmer: 'تسجيل كمزارع (تجريبي)',
      demoTechnician: 'تسجيل كفني (تجريبي)',
      demoAdmin: 'تسجيل كمدير (تجريبي)',
      demoLabel: 'تجربة مباشرة',
      orUseDemo: 'أو جرب مباشرة',
    },
    farmer: {
      dashboard: 'لوحة التحكم',
      farm: 'المزرعة',
      irrigation: 'الري',
      calendar: 'التقويم',
      control: 'التحكم',
      notifications: 'الإشعارات',
      support: 'الدعم',
      alerts: 'التنبيهات',
      help: 'المساعدة',
      soilMoisture: 'رطوبة التربة',
      waterPressure: 'ضغط المياه',
      flowRate: 'معدل التدفق',
      valveStatus: 'حالة الصمام',
      open: 'مفتوح',
      closed: 'مغلق',
      battery: 'البطارية',
      batteryHealth: 'صحة البطارية',
      lastUpdate: 'آخر تحديث',
      currentCrop: 'المحصول الحالي',
      nextIrrigation: 'الري القادم',
      today: 'اليوم',
      tomorrow: 'غداً',
      wateringNow: 'جاري الري',
      noWatering: 'لا يوجد ري',
      startIrrigation: 'بدء الري',
      stopIrrigation: 'إيقاف الري',
      manualMode: 'الوضع اليدوي',
      autoMode: 'الوضع التلقائي',
      aiMode: 'وضع الذكاء الاصطناعي',
      aiSuggestion: 'اقتراح الذكاء الاصطناعي',
      acceptSuggestion: 'قبول',
      rejectSuggestion: 'رفض',
      cropCalendar: 'تقويم المحاصيل',
      plantingDate: 'تاريخ الزراعة',
      harvestDate: 'تاريخ الحصاد',
      growthStage: 'مرحلة النمو',
      fertilizer: 'السماد',
      pesticide: 'المبيدات',
      upcomingTasks: 'المهام القادمة',
      noTasks: 'لا توجد مهام',
      alertLowBattery: 'بطارية منخفضة',
      alertLowMoisture: 'رطوبة منخفضة',
      alertValveIssue: 'مشكلة في الصمام',
      alertSystemOffline: 'النظام غير متصل',
      createTicket: 'إنشاء تذكرة',
      ticketSubject: 'الموضوع',
      ticketDescription: 'الوصف',
      ticketPriority: 'الأولوية',
      ticketLow: 'منخفضة',
      ticketNormal: 'عادية',
      ticketHigh: 'عالية',
      ticketCritical: 'حرجة',
      submitTicket: 'إرسال التذكرة',
      myTickets: 'تذاكري',
      ticketOpen: 'مفتوحة',
      ticketInProgress: 'قيد المعالجة',
      ticketResolved: 'تم الحل',
    },
    technician: {
      mapDashboard: 'خريطة المزارع',
      diagnostics: 'التشخيص',
      qrSetup: 'إعداد QR',
      fieldNotes: 'ملاحظات ميدانية',
      farms: 'المزارع',
      nodes: 'العقد',
      onlineNodes: 'عقد متصلة',
      offlineNodes: 'عقد غير متصلة',
      warningNodes: 'عقد تحذيرية',
      criticalNodes: 'عقد حرجة',
      selectFarm: 'اختر مزرعة',
      runDiagnostic: 'تشغيل التشخيص',
      diagnosticResult: 'نتيجة التشخيص',
      nodeDetails: 'تفاصيل العقدة',
      firmwareVersion: 'إصدار البرنامج الثابت',
      lastSeen: 'آخر ظهور',
      signalStrength: 'قوة الإشارة',
      replaceBattery: 'استبدال البطارية',
      calibrateSensor: 'معايرة المستشعر',
      updateFirmware: 'تحديث البرنامج',
      physicalCheck: 'فحص ميداني',
      noteTitle: 'عنوان الملاحظة',
      noteContent: 'محتوى الملاحظة',
      addPhoto: 'إضافة صورة',
      saveNote: 'حفظ الملاحظة',
      scanQr: 'مسح QR',
      qrInstructions: 'امسح رمز QR للعقدة',
      assignNode: 'تعيين عقدة',
      nodeAssigned: 'تم تعيين العقدة',
      fieldVisit: 'زيارة ميدانية',
      completedVisits: 'زيارات مكتملة',
      pendingVisits: 'زيارات معلقة',
      openTicketsTitle: 'تذاكر مفتوحة',
      closeTicket: 'إغلاق التذكرة',
      resolveIssue: 'حل المشكلة',
    },
    admin: {
      analytics: 'التحليلات',
      networkMap: 'خريطة الشبكة',
      predictiveQA: 'الصيانة التنبؤية',
      billingCRM: 'الفواتير وإدارة العملاء',
      otaUpdates: 'تحديثات OTA',
      totalFarms: 'إجمالي المزارع',
      totalNodes: 'إجمالي العقد',
      activeUsers: 'المستخدمين النشطين',
      revenue: 'الإيرادات',
      todayRevenue: 'إيرادات اليوم',
      monthlyRevenue: 'إيرادات الشهر',
      subscriptions: 'الاشتراكات',
      activePlans: 'خطط نشطة',
      expiredPlans: 'خطط منتهية',
      pendingPayments: 'مدفوعات معلقة',
      invoice: 'فاتورة',
      paid: 'مدفوعة',
      unpaid: 'غير مدفوعة',
      overdue: 'متأخرة',
      createSubscription: 'إنشاء اشتراك',
      renewSubscription: 'تجديد اشتراك',
      cancelSubscription: 'إلغاء اشتراك',
      sendReminder: 'إرسال تذكير',
      deployUpdate: 'نشر تحديث',
      selectFirmware: 'اختر البرنامج',
      targetDevices: 'الأجهزة المستهدفة',
      rolloutPercentage: 'نسبة النشر',
      rollback: 'تراجع',
      updateStatus: 'حالة التحديث',
      updateSuccess: 'تم التحديث بنجاح',
      updateFailed: 'فشل التحديث',
      networkHealth: 'صحة الشبكة',
      gatewayStatus: 'حالة البوابة',
      bandwidthUsage: 'استخدام النطاق الترددي',
      uptime: 'وقت التشغيل',
      predictions: 'التنبؤات',
      maintenanceForecast: 'توقعات الصيانة',
      failurePrediction: 'توقع الأعطال',
      anomalyDetection: 'كشف الشذوذ',
      healthScore: 'نقاط الصحة',
    },
    languages: {
      darija: 'الدارجة المغربية',
      darijaSous: 'دارجة سوس',
      darijaAtlas: 'دارجة الأطلس',
      darijaChaouia: 'دارجة الشاوية',
      darijaDoukkala: 'دارجة دكالة',
      darijaRifi: 'دارجة الريف',
      darijaHaouz: 'دارجة الحوز',
      arabic: 'العربية الفصحى',
      french: 'الفرنسية',
      english: 'الإنجليزية',
    },
  },
  fr: {
    common: {
      appName: 'AgroSmart',
      appNameFull: 'AgroSmart AI Maroc',
      tagline: 'Votre ferme, votre sérénité — IA au service de l\'agriculture',
      welcome: 'Bienvenue',
      loading: 'Chargement...',
      save: 'Enregistrer',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      add: 'Ajouter',
      back: 'Retour',
      confirm: 'Confirmer',
      search: 'Rechercher',
      filter: 'Filtrer',
      all: 'Tout',
      yes: 'Oui',
      no: 'Non',
      status: 'Statut',
      actions: 'Actions',
      details: 'Détails',
      settings: 'Paramètres',
      logout: 'Déconnexion',
      language: 'Langue',
      dialect: 'Dialecte',
      voiceAssistant: 'Hajjaj',
    },
    auth: {
      loginTitle: 'AgroSmart AI Maroc',
      loginSubtitle: 'Votre ferme, votre sérénité — IA au service de l\'agriculture',
      phonePlaceholder: '06XXXXXXXX',
      sendOtp: 'Envoyer le code SMS',
      otpPlaceholder: 'Entrez le code',
      otpSent: 'Code envoyé au',
      verify: 'Connexion',
      demoFarmer: 'Démo Agriculteur',
      demoTechnician: 'Démo Technicien',
      demoAdmin: 'Démo Administration',
      demoLabel: 'Accès démo direct',
      orUseDemo: 'Ou essayez directement',
    },
    farmer: {
      dashboard: 'Tableau de bord',
      farm: 'Ferme',
      irrigation: 'Irrigation',
      calendar: 'Calendrier',
      control: 'Contrôle',
      notifications: 'Notifications',
      support: 'Support',
      alerts: 'Alertes',
      help: 'Aide',
      soilMoisture: 'Humidité du sol',
      waterPressure: 'Pression de l\'eau',
      flowRate: 'Débit',
      valveStatus: 'État de la vanne',
      open: 'Ouvert',
      closed: 'Fermé',
      battery: 'Batterie',
      batteryHealth: 'Santé de la batterie',
      lastUpdate: 'Dernière mise à jour',
      currentCrop: 'Culture actuelle',
      nextIrrigation: 'Prochaine irrigation',
      today: 'Aujourd\'hui',
      tomorrow: 'Demain',
      wateringNow: 'Irrigation en cours',
      noWatering: 'Pas d\'irrigation',
      startIrrigation: 'Démarrer l\'irrigation',
      stopIrrigation: 'Arrêter l\'irrigation',
      manualMode: 'Mode manuel',
      autoMode: 'Mode automatique',
      aiMode: 'Mode IA',
      aiSuggestion: 'Suggestion IA',
      acceptSuggestion: 'Accepter',
      rejectSuggestion: 'Rejeter',
      cropCalendar: 'Calendrier cultural',
      plantingDate: 'Date de plantation',
      harvestDate: 'Date de récolte',
      growthStage: 'Stade de croissance',
      fertilizer: 'Engrais',
      pesticide: 'Pesticide',
      upcomingTasks: 'Tâches à venir',
      noTasks: 'Aucune tâche',
      alertLowBattery: 'Batterie faible',
      alertLowMoisture: 'Humidité basse',
      alertValveIssue: 'Problème de vanne',
      alertSystemOffline: 'Système hors ligne',
      createTicket: 'Créer un ticket',
      ticketSubject: 'Sujet',
      ticketDescription: 'Description',
      ticketPriority: 'Priorité',
      ticketLow: 'Basse',
      ticketNormal: 'Normale',
      ticketHigh: 'Haute',
      ticketCritical: 'Critique',
      submitTicket: 'Envoyer le ticket',
      myTickets: 'Mes tickets',
      ticketOpen: 'Ouvert',
      ticketInProgress: 'En cours',
      ticketResolved: 'Résolu',
    },
    technician: {
      mapDashboard: 'Carte des fermes',
      diagnostics: 'Diagnostics',
      qrSetup: 'Configuration QR',
      fieldNotes: 'Notes terrain',
      farms: 'Fermes',
      nodes: 'Nœuds',
      onlineNodes: 'Nœuds en ligne',
      offlineNodes: 'Nœuds hors ligne',
      warningNodes: 'Nœuds en alerte',
      criticalNodes: 'Nœuds critiques',
      selectFarm: 'Sélectionner ferme',
      runDiagnostic: 'Lancer diagnostic',
      diagnosticResult: 'Résultat diagnostic',
      nodeDetails: 'Détails du nœud',
      firmwareVersion: 'Version firmware',
      lastSeen: 'Dernière apparition',
      signalStrength: 'Force du signal',
      replaceBattery: 'Remplacer batterie',
      calibrateSensor: 'Calibrer capteur',
      updateFirmware: 'Mettre à jour firmware',
      physicalCheck: 'Vérification physique',
      noteTitle: 'Titre de la note',
      noteContent: 'Contenu de la note',
      addPhoto: 'Ajouter photo',
      saveNote: 'Enregistrer note',
      scanQr: 'Scanner QR',
      qrInstructions: 'Scannez le code QR du nœud',
      assignNode: 'Assigner nœud',
      nodeAssigned: 'Nœud assigné',
      fieldVisit: 'Visite terrain',
      completedVisits: 'Visites terminées',
      pendingVisits: 'Visites en attente',
      openTicketsTitle: 'Tickets ouverts',
      closeTicket: 'Fermer ticket',
      resolveIssue: 'Résoudre problème',
    },
    admin: {
      analytics: 'Analytique',
      networkMap: 'Carte réseau',
      predictiveQA: 'Maintenance prédictive',
      billingCRM: 'Facturation & CRM',
      otaUpdates: 'Mises à jour OTA',
      totalFarms: 'Total fermes',
      totalNodes: 'Total nœuds',
      activeUsers: 'Utilisateurs actifs',
      revenue: 'Revenus',
      todayRevenue: 'Revenus du jour',
      monthlyRevenue: 'Revenus mensuels',
      subscriptions: 'Abonnements',
      activePlans: 'Plans actifs',
      expiredPlans: 'Plans expirés',
      pendingPayments: 'Paiements en attente',
      invoice: 'Facture',
      paid: 'Payée',
      unpaid: 'Non payée',
      overdue: 'En retard',
      createSubscription: 'Créer abonnement',
      renewSubscription: 'Renouveler abonnement',
      cancelSubscription: 'Annuler abonnement',
      sendReminder: 'Envoyer rappel',
      deployUpdate: 'Déployer mise à jour',
      selectFirmware: 'Sélectionner firmware',
      targetDevices: 'Appareils cibles',
      rolloutPercentage: 'Pourcentage déploiement',
      rollback: 'Restaurer',
      updateStatus: 'Statut mise à jour',
      updateSuccess: 'Mise à jour réussie',
      updateFailed: 'Échec mise à jour',
      networkHealth: 'Santé réseau',
      gatewayStatus: 'État passerelle',
      bandwidthUsage: 'Utilisation bande passante',
      uptime: 'Disponibilité',
      predictions: 'Prédictions',
      maintenanceForecast: 'Prévisions maintenance',
      failurePrediction: 'Prédiction pannes',
      anomalyDetection: 'Détection anomalies',
      healthScore: 'Score santé',
    },
    languages: {
      darija: 'Darija',
      darijaSous: 'Darija Souss',
      darijaAtlas: 'Darija Atlas',
      darijaChaouia: 'Darija Chaouia',
      darijaDoukkala: 'Darija Doukkala',
      darijaRifi: 'Darija Rif',
      darijaHaouz: 'Dariha Haouz',
      arabic: 'Arabe',
      french: 'Français',
      english: 'Anglais',
    },
  },
  en: {
    common: {
      appName: 'AgroSmart',
      appNameFull: 'AgroSmart AI Morocco',
      tagline: 'Your farm, your peace — AI at the service of agriculture',
      welcome: 'Welcome',
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      back: 'Back',
      confirm: 'Confirm',
      search: 'Search',
      filter: 'Filter',
      all: 'All',
      yes: 'Yes',
      no: 'No',
      status: 'Status',
      actions: 'Actions',
      details: 'Details',
      settings: 'Settings',
      logout: 'Logout',
      language: 'Language',
      dialect: 'Dialect',
      voiceAssistant: 'Hajjaj',
    },
    auth: {
      loginTitle: 'AgroSmart AI Morocco',
      loginSubtitle: 'Your farm, your peace — AI at the service of agriculture',
      phonePlaceholder: '06XXXXXXXX',
      sendOtp: 'Send Verification Code',
      otpPlaceholder: 'Enter Code',
      otpSent: 'Code sent to',
      verify: 'Login',
      demoFarmer: 'Demo Farmer',
      demoTechnician: 'Demo Technician',
      demoAdmin: 'Demo Admin',
      demoLabel: 'Direct Demo Access',
      orUseDemo: 'Or try directly',
    },
    farmer: {
      dashboard: 'Dashboard',
      farm: 'Farm',
      irrigation: 'Irrigation',
      calendar: 'Calendar',
      control: 'Control',
      notifications: 'Notifications',
      support: 'Support',
      alerts: 'Alerts',
      help: 'Help',
      soilMoisture: 'Soil Moisture',
      waterPressure: 'Water Pressure',
      flowRate: 'Flow Rate',
      valveStatus: 'Valve Status',
      open: 'Open',
      closed: 'Closed',
      battery: 'Battery',
      batteryHealth: 'Battery Health',
      lastUpdate: 'Last Update',
      currentCrop: 'Current Crop',
      nextIrrigation: 'Next Irrigation',
      today: 'Today',
      tomorrow: 'Tomorrow',
      wateringNow: 'Watering Now',
      noWatering: 'No Watering',
      startIrrigation: 'Start Irrigation',
      stopIrrigation: 'Stop Irrigation',
      manualMode: 'Manual Mode',
      autoMode: 'Auto Mode',
      aiMode: 'AI Mode',
      aiSuggestion: 'AI Suggestion',
      acceptSuggestion: 'Accept',
      rejectSuggestion: 'Reject',
      cropCalendar: 'Crop Calendar',
      plantingDate: 'Planting Date',
      harvestDate: 'Harvest Date',
      growthStage: 'Growth Stage',
      fertilizer: 'Fertilizer',
      pesticide: 'Pesticide',
      upcomingTasks: 'Upcoming Tasks',
      noTasks: 'No Tasks',
      alertLowBattery: 'Low Battery',
      alertLowMoisture: 'Low Moisture',
      alertValveIssue: 'Valve Issue',
      alertSystemOffline: 'System Offline',
      createTicket: 'Create Ticket',
      ticketSubject: 'Subject',
      ticketDescription: 'Description',
      ticketPriority: 'Priority',
      ticketLow: 'Low',
      ticketNormal: 'Normal',
      ticketHigh: 'High',
      ticketCritical: 'Critical',
      submitTicket: 'Submit Ticket',
      myTickets: 'My Tickets',
      ticketOpen: 'Open',
      ticketInProgress: 'In Progress',
      ticketResolved: 'Resolved',
    },
    technician: {
      mapDashboard: 'Farm Map',
      diagnostics: 'Diagnostics',
      qrSetup: 'QR Setup',
      fieldNotes: 'Field Notes',
      farms: 'Farms',
      nodes: 'Nodes',
      onlineNodes: 'Online Nodes',
      offlineNodes: 'Offline Nodes',
      warningNodes: 'Warning Nodes',
      criticalNodes: 'Critical Nodes',
      selectFarm: 'Select Farm',
      runDiagnostic: 'Run Diagnostic',
      diagnosticResult: 'Diagnostic Result',
      nodeDetails: 'Node Details',
      firmwareVersion: 'Firmware Version',
      lastSeen: 'Last Seen',
      signalStrength: 'Signal Strength',
      replaceBattery: 'Replace Battery',
      calibrateSensor: 'Calibrate Sensor',
      updateFirmware: 'Update Firmware',
      physicalCheck: 'Physical Check',
      noteTitle: 'Note Title',
      noteContent: 'Note Content',
      addPhoto: 'Add Photo',
      saveNote: 'Save Note',
      scanQr: 'Scan QR',
      qrInstructions: 'Scan node QR code',
      assignNode: 'Assign Node',
      nodeAssigned: 'Node Assigned',
      fieldVisit: 'Field Visit',
      completedVisits: 'Completed Visits',
      pendingVisits: 'Pending Visits',
      openTicketsTitle: 'Open Tickets',
      closeTicket: 'Close Ticket',
      resolveIssue: 'Resolve Issue',
    },
    admin: {
      analytics: 'Analytics',
      networkMap: 'Network Map',
      predictiveQA: 'Predictive Maintenance',
      billingCRM: 'Billing & CRM',
      otaUpdates: 'OTA Updates',
      totalFarms: 'Total Farms',
      totalNodes: 'Total Nodes',
      activeUsers: 'Active Users',
      revenue: 'Revenue',
      todayRevenue: 'Today\'s Revenue',
      monthlyRevenue: 'Monthly Revenue',
      subscriptions: 'Subscriptions',
      activePlans: 'Active Plans',
      expiredPlans: 'Expired Plans',
      pendingPayments: 'Pending Payments',
      invoice: 'Invoice',
      paid: 'Paid',
      unpaid: 'Unpaid',
      overdue: 'Overdue',
      createSubscription: 'Create Subscription',
      renewSubscription: 'Renew Subscription',
      cancelSubscription: 'Cancel Subscription',
      sendReminder: 'Send Reminder',
      deployUpdate: 'Deploy Update',
      selectFirmware: 'Select Firmware',
      targetDevices: 'Target Devices',
      rolloutPercentage: 'Rollout Percentage',
      rollback: 'Rollback',
      updateStatus: 'Update Status',
      updateSuccess: 'Update Successful',
      updateFailed: 'Update Failed',
      networkHealth: 'Network Health',
      gatewayStatus: 'Gateway Status',
      bandwidthUsage: 'Bandwidth Usage',
      uptime: 'Uptime',
      predictions: 'Predictions',
      maintenanceForecast: 'Maintenance Forecast',
      failurePrediction: 'Failure Prediction',
      anomalyDetection: 'Anomaly Detection',
      healthScore: 'Health Score',
    },
    languages: {
      darija: 'Darija (Moroccan)',
      darijaSous: 'Darija Souss',
      darijaAtlas: 'Darija Atlas',
      darijaChaouia: 'Darija Chaouia',
      darijaDoukkala: 'Darija Doukkala',
      darijaRifi: 'Darija Rif',
      darijaHaouz: 'Darija Haouz',
      arabic: 'Arabic',
      french: 'French',
      english: 'English',
    },
  },
};

// Regional variations for Moroccan Darija dialects
export const darijaVariations: Record<DarijaDialect, Partial<Translations>> = {
  // Sous/Massa region (Agadir, Tiznit, Taroudant)
  sous: {
    common: {
      tagline: 'تضيعت فراحت ك، الذكا لاصطناعي إخدم معاك',
    },
    farmer: {
      farm: 'تضيعت',
      irrigation: 'أساقي',
      soilMoisture: 'ترطيب ت الأرض',
      waterPressure: 'أضغط ت الما',
      battery: 'لبيطاريا',
      startIrrigation: 'بدا أساقي',
      stopIrrigation: 'وفي أساقي',
    },
  },
  // Atlas region (Marrakech, High Atlas)
  Atlas: {
    common: {
      tagline: 'لبلاصة ديالك، اللمة ديالك، الذكا الاصطناعي معاك',
    },
    farmer: {
      farm: 'لبلاصة',
      irrigation: 'المياه',
      soilMoisture: 'ترطيب الأرض',
      waterPressure: 'ضغط الما',
      battery: 'البيطاريا',
      startIrrigation: 'أعطي الما',
      stopIrrigation: 'حبس الما',
    },
  },
  // Chaouia region (Casablanca, Settat, Berrechid)
  chaouia: {
    common: {
      tagline: 'ضيعة فالراحة، الذكا الاصطناعي خدام',
    },
    farmer: {
      farm: 'الضيعة',
      irrigation: 'السقي',
      soilMoisture: 'ترطيب التراب',
      waterPressure: 'ضغط الماء',
      battery: 'البطارية',
      startIrrigation: 'بدا سقي',
      stopIrrigation: 'وقف سقي',
    },
  },
  // Doukkala region (El Jadida, Safi)
  doukkala: {
    common: {
      tagline: 'ضيعتك فراسك، الذكا الاصطناعي كيدير الخدمة',
    },
    farmer: {
      farm: 'الضيعة',
      irrigation: 'الماء',
      soilMoisture: 'رطوبة الأرض',
      waterPressure: 'ضغط الما',
      battery: 'البيطار',
      startIrrigation: 'خلط الما',
      stopIrrigation: 'سد الما',
    },
  },
  // Rif region (Nador, Al Hoceima, Tetouan)
  rifi: {
    common: {
      tagline: 'البوار ديالك، الراحة ديالك، الذكا الاصطناعي معاك',
    },
    farmer: {
      farm: 'البوار',
      irrigation: 'الما',
      soilMoisture: 'الترطيب',
      waterPressure: 'الضغط',
      battery: 'لبيطاريا',
      startIrrigation: 'عطي الما',
      stopIrrigation: 'كبس الما',
    },
  },
  // Haouz region (Marrakech plain)
  haouz: {
    common: {
      tagline: 'الجنان ديالك، الذكاء الاصطناعي كيعاونك',
    },
    farmer: {
      farm: 'الجنان',
      irrigation: 'الماء',
      soilMoisture: 'رطوبة التراب',
      waterPressure: 'ضغط الماء',
      battery: 'البطارية',
      startIrrigation: 'عطي الماء',
      stopIrrigation: 'قطع الماء',
    },
  },
};
