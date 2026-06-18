import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { Sprout, Mic } from 'lucide-react';

interface WelcomeScreenProps {
  onLogin: (role: 'farmer' | 'technician' | 'admin') => void;
}

export default function WelcomeScreen({ onLogin }: WelcomeScreenProps) {
  const { language, t } = useLanguage();
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSendOtp() {
    if (!phone) return;
    setLoading(true);
    setTimeout(() => { setOtpSent(true); setLoading(false); }, 1200);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white"
            style={{
              width: `${(i + 1) * 80}px`,
              height: `${(i + 1) * 80}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* Language selector */}
      <div className="absolute top-6 right-6 z-10">
        <LanguageSwitcher />
      </div>

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center mb-10">
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl mb-5 animate-pulse-slow">
          <Sprout className="w-14 h-14 text-white" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">{t.auth.loginTitle}</h1>
        <p className="text-emerald-300 text-center text-sm leading-relaxed max-w-xs">{t.auth.loginSubtitle}</p>
      </div>

      {/* Login form */}
      <div className="relative z-10 w-full max-w-sm">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20">
          {!otpSent ? (
            <>
              <input
                type="tel"
                dir="ltr"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder={t.auth.phonePlaceholder}
                className="w-full bg-white/20 text-white placeholder-white/50 rounded-2xl px-4 py-4 text-lg text-center tracking-widest mb-4 border border-white/30 focus:outline-none focus:border-emerald-400 focus:bg-white/25 transition-all"
              />
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white font-bold py-4 rounded-2xl text-lg transition-all shadow-lg disabled:opacity-60"
              >
                {loading ? '...' : t.auth.sendOtp}
              </button>
            </>
          ) : (
            <>
              <p className="text-center text-emerald-300 text-sm mb-4">
                {t.auth.otpSent} {phone}
              </p>
              <input
                type="number"
                dir="ltr"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                placeholder="0000"
                maxLength={4}
                className="w-full bg-white/20 text-white placeholder-white/50 rounded-2xl px-4 py-4 text-3xl text-center tracking-[1rem] mb-4 border border-white/30 focus:outline-none focus:border-emerald-400 transition-all"
              />
              <button
                onClick={() => onLogin('farmer')}
                className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white font-bold py-4 rounded-2xl text-lg transition-all shadow-lg"
              >
                {t.auth.verify}
              </button>
            </>
          )}
        </div>

        {/* Demo access */}
        <div className="mt-6">
          <p className="text-center text-emerald-400/70 text-xs mb-3 uppercase tracking-widest">{t.auth.demoLabel}</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: t.auth.demoFarmer, role: 'farmer' as const, color: 'from-green-600 to-emerald-600' },
              { label: t.auth.demoTechnician, role: 'technician' as const, color: 'from-amber-600 to-orange-600' },
              { label: t.auth.demoAdmin, role: 'admin' as const, color: 'from-blue-600 to-cyan-600' },
            ].map(({ label, role, color }) => (
              <button
                key={role}
                onClick={() => onLogin(role)}
                className={`bg-gradient-to-br ${color} hover:opacity-90 active:scale-95 text-white font-semibold py-3 px-2 rounded-2xl text-xs transition-all shadow-lg leading-tight text-center`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Voice hint */}
      <div className="relative z-10 mt-10 flex items-center gap-2 text-emerald-400/60">
        <Mic className="w-4 h-4" />
        <span className="text-xs">
          {language === 'darija' || language === 'ar'
            ? `"${t.common.voiceAssistant}" ${language === 'darija' ? 'واعي بالدارجة' : 'مساعد صوتي ذكي'}`
            : `${t.common.voiceAssistant} voice assistant`}
        </span>
      </div>
    </div>
  );
}
