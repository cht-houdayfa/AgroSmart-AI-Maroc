import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Droplets, Battery, AlertTriangle, CheckCircle, Zap, ThumbsUp, X } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

type AlertSeverity = 'critical' | 'warning' | 'info' | 'success';

interface FarmAlert {
  id: string;
  severity: AlertSeverity;
  titleAr: string;
  titleFr: string;
  descAr: string;
  descFr: string;
  time: string;
  read: boolean;
  type: 'battery' | 'moisture' | 'valve' | 'system' | 'ai' | 'irrigation';
}

const INITIAL_ALERTS: FarmAlert[] = [
  {
    id: '1', severity: 'critical', type: 'battery',
    titleAr: 'بطارية حرجة - NODE-GHR-002',
    titleFr: 'Batterie critique - NODE-GHR-002',
    descAr: 'البطارية وصلت لـ 15%. السيستم غادي يوقف تلقائياً بعد ساعتين.',
    descFr: 'Batterie à 15%. Arrêt automatique dans 2h.',
    time: 'الآن',
    read: false,
  },
  {
    id: '2', severity: 'warning', type: 'moisture',
    titleAr: 'رطوبة منخفضة - قطاع الأفوكاتو',
    titleFr: 'Humidité basse - Secteur Avocat',
    descAr: 'رطوبة الأرض وصلت لـ 28%. يُنصح بفتح السقي.',
    descFr: 'Humidité sol à 28%. Irrigation recommandée.',
    time: 'منذ 12 دقيقة',
    read: false,
  },
  {
    id: '3', severity: 'success', type: 'ai',
    titleAr: 'الذكاء الاصطناعي وفر 450 لتر اليوم',
    titleFr: 'L\'IA a économisé 450L aujourd\'hui',
    descAr: 'استنادا لتوقعات الطقس، السيستم أوقف السقي قبل المطر.',
    descFr: 'Basé sur prévisions météo, irrigation suspendue avant la pluie.',
    time: 'منذ 45 دقيقة',
    read: false,
  },
  {
    id: '4', severity: 'info', type: 'irrigation',
    titleAr: 'انتهى السقي التلقائي',
    titleFr: 'Irrigation automatique terminée',
    descAr: 'قطاع الأفوكاتو الشمالي: 45 دقيقة / 675 لتر',
    descFr: 'Secteur Avocat Nord: 45 min / 675 L',
    time: 'منذ 2 ساعة',
    read: true,
  },
  {
    id: '5', severity: 'warning', type: 'system',
    titleAr: 'اتصال ضعيف - NODE-AGA-002',
    titleFr: 'Connexion faible - NODE-AGA-002',
    descAr: 'المحطة كتتأخر في إرسال القراءات. محتمل تشويش.',
    descFr: 'Station en retard d\'envoi. Possible interférence.',
    time: 'منذ 3 ساعات',
    read: true,
  },
  {
    id: '6', severity: 'success', type: 'valve',
    titleAr: 'الصمام أُغلق تلقائياً',
    titleFr: 'Vanne fermée automatiquement',
    descAr: 'صمام قطاع الأفوكاتو الجنوبي أُغلق بعد 30 دقيقة للأمان.',
    descFr: 'Vanne secteur Avocat Sud fermée après 30 min (sécurité).',
    time: 'منذ 4 ساعات',
    read: true,
  },
];

export default function NotificationsScreen() {
  const { language, t: globalT } = useLanguage();
  const [alerts, setAlerts] = useState<FarmAlert[]>(INITIAL_ALERTS);
  const [filter, setFilter] = useState<'all' | 'unread' | 'critical'>('all');
  const [muted, setMuted] = useState(false);

  // Simulate a new incoming alert
  useEffect(() => {
    const t = setTimeout(() => {
      setAlerts(prev => [{
        id: 'new-' + Date.now(),
        severity: 'warning',
        type: 'moisture',
        titleAr: 'تنبيه جديد: رطوبة منخفضة',
        titleFr: 'Nouvelle alerte: humidité basse',
        descAr: 'قطاع الحوامض يحتاج سقي خلال ساعتين.',
        descFr: 'Secteur Agrumes nécessite irrigation dans 2h.',
        time: 'الآن',
        read: false,
      }, ...prev]);
    }, 8000);
    return () => clearTimeout(t);
  }, []);

  const t = language === 'darija' ? {
    title: 'التنبيهات',
    all: 'الكل',
    unread: 'غير مقروء',
    critical: 'حرج',
    mark_all: 'قراءة الكل',
    mute: 'كتم',
    unmute: 'تفعيل',
    empty: 'ما كاينش تنبيهات',
    unread_count: 'تنبيه غير مقروء',
  } : {
    title: 'Notifications',
    all: 'Tout',
    unread: 'Non lu',
    critical: 'Critique',
    mark_all: 'Tout marquer lu',
    mute: 'Muet',
    unmute: 'Activer',
    empty: 'Aucune notification',
    unread_count: 'non lue(s)',
  };

  const SEVERITY_CONFIG: Record<AlertSeverity, { bg: string; border: string; dot: string; icon: React.ReactNode }> = {
    critical: { bg: 'bg-red-950/50', border: 'border-red-700/40', dot: 'bg-red-500', icon: <Zap className="w-4 h-4 text-red-400" /> },
    warning: { bg: 'bg-amber-950/40', border: 'border-amber-700/30', dot: 'bg-amber-500', icon: <AlertTriangle className="w-4 h-4 text-amber-400" /> },
    info: { bg: 'bg-blue-950/40', border: 'border-blue-700/30', dot: 'bg-blue-500', icon: <Droplets className="w-4 h-4 text-blue-400" /> },
    success: { bg: 'bg-emerald-950/40', border: 'border-emerald-700/30', dot: 'bg-emerald-500', icon: <ThumbsUp className="w-4 h-4 text-emerald-400" /> },
  };

  function dismiss(id: string) {
    setAlerts(prev => prev.filter(a => a.id !== id));
  }

  function markRead(id: string) {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  }

  function markAll() {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
  }

  const filtered = alerts.filter(a => {
    if (filter === 'unread') return !a.read;
    if (filter === 'critical') return a.severity === 'critical';
    return true;
  });

  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <div className="min-h-screen bg-[#0d1a0d] text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-950 to-gray-900 px-5 pt-12 pb-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-2xl font-bold text-white">{t.title}</h1>
            {unreadCount > 0 && (
              <p className="text-amber-400 text-xs mt-0.5">{unreadCount} {t.unread_count}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMuted(!muted)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${muted ? 'bg-red-900/40' : 'bg-white/10'}`}
            >
              {muted ? <BellOff className="w-4 h-4 text-red-400" /> : <Bell className="w-4 h-4 text-gray-300" />}
            </button>
            {unreadCount > 0 && (
              <button
                onClick={markAll}
                className="px-3 py-1.5 bg-white/10 rounded-xl text-xs text-gray-300 font-medium"
              >
                {t.mark_all}
              </button>
            )}
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          {(['all', 'unread', 'critical'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === f
                  ? f === 'critical' ? 'bg-red-800 text-white'
                    : f === 'unread' ? 'bg-amber-800 text-white'
                    : 'bg-emerald-800 text-white'
                  : 'bg-white/5 text-gray-400'
              }`}
            >
              {t[f]}
              {f === 'unread' && unreadCount > 0 && ` (${unreadCount})`}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-4 space-y-2">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <CheckCircle className="w-12 h-12 text-emerald-600 mb-3" />
            <p className="text-gray-500">{t.empty}</p>
          </div>
        ) : (
          filtered.map(alert => {
            const cfg = SEVERITY_CONFIG[alert.severity];
            return (
              <div
                key={alert.id}
                onClick={() => markRead(alert.id)}
                className={`relative rounded-3xl p-4 border transition-all cursor-pointer active:scale-98 ${cfg.bg} ${cfg.border} ${alert.read ? 'opacity-60' : ''}`}
              >
                {!alert.read && (
                  <div className={`absolute top-3 left-3 w-2 h-2 rounded-full ${cfg.dot} animate-pulse`} />
                )}
                <div className="flex items-start gap-3 pl-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-black/20`}>
                    {cfg.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-semibold leading-snug ${alert.read ? 'text-gray-300' : 'text-white'}`}>
                        {language === 'darija' ? alert.titleAr : alert.titleFr}
                      </p>
                      <button
                        onClick={e => { e.stopPropagation(); dismiss(alert.id); }}
                        className="flex-shrink-0 text-gray-600 hover:text-gray-400"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">
                      {language === 'darija' ? alert.descAr : alert.descFr}
                    </p>
                    <p className="text-gray-600 text-xs mt-1.5">{alert.time}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
