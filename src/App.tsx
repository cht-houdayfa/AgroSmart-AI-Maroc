import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import type { UserRole } from './types';

// Farmer screens
import WelcomeScreen from './screens/farmer/WelcomeScreen';
import FarmerDashboard from './screens/farmer/FarmerDashboard';
import IrrigationScreen from './screens/farmer/IrrigationScreen';
import ManualControlScreen from './screens/farmer/ManualControlScreen';
import SupportScreen from './screens/farmer/SupportScreen';
import NotificationsScreen from './screens/farmer/NotificationsScreen';
import CropCalendarScreen from './screens/farmer/CropCalendarScreen';

// Technician screens
import TechMapDashboard from './screens/technician/TechMapDashboard';
import HardwareDiagnostic from './screens/technician/HardwareDiagnostic';
import QRSetupScreen from './screens/technician/QRSetupScreen';
import FieldNotesScreen from './screens/technician/FieldNotesScreen';

// Admin screens
import AdminAnalytics from './screens/admin/AdminAnalytics';
import PredictiveQAScreen from './screens/admin/PredictiveQAScreen';
import BillingCRMScreen from './screens/admin/BillingCRMScreen';
import OTAUpdateScreen from './screens/admin/OTAUpdateScreen';
import NetworkMapScreen from './screens/admin/NetworkMapScreen';

// Nav components
import FarmerNavBar from './components/FarmerNavBar';
import TechNavBar from './components/TechNavBar';
import AdminNavBar from './components/AdminNavBar';
import RoleBadge from './components/RoleBadge';

type FarmerTab = 'dashboard' | 'irrigation' | 'control' | 'support' | 'notifications' | 'calendar';
type TechTab = 'map' | 'diagnostic' | 'qrsetup' | 'fieldnotes';
type AdminTab = 'analytics' | 'qa' | 'billing' | 'ota' | 'network';

const DEMO_USERS = {
  farmer: { id: 'demo-farmer', name: 'المختار بن علي', role: 'farmer' as UserRole, phone: '0661234567', region: 'سوس ماسة' },
  technician: { id: 'demo-tech', name: 'يوسف البلهوري', role: 'technician' as UserRole, phone: '0662345678', region: 'سوس ماسة' },
  admin: { id: 'demo-admin', name: 'مسؤول النظام', role: 'admin' as UserRole, phone: '0663456789', region: 'الرباط' },
};

function AppContent() {
  const { user, setUser } = useApp();
  const [farmerTab, setFarmerTab] = useState<FarmerTab>('dashboard');
  const [techTab, setTechTab] = useState<TechTab>('map');
  const [adminTab, setAdminTab] = useState<AdminTab>('analytics');
  const [selectedFarmId, setSelectedFarmId] = useState<string | null>(null);

  // Simulated unread counts
  const notifCount = 3;
  const openTickets = 2;

  function handleLogin(role: 'farmer' | 'technician' | 'admin') {
    setUser(DEMO_USERS[role]);
  }

  function handleLogout() {
    setUser(null);
    setFarmerTab('dashboard');
    setTechTab('map');
    setAdminTab('analytics');
    setSelectedFarmId(null);
  }

  function handleSelectFarm(farmId: string) {
    setSelectedFarmId(farmId);
    setTechTab('diagnostic');
  }

  if (!user) {
    return <WelcomeScreen onLogin={handleLogin} />;
  }

  return (
    <div className="relative">
      <RoleBadge onLogout={handleLogout} />

      {/* Farmer Interface */}
      {user.role === 'farmer' && (
        <>
          {farmerTab === 'dashboard' && <FarmerDashboard />}
          {farmerTab === 'irrigation' && <IrrigationScreen />}
          {farmerTab === 'calendar' && <CropCalendarScreen />}
          {farmerTab === 'control' && <ManualControlScreen />}
          {farmerTab === 'notifications' && <NotificationsScreen />}
          {farmerTab === 'support' && <SupportScreen />}
          <FarmerNavBar
            active={farmerTab}
            onChange={setFarmerTab}
            notifCount={notifCount}
          />
        </>
      )}

      {/* Technician Interface */}
      {user.role === 'technician' && (
        <>
          {techTab === 'map' && <TechMapDashboard onSelectFarm={handleSelectFarm} />}
          {techTab === 'diagnostic' && (
            <HardwareDiagnostic
              farmId={selectedFarmId || ''}
              onBack={() => setTechTab('map')}
            />
          )}
          {techTab === 'qrsetup' && <QRSetupScreen />}
          {techTab === 'fieldnotes' && <FieldNotesScreen />}
          <TechNavBar
            active={techTab}
            onChange={setTechTab}
            openTickets={openTickets}
          />
        </>
      )}

      {/* Admin Interface */}
      {user.role === 'admin' && (
        <>
          {adminTab === 'analytics' && <AdminAnalytics />}
          {adminTab === 'network' && <NetworkMapScreen />}
          {adminTab === 'qa' && <PredictiveQAScreen />}
          {adminTab === 'billing' && <BillingCRMScreen />}
          {adminTab === 'ota' && <OTAUpdateScreen />}
          <AdminNavBar active={adminTab} onChange={setAdminTab} />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AppProvider>
  );
}
