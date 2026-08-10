import React, { useState } from 'react';
import { UploadCloud, X, Image as ImageIcon, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MediaItem } from '../../types';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (base64: string) => void;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ label, value, onChange, className }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const { mediaItems, addMediaItem } = useApp() as any;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file terlalu besar. Maksimal 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        const base64 = ev.target.result as string;
        onChange(base64);
        
        // Also save to Media Gallery automatically if not existing
        if (addMediaItem) {
          addMediaItem({
            title: file.name.replace(/\.[^/.]+$/, ''),
            url: base64,
            category: 'Umum',
            size: (file.size / 1024).toFixed(0) + ' KB'
          });
        }
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`space-y-1 ${className || ''}`}>
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold">{label}</label>
        {mediaItems && mediaItems.length > 0 && (
          <button
            type="button"
            onClick={() => setIsGalleryModalOpen(true)}
            className="text-[10px] font-bold text-[var(--theme-color)] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <ImageIcon className="w-3 h-3" />
            <span>Pilih dari Galeri ({mediaItems.length})</span>
          </button>
        )}
      </div>

      <div 
        className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden group bg-slate-50 dark:bg-slate-800/50 flex flex-col items-center justify-center transition-all h-32"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {value ? (
          <>
            <img src={value} alt="Preview" className="w-full h-full object-contain p-2" referrerPolicy="no-referrer" />
            <div className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-2 transition-opacity ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
              <label className="bg-white text-slate-900 px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer hover:bg-slate-100">
                Ganti File
                <input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handleFileChange} />
              </label>

              {mediaItems && mediaItems.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(true)}
                  className="bg-[var(--theme-color)] text-white px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer hover:bg-orange-600"
                >
                  Galeri
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
            <label className="flex flex-col items-center justify-center cursor-pointer hover:text-[var(--theme-color)] transition-colors w-full h-full">
              <UploadCloud className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-bold">Upload File Komputer (.png, .jpg, .webp)</span>
              <input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handleFileChange} />
            </label>
          </div>
        )}
      </div>

      {/* GALLERY PICKER MODAL */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[var(--theme-color)]" />
                Pilih Gambar dari Galeri Media
              </h3>
              <button
                type="button"
                onClick={() => setIsGalleryModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(mediaItems || []).map((m: MediaItem) => (
                <div
                  key={m.id}
                  onClick={() => {
                    onChange(m.url);
                    setIsGalleryModalOpen(false);
                  }}
                  className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                    value === m.url ? 'border-[var(--theme-color)] ring-2 ring-[var(--theme-color)]/30' : 'border-slate-200 dark:border-slate-700 hover:border-[var(--theme-color)]'
                  }`}
                >
                  <img src={m.url} alt={m.title} className="w-full h-24 object-cover" referrerPolicy="no-referrer" />
                  <div className="p-1.5 bg-slate-900/80 text-white text-[10px] truncate font-semibold">
                    {m.title}
                  </div>
                  {value === m.url && (
                    <div className="absolute top-1 right-1 bg-[var(--theme-color)] text-white p-1 rounded-full">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
