const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf8');

code = code.replace(
  "googleAdsId?: string;\n}",
  "googleAdsId?: string;\n  heroTitle?: string;\n  heroSubtitle?: string;\n  heroBackgroundImage?: string;\n  ctaTitle?: string;\n  ctaSubtitle?: string;\n  ctaButtonText?: string;\n  footerAboutText?: string;\n  footerAddress?: string;\n  footerEmail?: string;\n  footerPhone?: string;\n  footerSocialLinks?: { fb?: string; ig?: string; twitter?: string; youtube?: string; tiktok?: string; };\n}"
);

fs.writeFileSync('src/types.ts', code);
