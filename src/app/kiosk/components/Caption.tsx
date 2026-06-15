'use client';

/**
 * Presentational caption renderer - SINGLE language.
 *
 * Renders a bilingual {@link Caption} value as one line in the active kiosk
 * language (default Indonesian), resolved via {@link useLang}. The optional
 * `subtitle` caption renders a secondary muted line (also single-language).
 *
 * Designed for the "Bright Organic Heritage" aesthetic:
 * Uses golden ratio scaling for typography, blending elegant serif for primary
 * and clean sans-serif for secondary.
 */

import type { Caption as CaptionType } from '../content/i18n';
import { useLang } from '../i18n/language';

export type CaptionSize = 'sm' | 'md' | 'lg';

export interface CaptionProps {
  /** The bilingual caption to render in the active language. */
  caption: CaptionType;
  /** Optional secondary caption (muted), also single-language. */
  subtitle?: CaptionType;
  /** Visual size (defaults to `'md'`). */
  size?: CaptionSize;
  /** Center the text (defaults to inheriting). */
  align?: 'left' | 'center';
}

const PRIMARY_SIZE: Record<CaptionSize, string> = {
  sm: 'font-sans text-[1rem] font-bold tracking-wide uppercase',
  md: 'font-serif text-[1.618rem] font-medium leading-tight',
  lg: 'font-serif text-[2.618rem] font-medium leading-none',
};

const SECONDARY_SIZE: Record<CaptionSize, string> = {
  sm: 'font-sans text-[0.7rem] font-medium tracking-widest uppercase',
  md: 'font-sans text-[1rem] font-medium leading-relaxed',
  lg: 'font-sans text-[1.618rem] font-medium leading-relaxed italic',
};

export function Caption({ caption, subtitle, size = 'md', align }: CaptionProps) {
  const { t } = useLang();
  const alignCls = align === 'center' ? 'items-center text-center' : '';

  return (
    <div className={`flex flex-col gap-2 ${alignCls}`}>
      <p className={`text-kiosk-ink ${PRIMARY_SIZE[size]}`}>
        {t(caption)}
      </p>
      {subtitle && (
        <p className={`text-kiosk-ink-muted ${SECONDARY_SIZE[size]}`}>
          {t(subtitle)}
        </p>
      )}
    </div>
  );
}

export default Caption;
