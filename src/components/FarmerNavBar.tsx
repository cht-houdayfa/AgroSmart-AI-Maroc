import React from 'react';
import { LayoutDashboard, Droplets, Sliders, HeadphonesIcon, Bell, CalendarDays } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

type FarmerTab = 'dashboard' | 'irrigation' | 'control' | 'support' | 'notifications' | 'calendar';

interface Props {
  active: FarmerTab;
  onChange: (t: FarmerTab) => void;
  notifCount?: number;
}

export default function FarmerNavBar({ active, onChange, notifCount = 0 }: Props) {
  const { t } = useLanguage();

  const tabs = [
    { id: 'dashboard' as const, icon: <LayoutDashboard className="w-5 h-5" />, label: t.farmer.farm },
    { id: 'irrigation' as const, icon: <Droplets className="w-5 h-5" />, label: t.farmer.irrigation },
    { id: 'calendar' as const, icon: <CalendarDays className="w-5 h-5" />, label: t.farmer.calendar },
    { id: 'control' as const, icon: <Sliders className="w-5 h-5" />, label: t.farmer.control },
    {
      id: 'notifications' as const,
      icon: (
        <div className="relative">
          <Bell className="w-5 h-5" />
          {notifCount > 0 && (
            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">{notifCount > 9 ? '9+' : notifCount}</span>
            </div>
          )}
        </div>
      ),
      label: t.farmer.alerts,
    },
    { id: 'support' as const, icon: <HeadphonesIcon className="w-5 h-5" />, label: t.farmer.help },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0d1a0d]/95 backdrop-blur-md border-t border-green-900/40 z-40 pb-safe">
      <div className="flex overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex-1 min-w-0 flex flex-col items-center gap-0.5 py-2.5 transition-all active:scale-95 ${
              active === tab.id ? 'text-emerald-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <div className={`transition-transform ${active === tab.id ? 'scale-110' : ''}`}>
              {tab.icon}
            </div>
            <span className="text-[10px] font-medium truncate w-full text-center px-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
