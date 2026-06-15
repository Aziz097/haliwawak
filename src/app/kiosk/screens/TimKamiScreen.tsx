'use client';

/**
 * TimKamiScreen - Screen 10 of the kiosk flow.
 *
 * Designed for the "Bright Organic Heritage" aesthetic:
 * Editorial/museum styling, golden ratio typography, elegant grouping 
 * of research team members with soft shadows and organic accents.
 *
 * Requirements: 15.1, 15.2, 15.3, 15.4
 */

import { useState } from 'react';
import { Building2, HandCoins, ScrollText, Users } from 'lucide-react';
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
  TIM_KAMI_INFO,
  type Caption as CaptionType,
  type TeamRole,
  type InfoCard,
} from '../content/i18n';
import ClickableCard from '../components/ClickableCard';
import InfoHotspot from '../components/InfoHotspot';
import InfoModal from '../components/InfoModal';

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

const PROGRAM_LOGOS = KIOSK_LOGOS;

export default function TimKamiScreen() {
  const { t, lang } = useLang();
  const [infoCard, setInfoCard] = useState<InfoCard | null>(null);

  return (
    <section className="flex flex-col gap-[2.618rem] bg-kiosk-bg px-10 py-10 lg:px-14">
      {/* Screen heading. */}
      <header className="flex flex-col items-center gap-4 border-b border-kiosk-green-200 pb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-kiosk-accent-teal/30 bg-kiosk-accent-teal/10 px-4 py-1.5 font-sans text-[0.8rem] font-bold uppercase tracking-[0.2em] text-kiosk-accent-teal">
          <Users className="h-4 w-4" aria-hidden="true" />
          {lang === 'id' ? 'Di Balik Layar' : 'Behind the Scenes'}
        </span>
        <h2 className="font-serif text-[2.618rem] font-medium leading-none text-kiosk-ink">
          {t(TIM_KAMI_TITLE)}
        </h2>
        <p className="max-w-3xl font-sans text-[1rem] leading-relaxed text-kiosk-ink-muted">
          {t(TIM_KAMI_PROGRAM)}
        </p>
      </header>

      {/* Research team. */}
      <div className="flex flex-col gap-10">
        {ROLE_ORDER.map(({ role, heading }) => {
          const members = TEAM_MEMBERS.filter((member) => member.role === role);
          if (members.length === 0) return null;

          return (
            <div key={role} className="flex flex-col gap-6">
              <h3 className="flex items-center gap-3 font-serif text-[1.618rem] text-kiosk-ink">
                <span className="h-0.5 w-8 bg-kiosk-accent-amber/50" />
                {t(heading)}
              </h3>

              <ul className="grid grid-cols-1 gap-[1.618rem] sm:grid-cols-2 lg:grid-cols-3">
                {members.map((member) => (
                  <li key={member.name} className="list-none">
                    <article className="flex h-full flex-col justify-between gap-3 rounded-[1.618rem] border-2 border-white bg-white p-6 shadow-[0_8px_30px_rgba(30,51,40,0.03)] transition-transform hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(30,51,40,0.06)]">
                      <div className="flex flex-col">
                        <p className="font-serif text-[1.3rem] font-medium leading-tight text-kiosk-ink">
                          {member.name}
                        </p>
                        <p className="mt-1 font-sans text-[0.85rem] text-kiosk-ink-muted">
                          {member.affiliation}
                        </p>
                      </div>
                      <p className="inline-block w-max rounded-full bg-kiosk-surface-tint px-3 py-1 font-sans text-[0.7rem] font-bold uppercase tracking-widest text-kiosk-green-700">
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

      {/* Funding acknowledgement. */}
      <ClickableCard
        onClick={() => setInfoCard(TIM_KAMI_INFO)}
        ariaLabel={t(TIM_KAMI_INFO.title)}
        className="group relative mt-10 flex flex-col gap-8 rounded-[2.618rem] border-4 border-white bg-kiosk-surface-tint p-10 shadow-[0_8px_30px_rgba(30,51,40,0.05)] transition-transform hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(30,51,40,0.08)]"
      >
        <InfoHotspot onClick={() => setInfoCard(TIM_KAMI_INFO)} />
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="flex h-[5rem] w-[5rem] items-center justify-center rounded-full bg-kiosk-accent-amber/10 text-kiosk-accent-amber">
            <HandCoins className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <Caption caption={FUNDING_LABEL} size="md" align="center" />
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {CONTRACTS.map((contract) => (
            <li key={contract.number} className="list-none">
              <article className="flex h-full items-start gap-4 rounded-[1.618rem] border-2 border-white bg-white p-6 shadow-sm">
                <ScrollText
                  className="mt-1 h-8 w-8 shrink-0 text-kiosk-accent-teal"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-1">
                  <p className="font-sans text-[0.75rem] font-bold uppercase tracking-widest text-kiosk-accent-teal">
                    {t(contract.label)}
                  </p>
                  <p className="break-all font-mono text-[0.95rem] font-medium text-kiosk-ink">
                    {contract.number}
                  </p>
                  <p className="font-sans text-[0.8rem] text-kiosk-ink-muted">{contract.date}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </ClickableCard>

      {/* Footer logos. */}
      <footer className="mt-10 flex flex-col items-center gap-8 border-t border-kiosk-green-200 pt-12 pb-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-kiosk-green-100 text-kiosk-green-700">
            <Building2 className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <Caption caption={ITERA_ATTRIBUTION} size="sm" align="center" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {PROGRAM_LOGOS.map((logo) => (
            <span
              key={logo.src}
              className="flex h-[6rem] w-[8rem] items-center justify-center rounded-[1.618rem] border-2 border-white bg-white p-4 shadow-[0_4px_20px_rgba(30,51,40,0.03)] transition-transform hover:-translate-y-1 hover:shadow-md"
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
      <InfoModal open={infoCard !== null} onClose={() => setInfoCard(null)} card={infoCard} />
    </section>
  );
}
