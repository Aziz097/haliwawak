/**
 * FamilyGallery - a grid of butterfly species grouped under one family.
 *
 * Designed for the "Bright Organic Heritage" aesthetic:
 * Golden ratio serif headings, soft shadow cards (rounded-[2rem]),
 * warm off-white surfaces, and an elegant botanical feel.
 *
 * Requirements: 8.5
 */

import { ImageOff, Tag } from 'lucide-react';
import { FAMILY_LABELS, type Caption } from '../content/i18n';
import type { KioskSpecies } from '../lib/speciesMapping';
import { useLang } from '../i18n/language';
import ClickableCard from './ClickableCard';
import EmptyState from './EmptyState';

export interface FamilyGalleryProps {
  /** The butterfly family name this gallery groups (e.g. "Papilionidae"). */
  family: string;
  /** Species belonging to this family. When empty, an EmptyState is shown. */
  species: KioskSpecies[];
  /** Optional callback when a species is tapped. */
  onSelectSpecies?: (species: KioskSpecies) => void;
}

/** Resolve the bilingual heading for a family, falling back to the raw name. */
function familyCaption(family: string): Caption {
  return FAMILY_LABELS[family] ?? { id: family, en: family };
}

/** A single inline, image-dominant species card (name caption below image). */
function SpeciesGalleryCard({
  species,
  onSelect,
}: {
  species: KioskSpecies;
  onSelect?: () => void;
}) {
  const name = species.commonName || species.scientificName || species.family;
  const photoUrl = species.topPhotoUrl || species.undersidePhotoUrl;

  return (
    <ClickableCard
      onClick={onSelect}
      ariaLabel={name}
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] border-2 border-white bg-white shadow-[0_8px_30px_rgba(30,51,40,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(30,51,40,0.08)]"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-kiosk-surface-tint">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-kiosk-green-300">
            <ImageOff className="h-10 w-10 opacity-30" aria-hidden="true" />
          </span>
        )}
      </div>
      <figcaption className="flex flex-col gap-1 p-5">
        <span className="font-serif text-[1.618rem] font-semibold leading-tight text-kiosk-ink">
          {name}
        </span>
        {species.scientificName && species.scientificName !== name ? (
          <span className="font-sans text-[0.8rem] font-bold uppercase tracking-widest text-kiosk-green-600">
            {species.scientificName}
          </span>
        ) : null}
      </figcaption>
    </ClickableCard>
  );
}

/** A family-grouped gallery grid with elegant headings and empty fallback. */
export default function FamilyGallery({ family, species, onSelectSpecies }: FamilyGalleryProps) {
  const { t } = useLang();
  const heading = familyCaption(family);

  return (
    <section className="flex flex-col gap-8">
      <header className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-kiosk-green-100 text-kiosk-green-700">
          <Tag className="h-5 w-5" strokeWidth={2} />
        </div>
        <h3 className="font-serif text-[2.618rem] text-kiosk-ink">{t(heading)}</h3>
        <span className="ml-2 rounded-full border border-kiosk-green-200 bg-kiosk-surface px-4 py-1.5 font-sans text-[1rem] font-bold text-kiosk-green-700 shadow-sm">
          {species.length} Spesies
        </span>
      </header>

      {species.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="grid grid-cols-2 gap-[1.618rem] sm:grid-cols-3 lg:grid-cols-4">
          {species.map((item) => (
            <li key={String(item.id)} className="list-none">
              <SpeciesGalleryCard species={item} onSelect={() => onSelectSpecies?.(item)} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
