import React, { useState } from 'react';
import { useAuraPulse } from '../../context/AuraPulseContext';

export const InvoicingScreen: React.FC = () => {
  const { showToast } = useAuraPulse();

  const invoices = [
    {
      id: 'INV-2024-089',
      patient: 'Vivian Sinclair',
      tier: 'VIP BLACK',
      treatment: 'HydraFacial Deluxe + Dermaplane',
      amount: '$385.00',
      deposit: '$100.00 Paid',
      balance: '$285.00',
      status: 'Paid in Full',
      date: 'Oct 24, 2024',
      method: 'Amex •••• 9012',
    },
    {
      id: 'INV-2024-088',
      patient: 'Charlotte Montgomery',
      tier: 'PLATINUM',
      treatment: 'Laser Skin Resurfacing (Fractional CO2)',
      amount: '$1,200.00',
      deposit: '$300.00 Paid',
      balance: '$900.00',
      status: 'Deposit Paid',
      date: 'Oct 24, 2024',
      method: 'Visa •••• 4421',
    },
    {
      id: 'INV-2024-087',
      patient: 'Sofia Al-Mansoor',
      tier: 'GOLD',
      treatment: 'Botox Cosmetic Glabellar (24 Units)',
      amount: '$360.00',
      deposit: '$50.00 Paid',
      balance: '$310.00',
      status: 'Paid in Full',
      date: 'Oct 23, 2024',
      method: 'Mastercard •••• 1180',
    },
    {
      id: 'INV-2024-086',
      patient: 'Vivian Chen',
      tier: 'VIP BLACK',
      treatment: 'DiamondGlow Exfoliation + LED',
      amount: '$275.00',
      deposit: '$75.00 Paid',
      balance: '$200.00',
      status: 'Pending Checkout',
      date: 'Oct 23, 2024',
      method: 'Apple Pay',
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-[1600px] mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-[#625d5b] font-label-md text-[11px] uppercase tracking-wider">
            <span>Finance &amp; Merchant</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-[#7b5808] font-semibold">Invoicing &amp; Billing Ledger</span>
          </div>
          <h1 className="font-headline-lg text-3xl text-[#1b1c1a] tracking-tight">
            Invoicing, Superbills &amp; Merchant Processing
          </h1>
          <p className="font-body-md text-sm text-[#4e4538] max-w-3xl">
            Compliant aesthetic payment gateway, tokenized card vault, automated deposit capture, and
            detailed clinical superbills.
          </p>
        </div>

        <button
          onClick={() => showToast('Superbill batch export generated for billing portal', 'success')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7b5808] text-white hover:bg-[#5e4200] text-xs font-semibold shadow-md active:scale-95"
        >
          <span className="material-symbols-outlined text-sm">receipt_long</span>
          <span>Batch Export Superbills</span>
        </button>
      </div>

      <div className="rounded-xl bg-white border border-[#d2c5b2]/30 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f5f3f0]/70 text-[#625d5b] font-label-sm text-[11px] uppercase tracking-wider border-b border-[#d2c5b2]/30">
              <th className="py-3.5 px-5 font-semibold">Invoice ID &amp; Date</th>
              <th className="py-3.5 px-4 font-semibold">Patient &amp; Tier</th>
              <th className="py-3.5 px-4 font-semibold">Procedure Protocol</th>
              <th className="py-3.5 px-4 font-semibold">Total Amount</th>
              <th className="py-3.5 px-4 font-semibold">Deposit Captured</th>
              <th className="py-3.5 px-4 font-semibold">Status</th>
              <th className="py-3.5 px-5 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#d2c5b2]/20 text-xs font-body-sm">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-[#b88e3e]/10 transition-colors">
                <td className="py-4 px-5">
                  <div className="flex flex-col">
                    <span className="font-mono text-xs font-bold text-[#7b5808]">{inv.id}</span>
                    <span className="text-[11px] text-[#625d5b]">{inv.date}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs text-[#1b1c1a]">{inv.patient}</span>
                    <span className="text-[10px] text-[#7b5808] font-bold">{inv.tier}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="font-medium text-[#1b1c1a]">{inv.treatment}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="font-headline-sm font-bold text-sm text-[#1b1c1a]">
                    {inv.amount}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-emerald-700 font-semibold">{inv.deposit}</span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      inv.status === 'Paid in Full'
                        ? 'bg-emerald-100 text-emerald-800'
                        : inv.status === 'Deposit Paid'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="py-4 px-5 text-right">
                  <button
                    onClick={() => showToast(`Receipt & Superbill printed for ${inv.id}`)}
                    className="px-3 py-1.5 rounded-lg bg-[#f5f3f0] hover:bg-[#b88e3e] text-[#625d5b] hover:text-white text-xs font-semibold transition-colors"
                  >
                    Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
