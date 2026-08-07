import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CitiesTab } from '../components/admin/CitiesTab';
import { PriceListTab } from '../components/admin/PriceListTab';
import { PromosTab } from '../components/admin/PromosTab';
import { BlogsTab } from '../components/admin/BlogsTab';
import { TestimoniTab } from '../components/admin/TestimoniTab';
import { FaqTab } from '../components/admin/FaqTab';
import { SettingsTab } from '../components/admin/SettingsTab';
import { ImageUpload } from '../components/admin/ImageUpload';
import { DriversTab } from '../components/admin/DriversTab';
import { WhatsappTab } from '../components/admin/WhatsappTab';
import { CalendarTab } from '../components/admin/CalendarTab';
import { ReportsTab } from '../components/admin/ReportsTab';
import { HostingerDeployModal } from '../components/admin/HostingerDeployModal';
import { Car, Booking, Promo, Driver, CityPageData } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  LayoutDashboard,
  Car as CarIcon,
  Calendar,
  Users,
  Settings,
  MapPin,
  Tag,
  PhoneCall,
  FileText,
  Download,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Lock,
  LogOut,
  TrendingUp,
  DollarSign,
  Save,
  Server,
  Globe,
  X,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const {
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    cars,
    bookings,
    cities,
    promos,
    drivers,
    blogs,
    reviews,
    faqs,
    whatsappLogs,
    addCar,
    updateCar,
    deleteCar,
    updateBookingStatus,
    showToast
  } = useApp();

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'cars' | 'bookings' | 'calendar' | 'priceList' | 'settings' | 'cities' | 'promos' | 'blog' | 'testimoni' | 'faq' | 'drivers' | 'whatsapp' | 'reports'
  >('overview');

  // Hostinger Guide Modal State
  const [isHostingerGuideOpen, setIsHostingerGuideOpen] = useState(false);
  const [adminNoticeText, setAdminNoticeText] = useState('Sistem Karental CMS versi 2.4 aktif. Siap untuk dipublikasikan ke Hostinger Shared / VPS Node.js.');

  // Add Car Modal
  const [isCarModalOpen, setIsCarModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [carForm, setCarForm] = useState({
    name: 'Toyota Camry 2.5 V',
    brand: 'Toyota',
    category: 'Executive Sedan' as Car['category'],
    transmission: 'Otomatis' as Car['transmission'],
    capacity: 5,
    fuel: 'Bensin' as Car['fuel'],
    pricePerDay: 1500000,
    priceWithDriver: 1800000,
    availableStatus: 'Tersedia' as Car['availableStatus'],
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    description: 'Sedan eksekutif elegan untuk perjalanan bisnis resmi.',
    engine: '2.5L DOHC Dual VVT-i',
    year: 2024,
    luggage: '2 Koper'
  });

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-[var(--theme-color)] text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-orange-500/30">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white font-poppins">
              Login Admin Karental
            </h2>
            <p className="text-xs text-slate-500">
              Masukkan kredensial pengelola untuk mengakses dashboard CMS
            </p>
          </div>

          <form
            onSubmit={e => {
              e.preventDefault();
              adminLogin(username, password);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Username Admin</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Password Admin</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--theme-color)] hover:bg-orange-600 text-white font-bold py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-orange-500/20 cursor-pointer"
            >
              Masuk Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Calculate Statistics for Charts
  const totalRevenue = bookings
    .filter(b => b.status === 'Confirmed' || b.status === 'Completed' || b.status === 'On Going')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const revenueByCity = cities.map(ct => {
    const cityBookings = bookings.filter(b => b.city === ct.cityName);
    const rev = cityBookings.reduce((sum, b) => sum + b.totalPrice, 0);
    return { name: ct.cityName, revenue: rev, bookingsCount: cityBookings.length };
  });

  const chartMonthlyData = [
    { month: 'Mei', revenue: 28000000, bookings: 12 },
    { month: 'Jun', revenue: 42000000, bookings: 18 },
    { month: 'Jul', revenue: 65000000, bookings: 28 },
    { month: 'Agt', revenue: totalRevenue > 0 ? totalRevenue : 72000000, bookings: bookings.length + 10 }
  ];

  const pieData = [
    { name: 'MPV Luxury', value: 45, color: 'var(--theme-color)' },
    { name: 'SUV Premium', value: 25, color: '#3b82f6' },
    { name: 'Executive Sedan', value: 20, color: '#10b981' },
    { name: 'Compact City', value: 10, color: '#f59e0b' }
  ];

  // Export PDF / CSV Handler
  const handleExportCSV = () => {
    const csvRows = [
      ['Kode Booking', 'Mobil', 'Pelanggan', 'Kota', 'Total Biaya', 'Status', 'Tanggal'].join(','),
      ...bookings.map(b => [b.bookingCode, `"${b.carName}"`, `"${b.customerName}"`, b.city, b.totalPrice, b.status, b.createdAt].join(','))
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Karental_Report_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast('Laporan Excel/CSV berhasil didownload!');
  };

  const handleSaveCarForm = () => {
    if (editingCar) {
      updateCar({
        ...editingCar,
        name: carForm.name,
        brand: carForm.brand,
        category: carForm.category,
        transmission: carForm.transmission,
        capacity: carForm.capacity,
        fuel: carForm.fuel,
        pricePerDay: carForm.pricePerDay,
        priceWithDriver: carForm.priceWithDriver,
        availableStatus: carForm.availableStatus,
        image: carForm.image,
        description: carForm.description
      });
    } else {
      addCar({
        name: carForm.name,
        brand: carForm.brand,
        category: carForm.category,
        transmission: carForm.transmission,
        capacity: carForm.capacity,
        fuel: carForm.fuel,
        hasAC: true,
        pricePerDay: carForm.pricePerDay,
        priceWithDriver: carForm.priceWithDriver,
        availableStatus: carForm.availableStatus,
        rating: 5.0,
        reviewCount: 1,
        image: carForm.image,
        gallery: [carForm.image],
        description: carForm.description,
        specs: {
          engine: carForm.engine,
          year: carForm.year,
          doors: 4,
          luggage: carForm.luggage
        },
        features: ['Bluetooth Audio', 'Kamera 360', 'AC Dual Zone'],
        cityAvailability: ['Jakarta', 'Surabaya', 'Bali', 'Bandung']
      });
    }
    setIsCarModalOpen(false);
    setEditingCar(null);
  };

  const pendingCount = bookings.filter(b => b.status === 'Pending').length;

  const menuGroups = [
    {
      groupTitle: 'Analitik & Ringkasan',
      items: [
        { id: 'overview', label: 'Dashboard Statistik', icon: TrendingUp },
        { id: 'whatsapp', label: 'Analytics WA CS', count: whatsappLogs.length, icon: PhoneCall },
        { id: 'reports', label: 'Laporan & Ekspor', icon: FileText }
      ]
    },
    {
      groupTitle: 'Operasional Armada',
      items: [
        { id: 'cars', label: 'Kelola Mobil', count: cars.length, icon: CarIcon },
        { id: 'bookings', label: 'Daftar Booking', count: bookings.length, badge: pendingCount > 0 ? `${pendingCount} Pending` : undefined, icon: Calendar },
        { id: 'calendar', label: 'Kalender Sewa', icon: Clock },
        { id: 'drivers', label: 'Driver & SDM', count: drivers?.length || 0, icon: Users }
      ]
    },
    {
      groupTitle: 'Halaman & SEO',
      items: [
        { id: 'cities', label: 'SEO Page Per Kota', count: cities.length, icon: MapPin },
        { id: 'priceList', label: 'Daftar Harga & CTA', icon: DollarSign },
        { id: 'promos', label: 'Voucher & Promo', count: promos.length, icon: Tag },
        { id: 'blog', label: 'Artikel & Blog', count: blogs.length, icon: FileText },
        { id: 'testimoni', label: 'Ulasan Pelanggan', count: reviews.length, icon: Users },
        { id: 'faq', label: 'Pertanyaan FAQ', count: faqs.length, icon: PhoneCall }
      ]
    },
    {
      groupTitle: 'Sistem',
      items: [
        { id: 'settings', label: 'Pengaturan Global', icon: Settings }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-6">
      
      {/* TOP ADMIN DASHBOARD SYSTEM BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 rounded-3xl border border-indigo-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <span className="w-3 h-3 bg-emerald-400 rounded-full animate-ping absolute top-0 right-0"></span>
              <span className="w-3 h-3 bg-emerald-500 rounded-full absolute top-0 right-0"></span>
              <div className="p-3 bg-indigo-600/30 rounded-2xl border border-indigo-400/30 text-indigo-300">
                <Server className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase tracking-wider rounded-full">
                  • System Active & Connected
                </span>
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                  Node.js v20 • Hostinger Ready
                </span>
              </div>
              <h2 className="text-lg font-black font-poppins text-white pt-1">
                Karental Operations Control & Real-Time Metrics
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsHostingerGuideOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-orange-500/20 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Globe className="w-4 h-4" /> Panduan Deploy Hostinger
            </button>

            <button
              onClick={() => {
                const msg = prompt('Masukkan teks pengumuman/notice admin:', adminNoticeText);
                if (msg !== null) setAdminNoticeText(msg);
              }}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 cursor-pointer"
            >
              <Edit className="w-3.5 h-3.5" /> Edit Notice
            </button>
          </div>
        </div>

        {/* Realtime Tickers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80 text-xs">
          <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-extrabold block">Pending Booking</span>
              <strong className="text-base text-amber-400 font-black">{pendingCount} Pesanan</strong>
            </div>
            <Clock className="w-5 h-5 text-amber-400/80" />
          </div>

          <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-extrabold block">Armada Siap Sewa</span>
              <strong className="text-base text-emerald-400 font-black">{cars.filter(c => c.availableStatus === 'Tersedia').length} Unit</strong>
            </div>
              <CarIcon className="w-5 h-5 text-emerald-400/80" />
          </div>

          <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-extrabold block">Leads WA CS Today</span>
              <strong className="text-base text-indigo-400 font-black">{whatsappLogs.length} Clicks</strong>
            </div>
            <PhoneCall className="w-5 h-5 text-indigo-400/80" />
          </div>

          <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-extrabold block">SEO Page Kota</span>
              <strong className="text-base text-orange-400 font-black">{cities.length} Cabang</strong>
            </div>
            <MapPin className="w-5 h-5 text-orange-400/80" />
          </div>
        </div>

        {adminNoticeText && (
          <div className="bg-orange-500/10 border border-orange-500/30 p-3 rounded-2xl flex items-center justify-between text-xs text-orange-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
              <span><strong>Notice Admin:</strong> {adminNoticeText}</span>
            </div>
            <button onClick={() => setAdminNoticeText('')} className="p-1 hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl shadow-xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[var(--theme-color)] flex items-center justify-center font-bold text-white shadow-lg shadow-orange-500/30">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black font-poppins">Admin Dashboard Karental CMS</h1>
            <p className="text-xs text-slate-400">Pengelolaan Database Mobil, Booking, Kota, WhatsApp Analytics</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsHostingerGuideOpen(true)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all"
          >
            <Globe className="w-4 h-4 text-orange-400" /> Hostinger Deploy
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>

          <button
            onClick={adminLogout}
            className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      {/* Main Admin Grid: Left Sidebar Menu + Right Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 shadow-xl space-y-6 lg:sticky lg:top-24">
            {menuGroups.map((group, idx) => (
              <div key={idx} className="space-y-2">
                <span className="px-3 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 block">
                  {group.groupTitle}
                </span>

                <div className="space-y-1">
                  {group.items.map(item => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id as any)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                          isActive
                            ? 'bg-[var(--theme-color)] text-white shadow-lg shadow-orange-500/25 scale-[1.02]'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <item.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                          <span className="truncate">{item.label}</span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {item.badge && (
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                              isActive ? 'bg-white text-[var(--theme-color)]' : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                          {item.count !== undefined && !item.badge && (
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                            }`}>
                              {item.count}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Main Content Panel */}
        <div className="lg:col-span-3 space-y-6">


      {/* TAB 1: OVERVIEW STATS & CHARTS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Total Pendapatan Valid</span>
              <div className="text-2xl font-black text-[var(--theme-color)] font-poppins">
                Rp {totalRevenue.toLocaleString('id-ID')}
              </div>
              <span className="text-[11px] text-emerald-500 font-semibold">+18.5% dari bulan lalu</span>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Total Unit Mobil</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-poppins">
                {cars.length} Unit
              </div>
              <span className="text-[11px] text-slate-500">
                {cars.filter(c => c.availableStatus === 'Tersedia').length} Unit Siap Sewa
              </span>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Booking Pending</span>
              <div className="text-2xl font-black text-amber-500 font-poppins">
                {bookings.filter(b => b.status === 'Pending').length} Pesanan
              </div>
              <span className="text-[11px] text-amber-600 font-semibold">Membutuhkan Konfirmasi</span>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Konversi WA Click</span>
              <div className="text-2xl font-black text-emerald-500 font-poppins">
                {whatsappLogs.length} Klik
              </div>
              <span className="text-[11px] text-slate-500">Pelanggan Menghubungi CS</span>
            </div>
          </div>

          {/* Recharts Graphics Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Monthly Trend Area Chart */}
            <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-base font-poppins">
                Tren Pendapatan Bulanan (IDR)
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartMonthlyData}>
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke="var(--theme-color)" fill="var(--theme-color)" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* City Revenue Bar Chart */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-base font-poppins">
                Kontribusi Kota
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueByCity}>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                    <YAxis stroke="#94a3b8" fontSize={10} />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* TAB 2: KELOLA MOBIL (CRUD) */}
      {activeTab === 'cars' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-white">Daftar Armada Mobil</h3>
            <button
              onClick={() => {
                setEditingCar(null);
                setIsCarModalOpen(true);
              }}
              className="bg-[var(--theme-color)] hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20"
            >
              <Plus className="w-4 h-4" /> Tambah Mobil Baru
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase">
                  <tr>
                    <th className="p-4">Mobil</th>
                    <th className="p-4">Kategori</th>
                    <th className="p-4">Transmisi</th>
                    <th className="p-4">Tarif Harian</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {cars.map(c => (
                    <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-4 flex items-center gap-3">
                        <img src={c.image} alt={c.name} className="w-12 h-10 object-cover rounded-xl" referrerPolicy="no-referrer" />
                        <div>
                          <strong className="text-slate-900 dark:text-white block font-bold text-sm">{c.name}</strong>
                          <span className="text-[10px] text-slate-400">{c.brand} • {c.capacity} Seat</span>
                        </div>
                      </td>
                      <td className="p-4 font-semibold">{c.category}</td>
                      <td className="p-4">{c.transmission}</td>
                      <td className="p-4 font-bold text-[var(--theme-color)]">Rp {c.pricePerDay.toLocaleString('id-ID')}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          c.availableStatus === 'Tersedia' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {c.availableStatus}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingCar(c);
                            setCarForm({
                              name: c.name,
                              brand: c.brand,
                              category: c.category,
                              transmission: c.transmission,
                              capacity: c.capacity,
                              fuel: c.fuel,
                              pricePerDay: c.pricePerDay,
                              priceWithDriver: c.priceWithDriver,
                              availableStatus: c.availableStatus,
                              image: c.image,
                              description: c.description,
                              metaTitle: c.metaTitle || '',
                              metaDescription: c.metaDescription || '',
                              engine: c.specs.engine,
                              year: c.specs.year,
                              luggage: c.specs.luggage
                            });
                            setIsCarModalOpen(true);
                          }}
                          className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl hover:text-[var(--theme-color)]"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteCar(c.id)}
                          className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}


      {/* TAB 3: KELOLA BOOKING */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-white">Daftar Transaksi Booking</h3>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase">
                  <tr>
                    <th className="p-4">Kode Booking</th>
                    <th className="p-4">Pemesan</th>
                    <th className="p-4">Mobil & Kota</th>
                    <th className="p-4">Tanggal Rental</th>
                    <th className="p-4">Total Biaya</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Ubah Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {bookings.map(b => (
                    <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-4 font-mono font-bold text-[var(--theme-color)]">{b.bookingCode}</td>
                      <td className="p-4">
                        <strong className="text-slate-900 dark:text-white block">{b.customerName}</strong>
                        <span className="text-[10px] text-slate-400">{b.customerPhone}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold block">{b.carName}</span>
                        <span className="text-[10px] text-orange-500 font-bold">{b.city}</span>
                      </td>
                      <td className="p-4">
                        <span>{b.pickupDate} s/d {b.returnDate}</span>
                        <span className="block text-[10px] text-slate-400">({b.durationDays} Hari)</span>
                      </td>
                      <td className="p-4 font-black text-slate-900 dark:text-white">
                        Rp {b.totalPrice.toLocaleString('id-ID')}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' :
                          b.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <select
                          value={b.status}
                          onChange={e => updateBookingStatus(b.id, e.target.value as any)}
                          className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1.5 text-xs font-semibold"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="On Going">On Going</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}


      {/* TAB 4: WHATSAPP CLICK LOGS & OTHER MODULES */}
      {activeTab === 'whatsapp' && <WhatsappTab />}
      {activeTab === 'drivers' && <DriversTab />}
      {activeTab === 'calendar' && <CalendarTab />}
      {activeTab === 'reports' && <ReportsTab />}

      {activeTab === 'priceList' && <PriceListTab />}
      {activeTab === 'cities' && <CitiesTab />}
      {activeTab === 'settings' && <SettingsTab />}
      {activeTab === 'promos' && <PromosTab />}
      {activeTab === 'blog' && <BlogsTab />}
      {activeTab === 'testimoni' && <TestimoniTab />}
      {activeTab === 'faq' && <FaqTab />}

        </div> {/* End of Right Main Content Panel */}
      </div> {/* End of Main Admin Grid */}



      {/* ADD/EDIT CAR MODAL FORM */}
      {isCarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm font-sans">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white font-poppins">
              {editingCar ? 'Edit Data Mobil' : 'Tambah Mobil Baru'}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-500 mb-1 font-bold">Nama Mobil</label>
                <input
                  type="text"
                  value={carForm.name}
                  onChange={e => setCarForm({ ...carForm, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border p-2.5 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 mb-1 font-bold">Merek</label>
                  <input
                    type="text"
                    value={carForm.brand}
                    onChange={e => setCarForm({ ...carForm, brand: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border p-2.5 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1 font-bold">Kategori</label>
                  <select
                    value={carForm.category}
                    onChange={e => setCarForm({ ...carForm, category: e.target.value as any })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border p-2.5 rounded-xl"
                  >
                    <option value="MPV Luxury">MPV Luxury</option>
                    <option value="SUV Premium">SUV Premium</option>
                    <option value="Executive Sedan">Executive Sedan</option>
                    <option value="Compact City">Compact City</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 mb-1 font-bold">Tarif Lepas Kunci (/hari)</label>
                  <input
                    type="number"
                    value={carForm.pricePerDay}
                    onChange={e => setCarForm({ ...carForm, pricePerDay: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border p-2.5 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1 font-bold">Tarif With Driver (/hari)</label>
                  <input
                    type="number"
                    value={carForm.priceWithDriver}
                    onChange={e => setCarForm({ ...carForm, priceWithDriver: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border p-2.5 rounded-xl"
                  />
                </div>
              </div>

              <ImageUpload label="Foto Mobil" value={carForm.image} onChange={val => setCarForm({...carForm, image: val})} />

              <div>
                <label className="block text-slate-500 mb-1 font-bold">Meta Title (SEO)</label>
                <input type="text" value={carForm.metaTitle} onChange={e => setCarForm({...carForm, metaTitle: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border p-2.5 rounded-xl mb-3" />
              </div>
              <div>
                <label className="block text-slate-500 mb-1 font-bold">Meta Description (SEO)</label>
                <textarea value={carForm.metaDescription} onChange={e => setCarForm({...carForm, metaDescription: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border p-2.5 rounded-xl h-20 mb-3" />
              </div>
              <div>
                <label className="block text-slate-500 mb-1 font-bold">Deskripsi Singkat</label>
                <textarea
                  value={carForm.description}
                  onChange={e => setCarForm({ ...carForm, description: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border p-2.5 rounded-xl h-20"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setIsCarModalOpen(false)}
                className="px-5 py-2.5 rounded-2xl font-bold text-slate-500 hover:text-slate-700 text-xs cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleSaveCarForm}
                className="px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs font-bold shadow-lg shadow-orange-500/30 flex items-center gap-2 cursor-pointer transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Mobil</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hostinger Deploy Guide Modal */}
      <HostingerDeployModal
        isOpen={isHostingerGuideOpen}
        onClose={() => setIsHostingerGuideOpen(false)}
      />

    </div>
  );
};
