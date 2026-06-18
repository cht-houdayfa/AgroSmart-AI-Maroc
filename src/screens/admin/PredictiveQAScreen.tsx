import React, { useState } from 'react';
import { AlertTriangle, TrendingDown, MapPin, Filter } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

const FAILURE_DATA = [
  { id: '1', region: 'بركان', type_ar: 'مستشعر رطوبة', type_fr: 'Capteur humidité', count: 23, rate: 18, cause_ar: 'ملوحة المياه الزائدة', cause_fr: 'Salinité élevée', trend: 'up' as const },
  { id: '2', region: 'أكادير', type_ar: 'بطارية ليثيوم 18650', type_fr: 'Batterie Li-Ion 18650', count: 15, rate: 12, cause_ar: 'حرارة مرتفعة صيفاً', cause_fr: 'Chaleur excessive en été', trend: 'stable' as const },
  { id: '3', region: 'الغرب', type_ar: 'صمام كهربائي', type_fr: 'Vanne électrique', count: 8, rate: 6, cause_ar: 'ترسبات الحديد في المياه', cause_fr: 'Dépôts de fer dans l\'eau', trend: 'down' as const },
  { id: '4', region: 'مراكش', type_ar: 'وحدة الاتصال', type_fr: 'Module comm.', count: 5, rate: 4, cause_ar: 'التشويش على شبكة 4G', cause_fr: 'Interférence réseau 4G', trend: 'stable' as const },
  { id: '5', region: 'مكناس', type_ar: 'لوح شمسي', type_fr: 'Panneau solaire', count: 3, rate: 2, cause_ar: 'تلف يدوي', cause_fr: 'Dommage manuel', trend: 'down' as const },
];

export default function PredictiveQAScreen() {
  const { language, t: globalT } = useLanguage();
  const [sortBy, setSortBy] = useState<'rate' | 'count'>('rate');

  const t = language === 'darija' ? {
    title: 'مراقبة الجودة الاستباقية',
    subtitle: 'تحليل أنماط الأعطال من كل المغرب',
    region: 'الجهة',
    component: 'المكون',
    failures: 'عطل',
    failure_rate: 'معدل العطب',
    cause: 'السبب',
    sort_rate: 'ترتيب حسب المعدل',
    sort_count: 'ترتيب حسب العدد',
    insight: 'استنتاج ذكي',
    insight_msg: 'مستشعرات الرطوبة تتلف بسرعة 20% أعلى في بركان بسبب ملوحة المياه. يُنصح بتغيير الموردين لنموذج مقاوم للملوحة.',
    action: 'إجراء موصى به',
    actions: [
      'اعتماد مستشعرات IP68 مقاومة للملوحة في جهة بركان',
      'إضافة طبقة حماية إضافية للبطاريات في المناطق الحارة',
      'مراجعة مورد الصمامات الكهربائية لمناطق الغرب',
    ],
    total_failures: 'إجمالي الأعطال',
    this_month: 'هذا الشهر',
    avg_rate: 'متوسط المعدل',
  } : {
    title: 'Contrôle qualité prédictif',
    subtitle: 'Analyse des pannes à travers le Maroc',
    region: 'Région',
    component: 'Composant',
    failures: 'panne(s)',
    failure_rate: 'Taux de défaillance',
    cause: 'Cause',
    sort_rate: 'Trier par taux',
    sort_count: 'Trier par nombre',
    insight: 'Insight IA',
    insight_msg: 'Les capteurs humidité tombent en panne 20% plus vite à Berkane à cause de la salinité. Changement de fournisseur recommandé.',
    action: 'Action recommandée',
    actions: [
      'Adopter capteurs IP68 anti-salinité à Berkane',
      'Protection thermique supplémentaire pour batteries dans zones chaudes',
      'Réviser fournisseur de vannes pour la région du Gharb',
    ],
    total_failures: 'Total pannes',
    this_month: 'ce mois',
    avg_rate: 'Taux moyen',
  };

  const sorted = [...FAILURE_DATA].sort((a, b) => sortBy === 'rate' ? b.rate - a.rate : b.count - a.count);

  return (
    <div className="min-h-screen bg-[#0d1309] text-white pb-24">
      <div className="bg-gradient-to-r from-red-950 via-rose-950 to-pink-950 px-5 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-white">{t.title}</h1>
        <p className="text-red-300/70 text-xs mt-1">{t.subtitle}</p>

        <div className="flex gap-3 mt-4">
          <div className="flex-1 bg-black/20 rounded-2xl p-3 text-center">
            <p className="text-red-400 font-bold text-xl">54</p>
            <p className="text-gray-400 text-xs">{t.total_failures} ({t.this_month})</p>
          </div>
          <div className="flex-1 bg-black/20 rounded-2xl p-3 text-center">
            <p className="text-amber-400 font-bold text-xl">8.4%</p>
            <p className="text-gray-400 text-xs">{t.avg_rate}</p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-5 space-y-4">
        {/* AI Insight */}
        <div className="bg-gradient-to-r from-amber-950 to-orange-950 rounded-3xl p-4 border border-amber-700/30 shadow-xl">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🤖</span>
            <div>
              <p className="text-amber-300 font-semibold text-sm mb-1">{t.insight}</p>
              <p className="text-gray-300 text-sm leading-relaxed">{t.insight_msg}</p>
            </div>
          </div>
        </div>

        {/* Sort */}
        <div className="flex gap-2">
          {(['rate', 'count'] as const).map(s => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                sortBy === s ? 'bg-red-800 text-white' : 'bg-[#1a1a1a] text-gray-400'
              }`}
            >
              <Filter className="w-3 h-3 inline-block mr-1" />
              {s === 'rate' ? t.sort_rate : t.sort_count}
            </button>
          ))}
        </div>

        {/* Failure list */}
        <div className="space-y-3">
          {sorted.map((item, i) => (
            <div key={item.id} className="bg-[#0e1c10] rounded-3xl p-4 border border-red-900/20 shadow-xl">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-white font-semibold text-sm">
                    {language === 'darija' ? item.type_ar : item.type_fr}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <MapPin className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-400 text-xs">{item.region}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`flex items-center gap-1 justify-end ${
                    item.trend === 'up' ? 'text-red-400' : item.trend === 'down' ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    <TrendingDown className={`w-3.5 h-3.5 ${item.trend === 'up' ? 'rotate-180' : ''}`} />
                    <span className="text-xs font-bold">{item.rate}%</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5">{item.count} {t.failures}</p>
                </div>
              </div>

              {/* Rate bar */}
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full transition-all ${
                    item.rate > 15 ? 'bg-red-500' : item.rate > 8 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${item.rate}%` }}
                />
              </div>

              <p className="text-gray-500 text-xs">
                {language === 'darija' ? item.cause_ar : item.cause_fr}
              </p>
            </div>
          ))}
        </div>

        {/* Recommended actions */}
        <div className="bg-[#0e1c10] rounded-3xl p-4 border border-green-900/30 shadow-xl">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">{t.action}</p>
          <div className="space-y-2">
            {t.actions.map((a, i) => (
              <div key={i} className="flex items-start gap-3 bg-[#0d1a0d] rounded-2xl p-3">
                <div className="w-5 h-5 bg-emerald-700 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white mt-0.5">
                  {i + 1}
                </div>
                <p className="text-gray-300 text-xs leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
