export const dynamic = 'force-dynamic';

import { db } from '@/db';
import { species } from '@/db/schema';
import { eq } from 'drizzle-orm';
import CatalogClient from './catalog-client';

export default async function KatalogPage() {
  const allSpecies = await db
    .select()
    .from(species)
    .where(eq(species.isPublished, true));

  return (
    <main className="min-h-screen bg-bg">
      <div className="page-container py-12">
        <div className="mb-10">
          <p className="section-kicker mb-2">Ensiklopedia Spesies</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-fg">Katalog Kupu-kupu</h1>
          <p className="text-fg-muted mt-3 max-w-xl">
            Seluruh spesies Lepidoptera yang terdokumentasi di Situs Purbakala Pugung Raharjo.
          </p>
        </div>
        <CatalogClient species={allSpecies} />
      </div>
    </main>
  );
}
