'use client';

/**
 * ScreenHeader - the one header every kiosk screen uses.
 *
 * Screens used to hand-roll their own heading markup, which drifted: the
 * Virtual Insektarium title rendered at 4.236rem against 2.618rem elsewhere,
 * and several screens carried no intro sentence at all. Owning the format here
 * means the eyebrow chip, title size and intro line can only be consistent.
 *
 * Layout: eyebrow chip, then the title, then a one-sentence intro directly
 * beneath it. `aside` is an optional right-hand slot for a curator's note.
 *
 * Type is viewport-scaled (`clamp`) so it stays legible at kiosk viewing
 * distance without overflowing smaller panels.
 */

import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import type { Caption } from '../content/i18n';
import { useLang } from '../language';
import { FadeUp } from './ScreenEntrance';

export interface ScreenHeaderProps {
  /** Small icon shown inside the eyebrow chip. */
  icon: LucideIcon;
  /** Short kicker above the title (e.g. "Mata Air Suci"). */
  eyebrow: Caption;
  /** The screen title. */
  title: Caption;
  /** One sentence describing the screen, always rendered under the title. */
  description: Caption;
  /** Optional right-hand slot, e.g. a curator's note panel. */
  aside?: ReactNode;
}

export default function ScreenHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
  aside,
}: ScreenHeaderProps) {
  const { t } = useLang();

  return (
    <FadeUp>
      <header className="flex flex-wrap items-end justify-between gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-2 border-b border-kiosk-orange-200 pb-[clamp(0.5rem,1.3vh,1rem)]">
        <div className="flex max-w-[60ch] flex-col gap-2">
          <span className="inline-flex w-max items-center gap-2 rounded-full border border-kiosk-orange-300 bg-kiosk-orange-100 px-4 py-1.5 font-sans text-[clamp(0.75rem,0.85vw,0.95rem)] font-bold uppercase tracking-[0.2em] text-kiosk-orange-700">
            <Icon className="h-4 w-4" aria-hidden="true" />
            {t(eyebrow)}
          </span>

          <h2 className="font-serif text-[clamp(1.75rem,2.6vw,2.75rem)] font-medium leading-tight text-kiosk-ink">
            {t(title)}
          </h2>

          <p className="font-sans text-[clamp(1rem,1.1vw,1.25rem)] leading-relaxed text-kiosk-ink-muted">
            {t(description)}
          </p>
        </div>

        {aside}
      </header>
    </FadeUp>
  );
}
