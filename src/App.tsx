import React from 'react';
import { AuraPulseProvider, useAuraPulse } from './context/AuraPulseContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { PatientsScreen } from './components/screens/PatientsScreen';
import { AppointmentsScreen } from './components/screens/AppointmentsScreen';
import { TreatmentsScreen } from './components/screens/TreatmentsScreen';
import { InventoryScreen } from './components/screens/InventoryScreen';
import { OverviewScreen } from './components/screens/OverviewScreen';
import { InvoicingScreen } from './components/screens/InvoicingScreen';
import { ReportsScreen } from './components/screens/ReportsScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';

import { PatientDossierDrawer } from './components/PatientDossierDrawer';
import { ProcedureDrawer } from './components/ProcedureDrawer';
import { StockAdjustmentDrawer } from './components/StockAdjustmentDrawer';
import { NewPatientModal } from './components/modals/NewPatientModal';
import { NewBookingModal } from './components/modals/NewBookingModal';
import { NewTreatmentModal } from './components/modals/NewTreatmentModal';
import { GlobalCommandPalette } from './components/GlobalCommandPalette';
import { ToastContainer } from './components/ToastContainer';

const MainAppLayout: React.FC = () => {
  const { currentTab } = useAuraPulse();

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] flex font-body-md selection:bg-[#ffdea8] selection:text-[#271900]">
      {/* Fixed Luxury Clinical Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col pl-72 min-w-0">
        {/* Fixed Header Bar */}
        <Header />

        {/* Dynamic Screen View Content */}
        <main
          id="mainContentArea"
          className="flex-1 pt-24 px-6 md:px-8 pb-16 max-w-full overflow-x-hidden"
        >
          {currentTab === 'patients' && <PatientsScreen />}
          {currentTab === 'appointments' && <AppointmentsScreen />}
          {currentTab === 'treatments' && <TreatmentsScreen />}
          {currentTab === 'inventory' && <InventoryScreen />}
          {currentTab === 'overview' && <OverviewScreen />}
          {currentTab === 'invoicing' && <InvoicingScreen />}
          {currentTab === 'reports' && <ReportsScreen />}
          {currentTab === 'settings' && <SettingsScreen />}
        </main>
      </div>

      {/* Interactive Slide-over Drawers */}
      <PatientDossierDrawer />
      <ProcedureDrawer />
      <StockAdjustmentDrawer />

      {/* Modals & Command Palette */}
      <NewPatientModal />
      <NewBookingModal />
      <NewTreatmentModal />
      <GlobalCommandPalette />

      {/* Global Clinical Feedback Toasts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AuraPulseProvider>
      <MainAppLayout />
    </AuraPulseProvider>
  );
}
