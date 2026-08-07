import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FAQItem } from '../../types';
import { Edit, Trash2, Plus, HelpCircle, Save } from 'lucide-react';

export const FaqTab = () => {
  const { faqs, addFaq, updateFaq, deleteFaq } = useApp() as any;
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FAQItem>({ id: '', question: '', answer: '', category: 'Umum' });

  const handleOpen = (f?: FAQItem) => {
    setForm(f || { id: '', question: '', answer: '', category: 'General' });
    setIsOpen(true);
  };

  const handleSave = () => {
    if (form.id) updateFaq(form);
    else addFaq(form);
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-white">Kelola FAQ (Pertanyaan)</h3>
        <button onClick={() => handleOpen()} className="bg-[var(--theme-color)] text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2">
          <Plus className="w-4 h-4" /> Tambah FAQ
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {faqs.map((f: FAQItem) => (
          <div key={f.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">{f.question}</h4>
            <p className="text-xs text-slate-500 line-clamp-3 flex-1">{f.answer}</p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button onClick={() => handleOpen(f)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
              <button onClick={() => deleteFaq(f.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-lg font-poppins">{form.id ? 'Edit' : 'Tambah'} FAQ</h3>
            <div className="space-y-3 text-xs">
              <div><label className="block mb-1 font-bold">Pertanyaan</label><input className="w-full border p-2 rounded-lg dark:bg-slate-800" value={form.question} onChange={e => setForm({...form, question: e.target.value})} /></div>
              <div><label className="block mb-1 font-bold">Kategori</label><input className="w-full border p-2 rounded-lg dark:bg-slate-800" value={form.category} onChange={e => setForm({...form, category: e.target.value})} /></div>
              <div><label className="block mb-1 font-bold">Jawaban</label><textarea className="w-full border p-2 rounded-lg dark:bg-slate-800 h-32" value={form.answer} onChange={e => setForm({...form, answer: e.target.value})} /></div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button onClick={() => setIsOpen(false)} className="px-5 py-2.5 font-bold text-slate-500 hover:text-slate-700 cursor-pointer">Batal</button>
              <button onClick={handleSave} className="px-6 py-3 font-bold text-white bg-orange-500 hover:bg-orange-600 active:scale-95 rounded-2xl shadow-lg shadow-orange-500/30 cursor-pointer flex items-center gap-2">
                <Save className="w-4 h-4" />
                <span>Simpan FAQ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
