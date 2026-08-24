export const revalidate = 300;

import { notFound } from 'next/navigation';
import { getPublicSpeciesBySlug } from '@/lib/public-data';
import type { PublicSpeciesDetail } from '@/lib/public-data';
import SpeciesDetailClient from './species-detail-client';

export default async function SpeciesDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sp = (await getPublicSpeciesBySlug(slug)) as PublicSpeciesDetail | undefined;

  if (!sp || !sp.isPublished) notFound();

  return (
    <main className="min-h-screen bg-bg py-12">
      <div className="page-container">
        <SpeciesDetailClient species={sp} />
      </div>
    </main>
  );
}
