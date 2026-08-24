import Link from 'next/link';
import Image from 'next/image';

const NAV_LINKS = [
  { label: 'Katalog', href: '/katalog' },
  { label: 'Edukasi', href: '/edukasi' },
  { label: 'Tentang', href: '/tentang' },
  { label: 'Kunjungi', href: '/kunjungi' },
  { label: 'Kontak', href: '/kontak' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-kiosk-orange-200 bg-kiosk-bg/95 backdrop-blur-sm">
      <nav className="page-container flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/kupu2-logo-black.svg"
            alt="Eduwisata Polinator"
            width={40}
            height={40}
            className="object-contain"
          />
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
      </nav>
    </header>
  );
}
