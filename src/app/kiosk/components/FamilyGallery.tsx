/**
 * FamilyGallery — a grid of butterfly species grouped under one family, used by
 * the Virtual Insektarium screen (one gallery per family).
 *
 * Renders a bilingual family heading and an image-led grid of species cards.
 * Cards are rendered inline (image + name caption) to avoid a hard dependency
 * on `SpeciesCard` (task 7.6) — swap to `SpeciesCard` once it exists.
 *
 * When the family group is empty, an `EmptyState` is rendered for that group
 * so the screen never shows a blank area (Req 8.5).
 *
 * Uses only the bright-green kiosk design tokens (no raw hex / legacy colors).
 * Images use plain <img loading="lazy" /> per the kiosk image strategy.
 *
 * Requirements: 8.5
 */

import { ImageOff } from 'lucide-react';
import { FAMILY_LABELS, type Caption } from '../content/i18n';
import type { KioskSpecies } from '../lib/speciesMapping';
import { useLang } from '../i18n/language';
import EmptyState from './EmptyState';

export interface FamilyGalleryProps {
  /** The butterfly family name this gallery groups (e.g. "Papilionidae"). */
  family: string;
  /** Species belonging to this family. When empty, an EmptyState is shown. */
  species: KioskSpecies[];
}

/** Resolve the bilingual heading for a family, falling back to the raw name. */
function familyCaption(family: string): Caption {
  return FAMILY_LABELS[family] ?? { id: family, en: family };
}

/** A single inline, image-dominant species card (name caption below image). */
function SpeciesGalleryCard({ species }: { species: KioskSpecies }) {
  const name = species.commonName || species.scientificName || species.family;

  return (
    <figure className="flex flex-col overflow-hidden rounded-2xl border border-kiosk-green-200 bg-kiosk-surface shadow-sm">
      <div className="relative aspect-square w-full overflow-hidden bg-kiosk-green-100">
        {species.topPhotoUrl ? (
          <img
            src={species.topPhotoUrl}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-kiosk-green-400">
            <ImageOff className="h-10 w-10" aria-hidden="true" />
          </span>
        )}
      </div>
      <figcaption className="flex flex-col gap-0.5 px-3 py-3">
        <span className="text-base font-semibold leading-tight text-kiosk-ink">
          {name}
        </span>
        {species.scientificName && species.scientificName !== name ? (
          <span className="text-sm italic leading-tight text-kiosk-ink-muted">
            {species.scientificName}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}

/** A family-grouped gallery grid with a single-language heading and empty fallback. */
export default function FamilyGallery({ family, species }: FamilyGalleryProps) {
  const { t } = useLang();
  const heading = familyCaption(family);

  return (
    <section className="flex flex-col gap-4">
      <header className="flex items-center gap-3">
        <h3 className="text-2xl font-bold text-kiosk-ink">{t(heading)}</h3>
        <span className="rounded-full bg-kiosk-green-100 px-3 py-1 text-sm font-semibold text-kiosk-green-700">
          {species.length}
        </span>
      </header>

      {species.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {species.map((item) => (
            <li key={String(item.id)} className="list-none">
              <SpeciesGalleryCard species={item} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
