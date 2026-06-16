export const dynamic = 'force-dynamic';

import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { STATIC_SPECIES } from '@/app/kiosk/content/staticSpecies';
import Hero from '@/components/landing/hero';
import InfoBar from '@/components/landing/info-bar';
import ExploreThemes from '@/components/landing/explore-themes';
import FeaturedSpecies from '@/components/landing/featured-species';
import PollinatorSection from '@/components/landing/pollinator-section';
import LatestArticles from '@/components/landing/latest-articles';
import VisitCta from '@/components/landing/visit-cta';
import Footer from '@/components/landing/footer';

export default async function HomePage() {
  const activeArticles = await db.select().from(articles).where(eq(articles.status, 'active')).orderBy(desc(articles.publishedAt));

  const allSpecies = STATIC_SPECIES.map((s) => ({
    ...s,
    primaryPhotoUrl: s.topPhotoUrl,
    slug: s.commonName.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-'),
  }));

  // We can manually feature a few species for the home page based on the curated static list.
  // For example, species 3, 14, 17, 23 (Least Concern species)
  const featuredIds = [3, 14, 17, 23];
  const featuredSpecies = allSpecies.filter((s) => featuredIds.includes(Number(s.id)));

  return (
    <>
      <Hero species={allSpecies} />
      <InfoBar />
      <ExploreThemes />
      <FeaturedSpecies species={allSpecies} featuredSpecies={featuredSpecies} />
      <PollinatorSection />
      <LatestArticles articles={activeArticles} />
      <VisitCta />
      <Footer />
    </>
  );
}
