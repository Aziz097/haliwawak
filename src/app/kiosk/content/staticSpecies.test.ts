import { describe, expect, it } from 'vitest';
import { STATIC_SPECIES } from './staticSpecies';

describe('STATIC_SPECIES current field data', () => {
  it('uses the supplied conservation status and photo for Zizina otis', () => {
    const zizina = STATIC_SPECIES.find((species) => species.scientificName === 'Zizina otis');

    expect(zizina?.family).toBe('Lycaenidae');
    expect(zizina?.iucnStatus).toBe('-');
    expect(zizina?.topPhotoUrl).toBe('/kiosk/species/zizina-otis-top.webp');
  });

  it('matches the supplied conservation legend for all kiosk records', () => {
    const statusBySpecies = new Map<string, string | null>([
      ['Graphium agamemnon', '-'],
      ['Graphium doson', '-'],
      ['Graphium sarpedon', 'Least Concern'],
      ['Papilio demoleus', null],
      ['Papilio memnon', '-'],
      ['Papilio polytes', '-'],
      ['Appias olferna', null],
      ['Delias hyparete', null],
      ['Eurema blanda', null],
      ['Catopsilia pyranthe', null],
      ['Leptosia nina', '-'],
      ['Acraea terpsicore', '-'],
      ['Junonia orithya', 'Least Concern'],
      ['Neptis hylas', '-'],
      ['Hypolimnas missipus', 'Least Concern'],
      ['Doleschallia bisaltide', '-'],
      ['Euploea leucostictos', '-'],
      ['Hypolimnas bolina', '-'],
      ['Melanitis leda', 'Least Concern'],
      ['Junonia iphita', '-'],
      ['Zizina otis', '-'],
    ]);

    for (const species of STATIC_SPECIES) {
      expect(species.iucnStatus).toBe(statusBySpecies.get(species.scientificName));
    }
  });
});
