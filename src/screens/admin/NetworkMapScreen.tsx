import React, { useState } from 'react';
import { MapPin, Wifi, WifiOff, AlertTriangle, Activity, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface RegionData {
  name: string;
  nameFr: string;
  farms: number;
  nodes: number;
  critical: number;
  warning: number;
  online: number;
  water_saved: number;
  cx: number;
  cy: number;
}

const REGIONS: RegionData[] = [
  { name: 'سوس ماسة', nameFr: 'Souss Massa', farms: 34, nodes: 102, critical: 2, warning: 5, online: 95, water_saved: 4200, cx: 120, cy: 310 },
  { name: 'الغرب-الشراردة', nameFr: 'Gharb Chrarda', farms: 28, nodes: 84, critical: 1, warning: 8, online: 75, water_saved: 3100, cx: 165, cy: 115 },
  { name: 'مراكش-الحوز', nameFr: 'Marrakech Safi', farms: 22, nodes: 66, critical: 3, warning: 4, online: 59, water_saved: 2800, cx: 195, cy: 265 },
  { name: 'الشرق', nameFr: 'Oriental', farms: 18, nodes: 54, critical: 0, warning: 6, online: 48, water_saved: 1900, cx: 330, cy: 120 },
  { name: 'مكناس-تافيلالت', nameFr: 'Meknès Tafilalet', farms: 15, nodes: 45, critical: 1, warning: 3, online: 41, water_saved: 2200, cx: 225, cy: 155 },
  { name: 'فاس-بولمان', nameFr: 'Fès Boulemane', farms: 10, nodes: 33, critical: 4, warning: 2, online: 27, water_saved: 1400, cx: 275, cy: 140 },
];

export default function NetworkMapScreen() {
  const { language, t: globalT } = useLanguage();
  const [selected, setSelected] = useState<RegionData | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  const t = language === 'darija' ? {
    title: 'خريطة الشبكة',
    subtitle: 'تغطية المغرب في الوقت الحقيقي',
    total_farms: 'ضيعة نشطة',
    total_nodes: 'محطة',
    critical_count: 'تدخل عاجل',
    map: 'الخريطة',
    list: 'القائمة',
    region: 'الجهة',
    farms: 'ضيعة',
    nodes: 'محطة',
    critical: 'حرج',
    warning: 'تنبيه',
    online: 'متصل',
    water: 'مياه موفرة',
    m3: 'م³',
    close: 'إغلاق',
    legend_ok: 'طبيعي',
    legend_warn: 'تنبيه',
    legend_crit: 'عاجل',
  } : {
    title: 'Carte du réseau',
    subtitle: 'Couverture Maroc en temps réel',
    total_farms: 'fermes actives',
    total_nodes: 'nœuds',
    critical_count: 'interventions urgentes',
    map: 'Carte',
    list: 'Liste',
    region: 'Région',
    farms: 'fermes',
    nodes: 'nœuds',
    critical: 'critique',
    warning: 'alerte',
    online: 'en ligne',
    water: 'Eau économisée',
    m3: 'm³',
    close: 'Fermer',
    legend_ok: 'Normal',
    legend_warn: 'Alerte',
    legend_crit: 'Urgent',
  };

  function getNodeColor(r: RegionData) {
    if (r.critical > 2) return '#ef4444';
    if (r.critical > 0 || r.warning > 5) return '#f59e0b';
    return '#10b981';
  }

  function getNodeSize(r: RegionData) {
    return 8 + r.farms * 0.4;
  }

  const totalFarms = REGIONS.reduce((a, r) => a + r.farms, 0);
  const totalNodes = REGIONS.reduce((a, r) => a + r.nodes, 0);
  const totalCritical = REGIONS.reduce((a, r) => a + r.critical, 0);
  const totalWater = REGIONS.reduce((a, r) => a + r.water_saved, 0);

  return (
    <div className="min-h-screen bg-[#0d1309] text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-950 to-emerald-950 px-5 pt-12 pb-5">
        <h1 className="text-2xl font-bold text-white">{t.title}</h1>
        <p className="text-teal-300/70 text-xs mt-0.5">{t.subtitle}</p>

        <div className="flex gap-3 mt-4">
          <div className="flex-1 bg-black/20 rounded-2xl p-3 text-center">
            <p className="text-emerald-400 font-bold text-xl">{totalFarms}</p>
            <p className="text-gray-400 text-xs">{t.total_farms}</p>
          </div>
          <div className="flex-1 bg-black/20 rounded-2xl p-3 text-center">
            <p className="text-teal-400 font-bold text-xl">{totalNodes}</p>
            <p className="text-gray-400 text-xs">{t.total_nodes}</p>
          </div>
          <div className="flex-1 bg-black/20 rounded-2xl p-3 text-center">
            <p className={`font-bold text-xl ${totalCritical > 0 ? 'text-red-400' : 'text-emerald-400'}`}>{totalCritical}</p>
            <p className="text-gray-400 text-xs">{t.critical_count}</p>
          </div>
        </div>
      </div>

      {/* View toggle */}
      <div className="flex mx-4 mt-4 bg-[#122212] rounded-2xl p-1 mb-4">
        {(['map', 'list'] as const).map(v => (
          <button
            key={v}
            onClick={() => setViewMode(v)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              viewMode === v ? 'bg-teal-800 text-white' : 'text-gray-400'
            }`}
          >
            {t[v]}
          </button>
        ))}
      </div>

      <div className="px-4">
        {viewMode === 'map' ? (
          <>
            {/* SVG Map of Morocco */}
            <div className="bg-[#0e1c10] rounded-3xl overflow-hidden border border-green-900/30 shadow-xl relative">
              <svg viewBox="0 0 400 380" className="w-full" style={{ height: '280px' }}>
                {/* Morocco outline - simplified */}
                <path
                  d="M110,40 L170,30 L230,35 L290,45 L340,70 L370,100 L375,140 L365,180 L350,220 L330,250 L310,280 L280,310 L240,340 L200,360 L160,350 L130,330 L100,300 L80,270 L60,240 L50,200 L45,160 L50,120 L65,85 L90,55 Z"
                  fill="#0a1a0a" stroke="#1a3a1a" strokeWidth="1.5"
                />
                {/* Region blobs */}
                {REGIONS.map((r, i) => (
                  <g key={i} onClick={() => setSelected(selected?.name === r.name ? null : r)} className="cursor-pointer">
                    <circle
                      cx={r.cx} cy={r.cy}
                      r={getNodeSize(r) + 8}
                      fill={getNodeColor(r)}
                      opacity="0.12"
                    />
                    <circle
                      cx={r.cx} cy={r.cy}
                      r={getNodeSize(r)}
                      fill={getNodeColor(r)}
                      opacity="0.9"
                      className={r.critical > 0 ? 'animate-pulse' : ''}
                    />
                    <text
                      x={r.cx} y={r.cy + getNodeSize(r) + 14}
                      textAnchor="middle"
                      fill="white"
                      fontSize="8"
                      fontWeight="bold"
                      opacity="0.85"
                    >
                      {language === 'darija' ? r.name.split('-')[0] : r.nameFr.split(' ')[0]}
                    </text>
                    <text
                      x={r.cx} y={r.cy + 3}
                      textAnchor="middle"
                      fill="white"
                      fontSize="7"
                      fontWeight="bold"
                    >
                      {r.farms}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Legend */}
              <div className="absolute bottom-3 right-3 flex flex-col gap-1.5">
                {[
                  { color: 'bg-emerald-500', label: t.legend_ok },
                  { color: 'bg-amber-500', label: t.legend_warn },
                  { color: 'bg-red-500', label: t.legend_crit },
                ].map((l, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${l.color}`} />
                    <span className="text-gray-400 text-xs">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected region detail */}
            {selected && (
              <div className="mt-3 bg-[#122212] rounded-3xl p-4 border border-teal-700/30 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white font-bold">{language === 'darija' ? selected.name : selected.nameFr}</p>
                  <button onClick={() => setSelected(null)} className="text-gray-400 text-xs">{t.close}</button>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center mb-3">
                  <div className="bg-[#0d1a0d] rounded-xl p-2">
                    <p className="text-emerald-400 font-bold text-lg">{selected.farms}</p>
                    <p className="text-gray-500 text-xs">{t.farms}</p>
                  </div>
                  <div className="bg-[#0d1a0d] rounded-xl p-2">
                    <p className="text-teal-400 font-bold text-lg">{selected.nodes}</p>
                    <p className="text-gray-500 text-xs">{t.nodes}</p>
                  </div>
                  <div className="bg-[#0d1a0d] rounded-xl p-2">
                    <p className="text-blue-400 font-bold text-lg">{selected.water_saved.toLocaleString()}</p>
                    <p className="text-gray-500 text-xs">{t.m3}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className={`flex-1 flex items-center gap-1.5 justify-center py-2 rounded-xl ${selected.critical > 0 ? 'bg-red-900/30' : 'bg-green-900/20'}`}>
                    {selected.critical > 0 ? <AlertTriangle className="w-3.5 h-3.5 text-red-400" /> : <Wifi className="w-3.5 h-3.5 text-emerald-400" />}
                    <span className={`text-xs font-semibold ${selected.critical > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {selected.critical} {t.critical}
                    </span>
                  </div>
                  <div className="flex-1 flex items-center gap-1.5 justify-center py-2 rounded-xl bg-amber-900/20">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-semibold text-amber-400">{selected.warning} {t.warning}</span>
                  </div>
                  <div className="flex-1 flex items-center gap-1.5 justify-center py-2 rounded-xl bg-emerald-900/20">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-semibold text-emerald-400">{selected.online} {t.online}</span>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-3">
            {REGIONS.sort((a, b) => b.farms - a.farms).map((r, i) => {
              const color = getNodeColor(r);
              return (
                <div key={i} className="bg-[#122212] rounded-3xl p-4 border border-green-900/20 shadow-xl">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                      <p className="text-white font-semibold">{language === 'darija' ? r.name : r.nameFr}</p>
                    </div>
                    <span className="text-gray-500 text-xs">#{i + 1}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center mt-3">
                    <div>
                      <p className="text-emerald-400 font-bold">{r.farms}</p>
                      <p className="text-gray-600 text-xs">{t.farms}</p>
                    </div>
                    <div>
                      <p className="text-teal-400 font-bold">{r.nodes}</p>
                      <p className="text-gray-600 text-xs">{t.nodes}</p>
                    </div>
                    <div>
                      <p className={`font-bold ${r.critical > 0 ? 'text-red-400' : 'text-gray-500'}`}>{r.critical}</p>
                      <p className="text-gray-600 text-xs">{t.critical}</p>
                    </div>
                    <div>
                      <p className="text-blue-400 font-bold">{(r.water_saved / 1000).toFixed(1)}k</p>
                      <p className="text-gray-600 text-xs">{t.m3}</p>
                    </div>
                  </div>
                  {/* Node health bar */}
                  <div className="mt-3 h-1.5 bg-gray-800 rounded-full overflow-hidden flex">
                    <div className="bg-emerald-500 h-full" style={{ width: `${(r.online / r.nodes) * 100}%` }} />
                    <div className="bg-amber-500 h-full" style={{ width: `${(r.warning / r.nodes) * 100}%` }} />
                    <div className="bg-red-500 h-full" style={{ width: `${(r.critical / r.nodes) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Water saved banner */}
        <div className="mt-4 bg-gradient-to-r from-blue-900/40 to-cyan-900/40 rounded-3xl p-4 border border-blue-700/30 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-xs font-semibold">{t.water}</p>
              <p className="text-white font-bold text-3xl">{(totalWater / 1000).toFixed(1)}k</p>
              <p className="text-blue-400 text-sm">{t.m3} {language === 'darija' ? 'هذا الشهر' : 'ce mois'}</p>
            </div>
            <div className="text-5xl opacity-20">💧</div>
          </div>
        </div>
      </div>
    </div>
  );
}
