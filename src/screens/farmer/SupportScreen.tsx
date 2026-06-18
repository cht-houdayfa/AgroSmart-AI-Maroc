import React, { useState } from 'react';
import { Phone, MessageCircle, Calculator, ChevronRight, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export default function SupportScreen() {
  const { language, t: globalT } = useLanguage();
  const [area, setArea] = useState('');
  const [crop, setCrop] = useState('');
  const [showResult, setShowResult] = useState(false);

  const t = language === 'darija' ? {
    title: 'الدعم والمساعدة',
    technician: 'التقني الخاص بك',
    tech_name: 'يوسف البلهوري',
    tech_region: 'سوس ماسة',
    call: 'اتصل',
    whatsapp: 'واتساب',
    subsidy: 'حاسبة دعم الجيل الأخضر',
    subsidy_desc: 'اعرف قداش كتدفع الدولة ليك',
    area_label: 'مساحة الأرض (هكتار)',
    area_placeholder: 'مثال: 5',
    crop_label: 'نوع المحصول',
    calculate: 'احسب الدعم',
    result_title: 'نتيجة الحاسبة',
    result_pct: 'الدولة كتعوضك بـ 80%',
    result_msg: 'تواصل معانا باش نوجدو ليك الملف الفلاحي',
    contact_us: 'تواصل معانا الآن',
    faq_title: 'أسئلة شائعة',
    crops: ['زيتون', 'أفوكاتو', 'حوامض', 'عنب', 'طماطم', 'أخرى'],
  } : {
    title: 'Support & Aide',
    technician: 'Votre technicien',
    tech_name: 'Youssef Belhouri',
    tech_region: 'Souss Massa',
    call: 'Appeler',
    whatsapp: 'WhatsApp',
    subsidy: 'Calculateur Génération Verte',
    subsidy_desc: 'Découvrez votre subvention agricole',
    area_label: 'Surface (hectares)',
    area_placeholder: 'Ex: 5',
    crop_label: 'Type de culture',
    calculate: 'Calculer la subvention',
    result_title: 'Résultat',
    result_pct: 'L\'État vous rembourse 80%',
    result_msg: 'Contactez-nous pour préparer votre dossier agricole',
    contact_us: 'Nous contacter',
    faq_title: 'FAQ',
    crops: ['Olive', 'Avocat', 'Agrumes', 'Raisin', 'Tomate', 'Autre'],
  };

  const systemCost = Math.max(0, parseFloat(area || '0') * 8000);
  const subsidyAmount = systemCost * 0.8;
  const farmerPays = systemCost * 0.2;

  const faqs = language === 'darija' ? [
    { q: 'كيفاش نزيد جلسة سقي يدوية؟', a: 'من شاشة التحكم اليدوي، سحب الزر لفوق.' },
    { q: 'واش تخدم السيستم بلا انترنت؟', a: 'إيه، السيستم خدام محلي ويتصل بالسحابة فما كان انترنت.' },
    { q: 'علاش المستشعر مكيعطيش قراءة؟', a: 'احتمال يكون بحاجة لتنظيف أو معايرة. اتصل بالتقني.' },
  ] : [
    { q: 'Comment ajouter une session d\'irrigation manuelle?', a: 'Depuis l\'écran contrôle manuel, glisser le bouton vers le haut.' },
    { q: 'Le système fonctionne-t-il sans internet?', a: 'Oui, en mode local, avec sync cloud quand l\'internet est disponible.' },
    { q: 'Pourquoi le capteur ne lit rien?', a: 'Nettoyage ou calibration nécessaire. Contacter le technicien.' },
  ];

  return (
    <div className="min-h-screen bg-[#0d1a0d] text-white pb-24">
      <div className="bg-gradient-to-r from-emerald-950 to-green-950 px-5 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-white">{t.title}</h1>
      </div>

      <div className="px-4 mt-5 space-y-4">
        {/* Technician card */}
        <div className="bg-[#122212] rounded-3xl p-4 border border-green-900/30 shadow-xl">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">{t.technician}</p>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl flex items-center justify-center text-2xl font-bold text-white">
              {t.tech_name[0]}
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold">{t.tech_name}</p>
              <p className="text-emerald-400 text-sm">{t.tech_region}</p>
            </div>
            <div className="flex gap-2">
              <a
                href="tel:+212600000000"
                className="w-12 h-12 bg-emerald-700 hover:bg-emerald-600 rounded-2xl flex items-center justify-center transition-all active:scale-95"
              >
                <Phone className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 bg-green-600 hover:bg-green-500 rounded-2xl flex items-center justify-center transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Subsidy calculator */}
        <div className="bg-gradient-to-br from-yellow-950 to-amber-950 rounded-3xl p-4 border border-amber-800/40 shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <Calculator className="w-6 h-6 text-amber-400" />
            <div>
              <p className="text-amber-300 font-semibold">{t.subsidy}</p>
              <p className="text-gray-400 text-xs">{t.subsidy_desc}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-gray-400 text-xs mb-1 block">{t.area_label}</label>
              <input
                type="number"
                value={area}
                onChange={e => setArea(e.target.value)}
                placeholder={t.area_placeholder}
                className="w-full bg-black/30 text-white rounded-xl px-3 py-3 border border-amber-900/40 focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">{t.crop_label}</label>
              <div className="flex flex-wrap gap-2">
                {t.crops.map(c => (
                  <button
                    key={c}
                    onClick={() => setCrop(c)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      crop === c ? 'bg-amber-600 text-white' : 'bg-amber-900/30 text-amber-300'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowResult(true)}
              disabled={!area || !crop}
              className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-2xl text-sm transition-all active:scale-95 disabled:opacity-40"
            >
              {t.calculate}
            </button>

            {showResult && area && crop && (
              <div className="bg-black/30 rounded-2xl p-4 border border-amber-700/30 mt-2">
                <p className="text-amber-300 font-bold text-center text-base mb-2">💰 {t.result_pct}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{language === 'darija' ? 'تكلفة السيستم' : 'Coût système'}</span>
                    <span className="text-white font-semibold">{systemCost.toLocaleString()} DH</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-400">{language === 'darija' ? 'دعم الدولة (80%)' : 'Subvention (80%)'}</span>
                    <span className="text-emerald-400 font-bold">{subsidyAmount.toLocaleString()} DH</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-amber-800/40 pt-2">
                    <span className="text-white font-semibold">{language === 'darija' ? 'تدفع غير' : 'Vous payez'}</span>
                    <span className="text-white font-bold text-lg">{farmerPays.toLocaleString()} DH</span>
                  </div>
                </div>
                <p className="text-gray-400 text-xs text-center mt-3">{t.result_msg}</p>
                <button className="w-full mt-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-all active:scale-95">
                  {t.contact_us}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-[#122212] rounded-3xl p-4 border border-green-900/30 shadow-xl">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
            <HelpCircle className="w-4 h-4" /> {t.faq_title}
          </p>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <details key={i} className="group">
                <summary className="flex items-center justify-between cursor-pointer py-3 border-b border-green-900/20 text-white text-sm font-medium list-none">
                  {faq.q}
                  <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-gray-400 text-xs py-2 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
