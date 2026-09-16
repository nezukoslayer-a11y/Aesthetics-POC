import React, { useState } from 'react';
import { useAuraPulse } from '../context/AuraPulseContext';

export const Header: React.FC = () => {
  const {
    currentBranch,
    setCurrentBranch,
    setIsCommandPaletteOpen,
    showToast,
    isSidebarCollapsed,
    toggleSidebar,
    toggleMobileSidebar,
  } = useAuraPulse();

  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const branches = [
    { name: 'Main Clinic - Branch A', label: 'Primary Facility', status: 'Optimal' },
    { name: 'Downtown - Branch B', label: 'Laser & RF Center', status: 'Connected' },
    { name: 'Westside Pavilion - Branch C', label: 'Surgical Suite', status: 'Connected' },
  ];

  return (
    <header
      id="mainHeader"
      className={`fixed top-0 right-0 h-20 bg-[#fbf9f6]/95 backdrop-blur-md z-30 px-3 sm:px-6 flex items-center justify-between border-b border-[#d2c5b2]/30 shadow-[0_1px_8px_rgba(0,0,0,0.03)] transition-all duration-300 ease-in-out left-0 ${
        isSidebarCollapsed ? 'md:left-20' : 'md:left-72'
      }`}
    >
      {/* Left side: Menu Toggle + Facility Selector + Search */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 mr-2 sm:mr-4">
        {/* Responsive Sidebar Toggle (Mobile Drawer toggle or Desktop Collapse toggle) */}
        <button
          id="headerSidebarToggle"
          onClick={() => {
            if (typeof window !== 'undefined' && window.innerWidth < 768) {
              toggleMobileSidebar();
            } else {
              toggleSidebar();
            }
          }}
          className="p-2 rounded-xl text-[#625d5b] hover:text-[#1b1c1a] hover:bg-[#f5f3f0] border border-[#d2c5b2]/40 transition-colors flex items-center justify-center shrink-0 cursor-pointer"
          title={isSidebarCollapsed ? 'Expand navigation menu' : 'Collapse navigation menu'}
          aria-label="Toggle navigation menu"
        >
          <span className="material-symbols-outlined text-[22px]">
            {isSidebarCollapsed ? 'menu' : 'menu_open'}
          </span>
        </button>

        {/* Branch Dropdown */}
        <div className="relative shrink-0">
          <button
            id="facilityDropdownBtn"
            onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#f5f3f0] hover:bg-[#eae8e5] text-[#1b1c1a] border border-[#d2c5b2]/40 transition-colors cursor-pointer"
            title={currentBranch}
          >
            <span className="material-symbols-outlined text-[#7b5808] text-base shrink-0">domain</span>
            <span className="font-label-md text-[11px] tracking-wider uppercase font-semibold text-[#1b1c1a] truncate max-w-[100px] sm:max-w-[160px] md:max-w-[210px]">
              {currentBranch}
            </span>
            <span className="hidden sm:inline-block font-label-sm text-[10px] px-1.5 py-0.5 rounded bg-[#e4e2df] text-[#625d5b] shrink-0">
              Facility
            </span>
            <span className="material-symbols-outlined text-[#625d5b] text-sm shrink-0">
              keyboard_arrow_down
            </span>
          </button>

          {isBranchDropdownOpen && (
            <div className="absolute left-0 mt-1.5 w-72 rounded-xl bg-white border border-[#d2c5b2]/40 shadow-xl py-1.5 z-40">
              <div className="px-3 py-1.5 border-b border-[#eee9e0] text-[10px] font-label-sm uppercase tracking-wider text-[#625d5b] font-bold">
                Select Active EHR Branch
              </div>
              {branches.map((b) => (
                <button
                  key={b.name}
                  onClick={() => {
                    setCurrentBranch(b.name);
                    setIsBranchDropdownOpen(false);
                    showToast(`Switched active branch to ${b.name}`);
                  }}
                  className={`w-full px-3 py-2 text-left hover:bg-[#f5f3f0] flex items-center justify-between transition-colors ${
                    currentBranch === b.name ? 'bg-[#fbe7c4]/30' : ''
                  }`}
                >
                  <div className="flex flex-col min-w-0 mr-2">
                    <span className="font-title-md text-xs font-semibold text-[#1b1c1a] truncate">
                      {b.name}
                    </span>
                    <span className="text-[10px] text-[#625d5b] truncate">{b.label}</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 shrink-0">
                    {b.status}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Global Search input */}
        <div
          onClick={() => setIsCommandPaletteOpen(true)}
          className="relative flex items-center cursor-pointer group min-w-0 max-w-[180px] sm:max-w-xs md:max-w-sm flex-1"
          title="Click or press ⌘K to open global search"
        >
          <span className="material-symbols-outlined absolute left-3 text-[#625d5b] text-base group-hover:text-[#7b5808] transition-colors shrink-0">
            search
          </span>
          <input
            readOnly
            className="w-full pl-8 sm:pl-9 pr-8 sm:pr-12 py-1.5 rounded-xl bg-[#f5f3f0] text-[#1b1c1a] font-body-sm text-[12px] sm:text-[13px] placeholder:text-[#625d5b] focus:outline-none group-hover:bg-white border border-[#d2c5b2]/30 group-hover:border-[#7b5808] transition-all cursor-pointer truncate"
            placeholder="Search records, charts..."
            type="text"
          />
          <kbd className="hidden sm:inline-flex absolute right-2 px-1.5 py-0.5 rounded bg-[#efeeeb] font-label-sm text-[10px] text-[#625d5b] border border-[#d2c5b2]/40 font-mono">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right side: Notifications + Clinical Director Avatar */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0 min-w-0">
        {/* Notification Bell */}
        <div className="relative">
          <button
            id="notificationsBtn"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="relative p-2 rounded-xl text-[#625d5b] hover:text-[#1b1c1a] hover:bg-[#f5f3f0] transition-colors"
            title="Notifications & Clinical Alerts"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-[#fbf9f6] animate-pulse" />
          </button>

          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-xl bg-white border border-[#d2c5b2]/40 shadow-2xl p-3 z-40 flex flex-col gap-2">
              <div className="flex items-center justify-between pb-2 border-b border-[#eee9e0]">
                <span className="font-label-md text-xs font-bold text-[#1b1c1a]">
                  Clinical Alerts (3 Unread)
                </span>
                <span
                  onClick={() => setIsNotificationOpen(false)}
                  className="text-[10px] text-[#7b5808] hover:underline cursor-pointer font-semibold"
                >
                  Mark all read
                </span>
              </div>
              <div className="flex flex-col gap-2 text-xs">
                <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-2">
                  <span className="material-symbols-outlined text-amber-700 text-sm mt-0.5 shrink-0">
                    warning
                  </span>
                  <div className="min-w-0">
                    <div className="font-bold text-amber-950 truncate">Botox 100U Low Stock</div>
                    <div className="text-[11px] text-amber-800 line-clamp-2">
                      3 vials left in Vault A. Below safety threshold (10).
                    </div>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-700 text-sm mt-0.5 shrink-0">
                    check_circle
                  </span>
                  <div className="min-w-0">
                    <div className="font-bold text-emerald-950 truncate">Vivian Chen Checked-In</div>
                    <div className="text-[11px] text-emerald-800 line-clamp-2">
                      Arrived at Suite A Lounge for DiamondGlow.
                    </div>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-2">
                  <span className="material-symbols-outlined text-rose-700 text-sm mt-0.5 shrink-0">
                    pending_actions
                  </span>
                  <div className="min-w-0">
                    <div className="font-bold text-rose-950 truncate">1 Consent Renewal Due</div>
                    <div className="text-[11px] text-rose-800 line-clamp-2">
                      Vivian Chen annual aesthetic consent renewal pending.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Doctor profile */}
        <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-[#d2c5b2]/40 min-w-0">
          <div className="flex flex-col text-right min-w-0">
            <span className="font-title-md text-[12px] sm:text-[13px] text-[#1b1c1a] font-semibold leading-tight truncate max-w-[90px] sm:max-w-[150px]">
              Dr. Claire Sterling, MD
            </span>
            <span className="hidden sm:block font-label-sm text-[10px] text-[#7b5808] font-bold uppercase tracking-widest mt-0.5 truncate">
              Medical Director
            </span>
          </div>
          <img
            alt="Dr. Claire Sterling, MD Profile"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-[#7b5808]/30 shadow-xs shrink-0"
            src="https://lh3.googleusercontent.com/aida/AEtjO1XZDHS5SKJODrrMhiemPWzhsuJ7bpgGyV1_TuMZNgBdI6Yym1y5TVVrnh9jP6rkaBF00GUlBZewsrtEdogfyzkpx7llxLUQ7Jeo9UqICfHhZa8BR8Vlz8Ck84-OCNsL41pYJQVJDW5oQFmJVPKAPwS16lMHnMviiSj8xhuBu57E3qkYc1tb_OX_XeFaXjbJdwDV9A3yt1_j58sGuavBRWamjzqlFk1n5jEY7m0bBRg2J3lpLB7KSe776Q"
          />
        </div>
      </div>
    </header>
  );
};
