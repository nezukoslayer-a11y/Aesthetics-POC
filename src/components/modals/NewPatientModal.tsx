import React, { useState } from 'react';
import { useAuraPulse } from '../../context/AuraPulseContext';
import { ClientTier } from '../../types';

export const NewPatientModal: React.FC = () => {
  const { isNewPatientModalOpen, setIsNewPatientModalOpen, addPatient } = useAuraPulse();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('32');
  const [gender, setGender] = useState('F');
  const [tier, setTier] = useState<ClientTier>('VIP BLACK');
  const [clinician, setClinician] = useState('Dr. Claire Sterling, MD');
  const [allergies, setAllergies] = useState('');

  if (!isNewPatientModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const clinicalAlerts = allergies.trim()
      ? allergies.split(',').map((a) => ({
          type: 'allergy' as const,
          label: a.trim(),
        }))
      : [];

    addPatient({
      name,
      initials,
      tier,
      phone: phone || '(555) 000-0000',
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@client.com`,
      age: parseInt(age, 10) || 30,
      gender,
      clinicalAlerts,
      lastVisitDate: 'New Patient',
      clinician,
      consentsValid: true,
      consentsCount: '3/3',
      visitsCount: 1,
      totalSpend: '$0',
    });

    setIsNewPatientModalOpen(false);
    setName('');
    setPhone('');
    setEmail('');
    setAllergies('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm"
      onClick={() => setIsNewPatientModalOpen(false)}
    >
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#d2c5b2]/40 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[#eee9e0] flex items-center justify-between bg-[#faf8f5]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7b5808]">person_add</span>
            <h2 className="font-headline-sm text-base font-bold text-[#1b1c1a]">
              New Patient Registration
            </h2>
          </div>
          <button
            onClick={() => setIsNewPatientModalOpen(false)}
            className="p-1 rounded-lg text-[#625d5b] hover:text-[#1b1c1a] hover:bg-[#efeeeb]"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 text-xs font-body-sm">
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#1b1c1a]">Full Legal Name *</label>
            <input
              required
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Genevieve Laurent"
              className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/40 outline-none focus:bg-white focus:border-[#7b5808]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#1b1c1a]">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 392-1084"
                className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/40 outline-none focus:bg-white focus:border-[#7b5808]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#1b1c1a]">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@luxury.com"
                className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/40 outline-none focus:bg-white focus:border-[#7b5808]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#1b1c1a]">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/40 outline-none focus:bg-white focus:border-[#7b5808]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#1b1c1a]">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/40 outline-none focus:bg-white focus:border-[#7b5808]"
              >
                <option value="F">Female (F)</option>
                <option value="M">Male (M)</option>
                <option value="Non-Binary">Non-Binary</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#1b1c1a]">Membership Tier</label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value as ClientTier)}
                className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/40 outline-none focus:bg-white focus:border-[#7b5808]"
              >
                <option value="VIP BLACK">VIP BLACK</option>
                <option value="PLATINUM">PLATINUM</option>
                <option value="GOLD">GOLD</option>
                <option value="FOUNDER">FOUNDER</option>
                <option value="STANDARD">STANDARD</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#1b1c1a]">Primary Attending Clinician</label>
            <select
              value={clinician}
              onChange={(e) => setClinician(e.target.value)}
              className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/40 outline-none focus:bg-white focus:border-[#7b5808]"
            >
              <option>Dr. Claire Sterling, MD</option>
              <option>Sarah Jenkins, LE</option>
              <option>Dr. Marcus Vance, DO</option>
              <option>Elena Rostova, NP</option>
              <option>Chloe Dubois, RN</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#1b1c1a]">
              Clinical Alerts / Known Allergies (comma separated)
            </label>
            <input
              type="text"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              placeholder="e.g. Lidocaine Sensitivity, Aspirin"
              className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/40 outline-none focus:bg-white focus:border-[#7b5808]"
            />
          </div>

          <div className="pt-3 border-t border-[#eee9e0] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsNewPatientModalOpen(false)}
              className="px-4 py-2 rounded-xl text-[#625d5b] hover:bg-[#efeeeb] font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#7b5808] text-white hover:bg-[#5e4200] font-semibold shadow-md"
            >
              Register &amp; Create Dossier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
