import React, { useState, useEffect } from 'react';
import { MapPin, AlertTriangle, Wrench, CheckCircle, Navigation, Filter } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Farm, IotNode } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

interface FarmWithNodes extends Farm {
  nodes: IotNode[];
  priority: 'critical' | 'warning' | 'ok';
}

const DEMO_FARMS: FarmWithNodes[] = [
  {
    id: '11111111-0000-0000-0000-000000000001', owner_id: null, name: 'ضيعة المختار', region: 'أكادير',
    location_lat: 30.4202, location_lng: -9.5982, area_hectares: 12.5, crop_type: 'أفوكاتو',
    technician_id: null, status: 'active', created_at: '',
    nodes: [], priority: 'warning',
  },
  {
    id: '11111111-0000-0000-0000-000000000002', owner_id: null, name: 'تعاونية فاطمة', region: 'الغرب',
    location_lat: 34.2610, location_lng: -6.5802, area_hectares: 8, crop_type: 'زيتون',
    technician_id: null, status: 'active', created_at: '',
    nodes: [], priority: 'critical',
  },
  {
    id: '11111111-0000-0000-0000-000000000003', owner_id: null, name: 'ضيعة الحسن', region: 'مراكش',
    location_lat: 31.6295, location_lng: -7.9811, area_hectares: 5, crop_type: 'حوامض',
    technician_id: null, status: 'active', created_at: '',
    nodes: [], priority: 'ok',
  },
  {
    id: '11111111-0000-0000-0000-000000000004', owner_id: null, name: 'تعاونية بركان', region: 'بركان',
    location_lat: 34.9203, location_lng: -2.3205, area_hectares: 20, crop_type: 'عنب',
    technician_id: null, status: 'active', created_at: '',
    nodes: [], priority: 'warning',
  },
  {
    id: '11111111-0000-0000-0000-000000000005', owner_id: null, name: 'ضيعة محمد - مكناس', region: 'مكناس',
    location_lat: 33.8935, location_lng: -5.5473, area_hectares: 15, crop_type: 'زيتون',
    technician_id: null, status: 'active', created_at: '',
    nodes: [], priority: 'ok',
  },
];

interface TechMapDashboardProps {
  onSelectFarm: (farmId: string) => void;
}

export default function TechMapDashboard({ onSelectFarm }: TechMapDashboardProps) {
  const { language, t: globalT } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning'>('all');

  const t = language === 'darija' || language === 'ar' ? {
    title: 'خريطة المهام',
    subtitle: 'مرتبة من الأقرب للأبعد',
    all: 'الكل',
    critical: 'عاجل',
    warning: 'تنبيه',
    visits: 'زيارة اليوم',
    km: 'كم',
    hectares: 'هكتار',
    nodes: 'نود',
    open_ticket: 'تذكرة مفتوحة',
    open_tickets: 'تذاكر مفتوحة',
    navigate: 'توجيه',
    tap_details: 'اضغط للتفاصيل التقنية',
    priority_crit: 'تدخل فوري',
    priority_warn: 'صيانة استباقية',
    priority_ok: 'كلشي مزيان',
  } : language === 'fr' ? {
    title: 'Carte des tâches',
    subtitle: 'Triées du plus proche au plus loin',
    all: 'Tout',
    critical: 'Urgent',
    warning: 'Alerte',
    visits: 'Visites aujourd\'hui',
    km: 'km',
    hectares: 'ha',
    nodes: 'nœuds',
    open_ticket: 'ticket ouvert',
    open_tickets: 'tickets ouverts',
    navigate: 'Naviguer',
    tap_details: 'Appuyer pour les détails',
    priority_crit: 'Intervention urgente',
    priority_warn: 'Maintenance préventive',
    priority_ok: 'Tout va bien',
  } : language === 'en' ? {
    title: 'Task Map',
    subtitle: 'Sorted by distance',
    all: 'All',
    critical: 'Urgent',
    warning: 'Warning',
    visits: 'Today\'s Visits',
    km: 'km',
    hectares: 'ha',
    nodes: 'nodes',
    open_ticket: 'open ticket',
    open_tickets: 'open tickets',
    navigate: 'Navigate',
    tap_details: 'Tap for details',
    priority_crit: 'Immediate Action',
    priority_warn: 'Preventive Maintenance',
    priority_ok: 'All Good',
  } : {
    title: 'خريطة المهام',
    subtitle: 'مرتبة من الأقرب للأبعد',
    all: 'الكل',
    critical: 'عاجل',
    warning: 'تنبيه',
    visits: 'زيارة اليوم',
    km: 'كم',
    hectares: 'هكتار',
    nodes: 'نود',
    open_ticket: 'تذكرة مفتوحة',
    open_tickets: 'تذاكر مفتوحة',
    navigate: 'توجيه',
    tap_details: 'اضغط للتفاصيل التقنية',
    priority_crit: 'تدخل فوري',
    priority_warn: 'صيانة استباقية',
    priority_ok: 'كلشي مزيان',
  };

  const filtered = DEMO_FARMS.filter(f => filter === 'all' || f.priority === filter);

  const priorityConfig = {
    critical: { color: 'border-red-500 bg-red-950/30', badge: 'bg-red-900/60 text-red-300', dot: 'bg-red-500', label: t.priority_crit },
    warning: { color: 'border-amber-500 bg-amber-950/20', badge: 'bg-amber-900/60 text-amber-300', dot: 'bg-amber-500', label: t.priority_warn },
    ok: { color: 'border-green-700 bg-[#122212]', badge: 'bg-green-900/60 text-green-300', dot: 'bg-emerald-500', label: t.priority_ok },
  };

  const critCount = DEMO_FARMS.filter(f => f.priority === 'critical').length;
  const warnCount = DEMO_FARMS.filter(f => f.priority === 'warning').length;

  return (
    <div className="min-h-screen bg-[#0d1a0d] text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-950 to-orange-950 px-5 pt-12 pb-5">
        <h1 className="text-2xl font-bold text-white">{t.title}</h1>
        <p className="text-amber-400/70 text-xs mt-1">{t.subtitle}</p>

        {/* Stats row */}
        <div className="flex gap-3 mt-4">
          <div className="flex-1 bg-black/20 rounded-2xl p-3 text-center">
            <p className="text-red-400 font-bold text-xl">{critCount}</p>
            <p className="text-gray-400 text-xs">{t.critical}</p>
          </div>
          <div className="flex-1 bg-black/20 rounded-2xl p-3 text-center">
            <p className="text-amber-400 font-bold text-xl">{warnCount}</p>
            <p className="text-gray-400 text-xs">{t.warning}</p>
          </div>
          <div className="flex-1 bg-black/20 rounded-2xl p-3 text-center">
            <p className="text-white font-bold text-xl">{DEMO_FARMS.length}</p>
            <p className="text-gray-400 text-xs">{t.visits}</p>
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="mx-4 mt-4 rounded-3xl overflow-hidden border border-green-900/30 shadow-xl h-52 relative bg-[#0a1f0a]">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Stylized map */}
          <svg viewBox="0 0 400 200" className="w-full h-full opacity-30">
            <path d="M50,100 Q100,50 200,80 Q300,110 350,60" stroke="#22c55e" fill="none" strokeWidth="2" />
            <path d="M80,150 Q150,120 250,140 Q320,155 380,130" stroke="#16a34a" fill="none" strokeWidth="1.5" />
          </svg>
          {/* Pins */}
          {DEMO_FARMS.map((f, i) => (
            <div
              key={f.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${20 + i * 18}%`, top: `${30 + (i % 3) * 20}%` }}
              onClick={() => onSelectFarm(f.id)}
            >
              <div className={`w-4 h-4 rounded-full shadow-lg ${
                f.priority === 'critical' ? 'bg-red-500 animate-ping' :
                f.priority === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'
              }`} />
            </div>
          ))}
        </div>
        <div className="absolute bottom-3 right-3 bg-black/70 rounded-xl px-3 py-1.5 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-400" />
          <span className="text-white text-xs">Google Maps API</span>
        </div>
      </div>

      {/* Filter */}
      <div className="flex mx-4 mt-4 gap-2">
        {(['all', 'critical', 'warning'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              filter === f
                ? f === 'critical' ? 'bg-red-800 text-white' : f === 'warning' ? 'bg-amber-700 text-white' : 'bg-emerald-800 text-white'
                : 'bg-[#122212] text-gray-400'
            }`}
          >
            {f === 'all' ? t.all : f === 'critical' ? t.critical : t.warning}
          </button>
        ))}
      </div>

      {/* Farm list */}
      <div className="px-4 mt-4 space-y-3">
        {filtered.map((farm, i) => {
          const cfg = priorityConfig[farm.priority];
          return (
            <button
              key={farm.id}
              onClick={() => onSelectFarm(farm.id)}
              className={`w-full text-left rounded-3xl p-4 border transition-all shadow-xl active:scale-98 ${cfg.color}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className={`w-3 h-3 rounded-full ${cfg.dot} shadow-lg`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white font-semibold">{farm.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg.badge}`}>
                      {cfg.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {farm.region}
                    </span>
                    <span>{farm.area_hectares} {t.hectares}</span>
                    <span>{farm.crop_type}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className="text-gray-500">{(i + 1) * 8} {t.km}</span>
                    <span className="text-gray-600">·</span>
                    <span className={farm.priority === 'critical' ? 'text-red-400' : farm.priority === 'warning' ? 'text-amber-400' : 'text-emerald-400'}>
                      {farm.priority === 'critical' ? '2 ' + t.open_tickets : farm.priority === 'warning' ? '1 ' + t.open_ticket : '0 ' + t.open_tickets}
                    </span>
                  </div>
                </div>
                <Navigation className="w-4 h-4 text-gray-500 flex-shrink-0 mt-1" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
