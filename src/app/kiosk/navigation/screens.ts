/**
 * Kiosk navigation screen definitions.
 *
 * Defines the fixed screen set, the ordered flow (Req 5.1), the set of
 * content screens reachable from the Site Map hub, and the Site Map tile
 * metadata (one tile per content screen, Req 6.1 / 6.4).
 *
 * This module is pure data + types: no reducer, hook, or React here.
 */

/**
 * Every screen the kiosk can display. `IDLE` is the attract/entry state and
 * sits outside the ordered flow; all other screens belong to `SCREEN_FLOW`.
 */
export type Screen =
  | 'IDLE'
  | 'LIVING_HERITAGE'
  | 'SITE_MAP'
  | 'VIRTUAL_INSEKTARIUM'
  | 'METAMORFOSIS'
  | 'EKOSISTEM'
  | 'KETAHANAN_PANGAN'
  | 'KOLAM_MEGALITIK'
  | 'CALL_TO_ACTION'
  | 'DATA_SPESIES'
  | 'TIM_KAMI';

/**
 * Object form of the `Screen` union for ergonomic, typo-safe references.
 */
export const Screen = {
  IDLE: 'IDLE',
  LIVING_HERITAGE: 'LIVING_HERITAGE',
  SITE_MAP: 'SITE_MAP',
  VIRTUAL_INSEKTARIUM: 'VIRTUAL_INSEKTARIUM',
  METAMORFOSIS: 'METAMORFOSIS',
  EKOSISTEM: 'EKOSISTEM',
  KETAHANAN_PANGAN: 'KETAHANAN_PANGAN',
  KOLAM_MEGALITIK: 'KOLAM_MEGALITIK',
  CALL_TO_ACTION: 'CALL_TO_ACTION',
  DATA_SPESIES: 'DATA_SPESIES',
  TIM_KAMI: 'TIM_KAMI',
} as const satisfies Record<string, Screen>;

/**
 * The fixed ordered flow of length 10 (excludes IDLE), per Req 5.1 /
 * content-source.md "Screen Flow".
 *
 * 0 LIVING_HERITAGE → 1 SITE_MAP → 2 VIRTUAL_INSEKTARIUM → 3 METAMORFOSIS →
 * 4 EKOSISTEM → 5 KETAHANAN_PANGAN → 6 KOLAM_MEGALITIK → 7 CALL_TO_ACTION →
 * 8 DATA_SPESIES → 9 TIM_KAMI
 */
export const SCREEN_FLOW: Screen[] = [
  'LIVING_HERITAGE',
  'SITE_MAP',
  'VIRTUAL_INSEKTARIUM',
  'METAMORFOSIS',
  'EKOSISTEM',
  'KETAHANAN_PANGAN',
  'KOLAM_MEGALITIK',
  'CALL_TO_ACTION',
  'DATA_SPESIES',
  'TIM_KAMI',
];

/**
 * Content screens are every flow screen except the Site Map hub itself.
 * These are the screens the Site Map links to (one tile each, Req 6.1).
 */
export const CONTENT_SCREENS: Screen[] = SCREEN_FLOW.filter(
  (screen) => screen !== 'SITE_MAP',
);

/**
 * Bilingual label: Indonesian (`id`) is primary, English (`en`) is secondary.
 */
export type TileMeta = {
  screen: Screen;
  label: { id: string; en: string };
  /** lucide-react icon name (e.g. "Bug", "Wheat"). */
  icon: string;
  /** Optional representative image URL. */
  image?: string;
};

/**
 * Site Map tiles - exactly one tile per content screen (Req 6.1), each with a
 * lucide-react icon name and a bilingual label, Indonesian primary (Req 6.4).
 */
export const SITE_MAP_TILES: TileMeta[] = [
  {
    screen: 'LIVING_HERITAGE',
    label: { id: 'The Living Heritage', en: 'The Living Heritage' },
    icon: 'Landmark',
    image: '/kiosk/scenes/living-heritage-2.jpg',
  },
  {
    screen: 'VIRTUAL_INSEKTARIUM',
    label: { id: 'Insektarium Virtual', en: 'Virtual Insektarium' },
    icon: 'Bug',
    image: '/kiosk/insektarium/papilionidae.png',
  },
  {
    screen: 'METAMORFOSIS',
    label: { id: 'Metamorfosis Kupu-kupu', en: 'Butterfly Metamorphosis' },
    icon: 'Workflow',
    image: '/kiosk/scenes/metamorfosis.jpg',
  },
  {
    screen: 'EKOSISTEM',
    label: { id: 'Ekosistem Kupu-kupu', en: 'Butterfly Ecosystem' },
    icon: 'Activity',
    image: '/kiosk/scenes/ekosistem-1.jpg',
  },
  {
    screen: 'KETAHANAN_PANGAN',
    label: { id: 'Ketahanan Pangan', en: 'Food Security' },
    icon: 'Wheat',
    image: '/kiosk/scenes/ketahanan-pangan.jpg',
  },
  {
    screen: 'KOLAM_MEGALITIK',
    label: { id: 'Menjaga Kolam Megalitik', en: 'Protecting the Megalithic Spring' },
    icon: 'Droplets',
    image: '/kiosk/scenes/kolam-1.jpg',
  },
  {
    screen: 'CALL_TO_ACTION',
    label: { id: 'Ambil Peran', en: 'Call to Action' },
    icon: 'Megaphone',
    image: '/kiosk/scenes/ekosistem-2.jpg',
  },
  {
    screen: 'DATA_SPESIES',
    label: { id: 'Data Spesies', en: 'Species Data' },
    icon: 'Table',
    image: '/kiosk/species/graphium-agamemnon-top.jpg',
  },
  {
    screen: 'TIM_KAMI',
    label: { id: 'Tim Kami', en: 'Our Team' },
    icon: 'Users',
    image: '/kiosk/scenes/ekosistem-3.jpg',
  },
];
