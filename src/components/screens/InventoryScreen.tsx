import React, { useState, useMemo } from 'react';
import { useAuraPulse } from '../../context/AuraPulseContext';
import { InventoryItem } from '../../types';

export const InventoryScreen: React.FC = () => {
  const {
    inventory,
    stockAdjustments,
    openStockDrawer,
    activeStockDrawerItem,
    showToast,
  } = useAuraPulse();

  const [activeCategory, setActiveCategory] = useState<'all' | 'cold-chain' | 'low-stock' | 'fillers' | 'consumables'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('All Locations');

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      // Category tab
      if (activeCategory === 'cold-chain' && !item.coldChainRequired) return false;
      if (activeCategory === 'low-stock' && item.currentStock > item.minThreshold) return false;
      if (activeCategory === 'fillers' && item.category !== 'filler') return false;
      if (activeCategory === 'consumables' && item.category !== 'consumable') return false;

      // Location
      if (locationFilter !== 'All Locations') {
        if (!item.storageLocation.toLowerCase().includes(locationFilter.toLowerCase())) return false;
      }

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchSku = item.sku.toLowerCase().includes(q);
        const matchLot = item.lotNumber.toLowerCase().includes(q);
        const matchSupplier = item.supplier.toLowerCase().includes(q);
        if (!matchName && !matchSku && !matchLot && !matchSupplier) return false;
      }

      return true;
    });
  }, [inventory, activeCategory, locationFilter, searchQuery]);

  const lowStockCount = inventory.filter((i) => i.currentStock <= i.minThreshold).length;

  return (
    <div className="flex flex-col w-full max-w-[1600px] mx-auto min-w-0">
      {/* Header & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 min-w-0">
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-[#625d5b] font-label-md text-[11px] uppercase tracking-wider min-w-0">
            <span className="shrink-0">Operations &amp; Supply</span>
            <span className="material-symbols-outlined text-xs shrink-0">chevron_right</span>
            <span className="text-[#7b5808] font-semibold truncate">Cold-Chain &amp; Consumables</span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-3xl text-[#1b1c1a] tracking-tight truncate">
            Inventory &amp; Medical Supply Ledger
          </h1>
          <p className="font-body-md text-sm text-[#4e4538] max-w-3xl line-clamp-2 sm:line-clamp-none">
            Cold-chain pharmaceutical tracking (2–8°C), injectables batch verification, auto-reorder
            thresholds, and disposal audit logging.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f5f3f0] text-[#625d5b] font-label-sm text-[11px] border border-[#d2c5b2]/30 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
            <span className="truncate">Vault A: 3.4°C · Vault B: 2.8°C · Vault C: 3.1°C (Optimal)</span>
          </div>

          <button
            id="auditInventoryBtn"
            onClick={() => showToast('Cycle count audit mode started. Select item to reconcile.', 'info')}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white hover:bg-[#efeeeb] text-[#1b1c1a] font-label-lg text-xs transition-all border border-[#d2c5b2]/40 shadow-xs active:scale-95 shrink-0"
          >
            <span className="material-symbols-outlined text-sm text-[#625d5b]">verified_user</span>
            <span className="truncate">Audit Cycle Count</span>
          </button>

          <button
            id="receiveShipmentBtn"
            onClick={() => showToast('Opening PO & Supplier Inbound Scanner...', 'info')}
            className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#7b5808] text-white hover:bg-[#5e4200] font-label-lg text-xs transition-all shadow-md active:scale-95 shrink-0"
          >
            <span className="material-symbols-outlined text-sm">local_shipping</span>
            <span className="truncate">+ Inbound Stock Delivery</span>
          </button>
        </div>
      </div>

      {/* 4 Executive KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <div className="p-5 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-[10px] text-[#625d5b] uppercase tracking-widest font-bold">
              Total SKUs Tracked
            </span>
            <span className="p-2 rounded-xl bg-[#f5f3f0] text-[#7b5808] material-symbols-outlined text-lg">
              inventory_2
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-3xl text-[#1b1c1a]">184</span>
            <span className="font-label-sm text-xs text-[#7b5808] font-semibold">Across 3 Vaults</span>
          </div>
          <div className="mt-2 text-[#625d5b] font-label-sm text-[11px]">
            Active stock synced with EHR
          </div>
          <div className="w-full bg-[#eae8e5] h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#b88e3e] h-full rounded-full" style={{ width: '92%' }} />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-[10px] text-[#625d5b] uppercase tracking-widest font-bold">
              Cold-Chain Biologics
            </span>
            <span className="p-2 rounded-xl bg-[#f5f3f0] text-[#7b5808] material-symbols-outlined text-lg">
              ac_unit
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-3xl text-[#1b1c1a]">86 Vials</span>
            <span className="font-label-sm text-xs text-emerald-700 font-semibold">2–8°C Verified</span>
          </div>
          <div className="mt-2 text-[#625d5b] font-label-sm text-[11px]">
            100% Continuous IoT telemetry
          </div>
          <div className="w-full bg-[#eae8e5] h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: '100%' }} />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-[10px] text-[#625d5b] uppercase tracking-widest font-bold">
              Low Stock Alerts
            </span>
            <span className="p-2 rounded-xl bg-[#f5f3f0] text-amber-700 material-symbols-outlined text-lg">
              warning
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-3xl text-amber-700">{lowStockCount}</span>
            <span className="font-label-sm text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">
              Reorder Needed
            </span>
          </div>
          <div className="mt-2 text-[#625d5b] font-label-sm text-[11px]">
            Auto-PO drafts generated
          </div>
          <div className="w-full bg-[#eae8e5] h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-amber-600 h-full rounded-full" style={{ width: '35%' }} />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-[10px] text-[#625d5b] uppercase tracking-widest font-bold">
              Total Stock Valuation
            </span>
            <span className="p-2 rounded-xl bg-[#f5f3f0] text-[#7b5808] material-symbols-outlined text-lg">
              account_balance
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-3xl text-[#1b1c1a]">$148,250</span>
            <span className="font-label-sm text-xs text-[#7b5808] font-semibold">At Cost</span>
          </div>
          <div className="mt-2 text-[#625d5b] font-label-sm text-[11px]">
            Zero expired units detected
          </div>
          <div className="w-full bg-[#eae8e5] h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#b88e3e] h-full rounded-full" style={{ width: '78%' }} />
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Belt */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/30 overflow-x-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-xs whitespace-nowrap transition-colors ${
                activeCategory === 'all'
                  ? 'bg-white text-[#1b1c1a] font-semibold shadow-xs'
                  : 'text-[#625d5b] hover:text-[#1b1c1a]'
              }`}
            >
              All Inventory ({inventory.length})
            </button>
            <button
              onClick={() => setActiveCategory('cold-chain')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-xs whitespace-nowrap transition-colors ${
                activeCategory === 'cold-chain'
                  ? 'bg-white text-[#1b1c1a] font-semibold shadow-xs'
                  : 'text-[#625d5b] hover:text-[#1b1c1a]'
              }`}
            >
              Cold-Chain Biologics (2–8°C)
            </button>
            <button
              onClick={() => setActiveCategory('low-stock')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-xs whitespace-nowrap transition-colors ${
                activeCategory === 'low-stock'
                  ? 'bg-white text-[#1b1c1a] font-semibold shadow-xs'
                  : 'text-[#625d5b] hover:text-[#1b1c1a]'
              }`}
            >
              Low Stock Alerts ({lowStockCount})
            </button>
            <button
              onClick={() => setActiveCategory('fillers')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-xs whitespace-nowrap transition-colors ${
                activeCategory === 'fillers'
                  ? 'bg-white text-[#1b1c1a] font-semibold shadow-xs'
                  : 'text-[#625d5b] hover:text-[#1b1c1a]'
              }`}
            >
              Dermal Fillers
            </button>
            <button
              onClick={() => setActiveCategory('consumables')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-xs whitespace-nowrap transition-colors ${
                activeCategory === 'consumables'
                  ? 'bg-white text-[#1b1c1a] font-semibold shadow-xs'
                  : 'text-[#625d5b] hover:text-[#1b1c1a]'
              }`}
            >
              Consumables &amp; Tips
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#625d5b]">
            <span className="material-symbols-outlined text-xs text-[#7b5808]">tune</span>
            <span>Click any item row to log physical stock adjustment</span>
          </div>
        </div>

        {/* Search & Location Filter */}
        <div className="p-3 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[280px]">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#625d5b] text-sm">
              search
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name, SKU, lot/batch number, supplier..."
              type="text"
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#f5f3f0] text-[#1b1c1a] font-body-sm text-xs placeholder:text-[#625d5b] focus:outline-none focus:bg-white border border-transparent focus:border-[#7b5808] transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#f5f3f0] hover:bg-[#eae8e5] text-[#625d5b] hover:text-[#1b1c1a] text-xs font-label-sm border border-[#d2c5b2]/30 transition-colors cursor-pointer outline-none"
            >
              <option>All Locations</option>
              <option>Vault A</option>
              <option>Vault B</option>
              <option>Cabinet</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs overflow-hidden flex flex-col mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f5f3f0]/70 text-[#625d5b] font-label-sm text-[11px] uppercase tracking-wider border-b border-[#d2c5b2]/30">
                <th className="py-3.5 px-5 font-semibold">Product &amp; SKU</th>
                <th className="py-3.5 px-4 font-semibold">Storage Location</th>
                <th className="py-3.5 px-4 font-semibold">Cold-Chain</th>
                <th className="py-3.5 px-4 font-semibold">Current Count</th>
                <th className="py-3.5 px-4 font-semibold">Min. Safety Level</th>
                <th className="py-3.5 px-4 font-semibold">Lot &amp; Expiry</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-5 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d2c5b2]/20 text-xs font-body-sm">
              {filteredInventory.map((item) => {
                const isSelected = activeStockDrawerItem?.sku === item.sku;
                const isLow = item.currentStock <= item.minThreshold;

                return (
                  <tr
                    key={item.id}
                    onClick={() => openStockDrawer(item)}
                    className={`hover:bg-[#b88e3e]/10 transition-colors cursor-pointer group ${
                      isSelected ? 'bg-[#b88e3e]/15 border-l-4 border-l-[#7b5808]' : ''
                    }`}
                  >
                    {/* Product & SKU */}
                    <td className="py-4 px-5 max-w-[280px]">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-[#faf7f2] border border-[#e7e0d3] flex items-center justify-center text-[#7b5808] shrink-0 shadow-xs">
                          <span className="material-symbols-outlined text-lg">
                            {item.coldChainRequired ? 'vaccines' : 'inventory_2'}
                          </span>
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="font-semibold text-xs text-[#1b1c1a] group-hover:text-[#7b5808] truncate max-w-[180px]" title={item.name}>
                              {item.name}
                            </span>
                            {item.coldChainRequired && (
                              <span
                                className="material-symbols-outlined text-blue-600 text-xs shrink-0"
                                title="Cold Chain Required (2–8°C)"
                              >
                                ac_unit
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-[10px] text-[#7b5808] font-bold truncate">
                            {item.sku} · {item.supplier}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Storage Location */}
                    <td className="py-4 px-4">
                      <span className="text-[#1b1c1a] font-medium">{item.storageLocation}</span>
                    </td>

                    {/* Cold Chain */}
                    <td className="py-4 px-4">
                      {item.coldChainRequired ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-label-sm text-[10px] font-bold">
                          <span className="material-symbols-outlined text-xs">ac_unit</span>
                          2–8°C Logged
                        </span>
                      ) : (
                        <span className="text-[#625d5b] text-[11px]">Room Temp</span>
                      )}
                    </td>

                    {/* Current Count */}
                    <td className="py-4 px-4">
                      <span
                        className={`font-metric-val font-bold text-sm ${
                          isLow ? 'text-amber-700' : 'text-[#1b1c1a]'
                        }`}
                      >
                        {item.currentStock}{' '}
                        <span className="text-xs font-normal text-[#625d5b]">{item.unitPkg}s</span>
                      </span>
                    </td>

                    {/* Min. Safety Level */}
                    <td className="py-4 px-4">
                      <span className="text-[#625d5b] font-medium">
                        {item.minThreshold} {item.unitPkg}s
                      </span>
                    </td>

                    {/* Lot & Expiry */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-mono text-[11px] text-[#1b1c1a] font-bold">
                          {item.lotNumber}
                        </span>
                        <span className="text-[10px] text-[#625d5b]">Exp: {item.expiryDate}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      {item.currentStock === 0 ? (
                        <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[10px]">
                          Out of Stock
                        </span>
                      ) : isLow ? (
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px] flex items-center gap-1 w-fit">
                          <span className="material-symbols-outlined text-xs">warning</span>
                          Low Stock
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          Adequate
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openStockDrawer(item);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#f5f3f0] hover:bg-[#b88e3e] text-[#625d5b] hover:text-white text-xs font-semibold transition-all shadow-xs"
                      >
                        Adjust Stock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Adjustment Ledger Section */}
      {stockAdjustments.length > 0 && (
        <div className="p-5 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col gap-3 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#7b5808] text-base">history</span>
              <h3 className="font-headline-sm text-sm font-bold text-[#1b1c1a]">
                Recent Physical Stock Adjustments &amp; Audit Trail
              </h3>
            </div>
            <span className="text-[11px] text-[#625d5b]">
              Compliance verified under FDA Title 21 CFR Part 11
            </span>
          </div>

          <div className="divide-y divide-[#eae8e5] border border-[#eee9e0] rounded-xl overflow-hidden bg-[#faf8f5]">
            {stockAdjustments.slice(0, 5).map((adj, idx) => (
              <div key={idx} className="p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[#7b5808] font-bold">{adj.sku}</span>
                  <span className="font-semibold text-[#1b1c1a]">{adj.productName}</span>
                  <span className="text-[#625d5b]">
                    Count changed from {adj.previousCount} → <strong>{adj.newCount}</strong>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 text-[10px]">
                    {adj.reason}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#625d5b] text-[11px]">
                  <span>Verified by {adj.verifiedBy}</span>
                  <span>{new Date(adj.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
