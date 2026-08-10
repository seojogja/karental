import React from 'react';
import { useApp } from '../context/AppContext';
import { BlogArticle } from '../types';
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  Share2,
  Tag,
  ChevronRight,
  BookOpen,
  MessageSquare
} from 'lucide-react';

interface BlogDetailPageProps {
  blogSlug: string;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ blogSlug }) => {
  const { blogs = [], navigateTo, showToast, trackWhatsAppClick } = useApp() as any;

  // Find blog by slug or ID
  const article: BlogArticle | undefined = blogs.find((b: BlogArticle) => {
    return b.slug === blogSlug || b.id === blogSlug || b.slug?.toLowerCase() === blogSlug?.toLowerCase();
  });

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6 font-sans">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <BookOpen className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white font-poppins">
          Artikel Tidak Ditemukan
        </h1>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          Maaf, artikel atau panduan yang Anda cari tidak dapat ditemukan atau telah dipindahkan.
        </p>
        <button
          onClick={() => navigateTo('/blog')}
          className="bg-[var(--theme-color)] text-white font-bold px-6 py-3 rounded-2xl text-xs hover:opacity-90 cursor-pointer inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog Artikel
        </button>
      </div>
    );
  }

  const relatedArticles = blogs.filter((b: BlogArticle) => b.id !== article.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.metaTitle || article.title,
        text: article.excerpt,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link artikel berhasil disalin ke clipboard!');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 font-sans">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-semibold overflow-x-auto pb-1">
        <button onClick={() => navigateTo('/')} className="hover:text-slate-900 dark:hover:text-white cursor-pointer">
          Beranda
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <button onClick={() => navigateTo('/blog')} className="hover:text-slate-900 dark:hover:text-white cursor-pointer">
          Artikel & Tips
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="text-[var(--theme-color)] font-bold truncate max-w-xs">{article.title}</span>
      </nav>

      {/* Main Article Container */}
      <article className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 shadow-xl space-y-8">
        
        {/* Article Meta Header */}
        <div className="space-y-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-3.5 py-1 bg-orange-500/10 text-[var(--theme-color)] font-extrabold text-xs rounded-full uppercase tracking-wider border border-orange-500/20">
              {article.category || 'Edukasi Otomotif'}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 text-xs font-bold"
                title="Bagikan Artikel"
              >
                <Share2 className="w-4 h-4" />
                <span>Bagikan</span>
              </button>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white font-poppins leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-semibold pt-1">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[var(--theme-color)]" /> {article.author || 'Tim Karental Indonesia'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-500" /> {article.publishedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-500" /> {article.readTime || '5 min'} baca
            </span>
          </div>
        </div>

        {/* Cover Image */}
        {article.coverImage && (
          <div className="rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-video shadow-md">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Excerpt Box */}
        {article.excerpt && (
          <div className="p-5 bg-orange-500/5 dark:bg-orange-500/10 border-l-4 border-[var(--theme-color)] rounded-r-2xl italic text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
            "{article.excerpt}"
          </div>
        )}

        {/* Main Body Content */}
        <div
          className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Article Footer & Author Info */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-500/10 text-[var(--theme-color)] rounded-2xl flex items-center justify-center font-black text-lg">
              K
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">PT Karental Indonesia</h4>
              <p className="text-xs text-slate-500">Penyedia Layanan Rental Mobil Terpercaya & Resmi Indonesia</p>
            </div>
          </div>

          <button
            onClick={() => trackWhatsAppClick('Artikel Detail WA', article.title)}
            className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Konsultasi Rental via WA</span>
          </button>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="space-y-6 pt-4">
          <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[var(--theme-color)]" />
            Artikel Rekomendasi Lainnya
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel: BlogArticle) => (
              <div
                key={rel.id}
                onClick={() => navigateTo(`/blog/${rel.slug || rel.id}`)}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl transition-all cursor-pointer space-y-3 group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 relative">
                    <img src={rel.coverImage} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" referrerPolicy="no-referrer" />
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 bg-slate-900/80 text-white font-bold text-[9px] rounded-full backdrop-blur-md">
                      {rel.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white font-poppins line-clamp-2 group-hover:text-[var(--theme-color)] transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </div>

                <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span>{rel.publishedDate}</span>
                  <span className="font-bold text-[var(--theme-color)] group-hover:underline">Baca &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
