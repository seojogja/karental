export type FuelType = 'Bensin' | 'Diesel' | 'Hybrid' | 'Electric';
export type TransmissionType = 'Otomatis' | 'Manual';
export type CarCategory = 'MPV Luxury' | 'SUV Premium' | 'Compact City' | 'Executive Sedan' | 'Wedding & VIP';

export interface Car {
  id: string;
  slug?: string;
  name: string;
  brand: string; // e.g., Toyota, Honda, Hyundai, Mercedes-Benz, BMW
  category: CarCategory;
  transmission: TransmissionType;
  capacity: number; // seat count
  fuel: FuelType;
  hasAC: boolean;
  pricePerDay: number; // in IDR
  priceWithDriver: number; // in IDR
  availableStatus: 'Tersedia' | 'Disewa' | 'Perawatan';
  rating: number; // e.g. 4.9
  reviewCount: number;
  metaTitle?: string;
  metaDescription?: string;
  image: string;
  gallery: string[];
  description: string;
  specs: {
    engine: string;
    year: number;
    doors: number;
    luggage: string;
  };
  features: string[]; // e.g. ['Bluetooth Audio', 'Kamera 360', 'Captain Seat', 'Sunroof', 'Dashcam']
  cityAvailability: string[]; // e.g. ['Jakarta', 'Surabaya', 'Bali', 'Bandung']
}

export interface Booking {
  id: string;
  bookingCode: string;
  carId: string;
  carName: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  city: string;
  pickupDate: string;
  returnDate: string;
  durationDays: number;
  withDriver: boolean;
  outOfTown: boolean;
  voucherCode?: string;
  discountAmount: number;
  driverFee: number;
  subtotalPrice: number;
  totalPrice: number;
  status: 'Pending' | 'Confirmed' | 'On Going' | 'Completed' | 'Cancelled';
  paymentMethod: string; // e.g. 'Bank Transfer BCA'
  paymentProofUrl?: string;
  createdAt: string;
  notes?: string;
}

export interface CityPageData {
  slug: string; // e.g., rental-mobil-jakarta
  cityName: string;
  province: string;
  heroTagline: string;
  landmarkImage: string;
  metaTitle: string;
  metaDescription: string;
  articleContent: string;
  popularLocations: string[];
  priceList: {
    carCategory: string;
    lepasKunciRate: number;
    withDriverRate: number;
  }[];
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtonText?: string;
  ctaWhatsappNumber?: string;
  cityFaqs?: { question: string; answer: string; }[];
}

export interface Promo {
  id: string;
  title: string;
  code: string;
  discountPercentage: number;
  maxDiscount: number;
  minTransaction: number;
  validUntil: string;
  description: string;
  bannerImage: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  assignedCity: string;
  rating: number;
  experienceYears: number;
  status: 'Tersedia' | 'Bertugas' | 'Libur';
  photoUrl: string;
}

export interface WhatsAppLog {
  id: string;
  sourcePage: string;
  carName?: string;
  timestamp: string;
  userDevice: string;
  cityName?: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  publishedDate: string;
  readTime: string;
  excerpt: string;
  content: string;
  coverImage: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface FAQItem {
  id: string;
  category: 'Persyaratan' | 'Pembayaran' | 'Sopir' | 'Asuransi' | 'Umum';
  question: string;
  answer: string;
}

export interface ReviewItem {
  id: string;
  customerName: string;
  cityName: string;
  rating: number;
  comment: string;
  carRented: string;
  date: string;
  avatarUrl: string;
}

export interface SiteSettings {
  id: string;
  faviconUrl: string;
  logoUrl: string;
  logoTransparentUrl: string;
  themeColor: string;
  globalMetaTitle: string;
  globalMetaDescription: string;
  googleAnalyticsId?: string;
  googleAdsId?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroCtaText?: string;
  heroBackgroundImage?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtonText?: string;
  footerAboutText?: string;
  footerAddress?: string;
  footerEmail?: string;
  footerPhone?: string;
  whatsappNumber?: string;
  footerSocialLinks?: { fb?: string; ig?: string; twitter?: string; youtube?: string; tiktok?: string; };
}
