import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CityPageData } from '../../types';
import { Edit, Trash2, Plus, MapPin, DollarSign, PhoneCall, Save, HelpCircle } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export const CitiesTab = () => {
  const { cities, addCity, deleteCity, showToast } = useApp() as any;
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<CityPageData | null>(null);
  
  const defaultCity: CityPageData = {
    slug: '',
    cityName: '',
    province: '',
    heroTagline: '',
    landmarkImage: '',
    metaTitle: '',
    metaDescription: '',
    articleContent: '',
    popularLocations: ['Bandara', 'Pusat Kota', 'Stasiun Utama'],
    priceList: [
      { carCategory: 'MPV Luxury', lepasKunciRate: 2200000, withDriverRate: 2500000 },
      { carCategory: 'SUV Premium', lepasKunciRate: 1100000, withDriverRate: 1300000 },
      { carCategory: 'Executive Sedan', lepasKunciRate: 1800000, withDriverRate: 2100000 }
    ],
    ctaTitle: '',
    ctaSubtitle: '',
    ctaButtonText: '',
    ctaWhatsappNumber: '',
    cityFaqs: []
  };
  
  const [form, setForm] = useState<CityPageData>(defaultCity);

  // Form price list helper
  const [newCat, setNewCat] = useState('MPV Luxury');
  const [newLepas, setNewLepas] = useState(2000000);
  const [newWithDrv, setNewWithDrv] = useState(2300000);

  // FAQ helper
  const [faqQ, setFaqQ] = useState('');
  const [faqA, setFaqA] = useState('');

  const handleAddFaq = () => {
    if (!faqQ.trim() || !faqA.trim()) return;
    setForm({
      ...form,
      cityFaqs: [...(form.cityFaqs || []), { question: faqQ.trim(), answer: faqA.trim() }]
    });
    setFaqQ('');
    setFaqA('');
  };

  const handleRemoveFaq = (idx: number) => {
    setForm({
      ...form,
      cityFaqs: (form.cityFaqs || []).filter((_, i) => i !== idx)
    });
  };

  const handleAddPrice = () => {
    if (!newCat) return;
    const existing = (form.priceList || []).filter(p => p.carCategory !== newCat);
    setForm({
      ...form,
      priceList: [...existing, { carCategory: newCat, lepasKunciRate: Number(newLepas), withDriverRate: Number(newWithDrv) }]
    });
  };

  const handleRemovePrice = (catName: string) => {
    setForm({
      ...form,
      priceList: (form.priceList || []).filter(p => p.carCategory !== catName)
    });
  };

  const handleOpen = (city?: CityPageData) => {
    if (city) {
      setEditing(city);
      setForm({
        ...city,
        ctaTitle: city.ctaTitle || `Sewa Mobil Impian Anda di ${city.cityName} Sekarang!`,
        ctaSubtitle: city.ctaSubtitle || `Dapatkan penawaran harga terbaik & promo diskon untuk rental mobil di ${city.cityName}.`,
        ctaButtonText: city.ctaButtonText || `Chat CS WhatsApp ${city.cityName}`,
        ctaWhatsappNumber: city.ctaWhatsappNumber || '6287829609156'
      });
    } else {
      setEditing(null);
      setForm(defaultCity);
    }
    setIsOpen(true);
  };

  const handleSave = () => {
    addCity(form);
    setIsOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-white">Page Per Kota SEO (SAS v5)</h3>
          <p className="text-xs text-slate-500">Kelola landing page kota, artikel SEO, CTA banner, dan daftar harga tiap kota.</p>
        </div>
        <button onClick={() => handleOpen()} className="bg-[var(--theme-color)] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md">
          <Plus className="w-4 h-4" /> Tambah Kota Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map((city: CityPageData) => (
          <div key={city.slug} className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-base font-poppins">
                <MapPin className="w-4 h-4 text-[var(--theme-color)]" /> {city.cityName}
              </div>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full font-semibold text-slate-500">
                {city.province}
              </span>
            </div>
            <p className="text-xs text-slate-500 line-clamp-2">{city.metaDescription}</p>
            
            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>{city.priceList?.length || 0} Kategori Harga</span>
              <span>CTA Custom: {city.ctaTitle ? 'Aktif' : 'Default'}</span>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button onClick={() => handleOpen(city)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl font-bold text-xs flex items-center gap-1 cursor-pointer">
                <Edit className="w-4 h-4" /> Edit Detail Kota
              </button>
              <button onClick={() => deleteCity(city.slug)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl cursor-pointer">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-lg font-poppins text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              {editing ? `Edit Landing Page Kota: ${editing.cityName}` : 'Tambah Kota Baru'}
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div><label className="block mb-1 font-bold">Slug (URL)</label><input className="w-full border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl dark:bg-slate-800 font-semibold" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} placeholder="rental-mobil-nama-kota" /></div>
              <div><label className="block mb-1 font-bold">Nama Kota</label><input className="w-full border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl dark:bg-slate-800 font-semibold" value={form.cityName} onChange={e => setForm({...form, cityName: e.target.value})} placeholder="Contoh: Jakarta" /></div>
              <div><label className="block mb-1 font-bold">Provinsi</label><input className="w-full border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl dark:bg-slate-800" value={form.province} onChange={e => setForm({...form, province: e.target.value})} /></div>
              <div><label className="block mb-1 font-bold">Landmark Image URL</label><ImageUpload label="Landmark Image" value={form.landmarkImage} onChange={val => setForm({...form, landmarkImage: val})} /></div>
              <div className="col-span-2"><label className="block mb-1 font-bold">Hero Tagline</label><input className="w-full border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl dark:bg-slate-800" value={form.heroTagline} onChange={e => setForm({...form, heroTagline: e.target.value})} /></div>
              <div className="col-span-2"><label className="block mb-1 font-bold">Meta Title SEO</label><input className="w-full border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl dark:bg-slate-800" value={form.metaTitle} onChange={e => setForm({...form, metaTitle: e.target.value})} /></div>
              <div className="col-span-2"><label className="block mb-1 font-bold">Meta Description SEO</label><textarea className="w-full border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl dark:bg-slate-800 h-20" value={form.metaDescription} onChange={e => setForm({...form, metaDescription: e.target.value})} /></div>
              
              {/* CTA Section */}
              <div className="col-span-2 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-bold text-sm text-[var(--theme-color)] flex items-center gap-2">
                  <PhoneCall className="w-4 h-4" /> Pengaturan Banner CTA Page Kota
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1 font-semibold">Judul CTA Banner</label>
                    <input className="w-full border border-slate-200 dark:border-slate-700 p-2 rounded-xl dark:bg-slate-800" value={form.ctaTitle || ''} onChange={e => setForm({...form, ctaTitle: e.target.value})} placeholder="Sewa Mobil Mewah Sekarang" />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold">Teks Tombol CTA</label>
                    <input className="w-full border border-slate-200 dark:border-slate-700 p-2 rounded-xl dark:bg-slate-800" value={form.ctaButtonText || ''} onChange={e => setForm({...form, ctaButtonText: e.target.value})} placeholder="Chat CS WhatsApp Kota" />
                  </div>
                  <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Sub-Judul / Deskripsi CTA</label>
                    <input className="w-full border border-slate-200 dark:border-slate-700 p-2 rounded-xl dark:bg-slate-800" value={form.ctaSubtitle || ''} onChange={e => setForm({...form, ctaSubtitle: e.target.value})} placeholder="Dapatkan promo sewa mobil murah di kota ini..." />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold">Nomor WA CS (Format 62...)</label>
                    <input className="w-full border border-slate-200 dark:border-slate-700 p-2 rounded-xl dark:bg-slate-800 font-mono" value={form.ctaWhatsappNumber || ''} onChange={e => setForm({...form, ctaWhatsappNumber: e.target.value})} placeholder="6287829609156" />
                  </div>
                </div>
              </div>

              {/* Price List Section */}
              <div className="col-span-2 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-bold text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Kelola Daftar Harga (Tarif Rental)
                </h4>
                
                <div className="space-y-2">
                  {(form.priceList || []).map((row, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white dark:bg-slate-900 p-2.5 rounded-xl border text-xs">
                      <span className="font-bold">{row.carCategory}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-[var(--theme-color)] font-bold">Lepas Kunci: Rp {Number(row.lepasKunciRate).toLocaleString('id-ID')}</span>
                        <span className="text-emerald-600 font-bold">Sopir: Rp {Number(row.withDriverRate).toLocaleString('id-ID')}</span>
                        <button type="button" onClick={() => handleRemovePrice(row.carCategory)} className="text-red-500 font-bold hover:underline">Hapus</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-end gap-2 text-xs">
                  <div className="flex-1">
                    <span className="block mb-1 font-semibold">Kategori Mobil</span>
                    <select value={newCat} onChange={e => setNewCat(e.target.value)} className="w-full border p-2 rounded-xl dark:bg-slate-800">
                      <option value="MPV Luxury">MPV Luxury</option>
                      <option value="SUV Premium">SUV Premium</option>
                      <option value="Executive Sedan">Executive Sedan</option>
                      <option value="Compact City">Compact City</option>
                      <option value="Wedding & VIP">Wedding & VIP</option>
                    </select>
                  </div>
                  <div>
                    <span className="block mb-1 font-semibold">Lepas Kunci (Rp)</span>
                    <input type="number" value={newLepas} onChange={e => setNewLepas(Number(e.target.value))} className="w-28 border p-2 rounded-xl dark:bg-slate-800 font-bold text-[var(--theme-color)]" />
                  </div>
                  <div>
                    <span className="block mb-1 font-semibold">Dengan Sopir (Rp)</span>
                    <input type="number" value={newWithDrv} onChange={e => setNewWithDrv(Number(e.target.value))} className="w-28 border p-2 rounded-xl dark:bg-slate-800 font-bold text-emerald-600" />
                  </div>
                  <button type="button" onClick={handleAddPrice} className="bg-emerald-600 text-white font-bold px-3 py-2 rounded-xl cursor-pointer">+ Tambah</button>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="col-span-2 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" /> Kelola FAQ Khusus Kota {form.cityName || ''}
                </h4>
                
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {(form.cityFaqs || []).length === 0 ? (
                    <p className="text-xs text-slate-400 italic">Belum ada FAQ khusus untuk {form.cityName || 'kota ini'}.</p>
                  ) : (
                    (form.cityFaqs || []).map((faq, idx) => (
                      <div key={idx} className="flex items-start justify-between bg-white dark:bg-slate-900 p-2.5 rounded-xl border text-xs gap-2">
                        <div className="space-y-0.5">
                          <p className="font-bold text-slate-800 dark:text-slate-200">Q: {faq.question}</p>
                          <p className="text-slate-500 text-[11px]">A: {faq.answer}</p>
                        </div>
                        <button type="button" onClick={() => handleRemoveFaq(idx)} className="text-red-500 font-bold hover:underline shrink-0">Hapus</button>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-2 space-y-2 text-xs">
                  <input
                    type="text"
                    value={faqQ}
                    onChange={e => setFaqQ(e.target.value)}
                    placeholder={`Pertanyaan FAQ (Contoh: Apakah bisa sewa mobil di ${form.cityName || 'kota ini'} lepas kunci?)`}
                    className="w-full border p-2 rounded-xl dark:bg-slate-800 font-semibold"
                  />
                  <textarea
                    value={faqA}
                    onChange={e => setFaqA(e.target.value)}
                    placeholder="Jawaban FAQ..."
                    className="w-full border p-2 rounded-xl dark:bg-slate-800 h-16"
                  />
                  <div className="flex justify-end">
                    <button type="button" onClick={handleAddFaq} className="bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl cursor-pointer flex items-center gap-1">
                      <Plus className="w-4 h-4" /> Tambah FAQ Kota
                    </button>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="col-span-2">
                <label className="block mb-1 font-bold text-[var(--theme-color)]">SEO Article Content (HTML)</label>
                <div className="bg-white text-black"><ReactQuill theme="snow" value={form.articleContent} onChange={(val) => setForm({...form, articleContent: val})} style={{height: '250px', marginBottom: '50px'}} /></div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button onClick={() => setIsOpen(false)} className="px-5 py-2.5 font-bold text-slate-500 hover:text-slate-700 cursor-pointer">Batal</button>
              <button onClick={handleSave} className="px-6 py-3 font-bold text-white bg-orange-500 hover:bg-orange-600 active:scale-95 rounded-2xl shadow-lg shadow-orange-500/30 cursor-pointer flex items-center gap-2">
                <Save className="w-4 h-4" />
                <span>Simpan Data Kota</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
