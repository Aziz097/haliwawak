'use client';

/**
 * SiteMapTile - a single Site Map hub tile.
 *
 * Designed for the "Bright Organic Heritage" aesthetic:
 * Image-led cards with organic depth, rounded corners, a soft gradient
 * overlay, and golden ratio typography for the bilingual label.
 *
 * Requirements: 6.2, 6.4
 */

import { motion } from 'framer-motion';
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
import { MORPH_SPRING, morphId } from '../kiosk-theme/motion';
import KioskImage from './KioskImage';

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
  const Icon = ICON_MAP[tile.icon] ?? Landmark;

  return (
    <button
      type="button"
      onClick={() => onSelect(tile.screen)}
      aria-label={`${tile.label.id} / ${tile.label.en}`}
      className="kiosk-tile-container group relative h-full w-full rounded-[clamp(1.25rem,4cqmin,2.25rem)] p-2 text-left transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-2 hover:shadow-[0_24px_48px_-12px_rgba(30,51,40,0.25)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-kiosk-orange-300"
      style={{
        background: 'rgba(255,255,255,0.06)',
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.12), 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      {/* Inner core — the actual content container.
          `layoutId` is the morph origin: when this tile is selected, ScreenRouter
          renders the destination screen with the same id and framer-motion grows
          this box into the full screen. */}
      <motion.div
        layoutId={morphId(tile.screen)}
        transition={MORPH_SPRING}
        className="relative h-full w-full overflow-hidden rounded-[clamp(1rem,3.5cqmin,2rem)] bg-kiosk-surface shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]"
      >
        {/* Background Image with Fallback */}
        <div className="absolute inset-0 bg-kiosk-orange-100 transition-transform duration-700 ease-out group-hover:scale-105">
          {tile.image ? (
            <KioskImage
              src={tile.image}
              alt=""
              className="h-full w-full"
              imgClassName="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-kiosk-orange-300">
              <Icon
                className="h-[clamp(3rem,14cqmin,5rem)] w-[clamp(3rem,14cqmin,5rem)] opacity-20"
                aria-hidden="true"
                strokeWidth={1}
              />
            </div>
          )}
        </div>

        {/* Deep Organic Gradient Overlay for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-kiosk-ink/90 via-kiosk-ink/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Bottom lockup: icon and label sit on ONE row (icon + text), not
            stacked. The icon keeps its own baseline via `shrink-0` so long
            labels wrap under themselves rather than under the icon. */}
        <div className="absolute bottom-0 left-0 flex w-full items-center gap-[clamp(0.5rem,3cqmin,0.875rem)] p-[clamp(0.75rem,5cqmin,1.5rem)] transition-transform duration-500 group-hover:-translate-y-1">
          <span className="kiosk-tile-icon flex h-[clamp(2rem,8cqmin,3rem)] w-[clamp(2rem,8cqmin,3rem)] shrink-0 items-center justify-center rounded-full bg-white/12 text-white ring-1 ring-white/20 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-kiosk-accent-amber">
            <Icon
              className="h-[clamp(1rem,3.5cqmin,1.25rem)] w-[clamp(1rem,3.5cqmin,1.25rem)]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </span>

          <span className="flex min-w-0 flex-col">
            <span className="line-clamp-2 font-serif text-[clamp(0.875rem,6cqmin,1.75rem)] leading-tight text-white drop-shadow-md">
              {tile.label.id}
            </span>
            {/* Several tiles use the same string for both languages; showing it
                twice just adds noise. */}
            {tile.label.en !== tile.label.id && (
              <span className="kiosk-tile-subtitle mt-[clamp(0.125rem,1cqmin,0.375rem)] font-sans text-[clamp(0.6rem,2.8cqmin,0.8rem)] font-bold uppercase tracking-[0.12em] text-kiosk-orange-200">
                {tile.label.en}
              </span>
            )}
          </span>
        </div>
      </motion.div>
    </button>
  );
}
