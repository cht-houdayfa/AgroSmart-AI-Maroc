import React from 'react';
import { Map, Cpu, QrCode, FileText } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

type TechTab = 'map' | 'diagnostic' | 'qrsetup' | 'fieldnotes';

interface Props {
  active: TechTab;
  onChange: (t: TechTab) => void;
  openTickets?: number;
}

export default function TechNavBar({ active, onChange, openTickets = 0 }: Props) {
  const { t } = useLanguage();

  const tabs = [
    { id: 'map' as const, icon: <Map className="w-5 h-5" />, label: t.technician.mapDashboard },
    { id: 'diagnostic' as const, icon: <Cpu className="w-5 h-5" />, label: t.technician.diagnostics },
    { id: 'qrsetup' as const, icon: <QrCode className="w-5 h-5" />, label: t.technician.qrSetup },
    {
      id: 'fieldnotes' as const,
      icon: (
        <div className="relative">
          <FileText className="w-5 h-5" />
          {openTickets > 0 && (
            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">{openTickets}</span>
            </div>
          )}
        </div>
      ),
      label: t.technician.fieldNotes,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#130d00]/95 backdrop-blur-md border-t border-amber-900/40 z-40 pb-safe">
      <div className="flex">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-all active:scale-95 ${
              active === tab.id ? 'text-amber-400' : 'text-gray-500 hover:text-gray-300'
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
