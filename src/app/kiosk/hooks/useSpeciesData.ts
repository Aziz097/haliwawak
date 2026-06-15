'use client';

/**
 * Species-data fetch hook with static fallback.
 *
 * On mount this hook requests `/api/kiosk/species`, maps the returned rows into
 * the `KioskSpecies` view model, and exposes a small state object the
 * species-dependent screens (Virtual Insektarium, Data Spesies) consume.
 *
 * Resilience (Req 16): any failure - a network error, a non-2xx response,
 * invalid JSON, or a hung request that exceeds the defensive ~10s timeout - is
 * treated the same way: the hook substitutes the static fallback list from
 * `content/staticSpecies.ts`, sets `usedFallback = true`, and reports
 * `status = 'error'` without throwing or navigating away.
 *
 * Requirements: 16.1, 16.3, 16.4
 */

import { useEffect, useState } from 'react';
import { mapSpeciesRow, type KioskSpecies } from '../lib/speciesMapping';
import { STATIC_SPECIES } from '../content/staticSpecies';
import { enrichSpeciesPhotos } from '../content/speciesPhotos';

/** Loading lifecycle for the species fetch. */
export type SpeciesDataStatus = 'loading' | 'ready' | 'error';

/** Public shape returned by {@link useSpeciesData}. */
export type SpeciesData = {
  status: SpeciesDataStatus;
  species: KioskSpecies[];
  usedFallback: boolean;
};

/** Endpoint serving the published kiosk species rows. */
const SPECIES_ENDPOINT = '/api/kiosk/species';

/** Defensive request timeout: treat a hung request as a failure. */
const REQUEST_TIMEOUT_MS = 10_000;

/**
 * Fetch kiosk species with a static fallback.
 *
 * @returns `{ status, species, usedFallback }` - `species` is the mapped API
 * result when `status === 'ready'`, or the static fallback list when
 * `status === 'error'` (in which case `usedFallback` is `true`).
 */
export function useSpeciesData(): SpeciesData {
  const [state, setState] = useState<SpeciesData>({
    status: 'loading',
    species: [],
    usedFallback: false,
  });

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    // Reset to loading on mount (also guards against React Strict Mode re-runs).
    setState({ status: 'loading', species: [], usedFallback: false });

    const applyFallback = () => {
      if (cancelled) return;
      setState({
        status: 'error',
        species: STATIC_SPECIES,
        usedFallback: true,
      });
    };

    const load = async () => {
      try {
        const response = await fetch(SPECIES_ENDPOINT, {
          signal: controller.signal,
        });

        // Non-2xx responses are failures (Req 16.3).
        if (!response.ok) {
          applyFallback();
          return;
        }

        // Invalid JSON throws here and is caught below (Req 16.3).
        const payload: unknown = await response.json();

        if (!Array.isArray(payload)) {
          applyFallback();
          return;
        }

        if (cancelled) return;

        const species = enrichSpeciesPhotos(
          payload.map((row) => mapSpeciesRow(row as Record<string, unknown>)),
        );
        setState({ status: 'ready', species, usedFallback: false });
      } catch {
        // Network error, abort/timeout, or invalid JSON all fall back (Req 16.4).
        applyFallback();
      }
    };

    void load();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  return state;
}
