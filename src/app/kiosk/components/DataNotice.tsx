/**
 * DataNotice - bilingual, NON-BLOCKING notice banner for the kiosk.
 *
 * Surfaced when the kiosk falls back to the static species list after a data
 * request failure. It informs without blocking: the current screen and its
 * content remain fully usable (Req 16.5). Renders a lucide info icon plus an
 * Indonesian-primary / English-secondary caption.
 *
 * Uses only the bright-green kiosk design tokens (no raw hex / legacy colors).
 *
 * Requirements: 16.5
 */

import { Info } from 'lucide-react';
import { DATA_NOTICE, type Caption } from '../content/i18n';
import { useLang } from '../i18n/language';

export interface DataNoticeProps {
  /** Bilingual notice message. Defaults to the shared fallback-data notice. */
  caption?: Caption;
}

/** Bilingual non-blocking notice banner (single language). */
export default function DataNotice({ caption = DATA_NOTICE }: DataNoticeProps) {
  const { t } = useLang();
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center gap-3 rounded-xl border border-kiosk-green-300 bg-kiosk-green-100 px-4 py-3 text-left"
    >
      <Info
        className="h-6 w-6 shrink-0 text-kiosk-green-700"
        aria-hidden="true"
      />
      <p className="text-base font-semibold text-kiosk-ink">{t(caption)}</p>
    </div>
  );
}
