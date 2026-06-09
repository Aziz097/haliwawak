'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bug, ChevronLeft } from 'lucide-react';

const IUCN: Record<string, { bg: string }> = {
  'Least Concern': { bg: '#059669' },
  'Near Threatened': { bg: '#D97706' },
  Vulnerable: { bg: '#EA580C' },
  Endangered: { bg: '#DC2626' },
  'Critically Endangered': { bg: '#7F1D1D' },
};

export default function SpeciesDetailClient({ species: s }: { species: any }) {
  const [tab, setTab] = useState<'deskripsi' | 'ekologi'>('deskripsi');
  const [mainPhoto, setMainPhoto] = useState<string | null>(null);
  const iucn = s.iucnStatus ? IUCN[s.iucnStatus] : null;
  const galleryUrls: string[] = (s.galleryUrls as string[]) || [];
  const displayedPhoto = mainPhoto || s.primaryPhotoUrl;

  return (
    <div>
      <Link href="/katalog" className="inline-flex items-center gap-2 text-fg-muted hover:text-primary transition-colors mb-8 text-sm font-medium">
        <ChevronLeft className="w-4 h-4" /> Kembali ke Katalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <div className="aspect-[4/3] bg-card-bg border border-card-border rounded-2xl overflow-hidden relative">
            {displayedPhoto ? (
              <img src={displayedPhoto} alt={s.commonName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center"><Bug className="w-24 h-24 text-fg-muted/20" /></div>
            )}
            {iucn && (
              <span className="absolute top-4 right-4 font-bold px-3 py-1.5 rounded-lg text-white text-sm shadow-md" style={{ background: iucn.bg }}>
                {s.iucnStatus}
              </span>
            )}
          </div>
          {galleryUrls.length > 0 && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
              {s.primaryPhotoUrl && (
                <button
                  onClick={() => setMainPhoto(null)}
                  className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${!mainPhoto ? 'border-primary' : 'border-card-border hover:border-primary/50'}`}
                >
                  <img src={s.primaryPhotoUrl} alt="" className="w-full h-full object-cover" />
                </button>
              )}
              {galleryUrls.map((url: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setMainPhoto(url)}
                  className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${mainPhoto === url ? 'border-primary' : 'border-card-border hover:border-primary/50'}`}
                >
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          {s.siteStatus && (
            <div className="mt-4 bg-card-bg border border-card-border rounded-xl p-4 flex items-center justify-between">
              <span className="text-fg-muted text-sm font-medium">Status di Situs:</span>
              <span className="text-primary font-bold">{s.siteStatus}</span>
            </div>
          )}
        </div>

        <div className="lg:col-span-7">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-fg leading-tight mb-2">{s.commonName}</h1>
          <p className="text-primary italic font-serif text-2xl mb-6">{s.scientificName}</p>

          <div className="flex flex-wrap gap-3 mb-6">
            {s.family && <span className="bg-card-bg border border-card-border px-4 py-2 rounded-lg text-sm font-medium">{s.family}</span>}
            {s.wingspan && <span className="bg-card-bg border border-card-border px-4 py-2 rounded-lg text-sm font-medium">Rentang Sayap: {s.wingspan}</span>}
            {s.ecosystemRole && (
              <span className="bg-primary-light text-primary border border-primary/30 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                <Bug className="w-4 h-4" /> {s.ecosystemRole}
              </span>
            )}
          </div>

          <div className="flex gap-2 mb-6 bg-card-bg border border-card-border p-1.5 rounded-xl w-fit">
            {(['deskripsi', 'ekologi'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold cursor-pointer transition-all ${
                  tab === t ? 'bg-primary text-white shadow-md' : 'text-fg-muted hover:text-fg'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div className="text-fg-muted leading-relaxed custom-scrollbar max-h-[400px] overflow-y-auto pr-4">
            {tab === 'deskripsi' && (s.description || s.characteristics || 'Informasi deskripsi belum tersedia.')}
            {tab === 'ekologi' && (
              <div className="space-y-6">
                {s.hostPlants?.length > 0 && (
                  <div>
                    <p className="text-fg-muted/50 text-xs font-bold uppercase tracking-widest mb-2">Tanaman Inang</p>
                    <div className="flex flex-wrap gap-2">{s.hostPlants.map((h: string) => <span key={h} className="text-sm font-medium bg-card-bg border border-card-border px-3 py-1.5 rounded-md">{h}</span>)}</div>
                  </div>
                )}
                {s.pollinatedPlants?.length > 0 && (
                  <div>
                    <p className="text-fg-muted/50 text-xs font-bold uppercase tracking-widest mb-2">Tanaman yang Diserbuki</p>
                    <div className="flex flex-wrap gap-2">{s.pollinatedPlants.map((h: string) => <span key={h} className="text-sm font-medium bg-primary-light border border-primary/30 text-primary px-3 py-1.5 rounded-md">{h}</span>)}</div>
                  </div>
                )}
                {s.activeMonths?.length > 0 && (
                  <div>
                    <p className="text-fg-muted/50 text-xs font-bold uppercase tracking-widest mb-2">Musim Aktif</p>
                    <p className="text-sm">{s.activeMonths.join(', ')}</p>
                  </div>
                )}
                {s.foundLocations?.length > 0 && (
                  <div>
                    <p className="text-fg-muted/50 text-xs font-bold uppercase tracking-widest mb-2">Lokasi Temuan</p>
                    <div className="flex flex-wrap gap-2">{s.foundLocations.map((l: string) => <span key={l} className="text-sm font-medium bg-card-bg border border-card-border px-3 py-1.5 rounded-md">{l}</span>)}</div>
                  </div>
                )}
                {s.ecologyNotes && (
                  <div>
                    <p className="text-fg-muted/50 text-xs font-bold uppercase tracking-widest mb-2">Catatan Ekologi</p>
                    <p className="text-sm">{s.ecologyNotes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
