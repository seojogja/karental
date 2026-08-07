import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CityPageData } from '../../types';
import { DollarSign, Save, Plus, Trash2, Edit2, MapPin, PhoneCall, Sparkles, HelpCircle } from 'lucide-react';

export const PriceListTab: React.FC = () => {
  const { cities = [], addCity, showToast } = useApp() as any;

  // Selected city slug for editing
  const [selectedCitySlug, setSelectedCitySlug] = useState<string>(cities[0]?.slug || 'rental-mobil-jakarta');
  const [selectedCity, setSelectedCity] = useState<CityPageData | null>(null);

  // Form states for selected city
  const [priceList, setPriceList] = useState<{ carCategory: string; lepasKunciRate: number; withDriverRate: number; }[]>([]);
  const [ctaTitle, setCtaTitle] = useState('');
  const [ctaSubtitle, setCtaSubtitle] = useState('');
  const [ctaButtonText, setCtaButtonText] = useState('');
  const [ctaWhatsappNumber, setCtaWhatsappNumber] = useState('');
  const [cityFaqs, setCityFaqs] = useState<{ question: string; answer: string; }[]>([]);

  // FAQ Input state
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  // Row edit state
  const [categoryInput, setCategoryInput] = useState('MPV Luxury');
  const [lepasKunciInput, setLepasKunciInput] = useState<number>(2200000);
  const [withDriverInput, setWithDriverInput] = useState<number>(2500000);

  useEffect(() => {
    const found = cities.find((c: CityPageData) => c.slug === selectedCitySlug) || cities[0];
    if (found) {
      setSelectedCity(found);
      setPriceList(found.priceList || []);
      setCtaTitle(found.ctaTitle || `Sewa Mobil Impian Anda di ${found.cityName} Sekarang!`);
      setCtaSubtitle(found.ctaSubtitle || `Dapatkan penawaran harga terbaik & promo diskon hingga 20% untuk rental mobil di ${found.cityName}. Tim CS Karental siap melayani 24 jam.`);
      setCtaButtonText(found.ctaButtonText || `Chat CS WhatsApp ${found.cityName}`);
      setCtaWhatsappNumber(found.ctaWhatsappNumber || '6287829609156');
      setCityFaqs(found.cityFaqs && found.cityFaqs.length > 0 ? found.cityFaqs : [
        { question: `Apakah bisa sewa mobil lepas kunci di ${found.cityName}?`, answer: `Ya, Karental menyediakan layanan sewa mobil lepas kunci di ${found.cityName} dengan verifikasi KTP/SIM yang instan & praktis.` },
        { question: `Apakah ada layanan antar jemput Bandara / Stasiun di ${found.cityName}?`, answer: `Tentu, tim tim penyerahan armada Karental ${found.cityName} siap mengantar unit langsung ke Bandara atau Stasiun sesuai jadwal Anda.` },
        { question: `Apakah biaya sewa dengan driver di ${found.cityName} sudah termasuk BBM & Tol?`, answer: `Tarif standar belum termasuk BBM, Tol, dan parkir, kecuali Anda memilih paket All-In khusus cabang ${found.cityName}.` }
      ]);
    }
  }, [selectedCitySlug, cities]);

  const handleAddPriceRow = () => {
    if (!categoryInput.trim()) return;
    const existingIndex = priceList.findIndex(p => p.carCategory === categoryInput);
    let updated: { carCategory: string; lepasKunciRate: number; withDriverRate: number; }[];
    
    if (existingIndex >= 0) {
      updated = [...priceList];
      updated[existingIndex] = {
        carCategory: categoryInput,
        lepasKunciRate: Number(lepasKunciInput),
        withDriverRate: Number(withDriverInput)
      };
    } else {
      updated = [...priceList, {
        carCategory: categoryInput,
        lepasKunciRate: Number(lepasKunciInput),
        withDriverRate: Number(withDriverInput)
      }];
    }

    setPriceList(updated);
    if (showToast) showToast(`Tarif ${categoryInput} ditambahkan ke daftar!`);
  };

  const handleDeletePriceRow = (index: number) => {
    const updated = priceList.filter((_, i) => i !== index);
    setPriceList(updated);
  };

  const handleAddFaqRow = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      if (showToast) showToast('Harap isi Pertanyaan & Jawaban FAQ!');
      return;
    }
    setCityFaqs([...cityFaqs, { question: newQuestion.trim(), answer: newAnswer.trim() }]);
    setNewQuestion('');
    setNewAnswer('');
    if (showToast) showToast('Pertanyaan FAQ berhasil ditambahkan!');
  };

  const handleDeleteFaqRow = (index: number) => {
    setCityFaqs(cityFaqs.filter((_, i) => i !== index));
  };

  const handleSaveAll = () => {
    if (!selectedCity) return;
    const updatedCity: CityPageData = {
      ...selectedCity,
      priceList,
      ctaTitle,
      ctaSubtitle,
      ctaButtonText,
      ctaWhatsappNumber,
      cityFaqs
    };
    addCity(updatedCity);
    if (showToast) showToast(`Data Kota ${selectedCity.cityName} (Daftar Harga, CTA, & FAQ) berhasil disimpan!`);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
        <div>
          <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-white flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-[var(--theme-color)]" />
            Kelola Daftar Harga & CTA Page Kota
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Atur tabel tarif sewa mobil (Daftar Harga) & pesan banner Call-To-Action (CTA) untuk masing-masing halaman kota.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-6 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-lg shadow-orange-500/30 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Perubahan Data Kota</span>
        </button>
      </div>

      {/* Select City Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {cities.map((city: CityPageData) => (
          <button
            key={city.slug}
            onClick={() => setSelectedCitySlug(city.slug)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              selectedCitySlug === city.slug
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-[var(--theme-color)]" />
            <span>{city.cityName}</span>
          </button>
        ))}
      </div>

      {selectedCity && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Section 1: Daftar Harga (Price List Table Editor) - 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <h4 className="font-bold text-slate-900 dark:text-white text-base font-poppins flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-500" />
                  Daftar Tarif / Price List - Rental Mobil {selectedCity.cityName}
                </h4>
                <span className="text-[11px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                  {priceList.length} Kategori
                </span>
              </div>

              {/* Existing Price List Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase">
                    <tr>
                      <th className="p-3 rounded-l-xl">Kategori Mobil</th>
                      <th className="p-3">Tarif Lepas Kunci (/hari)</th>
                      <th className="p-3">Tarif Dengan Sopir (/hari)</th>
                      <th className="p-3 text-right rounded-r-xl">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {priceList.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-4 text-center text-slate-400 italic">
                          Belum ada tarif terdaftar untuk kota ini. Tambahkan di bawah.
                        </td>
                      </tr>
                    ) : (
                      priceList.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="p-3 font-bold text-slate-900 dark:text-white">{row.carCategory}</td>
                          <td className="p-3 font-bold text-[var(--theme-color)]">
                            Rp {Number(row.lepasKunciRate).toLocaleString('id-ID')}
                          </td>
                          <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">
                            Rp {Number(row.withDriverRate).toLocaleString('id-ID')}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleDeletePriceRow(idx)}
                              className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                              title="Hapus Kategori"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Add / Update Price Row Form */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  + Tambah / Update Kategori Tarif
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="block text-slate-400 mb-1 font-semibold">Kategori Mobil</span>
                    <select
                      value={categoryInput}
                      onChange={e => setCategoryInput(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[var(--theme-color)] font-semibold"
                    >
                      <option value="MPV Luxury">MPV Luxury</option>
                      <option value="SUV Premium">SUV Premium</option>
                      <option value="Executive Sedan">Executive Sedan</option>
                      <option value="Compact City">Compact City</option>
                      <option value="Wedding & VIP">Wedding & VIP</option>
                      <option value="Minibus / HiAce">Minibus / HiAce</option>
                    </select>
                  </div>

                  <div>
                    <span className="block text-slate-400 mb-1 font-semibold">Tarif Lepas Kunci (Rp)</span>
                    <input
                      type="number"
                      value={lepasKunciInput}
                      onChange={e => setLepasKunciInput(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[var(--theme-color)] font-bold text-[var(--theme-color)]"
                    />
                  </div>

                  <div>
                    <span className="block text-slate-400 mb-1 font-semibold">Tarif Dengan Sopir (Rp)</span>
                    <input
                      type="number"
                      value={withDriverInput}
                      onChange={e => setWithDriverInput(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[var(--theme-color)] font-bold text-emerald-600"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleAddPriceRow}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" /> Tambah Kategori Tarif
                  </button>
                </div>
              </div>

            </div>

            {/* Section 3: FAQ Page Kota (Pertanyaan Umum Khusus Kota) */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <h4 className="font-bold text-slate-900 dark:text-white text-base font-poppins flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-indigo-500" />
                  FAQ / Pertanyaan Umum - Page Kota {selectedCity.cityName}
                </h4>
                <span className="text-[11px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                  {cityFaqs.length} FAQ
                </span>
              </div>

              {/* List of City FAQs */}
              <div className="space-y-3">
                {cityFaqs.length === 0 ? (
                  <p className="text-xs text-slate-400 italic p-3 text-center">Belum ada FAQ khusus untuk {selectedCity.cityName}. Silakan tambahkan di bawah.</p>
                ) : (
                  cityFaqs.map((faq, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-1.5 relative group text-xs">
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-bold text-slate-900 dark:text-white font-poppins flex items-start gap-1.5">
                          <span className="text-[var(--theme-color)] font-bold">Q{idx+1}:</span> {faq.question}
                        </span>
                        <button
                          onClick={() => handleDeleteFaqRow(idx)}
                          className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer shrink-0"
                          title="Hapus FAQ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 pl-5 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add New FAQ Form */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs">
                <label className="block font-bold text-slate-800 dark:text-slate-200">
                  + Tambah FAQ Baru Khusus Kota {selectedCity.cityName}
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={newQuestion}
                    onChange={e => setNewQuestion(e.target.value)}
                    placeholder={`Pertanyaan (Contoh: Apakah ada pengantaran ke Bandara ${selectedCity.cityName}?)`}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[var(--theme-color)] font-semibold"
                  />
                  <textarea
                    value={newAnswer}
                    onChange={e => setNewAnswer(e.target.value)}
                    placeholder="Jawaban lengkap..."
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[var(--theme-color)] h-20"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleAddFaqRow}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" /> Tambah FAQ Kota
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Section 2: CTA Page Kota Settings - 1 col */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white text-base font-poppins flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <PhoneCall className="w-5 h-5 text-[var(--theme-color)]" />
                Pengaturan CTA Page {selectedCity.cityName}
              </h4>

              <div>
                <label className="block mb-1 font-bold text-slate-700 dark:text-slate-300">
                  Judul Banner CTA
                </label>
                <input
                  type="text"
                  className="w-full border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none font-semibold"
                  value={ctaTitle}
                  onChange={e => setCtaTitle(e.target.value)}
                  placeholder={`Contoh: Sewa Mobil Mewah di ${selectedCity.cityName} Sekarang!`}
                />
              </div>

              <div>
                <label className="block mb-1 font-bold text-slate-700 dark:text-slate-300">
                  Sub-Judul / Deskripsi Banner CTA
                </label>
                <textarea
                  className="w-full border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl dark:bg-slate-800 h-24 focus:ring-2 focus:ring-[var(--theme-color)] outline-none"
                  value={ctaSubtitle}
                  onChange={e => setCtaSubtitle(e.target.value)}
                  placeholder="Deskripsi ajakan pemesanan..."
                />
              </div>

              <div>
                <label className="block mb-1 font-bold text-slate-700 dark:text-slate-300">
                  Teks Tombol CTA WhatsApp
                </label>
                <input
                  type="text"
                  className="w-full border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none font-semibold"
                  value={ctaButtonText}
                  onChange={e => setCtaButtonText(e.target.value)}
                  placeholder={`Contoh: Chat CS WhatsApp ${selectedCity.cityName}`}
                />
              </div>

              <div>
                <label className="block mb-1 font-bold text-slate-700 dark:text-slate-300">
                  Nomor WhatsApp CS Khusus Kota (Format 62...)
                </label>
                <input
                  type="text"
                  className="w-full border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none font-mono font-bold"
                  value={ctaWhatsappNumber}
                  onChange={e => setCtaWhatsappNumber(e.target.value)}
                  placeholder="6287829609156"
                />
              </div>

              {/* Preview Box */}
              <div className="p-4 bg-slate-900 rounded-2xl text-white space-y-3 mt-4 border border-slate-800">
                <span className="text-[10px] font-bold uppercase text-orange-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Live Preview Banner CTA ({selectedCity.cityName})
                </span>
                <h5 className="font-bold text-sm font-poppins">{ctaTitle || `Sewa Mobil Impian di ${selectedCity.cityName}`}</h5>
                <p className="text-[11px] text-slate-300 line-clamp-2">{ctaSubtitle}</p>
                <div className="bg-emerald-500 text-white font-bold text-[11px] py-2 px-3 rounded-xl text-center">
                  {ctaButtonText || 'Chat CS WhatsApp'}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSaveAll}
                  className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-xl shadow-orange-500/30 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Simpan Pengaturan CTA & Harga {selectedCity.cityName}
                </button>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
};
