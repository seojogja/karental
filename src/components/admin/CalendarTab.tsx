import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar as CalendarIcon, Clock, MapPin, User, Car as CarIcon, CheckCircle2, AlertCircle, Check, X } from 'lucide-react';

export const CalendarTab: React.FC = () => {
  const { bookings, updateBookingStatus, cars } = useApp();
  const [filterCity, setFilterCity] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredBookings = bookings.filter(b => {
    if (filterCity !== 'All' && b.city !== filterCity) return false;
    if (filterStatus !== 'All' && b.status !== filterStatus) return false;
    return true;
  });

  const uniqueCities = Array.from(new Set(bookings.map(b => b.city)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="space-y-1">
          <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-[var(--theme-color)]" /> Kalender & Jadwal Sewa Armada
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Monitor ketersediaan unit, jadwal penyerahan mobil, dan durasi rental secara real-time.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Filter Kota</label>
            <select
              value={filterCity}
              onChange={e => setFilterCity(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-semibold outline-none"
            >
              <option value="All">Semua Kota ({bookings.length})</option>
              {uniqueCities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Filter Status</label>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-semibold outline-none"
            >
              <option value="All">Semua Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="On Going">On Going</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Schedule Timeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Booking Cards Feed */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white font-poppins flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-500" /> Jadwal Reservasi Aktif ({filteredBookings.length})
          </h4>

          {filteredBookings.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
              Tidak ada jadwal booking yang cocok dengan filter yang dipilih.
            </div>
          ) : (
            filteredBookings.map(b => (
              <div
                key={b.id}
                className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md space-y-3 relative group"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[var(--theme-color)] bg-orange-500/10 px-3 py-1 rounded-full">
                      {b.bookingCode}
                    </span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-500" /> {b.city}
                    </span>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                      b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' :
                      b.status === 'On Going' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300' :
                      b.status === 'Pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300' :
                      b.status === 'Completed' ? 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300' :
                      'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Armada Sewa</span>
                    <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
                      <CarIcon className="w-4 h-4 text-orange-500" /> {b.carName}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Pemesan / Pelanggan</span>
                    <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" /> {b.customerName} ({b.customerPhone})
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl flex flex-wrap items-center justify-between text-xs gap-2">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-indigo-500" />
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{b.pickupDate}</span>
                      <span className="text-slate-400 mx-1">s/d</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{b.returnDate}</span>
                      <span className="text-orange-500 font-bold ml-2">({b.durationDays} Hari)</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Total Transaksi</span>
                    <strong className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                      Rp {b.totalPrice?.toLocaleString('id-ID')}
                    </strong>
                  </div>
                </div>

                {/* Quick Status Setter */}
                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className="text-[11px] text-slate-400">Ubah Status Cepat:</span>
                  <div className="flex items-center gap-1.5">
                    {['Pending', 'Confirmed', 'On Going', 'Completed'].map(s => (
                      <button
                        key={s}
                        onClick={() => updateBookingStatus(b.id, s as any)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                          b.status === s
                            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column: Mini Status Overview & Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white font-poppins">
              Status Operasional Hari Ini
            </h4>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex justify-between items-center">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">Total Unit Ready</span>
                <span className="font-black text-emerald-700 text-sm">
                  {cars.filter(c => c.availableStatus === 'Tersedia').length} Unit
                </span>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 flex justify-between items-center">
                <span className="font-bold text-amber-800 dark:text-amber-300">Pending Konfirmasi</span>
                <span className="font-black text-amber-700 text-sm">
                  {bookings.filter(b => b.status === 'Pending').length} Order
                </span>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800 flex justify-between items-center">
                <span className="font-bold text-blue-800 dark:text-blue-300">Sedang Digunakan (On Going)</span>
                <span className="font-black text-blue-700 text-sm">
                  {bookings.filter(b => b.status === 'On Going').length} Unit
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
