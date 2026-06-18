import React, { useState } from 'react';
import { CalendarDays, Plus, ChevronLeft, ChevronRight, Droplets, Sun, Wind, CheckCircle2, Circle, Sprout, Scissors } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface CropEvent {
  id: string;
  date: string;
  type: 'irrigation' | 'fertilizer' | 'harvest' | 'pruning' | 'treatment';
  title: string;
  titleFr: string;
  done: boolean;
  ai?: boolean;
}

const ICONS = {
  irrigation: <Droplets className="w-4 h-4" />,
  fertilizer: <Sprout className="w-4 h-4" />,
  harvest: <Sun className="w-4 h-4" />,
  pruning: <Scissors className="w-4 h-4" />,
  treatment: <Wind className="w-4 h-4" />,
};

const TYPE_COLORS = {
  irrigation: 'bg-blue-900/50 text-blue-300 border-blue-700/40',
  fertilizer: 'bg-green-900/50 text-green-300 border-green-700/40',
  harvest: 'bg-amber-900/50 text-amber-300 border-amber-700/40',
  pruning: 'bg-violet-900/50 text-violet-300 border-violet-700/40',
  treatment: 'bg-rose-900/50 text-rose-300 border-rose-700/40',
};

const INITIAL_EVENTS: CropEvent[] = [
  { id: '1', date: '2026-06-16', type: 'irrigation', title: 'سقي قطاع الأفوكاتو', titleFr: 'Irrigation secteur Avocat', done: true, ai: true },
  { id: '2', date: '2026-06-17', type: 'fertilizer', title: 'إضافة سماد النيتروجين', titleFr: 'Engrais azoté', done: true },
  { id: '3', date: '2026-06-18', type: 'irrigation', title: 'سقي الحوامض', titleFr: 'Irrigation Agrumes', done: false, ai: true },
  { id: '4', date: '2026-06-18', type: 'treatment', title: 'رش مبيد فطري', titleFr: 'Traitement fongicide', done: false },
  { id: '5', date: '2026-06-20', type: 'pruning', title: 'تقليم أشجار الزيتون', titleFr: 'Taille oliviers', done: false },
  { id: '6', date: '2026-06-25', type: 'fertilizer', title: 'سماد البوتاسيوم', titleFr: 'Engrais potassique', done: false, ai: true },
  { id: '7', date: '2026-07-10', type: 'harvest', title: 'بداية موسم جني الأفوكاتو', titleFr: 'Début récolte Avocat', done: false },
  { id: '8', date: '2026-07-20', type: 'irrigation', title: 'جلسة سقي عميقة', titleFr: 'Irrigation profonde', done: false, ai: true },
  { id: '9', date: '2026-08-01', type: 'harvest', title: 'جني الحوامض', titleFr: 'Récolte Agrumes', done: false },
];

const MONTHS_AR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'ماي', 'يونيو', 'يوليوز', 'غشت', 'شتنبر', 'أكتوبر', 'نونبر', 'دجنبر'];
const MONTHS_FR = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
const DAYS_AR = ['أح', 'إث', 'ثل', 'أر', 'خم', 'جم', 'سب'];
const DAYS_FR = ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'];

export default function CropCalendarScreen() {
  const { language, t: globalT } = useLanguage();
  const [events, setEvents] = useState<CropEvent[]>(INITIAL_EVENTS);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 18)); // June 2026
  const [selectedDate, setSelectedDate] = useState<string>('2026-06-18');

  const t = language === 'darija' ? {
    title: 'التقويم الزراعي',
    subtitle: 'جدولة المهام الذكية',
    today: 'اليوم',
    ai_planned: 'مخطط بالذكاء الاصطناعي',
    no_events: 'ما كاينش مهام هاد اليوم',
    upcoming: 'المهام القادمة',
    done_label: 'منجز',
    pending_label: 'معلق',
    harvest_in: 'الحصاد بعد',
    days: 'يوم',
    months: MONTHS_AR,
    days_short: DAYS_AR,
    mark_done: 'تحديد كمنجز',
  } : {
    title: 'Calendrier agricole',
    subtitle: 'Planification intelligente',
    today: 'Aujourd\'hui',
    ai_planned: 'Planifié par IA',
    no_events: 'Aucune tâche ce jour',
    upcoming: 'Tâches à venir',
    done_label: 'Fait',
    pending_label: 'À faire',
    harvest_in: 'Récolte dans',
    days: 'j',
    months: MONTHS_FR,
    days_short: DAYS_FR,
    mark_done: 'Marquer fait',
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const eventsForDate = (dateStr: string) => events.filter(e => e.date === dateStr);
  const selectedEvents = eventsForDate(selectedDate);

  function toggleEvent(id: string) {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, done: !e.done } : e));
  }

  const nextHarvest = events.find(e => e.type === 'harvest' && !e.done);
  const daysToHarvest = nextHarvest
    ? Math.ceil((new Date(nextHarvest.date).getTime() - Date.now()) / 86400000)
    : null;

  function prevMonth() { setCurrentDate(new Date(year, month - 1, 1)); }
  function nextMonth() { setCurrentDate(new Date(year, month + 1, 1)); }

  const upcomingEvents = events
    .filter(e => !e.done && e.date >= '2026-06-18')
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[#0d1a0d] text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 to-green-950 px-5 pt-12 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{t.title}</h1>
            <p className="text-emerald-400/70 text-xs mt-0.5">{t.subtitle}</p>
          </div>
          {daysToHarvest !== null && (
            <div className="bg-amber-900/40 border border-amber-700/40 rounded-2xl px-3 py-2 text-center">
              <p className="text-amber-300 font-bold text-xl leading-none">{daysToHarvest}</p>
              <p className="text-amber-400/70 text-xs leading-tight">{t.harvest_in}</p>
              <p className="text-amber-400/70 text-xs">{t.days}</p>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {/* Calendar */}
        <div className="bg-[#122212] rounded-3xl p-4 border border-green-900/30 shadow-xl">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <p className="text-white font-semibold">
              {t.months[month]} {year}
            </p>
            <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {t.days_short.map(d => (
              <div key={d} className="text-center text-gray-500 text-xs font-semibold py-1">{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-y-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const dayEvents = eventsForDate(dateStr);
              const isSelected = dateStr === selectedDate;
              const isToday = dateStr === '2026-06-18';

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`relative flex flex-col items-center py-1.5 rounded-xl transition-all ${
                    isSelected ? 'bg-emerald-700' : isToday ? 'bg-emerald-900/50' : 'hover:bg-white/5'
                  }`}
                >
                  <span className={`text-sm font-medium ${isSelected ? 'text-white' : isToday ? 'text-emerald-400' : 'text-gray-300'}`}>
                    {day}
                  </span>
                  {dayEvents.length > 0 && (
                    <div className="flex gap-0.5 mt-0.5">
                      {dayEvents.slice(0, 3).map((e, i) => (
                        <div key={i} className={`w-1 h-1 rounded-full ${
                          e.type === 'harvest' ? 'bg-amber-400' :
                          e.type === 'irrigation' ? 'bg-blue-400' :
                          e.type === 'fertilizer' ? 'bg-green-400' :
                          e.type === 'pruning' ? 'bg-violet-400' : 'bg-rose-400'
                        } ${e.done ? 'opacity-40' : ''}`} />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected day events */}
        <div className="bg-[#122212] rounded-3xl p-4 border border-green-900/30 shadow-xl">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">
            {selectedDate === '2026-06-18' ? t.today : selectedDate}
          </p>
          {selectedEvents.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">{t.no_events}</p>
          ) : (
            <div className="space-y-2">
              {selectedEvents.map(ev => (
                <div
                  key={ev.id}
                  className={`flex items-center gap-3 rounded-2xl p-3 border transition-all ${TYPE_COLORS[ev.type]} ${ev.done ? 'opacity-50' : ''}`}
                >
                  <div>{ICONS[ev.type]}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-semibold ${ev.done ? 'line-through' : ''}`}>
                        {language === 'darija' ? ev.title : ev.titleFr}
                      </p>
                      {ev.ai && (
                        <span className="text-xs bg-emerald-900/50 text-emerald-300 px-1.5 py-0.5 rounded-full">AI</span>
                      )}
                    </div>
                    <p className="text-xs opacity-60 mt-0.5">{ev.done ? t.done_label : t.pending_label}</p>
                  </div>
                  <button onClick={() => toggleEvent(ev.id)} className="flex-shrink-0">
                    {ev.done
                      ? <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      : <Circle className="w-5 h-5 opacity-40" />
                    }
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming */}
        <div className="bg-[#122212] rounded-3xl p-4 border border-green-900/30 shadow-xl">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">{t.upcoming}</p>
          <div className="space-y-2">
            {upcomingEvents.map(ev => {
              const d = new Date(ev.date);
              const dDay = Math.ceil((d.getTime() - Date.now()) / 86400000);
              return (
                <div key={ev.id} className="flex items-center gap-3 bg-[#0d1a0d] rounded-2xl p-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${TYPE_COLORS[ev.type]}`}>
                    {ICONS[ev.type]}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{language === 'darija' ? ev.title : ev.titleFr}</p>
                    <p className="text-gray-500 text-xs">{ev.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${dDay <= 3 ? 'text-red-400' : dDay <= 7 ? 'text-amber-400' : 'text-gray-400'}`}>
                      {dDay <= 0 ? t.today : `+${dDay}${t.days}`}
                    </p>
                    {ev.ai && <p className="text-emerald-400 text-xs">AI</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
