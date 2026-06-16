export const dynamic = 'force-dynamic';

import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import EdukasiClient from './edukasi-client';

export default async function EdukasiPage() {
  const allArticles = await db
    .select()
    .from(articles)
    .where(eq(articles.status, 'active'))
    .orderBy(desc(articles.publishedAt));

  return (
    <main className="min-h-screen bg-bg">
      <div className="page-container py-12">
        <div className="mb-10">
          <p className="section-kicker mb-2">Konten Edukasi</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-fg">Artikel Edukasi</h1>
          <p className="text-fg-muted mt-3 max-w-xl">
            Pelajari lebih lanjut tentang peran kupu-kupu sebagai polinator dan ekosistem Situs Purbakala Pugung Raharjo.
          </p>
        </div>
        <EdukasiClient articles={allArticles} />
      </div>
    </main>
  );
}
