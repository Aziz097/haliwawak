'use client';

/**
 * SiteMapTile — a single Site Map hub tile, rendered as an ICON-ONLY menu
 * button (no imagery), like a home-menu entry. Shows a large lucide-react icon
 * (resolved from `tile.icon`) above the bilingual label (Indonesian primary,
 * English secondary). The whole tile is one touch target that invokes
 * `onSelect(tile.screen)`.
 *
 * Styling uses ONLY the bright-green kiosk design tokens (no raw hex / legacy
 * palette).
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
  /** Tile metadata: target screen, bilingual label, icon name. */
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
  const { t } = useLang();
  const Icon = ICON_MAP[tile.icon] ?? Landmark;

  return (
    <button
      type="button"
      onClick={() => onSelect(tile.screen)}
      aria-label={`${tile.label.id} / ${tile.label.en}`}
      className="group flex h-full w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-kiosk-green-200 bg-kiosk-surface p-4 text-center transition-all hover:-translate-y-0.5 hover:border-kiosk-green-500 hover:bg-kiosk-surface-tint hover:shadow-md focus-visible:outline focus-visible:outline-4 focus-visible:outline-kiosk-green-300"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-kiosk-green-100 text-kiosk-green-700 transition-colors group-hover:bg-kiosk-green-600 group-hover:text-kiosk-on-green">
        <Icon className="h-9 w-9" strokeWidth={2} aria-hidden="true" />
      </span>
      <span className="text-lg font-bold leading-tight text-kiosk-ink">
        {t(tile.label)}
      </span>
    </button>
  );
}
