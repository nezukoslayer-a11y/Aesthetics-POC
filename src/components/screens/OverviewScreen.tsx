import React from 'react';
import { useAuraPulse } from '../../context/AuraPulseContext';
import { BookingRecord } from '../../types';

export const OverviewScreen: React.FC = () => {
  const { setCurrentTab, openBookingDrawer, bookings, patients, inventory } = useAuraPulse();

  const bookingList: BookingRecord[] = Object.values(bookings);
  const lowStockItems = inventory.filter((i) => i.currentStock <= i.minThreshold);

  return (
    <div className="flex flex-col w-full max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[#625d5b] font-label-md text-[11px] uppercase tracking-wider">
            <span>Executive Console</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-[#7b5808] font-semibold">Clinic Overview &amp; Live Operations</span>
          </div>
          <h1 className="font-headline-lg text-3xl text-[#1b1c1a] tracking-tight">
            AuraPulse Clinical Dashboard
          </h1>
          <p className="font-body-md text-sm text-[#4e4538] max-w-3xl">
            Real-time multi-branch clinical performance, patient flow synchronization, treatment room
            utilization, and cold-chain compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentTab('appointments')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#7b5808] text-white hover:bg-[#5e4200] font-label-lg text-xs transition-all shadow-md active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">calendar_month</span>
            <span>View Today's Schedule</span>
          </button>
        </div>
      </div>

      {/* 4 Executive KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <div className="p-5 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-[10px] text-[#625d5b] uppercase tracking-widest font-bold">
              Today's Appointments
            </span>
            <span className="p-2 rounded-xl bg-[#f5f3f0] text-[#7b5808] material-symbols-outlined text-lg">
              event_available
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-3xl text-[#1b1c1a]">18</span>
            <span className="font-label-sm text-xs text-emerald-700 font-semibold">92% booked</span>
          </div>
          <div className="mt-2 text-[#625d5b] font-label-sm text-[11px]">
            6 Checked-in · 4 In procedure
          </div>
          <div className="w-full bg-[#eae8e5] h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#b88e3e] h-full rounded-full" style={{ width: '92%' }} />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-[10px] text-[#625d5b] uppercase tracking-widest font-bold">
              Daily Clinical Gross
            </span>
            <span className="p-2 rounded-xl bg-[#f5f3f0] text-[#7b5808] material-symbols-outlined text-lg">
              attach_money
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-3xl text-[#1b1c1a]">$14,850</span>
            <span className="font-label-sm text-xs text-emerald-700 font-semibold">+18.4% vs avg</span>
          </div>
          <div className="mt-2 text-[#625d5b] font-label-sm text-[11px]">
            $2,800 deposits collected
          </div>
          <div className="w-full bg-[#eae8e5] h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: '84%' }} />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-[10px] text-[#625d5b] uppercase tracking-widest font-bold">
              Laser &amp; Suite Capacity
            </span>
            <span className="p-2 rounded-xl bg-[#f5f3f0] text-[#7b5808] material-symbols-outlined text-lg">
              door_front
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-3xl text-[#1b1c1a]">88%</span>
            <span className="font-label-sm text-xs text-[#7b5808] font-semibold">4 Suites Live</span>
          </div>
          <div className="mt-2 text-[#625d5b] font-label-sm text-[11px]">
            Turnaround time: 8 mins avg.
          </div>
          <div className="w-full bg-[#eae8e5] h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#b88e3e] h-full rounded-full" style={{ width: '88%' }} />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-[10px] text-[#625d5b] uppercase tracking-widest font-bold">
              Cold-Chain Compliance
            </span>
            <span className="p-2 rounded-xl bg-[#f5f3f0] text-[#7b5808] material-symbols-outlined text-lg">
              ac_unit
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-3xl text-[#1b1c1a]">100%</span>
            <span className="font-label-sm text-xs text-emerald-700 font-semibold">3.1°C Avg</span>
          </div>
          <div className="mt-2 text-[#625d5b] font-label-sm text-[11px]">
            Zero excursions last 90 days
          </div>
          <div className="w-full bg-[#eae8e5] h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: '100%' }} />
          </div>
        </div>
      </div>

      {/* Main Grid: Today's Clinical Schedule + Clinical Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left 2 Cols: Today's Schedule preview */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-[#eee9e0] mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#7b5808] text-xl">
                calendar_month
              </span>
              <h2 className="font-headline-sm text-base font-bold text-[#1b1c1a]">
                Today's Patient Flow &amp; Treatment Schedule
              </h2>
            </div>
            <button
              onClick={() => setCurrentTab('appointments')}
              className="text-xs text-[#7b5808] hover:underline font-semibold"
            >
              Full Schedule →
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {bookingList.slice(0, 4).map((b) => (
              <div
                key={b.id}
                onClick={() => openBookingDrawer(b.id)}
                className="p-3.5 rounded-xl bg-[#faf8f5] hover:bg-[#b88e3e]/10 border border-[#eee9e0] transition-colors cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shadow-xs ${
                      b.avatarBg || 'bg-[#fbe7c4] text-[#7b5808]'
                    }`}
                  >
                    {b.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-[#1b1c1a]">{b.patientName}</span>
                      <span className="text-[9px] px-1.5 rounded bg-[#fae8c8] text-[#5e4200] font-bold">
                        {b.tier}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#625d5b] mt-0.5">
                      {b.treatment} · {b.suite}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <div>
                    <div className="text-xs font-bold text-[#7b5808]">{b.schedule}</div>
                    <div className="text-[10px] text-[#625d5b]">{b.specialist}</div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full font-label-sm text-[10px] font-bold ${
                      b.status === 'checked-in'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-[#efeeeb] text-[#4e4538]'
                    }`}
                  >
                    {b.status === 'checked-in' ? 'Checked-In' : 'Scheduled'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Urgent Attention & Stock Alerts */}
        <div className="p-5 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-[#eee9e0] mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ba1a1a] text-xl">notification_important</span>
              <h2 className="font-headline-sm text-base font-bold text-[#1b1c1a]">Clinical Alerts</h2>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-rose-50 text-rose-800 font-bold">
              3 Urgent
            </span>
          </div>

          <div className="flex flex-col gap-3 text-xs">
            <div
              onClick={() => setCurrentTab('inventory')}
              className="p-3 rounded-xl bg-amber-50 border border-amber-200 cursor-pointer hover:bg-amber-100/70 transition-colors"
            >
              <div className="font-bold text-amber-950 flex items-center justify-between">
                <span>Botox 100U Low Threshold</span>
                <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 rounded">3 Left</span>
              </div>
              <p className="text-[11px] text-amber-800 mt-1">
                Main Clinic Vault A is down to 3 vials. Automated replenishment PO drafted.
              </p>
            </div>

            <div
              onClick={() => setCurrentTab('patients')}
              className="p-3 rounded-xl bg-rose-50 border border-rose-200 cursor-pointer hover:bg-rose-100/70 transition-colors"
            >
              <div className="font-bold text-rose-950 flex items-center justify-between">
                <span>Annual Consent Expiring</span>
                <span className="text-[10px] bg-rose-200 text-rose-900 px-1.5 rounded">Pending</span>
              </div>
              <p className="text-[11px] text-rose-800 mt-1">
                Vivian Chen has an upcoming procedure and needs laser consent signature renewal.
              </p>
            </div>

            <div
              onClick={() => setCurrentTab('treatments')}
              className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 cursor-pointer hover:bg-emerald-100/70 transition-colors"
            >
              <div className="font-bold text-emerald-950 flex items-center justify-between">
                <span>New Protocol Published</span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 rounded">EHR Spec</span>
              </div>
              <p className="text-[11px] text-emerald-800 mt-1">
                Radiofrequency Microneedling v2.4 protocol synced across all 3 facility consoles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
