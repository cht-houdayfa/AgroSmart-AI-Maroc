import React, { useState } from 'react';
import { FileText, Plus, MapPin, Camera, CheckCircle, Clock, Wrench, AlertTriangle, ChevronRight, Send } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface FieldNote {
  id: string;
  farmName: string;
  farmNameFr: string;
  type: 'inspection' | 'repair' | 'replacement' | 'calibration';
  descAr: string;
  descFr: string;
  status: 'open' | 'done';
  priority: 'low' | 'normal' | 'high' | 'critical';
  date: string;
  duration: number;
  photos: number;
}

const INITIAL_NOTES: FieldNote[] = [
  {
    id: '1', farmName: 'تعاونية فاطمة - الغرب', farmNameFr: 'Coop. Fatima - Gharb',
    type: 'repair', descAr: 'استبدال بطارية NODE-GHR-002 البالغة 15%. تم تركيب بطارية 18650 جديدة وتصفير العدادات.',
    descFr: 'Remplacement batterie NODE-GHR-002 à 15%. Nouvelle batterie 18650 installée.', status: 'done', priority: 'critical', date: '2026-06-17', duration: 45, photos: 3,
  },
  {
    id: '2', farmName: 'ضيعة المختار - أكادير', farmNameFr: 'Ferme Mokhtar - Agadir',
    type: 'calibration', descAr: 'إعادة معايرة مستشعر NODE-AGA-002. تم تنظيفه من ترسبات الأملاح وإعادة ضبطه.',
    descFr: 'Recalibration capteur NODE-AGA-002. Nettoyage dépôts sel et remise à zéro.', status: 'open', priority: 'high', date: '2026-06-18', duration: 0, photos: 0,
  },
  {
    id: '3', farmName: 'ضيعة الحسن - مراكش', farmNameFr: 'Ferme Hassan - Marrakech',
    type: 'inspection', descAr: 'فحص دوري عام. كل الأجهزة تعمل بشكل طبيعي. تم تنظيف ألواح الطاقة الشمسية.',
    descFr: 'Inspection périodique. Tous les appareils normaux. Panneaux solaires nettoyés.', status: 'done', priority: 'normal', date: '2026-06-15', duration: 90, photos: 5,
  },
];

type NewNoteForm = { farm: string; type: FieldNote['type']; desc: string; priority: FieldNote['priority'] };

export default function FieldNotesScreen() {
  const { language, t: globalT } = useLanguage();
  const [notes, setNotes] = useState<FieldNote[]>(INITIAL_NOTES);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState<NewNoteForm>({ farm: '', type: 'inspection', desc: '', priority: 'normal' });
  const [activeNote, setActiveNote] = useState<string | null>(null);

  const t = language === 'darija' ? {
    title: 'تقارير الميدان',
    subtitle: 'سجل التدخلات اليومية',
    new_note: 'تقرير جديد',
    open_tickets: 'مفتوحة',
    done_today: 'منجزة اليوم',
    total_time: 'الوقت المجموع',
    hours: 'ساعة',
    minutes: 'دقيقة',
    type_inspection: 'فحص دوري',
    type_repair: 'إصلاح',
    type_replacement: 'استبدال',
    type_calibration: 'معايرة',
    priority_low: 'منخفض',
    priority_normal: 'عادي',
    priority_high: 'عالي',
    priority_critical: 'حرج',
    status_done: 'منجز',
    status_open: 'مفتوح',
    photos: 'صور',
    duration: 'المدة',
    farm: 'الضيعة',
    submit: 'حفظ التقرير',
    cancel: 'إلغاء',
    desc_placeholder: 'وصف التدخل بالتفصيل...',
    farm_placeholder: 'اسم الضيعة',
    send_report: 'إرسال للإدارة',
    mark_done: 'تحديد كمنجز',
  } : {
    title: 'Rapports terrain',
    subtitle: 'Journal des interventions',
    new_note: 'Nouveau rapport',
    open_tickets: 'Ouvertes',
    done_today: 'Fait aujourd\'hui',
    total_time: 'Temps total',
    hours: 'h',
    minutes: 'min',
    type_inspection: 'Inspection',
    type_repair: 'Réparation',
    type_replacement: 'Remplacement',
    type_calibration: 'Calibration',
    priority_low: 'Faible',
    priority_normal: 'Normal',
    priority_high: 'Élevé',
    priority_critical: 'Critique',
    status_done: 'Fait',
    status_open: 'Ouvert',
    photos: 'photos',
    duration: 'Durée',
    farm: 'Ferme',
    submit: 'Sauvegarder',
    cancel: 'Annuler',
    desc_placeholder: 'Décrire l\'intervention en détail...',
    farm_placeholder: 'Nom de la ferme',
    send_report: 'Envoyer à l\'admin',
    mark_done: 'Marquer fait',
  };

  const TYPE_ICONS = {
    inspection: <CheckCircle className="w-4 h-4" />,
    repair: <Wrench className="w-4 h-4" />,
    replacement: <Plus className="w-4 h-4" />,
    calibration: <AlertTriangle className="w-4 h-4" />,
  };

  const TYPE_COLORS = {
    inspection: 'text-emerald-400 bg-emerald-900/30',
    repair: 'text-red-400 bg-red-900/30',
    replacement: 'text-violet-400 bg-violet-900/30',
    calibration: 'text-amber-400 bg-amber-900/30',
  };

  const TYPE_LABELS = {
    inspection: t.type_inspection,
    repair: t.type_repair,
    replacement: t.type_replacement,
    calibration: t.type_calibration,
  };

  const PRIORITY_COLORS = {
    low: 'text-gray-400',
    normal: 'text-blue-400',
    high: 'text-amber-400',
    critical: 'text-red-400',
  };

  const openCount = notes.filter(n => n.status === 'open').length;
  const doneToday = notes.filter(n => n.status === 'done' && n.date === '2026-06-18').length;
  const totalMinutes = notes.filter(n => n.status === 'done').reduce((a, n) => a + n.duration, 0);

  function submitNote() {
    if (!form.farm || !form.desc) return;
    const newNote: FieldNote = {
      id: 'n' + Date.now(),
      farmName: form.farm,
      farmNameFr: form.farm,
      type: form.type,
      descAr: form.desc,
      descFr: form.desc,
      status: 'open',
      priority: form.priority,
      date: '2026-06-18',
      duration: 0,
      photos: 0,
    };
    setNotes(prev => [newNote, ...prev]);
    setForm({ farm: '', type: 'inspection', desc: '', priority: 'normal' });
    setShowNew(false);
  }

  function markDone(id: string) {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, status: 'done', duration: 60 } : n));
    setActiveNote(null);
  }

  return (
    <div className="min-h-screen bg-[#0d1a0d] text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-950 to-orange-950 px-5 pt-12 pb-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-2xl font-bold text-white">{t.title}</h1>
            <p className="text-amber-400/70 text-xs mt-0.5">{t.subtitle}</p>
          </div>
          <button
            onClick={() => setShowNew(true)}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold px-4 py-2.5 rounded-2xl text-sm transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            {t.new_note}
          </button>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 bg-black/20 rounded-2xl p-3 text-center">
            <p className="text-red-400 font-bold text-xl">{openCount}</p>
            <p className="text-gray-400 text-xs">{t.open_tickets}</p>
          </div>
          <div className="flex-1 bg-black/20 rounded-2xl p-3 text-center">
            <p className="text-emerald-400 font-bold text-xl">{doneToday || notes.filter(n => n.status === 'done').length}</p>
            <p className="text-gray-400 text-xs">{t.done_today}</p>
          </div>
          <div className="flex-1 bg-black/20 rounded-2xl p-3 text-center">
            <p className="text-amber-400 font-bold text-xl">{Math.floor(totalMinutes / 60)}h{totalMinutes % 60}</p>
            <p className="text-gray-400 text-xs">{t.total_time}</p>
          </div>
        </div>
      </div>

      {/* New note form */}
      {showNew && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end">
          <div className="w-full bg-[#0d1a0d] rounded-t-3xl p-5 border-t border-amber-900/40 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">{t.new_note}</h3>
              <button onClick={() => setShowNew(false)} className="text-gray-400 text-sm">{t.cancel}</button>
            </div>

            <div className="space-y-3">
              <input
                value={form.farm}
                onChange={e => setForm(f => ({ ...f, farm: e.target.value }))}
                placeholder={t.farm_placeholder}
                className="w-full bg-[#122212] text-white rounded-2xl px-4 py-3 border border-green-900/30 focus:outline-none focus:border-amber-500 text-sm"
              />

              <div className="grid grid-cols-2 gap-2">
                {(['inspection', 'repair', 'replacement', 'calibration'] as const).map(tp => (
                  <button
                    key={tp}
                    onClick={() => setForm(f => ({ ...f, type: tp }))}
                    className={`flex items-center gap-2 p-3 rounded-2xl border transition-all text-sm ${
                      form.type === tp ? TYPE_COLORS[tp] + ' border-current/40' : 'bg-[#122212] text-gray-400 border-transparent'
                    }`}
                  >
                    {TYPE_ICONS[tp]}
                    {TYPE_LABELS[tp]}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-2">
                {(['low', 'normal', 'high', 'critical'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setForm(f => ({ ...f, priority: p }))}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                      form.priority === p ? PRIORITY_COLORS[p] + ' bg-white/10' : 'text-gray-500 bg-[#122212]'
                    }`}
                  >
                    {t[`priority_${p}` as keyof typeof t]}
                  </button>
                ))}
              </div>

              <textarea
                value={form.desc}
                onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
                placeholder={t.desc_placeholder}
                rows={4}
                className="w-full bg-[#122212] text-white rounded-2xl px-4 py-3 border border-green-900/30 focus:outline-none focus:border-amber-500 text-sm resize-none"
              />

              <button className="w-full flex items-center justify-center gap-2 bg-[#122212] border border-dashed border-amber-700/40 text-amber-400 font-semibold py-3 rounded-2xl text-sm">
                <Camera className="w-4 h-4" /> {language === 'darija' ? 'إضافة صور' : 'Ajouter photos'}
              </button>

              <button
                onClick={submitNote}
                disabled={!form.farm || !form.desc}
                className="w-full bg-amber-700 hover:bg-amber-600 text-white font-bold py-3.5 rounded-2xl transition-all active:scale-95 disabled:opacity-40"
              >
                {t.submit}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes list */}
      <div className="px-4 mt-5 space-y-3">
        {notes.map(note => (
          <div
            key={note.id}
            onClick={() => setActiveNote(activeNote === note.id ? null : note.id)}
            className={`bg-[#122212] rounded-3xl p-4 border transition-all cursor-pointer ${
              note.status === 'open' ? 'border-amber-700/30' : 'border-green-900/20'
            } ${note.status === 'done' ? 'opacity-70' : ''}`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${TYPE_COLORS[note.type]}`}>
                {TYPE_ICONS[note.type]}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-white font-semibold text-sm">{language === 'darija' ? note.farmName : note.farmNameFr}</p>
                  <span className={`text-xs font-semibold ${note.status === 'done' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {note.status === 'done' ? t.status_done : t.status_open}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs ${PRIORITY_COLORS[note.priority]}`}>
                    {t[`priority_${note.priority}` as keyof typeof t]}
                  </span>
                  <span className="text-gray-600 text-xs">·</span>
                  <span className="text-gray-500 text-xs">{note.date}</span>
                  {note.photos > 0 && (
                    <>
                      <span className="text-gray-600 text-xs">·</span>
                      <span className="text-gray-400 text-xs">{note.photos} {t.photos}</span>
                    </>
                  )}
                </div>
                <p className="text-gray-400 text-xs mt-1.5 leading-relaxed line-clamp-2">
                  {language === 'darija' ? note.descAr : note.descFr}
                </p>
              </div>
              <ChevronRight className={`w-4 h-4 text-gray-600 flex-shrink-0 mt-1 transition-transform ${activeNote === note.id ? 'rotate-90' : ''}`} />
            </div>

            {/* Expanded actions */}
            {activeNote === note.id && (
              <div className="mt-3 pt-3 border-t border-green-900/20 flex gap-2">
                {note.status === 'open' && (
                  <button
                    onClick={e => { e.stopPropagation(); markDone(note.id); }}
                    className="flex-1 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> {t.mark_done}
                  </button>
                )}
                <button
                  onClick={e => e.stopPropagation()}
                  className="flex-1 bg-blue-900/40 text-blue-300 text-xs font-semibold py-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" /> {t.send_report}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
