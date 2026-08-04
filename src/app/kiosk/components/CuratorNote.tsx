'use client';

/**
 * CuratorNote - the attribution panel that names where a screen's findings
 * came from. Used by the screens whose content is survey data (Ekosistem,
 * Virtual Insektarium), so both render it identically.
 */

import { Sparkles } from 'lucide-react';

import type { Caption } from '../content/i18n';
import { useLang } from '../i18n/language';

export interface CuratorNoteProps {
  /** The attribution sentence. */
  body: Caption;
}

export default function CuratorNote({ body }: CuratorNoteProps) {
  const { t, lang } = useLang();

  return (
    <div className="flex max-w-[46ch] items-start gap-3 rounded-2xl border border-kiosk-orange-200 bg-kiosk-orange-50 p-[clamp(0.75rem,1.4vh,1.1rem)] text-left shadow-sm">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-kiosk-orange-100 text-kiosk-orange-700">
        <Sparkles className="h-5 w-5" aria-hidden="true" />
      </div>
      <p className="font-sans text-[clamp(0.9rem,0.95vw,1.1rem)] leading-relaxed text-kiosk-ink-muted">
        <span className="block font-bold text-kiosk-ink">
          {lang === 'id' ? 'Catatan Kurator' : "Curator's Note"}
        </span>
        {t(body)}
      </p>
    </div>
  );
}
