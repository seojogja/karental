import React, { useState } from 'react';
import { UploadCloud, X } from 'lucide-react';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (base64: string) => void;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ label, value, onChange, className }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size (limit to ~2MB just to be safe with base64)
    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran file terlalu besar. Maksimal 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        onChange(ev.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`space-y-1 ${className || ''}`}>
      <label className="block text-xs font-bold">{label}</label>
      <div 
        className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden group bg-slate-50 dark:bg-slate-800/50 flex flex-col items-center justify-center transition-all h-32"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {value ? (
          <>
            <img src={value} alt="Preview" className="w-full h-full object-contain p-2" />
            <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
              <label className="bg-white text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer hover:bg-slate-100">
                Ganti Gambar
                <input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
            <button
              onClick={() => onChange('')}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <X className="w-3 h-3" />
            </button>
          </>
        ) : (
          <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-slate-400 hover:text-[var(--theme-color)] transition-colors">
            <UploadCloud className="w-6 h-6 mb-2" />
            <span className="text-[10px] font-bold">Pilih Gambar (.png, .jpg, .webp)</span>
            <input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handleFileChange} />
          </label>
        )}
      </div>
    </div>
  );
};
