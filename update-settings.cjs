const fs = require('fs');
let code = fs.readFileSync('src/components/admin/SettingsTab.tsx', 'utf8');

code = code.replace(
  "globalMetaTitle: '',",
  "globalMetaTitle: '',\n    googleAnalyticsId: '',\n    googleAdsId: '',"
);

code = code.replace(
  "globalMetaTitle: settings.globalMetaTitle || '',",
  "globalMetaTitle: settings.globalMetaTitle || '',\n        googleAnalyticsId: settings.googleAnalyticsId || '',\n        googleAdsId: settings.googleAdsId || '',"
);

const seoMarkup = `
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
`;

code = code.replace(
  /<div\>\s*<label className=\"block mb-1 font-bold\"\>Global Meta Description\<\/label\>[\s\S]*?\<\/div\>/,
  seoMarkup
);

fs.writeFileSync('src/components/admin/SettingsTab.tsx', code);
