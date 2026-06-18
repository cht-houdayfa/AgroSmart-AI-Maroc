import React, { useState } from 'react';
import { Bell, CreditCard, RefreshCw, CheckCircle, AlertTriangle, XCircle, TrendingUp, MessageCircle } from 'lucide-react';
import type { SubscriptionStatus } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

const DEMO_SUBS = [
  { farm: 'ضيعة المختار - أكادير', farmFr: 'Ferme Mokhtar - Agadir', plan: 'premium', price: 500, status: 'active' as SubscriptionStatus, end_date: '2026-01-01', daysLeft: 197, region: 'سوس ماسة', area: 12.5 },
  { farm: 'تعاونية فاطمة - الغرب', farmFr: 'Coop. Fatima - Gharb', plan: 'basic', price: 300, status: 'active' as SubscriptionStatus, end_date: '2026-03-15', daysLeft: 270, region: 'الغرب', area: 8 },
  { farm: 'ضيعة الحسن - مراكش', farmFr: 'Ferme Hassan - Marrakech', plan: 'basic', price: 300, status: 'expired' as SubscriptionStatus, end_date: '2025-06-01', daysLeft: -17, region: 'مراكش', area: 5 },
  { farm: 'تعاونية بركان', farmFr: 'Coopérative Berkane', plan: 'premium', price: 500, status: 'active' as SubscriptionStatus, end_date: '2026-05-01', daysLeft: 317, region: 'بركان', area: 20 },
  { farm: 'ضيعة محمد - مكناس', farmFr: 'Ferme Mohammed - Meknès', plan: 'basic', price: 300, status: 'pending' as SubscriptionStatus, end_date: '2027-07-01', daysLeft: 743, region: 'مكناس', area: 15 },
  { farm: 'تعاونية الحوز', farmFr: 'Coop. Al Haouz', plan: 'premium', price: 500, status: 'active' as SubscriptionStatus, end_date: '2026-09-10', daysLeft: 450, region: 'مراكش', area: 25 },
];

const REVENUE_FORECAST = [38100, 41200, 44000, 47500, 51200, 55800];
const MONTHS_SHORT_AR = ['يول', 'غشت', 'شتب', 'أكت', 'نون', 'دجب'];
const MONTHS_SHORT_FR = ['Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

export default function BillingCRMScreen() {
  const { language, t: globalT } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'active' | 'expired' | 'pending'>('all');
  const [showRenewAlert, setShowRenewAlert] = useState(false);
  const [tab, setTab] = useState<'subs' | 'forecast'>('subs');

  const t = language === 'darija' ? {
    title: 'الاشتراكات والمبيعات',
    subtitle: 'إدارة العملاء والفوترة',
    all: 'الكل',
    active: 'نشط',
    expired: 'منتهي',
    pending: 'معلق',
    total_active: 'اشتراك نشط',
    total_revenue: 'إيرادات سنوية',
    renewals_due: 'تجديدات قريبة',
    days_left: 'يوم',
    expired_label: 'منتهي',
    send_reminder: 'واتساب',
    remind_all: 'تذكير الكل المنتهية',
    plan_basic: 'أساسي',
    plan_premium: 'بريميوم',
    renew: 'تجديد',
    dh_year: 'DH/سنة',
    reminder_sent: 'تم إرسال التذكير!',
    payment_gate: 'بوابة الدفع',
    subs_tab: 'الاشتراكات',
    forecast_tab: 'التوقعات',
    forecast_title: 'توقعات الإيرادات 6 أشهر',
    total_arr: 'ARR المتوقع',
    growth_rate: 'معدل النمو',
    upgrade_potential: 'ترقية محتملة',
    upgrade_msg: 'ضيعات بإمكانها الترقية للبريميوم',
    dh: 'DH',
    months: MONTHS_SHORT_AR,
    area: 'هكتار',
    region: 'الجهة',
  } : {
    title: 'Abonnements & CRM',
    subtitle: 'Gestion clients et facturation',
    all: 'Tous',
    active: 'Actif',
    expired: 'Expiré',
    pending: 'En attente',
    total_active: 'abonnements actifs',
    total_revenue: 'Revenu annuel',
    renewals_due: 'À renouveler',
    days_left: 'j',
    expired_label: 'Expiré',
    send_reminder: 'WhatsApp',
    remind_all: 'Rappeler les expirés',
    plan_basic: 'Basique',
    plan_premium: 'Premium',
    renew: 'Renouveler',
    dh_year: 'DH/an',
    reminder_sent: 'Rappel envoyé!',
    payment_gate: 'Passerelle paiement',
    subs_tab: 'Abonnements',
    forecast_tab: 'Prévisions',
    forecast_title: 'Prévisions revenus 6 mois',
    total_arr: 'ARR prévu',
    growth_rate: 'Taux de croissance',
    upgrade_potential: 'Potentiel upgrade',
    upgrade_msg: 'Fermes pouvant passer au Premium',
    dh: 'DH',
    months: MONTHS_SHORT_FR,
    area: 'ha',
    region: 'Région',
  };

  const filtered = filter === 'all' ? DEMO_SUBS : DEMO_SUBS.filter(s => s.status === filter);
  const activeCount = DEMO_SUBS.filter(s => s.status === 'active').length;
  const totalRevenue = DEMO_SUBS.filter(s => s.status === 'active').reduce((a, s) => a + s.price, 0);
  const expiredCount = DEMO_SUBS.filter(s => s.status === 'expired').length;
  const upgradeCount = DEMO_SUBS.filter(s => s.plan === 'basic' && s.status === 'active').length;

  const statusConfig = {
    active: { color: 'text-emerald-400', bg: 'bg-emerald-900/30', icon: <CheckCircle className="w-3.5 h-3.5" />, label: t.active },
    expired: { color: 'text-red-400', bg: 'bg-red-900/30', icon: <XCircle className="w-3.5 h-3.5" />, label: t.expired },
    pending: { color: 'text-amber-400', bg: 'bg-amber-900/30', icon: <AlertTriangle className="w-3.5 h-3.5" />, label: t.pending },
  };

  const maxForecast = Math.max(...REVENUE_FORECAST);

  return (
    <div className="min-h-screen bg-[#0d1309] text-white pb-24">
      <div className="bg-gradient-to-r from-slate-900 to-zinc-900 px-5 pt-12 pb-5">
        <h1 className="text-2xl font-bold text-white">{t.title}</h1>
        <p className="text-gray-400 text-xs mt-0.5">{t.subtitle}</p>

        <div className="flex gap-3 mt-4">
          <div className="flex-1 bg-black/20 rounded-2xl p-3 text-center">
            <p className="text-emerald-400 font-bold text-xl">{activeCount}</p>
            <p className="text-gray-400 text-xs">{t.total_active}</p>
          </div>
          <div className="flex-1 bg-black/20 rounded-2xl p-3 text-center">
            <p className="text-amber-400 font-bold text-lg">{totalRevenue.toLocaleString()}</p>
            <p className="text-gray-400 text-xs">{t.dh}/mo</p>
          </div>
          <div className="flex-1 bg-black/20 rounded-2xl p-3 text-center">
            <p className="text-red-400 font-bold text-xl">{expiredCount}</p>
            <p className="text-gray-400 text-xs">{t.renewals_due}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mx-4 mt-4 bg-[#122212] rounded-2xl p-1 mb-4">
        {(['subs', 'forecast'] as const).map(t_ => (
          <button key={t_} onClick={() => setTab(t_)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === t_ ? 'bg-slate-700 text-white' : 'text-gray-400'}`}>
            {t[`${t_}_tab` as 'subs_tab' | 'forecast_tab']}
          </button>
        ))}
      </div>

      <div className="px-4 space-y-4">
        {tab === 'subs' && (
          <>
            {/* Payment gateways */}
            <div className="bg-[#0e1c10] rounded-3xl p-4 border border-green-900/30 shadow-xl">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                <CreditCard className="w-3.5 h-3.5" /> {t.payment_gate}
              </p>
              <div className="flex gap-2">
                {['CMI', 'CIH', 'Wafacash', 'Orange'].map((gw) => (
                  <div key={gw} className="flex-1 bg-[#0d1a0d] rounded-xl py-2 text-center">
                    <p className="text-white text-xs font-semibold">{gw}</p>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mx-auto mt-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* Remind expired */}
            {expiredCount > 0 && (
              <button
                onClick={() => setShowRenewAlert(true)}
                className="w-full bg-gradient-to-r from-green-800 to-emerald-700 hover:opacity-90 text-white font-bold py-3.5 rounded-2xl text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Bell className="w-4 h-4" />
                {t.remind_all} ({expiredCount})
              </button>
            )}
            {showRenewAlert && (
              <div className="bg-emerald-950/50 border border-emerald-700/40 rounded-2xl p-3 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <p className="text-emerald-300 text-sm">{t.reminder_sent}</p>
              </div>
            )}

            {/* Upgrade potential */}
            {upgradeCount > 0 && (
              <div className="bg-gradient-to-r from-violet-950 to-purple-950 rounded-3xl p-4 border border-violet-700/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-violet-300 font-semibold text-sm">{t.upgrade_potential}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{t.upgrade_msg}</p>
                  </div>
                  <div className="w-10 h-10 bg-violet-700/40 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">{upgradeCount}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Filter */}
            <div className="flex gap-2">
              {(['all', 'active', 'expired', 'pending'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${filter === f ? 'bg-emerald-800 text-white' : 'bg-[#1a1a1a] text-gray-400'}`}>
                  {t[f]}
                </button>
              ))}
            </div>

            {/* Subscription list */}
            <div className="space-y-3">
              {filtered.map((sub, i) => {
                const cfg = statusConfig[sub.status];
                return (
                  <div key={i} className="bg-[#0e1c10] rounded-3xl p-4 border border-green-900/20 shadow-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-white font-semibold text-sm leading-tight">{language === 'darija' ? sub.farm : sub.farmFr}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${cfg.bg} ${cfg.color}`}>
                            {cfg.icon} {cfg.label}
                          </span>
                          <span className="text-gray-500 text-xs">{sub.plan === 'premium' ? t.plan_premium : t.plan_basic}</span>
                          <span className="text-gray-600 text-xs">{sub.area} {t.area}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-sm">{sub.price} {t.dh_year}</p>
                        {sub.status === 'active' && <p className="text-gray-500 text-xs">{sub.daysLeft} {t.days_left}</p>}
                        {sub.status === 'expired' && <p className="text-red-400 text-xs">{t.expired_label}</p>}
                      </div>
                    </div>
                    {sub.status === 'active' && (
                      <div className="h-1 bg-gray-800 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(sub.daysLeft / 365) * 100}%` }} />
                      </div>
                    )}
                    <div className="flex gap-2 mt-3">
                      {sub.status === 'expired' && (
                        <>
                          <button className="flex-1 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold py-2 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1">
                            <RefreshCw className="w-3 h-3" /> {t.renew}
                          </button>
                          <button className="flex-1 bg-green-900/40 text-green-300 text-xs font-semibold py-2 rounded-xl active:scale-95 flex items-center justify-center gap-1">
                            <MessageCircle className="w-3 h-3" /> {t.send_reminder}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {tab === 'forecast' && (
          <>
            <div className="bg-[#0e1c10] rounded-3xl p-4 border border-green-900/30 shadow-xl">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">{t.forecast_title}</p>
              <div className="flex items-end gap-2 h-32 mb-3">
                {REVENUE_FORECAST.map((v, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 flex-1">
                    <span className="text-gray-500 text-xs" style={{ fontSize: '9px' }}>{(v / 1000).toFixed(0)}k</span>
                    <div className="w-full bg-gradient-to-t from-emerald-700 to-emerald-500 rounded-t-lg transition-all"
                      style={{ height: `${(v / maxForecast) * 100}px` }} />
                    <span className="text-gray-600" style={{ fontSize: '9px' }}>{t.months[i]}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-xs">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="font-semibold">{t.growth_rate}: +8.2% {language === 'darija' ? 'كل شهر' : 'par mois'}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-emerald-900/40 to-green-900/30 rounded-3xl p-4 border border-emerald-800/30">
                <p className="text-emerald-300 text-xs font-semibold mb-1">{t.total_arr}</p>
                <p className="text-white font-bold text-2xl">672k</p>
                <p className="text-emerald-400 text-xs">{t.dh} ({language === 'darija' ? 'نهاية 2026' : 'fin 2026'})</p>
              </div>
              <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/30 rounded-3xl p-4 border border-blue-800/30">
                <p className="text-blue-300 text-xs font-semibold mb-1">{language === 'darija' ? 'اشتراكات متوقعة' : 'Abonnements prévus'}</p>
                <p className="text-white font-bold text-2xl">210</p>
                <p className="text-blue-400 text-xs">{language === 'darija' ? 'نهاية 2026' : 'fin 2026'}</p>
              </div>
            </div>

            {/* Revenue by plan */}
            <div className="bg-[#0e1c10] rounded-3xl p-4 border border-green-900/30 shadow-xl">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">{language === 'darija' ? 'توزيع الإيرادات' : 'Répartition revenus'}</p>
              {[
                { label: language === 'darija' ? 'بريميوم (500 DH)' : 'Premium (500 DH)', pct: 53, color: 'bg-blue-500' },
                { label: language === 'darija' ? 'أساسي (300 DH)' : 'Basique (300 DH)', pct: 31, color: 'bg-emerald-500' },
                { label: language === 'darija' ? 'عتاد وصيانة' : 'Matériel & Maintenance', pct: 16, color: 'bg-amber-500' },
              ].map((item, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-xs">{item.label}</span>
                    <span className="text-white text-xs font-semibold">{item.pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

