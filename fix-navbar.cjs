const fs = require('fs');
let code = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');

code = code.replace(
  "const { setBookingModalOpen, waUrl } = useApp();",
  "const { setBookingModalOpen, waUrl, settings } = useApp() as any;"
);

const logoMarkup = `
          <Link to="/" className="flex items-center gap-2 group">
            {settings?.logoUrl ? (
              <img src={settings.logoUrl} alt="Logo" className="h-8 object-contain" />
            ) : (
              <>
                <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Car className="w-6 h-6 text-white dark:text-black" />
                </div>
                <span className="text-xl font-black font-poppins tracking-tight text-slate-900 dark:text-white">
                  Karental<span className="text-[var(--theme-color)]">.</span>
                </span>
              </>
            )}
          </Link>
`;

code = code.replace(
  /<Link to="\/" className="flex items-center gap-2 group">[\s\S]*?<\/Link>/m,
  logoMarkup
);

fs.writeFileSync('src/components/layout/Navbar.tsx', code);
