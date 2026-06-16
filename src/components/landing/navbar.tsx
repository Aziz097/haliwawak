import Link from 'next/link';
import { Monitor } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Katalog', href: '/katalog' },
  { label: 'Edukasi', href: '/edukasi' },
  { label: 'Tentang', href: '/tentang' },
  { label: 'Kunjungi', href: '/kunjungi' },
  { label: 'Kontak', href: '/kontak' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-kiosk-green-200 bg-kiosk-bg/95 backdrop-blur-sm">
      <nav className="page-container flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <img src="/kupu2-logo-black.svg" alt="Eduwisata Polinator" className="h-10 w-10 object-contain" />
          <span className="font-heading text-xl font-bold text-kiosk-ink">Eduwisata Polinator</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-kiosk-ink-muted transition-colors hover:text-kiosk-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/kiosk"
          className="inline-flex items-center gap-2 rounded-xl bg-kiosk-green-700 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-kiosk-green-800"
        >
          <Monitor className="h-4 w-4" />
          Mode Kiosk
        </Link>
      </nav>
    </header>
  );
}