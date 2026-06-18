import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, ChevronRight, Timer } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface Sector {
  id: string;
  name: string;
  nameAr: string;
  isOpen: boolean;
  countdown: number | null;
}

const DEFAULT_SECTORS: Sector[] = [
  { id: '1', name: 'Secteur Avocat Nord', nameAr: 'قطاع الأفوكاتو الشمالي', isOpen: false, countdown: null },
  { id: '2', name: 'Secteur Avocat Sud', nameAr: 'قطاع الأفوكاتو الجنوبي', isOpen: true, countdown: 1248 },
  { id: '3', name: 'Secteur Agrumes', nameAr: 'قطاع الحوامض', isOpen: false, countdown: null },
];

export default function ManualControlScreen() {
  const { language, t: globalT } = useLanguage();
  const [confirmed, setConfirmed] = useState(false);
  const [sectors, setSectors] = useState<Sector[]>(DEFAULT_SECTORS);

  const t = language === 'darija' ? {
    title: 'التحكم اليدوي',
    warning: 'تنبيه مهم',
    warning_msg: 'هذه الشاشة للتحكم الطارئ فقط. أي تغيير كيؤثر مباشرة على الصمامات في الحقل.',
    confirm: 'فهمت، دخول للتحكم',
    cancel: 'رجوع',
    open: 'مفتوح',
    closed: 'مغلق',
    auto_close: 'يغلق تلقائياً',
    minutes: 'دقيقة',
    slide_to_open: 'حرك باش تفتح',
    slide_to_close: 'حرك باش تغلق',
    sector_status: 'حالة القطاعات',
    safety_note: 'الأمان: كل قطاع مفتوح يغلق تلقائياً بعد 30 دقيقة',
  } : {
    title: 'Contrôle Manuel',
    warning: 'Avertissement',
    warning_msg: 'Cet écran est pour le contrôle d\'urgence uniquement. Tout changement affecte directement les vannes.',
    confirm: 'Compris, accéder au contrôle',
    cancel: 'Retour',
    open: 'Ouvert',
    closed: 'Fermé',
    auto_close: 'Fermeture auto dans',
    minutes: 'min',
    slide_to_open: 'Glisser pour ouvrir',
    slide_to_close: 'Glisser pour fermer',
    sector_status: 'État des secteurs',
    safety_note: 'Sécurité: chaque vanne ouverte se ferme automatiquement après 30 min',
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSectors(prev => prev.map(s =>
        s.countdown !== null && s.countdown > 0
          ? { ...s, countdown: s.countdown - 1 }
          : s.countdown === 0
          ? { ...s, isOpen: false, countdown: null }
          : s
      ));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function toggleSector(id: string) {
    setSectors(prev => prev.map(s =>
      s.id === id
        ? { ...s, isOpen: !s.isOpen, countdown: !s.isOpen ? 1800 : null }
        : s
    ));
  }

  function formatCountdown(secs: number) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  if (!confirmed) {
    return (
      <div className="min-h-screen bg-[#0d1a0d] flex flex-col items-center justify-center px-6 text-white">
        <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-10 h-10 text-amber-400" />
        </div>
        <h2 className="text-2xl font-bold text-amber-400 mb-3 text-center">{t.warning}</h2>
        <p className="text-gray-300 text-center leading-relaxed mb-8 max-w-sm">{t.warning_msg}</p>
        <button
          onClick={() => setConfirmed(true)}
          className="w-full max-w-sm bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 rounded-2xl text-lg transition-all active:scale-95 mb-3"
        >
          {t.confirm}
        </button>
        <button className="text-gray-400 py-3 text-sm">{t.cancel}</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1a0d] text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-950 to-orange-950 px-5 pt-12 pb-6 border-b border-amber-900/30">
        <h1 className="text-2xl font-bold text-white">{t.title}</h1>
        <p className="text-amber-400/70 text-xs mt-1">{t.safety_note}</p>
      </div>

      <div className="px-4 mt-5 space-y-4">
        <p className="text-gray-400 text-xs uppercase tracking-widest">{t.sector_status}</p>

        {sectors.map(sector => (
          <div
            key={sector.id}
            className={`rounded-3xl p-4 border transition-all shadow-xl ${
              sector.isOpen
                ? 'bg-gradient-to-r from-emerald-950 to-green-950 border-emerald-600/50'
                : 'bg-[#122212] border-green-900/30'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-white font-semibold">{language === 'darija' ? sector.nameAr : sector.name}</p>
                {sector.countdown !== null && (
                  <div className="flex items-center gap-1 mt-1">
                    <Timer className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-amber-400 text-xs">{t.auto_close} {formatCountdown(sector.countdown)} {t.minutes}</span>
                  </div>
                )}
              </div>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
                sector.isOpen ? 'bg-emerald-600/30 text-emerald-300' : 'bg-gray-700/40 text-gray-400'
              }`}>
                {sector.isOpen ? <CheckCircle className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-500" />}
                {sector.isOpen ? t.open : t.closed}
              </div>
            </div>

            {/* Slide toggle */}
            <div
              onClick={() => toggleSector(sector.id)}
              className={`relative h-14 rounded-2xl flex items-center cursor-pointer transition-all select-none ${
                sector.isOpen ? 'bg-emerald-700' : 'bg-gray-800'
              }`}
            >
              <div className={`absolute transition-all duration-300 w-10 h-10 rounded-xl shadow-lg flex items-center justify-center ${
                sector.isOpen ? 'left-[calc(100%-44px)] bg-white' : 'left-1 bg-emerald-500'
              }`}>
                <ChevronRight className={`w-5 h-5 transition-transform ${sector.isOpen ? 'rotate-180 text-emerald-700' : 'text-white'}`} />
              </div>
              <p className={`w-full text-center text-sm font-semibold transition-colors ${
                sector.isOpen ? 'text-emerald-200' : 'text-gray-400'
              }`}>
                {sector.isOpen ? t.slide_to_close : t.slide_to_open}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
