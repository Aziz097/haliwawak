/**
 * LoadingIndicator - bilingual loading message with a spinner.
 *
 * Shown by species-dependent screens (Virtual Insektarium, Data Spesies) while
 * the species data request is in flight (Req 16.2). Renders a spinning lucide
 * icon plus an Indonesian-primary / English-secondary caption.
 *
 * Uses only the bright-green kiosk design tokens (no raw hex / legacy colors).
 *
 * Requirements: 16.2
 */

import { Loader2 } from 'lucide-react';
import { LOADING_MESSAGE, type Caption } from '../content/i18n';
import { useLang } from '../i18n/language';

export interface LoadingIndicatorProps {
  /** Bilingual message to display. Defaults to the shared loading caption. */
  caption?: Caption;
}

/** Bilingual loading block with an animated spinner (single language). */
export default function LoadingIndicator({
  caption = LOADING_MESSAGE,
}: LoadingIndicatorProps) {
  const { t } = useLang();
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-4 px-8 py-12 text-center"
    >
      <Loader2
        className="h-12 w-12 animate-spin text-kiosk-green-600"
        aria-hidden="true"
      />
      <p className="text-xl font-semibold text-kiosk-ink">{t(caption)}</p>
    </div>
  );
}
