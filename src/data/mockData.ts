import { Car, CityPageData, Promo, Driver, BlogArticle, FAQItem, ReviewItem } from '../types';

export const INITIAL_CARS: Car[] = [
  {
    id: 'car-1',
    slug: 'toyota-alphard-transformer',
    name: 'Toyota Alphard Transformer Executive',
    brand: 'Toyota',
    category: 'MPV Luxury',
    transmission: 'Otomatis',
    capacity: 7,
    fuel: 'Bensin',
    hasAC: true,
    pricePerDay: 2200000,
    priceWithDriver: 2500000,
    availableStatus: 'Tersedia',
    rating: 4.9,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Toyota Alphard Executive Lounge menghadirkan kenyamanan kelas wahid untuk perjalanan bisnis, kenegaraan, maupun keluarga premium. Dilengkapi Captain Seat dengan fitur pijat, Sunroof, dan suspensi udara yang sangat halus.',
    specs: {
      engine: '2.5L DOHC Dual VVT-i',
      year: 2024,
      doors: 5,
      luggage: '4 Koper Besar'
    },
    features: ['Captain Seat Electrifying', 'JBL Audio System 17 Speakers', 'Double Sunroof', 'Dual Zone Climate AC', 'Kamera 360 & Radar'],
    cityAvailability: ['Jakarta', 'Bali', 'Surabaya', 'Bandung', 'Yogyakarta', 'Medan', 'Semarang', 'Makassar']
  },
  {
    id: 'car-2',
    slug: 'toyota-innova-zenix-hybrid',
    name: 'Toyota Innova Zenix Hybrid Q HV',
    brand: 'Toyota',
    category: 'MPV Luxury',
    transmission: 'Otomatis',
    capacity: 7,
    fuel: 'Hybrid',
    hasAC: true,
    pricePerDay: 850000,
    priceWithDriver: 1050000,
    availableStatus: 'Tersedia',
    rating: 4.9,
    reviewCount: 210,
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Generasi terbaru Innova Zenix Hybrid Q Modelista. Hemat bahan bakar, kabin lapang dengan Panoramic Retractable Roof, Ottoman Legrest Seat, dan fitur keselamatan Toyota Safety Sense 3.0.',
    specs: {
      engine: '2.0L Hybrid Gen 5',
      year: 2024,
      doors: 5,
      luggage: '3 Koper Besar'
    },
    features: ['Panoramic Sunroof', 'Captain Seat Ottoman', 'Toyota Safety Sense', '10 inch Head Unit Rear Seat', 'Power Backdoor'],
    cityAvailability: ['Jakarta', 'Bali', 'Surabaya', 'Bandung', 'Yogyakarta', 'Semarang']
  },
  {
    id: 'car-3',
    name: 'Fortuner 2.8 GR Sport 4x4',
    brand: 'Toyota',
    category: 'SUV Premium',
    transmission: 'Otomatis',
    capacity: 7,
    fuel: 'Diesel',
    hasAC: true,
    pricePerDay: 1100000,
    priceWithDriver: 1300000,
    availableStatus: 'Tersedia',
    rating: 4.8,
    reviewCount: 95,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'SUV gagah bernuansa balap Gazoo Racing. Mesin diesel 2.800cc VNT Turbo yang bertenaga untuk melibas segala medan perjalanan antar kota maupun kunjungan lapangan.',
    specs: {
      engine: '1GD-FTV 2.8L Turbo Diesel',
      year: 2024,
      doors: 5,
      luggage: '3 Koper Besar'
    },
    features: ['GR Suspension Tuning', 'Wireless Charging', 'Paddle Shift', 'Power Tailgate Sensor Foot', 'Drive Mode ECO/Power'],
    cityAvailability: ['Jakarta', 'Surabaya', 'Bandung', 'Yogyakarta', 'Medan', 'Makassar']
  },
  {
    id: 'car-4',
    name: 'Mitsubishi Pajero Sport Dakar Ultimate 4x2',
    brand: 'Mitsubishi',
    category: 'SUV Premium',
    transmission: 'Otomatis',
    capacity: 7,
    fuel: 'Diesel',
    hasAC: true,
    pricePerDay: 1150000,
    priceWithDriver: 1350000,
    availableStatus: 'Tersedia',
    rating: 4.9,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'SUV Mewah khas Mitsubishi dengan desain Dynamic Shield yang memikat. Dilengkapi 8-speed automatic transmission, Sunroof, LCD Meter Cluster 8 inci, serta fitur Forward Collision Mitigation System.',
    specs: {
      engine: '4N15 2.4L MIVEC Turbo Diesel',
      year: 2024,
      doors: 5,
      luggage: '3 Koper Besar'
    },
    features: ['Sunroof Electric', 'Adaptive Cruise Control', 'Electronic Parking Brake + Brake Hold', 'Handsfree Power Tailgate', 'Blind Spot Warning'],
    cityAvailability: ['Jakarta', 'Bali', 'Surabaya', 'Bandung', 'Medan']
  },
  {
    id: 'car-5',
    name: 'Hyundai Staria Signature 7 Seats',
    brand: 'Hyundai',
    category: 'MPV Luxury',
    transmission: 'Otomatis',
    capacity: 7,
    fuel: 'Diesel',
    hasAC: true,
    pricePerDay: 2300000,
    priceWithDriver: 2600000,
    availableStatus: 'Tersedia',
    rating: 5.0,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Futuristic Luxury MPV dengan desain mirip pesawat luar angkasa. Menawarkan kabin ekstra luas, Premium Relaxation Seats, BOSE Sound System, dan teknologi Hyundai SmartSense lengkap.',
    specs: {
      engine: 'R 2.2L VGT Diesel',
      year: 2024,
      doors: 5,
      luggage: '5 Koper Besar'
    },
    features: ['Premium Relaxation Seats', 'Bose Premium Sound System', 'Dual Sunroof', 'Smart Power Sliding Doors', 'Surround View Monitor'],
    cityAvailability: ['Jakarta', 'Bali', 'Surabaya']
  },
  {
    id: 'car-6',
    name: 'Mercedes-Benz C-Class C200 Avantgarde',
    brand: 'Mercedes-Benz',
    category: 'Executive Sedan',
    transmission: 'Otomatis',
    capacity: 5,
    fuel: 'Bensin',
    hasAC: true,
    pricePerDay: 3200000,
    priceWithDriver: 3600000,
    availableStatus: 'Tersedia',
    rating: 5.0,
    reviewCount: 64,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Sedan eksekutif Eropa berkelas tinggi. Perfomance responsif, MBUX Infotainment terbaru dengan layar sentuh vertikal 11.9 inci, Burmester Surround Sound, dan ambient lighting 64 warna.',
    specs: {
      engine: '1.5L Turbo 4-Cylinder EQ Boost',
      year: 2024,
      doors: 4,
      luggage: '2 Koper Sedang'
    },
    features: ['MBUX Multimedia System', 'Ambient Lighting 64 Colors', 'Memory Electric Leather Seats', 'Panoramic Sunroof', 'Burmester Sound System'],
    cityAvailability: ['Jakarta', 'Bali', 'Surabaya', 'Bandung']
  },
  {
    id: 'car-7',
    name: 'BMW 5 Series 520i M Sport',
    brand: 'BMW',
    category: 'Executive Sedan',
    transmission: 'Otomatis',
    capacity: 5,
    fuel: 'Bensin',
    hasAC: true,
    pricePerDay: 3500000,
    priceWithDriver: 3900000,
    availableStatus: 'Tersedia',
    rating: 4.9,
    reviewCount: 39,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Mobil dinas pejabat & pebisnis elit. BMW 520i M Sport menggabungkan karakter sporty khas BMW dengan kemewahan eksekutif. Sangat cocok untuk acara VIP, pernikahan, dan penjemputan tamu istimewa.',
    specs: {
      engine: '2.0L BMW TwinPower Turbo',
      year: 2024,
      doors: 4,
      luggage: '2 Koper Besar'
    },
    features: ['BMW Curved Display', 'Harman Kardon Audio System', 'M Aerodynamics Package', 'Parking Assistant Plus', 'Gesture Control'],
    cityAvailability: ['Jakarta', 'Bali', 'Surabaya']
  },
  {
    id: 'car-8',
    name: 'Honda All New HR-V RS Turbo',
    brand: 'Honda',
    category: 'Compact City',
    transmission: 'Otomatis',
    capacity: 5,
    fuel: 'Bensin',
    hasAC: true,
    pricePerDay: 650000,
    priceWithDriver: 850000,
    availableStatus: 'Tersedia',
    rating: 4.8,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Compact SUV stylish dengan performa mesin VTEC Turbo 177 PS. Sangat lincah menembus kemacetan perkotaan dan sangat irit untuk penggunaan harian di Jakarta, Bandung, atau Bali.',
    specs: {
      engine: '1.5L VTEC Turbocharged',
      year: 2024,
      doors: 5,
      luggage: '2 Koper Sedang'
    },
    features: ['Honda SENSING', 'Hands-Free Power Tailgate', 'Panorama Glass Roof', 'Red Accent RS Stitching', 'Drive Mode System'],
    cityAvailability: ['Jakarta', 'Bali', 'Surabaya', 'Bandung', 'Yogyakarta', 'Semarang', 'Medan']
  }
];

export const CITY_PAGES: CityPageData[] = [
  {
    slug: 'rental-mobil-jakarta',
    cityName: 'Jakarta',
    province: 'DKI Jakarta',
    heroTagline: 'Layanan Rental Mobil Premium #1 di Jakarta - Lepas Kunci & Sopir Profesional',
    landmarkImage: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=1200&q=80',
    metaTitle: 'Rental Mobil Jakarta Murah & Premium - Karental',
    metaDescription: 'Sewa mobil Alphard, Innova Zenix, Fortuner, & Sedan Mewah di Jakarta Jabodetabek. Layanan 24 Jam, Antar Jemput Bandara Soekarno Hatta.',
    articleContent: `
      <h2>Layanan Rental Mobil Terbaik di Jakarta & Jabodetabek</h2>
      <p>Pusat bisnis dan pemerintahan Indonesia menuntut mobilitas yang tinggi dan berkelas. Karental menghadirkan solusi penyewaan mobil premium di Jakarta untuk kebutuhan dinas kantor, operasional VIP, kunjungan tamu mancanegara, hingga liburan keluarga.</p>
      
      <h3>Mengapa Memilih Karental Jakarta?</h3>
      <ul>
        <li><strong>Armada Terbaru & Terawat:</strong> Semua mobil selalu melewati inspeksi berkala dan higienitas kabin yang terjamin.</li>
        <li><strong>Sopir Berpengalaman:</strong> Memahami rute ganjil genap, tol Jabodetabek, serta etika pelayanan ramah.</li>
        <li><strong>Antar Jemput Bandara Soekarno-Hatta (CGK) & Halim (HLP):</strong> Pengantaran tepat waktu dengan signage nama penumpangnya.</li>
        <li><strong>Proses Booking Instan via WhatsApp:</strong> Tidak repot, konfirmasi cepat dalam hitungan menit.</li>
      </ul>
    `,
    popularLocations: ['Bandara Soekarno-Hatta', 'Sudirman Central Business District (SCBD)', 'Kuningan & Thamrin', 'Bandara Halim Perdanakusuma', 'PIK & BSD City'],
    priceList: [
      { carCategory: 'MPV Family (Innova Zenix)', lepasKunciRate: 850000, withDriverRate: 1050000 },
      { carCategory: 'Executive Luxury (Alphard)', lepasKunciRate: 2200000, withDriverRate: 2500000 },
      { carCategory: 'SUV Premium (Fortuner/Pajero)', lepasKunciRate: 1100000, withDriverRate: 1300000 },
      { carCategory: 'Executive Sedan (Mercedes C200)', lepasKunciRate: 3200000, withDriverRate: 3600000 }
    ]
  },
  {
    slug: 'rental-mobil-bali',
    cityName: 'Bali',
    province: 'Bali',
    heroTagline: 'Sewa Mobil Mewah di Bali - Nikmati Liburan Impian dengan Pengemudi Ramah',
    landmarkImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    metaTitle: 'Sewa Mobil Bali Murah & Luxury - Alphard, Zenix, Convertible - Karental',
    metaDescription: 'Rental mobil Bali dengan sopir / lepas kunci. Antar jemput Bandara Ngurah Rai I Gusti Ngurah Rai, Seminyak, Canggu, Ubud, Uluwatu.',
    articleContent: `
      <h2>Solusi Transportasi Liburan & VIP Event di Pulau Dewata Bali</h2>
      <p>Jelajahi keindahan pantai Canggu, tebing Uluwatu, ketersediaan kuliner Seminyak, hingga kedamaian Ubud dengan kenyamanan kendaraan premium. Karental Bali menyediakan layanan sewa mobil lepas kunci dan dengan driver profesional berpengalaman membawa wisatawan domestik dan internasional.</p>
    `,
    popularLocations: ['Bandara I Gusti Ngurah Rai (DPS)', 'Seminyak & Legian', 'Canggu & Pererenan', 'Ubud Centre', 'Nusa Dua VIP Resort'],
    priceList: [
      { carCategory: 'MPV Family (Innova Zenix)', lepasKunciRate: 850000, withDriverRate: 1050000 },
      { carCategory: 'Executive Luxury (Alphard)', lepasKunciRate: 2200000, withDriverRate: 2500000 },
      { carCategory: 'Compact City (Honda HR-V)', lepasKunciRate: 650000, withDriverRate: 850000 }
    ]
  },
  {
    slug: 'rental-mobil-surabaya',
    cityName: 'Surabaya',
    province: 'Jawa Timur',
    heroTagline: 'Rental Mobil Surabaya Termurah & Terpercaya - Antar Jemput Juanda',
    landmarkImage: 'https://images.unsplash.com/photo-1584441405886-bc91be61e56a?auto=format&fit=crop&w=1200&q=80',
    metaTitle: 'Rental Mobil Surabaya - Zenix, Alphard, Fortuner - Karental',
    metaDescription: 'Sewa mobil Surabaya lepas kunci & driver. Layanan gratis antar ke Bandara Juanda, Stasiun Gubeng & Pasar Turi. Siap kirim luar kota Bromo & Malang.',
    articleContent: `
      <h2>Rental Mobil Profesional di Kota Pahlawan Surabaya</h2>
      <p>Kebutuhan bisnis di kawasan Rungkut, Gresik, Sidoarjo hingga perjalanan wisata ke Bromo dan Malang kini semakin mudah dengan armada Karental Surabaya.</p>
    `,
    popularLocations: ['Bandara Internasional Juanda (SUB)', 'Stasiun Surabaya Gubeng', 'Kawasan Industri Rungkut', 'Tunjungan Plaza & CBD Surabaya'],
    priceList: [
      { carCategory: 'MPV Family (Innova Zenix)', lepasKunciRate: 850000, withDriverRate: 1050000 },
      { carCategory: 'Executive Luxury (Alphard)', lepasKunciRate: 2200000, withDriverRate: 2500000 },
      { carCategory: 'SUV Premium (Pajero Sport)', lepasKunciRate: 1150000, withDriverRate: 1350000 }
    ]
  },
  {
    slug: 'rental-mobil-bandung',
    cityName: 'Bandung',
    province: 'Jawa Barat',
    heroTagline: 'Sewa Mobil Bandung Lengkap & Murah - Keliling Kota Kembang Seru',
    landmarkImage: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80',
    metaTitle: 'Rental Mobil Bandung - Lepas Kunci & Sopir - Karental',
    metaDescription: 'Rental mobil Bandung untuk wisata Lembang, Ciwidey, Dago. Siap antar jemput stasiun Kereta Cepat Whoosh Padalarang & Tegalluar.',
    articleContent: `
      <h2>Sewa Mobil Bandung Wisata & Perjalanan Dinas</h2>
      <p>Perjalanan wisata kuliner dan keindahan alam Lembang Ciwidey makin sempurna dengan kenyamanan armada SUV dan MPV Karental.</p>
    `,
    popularLocations: ['Stasiun Whoosh Padalarang', 'Stasiun Bandung Kebon Kawung', 'Lembang & Maribaya', 'Dago & Riau Shoppiing District'],
    priceList: [
      { carCategory: 'MPV Family (Innova Zenix)', lepasKunciRate: 850000, withDriverRate: 1050000 },
      { carCategory: 'Compact SUV (Honda HR-V)', lepasKunciRate: 650000, withDriverRate: 850000 }
    ]
  },
  {
    slug: 'rental-mobil-yogyakarta',
    cityName: 'Yogyakarta',
    province: 'DI Yogyakarta',
    heroTagline: 'Rental Mobil Jogja Terlengkap & Sopir Ramah Khas Jogja',
    landmarkImage: 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=1200&q=80',
    metaTitle: 'Rental Mobil Jogja Murah - Lepas Kunci & Driver - Karental',
    metaDescription: 'Sewa mobil Jogja terpercaya. Antar jemput Bandara YIA Kulon Progo, Stasiun Tugu Jogja, Malioboro, Borobudur, & Gunungkidul.',
    articleContent: `
      <h2>Sewa Mobil Istimewa di Yogyakarta</h2>
      <p>Nikmati suasana budaya Jogja tanpa ribet dengan layanan mobil terawat dan ramah sopir berpengalaman.</p>
    `,
    popularLocations: ['Bandara YIA Kulon Progo', 'Stasiun Tugu Jogja', 'Kawasan Malioboro', 'Candi Borobudur & Prambanan'],
    priceList: [
      { carCategory: 'MPV Family (Innova Zenix)', lepasKunciRate: 800000, withDriverRate: 1000000 },
      { carCategory: 'Executive Luxury (Alphard)', lepasKunciRate: 2200000, withDriverRate: 2500000 }
    ]
  },
  {
    slug: 'rental-mobil-medan',
    cityName: 'Medan',
    province: 'Sumatera Utara',
    heroTagline: 'Sewa Mobil Medan & Danau Toba Parapat - Armada Terawat & Driver Berpengalaman',
    landmarkImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    metaTitle: 'Rental Mobil Medan Murah - Lepas Kunci & Driver - Karental',
    metaDescription: 'Rental mobil Medan antar jemput Bandara Kualanamu (KNO), Istana Maimun, Danau Toba Parapat, Berastagi.',
    articleContent: `
      <h2>Rental Mobil Profesional Medan & Sumatera Utara</h2>
      <p>Jelajahi keindahan Istana Maimun, wisata alam Berastagi, hingga destinasi super prioritas Danau Toba dengan kenyamanan armada Karental Medan.</p>
    `,
    popularLocations: ['Bandara Internasional Kualanamu (KNO)', 'Istana Maimun & Masjid Raya', 'Berastagi & Danau Toba', 'CBD Kota Medan'],
    priceList: [
      { carCategory: 'MPV Family (Innova Zenix)', lepasKunciRate: 850000, withDriverRate: 1050000 },
      { carCategory: 'SUV Premium (Fortuner/Pajero)', lepasKunciRate: 1100000, withDriverRate: 1300000 }
    ]
  },
  {
    slug: 'rental-mobil-semarang',
    cityName: 'Semarang',
    province: 'Jawa Tengah',
    heroTagline: 'Rental Mobil Semarang Murah - Layanan Antar Jemput Bandara Ahmad Yani & Stasiun Tawang',
    landmarkImage: 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=1200&q=80',
    metaTitle: 'Rental Mobil Semarang - Lepas Kunci & Driver - Karental',
    metaDescription: 'Sewa mobil Semarang lepas kunci & driver. Layanan gratis antar jemput Lawang Sewu, Kota Lama, Bandara Ahmad Yani, Stasiun Tawang.',
    articleContent: `
      <h2>Sewa Mobil Murah & Terpercaya di Semarang</h2>
      <p>Kebutuhan perjalanan dinas perkantoran Jawa Tengah dan wisata sejarah Kota Lama Lawang Sewu semakin nyaman dengan armada terbaru Karental.</p>
    `,
    popularLocations: ['Bandara Ahmad Yani (SRG)', 'Stasiun Semarang Tawang', 'Kawasan Kota Lama & Lawang Sewu', 'Simpang Lima Semarang'],
    priceList: [
      { carCategory: 'MPV Family (Innova Zenix)', lepasKunciRate: 800000, withDriverRate: 1000000 },
      { carCategory: 'Compact City (Honda HR-V)', lepasKunciRate: 650000, withDriverRate: 850000 }
    ]
  },
  {
    slug: 'rental-mobil-makassar',
    cityName: 'Makassar',
    province: 'Sulawesi Selatan',
    heroTagline: 'Sewa Mobil Makassar & Toraja - Antar Jemput Bandara Sultan Hasanuddin',
    landmarkImage: 'https://images.unsplash.com/photo-1584441405886-bc91be61e56a?auto=format&fit=crop&w=1200&q=80',
    metaTitle: 'Rental Mobil Makassar - Lepas Kunci & Driver - Karental',
    metaDescription: 'Sewa mobil Makassar terpercaya. Antar jemput Bandara Sultan Hasanuddin, Pantai Losari, Benteng Rotterdam, Tana Toraja.',
    articleContent: `
      <h2>Layanan Rental Mobil Handal di Makassar</h2>
      <p>Pusat gerbang ekonomi Indonesia Timur. Karental Makassar menyediakan armada MPV dan SUV terbaik untuk kunjungan bisnis dan wisata kuliner Pantai Losari.</p>
    `,
    popularLocations: ['Bandara Sultan Hasanuddin (UPG)', 'Pantai Losari & Center Point Indonesia', 'Benteng Rotterdam', 'Kawasan Industri Makassar (KIMA)'],
    priceList: [
      { carCategory: 'MPV Family (Innova Zenix)', lepasKunciRate: 850000, withDriverRate: 1050000 },
      { carCategory: 'SUV Premium (Fortuner)', lepasKunciRate: 1100000, withDriverRate: 1300000 }
    ]
  }
];

export const PROMOS: Promo[] = [
  {
    id: 'promo-1',
    title: 'PROMO MERDEKA RENTAL LUXURY 20%',
    code: 'KARENTALSUPER',
    discountPercentage: 20,
    maxDiscount: 500000,
    minTransaction: 1500000,
    validUntil: '2026-08-31T23:59:59',
    description: 'Potongan harga hingga Rp 500.000 untuk sewa Alphard, Staria, Mercedes-Benz, dan BMW di seluruh kota.',
    bannerImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'promo-2',
    title: 'DISKON SEWA BULANAN CORPORATE 30%',
    code: 'KARENTALCORP',
    discountPercentage: 30,
    maxDiscount: 3000000,
    minTransaction: 10000000,
    validUntil: '2026-12-31T23:59:59',
    description: 'Diskon istimewa untuk kontrak operasional rental bulanan instansi/perusahaan minimal durasi 30 hari.',
    bannerImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'promo-3',
    title: 'SPECIAL WEEKEND ESCAPE BALI 15%',
    code: 'BALIVIBES',
    discountPercentage: 15,
    maxDiscount: 300000,
    minTransaction: 1000000,
    validUntil: '2026-09-15T23:59:59',
    description: 'Diskon sewa mobil Innova Zenix & HR-V khusus penjemputan Bandara Ngurah Rai Bali.',
    bannerImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    customerName: 'Bapak Hendra Setiawan',
    cityName: 'Jakarta',
    rating: 5,
    comment: 'Layanan Karental luar biasa! Mobil Alphard yang kami sewa sangat harum, bersih kinclong, dan driver Mas Slamet sangat paham jalanan Jakarta. Sangat memuaskan untuk menyambut tamu VIP direksi kami.',
    carRented: 'Toyota Alphard Transformer',
    date: '24 Juli 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-2',
    customerName: 'Ibu Clarissa Wijaya',
    cityName: 'Bali',
    rating: 5,
    comment: 'Sewa Innova Zenix Hybrid di Bali via Karental gampang banget. Lepas kunci proses verifikasi kilat 15 menit beres. Mobil diantar tepat waktu di Bandara Ngurah Rai.',
    carRented: 'Innova Zenix Hybrid Q',
    date: '01 Agustus 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-3',
    customerName: 'Dr. Ahmad Fauzi',
    cityName: 'Surabaya',
    rating: 5,
    comment: 'Sudah berlangganan sewa Fortuner untuk kunjungan dinas luar kota Surabaya - Malang - Kediri. Kondisi mesin prima, AC dingin nyess, dan admin CS fast response 24 jam.',
    carRented: 'Toyota Fortuner GR Sport',
    date: '12 Juli 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Persyaratan',
    question: 'Apa saja syarat sewa mobil lepas kunci di Karental?',
    answer: 'Untuk rental mobil lepas kunci, Anda cukup menyerahkan KTP Asli, SIM A aktif, bukti kepemilikan akun media sosial / ID Karyawan / Paspor, serta deposit keamanan yang akan dikembalikan 100% setelah masa sewa selesai.'
  },
  {
    id: 'faq-2',
    category: 'Sopir',
    question: 'Apakah biaya rental dengan driver sudah termasuk BBM dan Tol?',
    answer: 'Tarif sewa dengan driver standar mencakup Unit Mobil + Jasa Driver (12 Jam/Hari). Untuk biaya BBM, E-Toll, Parkir, dan makan driver menjadi tanggungan penyewa, atau Anda dapat memilih Paket All-In (Mobil + Driver + BBM + Tol).'
  },
  {
    id: 'faq-3',
    category: 'Pembayaran',
    question: 'Bagaimana sistem pembayaran dan pembatalan booking?',
    answer: 'Anda dapat membayar DP minimal 30% untuk mengunci jadwal kendaraan melalui Transfer Bank Resmi BCA/Mandiri PT Karental. Pelunasan dilakukan saat serah terima kendaraan. Pembatalan H-3 refund 100% tanpa potongan.'
  },
  {
    id: 'faq-4',
    category: 'Asuransi',
    question: 'Apakah kendaraan dilindungi asuransi?',
    answer: 'Ya, seluruh armada Karental telah dilindungi Asuransi All-Risk Commercial. Jika terjadi lecet ringan atau insiden, penyewa lepas kunci hanya dikenakan klaim Own Risk (OR) sesuai regulasi yang berlaku.'
  }
];

export const BLOGS: BlogArticle[] = [
  {
    id: 'blog-1',
    slug: 'tips-memilih-mobil-rental-mewah-untuk-acara-pernikahan-wedding',
    title: 'Tips Memilih Mobil Rental Mewah untuk Acara Wedding & Tamu VIP',
    category: 'Tips & Guide',
    author: 'Tim Editorial Karental',
    publishedDate: '02 Agustus 2026',
    readTime: '4 Menit',
    excerpt: 'Momen pernikahan adalah acara sekali seumur hidup. Simak panduan memilih antara Alphard, Mercedes-Benz, atau BMW untuk iring-iringan pengantin.',
    content: 'Pernikahan adalah momen istimewa yang membutuhkan segala detail terbaik, termasuk pilihan kendaraan pengantin. Alphard Transformer dan Mercedes C-Class menjadi dua pilihan paling diminati di Jakarta dan Bali...',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'blog-2',
    slug: 'rekomendasi-rute-roadtrip-bali-dengan-innova-zenix-hybrid',
    title: 'Rekomendasi Rute Roadtrip Bali Utara & Selatan dengan Zenix Hybrid',
    category: 'Destinasi Wisata',
    author: 'Santi Dewi',
    publishedDate: '28 Juli 2026',
    readTime: '5 Menit',
    excerpt: 'Menjelajahi keindahan Kintamani, Bedugul, hingga pantai Uluwatu dengan kenyamanan Innova Zenix Hybrid yang super irit bahan bakar.',
    content: 'Bali tidak hanya soal Seminyak atau Canggu. Dengan menggunakan mobil sewaan keluarga seperti Innova Zenix Hybrid, Anda bisa menjelajah lereng Gunung Batur hingga pantai rahasia di Pandawa dengan sangat efisien...',
    coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
  }
];

export const DRIVERS: Driver[] = [
  {
    id: 'drv-1',
    name: 'Slamet Rahardjo',
    phone: '+62 812-3456-7890',
    assignedCity: 'Jakarta',
    rating: 4.9,
    experienceYears: 8,
    status: 'Tersedia',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'drv-2',
    name: 'I Wayan Sudiarta',
    phone: '+62 813-9876-5432',
    assignedCity: 'Bali',
    rating: 5.0,
    experienceYears: 10,
    status: 'Bertugas',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'drv-3',
    name: 'Budi Santoso',
    phone: '+62 811-2233-4455',
    assignedCity: 'Surabaya',
    rating: 4.8,
    experienceYears: 6,
    status: 'Tersedia',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
  }
];
