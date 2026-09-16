import React from 'react';
import { useAuraPulse } from '../../context/AuraPulseContext';

export const ReportsScreen: React.FC = () => {
  const { showToast } = useAuraPulse();

  return (
    <div className="flex flex-col w-full max-w-[1600px] mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-[#625d5b] font-label-md text-[11px] uppercase tracking-wider">
            <span>Intelligence &amp; Metrics</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-[#7b5808] font-semibold">Clinical Outcomes &amp; Practice Health</span>
          </div>
          <h1 className="font-headline-lg text-3xl text-[#1b1c1a] tracking-tight">
            Clinical Outcomes &amp; Analytics
          </h1>
          <p className="font-body-md text-sm text-[#4e4538] max-w-3xl">
            Treatment protocol efficacy, patient retention curves, consumable profit margins, and
            compliance telemetry.
          </p>
        </div>

        <button
          onClick={() => showToast('Compiling executive board compliance report PDF...', 'info')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7b5808] text-white hover:bg-[#5e4200] text-xs font-semibold shadow-md active:scale-95"
        >
          <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
          <span>Generate Executive PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-5 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <span className="text-xs text-[#625d5b] uppercase font-bold tracking-wider">
            Top Performing Protocol
          </span>
          <div className="mt-2 font-headline-md text-xl text-[#1b1c1a]">Laser Skin Resurfacing</div>
          <div className="text-xs text-[#7b5808] font-bold mt-1">$482,000 Annualized</div>
          <div className="mt-4 text-xs text-[#625d5b]">
            78% Gross Margin after consumable deduction
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <span className="text-xs text-[#625d5b] uppercase font-bold tracking-wider">
            Patient Satisfaction Score
          </span>
          <div className="mt-2 font-headline-md text-2xl text-[#1b1c1a]">4.96 / 5.0</div>
          <div className="text-xs text-emerald-700 font-bold mt-1">99.1% Positive Reviews</div>
          <div className="mt-4 text-xs text-[#625d5b]">
            Based on post-procedure follow-up SMS surveys
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <span className="text-xs text-[#625d5b] uppercase font-bold tracking-wider">
            Consumable Waste Variance
          </span>
          <div className="mt-2 font-headline-md text-2xl text-emerald-700">&lt; 0.4%</div>
          <div className="text-xs text-[#7b5808] font-bold mt-1">Industry Leading Control</div>
          <div className="mt-4 text-xs text-[#625d5b]">
            Enforced by cycle count barcode verification
          </div>
        </div>
      </div>
    </div>
  );
};
