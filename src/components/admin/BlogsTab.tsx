import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BlogArticle } from '../../types';
import { Edit, Trash2, Plus, FileText, Save } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export const BlogsTab = () => {
  const { blogs, addBlog, updateBlog, deleteBlog } = useApp() as any;
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<BlogArticle>({ id: '', title: '', slug: '', excerpt: '', content: '', publishedDate: '', author: '', coverImage: '', readTime: '5 min', category: '' });

  const handleOpen = (b?: BlogArticle) => {
    setForm(b || { id: '', title: '', slug: '', excerpt: '', content: '', publishedDate: new Date().toISOString().slice(0, 10), author: 'Admin Karental', coverImage: '', readTime: '5 min', category: 'Berita' });
    setIsOpen(true);
  };

  const handleSave = () => {
    if (form.id) updateBlog(form);
    else addBlog(form);
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-white">Kelola Artikel & Blog</h3>
        <button onClick={() => handleOpen()} className="bg-[var(--theme-color)] text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2">
          <Plus className="w-4 h-4" /> Tambah Artikel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((b: BlogArticle) => (
          <div key={b.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <img src={b.coverImage} className="w-full h-32 object-cover rounded-xl" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">{b.title}</h4>
            <p className="text-xs text-slate-500 line-clamp-2">{b.excerpt}</p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button onClick={() => handleOpen(b)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
              <button onClick={() => deleteBlog(b.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-lg font-poppins">{form.id ? 'Edit' : 'Tambah'} Artikel</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="col-span-2"><label className="block mb-1 font-bold">Judul Artikel</label><input className="w-full border p-2 rounded-lg dark:bg-slate-800" value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
              <div><label className="block mb-1 font-bold">Slug URL</label><input className="w-full border p-2 rounded-lg dark:bg-slate-800" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} /></div>
              <div><label className="block mb-1 font-bold">Kategori</label><input className="w-full border p-2 rounded-lg dark:bg-slate-800" value={form.category} onChange={e => setForm({...form, category: e.target.value})} /></div>
              <div><label className="block mb-1 font-bold">Tanggal</label><input type="date" className="w-full border p-2 rounded-lg dark:bg-slate-800" value={form.publishedDate} onChange={e => setForm({...form, date: e.target.value})} /></div>
              <div><label className="block mb-1 font-bold">Penulis</label><input className="w-full border p-2 rounded-lg dark:bg-slate-800" value={form.author} onChange={e => setForm({...form, author: e.target.value})} /></div>
              <div className="col-span-2"><ImageUpload label="Foto Sampul Artikel" value={form.coverImage || ''} onChange={val => setForm({...form, coverImage: val})} /></div>
              <div className="col-span-2"><label className="block mb-1 font-bold">Meta Title (SEO)</label><input className="w-full border p-2 rounded-lg dark:bg-slate-800" value={form.metaTitle || ''} onChange={e => setForm({...form, metaTitle: e.target.value})} /></div>
              <div className="col-span-2"><label className="block mb-1 font-bold">Meta Description (SEO)</label><textarea className="w-full border p-2 rounded-lg dark:bg-slate-800" value={form.metaDescription || ''} onChange={e => setForm({...form, metaDescription: e.target.value})} /></div>
              <div className="col-span-2"><label className="block mb-1 font-bold">Ringkasan (Excerpt)</label><textarea className="w-full border p-2 rounded-lg dark:bg-slate-800" value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} /></div>
              <div className="col-span-2"><label className="block mb-1 font-bold">Konten HTML</label><div className="bg-white text-black"><ReactQuill theme="snow" value={form.content} onChange={(val) => setForm({...form, content: val})} style={{height: '300px', marginBottom: '50px'}} /></div></div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button onClick={() => setIsOpen(false)} className="px-5 py-2.5 font-bold text-slate-500 hover:text-slate-700 cursor-pointer">Batal</button>
              <button onClick={handleSave} className="px-6 py-3 font-bold text-white bg-orange-500 hover:bg-orange-600 active:scale-95 rounded-2xl shadow-lg shadow-orange-500/30 cursor-pointer flex items-center gap-2">
                <Save className="w-4 h-4" />
                <span>Simpan Artikel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
