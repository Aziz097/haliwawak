'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Search, ImageOff } from 'lucide-react';

export default function EdukasiClient({ articles }: { articles: any[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');

  const categories = ['Semua', ...new Set(articles.map((a: any) => a.category).filter(Boolean))];

  const filtered = articles.filter((a: any) => {
    const matchSearch = !search ||
      a.title?.toLowerCase().includes(search.toLowerCase()) ||
      a.summary?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'Semua' || a.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-muted" />
          <input
            type="text"
            placeholder="Cari artikel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-card-border bg-card-bg text-fg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              category === c
                ? 'bg-primary text-white'
                : 'bg-card-bg border border-card-border text-fg-muted hover:border-primary/30'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen className="w-12 h-12 text-fg-muted mx-auto mb-4" />
          <p className="text-fg-muted text-lg">Tidak ada artikel ditemukan</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {filtered.map((a: any) => (
            <Link
              key={a.id}
              href={`/edukasi/${a.slug}`}
              className="group flex flex-col md:flex-row gap-6 bg-card-bg border border-card-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="w-full md:w-48 h-40 md:h-32 bg-primary-light rounded-xl overflow-hidden shrink-0">
                {a.thumbnailUrl ? (
                  <img src={a.thumbnailUrl} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"><ImageOff className="w-8 h-8 text-primary/30" /></div>
                )}
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <span className="text-xs font-semibold text-accent-warm bg-accent-warm/10 px-2.5 py-1 rounded-md w-fit mb-3">{a.category}</span>
                <h3 className="font-heading font-bold text-xl text-fg leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-2">{a.title}</h3>
                {a.summary && <p className="text-sm text-fg-muted line-clamp-2 mb-3">{a.summary}</p>}
                {a.publishedAt && (
                  <p className="text-xs text-fg-muted/50 font-medium">
                    {new Date(a.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
