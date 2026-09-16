import React from 'react';
import { useAuraPulse } from '../context/AuraPulseContext';
import { NavigationTab } from '../types';

export const Sidebar: React.FC = () => {
  const {
    currentTab,
    setCurrentTab,
    isSidebarCollapsed,
    toggleSidebar,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
  } = useAuraPulse();

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

  const handleNavClick = (id: NavigationTab) => {
    setCurrentTab(id);
    if (isMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar (Desktop / Tablet / Mobile) */}
      <aside
        id="mainSidebar"
        aria-label="Clinical Core Navigation"
        className={`fixed left-0 top-0 h-full bg-[#f5f3f0] z-50 md:z-40 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-[#d2c5b2]/30 select-none transition-all duration-300 ease-in-out ${
          // Mobile state: slide in/out
          isMobileSidebarOpen
            ? 'translate-x-0 w-72'
            : '-translate-x-full md:translate-x-0'
        } ${
          // Desktop & Tablet width based on collapse state
          isSidebarCollapsed ? 'md:w-20' : 'md:w-72'
        }`}
      >
        <div className="flex flex-col min-w-0">
          {/* Brand / Logo Header */}
          <div
            className={`h-20 flex items-center bg-[#f5f3f0] border-b border-[#d2c5b2]/20 transition-all ${
              isSidebarCollapsed ? 'px-3 justify-center' : 'px-5 justify-between'
            }`}
          >
            <div
              className={`flex items-center gap-2.5 min-w-0 ${
                isSidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <img
                alt="AuraPulse luxury aesthetics clinic logo"
                className="h-8 w-8 object-contain shrink-0"
                src="https://lh3.googleusercontent.com/aida/AEtjO1VFpYWKazj_Z20lnB9QkZhQzMpjHSm68rKsaTfAfxfVvYkc6v7z0Ka4k32_nm-4N9farpu6oPwq20m40RsoCt3TRL6fgPq_vd1HczKGkMhgkbbFT70fCx111-Id_E9Vyhmt_ddJP4o5PyqA-kamQd5kIFEeuil_OPbA81qFmCPYotmV75-l-8LMDb2tO_Ufxii6yIeF99R-4ZNx59s6K6vmuKBDsyXdGG9owicV8NV2b6C-myAEKJEwMec"
              />
              {!isSidebarCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-md text-2xl text-[#7b5808] tracking-wide leading-none truncate">
                    AuraPulse
                  </span>
                  <span className="font-label-sm text-[10px] text-[#625d5b] uppercase tracking-widest mt-1 truncate">
                    Aesthetic OS
                  </span>
                </div>
              )}
            </div>

            {/* Collapse/Expand Toggle button (or Close on Mobile) */}
            <div className="flex items-center">
              {/* Mobile Close Button */}
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="md:hidden p-1.5 rounded-lg text-[#625d5b] hover:text-[#1b1c1a] hover:bg-[#efeeeb]"
                title="Close Navigation"
                aria-label="Close Navigation"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>

              {/* Desktop/Tablet Collapse Button (shown when expanded) */}
              {!isSidebarCollapsed && (
                <button
                  onClick={toggleSidebar}
                  className="hidden md:flex p-1.5 rounded-lg text-[#625d5b] hover:text-[#1b1c1a] hover:bg-[#eae8e5] transition-colors"
                  title="Collapse sidebar"
                  aria-label="Collapse sidebar"
                >
                  <span className="material-symbols-outlined text-lg">menu_open</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Expand Button when collapsed on desktop/tablet */}
          {isSidebarCollapsed && (
            <div className="hidden md:flex justify-center pt-2.5 pb-1">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-xl text-[#625d5b] hover:text-[#7b5808] hover:bg-[#eae8e5] transition-colors"
                title="Expand sidebar"
                aria-label="Expand sidebar"
              >
                <span className="material-symbols-outlined text-xl">chevron_right</span>
              </button>
            </div>
          )}

          {/* Section Header */}
          <div
            className={`pt-4 pb-2 transition-all ${
              isSidebarCollapsed ? 'px-2 text-center' : 'px-6'
            }`}
          >
            {isSidebarCollapsed ? (
              <div className="w-6 h-0.5 bg-[#d2c5b2]/40 mx-auto rounded-full" />
            ) : (
              <span className="font-label-sm text-[11px] text-[#625d5b] uppercase tracking-widest font-bold truncate block">
                Clinical Core
              </span>
            )}
          </div>

          {/* Navigation List */}
          <nav
            className={`flex flex-col gap-1.5 transition-all ${
              isSidebarCollapsed ? 'px-2 items-center' : 'px-3'
            }`}
            aria-label="Core modules"
          >
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  title={isSidebarCollapsed ? item.label : undefined}
                  className={`flex items-center rounded-xl transition-all text-left group relative ${
                    isSidebarCollapsed
                      ? 'w-12 h-11 justify-center p-0'
                      : 'w-full justify-between px-3.5 py-2.5 min-w-0'
                  } ${
                    isActive
                      ? 'bg-[#b88e3e] text-white shadow-xs font-medium'
                      : 'text-[#4e4538] hover:bg-[#efeeeb] hover:text-[#1b1c1a]'
                  }`}
                >
                  <div className={`flex items-center gap-3 min-w-0 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                    <span
                      className={`material-symbols-outlined text-[21px] shrink-0 ${
                        isActive ? 'text-white' : 'text-[#625d5b] group-hover:text-[#1b1c1a]'
                      }`}
                    >
                      {item.icon}
                    </span>
                    {!isSidebarCollapsed && (
                      <span className="font-label-lg text-[13px] font-semibold tracking-wide truncate">
                        {item.label}
                      </span>
                    )}
                  </div>
                  {!isSidebarCollapsed && isActive && (
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse shrink-0 ml-2" />
                  )}

                  {/* Tooltip on hover when collapsed */}
                  {isSidebarCollapsed && (
                    <span className="hidden group-hover:md:block absolute left-full ml-3 px-2.5 py-1 bg-[#1b1c1a] text-white text-xs font-medium rounded-md shadow-lg whitespace-nowrap z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer / Clinic Settings & Encryption status */}
        <div
          className={`bg-[#f5f3f0] flex flex-col gap-2 border-t border-[#d2c5b2]/30 transition-all ${
            isSidebarCollapsed ? 'p-2 items-center' : 'p-4'
          }`}
        >
          <button
            id="nav-settings"
            onClick={() => handleNavClick('settings')}
            title={isSidebarCollapsed ? 'Clinic Settings' : undefined}
            className={`flex items-center rounded-xl transition-colors text-left group relative ${
              isSidebarCollapsed
                ? 'w-12 h-11 justify-center p-0'
                : 'w-full gap-3 px-3.5 py-2.5 min-w-0'
            } ${
              currentTab === 'settings'
                ? 'bg-[#b88e3e] text-white shadow-xs font-semibold'
                : 'text-[#4e4538] hover:bg-[#efeeeb] hover:text-[#1b1c1a]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[21px] shrink-0 ${
                currentTab === 'settings' ? 'text-white' : 'text-[#625d5b] group-hover:text-[#1b1c1a]'
              }`}
            >
              tune
            </span>
            {!isSidebarCollapsed && (
              <span className="font-label-lg text-[13px] truncate">Clinic Settings</span>
            )}

            {/* Tooltip on hover when collapsed */}
            {isSidebarCollapsed && (
              <span className="hidden group-hover:md:block absolute left-full ml-3 px-2.5 py-1 bg-[#1b1c1a] text-white text-xs font-medium rounded-md shadow-lg whitespace-nowrap z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                Clinic Settings
              </span>
            )}
          </button>

          {/* System status */}
          {isSidebarCollapsed ? (
            <div
              className="w-10 h-10 rounded-xl bg-[#efeeeb] border border-[#d2c5b2]/30 flex items-center justify-center relative group cursor-pointer"
              title="System Operational · HIPAA Verified Encrypted"
            >
              <span className="material-symbols-outlined text-[#7b5808] text-base">
                check_circle
              </span>
              <span className="hidden group-hover:md:block absolute left-full ml-3 px-2.5 py-1 bg-[#1b1c1a] text-white text-xs font-medium rounded-md shadow-lg whitespace-nowrap z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                System Operational (HIPAA Verified)
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#efeeeb] border border-[#d2c5b2]/30 min-w-0">
              <span className="material-symbols-outlined text-[#7b5808] text-base shrink-0">
                check_circle
              </span>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-[11px] text-[#1b1c1a] font-semibold leading-tight truncate">
                  System Operational
                </span>
                <span className="font-label-sm text-[10px] text-[#625d5b] truncate">
                  HIPAA Verified Encrypted
                </span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
