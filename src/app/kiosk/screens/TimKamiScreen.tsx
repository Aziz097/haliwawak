/**
 * TimKamiScreen — Screen 10 of the kiosk flow ("Tim Kami & Mitra" /
 * "Our Team & Partners").
 *
 * The team & credits screen. It presents, in order:
 *   1. A bilingual heading + program framing caption (Req 15.1).
 *   2. The research team grouped by role — Ketua (Principal Investigator),
 *      Anggota (Members), Anggota Mahasiswa (Student Members) and Tim Ahli
 *      Eksternal (External Expert) — each with name, affiliation and a
 *      bilingual role label (Req 15.1).
 *   3. The funding acknowledgement (DPPM, Risbang, Kemdiktisaintek) with the
 *      master and derivative contract numbers (Req 15.2, 15.3).
 *   4. ITERA institutional attribution + a program logo row (Req 15.4).
 *
 * All copy and structured data come from `content/i18n.ts`
 * (`TIM_KAMI_TITLE`, `TIM_KAMI_PROGRAM`, `TEAM_MEMBERS`, `FUNDING_LABEL`,
 * `CONTRACTS`, `ITERA_ATTRIBUTION`) so it stays out of the component.
 *
 * Logos/images are rendered with a plain `<img />` (the kiosk uses
 * unoptimized native images). Styling uses ONLY the bright-green kiosk
 * design tokens (`text-kiosk-*`, `bg-kiosk-*`, `border-kiosk-*`) — no raw
 * hex and no legacy palette values.
 *
 * This is a purely presentational component (no client hooks), so it omits
 * the `'use client'` directive.
 *
 * Requirements: 15.1, 15.2, 15.3, 15.4
 */

import { Building2, HandCoins, ScrollText } from 'lucide-react';
import { Caption } from '../components/Caption';
import { KIOSK_LOGOS } from '../content/assets';
import { useLang } from '../i18n/language';
import {
  CONTRACTS,
  FUNDING_LABEL,
  ITERA_ATTRIBUTION,
  TEAM_MEMBERS,
  TIM_KAMI_PROGRAM,
  TIM_KAMI_TITLE,
  type Caption as CaptionType,
  type TeamRole,
} from '../content/i18n';

/**
 * Ordered role groups. Team members are bucketed by `role` so the credits
 * read top-down from the principal investigator to the external expert.
 */
const ROLE_ORDER: { role: TeamRole; heading: CaptionType }[] = [
  { role: 'ketua', heading: { id: 'Ketua', en: 'Principal Investigator' } },
  { role: 'anggota', heading: { id: 'Anggota', en: 'Members' } },
  {
    role: 'anggota-mahasiswa',
    heading: { id: 'Anggota Mahasiswa', en: 'Student Members' },
  },
  {
    role: 'tim-ahli-eksternal',
    heading: { id: 'Tim Ahli Eksternal', en: 'External Expert' },
  },
];

/**
 * Program / partner logos delivered in the asset package, organized under
 * `public/kiosk/logos/`.
 */
const PROGRAM_LOGOS = KIOSK_LOGOS;

export default function TimKamiScreen() {
  const { t } = useLang();
  return (
    <section className="flex flex-col gap-10 p-8">
      {/* Single-language screen heading + program framing caption. */}
      <header className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-4xl font-extrabold leading-tight text-kiosk-ink">
          {t(TIM_KAMI_TITLE)}
        </h2>
        <p className="max-w-3xl text-base font-medium text-kiosk-ink">
          {t(TIM_KAMI_PROGRAM)}
        </p>
      </header>

      {/* Research team, grouped by role (Req 15.1). */}
      <div className="flex flex-col gap-6">
        {ROLE_ORDER.map(({ role, heading }) => {
          const members = TEAM_MEMBERS.filter((member) => member.role === role);
          if (members.length === 0) return null;

          return (
            <div key={role} className="flex flex-col gap-3">
              <h3 className="text-lg font-bold uppercase tracking-wide text-kiosk-green-700">
                {t(heading)}
              </h3>

              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {members.map((member) => (
                  <li key={member.name} className="list-none">
                    <article className="flex h-full flex-col gap-1 rounded-2xl border border-kiosk-green-200 bg-kiosk-surface p-5 shadow-sm">
                      <p className="text-lg font-bold leading-snug text-kiosk-ink">
                        {member.name}
                      </p>
                      <p className="text-sm font-medium text-kiosk-ink-muted">
                        {member.affiliation}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-kiosk-green-700">
                        {t(member.roleLabel)}
                      </p>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Funding acknowledgement + contract numbers (Req 15.2, 15.3). */}
      <div className="flex flex-col gap-5 rounded-3xl border border-kiosk-green-200 bg-kiosk-surface-tint p-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-kiosk-green-100 text-kiosk-green-700">
            <HandCoins className="h-12 w-12" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <Caption caption={FUNDING_LABEL} size="md" align="center" />
        </div>

        {/* Master + derivative contracts (Req 15.3). */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CONTRACTS.map((contract) => (
            <li key={contract.number} className="list-none">
              <article className="flex h-full items-start gap-3 rounded-2xl border border-kiosk-green-200 bg-kiosk-surface p-5">
                <ScrollText
                  className="mt-0.5 h-8 w-8 shrink-0 text-kiosk-green-700"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-bold uppercase tracking-wide text-kiosk-green-700">
                    {t(contract.label)}
                  </p>
                  <p className="break-all font-mono text-base font-semibold text-kiosk-ink">
                    {contract.number}
                  </p>
                  <p className="text-xs text-kiosk-ink-muted">{contract.date}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {/* ITERA institutional attribution + program logos (Req 15.4). */}
      <footer className="flex flex-col items-center gap-6 border-t border-kiosk-green-200 pt-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-kiosk-green-100 text-kiosk-green-700">
            <Building2 className="h-10 w-10" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <Caption caption={ITERA_ATTRIBUTION} size="md" align="center" />
        </div>

        {/* Program / partner logo row. */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {PROGRAM_LOGOS.map((logo) => (
            <span
              key={logo.src}
              className="flex h-24 w-32 items-center justify-center rounded-2xl border border-kiosk-green-200 bg-kiosk-surface p-3"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain"
              />
            </span>
          ))}
        </div>
      </footer>
    </section>
  );
}
