import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ImageUpload } from './ImageUpload';
import { Save, Settings } from 'lucide-react';

export const SettingsTab = () => {
  const { settings, updateSettings } = useApp() as any;
  const [form, setForm] = useState({
    faviconUrl: '',
    logoUrl: '',
    logoTransparentUrl: '',
    themeColor: '#fe7938',
    globalMetaTitle: '',
    googleAnalyticsId: '',
    googleAdsId: '',
    globalMetaDescription: '',
    heroTitle: '',
    heroSubtitle: '',
    heroCtaText: '',
    heroBackgroundImage: '',
    ctaTitle: '',
    ctaSubtitle: '',
    ctaButtonText: '',
    footerAboutText: '',
    footerAddress: '',
    footerEmail: '',
    footerPhone: '',
    whatsappNumber: '',
    footerSocialLinks: { fb: '', ig: '', twitter: '', youtube: '', tiktok: '' }
  });

  useEffect(() => {
    if (settings) {
      setForm({
        faviconUrl: settings.faviconUrl || '',
        logoUrl: settings.logoUrl || '',
        logoTransparentUrl: settings.logoTransparentUrl || '',
        themeColor: settings.themeColor || '#fe7938',
        globalMetaTitle: settings.globalMetaTitle || '',
        googleAnalyticsId: settings.googleAnalyticsId || '',
        googleAdsId: settings.googleAdsId || '',
        globalMetaDescription: settings.globalMetaDescription || '',
        heroTitle: settings.heroTitle || '',
        heroSubtitle: settings.heroSubtitle || '',
        heroCtaText: settings.heroCtaText || '',
        heroBackgroundImage: settings.heroBackgroundImage || '',
        ctaTitle: settings.ctaTitle || '',
        ctaSubtitle: settings.ctaSubtitle || '',
        ctaButtonText: settings.ctaButtonText || '',
        footerAboutText: settings.footerAboutText || '',
        footerAddress: settings.footerAddress || '',
        footerEmail: settings.footerEmail || '',
        footerPhone: settings.footerPhone || '',
        whatsappNumber: settings.whatsappNumber || settings.footerPhone || '6287829609156',
        footerSocialLinks: {
          fb: settings.footerSocialLinks?.fb || '',
          ig: settings.footerSocialLinks?.ig || '',
          twitter: settings.footerSocialLinks?.twitter || '',
          youtube: settings.footerSocialLinks?.youtube || '',
          tiktok: settings.footerSocialLinks?.tiktok || ''
        }
      });
    }
  }, [settings]);

  const handleSave = () => {
    updateSettings(form);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-[var(--theme-color)]" /> Pengaturan Umum & SEO
        </h3>
        <button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-6 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/30 transition-all cursor-pointer">
          <Save className="w-4 h-4" /> Simpan Pengaturan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <h4 className="font-bold border-b border-slate-100 dark:border-slate-800 pb-2">Identitas Visual (Branding)</h4>
          <div className="grid grid-cols-2 gap-4">
            <ImageUpload label="Logo Favicon (Ikon Tab)" value={form.faviconUrl} onChange={val => setForm({...form, faviconUrl: val})} />
            <ImageUpload label="Logo Website (Header)" value={form.logoUrl} onChange={val => setForm({...form, logoUrl: val})} />
            <ImageUpload label="Logo Transparan (Footer/Dark)" value={form.logoTransparentUrl} onChange={val => setForm({...form, logoTransparentUrl: val})} />
            
            <div className="space-y-1">
              <label className="block text-xs font-bold">Warna Tema (Theme Color)</label>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  className="w-14 h-14 rounded cursor-pointer border-0 p-0" 
                  value={form.themeColor} 
                  onChange={e => setForm({...form, themeColor: e.target.value})} 
                />
                <div className="text-xs font-mono uppercase font-bold text-slate-500">{form.themeColor}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <h4 className="font-bold border-b border-slate-100 dark:border-slate-800 pb-2">SEO Global Meta</h4>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block mb-1 font-bold">Global Title Tag</label>
              <input 
                className="w-full border p-2 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" 
                value={form.globalMetaTitle} 
                onChange={e => setForm({...form, globalMetaTitle: e.target.value})} 
                placeholder="Contoh: Karental - Pusat Sewa Mobil Mewah"
              />
            </div>
            
            <div>
              <label className="block mb-1 font-bold">Global Meta Description</label>
              <textarea 
                className="w-full border p-2 rounded-lg dark:bg-slate-800 h-24 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" 
                value={form.globalMetaDescription} 
                onChange={e => setForm({...form, globalMetaDescription: e.target.value})} 
                placeholder="Deskripsi singkat website..."
              />
            </div>
            <div>
              <label className="block mb-1 font-bold">Google Analytics Tracking ID (G-XXXXX)</label>
              <input 
                className="w-full border p-2 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" 
                value={form.googleAnalyticsId} 
                onChange={e => setForm({...form, googleAnalyticsId: e.target.value})} 
                placeholder="G-..."
              />
            </div>
            <div>
              <label className="block mb-1 font-bold">Google Ads Conversion ID (AW-XXXXX)</label>
              <input 
                className="w-full border p-2 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" 
                value={form.googleAdsId} 
                onChange={e => setForm({...form, googleAdsId: e.target.value})} 
                placeholder="AW-..."
              />
            </div>

          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <h4 className="font-bold border-b border-slate-100 dark:border-slate-800 pb-2">Hero Homepage</h4>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block mb-1 font-bold">Judul Utama (Hero Title)</label>
              <input className="w-full border p-2 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" value={form.heroTitle} onChange={e => setForm({...form, heroTitle: e.target.value})} />
            </div>
            <div>
              <label className="block mb-1 font-bold">Sub Judul (Hero Subtitle)</label>
              <textarea className="w-full border p-2 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" value={form.heroSubtitle} onChange={e => setForm({...form, heroSubtitle: e.target.value})} />
            </div>
            <div>
              <label className="block mb-1 font-bold">Teks Tombol WhatsApp Hero (Hero CTA Button)</label>
              <input placeholder="Default: Chat WhatsApp Direct" className="w-full border p-2 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" value={form.heroCtaText} onChange={e => setForm({...form, heroCtaText: e.target.value})} />
            </div>
            <ImageUpload label="Background Hero Image" value={form.heroBackgroundImage} onChange={val => setForm({...form, heroBackgroundImage: val})} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <h4 className="font-bold border-b border-slate-100 dark:border-slate-800 pb-2">CTA Banner (Call to Action)</h4>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block mb-1 font-bold">Judul CTA</label>
              <input className="w-full border p-2 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" value={form.ctaTitle} onChange={e => setForm({...form, ctaTitle: e.target.value})} />
            </div>
            <div>
              <label className="block mb-1 font-bold">Sub Judul CTA</label>
              <textarea className="w-full border p-2 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" value={form.ctaSubtitle} onChange={e => setForm({...form, ctaSubtitle: e.target.value})} />
            </div>
            <div>
              <label className="block mb-1 font-bold">Teks Tombol CTA</label>
              <input className="w-full border p-2 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" value={form.ctaButtonText} onChange={e => setForm({...form, ctaButtonText: e.target.value})} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <h4 className="font-bold border-b border-slate-100 dark:border-slate-800 pb-2">Footer Konten & Kontak</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-bold">Teks Singkat Tentang Kami (About)</label>
              <textarea className="w-full border p-2 rounded-lg dark:bg-slate-800 h-24 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" value={form.footerAboutText} onChange={e => setForm({...form, footerAboutText: e.target.value})} />
            </div>
            <div>
              <label className="block mb-1 font-bold">Alamat Kantor</label>
              <textarea className="w-full border p-2 rounded-lg dark:bg-slate-800 h-20 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" value={form.footerAddress} onChange={e => setForm({...form, footerAddress: e.target.value})} />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-bold">Email</label>
              <input className="w-full border p-2 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" value={form.footerEmail} onChange={e => setForm({...form, footerEmail: e.target.value})} />
            </div>
            <div>
              <label className="block mb-1 font-bold">No. WhatsApp Direct Admin (Format: 628... / 08...)</label>
              <input placeholder="Contoh: 6287829609156" className="w-full border p-2 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" value={form.whatsappNumber || ''} onChange={e => setForm({...form, whatsappNumber: e.target.value})} />
            </div>
            <div>
              <label className="block mb-1 font-bold">No. Telepon Kontak Footer</label>
              <input className="w-full border p-2 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" value={form.footerPhone} onChange={e => setForm({...form, footerPhone: e.target.value})} />
            </div>
            
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="block mb-2 font-bold">Link Sosial Media</label>
              <div className="space-y-2">
                <input placeholder="Facebook URL" className="w-full border p-2 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" value={form.footerSocialLinks?.fb || ''} onChange={e => setForm({...form, footerSocialLinks: {...form.footerSocialLinks, fb: e.target.value}})} />
                <input placeholder="Instagram URL" className="w-full border p-2 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" value={form.footerSocialLinks?.ig || ''} onChange={e => setForm({...form, footerSocialLinks: {...form.footerSocialLinks, ig: e.target.value}})} />
                <input placeholder="Twitter/X URL" className="w-full border p-2 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" value={form.footerSocialLinks?.twitter || ''} onChange={e => setForm({...form, footerSocialLinks: {...form.footerSocialLinks, twitter: e.target.value}})} />
                <input placeholder="YouTube URL" className="w-full border p-2 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" value={form.footerSocialLinks?.youtube || ''} onChange={e => setForm({...form, footerSocialLinks: {...form.footerSocialLinks, youtube: e.target.value}})} />
                <input placeholder="TikTok URL" className="w-full border p-2 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" value={form.footerSocialLinks?.tiktok || ''} onChange={e => setForm({...form, footerSocialLinks: {...form.footerSocialLinks, tiktok: e.target.value}})} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating/Sticky Save Button Bar */}
      <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={handleSave}
          className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-8 py-3.5 rounded-2xl text-xs flex items-center gap-2 shadow-xl shadow-orange-500/30 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Semua Pengaturan Data</span>
        </button>
      </div>
    </div>
  );
};
