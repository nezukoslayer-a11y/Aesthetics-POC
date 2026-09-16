import React, { useState } from 'react';
import { useAuraPulse } from '../context/AuraPulseContext';

export const ProcedureDrawer: React.FC = () => {
  const {
    activeProcedureDrawerId,
    closeProcedureDrawer,
    procedures,
    updateProcedure,
    showToast,
  } = useAuraPulse();

  if (!activeProcedureDrawerId) return null;

  const data = procedures[activeProcedureDrawerId] || procedures['LSR-350'];
  if (!data) return null;

  const [branches, setBranches] = useState(data.branches);
  const [baseFee, setBaseFee] = useState(data.fee);

  const monogram = data.title
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  const handleSave = () => {
    updateProcedure(data.id, {
      fee: baseFee,
      branches: branches,
    });
    closeProcedureDrawer();
  };

  const handleBranchFeeChange = (index: number, newFee: string) => {
    setBranches((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], fee: newFee };
      return next;
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        id="procedureBackdrop"
        onClick={closeProcedureDrawer}
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-[2px] z-50 transition-opacity duration-300"
      />

      {/* Slide-over Procedure Side Sheet */}
      <aside
        id="procedureDrawer"
        aria-label="Procedure Protocol Drawer"
        className="fixed top-0 right-0 bottom-0 h-full w-[480px] max-w-full bg-[#fbf9f6] shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out border-l border-[#d2c5b2]/40"
      >
        {/* Top Header Bar */}
        <div className="p-4 border-b border-[#eae8e5] bg-[#f5f3f0]/95 backdrop-blur-sm flex flex-col gap-3 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                id="drawerBadge"
                className="px-2.5 py-0.5 rounded bg-[#ffdea8] text-[#271900] font-label-sm text-[11px] font-bold tracking-wider uppercase"
              >
                PROTOCOL #{data.id}
              </span>
              <a
                href="#spec"
                onClick={(e) => {
                  e.preventDefault();
                  showToast(`Opening EHR Clinical Specification for ${data.id}...`, 'info');
                }}
                className="inline-flex items-center gap-1 text-[#7b5808] hover:text-[#5e4200] text-xs font-semibold cursor-pointer transition-colors"
              >
                <span>EHR Spec</span>
                <span className="material-symbols-outlined text-xs">north_east</span>
              </a>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#b88e3e]/20 text-[#3e2a00] font-label-sm text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7b5808] animate-pulse" />
                {data.status.toUpperCase()}
              </span>
              <button
                id="closeProcedureDrawerBtn"
                onClick={closeProcedureDrawer}
                title="Close Drawer (Esc)"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#625d5b] hover:text-[#1b1c1a] hover:bg-[#efeeeb] transition-colors"
              >
                <span className="material-symbols-outlined text-lg leading-none">close</span>
              </button>
            </div>
          </div>

          {/* Primary Procedure Profile Card */}
          <div className="flex items-start gap-3.5 pt-1">
            <div className="w-14 h-14 rounded-xl bg-[#ffdea8]/60 border border-[#b88e3e]/40 text-[#271900] flex items-center justify-center font-headline-sm font-bold text-[#7b5808] shrink-0 shadow-sm">
              <span className="font-headline-sm text-lg" id="drawerMonogram">
                {monogram}
              </span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <h2
                id="drawerTitle"
                className="font-headline-sm text-base font-bold text-[#1b1c1a] leading-snug truncate"
              >
                {data.title}
              </h2>
              <p className="font-body-sm text-xs text-[#625d5b] mt-0.5">
                <span className="font-semibold text-[#7b5808]" id="drawerCpt">
                  {data.cpt}
                </span>{' '}
                · <span id="drawerModality">{data.modality}</span>
              </p>
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className="px-2 py-0.5 rounded bg-[#efeeeb] font-label-sm text-[10px] text-[#4e4538] font-medium">
                  {data.consumablesCount} SKUs Linked
                </span>
                <span className="px-2 py-0.5 rounded bg-[#efeeeb] font-label-sm text-[10px] text-[#4e4538] font-medium">
                  Class 4 Laser
                </span>
                <span className="px-2 py-0.5 rounded bg-[#efeeeb] font-label-sm text-[10px] text-[#4e4538] font-medium">
                  HQ &amp; Satellites
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-4">
          {/* 2x2 Grid of Key Parameters */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-[#f5f3f0] border border-[#efeeeb] flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#625d5b] mb-1">
                <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold">
                  Duration &amp; Prep
                </span>
                <span className="material-symbols-outlined text-sm text-[#7b5808]">schedule</span>
              </div>
              <span className="font-title-md text-sm font-bold text-[#1b1c1a]">
                {data.duration}
              </span>
              <span className="text-[11px] text-[#625d5b] mt-0.5">{data.prepTime}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#f5f3f0] border border-[#efeeeb] flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#625d5b] mb-1">
                <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold">
                  Base Fee Schedule
                </span>
                <span className="material-symbols-outlined text-sm text-[#7b5808]">
                  attach_money
                </span>
              </div>
              <span className="font-headline-sm text-base font-bold text-[#7b5808]">
                {data.fee}
              </span>
              <span className="text-[11px] text-[#625d5b] mt-0.5">Automated EHR Billing</span>
            </div>

            <div className="p-3 rounded-xl bg-[#f5f3f0] border border-[#efeeeb] flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#625d5b] mb-1">
                <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold">
                  Recovery &amp; Downtime
                </span>
                <span className="material-symbols-outlined text-sm text-[#625d5b]">healing</span>
              </div>
              <span className="font-title-md text-xs font-semibold text-[#1b1c1a]">
                {data.downtime}
              </span>
              <span className="text-[11px] text-[#625d5b] mt-0.5">Strict post-care protocol</span>
            </div>

            <div className="p-3 rounded-xl bg-[#f5f3f0] border border-[#efeeeb] flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#625d5b] mb-1">
                <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold">
                  Authorized Providers
                </span>
                <span className="material-symbols-outlined text-sm text-[#625d5b]">
                  verified_user
                </span>
              </div>
              <span className="font-title-md text-xs font-semibold text-[#7b5808]">
                {data.eligibility}
              </span>
              <span className="text-[11px] text-[#625d5b] mt-0.5">Class certification req.</span>
            </div>
          </div>

          {/* EHR Validated Banner */}
          <div className="p-3.5 rounded-xl bg-[#b88e3e]/10 border border-[#b88e3e]/30 flex items-start gap-2.5 shadow-xs">
            <span className="material-symbols-outlined text-[#7b5808] text-xl mt-0.5">
              check_circle
            </span>
            <div className="flex flex-col text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-label-md text-xs font-bold text-[#1b1c1a]">
                  EHR Protocol Validated &amp; Active
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[#e4e2df] text-[10px] text-[#625d5b] font-medium">
                  Sync ID #9942
                </span>
              </div>
              <p className="text-[11px] text-[#625d5b] mt-0.5 leading-relaxed">
                {data.credentialNote}
              </p>
            </div>
          </div>

          {/* Multi-Branch Fee Overrides */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-[11px] text-[#625d5b] uppercase tracking-wider font-semibold">
                Multi-Branch Fee Overrides
              </span>
              <span className="font-label-sm text-[11px] text-[#7b5808] font-semibold">
                3 Active Locations
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              {branches.map((b, idx) => (
                <div
                  key={b.name}
                  className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#efeeeb] flex flex-col items-center"
                >
                  <span className="block text-[#625d5b] font-medium text-[11px] mb-0.5">
                    {b.name}
                  </span>
                  <input
                    type="text"
                    value={b.fee}
                    onChange={(e) => handleBranchFeeChange(idx, e.target.value)}
                    className="w-16 text-center font-bold text-sm text-[#1b1c1a] bg-white border border-[#d2c5b2]/40 rounded py-0.5 focus:border-[#7b5808] outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Safeguards */}
          <div className="p-3.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/30 flex flex-col gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-[#7b5808]">
                assignment_turned_in
              </span>
              <span className="font-label-sm text-[11px] text-[#1b1c1a] uppercase tracking-wider font-bold">
                Clinical Safeguards &amp; Compliance
              </span>
            </div>
            <p className="text-[11px] text-[#625d5b] leading-relaxed">
              Mandatory pre-treatment clearance protocol. Non-compliance blocks operator scheduling
              in EHR console.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {data.safeguards.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#d2c5b2]/30 font-label-sm text-[11px] text-[#4e4538] flex items-center gap-1 shadow-xs"
                >
                  <span className="material-symbols-outlined text-xs text-[#7b5808]">check</span>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Depleted Consumables & COGS */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-[11px] text-[#625d5b] uppercase tracking-wider font-semibold">
                Depleted Consumables &amp; COGS
              </span>
              <span className="font-label-sm text-[11px] font-bold text-[#7b5808] px-2 py-0.5 rounded bg-[#b88e3e]/20">
                Total: {data.consumablesCogs}
              </span>
            </div>
            <div className="divide-y divide-[#eae8e5] rounded-xl border border-[#efeeeb] overflow-hidden bg-white shadow-xs">
              {data.consumables.map((c) => (
                <div key={c.name} className="flex items-center justify-between p-2.5 text-xs">
                  <span className="text-[#1b1c1a] font-medium">{c.name}</span>
                  <span className="font-semibold text-[#1b1c1a]">{c.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pinned Action Footer */}
        <div className="border-t border-[#d2c5b2]/40 bg-white/95 backdrop-blur-sm px-6 py-4 flex items-center justify-between gap-3 shrink-0 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
          <button
            id="archiveDrawerBtn"
            onClick={() => {
              showToast(`Protocol ${data.id} marked inactive/archived`, 'warning');
              closeProcedureDrawer();
            }}
            className="text-xs text-[#ba1a1a] hover:text-red-700 font-label-md font-semibold transition-colors px-1 py-1.5"
          >
            Cancel / Archive
          </button>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                showToast(`Syncing protocol schedule across booking calendars...`, 'info');
                closeProcedureDrawer();
              }}
              className="px-4 py-2 rounded-xl bg-[#eae8e5] hover:bg-[#e4e2df] text-[#1b1c1a] font-label-md text-xs font-semibold transition-colors"
            >
              Reschedule
            </button>
            <button
              id="saveDrawerBtn"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-[#b88e3e] hover:bg-[#7b5808] text-white font-label-md text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">save</span>
              <span>Save Protocol</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
