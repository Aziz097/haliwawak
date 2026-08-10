/**
 * SpeciesPhotoPair - renders both the top-view and underside-view photos of a
 * species side by side, each under a bilingual label ("Tampak Atas / Top" and
 * "Tampak Bawah / Underside").
 *
 * Both views are always rendered: when a photo is present it is shown via the
 * shared <KioskImage /> component (loading skeleton + error fallback); when a
 * photo is missing a token-colored placeholder icon is shown in its place so the
 * pairing layout is preserved (Req 14.3).
 *
 * Uses only the bright-orange kiosk design tokens (no raw hex / legacy colors).
 *
 * Requirements: 14.3
 */

import { ImageOff } from 'lucide-react';
import { useLang } from '../language';
import KioskImage from './KioskImage';

export interface SpeciesPhotoPairProps {
  /** Top-view photo URL (mapped from `primaryPhotoUrl`). */
  top?: string | null;
  /** Underside-view photo URL (first gallery entry). */
  underside?: string | null;
  /** Accessible description used as the base alt text for both photos. */
  alt?: string;
}

interface PhotoViewProps {
  /** The photo URL, or null/undefined when missing. */
  url?: string | null;
  /** Single-language label for this view. */
  label: string;
  /** Alt text for the rendered photo. */
  alt: string;
}

/** A single labeled photo view with a placeholder fallback when missing. */
function PhotoView({ url, label, alt }: PhotoViewProps) {
  return (
    <figure className="flex flex-col overflow-hidden rounded-2xl border border-kiosk-orange-200 bg-kiosk-surface shadow-sm">
      <div className="relative aspect-square w-full overflow-hidden bg-kiosk-orange-100">
        {url ? (
          <KioskImage
            src={url}
            alt={alt}
            className="h-full w-full"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-kiosk-orange-400">
            <ImageOff className="h-12 w-12" aria-hidden="true" />
          </span>
        )}
      </div>
      <figcaption className="px-3 py-2 text-center text-sm font-semibold leading-tight text-kiosk-ink">
        {label}
      </figcaption>
    </figure>
  );
}

/** Renders the top-view and underside-view photos as a labeled pair. */
export default function SpeciesPhotoPair({
  top,
  underside,
  alt = 'Foto spesies',
}: SpeciesPhotoPairProps) {
  const { lang } = useLang();
  const topLabel = lang === 'id' ? 'Tampak Atas' : 'Top View';
  const underLabel = lang === 'id' ? 'Tampak Bawah' : 'Underside';

  return (
    <div className="grid grid-cols-2 gap-4">
      <PhotoView url={top} label={topLabel} alt={`${alt} - ${topLabel}`} />
      <PhotoView url={underside} label={underLabel} alt={`${alt} - ${underLabel}`} />
    </div>
  );
}
