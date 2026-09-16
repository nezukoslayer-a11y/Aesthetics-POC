import React, { useState } from 'react';
import { useAuraPulse } from '../context/AuraPulseContext';

export const PatientDossierDrawer: React.FC = () => {
  const {
    activeBookingDrawerId,
    closeBookingDrawer,
    bookings,
    checkInBooking,
    cancelBooking,
    rescheduleBooking,
    showToast,
  } = useAuraPulse();

  const [isRescheduling, setIsRescheduling] = useState(false);
  const [selectedNewTime, setSelectedNewTime] = useState('2:30 – 3:15 PM');
  const [isCheckInSuccess, setIsCheckInSuccess] = useState(false);

  if (!activeBookingDrawerId) return null;

  const data = bookings[activeBookingDrawerId] || bookings['1042'];
  if (!data) return null;

  const handleCheckIn = () => {
    setIsCheckInSuccess(true);
    checkInBooking(data.id);
    setTimeout(() => {
      setIsCheckInSuccess(false);
      closeBookingDrawer();
    }, 900);
  };

  const handleCancel = () => {
    if (window.confirm(`Are you sure you wish to cancel booking ${data.bookingNumber} for ${data.patientName}?`)) {
      cancelBooking(data.id);
    }
  };

  const handleConfirmReschedule = () => {
    rescheduleBooking(data.id, selectedNewTime);
    setIsRescheduling(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        id="drawerBackdrop"
        onClick={closeBookingDrawer}
        className="fixed inset-0 bg-stone-900/35 backdrop-blur-[2px] z-50 transition-opacity duration-300"
      />

      {/* Slide-over Drawer */}
      <aside
        id="appointmentDrawer"
        aria-label="Patient Booking Dossier"
        className="fixed inset-y-0 right-0 top-0 bottom-0 h-full w-full max-w-[440px] bg-white z-50 shadow-2xl flex flex-col justify-between border-l border-[#e5dfd5] font-body-md text-[#1b1c1a] transition-transform duration-300 ease-out transform translate-x-0"
      >
        <div className="flex flex-col overflow-y-auto flex-1">
          {/* Top Header Bar */}
          <div className="px-6 py-4 border-b border-[#eee9e0] flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center gap-2.5">
              <span
                id="drawerBookingBadge"
                className="px-2 py-0.5 rounded bg-[#fceecf] text-[#7b5808] font-label-sm uppercase tracking-wider font-bold text-[11px]"
              >
                {data.bookingNumber}
              </span>
              <a
                href="#chart"
                onClick={(e) => {
                  e.preventDefault();
                  showToast(`Opening digital aesthetic chart for ${data.patientName}...`, 'info');
                }}
                className="font-label-sm text-[#4e4538] hover:text-[#7b5808] transition-colors flex items-center gap-1 underline underline-offset-2 text-xs"
              >
                <span>Aesthetic Chart</span>
                <span className="material-symbols-outlined text-[13px]">open_in_new</span>
              </a>
            </div>
            <button
              id="closeDrawerBtn"
              onClick={closeBookingDrawer}
              title="Close Drawer"
              className="text-[#625d5b] hover:text-[#1b1c1a] hover:bg-[#f5f3f0] p-1.5 rounded-lg transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          {/* Client Profile Header */}
          <div className="px-6 pt-5 pb-4 border-b border-[#eee9e0] flex flex-col gap-3.5">
            <div className="flex items-start gap-3.5">
              <div
                id="drawerInitials"
                className={`w-12 h-12 rounded-xl flex items-center justify-center font-headline-md font-bold text-base shadow-sm shrink-0 border border-[#ecd2a0] ${
                  data.avatarBg || 'bg-[#fbe7c4] text-[#7b5808]'
                }`}
              >
                {data.initials}
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3
                    id="drawerPatientName"
                    className="font-headline-md text-lg text-[#1b1c1a] font-semibold tracking-tight"
                  >
                    {data.patientName}
                  </h3>
                  <span
                    id="drawerTierBadge"
                    className="px-1.5 py-0.5 rounded bg-[#fae8c8] text-[#5e4200] font-label-sm text-[9px] font-bold uppercase tracking-wider"
                  >
                    {data.tier}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 mt-1 text-xs text-[#625d5b]">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-xs text-[#7b5808]">call</span>
                    <span id="drawerPhone">{data.phone}</span>
                  </span>
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="material-symbols-outlined text-xs text-[#7b5808]">mail</span>
                    <span id="drawerEmail">{data.email}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-0.5 text-xs">
              <span
                id="drawerVisitCount"
                className="font-label-sm px-2.5 py-1 rounded bg-[#f5f3f0] text-[#7b5808] font-bold"
              >
                {data.visits}
              </span>
              <span
                id="drawerCardOnFile"
                className="font-label-sm px-2.5 py-1 rounded bg-[#f5f3f0] text-[#625d5b] font-medium"
              >
                {data.cardOnFile}
              </span>
            </div>
          </div>

          {/* Structured Information Cards */}
          <div className="p-6 flex flex-col gap-3.5">
            {/* Card 1: 2x2 Clean Attribute Grid */}
            <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 p-4 rounded-xl bg-[#faf8f5] border border-[#eee9e0] text-xs shadow-xs">
              <div className="flex flex-col">
                <span className="font-label-sm text-[#807666] uppercase font-bold text-[10px] tracking-wider mb-1">
                  TREATMENT
                </span>
                <span
                  id="drawerTreatment"
                  className="font-title-md text-xs text-[#1b1c1a] font-semibold leading-tight"
                >
                  {data.treatment}
                </span>
                <span
                  id="drawerTreatmentAddon"
                  className="font-body-sm text-[11px] text-[#625d5b] mt-0.5"
                >
                  {data.treatmentAddon}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-label-sm text-[#807666] uppercase font-bold text-[10px] tracking-wider mb-1">
                  SPECIALIST &amp; SUITE
                </span>
                <span
                  id="drawerSpecialist"
                  className="font-title-md text-xs text-[#1b1c1a] font-semibold leading-tight"
                >
                  {data.specialist}
                </span>
                <span id="drawerSuite" className="font-body-sm text-[11px] text-[#625d5b] mt-0.5">
                  {data.suite}
                </span>
              </div>

              <div className="flex flex-col pt-3 border-t border-[#eee9e0]">
                <span className="font-label-sm text-[#807666] uppercase font-bold text-[10px] tracking-wider mb-1">
                  SCHEDULE &amp; LENGTH
                </span>
                <span
                  id="drawerSchedule"
                  className="font-title-md text-xs text-[#1b1c1a] font-semibold text-[#7b5808]"
                >
                  {data.schedule}
                </span>
                <span
                  id="drawerDuration"
                  className="font-body-sm text-[11px] text-[#625d5b] mt-0.5"
                >
                  {data.duration}
                </span>
              </div>

              <div className="flex flex-col pt-3 border-t border-[#eee9e0]">
                <span className="font-label-sm text-[#807666] uppercase font-bold text-[10px] tracking-wider mb-1">
                  FEE &amp; DEPOSIT
                </span>
                <span id="drawerFee" className="font-title-md text-xs text-[#1b1c1a] font-semibold">
                  {data.fee}
                </span>
                <span
                  id="drawerDeposit"
                  className="font-body-sm text-[11px] text-emerald-700 font-medium mt-0.5"
                >
                  {data.deposit}
                </span>
              </div>
            </div>

            {/* Reschedule inline form if opened */}
            {isRescheduling && (
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 flex flex-col gap-2">
                <span className="font-label-sm text-xs font-bold text-amber-900 uppercase tracking-wider">
                  Select New Appointment Time
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['2:00 – 2:45 PM', '2:30 – 3:15 PM', '3:30 – 4:15 PM', '4:45 – 5:30 PM'].map(
                    (slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedNewTime(slot)}
                        className={`p-2 rounded-lg border text-left font-medium transition-colors ${
                          selectedNewTime === slot
                            ? 'bg-[#7b5808] text-white border-[#7b5808]'
                            : 'bg-white text-[#1b1c1a] border-amber-200 hover:bg-amber-100/50'
                        }`}
                      >
                        {slot}
                      </button>
                    )
                  )}
                </div>
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => setIsRescheduling(false)}
                    className="px-2.5 py-1 rounded text-xs text-[#625d5b] hover:bg-amber-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmReschedule}
                    className="px-3 py-1 rounded bg-[#7b5808] text-white text-xs font-bold hover:bg-[#5e4200]"
                  >
                    Confirm Change
                  </button>
                </div>
              </div>
            )}

            {/* Card 2: Green Confirmation Banner */}
            <div className="flex items-start gap-3 bg-[#eefbf4] border border-[#c3eed7] p-3.5 rounded-xl text-xs shadow-xs">
              <span className="material-symbols-outlined text-base text-emerald-600 shrink-0 mt-0.5">
                check_circle
              </span>
              <div className="flex flex-col min-w-0">
                <span
                  id="drawerSmsTitle"
                  className="font-semibold text-emerald-950 font-label-md text-xs"
                >
                  {data.smsStatus}
                </span>
                <span
                  id="drawerSmsNote"
                  className="text-emerald-700 text-[11px] mt-0.5 leading-snug font-body-sm"
                >
                  {data.smsDetail}
                </span>
              </div>
            </div>

            {/* Card 3: Room & Clinical Notes Card */}
            <div className="flex items-start gap-3 bg-[#faf8f5] border border-[#eee9e0] p-4 rounded-xl text-xs shadow-xs">
              <span className="material-symbols-outlined text-[#7b5808] text-base shrink-0 mt-0.5">
                sticky_note_2
              </span>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-label-md font-semibold text-[#1b1c1a] mb-0.5 text-xs">
                  Room &amp; Clinical Notes:
                </span>
                <p
                  id="drawerNotes"
                  className="font-body-sm text-[11px] text-[#4e4538] leading-relaxed"
                >
                  {data.notes}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="p-4 bg-white border-t border-[#eee9e0] flex items-center justify-between gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.03)]">
          <button
            id="cancelBookingBtn"
            onClick={handleCancel}
            className="font-label-sm text-[#ba1a1a] hover:underline text-xs px-2 py-2 font-semibold transition-colors"
          >
            Cancel Booking
          </button>
          <div className="flex items-center gap-2.5">
            <button
              id="rescheduleBtn"
              onClick={() => setIsRescheduling(!isRescheduling)}
              className="px-4 py-2.5 rounded-lg font-label-md bg-[#f3f4f6] text-[#4a4643] hover:bg-[#e9e1dd] transition-colors border border-[#d2c5b2]/40 text-xs font-medium"
            >
              Reschedule
            </button>
            <button
              id="checkInBtn"
              onClick={handleCheckIn}
              className={`px-4 py-2.5 rounded-lg font-label-md text-xs transition-all shadow-sm active:scale-95 flex items-center gap-1.5 font-semibold text-white ${
                isCheckInSuccess || data.status === 'checked-in'
                  ? 'bg-emerald-700'
                  : 'bg-[#7b5808] hover:bg-[#5e4200]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {isCheckInSuccess || data.status === 'checked-in' ? 'check' : 'how_to_reg'}
              </span>
              <span id="checkInText">
                {isCheckInSuccess || data.status === 'checked-in'
                  ? 'Checked-In ✓'
                  : 'Check-In Patient'}
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
