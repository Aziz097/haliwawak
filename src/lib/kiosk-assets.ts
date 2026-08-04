/**
 * Normalises stored kiosk asset URLs to their delivered WebP form.
 *
 * The kiosk photo set was converted to WebP and the original .jpg/.png files
 * removed, but `species.primary_photo_url` rows written before that still carry
 * the old extensions and would 404. Normalising on read keeps every consumer
 * working without a data migration.
 *
 * Only `/kiosk/` paths are rewritten — uploaded media (`/uploads/…`) and
 * external URLs are returned exactly as stored, since those files are
 * untouched and may legitimately be JPEG or PNG.
 *
 * The database remains the stale copy; this is a read-side shim, not a fix for
 * the data itself.
 */

/** Rewrites a `/kiosk/` .jpg/.png URL to .webp; passes everything else through. */
export function toKioskWebp<T extends string | null | undefined>(url: T): T {
  return (
    typeof url === 'string' && url.startsWith('/kiosk/')
      ? url.replace(/\.(jpe?g|png)$/i, '.webp')
      : url
  ) as T;
}

/** Applies {@link toKioskWebp} to a row's photo column. */
export function withWebpPhotos<T extends { primaryPhotoUrl?: string | null }>(row: T): T {
  return { ...row, primaryPhotoUrl: toKioskWebp(row.primaryPhotoUrl) };
}
