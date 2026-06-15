import type { Caption } from './i18n';

export interface SpeciesDetail {
  scientificName: string;
  funFact: Caption;
  ecosystemRole: Caption;
  localName?: Caption;
}

export const SPECIES_DETAILS: Record<string, SpeciesDetail> = {
  'Graphium agamemnon': {
    scientificName: 'Graphium agamemnon',
    funFact: {
      id: 'Kupu-kupu ekor burung ini terbang cepat di antara pepohonan; ulatnya memakan daun kemuning dan jeruk.',
      en: 'This tailed butterfly flies swiftly between trees; its caterpillars feed on curry leaf and citrus.',
    },
    ecosystemRole: {
      id: 'Membantu penyerbukan bunga liar dan tanaman kebun di sekitar situs.',
      en: 'Helps pollinate wild flowers and garden plants around the site.',
    },
  },
  'Graphium doson': {
    scientificName: 'Graphium doson',
    funFact: {
      id: 'Graphium doson sering terlihat meminum air di bebatuan basah di tepi kolam.',
      en: 'Graphium doson is often seen sipping water from wet rocks near the pool.',
    },
    ecosystemRole: {
      id: 'Penyerbuk bunga liar yang mendukung keanekaragaman tumbuhan.',
      en: 'A wild-flower pollinator that supports plant diversity.',
    },
  },
  'Graphium sarpedon': {
    scientificName: 'Graphium sarpedon',
    funFact: {
      id: 'Dikenal sebagai Common Bluebottle, warna biru metaliknya berkilau saat terkena sinar matahari.',
      en: 'Known as the Common Bluebottle, its metallic blue sheen glows in sunlight.',
    },
    ecosystemRole: {
      id: 'Salah satu penyerbuk aktif di kanopi pohon di sekitar situs.',
      en: 'An active pollinator in the tree canopy around the site.',
    },
  },
  'Papilio demoleus': {
    scientificName: 'Papilio demoleus',
    funFact: {
      id: 'Papilio demoleus adalah kupu-kupu yang sangat adaptif dan sering ditemukan di kebun serta ladang.',
      en: 'Papilio demoleus is highly adaptable and often found in gardens and farms.',
    },
    ecosystemRole: {
      id: 'Polinator bunga sayur dan buah-buahan di area pertanian sekitar.',
      en: 'Pollinates vegetable and fruit flowers in surrounding farmland.',
    },
  },
  'Papilio memnon': {
    scientificName: 'Papilio memnon',
    funFact: {
      id: 'Spesies ini memiliki banyak variasi warna; beberapa betina bahkan menyerupai spesies tak enak dimakan.',
      en: 'This species has many color forms; some females mimic unpalatable species.',
    },
    ecosystemRole: {
      id: 'Mendukung penyerbukan tanaman keras dan liar di kawasan hutan.',
      en: 'Supports pollination of hardwood and wild plants in the forest area.',
    },
  },
  'Papilio polytes': {
    scientificName: 'Papilio polytes',
    funFact: {
      id: 'Papilio polytes betina dapat meniru penampilan kupu-kupu lain untuk menghindari pemangsa.',
      en: 'Female Papilio polytes can mimic other butterflies to avoid predators.',
    },
    ecosystemRole: {
      id: 'Berkontribusi pada penyerbukan bunga liar di semak-semak.',
      en: 'Contributes to pollination of wildflowers in shrubs.',
    },
  },
  'Appias olferna': {
    scientificName: 'Appias olferna',
    funFact: {
      id: 'Appias olferna memiliki perbedaan warna mencolok antara jantan (putih kekuningan) dan betina (lebih gelap).',
      en: 'Appias olferna shows striking color differences between males (yellowish white) and females (darker).',
    },
    ecosystemRole: {
      id: 'Sering mengunjungi bunga kecil di semak belukar dan ladang.',
      en: 'Often visits small flowers in thickets and farms.',
    },
  },
  'Delias hyparete': {
    scientificName: 'Delias hyparete',
    funFact: {
      id: 'Delias hyparete dikenal dengan warna kuning dan hitam yang mencolok di sayap bawahnya.',
      en: 'Delias hyparete is known for the striking yellow and black pattern on its underwings.',
    },
    ecosystemRole: {
      id: 'Penyerbuk bunga liar di kanopi dan semak-semak.',
      en: 'Pollinator of wildflowers in the canopy and shrubs.',
    },
  },
  'Eurema blanda': {
    scientificName: 'Eurema blanda',
    funFact: {
      id: 'Kupu-kupu kecil berwarna kuning cerah ini sangat giat mengunjungi bunga-bunga kecil di ladang.',
      en: 'This small bright-yellow butterfly is a diligent visitor of small flowers in farm fields.',
    },
    ecosystemRole: {
      id: 'Disebut "Sahabat Petani" karena polinasinya meningkatkan hasil panen sayur, buah, dan kacang-kacangan.',
      en: 'Called "The Farmer\'s Friend" because its pollination boosts vegetable, fruit, and legume harvests.',
    },
  },
  'Catopsilia pyranthe': {
    scientificName: 'Catopsilia pyranthe',
    funFact: {
      id: 'Catopsilia pyranthe sering bermigrasi dalam kelompok besar setelah musim hujan.',
      en: 'Catopsilia pyranthe often migrates in large groups after the rainy season.',
    },
    ecosystemRole: {
      id: 'Polinator penting untuk tanaman kacang-kacangan dan sayuran berbunga.',
      en: 'An important pollinator for legumes and flowering vegetables.',
    },
  },
  'Leptosia nina': {
    scientificName: 'Leptosia nina',
    funFact: {
      id: 'Leptosia nina adalah kupu-kupu putih kecil yang terbang rendah dan lambat di semak-semak.',
      en: 'Leptosia nina is a small white butterfly that flies low and slowly among shrubs.',
    },
    ecosystemRole: {
      id: 'Membantu penyerbukan bunga liar di lapisan bawah vegetasi.',
      en: 'Helps pollinate wildflowers in the lower vegetation layer.',
    },
  },
  'Acraea terpsicore': {
    scientificName: 'Acraea terpsicore',
    funFact: {
      id: 'Acraea terpsicore memiliki corak oranye dan hitam yang menjadi peringatan bagi pemangsa.',
      en: 'Acraea terpsicore has orange-and-black warning coloration for predators.',
    },
    ecosystemRole: {
      id: 'Ulatnya memakan tanaman liar yang sering tumbuh di area terbuka, membantu mengatur vegetasi.',
      en: 'Its caterpillars feed on wild plants in open areas, helping regulate vegetation.',
    },
  },
  'Junonia orithya': {
    scientificName: 'Junonia orithya',
    funFact: {
      id: 'Spesies ini menunjukkan dimorfisme seksual: jantan berwarna biru mencolok, betina lebih pudar.',
      en: 'This species shows sexual dimorphism: males are vivid blue, females are duller.',
    },
    ecosystemRole: {
      id: 'Larva dan dewasanya membantu menjaga keseimbangan vegetasi liar yang menjadi penyangga ekosistem pertanian.',
      en: 'Larvae and adults help balance wild vegetation that buffers farmland ecosystems.',
    },
  },
  'Neptis hylas': {
    scientificName: 'Neptis hylas',
    funFact: {
      id: 'Neptis hylas memiliki pola garis putih khas di sayapnya yang menyerupai "pita".',
      en: 'Neptis hylas has distinctive white band patterns on its wings like a "ribbon".',
    },
    ecosystemRole: {
      id: 'Berperan dalam rantai makanan sebagai penyerbuk dan mangsa burung kecil.',
      en: 'Acts in the food chain as both pollinator and prey for small birds.',
    },
  },
  'Hypolimnas missipus': {
    scientificName: 'Hypolimnas missipus',
    funFact: {
      id: 'Kupu-kupu ini dikenal sebagai "Common Eggfly" dan betinanya memiliki corak yang sangat bervariasi.',
      en: 'Known as the "Common Eggfly"; females have highly variable patterns.',
    },
    ecosystemRole: {
      id: 'Sebagai bagian dari rantai makanan, ia membantu mengendalikan populasi serangga dan mendukung biodiversitas.',
      en: 'As part of the food chain, it helps control insect populations and supports biodiversity.',
    },
  },
  'Doleschallia bisaltide': {
    scientificName: 'Doleschallia bisaltide',
    funFact: {
      id: 'Sayap atas Doleschallia bisaltide berwarna coklat kemerahan dengan garis biru metalik.',
      en: 'The upperside of Doleschallia bisaltide is reddish brown with a metallic blue line.',
    },
    ecosystemRole: {
      id: 'Membantu penyerbukan bunga-bunga liar di lantai hutan.',
      en: 'Helps pollinate wildflowers on the forest floor.',
    },
  },
  'Euploea leucostictos': {
    scientificName: 'Euploea leucostictos',
    funFact: {
      id: 'Euploea leucostictos termasuk kelompok kupu-kupu "crow" yang umumnya tidak enak dimakan burung.',
      en: 'Euploea leucostictos belongs to the "crow" butterfly group, generally unpalatable to birds.',
    },
    ecosystemRole: {
      id: 'Polinator setia bunga liar dan tanaman keras di sekitar situs.',
      en: 'A reliable pollinator of wildflowers and hardwoods around the site.',
    },
  },
  'Hypolimnas bolina': {
    scientificName: 'Hypolimnas bolina',
    funFact: {
      id: 'Hypolimnas bolina jantan memiliki bintik putih besar di sayapnya, sementara betina lebih berwarna-warni.',
      en: 'Male Hypolimnas bolina has a large white spot on its wing, while females are more colorful.',
    },
    ecosystemRole: {
      id: 'Mendukung keseimbangan ekosistem sebagai polinator dan sumber makanan burung.',
      en: 'Supports ecosystem balance as a pollinator and food source for birds.',
    },
  },
  'Melanitis leda': {
    scientificName: 'Melanitis leda',
    funFact: {
      id: 'Melanitis leda lebih aktif pada sore hari dan sering bersembunyi di daun kering.',
      en: 'Melanitis leda is more active in the late afternoon and often hides in dry leaves.',
    },
    ecosystemRole: {
      id: 'Berperan dalam siklus nutrisi karena ulatnya memakan daun-daun mati dan rerumputan.',
      en: 'Plays a role in nutrient cycling because its caterpillars feed on dead leaves and grasses.',
    },
  },
  'Junonia iphita': {
    scientificName: 'Junonia iphita',
    funFact: {
      id: 'Junonia iphita memiliki sayap berwarna coklat dengan garis-garis putih yang menyerupai peta.',
      en: 'Junonia iphita has brown wings with white lines resembling a map.',
    },
    ecosystemRole: {
      id: 'Larva dan dewasanya berkontribusi pada keseimbangan vegetasi liar.',
      en: 'Larvae and adults contribute to wild-vegetation balance.',
    },
  },
  'Zizina otis': {
    scientificName: 'Zizina otis',
    funFact: {
      id: 'Zizina otis adalah kupu-kupu kecil dari keluarga Lycaenidae yang sering terlihat di rerumputan.',
      en: 'Zizina otis is a tiny Lycaenid butterfly often seen in grassy areas.',
    },
    ecosystemRole: {
      id: 'Polinator bunga-bunga kecil di padang rumput dan tepi ladang.',
      en: 'Pollinates tiny flowers in grasslands and field edges.',
    },
  },
};

export function getSpeciesDetail(scientificName: string | null | undefined): SpeciesDetail | undefined {
  if (!scientificName) return undefined;
  return SPECIES_DETAILS[scientificName.trim()];
}