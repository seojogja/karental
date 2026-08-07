const fs = require('fs');
let code = fs.readFileSync('src/components/admin/SettingsTab.tsx', 'utf8');

code = code.replace(
  "globalMetaDescription: ''\n  });",
  "globalMetaDescription: '',\n    heroTitle: '',\n    heroSubtitle: '',\n    heroBackgroundImage: '',\n    ctaTitle: '',\n    ctaSubtitle: '',\n    ctaButtonText: '',\n    footerAboutText: '',\n    footerAddress: '',\n    footerEmail: '',\n    footerPhone: '',\n    footerSocialLinks: { fb: '', ig: '', twitter: '', youtube: '', tiktok: '' }\n  });"
);

code = code.replace(
  "globalMetaDescription: settings.globalMetaDescription || ''\n      });",
  "globalMetaDescription: settings.globalMetaDescription || '',\n        heroTitle: settings.heroTitle || '',\n        heroSubtitle: settings.heroSubtitle || '',\n        heroBackgroundImage: settings.heroBackgroundImage || '',\n        ctaTitle: settings.ctaTitle || '',\n        ctaSubtitle: settings.ctaSubtitle || '',\n        ctaButtonText: settings.ctaButtonText || '',\n        footerAboutText: settings.footerAboutText || '',\n        footerAddress: settings.footerAddress || '',\n        footerEmail: settings.footerEmail || '',\n        footerPhone: settings.footerPhone || '',\n        footerSocialLinks: settings.footerSocialLinks || { fb: '', ig: '', twitter: '', youtube: '', tiktok: '' }\n      });"
);

const newSections = `
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
              <label className="block mb-1 font-bold">No. Telepon / WhatsApp (Format: +62...)</label>
              <input className="w-full border p-2 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" value={form.footerPhone} onChange={e => setForm({...form, footerPhone: e.target.value})} />
            </div>
            
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="block mb-2 font-bold">Link Sosial Media</label>
              <div className="space-y-2">
                <input placeholder="Facebook URL" className="w-full border p-2 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" value={form.footerSocialLinks.fb} onChange={e => setForm({...form, footerSocialLinks: {...form.footerSocialLinks, fb: e.target.value}})} />
                <input placeholder="Instagram URL" className="w-full border p-2 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" value={form.footerSocialLinks.ig} onChange={e => setForm({...form, footerSocialLinks: {...form.footerSocialLinks, ig: e.target.value}})} />
                <input placeholder="Twitter/X URL" className="w-full border p-2 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" value={form.footerSocialLinks.twitter} onChange={e => setForm({...form, footerSocialLinks: {...form.footerSocialLinks, twitter: e.target.value}})} />
                <input placeholder="YouTube URL" className="w-full border p-2 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" value={form.footerSocialLinks.youtube} onChange={e => setForm({...form, footerSocialLinks: {...form.footerSocialLinks, youtube: e.target.value}})} />
                <input placeholder="TikTok URL" className="w-full border p-2 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-[var(--theme-color)] outline-none" value={form.footerSocialLinks.tiktok} onChange={e => setForm({...form, footerSocialLinks: {...form.footerSocialLinks, tiktok: e.target.value}})} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
`;

code = code.replace(
  /    <\/div>\s*  \);\s*};\s*$/,
  newSections
);

fs.writeFileSync('src/components/admin/SettingsTab.tsx', code);
