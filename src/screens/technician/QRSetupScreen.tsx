import React, { useState } from 'react';
import { ArrowLeft, QrCode, CheckCircle, RefreshCw, Wifi, Package } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

type Step = 'scan' | 'confirm' | 'installing' | 'done';

export default function QRSetupScreen() {
  const { language, t: globalT } = useLanguage();
  const [step, setStep] = useState<Step>('scan');
  const [scannedCode, setScannedCode] = useState('');
  const [progress, setProgress] = useState(0);

  const t = language === 'darija' ? {
    title: 'استبدال المستشعر',
    subtitle: 'Plug & Play — بدون برمجة',
    scan_title: 'امسح QR Code',
    scan_desc: 'امسح الكود الموجود على المستشعر الجديد',
    scan_btn: 'فتح الكاميرا',
    demo_scan: 'محاكاة مسح الكود (ديمو)',
    confirm_title: 'تأكيد المستشعر',
    confirm_type: 'نوع المستشعر',
    confirm_id: 'كود التعريف',
    confirm_farm: 'الضيعة المستهدفة',
    confirm_replace: 'يستبدل',
    confirm_btn: 'تثبيت وإعداد تلقائي',
    cancel: 'إلغاء',
    installing_title: 'جاري التثبيت...',
    step1: 'إرسال كود التعريف عبر الشبكة',
    step2: 'معايرة المستشعر الجديد',
    step3: 'تصفير عدادات الاستهلاك',
    step4: 'التحقق من الاتصال',
    done_title: 'تم التثبيت بنجاح!',
    done_msg: 'المستشعر الجديد يعمل ويرسل قراءات صحيحة',
    done_btn: 'تم',
    sensor_type: 'مستشعر رطوبة الأرض',
    old_sensor: 'SEN-HUM-OLD-023',
  } : {
    title: 'Remplacement capteur',
    subtitle: 'Plug & Play — sans reprogrammation',
    scan_title: 'Scanner le QR Code',
    scan_desc: 'Scannez le code sur le nouveau capteur',
    scan_btn: 'Ouvrir la caméra',
    demo_scan: 'Simuler le scan (démo)',
    confirm_title: 'Confirmer le capteur',
    confirm_type: 'Type de capteur',
    confirm_id: 'Code d\'identification',
    confirm_farm: 'Ferme cible',
    confirm_replace: 'Remplace',
    confirm_btn: 'Installer et configurer',
    cancel: 'Annuler',
    installing_title: 'Installation en cours...',
    step1: 'Envoi de l\'ID via réseau local',
    step2: 'Calibration du nouveau capteur',
    step3: 'Remise à zéro des compteurs',
    step4: 'Vérification connexion',
    done_title: 'Installation réussie!',
    done_msg: 'Le nouveau capteur fonctionne et envoie des données valides',
    done_btn: 'Terminé',
    sensor_type: 'Capteur humidité sol',
    old_sensor: 'SEN-HUM-OLD-023',
  };

  function simulateScan() {
    setScannedCode('SEN-HUM-NEW-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'));
    setStep('confirm');
  }

  function startInstall() {
    setStep('installing');
    setProgress(0);
    const steps = [25, 55, 80, 100];
    steps.forEach((p, i) => {
      setTimeout(() => {
        setProgress(p);
        if (p === 100) setTimeout(() => setStep('done'), 600);
      }, i * 1000 + 800);
    });
  }

  const installSteps = [t.step1, t.step2, t.step3, t.step4];

  return (
    <div className="min-h-screen bg-[#0d1a0d] text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-950 to-purple-950 px-5 pt-12 pb-6">
        <button onClick={() => setStep('scan')} className="flex items-center gap-2 text-violet-300 mb-3">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">{t.cancel}</span>
        </button>
        <h1 className="text-2xl font-bold text-white">{t.title}</h1>
        <p className="text-violet-300/70 text-xs mt-1">{t.subtitle}</p>
      </div>

      <div className="px-4 mt-6">
        {step === 'scan' && (
          <div className="flex flex-col items-center">
            {/* QR scanner frame */}
            <div className="relative w-64 h-64 mb-8">
              <div className="absolute inset-0 rounded-3xl border-2 border-emerald-500/30 bg-black/40" />
              {/* Corner marks */}
              {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-8 h-8 border-emerald-400`} style={{
                  borderTopWidth: i < 2 ? 3 : 0,
                  borderBottomWidth: i >= 2 ? 3 : 0,
                  borderLeftWidth: i % 2 === 0 ? 3 : 0,
                  borderRightWidth: i % 2 === 1 ? 3 : 0,
                  borderRadius: 4,
                }} />
              ))}
              {/* Scan line */}
              <div className="absolute left-4 right-4 h-0.5 bg-emerald-400/70 top-1/2 shadow-lg shadow-emerald-400/50" style={{ animation: 'scanLine 2s ease-in-out infinite alternate' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <QrCode className="w-16 h-16 text-emerald-400/30" />
              </div>
            </div>
            <style>{`@keyframes scanLine { from { top: 20%; } to { top: 80%; } }`}</style>

            <p className="text-white font-semibold text-lg mb-2 text-center">{t.scan_title}</p>
            <p className="text-gray-400 text-sm text-center mb-8 max-w-xs">{t.scan_desc}</p>

            <button
              onClick={simulateScan}
              className="w-full max-w-xs bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl text-lg transition-all active:scale-95 mb-3"
            >
              <QrCode className="w-5 h-5 inline-block mr-2" />
              {t.scan_btn}
            </button>
            <button
              onClick={simulateScan}
              className="w-full max-w-xs bg-white/5 text-gray-400 font-semibold py-3 rounded-2xl text-sm transition-all active:scale-95 border border-white/10"
            >
              {t.demo_scan}
            </button>
          </div>
        )}

        {step === 'confirm' && (
          <div className="space-y-4">
            <div className="bg-[#122212] rounded-3xl p-4 border border-green-900/30">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">{t.confirm_title}</p>
              <div className="space-y-3">
                {[
                  { label: t.confirm_type, value: t.sensor_type, icon: '🌱' },
                  { label: t.confirm_id, value: scannedCode, icon: '📋', mono: true },
                  { label: t.confirm_farm, value: 'ضيعة المختار - أكادير', icon: '🚜' },
                  { label: t.confirm_replace, value: t.old_sensor, icon: '🔄', mono: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#0d1a0d] rounded-2xl p-3">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="text-gray-400 text-xs">{item.label}</p>
                      <p className={`text-white font-semibold text-sm ${item.mono ? 'font-mono' : ''}`}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-950/40 rounded-2xl p-3 border border-emerald-800/30 flex items-start gap-2">
              <Wifi className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-emerald-300 text-xs">
                {language === 'darija'
                  ? 'سيتم إرسال كود التعريف للـ ESP32 عبر الشبكة المحلية بدون الحاجة لكمبيوتر'
                  : 'L\'ID sera envoyé à l\'ESP32 via le réseau local, sans ordinateur nécessaire'}
              </p>
            </div>

            <button
              onClick={startInstall}
              className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl text-lg transition-all active:scale-95"
            >
              <Package className="w-5 h-5 inline-block mr-2" />
              {t.confirm_btn}
            </button>
            <button onClick={() => setStep('scan')} className="w-full text-gray-400 py-3 text-sm">{t.cancel}</button>
          </div>
        )}

        {step === 'installing' && (
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 relative mb-6 mt-4">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#1a2e1a" strokeWidth="8" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="8"
                  strokeDasharray={`${2.51 * progress} ${2.51 * 100}`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 0.8s ease' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
              </div>
            </div>
            <p className="text-white font-bold text-xl mb-1">{t.installing_title}</p>
            <p className="text-emerald-400 font-bold text-2xl mb-6">{progress}%</p>

            <div className="w-full space-y-2">
              {installSteps.map((s, i) => {
                const done = progress >= (i + 1) * 25;
                const active = progress >= i * 25 && progress < (i + 1) * 25;
                return (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${
                    done ? 'bg-emerald-950/40 border border-emerald-800/30' :
                    active ? 'bg-blue-950/40 border border-blue-800/30' :
                    'bg-[#122212] border border-transparent'
                  }`}>
                    {done ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    ) : active ? (
                      <RefreshCw className="w-4 h-4 text-blue-400 animate-spin flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-gray-600 flex-shrink-0" />
                    )}
                    <p className={`text-sm ${done ? 'text-emerald-300' : active ? 'text-blue-300' : 'text-gray-500'}`}>{s}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === 'done' && (
          <div className="flex flex-col items-center pt-8">
            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-12 h-12 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{t.done_title}</h2>
            <p className="text-gray-400 text-center mb-8 max-w-xs">{t.done_msg}</p>

            <div className="w-full bg-[#122212] rounded-3xl p-4 border border-emerald-800/30 mb-8">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-gray-500 text-xs">New ID</p><p className="text-emerald-400 font-mono text-sm">{scannedCode}</p></div>
                <div><p className="text-gray-500 text-xs">Status</p><p className="text-emerald-400 text-sm">Online</p></div>
                <div><p className="text-gray-500 text-xs">Moisture</p><p className="text-white font-semibold text-sm">45%</p></div>
                <div><p className="text-gray-500 text-xs">Firmware</p><p className="text-white text-sm">2.4.1</p></div>
              </div>
            </div>

            <button
              onClick={() => setStep('scan')}
              className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl text-lg transition-all active:scale-95"
            >
              {t.done_btn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
