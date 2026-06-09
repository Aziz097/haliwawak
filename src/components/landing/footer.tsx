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
    <footer className="bg-section-dark text-white/60 py-16 px-4">
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/kupu-logo-white.svg" alt="Logo" className="w-8 h-8 opacity-90" />
              <span className="text-white font-heading font-bold text-lg tracking-wide">Eduwisata Polinator</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-6">Sistem Informasi Eduwisata Polinator Situs Purbakala Pugung Raharjo, Lampung Timur, Lampung.</p>
          </div>
          <div>
            <p className="text-white text-sm font-heading font-bold mb-4 uppercase tracking-wider">Navigasi</p>
            <div className="flex flex-col gap-3 text-sm">
              {NAV_ITEMS.map(([label, href]) => (
                <Link key={href} href={href} className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full" /> {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white text-sm font-heading font-bold mb-4 uppercase tracking-wider">Kontak</p>
            <div className="flex flex-col gap-4 text-sm">
              <p className="flex items-start gap-3"><MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span className="leading-relaxed">Jl. Pugung Raharjo, Lampung Timur 34192</span></p>
              <p className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary shrink-0" /> (0725) 123-456</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2026 Eduwisata Polinator Pugung Raharjo</p>
          <p>Didukung oleh <span className="text-white font-medium">Institut Teknologi Sumatera</span> & Kemdiktisaintek RI</p>
        </div>
      </div>
    </footer>
  );
}
