import Link from 'next/link';
import { Bug, ChevronRight } from 'lucide-react';

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

export default function FeaturedSpecies({ species, featuredSpecies }: { species: any[]; featuredSpecies?: any[] }) {
  const displaySpecies = (featuredSpecies && featuredSpecies.length > 0) ? featuredSpecies : species;
  if (displaySpecies.length === 0) {
    return (
      <section className="py-24 px-4">
        <div className="page-container text-center">
          <Bug className="w-12 h-12 text-fg-muted mx-auto mb-4" />
          <p className="text-fg font-medium">Belum ada spesies yang dipublikasikan.</p>
        </div>
      </section>
    );
  }

  const cover = displaySpecies[0];
  const rest = displaySpecies.slice(1, 5);

  return (
    <section className="py-24 px-4">
      <div className="page-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="section-kicker mb-2">Ensiklopedia Spesies</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-fg">Spesies Unggulan</h2>
          </div>
          <Link href="/katalog" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors bg-primary-light px-4 py-2.5 rounded-lg w-fit">
            Lihat Semua <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[280px]">
          <Link href={`/katalog/${cover.slug || slugify(cover.commonName, cover.id)}`}
            className="group relative md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden bg-card-bg border border-card-border hover:border-primary/30 transition-all">
            {cover.primaryPhotoUrl ? (
              <img src={cover.primaryPhotoUrl} alt={cover.commonName} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary-light"><Bug className="w-16 h-16 text-primary/30" /></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-heading text-2xl font-bold text-white mb-1">{cover.commonName}</h3>
              <p className="text-white/70 italic text-sm">{cover.scientificName}</p>
            </div>
            {cover.iucnStatus && (
              <span className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-md"
                style={{ color: IUCN_BADGE[cover.iucnStatus]?.color || '#6B7280', background: IUCN_BADGE[cover.iucnStatus]?.bg || '#F3F4F6' }}>
                {IUCN_ABBR[cover.iucnStatus] || cover.iucnStatus}
              </span>
            )}
          </Link>
          {rest.map((s: any) => {
            const href = `/katalog/${s.slug || slugify(s.commonName, s.id)}`;
            return (
              <Link key={s.id} href={href}
                className="group relative rounded-2xl overflow-hidden bg-card-bg border border-card-border hover:border-primary/30 transition-all">
                {s.primaryPhotoUrl ? (
                  <img src={s.primaryPhotoUrl} alt={s.commonName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary-light"><Bug className="w-8 h-8 text-primary/30" /></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-heading font-bold text-white text-sm leading-tight">{s.commonName}</h3>
                  <p className="text-white/60 text-xs italic mt-0.5">{s.scientificName}</p>
                </div>
                {s.iucnStatus && (
                  <span className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-md"
                    style={{ color: IUCN_BADGE[s.iucnStatus]?.color || '#6B7280', background: IUCN_BADGE[s.iucnStatus]?.bg || '#F3F4F6' }}>
                    {IUCN_ABBR[s.iucnStatus] || s.iucnStatus}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
