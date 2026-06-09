/**
 * SiteMapScreen — Screen 2 of the kiosk flow: the central navigation hub.
 *
 * Renders a responsive grid of {@link SiteMapTile}, one tile per entry in
 * `SITE_MAP_TILES` (one per content screen, Req 6.1). Each tile is a large
 * touch target that invokes `onSelect(tile.screen)` when activated (Req 6.4),
 * letting the visitor jump directly to any content screen from one place.
 *
 * A short bilingual heading (Indonesian primary / English secondary) sits at
 * the top. Styling uses ONLY the bright-green kiosk design tokens
 * (`text-kiosk-*`, `bg-kiosk-*`) — no raw hex and no legacy palette values.
 *
 * This is a purely presentational component (no client hooks of its own), so
 * it omits the `'use client'` directive.
 *
 * Requirements: 6.1, 6.4
 */

import SiteMapTile from '../components/SiteMapTile';
import type { Screen } from '../navigation/screens';
import { SITE_MAP_TILES } from '../navigation/screens';
import { useLang } from '../i18n/language';

export interface SiteMapScreenProps {
  /** Invoked with the chosen tile's target screen when a tile is activated. */
  onSelect: (screen: Screen) => void;
}

export default function SiteMapScreen({ onSelect }: SiteMapScreenProps) {
  const { lang } = useLang();
  return (
    <section className="flex h-full flex-col gap-5 p-6">
      {/* Single-language hub heading. */}
      <header className="flex flex-col items-center gap-1 text-center">
        <h2 className="text-3xl font-extrabold leading-tight text-kiosk-ink">
          {lang === 'id' ? 'Peta Situs' : 'Site Map'}
        </h2>
        <p className="text-base font-medium text-kiosk-ink-muted">
          {lang === 'id'
            ? 'Pilih menu untuk mulai menjelajah'
            : 'Choose a menu to start exploring'}
        </p>
      </header>

      {/* Icon-only menu grid that fits within one screen (3 columns × 3 rows
          for the 9 content screens — no scrolling, Req 6.1). */}
      <ul className="grid min-h-0 flex-1 grid-cols-3 grid-rows-3 gap-4">
        {SITE_MAP_TILES.map((tile) => (
          <li key={tile.screen} className="list-none">
            <SiteMapTile tile={tile} onSelect={onSelect} />
          </li>
        ))}
      </ul>
    </section>
  );
}
