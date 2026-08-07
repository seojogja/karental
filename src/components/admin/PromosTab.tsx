import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Promo } from '../../types';
import { Edit, Trash2, Plus, Tag, Save } from 'lucide-react';
import { ImageUpload } from './ImageUpload';

export const PromosTab = () => {
  const { promos, addPromo, updatePromo, deletePromo } = useApp() as any;
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<Promo>({ id: '', code: '', title: '', description: '', discountPercentage: 0, validUntil: '', bannerImage: '', maxDiscount: 0, minTransaction: 0 });

  const handleOpen = (p?: Promo) => {
    setForm(p || { id: '', code: '', title: '', description: '', discountPercentage: 0, validUntil: '', bannerImage: '', maxDiscount: 0, minTransaction: 0 });
    setIsOpen(true);
  };

  const handleSave = () => {
    if (form.id) updatePromo(form);
    else addPromo(form);
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-white">Kelola Voucher & Promo</h3>
        <button onClick={() => handleOpen()} className="bg-[var(--theme-color)] text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2">
          <Plus className="w-4 h-4" /> Tambah Promo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promos.map((p: Promo) => (
          <div key={p.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <img src={p.bannerImage} className="w-full h-32 object-cover rounded-xl" />
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <Tag className="w-4 h-4 text-[var(--theme-color)]" /> {p.code} ({p.discountPercentage}%)
            </div>
            <p className="text-xs text-slate-500 font-bold">{p.title}</p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button onClick={() => handleOpen(p)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
              <button onClick={() => deletePromo(p.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-lg font-poppins">{form.id ? 'Edit' : 'Tambah'} Promo</h3>
            <div className="space-y-3 text-xs">
              <div><label className="block mb-1 font-bold">Kode Voucher</label><input className="w-full border p-2 rounded-lg dark:bg-slate-800" value={form.code || ''} onChange={e => setForm({...form, code: e.target.value})} /></div>
              <div><label className="block mb-1 font-bold">Judul Promo</label><input className="w-full border p-2 rounded-lg dark:bg-slate-800" value={form.title || ''} onChange={e => setForm({...form, title: e.target.value})} /></div>
              <div><label className="block mb-1 font-bold">Deskripsi Singkat</label><textarea className="w-full border p-2 rounded-lg dark:bg-slate-800" value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block mb-1 font-bold">Diskon (%)</label><input type="number" className="w-full border p-2 rounded-lg dark:bg-slate-800" value={form.discountPercentage || 0} onChange={e => setForm({...form, discountPercentage: parseInt(e.target.value) || 0})} /></div>
                <div><label className="block mb-1 font-bold">Berlaku Hingga</label><input type="date" className="w-full border p-2 rounded-lg dark:bg-slate-800" value={form.validUntil || ''} onChange={e => setForm({...form, validUntil: e.target.value})} /></div>
              </div>
              <ImageUpload label="Gambar Banner Promo" value={form.bannerImage || ''} onChange={val => setForm({...form, bannerImage: val})} />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button onClick={() => setIsOpen(false)} className="px-5 py-2.5 font-bold text-slate-500 hover:text-slate-700 cursor-pointer">Batal</button>
              <button onClick={handleSave} className="px-6 py-3 font-bold text-white bg-orange-500 hover:bg-orange-600 active:scale-95 rounded-2xl shadow-lg shadow-orange-500/30 cursor-pointer flex items-center gap-2">
                <Save className="w-4 h-4" />
                <span>Simpan Promo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
