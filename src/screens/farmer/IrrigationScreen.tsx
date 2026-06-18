import React, { useState } from 'react';
import { CloudRain, Wind, Thermometer, Droplets, Clock, Plus, Trash2, ToggleLeft, ToggleRight, PieChart } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface ScheduleItem {
  id: string;
  sector: string;
  sectorFr: string;
  time: string;
  duration: number;
  days: number[];
  enabled: boolean;
  liters: number;
}

interface IrrigSession {
  time: string;
  duration: number;
  liters: number;
  type: 'auto' | 'manual' | 'ai';
  sector: string;
}

const SESSIONS: IrrigSession[] = [
  { time: '06:00', duration: 45, liters: 675, type: 'auto', sector: 'الأفوكاتو' },
  { time: '12:30', duration: 30, liters: 450, type: 'ai', sector: 'الزيتون' },
  { time: '18:00', duration: 45, liters: 680, type: 'auto', sector: 'الأفوكاتو' },
];

const INITIAL_SCHEDULE: ScheduleItem[] = [
  { id: '1', sector: 'قطاع الأفوكاتو', sectorFr: 'Secteur Avocat', time: '06:00', duration: 45, days: [1, 3, 5], enabled: true, liters: 675 },
  { id: '2', sector: 'قطاع الزيتون', sectorFr: 'Secteur Olivier', time: '07:00', duration: 30, days: [0, 2, 4, 6], enabled: true, liters: 450 },
  { id: '3', sector: 'قطاع الحوامض', sectorFr: 'Secteur Agrumes', time: '18:00', duration: 60, days: [1, 4], enabled: false, liters: 900 },
];

const DAYS_AR = ['أح', 'إث', 'ثل', 'أر', 'خم', 'جم', 'سب'];
const DAYS_FR = ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'];

export default function IrrigationScreen() {
  const { language, t: globalT } = useLanguage();
  const [tab, setTab] = useState<'today' | 'forecast' | 'schedule' | 'budget'>('today');
  const [schedule, setSchedule] = useState<ScheduleItem[]>(INITIAL_SCHEDULE);

  const t = language === 'darija' || language === 'ar' ? {
    title: 'السقي والطقس',
    today: 'اليوم',
    forecast: 'توقعات',
    schedule: 'الجدول',
    budget: 'الميزانية',
    region: 'سوس ماسة',
    ai_decision: 'قرار الذكاء الاصطناعي',
    ai_msg: 'بناءً على التوقعات، كاين الشتا غدا — السيستم غادي يحبس السقي التلقائي باش نوفروا الما',
    history: 'سجل السقي اليوم',
    session: 'جلسة',
    minutes: 'دقيقة',
    liters_short: 'لتر',
    auto: 'تلقائي',
    manual: 'يدوي',
    ai_tag: 'ذكاء اصطناعي',
    total: 'المجموع',
    saved: 'موفر غدا',
    rain_expected: 'متوقع مطر',
    schedule_title: 'جدول السقي التلقائي',
    budget_title: 'ميزانية المياه',
    daily_budget: 'الميزانية اليومية',
    used: 'المستهلك',
    remaining: 'المتبقي',
    this_week: 'هذا الأسبوع',
    monthly_target: 'الهدف الشهري',
    saved_total: 'موفر إجمالاً',
    toggle: 'تفعيل',
    days_label: 'الأيام',
    time_label: 'الوقت',
    duration_label: 'المدة',
    DAYS: DAYS_AR,
    months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'ماي', 'يونيو', 'يوليوز', 'غشت'],
  } : language === 'fr' ? {
    title: 'Irrigation & Météo',
    today: 'Aujourd\'hui',
    forecast: 'Prévisions',
    schedule: 'Planning',
    budget: 'Budget',
    region: 'Souss Massa',
    ai_decision: 'Décision IA',
    ai_msg: 'Pluie prévue demain — le système va suspendre l\'irrigation automatique pour économiser l\'eau',
    history: 'Historique irrigation',
    session: 'Session',
    minutes: 'min',
    liters_short: 'L',
    auto: 'Auto',
    manual: 'Manuel',
    ai_tag: 'IA',
    total: 'Total',
    saved: 'Économisé demain',
    rain_expected: 'Pluie prévue',
    schedule_title: 'Planning irrigation automatique',
    budget_title: 'Budget eau',
    daily_budget: 'Budget journalier',
    used: 'Consommé',
    remaining: 'Restant',
    this_week: 'Cette semaine',
    monthly_target: 'Objectif mensuel',
    saved_total: 'Total économisé',
    toggle: 'Activer',
    days_label: 'Jours',
    time_label: 'Heure',
    duration_label: 'Durée',
    DAYS: DAYS_FR,
    months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août'],
  } : language === 'en' ? {
    title: 'Irrigation & Weather',
    today: 'Today',
    forecast: 'Forecast',
    schedule: 'Schedule',
    budget: 'Budget',
    region: 'Souss Massa',
    ai_decision: 'AI Decision',
    ai_msg: 'Rain expected tomorrow — the system will suspend automatic irrigation to save water',
    history: 'Irrigation History',
    session: 'Session',
    minutes: 'min',
    liters_short: 'L',
    auto: 'Auto',
    manual: 'Manual',
    ai_tag: 'AI',
    total: 'Total',
    saved: 'Saved tomorrow',
    rain_expected: 'Rain expected',
    schedule_title: 'Auto Irrigation Schedule',
    budget_title: 'Water Budget',
    daily_budget: 'Daily Budget',
    used: 'Used',
    remaining: 'Remaining',
    this_week: 'This Week',
    monthly_target: 'Monthly Target',
    saved_total: 'Total Saved',
    toggle: 'Enable',
    days_label: 'Days',
    time_label: 'Time',
    duration_label: 'Duration',
    DAYS: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  } : {
    title: 'الري والطقس',
    today: 'اليوم',
    forecast: 'التوقعات',
    schedule: 'الجدول',
    budget: 'الميزانية',
    region: 'سوس ماسة',
    ai_decision: 'قرار الذكاء الاصطناعي',
    ai_msg: 'متوقع مطر غداً — النظام سيعلق الري التلقائي لتوفير المياه',
    history: 'سجل الري اليوم',
    session: 'جلسة',
    minutes: 'دقيقة',
    liters_short: 'لتر',
    auto: 'تلقائي',
    manual: 'يدوي',
    ai_tag: 'ذكاء اصطناعي',
    total: 'المجموع',
    saved: 'موفر غداً',
    rain_expected: 'متوقع مطر',
    schedule_title: 'جدول الري التلقائي',
    budget_title: 'ميزانية المياه',
    daily_budget: 'الميزانية اليومية',
    used: 'المستهلك',
    remaining: 'المتبقي',
    this_week: 'هذا الأسبوع',
    monthly_target: 'الهدف الشهري',
    saved_total: 'موفر إجمالاً',
    toggle: 'تفعيل',
    days_label: 'الأيام',
    time_label: 'الوقت',
    duration_label: 'المدة',
    DAYS: DAYS_AR,
    months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'ماي', 'يونيو', 'يوليوز', 'غشت'],
  };

  const typeColors = { auto: 'bg-blue-900/50 text-blue-300', manual: 'bg-amber-900/50 text-amber-300', ai: 'bg-emerald-900/50 text-emerald-300' };
  const typeLabels = { auto: t.auto, manual: t.manual, ai: t.ai_tag };

  const forecastDays = [
    { day: t.DAYS[3], icon: '☀️', high: 34, low: 22, rain: 0 },
    { day: t.DAYS[4], icon: '🌧️', high: 26, low: 18, rain: 80 },
    { day: t.DAYS[5], icon: '⛅', high: 29, low: 20, rain: 20 },
    { day: t.DAYS[6], icon: '☀️', high: 33, low: 21, rain: 0 },
    { day: t.DAYS[0], icon: '☀️', high: 35, low: 23, rain: 5 },
  ];

  function toggleSchedule(id: string) {
    setSchedule(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  }

  const totalUsed = SESSIONS.reduce((a, s) => a + s.liters, 0);
  const dailyBudget = 2500;
  const weeklyData = [1800, 2100, 1950, 2300, 1800, 2400, totalUsed];
  const weeklyMax = Math.max(...weeklyData);

  return (
    <div className="min-h-screen bg-[#0d1a0d] text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-cyan-900 px-5 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-white mb-3">{t.title}</h1>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-extralight text-white">34°</span>
              <span className="text-blue-300">C</span>
            </div>
            <p className="text-blue-300 text-sm mt-1">☀️ {t.region}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-1.5">
              <Wind className="w-4 h-4 text-blue-300" />
              <span className="text-white text-sm">18 km/h</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-1.5">
              <Droplets className="w-4 h-4 text-cyan-300" />
              <span className="text-white text-sm">52%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mx-4 mt-4 bg-[#122212] rounded-2xl p-1 mb-4 overflow-x-auto gap-1">
        {(['today', 'forecast', 'schedule', 'budget'] as const).map(tab_ => (
          <button
            key={tab_}
            onClick={() => setTab(tab_)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap px-2 ${
              tab === tab_ ? 'bg-blue-700 text-white shadow' : 'text-gray-400'
            }`}
          >
            {t[tab_]}
          </button>
        ))}
      </div>

      <div className="px-4 space-y-4">
        {tab === 'today' && (
          <>
            {/* AI Decision */}
            <div className="bg-gradient-to-r from-amber-950 to-orange-950 rounded-3xl p-4 border border-amber-800/40 shadow-xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <p className="text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">{t.ai_decision}</p>
                  <p className="text-white text-sm leading-relaxed">{t.ai_msg}</p>
                  <p className="text-emerald-400 text-xs font-bold mt-2">💧 {t.saved}: 1,200 {t.liters_short}</p>
                </div>
              </div>
            </div>

            {/* Sessions */}
            <div className="bg-[#122212] rounded-3xl p-4 border border-green-900/30">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">{t.history}</p>
              <div className="space-y-2">
                {SESSIONS.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#0d1a0d] rounded-2xl p-3">
                    <div className="w-10 h-10 bg-blue-900/40 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-white font-semibold text-sm">{t.session} {i + 1} · {s.sector}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[s.type]}`}>{typeLabels[s.type]}</span>
                      </div>
                      <p className="text-gray-400 text-xs mt-0.5">{s.time} · {s.duration} {t.minutes} · {s.liters} {t.liters_short}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-green-900/30 flex justify-between">
                <span className="text-gray-400 text-sm">{t.total}</span>
                <span className="text-white font-bold">{SESSIONS.reduce((a, s) => a + s.liters, 0)} {t.liters_short}</span>
              </div>
            </div>
          </>
        )}

        {tab === 'forecast' && (
          <>
            <div className="bg-[#122212] rounded-3xl p-4 border border-green-900/30">
              <div className="grid grid-cols-5 gap-2">
                {forecastDays.map((d, i) => (
                  <div key={i} className={`flex flex-col items-center gap-2 p-3 rounded-2xl ${d.icon === '🌧️' ? 'bg-blue-900/30 border border-blue-700/30' : 'bg-[#0d1a0d]'}`}>
                    <p className="text-gray-400 text-xs">{d.day}</p>
                    <span className="text-2xl">{d.icon}</span>
                    <p className="text-white text-xs font-bold">{d.high}°</p>
                    <p className="text-gray-500 text-xs">{d.low}°</p>
                    {d.rain > 0 && <p className="text-blue-300 text-xs font-bold">{d.rain}%</p>}
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-blue-950/50 rounded-2xl p-3 border border-blue-800/30">
                <p className="text-blue-300 text-sm text-center font-medium">🌧️ {t.rain_expected}: {language === 'darija' ? 'الخميس 15-25mm' : 'Jeudi 15-25mm'}</p>
                <p className="text-gray-400 text-xs text-center mt-1">{language === 'darija' ? 'السقي سيتوقف تلقائياً يوم الخميس' : 'Irrigation suspendue automatiquement jeudi'}</p>
              </div>
            </div>
          </>
        )}

        {tab === 'schedule' && (
          <div className="space-y-3">
            <p className="text-gray-400 text-xs uppercase tracking-widest">{t.schedule_title}</p>
            {schedule.map(item => (
              <div key={item.id} className={`bg-[#122212] rounded-3xl p-4 border transition-all ${item.enabled ? 'border-blue-700/30' : 'border-green-900/20 opacity-60'}`}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white font-semibold text-sm">{language === 'darija' ? item.sector : item.sectorFr}</p>
                  <button onClick={() => toggleSchedule(item.id)}>
                    {item.enabled
                      ? <ToggleRight className="w-7 h-7 text-blue-400" />
                      : <ToggleLeft className="w-7 h-7 text-gray-500" />
                    }
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-[#0d1a0d] rounded-xl p-2">
                    <p className="text-gray-500 text-xs">{t.time_label}</p>
                    <p className="text-white font-bold text-sm">{item.time}</p>
                  </div>
                  <div className="bg-[#0d1a0d] rounded-xl p-2">
                    <p className="text-gray-500 text-xs">{t.duration_label}</p>
                    <p className="text-white font-bold text-sm">{item.duration} {t.minutes}</p>
                  </div>
                  <div className="bg-[#0d1a0d] rounded-xl p-2">
                    <p className="text-gray-500 text-xs">{t.liters_short}</p>
                    <p className="text-blue-400 font-bold text-sm">{item.liters}</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-3 flex-wrap">
                  {t.DAYS.map((d, idx) => (
                    <div key={idx} className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold ${
                      item.days.includes(idx) ? 'bg-blue-700 text-white' : 'bg-[#0d1a0d] text-gray-600'
                    }`}>{d}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'budget' && (
          <div className="space-y-4">
            {/* Daily budget */}
            <div className="bg-[#122212] rounded-3xl p-4 border border-green-900/30">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">{t.daily_budget}</p>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400 text-xs">{t.used}</span>
                <span className="text-white text-xs font-bold">{totalUsed} / {dailyBudget} {t.liters_short}</span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden mb-1">
                <div
                  className={`h-full rounded-full transition-all ${totalUsed / dailyBudget > 0.8 ? 'bg-red-500' : 'bg-blue-500'}`}
                  style={{ width: `${(totalUsed / dailyBudget) * 100}%` }}
                />
              </div>
              <p className="text-emerald-400 text-xs text-right">{t.remaining}: {dailyBudget - totalUsed} {t.liters_short}</p>
            </div>

            {/* Weekly chart */}
            <div className="bg-[#122212] rounded-3xl p-4 border border-green-900/30">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">{t.this_week}</p>
              <div className="flex items-end gap-1 h-24">
                {weeklyData.map((v, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 flex-1">
                    <div
                      className={`w-full rounded-t-lg transition-all ${i === 6 ? 'bg-blue-500' : 'bg-blue-800/60'}`}
                      style={{ height: `${(v / weeklyMax) * 80}px` }}
                    />
                    <span className="text-gray-600 text-xs">{t.DAYS[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/30 rounded-3xl p-4 border border-blue-800/30">
                <p className="text-blue-300 text-xs font-semibold mb-1">{t.monthly_target}</p>
                <p className="text-white font-bold text-2xl">45,000</p>
                <p className="text-blue-400 text-xs">{t.liters_short}</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-900/40 to-green-900/30 rounded-3xl p-4 border border-emerald-800/30">
                <p className="text-emerald-300 text-xs font-semibold mb-1">{t.saved_total}</p>
                <p className="text-white font-bold text-2xl">8,450</p>
                <p className="text-emerald-400 text-xs">{t.liters_short}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
