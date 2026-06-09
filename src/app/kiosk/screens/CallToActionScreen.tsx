/**
 * CallToActionScreen — Screen 8 of the kiosk flow ("Ambil Peran Nyata" /
 * "Take Real Action").
 *
 * Presents the FIVE conservation actions as icon-led cards. On each card the
 * lucide icon is the DOMINANT visual element, paired with a short bilingual
 * {@link Caption} (Indonesian primary / English secondary):
 *   1. Tanam Masa Depan          (Plant the Future)        — Sprout
 *   2. Stop Pestisida            (Stop Pesticides)         — Ban
 *   3. Amati, Foto, Jangan Tangkap (Observe, Photograph…)  — Camera
 *   4. Jaga Kolam, Jaga Kupu-Kupu (Protect the Pool…)      — Droplets
 *   5. Scan & Learn              (Be a Citizen Scientist)  — QrCode
 *
 * Action content (icon name + bilingual title + supporting note) is sourced
 * from `content/i18n.ts` (`CALL_TO_ACTIONS`, `CALL_TO_ACTION_TITLE`,
 * `CALL_TO_ACTION_INTRO`) so copy stays out of the component. Styling uses
 * ONLY the bright-green kiosk design tokens (`text-kiosk-*`, `bg-kiosk-*`,
 * `border-kiosk-*`) — no raw hex and no legacy palette values.
 *
 * This is a purely presentational component (no client hooks), so it omits
 * the `'use client'` directive.
 *
 * Requirements: 13.1, 13.2
 */

import { Ban, Camera, Droplets, QrCode, Sprout, type LucideIcon } from 'lucide-react';
import { Caption } from '../components/Caption';
import {
  CALL_TO_ACTIONS,
  CALL_TO_ACTION_INTRO,
  CALL_TO_ACTION_TITLE,
} from '../content/i18n';
import { useLang } from '../i18n/language';

/**
 * Maps the lucide icon names declared in `CALL_TO_ACTIONS` to their concrete
 * icon components.
 */
const ACTION_ICONS: Record<string, LucideIcon> = {
  Sprout,
  Ban,
  Camera,
  Droplets,
  QrCode,
};

export default function CallToActionScreen() {
  const { t } = useLang();
  return (
    <section className="flex flex-col gap-8 p-8">
      {/* Single-language screen heading + short intro. */}
      <header className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-4xl font-extrabold leading-tight text-kiosk-ink">
          {t(CALL_TO_ACTION_TITLE)}
        </h2>
        <p className="max-w-3xl text-base text-kiosk-ink-muted">
          {t(CALL_TO_ACTION_INTRO)}
        </p>
      </header>

      {/* Five icon-led action cards. */}
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CALL_TO_ACTIONS.map((action) => {
          const Icon = ACTION_ICONS[action.icon] ?? Sprout;

          return (
            <li key={action.key} className="list-none">
              <article className="flex h-full flex-col items-center gap-4 rounded-3xl border border-kiosk-green-200 bg-kiosk-surface p-6 text-center shadow-sm">
                {/* Dominant icon element (Req 13.2). */}
                <span className="flex h-28 w-28 items-center justify-center rounded-full bg-kiosk-green-100 text-kiosk-green-700">
                  <Icon className="h-16 w-16" strokeWidth={1.75} aria-hidden="true" />
                </span>

                {/* Single-language caption. */}
                <Caption caption={action.title} size="md" align="center" />

                {/* Supporting note. */}
                <p className="text-sm leading-snug text-kiosk-ink-muted">
                  {t(action.note)}
                </p>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
