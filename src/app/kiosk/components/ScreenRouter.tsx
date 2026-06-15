'use client';

/**
 * ScreenRouter - renders exactly one kiosk screen at a time inside an
 * `AnimatePresence` that slides between screens on flow transitions.
 *
 * Each screen is wrapped in a `motion.div` using the shared `slideVariants`
 * (keyed on `direction`: forward = +x, back = −x). The wrapper is the scroll
 * container and is keyed by the current screen id, so React remounts it on
 * every transition - guaranteeing each screen enters scrolled to the top
 * (Req 5.4).
 *
 * Requirements: 5.4
 */

import { AnimatePresence, motion } from 'framer-motion';

import type { Screen } from '../navigation/screens';
import type { KioskSpecies } from '../lib/speciesMapping';
import { slideVariants } from '../kiosk-theme/motion';

import IdleScreen from '../screens/IdleScreen';
import LivingHeritageScreen from '../screens/LivingHeritageScreen';
import SiteMapScreen from '../screens/SiteMapScreen';
import VirtualInsektariumScreen from '../screens/VirtualInsektariumScreen';
import MetamorfosisScreen from '../screens/MetamorfosisScreen';
import EkosistemScreen from '../screens/EkosistemScreen';
import KetahananPanganScreen from '../screens/KetahananPanganScreen';
import KolamMegalitikScreen from '../screens/KolamMegalitikScreen';
import CallToActionScreen from '../screens/CallToActionScreen';
import DataSpesiesScreen from '../screens/DataSpesiesScreen';
import TimKamiScreen from '../screens/TimKamiScreen';

export interface ScreenRouterProps {
  /** The screen to render. */
  current: Screen;
  /** Slide direction hint: forward (> 0) enters from +x, back (< 0) from −x. */
  direction: number;
  /** Full species list passed to species-dependent screens. */
  species: KioskSpecies[];
  /** Invoked from the idle screen to start the experience (IDLE → first flow). */
  onStart: () => void;
  /** Invoked with a tile's target screen when a Site Map tile is selected. */
  onSelectTile: (screen: Screen) => void;
}

/** Resolve the current screen id to its matching screen component element. */
function renderScreen(
  current: Screen,
  species: KioskSpecies[],
  onStart: () => void,
  onSelectTile: (screen: Screen) => void,
) {
  switch (current) {
    case 'IDLE':
      return <IdleScreen species={species} onStart={onStart} />;
    case 'LIVING_HERITAGE':
      return <LivingHeritageScreen />;
    case 'SITE_MAP':
      return <SiteMapScreen onSelect={onSelectTile} />;
    case 'VIRTUAL_INSEKTARIUM':
      return <VirtualInsektariumScreen species={species} />;
    case 'METAMORFOSIS':
      return <MetamorfosisScreen />;
    case 'EKOSISTEM':
      return <EkosistemScreen />;
    case 'KETAHANAN_PANGAN':
      return <KetahananPanganScreen />;
    case 'KOLAM_MEGALITIK':
      return <KolamMegalitikScreen />;
    case 'CALL_TO_ACTION':
      return <CallToActionScreen />;
    case 'DATA_SPESIES':
      return <DataSpesiesScreen species={species} />;
    case 'TIM_KAMI':
      return <TimKamiScreen />;
    default: {
      // Exhaustiveness guard: every Screen must be handled above.
      const _exhaustive: never = current;
      return _exhaustive;
    }
  }
}

/**
 * Animated switch over the active kiosk screen. The keyed `motion.div` doubles
 * as the per-screen scroll container so each entry remounts scrolled to top.
 */
export default function ScreenRouter({
  current,
  direction,
  species,
  onStart,
  onSelectTile,
}: ScreenRouterProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={current}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className="h-full w-full overflow-y-auto bg-kiosk-bg text-kiosk-ink"
      >
        {renderScreen(current, species, onStart, onSelectTile)}
      </motion.div>
    </AnimatePresence>
  );
}
