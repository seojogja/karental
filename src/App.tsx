import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppFloating } from './components/common/WhatsAppFloating';
import { AIAssistantModal } from './components/common/AIAssistantModal';
import { BookingModal } from './components/booking/BookingModal';

import { HomePage } from './pages/HomePage';
import { ArmadaPage } from './pages/ArmadaPage';
import { CityPage } from './pages/CityPage';
import { LayananPage } from './pages/LayananPage';
import { PromoPage } from './pages/PromoPage';
import { TestimoniPage } from './pages/TestimoniPage';
import { FAQPage } from './pages/FAQPage';
import { BlogPage } from './pages/BlogPage';
import { TentangKamiPage } from './pages/TentangKamiPage';
import { KontakPage } from './pages/KontakPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { CarDetailPage } from './pages/CarDetailPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { CheckCircle2 } from 'lucide-react';

const MainRouter: React.FC = () => {
  const { currentRoute, toastMessage } = useApp();

  const renderContent = () => {
    if (currentRoute === '/' || currentRoute === '') return <HomePage />;
    if (currentRoute === '/armada') return <ArmadaPage />;
    if (currentRoute === '/layanan') return <LayananPage />;
    if (currentRoute === '/promo') return <PromoPage />;
    if (currentRoute === '/testimoni') return <TestimoniPage />;
    if (currentRoute === '/faq') return <FAQPage />;
    if (currentRoute === '/blog' || currentRoute === '/blog/') return <BlogPage />;
    if (currentRoute.startsWith('/blog/')) {
      const slug = currentRoute.replace('/blog/', '');
      return <BlogDetailPage blogSlug={slug} />;
    }
    if (currentRoute === '/tentang-kami') return <TentangKamiPage />;
    if (currentRoute === '/kontak') return <KontakPage />;
    if (currentRoute === '/admin') return <AdminDashboardPage />;

    if (currentRoute.startsWith('/sewa-mobil/')) {
      const slug = currentRoute.replace('/sewa-mobil/', '');
      return <CarDetailPage carSlug={slug} />;
    }
    if (currentRoute.startsWith('/mobil/')) {
      const slug = currentRoute.replace('/mobil/', '');
      return <CarDetailPage carSlug={slug} />;
    }
    if (currentRoute.startsWith('/armada/')) {
      const slug = currentRoute.replace('/armada/', '');
      return <CarDetailPage carSlug={slug} />;
    }

    if (currentRoute.startsWith('/rental-mobil-')) {
      const slug = currentRoute.replace('/', '');
      return <CityPage slug={slug} />;
    }

    return <HomePage />;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{renderContent()}</main>
      <Footer />
      <WhatsAppFloating />
      <AIAssistantModal />
      <BookingModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-top-5 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold font-sans">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
