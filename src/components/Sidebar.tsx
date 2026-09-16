import React from 'react';
import { useAuraPulse } from '../context/AuraPulseContext';
import { NavigationTab } from '../types';

export const Sidebar: React.FC = () => {
  const { currentTab, setCurrentTab } = useAuraPulse();

  const navItems: Array<{
    id: NavigationTab;
    label: string;
    icon: string;
  }> = [
    { id: 'overview', label: 'Overview', icon: 'dashboard' },
    { id: 'appointments', label: 'Appointments', icon: 'calendar_month' },
    { id: 'patients', label: 'Patients', icon: 'group' },
    { id: 'treatments', label: 'Treatments', icon: 'medical_services' },
    { id: 'inventory', label: 'Inventory Management', icon: 'inventory_2' },
    { id: 'invoicing', label: 'Invoicing & Billing', icon: 'payments' },
    { id: 'reports', label: 'Reports', icon: 'analytics' },
  ];

  return (
    <aside
      id="mainSidebar"
      aria-label="Clinical Core Navigation"
      className="fixed left-0 top-0 h-full w-72 bg-[#f5f3f0] z-40 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-[#d2c5b2]/30 select-none"
    >
      <div className="flex flex-col">
        {/* Brand / Logo Header */}
        <div className="h-20 px-6 flex items-center gap-2.5 bg-[#f5f3f0] border-b border-[#d2c5b2]/20">
          <img
            alt="AuraPulse luxury aesthetics clinic logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1VFpYWKazj_Z20lnB9QkZhQzMpjHSm68rKsaTfAfxfVvYkc6v7z0Ka4k32_nm-4N9farpu6oPwq20m40RsoCt3TRL6fgPq_vd1HczKGkMhgkbbFT70fCx111-Id_E9Vyhmt_ddJP4o5PyqA-kamQd5kIFEeuil_OPbA81qFmCPYotmV75-l-8LMDb2tO_Ufxii6yIeF99R-4ZNx59s6K6vmuKBDsyXdGG9owicV8NV2b6C-myAEKJEwMec"
          />
          <div className="flex flex-col">
            <span className="font-headline-md text-2xl text-[#7b5808] tracking-wide leading-none">
              AuraPulse
            </span>
            <span className="font-label-sm text-[10px] text-[#625d5b] uppercase tracking-widest mt-1">
              Aesthetic OS
            </span>
          </div>
        </div>

        {/* Section Header */}
        <div className="px-6 pt-6 pb-2">
          <span className="font-label-sm text-[11px] text-[#625d5b] uppercase tracking-widest font-bold">
            Clinical Core
          </span>
        </div>

        {/* Navigation List */}
        <nav className="flex flex-col px-3 gap-1" aria-label="Core modules">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all text-left ${
                  isActive
                    ? 'bg-[#b88e3e] text-white shadow-xs font-medium'
                    : 'text-[#4e4538] hover:bg-[#efeeeb] hover:text-[#1b1c1a]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isActive ? 'text-white' : 'text-[#625d5b]'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-label-lg text-[13px] font-semibold tracking-wide">
                    {item.label}
                  </span>
                </div>
                {isActive && (
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Clinic Settings & Encryption status */}
      <div className="p-4 bg-[#f5f3f0] flex flex-col gap-2 border-t border-[#d2c5b2]/30">
        <button
          id="nav-settings"
          onClick={() => setCurrentTab('settings')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors text-left ${
            currentTab === 'settings'
              ? 'bg-[#b88e3e] text-white shadow-xs font-semibold'
              : 'text-[#4e4538] hover:bg-[#efeeeb] hover:text-[#1b1c1a]'
          }`}
        >
          <span className="material-symbols-outlined text-[#625d5b] text-[20px]">
            tune
          </span>
          <span className="font-label-lg text-[13px]">Clinic Settings</span>
        </button>

        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#efeeeb] border border-[#d2c5b2]/30">
          <span className="material-symbols-outlined text-[#7b5808] text-base">
            check_circle
          </span>
          <div className="flex flex-col">
            <span className="font-label-md text-[11px] text-[#1b1c1a] font-semibold leading-tight">
              System Operational
            </span>
            <span className="font-label-sm text-[10px] text-[#625d5b]">
              HIPAA Verified Encrypted
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
