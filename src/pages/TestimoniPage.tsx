import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimoniPage: React.FC = () => {
  const { reviews = [] } = useApp() as any;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-sans">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-black uppercase tracking-wider text-[var(--theme-color)]">Kisah Pelanggan</span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-poppins">
          Testimoni & Rating Karental
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Pengalaman nyata para eksekutif, BUMN, keluarga, dan wisatawan yang menyewa mobil di Karental.
        </p>
      </div>

      <div className="bg-slate-900 text-white rounded-3xl p-8 text-center max-w-md mx-auto space-y-2 shadow-2xl">
        <div className="text-4xl font-black text-[var(--theme-color)] font-poppins">4.9 / 5.0</div>
        <div className="flex justify-center gap-1 text-amber-400">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400" />)}
        </div>
        <div className="text-xs text-slate-300">Berdasarkan 1,200+ ulasan terverifikasi di Google Reviews & WA</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((t: any, idx: number) => (
          <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">"{t.comment}"</p>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <img src={t.avatarUrl} alt={t.customerName} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{t.customerName}</h4>
                <span className="text-xs text-slate-500">Penyewa {t.carRented} ({t.cityName})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
