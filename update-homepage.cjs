const fs = require('fs');
let code = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

code = code.replace(
  "  const {",
  "  const {\n    settings,"
);

code = code.replace(
  "src={heroCarImage}",
  "src={settings?.heroBackgroundImage || heroCarImage}"
);

code = code.replace(
  /<h1 className=\"text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-\[1\.1\] font-poppins\"\>[\s\S]*?\<\/h1\>/,
  "<h1 className=\"text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] font-poppins\" dangerouslySetInnerHTML={{__html: settings?.heroTitle || 'Sewa Mobil Mewah <br /><span class=\"text-transparent bg-clip-text bg-gradient-to-r from-[var(--theme-color)] via-amber-400 to-orange-500\">Berkelas & Elegan</span>'}}></h1>"
);

code = code.replace(
  /<p className=\"text-lg text-slate-300 max-w-2xl mx-auto sm:mx-0\"\>[\s\S]*?\<\/p\>/,
  "<p className=\"text-lg text-slate-300 max-w-2xl mx-auto sm:mx-0\">\n              {settings?.heroSubtitle || 'Pusat sewa mobil mewah lepas kunci & dengan sopir VVIP untuk perjalanan bisnis, liburan, dan acara spesial Anda.'}\n            </p>"
);

// CTA Section update
code = code.replace(
  /<div className=\"max-w-3xl space-y-5\"\>\s*<h2 className=\"text-3xl sm:text-5xl font-black text-white font-poppins\"\>\s*Siap Memulai Perjalanan Anda\?\s*\<\/h2\>\s*<p className=\"text-slate-200 text-sm leading-relaxed\"\>\s*Pesan mobil impian Anda sekarang dan nikmati pengalaman berkendara tak terlupakan bersama Karental\.\s*\<\/p\>/,
  `<div className="max-w-3xl space-y-5">
            <h2 className="text-3xl sm:text-5xl font-black text-white font-poppins">
              {settings?.ctaTitle || 'Siap Memulai Perjalanan Anda?'}
            </h2>
            <p className="text-slate-200 text-sm leading-relaxed">
              {settings?.ctaSubtitle || 'Pesan mobil impian Anda sekarang dan nikmati pengalaman berkendara tak terlupakan bersama Karental.'}
            </p>`
);

code = code.replace(
  "className=\"bg-[var(--theme-color)] hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full flex items-center gap-2 transition-all shadow-xl shadow-orange-500/30 hover:scale-105\"",
  "className=\"bg-[var(--theme-color)] hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full flex items-center gap-2 transition-all shadow-xl shadow-orange-500/30 hover:scale-105\"\n            >\n              {settings?.ctaButtonText || 'Booking Cepat Via WA'}"
);
code = code.replace(
  /Booking Cepat Via WA\s*\<\/button\>/,
  "</button>"
);

fs.writeFileSync('src/pages/HomePage.tsx', code);
