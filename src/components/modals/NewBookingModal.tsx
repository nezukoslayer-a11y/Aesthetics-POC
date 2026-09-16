import React, { useState } from 'react';
import { useAuraPulse } from '../../context/AuraPulseContext';

export const NewBookingModal: React.FC = () => {
  const {
    isNewBookingModalOpen,
    setIsNewBookingModalOpen,
    patients,
    addBooking,
  } = useAuraPulse();

  const [patientName, setPatientName] = useState(patients[0]?.name || 'Vivian Sinclair');
  const [treatment, setTreatment] = useState('HydraFacial Deluxe');
  const [addon, setAddon] = useState('Dermaplane Add-on (15 min)');
  const [specialist, setSpecialist] = useState('Sarah Jenkins, LE');
  const [suite, setSuite] = useState('Suite 103 (Clinical Facials)');
  const [schedule, setSchedule] = useState('2:30 – 3:15 PM');
  const [fee, setFee] = useState('$385.00');
  const [deposit, setDeposit] = useState('$100 Deposit Secured');

  if (!isNewBookingModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const patientObj = patients.find((p) => p.name === patientName) || patients[0];

    addBooking({
      patientName,
      initials: patientObj?.initials || 'VS',
      tier: patientObj?.tier || 'VIP BLACK',
      phone: patientObj?.phone || '(555) 234-5678',
      email: patientObj?.email || 'patient@client.com',
      visits: `${(patientObj?.visitsCount || 1) + 1} Total Visits`,
      cardOnFile: 'Card on File (•••• 9012)',
      treatment,
      treatmentAddon: addon,
      specialist,
      suite,
      schedule,
      duration: '45 min procedure',
      fee,
      deposit,
      smsStatus: 'Booking Confirmed Via SMS',
      smsDetail: 'Digital intake & consent link dispatched',
      notes: 'Patient requested quiet clinical suite. High hydration serum prep.',
      status: 'confirmed',
    });

    setIsNewBookingModalOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm"
      onClick={() => setIsNewBookingModalOpen(false)}
    >
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#d2c5b2]/40 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[#eee9e0] flex items-center justify-between bg-[#faf8f5]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7b5808]">add_circle</span>
            <h2 className="font-headline-sm text-base font-bold text-[#1b1c1a]">
              Schedule New Aesthetic Appointment
            </h2>
          </div>
          <button
            onClick={() => setIsNewBookingModalOpen(false)}
            className="p-1 rounded-lg text-[#625d5b] hover:text-[#1b1c1a] hover:bg-[#efeeeb]"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 text-xs font-body-sm">
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#1b1c1a]">Select Patient *</label>
            <select
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/40 outline-none focus:bg-white focus:border-[#7b5808]"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name} (#{p.mrn}) — {p.tier}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#1b1c1a]">Procedure Treatment</label>
              <select
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/40 outline-none focus:bg-white focus:border-[#7b5808]"
              >
                <option>HydraFacial Deluxe</option>
                <option>Laser Skin Resurfacing (Fractional CO2)</option>
                <option>Botox Cosmetic (Neurotoxin)</option>
                <option>Juvederm Voluma XC</option>
                <option>DiamondGlow Medical Infusion</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#1b1c1a]">Clinical Add-on</label>
              <input
                type="text"
                value={addon}
                onChange={(e) => setAddon(e.target.value)}
                className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/40 outline-none focus:bg-white focus:border-[#7b5808]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#1b1c1a]">Attending Specialist</label>
              <select
                value={specialist}
                onChange={(e) => setSpecialist(e.target.value)}
                className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/40 outline-none focus:bg-white focus:border-[#7b5808]"
              >
                <option>Dr. Claire Sterling, MD</option>
                <option>Sarah Jenkins, LE</option>
                <option>Dr. Marcus Vance, DO</option>
                <option>Elena Rostova, NP</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#1b1c1a]">Treatment Suite</label>
              <select
                value={suite}
                onChange={(e) => setSuite(e.target.value)}
                className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/40 outline-none focus:bg-white focus:border-[#7b5808]"
              >
                <option>Suite 101 (Laser Resurfacing)</option>
                <option>Suite 102 (Injectables Vault)</option>
                <option>Suite 103 (Clinical Facials)</option>
                <option>Suite 104 (Body Sculpting)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#1b1c1a]">Time Slot</label>
              <input
                type="text"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/40 outline-none focus:bg-white focus:border-[#7b5808]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#1b1c1a]">Total Fee</label>
              <input
                type="text"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/40 outline-none focus:bg-white focus:border-[#7b5808]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#1b1c1a]">Deposit Status</label>
              <input
                type="text"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/40 outline-none focus:bg-white focus:border-[#7b5808]"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#eee9e0] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsNewBookingModalOpen(false)}
              className="px-4 py-2 rounded-xl text-[#625d5b] hover:bg-[#efeeeb] font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#7b5808] text-white hover:bg-[#5e4200] font-semibold shadow-md"
            >
              Book &amp; Send Confirmation SMS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
