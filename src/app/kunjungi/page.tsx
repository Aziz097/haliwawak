import { db } from '@/db';
import { staticPages } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Clock, Ticket, MapPin, Calendar } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Kunjungi - Situs Purbakala Pugung Raharjo',
};

export default async function KunjungiPage() {
  const page = await db.select().from(staticPages).where(eq(staticPages.slug, 'cara-berkunjung')).limit(1).then(r => r[0]);

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
          <Calendar className="w-12 h-12 text-[#4ADE80] mx-auto mb-6" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">Cara Berkunjung</h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Rencanakan kunjungan Anda ke Situs Purbakala Pugung Raharjo dan saksikan keindahan alam serta keanekaragaman kupu-kupu.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="page-container grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card-bg border border-card-border rounded-2xl p-8">
            <Clock className="w-8 h-8 text-primary mb-4" />
            <h2 className="font-heading text-2xl font-bold text-fg mb-4">Jam Operasional</h2>
            <p className="text-fg-muted mb-2">Senin &mdash; Minggu</p>
            <p className="text-fg font-semibold">08.00 &mdash; 16.00 WIB</p>
          </div>
          <div className="bg-card-bg border border-card-border rounded-2xl p-8">
            <Ticket className="w-8 h-8 text-primary mb-4" />
            <h2 className="font-heading text-2xl font-bold text-fg mb-4">Tiket Masuk</h2>
            <p className="text-fg-muted mb-2">Dewasa &amp; Anak-anak</p>
            <p className="text-fg font-semibold">Rp 5.000 / orang</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-primary-light/50 border-t border-card-border">
        <div className="content-narrow">
          <h2 className="font-heading text-3xl font-bold text-fg mb-6">Lokasi</h2>
          <div className="flex items-start gap-3 text-fg-muted mb-8">
            <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
            <p className="leading-relaxed">Jl. Pugung Raharjo, Kecamatan Sekampung Udik, Kabupaten Lampung Timur, Provinsi Lampung 34192</p>
          </div>

          <h2 className="font-heading text-2xl font-bold text-fg mb-4">Call to Action</h2>
          <p className="text-fg-muted leading-relaxed mb-6">
            Kepakan sayap kupu-kupu di Pugung Raharjo adalah tanda alam yang sehat. Mari ambil peran nyata untuk menjaga kelestarian mereka hari ini!
          </p>
          <ol className="space-y-4 text-fg-muted">
            {[
              { title: 'Tanam Masa Depan', desc: 'Jangan petik tanaman liar di sekitar situs. Tanpa ulat yang memakan daun inang, tidak akan ada kupu-kupu.' },
              { title: 'Stop Pestisida', desc: 'Hindari penggunaan pestisida dan racun kimia di area situs.' },
              { title: 'Amati, Foto, Jangan Tangkap!', desc: 'Abadikan keindahan kupu-kupu dengan kamera, jangan pernah menangkapnya.' },
              { title: 'Jaga Kolam, Jaga Kupu-Kupu', desc: 'Jangan membuang sampah atau mencuci tangan di Kolam Megalitik.' },
              { title: 'Scan & Learn', desc: 'Pindai QR Code di papan informasi untuk mempelajari spesies.' },
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <div>
                  <p className="font-semibold text-fg">{item.title}</p>
                  <p className="text-sm">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}