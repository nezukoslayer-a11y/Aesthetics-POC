import React, { useState, useMemo } from 'react';
import { useAuraPulse } from '../../context/AuraPulseContext';
import { BookingRecord } from '../../types';

export const AppointmentsScreen: React.FC = () => {
  const {
    bookings,
    openBookingDrawer,
    activeBookingDrawerId,
    checkInBooking,
    setIsNewBookingModalOpen,
    currentBranch,
    showToast,
  } = useAuraPulse();

  const [filterStatus, setFilterStatus] = useState<'all' | 'checked-in' | 'in-progress' | 'scheduled' | 'conflict'>('all');
  const [selectedSuite, setSelectedSuite] = useState('All Suites');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDateStr, setCurrentDateStr] = useState('Today, Oct 24, 2024');

  const bookingList = useMemo(() => Object.values(bookings), [bookings]);

  const filteredBookings = useMemo(() => {
    return bookingList.filter((b) => {
      // Status filter
      if (filterStatus === 'checked-in' && b.status !== 'checked-in') return false;
      if (filterStatus === 'in-progress' && b.status !== 'in-progress') return false;
      if (filterStatus === 'scheduled' && b.status !== 'scheduled' && b.status !== 'confirmed') return false;
      if (filterStatus === 'conflict' && b.status !== 'conflict') return false;

      // Suite filter
      if (selectedSuite !== 'All Suites') {
        if (!b.suite.toLowerCase().includes(selectedSuite.toLowerCase())) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchPatient = b.patientName.toLowerCase().includes(q);
        const matchTreatment = b.treatment.toLowerCase().includes(q);
        const matchNum = b.bookingNumber.toLowerCase().includes(q);
        const matchSpecialist = b.specialist.toLowerCase().includes(q);
        if (!matchPatient && !matchTreatment && !matchNum && !matchSpecialist) return false;
      }

      return true;
    });
  }, [bookingList, filterStatus, selectedSuite, searchQuery]);

  return (
    <div className="flex flex-col w-full max-w-[1600px] mx-auto min-w-0">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 min-w-0">
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-[#625d5b] font-label-md text-[11px] uppercase tracking-wider min-w-0">
            <span className="shrink-0">Clinical Operations</span>
            <span className="material-symbols-outlined text-xs shrink-0">chevron_right</span>
            <span className="text-[#7b5808] font-semibold truncate">Real-Time Scheduler &amp; Suites</span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-3xl text-[#1b1c1a] tracking-tight truncate">
            Appointments &amp; Treatment Suites
          </h1>
          <p className="font-body-md text-sm text-[#4e4538] max-w-3xl line-clamp-2 sm:line-clamp-none">
            Multi-provider clinical schedule, procedure room allocation, patient flow coordination,
            and SMS check-in status.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Date Picker Bar */}
          <div className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white border border-[#d2c5b2]/40 shadow-xs shrink-0">
            <button
              onClick={() => showToast('Navigated to previous clinical day')}
              className="p-1 rounded hover:bg-[#f5f3f0] text-[#625d5b] transition-colors"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <div className="flex items-center gap-1.5 px-2 text-xs font-semibold text-[#1b1c1a] truncate">
              <span className="material-symbols-outlined text-sm text-[#7b5808] shrink-0">calendar_today</span>
              <span className="truncate">{currentDateStr}</span>
            </div>
            <button
              onClick={() => showToast('Navigated to next clinical day')}
              className="p-1 rounded hover:bg-[#f5f3f0] text-[#625d5b] transition-colors"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>

          <button
            id="newAppointmentBtn"
            onClick={() => setIsNewBookingModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7b5808] text-white hover:bg-[#5e4200] font-label-lg text-xs transition-all shadow-md active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span>+ New Appointment</span>
          </button>
        </div>
      </div>

      {/* Live Suite Status Carousel Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
        <div className="p-4 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="font-title-md text-xs font-bold text-[#1b1c1a]">
                Suite 101 — Laser Resurfacing
              </span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold">
              In-Use
            </span>
          </div>
          <div className="text-xs text-[#1b1c1a] font-semibold">Dr. Claire Sterling, MD</div>
          <div className="text-[11px] text-[#625d5b] mt-0.5">
            Laser Skin Resurfacing · 10:00 – 11:30 AM
          </div>
          <div className="mt-2 text-[10px] text-emerald-800 font-medium bg-emerald-50/70 p-1.5 rounded-lg border border-emerald-200/50">
            Next: Sofia Al-Mansoor (11:45 AM)
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
              <span className="font-title-md text-xs font-bold text-[#1b1c1a]">
                Suite 102 — Injectables Vault
              </span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 font-bold">
              Cleaning Prep
            </span>
          </div>
          <div className="text-xs text-[#1b1c1a] font-semibold">Dr. Marcus Vance, DO</div>
          <div className="text-[11px] text-[#625d5b] mt-0.5">
            Botox Glabellar &amp; Juvederm Voluma
          </div>
          <div className="mt-2 text-[10px] text-amber-800 font-medium bg-amber-50/70 p-1.5 rounded-lg border border-amber-200/50">
            Vault Cold-Chain Log verified
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between border-l-4 border-l-[#7b5808]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span className="font-title-md text-xs font-bold text-[#1b1c1a]">
                Suite 103 — Clinical Facials
              </span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#fae8c8] text-[#5e4200] font-bold">
              VIP Reserved
            </span>
          </div>
          <div className="text-xs text-[#1b1c1a] font-semibold">Sarah Jenkins, LE</div>
          <div className="text-[11px] text-[#625d5b] mt-0.5">
            HydraFacial Deluxe + Dermaplane · 1:30 PM
          </div>
          <div className="mt-2 text-[10px] text-[#7b5808] font-medium bg-[#fbe7c4]/40 p-1.5 rounded-lg border border-[#d2c5b2]/40">
            Patient: Vivian Sinclair (VIP Black)
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="font-title-md text-xs font-bold text-[#1b1c1a]">
                Suite 104 — Body Sculpting
              </span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 font-bold">
              Available
            </span>
          </div>
          <div className="text-xs text-[#1b1c1a] font-semibold">Elena Rostova, NP</div>
          <div className="text-[11px] text-[#625d5b] mt-0.5">CoolSculpting Elite · Open Slot</div>
          <div className="mt-2 text-[10px] text-blue-800 font-medium bg-blue-50/70 p-1.5 rounded-lg border border-blue-200/50">
            Ready for on-demand booking
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Belt */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          {/* Segmented Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/30 overflow-x-auto">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-xs whitespace-nowrap transition-colors ${
                filterStatus === 'all'
                  ? 'bg-white text-[#1b1c1a] font-semibold shadow-xs'
                  : 'text-[#625d5b] hover:text-[#1b1c1a]'
              }`}
            >
              All Bookings ({bookingList.length})
            </button>
            <button
              onClick={() => setFilterStatus('checked-in')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-xs whitespace-nowrap transition-colors ${
                filterStatus === 'checked-in'
                  ? 'bg-white text-[#1b1c1a] font-semibold shadow-xs'
                  : 'text-[#625d5b] hover:text-[#1b1c1a]'
              }`}
            >
              Checked-In ({bookingList.filter((b) => b.status === 'checked-in').length})
            </button>
            <button
              onClick={() => setFilterStatus('in-progress')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-xs whitespace-nowrap transition-colors ${
                filterStatus === 'in-progress'
                  ? 'bg-white text-[#1b1c1a] font-semibold shadow-xs'
                  : 'text-[#625d5b] hover:text-[#1b1c1a]'
              }`}
            >
              In Treatment ({bookingList.filter((b) => b.status === 'in-progress').length})
            </button>
            <button
              onClick={() => setFilterStatus('scheduled')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-xs whitespace-nowrap transition-colors ${
                filterStatus === 'scheduled'
                  ? 'bg-white text-[#1b1c1a] font-semibold shadow-xs'
                  : 'text-[#625d5b] hover:text-[#1b1c1a]'
              }`}
            >
              Scheduled / Confirmed
            </button>
            <button
              onClick={() => setFilterStatus('conflict')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-xs whitespace-nowrap transition-colors ${
                filterStatus === 'conflict'
                  ? 'bg-white text-[#1b1c1a] font-semibold shadow-xs'
                  : 'text-[#625d5b] hover:text-[#1b1c1a]'
              }`}
            >
              Conflicts / Rescheduled
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#625d5b]">
            <span className="material-symbols-outlined text-xs text-[#7b5808]">sms</span>
            <span>Real-time SMS two-way automated sync</span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="p-3 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[280px]">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#625d5b] text-sm">
              search
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by patient, treatment, booking ID, specialist..."
              type="text"
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#f5f3f0] text-[#1b1c1a] font-body-sm text-xs placeholder:text-[#625d5b] focus:outline-none focus:bg-white border border-transparent focus:border-[#7b5808] transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedSuite}
              onChange={(e) => setSelectedSuite(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#f5f3f0] hover:bg-[#eae8e5] text-[#625d5b] hover:text-[#1b1c1a] text-xs font-label-sm border border-[#d2c5b2]/30 transition-colors cursor-pointer outline-none"
            >
              <option>All Suites</option>
              <option>Suite 101</option>
              <option>Suite 102</option>
              <option>Suite 103</option>
              <option>Suite 104</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Ledger Table */}
      <div className="rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs overflow-hidden flex flex-col mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f5f3f0]/70 text-[#625d5b] font-label-sm text-[11px] uppercase tracking-wider border-b border-[#d2c5b2]/30">
                <th className="py-3.5 px-5 font-semibold">Time &amp; Booking</th>
                <th className="py-3.5 px-4 font-semibold">Patient</th>
                <th className="py-3.5 px-4 font-semibold">Treatment &amp; Protocol</th>
                <th className="py-3.5 px-4 font-semibold">Specialist &amp; Suite</th>
                <th className="py-3.5 px-4 font-semibold">Fee / Deposit</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d2c5b2]/20 text-xs font-body-sm">
              {filteredBookings.map((b) => {
                const isSelected = activeBookingDrawerId === b.id;
                return (
                  <tr
                    key={b.id}
                    onClick={() => openBookingDrawer(b.id)}
                    className={`hover:bg-[#b88e3e]/10 transition-colors cursor-pointer group ${
                      isSelected ? 'bg-[#b88e3e]/15 border-l-4 border-l-[#7b5808]' : ''
                    }`}
                  >
                    {/* Time & Booking # */}
                    <td className="py-4 px-5">
                      <div className="flex flex-col">
                        <span className="font-title-md text-xs font-bold text-[#1b1c1a]">
                          {b.schedule}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono text-[10px] text-[#7b5808] font-bold">
                            {b.bookingNumber}
                          </span>
                          <span className="text-[10px] text-[#625d5b]">{b.duration}</span>
                        </div>
                      </div>
                    </td>

                    {/* Patient */}
                    <td className="py-4 px-4 max-w-[200px]">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs shrink-0 ${
                            b.avatarBg || 'bg-[#fbe7c4] text-[#7b5808]'
                          }`}
                        >
                          {b.initials}
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="font-semibold text-xs text-[#1b1c1a] group-hover:text-[#7b5808] truncate max-w-[120px]">
                              {b.patientName}
                            </span>
                            <span className="text-[9px] px-1 rounded bg-[#fae8c8] text-[#5e4200] font-bold shrink-0">
                              {b.tier}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#625d5b] truncate">{b.phone}</span>
                        </div>
                      </div>
                    </td>

                    {/* Treatment */}
                    <td className="py-4 px-4 max-w-[220px]">
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-[#1b1c1a] text-xs leading-snug truncate" title={b.treatment}>
                          {b.treatment}
                        </span>
                        <span className="text-[11px] text-[#625d5b] truncate" title={b.treatmentAddon}>{b.treatmentAddon}</span>
                      </div>
                    </td>

                    {/* Specialist & Suite */}
                    <td className="py-4 px-4 max-w-[170px]">
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium text-[#1b1c1a] truncate" title={b.specialist}>{b.specialist}</span>
                        <span className="text-[11px] text-[#7b5808] font-medium truncate" title={b.suite}>{b.suite}</span>
                      </div>
                    </td>

                    {/* Fee & Deposit */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#1b1c1a]">{b.fee}</span>
                        <span className="text-[10px] text-emerald-700 font-medium">
                          {b.deposit}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      {b.status === 'checked-in' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-[10px] font-bold">
                          <span className="material-symbols-outlined text-xs">how_to_reg</span>
                          Checked-In
                        </span>
                      ) : b.status === 'in-progress' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-label-sm text-[10px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                          In Treatment
                        </span>
                      ) : b.status === 'conflict' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 font-label-sm text-[10px] font-bold">
                          <span className="material-symbols-outlined text-xs">error</span>
                          Conflict
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#efeeeb] text-[#4e4538] font-label-sm text-[10px] font-semibold">
                          <span className="material-symbols-outlined text-xs">schedule</span>
                          Scheduled
                        </span>
                      )}
                    </td>

                    {/* Action buttons */}
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {b.status !== 'checked-in' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              checkInBooking(b.id);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300/60 transition-colors"
                          >
                            Check-In
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openBookingDrawer(b.id);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-[#f5f3f0] hover:bg-[#b88e3e] text-[#625d5b] hover:text-white text-[11px] font-semibold transition-colors"
                        >
                          Dossier
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
