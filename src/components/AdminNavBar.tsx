import React from 'react';
import { BarChart2, ShieldAlert, CreditCard, Upload, Map } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

type AdminTab = 'analytics' | 'qa' | 'billing' | 'ota' | 'network';

interface Props {
  active: AdminTab;
  onChange: (t: AdminTab) => void;
}

export default function AdminNavBar({ active, onChange }: Props) {
  const { t } = useLanguage();

  const tabs = [
    { id: 'analytics' as const, icon: <BarChart2 className="w-5 h-5" />, label: t.admin.analytics },
    { id: 'network' as const, icon: <Map className="w-5 h-5" />, label: t.admin.networkMap },
    { id: 'qa' as const, icon: <ShieldAlert className="w-5 h-5" />, label: t.admin.predictiveQA },
    { id: 'billing' as const, icon: <CreditCard className="w-5 h-5" />, label: t.admin.billingCRM },
    { id: 'ota' as const, icon: <Upload className="w-5 h-5" />, label: t.admin.otaUpdates },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#090d13]/95 backdrop-blur-md border-t border-blue-900/40 z-40 pb-safe">
      <div className="flex">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-all active:scale-95 ${
              active === tab.id ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <div className={`transition-transform ${active === tab.id ? 'scale-110' : ''}`}>
              {tab.icon}
            </div>
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
