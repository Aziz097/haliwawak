export const dynamic = 'force-dynamic';

import { db } from '@/db';
import { species } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { withWebpPhotos } from '@/lib/kiosk-assets';
import SpeciesDetailClient from './species-detail-client';

export default async function SpeciesDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sp = await db
    .select()
    .from(species)
    .where(eq(species.slug, slug))
    .limit(1)
    .then((r) => r[0]);

  if (!sp || !sp.isPublished) notFound();

  return (
    <main className="min-h-screen bg-bg py-12">
      <div className="page-container">
        {/* Stored rows may predate the WebP conversion. */}
        <SpeciesDetailClient species={withWebpPhotos(sp)} />
      </div>
    </main>
  );
}
