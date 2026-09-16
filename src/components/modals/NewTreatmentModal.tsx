import React, { useState } from 'react';
import { useAuraPulse } from '../../context/AuraPulseContext';
import { ProcedureCategory } from '../../types';

export const NewTreatmentModal: React.FC = () => {
  const { isNewTreatmentModalOpen, setIsNewTreatmentModalOpen, addProcedure } = useAuraPulse();

  const [title, setTitle] = useState('');
  const [cpt, setCpt] = useState('CPT 17999');
  const [modality, setModality] = useState('Energy-Based Device');
  const [category, setCategory] = useState<ProcedureCategory>('laser-light');
  const [duration, setDuration] = useState('60 mins');
  const [prepTime, setPrepTime] = useState('15m topical prep');
  const [fee, setFee] = useState('$450.00');
  const [eligibility, setEligibility] = useState('MD / DO Only');
  const [downtime, setDowntime] = useState('1-2 days mild erythema');

  if (!isNewTreatmentModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const id = `PROC-${Math.floor(100 + Math.random() * 900)}`;

    addProcedure({
      id,
      title,
      cpt,
      modality,
      category,
      duration,
      prepTime,
      fee,
      downtime,
      eligibility,
      status: 'active',
      consumablesCount: 3,
      consumablesCogs: '$42.50 (9.4%)',
      credentialNote: 'Requires verified board certification and facility laser safety sign-off.',
      branches: [
        { name: 'Main HQ', fee },
        { name: 'Downtown', fee },
        { name: 'Westside', fee },
      ],
      safeguards: ['Digital Consent 30-Day', 'Medical History Clearance', 'Fitzpatrick Assessment'],
      consumables: [
        { name: 'Treatment Prep Solution', price: '$8.50' },
        { name: 'Disposable Device Tip', price: '$28.00' },
        { name: 'Post-Care Soothing Barrier', price: '$6.00' },
      ],
    });

    setIsNewTreatmentModalOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm"
      onClick={() => setIsNewTreatmentModalOpen(false)}
    >
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#d2c5b2]/40 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[#eee9e0] flex items-center justify-between bg-[#faf8f5]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7b5808]">medical_services</span>
            <h2 className="font-headline-sm text-base font-bold text-[#1b1c1a]">
              Create New Clinical Procedure Protocol
            </h2>
          </div>
          <button
            onClick={() => setIsNewTreatmentModalOpen(false)}
            className="p-1 rounded-lg text-[#625d5b] hover:text-[#1b1c1a] hover:bg-[#efeeeb]"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 text-xs font-body-sm">
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#1b1c1a]">Protocol Title *</label>
            <input
              required
              autoFocus
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sciton BBL HERO Photofacial"
              className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/40 outline-none focus:bg-white focus:border-[#7b5808]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#1b1c1a]">CPT Billing Code</label>
              <input
                type="text"
                value={cpt}
                onChange={(e) => setCpt(e.target.value)}
                className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/40 outline-none focus:bg-white focus:border-[#7b5808]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#1b1c1a]">Clinical Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProcedureCategory)}
                className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/40 outline-none focus:bg-white focus:border-[#7b5808]"
              >
                <option value="laser-light">Laser &amp; Light</option>
                <option value="injectables">Injectables &amp; Toxins</option>
                <option value="facials">Clinical Facials</option>
                <option value="body-contouring">Body Contouring</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#1b1c1a]">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/40 outline-none focus:bg-white focus:border-[#7b5808]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#1b1c1a]">Standard Fee</label>
              <input
                type="text"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/40 outline-none focus:bg-white focus:border-[#7b5808]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#1b1c1a]">Authorized Provider Level</label>
              <select
                value={eligibility}
                onChange={(e) => setEligibility(e.target.value)}
                className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/40 outline-none focus:bg-white focus:border-[#7b5808]"
              >
                <option>MD / DO Only</option>
                <option>RN / NP Certified</option>
                <option>Licensed Esthetician</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#1b1c1a]">Expected Recovery</label>
              <input
                type="text"
                value={downtime}
                onChange={(e) => setDowntime(e.target.value)}
                className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/40 outline-none focus:bg-white focus:border-[#7b5808]"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#eee9e0] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsNewTreatmentModalOpen(false)}
              className="px-4 py-2 rounded-xl text-[#625d5b] hover:bg-[#efeeeb] font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#7b5808] text-white hover:bg-[#5e4200] font-semibold shadow-md"
            >
              Publish Protocol to EHR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
