/**
 * Species mapping & grouping for the kiosk.
 *
 * Converts raw `species` rows from the database (see `src/db/schema.ts`) - or
 * static fallback entries shaped like them - into the `KioskSpecies` view model
 * the kiosk screens consume, and groups a list of species by family for the
 * Virtual Insektarium galleries.
 *
 * Requirements: 8.1, 14.2, 14.3, 14.4
 */

/**
 * The kiosk view model for a single species.
 *
 * - `topPhotoUrl` is the "top view" photo (mapped from `primaryPhotoUrl`).
 * - `undersidePhotoUrl` is the "underside view" photo (first gallery entry).
 * - `iucnStatus` preserves a null/empty source value as `null` so the UI can
 *   render a neutral placeholder (Req 14.4).
 * - `genus` is derived from the species record when present, otherwise from the
 *   first whitespace-delimited token of the scientific name.
 */
export type KioskSpecies = {
  id: number | string;
  commonName: string;
  scientificName: string;
  family: string;
  genus: string;
  iucnStatus: string | null;
  topPhotoUrl: string | null;
  undersidePhotoUrl: string | null;
  galleryUrls: string[];
};

/**
 * The subset of a DB species row (or fallback entry) this mapper reads.
 * Fields are intentionally permissive because the source can be a raw DB row,
 * a JSON payload from the API, or a hand-authored fallback entry.
 */
export type SpeciesRowInput = {
  id?: number | string | null;
  commonName?: unknown;
  scientificName?: unknown;
  family?: unknown;
  genus?: unknown;
  iucnStatus?: unknown;
  primaryPhotoUrl?: unknown;
  galleryUrls?: unknown;
  [key: string]: unknown;
};

/** Coerce an unknown value into a trimmed string, or `''` when not stringable. */
function toStr(value: unknown): string {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return '';
}

/** Coerce an unknown value into a non-empty string, or `null` otherwise. */
function toNullableStr(value: unknown): string | null {
  const s = toStr(value);
  return s.length > 0 ? s : null;
}

/**
 * Normalize an unknown `galleryUrls` input into a `string[]`.
 *
 * The DB column is `jsonb` (default `'[]'`), so at runtime the value may already
 * be an array, or - defensively - a JSON-encoded string, or null/undefined.
 * Non-string entries are dropped and empty strings are filtered out.
 */
export function normalizeGalleryUrls(input: unknown): string[] {
  let arr: unknown = input;

  // Defensively parse a JSON-encoded array string (e.g. raw jsonb text).
  if (typeof arr === 'string') {
    const trimmed = arr.trim();
    if (trimmed.length === 0) return [];
    try {
      arr = JSON.parse(trimmed);
    } catch {
      return [];
    }
  }

  if (!Array.isArray(arr)) return [];

  return arr
    .map((entry) => toStr(entry))
    .filter((url) => url.length > 0);
}

/** Derive the genus from the first whitespace token of a scientific name. */
function deriveGenus(scientificName: string): string {
  const trimmed = scientificName.trim();
  if (trimmed.length === 0) return '';
  return trimmed.split(/\s+/)[0];
}

/**
 * Map a DB species row (or fallback entry) into the kiosk view model.
 *
 * - `genus`: taken from the record when present, else the first token of
 *   `scientificName`.
 * - `topPhotoUrl`: `primaryPhotoUrl ?? null`.
 * - `undersidePhotoUrl`: first `galleryUrls` entry, else `null`.
 * - `iucnStatus`: null/empty source preserved as `null`.
 */
export function mapSpeciesRow(row: SpeciesRowInput): KioskSpecies {
  const scientificName = toStr(row.scientificName);
  const galleryUrls = normalizeGalleryUrls(row.galleryUrls);

  const explicitGenus = toStr(row.genus);
  const genus = explicitGenus.length > 0 ? explicitGenus : deriveGenus(scientificName);

  const topPhotoUrl = toNullableStr(row.primaryPhotoUrl);
  const undersidePhotoUrl = galleryUrls.length > 0 ? galleryUrls[0] : null;

  return {
    id: row.id ?? '',
    commonName: toStr(row.commonName),
    scientificName,
    family: toStr(row.family),
    genus,
    iucnStatus: toNullableStr(row.iucnStatus),
    topPhotoUrl,
    undersidePhotoUrl,
    galleryUrls,
  };
}

/**
 * Group species by family.
 *
 * For each requested family, returns exactly the species whose normalized
 * family matches it (case-insensitive, trimmed). The returned record's keys are
 * the requested family names exactly as provided. Families with no matches map
 * to an empty array so callers can render an empty state.
 *
 * Requirements: 8.1
 */
export function groupByFamily(
  list: KioskSpecies[],
  families: string[]
): Record<string, KioskSpecies[]> {
  const result: Record<string, KioskSpecies[]> = {};

  for (const family of families) {
    const target = family.trim().toLowerCase();
    result[family] = list.filter(
      (species) => species.family.trim().toLowerCase() === target
    );
  }

  return result;
}
