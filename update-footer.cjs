const fs = require('fs');
let code = fs.readFileSync('src/components/layout/Footer.tsx', 'utf8');

code = code.replace(
  "const { navigateTo, cities } = useApp();",
  "const { navigateTo, cities, settings } = useApp();"
);

code = code.replace(
  /PT Karental Indonesia adalah penyedia jasa rental mobil premium & eksekutif terdepan di Indonesia\. Melayani penyewaan mobil harian, mingguan, bulanan, lepas kunci, dengan driver, antar jemput bandara, serta armada operasional perusahaan\./,
  `{settings?.footerAboutText || 'PT Karental Indonesia adalah penyedia jasa rental mobil premium & eksekutif terdepan di Indonesia. Melayani penyewaan mobil harian, mingguan, bulanan, lepas kunci, dengan driver, antar jemput bandara, serta armada operasional perusahaan.'}`
);

// We replace the Address block entirely. Instead of specific Jakarta and Surabaya headers, we just print the address.
code = code.replace(
  /              \<div\>\n                \<strong className=\"text-slate-200 block text-xs font-semibold\"\>Headquarters Jakarta:\<\/strong\>\n                \<span\>SCBD Tower 2 Lt\. 18, Jl\. Jend\. Sudirman, Jakarta Selatan\<\/span\>\n              \<\/div\>\n              \<div\>\n                \<strong className=\"text-slate-200 block text-xs font-semibold\"\>Branch Surabaya:\<\/strong\>\n                \<span\>Jl\. Raya Darmo No\. 88, Surabaya, Jawa Timur\<\/span\>\n              \<\/div\>/,
  `              <div>
                <strong className="text-slate-200 block text-xs font-semibold">Alamat Kantor:</strong>
                <span>{settings?.footerAddress || 'SCBD Tower 2 Lt. 18, Jl. Jend. Sudirman, Jakarta Selatan'}</span>
              </div>`
);

code = code.replace(
  /info@karental.co.id/,
  `{settings?.footerEmail || 'info@karental.co.id'}`
);

code = code.replace(
  /\+62 812-3456-7890 \(24\/7\)/,
  `{settings?.footerPhone || '+62 812-3456-7890 (24/7)'}`
);

code = code.replace(
  /\<a href=\"#\" className=\"hover:text-\[var\(--theme-color\)\] transition-colors\"\>\<Instagram className=\"w-4 h-4\" \/\>\<\/a\>/,
  `{settings?.footerSocialLinks?.ig && <a href={settings.footerSocialLinks.ig} target="_blank" className="hover:text-[var(--theme-color)] transition-colors"><Instagram className="w-4 h-4" /></a>}`
);

code = code.replace(
  /\<a href=\"#\" className=\"hover:text-\[var\(--theme-color\)\] transition-colors\"\>\<Facebook className=\"w-4 h-4\" \/\>\<\/a\>/,
  `{settings?.footerSocialLinks?.fb && <a href={settings.footerSocialLinks.fb} target="_blank" className="hover:text-[var(--theme-color)] transition-colors"><Facebook className="w-4 h-4" /></a>}`
);

code = code.replace(
  /\<a href=\"#\" className=\"hover:text-\[var\(--theme-color\)\] transition-colors\"\>\<Youtube className=\"w-4 h-4\" \/\>\<\/a\>/,
  `{settings?.footerSocialLinks?.youtube && <a href={settings.footerSocialLinks.youtube} target="_blank" className="hover:text-[var(--theme-color)] transition-colors"><Youtube className="w-4 h-4" /></a>}
            {settings?.footerSocialLinks?.twitter && <a href={settings.footerSocialLinks.twitter} target="_blank" className="hover:text-[var(--theme-color)] transition-colors"><span className="font-bold text-xs">X</span></a>}
            {settings?.footerSocialLinks?.tiktok && <a href={settings.footerSocialLinks.tiktok} target="_blank" className="hover:text-[var(--theme-color)] transition-colors"><span className="font-bold text-xs">TikTok</span></a>}`
);

fs.writeFileSync('src/components/layout/Footer.tsx', code);
