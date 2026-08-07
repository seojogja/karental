import React from 'react';
import { ShieldCheck, Award, Users, Target, Compass, CheckCircle2 } from 'lucide-react';

export const TentangKamiPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-sans">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-black uppercase tracking-wider text-[var(--theme-color)]">Profil Perusahaan</span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-poppins">
          PT Karental Indonesia
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          Penyedia jasa transportasi mobil mewah dan eksekutif terpercaya sejak tahun 2018. Berkomitmen memberikan standar pelayanan berkendara berkelas tinggi untuk mendukung mobilitas Anda.
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[var(--theme-color)] flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-xl text-slate-900 dark:text-white font-poppins">Visi Perusahaan</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Menjadi perusahaan rental mobil eksekutif terbesar, terpercaya, dan paling inovatif berbasis teknologi digital di Asia Tenggara dengan mengutamakan keselamatan dan kenyamanan penuh pelanggan.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[var(--theme-color)] flex items-center justify-center font-bold">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-xl text-slate-900 dark:text-white font-poppins">Misi Perusahaan</h3>
          <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <li>✓ Menyediakan armada kendaraan mewah dan bersih dalam kondisi selalu siap jalan.</li>
            <li>✓ Menghadirkan driver berpengalaman dengan standar etika pelayanan VIP.</li>
            <li>✓ Memberikan proses reservasi cepat, jujur, transparan tanpa biaya tersembunyi.</li>
          </ul>
        </div>
      </div>

      {/* Company History Timeline */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white font-poppins">Perjalanan Karental (2018 - 2026)</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          {[
            { year: '2018', title: 'Berdiri di Jakarta', desc: 'Dimulai dengan 5 unit Alphard untuk kebutuhan tamu dinas kementerian.' },
            { year: '2021', title: 'Ekspansi ke Bali & Surabaya', desc: 'Membuka cabang operasional di Bandara Ngurah Rai dan Bandara Juanda.' },
            { year: '2024', title: 'Transformasi Digital', desc: 'Pembaruan armada 100% Innova Zenix Hybrid & Staria Signature.' },
            { year: '2026', title: '1,500+ Pelanggan Aktif', desc: 'Melayani 8 kota besar Indonesia dengan sistem pemesanan online real-time.' }
          ].map((item, idx) => (
            <div key={idx} className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-mono text-2xl font-black text-[var(--theme-color)]">{item.year}</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{item.title}</h4>
              <p className="text-[11px] text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Legalities Section */}
      <div className="p-8 bg-slate-900 text-white rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-orange-400 font-bold text-sm">
            <ShieldCheck className="w-5 h-5" /> Legalitas Terverifikasi Pemerintah RI
          </div>
          <h3 className="text-xl font-bold font-poppins">PT Karental Indonesia</h3>
          <p className="text-xs text-slate-300">NIB: 1289000342110 • NPWP: 98.231.445.1-012.000 • Izin Komersial Kementerian Perhubungan</p>
        </div>
        <div className="bg-slate-800 px-6 py-3 rounded-2xl font-bold text-xs text-orange-400 border border-slate-700">
          100% Entitas Legal Asli
        </div>
      </div>

    </div>
  );
};
