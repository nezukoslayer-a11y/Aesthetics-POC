import React, { useState, useMemo } from 'react';
import { useAuraPulse } from '../../context/AuraPulseContext';
import { ProcedureCategory } from '../../types';

export const TreatmentsScreen: React.FC = () => {
  const {
    procedures,
    openProcedureDrawer,
    activeProcedureDrawerId,
    setIsNewTreatmentModalOpen,
    showToast,
  } = useAuraPulse();

  const [activeCategory, setActiveCategory] = useState<'all' | ProcedureCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [credentialFilter, setCredentialFilter] = useState('All Credentials');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const procedureList = useMemo(() => Object.values(procedures), [procedures]);

  const filteredProcedures = useMemo(() => {
    return procedureList.filter((p) => {
      // Category
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;

      // Credential
      if (credentialFilter !== 'All Credentials') {
        if (!p.eligibility.toLowerCase().includes(credentialFilter.toLowerCase())) return false;
      }

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchId = p.id.toLowerCase().includes(q);
        const matchCpt = p.cpt.toLowerCase().includes(q);
        const matchModality = p.modality.toLowerCase().includes(q);
        if (!matchTitle && !matchId && !matchCpt && !matchModality) return false;
      }

      return true;
    });
  }, [procedureList, activeCategory, credentialFilter, searchQuery]);

  return (
    <div className="flex flex-col w-full max-w-[1600px] mx-auto">
      {/* Header & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[#625d5b] font-label-md text-[11px] uppercase tracking-wider">
            <span>Clinical Core</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-[#7b5808] font-semibold">Master Procedure Protocols</span>
          </div>
          <h1 className="font-headline-lg text-3xl text-[#1b1c1a] tracking-tight">
            Service &amp; Procedure Protocols
          </h1>
          <p className="font-body-md text-sm text-[#4e4538] max-w-3xl">
            Standardized clinical pathways, energy device parameters, consumable BOM deduction, CPT
            billing rules, and multi-branch fee schedules.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f5f3f0] text-[#625d5b] font-label-sm text-[11px] border border-[#d2c5b2]/30">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>48 Protocols Validated Across 3 Facilities</span>
          </div>

          <button
            id="newTreatmentBtn"
            onClick={() => setIsNewTreatmentModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7b5808] text-white hover:bg-[#5e4200] font-label-lg text-xs transition-all shadow-md active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">add_circle</span>
            <span>+ New Procedure Protocol</span>
          </button>
        </div>
      </div>

      {/* 4 Executive KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <div className="p-5 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-[10px] text-[#625d5b] uppercase tracking-widest font-bold">
              Active Protocols
            </span>
            <span className="p-2 rounded-xl bg-[#f5f3f0] text-[#7b5808] material-symbols-outlined text-lg">
              medical_services
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-3xl text-[#1b1c1a]">48</span>
            <span className="font-label-sm text-xs text-[#7b5808] font-semibold">100% EHR Mapped</span>
          </div>
          <div className="mt-2 text-[#625d5b] font-label-sm text-[11px]">
            12 Laser · 18 Injectables · 12 Facials
          </div>
          <div className="w-full bg-[#eae8e5] h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#b88e3e] h-full rounded-full" style={{ width: '100%' }} />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-[10px] text-[#625d5b] uppercase tracking-widest font-bold">
              Avg. Treatment Margin
            </span>
            <span className="p-2 rounded-xl bg-[#f5f3f0] text-[#7b5808] material-symbols-outlined text-lg">
              trending_up
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-3xl text-[#1b1c1a]">74.2%</span>
            <span className="font-label-sm text-xs text-emerald-700 font-semibold">+3.8% QoQ</span>
          </div>
          <div className="mt-2 text-[#625d5b] font-label-sm text-[11px]">
            Consumable COGS strictly tracked
          </div>
          <div className="w-full bg-[#eae8e5] h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: '74%' }} />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-[10px] text-[#625d5b] uppercase tracking-widest font-bold">
              Certified Providers
            </span>
            <span className="p-2 rounded-xl bg-[#f5f3f0] text-[#7b5808] material-symbols-outlined text-lg">
              verified
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-3xl text-[#1b1c1a]">14</span>
            <span className="font-label-sm text-xs text-[#7b5808] font-semibold">Active Credentials</span>
          </div>
          <div className="mt-2 text-[#625d5b] font-label-sm text-[11px]">
            4 MD/DO · 4 RN/NP · 6 LE
          </div>
          <div className="w-full bg-[#eae8e5] h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#b88e3e] h-full rounded-full" style={{ width: '85%' }} />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-[10px] text-[#625d5b] uppercase tracking-widest font-bold">
              Annual Protocol Revenue
            </span>
            <span className="p-2 rounded-xl bg-[#f5f3f0] text-[#7b5808] material-symbols-outlined text-lg">
              payments
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-3xl text-[#1b1c1a]">$1.42M</span>
            <span className="font-label-sm text-xs text-[#7b5808] font-semibold">Projected</span>
          </div>
          <div className="mt-2 text-[#625d5b] font-label-sm text-[11px]">
            Across 3 branch facilities
          </div>
          <div className="w-full bg-[#eae8e5] h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#b88e3e] h-full rounded-full" style={{ width: '70%' }} />
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Belt */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/30 overflow-x-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-xs whitespace-nowrap transition-colors ${
                activeCategory === 'all'
                  ? 'bg-white text-[#1b1c1a] font-semibold shadow-xs'
                  : 'text-[#625d5b] hover:text-[#1b1c1a]'
              }`}
            >
              All Protocols ({procedureList.length})
            </button>
            <button
              onClick={() => setActiveCategory('laser-light')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-xs whitespace-nowrap transition-colors ${
                activeCategory === 'laser-light'
                  ? 'bg-white text-[#1b1c1a] font-semibold shadow-xs'
                  : 'text-[#625d5b] hover:text-[#1b1c1a]'
              }`}
            >
              Laser &amp; Light
            </button>
            <button
              onClick={() => setActiveCategory('injectables')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-xs whitespace-nowrap transition-colors ${
                activeCategory === 'injectables'
                  ? 'bg-white text-[#1b1c1a] font-semibold shadow-xs'
                  : 'text-[#625d5b] hover:text-[#1b1c1a]'
              }`}
            >
              Injectables &amp; Toxins
            </button>
            <button
              onClick={() => setActiveCategory('facials')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-xs whitespace-nowrap transition-colors ${
                activeCategory === 'facials'
                  ? 'bg-white text-[#1b1c1a] font-semibold shadow-xs'
                  : 'text-[#625d5b] hover:text-[#1b1c1a]'
              }`}
            >
              Clinical Facials
            </button>
            <button
              onClick={() => setActiveCategory('body-contouring')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-xs whitespace-nowrap transition-colors ${
                activeCategory === 'body-contouring'
                  ? 'bg-white text-[#1b1c1a] font-semibold shadow-xs'
                  : 'text-[#625d5b] hover:text-[#1b1c1a]'
              }`}
            >
              Body Contouring
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg border transition-colors ${
                viewMode === 'cards'
                  ? 'bg-[#7b5808] text-white border-[#7b5808]'
                  : 'bg-white text-[#625d5b] border-[#d2c5b2]/40'
              }`}
              title="Card Grid View"
            >
              <span className="material-symbols-outlined text-sm">grid_view</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg border transition-colors ${
                viewMode === 'table'
                  ? 'bg-[#7b5808] text-white border-[#7b5808]'
                  : 'bg-white text-[#625d5b] border-[#d2c5b2]/40'
              }`}
              title="Table View"
            >
              <span className="material-symbols-outlined text-sm">view_list</span>
            </button>
          </div>
        </div>

        {/* Search & Provider Credential selector */}
        <div className="p-3 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[280px]">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#625d5b] text-sm">
              search
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by procedure name, CPT code, modality, consumables..."
              type="text"
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#f5f3f0] text-[#1b1c1a] font-body-sm text-xs placeholder:text-[#625d5b] focus:outline-none focus:bg-white border border-transparent focus:border-[#7b5808] transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={credentialFilter}
              onChange={(e) => setCredentialFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#f5f3f0] hover:bg-[#eae8e5] text-[#625d5b] hover:text-[#1b1c1a] text-xs font-label-sm border border-[#d2c5b2]/30 transition-colors cursor-pointer outline-none"
            >
              <option>All Credentials</option>
              <option value="MD">MD / DO Only</option>
              <option value="RN">RN / NP Certified</option>
              <option value="Esthetician">Licensed Esthetician</option>
            </select>
          </div>
        </div>
      </div>

      {/* Catalog Display */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
          {filteredProcedures.map((proc) => {
            const isSelected = activeProcedureDrawerId === proc.id;
            const monogram = proc.title
              .split(' ')
              .slice(0, 2)
              .map((w) => w[0])
              .join('')
              .toUpperCase();

            return (
              <div
                key={proc.id}
                onClick={() => openProcedureDrawer(proc.id)}
                className={`p-5 rounded-2xl bg-white border border-[#d2c5b2]/30 shadow-xs hover:shadow-md hover:border-[#b88e3e] transition-all cursor-pointer flex flex-col justify-between group relative ${
                  isSelected ? 'ring-2 ring-[#7b5808] bg-[#fbf9f6]' : ''
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-12 h-12 rounded-xl bg-[#ffdea8]/50 border border-[#b88e3e]/30 text-[#7b5808] font-bold flex items-center justify-center font-headline-sm text-sm shadow-xs">
                        {monogram}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] font-bold text-[#7b5808] uppercase tracking-wider">
                          #{proc.id}
                        </span>
                        <h3 className="font-title-md text-sm font-bold text-[#1b1c1a] group-hover:text-[#7b5808] transition-colors leading-snug">
                          {proc.title}
                        </h3>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-label-sm text-[10px] font-bold">
                      {proc.status.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-xs text-[#625d5b] mb-3 line-clamp-2">
                    <span className="font-semibold text-[#1b1c1a]">{proc.cpt}</span> · {proc.modality}
                  </p>

                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#faf8f5] border border-[#eee9e0] text-xs mb-3">
                    <div>
                      <span className="text-[10px] text-[#625d5b] uppercase font-bold block">
                        Duration
                      </span>
                      <span className="font-semibold text-[#1b1c1a]">{proc.duration}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#625d5b] uppercase font-bold block">
                        Base Fee
                      </span>
                      <span className="font-bold text-[#7b5808]">{proc.fee}</span>
                    </div>
                    <div className="pt-2 border-t border-[#eee9e0]">
                      <span className="text-[10px] text-[#625d5b] uppercase font-bold block">
                        Eligibility
                      </span>
                      <span className="font-medium text-[#1b1c1a]">{proc.eligibility}</span>
                    </div>
                    <div className="pt-2 border-t border-[#eee9e0]">
                      <span className="text-[10px] text-[#625d5b] uppercase font-bold block">
                        COGS
                      </span>
                      <span className="font-medium text-[#625d5b]">{proc.consumablesCogs}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#eee9e0] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#625d5b]">
                    {proc.consumablesCount} Consumables Linked
                  </span>
                  <span className="font-label-sm text-[#7b5808] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Protocol Spec</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs overflow-hidden mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f5f3f0]/70 text-[#625d5b] font-label-sm text-[11px] uppercase tracking-wider border-b border-[#d2c5b2]/30">
                <th className="py-3.5 px-5 font-semibold">Protocol ID &amp; Name</th>
                <th className="py-3.5 px-4 font-semibold">Modality &amp; CPT</th>
                <th className="py-3.5 px-4 font-semibold">Duration &amp; Prep</th>
                <th className="py-3.5 px-4 font-semibold">Base Fee Schedule</th>
                <th className="py-3.5 px-4 font-semibold">Provider Eligibility</th>
                <th className="py-3.5 px-5 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d2c5b2]/20 text-xs font-body-sm">
              {filteredProcedures.map((proc) => (
                <tr
                  key={proc.id}
                  onClick={() => openProcedureDrawer(proc.id)}
                  className="hover:bg-[#b88e3e]/10 transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-5">
                    <div className="flex flex-col">
                      <span className="font-semibold text-xs text-[#1b1c1a] group-hover:text-[#7b5808]">
                        {proc.title}
                      </span>
                      <span className="font-mono text-[10px] text-[#7b5808] font-bold">
                        #{proc.id}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-[#1b1c1a]">{proc.modality}</span>
                      <span className="text-[#625d5b] text-[11px]">{proc.cpt}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-[#1b1c1a]">{proc.duration}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-[#7b5808]">{proc.fee}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded bg-[#efeeeb] text-[#4e4538] font-label-sm text-[10px]">
                      {proc.eligibility}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openProcedureDrawer(proc.id);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#f5f3f0] hover:bg-[#b88e3e] text-[#625d5b] hover:text-white text-[11px] font-semibold transition-colors"
                    >
                      Configure Protocol
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
