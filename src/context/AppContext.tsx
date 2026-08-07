import React, { createContext, useContext, useState, useEffect } from 'react';
import { Car, Booking, CityPageData, Promo, WhatsAppLog, Driver, FAQItem, ReviewItem, BlogArticle, SiteSettings } from '../types';
import { INITIAL_CARS, CITY_PAGES, PROMOS, DRIVERS, FAQS, REVIEWS, BLOGS } from '../data/mockData';

interface AppContextType {
  currentRoute: string;
  navigateTo: (route: string) => void;
  language: 'ID' | 'EN';
  toggleLanguage: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  cars: Car[];
  settings: SiteSettings | null;
  updateSettings: (s: Partial<SiteSettings>) => Promise<void>;
  cities: CityPageData[];
  promos: Promo[];
  bookings: Booking[];
  whatsappLogs: WhatsAppLog[];
  drivers: Driver[];
  faqs: FAQItem[];
  reviews: ReviewItem[];
  blogs: BlogArticle[];
  addCity: (c: CityPageData) => Promise<void>;
  deleteCity: (slug: string) => Promise<void>;
  addPromo: (p: Promo) => Promise<void>;
  updatePromo: (p: Promo) => Promise<void>;
  deletePromo: (id: string) => Promise<void>;
  addBlog: (b: BlogArticle) => Promise<void>;
  updateBlog: (b: BlogArticle) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  addReview: (r: ReviewItem) => Promise<void>;
  updateReview: (r: ReviewItem) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  addFaq: (f: FAQItem) => Promise<void>;
  updateFaq: (f: FAQItem) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;
  selectedCarForBooking: Car | null;
  openBookingModal: (car?: Car) => void;
  closeBookingModal: () => void;
  isBookingModalOpen: boolean;
  trackWhatsAppClick: (sourcePage: string, carName?: string, cityName?: string) => void;
  selectedCitySlug: string | null;
  setSelectedCitySlug: (slug: string | null) => void;
  selectedCarId: string | null;
  setSelectedCarId: (id: string | null) => void;
  addBooking: (newBooking: Partial<Booking>) => Promise<Booking>;
  updateBookingStatus: (id: string, status: Booking['status']) => Promise<void>;
  addCar: (car: Omit<Car, 'id'>) => Promise<void>;
  updateCar: (car: Car) => Promise<void>;
  deleteCar: (id: string) => Promise<void>;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  isAdminLoggedIn: boolean;
  adminLogin: (user: string, pass: string) => boolean;
  adminLogout: () => void;
  isAiModalOpen: boolean;
  setIsAiModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<string>(() => window.location.pathname || '/');
  const [language, setLanguage] = useState<'ID' | 'EN'>('ID');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const [cars, setCars] = useState<Car[]>(INITIAL_CARS);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [cities, setCities] = useState<CityPageData[]>(CITY_PAGES);
  const [promos, setPromos] = useState<Promo[]>(PROMOS);
  const [faqs, setFaqs] = useState<FAQItem[]>(FAQS);
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS);
  const [blogs, setBlogs] = useState<BlogArticle[]>(BLOGS);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [whatsappLogs, setWhatsappLogs] = useState<WhatsAppLog[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>(DRIVERS);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedCarForBooking, setSelectedCarForBooking] = useState<Car | null>(null);
  const [selectedCitySlug, setSelectedCitySlug] = useState<string | null>(null);
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  // Sync route with browser history URL
  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    window.history.pushState({}, '', route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          setSettings(data);
        }
      })
      .catch(console.error);
  }, []);

  
  useEffect(() => {
    if (settings?.themeColor) {
      document.documentElement.style.setProperty('--theme-color', settings.themeColor);
    }
    if (settings?.faviconUrl) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link') as HTMLLinkElement;
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = settings.faviconUrl;
    }
    if (settings?.globalMetaTitle) {
      document.title = settings.globalMetaTitle;
    }

    // Tracking injection
    if (settings?.googleAnalyticsId || settings?.googleAdsId) {
      const existingScript = document.getElementById('google-tracking-script');
      if (existingScript) existingScript.remove();
      const existingConfig = document.getElementById('google-tracking-config');
      if (existingConfig) existingConfig.remove();

      const trackingId = settings.googleAnalyticsId || settings.googleAdsId;
      
      const script = document.createElement('script');
      script.id = 'google-tracking-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
      document.head.appendChild(script);

      const config = document.createElement('script');
      config.id = 'google-tracking-config';
      let configText = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date());`;
      
      if (settings.googleAnalyticsId) {
        configText += ` gtag('config', '${settings.googleAnalyticsId}');`;
      }
      if (settings.googleAdsId) {
        configText += ` gtag('config', '${settings.googleAdsId}');`;
      }
      
      config.innerHTML = configText;
      document.head.appendChild(config);
    }

  }, [settings]);


  const toggleLanguage = () => setLanguage(prev => (prev === 'ID' ? 'EN' : 'ID'));
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const openBookingModal = (car?: Car) => {
    if (car) setSelectedCarForBooking(car);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  // WhatsApp click analytics tracking & opener
  const trackWhatsAppClick = (sourcePage: string, carName?: string, cityName?: string) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const userDevice = isMobile ? 'Mobile Device' : 'Desktop Browser';

    fetch('/api/whatsapp-logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sourcePage, carName, cityName, userDevice })
    })
      .then(r => r.json())
      .then(newLog => setWhatsappLogs(prev => [newLog, ...prev]))
      .catch(console.error);

    const rawPhone = settings?.whatsappNumber || settings?.footerPhone || '6287829609156';
    let waNumber = rawPhone.replace(/\D/g, '');
    if (waNumber.startsWith('0')) {
      waNumber = '62' + waNumber.slice(1);
    }
    if (!waNumber) waNumber = '6287829609156';
    let text = `Halo Karental, saya ingin bertanya sewa mobil ${carName ? `*${carName}*` : 'mewah'} untuk lokasi ${cityName || 'Jakarta/Bali'}. Mohon info ketersediaan dan promo terbarunya. Terima kasih!`;
    if (sourcePage === 'Quick Booking') {
      text = `Halo Karental, saya tertarik melalukan reservasi cepat via website. Mohon bantuan info ketersediaan armada.`;
    }

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${waNumber}?text=${encodedText}`, '_blank');
  };

  const addBooking = async (newBooking: Partial<Booking>): Promise<Booking> => {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBooking)
    });
    const created: Booking = await res.json();
    setBookings(prev => [created, ...prev]);
    showToast(`Booking ${created.bookingCode} berhasil dibuat!`);
    return created;
  };

  const updateBookingStatus = async (id: string, status: Booking['status']) => {
    const res = await fetch(`/api/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    const updated = await res.json();
    setBookings(prev => prev.map(b => (b.id === id ? updated : b)));
    showToast(`Status booking ${updated.bookingCode} diubah ke ${status}`);
  };

  const addCar = async (car: Omit<Car, 'id'>) => {
    const res = await fetch('/api/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car)
    });
    const newCar = await res.json();
    setCars(prev => [newCar, ...prev]);
    showToast(`Mobil ${newCar.name} berhasil ditambahkan!`);
  };

  const updateCar = async (car: Car) => {
    const res = await fetch(`/api/cars/${car.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car)
    });
    const updated = await res.json();
    setCars(prev => prev.map(c => (c.id === car.id ? updated : c)));
    showToast(`Data mobil ${car.name} diperbarui!`);
  };

  const deleteCar = async (id: string) => {
    await fetch(`/api/cars/${id}`, { method: 'DELETE' });
    setCars(prev => prev.filter(c => c.id !== id));
    showToast('Mobil berhasil dihapus dari daftar armada!');
  };

  
  
  const updateSettings = async (s: Partial<SiteSettings>) => {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(s)
    });
    const updated = await res.json();
    setSettings(updated);
    showToast('Pengaturan SEO & Tampilan disimpan!');
  };

  const addCity = async (city: CityPageData) => {
    const res = await fetch('/api/cities', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(city) });
    const saved = await res.json();
    setCities(prev => {
      const idx = prev.findIndex(c => c.slug === saved.slug);
      if (idx !== -1) { const n = [...prev]; n[idx] = saved; return n; }
      return [saved, ...prev];
    });
    showToast('Kota berhasil disimpan!');
  };
  const deleteCity = async (slug: string) => {
    await fetch('/api/cities/' + slug, { method: 'DELETE' });
    setCities(prev => prev.filter(c => c.slug !== slug));
    showToast('Kota dihapus!');
  };

  const addPromo = async (p: Promo) => {
    const res = await fetch('/api/promos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) });
    const saved = await res.json();
    setPromos(prev => [saved, ...prev]);
    showToast('Promo ditambahkan!');
  };
  const updatePromo = async (p: Promo) => {
    const res = await fetch('/api/promos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) });
    const saved = await res.json();
    setPromos(prev => prev.map(o => o.id === p.id ? saved : o));
    showToast('Promo diubah!');
  };
  const deletePromo = async (id: string) => {
    await fetch('/api/promos/' + id, { method: 'DELETE' });
    setPromos(prev => prev.filter(o => o.id !== id));
    showToast('Promo dihapus!');
  };

  const addBlog = async (b: BlogArticle) => {
    const res = await fetch('/api/blogs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b) });
    const saved = await res.json();
    setBlogs(prev => [saved, ...prev]);
    showToast('Blog ditambahkan!');
  };
  const updateBlog = async (b: BlogArticle) => {
    const res = await fetch('/api/blogs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b) });
    const saved = await res.json();
    setBlogs(prev => prev.map(o => o.id === b.id ? saved : o));
    showToast('Blog diubah!');
  };
  const deleteBlog = async (id: string) => {
    await fetch('/api/blogs/' + id, { method: 'DELETE' });
    setBlogs(prev => prev.filter(o => o.id !== id));
    showToast('Blog dihapus!');
  };

  const addReview = async (r: ReviewItem) => {
    const res = await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(r) });
    const saved = await res.json();
    setReviews(prev => [saved, ...prev]);
    showToast('Review ditambahkan!');
  };
  const updateReview = async (r: ReviewItem) => {
    const res = await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(r) });
    const saved = await res.json();
    setReviews(prev => prev.map(o => o.id === r.id ? saved : o));
    showToast('Review diubah!');
  };
  const deleteReview = async (id: string) => {
    await fetch('/api/reviews/' + id, { method: 'DELETE' });
    setReviews(prev => prev.filter(o => o.id !== id));
    showToast('Review dihapus!');
  };

  const addFaq = async (f: FAQItem) => {
    const res = await fetch('/api/faqs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) });
    const saved = await res.json();
    setFaqs(prev => [saved, ...prev]);
    showToast('FAQ ditambahkan!');
  };
  const updateFaq = async (f: FAQItem) => {
    const res = await fetch('/api/faqs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) });
    const saved = await res.json();
    setFaqs(prev => prev.map(o => o.id === f.id ? saved : o));
    showToast('FAQ diubah!');
  };
  const deleteFaq = async (id: string) => {
    await fetch('/api/faqs/' + id, { method: 'DELETE' });
    setFaqs(prev => prev.filter(o => o.id !== id));
    showToast('FAQ dihapus!');
  };

  const addDriver = (d: Driver) => {
    const newDriver = { ...d, id: d.id || 'drv_' + Date.now() };
    setDrivers(prev => [newDriver, ...prev]);
    showToast(`Driver ${newDriver.name} berhasil ditambahkan!`);
  };
  const updateDriver = (d: Driver) => {
    setDrivers(prev => prev.map(o => o.id === d.id ? d : o));
    showToast(`Data driver ${d.name} diperbarui!`);
  };
  const deleteDriver = (id: string) => {
    setDrivers(prev => prev.filter(o => o.id !== id));
    showToast('Driver berhasil dihapus dari daftar!');
  };

  const adminLogin = (user: string, pass: string) => {
    if ((user === 'vastromedia@gmail.com' && pass === 'eMonJal!%E&5097JakAL') || (user === 'admin' && pass === 'admin123')) {
      setIsAdminLoggedIn(true);
      showToast('Login Admin Karental Berhasil!');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    showToast('Anda telah logout dari Admin Dashboard.');
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        navigateTo,
        language,
        toggleLanguage,
        darkMode,
        toggleDarkMode,
        cars,
        settings,
        updateSettings,
        cities,
        promos,
        bookings,
        whatsappLogs,
        drivers,
        addDriver, updateDriver, deleteDriver,
        faqs, reviews, blogs, addCity, deleteCity, addPromo, updatePromo, deletePromo, addBlog, updateBlog, deleteBlog, addReview, updateReview, deleteReview, addFaq, updateFaq, deleteFaq,
        selectedCarForBooking,
        openBookingModal,
        closeBookingModal,
        isBookingModalOpen,
        trackWhatsAppClick,
        selectedCitySlug,
        setSelectedCitySlug,
        selectedCarId,
        setSelectedCarId,
        addBooking,
        updateBookingStatus,
        addCar,
        updateCar,
        deleteCar,
        toastMessage,
        showToast,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        isAiModalOpen,
        setIsAiModalOpen
      }}
    >
      <div className={darkMode ? 'dark bg-slate-950 text-slate-100 min-h-screen' : 'bg-slate-50 text-slate-800 min-h-screen font-sans'}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
