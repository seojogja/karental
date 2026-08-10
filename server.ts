import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_CARS, CITY_PAGES, PROMOS, REVIEWS, FAQS, BLOGS, DRIVERS } from './src/data/mockData.js';
import { Car, Booking, CityPageData, Promo, WhatsAppLog, Driver, ReviewItem, FAQItem, BlogArticle, SiteSettings, MediaItem } from './src/types.js';

const app = express();
app.use(express.json({ limit: '10mb' }));

// In-memory data store with initial seed data
let carsStore: Car[] = [...INITIAL_CARS];
let citiesStore: CityPageData[] = [...CITY_PAGES];
let promosStore: Promo[] = [...PROMOS];
let reviewsStore: ReviewItem[] = [...REVIEWS];
let faqsStore: FAQItem[] = [...FAQS];
let blogsStore: BlogArticle[] = [...BLOGS];
let driversStore: Driver[] = [...DRIVERS];

let mediaStore: MediaItem[] = [
  {
    id: 'media-1',
    title: 'Banner Hero Utama - Toyota Alphard',
    url: '/vastro_hero_car_1785990005190.jpg',
    category: 'Hero & Banner',
    uploadedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    size: '420 KB'
  },
  {
    id: 'media-2',
    title: 'Toyota Alphard Transformer VVIP',
    url: INITIAL_CARS[0]?.image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
    category: 'Armada',
    uploadedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    size: '350 KB'
  },
  {
    id: 'media-3',
    title: 'Innova Zenix Hybrid White',
    url: INITIAL_CARS[1]?.image || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800',
    category: 'Armada',
    uploadedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    size: '280 KB'
  },
  {
    id: 'media-4',
    title: 'Voucher Promo Karental Super',
    url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800',
    category: 'Promo',
    uploadedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    size: '310 KB'
  }
];

let settingsStore: SiteSettings = {
  id: 'settings-1',
  faviconUrl: '',
  logoUrl: '',
  logoTransparentUrl: '',
  themeColor: '#fe7938',
  globalMetaTitle: 'Karental - Rental Mobil Mewah',
  globalMetaDescription: 'Pusat sewa mobil lepas kunci dan dengan sopir terbaik.',
  googleAnalyticsId: '',
  googleAdsId: '',
  heroTitle: 'Sewa Mobil Premium & Eksklusif di Indonesia',
  heroSubtitle: 'Pusat sewa mobil mewah lepas kunci & dengan sopir VVIP untuk perjalanan bisnis, liburan, dan acara spesial Anda.',
  heroBackgroundImage: '/vastro_hero_car_1785990005190.jpg',
  heroCtaText: 'Chat WhatsApp',
  ctaTitle: 'Siap Memulai Perjalanan Anda?',
  ctaSubtitle: 'Pesan mobil impian Anda sekarang dan nikmati pengalaman berkendara tak terlupakan bersama Karental.',
  ctaButtonText: 'Pesan Sekarang',
  footerAboutText: 'Karental adalah penyedia layanan rental mobil premium terbaik di Indonesia, menawarkan armada eksklusif dengan pelayanan VVIP profesional.',
  footerAddress: 'Gedung Karental, Jl. Sudirman No. 123, Jakarta Selatan',
  footerEmail: 'cs@karental.com',
  footerPhone: '+62 878 2960 9156',
  companyLegalTitle: 'PT Karental Indonesia - Legal & Resmi',
  companySupportText: 'Layanan Customer Service & Support Bandara 24/7',
  seoSasV5Title: 'Sewa Mobil Terpercaya Indonesia',
  seoSasV5Summary: 'Karental (PT Karental Indonesia) merupakan penyedia armada rental mobil profesional dan terbesar di Indonesia. Kami melayani sewa mobil harian, mingguan, bulanan, layanan lepas kunci (self-drive) maupun sewa mobil dengan sopir (driver) profesional di berbagai kota besar seperti Jakarta, Surabaya, Bali, Bandung, Yogyakarta, Medan, Semarang, dan Makassar.',
  seoSasV5Content: '',
  seoSasV5Enabled: true,
  footerSocialLinks: { fb: '#', ig: '#', twitter: '#' }
};

let whatsappLogsStore: WhatsAppLog[] = [
  { id: 'wa-1', sourcePage: 'Home Hero', carName: 'Toyota Alphard Transformer', timestamp: new Date(Date.now() - 3600000).toISOString(), userDevice: 'Mobile (Android)', cityName: 'Jakarta' },
  { id: 'wa-2', sourcePage: 'Armada Detail', carName: 'Innova Zenix Hybrid', timestamp: new Date(Date.now() - 7200000).toISOString(), userDevice: 'Desktop (Windows)', cityName: 'Bali' },
  { id: 'wa-3', sourcePage: 'Rental Mobil Jakarta', carName: 'Mercedes-Benz C-Class', timestamp: new Date(Date.now() - 14400000).toISOString(), userDevice: 'Mobile (iOS)', cityName: 'Jakarta' }
];

let bookingsStore: Booking[] = [
  {
    id: 'bkg-101',
    bookingCode: 'VST-202608-001',
    carId: 'car-1',
    carName: 'Toyota Alphard Transformer Executive',
    customerName: 'Bapak Rian Hidayat',
    customerPhone: '081234567890',
    customerEmail: 'rian.hidayat@corporate.co.id',
    city: 'Jakarta',
    pickupDate: '2026-08-10',
    returnDate: '2026-08-12',
    durationDays: 2,
    withDriver: true,
    outOfTown: false,
    voucherCode: 'KARENTALSUPER',
    discountAmount: 500000,
    driverFee: 300000,
    subtotalPrice: 4400000,
    totalPrice: 4200000,
    status: 'Confirmed',
    paymentMethod: 'Transfer BCA',
    createdAt: new Date().toISOString(),
    notes: 'Penjemputan di Bandara Soekarno-Hatta Terminal 3 jam 09.00 WIB'
  },
  {
    id: 'bkg-102',
    bookingCode: 'VST-202608-002',
    carId: 'car-2',
    carName: 'Toyota Innova Zenix Hybrid Q HV',
    customerName: 'Ibu Maya Putri',
    customerPhone: '081987654321',
    customerEmail: 'maya.putri@gmail.com',
    city: 'Bali',
    pickupDate: '2026-08-15',
    returnDate: '2026-08-18',
    durationDays: 3,
    withDriver: false,
    outOfTown: false,
    discountAmount: 0,
    driverFee: 0,
    subtotalPrice: 2550000,
    totalPrice: 2550000,
    status: 'Pending',
    paymentMethod: 'Transfer Mandiri',
    createdAt: new Date().toISOString(),
    notes: 'Anter ke Hotel W Bali Seminyak'
  }
];

// AI Assistant endpoint
let aiClient: GoogleGenAI | null = null;
function getAIClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}

// REST API ROUTES
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});


app.get('/api/settings', (req, res) => res.json(settingsStore));
app.put('/api/settings', (req, res) => {
  settingsStore = { ...settingsStore, ...req.body };
  res.json(settingsStore);
});

// Cars API
app.get('/api/cars', (req, res) => {
  const { city, category, brand, transmission, search } = req.query;
  let filtered = [...carsStore];

  if (city && typeof city === 'string') {
    filtered = filtered.filter(c => c.cityAvailability.some(ct => ct.toLowerCase().includes(city.toLowerCase())));
  }
  if (category && typeof category === 'string' && category !== 'Semua') {
    filtered = filtered.filter(c => c.category === category);
  }
  if (brand && typeof brand === 'string' && brand !== 'Semua') {
    filtered = filtered.filter(c => c.brand.toLowerCase() === brand.toLowerCase());
  }
  if (transmission && typeof transmission === 'string' && transmission !== 'Semua') {
    filtered = filtered.filter(c => c.transmission === transmission);
  }
  if (search && typeof search === 'string') {
    const query = search.toLowerCase();
    filtered = filtered.filter(c => c.name.toLowerCase().includes(query) || c.description.toLowerCase().includes(query));
  }

  res.json(filtered);
});

app.get('/api/cars/:id', (req, res) => {
  const car = carsStore.find(c => c.id === req.params.id);
  if (!car) return res.status(404).json({ error: 'Car not found' });
  res.json(car);
});

app.post('/api/cars', (req, res) => {
  const newCar: Car = {
    ...req.body,
    id: 'car-' + Date.now(),
    rating: req.body.rating || 5.0,
    reviewCount: req.body.reviewCount || 1
  };
  carsStore.unshift(newCar);
  res.status(201).json(newCar);
});

app.put('/api/cars/:id', (req, res) => {
  const index = carsStore.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Car not found' });
  carsStore[index] = { ...carsStore[index], ...req.body };
  res.json(carsStore[index]);
});

app.delete('/api/cars/:id', (req, res) => {
  carsStore = carsStore.filter(c => c.id !== req.params.id);
  res.json({ success: true, id: req.params.id });
});

// City Pages API
app.get('/api/cities', (req, res) => {
  res.json(citiesStore);
});

app.get('/api/cities/:slug', (req, res) => {
  const city = citiesStore.find(c => c.slug === req.params.slug);
  if (!city) return res.status(404).json({ error: 'City page not found' });
  res.json(city);
});

app.post('/api/cities', (req, res) => {
  const newCityData: CityPageData = req.body;
  const existingIdx = citiesStore.findIndex(c => c.slug === newCityData.slug);
  if (existingIdx !== -1) {
    citiesStore[existingIdx] = newCityData;
  } else {
    citiesStore.push(newCityData);
  }
  res.json(newCityData);
});

// Bookings API
app.get('/api/bookings', (req, res) => {
  res.json(bookingsStore);
});

app.post('/api/bookings', (req, res) => {
  const code = 'VST-' + new Date().getFullYear() + String(new Date().getMonth() + 1).padStart(2, '0') + '-' + String(Math.floor(Math.random() * 900) + 100);
  const newBooking: Booking = {
    ...req.body,
    id: 'bkg-' + Date.now(),
    bookingCode: code,
    createdAt: new Date().toISOString(),
    status: req.body.status || 'Pending'
  };
  bookingsStore.unshift(newBooking);
  res.status(201).json(newBooking);
});

app.put('/api/bookings/:id', (req, res) => {
  const index = bookingsStore.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Booking not found' });
  bookingsStore[index] = { ...bookingsStore[index], ...req.body };
  res.json(bookingsStore[index]);
});


app.delete('/api/cities/:slug', (req, res) => {
  citiesStore = citiesStore.filter(c => c.slug !== req.params.slug);
  res.json({ success: true });
});

// Blogs API
app.get('/api/blogs', (req, res) => res.json(blogsStore));
app.post('/api/blogs', (req, res) => {
  const newBlog = { ...req.body, id: req.body.id || 'blog-' + Date.now() };
  const idx = blogsStore.findIndex(b => b.id === newBlog.id);
  if (idx !== -1) blogsStore[idx] = newBlog;
  else blogsStore.unshift(newBlog);
  res.status(201).json(newBlog);
});
app.delete('/api/blogs/:id', (req, res) => {
  blogsStore = blogsStore.filter(b => b.id !== req.params.id);
  res.json({ success: true });
});

// Reviews API
app.get('/api/reviews', (req, res) => res.json(reviewsStore));
app.post('/api/reviews', (req, res) => {
  const newReview = { ...req.body, id: req.body.id || 'review-' + Date.now() };
  const idx = reviewsStore.findIndex(b => b.id === newReview.id);
  if (idx !== -1) reviewsStore[idx] = newReview;
  else reviewsStore.unshift(newReview);
  res.status(201).json(newReview);
});
app.delete('/api/reviews/:id', (req, res) => {
  reviewsStore = reviewsStore.filter(b => b.id !== req.params.id);
  res.json({ success: true });
});

// FAQs API
app.get('/api/faqs', (req, res) => res.json(faqsStore));
app.post('/api/faqs', (req, res) => {
  const newFaq = { ...req.body, id: req.body.id || 'faq-' + Date.now() };
  const idx = faqsStore.findIndex(b => b.id === newFaq.id);
  if (idx !== -1) faqsStore[idx] = newFaq;
  else faqsStore.unshift(newFaq);
  res.status(201).json(newFaq);
});
app.delete('/api/faqs/:id', (req, res) => {
  faqsStore = faqsStore.filter(b => b.id !== req.params.id);
  res.json({ success: true });
});

// Promos API
app.get('/api/promos', (req, res) => {
  res.json(promosStore);
});

app.post('/api/promos', (req, res) => {
  const idx = promosStore.findIndex(p => p.id === req.body.id);
  if (idx !== -1) { promosStore[idx] = { ...promosStore[idx], ...req.body }; return res.json(promosStore[idx]); }
  const newPromo: Promo = {
    ...req.body,
    id: 'promo-' + Date.now()
  };
  promosStore.unshift(newPromo);
  res.status(201).json(newPromo);
});

app.delete('/api/promos/:id', (req, res) => {
  promosStore = promosStore.filter(p => p.id !== req.params.id);
  res.json({ success: true, id: req.params.id });
});

// Media Gallery API
app.get('/api/media', (req, res) => {
  res.json(mediaStore);
});

app.post('/api/media', (req, res) => {
  const newItem: MediaItem = {
    id: 'media-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    title: req.body.title || 'Media Upload ' + new Date().toLocaleDateString('id-ID'),
    url: req.body.url,
    category: req.body.category || 'Umum',
    uploadedAt: new Date().toISOString(),
    size: req.body.size || '150 KB'
  };
  mediaStore.unshift(newItem);
  res.status(201).json(newItem);
});

app.delete('/api/media/:id', (req, res) => {
  mediaStore = mediaStore.filter(m => m.id !== req.params.id);
  res.json({ success: true, id: req.params.id });
});

// Drivers API
app.get('/api/drivers', (req, res) => {
  res.json(driversStore);
});

// WhatsApp Analytics API
app.get('/api/whatsapp-logs', (req, res) => {
  res.json(whatsappLogsStore);
});

app.post('/api/whatsapp-logs', (req, res) => {
  const newLog: WhatsAppLog = {
    id: 'wa-' + Date.now(),
    sourcePage: req.body.sourcePage || 'General',
    carName: req.body.carName,
    cityName: req.body.cityName,
    userDevice: req.body.userDevice || 'Web Browser',
    timestamp: new Date().toISOString()
  };
  whatsappLogsStore.unshift(newLog);
  res.status(201).json(newLog);
});

// Admin Dashboard Summary Stats
app.get('/api/stats', (req, res) => {
  const totalRevenue = bookingsStore
    .filter(b => b.status === 'Confirmed' || b.status === 'Completed' || b.status === 'On Going')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const pendingBookings = bookingsStore.filter(b => b.status === 'Pending').length;
  const activeRentals = bookingsStore.filter(b => b.status === 'On Going').length;

  res.json({
    totalCars: carsStore.length,
    availableCars: carsStore.filter(c => c.availableStatus === 'Tersedia').length,
    totalBookings: bookingsStore.length,
    pendingBookings,
    activeRentals,
    totalRevenue,
    totalWhatsAppClicks: whatsappLogsStore.length,
    totalCities: citiesStore.length
  });
});

// AI Customer Assistant & Assistant Endpoint
app.post('/api/ai-assistant', async (req, res) => {
  try {
    const { prompt, userContext } = req.body;
    const ai = getAIClient();

    if (!ai) {
      return res.json({
        reply: `Halo! Terima kasih telah menghubungi Karental. Kami menyediakan sewa mobil Alphard, Innova Zenix, Fortuner, Pajero, Mercedes-Benz, dan BMW dengan opsi lepas kunci atau sopir di Jakarta, Bali, Surabaya, Bandung, Jogja, Medan, Semarang, dan Makassar. Silakan hubungi CS WhatsApp kami di +62 812-3456-7890 untuk reservasi instan!`
      });
    }

    const systemPrompt = `Anda adalah Asisten Virtual AI resmi dari Karental Indonesia, perusahaan penyewaan mobil mewah dan eksekutif terdepan di Indonesia.
Daftar Armada Aktif Karental:
- Toyota Alphard Transformer (Rp 2.200.000/hari lepas kunci, Rp 2.500.000 dengan sopir)
- Innova Zenix Hybrid Q (Rp 850.000/hari lepas kunci, Rp 1.050.000 dengan sopir)
- Fortuner 2.8 GR Sport (Rp 1.100.000/hari lepas kunci, Rp 1.300.000 dengan sopir)
- Pajero Sport Dakar (Rp 1.150.000/hari)
- Hyundai Staria Signature (Rp 2.300.000/hari)
- Mercedes-Benz C200 (Rp 3.200.000/hari)
- BMW 520i M Sport (Rp 3.500.000/hari)
- Honda HR-V RS Turbo (Rp 650.000/hari)

Layanan: Lepas Kunci, Dengan Sopir, Antar Jemput Bandara 24 Jam, Perjalanan Dinas, Wedding Car.
Kota Operasional: Jakarta, Bali, Surabaya, Bandung, Yogyakarta, Medan, Semarang, Makassar.
Gunakan Bahasa Indonesia yang ramah, sopan, profesional, dan persuasive. Berikan rekomendasi mobil terbaik sesuai kebutuhan user.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Query: ${prompt}\nUser Context: ${JSON.stringify(userContext || {})}` }] }
      ]
    });

    res.json({ reply: response.text });
  } catch (err) {
    console.error('AI Error:', err);
    res.json({
      reply: 'Maaf, terjadi gangguan saat menghubungkan asisten AI. Namun tim Customer Service Karental siap membantu Anda melalui WhatsApp 24 Jam!'
    });
  }
});

// VITE MIDDLEWARE SETUP
async function start() {
  const PORT = 3000;

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Karental Server running on http://localhost:${PORT}`);
  });
}

start();
