import { unstable_cache } from 'next/cache';
import type { InferSelectModel } from 'drizzle-orm';
import { asc, desc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { articles, species, staticPages } from '@/db/schema';
import { withWebpPhotos } from '@/lib/kiosk-assets';

export type PublicSpeciesListItem = {
  id: number;
  slug: string | null;
  commonName: string;
  scientificName: string;
  family: string;
  iucnStatus: string | null;
  primaryPhotoUrl: string | null;
  featuredOnHome: boolean;
  homeOrder: number;
};

export type PublicArticleListItem = {
  id: number;
  slug: string;
  title: string;
  category: string;
  thumbnailUrl: string | null;
  summary: string | null;
  publishedAt: Date | null;
};

export type PublicSpeciesDetail = Omit<
  InferSelectModel<typeof species>,
  'dominantColors' | 'hostPlants' | 'pollinatedPlants' | 'activeMonths' | 'foundLocations' | 'galleryUrls'
> & {
  dominantColors: string[];
  hostPlants: string[];
  pollinatedPlants: string[];
  activeMonths: string[];
  foundLocations: string[];
  galleryUrls: string[];
};

const speciesListQuery = unstable_cache(
  async () =>
    db
      .select({
        id: species.id,
        slug: species.slug,
        commonName: species.commonName,
        scientificName: species.scientificName,
        family: species.family,
        iucnStatus: species.iucnStatus,
        primaryPhotoUrl: species.primaryPhotoUrl,
        featuredOnHome: species.featuredOnHome,
        homeOrder: species.homeOrder,
      })
      .from(species)
      .where(eq(species.isPublished, true))
      .orderBy(asc(species.homeOrder)),
  ['public-species-list'],
  { revalidate: 300, tags: ['species'] },
);

const articleListQuery = unstable_cache(
  async () =>
    db
      .select({
        id: articles.id,
        slug: articles.slug,
        title: articles.title,
        category: articles.category,
        thumbnailUrl: articles.thumbnailUrl,
        summary: articles.summary,
        publishedAt: articles.publishedAt,
      })
      .from(articles)
      .where(eq(articles.status, 'active'))
      .orderBy(desc(articles.publishedAt)),
  ['public-article-list'],
  { revalidate: 300, tags: ['articles'] },
);

export const getPublicSpecies = async () => {
  const rows = await speciesListQuery();
  return rows.map(withWebpPhotos);
};

export const getPublicArticles = articleListQuery;

export const getPublicSpeciesBySlug = (slug: string): Promise<PublicSpeciesDetail | undefined> =>
  unstable_cache(
    async () =>
      db
        .select()
        .from(species)
        .where(eq(species.slug, slug))
        .limit(1)
        .then((rows) => rows[0]),
    ['public-species-detail', slug],
    { revalidate: 300, tags: ['species', `species:${slug}`] },
  )().then((row) => (row ? (withWebpPhotos(row) as PublicSpeciesDetail) : undefined));

export const getPublicArticleBySlug = (slug: string) =>
  unstable_cache(
    async () =>
      db
        .select()
        .from(articles)
        .where(eq(articles.slug, slug))
        .limit(1)
        .then((rows) => rows[0]),
    ['public-article-detail', slug],
    { revalidate: 300, tags: ['articles', `article:${slug}`] },
  )();

export const getPublicStaticPage = (slug: string) =>
  unstable_cache(
    async () =>
      db
        .select({ content: staticPages.content, isActive: staticPages.isActive })
        .from(staticPages)
        .where(eq(staticPages.slug, slug))
        .limit(1)
        .then((rows) => rows[0]),
    ['public-static-page', slug],
    { revalidate: 300, tags: ['static-pages', `static-page:${slug}`] },
  )();
