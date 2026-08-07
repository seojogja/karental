import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  ShieldCheck,
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MapPin,
  ExternalLink,
  Sparkles,
  Car,
  Clock,
  ThumbsUp
} from 'lucide-react';

export const SeoSasV5Article: React.FC = () => {
  const { cities, navigateTo, settings } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  if (settings?.seoSasV5Enabled === false) {
    return null;
  }

  const articleTitle = settings?.seoSasV5Title || 'Sewa Mobil Terpercaya Indonesia';
  const customSummary = settings?.seoSasV5Summary;
  const customContent = settings?.seoSasV5Content;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 font-sans">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl relative overflow-hidden transition-all duration-300">
        
        {/* Top SAS v5 Badge & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <FileText className="w-3.5 h-3.5" /> Mengapa Kami
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-poppins pt-1">
              {articleTitle}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <span>{isExpanded ? 'Tutup' : 'Selengkapnya'}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4 text-[var(--theme-color)]" /> : <ChevronDown className="w-4 h-4 text-[var(--theme-color)]" />}
            </button>
          </div>
        </div>

        {/* Feature Highlight Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0" />
            <div className="text-[11px]">
              <strong className="block text-slate-900 dark:text-white font-bold">PT Legal & Resmi</strong>
              <span className="text-slate-500">Izin Kemenkumham & NIB</span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-emerald-500 shrink-0" />
            <div className="text-[11px]">
              <strong className="block text-slate-900 dark:text-white font-bold">Layanan 24/7</strong>
              <span className="text-slate-500">CS & Support Bandara</span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
            <Car className="w-5 h-5 text-blue-500 shrink-0" />
            <div className="text-[11px]">
              <strong className="block text-slate-900 dark:text-white font-bold">500+ Unit Armada</strong>
              <span className="text-slate-500">Lengkap & Tahun Muda</span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
            <ThumbsUp className="w-5 h-5 text-amber-500 shrink-0" />
            <div className="text-[11px]">
              <strong className="block text-slate-900 dark:text-white font-bold">Garansi Bersih</strong>
              <span className="text-slate-500">Disinfeksi & Harum</span>
            </div>
          </div>
        </div>

        {/* Short Summary Text (Always Visible) */}
        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3">
          {customSummary ? (
            <p className="whitespace-pre-line">{customSummary}</p>
          ) : (
            <p>
              <strong>Karental (PT Karental Indonesia)</strong> merupakan penyedia armada rental mobil profesional dan terbesar di Indonesia.
              Kami melayani sewa mobil harian, mingguan, bulanan, layanan lepas kunci (self-drive) maupun sewa mobil dengan sopir (driver) profesional
              di berbagai kota besar seperti Jakarta, Surabaya, Bali, Bandung, Yogyakarta, Medan, Semarang, dan Makassar.
            </p>
          )}
        </div>

        {/* Full Expanded SEO Article Content */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed animate-in fade-in duration-300">
            {customContent && customContent.trim() !== '' ? (
              <div
                className="prose dark:prose-invert max-w-none space-y-4"
                dangerouslySetInnerHTML={{ __html: customContent }}
              />
            ) : (
              <>
                {/* Section 1 */}
                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-poppins flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[var(--theme-color)] text-white text-xs flex items-center justify-center font-bold">1</span>
                    Keunggulan Layanan Sewa Mobil Karental Indonesia (SAS v5)
                  </h3>
                  <p>
                    Dalam memilih jasa sewa mobil untuk keperluan dinas kantor, perjalanan bisnis VVIP, maupun liburan keluarga, keandalan armada dan legalitas penyedia merupakan prioritas utama. Karental mengimplementasikan standar operasional ketat untuk memastikan kenyamanan setiap pelanggan:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                    <li className="flex items-start gap-2 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 dark:text-white block">Lepas Kunci Syarat Mudah:</strong>
                        <span>Proses verifikasi dokumen cepat via WhatsApp tanpa jaminan rumit untuk pelanggan terverifikasi.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 dark:text-white block">Sopir Berpengalaman & Ramah:</strong>
                        <span>Driver kami dibekali pelatihan defensive driving, paham rute jalan tol tercepat, dan menjaga etika pelayanan VVIP.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 dark:text-white block">Asuransi All-Risk Komersial:</strong>
                        <span>Setiap unit dilindungi asuransi menyeluruh sehingga Anda tenang selama di perjalanan.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 dark:text-white block">Standar Kebersihan Higienis:</strong>
                        <span>Unit rutin dicuci, disedot debu, serta disemprot disinfektan bebas bau rokok sebelum diserahkan.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Section 2: Table */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-poppins flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[var(--theme-color)] text-white text-xs flex items-center justify-center font-bold">2</span>
                    Tabel Perbandingan Kategori & Tarif Estimasi Rental Mobil
                  </h3>
                  <p>
                    Berikut adalah panduan estimasi tarif sewa harian untuk armada paling diminati pelanggan Karental:
                  </p>

                  <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold uppercase">
                        <tr>
                          <th className="p-3">Model Armada</th>
                          <th className="p-3">Kapasitas</th>
                          <th className="p-3">Sewa Lepas Kunci</th>
                          <th className="p-3">Sewa + Sopir</th>
                          <th className="p-3">Peruntukan Terbaik</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="p-3 font-bold text-slate-900 dark:text-white">Toyota Avanza / Xenia</td>
                          <td className="p-3">7 Seats</td>
                          <td className="p-3 text-[var(--theme-color)] font-bold">Rp 350.000 / hari</td>
                          <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Rp 550.000 / hari</td>
                          <td className="p-3 text-slate-500">Perjalanan keluarga hemat & operasional harian</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="p-3 font-bold text-slate-900 dark:text-white">Innova Zenix Hybrid</td>
                          <td className="p-3">7 Seats</td>
                          <td className="p-3 text-[var(--theme-color)] font-bold">Rp 750.000 / hari</td>
                          <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Rp 950.000 / hari</td>
                          <td className="p-3 text-slate-500">Bisnis nyaman, kabin senyap & irit BBM</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="p-3 font-bold text-slate-900 dark:text-white">Toyota Fortuner / Pajero</td>
                          <td className="p-3">7 Seats</td>
                          <td className="p-3 text-[var(--theme-color)] font-bold">Rp 1.200.000 / hari</td>
                          <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Rp 1.450.000 / hari</td>
                          <td className="p-3 text-slate-500">SUV Tangguh untuk perjalanan proyek & luar kota</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="p-3 font-bold text-slate-900 dark:text-white">Toyota Alphard Transformer / HEV</td>
                          <td className="p-3">7 Seats VVIP</td>
                          <td className="p-3 text-[var(--theme-color)] font-bold">Rp 2.500.000 / hari</td>
                          <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Rp 2.800.000 / hari</td>
                          <td className="p-3 text-slate-500">Menteri, Pejabat, Direksi & Pernikahan Mewah</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="p-3 font-bold text-slate-900 dark:text-white">Toyota Hiace Commuter / Premio</td>
                          <td className="p-3">12 - 15 Seats</td>
                          <td className="p-3 text-slate-400 font-semibold">- (Khusus Driver)</td>
                          <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Rp 1.300.000 / hari</td>
                          <td className="p-3 text-slate-500">Rombongan wisata, event gathering & rombongan bandara</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 3: Internal SEO Links to City Pages */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-poppins flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[var(--theme-color)] text-white text-xs flex items-center justify-center font-bold">3</span>
                    Jaringan Cabang & Kota Layanan Utama (SEO Internal Linking)
                  </h3>
                  <p>
                    Klik kota tujuan Anda di bawah ini untuk melihat daftar armada lokal, harga sewa per jam/hari, dan kontak CS lokal:
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {cities.map((city) => (
                      <button
                        key={city.slug}
                        onClick={() => navigateTo(`/kota/${city.slug}`)}
                        className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-[var(--theme-color)] hover:text-white dark:hover:bg-[var(--theme-color)] dark:hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-slate-200/60 dark:border-slate-700/60"
                      >
                        <MapPin className="w-3.5 h-3.5 text-orange-500 hover:text-white" />
                        <span>Sewa Mobil {city.cityName}</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 4: Tips & FAQ */}
                <div className="space-y-3 pt-2 bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm font-poppins flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Tips Praktis Pemesanan Mobil di Karental:
                  </h4>
                  <ol className="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    <li>Lakukan reservasi minimal 1 hari sebelum jadwal penjemputan untuk menjamin ketersediaan tipe mobil favorit Anda.</li>
                    <li>Siapkan KTP dan SIM A aktif untuk sewa tanpa driver (lepas kunci).</li>
                    <li>Konfirmasikan lokasi pengantaran unit (Bandara, Hotel, Rumah, atau Stasiun) saat pengisian formulir booking.</li>
                  </ol>
                </div>
              </>
            )}
          </div>
        )}

        {/* Toggle Footer Button */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-bold text-[var(--theme-color)] hover:underline cursor-pointer flex items-center gap-1.5"
          >
            <span>{isExpanded ? 'Tutup' : 'Selengkapnya'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </section>
  );
};
