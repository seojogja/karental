import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getCarSlug } from '../utils/slug';
import {
  MapPin,
  CheckCircle2,
  PhoneCall,
  Star,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  Car as CarIcon,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface CityPageProps {
  slug: string;
}

export const CityPage: React.FC<CityPageProps> = ({ slug }) => {
  const { cities = [], cars = [], openBookingModal, trackWhatsAppClick, navigateTo } = useApp();

  const cityData = cities.find(c => c.slug === slug) || cities[0];

  // Accordion state for FAQs
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filter cars available in this city
  const cityCars = cityData
    ? cars.filter(c => Array.isArray(c.cityAvailability) && c.cityAvailability.includes(cityData.cityName))
    : [];

  if (!cityData) {
    return (
      <div className="p-12 text-center text-slate-500">
        <p>Halaman kota tidak ditemukan.</p>
      </div>
    );
  }

  // Get active FAQs or default city FAQs
  const defaultFaqs = [
    {
      question: `Apakah tersedia rental mobil lepas kunci di ${cityData.cityName}?`,
      answer: `Ya, Karental menyediakan pilihan sewa mobil lepas kunci di ${cityData.cityName} untuk kategori MPV, SUV, hingga Luxury Sedan dengan verifikasi dokumen yang instan dan aman.`
    },
    {
      question: `Bagaimana sistem antar-jemput armada di ${cityData.cityName}?`,
      answer: `Kami menyediakan fasilitas antar-jemput gratis di lokasi-lokasi utama kota ${cityData.cityName} seperti Bandara, Stasiun Kereta Api, Hotel, dan kawasan pusat bisnis.`
    },
    {
      question: `Apakah tarif sewa mobil dengan driver di ${cityData.cityName} sudah termasuk BBM & Tol?`,
      answer: `Tarif reguler mencakup mobil + sopir profesional. Kami juga memiliki paket All-In (Sopir, BBM, Tol & Parkir) khusus wilayah ${cityData.cityName} untuk kemudahan perjalanan dinas atau wisata Anda.`
    },
    {
      question: `Apa saja syarat dokumen untuk sewa mobil di ${cityData.cityName}?`,
      answer: `Persyaratan umum yaitu KTP, SIM A aktif, bukti tiket perjalanan/penutupan hotel/ID kerja, dan verifikasi singkat tim lapangan Karental ${cityData.cityName}.`
    },
    {
      question: `Bagaimana cara booking instan rental mobil di ${cityData.cityName}?`,
      answer: `Anda dapat melakukan pemesanan via tombol 'Booking Online' di website ini atau langsung menghubungi Tim Dispatcher WhatsApp CS ${cityData.cityName} yang siaga 24 jam.`
    }
  ];

  const cityFaqs = (cityData.cityFaqs && cityData.cityFaqs.length > 0)
    ? cityData.cityFaqs
    : defaultFaqs;

  return (
    <div className="space-y-16 pb-16 font-sans">
      
      {/* City Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-12 pb-16 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={cityData.landmarkImage}
            alt={`Rental Mobil ${cityData.cityName}`}
            className="w-full h-full object-cover opacity-35"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <MapPin className="w-4 h-4 text-[var(--theme-color)]" />
            Layanan Resmi {cityData.province}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-poppins tracking-tight leading-tight">
            Rental Mobil {cityData.cityName} <br />
            <span className="text-[var(--theme-color)]">Lepas Kunci & Driver 24 Jam</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {cityData.heroTagline}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => trackWhatsAppClick(`City Page ${cityData.cityName}`)}
              className="bg-[var(--theme-color)] hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-2xl shadow-xl shadow-orange-500/30 transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Chat CS {cityData.cityName}</span>
            </button>
            <button
              onClick={() => openBookingModal(cityCars[0] || cars[0])}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-2xl backdrop-blur-md border border-white/20 transition-all cursor-pointer text-sm"
            >
              Booking Online Instan
            </button>
          </div>
        </div>
      </section>


      {/* Popular Pickup Locations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 font-poppins flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--theme-color)]" /> Lokasi Populer Antar Jemput Gratis di {cityData.cityName}:
          </h3>
          <div className="flex flex-wrap gap-2">
            {(cityData.popularLocations || []).map((loc, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-xs font-semibold text-[var(--theme-color)] border border-orange-200 dark:border-orange-900/40 flex items-center gap-1"
              >
                ✓ {loc}
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* SEO Article & Price Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Article Content */}
        <div className="lg:col-span-2 space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <div
              className="prose dark:prose-invert max-w-none space-y-4"
              dangerouslySetInnerHTML={{ __html: cityData.articleContent }}
            />
          </div>

          {/* Price List Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-poppins">
              Daftar Tarif Rental Mobil {cityData.cityName} Terbaru 2026
            </h3>
            <p className="text-xs text-slate-500">
              *Harga transparan termasuk asuransi all-risk komersial dan garansi unit bersih harum.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase">
                  <tr>
                    <th className="p-3 rounded-l-xl">Kategori Mobil</th>
                    <th className="p-3">Tarif Lepas Kunci</th>
                    <th className="p-3 rounded-r-xl">Tarif Dengan Sopir</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {(cityData.priceList || []).map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 font-semibold text-slate-900 dark:text-white">{row.carCategory}</td>
                      <td className="p-3 font-bold text-[var(--theme-color)]">Rp {row.lepasKunciRate.toLocaleString('id-ID')} / hari</td>
                      <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">Rp {row.withDriverRate.toLocaleString('id-ID')} / hari</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Dispatcher Contact */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 shadow-2xl border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[var(--theme-color)] flex items-center justify-center font-bold">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl font-poppins">Dispatcher CS {cityData.cityName}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hubungi tim penanggung jawab cabang {cityData.cityName} untuk pemesanan darurat jam berapa saja.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-orange-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Siap Antar 24 Jam di All Area {cityData.cityName}</span>
              </div>
            </div>

            <button
              onClick={() => trackWhatsAppClick(`Sidebar City ${cityData.cityName}`)}
              className="w-full bg-[var(--theme-color)] hover:bg-orange-600 text-white font-bold py-3.5 rounded-2xl text-xs transition-colors cursor-pointer shadow-lg shadow-orange-500/20"
            >
              Hubungi Dispatcher {cityData.cityName}
            </button>
          </div>
        </div>

      </section>


      {/* Local Fleet List in this City */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-poppins">
          Armada Siap Pakai di {cityData.cityName}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {cityCars.map(c => (
            <div key={c.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-lg space-y-3">
              <img src={c.image} alt={c.name} className="w-full h-36 object-cover rounded-xl" referrerPolicy="no-referrer" />
              <h4 className="font-bold text-sm font-poppins line-clamp-1">{c.name}</h4>
              <div className="text-sm font-black text-[var(--theme-color)]">Rp {c.pricePerDay.toLocaleString('id-ID')} / hari</div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => navigateTo(`/sewa-mobil/${getCarSlug(c)}`)}
                  className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Detail
                </button>
                <button
                  onClick={() => openBookingModal(c)}
                  className="w-full py-2 bg-[var(--theme-color)] hover:bg-orange-600 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Sewa
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section Page Kota */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-[var(--theme-color)] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" /> FAQ Cabang {cityData.cityName}
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white font-poppins">
            Pertanyaan Sering Diajukan di {cityData.cityName}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
            Informasi penting seputar verifikasi dokumen, paket lepas kunci, antar-jemput bandara, dan metode pembayaran di cabang {cityData.cityName}.
          </p>
        </div>

        <div className="space-y-4">
          {cityFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex justify-between items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white font-poppins flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-orange-500/10 text-[var(--theme-color)] text-xs font-black flex items-center justify-center shrink-0">
                      Q{idx + 1}
                    </span>
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[var(--theme-color)]" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800/60 leading-relaxed font-sans animate-fadeIn">
                    <div className="pl-10">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* City CTA Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black font-poppins">
              {cityData.ctaTitle || `Sewa Mobil Impian Anda di ${cityData.cityName} Sekarang!`}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {cityData.ctaSubtitle || `Dapatkan penawaran harga terbaik & promo diskon hingga 20% untuk rental mobil di ${cityData.cityName}. Tim CS Karental siap melayani 24 jam.`}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const waNum = cityData.ctaWhatsappNumber || '6287829609156';
                const text = encodeURIComponent(`Halo CS Karental ${cityData.cityName}, saya ingin bertanya rental mobil di ${cityData.cityName}. Mohon info armada & promo terbarunya.`);
                window.open(`https://wa.me/${waNum}?text=${text}`, '_blank');
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/30 transition-all cursor-pointer text-base flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-5 h-5" />
              <span>{cityData.ctaButtonText || `Chat CS WhatsApp ${cityData.cityName}`}</span>
            </button>
            <button
              onClick={() => openBookingModal(cityCars[0] || cars[0])}
              className="bg-[var(--theme-color)] hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/30 transition-all cursor-pointer text-base"
            >
              Booking Online Instan
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
