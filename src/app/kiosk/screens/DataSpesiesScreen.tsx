/**
 * DataSpesiesScreen — Screen 9 of the kiosk flow ("Data Spesies" /
 * "Species Data").
 *
 * Renders a scrollable grid of species records. For each record the screen
 * surfaces the taxonomic fields the data table requires — family, genus,
 * species name (common + scientific), and IUCN status — alongside the species
 * photos (Req 14.1, 14.2):
 *
 *   - When a record has BOTH a top-view and an underside-view photo, the photos
 *     are rendered via {@link SpeciesPhotoPair} (Req 14.3).
 *   - Otherwise the single available photo is shown (top preferred, then
 *     underside), or a token-colored placeholder when no photo exists.
 *
 * The IUCN cell reuses the same neutral-token approach as `SpeciesCard`: a
 * known status maps to its `kiosk-iucn-*` token, while a null/empty status
 * renders a NEUTRAL "N/A" placeholder using `kiosk-iucn-na` rather than an
 * empty value (Req 14.4).
 *
 * When the species list is empty, a bilingual {@link EmptyState} is shown
 * instead of a blank grid (Req 14.5).
 *
 * A bilingual screen heading (Indonesian primary / English secondary) sits at
 * the top. Styling uses ONLY the bright-green kiosk design tokens
 * (`text-kiosk-*`, `bg-kiosk-*`, `border-kiosk-*`) — no raw hex and no legacy
 * palette values. The grid is static (no client hooks), so this component omits
 * the `'use client'` directive; all photos use plain <img loading="lazy" />.
 *
 * Requirements: 14.1, 14.2, 14.3, 14.4, 14.5
 */

import { ImageOff } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import SpeciesPhotoPair from '../components/SpeciesPhotoPair';
import { DATA_SPESIES_COLUMNS, DATA_SPESIES_TITLE } from '../content/i18n';
import type { KioskSpecies } from '../lib/speciesMapping';
import { useLang } from '../i18n/language';

export interface DataSpesiesScreenProps {
  /** The full list of kiosk species to display in the data grid. */
  species: KioskSpecies[];
}

/** A resolved IUCN badge: a short label + its token background class. */
interface IucnBadge {
  /** Short code/label shown in the cell (e.g. "LC", "EN", "N/A"). */
  label: string;
  /** Full status title used for the accessible/title text. */
  title: string;
  /** Static Tailwind background class bound to a `kiosk-iucn-*` token. */
  bgClass: string;
}

/**
 * Mapping from a normalized IUCN status label (lowercase, trimmed) to its
 * abbreviation and matching `kiosk-iucn-*` token background class. Class
 * strings are written in full so Tailwind can detect them at build time.
 */
const IUCN_MAP: Record<string, IucnBadge> = {
  'least concern': { label: 'LC', title: 'Least Concern', bgClass: 'bg-kiosk-iucn-lc' },
  lc: { label: 'LC', title: 'Least Concern', bgClass: 'bg-kiosk-iucn-lc' },
  'near threatened': { label: 'NT', title: 'Near Threatened', bgClass: 'bg-kiosk-iucn-nt' },
  nt: { label: 'NT', title: 'Near Threatened', bgClass: 'bg-kiosk-iucn-nt' },
  vulnerable: { label: 'VU', title: 'Vulnerable', bgClass: 'bg-kiosk-iucn-vu' },
  vu: { label: 'VU', title: 'Vulnerable', bgClass: 'bg-kiosk-iucn-vu' },
  endangered: { label: 'EN', title: 'Endangered', bgClass: 'bg-kiosk-iucn-en' },
  en: { label: 'EN', title: 'Endangered', bgClass: 'bg-kiosk-iucn-en' },
  'critically endangered': { label: 'CR', title: 'Critically Endangered', bgClass: 'bg-kiosk-iucn-cr' },
  cr: { label: 'CR', title: 'Critically Endangered', bgClass: 'bg-kiosk-iucn-cr' },
};

/**
 * The NEUTRAL placeholder badge shown when no IUCN status is available — the
 * same neutral-token approach used by `SpeciesCard` (Req 14.4).
 */
const IUCN_NEUTRAL: IucnBadge = {
  label: 'N/A',
  title: 'Tidak Ada Data / Not Assessed',
  bgClass: 'bg-kiosk-iucn-na',
};

/** Resolve an IUCN status string to a badge, falling back to the neutral one. */
function resolveIucnBadge(status: string | null): IucnBadge {
  const key = (status ?? '').trim().toLowerCase();
  if (key.length === 0) return IUCN_NEUTRAL;
  return IUCN_MAP[key] ?? { label: status!.trim(), title: status!.trim(), bgClass: 'bg-kiosk-iucn-na' };
}

/** A small labeled taxonomic field (single-language column label + value). */
function TaxonField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs font-semibold uppercase tracking-wide text-kiosk-green-700">
        {label}
      </dt>
      <dd className="text-base font-medium text-kiosk-ink">{value || '—'}</dd>
    </div>
  );
}

/** A single species record rendered as a photo + taxonomic-fields card. */
function SpeciesRecord({ species }: { species: KioskSpecies }) {
  const { t } = useLang();
  const name = species.commonName || species.scientificName || species.family;
  const badge = resolveIucnBadge(species.iucnStatus);

  const hasBothPhotos = Boolean(species.topPhotoUrl) && Boolean(species.undersidePhotoUrl);
  const singlePhoto = species.topPhotoUrl ?? species.undersidePhotoUrl ?? null;

  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-kiosk-green-200 bg-kiosk-surface p-5 shadow-sm">
      {/* Photos: both views as a pair, otherwise the single available photo or
          a token-colored placeholder (Req 14.3). */}
      {hasBothPhotos ? (
        <SpeciesPhotoPair
          top={species.topPhotoUrl}
          underside={species.undersidePhotoUrl}
          alt={name}
        />
      ) : (
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-kiosk-green-200 bg-kiosk-green-100">
          {singlePhoto ? (
            <img
              src={singlePhoto}
              alt={name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-kiosk-green-400">
              <ImageOff className="h-12 w-12" aria-hidden="true" />
            </span>
          )}
        </div>
      )}

      {/* Taxonomic fields: family, genus, species name (Req 14.2). */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
        <TaxonField label={t(DATA_SPESIES_COLUMNS.family)} value={species.family} />
        <TaxonField label={t(DATA_SPESIES_COLUMNS.genus)} value={species.genus} />
        <div className="col-span-2 flex flex-col gap-0.5">
          <dt className="text-xs font-semibold uppercase tracking-wide text-kiosk-green-700">
            {t(DATA_SPESIES_COLUMNS.species)}
          </dt>
          <dd className="flex flex-col leading-tight">
            <span className="text-lg font-semibold text-kiosk-ink">{name}</span>
            {species.scientificName && species.scientificName !== name ? (
              <span className="text-sm italic text-kiosk-ink-muted">{species.scientificName}</span>
            ) : null}
          </dd>
        </div>
      </dl>

      {/* IUCN status with neutral placeholder when absent (Req 14.4). */}
      <div className="flex items-center gap-3 border-t border-kiosk-green-100 pt-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-kiosk-green-700">
          {t(DATA_SPESIES_COLUMNS.iucn)}
        </span>
        <span
          title={badge.title}
          className={`ml-auto rounded-lg px-3 py-1 text-sm font-bold text-kiosk-on-green shadow-sm ${badge.bgClass}`}
        >
          {badge.label}
        </span>
      </div>
    </article>
  );
}

/**
 * The Data Spesies screen: a single-language heading plus a scrollable grid of
 * species records, or an empty state when there is no data.
 */
export default function DataSpesiesScreen({ species }: DataSpesiesScreenProps) {
  const { t } = useLang();
  return (
    <section className="flex flex-col gap-8 p-8">
      {/* Single-language screen heading. */}
      <header className="flex flex-col gap-2">
        <h2 className="text-4xl font-extrabold leading-tight text-kiosk-ink">
          {t(DATA_SPESIES_TITLE)}
        </h2>
      </header>

      {species.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {species.map((record) => (
            <SpeciesRecord key={record.id} species={record} />
          ))}
        </div>
      )}
    </section>
  );
}
