const fs = require('fs');
let code = fs.readFileSync('src/components/layout/Footer.tsx', 'utf8');

code = code.replace(
  "const { waUrl } = useApp();",
  "const { waUrl, settings } = useApp() as any;"
);

const logoMarkup = `
            <Link to="/" className="flex items-center gap-2 mb-6 group inline-flex">
              {settings?.logoTransparentUrl ? (
                <img src={settings.logoTransparentUrl} alt="Logo" className="h-10 object-contain" />
              ) : (
                <>
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Car className="w-7 h-7 text-slate-900" />
                  </div>
                  <span className="text-2xl font-black font-poppins tracking-tight text-white">
                    Karental<span className="text-[var(--theme-color)]">.</span>
                  </span>
                </>
              )}
            </Link>
`;

code = code.replace(
  /<Link to="\/" className="flex items-center gap-2 mb-6 group inline-flex">[\s\S]*?<\/Link>/m,
  logoMarkup
);

fs.writeFileSync('src/components/layout/Footer.tsx', code);
