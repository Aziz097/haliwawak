/**
 * Bilingual content / i18n module for the kiosk.
 *
 * All static screen copy from `content-source.md` is encoded here as
 * `Caption` values (Indonesian primary, English secondary) and structured
 * data. Keeping copy out of the screen components enforces the
 * ID-primary / EN-secondary pattern in one place (Req 1.3) and bounds
 * caption length (Req 1.2).
 *
 * Property 1 (Req 1.2): every Caption's `id` (Indonesian) text is at most
 * 240 characters and single-block (no "\n\n" paragraph break). The longer
 * source passages are summarised into punchy captions to satisfy this.
 *
 * Requirements: 1.2, 1.3, 7.2, 9.2, 10.1, 10.2, 10.3, 11.1, 11.2, 12.1,
 * 12.2, 12.3, 13.1, 15.1, 15.2, 15.3, 15.4
 */

/**
 * A bilingual caption pair. `id` is the Indonesian primary text (rendered
 * first / prominently); `en` is the English secondary text. Indonesian text
 * must stay <= 240 characters and single-block (Req 1.2 / Property 1).
 */
export type Caption = { id: string; en: string };

// ---------------------------------------------------------------------------
// Screen 1 — The Living Heritage (Req 7.2)
// ---------------------------------------------------------------------------

/** Hero title for the Living Heritage intro screen. */
export const LIVING_HERITAGE_TITLE: Caption = {
  id: 'The Living Heritage',
  en: 'The Living Heritage',
};

/** Short bilingual intro caption for the Living Heritage screen (Req 7.2). */
export const LIVING_HERITAGE_INTRO: Caption = {
  id: 'Taman Purbakala Situs Megalitik Pugung Raharjo, Lampung Timur: bukan hanya warisan budaya, tetapi juga habitat penting bagi keanekaragaman hayati, khususnya kupu-kupu.',
  en: 'The Pugung Raharjo Megalithic Site in East Lampung is more than cultural heritage — it is a vital sanctuary for biodiversity, especially butterflies.',
};

// ---------------------------------------------------------------------------
// Screen 3 — Virtual Insektarium (Req 8 — attribution + family labels)
// ---------------------------------------------------------------------------

export const INSEKTARIUM_TITLE: Caption = {
  id: 'Insektarium Virtual: Galeri Digital Koleksi Kupu-Kupu',
  en: 'Virtual Insektarium: Digital Butterfly Collection Gallery',
};

/** Curation / research attribution (Dr. Yanti Ariyanti / ITERA Biology). */
export const INSEKTARIUM_ATTRIBUTION: Caption = {
  id: 'Dikurasi dari penelitian Dr. Yanti Ariyanti dan Tim Program Studi Biologi, Institut Teknologi Sumatera.',
  en: 'Curated from the research of Dr. Yanti Ariyanti and the Biology Study Program team, Institut Teknologi Sumatera.',
};

/** Bilingual butterfly-family group labels for the gallery. */
export const FAMILY_LABELS: Record<string, Caption> = {
  Papilionidae: {
    id: 'Spesies Papilionidae Terekam',
    en: 'Recorded Papilionidae Species',
  },
  Pieridae: {
    id: 'Spesies Pieridae Terekam',
    en: 'Recorded Pieridae Species',
  },
  Nymphalidae: {
    id: 'Spesies Nymphalidae Terekam',
    en: 'Recorded Nymphalidae Species',
  },
  Lycaenidae: {
    id: 'Spesies Lycaenidae Terekam',
    en: 'Recorded Lycaenidae Species',
  },
};

// ---------------------------------------------------------------------------
// Screen 4 — Metamorfosis (Req 9.2 — four stage labels)
// ---------------------------------------------------------------------------

export const METAMORFOSIS_TITLE: Caption = {
  id: 'Metamorfosis Kupu-kupu',
  en: 'Butterfly Metamorphosis',
};

/** Stage identifiers for the four-stage metamorphosis sequence. */
export type MetamorphosisStage = 'egg' | 'larva' | 'pupa' | 'imago';

/** Ordered metamorphosis stages with bilingual labels (Req 9.2). */
export const METAMORFOSIS_STAGES: { stage: MetamorphosisStage; label: Caption }[] = [
  { stage: 'egg', label: { id: 'Telur', en: 'Egg' } },
  { stage: 'larva', label: { id: 'Larva (Ulat)', en: 'Larva (Caterpillar)' } },
  { stage: 'pupa', label: { id: 'Pupa (Kepompong)', en: 'Pupa (Chrysalis)' } },
  { stage: 'imago', label: { id: 'Imago (Kupu-kupu Dewasa)', en: 'Imago (Adult Butterfly)' } },
];

// ---------------------------------------------------------------------------
// Screen 5 — Ekosistem metrics (Req 10.1, 10.2, 10.3)
// ---------------------------------------------------------------------------

export const EKOSISTEM_TITLE: Caption = {
  id: 'Ekosistem Kupu-Kupu',
  en: 'Butterfly Ecosystem',
};

/** Short bilingual ecosystem framing caption. */
export const EKOSISTEM_INTRO: Caption = {
  id: 'Penilaian ekologis menunjukkan Situs Pugung Raharjo adalah habitat stabil dan seimbang — populasi kupu-kupu berkembang harmonis.',
  en: 'Ecological assessment shows Pugung Raharjo is a stable, balanced habitat where butterfly populations thrive in harmony.',
};

/** Stable identifiers for the three ecosystem indices. */
export type MetricKey = 'diversity' | 'evenness' | 'dominance';

/**
 * Ecosystem metrics: value + bilingual category + short note.
 * - Diversity (H'): 2,77 — Sedang / Moderate (Req 10.1)
 * - Evenness (E):   0,91 — Tinggi / High     (Req 10.2)
 * - Dominance (D):  0,00–0,13 — Rendah / Low  (Req 10.3)
 */
export const METRICS: {
  key: MetricKey;
  label: Caption;
  value: string;
  category: Caption;
  note: Caption;
}[] = [
  {
    key: 'diversity',
    label: { id: 'Indeks Keanekaragaman (H′)', en: 'Diversity Index (H′)' },
    value: '2,77',
    category: { id: 'Sedang', en: 'Moderate' },
    note: {
      id: 'Kekayaan spesies melimpah dan terjaga.',
      en: 'Species richness is abundant and well preserved.',
    },
  },
  {
    key: 'evenness',
    label: { id: 'Indeks Kemerataan (E)', en: 'Evenness Index (E)' },
    value: '0,91',
    category: { id: 'Tinggi', en: 'High' },
    note: {
      id: 'Populasi tersebar merata antar spesies.',
      en: 'Populations are evenly distributed across species.',
    },
  },
  {
    key: 'dominance',
    label: { id: 'Indeks Dominansi (D)', en: 'Dominance Index (D)' },
    value: '0,00 – 0,13',
    category: { id: 'Rendah', en: 'Low' },
    note: {
      id: 'Tidak ada spesies tunggal yang mendominasi.',
      en: 'No single species dominates the community.',
    },
  },
];

// ---------------------------------------------------------------------------
// Screen 6 — Ketahanan Pangan / Food Security (Req 11.1, 11.2)
// ---------------------------------------------------------------------------

export const KETAHANAN_PANGAN_TITLE: Caption = {
  id: 'Ketahanan Pangan',
  en: 'Food Security',
};

/** Stable identifiers for the two food-security sections. */
export type FoodSecurityKey = 'sahabat-petani' | 'benteng-alami';

/**
 * Food-security sections: "Sahabat Petani" (Pieridae pollinators) and
 * "Benteng Alami Penolak Hama" (Nymphalidae natural pest barrier).
 */
export const FOOD_SECURITY: {
  key: FoodSecurityKey;
  icon: string;
  title: Caption;
  keySpecies: Caption;
  description: Caption;
}[] = [
  {
    key: 'sahabat-petani',
    icon: 'Sprout',
    title: { id: 'Sahabat Petani', en: "The Farmer's Friend" },
    keySpecies: {
      id: 'Spesies kunci: Eurema blanda, Catopsilia pyranthe, Appias olferna (Famili Pieridae).',
      en: 'Key species: Eurema blanda, Catopsilia pyranthe, Appias olferna (Family Pieridae).',
    },
    description: {
      id: 'Rajin mengunjungi bunga sayur, buah, dan kacang; polinasinya meningkatkan hasil panen.',
      en: 'Frequent visitors to vegetable, fruit, and legume flowers; their pollination boosts crop yields.',
    },
  },
  {
    key: 'benteng-alami',
    icon: 'ShieldCheck',
    title: { id: 'Benteng Alami Penolak Hama', en: 'Natural Pest Barrier' },
    keySpecies: {
      id: 'Spesies kunci: genus Junonia dan Hypolimnas (Famili Nymphalidae).',
      en: 'Key species: genus Junonia and Hypolimnas (Family Nymphalidae).',
    },
    description: {
      id: 'Menjaga keseimbangan vegetasi liar; kawasan lestari menjadi buffer zone penahan wabah hama agar sawah dan ladang aman dari gagal panen.',
      en: 'They balance wild vegetation; a preserved area becomes a buffer zone that curbs pest outbreaks, protecting fields from crop failure.',
    },
  },
];

// ---------------------------------------------------------------------------
// Screen 7 — Kolam Megalitik (Req 12.1, 12.2, 12.3)
// ---------------------------------------------------------------------------

export const KOLAM_MEGALITIK_TITLE: Caption = {
  id: 'Menjaga Kolam Megalitik',
  en: 'Protecting the Megalithic Spring',
};

/** Short bilingual framing caption for the megalithic spring screen. */
export const KOLAM_MEGALITIK_INTRO: Caption = {
  id: 'Mata Air Kehidupan Kupu-Kupu — kolam purba adalah jantung ekosistem.',
  en: "The Spring of Butterfly Life — the ancient pool is the heart of the ecosystem.",
};

/** Stable identifiers for the three megalithic-spring concepts. */
export type KolamConceptKey = 'puddling' | 'bioindicator' | 'ancestral-harmony';

/**
 * Kolam Megalitik concepts: puddling (Req 12.1), bioindicator (Req 12.2),
 * and ancestral harmony (Req 12.3).
 */
export const KOLAM_CONCEPTS: {
  key: KolamConceptKey;
  icon: string;
  title: Caption;
  description: Caption;
}[] = [
  {
    key: 'puddling',
    icon: 'Droplet',
    title: { id: 'Puddling: Rahasia Cinta Kupu Jantan', en: "Puddling: The Male Butterfly's Secret" },
    description: {
      id: 'Kupu jantan menyerap mineral dari tanah basah untuk energi dan reproduksi. Tanpa kolam ini, generasi baru terancam.',
      en: 'Males absorb minerals from damp soil for energy and reproduction. Without this pool, the next generation is at risk.',
    },
  },
  {
    key: 'bioindicator',
    icon: 'Sparkles',
    title: { id: 'Penjaga Alami Kualitas Air', en: 'Natural Water-Quality Guardian' },
    description: {
      id: 'Kehadiran kupu-kupu yang melimpah adalah bukti air murni, bersih, dan bebas polutan kimia.',
      en: 'Abundant butterflies are proof of pure, clean water free of chemical pollutants.',
    },
  },
  {
    key: 'ancestral-harmony',
    icon: 'Mountain',
    title: { id: 'Harmoni Leluhur: Titik Keseimbangan', en: 'Ancestral Harmony: Point of Balance' },
    description: {
      id: 'Kolam menyatukan Bumi (punden berundak), Udara, dan Air. Menjaganya berarti menghormati warisan spiritual dan ekologis leluhur.',
      en: 'The pool unites Earth (stepped pyramid), Air, and Water. Protecting it honors our ancestors’ spiritual and ecological legacy.',
    },
  },
];

// ---------------------------------------------------------------------------
// Screen 8 — Call to Action (Req 13.1 — five actions, icon + bilingual)
// ---------------------------------------------------------------------------

export const CALL_TO_ACTION_TITLE: Caption = {
  id: 'Ambil Peran Nyata',
  en: 'Take Real Action',
};

/** Short bilingual header for the Call to Action screen. */
export const CALL_TO_ACTION_INTRO: Caption = {
  id: 'Kepakan sayap kupu-kupu di Pugung Raharjo adalah tanda alam yang sehat — ambil peran nyata!',
  en: 'The fluttering of butterflies at Pugung Raharjo signals a healthy nature — play your part!',
};

/** Stable identifiers for the five conservation actions. */
export type ActionKey =
  | 'tanam-masa-depan'
  | 'stop-pestisida'
  | 'amati-jangan-tangkap'
  | 'jaga-kolam'
  | 'scan-learn';

/**
 * Five CTA actions, each with a lucide-react icon name and a bilingual
 * caption (title + supporting note) — Req 13.1.
 */
export const CALL_TO_ACTIONS: {
  key: ActionKey;
  icon: string;
  title: Caption;
  note: Caption;
}[] = [
  {
    key: 'tanam-masa-depan',
    icon: 'Sprout',
    title: { id: 'Tanam Masa Depan', en: 'Plant the Future' },
    note: {
      id: 'Jangan petik tanaman liar di sekitar situs. Tanpa tanaman inang, tidak ada kupu-kupu.',
      en: 'Do not pick wild plants near the site. Without host plants, there are no butterflies.',
    },
  },
  {
    key: 'stop-pestisida',
    icon: 'Ban',
    title: { id: 'Stop Pestisida', en: 'Stop Pesticides' },
    note: {
      id: 'Hindari pestisida dan racun kimia. Kupu-kupu adalah bioindikator udara dan air murni.',
      en: 'Avoid pesticides and chemical poisons. Butterflies indicate pure air and water.',
    },
  },
  {
    key: 'amati-jangan-tangkap',
    icon: 'Camera',
    title: { id: 'Amati, Foto, Jangan Tangkap', en: 'Observe, Photograph, Do Not Catch' },
    note: {
      id: 'Foto, jangan tangkap. Spesies langka seperti Troides helena dilindungi hukum.',
      en: 'Photograph, do not capture. Rare species like Troides helena are protected by law.',
    },
  },
  {
    key: 'jaga-kolam',
    icon: 'Droplets',
    title: { id: 'Jaga Kolam, Jaga Kupu-Kupu', en: 'Protect the Pool, Protect the Butterflies' },
    note: {
      id: 'Jangan buang sampah atau sabun di Kolam Megalitik. Jantan butuh mineral puddling untuk reproduksi.',
      en: 'Do not dump waste or soap in the Megalithic Pool. Males need puddling minerals to reproduce.',
    },
  },
  {
    key: 'scan-learn',
    icon: 'QrCode',
    title: { id: 'Scan & Learn: Jadilah Ilmuwan Warga', en: 'Scan & Learn: Be a Citizen Scientist' },
    note: {
      id: 'Pindai QR Code untuk pelajari spesies dan laporkan temuan. Data foto membantu tim peneliti ITERA.',
      en: 'Scan the QR code to learn species and report sightings. Photo data helps the ITERA research team.',
    },
  },
];

// ---------------------------------------------------------------------------
// Screen 9 — Data Spesies (column headers)
// ---------------------------------------------------------------------------

export const DATA_SPESIES_TITLE: Caption = {
  id: 'Data Spesies',
  en: 'Species Data',
};

/** Bilingual column headers for the species data table (Req 14.2). */
export const DATA_SPESIES_COLUMNS: {
  no: Caption;
  family: Caption;
  genus: Caption;
  species: Caption;
  iucn: Caption;
  topPhoto: Caption;
  undersidePhoto: Caption;
} = {
  no: { id: 'No', en: 'No' },
  family: { id: 'Famili', en: 'Family' },
  genus: { id: 'Genus', en: 'Genus' },
  species: { id: 'Spesies', en: 'Species' },
  iucn: { id: 'Status IUCN', en: 'IUCN Status' },
  topPhoto: { id: 'Foto Atas', en: 'Top View' },
  undersidePhoto: { id: 'Foto Bawah', en: 'Underside View' },
};

// ---------------------------------------------------------------------------
// Screen 10 — Tim Kami & Logo / Credits (Req 15.1, 15.2, 15.3, 15.4)
// ---------------------------------------------------------------------------

export const TIM_KAMI_TITLE: Caption = {
  id: 'Tim Kami & Mitra',
  en: 'Our Team & Partners',
};

/** Program framing caption for the team / credits screen (Req 15.1). */
export const TIM_KAMI_PROGRAM: Caption = {
  id: 'Program Pengabdian kepada Masyarakat — Skema Pemberdayaan Kemitraan Masyarakat — 2026.',
  en: 'Community Service Program — Community Partnership Empowerment Scheme — 2026.',
};

/** Role of a team member, bilingual. */
export type TeamRole =
  | 'ketua'
  | 'anggota'
  | 'anggota-mahasiswa'
  | 'tim-ahli-eksternal';

/** Team members with names and bilingual role labels (Req 15.1). */
export const TEAM_MEMBERS: {
  name: string;
  affiliation: string;
  role: TeamRole;
  roleLabel: Caption;
}[] = [
  {
    name: 'Dr. Winati Nurhayu, S.Si.',
    affiliation: 'Biologi',
    role: 'ketua',
    roleLabel: { id: 'Ketua', en: 'Principal Investigator' },
  },
  {
    name: 'Dr. Yanti Ariyanti, M.Si.',
    affiliation: 'Biologi',
    role: 'anggota',
    roleLabel: { id: 'Anggota', en: 'Member' },
  },
  {
    name: 'Nurul Adhha, S.S.I., M.A.',
    affiliation: 'Biologi',
    role: 'anggota',
    roleLabel: { id: 'Anggota', en: 'Member' },
  },
  {
    name: 'Jihan Echi Dwi Putri',
    affiliation: 'Biologi',
    role: 'anggota-mahasiswa',
    roleLabel: { id: 'Anggota Mahasiswa', en: 'Student Member' },
  },
  {
    name: 'Aziz Kurniawan',
    affiliation: 'Teknik Informatika',
    role: 'anggota-mahasiswa',
    roleLabel: { id: 'Anggota Mahasiswa', en: 'Student Member' },
  },
  {
    name: 'Muhammad Kaisar Teddy',
    affiliation: 'Teknik Informatika',
    role: 'anggota-mahasiswa',
    roleLabel: { id: 'Anggota Mahasiswa', en: 'Student Member' },
  },
  {
    name: 'Andre Febrianto, S.Kom., M.Eng',
    affiliation: 'Teknik Informatika',
    role: 'tim-ahli-eksternal',
    roleLabel: { id: 'Tim Ahli Eksternal', en: 'External Expert' },
  },
];

/** Funding attribution (Req 15.2). */
export const FUNDING_LABEL: Caption = {
  id: 'Didanai oleh DPPM, Risbang, Kemdiktisaintek.',
  en: 'Funded by DPPM, Risbang, Kemdiktisaintek.',
};

/** Contract numbers with bilingual labels (Req 15.3). */
export const CONTRACTS: { label: Caption; number: string; date: string }[] = [
  {
    label: { id: 'Kontrak Induk', en: 'Master Contract' },
    number: '097/C3/DT.05.00/PM/2026',
    date: '13 April 2026',
  },
  {
    label: { id: 'Kontrak Turunan', en: 'Derivative Contract' },
    number: '1415d/DST/IT9.2.1/PM.01.03/2026',
    date: '13 April 2026',
  },
];

/** ITERA institutional attribution (Req 15.4). */
export const ITERA_ATTRIBUTION: Caption = {
  id: 'Institut Teknologi Sumatera — 2026.',
  en: 'Institut Teknologi Sumatera — 2026.',
};

// ---------------------------------------------------------------------------
// Shared UI messages — empty-state, loading, non-blocking data notice
// ---------------------------------------------------------------------------

/** Bilingual empty-state message (Req 8.5 / 14.5). */
export const EMPTY_STATE: Caption = {
  id: 'Belum ada data untuk ditampilkan.',
  en: 'No data to display yet.',
};

/** Bilingual loading message (Req 16.2). */
export const LOADING_MESSAGE: Caption = {
  id: 'Memuat data…',
  en: 'Loading data…',
};

/** Bilingual, non-blocking data-failure notice (Req 16.5). */
export const DATA_NOTICE: Caption = {
  id: 'Menampilkan data cadangan. Beberapa informasi mungkin belum diperbarui.',
  en: 'Showing fallback data. Some information may not be up to date.',
};

/** Bilingual prompt shown on the idle attract screen to begin a session. */
export const IDLE_PROMPT: Caption = {
  id: 'Sentuh untuk memulai',
  en: 'Touch to begin',
};
