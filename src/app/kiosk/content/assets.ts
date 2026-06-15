/**
 * Centralized kiosk asset manifest.
 *
 * All static imagery delivered in the "Asset foto" package is organized under
 * `public/kiosk/` and referenced here by URL so screens never hard-code paths.
 *
 *   public/kiosk/scenes/       - photographic scene/hero images per screen
 *   public/kiosk/insektarium/  - family collage plates (Papilionidae, …)
 *   public/kiosk/species/      - per-species top + underside photos
 *   public/kiosk/logos/        - funder / institution / program logos
 */

export const KIOSK_ASSETS = {
  scenes: {
    livingHeritage: [
      '/kiosk/scenes/living-heritage-1.jpg',
      '/kiosk/scenes/living-heritage-2.jpg',
      '/kiosk/scenes/living-heritage-3.jpg',
    ],
    metamorfosis: '/kiosk/scenes/metamorfosis.jpg',
    ekosistem: [
      '/kiosk/scenes/ekosistem-1.jpg',
      '/kiosk/scenes/ekosistem-2.jpg',
      '/kiosk/scenes/ekosistem-3.jpg',
      '/kiosk/scenes/ekosistem-4.jpg',
    ],
    ketahananPangan: '/kiosk/scenes/ketahanan-pangan.jpg',
    kolam: [
      '/kiosk/scenes/kolam-1.jpg',
      '/kiosk/scenes/kolam-2.jpg',
    ],
  },
  insektarium: {
    Papilionidae: '/kiosk/insektarium/papilionidae.png',
    Pieridae: '/kiosk/insektarium/pieridae.png',
    Nymphalidae: '/kiosk/insektarium/nymphalidae.png',
  } as Record<string, string>,
  logos: {
    program: '/kiosk/logos/program.png',
    diktisaintek: '/kiosk/logos/diktisaintek.png',
    bima: '/kiosk/logos/bima.png',
    lampungTimur: '/kiosk/logos/lampung-timur.png',
    partner: '/kiosk/logos/partner.jpg',
  },
} as const;

/**
 * Ordered list of funder/institution logos, shown in the navbar (centered) and
 * on the credits screen. Order requested by the client:
 * partner → program → Lampung Timur → Diktisaintek → BIMA.
 */
export const KIOSK_LOGOS: { src: string; alt: string }[] = [
  { src: KIOSK_ASSETS.logos.partner, alt: 'Institut Teknologi Sumatera' },
  { src: KIOSK_ASSETS.logos.program, alt: 'Logo Program Eduwisata Polinator' },
  { src: KIOSK_ASSETS.logos.lampungTimur, alt: 'Kabupaten Lampung Timur' },
  { src: KIOSK_ASSETS.logos.diktisaintek, alt: 'Diktisaintek Berdampak' },
  { src: KIOSK_ASSETS.logos.bima, alt: 'BIMA Kemdiktisaintek' },
];

/** Brand wordmark logo for the kiosk (public website logo). */
export const KIOSK_BRAND_LOGO = '/kupu2-logo-black.svg';
