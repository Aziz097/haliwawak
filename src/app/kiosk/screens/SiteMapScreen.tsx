/**
 * SiteMapScreen - Screen 2 of the kiosk flow: the central navigation hub.
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

      <div className="flex h-full flex-col gap-[clamp(0.75rem,2vh,1.5rem)] p-[clamp(1rem,2.5vw,2rem)] lg:p-[clamp(1.25rem,3vw,2.5rem)]">
        {/* Elegant Hub Heading - kept compact so the grid gets the space it needs. */}
        <header className="flex flex-col items-start gap-2 border-b border-kiosk-green-200 pb-[clamp(0.5rem,1.5vh,1rem)]">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-kiosk-accent-teal/10 text-kiosk-accent-teal lg:h-10 lg:w-10">
              <Map className="h-4 w-4 lg:h-5 lg:w-5" strokeWidth={2} />
            </span>
            <span className="font-sans text-[clamp(0.7rem,1.1vw,0.875rem)] font-bold uppercase tracking-[0.18em] text-kiosk-accent-teal">
              {lang === 'id' ? 'Eksplorasi Eduwisata' : 'Eduwisata Exploration'}
            </span>
          </div>
          <div className="flex flex-col gap-0.5 lg:gap-1">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-tight text-kiosk-ink">
              {lang === 'id' ? 'Peta Situs Polinator' : 'Pollinator Site Map'}
            </h2>
            <p className="font-sans text-[clamp(0.8rem,1.1vw,0.95rem)] leading-snug text-kiosk-ink-muted">
              {lang === 'id'
                ? 'Pilih destinasi virtual di bawah ini untuk memulai penjelajahan Anda.'
                : 'Choose a virtual destination below to begin your exploration.'}
            </p>
          </div>
        </header>

        {/* Responsive Organic Grid
            - Collapses columns on narrow/short viewports instead of squeezing.
            - Rows have a comfortable minimum height and share leftover space.
            - If the viewport is still too short, the grid scrolls gracefully. */}
        <ul className="grid min-h-0 flex-1 grid-cols-1 gap-[clamp(0.75rem,1.2vw,1.25rem)] overflow-y-auto md:grid-cols-2 xl:grid-cols-3 auto-rows-[minmax(110px,1fr)]">
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
