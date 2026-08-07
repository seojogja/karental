import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Download, TrendingUp, DollarSign, MapPin, Car as CarIcon, CheckCircle, PieChart, Calendar } from 'lucide-react';

export const ReportsTab: React.FC = () => {
  const { bookings, cars, showToast } = useApp();
  const [selectedRange, setSelectedRange] = useState<string>('30days');

  // Revenue math
  const confirmedBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'On Going' || b.status === 'Completed');
  const totalValidRevenue = confirmedBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const totalPendingRevenue = bookings.filter(b => b.status === 'Pending').reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  // Group by City
  const revenueByCityMap: Record<string, number> = {};
  bookings.forEach(b => {
    revenueByCityMap[b.city] = (revenueByCityMap[b.city] || 0) + (b.totalPrice || 0);
  });

  const handleExportCSV = () => {
    const csvRows = [
      ['Kode Booking', 'Mobil', 'Pelanggan', 'No HP', 'Kota', 'Total Biaya', 'Status', 'Tanggal'].join(','),
      ...bookings.map(b => [
        b.bookingCode,
        `"${b.carName}"`,
        `"${b.customerName}"`,
        `"${b.customerPhone}"`,
        b.city,
        b.totalPrice,
        b.status,
        b.pickupDate
      ].join(','))
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Laporan_Transaksi_Karental_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast('Laporan Excel / CSV berhasil diproses dan didownload!');
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 rounded-3xl shadow-xl border border-slate-800">
        <div className="space-y-1">
          <h3 className="text-xl font-bold font-poppins flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-400" /> Laporan Eksekutif & Analytics Transaksi
          </h3>
          <p className="text-xs text-slate-400">
            Rekap omset pendapatan, perfoma per kota cabang, dan statistik reservasi kendaraan.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer active:scale-95 transition-all"
        >
          <Download className="w-4 h-4" /> Download Laporan Excel/CSV
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Omset Realisasi</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-poppins">
            Rp {totalValidRevenue.toLocaleString('id-ID')}
          </div>
          <p className="text-[11px] text-slate-500">Dari {confirmedBookings.length} pesanan yang dikonfirmasi</p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Potensi Pipeline (Pending)</span>
          <div className="text-2xl font-black text-amber-500 font-poppins">
            Rp {totalPendingRevenue.toLocaleString('id-ID')}
          </div>
          <p className="text-[11px] text-amber-600 font-semibold">{bookings.filter(b => b.status === 'Pending').length} pesanan menanti konfirmasi</p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rata-Rata Nilai Booking</span>
          <div className="text-2xl font-black text-[var(--theme-color)] font-poppins">
            Rp {bookings.length > 0 ? Math.round((totalValidRevenue + totalPendingRevenue) / bookings.length).toLocaleString('id-ID') : 0}
          </div>
          <p className="text-[11px] text-slate-500">Nilai rata-rata sewa per transaksi</p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tingkat Okupansi Armada</span>
          <div className="text-2xl font-black text-indigo-500 font-poppins">
            78.4%
          </div>
          <p className="text-[11px] text-emerald-500 font-semibold">Tinggi di Jakarta, Bali & Surabaya</p>
        </div>
      </div>

      {/* Revenue Breakdown per City */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <h4 className="font-bold text-base text-slate-900 dark:text-white font-poppins flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[var(--theme-color)]" /> Kontribusi Pendapatan Berdasarkan Kota
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {Object.entries(revenueByCityMap).map(([cityName, rev]) => (
            <div key={cityName} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-1">
              <span className="font-bold text-xs text-slate-900 dark:text-white block">{cityName}</span>
              <p className="text-lg font-black text-[var(--theme-color)] font-poppins">
                Rp {rev.toLocaleString('id-ID')}
              </p>
              <span className="text-[10px] text-slate-400">
                {bookings.filter(b => b.city === cityName).length} transaksi sewa
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
