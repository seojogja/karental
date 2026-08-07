import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const KontakPage: React.FC = () => {
  const { trackWhatsAppClick, showToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
    showToast('Pesan Anda berhasil dikirim! Tim Karental akan segera menghubungi Anda.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-sans">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-black uppercase tracking-wider text-[var(--theme-color)]">Hubungi Karental</span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-poppins">
          Kantor & Layanan Pelanggan
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Kami siap melayani kebutuhan rental mobil Anda 24 Jam Nonstop setiap hari.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Contact Info & Office Addresses */}
        <div className="space-y-6">
          <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-poppins">Kantor Pusat & Cabang</h3>

            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-1">
                <strong className="text-slate-900 dark:text-white block text-sm font-bold">Jakarta Headquarters:</strong>
                <p>SCBD Tower 2 Lt. 18, Jl. Jend. Sudirman Kav. 52-53, Kebayoran Baru, Jakarta Selatan 12190</p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-1">
                <strong className="text-slate-900 dark:text-white block text-sm font-bold">Surabaya Branch:</strong>
                <p>Jl. Raya Darmo No. 88, Wonokromo, Kota Surabaya, Jawa Timur 60241</p>
              </div>

              <div className="pt-2 space-y-2">
                <div className="flex items-center gap-3 text-slate-800 dark:text-slate-100 font-semibold text-sm">
                  <Phone className="w-4 h-4 text-[var(--theme-color)]" />
                  <span>+62 812-3456-7890 (Customer Care 24 Jam)</span>
                </div>
                <div className="flex items-center gap-3 text-slate-800 dark:text-slate-100 font-semibold text-sm">
                  <Mail className="w-4 h-4 text-[var(--theme-color)]" />
                  <span>info@karental.co.id</span>
                </div>
                <div className="flex items-center gap-3 text-slate-800 dark:text-slate-100 font-semibold text-sm">
                  <Clock className="w-4 h-4 text-[var(--theme-color)]" />
                  <span>Jam Operasional: Senin - Minggu (24 Jam Nonstop)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => trackWhatsAppClick('Kontak Page WA')}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-2xl text-xs transition-colors cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <span>Chat WhatsApp Customer Service Instan</span>
            </button>
          </div>
        </div>

        {/* Contact Form & Map Mockup */}
        <div className="space-y-6">
          <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-poppins">Kirim Pesan / Pertanyaan</h3>

            {submitted ? (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Pesan Terkirim!</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">Tim Karental akan membalas via Email / WhatsApp Anda segera.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Nama Anda</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Nama Lengkap"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Nomor Telepon / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="081234567890"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Pesan Anda</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tuliskan pertanyaan sewa mobil Anda..."
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[var(--theme-color)] hover:bg-orange-600 text-white font-bold py-3.5 rounded-2xl text-xs transition-colors cursor-pointer shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Kirim Pesan
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
