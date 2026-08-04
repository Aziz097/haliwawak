/**
 * Scientific-name emphasis for kiosk copy.
 *
 * Binomial names (`Eurema blanda`) and genus names (`Junonia`) must be set in
 * italics, but kiosk copy lives in flat bilingual `Caption` strings that many
 * components render as `{t(caption)}`. Rather than widen `Caption` to accept
 * ReactNode — which would ripple through every screen and its types — copy
 * marks the names inline with underscores:
 *
 *   'Spesies: _Eurema blanda_, _Catopsilia pyranthe_ (Famili Pieridae).'
 *
 * and render sites call `sci(t(caption))` instead of `t(caption)`.
 *
 * Nomenclature rule the copy must follow: genus capitalised, specific epithet
 * lowercase, both italic — `Eurema blanda`, never `Eurema Blanda`.
 */

import type { ReactNode } from 'react';

/** Splits on `_…_` markers and italicises the marked spans. */
export function sci(text: string): ReactNode {
  // Capturing group keeps the delimiters' contents in the split output.
  const parts = text.split(/(_[^_]+_)/g);

  // Fast path: no markers, hand back the plain string so React skips the array.
  if (parts.length === 1) return text;

  return parts.map((part, i) =>
    part.length > 2 && part.startsWith('_') && part.endsWith('_') ? (
      <em key={i} className="italic">
        {part.slice(1, -1)}
      </em>
    ) : (
      part
    ),
  );
}
