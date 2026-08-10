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

  const handleTitleChange = (newTitle: string) => {
    const autoSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setForm(prev => ({
      ...prev,
      title: newTitle,
      slug: prev.slug === '' || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ? autoSlug : prev.slug
    }));
  };

  const handleSave = () => {
    const finalSlug = form.slug.trim() || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const dataToSave = { ...form, slug: finalSlug };

    if (form.id) updateBlog(dataToSave);
    else addBlog(dataToSave);
    setIsOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-white">Kelola Artikel & Blog</h3>
          <p className="text-xs text-slate-500">Kelola konten artikel SEO, tips otomotif, dan panduan rental mobil.</p>
        </div>
        <button onClick={() => handleOpen()} className="bg-[var(--theme-color)] text-white px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all">
          <Plus className="w-4 h-4" /> Tambah Artikel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((b: BlogArticle) => (
          <div key={b.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden relative">
                <img src={b.coverImage} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-slate-900/80 text-white text-[9px] font-bold rounded-md backdrop-blur-sm">
                  {b.category || 'Berita'}
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">{b.title}</h4>
              <p className="text-[11px] text-slate-400 font-mono">URL: /blog/{b.slug || b.id}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{b.excerpt}</p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <a href={`/blog/${b.slug || b.id}`} target="_blank" rel="noreferrer" className="text-xs font-bold text-indigo-500 hover:underline">
                Lihat Artikel &rarr;
              </a>
              <div className="flex gap-1">
                <button onClick={() => handleOpen(b)} className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer" title="Edit"><Edit className="w-4 h-4" /></button>
                <button onClick={() => deleteBlog(b.id)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer" title="Hapus"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-lg font-poppins text-slate-900 dark:text-white">{form.id ? 'Edit' : 'Tambah'} Artikel Blog</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="col-span-2">
                <label className="block mb-1 font-bold text-slate-700 dark:text-slate-300">Judul Artikel</label>
                <input className="w-full border p-2.5 rounded-xl dark:bg-slate-800 dark:border-slate-700 font-semibold text-xs outline-none focus:ring-2 focus:ring-[var(--theme-color)]" value={form.title} onChange={e => handleTitleChange(e.target.value)} placeholder="Contoh: 5 Tips Memilih Mobil Rental Mewah di Bali" />
              </div>

              <div>
                <label className="block mb-1 font-bold text-slate-700 dark:text-slate-300">Slug URL Artikel</label>
                <input className="w-full border p-2.5 rounded-xl dark:bg-slate-800 dark:border-slate-700 font-mono text-xs outline-none focus:ring-2 focus:ring-[var(--theme-color)]" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} placeholder="tips-memilih-mobil-rental-mewah-bali" />
              </div>

              <div>
                <label className="block mb-1 font-bold text-slate-700 dark:text-slate-300">Kategori Artikel</label>
                <input className="w-full border p-2.5 rounded-xl dark:bg-slate-800 dark:border-slate-700 text-xs outline-none focus:ring-2 focus:ring-[var(--theme-color)]" value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="Tips & Guide, Destinasi, Otomotif" />
              </div>

              <div>
                <label className="block mb-1 font-bold text-slate-700 dark:text-slate-300">Tanggal Publikasi</label>
                <input type="date" className="w-full border p-2.5 rounded-xl dark:bg-slate-800 dark:border-slate-700 text-xs outline-none focus:ring-2 focus:ring-[var(--theme-color)]" value={form.publishedDate} onChange={e => setForm({...form, publishedDate: e.target.value})} />
              </div>

              <div>
                <label className="block mb-1 font-bold text-slate-700 dark:text-slate-300">Penulis / Author</label>
                <input className="w-full border p-2.5 rounded-xl dark:bg-slate-800 dark:border-slate-700 text-xs outline-none focus:ring-2 focus:ring-[var(--theme-color)]" value={form.author} onChange={e => setForm({...form, author: e.target.value})} />
              </div>

              <div className="col-span-2">
                <ImageUpload label="Foto Sampul Artikel (Cover Image)" value={form.coverImage || ''} onChange={val => setForm({...form, coverImage: val})} />
              </div>

              <div className="col-span-2">
                <label className="block mb-1 font-bold text-slate-700 dark:text-slate-300">Meta Title (SEO)</label>
                <input className="w-full border p-2.5 rounded-xl dark:bg-slate-800 dark:border-slate-700 text-xs outline-none focus:ring-2 focus:ring-[var(--theme-color)]" value={form.metaTitle || ''} onChange={e => setForm({...form, metaTitle: e.target.value})} placeholder="Meta Title untuk Google Search" />
              </div>

              <div className="col-span-2">
                <label className="block mb-1 font-bold text-slate-700 dark:text-slate-300">Meta Description (SEO)</label>
                <textarea className="w-full border p-2.5 rounded-xl dark:bg-slate-800 dark:border-slate-700 text-xs outline-none focus:ring-2 focus:ring-[var(--theme-color)]" value={form.metaDescription || ''} onChange={e => setForm({...form, metaDescription: e.target.value})} placeholder="Deskripsi meta 150 karakter untuk snippet Google" />
              </div>

              <div className="col-span-2">
                <label className="block mb-1 font-bold text-slate-700 dark:text-slate-300">Ringkasan Singkat (Excerpt)</label>
                <textarea className="w-full border p-2.5 rounded-xl dark:bg-slate-800 dark:border-slate-700 text-xs outline-none focus:ring-2 focus:ring-[var(--theme-color)]" value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} placeholder="Ringkasan 2 kalimat untuk tampil di kartu artikel" />
              </div>

              <div className="col-span-2">
                <label className="block mb-1 font-bold text-slate-700 dark:text-slate-300">Konten Artikel (Rich Text Editor)</label>
                <div className="bg-white text-black rounded-xl overflow-hidden border">
                  <ReactQuill theme="snow" value={form.content} onChange={(val) => setForm({...form, content: val})} style={{height: '250px', marginBottom: '50px'}} />
                </div>
              </div>
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
