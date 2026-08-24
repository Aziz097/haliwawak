export const revalidate = 300;

import { getPublicArticles, getPublicSpecies } from '@/lib/public-data';
import Hero from '@/components/landing/hero';
import InfoBar from '@/components/landing/info-bar';
import ExploreThemes from '@/components/landing/explore-themes';
import FeaturedSpecies from '@/components/landing/featured-species';
import PollinatorSection from '@/components/landing/pollinator-section';
import LatestArticles from '@/components/landing/latest-articles';
import VisitCta from '@/components/landing/visit-cta';
import Footer from '@/components/landing/footer';

export default async function HomePage() {
  const [activeArticles, allSpecies] = await Promise.all([getPublicArticles(), getPublicSpecies()]);

  // Curated in the CMS via `featuredOnHome`; until an editor flags any, fall
  // back to the first few in `homeOrder` so the section is never empty.
  const flagged = allSpecies.filter((s) => s.featuredOnHome);
  const featuredSpecies = flagged.length > 0 ? flagged : allSpecies.slice(0, 4);

  return (
    <>
      <Hero />
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
