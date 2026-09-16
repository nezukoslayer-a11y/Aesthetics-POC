import React, { useState } from 'react';
import { useAuraPulse } from '../../context/AuraPulseContext';

export const SettingsScreen: React.FC = () => {
  const { currentBranch, showToast } = useAuraPulse();
  const [twoWaySms, setTwoWaySms] = useState(true);
  const [coldChainAlerts, setColdChainAlerts] = useState(true);
  const [photoSync, setPhotoSync] = useState(true);

  return (
    <div className="flex flex-col w-full max-w-[1200px] mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-[#625d5b] font-label-md text-[11px] uppercase tracking-wider">
            <span>Administration</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-[#7b5808] font-semibold">Clinical OS Configuration</span>
          </div>
          <h1 className="font-headline-lg text-3xl text-[#1b1c1a] tracking-tight">
            Clinic Settings &amp; EHR Infrastructure
          </h1>
          <p className="font-body-md text-sm text-[#4e4538] max-w-2xl">
            Facility parameters, HIPAA compliance enforcement, cold-chain telemetry thresholds, and
            automated SMS protocol routing.
          </p>
        </div>

        <button
          onClick={() => showToast('Clinic settings updated and propagated to all 3 branches', 'success')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7b5808] text-white hover:bg-[#5e4200] text-xs font-semibold shadow-md active:scale-95"
        >
          <span className="material-symbols-outlined text-sm">save</span>
          <span>Save Configuration</span>
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {/* Branch Facilities */}
        <div className="p-6 rounded-2xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#eee9e0]">
            <div>
              <h3 className="font-headline-sm text-base font-bold text-[#1b1c1a]">
                Connected Facility Locations
              </h3>
              <p className="text-xs text-[#625d5b]">
                Active EHR instances sharing unified patient dossiers and inventory ledgers.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs">
              3 Online
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-[#d2c5b2]/40">
              <div className="font-bold text-[#1b1c1a] text-sm">Main Clinic - Branch A</div>
              <div className="text-[#625d5b] mt-1">450 Sutter St, Suite 1400</div>
              <div className="text-[#7b5808] font-semibold mt-2">Primary Surgical &amp; Laser Suite</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-[#d2c5b2]/40">
              <div className="font-bold text-[#1b1c1a] text-sm">Downtown - Branch B</div>
              <div className="text-[#625d5b] mt-1">100 Montgomery St, Floor 8</div>
              <div className="text-[#7b5808] font-semibold mt-2">Laser &amp; RF Body Center</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-[#d2c5b2]/40">
              <div className="font-bold text-[#1b1c1a] text-sm">Westside Pavilion - Branch C</div>
              <div className="text-[#625d5b] mt-1">2200 Webster St, Pavilion C</div>
              <div className="text-[#7b5808] font-semibold mt-2">VIP Aesthetics &amp; Wellness</div>
            </div>
          </div>
        </div>

        {/* Clinical Compliance & Telemetry */}
        <div className="p-6 rounded-2xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col gap-4">
          <h3 className="font-headline-sm text-base font-bold text-[#1b1c1a] pb-3 border-b border-[#eee9e0]">
            Automated Clinical Safeguards &amp; Telemetry
          </h3>

          <div className="flex flex-col divide-y divide-[#eee9e0] text-xs">
            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="font-bold text-[#1b1c1a]">Automated Two-Way Patient SMS</div>
                <div className="text-[#625d5b]">
                  Send instant arrival links, reminder texts, and check-in lounge confirmations.
                </div>
              </div>
              <input
                type="checkbox"
                checked={twoWaySms}
                onChange={(e) => setTwoWaySms(e.target.checked)}
                className="w-5 h-5 accent-[#7b5808] cursor-pointer"
              />
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="font-bold text-[#1b1c1a]">Cold-Chain Excursion Instant Push Alerts</div>
                <div className="text-[#625d5b]">
                  Alert Medical Director immediately if any vault sensor strays outside 2.0°C – 8.0°C.
                </div>
              </div>
              <input
                type="checkbox"
                checked={coldChainAlerts}
                onChange={(e) => setColdChainAlerts(e.target.checked)}
                className="w-5 h-5 accent-[#7b5808] cursor-pointer"
              />
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="font-bold text-[#1b1c1a]">Polarized Clinical Photo Auto-Sync</div>
                <div className="text-[#625d5b]">
                  Store standardized cross-polarized dermoscopy photographs in HIPAA cloud vault.
                </div>
              </div>
              <input
                type="checkbox"
                checked={photoSync}
                onChange={(e) => setPhotoSync(e.target.checked)}
                className="w-5 h-5 accent-[#7b5808] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
