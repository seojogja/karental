import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { blogs = [] } = useApp() as any;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-sans">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-black uppercase tracking-wider text-[var(--theme-color)]">Edukasi & Panduan</span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-poppins">
          Artikel & Tips Otomotif SEO
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Informasi seputar tips memilih mobil rental, destinasi wisata Indonesia, dan berita dunia transportasi eksekutif.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map((post: any) => (
          <article key={post.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xl flex flex-col justify-between">
            <div>
              <img src={post.coverImage} alt={post.title} className="w-full h-56 object-cover" referrerPolicy="no-referrer" />
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 font-bold px-2.5 py-0.5 rounded-full">{post.category}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.publishedDate}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-white font-poppins hover:text-[var(--theme-color)] transition-colors cursor-pointer">{post.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{post.excerpt}</p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button className="text-xs font-bold text-[var(--theme-color)] hover:underline flex items-center gap-1">
                <span>Baca Selengkapnya</span> <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
