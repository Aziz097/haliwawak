'use client';

/**
 * SiteMapTile — a single Site Map hub tile.
 *
 * Designed for the "Bright Organic Heritage" aesthetic:
 * Image-led cards with organic depth, rounded corners, a soft gradient
 * overlay, and golden ratio typography for the bilingual label.
 *
 * Requirements: 6.2, 6.4
 */

import {
  Activity,
  Bug,
  Droplets,
  Landmark,
  type LucideIcon,
  Megaphone,
  Table,
  Users,
  Wheat,
  Workflow,
} from 'lucide-react';

import type { Screen, TileMeta } from '../navigation/screens';
import { useLang } from '../i18n/language';

export interface SiteMapTileProps {
  /** Tile metadata: target screen, bilingual label, icon name, image. */
  tile: TileMeta;
  /** Invoked with the tile's target screen when the tile is activated. */
  onSelect: (screen: Screen) => void;
}

/** Maps the lucide-react icon names used in `SITE_MAP_TILES` to components. */
const ICON_MAP: Record<string, LucideIcon> = {
  Landmark,
  Bug,
  Workflow,
  Activity,
  Wheat,
  Droplets,
  Megaphone,
  Table,
  Users,
};

export default function SiteMapTile({ tile, onSelect }: SiteMapTileProps) {
  const { lang } = useLang();
  const Icon = ICON_MAP[tile.icon] ?? Landmark;

  return (
    <button
      type="button"
      onClick={() => onSelect(tile.screen)}
      aria-label={`${tile.label.id} / ${tile.label.en}`}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(30,51,40,0.3)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-kiosk-green-300"
    >
      {/* Background Image with Fallback */}
      <div className="absolute inset-0 bg-kiosk-green-100 transition-transform duration-700 ease-out group-hover:scale-105">
        {tile.image ? (
          <img
            src={tile.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-kiosk-green-300">
            <Icon className="h-20 w-20 opacity-20" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Deep Organic Gradient Overlay for Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-kiosk-ink/90 via-kiosk-ink/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Top Icon Badge */}
      <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors group-hover:bg-kiosk-accent-amber group-hover:text-white">
        <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      </div>

      {/* Bottom Typography (Golden Ratio Sized) */}
      <div className="absolute bottom-0 left-0 flex w-full flex-col p-6 transition-transform duration-500 group-hover:-translate-y-2">
        <span className="font-serif text-[1.618rem] leading-tight text-white drop-shadow-md">
          {tile.label.id}
        </span>
        <span className="mt-2 font-sans text-[0.8rem] font-bold uppercase tracking-[0.2em] text-kiosk-green-200">
          {tile.label.en}
        </span>
      </div>
    </button>
  );
}
