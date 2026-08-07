import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Car } from '../types';
import { getCarSlug } from '../utils/slug';
import {
  Search,
  Filter,
  Star,
  CheckCircle2,
  Users,
  Car as CarIcon,
  PhoneCall,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  X
} from 'lucide-react';

export const ArmadaPage: React.FC = () => {
  const {
    cars = [],
    openBookingModal,
    trackWhatsAppClick,
    selectedCarId,
    setSelectedCarId,
    navigateTo,
    cities = []
  } = useApp();

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('Semua');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedTransmission, setSelectedTransmission] = useState('Semua');
  const [selectedCityFilter, setSelectedCityFilter] = useState('Semua');
  const [maxPrice, setMaxPrice] = useState<number>(4000000);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Selected Car Detail Drawer/Modal
  const [detailCar, setDetailCar] = useState<Car | null>(() => {
    if (selectedCarId) return cars.find(c => c.id === selectedCarId) || null;
    return null;
  });

  // Filter Logic
  const filteredCars = cars.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === 'Semua' || c.brand === selectedBrand;
    const matchesCategory = selectedCategory === 'Semua' || c.category === selectedCategory;
    const matchesTransmission = selectedTransmission === 'Semua' || c.transmission === selectedTransmission;
    const matchesCity = selectedCityFilter === 'Semua' || (Array.isArray(c.cityAvailability) && c.cityAvailability.includes(selectedCityFilter));
    const matchesPrice = c.pricePerDay <= maxPrice;

    return matchesSearch && matchesBrand && matchesCategory && matchesTransmission && matchesCity && matchesPrice;
  });

  // Pagination Calc
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage) || 1;
  const paginatedCars = filteredCars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const brandsList = ['Semua', 'Toyota', 'Honda', 'Mitsubishi', 'Hyundai', 'Mercedes-Benz', 'BMW'];
  const categoriesList = ['Semua', 'MPV Luxury', 'SUV Premium', 'Executive Sedan', 'Compact City'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-black uppercase tracking-wider text-[var(--theme-color)]">
          Katalog Mobil Karental
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-poppins">
          Armada Rental Mobil Premium
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Pilihan kendaraan eksklusif terawat dengan kondisi terbaik untuk kenyamanan perjalanan Anda di seluruh kota Indonesia.
        </p>
      </div>

      {/* FILTER & SEARCH PANEL */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
        
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            placeholder="Cari berdasarkan nama mobil atau merek (contoh: Alphard, Zenix, Fortuner)..."
            className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
          />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-xs font-semibold">
          
          {/* Merek */}
          <div>
            <label className="block text-slate-500 mb-1">Merek Mobil</label>
            <select
              value={selectedBrand}
              onChange={e => { setSelectedBrand(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 outline-none font-medium"
            >
              {brandsList.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-slate-500 mb-1">Jenis / Kategori</label>
            <select
              value={selectedCategory}
              onChange={e => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 outline-none font-medium"
            >
              {categoriesList.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Transmisi */}
          <div>
            <label className="block text-slate-500 mb-1">Transmisi</label>
            <select
              value={selectedTransmission}
              onChange={e => { setSelectedTransmission(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 outline-none font-medium"
            >
              <option value="Semua">Semua Transmisi</option>
              <option value="Otomatis">Otomatis</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          {/* Kota Availability */}
          <div>
            <label className="block text-slate-500 mb-1">Kota Rental</label>
            <select
              value={selectedCityFilter}
              onChange={e => { setSelectedCityFilter(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 outline-none font-medium"
            >
              <option value="Semua">Semua Kota</option>
              {cities.map(ct => (
                <option key={ct.slug} value={ct.cityName}>{ct.cityName}</option>
              ))}
            </select>
          </div>

          {/* Harga Slider */}
          <div>
            <div className="flex justify-between text-slate-500 mb-1">
              <span>Maks Harga</span>
              <span className="font-bold text-[var(--theme-color)]">Rp {(maxPrice / 1000).toLocaleString('id-ID')}rb</span>
            </div>
            <input
              type="range"
              min="500000"
              max="4000000"
              step="100000"
              value={maxPrice}
              onChange={e => { setMaxPrice(Number(e.target.value)); setCurrentPage(1); }}
              className="w-full accent-[var(--theme-color)] cursor-pointer"
            />
          </div>

        </div>

      </div>


      {/* FLEET GRID VIEW (Desktop 4 view, Mobile 2 view) */}
      {paginatedCars.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <CarIcon className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-lg text-slate-800 dark:text-white">Tidak Ada Mobil Sesuai Filter</h3>
          <p className="text-xs text-slate-500">Coba atur ulang kriteria pencarian atau batas harga maksimum Anda.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedBrand('Semua');
              setSelectedCategory('Semua');
              setSelectedTransmission('Semua');
              setSelectedCityFilter('Semua');
              setMaxPrice(4000000);
            }}
            className="bg-[var(--theme-color)] text-white px-4 py-2 rounded-xl text-xs font-bold"
          >
            Reset Semua Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {paginatedCars.map((c) => (
            <div
              key={c.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:border-[var(--theme-color)] transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Photo & Badges */}
              <div className="relative h-40 sm:h-48 overflow-hidden bg-slate-100">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
                  {c.category}
                </span>
                <span className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {c.availableStatus}
                </span>
              </div>

              {/* Body Info */}
              <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-semibold">{c.brand}</span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-400" /> {c.rating}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base font-poppins line-clamp-1 group-hover:text-[var(--theme-color)] transition-colors">
                    {c.name}
                  </h3>

                  {/* Specs Matrix */}
                  <div className="mt-2 grid grid-cols-2 gap-1 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl">
                    <span>⚙️ {c.transmission}</span>
                    <span>👥 {c.capacity} Seat</span>
                    <span>⛽ {c.fuel}</span>
                    <span>❄️ Dual AC</span>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Sewa Harian</span>
                    <div className="text-base sm:text-lg font-black text-[var(--theme-color)]">
                      Rp {c.pricePerDay.toLocaleString('id-ID')}{' '}
                      <span className="text-[10px] font-normal text-slate-500">/hari</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => navigateTo(`/sewa-mobil/${getCarSlug(c)}`)}
                      className="w-full text-center py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3 h-3" /> Detail
                    </button>
                    <button
                      onClick={() => trackWhatsAppClick('Armada Grid WhatsApp', c.name)}
                      className="w-full text-center py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1"
                    >
                      <PhoneCall className="w-3 h-3" /> WA
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-6">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-9 rounded-xl font-bold text-xs cursor-pointer ${
                currentPage === i + 1
                  ? 'bg-[var(--theme-color)] text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-40 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}


      {/* CAR DETAIL MODAL */}
      {detailCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
          <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="font-bold text-sm font-poppins text-orange-400">Detail Spesifikasi & Fasilitas</span>
              <button
                onClick={() => setDetailCar(null)}
                className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Photo & Main Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img
                  src={detailCar.image}
                  alt={detailCar.name}
                  className="w-full h-56 object-cover rounded-2xl shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-3">
                  <span className="text-xs font-bold text-orange-500 uppercase">{detailCar.category}</span>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white font-poppins">{detailCar.name}</h2>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{detailCar.description}</p>
                  
                  <div className="p-3 bg-orange-50 dark:bg-orange-950/40 rounded-xl space-y-1">
                    <div className="text-xs text-slate-500">Tarif Sewa Lepas Kunci:</div>
                    <div className="text-xl font-black text-[var(--theme-color)]">Rp {detailCar.pricePerDay.toLocaleString('id-ID')} / hari</div>
                    <div className="text-xs text-slate-500 pt-1">Dengan Driver: <strong className="text-slate-800 dark:text-slate-200">Rp {detailCar.priceWithDriver.toLocaleString('id-ID')} / hari</strong></div>
                  </div>
                </div>
              </div>

              {/* Specs & Features List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2 font-poppins">Spesifikasi Mesin</h4>
                  <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                    <li>• Mesin: {detailCar.specs.engine}</li>
                    <li>• Tahun: {detailCar.specs.year}</li>
                    <li>• Kapasitas Bagasi: {detailCar.specs.luggage}</li>
                    <li>• Transmisi: {detailCar.transmission}</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2 font-poppins">Fitur & Fasilitas Kabin</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {detailCar.features.map((ft, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        ✓ {ft}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            <div className="p-4 bg-slate-100 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setDetailCar(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  const carToBook = detailCar;
                  setDetailCar(null);
                  openBookingModal(carToBook);
                }}
                className="bg-[var(--theme-color)] hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-orange-500/20"
              >
                Booking Mobil Ini
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
