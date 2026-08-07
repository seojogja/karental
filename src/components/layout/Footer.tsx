import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Car,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Send
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, cities, settings } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => navigateTo('/')}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-2xl bg-[var(--theme-color)] flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight font-poppins">
                karental<span className="text-[var(--theme-color)]">.id</span>
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              {settings?.footerAboutText || 'PT Karental Indonesia adalah penyedia jasa rental mobil premium & eksekutif terdepan di Indonesia. Melayani penyewaan mobil harian, mingguan, bulanan, lepas kunci, dengan driver, antar jemput bandara, serta armada operasional perusahaan.'}
            </p>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-400" />
                <span>NIB: 1289000342110 / NPWP: 98.231.445.1-012.000</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>Layanan Customer Care & Dispatcher Bandara 24 Jam Nonstop</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base font-poppins">Navigasi Utama</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Beranda', route: '/' },
                { label: 'Daftar Armada', route: '/armada' },
                { label: 'Layanan Rental', route: '/layanan' },
                { label: 'Promo Spesial', route: '/promo' },
                { label: 'Testimoni Pelanggan', route: '/testimoni' },
                { label: 'Artikel & Blog SEO', route: '/blog' },
                { label: 'Tentang Kami', route: '/tentang-kami' },
                { label: 'Kontak & Lokasi', route: '/kontak' },
              ].map(link => (
                <li key={link.route}>
                  <button
                    onClick={() => navigateTo(link.route)}
                    className="hover:text-[var(--theme-color)] transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* SEO Cities */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base font-poppins">Rental Mobil Per Kota</h4>
            <ul className="space-y-2 text-sm">
              {cities.map(city => (
                <li key={city.slug}>
                  <button
                    onClick={() => navigateTo(`/${city.slug}`)}
                    className="hover:text-[var(--theme-color)] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5 text-orange-400" />
                    <span>Rental Mobil {city.cityName}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base font-poppins">Kantor Operasional</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div>
                <strong className="text-slate-200 block text-xs font-semibold">Alamat Kantor:</strong>
                <span>{settings?.footerAddress || 'SCBD Tower 2 Lt. 18, Jl. Jend. Sudirman, Jakarta Selatan'}</span>
              </div>
              <div className="flex items-center gap-2 pt-1 text-slate-300">
                <Phone className="w-4 h-4 text-orange-400" />
                <span>{settings?.footerPhone || '+62 812-3456-7890 (24/7)'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-orange-400" />
                <span>{settings?.footerEmail || 'info@karental.co.id'}</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs text-slate-300 font-semibold block mb-1">Dapatkan Info Promo Karental</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="bg-slate-800 text-white text-xs px-3 py-2 rounded-l-xl border-y border-l border-slate-700 outline-none w-full"
                />
                <button className="bg-[var(--theme-color)] hover:bg-orange-600 text-white px-3 rounded-r-xl font-bold flex items-center justify-center">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment badging & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} PT Karental Indonesia. All rights reserved.
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-xs font-medium">Bank Transfer Resmi:</span>
            <span className="bg-slate-800 px-2 py-1 rounded font-bold text-slate-300">BCA</span>
            <span className="bg-slate-800 px-2 py-1 rounded font-bold text-slate-300">Mandiri</span>
            <span className="bg-slate-800 px-2 py-1 rounded font-bold text-slate-300">BRI</span>
            <span className="bg-slate-800 px-2 py-1 rounded font-bold text-slate-300">BNI</span>
          </div>

          <div className="flex items-center gap-3">
            {settings?.footerSocialLinks?.ig && <a href={settings.footerSocialLinks.ig} target="_blank" className="hover:text-[var(--theme-color)] transition-colors"><Instagram className="w-4 h-4" /></a>}
            {settings?.footerSocialLinks?.fb && <a href={settings.footerSocialLinks.fb} target="_blank" className="hover:text-[var(--theme-color)] transition-colors"><Facebook className="w-4 h-4" /></a>}
            {settings?.footerSocialLinks?.youtube && <a href={settings.footerSocialLinks.youtube} target="_blank" className="hover:text-[var(--theme-color)] transition-colors"><Youtube className="w-4 h-4" /></a>}
            {settings?.footerSocialLinks?.twitter && <a href={settings.footerSocialLinks.twitter} target="_blank" className="hover:text-[var(--theme-color)] transition-colors"><span className="font-bold text-xs">X</span></a>}
            {settings?.footerSocialLinks?.tiktok && <a href={settings.footerSocialLinks.tiktok} target="_blank" className="hover:text-[var(--theme-color)] transition-colors"><span className="font-bold text-xs">TikTok</span></a>}
          </div>
        </div>
      </div>
    </footer>
  );
};
