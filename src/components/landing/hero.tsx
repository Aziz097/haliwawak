import Link from 'next/link';
import { Bug, Calendar, ArrowRight, Monitor } from 'lucide-react';

export default function Hero({ species }: { species: { primaryPhotoUrl?: string | null }[] }) {
  const bgImage = species.find((s) => s.primaryPhotoUrl)?.primaryPhotoUrl ?? '/kiosk/scenes/living-heritage-1.jpg';

  return (
    <section className="relative overflow-hidden bg-kiosk-bg">
      <div className="page-container grid min-h-[80vh] grid-cols-1 items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div className="order-2 lg:order-1">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-kiosk-accent-teal/30 bg-kiosk-accent-teal/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-kiosk-accent-teal">
            Lampung Timur, Indonesia
          </span>
          <h1 className="font-heading text-4xl font-medium leading-[1.08] text-kiosk-ink sm:text-5xl lg:text-6xl">
            Situs Purbakala & <span className="text-kiosk-accent-teal">Surga Polinator</span>
          </h1>
          <p className="mb-8 mt-6 max-w-lg text-lg leading-relaxed text-kiosk-ink-muted">
            Temukan keanekaragaman kupu-kupu dan pelajari perannya yang tak tergantikan dalam menjaga
            ketahanan pangan di ekosistem Situs Purbakala Pugung Raharjo.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/kiosk"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-kiosk-accent-teal px-8 py-4 font-bold text-white transition-all hover:bg-kiosk-green-600"
            >
              <Monitor className="h-5 w-5" /> Buka Kiosk
            </Link>
            <Link
              href="/katalog"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-kiosk-accent-teal bg-white px-8 py-4 font-bold text-kiosk-accent-teal transition-all hover:bg-kiosk-surface-tint"
            >
              <Bug className="h-5 w-5" /> Jelajahi Spesies
            </Link>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2.618rem] border-4 border-white shadow-[0_20px_60px_rgba(30,51,40,0.1)]">
            <img src={bgImage} alt="Kupu-kupu di Pugung Raharjo" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-kiosk-ink/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}