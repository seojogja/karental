const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');
code = code.replace(
  "globalMetaDescription: 'Pusat sewa mobil lepas kunci dan dengan sopir terbaik.'",
  "globalMetaDescription: 'Pusat sewa mobil lepas kunci dan dengan sopir terbaik.',\n  googleAnalyticsId: '',\n  googleAdsId: ''"
);
fs.writeFileSync('server.ts', code);
