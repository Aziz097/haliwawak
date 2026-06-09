/**
 * Curated species photo lookup.
 *
 * The delivered "Asset foto" package contains top + underside photos for the
 * documented butterfly species. Those files are organized under
 * `public/kiosk/species/<slug>-top.jpg` / `<slug>-under.jpg`.
 *
 * The kiosk's species API (`/api/kiosk/species`) may return records without
 * photo URLs, so this module enriches mapped species by matching on scientific
 * name (and sex, where the asset set distinguishes male/female) and fills in
 * `topPhotoUrl` / `undersidePhotoUrl` when they are missing. This guarantees
 * the delivered photos appear on the Virtual Insektarium and Data Spesies
 * screens regardless of what the database holds.
 */

import type { KioskSpecies } from '../lib/speciesMapping';

const BASE = '/kiosk/species';

/**
 * Known photo slugs. `under: false` marks species whose underside photo was
 * not part of the delivery (only a top view exists).
 */
const PHOTO_SLUGS: Record<string, { under: boolean }> = {
  'graphium-agamemnon': { under: true },
  'graphium-doson': { under: true },
  'graphium-sarpedon': { under: true },
  'papilio-demoleus': { under: true },
  'papilio-memnon': { under: true },
  'papilio-polytes': { under: true },
  'appias-olferna-jantan': { under: true },
  'appias-olferna-betina': { under: false },
  'delias-hyparete': { under: true },
  'eurema-blanda': { under: true },
  'catopsilia-pyranthe': { under: true },
  'leptosia-nina': { under: true },
  'acraea-terpsicore': { under: true },
  'junonia-orithya-jantan': { under: true },
  'junonia-orithya-betina': { under: true },
  'neptis-hylas': { under: true },
  'hypolimnas-missipus-jantan': { under: true },
  'hypolimnas-missipus-betina': { under: true },
  'doleschallia-bisaltide': { under: true },
  'euploea-leucostictos': { under: true },
  'hypolimnas-bolina-jantan': { under: true },
  'hypolimnas-bolina-betina': { under: true },
  'melanitis-leda': { under: true },
  'junonia-iphita': { under: true },
};

/** Scientific names whose photos are split by sex in the asset set. */
const SEXED = new Set([
  'appias olferna',
  'junonia orithya',
  'hypolimnas missipus',
  'hypolimnas bolina',
]);

/** Normalize a scientific name: drop parentheticals, lowercase, collapse spaces. */
function normalizeScientific(name: string): string {
  return name
    .replace(/\([^)]*\)/g, ' ')
    .toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Detect sex from any of the species text fields. */
function detectSex(...texts: string[]): 'jantan' | 'betina' | null {
  const blob = texts.join(' ').toLowerCase();
  if (/betina|female/.test(blob)) return 'betina';
  if (/jantan|male/.test(blob)) return 'jantan';
  return null;
}

/** Resolve the photo slug for a species, or null when no curated photo exists. */
export function resolvePhotoSlug(
  scientificName: string,
  commonName = '',
): string | null {
  const norm = normalizeScientific(scientificName);
  if (!norm) return null;

  if (SEXED.has(norm)) {
    const sex = detectSex(commonName, scientificName) ?? 'jantan';
    const slug = `${norm.replace(/\s+/g, '-')}-${sex}`;
    return slug in PHOTO_SLUGS ? slug : null;
  }

  const slug = norm.replace(/\s+/g, '-');
  return slug in PHOTO_SLUGS ? slug : null;
}

/**
 * Return a copy of the species with curated top/underside photos filled in.
 * Existing non-empty photo URLs on the record are preserved (DB wins); only
 * missing URLs are backfilled from the delivered asset set.
 */
export function withCuratedPhotos(species: KioskSpecies): KioskSpecies {
  const slug = resolvePhotoSlug(species.scientificName, species.commonName);
  if (!slug) return species;

  const meta = PHOTO_SLUGS[slug];
  const top = species.topPhotoUrl ?? `${BASE}/${slug}-top.jpg`;
  const underside =
    species.undersidePhotoUrl ?? (meta.under ? `${BASE}/${slug}-under.jpg` : null);

  return { ...species, topPhotoUrl: top, undersidePhotoUrl: underside };
}

/** Enrich a list of species with curated photos. */
export function enrichSpeciesPhotos(list: KioskSpecies[]): KioskSpecies[] {
  return list.map(withCuratedPhotos);
}
