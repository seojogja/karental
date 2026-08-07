import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getCarSlug } from '../utils/slug';
import {
  Car as CarIcon,
  Search,
  ShieldCheck,
  Clock,
  Sparkles,
  Award,
  Star,
  Users,
  MapPin,
  ChevronRight,
  PhoneCall,
  Calendar,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Tag,
  Zap,
  ChevronDown
} from 'lucide-react';
import heroCarImage from '../assets/images/vastro_hero_car_1785990005190.jpg';

export const HomePage: React.FC = () => {
  const {
    settings,
    cars = [],
    cities = [],
    promos = [],
    faqs: faqsData = [],
    reviews: reviewsData = [],
    navigateTo,
    trackWhatsAppClick,
    openBookingModal,
    setSelectedCarId
  } = useApp();

  // Quick Search Form State
  const [selectedCity, setSelectedCity] = useState('Jakarta');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [pickupDate, setPickupDate] = useState('2026-08-10');
  const [returnDate, setReturnDate] = useState('2026-08-12');

  // FAQ Active Accordion
  const [activeFaq, setActiveFaq] = useState<string | null>('faq-1');

  // Ticking Promo Countdown
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        return { hours: prev.hours > 0 ? prev.hours - 1 : 24, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleQuickSearch = () => {
    navigateTo('/armada');
  };

  const featuredCars = cars.slice(0, 8);

  return (
    <div className="space-y-20 pb-16 font-sans">
      
      {/* 1. HERO FULLSCREEN SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-950">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={settings?.heroBackgroundImage || heroCarImage}
            alt="Karental Luxury Rental Mobil"
            className="w-full h-full object-cover opacity-45 transform scale-105 transition-transform duration-10000 animate-pulse"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-10">
          
          {/* Badge & Headline */}
          <div className="max-w-3xl space-y-5 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[var(--theme-color)]" />
              #1 Premium & Executive Car Rental di Indonesia
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] font-poppins" dangerouslySetInnerHTML={{__html: settings?.heroTitle || 'Sewa Mobil Mewah <br /><span class="text-transparent bg-clip-text bg-gradient-to-r from-[var(--theme-color)] via-amber-400 to-orange-500">Berkelas & Elegan</span>'}}></h1>

            <p className="text-slate-300 text-base sm:text-lg font-normal leading-relaxed max-w-2xl">
              Pengalaman berkendara kelas eksklusif dengan pilihan Alphard, Innova Zenix Hybrid, Fortuner, Pajero, Mercedes-Benz, hingga BMW. Layanan Lepas Kunci atau Sopir Profesional 24 Jam.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => trackWhatsAppClick('Hero Section')}
                className="w-full sm:w-auto bg-[var(--theme-color)] hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 transition-all cursor-pointer flex items-center justify-center gap-3 text-base transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <PhoneCall className="w-5 h-5" />
                <span>{settings?.heroCtaText || 'Chat WhatsApp Direct'}</span>
              </button>

              <button
                onClick={() => navigateTo('/armada')}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-2xl backdrop-blur-md border border-white/20 transition-all cursor-pointer flex items-center justify-center gap-2 text-base"
              >
                <span>Lihat Armada Lengkap</span>
                <ChevronRight className="w-5 h-5 text-orange-400" />
              </button>
            </div>
          </div>

          {/* QUICK BOOKING SEARCH BAR FORM */}
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-slate-200/80 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2 font-poppins">
                <Search className="w-4 h-4 text-[var(--theme-color)]" /> Cari & Reservasi Armada Cepat
              </span>
              <span className="text-xs text-slate-500">
                Garansi Unit Bersih & Prima
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Lokasi */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[var(--theme-color)]" /> Lokasi Kota
                </label>
                <select
                  value={selectedCity}
                  onChange={e => setSelectedCity(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm font-semibold text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
                >
                  {cities.map(c => (
                    <option key={c.slug} value={c.cityName}>{c.cityName}</option>
                  ))}
                </select>
              </div>

              {/* Tanggal Ambil */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[var(--theme-color)]" /> Tanggal Ambil
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={e => setPickupDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm font-semibold text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
                />
              </div>

              {/* Tanggal Kembali */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[var(--theme-color)]" /> Tanggal Kembali
                </label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={e => setReturnDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm font-semibold text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
                />
              </div>

              {/* Jenis Mobil */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <CarIcon className="w-3.5 h-3.5 text-[var(--theme-color)]" /> Kategori Mobil
                </label>
                <select
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm font-semibold text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
                >
                  <option value="Semua">Semua Kategori</option>
                  <option value="MPV Luxury">MPV Luxury (Alphard / Zenix)</option>
                  <option value="SUV Premium">SUV Premium (Fortuner / Pajero)</option>
                  <option value="Executive Sedan">Executive Sedan (Mercedes / BMW)</option>
                  <option value="Compact City">Compact City (HR-V / Brio)</option>
                </select>
              </div>

              {/* Tombol Cari */}
              <div className="flex items-end">
                <button
                  onClick={handleQuickSearch}
                  className="w-full bg-[var(--theme-color)] hover:bg-orange-600 text-white font-bold h-[46px] rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 transition-all cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Cari Mobil</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* 2. KEUNGGULAN PERUSAHAAN & STATISTIK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-[var(--theme-color)]">
            Mengapa Karental
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-poppins">
            Standar Layanan Rental Mobil Berkelas
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Kepercayaan ratusan instansi BUMN, kementerian, pebisnis, dan keluarga di Indonesia.
          </p>
        </div>

        {/* 4 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              title: 'Armada Terbaru & Prima',
              desc: 'Mobil selalu dalam kondisi higienis, bersih harum, servis berkala bengkel resmi.',
              icon: CarIcon
            },
            {
              title: 'Driver Profesional 24/7',
              desc: 'Pengemudi berseragam, ramah, paham rute ganjil-genap dan protokol keselamatan.',
              icon: Users
            },
            {
              title: 'Asuransi All-Risk Full',
              desc: 'Seluruh kendaraan dilindungi klaim asuransi komersial resmi untuk ketenangan Anda.',
              icon: ShieldCheck
            },
            {
              title: 'Garansi Tepat Waktu',
              desc: 'Antar jemput di Bandara Soekarno-Hatta, Ngurah Rai, atau Juanda selalu tepat waktu.',
              icon: Clock
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100 dark:shadow-none hover:border-[var(--theme-color)] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-[var(--theme-color)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 font-poppins">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Counter Panel */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-5xl font-black text-[var(--theme-color)] font-poppins mb-1">1,500+</div>
            <div className="text-xs text-slate-300 font-medium">Pelanggan Puas</div>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-black text-[var(--theme-color)] font-poppins mb-1">120+</div>
            <div className="text-xs text-slate-300 font-medium">Armada Mobil Mewah</div>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-black text-[var(--theme-color)] font-poppins mb-1">8</div>
            <div className="text-xs text-slate-300 font-medium">Kota Besar Indonesia</div>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-black text-[var(--theme-color)] font-poppins mb-1">4.9 / 5</div>
            <div className="text-xs text-slate-300 font-medium flex items-center justify-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Google Reviews
            </div>
          </div>
        </div>
      </section>


      {/* 3. ARMADA UNGGULAN (Desktop 4 cards, Mobile 2 cards grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[var(--theme-color)]">Pilihan Populer</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-poppins">
              Armada Mobil Unggulan Karental
            </h2>
          </div>
          <button
            onClick={() => navigateTo('/armada')}
            className="flex items-center gap-2 text-sm font-bold text-[var(--theme-color)] hover:underline cursor-pointer"
          >
            <span>Lihat Semua Armada ({cars.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid Responsive (4 Columns on Desktop, 2 Columns on Mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredCars.map((c) => (
            <div
              key={c.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:border-[var(--theme-color)] transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Image & Badges */}
              <div className="relative h-40 sm:h-48 overflow-hidden bg-slate-100">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  {c.category}
                </span>
                <span className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {c.availableStatus}
                </span>
              </div>

              {/* Body Content */}
              <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-semibold">{c.brand}</span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-400" /> {c.rating}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base font-poppins line-clamp-1 group-hover:text-[var(--theme-color)] transition-colors">
                    {c.name}
                  </h3>

                  {/* Specs Quick Pill */}
                  <div className="mt-2 grid grid-cols-2 gap-1 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl">
                    <span>⚙️ {c.transmission}</span>
                    <span>👥 {c.capacity} Seats</span>
                    <span>⛽ {c.fuel}</span>
                    <span>❄️ AC Dual</span>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Mulai dari</span>
                    <div className="text-base sm:text-lg font-black text-[var(--theme-color)]">
                      Rp {c.pricePerDay.toLocaleString('id-ID')}{' '}
                      <span className="text-[10px] font-normal text-slate-500">/hari</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => navigateTo(`/sewa-mobil/${getCarSlug(c)}`)}
                      className="w-full text-center py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => openBookingModal(c)}
                      className="w-full text-center py-2 bg-[var(--theme-color)] hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-md shadow-orange-500/20"
                    >
                      Booking
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 4. PROMO TERBARU WITH COUNTDOWN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center lg:text-left">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white inline-flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Promo Merdeka Karental
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-poppins">
              {settings?.ctaTitle || 'Siap Memulai Perjalanan Mewah Anda?'}
            </h2>
              <p className="text-orange-100 text-sm">
                Gunakan kode voucher <strong className="bg-white text-[var(--theme-color)] px-2 py-0.5 rounded font-mono font-bold">KARENTALSUPER</strong> saat booking online untuk semua lokasi kota.
              </p>
            </div>

            {/* Countdown Box */}
            <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-center space-y-2 shrink-0">
              <span className="text-xs text-orange-400 font-bold uppercase tracking-wider block">Promo Berakhir Dalam:</span>
              <div className="flex gap-3 text-white font-mono font-black text-2xl">
                <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 min-w-[50px]">
                  <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-[10px] text-slate-400 block font-sans font-normal">JAM</span>
                </div>
                <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 min-w-[50px]">
                  <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-[10px] text-slate-400 block font-sans font-normal">MENIT</span>
                </div>
                <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 min-w-[50px]">
                  <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-[10px] text-slate-400 block font-sans font-normal">DETIK</span>
                </div>
              </div>
              <button
                onClick={() => openBookingModal(cars[0])}
                className="w-full mt-2 bg-[var(--theme-color)] hover:bg-orange-500 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Klaim Voucher Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* 5. TESTIMONI PELANGGAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-black uppercase tracking-wider text-[var(--theme-color)]">Ulasan & Kepuasan</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-poppins">
            Kata Pelanggan Karental
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Bapak Hendra Setiawan',
              city: 'Jakarta',
              car: 'Toyota Alphard Transformer',
              text: 'Sewa Alphard untuk tamu VIP direksi Singapura di Jakarta. Sopirnya sangat profesional, mobilnya luar biasa bersih dan wangi. Recomended!',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
            },
            {
              name: 'Ibu Clarissa Wijaya',
              city: 'Bali',
              car: 'Innova Zenix Hybrid Q',
              text: 'Proses lepas kunci di Bali sangat mudah dan cepat. Mobil diantar tepat waktu di Bandara Ngurah Rai. Kondisi mesin prima banget!',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
            },
            {
              name: 'Dr. Ahmad Fauzi',
              city: 'Surabaya',
              car: 'Toyota Fortuner GR Sport',
              text: 'Sudah langganan sewa mobil dinas kantor di Surabaya. CS sangat ramah dan tanggap 24 jam. Kinerja mantap Karental!',
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
            }
          ].map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                "{t.text}"
              </p>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{t.name}</h4>
                  <span className="text-xs text-slate-500">Penyewa {t.car} ({t.city})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 6. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-black uppercase tracking-wider text-[var(--theme-color)]">Tanya Jawab</span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white font-poppins">
            Pertanyaan Sering Diajukan (FAQ)
          </h2>
        </div>

        <div className="space-y-3">
          {faqsData.map((f) => {
            const isOpen = activeFaq === f.id;
            return (
              <div
                key={f.id}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors"
              >
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
      </section>


      {/* 7. CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black font-poppins">
              Siap Memulai Perjalanan Mewah Anda?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              {settings?.ctaSubtitle || 'Pesan armada impian Anda sekarang juga. Nikmati kenyamanan mobil berkelas dan layanan ramah Karental.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openBookingModal(cars[0])}
              className="bg-[var(--theme-color)] hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/30 transition-all cursor-pointer text-base"
            >
              {settings?.ctaButtonText || 'Booking Online Sekarang'}
            </button>
            <button
              onClick={() => trackWhatsAppClick('CTA Footer')}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/30 transition-all cursor-pointer text-base flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-5 h-5" />
              Chat CS WhatsApp 24 Jam
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
