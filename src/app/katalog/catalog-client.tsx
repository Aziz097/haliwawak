'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bug, Search, ImageOff } from 'lucide-react';

const FAMILIES = ['Semua', 'Nymphalidae', 'Papilionidae', 'Pieridae', 'Hesperidae'];

const IUCN_BADGE: Record<string, { color: string; bg: string }> = {
  'Least Concern': { color: '#065F46', bg: '#D1FAE5' },
  'Near Threatened': { color: '#92400E', bg: '#FEF3C7' },
  Vulnerable: { color: '#C2410C', bg: '#FFEDD5' },
  Endangered: { color: '#991B1B', bg: '#FEE2E2' },
  'Critically Endangered': { color: '#7C2D12', bg: '#FEF2F2' },
};

const IUCN_ABBR: Record<string, string> = {
  'Least Concern': 'LC', 'Near Threatened': 'NT', Vulnerable: 'VU',
  Endangered: 'EN', 'Critically Endangered': 'CR',
};

function slugify(s: string, id: number) {
  return s?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-') || String(id);
}

export default function CatalogClient({ species }: { species: any[] }) {
  const [search, setSearch] = useState('');
  const [family, setFamily] = useState('Semua');

  const filtered = species.filter((s: any) => {
    const matchSearch = !search ||
      s.commonName?.toLowerCase().includes(search.toLowerCase()) ||
      s.scientificName?.toLowerCase().includes(search.toLowerCase());
    const matchFamily = family === 'Semua' || s.family === family;
    return matchSearch && matchFamily;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-muted" />
          <input
            type="text"
            placeholder="Cari spesies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-card-border bg-card-bg text-fg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {FAMILIES.map((f) => (
          <button
            key={f}
            onClick={() => setFamily(f)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              family === f
                ? 'bg-primary text-white'
                : 'bg-card-bg border border-card-border text-fg-muted hover:border-primary/30'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Bug className="w-12 h-12 text-fg-muted mx-auto mb-4" />
          <p className="text-fg-muted text-lg">Tidak ada spesies ditemukan</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s: any) => {
            const href = `/katalog/${s.slug || slugify(s.commonName, s.id)}`;
            const badge = s.iucnStatus ? IUCN_BADGE[s.iucnStatus] : null;
            return (
              <Link
                key={s.id}
                href={href}
                className="group bg-card-bg border border-card-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="aspect-[4/3] bg-primary-light relative">
                  {s.primaryPhotoUrl ? (
                    <img src={s.primaryPhotoUrl} alt={s.commonName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><ImageOff className="w-10 h-10 text-primary/30" /></div>
                  )}
                  {badge && (
                    <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-md" style={{ color: badge.color, background: badge.bg }}>
                      {IUCN_ABBR[s.iucnStatus] || s.iucnStatus}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-fg text-xl mb-1 group-hover:text-primary transition-colors">{s.commonName}</h3>
                  <p className="text-fg-muted italic text-sm mb-3">{s.scientificName}</p>
                  {s.family && (
                    <span className="inline-block text-xs font-medium text-accent-warm bg-accent-warm/10 px-2 py-1 rounded">{s.family}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
