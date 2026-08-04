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

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import type { Screen } from '../navigation/screens';
import type { KioskSpecies } from '../lib/speciesMapping';
import { MORPH_SPRING, morphId, screenMorphVariants } from '../kiosk-theme/motion';

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
  const reduceMotion = useReducedMotion();

  // Remember which screen we came from so a Site Map selection can play the
  // shared-element morph while ordinary flow moves stay a plain crossfade.
  // Kept local to the router: the reducer already owns navigation state, and
  // threading a `from` prop through page.tsx → KioskShell would buy nothing.
  const previous = useRef<Screen | null>(null);
  const from = previous.current;
  useEffect(() => {
    previous.current = current;
  }, [current]);

  // Morph only when expanding a tile outward from the hub. Coming BACK to the
  // hub would otherwise try to shrink a full screen into a tile, which reads
  // as the screen collapsing and hides the content mid-flight.
  const morphFromTile =
    !reduceMotion && from === 'SITE_MAP' && current !== 'SITE_MAP' && current !== 'IDLE';

  const screen = renderScreen(current, species, onStart, onSelectTile);

  return (
    // Positioned container: both the outgoing and incoming screens are
    // `absolute inset-0`, so they overlap and genuinely cross-fade instead of
    // one waiting for the other to leave. Overlap is also what makes the
    // shared-element morph possible at all.
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={current}
          custom={direction}
          variants={reduceMotion ? undefined : screenMorphVariants}
          initial={reduceMotion ? false : 'enter'}
          animate="center"
          exit={reduceMotion ? undefined : 'exit'}
          className="kiosk-scrollbar absolute inset-0 overflow-y-auto bg-kiosk-bg text-kiosk-ink"
        >
          {morphFromTile ? (
            // Same layoutId as the tile that was tapped → framer-motion grows
            // the tile's box into the full screen.
            // `min-h-full` alone leaves this box `height: auto`, so a screen's
            // own `h-full` resolves to auto and the screen collapses to its
            // content height - fitted screens under-filled the display when
            // entered from a tile. A flex column stretches the screen to the
            // full height instead, while still letting genuinely long screens
            // (species catalogue, credits) grow past it and scroll.
            <motion.div
              layoutId={morphId(current)}
              transition={MORPH_SPRING}
              className="flex min-h-full w-full flex-col overflow-hidden bg-kiosk-bg [&>*]:flex-1"
            >
              {screen}
            </motion.div>
          ) : (
            screen
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
