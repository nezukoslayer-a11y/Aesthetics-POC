import React, { useState, useEffect } from 'react';
import { useAuraPulse } from '../context/AuraPulseContext';

export const StockAdjustmentDrawer: React.FC = () => {
  const {
    activeStockDrawerItem,
    closeStockDrawer,
    adjustStock,
  } = useAuraPulse();

  const [qty, setQty] = useState<number>(0);
  const [reason, setReason] = useState('Routine Physical Cycle Count Reconciliation');
  const [note, setNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (activeStockDrawerItem) {
      setQty(activeStockDrawerItem.currentStock);
      setNote('');
    }
  }, [activeStockDrawerItem]);

  if (!activeStockDrawerItem) return null;

  const item = activeStockDrawerItem;

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      adjustStock(item.sku, qty, reason, note);
      setIsSaving(false);
    }, 400);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        id="stockDrawerBackdrop"
        onClick={closeStockDrawer}
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 transition-opacity"
      />

      {/* Drawer */}
      <aside
        id="stockDrawer"
        aria-label="Stock Adjustment Side Sheet"
        className="fixed inset-y-0 right-0 max-w-full flex pl-10 z-50 transition-transform duration-300 ease-out"
      >
        <div className="w-screen max-w-lg bg-white border-l border-[#e7e0d3] shadow-[0_4px_30px_rgba(0,0,0,0.15)] flex flex-col justify-between overflow-y-auto">
          {/* Header */}
          <div className="p-6 pb-4 border-b border-[#e7e0d3] flex items-start justify-between sticky top-0 bg-white z-10">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b88e3e] text-2xl">tune</span>
                <h2 className="font-headline-md text-xl text-[#1c1917]">Stock Level Adjustment</h2>
              </div>
              <p className="font-body-sm text-xs text-[#78716c]">
                Log cycle count variance, damaged inventory, or treatment suite transfers.
              </p>
            </div>
            <button
              id="closeStockDrawerBtn"
              onClick={closeStockDrawer}
              title="Close"
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#f5f3f0] text-[#78716c] hover:text-[#1c1917] transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Body content */}
          <div className="p-6 flex flex-col gap-4 flex-1 text-xs">
            {/* Selected Item Banner */}
            <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#e7e0d3] flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-800 font-mono text-[10px] font-bold tracking-wide uppercase">
                    Audit Status
                  </span>
                  <span
                    id="drawerProductCode"
                    className="font-mono text-xs font-semibold text-[#b88e3e]"
                  >
                    {item.sku}
                  </span>
                </div>
                <span className="font-label-sm text-[11px] text-[#78716c] font-medium">
                  Threshold: <strong className="text-[#1c1917]">{item.minThreshold} {item.unitPkg}s</strong>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#e7e0d3] flex items-center justify-center text-[#b88e3e] shadow-xs shrink-0">
                  <span className="material-symbols-outlined text-xl">
                    {item.coldChainRequired ? 'vaccines' : 'inventory_2'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span
                      id="drawerProductName"
                      className="font-headline-sm text-sm font-semibold text-[#1c1917]"
                    >
                      {item.name}
                    </span>
                    {item.coldChainRequired && (
                      <span
                        className="material-symbols-outlined text-[#b88e3e] text-sm"
                        title="Cold Chain Required (2-8°C)"
                      >
                        ac_unit
                      </span>
                    )}
                  </div>
                  <span className="font-body-sm text-[11px] text-[#57534e]">
                    {item.supplier} · {item.storageLocation} ·{' '}
                    <span
                      id="drawerCurrentStock"
                      className={`font-semibold ${
                        item.currentStock <= item.minThreshold ? 'text-amber-700' : 'text-emerald-700'
                      }`}
                    >
                      {item.currentStock} {item.unitPkg}s on hand
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Adjustment Reason */}
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-[11px] font-semibold text-[#1c1917]">
                Adjustment Reason
              </label>
              <div className="relative">
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-[#f5f3f0] border border-[#e7e0d3] font-body-sm text-xs text-[#1c1917] appearance-none outline-none focus:border-[#b88e3e] focus:ring-1 focus:ring-[#b88e3e]/30"
                >
                  <option>Routine Physical Cycle Count Reconciliation</option>
                  <option>Damaged or Broken Container</option>
                  <option>Treatment Suite Transfer / Consumed in Procedure</option>
                  <option>Lot Expiry Disposal</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#78716c] pointer-events-none text-base">
                  expand_more
                </span>
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label className="font-label-sm text-[11px] font-bold text-[#1c1917]">
                  Adjusted Physical Count ({item.unitPkg})
                </label>
                <span className="font-label-sm text-[11px] text-[#78716c] font-medium">
                  System Count: {item.currentStock}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  id="stepDownBtn"
                  type="button"
                  onClick={() => setQty((prev) => Math.max(0, prev - 1))}
                  className="w-10 h-10 rounded-lg bg-[#f5f3f0] border border-[#e7e0d3] hover:bg-[#efeeeb] flex items-center justify-center text-[#1c1917] font-bold text-lg transition-colors active:scale-95"
                >
                  -
                </button>
                <div className="relative flex-1">
                  <input
                    id="qtyInput"
                    type="number"
                    min="0"
                    value={qty}
                    onChange={(e) => setQty(Math.max(0, parseInt(e.target.value, 10) || 0))}
                    className="w-full h-10 text-center font-metric-val text-xl font-bold text-[#1c1917] bg-[#f5f3f0] border border-[#e7e0d3] rounded-lg outline-none focus:border-[#b88e3e] focus:ring-1 focus:ring-[#b88e3e]/30"
                  />
                  <span className="absolute right-3 top-2.5 font-label-sm text-[10px] text-[#78716c]">
                    {qty === item.currentStock ? 'Current' : qty > item.currentStock ? `+${qty - item.currentStock}` : `${qty - item.currentStock}`}
                  </span>
                </div>
                <button
                  id="stepUpBtn"
                  type="button"
                  onClick={() => setQty((prev) => prev + 1)}
                  className="w-10 h-10 rounded-lg bg-[#f5f3f0] border border-[#e7e0d3] hover:bg-[#efeeeb] flex items-center justify-center text-[#1c1917] font-bold text-lg transition-colors active:scale-95"
                >
                  +
                </button>
              </div>
            </div>

            {/* Batch & Storage Details */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-[11px] font-semibold text-[#1c1917]">
                  Lot / Batch Number
                </label>
                <div className="h-10 px-3 rounded-lg bg-[#f5f3f0] border border-[#e7e0d3] flex items-center justify-between font-mono text-xs text-[#1c1917] font-bold">
                  <span>{item.lotNumber}</span>
                  <span className="material-symbols-outlined text-xs text-[#78716c]">tag</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-[11px] font-semibold text-[#1c1917]">
                  Storage Location
                </label>
                <div className="h-10 px-3 rounded-lg bg-[#f5f3f0] border border-[#e7e0d3] flex items-center gap-1.5 font-body-sm text-xs text-[#1c1917] truncate">
                  <span className="material-symbols-outlined text-sm text-[#b88e3e]">warehouse</span>
                  <span className="truncate text-[11px] font-medium">{item.storageLocation}</span>
                </div>
              </div>
            </div>

            {/* Notes & Clinical Annotation */}
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-[11px] font-semibold text-[#1c1917]">
                Clinical / Inventory Note
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Add optional reconciliation note for audit compliance..."
                className="w-full p-3 rounded-lg bg-[#f5f3f0] border border-[#e7e0d3] font-body-sm text-xs text-[#1c1917] outline-none focus:border-[#b88e3e] focus:ring-1 focus:ring-[#b88e3e]/30 resize-none"
              />
            </div>

            {/* Logged By Supervisor */}
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-[11px] font-semibold text-[#1c1917]">
                Verified By Clinical Supervisor
              </label>
              <div className="h-10 px-3 rounded-lg bg-[#f5f3f0] border border-[#e7e0d3] flex items-center justify-between text-xs text-[#1c1917]">
                <div className="flex items-center gap-2">
                  <img
                    alt="Dr. Claire Sterling MD"
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-[#b88e3e]/40"
                    src="https://lh3.googleusercontent.com/aida/AEtjO1XZDHS5SKJODrrMhiemPWzhsuJ7bpgGyV1_TuMZNgBdI6Yym1y5TVVrnh9jP6rkaBF00GUlBZewsrtEdogfyzkpx7llxLUQ7Jeo9UqICfHhZa8BR8Vlz8Ck84-OCNsL41pYJQVJDW5oQFmJVPKAPwS16lMHnMviiSj8xhuBu57E3qkYc1tb_OX_XeFaXjbJdwDV9A3yt1_j58sGuavBRWamjzqlFk1n5jEY7m0bBRg2J3lpLB7KSe776Q"
                  />
                  <span className="font-semibold text-xs">Dr. Claire Sterling, MD</span>
                </div>
                <span className="font-label-sm text-[10px] text-[#15803d] font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">verified</span> Authenticated
                </span>
              </div>
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="p-6 border-t border-[#e7e0d3] bg-white sticky bottom-0 z-10 flex items-center gap-3">
            <button
              id="cancelStockDrawerBtn"
              type="button"
              onClick={closeStockDrawer}
              className="px-4 h-10 rounded-lg bg-[#f5f3f0] border border-[#e7e0d3] hover:bg-[#efeeeb] text-[#1c1917] font-label-md text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              id="confirmStockDrawerBtn"
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 h-10 rounded-lg bg-[#b88e3e] hover:bg-[#a57d30] text-white font-label-md text-xs font-semibold transition-all shadow-[0_2px_12px_rgba(184,142,62,0.25)] flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">
                {isSaving ? 'refresh' : 'check'}
              </span>
              <span>{isSaving ? 'Processing...' : 'Save Adjustment'}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
