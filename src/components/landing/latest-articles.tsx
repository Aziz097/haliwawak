import Link from 'next/link';
import { BookOpen, ChevronRight, ImageOff } from 'lucide-react';

export default function LatestArticles({ articles }: { articles: any[] }) {
  if (articles.length === 0) {
    return null;
  }

  const featured = articles[0];
  const side = articles.slice(1, 3);

  return (
    <section className="py-20 px-4 bg-kiosk-bg">
      <div className="page-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="section-kicker mb-2">Konten Edukasi</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-kiosk-ink">Artikel Terbaru</h2>
          </div>
          <Link href="/edukasi" className="inline-flex items-center gap-2 text-sm font-bold text-kiosk-accent-teal hover:text-kiosk-accent-teal/80 transition-colors bg-kiosk-surface-tint px-4 py-2.5 rounded-lg w-fit">
            Lihat Semua <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href={`/edukasi/${featured.slug}`}
            className="group md:col-span-2 bg-white border border-kiosk-surface-tint rounded-2xl overflow-hidden hover:border-kiosk-accent-teal/30 transition-all">
            <div className="aspect-[2/1] bg-kiosk-surface-tint relative">
              {featured.thumbnailUrl ? (
                <img src={featured.thumbnailUrl} alt={featured.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" />
              ) : (
                <div className="w-full h-full flex items-center justify-center"><ImageOff className="w-12 h-12 text-kiosk-ink-muted/30" /></div>
              )}
            </div>
            <div className="p-6">
              <span className="inline-block text-xs font-bold text-kiosk-accent-amber bg-kiosk-accent-amber/10 px-2.5 py-1 rounded-md mb-3">{featured.category}</span>
              <h3 className="font-heading font-bold text-2xl text-kiosk-ink leading-snug group-hover:text-kiosk-accent-teal transition-colors mb-2">{featured.title}</h3>
              {featured.summary && <p className="text-kiosk-ink-muted text-sm line-clamp-2">{featured.summary}</p>}
            </div>
          </Link>
          <div className="flex flex-col gap-6">
            {side.map((a: any) => (
              <Link key={a.id} href={`/edukasi/${a.slug}`}
                className="group flex gap-4 bg-white border border-kiosk-surface-tint rounded-2xl p-4 hover:border-kiosk-accent-teal/30 transition-all">
                <div className="w-24 h-24 shrink-0 bg-kiosk-surface-tint rounded-xl overflow-hidden">
                  {a.thumbnailUrl ? (
                    <img src={a.thumbnailUrl} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><ImageOff className="w-6 h-6 text-kiosk-ink-muted/30" /></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-kiosk-accent-amber uppercase tracking-wider">{a.category}</span>
                  <h3 className="font-heading font-bold text-sm text-kiosk-ink leading-snug group-hover:text-kiosk-accent-teal transition-colors line-clamp-2 mt-1">{a.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}