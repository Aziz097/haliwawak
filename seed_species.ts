import { db } from './src/db';
import { species } from './src/db/schema';

function slugify(s: string): string {
  return s.toLowerCase().replace(/[\s()]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

async function main() {
  const speciesData = [
    // Papilionidae (7)
    { commonName: 'Kupu-kupu Lemon', scientificName: 'Papilio demoleus', family: 'Papilionidae' },
    { commonName: 'Kupu-kupu Ekor Hijau', scientificName: 'Graphium agamemnon', family: 'Papilionidae' },
    { commonName: 'Kupu-kupu Ekor Walet Jeruk', scientificName: 'Papilio polytes', family: 'Papilionidae' },
    { commonName: 'Kupu-kupu Memnon Betina', scientificName: 'Papilio memnon (betina)', family: 'Papilionidae' },
    { commonName: 'Kupu-kupu Memnon Jantan', scientificName: 'Papilio memnon (jantan)', family: 'Papilionidae' },
    { commonName: 'Kupu-kupu Sawah Hijau', scientificName: 'Graphium sarpedon', family: 'Papilionidae' },
    { commonName: 'Kupu-kupu Ekor Biru', scientificName: 'Graphium doson', family: 'Papilionidae' },
    // Pieridae (6)
    { commonName: 'Kupu-kupu Putih Olferna Betina', scientificName: 'Appias olferna (betina)', family: 'Pieridae' },
    { commonName: 'Kupu-kupu Putih Olferna Jantan', scientificName: 'Appias olferna (jantan)', family: 'Pieridae' },
    { commonName: 'Kupu-kupu Kuning Blanda', scientificName: 'Eurema blanda', family: 'Pieridae' },
    { commonName: 'Kupu-kupu Kuning Piranthe', scientificName: 'Catopsilia pyranthe', family: 'Pieridae' },
    { commonName: 'Kupu-kupu Kertas', scientificName: 'Leptosia nina', family: 'Pieridae' },
    { commonName: 'Kupu-kupu Merah Delias', scientificName: 'Delias hyparete', family: 'Pieridae' },
    // Nymphalidae (12)
    { commonName: 'Kupu-kupu Terpsicore', scientificName: 'Acraea terpsicore', family: 'Nymphalidae' },
    { commonName: 'Kupu-kupu Biru Orithya Jantan', scientificName: 'Junonia orithya (jantan)', family: 'Nymphalidae' },
    { commonName: 'Kupu-kupu Biru Orithya Betina', scientificName: 'Junonia orithya (betina)', family: 'Nymphalidae' },
    { commonName: 'Kupu-kupu Garis Putih', scientificName: 'Neptis hylas', family: 'Nymphalidae' },
    { commonName: 'Kupu-kupu Missipus Betina', scientificName: 'Hypolimnas missipus (betina)', family: 'Nymphalidae' },
    { commonName: 'Kupu-kupu Missipus Jantan', scientificName: 'Hypolimnas missipus (jantan)', family: 'Nymphalidae' },
    { commonName: 'Kupu-kupu Daun Kering', scientificName: 'Doleschallia bisaltide', family: 'Nymphalidae' },
    { commonName: 'Kupu-kupu Hitam Putih', scientificName: 'Euploea leucostictos', family: 'Nymphalidae' },
    { commonName: 'Kupu-kupu Bolina Betina', scientificName: 'Hypolimnas bolina (betina)', family: 'Nymphalidae' },
    { commonName: 'Kupu-kupu Bolina Jantan', scientificName: 'Hypolimnas bolina (jantan)', family: 'Nymphalidae' },
    { commonName: 'Kupu-kupu Mata Besar', scientificName: 'Melanitis leda', family: 'Nymphalidae' },
    { commonName: 'Kupu-kupu Coklat Iphita', scientificName: 'Junonia iphita', family: 'Nymphalidae' },
  ];

  const entries = speciesData.map((s) => ({
    commonName: s.commonName,
    scientificName: s.scientificName,
    family: s.family,
    order: 'Lepidoptera',
    slug: slugify(s.scientificName),
    isPublished: true,
    iucnStatus: 'Least Concern',
  }));

  await db.insert(species).values(entries);

  console.log(`Seeded ${entries.length} butterfly species.`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
