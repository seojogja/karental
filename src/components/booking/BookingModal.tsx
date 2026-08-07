import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Car } from '../../types';
import {
  X,
  Calendar,
  CheckCircle2,
  Car as CarIcon,
  User,
  Phone,
  Mail,
  MapPin,
  Tag,
  ShieldCheck,
  Upload,
  CreditCard,
  Send,
  AlertCircle
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    closeBookingModal,
    selectedCarForBooking,
    cars,
    cities,
    addBooking,
    trackWhatsAppClick
  } = useApp();

  // Selected car state
  const [car, setCar] = useState<Car | null>(selectedCarForBooking || cars[0] || null);

  useEffect(() => {
    if (selectedCarForBooking) {
      setCar(selectedCarForBooking);
    } else if (cars.length > 0 && !car) {
      setCar(cars[0]);
    }
  }, [selectedCarForBooking, cars]);

  // Form Inputs
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [city, setCity] = useState('Jakarta');
  const [pickupDate, setPickupDate] = useState('2026-08-10');
  const [returnDate, setReturnDate] = useState('2026-08-12');
  const [withDriver, setWithDriver] = useState(true);
  const [outOfTown, setOutOfTown] = useState(false);
  const [voucherInput, setVoucherInput] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; discount: number } | null>(null);

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentProofName, setPaymentProofName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedBookingCode, setCompletedBookingCode] = useState<string | null>(null);

  if (!isBookingModalOpen) return null;

  // Calculate Days & Total Cost
  const date1 = new Date(pickupDate);
  const date2 = new Date(returnDate);
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const durationDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const baseRate = car ? (withDriver ? car.priceWithDriver : car.pricePerDay) : 0;
  const subtotal = baseRate * durationDays;
  const driverFeeAmount = withDriver ? 150000 * durationDays : 0;
  const outOfTownFee = outOfTown ? 100000 * durationDays : 0;
  const discountAmount = appliedVoucher ? appliedVoucher.discount : 0;
  const totalPrice = Math.max(0, subtotal + outOfTownFee - discountAmount);

  const handleApplyVoucher = () => {
    if (voucherInput.toUpperCase() === 'KARENTALSUPER' || voucherInput.toUpperCase() === 'VASTROSUPER') {
      const disc = Math.round(subtotal * 0.2); // 20%
      setAppliedVoucher({ code: 'KARENTALSUPER', discount: disc });
    } else if (voucherInput.toUpperCase() === 'KARENTALCORP' || voucherInput.toUpperCase() === 'VASTROCORP') {
      const disc = Math.round(subtotal * 0.3); // 30%
      setAppliedVoucher({ code: 'KARENTALCORP', discount: disc });
    } else {
      alert('Kode voucher tidak valid atau sudah kadaluarsa.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProofName(e.target.files[0].name);
    }
  };

  const handleSubmitBooking = async () => {
    if (!customerName || !customerPhone) {
      alert('Mohon isi nama dan nomor WhatsApp Anda.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await addBooking({
        carId: car?.id || 'car-1',
        carName: car?.name || 'Mobil Rental',
        customerName,
        customerPhone,
        customerEmail,
        city,
        pickupDate,
        returnDate,
        durationDays,
        withDriver,
        outOfTown,
        voucherCode: appliedVoucher?.code,
        discountAmount,
        driverFee: driverFeeAmount,
        subtotalPrice: subtotal,
        totalPrice,
        paymentMethod: 'Transfer Bank BCA',
        paymentProofUrl: paymentProofName ? `https://storage.karental.co.id/proofs/${paymentProofName}` : undefined,
        notes
      });

      setCompletedBookingCode(result.bookingCode);
      setStep(3);
    } catch (e) {
      console.error(e);
      alert('Gagal mengirim pesanan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[var(--theme-color)] flex items-center justify-center text-white font-bold">
              <CarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg font-poppins">Formulir Booking Online Karental</h3>
              <p className="text-xs text-slate-400">Pesan Mobil Impian Anda Cepat & Transparan</p>
            </div>
          </div>
          <button
            onClick={closeBookingModal}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress */}
        <div className="bg-slate-100 dark:bg-slate-800/60 px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex justify-around text-xs font-bold text-slate-500">
          <span className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[var(--theme-color)]' : ''}`}>
            <span className="w-5 h-5 rounded-full bg-current text-white flex items-center justify-center text-[10px]">1</span>
            Pilih Mobil & Tanggal
          </span>
          <span className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[var(--theme-color)]' : ''}`}>
            <span className="w-5 h-5 rounded-full bg-current text-white flex items-center justify-center text-[10px]">2</span>
            Data Diri & Pembayaran
          </span>
          <span className={`flex items-center gap-1.5 ${step === 3 ? 'text-emerald-500' : ''}`}>
            <span className="w-5 h-5 rounded-full bg-current text-white flex items-center justify-center text-[10px]">3</span>
            Konfirmasi
          </span>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              {/* Car Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Pilih Mobil
                </label>
                <select
                  value={car?.id}
                  onChange={e => {
                    const found = cars.find(c => c.id === e.target.value);
                    if (found) setCar(found);
                  }}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
                >
                  {cars.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} - Rp {c.pricePerDay.toLocaleString('id-ID')}/hari (Lepas Kunci)
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Car Card Preview */}
              {car && (
                <div className="p-4 bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-900/40 rounded-2xl flex gap-4 items-center">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-28 h-20 object-cover rounded-xl shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">{car.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {car.transmission} • {car.capacity} Seats • {car.fuel}
                    </p>
                    <div className="mt-1 text-sm font-extrabold text-[var(--theme-color)]">
                      Rp {baseRate.toLocaleString('id-ID')}{' '}
                      <span className="text-xs font-normal text-slate-500">/ hari ({withDriver ? 'Dengan Sopir' : 'Lepas Kunci'})</span>
                    </div>
                  </div>
                </div>
              )}

              {/* City & Dates Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[var(--theme-color)]" /> Lokasi Rental
                  </label>
                  <select
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-sm font-medium"
                  >
                    {cities.map(ct => (
                      <option key={ct.slug} value={ct.cityName}>
                        {ct.cityName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[var(--theme-color)]" /> Tanggal Ambil
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={e => setPickupDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[var(--theme-color)]" /> Tanggal Kembali
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={e => setReturnDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-sm font-medium"
                  />
                </div>
              </div>

              {/* Driver Options Toggle */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Layanan & Opsi Tambahan</span>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100 block">Sewa Dengan Sopir Profesional</span>
                    <span className="text-xs text-slate-500">Driver berpengalaman, ramah, dan hapal rute jalan</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={withDriver}
                    onChange={e => setWithDriver(e.target.checked)}
                    className="w-5 h-5 accent-[var(--theme-color)] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100 block">Penggunaan Luar Kota</span>
                    <span className="text-xs text-slate-500">Perjalanan antar provinsi / luar wilayah operasional kota</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={outOfTown}
                    onChange={e => setOutOfTown(e.target.checked)}
                    className="w-5 h-5 accent-[var(--theme-color)] cursor-pointer"
                  />
                </div>
              </div>

              {/* Live Cost Calculation Summary */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Durasi Penyewaan:</span>
                  <span className="font-bold text-white">{durationDays} Hari</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tarif Harian:</span>
                  <span>Rp {baseRate.toLocaleString('id-ID')} x {durationDays} hari</span>
                </div>
                {outOfTownFee > 0 && (
                  <div className="flex justify-between text-slate-400">
                    <span>Surcharge Luar Kota:</span>
                    <span>Rp {outOfTownFee.toLocaleString('id-ID')}</span>
                  </div>
                )}
                {appliedVoucher && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Diskon Voucher ({appliedVoucher.code}):</span>
                    <span>- Rp {appliedVoucher.discount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm">
                  <span className="font-bold">Estimasi Total Biaya:</span>
                  <span className="text-xl font-black text-[var(--theme-color)]">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Voucher Code Box */}
              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl">
                <label className="block text-xs font-bold text-amber-800 dark:text-amber-300 mb-1 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" /> Punya Kode Voucher Promo?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={voucherInput}
                    onChange={e => setVoucherInput(e.target.value)}
                    placeholder="Contoh: KARENTALSUPER"
                    className="bg-white dark:bg-slate-800 px-3 py-2 rounded-xl border border-amber-300 text-sm font-semibold uppercase flex-1 outline-none"
                  />
                  <button
                    onClick={handleApplyVoucher}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Gunakan
                  </button>
                </div>
                {appliedVoucher && (
                  <p className="text-xs text-emerald-600 font-bold mt-2">
                    ✓ Voucher {appliedVoucher.code} berhasil dipasang! Hemat Rp {appliedVoucher.discount.toLocaleString('id-ID')}
                  </p>
                )}
              </div>

              {/* Customer Info Form */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Data Pemesan (Penyewa)</h4>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Nama Lengkap (Sesuai KTP)</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="Contoh: Bapak Hendra Wijaya"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm font-medium outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Nomor WhatsApp Aktif</label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      placeholder="081234567890"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm font-medium outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Alamat Email</label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={e => setCustomerEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm font-medium outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Catatan Tambahan / Lokasi Spesifik Penjemputan</label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Contoh: Penjemputan Terminal 3 Soekarno Hatta Jam 10.00 WIB, mohon persiapkan child seat..."
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm font-medium h-20 outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
                  />
                </div>
              </div>

              {/* Bank Transfer Information */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-[var(--theme-color)]" /> Rekening Pembayaran Resmi PT Karental
                  </h4>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">Terverifikasi</span>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Bank BCA (PT KARENTAL INDONESIA)</span>
                    <span className="font-mono text-orange-600 dark:text-orange-400 font-bold text-sm">8830-9920-11</span>
                  </div>
                  <span className="text-slate-400">Cabang SCBD Jakarta</span>
                </div>

                {/* Upload Proof */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Upload Bukti Transfer DP / Pelunasan (Opsional)</label>
                  <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer hover:border-[var(--theme-color)] transition-colors">
                    <Upload className="w-4 h-4 text-[var(--theme-color)]" />
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      {paymentProofName ? `Bukti terunggah: ${paymentProofName}` : 'Klik untuk pilih file foto struk/transfer'}
                    </span>
                    <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white font-poppins">
                Pesanan Berhasil Dibuat!
              </h3>

              <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-2xl max-w-md mx-auto border border-orange-200 dark:border-orange-900/50">
                <span className="text-xs font-bold text-slate-500 block uppercase">Kode Booking Anda:</span>
                <span className="text-2xl font-mono font-extrabold text-[var(--theme-color)]">
                  {completedBookingCode}
                </span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                Terima kasih, <strong>{customerName}</strong>. Tim Customer Service Karental akan segera memverifikasi pesanan Anda dan mengirimkan invoice konfirmasi via WhatsApp.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    closeBookingModal();
                    trackWhatsAppClick('Booking Success Confirmation', car?.name, city);
                  }}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Konfirmasi via WhatsApp CS
                </button>
                <button
                  onClick={closeBookingModal}
                  className="border border-slate-300 dark:border-slate-700 px-6 py-3 rounded-2xl font-bold text-sm cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step !== 3 && (
          <div className="p-4 bg-slate-100 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
            {step === 2 ? (
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs"
              >
                Kembali
              </button>
            ) : (
              <div></div>
            )}

            {step === 1 ? (
              <button
                onClick={() => setStep(2)}
                className="bg-[var(--theme-color)] hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-2xl text-sm transition-all cursor-pointer shadow-lg shadow-orange-500/20"
              >
                Lanjut ke Data Diri
              </button>
            ) : (
              <button
                onClick={handleSubmitBooking}
                disabled={isSubmitting}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-2xl text-sm transition-all cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center gap-2"
              >
                {isSubmitting ? 'Memproses...' : 'Selesaikan Booking'}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
