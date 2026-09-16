import React from 'react';
import { useAuraPulse } from '../context/AuraPulseContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useAuraPulse();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto px-4 py-3 rounded-xl shadow-2xl border flex items-center gap-3 text-xs font-medium max-w-md animate-in slide-in-from-bottom-2 fade-in duration-200 ${
            t.type === 'error'
              ? 'bg-rose-900 text-white border-rose-700'
              : t.type === 'warning'
              ? 'bg-amber-900 text-white border-amber-700'
              : t.type === 'info'
              ? 'bg-stone-900 text-white border-stone-700'
              : 'bg-[#1b1c1a] text-white border-[#7b5808]/60'
          }`}
        >
          <span className="material-symbols-outlined text-base text-[#ffdea8]">
            {t.type === 'error'
              ? 'error'
              : t.type === 'warning'
              ? 'warning'
              : t.type === 'info'
              ? 'info'
              : 'check_circle'}
          </span>
          <span className="flex-1">{t.message}</span>
          <button
            onClick={() => dismissToast(t.id)}
            className="text-stone-400 hover:text-white p-0.5"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};
