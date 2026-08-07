import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, X, Send, Sparkles, PhoneCall } from 'lucide-react';

export const WhatsAppFloating: React.FC = () => {
  const { trackWhatsAppClick } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const quickMessages = [
    { label: 'Sewa Alphard / Vellfire Luxury', text: 'Halo CS Karental, saya tertarik sewa Alphard Transformer dengan sopir. Boleh infokan ketersediaan & harganya?' },
    { label: 'Sewa Innova Zenix Lepas Kunci', text: 'Halo Karental, saya mau tanya syarat & harga sewa Innova Zenix Hybrid lepas kunci.' },
    { label: 'Antar Jemput Bandara 24 Jam', text: 'Halo Karental, saya butuh jemputan di Bandara (Soekarno-Hatta/Ngurah Rai/Juanda). Boleh tahu tarifnya?' },
    { label: 'Promo KARENTALSUPER 20%', text: 'Halo, saya mau klaim kode voucher promo KARENTALSUPER diskon 20%.' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Quick Chat Popover Card */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 p-5 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-md">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-white"></span>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Karental Customer Support</h4>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  • Online - Balas Cepat
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Selamat datang di <strong className="text-[var(--theme-color)]">Karental</strong>! Ada yang bisa kami bantu mengenai reservasi mobil harian, bulanan, atau antar jemput hari ini?
          </div>

          <div className="space-y-2 py-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Pilih Pertanyaan Cepat:</span>
            {quickMessages.map((msg, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsOpen(false);
                  trackWhatsAppClick('Floating Widget', msg.label);
                }}
                className="w-full text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-orange-50 dark:hover:bg-orange-950/40 border border-slate-200/60 dark:border-slate-700/60 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-[var(--theme-color)] transition-colors flex items-center justify-between group cursor-pointer"
              >
                <span className="truncate">{msg.label}</span>
                <Send className="w-3 h-3 text-slate-400 group-hover:text-[var(--theme-color)] transition-transform group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <button
              onClick={() => {
                setIsOpen(false);
                trackWhatsAppClick('Floating Widget General');
              }}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Buka WhatsApp CS (24 Jam)</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-3xl shadow-2xl shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
        title="Chat WhatsApp 24 Jam"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white"></span>
        </span>
        <MessageSquare className="w-7 h-7" />
      </button>
    </div>
  );
};
