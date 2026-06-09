/**
 * EmptyState — bilingual empty-state message for the kiosk.
 *
 * Shown when a list/group has no data to display (e.g. an empty family group
 * in the Virtual Insektarium, or an empty species list on Data Spesies).
 * Renders a lucide icon plus an Indonesian-primary / English-secondary caption.
 *
 * Uses only the bright-green kiosk design tokens (no raw hex / legacy colors).
 *
 * Requirements: 8.5, 14.5
 */

import { Inbox } from 'lucide-react';
import { EMPTY_STATE, type Caption } from '../content/i18n';
import { useLang } from '../i18n/language';

export interface EmptyStateProps {
  /** Bilingual message to display. Defaults to the shared empty-state caption. */
  caption?: Caption;
}

/** Bilingual empty-state block with icon (single language). */
export default function EmptyState({ caption = EMPTY_STATE }: EmptyStateProps) {
  const { t } = useLang();
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-kiosk-green-200 bg-kiosk-surface-tint px-8 py-12 text-center"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-kiosk-green-100 text-kiosk-green-600">
        <Inbox className="h-8 w-8" aria-hidden="true" />
      </span>
      <p className="text-xl font-semibold text-kiosk-ink">{t(caption)}</p>
    </div>
  );
}
