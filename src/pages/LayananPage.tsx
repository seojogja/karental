import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Car,
  Calendar,
  Clock,
  Key,
  Users,
  Plane,
  Briefcase,
  Compass,
  Heart,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

export const LayananPage: React.FC = () => {
  const { trackWhatsAppClick, openBookingModal, cars } = useApp();

  const services = [
    {
      title: 'Rental Harian (Daily Rent)',
      desc: 'Penyewaan mobil durasi 12 Jam atau 24 Jam penuh untuk perjalanan fleksibel singkat di dalam kota.',
      icon: Clock,
      badge: 'Bintang 5'
    },
    {
      title: 'Rental Mingguan (Weekly Rent)',
      desc: 'Paket sewa 7 hari dengan diskon khusus hemat hingga 15%. Pilihan tepat proyek jangka pendek.',
      icon: Calendar,
      badge: 'Hemat 15%'
    },
    {
      title: 'Rental Bulanan Corporate',
      desc: 'Solusi mobil operasional perusahaan atau instansi tanpa perlu memikirkan biaya perawatan rutin.',
      icon: Briefcase,
      badge: 'Proyek BUMN'
    },
    {
      title: 'Sewa Mobil Lepas Kunci',
      desc: 'Privasi penuh berkendara sendiri dengan verifikasi dokumen cepat & persyarakatan transparan.',
      icon: Key,
      badge: 'Favorit'
    },
    {
      title: 'Rental Dengan Sopir Profesional',
      desc: 'Nikmati perjalanan santai tanpa lelah. Pengemudi kami paham rute ganjil genap dan jalan tol.',
      icon: Users,
      badge: 'Pelayanan VVIP'
    },
    {
      title: 'Antar Jemput Bandara 24 Jam',
      desc: 'Layanan Shuttle Bandara Soekarno-Hatta (CGK), Ngurah Rai (DPS), & Juanda (SUB) tepat waktu.',
      icon: Plane,
      badge: 'Garansi On Time'
    },
    {
      title: 'Perjalanan Dinas & Tamu Negara',
      desc: 'Penyediaan armada eksekutif Alphard dan Mercedes-Benz lengkap dengan pengawalan jika dibutuhkan.',
      icon: Car,
      badge: 'Protokol VIP'
    },
    {
      title: 'Tour & Wisata Bali / Jogja / Bromo',
      desc: 'Paket sewa kendaraan liburan keluarga menelusuri destinasi wisata unggulan nusantara.',
      icon: Compass,
      badge: 'Family Tour'
    },
    {
      title: 'Wedding Car Luxury (Mobil Pengantin)',
      desc: 'Mobil pengantin mewah berhias pita bunga cantik dan driver berjas rapi untuk hari bahagia Anda.',
      icon: Heart,
      badge: 'Eksklusif'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-sans">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-black uppercase tracking-wider text-[var(--theme-color)]">
          Layanan Resmi Karental
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-poppins">
          Solusi Rental Mobil Terlengkap
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Menyediakan berbagai skema penyewaan kendaraan terpercaya yang disesuaikan dengan kebutuhan individu, keluarga, dan korporasi.
        </p>
      </div>

      {/* Services Grid (9 Items) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4 hover:border-[var(--theme-color)] transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-[var(--theme-color)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <s.icon className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                  {s.badge}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 dark:text-white text-lg font-poppins">
                {s.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {s.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <button
                onClick={() => openBookingModal(cars[0])}
                className="flex-1 py-2.5 bg-[var(--theme-color)] hover:bg-orange-600 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Booking Layanan Ini
              </button>
              <button
                onClick={() => trackWhatsAppClick(`Layanan ${s.title}`)}
                className="p-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl cursor-pointer"
                title="Tanya CS WA"
              >
                <PhoneCall className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
