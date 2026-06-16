export const dynamic = 'force-dynamic';

import { db } from '@/db';
import { species, articles } from '@/db/schema';
import { eq, desc, asc } from 'drizzle-orm';
import Hero from '@/components/landing/hero';
import InfoBar from '@/components/landing/info-bar';
import ExploreThemes from '@/components/landing/explore-themes';
import FeaturedSpecies from '@/components/landing/featured-species';
import PollinatorSection from '@/components/landing/pollinator-section';
import LatestArticles from '@/components/landing/latest-articles';
import VisitCta from '@/components/landing/visit-cta';
import Footer from '@/components/landing/footer';

export default async function HomePage() {
  const [allSpecies, activeArticles] = await Promise.all([
    db.select().from(species).where(eq(species.isPublished, true)),
    db.select().from(articles).where(eq(articles.status, 'active')).orderBy(desc(articles.publishedAt)),
  ]);

  const featuredSpecies = allSpecies
    .filter((s: any) => s.featuredOnHome)
    .sort((a: any, b: any) => a.homeOrder - b.homeOrder);

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
