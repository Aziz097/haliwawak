import Link from 'next/link';
import { Landmark, Bug, Leaf, Wheat, Droplets, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const THEMES: { key: string; icon: LucideIcon; title: string; desc: string; href: string }[] = [
  {
    key: 'living-heritage',
    icon: Landmark,
    title: 'The Living Heritage',
    desc: 'Warisan budaya dan alam yang tak terpisahkan di Situs Pugung Raharjo.',
    href: '/tentang',
  },
  {
    key: 'insektarium',
    icon: Bug,
    title: 'Insektarium Virtual',
    desc: 'Kenali keluarga-keluarga kupu-kupu yang menghuni situs ini.',
    href: '/katalog',
  },
  {
    key: 'metamorfosis',
    icon: Leaf,
    title: 'Metamorfosis',
    desc: 'Empat tahap menakjubkan dari telur hingga kupu-kupu dewasa.',
    href: '/edukasi',
  },
  {
    key: 'ketahanan-pangan',
    icon: Wheat,
    title: 'Ketahanan Pangan',
    desc: 'Bagaimana polinator mendukung hasil panen di sekitar situs.',
    href: '/edukasi',
  },
  {
    key: 'kolam-megalitik',
    icon: Droplets,
    title: 'Kolam Megalitik',
    desc: 'Sumber air bersih yang menjadi pusat ekologi dan spiritual.',
    href: '/edukasi',
  },
];

export default function ExploreThemes() {
  return (
    <section className="bg-kiosk-bg py-20 px-4">
      <div className="page-container">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-kiosk-accent-teal">Jelajahi</p>
          <h2 className="font-heading text-3xl font-medium text-kiosk-ink md:text-4xl">Cerita di Balik Situs</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {THEMES.map((theme) => {
            const Icon = theme.icon;
            return (
              <Link
                key={theme.key}
                href={theme.href}
                className="group flex flex-col gap-5 rounded-[2rem] border-2 border-white bg-white p-8 shadow-[0_8px_30px_rgba(30,51,40,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(30,51,40,0.08)]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-kiosk-accent-teal/10 text-kiosk-accent-teal transition-colors group-hover:bg-kiosk-accent-teal group-hover:text-white">
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-kiosk-ink">{theme.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-kiosk-ink-muted">{theme.desc}</p>
                </div>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-kiosk-accent-teal">
                  Selengkapnya <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}