import React, { useState, useMemo } from 'react';
import { useAuraPulse } from '../../context/AuraPulseContext';
import { ClientTier } from '../../types';

export const PatientsScreen: React.FC = () => {
  const {
    patients,
    openBookingDrawer,
    activeBookingDrawerId,
    setIsNewPatientModalOpen,
    showToast,
  } = useAuraPulse();

  const [activeTab, setActiveTab] = useState<'all' | 'vip' | 'active' | 'pending' | 'allergy'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('All Providers');
  const [statusFilter, setStatusFilter] = useState('Active');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      // Tab filter
      if (activeTab === 'vip') {
        if (p.tier !== 'VIP BLACK' && p.tier !== 'PLATINUM' && p.tier !== 'FOUNDER') return false;
      } else if (activeTab === 'active') {
        if (p.visitsCount < 3) return false;
      } else if (activeTab === 'pending') {
        if (p.consentsValid) return false;
      } else if (activeTab === 'allergy') {
        if (!p.clinicalAlerts.some((a) => a.type === 'allergy')) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesMrn = p.mrn.toLowerCase().includes(q);
        const matchesPhone = p.phone.includes(q);
        const matchesAllergy = p.clinicalAlerts.some((a) => a.label.toLowerCase().includes(q));
        if (!matchesName && !matchesMrn && !matchesPhone && !matchesAllergy) return false;
      }

      // Provider filter
      if (selectedProvider !== 'All Providers') {
        if (!p.clinician.includes(selectedProvider)) return false;
      }

      return true;
    });
  }, [patients, activeTab, searchQuery, selectedProvider]);

  const handleExport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['MRN,Name,Tier,Phone,Email,Visits,LastVisit,Clinician']
        .concat(
          patients.map(
            (p) =>
              `${p.mrn},"${p.name}",${p.tier},${p.phone},${p.email},${p.visitsCount},${p.lastVisitDate},"${p.clinician}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AuraPulse_Patient_Directory_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported Patient Directory CSV successfully');
  };

  return (
    <div className="flex flex-col w-full max-w-[1600px] mx-auto min-w-0">
      {/* Top Sub-Header & Breadcrumb Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 min-w-0">
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-[#625d5b] font-label-md text-[11px] uppercase tracking-wider min-w-0">
            <span className="shrink-0">Patients &amp; Clients</span>
            <span className="material-symbols-outlined text-xs shrink-0">chevron_right</span>
            <span className="text-[#7b5808] font-semibold truncate">Patient Records Directory</span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-3xl text-[#1b1c1a] tracking-tight truncate">
            Patients &amp; Client Management
          </h1>
          <p className="font-body-md text-sm text-[#4e4538] max-w-3xl line-clamp-2 sm:line-clamp-none">
            Comprehensive medical aesthetics dossiers, digital consents, clinical injection notes,
            polarized photo archives, and cross-branch care records.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f5f3f0] text-[#625d5b] font-label-sm text-[11px] border border-[#d2c5b2]/30 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-[#7b5808] animate-pulse shrink-0" />
            <span className="truncate">Cross-Branch EHR Sync: Active (3 Branches)</span>
          </div>

          <button
            id="exportDirectoryBtn"
            onClick={handleExport}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white hover:bg-[#efeeeb] text-[#1b1c1a] font-label-lg text-xs transition-all border border-[#d2c5b2]/40 shadow-xs active:scale-95 shrink-0"
          >
            <span className="material-symbols-outlined text-sm text-[#625d5b]">file_download</span>
            <span className="truncate">Export Directory</span>
          </button>

          <button
            id="newPatientBtn"
            onClick={() => setIsNewPatientModalOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#7b5808] text-white hover:bg-[#5e4200] font-label-lg text-xs transition-all shadow-md active:scale-95 shrink-0"
          >
            <span className="material-symbols-outlined text-sm">person_add</span>
            <span className="truncate">+ New Patient Registration</span>
          </button>
        </div>
      </div>

      {/* 4 Executive KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {/* KPI 1: Active Patients */}
        <div className="p-5 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-[10px] text-[#625d5b] uppercase tracking-widest font-bold">
              Active Patients
            </span>
            <span className="p-2 rounded-xl bg-[#f5f3f0] text-[#7b5808] material-symbols-outlined text-lg">
              group
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-3xl text-[#1b1c1a]">2,840</span>
            <span className="font-label-sm text-xs text-[#7b5808] font-semibold flex items-center">
              <span className="material-symbols-outlined text-xs">arrow_upward</span> +12% MoM
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[#625d5b] font-label-sm text-[11px]">
            <span>Retention Rate</span>
            <span className="text-[#1b1c1a] font-semibold">94.2%</span>
          </div>
          <div className="w-full bg-[#eae8e5] h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#b88e3e] h-full rounded-full" style={{ width: '94%' }} />
          </div>
        </div>

        {/* KPI 2: Consent Compliance */}
        <div className="p-5 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-[10px] text-[#625d5b] uppercase tracking-widest font-bold">
              Consent Compliance
            </span>
            <span className="p-2 rounded-xl bg-[#f5f3f0] text-[#7b5808] material-symbols-outlined text-lg">
              verified_user
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-3xl text-[#1b1c1a]">99.4%</span>
            <span className="font-label-sm text-[10px] px-1.5 py-0.5 rounded bg-[#eae8e5] text-[#625d5b] font-bold">
              18 Renewals Due
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[#625d5b] font-label-sm text-[11px]">
            <span>Digital E-Signature Status</span>
            <span className="text-[#1b1c1a] font-semibold">Legally Compliant</span>
          </div>
          <div className="w-full bg-[#eae8e5] h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#b88e3e] h-full rounded-full" style={{ width: '99.4%' }} />
          </div>
        </div>

        {/* KPI 3: Total Treatments Logged */}
        <div className="p-5 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-[10px] text-[#625d5b] uppercase tracking-widest font-bold">
              Total Treatments Logged
            </span>
            <span className="p-2 rounded-xl bg-[#f5f3f0] text-[#7b5808] material-symbols-outlined text-lg">
              medical_services
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-3xl text-[#1b1c1a]">8,920</span>
            <span className="font-label-sm text-xs text-[#7b5808] font-semibold flex items-center">
              Across 3 Branches
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[#625d5b] font-label-sm text-[11px]">
            <span>Avg. Courses / Patient</span>
            <span className="text-[#1b1c1a] font-semibold">3.14 Procedures</span>
          </div>
          <div className="w-full bg-[#eae8e5] h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#b88e3e] h-full rounded-full" style={{ width: '78%' }} />
          </div>
        </div>

        {/* KPI 4: VIP & Concierge Tier */}
        <div className="p-5 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-[10px] text-[#625d5b] uppercase tracking-widest font-bold">
              VIP &amp; Concierge Tier
            </span>
            <span className="p-2 rounded-xl bg-[#f5f3f0] text-[#7b5808] material-symbols-outlined text-lg">
              workspace_premium
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-3xl text-[#1b1c1a]">640</span>
            <span className="font-label-sm text-xs text-[#7b5808] font-semibold flex items-center">
              22.5% of Client Base
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[#625d5b] font-label-sm text-[11px]">
            <span>Black / Platinum Status</span>
            <span className="text-[#1b1c1a] font-semibold">312 Members</span>
          </div>
          <div className="w-full bg-[#eae8e5] h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#b88e3e] h-full rounded-full" style={{ width: '62%' }} />
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Belt */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          {/* Segmented Tier Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/30 overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-xs whitespace-nowrap transition-colors ${
                activeTab === 'all'
                  ? 'bg-white text-[#1b1c1a] font-semibold shadow-xs'
                  : 'text-[#625d5b] hover:text-[#1b1c1a]'
              }`}
            >
              All Clients (2,840)
            </button>
            <button
              onClick={() => setActiveTab('vip')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-xs whitespace-nowrap transition-colors ${
                activeTab === 'vip'
                  ? 'bg-white text-[#1b1c1a] font-semibold shadow-xs'
                  : 'text-[#625d5b] hover:text-[#1b1c1a]'
              }`}
            >
              VIP Black &amp; Platinum (312)
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-xs whitespace-nowrap transition-colors ${
                activeTab === 'active'
                  ? 'bg-white text-[#1b1c1a] font-semibold shadow-xs'
                  : 'text-[#625d5b] hover:text-[#1b1c1a]'
              }`}
            >
              Active Plans (1,140)
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-xs whitespace-nowrap transition-colors ${
                activeTab === 'pending'
                  ? 'bg-white text-[#1b1c1a] font-semibold shadow-xs'
                  : 'text-[#625d5b] hover:text-[#1b1c1a]'
              }`}
            >
              Pending Consent (18)
            </button>
            <button
              onClick={() => setActiveTab('allergy')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-xs whitespace-nowrap transition-colors ${
                activeTab === 'allergy'
                  ? 'bg-white text-[#1b1c1a] font-semibold shadow-xs'
                  : 'text-[#625d5b] hover:text-[#1b1c1a]'
              }`}
            >
              Allergy Flags (42)
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#625d5b]">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Click any patient row to preview booking dossier</span>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-3 rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[280px]">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#625d5b] text-sm">
              search
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="searchInput"
              placeholder="Search patients by name, MRN, phone, allergy... (Press ⌘K)"
              type="text"
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#f5f3f0] text-[#1b1c1a] font-body-sm text-xs placeholder:text-[#625d5b] focus:outline-none focus:bg-white border border-transparent focus:border-[#7b5808] transition-all"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#f5f3f0] hover:bg-[#eae8e5] text-[#625d5b] hover:text-[#1b1c1a] text-xs font-label-sm border border-[#d2c5b2]/30 transition-colors cursor-pointer outline-none"
            >
              <option>All Providers</option>
              <option>Dr. Claire Sterling</option>
              <option>Sarah Jenkins</option>
              <option>Dr. Marcus Vance</option>
              <option>Elena Rostova</option>
              <option>Chloe Dubois</option>
            </select>

            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#f5f3f0] hover:bg-[#eae8e5] text-[#625d5b] hover:text-[#1b1c1a] cursor-pointer text-xs font-label-sm border border-[#d2c5b2]/30 transition-colors">
              <span className="material-symbols-outlined text-sm text-[#7b5808]">domain</span>
              <span>Main Clinic (Branch A)</span>
              <span className="material-symbols-outlined text-xs">arrow_drop_down</span>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#f5f3f0] hover:bg-[#eae8e5] text-[#625d5b] hover:text-[#1b1c1a] cursor-pointer text-xs font-label-sm border border-[#d2c5b2]/30 transition-colors outline-none"
            >
              <option value="Active">Status: Active</option>
              <option value="All">Status: All</option>
              <option value="Pending">Status: Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patient Data Ledger Table */}
      <div className="rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs overflow-hidden flex flex-col mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f5f3f0]/70 text-[#625d5b] font-label-sm text-[11px] uppercase tracking-wider border-b border-[#d2c5b2]/30">
                <th className="py-3.5 px-5 font-semibold">Patient &amp; MRN</th>
                <th className="py-3.5 px-4 font-semibold">Demographics</th>
                <th className="py-3.5 px-4 font-semibold">Clinical Alerts</th>
                <th className="py-3.5 px-4 font-semibold">Last Visit &amp; Clinician</th>
                <th className="py-3.5 px-4 font-semibold">Consents</th>
                <th className="py-3.5 px-5 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d2c5b2]/20 text-xs font-body-sm" id="patientTableBody">
              {filteredPatients.map((p) => {
                const isSelected = activeBookingDrawerId === p.currentBookingId;
                return (
                  <tr
                    key={p.id}
                    onClick={() => {
                      if (p.currentBookingId) {
                        openBookingDrawer(p.currentBookingId);
                      }
                    }}
                    className={`patient-row hover:bg-[#b88e3e]/10 transition-colors cursor-pointer group ${
                      isSelected ? 'bg-[#b88e3e]/15 border-l-4 border-l-[#7b5808]' : ''
                    }`}
                  >
                    {/* Column 1: Patient & MRN */}
                    <td className="py-4 px-5 max-w-[240px]">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`relative w-10 h-10 rounded-full flex items-center justify-center font-headline-md font-bold text-sm border shadow-xs shrink-0 ${
                            p.avatarBg || 'bg-[#fbe7c4] text-[#7b5808] border-[#ecd2a0]'
                          }`}
                        >
                          {p.initials}
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="font-title-md text-sm text-[#1b1c1a] font-semibold group-hover:text-[#7b5808] transition-colors truncate max-w-[130px] sm:max-w-[180px]">
                              {p.name}
                            </span>
                            <span
                              className={`px-1.5 py-0.5 rounded font-label-sm text-[9px] font-bold uppercase tracking-wider shrink-0 ${
                                p.tier === 'VIP BLACK'
                                  ? 'bg-[#fae8c8] text-[#5e4200]'
                                  : p.tier === 'PLATINUM'
                                  ? 'bg-[#e4e2df] text-[#4e4538]'
                                  : p.tier === 'GOLD'
                                  ? 'bg-[#fceecf] text-[#7b5808]'
                                  : p.tier === 'FOUNDER'
                                  ? 'bg-[#30312f] text-[#f2f0ed]'
                                  : 'bg-[#e9e1dd] text-[#686361]'
                              }`}
                            >
                              {p.tier}
                            </span>
                          </div>
                          <span className="text-[#625d5b] font-label-sm text-[11px] truncate">
                            #{p.mrn} · {p.visitsCount} Visits
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Demographics */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-[#1b1c1a] font-medium truncate">{p.phone}</span>
                        <span className="text-[#625d5b] text-[11px] truncate">
                          {p.age} yrs · {p.gender} {p.pronouns ? `(${p.pronouns})` : ''}
                        </span>
                      </div>
                    </td>

                    {/* Column 3: Clinical Alerts */}
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                        {p.clinicalAlerts.length > 0 ? (
                          p.clinicalAlerts.map((alert, idx) => (
                            <span
                              key={idx}
                              className={`px-2 py-0.5 rounded font-label-sm text-[10px] flex items-center gap-1 font-medium truncate max-w-full ${
                                alert.type === 'allergy' || alert.type === 'warning'
                                  ? 'bg-[#ffdad6] text-[#93000a]'
                                  : 'bg-[#efeeeb] text-[#625d5b]'
                              }`}
                            >
                              {(alert.type === 'allergy' || alert.type === 'warning') && (
                                <span className="material-symbols-outlined text-[11px] shrink-0">warning</span>
                              )}
                              <span className="truncate">{alert.label}</span>
                            </span>
                          ))
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-[#efeeeb] text-[#625d5b] font-label-sm text-[10px] truncate">
                            No Known Allergies
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Column 4: Last Visit & Clinician */}
                    <td className="py-4 px-4 max-w-[180px]">
                      <div className="flex flex-col min-w-0">
                        <span className="text-[#1b1c1a] font-medium whitespace-nowrap">{p.lastVisitDate}</span>
                        <span className="text-[#7b5808] text-[11px] font-medium truncate" title={p.clinician}>
                          {p.clinician}
                        </span>
                      </div>
                    </td>

                    {/* Column 5: Consents */}
                    <td className="py-4 px-4">
                      {p.consentsValid ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#b88e3e]/15 text-[#7b5808] font-label-sm text-[10px] font-semibold">
                          <span className="material-symbols-outlined text-xs">verified</span>
                          All Valid ({p.consentsCount})
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] font-label-sm text-[10px] font-semibold">
                          <span className="material-symbols-outlined text-xs">pending_actions</span>
                          1 Renewal Due
                        </span>
                      )}
                    </td>

                    {/* Column 6: Action */}
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (p.currentBookingId) {
                            openBookingDrawer(p.currentBookingId);
                          } else {
                            showToast(`Opening clinical dossier for ${p.name}`);
                          }
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#f5f3f0] group-hover:bg-[#b88e3e] text-[#625d5b] group-hover:text-white text-xs font-semibold transition-all shadow-xs"
                      >
                        <span>View Dossier</span>
                        <span className="material-symbols-outlined text-base">chevron_right</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="p-4 bg-[#f5f3f0]/50 border-t border-[#d2c5b2]/30 flex items-center justify-between text-[#625d5b] font-label-md text-xs">
          <span>Showing 1–{filteredPatients.length} of 2,840 clinical records</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1 rounded hover:bg-[#efeeeb] text-[#625d5b] transition-colors"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <span className="px-2.5 py-1 rounded bg-white font-semibold text-[#1b1c1a] shadow-xs border border-[#d2c5b2]/30">
              {currentPage}
            </span>
            <span
              onClick={() => setCurrentPage(2)}
              className="px-2.5 py-1 hover:bg-[#efeeeb] cursor-pointer rounded transition-colors"
            >
              2
            </span>
            <span
              onClick={() => setCurrentPage(3)}
              className="px-2.5 py-1 hover:bg-[#efeeeb] cursor-pointer rounded transition-colors"
            >
              3
            </span>
            <span className="px-1.5">...</span>
            <span className="px-2 py-1 hover:bg-[#efeeeb] cursor-pointer rounded transition-colors">
              568
            </span>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-1 rounded hover:bg-[#efeeeb] text-[#625d5b] transition-colors"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cross-Branch Sync & Quick Status Note */}
      <div className="p-4 rounded-xl bg-[#f5f3f0] border border-[#d2c5b2]/30 flex items-center justify-between text-[#4e4538] font-label-sm text-xs">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#7b5808] text-base">cloud_done</span>
          <span>
            Records synchronized in real-time with Branch B (Downtown) and Branch C (Westside Pavilion).
          </span>
        </div>
        <button
          onClick={() => showToast('All 3 clinic branches synchronized at 10:45 AM today', 'info')}
          className="text-[#7b5808] hover:underline font-semibold flex items-center gap-1"
        >
          <span>Audit Logs</span>
          <span className="material-symbols-outlined text-xs">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
