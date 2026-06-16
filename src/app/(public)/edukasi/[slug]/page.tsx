export const dynamic = 'force-dynamic';

import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, BookOpen } from 'lucide-react';

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await db
    .select()
    .from(articles)
    .where(eq(articles.slug, slug))
    .limit(1)
    .then((r) => r[0]);

  if (!article || article.status !== 'active') notFound();

  return (
    <main className="min-h-screen bg-bg py-12">
      <div className="page-container">
        <Link href="/edukasi" className="inline-flex items-center gap-2 text-fg-muted hover:text-primary transition-colors mb-8 text-sm font-medium">
          <ChevronLeft className="w-4 h-4" /> Kembali ke Artikel
        </Link>

        <article className="max-w-4xl mx-auto">
          {article.thumbnailUrl && (
            <div className="aspect-[2/1] rounded-2xl overflow-hidden mb-8 bg-primary-light">
              <img src={article.thumbnailUrl} alt={article.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="content-narrow">
            <span className="inline-block text-xs font-bold text-accent-warm bg-accent-warm/10 px-3 py-1.5 rounded-md mb-4">
              {article.category}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-fg leading-tight mb-6">
              {article.title}
            </h1>
            {article.summary && (
              <blockquote className="font-serif text-lg md:text-xl italic text-fg-muted border-l-4 border-primary pl-6 py-2 mb-8 bg-card-bg rounded-r-xl">
                {article.summary}
              </blockquote>
            )}
            <div className="text-fg-muted leading-relaxed whitespace-pre-line font-light text-base md:text-lg">
              {article.content || 'Konten artikel tidak tersedia.'}
            </div>
            {article.publishedAt && (
              <div className="mt-12 pt-8 border-t border-card-border text-sm text-fg-muted/50">
                Dipublikasikan pada {new Date(article.publishedAt).toLocaleDateString('id-ID', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              </div>
            )}
          </div>
        </article>
      </div>
    </main>
  );
}
