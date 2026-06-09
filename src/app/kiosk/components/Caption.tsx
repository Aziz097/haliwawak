'use client';

/**
 * Presentational caption renderer — SINGLE language.
 *
 * Renders a bilingual {@link Caption} value as one line in the active kiosk
 * language (default Indonesian), resolved via {@link useLang}. The optional
 * `subtitle` caption renders a secondary muted line (also single-language).
 *
 * Styling uses ONLY the bright-green kiosk design tokens.
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
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-3xl',
};

const SECONDARY_SIZE: Record<CaptionSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-lg',
};

export function Caption({ caption, subtitle, size = 'md', align }: CaptionProps) {
  const { t } = useLang();
  const alignCls = align === 'center' ? 'items-center text-center' : '';

  return (
    <div className={`flex flex-col gap-0.5 ${alignCls}`}>
      <p className={`font-bold leading-tight text-kiosk-ink ${PRIMARY_SIZE[size]}`}>
        {t(caption)}
      </p>
      {subtitle && (
        <p className={`font-medium leading-snug text-kiosk-ink-muted ${SECONDARY_SIZE[size]}`}>
          {t(subtitle)}
        </p>
      )}
    </div>
  );
}

export default Caption;
