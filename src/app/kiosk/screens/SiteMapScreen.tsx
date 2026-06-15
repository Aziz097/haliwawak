/**
 * SiteMapScreen — Screen 2 of the kiosk flow: the central navigation hub.
 *
 * Designed for the "Bright Organic Heritage" aesthetic:
 * A spacious, elegant grid of image-led tiles with generous padding,
 * golden ratio typography, and a warm paper background.
 *
 * Requirements: 6.1, 6.4
 */

import SiteMapTile from '../components/SiteMapTile';
import type { Screen } from '../navigation/screens';
import { SITE_MAP_TILES } from '../navigation/screens';
import { useLang } from '../i18n/language';
import { Map } from 'lucide-react';

export interface SiteMapScreenProps {
  /** Invoked with the chosen tile's target screen when a tile is activated. */
  onSelect: (screen: Screen) => void;
}

export default function SiteMapScreen({ onSelect }: SiteMapScreenProps) {
  const { lang } = useLang();
  return (
    <section className="flex h-full flex-col bg-kiosk-bg">
      {/* Soft Top Gradient/Shadow for visual depth */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-kiosk-ink/5 to-transparent mix-blend-multiply" />

      <div className="flex h-full flex-col gap-[2.618rem] p-10 lg:p-14">
        {/* Elegant Hub Heading */}
        <header className="flex flex-col items-start gap-4 border-b border-kiosk-green-200 pb-8">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-kiosk-accent-teal/10 text-kiosk-accent-teal">
              <Map className="h-6 w-6" strokeWidth={2} />
            </span>
            <span className="font-sans text-[1rem] font-bold uppercase tracking-[0.25em] text-kiosk-accent-teal">
              {lang === 'id' ? 'Eksplorasi Eduwisata' : 'Eduwisata Exploration'}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-serif text-[2.618rem] font-medium leading-none text-kiosk-ink">
              {lang === 'id' ? 'Peta Situs Polinator' : 'Pollinator Site Map'}
            </h2>
            <p className="font-sans text-[1rem] leading-relaxed text-kiosk-ink-muted">
              {lang === 'id'
                ? 'Pilih destinasi virtual di bawah ini untuk memulai penjelajahan Anda.'
                : 'Choose a virtual destination below to begin your exploration.'}
            </p>
          </div>
        </header>

        {/* Spacious Organic Grid
            3 columns × 3 rows, with larger gaps to let the design breathe. */}
        <ul className="grid min-h-0 flex-1 grid-cols-3 grid-rows-3 gap-[1.618rem]">
          {SITE_MAP_TILES.map((tile) => (
            <li key={tile.screen} className="list-none">
              <SiteMapTile tile={tile} onSelect={onSelect} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
