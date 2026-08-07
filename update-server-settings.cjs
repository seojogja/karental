const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');
code = code.replace(
  "googleAdsId: ''\n};",
  "googleAdsId: '',\n  heroTitle: 'Sewa Mobil Premium & Eksklusif di Indonesia',\n  heroSubtitle: 'Pusat sewa mobil mewah lepas kunci & dengan sopir VVIP untuk perjalanan bisnis, liburan, dan acara spesial Anda.',\n  heroBackgroundImage: '/vastro_hero_car_1785990005190.jpg',\n  ctaTitle: 'Siap Memulai Perjalanan Anda?',\n  ctaSubtitle: 'Pesan mobil impian Anda sekarang dan nikmati pengalaman berkendara tak terlupakan bersama Karental.',\n  ctaButtonText: 'Pesan Sekarang',\n  footerAboutText: 'Karental adalah penyedia layanan rental mobil premium terbaik di Indonesia, menawarkan armada eksklusif dengan pelayanan VVIP profesional.',\n  footerAddress: 'Gedung Karental, Jl. Sudirman No. 123, Jakarta Selatan',\n  footerEmail: 'cs@karental.com',\n  footerPhone: '+62 878 2960 9156',\n  footerSocialLinks: { fb: '#', ig: '#', twitter: '#' }\n};"
);
fs.writeFileSync('server.ts', code);
