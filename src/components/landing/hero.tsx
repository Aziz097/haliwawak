import Link from 'next/link';
import { Bug, Calendar } from 'lucide-react';

export default function Hero({ species }: { species: { primaryPhotoUrl?: string | null }[] }) {
  const bgImage = species.find((s) => s.primaryPhotoUrl)?.primaryPhotoUrl;

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-end overflow-hidden bg-section-dark">
      {bgImage && (
        <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F23] via-[#1A2F23]/40 to-transparent" />
      <div className="relative z-10 page-container pb-16 md:pb-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-xs font-bold tracking-wider px-4 py-2 rounded-full mb-6">
            Lampung Timur, Lampung
          </span>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.08] mb-6">
            Situs Purbakala &{' '}
            <span className="text-[#4ADE80]">Surga Polinator</span>
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-lg leading-relaxed mb-8">
            Temukan keanekaragaman kupu-kupu dan pelajari perannya yang tak
            tergantikan dalam menjaga ketahanan pangan di ekosistem Situs
            Purbakala Pugung Raharjo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/katalog" className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3.5 rounded-xl font-bold hover:brightness-110 transition-all">
              <Bug className="w-4 h-4" /> Jelajahi Spesies
            </Link>
            <Link href="/kunjungi" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/20 transition-all">
              <Calendar className="w-4 h-4" /> Rencana Kunjungan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
