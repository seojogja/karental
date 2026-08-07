import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Car } from '../types';
import { getCarSlug } from '../utils/slug';
import {
  Car as CarIcon,
  Star,
  Users,
  Fuel,
  Settings2,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  PhoneCall,
  ArrowLeft,
  Share2,
  Clock,
  Sparkles,
  Info,
  ChevronRight,
  BadgePercent
} from 'lucide-react';

interface CarDetailPageProps {
  carSlug: string;
}

export const CarDetailPage: React.FC<CarDetailPageProps> = ({ carSlug }) => {
  const { cars = [], openBookingModal, trackWhatsAppClick, navigateTo, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'requirements'>('specs');

  // Find car by slug or formatted name
  const car = cars.find(c => {
    const slug = c.slug || getCarSlug(c);
    return slug === carSlug || c.id === carSlug;
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!car) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6 font-sans">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <CarIcon className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white font-poppins">
          Armada Mobil Tidak Ditemukan
        </h1>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          Maaf, armada mobil dengan URL ini tidak ditemukan atau telah diperbarui. Silakan jelajahi katalog armada lengkap kami.
        </p>
        <button
          onClick={() => navigateTo('/armada')}
          className="bg-[var(--theme-color)] text-white font-bold px-6 py-3 rounded-2xl text-xs hover:opacity-90 cursor-pointer inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog Armada
        </button>
      </div>
    );
  }

  const mainImage = selectedImage || car.image;
  const galleryImages = [car.image, ...(car.gallery || [])].filter((img, idx, arr) => arr.indexOf(img) === idx);

  const relatedCars = cars
    .filter(c => c.id !== car.id && (c.category === car.category || c.brand === car.brand))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${car.name} - Karental Rental Mobil`,
        text: `Sewa ${car.name} lepas kunci & dengan driver di Karental!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link detail mobil telah disalin ke clipboard!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-semibold overflow-x-auto pb-1">
        <button onClick={() => navigateTo('/')} className="hover:text-slate-900 dark:hover:text-white cursor-pointer">
          Beranda
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <button onClick={() => navigateTo('/armada')} className="hover:text-slate-900 dark:hover:text-white cursor-pointer">
          Katalog Armada
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="text-[var(--theme-color)] font-bold truncate max-w-xs">{car.name}</span>
      </nav>

      {/* Main Grid: Detail Left + Pricing Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Gallery & Spec Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Vehicle Header Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
            
            {/* Title & Badges */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-orange-500/10 text-[var(--theme-color)] font-extrabold text-[11px] rounded-full uppercase tracking-wider">
                    {car.category}
                  </span>
                  <span className={`px-3 py-1 text-[11px] font-bold rounded-full ${
                    car.availableStatus === 'Tersedia' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300' :
                    'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                  }`}>
                    • {car.availableStatus}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white font-poppins pt-1">
                  {car.name}
                </h1>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold pt-1">
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-400" /> {car.rating} ({car.reviewCount} ulasan)
                  </span>
                  <span>•</span>
                  <span>Merek: <strong className="text-slate-800 dark:text-slate-200">{car.brand}</strong></span>
                  <span>•</span>
                  <span>Tahun: <strong className="text-slate-800 dark:text-slate-200">{car.specs?.year || 2024}</strong></span>
                </div>
              </div>

              <button
                onClick={handleShare}
                className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-2xl text-slate-600 dark:text-slate-300 cursor-pointer transition-all"
                title="Bagikan URL Mobil"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Main Showcase Image */}
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 group">
              <img
                src={mainImage}
                alt={car.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Unit Eksekutif Terawat
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-24 h-16 rounded-2xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      mainImage === img ? 'border-[var(--theme-color)] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Key Quick Spec Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/60 text-center space-y-1">
                <Users className="w-5 h-5 text-[var(--theme-color)] mx-auto" />
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Kapasitas</span>
                <p className="font-bold text-xs text-slate-800 dark:text-slate-200">{car.capacity} Kursi</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/60 text-center space-y-1">
                <Settings2 className="w-5 h-5 text-indigo-500 mx-auto" />
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Transmisi</span>
                <p className="font-bold text-xs text-slate-800 dark:text-slate-200">{car.transmission}</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/60 text-center space-y-1">
                <Fuel className="w-5 h-5 text-emerald-500 mx-auto" />
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Bahan Bakar</span>
                <p className="font-bold text-xs text-slate-800 dark:text-slate-200">{car.fuel}</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/60 text-center space-y-1">
                <ShieldCheck className="w-5 h-5 text-amber-500 mx-auto" />
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Asuransi</span>
                <p className="font-bold text-xs text-slate-800 dark:text-slate-200">All-Risk</p>
              </div>
            </div>
          </div>

          {/* Detailed Info Tabs: Description, Specs & Features */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
            
            {/* Tab Header */}
            <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 text-xs font-bold">
              {[
                { id: 'specs', label: 'Deskripsi & Spesifikasi' },
                { id: 'features', label: 'Fitur Mewah' },
                { id: 'requirements', label: 'Syarat & Ketentuan Sewa' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`px-4 py-2.5 rounded-xl cursor-pointer transition-all ${
                    activeTab === t.id
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Specs & Overview */}
            {activeTab === 'specs' && (
              <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white font-poppins mb-2">
                    Tentang {car.name}
                  </h3>
                  <p>{car.description}</p>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white font-poppins">
                    Spesifikasi Teknis
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex justify-between">
                      <span className="text-slate-400 font-semibold">Tipe Mesin:</span>
                      <strong className="text-slate-900 dark:text-white">{car.specs?.engine || '2.5L VVT-i'}</strong>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex justify-between">
                      <span className="text-slate-400 font-semibold">Tahun Perakitan:</span>
                      <strong className="text-slate-900 dark:text-white">{car.specs?.year || 2024}</strong>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex justify-between">
                      <span className="text-slate-400 font-semibold">Jumlah Pintu:</span>
                      <strong className="text-slate-900 dark:text-white">{car.specs?.doors || 5} Pintu</strong>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex justify-between">
                      <span className="text-slate-400 font-semibold">Kapasitas Bagasi:</span>
                      <strong className="text-slate-900 dark:text-white">{car.specs?.luggage || '3 Koper'}</strong>
                    </div>
                  </div>
                </div>

                {/* Available Cities */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white font-poppins flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-indigo-500" /> Ketersediaan Cabang Kota
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(car.cityAvailability || ['Jakarta', 'Bali', 'Surabaya']).map(city => (
                      <span key={city} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-700 dark:text-slate-300">
                        📍 {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Features */}
            {activeTab === 'features' && (
              <div className="space-y-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-white font-poppins">
                  Fitur Unggulan {car.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(car.features || []).map((feat, i) => (
                    <div key={i} className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 text-xs font-bold text-slate-800 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Requirements */}
            {activeTab === 'requirements' && (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <h3 className="font-bold text-base text-slate-900 dark:text-white font-poppins">
                  Persyaratan Sewa Mobil
                </h3>

                <div className="space-y-3">
                  <div className="p-4 bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/50 rounded-2xl space-y-1">
                    <strong className="text-orange-900 dark:text-orange-300 block font-bold text-sm">
                      1. Sewa Lepas Kunci (Self Drive)
                    </strong>
                    <p>
                      Menyiapkan e-KTP Asli, SIM A Aktif, Dokumen Pendukung (Tiket Pesawat/Kerja/ID Pegawai), dan foto selfie verifikasi instan tim Karental.
                    </p>
                  </div>

                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl space-y-1">
                    <strong className="text-emerald-900 dark:text-emerald-300 block font-bold text-sm">
                      2. Sewa Dengan Sopir (With Driver)
                    </strong>
                    <p>
                      Tanpa verifikasi rumit. Hanya perlu memberikan detail lokasi penjemputan (Bandara / Hotel / Kantor) dan jadwal jam antar.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sticky Pricing & Action Panel */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6 lg:sticky lg:top-24">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Tarif Sewa Resmi
              </span>
              <span className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                <BadgePercent className="w-3.5 h-3.5" /> Diskon Promo 20%
              </span>
            </div>

            {/* Price Cards */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 block">Sewa Lepas Kunci (24 Jam)</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900 dark:text-white font-poppins">
                    Rp {car.pricePerDay.toLocaleString('id-ID')}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">/ hari</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 space-y-1">
                <span className="text-[11px] font-bold text-[var(--theme-color)] block">Sewa + Sopir Professional (12-24 Jam)</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-[var(--theme-color)] font-poppins">
                    Rp {car.priceWithDriver.toLocaleString('id-ID')}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">/ hari</span>
                </div>
              </div>
            </div>

            {/* Direct CTA Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => openBookingModal(car)}
                className="w-full py-4 bg-[var(--theme-color)] hover:bg-orange-600 text-white font-black text-sm rounded-2xl shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
              >
                Pesan Online Sekarang
              </button>

              <button
                onClick={() => trackWhatsAppClick('Car Detail Page WA', car.name)}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
              >
                <PhoneCall className="w-4 h-4" /> Tanya CS via WhatsApp Direct
              </button>
            </div>

            {/* Service Guarantees */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Garansi unit bersih kinclong & wangi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Pengantaran tepat waktu di Bandara / Hotel</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Layanan Customer Service CS 24 Jam</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Cars Section */}
      {relatedCars.length > 0 && (
        <div className="pt-8 space-y-6">
          <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-white">
            Rekomendasi Armada Lainnya
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCars.map(rel => {
              const relSlug = rel.slug || getCarSlug(rel);
              return (
                <div
                  key={rel.id}
                  onClick={() => navigateTo(`/sewa-mobil/${relSlug}`)}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl transition-all cursor-pointer space-y-4 group"
                >
                  <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 relative">
                    <img src={rel.image} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--theme-color)]">{rel.category}</span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white font-poppins group-hover:text-[var(--theme-color)] transition-colors">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-emerald-600 font-bold">
                      Rp {rel.pricePerDay.toLocaleString('id-ID')} / hari
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
