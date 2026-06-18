import React, { useState, useEffect } from 'react';
import { TrendingUp, Droplets, Cpu, Activity, DollarSign, Users, Award, Leaf, Target } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

function AnimatedCounter({ target, duration = 2000, suffix = '' }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

function BarChart({ data, colors }: { data: { label: string; value: number }[]; colors: string[] }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <span className="text-xs text-gray-400">{d.value}</span>
          <div
            className={`w-full ${colors[i % colors.length]} rounded-t-lg transition-all`}
            style={{ height: `${(d.value / max) * 100}px` }}
          />
          <span className="text-xs text-gray-500 text-center leading-tight">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function AdminAnalytics() {
  const { language, t: globalT } = useLanguage();

  const t = language === 'darija' || language === 'ar' ? {
    title: 'لوحة التحليلات',
    subtitle: 'نظرة شاملة على الشبكة',
    water_saved: 'المياه الموفرة',
    active_farms: 'ضيعات نشطة',
    total_nodes: 'محطات شغالة',
    monthly_revenue: 'رقم الأعمال الشهري',
    annual_arr: 'ARR السنوي',
    growth: 'نمو',
    m3: 'م³',
    farms: 'ضيعة',
    nodes: 'محطة',
    dh: 'درهم',
    monthly_sales: 'مبيعات الأشهر الأخيرة',
    water_by_region: 'مياه موفرة حسب الجهة',
    system_health: 'صحة الشبكة',
    online: 'متصل',
    warning: 'تنبيه',
    critical: 'عطل',
    investor_title: 'مؤشرات المستثمرين',
    co2_saved: 'CO₂ موفر (طن)',
    churn_rate: 'معدل المغادرة',
    ltv: 'قيمة العميل المدى البعيد',
    nps: 'رضا العملاء (NPS)',
    payback: 'سنوات الاسترداد',
    target_2026: 'هدف 2026',
    farms_target: '500 ضيعة',
    revenue_target: '3M درهم',
    water_target: '500k م³',
    arr_breakdown: 'تفاصيل الإيرادات',
    basic_plans: 'اشتراكات أساسية',
    premium_plans: 'اشتراكات بريميوم',
    hardware_sales: 'مبيعات العتاد',
    maintenance: 'خدمة الصيانة',
    months_short: ['يناير', 'فبراير', 'مارس', 'أبريل', 'ماي', 'يونيو'],
    regions: ['سوس', 'الغرب', 'مراكش', 'بركان', 'مكناس'],
  } : language === 'fr' ? {
    title: 'Tableau analytique',
    subtitle: 'Vue globale du réseau',
    water_saved: 'Eau économisée',
    active_farms: 'Fermes actives',
    total_nodes: 'Nœuds actifs',
    monthly_revenue: 'Revenu mensuel',
    annual_arr: 'ARR annuel',
    growth: 'Croissance',
    m3: 'm³',
    farms: 'fermes',
    nodes: 'nœuds',
    dh: 'DH',
    monthly_sales: 'Ventes des derniers mois',
    water_by_region: 'Eau économisée par région',
    system_health: 'Santé du réseau',
    online: 'En ligne',
    warning: 'Alerte',
    critical: 'Panne',
    investor_title: 'Métriques investisseurs',
    co2_saved: 'CO₂ économisé (t)',
    churn_rate: 'Taux de churn',
    ltv: 'LTV client',
    nps: 'Satisfaction (NPS)',
    payback: 'Années payback',
    target_2026: 'Objectif 2026',
    farms_target: '500 fermes',
    revenue_target: '3M DH',
    water_target: '500k m³',
    arr_breakdown: 'Décomposition revenus',
    basic_plans: 'Plans basiques',
    premium_plans: 'Plans premium',
    hardware_sales: 'Ventes matériel',
    maintenance: 'Maintenance',
    months_short: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
    regions: ['Souss', 'Gharb', 'Marr.', 'Berk.', 'Mekn.'],
  } : language === 'en' ? {
    title: 'Analytics Dashboard',
    subtitle: 'Network overview',
    water_saved: 'Water Saved',
    active_farms: 'Active Farms',
    total_nodes: 'Active Nodes',
    monthly_revenue: 'Monthly Revenue',
    annual_arr: 'Annual ARR',
    growth: 'Growth',
    m3: 'm³',
    farms: 'farms',
    nodes: 'nodes',
    dh: 'DH',
    monthly_sales: 'Recent Monthly Sales',
    water_by_region: 'Water Saved by Region',
    system_health: 'Network Health',
    online: 'Online',
    warning: 'Warning',
    critical: 'Critical',
    investor_title: 'Investor Metrics',
    co2_saved: 'CO₂ Saved (tons)',
    churn_rate: 'Churn Rate',
    ltv: 'Customer LTV',
    nps: 'Customer Satisfaction (NPS)',
    payback: 'Payback Years',
    target_2026: '2026 Target',
    farms_target: '500 farms',
    revenue_target: '3M DH',
    water_target: '500k m³',
    arr_breakdown: 'Revenue Breakdown',
    basic_plans: 'Basic Plans',
    premium_plans: 'Premium Plans',
    hardware_sales: 'Hardware Sales',
    maintenance: 'Maintenance',
    months_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    regions: ['Souss', 'Gharb', 'Marr.', 'Berk.', 'Mekn.'],
  } : {
    title: 'لوحة التحليلات',
    subtitle: 'نظرة شاملة على الشبكة',
    water_saved: 'المياه الموفرة',
    active_farms: 'ضيعات نشطة',
    total_nodes: 'محطات شغالة',
    monthly_revenue: 'رقم الأعمال الشهري',
    annual_arr: 'ARR السنوي',
    growth: 'نمو',
    m3: 'م³',
    farms: 'ضيعة',
    nodes: 'محطة',
    dh: 'درهم',
    monthly_sales: 'مبيعات الأشهر الأخيرة',
    water_by_region: 'مياه موفرة حسب الجهة',
    system_health: 'صحة الشبكة',
    online: 'متصل',
    warning: 'تنبيه',
    critical: 'عطل',
    investor_title: 'مؤشرات المستثمرين',
    co2_saved: 'CO₂ موفر (طن)',
    churn_rate: 'معدل المغادرة',
    ltv: 'قيمة العميل المدى البعيد',
    nps: 'رضا العملاء (NPS)',
    payback: 'سنوات الاسترداد',
    target_2026: 'هدف 2026',
    farms_target: '500 ضيعة',
    revenue_target: '3M درهم',
    water_target: '500k م³',
    arr_breakdown: 'تفاصيل الإيرادات',
    basic_plans: 'اشتراكات أساسية',
    premium_plans: 'اشتراكات بريميوم',
    hardware_sales: 'مبيعات العتاد',
    maintenance: 'خدمة الصيانة',
    months_short: ['يناير', 'فبراير', 'مارس', 'أبريل', 'ماي', 'يونيو'],
    regions: ['سوس', 'الغرب', 'مراكش', 'بركان', 'مكناس'],
  };

  const monthlySales = t.months_short.map((label, i) => ({ label, value: [12, 18, 24, 31, 28, 42][i] }));
  const waterByRegion = t.regions.map((label, i) => ({ label, value: [4200, 3100, 2800, 1900, 2200][i] }));

  return (
    <div className="min-h-screen bg-[#0d1309] text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 px-5 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-white">{t.title}</h1>
        <p className="text-blue-400/70 text-xs mt-1">{t.subtitle}</p>
      </div>

      <div className="px-4 mt-5 space-y-4">
        {/* Hero metric */}
        <div className="bg-gradient-to-r from-blue-900 to-cyan-900 rounded-3xl p-5 shadow-2xl border border-blue-700/30">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-300 text-sm font-semibold mb-1">{t.water_saved}</p>
              <p className="text-white font-bold text-5xl leading-none">
                <AnimatedCounter target={14280} />
              </p>
              <p className="text-blue-300 text-lg mt-1">{t.m3}</p>
            </div>
            <div className="w-16 h-16 bg-blue-800/50 rounded-2xl flex items-center justify-center">
              <Droplets className="w-9 h-9 text-blue-300" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-semibold">+23% {t.growth}</span>
            <span className="text-blue-400/60 text-xs">{language === 'darija' ? 'مقارنة بالشهر الماضي' : 'vs mois dernier'}</span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: <Users className="w-6 h-6" />, label: t.active_farms, value: 127, suffix: '', unit: t.farms, color: 'from-emerald-900 to-green-900', border: 'border-emerald-700/30', textColor: 'text-emerald-300' },
            { icon: <Cpu className="w-6 h-6" />, label: t.total_nodes, value: 384, suffix: '', unit: t.nodes, color: 'from-violet-900 to-purple-900', border: 'border-violet-700/30', textColor: 'text-violet-300' },
            { icon: <DollarSign className="w-6 h-6" />, label: t.monthly_revenue, value: 38100, suffix: '', unit: t.dh, color: 'from-amber-900 to-yellow-900', border: 'border-amber-700/30', textColor: 'text-amber-300' },
            { icon: <Activity className="w-6 h-6" />, label: t.annual_arr, value: 457200, suffix: '', unit: t.dh, color: 'from-rose-900 to-pink-900', border: 'border-rose-700/30', textColor: 'text-rose-300' },
          ].map((stat, i) => (
            <div key={i} className={`bg-gradient-to-br ${stat.color} rounded-3xl p-4 border ${stat.border} shadow-xl`}>
              <div className={`${stat.textColor} mb-2`}>{stat.icon}</div>
              <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
              <p className="text-white font-bold text-2xl leading-none">
                <AnimatedCounter target={stat.value} duration={1500} />
              </p>
              <p className={`${stat.textColor} text-xs mt-0.5`}>{stat.unit}</p>
            </div>
          ))}
        </div>

        {/* Monthly sales chart */}
        <div className="bg-[#0e1c10] rounded-3xl p-4 border border-green-900/30 shadow-xl">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">{t.monthly_sales}</p>
          <BarChart
            data={monthlySales}
            colors={['bg-emerald-700', 'bg-emerald-600', 'bg-emerald-500', 'bg-emerald-400', 'bg-emerald-500', 'bg-emerald-400']}
          />
        </div>

        {/* Water by region */}
        <div className="bg-[#0e1c10] rounded-3xl p-4 border border-green-900/30 shadow-xl">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">{t.water_by_region}</p>
          <BarChart
            data={waterByRegion}
            colors={['bg-blue-600', 'bg-cyan-600', 'bg-blue-500', 'bg-cyan-500', 'bg-blue-700']}
          />
        </div>

        {/* System health */}
        <div className="bg-[#0e1c10] rounded-3xl p-4 border border-green-900/30 shadow-xl">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">{t.system_health}</p>
          <div className="flex gap-3">
            {[
              { label: t.online, count: 341, color: 'bg-emerald-500', pct: 89 },
              { label: t.warning, count: 32, color: 'bg-amber-500', pct: 8 },
              { label: t.critical, count: 11, color: 'bg-red-500', pct: 3 },
            ].map((s, i) => (
              <div key={i} className="flex-1 bg-[#0d1a0d] rounded-2xl p-3 text-center">
                <div className={`w-3 h-3 ${s.color} rounded-full mx-auto mb-2`} />
                <p className="text-white font-bold text-xl">{s.count}</p>
                <p className="text-gray-400 text-xs">{s.label}</p>
                <p className="text-gray-600 text-xs">{s.pct}%</p>
              </div>
            ))}
          </div>
          {/* Health bar */}
          <div className="mt-3 h-2 rounded-full bg-gray-800 overflow-hidden flex">
            <div className="bg-emerald-500 h-full transition-all" style={{ width: '89%' }} />
            <div className="bg-amber-500 h-full transition-all" style={{ width: '8%' }} />
            <div className="bg-red-500 h-full transition-all" style={{ width: '3%' }} />
          </div>
        </div>

        {/* ARR Breakdown */}
        <div className="bg-[#0e1c10] rounded-3xl p-4 border border-green-900/30 shadow-xl">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">{t.arr_breakdown}</p>
          {[
            { label: t.basic_plans, value: 81, amount: 24300, color: 'bg-emerald-600' },
            { label: t.premium_plans, value: 46, amount: 23000, color: 'bg-blue-600' },
            { label: t.hardware_sales, value: 100, amount: 8400, color: 'bg-violet-600' },
            { label: t.maintenance, value: 30, amount: 2400, color: 'bg-amber-600' },
          ].map((item, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-gray-400 text-xs">{item.label}</span>
                <span className="text-white text-xs font-semibold">{item.amount.toLocaleString()} {t.dh}</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.amount / 58100) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Investor metrics */}
        <div className="bg-[#0e1c10] rounded-3xl p-4 border border-green-900/30 shadow-xl">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
            <Award className="w-3.5 h-3.5" /> {t.investor_title}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Leaf className="w-4 h-4 text-emerald-400" />, label: t.co2_saved, value: '28.4', color: 'text-emerald-400' },
              { icon: <Activity className="w-4 h-4 text-rose-400" />, label: t.churn_rate, value: '3.2%', color: 'text-rose-400' },
              { icon: <DollarSign className="w-4 h-4 text-amber-400" />, label: t.ltv, value: '4,200 DH', color: 'text-amber-400' },
              { icon: <Target className="w-4 h-4 text-blue-400" />, label: t.nps, value: '72 / 100', color: 'text-blue-400' },
            ].map((m, i) => (
              <div key={i} className="bg-[#0d1a0d] rounded-2xl p-3">
                <div className="mb-1">{m.icon}</div>
                <p className={`font-bold text-lg ${m.color}`}>{m.value}</p>
                <p className="text-gray-500 text-xs">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2026 Targets */}
        <div className="bg-gradient-to-r from-emerald-950 to-green-950 rounded-3xl p-4 border border-emerald-700/30 shadow-xl mb-4">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
            <Target className="w-3.5 h-3.5" /> {t.target_2026}
          </p>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { label: t.farms_target, current: 127, target: 500, color: 'text-emerald-400' },
              { label: t.revenue_target, current: 457200, target: 3000000, color: 'text-amber-400', isRevenue: true },
              { label: t.water_target, current: 14280, target: 500000, color: 'text-blue-400' },
            ].map((tg, i) => (
              <div key={i} className="bg-black/20 rounded-2xl p-3">
                <p className={`font-bold text-sm ${tg.color}`}>{tg.label}</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${tg.color.replace('text-', 'bg-')}`}
                    style={{ width: `${Math.min((tg.current / tg.target) * 100, 100)}%` }} />
                </div>
                <p className="text-gray-500 text-xs mt-1">{Math.round((tg.current / tg.target) * 100)}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
