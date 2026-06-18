import React, { useState, useEffect } from 'react';
import { Mic, Droplets, Battery, AlertTriangle, CheckCircle, XCircle, Wifi, TrendingUp, TrendingDown, Thermometer, Wind, Sun } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface CircularGaugeProps {
  value: number;
  max?: number;
  color: string;
  trackColor?: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
}

function CircularGauge({ value, max = 100, color, trackColor = '#1a2e1a', label, sublabel, icon, trend }: CircularGaugeProps) {
  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setDisplayed(value), 300);
    return () => clearTimeout(timer);
  }, [value]);

  const pct = Math.min(displayed / max, 1);
  const r = 38;
  const circ = 2 * Math.PI * r;
  const dash = circ * pct;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke={trackColor} strokeWidth="9" />
          <circle
            cx="50" cy="50" r={r} fill="none"
            stroke={color} strokeWidth="9"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          <div>{icon}</div>
          <span className="text-white font-bold text-xl leading-none">{Math.round(displayed)}%</span>
        </div>
      </div>
      <p className="text-white font-semibold text-xs mt-2 text-center">{label}</p>
      <div className="flex items-center gap-1 mt-0.5">
        <p className="text-gray-400 text-xs">{sublabel}</p>
        {trend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-400" />}
        {trend === 'down' && <TrendingDown className="w-3 h-3 text-red-400" />}
      </div>
    </div>
  );
}

interface VoiceWaveProps { active: boolean; }
function VoiceWave({ active }: VoiceWaveProps) {
  return (
    <div className={`flex items-center gap-1 ${active ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
      {[3, 6, 9, 7, 4, 8, 5].map((h, i) => (
        <div key={i} className="w-1 bg-emerald-400 rounded-full"
          style={{ height: `${h * 4}px`, animation: active ? `wave 0.8s ${i * 0.1}s ease-in-out infinite alternate` : 'none' }} />
      ))}
    </div>
  );
}

export default function FarmerDashboard() {
  const { language, t } = useLanguage();
  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [moisture, setMoisture] = useState(65);
  const [battery, setBattery] = useState(78);

  // Localized text
  const lt = language === 'darija' || language === 'ar' ? {
    greeting: language === 'darija' ? 'صباح الخير، المختار' : 'صباح الخير، المختار',
    live: 'مباشر',
    allSensors: 'جميع المستشعرات سليمة · 3 قطاعات نشطة',
    harvestIn: 'الحصاد بعد',
    days: 'يوم',
    solarCharge: 'شارج بالشمس',
    excellent: 'ممتاز',
    low: 'منخفض',
    moderate: 'معتدل',
    sectors: 'القطاعات',
    sectorOlive: 'زيتون',
    sectorAvoc: 'أفوكاتو',
    sectorAgr: 'حوامض',
    aiTip: 'نصيحة الذكاء الاصطناعي',
    aiMsg: language === 'darija' ? 'الرطوبة مزيانة، ما محتاجش سقي اليوم. موفر 450 لتر.' : 'الرطوبة جيدة، لا حاجة للري اليوم. موفر 450 لتر.',
    waterSaved: 'مياه موفرة اليوم',
    liters: 'لتر',
    todaySavings: 'توفير اليوم',
    listening: language === 'darija' ? 'حجّاج كيسمعك...' : 'حجّاج يستمع إليك...',
    voiceResponse: language === 'darija' ? 'فهمت: الضيعة بخير، رطوبة ممتازة، لا حاجة لسقي الآن.' : 'فهمت: المزرعة بخير، رطوبة ممتازة، لا حاجة للري الآن.',
    statusGood: 'كلشي مزيان',
    statusWarn: 'كاين تنبيه',
    statusCrit: 'خطر / عطب',
  } : language === 'fr' ? {
    greeting: 'Bonjour, Mokhtar',
    live: 'En direct',
    allSensors: 'Tous capteurs OK · 3 secteurs actifs',
    harvestIn: 'Récolte dans',
    days: 'j',
    solarCharge: 'Charge solaire',
    excellent: 'Excellent',
    low: 'Bas',
    moderate: 'Modéré',
    sectors: 'Secteurs',
    sectorOlive: 'Olivier',
    sectorAvoc: 'Avocat',
    sectorAgr: 'Agrumes',
    aiTip: 'Conseil IA',
    aiMsg: 'Humidité optimale. Irrigation non nécessaire. 450L économisés.',
    waterSaved: 'Eau économisée',
    liters: 'L',
    todaySavings: 'Économies du jour',
    listening: 'Hajjaj vous écoute...',
    voiceResponse: 'Compris: La ferme est en bonne état, humidité optimale, pas d\'irrigation nécessaire.',
    statusGood: 'Tout va bien',
    statusWarn: 'Alerte active',
    statusCrit: 'Danger / Panne',
  } : {
    greeting: 'Good morning, Mokhtar',
    live: 'Live',
    allSensors: 'All sensors OK · 3 active sectors',
    harvestIn: 'Harvest in',
    days: 'd',
    solarCharge: 'Solar Charge',
    excellent: 'Excellent',
    low: 'Low',
    moderate: 'Moderate',
    sectors: 'Sectors',
    sectorOlive: 'Olive',
    sectorAvoc: 'Avocado',
    sectorAgr: 'Citrus',
    aiTip: 'AI Tip',
    aiMsg: 'Optimal humidity. No irrigation needed. 450L saved.',
    waterSaved: 'Water Saved Today',
    liters: 'L',
    todaySavings: 'Today\'s Savings',
    listening: 'Hajjaj is listening...',
    voiceResponse: 'Understood: Farm is in good condition, optimal humidity, no irrigation needed.',
    statusGood: 'All Good',
    statusWarn: 'Active Alert',
    statusCrit: 'Danger / Failure',
  };

  // Simulate live sensor fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setMoisture(prev => Math.min(100, Math.max(10, prev + (Math.random() - 0.5) * 2)));
      setBattery(prev => Math.min(100, Math.max(5, prev + (Math.random() - 0.6) * 0.5)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const overallStatus: 'good' | 'warn' | 'crit' = moisture < 25 ? 'crit' : moisture < 40 ? 'warn' : 'good';

  const statusConfig = {
    good: { color: 'from-emerald-700 to-green-700', border: 'border-emerald-500/40', label: lt.statusGood, icon: <CheckCircle className="w-6 h-6 text-white" />, glow: 'shadow-emerald-900/50' },
    warn: { color: 'from-amber-700 to-yellow-700', border: 'border-amber-400/40', label: lt.statusWarn, icon: <AlertTriangle className="w-6 h-6 text-white" />, glow: 'shadow-amber-900/50' },
    crit: { color: 'from-red-700 to-red-600', border: 'border-red-400/40', label: lt.statusCrit, icon: <XCircle className="w-6 h-6 text-white" />, glow: 'shadow-red-900/50' },
  }[overallStatus];

  function handleVoicePress() {
    if (voiceActive) return;
    setVoiceActive(true);
    setVoiceText(lt.listening);
    setTimeout(() => { setVoiceText(lt.voiceResponse); setVoiceActive(false); }, 3000);
  }

  const moistureLabel = moisture > 60 ? lt.excellent : moisture > 40 ? lt.moderate : lt.low;
  const moistureColor = moisture > 60 ? '#10b981' : moisture > 40 ? '#f59e0b' : '#ef4444';

  const sectors = [
    { name: lt.sectorAvoc, moisture: Math.round(moisture), status: 'ok' as const },
    { name: lt.sectorOlive, moisture: Math.round(moisture * 0.85), status: moisture * 0.85 < 30 ? 'warn' as const : 'ok' as const },
    { name: lt.sectorAgr, moisture: Math.round(moisture * 0.7), status: moisture * 0.7 < 25 ? 'crit' as const : 'ok' as const },
  ];

  return (
    <div className="min-h-screen bg-[#0d1a0d] text-white pb-28">
      <style>{`
        @keyframes wave { from { transform: scaleY(0.4); } to { transform: scaleY(1); } }
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(1.6); opacity: 0; } }
        .pulse-ring::before { content:''; position:absolute; inset:-8px; border-radius:50%; border:2px solid #10b981; animation:pulse-ring 1.5s infinite; }
      `}</style>

      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 to-emerald-900 px-5 pt-12 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-300 font-semibold">{lt.greeting}</p>
            <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              {lt.live} · {t.farmer.lastUpdate}: 14:32
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Weather mini */}
            <div className="flex items-center gap-2 bg-emerald-900/50 rounded-2xl px-3 py-2">
              <Thermometer className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-white text-sm font-semibold">34°</span>
              <Wind className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-gray-300 text-xs">18</span>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-900/50 rounded-full px-3 py-1.5">
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-xs font-semibold">3</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-2 space-y-3">
        {/* Status Card */}
        <div className={`bg-gradient-to-r ${statusConfig.color} rounded-3xl p-4 border ${statusConfig.border} shadow-xl ${statusConfig.glow}`}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white/15 rounded-2xl flex items-center justify-center">
              {statusConfig.icon}
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-xl">{statusConfig.label}</p>
              <p className="text-white/70 text-xs">{lt.allSensors}</p>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-xs">{lt.harvestIn}</p>
              <p className="text-white font-bold text-2xl">22</p>
              <p className="text-white/60 text-xs">{lt.days}</p>
            </div>
          </div>
        </div>

        {/* Gauges */}
        <div className="bg-[#122212] rounded-3xl p-5 shadow-xl border border-green-900/30">
          <div className="flex justify-around">
            <CircularGauge
              value={Math.round(moisture)}
              color={moistureColor}
              label={t.farmer.soilMoisture}
              sublabel={moistureLabel}
              icon={<Droplets className="w-5 h-5" style={{ color: moistureColor }} />}
              trend="up"
            />
            <div className="w-px bg-green-900/40" />
            <CircularGauge
              value={Math.round(battery)}
              color={battery > 50 ? '#f59e0b' : '#ef4444'}
              label={t.farmer.battery}
              sublabel={lt.solarCharge}
              icon={<Battery className="w-5 h-5" style={{ color: battery > 50 ? '#f59e0b' : '#ef4444' }} />}
              trend={battery > 70 ? 'up' : 'down'}
            />
          </div>
        </div>

        {/* Sectors quick view */}
        <div className="bg-[#122212] rounded-3xl p-4 shadow-xl border border-green-900/30">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">{lt.sectors}</p>
          <div className="space-y-2">
            {sectors.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.status === 'ok' ? 'bg-emerald-400' : s.status === 'warn' ? 'bg-amber-400' : 'bg-red-400'}`} />
                <p className="text-white text-sm flex-1">{s.name}</p>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${s.status === 'ok' ? 'bg-emerald-500' : s.status === 'warn' ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${s.moisture}%` }}
                    />
                  </div>
                  <span className={`text-xs font-semibold w-8 text-right ${s.status === 'ok' ? 'text-emerald-400' : s.status === 'warn' ? 'text-amber-400' : 'text-red-400'}`}>{s.moisture}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Tip */}
        <div className="bg-[#122212] rounded-3xl p-4 shadow-xl border border-emerald-900/30">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🤖</span>
            </div>
            <div>
              <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">{lt.aiTip}</p>
              <p className="text-white text-sm leading-relaxed">{lt.aiMsg}</p>
            </div>
          </div>
        </div>

        {/* Water savings + Solar */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-blue-900/60 to-cyan-900/40 rounded-3xl p-4 border border-blue-800/30">
            <Droplets className="w-5 h-5 text-blue-400 mb-2" />
            <p className="text-blue-300 text-xs font-semibold">{lt.waterSaved}</p>
            <p className="text-white font-bold text-2xl">450</p>
            <p className="text-blue-300 text-xs">{lt.liters}</p>
          </div>
          <div className="bg-gradient-to-br from-amber-900/60 to-yellow-900/40 rounded-3xl p-4 border border-amber-800/30">
            <Sun className="w-5 h-5 text-amber-400 mb-2" />
            <p className="text-amber-300 text-xs font-semibold">{lt.todaySavings}</p>
            <p className="text-white font-bold text-2xl">-18</p>
            <p className="text-amber-300 text-xs">DH</p>
          </div>
        </div>
      </div>

      {/* Hajjaj voice button */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30">
        {voiceText && (
          <div className="bg-black/85 backdrop-blur-md text-white text-xs px-4 py-2.5 rounded-2xl max-w-xs text-center border border-emerald-900/50 shadow-xl leading-relaxed">
            {voiceText}
          </div>
        )}
        <div className="flex flex-col items-center gap-1.5">
          {voiceActive && <VoiceWave active={voiceActive} />}
          <button
            onMouseDown={handleVoicePress}
            onTouchStart={handleVoicePress}
            className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90 ${
              voiceActive ? 'bg-emerald-500 pulse-ring' : 'bg-gradient-to-br from-emerald-500 to-green-700'
            }`}
          >
            <Mic className="w-7 h-7 text-white" />
          </button>
          <span className="text-emerald-400 text-xs font-semibold">{t.common.voiceAssistant}</span>
        </div>
      </div>
    </div>
  );
}
