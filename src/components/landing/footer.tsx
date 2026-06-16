import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';

const NAV_ITEMS = [
  ['Katalog Spesies', '/katalog'],
  ['Artikel Edukasi', '/edukasi'],
  ['Tentang Situs', '/tentang'],
  ['Cara Berkunjung', '/kunjungi'],
  ['Kontak', '/kontak'],
];

export default function Footer() {
  return (
    <footer className="bg-kiosk-ink px-4 py-16 text-white/70">
      <div className="page-container">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <img src="/kupu-logo-white.svg" alt="Logo" className="h-10 w-10 opacity-90" />
              <span className="font-heading text-lg font-bold tracking-wide text-white">Eduwisata Polinator</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed">
              Sistem Informasi Eduwisata Polinator Situs Purbakala Pugung Raharjo, Lampung Timur, Lampung.
            </p>
          </div>
          <div>
            <p className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-white">Navigasi</p>
            <div className="flex flex-col gap-3 text-sm">
              {NAV_ITEMS.map(([label, href]) => (
                <Link key={href} href={href} className="flex items-center gap-2 transition-colors hover:text-white">
                  <span className="h-1 w-1 rounded-full bg-kiosk-accent-amber" /> {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-white">Kontak</p>
            <div className="flex flex-col gap-4 text-sm">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-kiosk-accent-amber" />
                <span className="leading-relaxed">Jl. Pugung Raharjo, Lampung Timur 34192</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-kiosk-accent-amber" /> (0725) 123-456
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm md:flex-row">
          <p>© 2026 Eduwisata Polinator Pugung Raharjo</p>
          <p>
            Didukung oleh <span className="font-medium text-white">Institut Teknologi Sumatera</span> & Kemdiktisaintek RI
          </p>
        </div>
      </div>
    </footer>
  );
}