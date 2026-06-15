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

// ---------------------------------------------------------------------------
// Info-card content for the discovery modal layer
// ---------------------------------------------------------------------------

export type InfoCard = {
  key: string;
  title: Caption;
  body: Caption;
  whyItMatters: Caption;
};

export const EKOSISTEM_INFO_CARDS: InfoCard[] = [
  {
    key: 'diversity',
    title: { id: 'Indeks Keanekaragaman = 2,77', en: 'Diversity Index = 2.77' },
    body: {
      id: 'Angka ini seperti "rapor kekayaan" kupu-kupu di Pugung Raharjo. Semakin tinggi angkanya, semakin banyak jenis kupu-kupu yang hidup berdampingan.',
      en: 'This number is like a "wealth report" of butterflies at Pugung Raharjo. The higher it is, the more kinds of butterflies live together.',
    },
    whyItMatters: {
      id: 'Keanekaragaman yang cukup tinggi berarti ekosistem lebih stabil. Jika satu spesies berkurang, spesies lain masih bisa menyerbuki bunga dan menjaga keseimbangan alam.',
      en: 'Higher diversity means a more stable ecosystem. If one species declines, others can still pollinate flowers and keep nature in balance.',
    },
  },
  {
    key: 'evenness',
    title: { id: 'Indeks Kemerataan = 0,91', en: 'Evenness Index = 0.91' },
    body: {
      id: 'Angka ini mengukur apakah satu jenis kupu-kupu mendominasi atau semua spesies hidup dalam jumlah seimbang. Nilai mendekati 1 berarti sangat merata.',
      en: 'This measures whether one butterfly type dominates or all species live in balanced numbers. A value close to 1 means very even.',
    },
    whyItMatters: {
      id: 'Populasi yang merata menandakan tidak ada persaingan ekstrem. Setiap spesies punya peran dan sumber daya sendiri, sehingga ekosistem sehat dan tahan gangguan.',
      en: 'Even populations mean no extreme competition. Each species has its own role and resources, so the ecosystem stays healthy and resilient.',
    },
  },
  {
    key: 'dominance',
    title: { id: 'Indeks Dominansi = 0,00–0,13', en: 'Dominance Index = 0.00–0.13' },
    body: {
      id: 'Dominansi rendah berarti tidak ada "raja tunggal" yang menguasai habitat. Setiap spesies punya porsi populasi yang relatif kecil dan seimbang.',
      en: 'Low dominance means no single "king" controls the habitat. Each species has a small, balanced share of the population.',
    },
    whyItMatters: {
      id: 'Ketika dominansi rendah, ekosistem tidak bergantung pada satu spesies saja. Ini membuat lingkungan lebih kuat menghadapi perubahan iklim dan kerusakan habitat.',
      en: 'When dominance is low, the ecosystem does not depend on just one species. This makes the environment stronger against climate change and habitat damage.',
    },
  },
];

export const KOLAM_INFO_CARDS: InfoCard[] = [
  {
    key: 'puddling',
    title: { id: 'Puddling: Ritual Cinta Kupu-Kupu Jantan', en: 'Puddling: The Male Butterfly Ritual' },
    body: {
      id: 'Kupu-kupu jantan sering berkumpul di tepi kolam basah. Mereka tidak hanya minum, tapi menyerap mineral dan garam dari tanah basah untuk kesuburan dan daya tarik saat kawin.',
      en: 'Male butterflies often gather at damp pool edges. They are not just drinking; they absorb minerals and salts from wet soil for fertility and mating appeal.',
    },
    whyItMatters: {
      id: 'Tanpa kolam bersih, kupu-kupu jantan kekurangan mineral penting. Akibatnya, reproduksi menurun dan populasi kupu-kupu di masa depan terancam.',
      en: 'Without a clean pool, male butterflies lack key minerals. Reproduction drops and future butterfly populations are threatened.',
    },
  },
  {
    key: 'bioindicator',
    title: { id: 'Kupu-Kupu sebagai Penjaga Air', en: 'Butterflies as Water Guardians' },
    body: {
      id: 'Kupu-kupu sangat sensitif terhadap polusi. Kehadiran mereka yang melimpah di sekitar kolam menunjukkan air masih murni, tanpa pestisida atau bahan kimia berbahaya.',
      en: 'Butterflies are very sensitive to pollution. Their abundance around the pool shows the water is still pure, free of pesticides or harmful chemicals.',
    },
    whyItMatters: {
      id: 'Kolam yang bersih bukan hanya penting bagi kupu-kupu, tapi juga bagi petani setempat. Air berkualitas baik menopang irigasi sawah dan ladang sekitar situs.',
      en: 'A clean pool matters not only for butterflies but also for local farmers. Good-quality water supports irrigation for surrounding rice fields and farms.',
    },
  },
  {
    key: 'ancestral-harmony',
    title: { id: 'Harmoni Leluhur: Titik Keseimbangan', en: 'Ancestral Harmony: Point of Balance' },
    body: {
      id: 'Masyarakat megalitik masa lalu membangun kolam sebagai pusat spiritual dan ekologis. Dalam pandangan mereka, kolam menyatukan Bumi (punden berundak), Udara (ruang terbuka), dan Air (kolam).',
      en: 'The ancient megalithic community built the pool as a spiritual and ecological center. In their view, the pool united Earth (stepped mound), Air (open sky), and Water.',
    },
    whyItMatters: {
      id: 'Menjaga kolam berarti menghormati kearifan leluhur sekaligus melestarikan sumber kehidupan bagi kupu-kupu dan ekosistem sekitarnya.',
      en: 'Protecting the pool honors ancestral wisdom while preserving the source of life for butterflies and the surrounding ecosystem.',
    },
  },
];

export const FOOD_SECURITY_INFO_CARDS: InfoCard[] = [
  {
    key: 'sahabat-petani',
    title: { id: 'Mengapa Pieridae Sahabat Petani?', en: 'Why Are Pieridae Farmer Friends?' },
    body: {
      id: 'Kupu-kupu kecil dari famili Pieridae sangat rajin mengunjungi bunga sayur, buah, dan kacang-kacangan. Saat mereka minjar nektar, serbuk sari menempel dan menyerbuki bunga lain.',
      en: 'Small butterflies in the Pieridae family diligently visit vegetable, fruit, and legume flowers. As they sip nectar, pollen sticks to them and pollinates other flowers.',
    },
    whyItMatters: {
      id: 'Polinasi yang lebih baik berarti lebih banyak buah dan biji terbentuk. Hasil panen meningkat tanpa biaya, mendukung ketahanan pangan keluarga petani.',
      en: 'Better pollination means more fruits and seeds form. Crop yields rise without extra cost, supporting farmer household food security.',
    },
  },
  {
    key: 'benteng-alami',
    title: { id: 'Nymphalidae: Benteng Alami Penolak Hama', en: 'Nymphalidae: Natural Pest Barrier' },
    body: {
      id: 'Genus Junonia dan Hypolimnas membantu menjaga keseimbangan vegetasi liar. Kawasan situs yang lestari menjadi zona penyangga yang menahan ledakan populasi hama.',
      en: 'Junonia and Hypolimnas help keep wild vegetation balanced. A preserved site acts as a buffer zone that prevents pest population explosions.',
    },
    whyItMatters: {
      id: 'Dengan ekosistem yang seimbang, sawah dan ladang sekitar tidak perlu banyak pestisida. Ini menghemat biaya dan menjaga air tetap bersih.',
      en: 'With a balanced ecosystem, nearby rice fields and farms need fewer pesticides. This saves money and keeps water clean.',
    },
  },
];

export const METAMORFOSIS_INFO_CARDS: InfoCard[] = [
  {
    key: 'egg',
    title: { id: 'Tahap Telur: Awal yang Rapuh', en: 'Egg Stage: A Fragile Beginning' },
    body: {
      id: 'Betina meletakkan telur mungil di daun tanaman inang. Dalam 3–5 hari, embrio berkembang menjadi larva yang siap menetas.',
      en: 'The female lays tiny eggs on host-plant leaves. In 3–5 days, embryos develop into larvae ready to hatch.',
    },
    whyItMatters: {
      id: 'Tanpa tanaman inang yang terjaga, telur tidak bisa bertahan. Itulah sebabnya larangan memetik tanaman liar di sekitar situs sangat penting.',
      en: 'Without protected host plants, eggs cannot survive. That is why not picking wild plants around the site is so important.',
    },
  },
  {
    key: 'larva',
    title: { id: 'Tahap Larva: Makan untuk Tumbuh', en: 'Larva Stage: Eating to Grow' },
    body: {
      id: 'Ulat memakan daun tanaman inang dengan rakus selama 2–4 minggu. Mereka mengganti kulit beberapa kali sebelum berhenti makan.',
      en: 'Caterpillars voraciously eat host-plant leaves for 2–4 weeks. They molt several times before stopping to feed.',
    },
    whyItMatters: {
      id: 'Ulat yang sehat menjadi pupa yang kuat. Keberadaan tanaman inang yang cukup menentukan berapa banyak kupu-kupu dewasa yang akhirnya terbang.',
      en: 'Healthy caterpillars become strong pupae. Enough host plants determine how many adult butterflies eventually fly.',
    },
  },
  {
    key: 'pupa',
    title: { id: 'Tahap Pupa: Transformasi Total', en: 'Pupa Stage: Total Transformation' },
    body: {
      id: 'Di dalam kepompong, tubuh ulat hancur dan menyusun kembali menjadi kupu-kupu dewasa. Proses ajaib ini berlangsung 1–2 minggu.',
      en: 'Inside the chrysalis, the caterpillar body breaks down and rebuilds into an adult butterfly. This magical process takes 1–2 weeks.',
    },
    whyItMatters: {
      id: 'Pupa membutuhkan tempat yang aman dan lembap. Gangguan habitat dapat mengganggu transformasi ini dan mengurangi populasi kupu-kupu.',
      en: 'Pupae need a safe, humid place. Habitat disturbance can disrupt this transformation and reduce butterfly numbers.',
    },
  },
  {
    key: 'imago',
    title: { id: 'Tahap Imago: Penyerbuk Sayap Indah', en: 'Imago Stage: Beautiful-Winged Pollinator' },
    body: {
      id: 'Kupu-kupu dewasa keluar dari kepompong, mengeringkan sayapnya, lalu terbang mencari bunga dan pasangan. Mereka hidup 2–4 minggu.',
      en: 'Adult butterflies emerge from the chrysalis, dry their wings, then fly off to find flowers and mates. They live 2–4 weeks.',
    },
    whyItMatters: {
      id: 'Kupu-kupu dewasa adalah penyerbuk penting. Setiap kali mereka mengunjungi bunga, mereka membantu tanaman menghasilkan buah dan biji.',
      en: 'Adult butterflies are important pollinators. Every flower visit helps plants produce fruit and seeds.',
    },
  },
];

export const CALL_TO_ACTION_INFO_CARDS: InfoCard[] = [
  {
    key: 'tanam-masa-depan',
    title: { id: 'Tanam Masa Depan: Satu Bibit untuk Seribu Sayap', en: 'Plant the Future: One Seed for a Thousand Wings' },
    body: {
      id: 'Tanaman liar di sekitar situs adalah tanaman inang bagi ulat kupu-kupu. Tanpa ulat, tidak akan ada kupu-kupu dewasa.',
      en: 'Wild plants around the site are host plants for butterfly caterpillars. Without caterpillars, there will be no adult butterflies.',
    },
    whyItMatters: {
      id: 'Melindungi tanaman liar berarti melindungi siklus hidup kupu-kupu dari telur hingga dewasa.',
      en: 'Protecting wild plants protects the full butterfly life cycle from egg to adult.',
    },
  },
  {
    key: 'stop-pestisida',
    title: { id: 'Stop Pestisida: Lindungi Penjaga Alam', en: 'Stop Pesticides: Protect Nature Guardians' },
    body: {
      id: 'Pestisida kimia tidak hanya membunuh hama, tapi juga kupu-kupu, lebah, dan serangga bermanfaat lainnya.',
      en: 'Chemical pesticides do not only kill pests; they also kill butterflies, bees, and other beneficial insects.',
    },
    whyItMatters: {
      id: 'Kupu-kupu adalah bioindikator. Kehadiran mereka menunjukkan udara, air, dan tanah di Pugung Raharjo masih sehat.',
      en: 'Butterflies are bioindicators. Their presence shows that the air, water, and soil at Pugung Raharjo are still healthy.',
    },
  },
  {
    key: 'amati-jangan-tangkap',
    title: { id: 'Amati, Foto, Jangan Tangkap!', en: 'Observe, Photograph, Do Not Catch!' },
    body: {
      id: 'Menangkap kupu-kupu bisa merusak sayapnya dan membuatnya sulit bertahan hidup. Foto adalah cara terbaik mengabadikannya.',
      en: 'Catching butterflies can damage their wings and make survival hard. Photography is the best way to capture them.',
    },
    whyItMatters: {
      id: 'Spesies langka seperti Troides helena dilindungi hukum. Membiarkannya terbang bebas adalah bentuk pelestarian.',
      en: 'Rare species like Troides helena are protected by law. Letting them fly free is a form of conservation.',
    },
  },
  {
    key: 'jaga-kolam',
    title: { id: 'Jaga Kolam, Jaga Kupu-Kupu', en: 'Protect the Pool, Protect the Butterflies' },
    body: {
      id: 'Kupu-kupu jantan butuh mineral dari tepian kolam bersih untuk reproduksi. Sabun dan sampah dapat mencemari kolam.',
      en: 'Male butterflies need minerals from clean pool edges to reproduce. Soap and trash can contaminate the pool.',
    },
    whyItMatters: {
      id: 'Kolam yang bersih menopang reproduksi kupu-kupu dan kualitas air irigasi pertanian sekitar.',
      en: 'A clean pool supports butterfly reproduction and the quality of irrigation water for surrounding farms.',
    },
  },
  {
    key: 'scan-learn',
    title: { id: 'Scan & Learn: Jadilah Ilmuwan Warga', en: 'Scan & Learn: Be a Citizen Scientist' },
    body: {
      id: 'Laporan foto dari pengunjung membantu tim peneliti ITERA memantau populasi kupu-kupu dari waktu ke waktu.',
      en: 'Visitor photo reports help the ITERA research team monitor butterfly populations over time.',
    },
    whyItMatters: {
      id: 'Data dari masyarakat memperkaya penelitian ilmiah dan memperkuat upaya pelestarian berbasis bukti.',
      en: 'Community data enriches scientific research and strengthens evidence-based conservation.',
    },
  },
];

export const LIVING_HERITAGE_INFO: InfoCard = {
  key: 'living-heritage',
  title: { id: 'Warisan Hidup: Budaya dan Alam Bersatu', en: 'Living Heritage: Culture and Nature United' },
  body: {
    id: 'Situs Pugung Raharjo bukan hanya menyimpan batu megalitik, tapi juga menjadi rumah bagi puluhan jenis kupu-kupu. Warisan budaya dan keanekaragaman hayati di sini tidak dapat dipisahkan.',
    en: 'Pugung Raharjo preserves not only megalithic stones but also dozens of butterfly species. Its cultural heritage and biodiversity cannot be separated.',
  },
  whyItMatters: {
    id: 'Memahami hubungan ini membuat kita menghargai situs bukan hanya sebagai objek wisata, tapi juga sebagai ekosistem hidup yang perlu dilindungi.',
    en: 'Understanding this connection helps us value the site not just as a tourist object, but as a living ecosystem to protect.',
  },
};

export const TIM_KAMI_INFO: InfoCard = {
  key: 'tim-kami',
  title: { id: 'Program Kemitraan Masyarakat', en: 'Community Partnership Program' },
  body: {
    id: 'Program ini didanai oleh DPPM, Risbang, Kemdiktisaintek untuk mengubah Situs Pugung Raharjo menjadi destinasi eduwisata polinator berbasis digital.',
    en: 'This program is funded by DPPM, Risbang, Kemdiktisaintek to transform Pugung Raharjo into a digital pollinator-education destination.',
  },
  whyItMatters: {
    id: 'Kolaborasi antara perguruan tinggi, pemerintah, dan masyarakat lokal menjadi kunci keberlanjutan pelestarian situs.',
    en: 'Collaboration between university, government, and local community is key to the sustainable preservation of the site.',
  },
};
