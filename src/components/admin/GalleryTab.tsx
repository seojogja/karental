import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MediaItem } from '../../types';
import {
  UploadCloud,
  Image as ImageIcon,
  Copy,
  Trash2,
  Eye,
  Search,
  Filter,
  Check,
  Plus,
  Link,
  Grid,
  List,
  Sparkles,
  X,
  Download,
  Tag
} from 'lucide-react';

export const GalleryTab: React.FC = () => {
  const { mediaItems, addMediaItem, deleteMediaItem, showToast } = useApp() as any;

  // Filter & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Upload Modal / Form state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadCategory, setUploadCategory] = useState<MediaItem['category']>('Umum');
  const [customTitle, setCustomTitle] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Lightbox Modal
  const [previewMedia, setPreviewMedia] = useState<MediaItem | null>(null);

  // Categories list
  const categories: Array<MediaItem['category']> = [
    'Armada',
    'Hero & Banner',
    'Promo',
    'Blog',
    'Dokumen',
    'Umum'
  ];

  // Drag over state
  const [isDragging, setIsDragging] = useState(false);

  // File Upload Handler (File or Files)
  const handleFilesUpload = (files: FileList | File[]) => {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        alert('File ' + file.name + ' bukan gambar.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File ' + file.name + ' melebihi batas 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          const formattedSize = (file.size / 1024).toFixed(0) + ' KB';
          const titleToUse = customTitle.trim() || file.name.replace(/\.[^/.]+$/, '');
          addMediaItem({
            title: titleToUse,
            url: ev.target.result as string,
            category: uploadCategory,
            size: formattedSize
          });
        }
      };
      reader.readAsDataURL(file);
    });
    setCustomTitle('');
    setIsUploading(false);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    addMediaItem({
      title: customTitle.trim() || 'Media Web ' + new Date().toLocaleTimeString('id-ID'),
      url: urlInput.trim(),
      category: uploadCategory,
      size: 'Web Link'
    });
    setUrlInput('');
    setCustomTitle('');
    setIsUploading(false);
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showToast('Link/URL Gambar berhasil disalin ke clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered Items
  const filteredMedia = (mediaItems || []).filter((item: MediaItem) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (cat: MediaItem['category']) => {
    switch (cat) {
      case 'Armada': return 'bg-blue-500/10 text-blue-600 border-blue-500/30';
      case 'Hero & Banner': return 'bg-purple-500/10 text-purple-600 border-purple-500/30';
      case 'Promo': return 'bg-amber-500/10 text-amber-600 border-amber-500/30';
      case 'Blog': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30';
      case 'Dokumen': return 'bg-rose-500/10 text-rose-600 border-rose-500/30';
      default: return 'bg-slate-500/10 text-slate-600 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-indigo-600/30 rounded-2xl border border-indigo-400/30 text-indigo-300">
            <ImageIcon className="w-8 h-8" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[10px] font-black uppercase tracking-wider rounded-full">
              Media Asset Manager
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-poppins text-white pt-1">
              Galeri & Media Center Admin
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Kelola dan unggah semua foto armada, banner promo, gambar blog, dan aset visual dengan mudah.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsUploading(!isUploading)}
          className="px-5 py-3 bg-[var(--theme-color)] hover:bg-orange-600 text-white font-extrabold text-xs rounded-2xl shadow-xl shadow-orange-500/20 flex items-center gap-2 cursor-pointer transition-all active:scale-95 shrink-0"
        >
          {isUploading ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{isUploading ? 'Tutup Form Upload' : 'Upload Gambar Baru'}</span>
        </button>
      </div>

      {/* UPLOAD PANEL FORM */}
      {isUploading && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm font-poppins flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-[var(--theme-color)]" />
              Form Unggah Media Aset
            </h3>
            <span className="text-xs text-slate-400">Mendukung format PNG, JPG, WEBP & URL Link</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Judul / Nama Gambar (Opsional)</label>
              <input
                type="text"
                placeholder="Contoh: Banner Promo Alphard Agustusan"
                value={customTitle}
                onChange={e => setCustomTitle(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Kategori Media</label>
              <select
                value={uploadCategory}
                onChange={e => setUploadCategory(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* DRAG AND DROP ZONE */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files?.length) {
                handleFilesUpload(e.dataTransfer.files);
              }
            }}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all flex flex-col items-center justify-center gap-3 cursor-pointer ${
              isDragging
                ? 'border-[var(--theme-color)] bg-orange-500/10 dark:bg-orange-500/20'
                : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className="p-3 bg-orange-500/10 text-[var(--theme-color)] rounded-2xl">
              <UploadCloud className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Tarik & Lepaskan File Gambar di Sini, atau <span className="text-[var(--theme-color)] underline">Pilih File</span>
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Bisa pilih beberapa file sekaligus (Max 5MB per file)</p>
            </div>
            <input
              type="file"
              accept="image/png, image/jpeg, image/webp"
              multiple
              className="hidden"
              id="gallery-file-input"
              onChange={(e) => e.target.files && handleFilesUpload(e.target.files)}
            />
            <label
              htmlFor="gallery-file-input"
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold cursor-pointer transition-all"
            >
              Browse File Komputer
            </label>
          </div>

          {/* ALTERNATIVE: URL INPUT */}
          <div className="pt-2">
            <div className="relative flex items-center">
              <span className="absolute left-3 text-slate-400">
                <Link className="w-4 h-4" />
              </span>
              <input
                type="url"
                placeholder="Atau masukkan URL gambar langsung (https://...)"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-9 pr-24 py-2.5 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
              />
              <button
                type="button"
                onClick={handleUrlSubmit}
                className="absolute right-1.5 px-3 py-1.5 bg-[var(--theme-color)] hover:bg-orange-600 text-white font-bold text-xs rounded-lg cursor-pointer transition-all"
              >
                Tambah URL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FILTER & CONTROL BAR */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari media gambar..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-9 pr-3 py-2 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('Semua')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === 'Semua'
                ? 'bg-[var(--theme-color)] text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Semua ({mediaItems.length})
          </button>
          {categories.map(cat => {
            const count = mediaItems.filter((m: MediaItem) => m.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[var(--theme-color)] text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shrink-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg cursor-pointer ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-[var(--theme-color)]' : 'text-slate-400'}`}
            title="Tampilan Grid"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-lg cursor-pointer ${viewMode === 'table' ? 'bg-white dark:bg-slate-700 shadow-sm text-[var(--theme-color)]' : 'text-slate-400'}`}
            title="Tampilan Tabel"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* MEDIA DISPLAY CONTAINER */}
      {filteredMedia.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3">
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-2xl mx-auto flex items-center justify-center">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm font-poppins">Tidak ada gambar ditemukan</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Coba ubah kata kunci pencarian atau unggah media baru menggunakan tombol di atas.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia.map((item: MediaItem) => (
            <div
              key={item.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800';
                  }}
                />

                {/* Top Badge */}
                <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-bold border backdrop-blur-md ${getCategoryColor(item.category)}`}>
                  {item.category}
                </span>

                {/* Hover Actions Overlay */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2 backdrop-blur-[2px]">
                  <button
                    onClick={() => setPreviewMedia(item)}
                    className="p-2 bg-white/20 hover:bg-white text-white hover:text-slate-900 rounded-xl transition-all cursor-pointer backdrop-blur-md"
                    title="Pratinjau Gambar"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => copyToClipboard(item.url, item.id)}
                    className="p-2 bg-white/20 hover:bg-white text-white hover:text-slate-900 rounded-xl transition-all cursor-pointer backdrop-blur-md flex items-center gap-1"
                    title="Salin Link Gambar"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Hapus gambar "${item.title}" dari galeri?`)) {
                        deleteMediaItem(item.id);
                      }
                    }}
                    className="p-2 bg-rose-500/80 hover:bg-rose-600 text-white rounded-xl transition-all cursor-pointer backdrop-blur-md"
                    title="Hapus Media"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Info Bottom */}
              <div className="p-3 space-y-1">
                <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate" title={item.title}>
                  {item.title}
                </h4>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span>{new Date(item.uploadedAt).toLocaleDateString('id-ID')}</span>
                  <span className="font-mono">{item.size || 'Base64'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW MODE */
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase">
                <tr>
                  <th className="p-4">Preview</th>
                  <th className="p-4">Nama Gambar</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4">Tanggal Upload</th>
                  <th className="p-4">Ukuran</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredMedia.map((item: MediaItem) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 w-16">
                      <img src={item.url} alt={item.title} className="w-12 h-10 object-cover rounded-xl border" referrerPolicy="no-referrer" />
                    </td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{item.title}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500">{new Date(item.uploadedAt).toLocaleString('id-ID')}</td>
                    <td className="p-3 font-mono text-slate-400">{item.size || '-'}</td>
                    <td className="p-3 text-right space-x-1.5">
                      <button
                        onClick={() => setPreviewMedia(item)}
                        className="p-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200"
                        title="Pratinjau"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => copyToClipboard(item.url, item.id)}
                        className="p-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200"
                        title="Salin Link"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus gambar "${item.title}"?`)) deleteMediaItem(item.id);
                        }}
                        className="p-1.5 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-200"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* LIGHTBOX PREVIEW MODAL */}
      {previewMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setPreviewMedia(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${getCategoryColor(previewMedia.category)}`}>
                {previewMedia.category}
              </span>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white font-poppins truncate">
                {previewMedia.title}
              </h3>
            </div>

            <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center min-h-[250px] max-h-[450px]">
              <img
                src={previewMedia.url}
                alt={previewMedia.title}
                className="max-h-[420px] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs">
              <div className="text-slate-400">
                <span>Diunggah pada: {new Date(previewMedia.uploadedAt).toLocaleString('id-ID')}</span>
                <span className="ml-3 font-mono">Ukuran: {previewMedia.size || 'Base64'}</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => copyToClipboard(previewMedia.url, previewMedia.id)}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-[var(--theme-color)] text-white rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>Salin Link URL</span>
                </button>
                <a
                  href={previewMedia.url}
                  download={previewMedia.title + '.png'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-200"
                >
                  <Download className="w-4 h-4" />
                  <span>Buka/Download</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
