import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { faqs = [] } = useApp() as any;
  const [activeFaq, setActiveFaq] = useState<string | null>('faq-1');
  const [search, setSearch] = useState('');

  const filtered = faqs.filter(f => f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-sans">
      <div className="text-center space-y-3">
        <span className="text-xs font-black uppercase tracking-wider text-[var(--theme-color)]">Pusat Bantuan</span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-poppins">
          Pertanyaan Sering Diajukan
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Informasi lengkap seputar persyaratan sewa lepas kunci, metode pembayaran, dan asuransi.
        </p>
      </div>

      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari pertanyaan Anda di sini..."
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
        />
      </div>

      <div className="space-y-3">
        {filtered.map(f => {
          const isOpen = activeFaq === f.id;
          return (
            <div key={f.id} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden">
              <button
                onClick={() => setActiveFaq(isOpen ? null : f.id)}
                className="w-full text-left p-5 font-bold text-slate-900 dark:text-white text-base flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[var(--theme-color)] shrink-0" />
                  {f.question}
                </span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[var(--theme-color)]' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-0 text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800/50 leading-relaxed">
                  {f.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
