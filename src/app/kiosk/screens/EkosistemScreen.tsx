/**
 * EkosistemScreen - Screen 5 of the kiosk flow.
 *
 * Designed for the "Bright Organic Heritage" aesthetic:
 * Golden ratio serif typography, spacious layout, and organic
 * soft-shadow cards for the ecological gauges.
 *
 * Requirements: 10.1, 10.2, 10.3, 10.4, 10.5
 */

import { useState } from 'react';
import { Leaf } from 'lucide-react';
import { MetricGauge } from '../components/MetricGauge';
import KioskImage from '../components/KioskImage';
import CuratorNote from '../components/CuratorNote';
import ScreenHeader from '../components/ScreenHeader';
import { StaggerList, StaggerItem } from '../components/ScreenEntrance';
import { KIOSK_ASSETS } from '../content/assets';
import {
  EKOSISTEM_ATTRIBUTION,
  EKOSISTEM_INTRO,
  EKOSISTEM_TITLE,
  METRICS,
  EKOSISTEM_INFO_CARDS,
  type InfoCard,
} from '../content/i18n';
import { useLang } from '../language';
import ClickableCard from '../components/ClickableCard';
import InfoHotspot from '../components/InfoHotspot';
import InfoModal from '../components/InfoModal';

/** Renders the three ecosystem indices as visual-first metric gauges. */
export default function EkosistemScreen() {
  const { t } = useLang();
  const [infoCard, setInfoCard] = useState<InfoCard | null>(null);

  return (
    <section className="flex h-full w-full flex-col gap-[clamp(0.75rem,1.8vh,1.5rem)] bg-kiosk-bg px-[clamp(1.5rem,3vw,3.5rem)] py-[clamp(0.9rem,2.2vh,1.75rem)]">
      <ScreenHeader
        icon={Leaf}
        eyebrow={{ id: 'Kesehatan Habitat', en: 'Habitat Health' }}
        title={EKOSISTEM_TITLE}
        description={EKOSISTEM_INTRO}
        aside={<CuratorNote body={EKOSISTEM_ATTRIBUTION} />}
      />

      {/* Habitat photo strip from the ecological survey. Sized as a band that
          shares leftover height rather than by a fixed aspect ratio. */}
      <StaggerList
        className="grid min-h-0 flex-[0.75] grid-cols-2 gap-[clamp(0.5rem,0.9vw,1rem)] sm:grid-cols-4"
        delay={0.15}
      >
        {KIOSK_ASSETS.scenes.ekosistem.map((src, i) => (
          <StaggerItem
            key={src}
            className="min-h-0 overflow-hidden rounded-[1.5rem] border-4 border-white shadow-[0_8px_30px_rgba(30,51,40,0.04)]"
          >
            <KioskImage
              src={src}
              alt={`Dokumentasi ekosistem ${i + 1}`}
              hoverScale
              className="h-full w-full"
            />
          </StaggerItem>
        ))}
      </StaggerList>

      {/* Three dominant metric gauges: diversity (H′), evenness (E), dominance (D). */}
      <StaggerList
        className="grid min-h-0 flex-[1.6] grid-cols-1 gap-[clamp(0.75rem,1.4vw,1.5rem)] sm:grid-cols-2 lg:grid-cols-3"
        delay={0.25}
      >
        {METRICS.map((metric) => {
          const card = EKOSISTEM_INFO_CARDS.find((c) => c.key === metric.key);
          return (
            <StaggerItem
              key={metric.key}
              className="relative flex min-h-0 list-none flex-col gap-[clamp(0.4rem,1vh,1rem)]"
            >
              <ClickableCard
                onClick={() => card && setInfoCard(card)}
                ariaLabel={card ? t(card.title) : undefined}
                className="relative"
              >
                {card && <InfoHotspot onClick={() => setInfoCard(card)} />}
                <MetricGauge value={metric.value} label={metric.label} category={metric.category} />
              </ClickableCard>
              {/* Brief single-language supporting note beneath each gauge. */}
              <p className="px-4 text-center font-sans text-[clamp(0.85rem,0.95vw,1.05rem)] font-medium leading-relaxed text-kiosk-ink-muted">
                {t(metric.note)}
              </p>
            </StaggerItem>
          );
        })}
      </StaggerList>
      <InfoModal open={infoCard !== null} onClose={() => setInfoCard(null)} card={infoCard} />
    </section>
  );
}
