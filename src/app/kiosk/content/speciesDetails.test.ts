import { getSpeciesDetail } from './speciesDetails';
import { describe, it, expect } from 'vitest';

describe('SPECIES_DETAILS', () => {
  it('contains Graphium agamemnon', () => {
    const detail = getSpeciesDetail('Graphium agamemnon');
    expect(detail).toBeDefined();
    expect(detail?.funFact.id).toBeTruthy();
    expect(detail?.ecosystemRole.en).toBeTruthy();
  });

  it('returns undefined for unknown species', () => {
    expect(getSpeciesDetail('Unknownus species')).toBeUndefined();
  });
});
