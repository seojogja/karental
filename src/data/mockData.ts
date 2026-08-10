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
      <h2>Rental Mobil Jakarta Terlengkap: Lepas Kunci & Driver VVIP 24 Jam</h2>
      <p>Sebagai pusat ekonomi, bisnis, dan pemerintahan Indonesia, Jakarta memiliki tingkat dinamika mobilitas yang sangat tinggi. Karental Jakarta hadir memberikan solusi penyewaan mobil profesional, mulai dari armada harian bisnis, operasional ekspatriat, hingga perjalanan VIP protokoler dengan sopir berpengalaman.</p>

      <h3>Keunggulan Layanan Rental Mobil Karental Jakarta</h3>
      <ul>
        <li><strong>Pilihan Armada Terlengkap & Terbaru:</strong> Tersedia Innova Zenix Hybrid, Toyota Fortuner GR, Mitsubishi Pajero Sport, hingga Toyota Alphard Transformer & HEV. Semua kendaraan dalam kondisi prima dan kebersihan terjamin.</li>
        <li><strong>Sopir Profesional & Beretika:</strong> Pengemudi Karental memahami medan lalu lintas Jabodetabek, bebas dari aturan ganjil-genap dengan penyesuaian plat kendaraan, dan terlatih dalam etika pelayanan tamu VVIP.</li>
        <li><strong>Layanan Antar-Jemput Gratis Bandara:</strong> Bebas biaya pengantaran dan penjemputan di Bandara Internasional Soekarno-Hatta (CGK) & Bandara Halim Perdanakusuma (HLP) serta stasiun Kereta Cepat Whoosh Halim.</li>
        <li><strong>Rental Mobil Lepas Kunci Syarat Mudah:</strong> Proses verifikasi dokumen cepat melalui WhatsApp tanpa survey rumit untuk profesional dan korporasi.</li>
      </ul>

      <h3>Pilihan Paket Sewa Mobil di Jakarta</h3>
      <p>Karental Jakarta menyediakan fleksibilitas skema penyewaan yang dapat disesuaikan dengan kebutuhan Anda:</p>
      <ul>
        <li><strong>Sewa Harian Lepas Kunci (24 Jam):</strong> Bebas berkendara ke mana saja di area Jabodetabek dan Jawa Barat dengan unit kendaraan tahun muda.</li>
        <li><strong>Sewa Mobil + Driver (12 Jam / Full Day):</strong> Solusi bebas lelah menghadapi kemacetan Jakarta. Sopir kami siap mengantar Anda ke seluruh pertemuan bisnis.</li>
        <li><strong>Paket All-In (Mobil + Driver + BBM + Tol & Parkir):</strong> Solusi praktis tanpa khawatir biaya tambahan selama perjalanan di Jakarta.</li>
        <li><strong>Sewa Bulanan & Kontrak Korporasi:</strong> Layanan operasional perusahaan dengan fasilitas perawatan berkala dan mobil pengganti (replacement car).</li>
      </ul>

      <h3>Area Jangkauan Antar Jemput di Jakarta & Jabodetabek</h3>
      <p>Kami melayani pengantaran unit langsung ke rumah, kantor, hotel, maupun fasilitas umum di area Jakarta Selatan (SCBD, Kuningan, Pondok Indah), Jakarta Pusat (Thamrin, Sudirman, Menteng), Jakarta Barat (Puri Indah, Central Park), Jakarta Utara (PIK, Kelapa Gading), Jakarta Timur, Tangerang, Depok, dan Bekasi.</p>
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
      <h2>Sewa Mobil Bali Murah & Luxury: Nikmati Liburan Impian di Pulau Dewata</h2>
      <p>Pulau Bali adalah destinasi wisata internasional yang menawarkan pesona pantai, budaya, dan keindahan alam luar biasa. Karental Bali menyediakan armada lengkap untuk mendukung perjalanan wisata, honeymoon, pernikahan, hingga konferensi tingkat tinggi (G20/KTT) di Bali.</p>

      <h3>Mengapa Pilih Rental Mobil Karental di Bali?</h3>
      <ul>
        <li><strong>Antar Jemput Gratis di Bandara Ngurah Rai (DPS):</strong> Tim kami siap menantikan kedatangan Anda di arrival hall Bandara Bali dengan unit siap pakai.</li>
        <li><strong>Armada Mobil Mewah & Convertible:</strong> Tersedia pilihan Innova Zenix, Alphard, Fortuner, hingga Mini Cooper & BMW Convertible untuk momen liburan berkesan.</li>
        <li><strong>Driver Lokal Berpengalaman sebagai Tour Guide:</strong> Sopir kami siap memberikan rekomendasi spot kuliner tersembunyi, sunset terbaik, dan rute bebas macet.</li>
        <li><strong>Opsi Lepas Kunci Praktis:</strong> Syarat mudah khusus wisatawan domestik dan mancanegara yang ingin menjelajah Bali sendiri.</li>
      </ul>

      <h3>Rute Wisata Populer di Bali Bersama Karental</h3>
      <p>Jelajahi seluruh kawasan eksotis Bali dengan kendaraan yang nyaman:</p>
      <ul>
        <li><strong>Bali Selatan:</strong> Pantai Pandawa, Melasti, Uluwatu, Nusa Dua, dan GWK Cultural Park.</li>
        <li><strong>Kawasan Hipster & Sunset:</strong> Seminyak, Canggu, Pererenan, dan Echo Beach.</li>
        <li><strong>Bali Tengah & Budaya:</strong> Ubud Monkey Forest, Tegallalang Rice Terrace, Kintamani, dan Danau Batur.</li>
        <li><strong>Bali Utara & Timur:</strong> Handara Gate Bedugul, Pura Lempuyang, Tirta Gangga, dan Lovina Beach.</li>
      </ul>
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
      <h2>Rental Mobil Surabaya Terpercaya: Antar Jemput Bandara Juanda & Stasiun Gubeng</h2>
      <p>Surabaya sebagai Kota Pahlawan sekaligus pusat perekonomian dan industri Jawa Timur membutuhkan sarana transportasi yang andal. Karental Surabaya siap melayani kebutuhan mobil harian, mingguan, maupun bulanan untuk keperluan bisnis, industri Rungkut/Gresik, hingga perjalanan luar kota seperti Bromo dan Malang.</p>

      <h3>Fasilitas Unggulan Karental Surabaya</h3>
      <ul>
        <li><strong>Layanan Antar Jemput Bandara Juanda (SUB):</strong> Pengantaran unit cepat ke Terminal 1 & 2 Bandara Juanda serta Stasiun Surabaya Gubeng & Pasar Turi.</li>
        <li><strong>Armada Luar Kota Siap Bromo & Malang:</strong> Kondisi mesin dan rem selalu dicek ketat sebelum digunakan melintasi rute pegunungan Bromo atau Batu Malang.</li>
        <li><strong>Sopir Berpengalaman Rute Jawa Timur:</strong> Sopir handal yang menguasai jalan tol Trans-Jawa dan rute wisata favorit.</li>
        <li><strong>Pricelist Transparan Tanpa Biaya Tersembunyi:</strong> Harga bersaing sudah termasuk garansi kebersihan dan keharuman kabin.</li>
      </ul>

      <h3>Paket Wisata & Dinas dari Surabaya</h3>
      <ul>
        <li><strong>City Tour Surabaya:</strong> Kunjungan ke Tunjungan Plaza, Sampoerna Strategic, Monumen Kapal Selam, dan Jembatan Suramadu.</li>
        <li><strong>Paket Wisata Bromo Sunrise:</strong> Perjalanan malam hari dari Surabaya ke Penanjakan Bromo dengan kenyamanan MPV/SUV Karental.</li>
        <li><strong>Perjalanan Bisnis Perkantoran & Industri:</strong> Pengantaran ke kawasan industri SIER Rungkut, JIIPE Gresik, dan Krian Sidoarjo.</li>
      </ul>
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
      <h2>Sewa Mobil Bandung Murah & Lengkap: Wisata Lembang, Ciwidey & Whoosh Station</h2>
      <p>Kota Bandung dan sekitarnya menawarkan destinasi wisata alam sejuk, kuliner lezat, dan belanja fashion yang selalu memikat. Karental Bandung menyediakan sewa mobil lepas kunci dan dengan driver profesional untuk mengantar Anda menikmati suasana Kota Kembang tanpa lelah.</p>

      <h3>Keuntungan Sewa Mobil di Bandung Bersama Karental</h3>
      <ul>
        <li><strong>Antar Jemput Stasiun Kereta Cepat Whoosh:</strong> Pengantaran unit langsung ke Stasiun Padalarang maupun Stasiun Tegalluar untuk kemudahan pengguna Whoosh dari Jakarta.</li>
        <li><strong>Performa Mobil Tangguh di Rute Menanjak:</strong> Armada Innova Zenix, HR-V, dan Pajero dalam kondisi mesin optimal untuk tanjakan tajam Lembang, Tangkuban Perahu, dan Ciwidey.</li>
        <li><strong>Driver Lokal Ramah & Paham Rute Alternatif:</strong> Menghindari kemacetan akhir pekan di jalur Dago, Lembang, dan Pasteur.</li>
        <li><strong>Sewa Mobil Lepas Kunci Syarat Cepat:</strong> Cocok untuk liburan keluarga atau reuni sahabat secara privat.</li>
      </ul>

      <h3>Rute Favorit Rental Mobil Bandung</h3>
      <ul>
        <li><strong>Bandung Utara:</strong> Farmhouse Lembang, Floating Market, Orchid Forest Cikole, D'Diepland.</li>
        <li><strong>Bandung Selatan:</strong> Kawah Putih Ciwidey, Ranca Upas, Glamping Lakeside Rancabali, Tea Bridge.</li>
        <li><strong>City Tour & Shopping:</strong> Jalan Riau, Braga, Dago, Pasar Baru, dan Museum Asia Afrika.</li>
      </ul>
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
      <h2>Rental Mobil Jogja Istimewa: Lepas Kunci & Driver Antar Jemput YIA & Tugu</h2>
      <p>Yogyakarta merupakan kota budaya, pelajar, dan pariwisata yang kaya akan kenangan. Karental Jogja menawarkan penyewaan kendaraan dengan pelayanan istimewa ramah khas Jogja untuk menyempurnakan kunjungan Anda di Candi Borobudur, Malioboro, hingga pantai-pantai eksotis Gunungkidul.</p>

      <h3>Mengapa Memilih Karental Yogyakarta?</h3>
      <ul>
        <li><strong>Antar Jemput Bandara YIA Kulon Progo & Stasiun Tugu:</strong> Pengantaran langsung ke pintu kedatangan Bandara Internasional Yogyakarta (YIA) dan Stasiun Tugu Jogja.</li>
        <li><strong>Driver Berkelakuan Santun Khas Jogja:</strong> Paham seluk-beluk rute sejarah, wisata pantai selat Gunungkidul, serta tempat kuliner Gudeg & Wedang Ronde legendaris.</li>
        <li><strong>Armada Bersih & Perawatan Rutin:</strong> Jaminan kenyamanan maksimal dari kelas MPV Zenix hingga Luxury Alphard.</li>
        <li><strong>Harga Sewa Sangat Terjangkau:</strong> Tarif ekonomis cocok untuk kantong mahasiswa, dinas kantor, maupun rombongan keluarga.</li>
      </ul>

      <h3>Destinasi Utama Wisata Jogja Bersama Karental</h3>
      <ul>
        <li><strong>Wisata Sejarah & Budaya:</strong> Keraton Yogyakarta, Taman Sari, Candi Prambanan, dan Candi Borobudur.</li>
        <li><strong>Wisata Alam & Petualangan:</strong> Jeep Lava Tour Merapi, Cave Tubing Goa Pindul, Hutan Pinus Mangunan.</li>
        <li><strong>Wisata Pantai Gunungkidul:</strong> Pantai Indrayanti, Pantai Pok Tunggal, HeHa Sky View, dan Obelix Hills.</li>
      </ul>
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
      <h2>Rental Mobil Medan Terpercaya: Antar Jemput Bandara Kualanamu & Danau Toba</h2>
      <p>Medan sebagai metropolitan terbesar di Sumatera merupakan pintu utama menuju pesona keajaiban dunia Danau Toba Parapat dan keindahan alam Berastagi. Karental Medan hadir dengan armada handal siap melayani perjalanan dinas korporasi maupun perjalanan wisata Sumatera Utara.</p>

      <h3>Keunggulan Karental Medan</h3>
      <ul>
        <li><strong>Antar-Jemput Bandara Internasional Kualanamu (KNO):</strong> Penjemputan tepat waktu 24 jam di Bandara Kualanamu langsung menuju kota Medan atau Danau Toba.</li>
        <li><strong>Armada Tangguh Rute Lintas Sumatera:</strong> Mobil Innova Reborn/Zenix, Fortuner, dan Pajero dikondisikan prima untuk menempuh perjalanan jauh Berastagi & Samosir.</li>
        <li><strong>Driver Paham Medan & Jalur Wisata Sumut:</strong> Pengemudi berpengalaman yang mengutamakan keselamatan dan kenyamanan penumpang.</li>
        <li><strong>Pilihan Sewa Lepas Kunci & All-In:</strong> Fleksibel sesuai anggaran dan preferensi perjalanan Anda.</li>
      </ul>

      <h3>Rute Favorit di Medan & Sumatera Utara</h3>
      <ul>
        <li><strong>City Tour Medan:</strong> Istana Maimun, Masjid Raya Al-Mashun, Tjong A Fie Mansion, dan Pusat Kuliner Durian Ucok.</li>
        <li><strong>Wisata Alam Berastagi:</strong> Bukit Kubu, Pasar Buah Berastagi, Gunung Sibayak, dan Air Terjun Sipiso-Piso.</li>
        <li><strong>Destinasi Super Prioritas Danau Toba:</strong> Pelabuhan Ajibata Parapat, Pulau Samosir, Tuk-Tuk, dan Bukit Holbung.</li>
      </ul>
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
      <h2>Rental Mobil Semarang Murah & Terpercaya: Bandara Ahmad Yani & Stasiun Tawang</h2>
      <p>Semarang merupakan pusat pemerintahan Jawa Tengah yang memadukan kawasan bisnis modern dengan cagar budaya bersejarah. Karental Semarang memberikan layanan penyewaan mobil premium lepas kunci maupun dengan sopir untuk memudahkan dinas perkantoran dan wisata kuliner khas Semarang.</p>

      <h3>Mengapa Sewa Mobil di Karental Semarang?</h3>
      <ul>
        <li><strong>Layanan Antar Jemput Bandara Ahmad Yani (SRG):</strong> Pengantaran unit ke Bandara Ahmad Yani, Stasiun Semarang Tawang & Poncol, serta hotel se-kota Semarang.</li>
        <li><strong>Sopir Berpengalaman Tol Trans Jawa:</strong> Siap mengantar perjalanan bisnis menuju kawasan industri Kendal, Ungaran, Kudus, hingga Solo dan Jogja.</li>
        <li><strong>Verifikasi Cepat & Syarat Mudah:</strong> Proses pemesanan praktis via CS WhatsApp tanpa prosedur berbelit.</li>
        <li><strong>Kondisi Mobil Selalu Bersih & Wangi:</strong> Jaminan kenyamanan kabin ber-AC dingin dan higienis.</li>
      </ul>

      <h3>Destinasi Populer di Semarang & Sekitarnya</h3>
      <ul>
        <li><strong>Wisata Sejarah Kota Semarang:</strong> Lawang Sewu, Kawasan Kota Lama Semarang, Kelenteng Sam Poo Kong, dan Candi Gedong Songo.</li>
        <li><strong>Wisata Kuliner:</strong> Pandanaran Lumpia Semarang, Tahu Baxo Ungaran, Nasi Ayam Bu Wido, dan Bandeng Presto.</li>
        <li><strong>Kawasan Industri & Perkantoran:</strong> Kawasan Industri Terboyo, BSB City, Kendal Industrial Park, dan Simpang Lima.</li>
      </ul>
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
      <h2>Sewa Mobil Makassar Handal: Antar Jemput Bandara Sultan Hasanuddin & Toraja</h2>
      <p>Makassar sebagai gerbang ekonomi utama Indonesia Timur menyimpan pesona pantai eksotis, situs bersejarah, dan kuliner juara dunia. Karental Makassar menyediakan layanan rental mobil terpercaya untuk kebutuhan operasional bisnis, kunjungan instansi, hingga tur wisata ke Tana Toraja.</p>

      <h3>Keunggulan Layanan Karental Makassar</h3>
      <ul>
        <li><strong>Antar Jemput Bandara Sultan Hasanuddin (UPG):</strong> Tim pengemudi kami siap menjemput Anda di arrival hall Bandara Makassar 24 jam nonstop.</li>
        <li><strong>Armada Prima Siap Tempuh Jalur Trans-Sulawesi:</strong> Pilihan unit Fortuner, Pajero, dan Innova Zenix tangguh untuk perjalanan jarak jauh ke Tana Toraja, Bulukumba, & Bira.</li>
        <li><strong>Sopir Lokal Profesional & Informatif:</strong> Mengenal akrab rute alternatif, tempat makan Coto Makassar terlezat, dan spot sunset Pantai Losari.</li>
        <li><strong>Paket Sewa Lepas Kunci & Driver All-In:</strong> Pilihan fleksibel untuk kebutuhan perorangan maupun perusahaan.</li>
      </ul>

      <h3>Rute Impian Wisata di Sulawesi Selatan</h3>
      <ul>
        <li><strong>City Tour Makassar:</strong> Pantai Losari, Center Point of Indonesia (CPI), Masjid 99 Kubah, Benteng Rotterdam, dan Fort Rotterdam.</li>
        <li><strong>Wisata Alam & Pantai:</strong> Karst Rammang-Rammang Maros, Tanjung Bira Bulukumba, dan Malino Highlands.</li>
        <li><strong>Wisata Budaya Tana Toraja:</strong> Kete Kesu, Lemo, Rantepao, dan Buntu Burake Makale.</li>
      </ul>
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
