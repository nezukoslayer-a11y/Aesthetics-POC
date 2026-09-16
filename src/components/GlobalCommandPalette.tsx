import React, { useState, useMemo } from 'react';
import { useAuraPulse } from '../context/AuraPulseContext';
import { BookingRecord, ProcedureProtocol } from '../types';

export const GlobalCommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    patients,
    bookings,
    procedures,
    inventory,
    openBookingDrawer,
    openProcedureDrawer,
    openStockDrawer,
    setCurrentTab,
  } = useAuraPulse();

  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const bookingList: BookingRecord[] = Object.values(bookings);
    const procedureList: ProcedureProtocol[] = Object.values(procedures);

    if (!query.trim()) {
      return {
        patients: patients.slice(0, 3),
        bookings: bookingList.slice(0, 3),
        procedures: procedureList.slice(0, 3),
        inventory: inventory.slice(0, 3),
      };
    }
    const q = query.toLowerCase();
    return {
      patients: patients.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.mrn.toLowerCase().includes(q) ||
          p.phone.includes(q)
      ),
      bookings: bookingList.filter(
        (b) =>
          b.patientName.toLowerCase().includes(q) ||
          b.treatment.toLowerCase().includes(q) ||
          b.bookingNumber.toLowerCase().includes(q)
      ),
      procedures: procedureList.filter(
        (pr) =>
          pr.title.toLowerCase().includes(q) ||
          pr.id.toLowerCase().includes(q) ||
          pr.cpt.toLowerCase().includes(q)
      ),
      inventory: inventory.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.sku.toLowerCase().includes(q) ||
          i.lotNumber.toLowerCase().includes(q)
      ),
    };
  }, [query, patients, bookings, procedures, inventory]);

  if (!isCommandPaletteOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-stone-900/50 backdrop-blur-sm"
      onClick={() => setIsCommandPaletteOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#d2c5b2]/40 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#eee9e0]">
          <span className="material-symbols-outlined text-[#7b5808] text-xl">search</span>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patients, bookings, clinical protocols, SKUs... (Esc to exit)"
            className="flex-1 bg-transparent text-sm text-[#1b1c1a] placeholder:text-[#625d5b] outline-none"
          />
          <kbd className="px-2 py-0.5 rounded bg-[#f5f3f0] text-[10px] text-[#625d5b] font-mono border border-[#d2c5b2]/40">
            ESC
          </kbd>
        </div>

        {/* Results container */}
        <div className="max-h-[480px] overflow-y-auto p-3 flex flex-col gap-3 text-xs">
          {/* Patients */}
          {results.patients.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#625d5b]">
                Patients ({results.patients.length})
              </div>
              <div className="flex flex-col gap-1">
                {results.patients.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setCurrentTab('patients');
                      if (p.currentBookingId) {
                        openBookingDrawer(p.currentBookingId);
                      }
                      setIsCommandPaletteOpen(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#f5f3f0] transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#fbe7c4] text-[#7b5808] flex items-center justify-center font-bold text-xs">
                        {p.initials}
                      </div>
                      <div>
                        <div className="font-bold text-[#1b1c1a]">{p.name}</div>
                        <div className="text-[#625d5b] text-[11px]">
                          #{p.mrn} · {p.phone}
                        </div>
                      </div>
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-[#fae8c8] text-[#5e4200] text-[9px] font-bold uppercase">
                      {p.tier}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bookings */}
          {results.bookings.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#625d5b]">
                Appointments ({results.bookings.length})
              </div>
              <div className="flex flex-col gap-1">
                {results.bookings.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setCurrentTab('appointments');
                      openBookingDrawer(b.id);
                      setIsCommandPaletteOpen(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#f5f3f0] transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#7b5808] text-base">
                        calendar_today
                      </span>
                      <div>
                        <div className="font-bold text-[#1b1c1a]">
                          {b.patientName} — {b.treatment}
                        </div>
                        <div className="text-[#625d5b] text-[11px]">
                          {b.schedule} · {b.specialist}
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#f5f3f0] text-[#7b5808] font-semibold text-[10px]">
                      {b.bookingNumber}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Procedures */}
          {results.procedures.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#625d5b]">
                Procedures ({results.procedures.length})
              </div>
              <div className="flex flex-col gap-1">
                {results.procedures.map((pr) => (
                  <button
                    key={pr.id}
                    onClick={() => {
                      setCurrentTab('treatments');
                      openProcedureDrawer(pr.id);
                      setIsCommandPaletteOpen(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#f5f3f0] transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#7b5808] text-base">
                        medical_services
                      </span>
                      <div>
                        <div className="font-bold text-[#1b1c1a]">{pr.title}</div>
                        <div className="text-[#625d5b] text-[11px]">
                          {pr.id} · {pr.cpt} · {pr.duration}
                        </div>
                      </div>
                    </div>
                    <span className="font-bold text-[#7b5808]">{pr.fee}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Inventory */}
          {results.inventory.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#625d5b]">
                Inventory Items ({results.inventory.length})
              </div>
              <div className="flex flex-col gap-1">
                {results.inventory.map((inv) => (
                  <button
                    key={inv.id}
                    onClick={() => {
                      setCurrentTab('inventory');
                      openStockDrawer(inv);
                      setIsCommandPaletteOpen(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#f5f3f0] transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#7b5808] text-base">
                        inventory_2
                      </span>
                      <div>
                        <div className="font-bold text-[#1b1c1a]">{inv.name}</div>
                        <div className="text-[#625d5b] text-[11px]">
                          {inv.sku} · {inv.lotNumber} · {inv.storageLocation}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`font-semibold ${
                        inv.currentStock <= inv.minThreshold ? 'text-amber-700' : 'text-emerald-700'
                      }`}
                    >
                      {inv.currentStock} {inv.unitPkg}s
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
