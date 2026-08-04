'use client';

/**
 * KioskImage - reusable image wrapper for the kiosk.
 *
 * Handles loading state, error fallback, and hover scale in one place.
 *
 * Two sizing modes:
 * - `fill` (default true): img uses `absolute inset-0` to fill its container.
 *   Container must be sized by the parent (e.g. `h-full w-full` or `aspect-square`).
 * - `fill=false`: img uses `relative` positioning and sizes the container via its
 *   natural aspect ratio. Use for logos/icons where `w-auto` should work.
 *
 * Requirements: 2.1, 6.6
 */

import { useState } from 'react';
import { ImageOff } from 'lucide-react';

export interface KioskImageProps {
  /** Image source URL. */
  src: string;
  /** Accessible alt text. */
  alt: string;
  /** Optional container className. */
  className?: string;
  /** Optional image className applied directly to the <img>. */
  imgClassName?: string;
  /** Whether the img should fill its container (absolute) or size it (relative). */
  fill?: boolean;
  /** Whether to enable the hover zoom effect. */
  hoverScale?: boolean;
  /** Loading strategy. */
  loading?: 'eager' | 'lazy';
  /** Called when the image fails to load. */
  onError?: () => void;
}

export default function KioskImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  fill = true,
  hoverScale = false,
  loading = 'lazy',
  onError,
}: KioskImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={`relative shrink-0 overflow-hidden ${
        // ponytail: non-fill mode holds a `relative`, max-constrained img, which
        // parks top-left in a block box — visibly off-centre for logos whose
        // aspect ratio differs from their card. Fill mode centres itself via
        // `absolute inset-0`, so it must NOT become a flex container.
        fill ? '' : 'flex items-center justify-center'
      } ${
        // ponytail: in fill mode the img is absolute, so an unsized wrapper
        // collapses to 0x0 and the image silently vanishes. Caller-supplied
        // sizing always wins; this is only the fallback.
        className || (fill ? 'h-full w-full' : '')
      }`}
    >
      {errored ? (
        <span className="absolute inset-0 flex items-center justify-center bg-kiosk-orange-50 text-kiosk-orange-300">
          <ImageOff className="h-10 w-10 opacity-40" aria-hidden="true" />
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => {
            setErrored(true);
            onError?.();
          }}
          className={`${
            // ponytail: max-* (not h-auto/w-auto) so the img scales DOWN into the
            // wrapper instead of rendering at natural size and being cropped.
            fill ? 'absolute inset-0 h-full w-full' : 'relative max-h-full max-w-full'
          } ${fill ? 'object-cover' : 'object-contain'} transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${hoverScale ? 'transition-transform duration-700 group-hover:scale-105' : ''} ${imgClassName}`}
        />
      )}
    </div>
  );
}
