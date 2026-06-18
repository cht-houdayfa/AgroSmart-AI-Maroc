import React from 'react';
import { LogOut, User, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface Props {
  onLogout: () => void;
}

export default function RoleBadge({ onLogout }: Props) {
  const { user } = useApp();
  const { t, language } = useLanguage();

  if (!user) return null;

  const roleLabels = {
    farmer: { label: language === 'darija' || language === 'ar' ? 'فلاح' : language === 'fr' ? 'Agriculteur' : 'Farmer', color: 'text-emerald-400', bg: 'bg-emerald-900/30' },
    technician: { label: language === 'darija' || language === 'ar' ? 'تقني ميداني' : language === 'fr' ? 'Technicien' : 'Technician', color: 'text-amber-400', bg: 'bg-amber-900/30' },
    admin: { label: language === 'darija' || language === 'ar' ? 'إدارة' : language === 'fr' ? 'Administration' : 'Admin', color: 'text-blue-400', bg: 'bg-blue-900/30' },
  };

  const cfg = roleLabels[user.role];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 pt-2 pb-1 bg-transparent pointer-events-none">
      <div className={`pointer-events-auto flex items-center gap-2 ${cfg.bg} rounded-full px-3 py-1.5 backdrop-blur-sm`}>
        <User className={`w-3.5 h-3.5 ${cfg.color}`} />
        <span className={`text-xs font-semibold ${cfg.color}`}>
          {cfg.label}
        </span>
      </div>
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm transition-all"
        >
          <LogOut className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-400 text-xs">{t.common.logout}</span>
        </button>
      </div>
    </div>
  );
}
