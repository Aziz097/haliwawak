export const dynamic = 'force-dynamic';

import { db } from '@/db';
import { articles, species } from '@/db/schema';
import { eq, asc, desc } from 'drizzle-orm';
import { withWebpPhotos } from '@/lib/kiosk-assets';
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

  // Same query as /katalog and the kiosk's species endpoint. The home page used
  // to read the kiosk's STATIC_SPECIES fallback instead and derive its own slugs
  // from the scientific name, so it showed different names, no IUCN status, and
  // linked 8 of 25 species to /katalog/<slug> pages that do not exist.
  const rows = await db
    .select()
    .from(species)
    .where(eq(species.isPublished, true))
    .orderBy(asc(species.homeOrder));

  const allSpecies = rows.map(withWebpPhotos);

  // Curated in the CMS via `featuredOnHome`; until an editor flags any, fall
  // back to the first few in `homeOrder` so the section is never empty.
  const flagged = allSpecies.filter((s) => s.featuredOnHome);
  const featuredSpecies = flagged.length > 0 ? flagged : allSpecies.slice(0, 4);

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
