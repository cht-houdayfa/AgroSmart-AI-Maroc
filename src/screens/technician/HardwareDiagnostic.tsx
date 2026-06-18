import React, { useState } from 'react';
import { ArrowLeft, Battery, Gauge, Activity, Droplets, AlertTriangle, CheckCircle, Cpu } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

const DEMO_NODES = [
  { id: '1', code: 'NODE-AGA-001', sector: 'قطاع الأفوكاتو الشمالي', battery: 78, soh: 92, pressure: 2.4, flow: 12.5, moisture: 65, firmware: '2.4.1', status: 'online' as const, lastSeen: '2 دقيقة' },
  { id: '2', code: 'NODE-AGA-002', sector: 'قطاع الأفوكاتو الجنوبي', battery: 45, soh: 72, pressure: 2.1, flow: 9.8, moisture: 32, firmware: '2.3.8', status: 'warning' as const, lastSeen: '5 دقائق' },
];

const DEMO_NODES_FR = [
  { id: '1', code: 'NODE-AGA-001', sector: 'Secteur Avocat Nord', battery: 78, soh: 92, pressure: 2.4, flow: 12.5, moisture: 65, firmware: '2.4.1', status: 'online' as const, lastSeen: 'il y a 2 min' },
  { id: '2', code: 'NODE-AGA-002', sector: 'Secteur Avocat Sud', battery: 45, soh: 72, pressure: 2.1, flow: 9.8, moisture: 32, firmware: '2.3.8', status: 'warning' as const, lastSeen: 'il y a 5 min' },
];

interface Props {
  farmId: string;
  onBack: () => void;
}

function MiniChart({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 120;
  const h = 40;
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`).join(' ');

  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {values.map((v, i) => (
        <circle key={i} cx={(i / (values.length - 1)) * w} cy={h - ((v - min) / range) * (h - 4) - 2} r="2" fill={color} />
      ))}
    </svg>
  );
}

export default function HardwareDiagnostic({ farmId, onBack }: Props) {
  const { language, t: globalT } = useLanguage();
  const [selectedNode, setSelectedNode] = useState(0);

  const nodes = language === 'darija' ? DEMO_NODES : DEMO_NODES_FR;
  const node = nodes[selectedNode];

  const t = language === 'darija' ? {
    title: 'تشخيص العتاد',
    back: 'رجوع',
    battery: 'البطارية',
    soh: 'صحة البطارية (SOH)',
    pressure: 'ضغط المياه',
    flow: 'معدل التدفق',
    moisture: 'رطوبة الأرض',
    firmware: 'إصدار البرنامج',
    last_seen: 'آخر اتصال',
    bar: 'بار',
    lpm: 'ل/د',
    status_ok: 'ممتاز',
    status_warn: 'تنبيه',
    alert_soh: 'كفاءة البطارية انخفضت تحت 80%، يُنصح بالاستبدال',
    alert_fw: 'توجد نسخة جديدة من البرنامج (2.4.1)',
    pressure_chart: 'مخطط الضغط (24 ساعة)',
    flow_chart: 'مخطط التدفق (24 ساعة)',
  } : {
    title: 'Diagnostic matériel',
    back: 'Retour',
    battery: 'Batterie',
    soh: 'Santé batterie (SOH)',
    pressure: 'Pression eau',
    flow: 'Débit',
    moisture: 'Humidité sol',
    firmware: 'Version firmware',
    last_seen: 'Dernière connexion',
    bar: 'bar',
    lpm: 'L/min',
    status_ok: 'Excellent',
    status_warn: 'Alerte',
    alert_soh: 'Efficacité batterie sous 80%, remplacement conseillé',
    alert_fw: 'Nouvelle version firmware disponible (2.4.1)',
    pressure_chart: 'Graphique pression (24h)',
    flow_chart: 'Graphique débit (24h)',
  };

  const pressureData = [2.2, 2.4, 2.5, 2.3, 2.4, 2.1, 2.3, 2.4, 2.6, 2.4, node.pressure, 2.3];
  const flowData = [11, 12, 13, 12, 11, 10, 12, 13, 12, 11, node.flow, 12];

  return (
    <div className="min-h-screen bg-[#0d1a0d] text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 to-cyan-950 px-5 pt-12 pb-5">
        <button onClick={onBack} className="flex items-center gap-2 text-blue-300 mb-3">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">{t.back}</span>
        </button>
        <h1 className="text-2xl font-bold text-white">{t.title}</h1>

        {/* Node selector */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {nodes.map((n, i) => (
            <button
              key={n.id}
              onClick={() => setSelectedNode(i)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedNode === i
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-blue-300'
              }`}
            >
              {n.code}
              {n.status === 'warning' && <span className="ml-1 text-amber-400">!</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-5 space-y-4">
        {/* Alerts */}
        {node.soh < 80 && (
          <div className="bg-amber-950/50 border border-amber-700/40 rounded-2xl p-3 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-amber-300 text-xs">{t.alert_soh}</p>
          </div>
        )}
        {node.firmware !== '2.4.1' && (
          <div className="bg-blue-950/50 border border-blue-700/40 rounded-2xl p-3 flex items-start gap-3">
            <Cpu className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-blue-300 text-xs">{t.alert_fw}</p>
          </div>
        )}

        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: <Battery className="w-5 h-5" />, label: t.battery, value: `${node.battery}%`, sub: t.soh + ': ' + node.soh + '%', color: node.battery > 60 ? 'text-emerald-400' : 'text-red-400', bg: 'bg-emerald-900/20', border: 'border-emerald-800/30' },
            { icon: <Gauge className="w-5 h-5" />, label: t.pressure, value: `${node.pressure} ${t.bar}`, sub: node.pressure > 0 ? t.status_ok : t.status_warn, color: 'text-blue-400', bg: 'bg-blue-900/20', border: 'border-blue-800/30' },
            { icon: <Activity className="w-5 h-5" />, label: t.flow, value: `${node.flow} ${t.lpm}`, sub: t.status_ok, color: 'text-cyan-400', bg: 'bg-cyan-900/20', border: 'border-cyan-800/30' },
            { icon: <Droplets className="w-5 h-5" />, label: t.moisture, value: `${node.moisture}%`, sub: node.moisture > 50 ? t.status_ok : t.status_warn, color: 'text-teal-400', bg: 'bg-teal-900/20', border: 'border-teal-800/30' },
          ].map((m, i) => (
            <div key={i} className={`${m.bg} border ${m.border} rounded-3xl p-4`}>
              <div className={`${m.color} mb-2`}>{m.icon}</div>
              <p className="text-gray-400 text-xs mb-1">{m.label}</p>
              <p className={`${m.color} font-bold text-xl`}>{m.value}</p>
              <p className="text-gray-500 text-xs mt-0.5">{m.sub}</p>
            </div>
          ))}
        </div>

        {/* Pressure chart */}
        <div className="bg-[#122212] rounded-3xl p-4 border border-green-900/30">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">{t.pressure_chart}</p>
          <div className="flex items-end justify-between gap-1">
            {pressureData.map((v, i) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <div
                  className={`w-full rounded-t-sm transition-all ${v < 1.5 ? 'bg-red-500' : v < 2 ? 'bg-amber-500' : 'bg-blue-500'}`}
                  style={{ height: `${v * 20}px` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-600 text-xs">00:00</span>
            <span className="text-gray-600 text-xs">12:00</span>
            <span className="text-gray-600 text-xs">24:00</span>
          </div>
        </div>

        {/* Flow chart */}
        <div className="bg-[#122212] rounded-3xl p-4 border border-green-900/30">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">{t.flow_chart}</p>
          <MiniChart values={flowData} color="#06b6d4" />
          <div className="flex justify-between mt-2">
            <span className="text-gray-600 text-xs">00:00</span>
            <span className="text-gray-600 text-xs">24:00</span>
          </div>
        </div>

        {/* Info */}
        <div className="bg-[#122212] rounded-3xl p-4 border border-green-900/30">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-500 text-xs">{t.firmware}</p>
              <p className="text-white font-semibold">{node.firmware}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">{t.last_seen}</p>
              <p className="text-white font-semibold">{node.lastSeen}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Code</p>
              <p className="text-white font-mono text-xs">{node.code}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Status</p>
              <div className="flex items-center gap-1">
                {node.status === 'online' ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                <span className={node.status === 'online' ? 'text-emerald-400 text-xs' : 'text-amber-400 text-xs'}>{node.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
