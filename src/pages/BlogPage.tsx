import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { blogs = [], navigateTo } = useApp() as any;
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
        {blogs.map((post: any) => {
          const blogUrl = `/blog/${post.slug || post.id}`;
          return (
            <article
              key={post.id}
              onClick={() => navigateTo(blogUrl)}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="overflow-hidden h-56 bg-slate-100 dark:bg-slate-800">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 font-bold px-2.5 py-0.5 rounded-full">
                      {post.category || 'Berita'}
                    </span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.publishedDate}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime || '5 min'}</span>
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white font-poppins group-hover:text-[var(--theme-color)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateTo(blogUrl);
                  }}
                  className="text-xs font-bold text-[var(--theme-color)] group-hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Baca Selengkapnya</span> <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
