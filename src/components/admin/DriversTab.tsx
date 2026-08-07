import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Edit, Trash2, Plus, Users, Save } from 'lucide-react';
import { Driver } from '../../types';
import { ImageUpload } from './ImageUpload';

export const DriversTab = () => {
  const { drivers, addDriver, updateDriver, deleteDriver, showToast } = useApp() as any;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Driver | null>(null);
  const [form, setForm] = useState<Partial<Driver>>({
    name: '', phone: '', assignedCity: 'Jakarta', rating: 5, experienceYears: 2, status: 'Tersedia', photoUrl: ''
  });

  const handleSave = () => {
    if (!form.name || !form.phone) {
      if (showToast) showToast('Harap isi Nama dan No. Telp Sopir!');
      return;
    }
    const driverData: Driver = {
      id: editingItem?.id || '',
      name: form.name || 'Sopir Karental',
      phone: form.phone || '081234567890',
      assignedCity: form.assignedCity || 'Jakarta',
      rating: form.rating || 5,
      experienceYears: form.experienceYears || 3,
      status: (form.status as any) || 'Tersedia',
      photoUrl: form.photoUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80'
    };

    if (editingItem && updateDriver) {
      updateDriver(driverData);
    } else if (addDriver) {
      addDriver(driverData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-[var(--theme-color)]" /> Kelola Sopir (Driver)
        </h3>
        <button onClick={() => { setEditingItem(null); setForm({ name: '', phone: '', assignedCity: '', rating: 5, experienceYears: 2, status: 'Tersedia', photoUrl: '' }); setIsModalOpen(true); }} className="bg-[var(--theme-color)] hover:opacity-90 text-white font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-[var(--theme-color)]/20">
          <Plus className="w-4 h-4" /> Tambah Sopir
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase">
            <tr>
              <th className="p-4">Sopir</th>
              <th className="p-4">Kota</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {drivers?.map((d: Driver) => (
              <tr key={d.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-4 flex items-center gap-3">
                  <img src={d.photoUrl} alt={d.name} className="w-10 h-10 object-cover rounded-full" />
                  <div>
                    <strong className="block font-bold">{d.name}</strong>
                    <span className="text-[10px] text-slate-400">{d.phone} • Exp {d.experienceYears}th</span>
                  </div>
                </td>
                <td className="p-4">{d.assignedCity}</td>
                <td className="p-4">{d.status}</td>
                <td className="p-4 text-right">
                  <button onClick={() => { setEditingItem(d); setForm(d); setIsModalOpen(true); }} className="p-2 text-slate-400 hover:text-blue-500">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => { if (deleteDriver) deleteDriver(d.id); }} className="p-2 text-slate-400 hover:text-red-500 cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-lg">{editingItem ? 'Edit Sopir' : 'Tambah Sopir'}</h3>
            <div className="space-y-3 text-xs">
              <div><label className="block mb-1 font-bold">Nama</label><input className="w-full border p-2 rounded-lg dark:bg-slate-800" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
              <div><label className="block mb-1 font-bold">No. Telp</label><input className="w-full border p-2 rounded-lg dark:bg-slate-800" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
              <div><label className="block mb-1 font-bold">Kota Penugasan</label><input className="w-full border p-2 rounded-lg dark:bg-slate-800" value={form.assignedCity} onChange={e => setForm({...form, assignedCity: e.target.value})} /></div>
              <ImageUpload label="Foto Sopir" value={form.photoUrl || ''} onChange={val => setForm({...form, photoUrl: val})} />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 font-bold text-slate-500 hover:text-slate-700 cursor-pointer">Batal</button>
              <button onClick={handleSave} className="px-6 py-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white rounded-2xl font-bold shadow-lg shadow-orange-500/30 cursor-pointer flex items-center gap-2">
                <Save className="w-4 h-4" />
                <span>Simpan Sopir</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
