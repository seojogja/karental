const fs = require('fs');
let code = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

code = code.replace(
  /<h2 className=\"text-3xl sm:text-4xl font-black font-poppins\"\>[\s\S]*?\<\/h2\>/,
  `<h2 className="text-3xl sm:text-4xl font-black font-poppins">
              {settings?.ctaTitle || 'Siap Memulai Perjalanan Mewah Anda?'}
            </h2>`
);

code = code.replace(
  /<p className=\"text-slate-300 text-sm sm:text-base\"\>[\s\S]*?\<\/p\>/,
  `<p className="text-slate-300 text-sm sm:text-base">
              {settings?.ctaSubtitle || 'Pesan armada impian Anda sekarang juga. Nikmati kenyamanan mobil berkelas dan layanan ramah Karental.'}
            </p>`
);

code = code.replace(
  /Booking Online Sekarang/,
  `{settings?.ctaButtonText || 'Booking Online Sekarang'}`
);

fs.writeFileSync('src/pages/HomePage.tsx', code);
