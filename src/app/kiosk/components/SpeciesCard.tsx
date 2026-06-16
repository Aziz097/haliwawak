'use client';

/**
 * SpeciesCard - image-dominant card for a single butterfly species.
 *
 * Renders the species' top-view photo as the dominant element (with a
 * token-colored placeholder icon when the photo is missing), a bilingual-style
 * name caption (common name primary, scientific name secondary), and an IUCN
 * conservation-status badge.
 *
 * The IUCN badge maps known status labels to the `kiosk-iucn-*` design tokens.
 * When the status is null/empty, a NEUTRAL placeholder badge ("N/A") is shown
 * using the `kiosk-iucn-na` token color (Req 14.4).
 *
 * Uses only the bright-green kiosk design tokens (no raw hex / legacy colors).
 * The photo uses a plain <img loading="lazy" /> per the kiosk image strategy.
 *
 * Requirements: 8.4, 14.3, 14.4
 */

import { ImageOff } from 'lucide-react';
import type { KioskSpecies } from '../lib/speciesMapping';

export interface SpeciesCardProps {
  /** The species view model to render. */
  species: KioskSpecies;
  /** Optional selection handler invoked when the card is activated. */
  onSelect?: (species: KioskSpecies) => void;
}

/** A resolved IUCN badge: a short abbreviation + its token background class. */
interface IucnBadge {
  /** Short code shown in the badge (e.g. "LC", "EN", "N/A"). */
  abbr: string;
  /** Full status label for the accessible/title text. */
  label: string;
  /** Static Tailwind background class bound to a `kiosk-iucn-*` token. */
  bgClass: string;
}

/**
 * Mapping from a normalized IUCN status label to its abbreviation and the
 * matching `kiosk-iucn-*` token background class. Keys are lowercase, trimmed.
 * Abbreviations are accepted as keys too so already-abbreviated inputs map.
 *
 * Class strings are written in full (not constructed) so Tailwind can detect
 * them at build time.
 */
const IUCN_MAP: Record<string, IucnBadge> = {
  'least concern': { abbr: 'LC', label: 'Least Concern', bgClass: 'bg-kiosk-iucn-lc' },
  lc: { abbr: 'LC', label: 'Least Concern', bgClass: 'bg-kiosk-iucn-lc' },
  'near threatened': { abbr: 'NT', label: 'Near Threatened', bgClass: 'bg-kiosk-iucn-nt' },
  nt: { abbr: 'NT', label: 'Near Threatened', bgClass: 'bg-kiosk-iucn-nt' },
  vulnerable: { abbr: 'VU', label: 'Vulnerable', bgClass: 'bg-kiosk-iucn-vu' },
  vu: { abbr: 'VU', label: 'Vulnerable', bgClass: 'bg-kiosk-iucn-vu' },
  endangered: { abbr: 'EN', label: 'Endangered', bgClass: 'bg-kiosk-iucn-en' },
  en: { abbr: 'EN', label: 'Endangered', bgClass: 'bg-kiosk-iucn-en' },
  'critically endangered': { abbr: 'CR', label: 'Critically Endangered', bgClass: 'bg-kiosk-iucn-cr' },
  cr: { abbr: 'CR', label: 'Critically Endangered', bgClass: 'bg-kiosk-iucn-cr' },
};

/** The neutral placeholder badge used when no IUCN status is available. */
const IUCN_NEUTRAL: IucnBadge = {
  abbr: 'N/A',
  label: 'Tidak Ada Data / Not Assessed',
  bgClass: 'bg-kiosk-iucn-na',
};

/** Resolve an IUCN status string to a badge, falling back to the neutral one. */
function resolveIucnBadge(status: string | null): IucnBadge {
  const key = (status ?? '').trim().toLowerCase();
  if (key.length === 0) return IUCN_NEUTRAL;
  return IUCN_MAP[key] ?? { abbr: status!.trim(), label: status!.trim(), bgClass: 'bg-kiosk-iucn-na' };
}

/** Image-dominant species card with name caption and IUCN badge. */
export default function SpeciesCard({ species, onSelect }: SpeciesCardProps) {
  const name = species.commonName || species.scientificName || species.family;
  const badge = resolveIucnBadge(species.iucnStatus);
  const interactive = typeof onSelect === 'function';

  const content = (
    <>
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
            <ImageOff className="h-12 w-12" aria-hidden="true" />
          </span>
        )}

        {/* IUCN status badge */}
        <span
          title={badge.label}
          className={`absolute right-2 top-2 rounded-lg px-2.5 py-1 text-xs font-bold text-kiosk-on-green shadow-sm ${badge.bgClass}`}
        >
          {badge.abbr}
        </span>
      </div>

      <figcaption className="flex flex-col gap-0.5 px-3 py-3 text-left">
        <span className="text-base font-semibold italic leading-tight text-kiosk-ink">
          {name}
        </span>
        {species.scientificName && species.scientificName !== name ? (
          <span className="text-sm italic leading-tight text-kiosk-ink-muted">
            {species.scientificName}
          </span>
        ) : null}
      </figcaption>
    </>
  );

  const frameClass =
    'flex w-full flex-col overflow-hidden rounded-2xl border border-kiosk-green-200 bg-kiosk-surface shadow-sm';

  if (interactive) {
    return (
      <button
        type="button"
        onClick={() => onSelect?.(species)}
        aria-label={`${name} - ${badge.label}`}
        className={`${frameClass} text-left transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-4 focus-visible:outline-kiosk-green-300`}
      >
        {content}
      </button>
    );
  }

  return <figure className={frameClass}>{content}</figure>;
}
