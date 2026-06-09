import { db } from '@/db';
import { staticPages } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { MapPin } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Tentang — Situs Purbakala Pugung Raharjo',
};

const FALLBACK_CONTENT = `
<section className="bg-section-dark text-white py-24 px-4">
  <div className="page-container text-center">
    <MapPin className="w-12 h-12 text-[#4ADE80] mx-auto mb-6" />
    <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">Situs Purbakala Pugung Raharjo</h1>
    <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
      Kawasan cagar budaya dan alam di Lampung Timur yang menjadi rumah bagi keanekaragaman hayati &mdash; khususnya polinator yang menjadi fondasi ketahanan pangan ekosistem Lampung.
    </p>
  </div>
</section>

<section className="py-16 px-4">
  <div className="page-container">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="text-center bg-card-bg border border-card-border rounded-2xl p-8">
        <p className="font-heading text-4xl font-bold text-primary mb-2">47+</p>
        <p className="text-fg-muted font-medium">Spesies Terdokumentasi</p>
      </div>
      <div className="text-center bg-card-bg border border-card-border rounded-2xl p-8">
        <p className="font-heading text-4xl font-bold text-primary mb-2">33 Ha</p>
        <p className="text-fg-muted font-medium">Luas Kawasan</p>
      </div>
      <div className="text-center bg-card-bg border border-card-border rounded-2xl p-8">
        <p className="font-heading text-4xl font-bold text-primary mb-2">Sejak 1967</p>
        <p className="text-fg-muted font-medium">Cagar Budaya Nasional</p>
      </div>
    </div>
  </div>
</section>

<section className="py-16 px-4 border-t border-card-border">
  <div className="content-narrow">
    <h2 className="font-heading text-3xl font-bold text-fg mb-6">The Living Heritage</h2>
    <p className="text-fg-muted leading-relaxed mb-8">
      Taman Purbakala Situs Megalitik Pugung Raharjo di Lampung Timur merupakan kawasan yang menyimpan nilai penting tidak hanya sebagai warisan budaya tetapi juga sebagai habitat potensial bagi keanekaragaman hayati, khususnya kupu-kupu.
    </p>
    <p className="text-fg-muted leading-relaxed italic text-sm">
      The Pugung Raharjo Megalithic Site Archaeological Park in East Lampung holds profound significance, serving not only as a vital cultural heritage site but also as a potential sanctuary for biodiversity, particularly butterflies.
    </p>
  </div>
</section>

<section className="py-16 px-4 bg-primary-light/50 border-t border-card-border">
  <div className="content-narrow">
    <h2 className="font-heading text-3xl font-bold text-fg mb-6">Ekosistem Kupu-Kupu</h2>
    <p className="text-fg-muted leading-relaxed mb-8">
      Penilaian ekologis kami menunjukkan bahwa Situs Megalitik Pugung Raharjo jauh lebih dari sekadar jendela ke masa lalu &mdash; ini adalah tempat perlindungan alam yang berkembang dan tangguh.
    </p>
    <p className="text-fg-muted leading-relaxed italic text-sm">
      Our ecological assessment reveals that the Pugung Raharjo Megalithic Site is far more than a window into the past &mdash; it is a thriving, resilient sanctuary for nature.
    </p>
  </div>
</section>
`;

export default async function TentangPage() {
  const page = await db.select().from(staticPages).where(eq(staticPages.slug, 'tentang-kami')).limit(1).then(r => r[0]);

  if (page && page.isActive) {
    return (
      <main className="min-h-screen bg-bg">
        <div className="content-narrow py-16 px-4" dangerouslySetInnerHTML={{ __html: page.content }} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg">
      <section className="bg-section-dark text-white py-24 px-4">
        <div className="page-container text-center">
          <MapPin className="w-12 h-12 text-[#4ADE80] mx-auto mb-6" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">Situs Purbakala Pugung Raharjo</h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Kawasan cagar budaya dan alam di Lampung Timur yang menjadi rumah bagi keanekaragaman hayati &mdash; khususnya polinator yang menjadi fondasi ketahanan pangan ekosistem Lampung.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { v: '47+', l: 'Spesies Terdokumentasi' },
              { v: '33 Ha', l: 'Luas Kawasan' },
              { v: 'Sejak 1967', l: 'Cagar Budaya Nasional' },
            ].map((s) => (
              <div key={s.l} className="text-center bg-card-bg border border-card-border rounded-2xl p-8">
                <p className="font-heading text-4xl font-bold text-primary mb-2">{s.v}</p>
                <p className="text-fg-muted font-medium">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 border-t border-card-border">
        <div className="content-narrow">
          <h2 className="font-heading text-3xl font-bold text-fg mb-6">The Living Heritage</h2>
          <p className="text-fg-muted leading-relaxed mb-8">
            Taman Purbakala Situs Megalitik Pugung Raharjo di Lampung Timur merupakan kawasan yang menyimpan nilai penting tidak hanya sebagai warisan budaya tetapi juga sebagai habitat potensial bagi keanekaragaman hayati, khususnya kupu-kupu.
          </p>
          <p className="text-fg-muted leading-relaxed italic text-sm">
            The Pugung Raharjo Megalithic Site Archaeological Park in East Lampung holds profound significance, serving not only as a vital cultural heritage site but also as a potential sanctuary for biodiversity, particularly butterflies.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-primary-light/50 border-t border-card-border">
        <div className="content-narrow">
          <h2 className="font-heading text-3xl font-bold text-fg mb-6">Ekosistem Kupu-Kupu</h2>
          <p className="text-fg-muted leading-relaxed mb-8">
            Penilaian ekologis kami menunjukkan bahwa Situs Megalitik Pugung Raharjo jauh lebih dari sekadar jendela ke masa lalu &mdash; ini adalah tempat perlindungan alam yang berkembang dan tangguh. Data yang dikumpulkan menggambarkan habitat yang sangat stabil dan seimbang di mana populasi kupu-kupu lokal berkembang dalam harmoni yang sempurna.
          </p>
          <p className="text-fg-muted leading-relaxed italic text-sm">
            Our ecological assessment reveals that the Pugung Raharjo Megalithic Site is far more than a window into the past &mdash; it is a thriving, resilient sanctuary for nature.
          </p>
        </div>
      </section>
    </main>
  );
}