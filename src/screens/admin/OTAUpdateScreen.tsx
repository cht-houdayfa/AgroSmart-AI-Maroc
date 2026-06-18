import React, { useState, useEffect } from 'react';
import { Upload, Cpu, Wifi, CheckCircle, RefreshCw, AlertTriangle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { FirmwareVersion } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

const DEMO_FIRMWARE: FirmwareVersion[] = [
  { id: '1', version: '2.4.1', device_type: 'esp32', release_notes: 'تحسين خوارزمية قياس الرطوبة وتوفير طاقة 15%', file_url: null, is_latest: true, deployed_count: 234, created_at: '2026-05-10' },
  { id: '2', version: '2.3.8', device_type: 'esp32', release_notes: 'إصلاح مشكلة انقطاع الاتصال بعد 24 ساعة', file_url: null, is_latest: false, deployed_count: 89, created_at: '2026-03-22' },
  { id: '3', version: '1.8.2', device_type: 'gateway', release_notes: 'دعم بروتوكول LoRa الجديد وتحسين التشفير', file_url: null, is_latest: true, deployed_count: 47, created_at: '2026-04-15' },
  { id: '4', version: '1.7.5', device_type: 'gateway', release_notes: 'تحسين الاتصال بالخادم السحابي', file_url: null, is_latest: false, deployed_count: 12, created_at: '2026-02-08' },
];

type OtaState = 'idle' | 'sending' | 'done';

export default function OTAUpdateScreen() {
  const { language, t: globalT } = useLanguage();
  const [firmware, setFirmware] = useState<FirmwareVersion[]>(DEMO_FIRMWARE);
  const [otaState, setOtaState] = useState<Record<string, OtaState>>({});
  const [progress, setProgress] = useState<Record<string, number>>({});

  const t = language === 'darija' ? {
    title: 'تحديثات OTA البرمجية',
    subtitle: 'تحديث الأجهزة عن بُعد',
    latest: 'آخر إصدار',
    esp32: 'ESP32',
    gateway: 'Gateway',
    nodes: 'جهاز محدّث',
    send_ota: 'إرسال تحديث OTA',
    sending: 'جاري الإرسال...',
    done: 'تم الإرسال!',
    notes: 'ملاحظات الإصدار',
    total_esp: 'إجمالي ESP32',
    total_gw: 'إجمالي Gateways',
    up_to_date: 'محدّثة',
    outdated: 'قديمة',
    new_version: 'نسخة جديدة متاحة',
    deployed: 'مُنشر على',
    devices: 'جهاز',
    uploaded: 'رُفع في',
  } : {
    title: 'Mises à jour OTA',
    subtitle: 'Mise à jour des appareils à distance',
    latest: 'Dernière version',
    esp32: 'ESP32',
    gateway: 'Gateway',
    nodes: 'appareils mis à jour',
    send_ota: 'Envoyer mise à jour OTA',
    sending: 'Envoi en cours...',
    done: 'Envoyé!',
    notes: 'Notes de version',
    total_esp: 'Total ESP32',
    total_gw: 'Total Gateways',
    up_to_date: 'à jour',
    outdated: 'obsolètes',
    new_version: 'Nouvelle version disponible',
    deployed: 'Déployé sur',
    devices: 'appareils',
    uploaded: 'Publié le',
  };

  function sendOTA(id: string, total: number) {
    setOtaState(prev => ({ ...prev, [id]: 'sending' }));
    setProgress(prev => ({ ...prev, [id]: 0 }));

    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setOtaState(prev => ({ ...prev, [id]: 'done' }));
      }
      setProgress(prev => ({ ...prev, [id]: Math.min(Math.floor(p), 100) }));
    }, 300);
  }

  const esp32Firmware = firmware.filter(f => f.device_type === 'esp32');
  const gatewayFirmware = firmware.filter(f => f.device_type === 'gateway');

  function FirmwareCard({ f }: { f: FirmwareVersion }) {
    const state = otaState[f.id] || 'idle';
    const prog = progress[f.id] || 0;
    const typeLabel = f.device_type === 'esp32' ? t.esp32 : t.gateway;
    const typeColor = f.device_type === 'esp32' ? 'text-violet-400' : 'text-cyan-400';
    const typeBg = f.device_type === 'esp32' ? 'bg-violet-900/30' : 'bg-cyan-900/30';

    return (
      <div className={`bg-[#0e1c10] rounded-3xl p-4 border shadow-xl transition-all ${
        f.is_latest ? 'border-emerald-700/40' : 'border-green-900/20'
      }`}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${typeBg}`}>
              <Cpu className={`w-4 h-4 ${typeColor}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-white font-bold">v{f.version}</p>
                {f.is_latest && (
                  <span className="text-xs bg-emerald-800/50 text-emerald-300 px-2 py-0.5 rounded-full">{t.latest}</span>
                )}
              </div>
              <p className={`text-xs ${typeColor}`}>{typeLabel}</p>
            </div>
          </div>
          <div className="text-right text-xs text-gray-500">
            <p>{t.deployed} {f.deployed_count} {t.devices}</p>
          </div>
        </div>

        <p className="text-gray-400 text-xs leading-relaxed mb-3 bg-black/20 rounded-xl p-2">
          {f.release_notes}
        </p>

        {state === 'idle' && (
          <button
            onClick={() => sendOTA(f.id, f.deployed_count)}
            className={`w-full ${f.is_latest ? 'bg-emerald-700 hover:bg-emerald-600' : 'bg-gray-700 hover:bg-gray-600'} text-white font-semibold py-3 rounded-2xl text-sm transition-all active:scale-95 flex items-center justify-center gap-2`}
          >
            <Upload className="w-4 h-4" />
            {t.send_ota}
          </button>
        )}

        {state === 'sending' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
                <span className="text-blue-300 text-sm">{t.sending}</span>
              </div>
              <span className="text-white font-bold text-sm">{prog}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-300"
                style={{ width: `${prog}%` }}
              />
            </div>
          </div>
        )}

        {state === 'done' && (
          <div className="flex items-center gap-2 bg-emerald-950/40 rounded-xl p-3">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 text-sm font-semibold">{t.done}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1309] text-white pb-24">
      <div className="bg-gradient-to-r from-violet-950 to-indigo-950 px-5 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-white">{t.title}</h1>
        <p className="text-violet-300/70 text-xs mt-1">{t.subtitle}</p>

        <div className="flex gap-3 mt-4">
          <div className="flex-1 bg-black/20 rounded-2xl p-3 text-center">
            <p className="text-violet-300 font-bold text-xl">323</p>
            <p className="text-gray-400 text-xs">ESP32 {t.up_to_date}</p>
          </div>
          <div className="flex-1 bg-black/20 rounded-2xl p-3 text-center">
            <p className="text-amber-400 font-bold text-xl">61</p>
            <p className="text-gray-400 text-xs">ESP32 {t.outdated}</p>
          </div>
          <div className="flex-1 bg-black/20 rounded-2xl p-3 text-center">
            <p className="text-cyan-400 font-bold text-xl">47</p>
            <p className="text-gray-400 text-xs">Gateway {t.up_to_date}</p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-5">
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">ESP32</p>
        <div className="space-y-3 mb-5">
          {esp32Firmware.map(f => <FirmwareCard key={f.id} f={f} />)}
        </div>

        <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">Gateway / LoRa</p>
        <div className="space-y-3">
          {gatewayFirmware.map(f => <FirmwareCard key={f.id} f={f} />)}
        </div>
      </div>
    </div>
  );
}
