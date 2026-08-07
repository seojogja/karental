import React from 'react';
import { useApp } from '../context/AppContext';
import { Tag, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';

export const PromoPage: React.FC = () => {
  const { promos, openBookingModal, cars } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-sans">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-black uppercase tracking-wider text-[var(--theme-color)]">Penawaran Spesial</span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-poppins">
          Promo & Diskon Rental Mobil
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Gunakan kode voucher promo resmi Karental untuk pengalaman rental mobil lebih hemat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promos.map((p) => (
          <div key={p.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between">
            <div>
              <img src={p.bannerImage} alt={p.title} className="w-full h-44 object-cover" referrerPolicy="no-referrer" />
              <div className="p-6 space-y-3">
                <span className="bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  Diskon {p.discountPercentage}%
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base font-poppins">{p.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{p.description}</p>
                
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Kode Voucher:</span>
                  <span className="font-mono font-black text-[var(--theme-color)] text-sm bg-white dark:bg-slate-900 px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-700">
                    {p.code}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => openBookingModal(cars[0])}
                className="w-full py-3 bg-[var(--theme-color)] hover:bg-orange-600 text-white font-bold rounded-2xl text-xs transition-colors cursor-pointer shadow-lg shadow-orange-500/20"
              >
                Gunakan Kode Voucher
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
