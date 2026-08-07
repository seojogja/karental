import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Car,
  PhoneCall,
  Sparkles,
  MapPin,
  Menu,
  X,
  ShieldCheck,
  Moon,
  Sun,
  Globe,
  UserCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentRoute,
    navigateTo,
    language,
    toggleLanguage,
    darkMode,
    toggleDarkMode,
    trackWhatsAppClick,
    setIsAiModalOpen,
    cities,
    settings
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  const navLinks = [
    { label: language === 'ID' ? 'Beranda' : 'Home', route: '/' },
    { label: language === 'ID' ? 'Armada' : 'Fleet', route: '/armada' },
    { label: language === 'ID' ? 'Layanan' : 'Services', route: '/layanan' },
    { label: language === 'ID' ? 'Promo' : 'Promos', route: '/promo' },
    { label: language === 'ID' ? 'Testimoni' : 'Reviews', route: '/testimoni' },
    { label: language === 'ID' ? 'Blog' : 'Blog', route: '/blog' },
    { label: language === 'ID' ? 'Tentang Kami' : 'About Us', route: '/tentang-kami' },
    { label: language === 'ID' ? 'Kontak' : 'Contact', route: '/kontak' },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/85 dark:bg-slate-900/85 border-b border-slate-200/60 dark:border-slate-800/60 transition-colors">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-orange-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              {settings?.companyLegalTitle || 'PT Karental Indonesia - Legal & Resmi'}
            </span>
            <span className="hidden md:inline text-slate-400">
              {settings?.companySupportText || 'Layanan Customer Service & Support Bandara 24/7'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold px-2.5 py-0.5 rounded-full hover:shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-3 h-3 animate-spin" />
              AI Assistant
            </button>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-orange-400" />
              <span className="font-semibold">{language}</span>
            </button>

            <button
              onClick={toggleDarkMode}
              className="p-1 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-slate-300" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigateTo('/')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[var(--theme-color)] to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-poppins">
              karental<span className="text-[var(--theme-color)]">.id</span>
            </span>
            <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400 -mt-1">
              RENT CAR LUXURY
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.slice(0, 2).map((link) => (
            <button
              key={link.route}
              onClick={() => navigateTo(link.route)}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                currentRoute === link.route
                  ? 'bg-orange-50 dark:bg-orange-950/40 text-[var(--theme-color)]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[var(--theme-color)] dark:hover:text-[var(--theme-color)] hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              {link.label}
            </button>
          ))}

          {/* Kota Besar SEO Dropdown */}
          <div className="relative" onMouseLeave={() => setIsCityDropdownOpen(false)}>
            <button
              onMouseEnter={() => setIsCityDropdownOpen(true)}
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                currentRoute.startsWith('/rental-mobil-')
                  ? 'bg-orange-50 dark:bg-orange-950/40 text-[var(--theme-color)]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[var(--theme-color)] hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <MapPin className="w-4 h-4 text-[var(--theme-color)]" />
              {language === 'ID' ? 'Pilih Kota' : 'Select City'}
            </button>

            {isCityDropdownOpen && (
              <div className="absolute top-full left-0 w-64 mt-1 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Kota Operasional Karental
                </div>
                {cities.map((city) => (
                  <button
                    key={city.slug}
                    onClick={() => {
                      setIsCityDropdownOpen(false);
                      navigateTo(`/${city.slug}`);
                    }}
                    className="w-full text-left px-3 py-2 text-sm rounded-xl hover:bg-orange-50 dark:hover:bg-orange-950/40 hover:text-[var(--theme-color)] font-medium transition-colors flex items-center justify-between group"
                  >
                    <span>Rental Mobil {city.cityName}</span>
                    <span className="text-[10px] text-slate-400 group-hover:text-[var(--theme-color)]">
                      {city.province}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {navLinks.slice(2).map((link) => (
            <button
              key={link.route}
              onClick={() => navigateTo(link.route)}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                currentRoute === link.route
                  ? 'bg-orange-50 dark:bg-orange-950/40 text-[var(--theme-color)]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[var(--theme-color)] dark:hover:text-[var(--theme-color)] hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => navigateTo('/admin')}
            className={`p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-[var(--theme-color)] hover:text-[var(--theme-color)] transition-all cursor-pointer`}
            title="Dashboard Admin / Kelola Data"
          >
            <UserCheck className="w-5 h-5" />
          </button>

          <button
            onClick={() => trackWhatsAppClick('Navbar Header')}
            className="flex items-center gap-2 bg-[var(--theme-color)] hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all cursor-pointer transform active:scale-95 text-sm"
          >
            <PhoneCall className="w-4 h-4" />
            <span>WhatsApp CS</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => trackWhatsAppClick('Navbar Mobile')}
            className="p-2 rounded-xl bg-[var(--theme-color)] text-white"
          >
            <PhoneCall className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.route}
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigateTo(link.route);
              }}
              className={`w-full text-left px-4 py-3 rounded-2xl text-base font-semibold ${
                currentRoute === link.route
                  ? 'bg-orange-50 dark:bg-orange-950/40 text-[var(--theme-color)]'
                  : 'text-slate-700 dark:text-slate-200'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase">Pilih Kota Rental</div>
            <div className="grid grid-cols-2 gap-2">
              {cities.map((city) => (
                <button
                  key={city.slug}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo(`/${city.slug}`);
                  }}
                  className="px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-left truncate"
                >
                  {city.cityName}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigateTo('/admin');
              }}
              className="flex-1 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-center text-sm"
            >
              Portal Admin
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsAiModalOpen(true);
              }}
              className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl font-bold text-center text-sm flex items-center justify-center gap-1"
            >
              <Sparkles className="w-4 h-4" /> AI Assistant
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
