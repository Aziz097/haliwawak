import { db } from './index';
import { staticPages } from './schema';
import { eq } from 'drizzle-orm';

const PAGES = [
  {
    title: 'Tentang Kami',
    slug: 'tentang-kami',
    navOrder: 1,
    isActive: true,
    metaTitle: 'Tentang - Situs Purbakala Pugung Raharjo',
    metaDescription: 'Kawasan cagar budaya dan alam di Lampung Timur yang menjadi rumah bagi keanekaragaman hayati, khususnya polinator.',
    content: `<section style="text-align:center; padding:4rem 1rem; background:#431407; color:white;">
  <h1 style="font-size:2.5rem; font-weight:bold; margin-bottom:1rem;">Situs Purbakala Pugung Raharjo</h1>
  <p style="max-width:600px; margin:0 auto; font-size:1.1rem; color:rgba(255,255,255,0.6);">Kawasan cagar budaya dan alam di Lampung Timur yang menjadi rumah bagi keanekaragaman hayati &mdash; khususnya polinator yang menjadi fondasi ketahanan pangan ekosistem Lampung.</p>
</section>

<section style="padding:4rem 1rem;">
  <div style="max-width:1100px; margin:0 auto; display:grid; grid-template-columns:repeat(3,1fr); gap:2rem; text-align:center;">
    <div style="background:white; border:1px solid #e5e7eb; border-radius:1rem; padding:2rem;">
      <p style="font-size:2.5rem; font-weight:bold; color:#F97316;">47+</p>
      <p style="color:#6b7280;">Spesies Terdokumentasi</p>
    </div>
    <div style="background:white; border:1px solid #e5e7eb; border-radius:1rem; padding:2rem;">
      <p style="font-size:2.5rem; font-weight:bold; color:#F97316;">33 Ha</p>
      <p style="color:#6b7280;">Luas Kawasan</p>
    </div>
    <div style="background:white; border:1px solid #e5e7eb; border-radius:1rem; padding:2rem;">
      <p style="font-size:2.5rem; font-weight:bold; color:#F97316;">Sejak 1967</p>
      <p style="color:#6b7280;">Cagar Budaya Nasional</p>
    </div>
  </div>
</section>

<section style="padding:4rem 1rem; border-top:1px solid #e5e7eb;">
  <div style="max-width:720px; margin:0 auto;">
    <h2 style="font-size:1.875rem; font-weight:bold; margin-bottom:1.5rem;">The Living Heritage</h2>
    <p style="color:#6b7280; line-height:1.75; margin-bottom:2rem;">Taman Purbakala Situs Megalitik Pugung Raharjo di Lampung Timur merupakan kawasan yang menyimpan nilai penting tidak hanya sebagai warisan budaya tetapi juga sebagai habitat potensial bagi keanekaragaman hayati, khususnya kupu-kupu.</p>
    <p style="color:#6b7280; line-height:1.75; font-style:italic; font-size:0.875rem;">The Pugung Raharjo Megalithic Site Archaeological Park in East Lampung holds profound significance, serving not only as a vital cultural heritage site but also as a potential sanctuary for biodiversity, particularly butterflies.</p>
  </div>
</section>

<section style="padding:4rem 1rem; background:#FFE8D9; border-top:1px solid #e5e7eb;">
  <div style="max-width:720px; margin:0 auto;">
    <h2 style="font-size:1.875rem; font-weight:bold; margin-bottom:1.5rem;">Ekosistem Kupu-Kupu</h2>
    <p style="color:#6b7280; line-height:1.75; margin-bottom:2rem;">Penilaian ekologis kami menunjukkan bahwa Situs Megalitik Pugung Raharjo jauh lebih dari sekadar jendela ke masa lalu &mdash; ini adalah tempat perlindungan alam yang berkembang dan tangguh. Data yang dikumpulkan menggambarkan habitat yang sangat stabil dan seimbang di mana populasi kupu-kupu lokal berkembang dalam harmoni yang sempurna.</p>
    <p style="color:#6b7280; line-height:1.75; font-style:italic; font-size:0.875rem;">Our ecological assessment reveals that the Pugung Raharjo Megalithic Site is far more than a window into the past &mdash; it is a thriving, resilient sanctuary for nature.</p>
  </div>
</section>`,
  },
  {
    title: 'Cara Berkunjung',
    slug: 'cara-berkunjung',
    navOrder: 2,
    isActive: true,
    metaTitle: 'Kunjungi - Situs Purbakala Pugung Raharjo',
    metaDescription: 'Rencanakan kunjungan Anda ke Situs Purbakala Pugung Raharjo dan saksikan keindahan alam serta keanekaragaman kupu-kupu.',
    content: `<section style="text-align:center; padding:4rem 1rem; background:#431407; color:white;">
  <h1 style="font-size:2.5rem; font-weight:bold; margin-bottom:1rem;">Cara Berkunjung</h1>
  <p style="max-width:600px; margin:0 auto; font-size:1.1rem; color:rgba(255,255,255,0.6);">Rencanakan kunjungan Anda ke Situs Purbakala Pugung Raharjo dan saksikan keindahan alam serta keanekaragaman kupu-kupu.</p>
</section>

<section style="padding:4rem 1rem;">
  <div style="max-width:1100px; margin:0 auto; display:grid; grid-template-columns:repeat(2,1fr); gap:2rem;">
    <div style="background:white; border:1px solid #e5e7eb; border-radius:1rem; padding:2rem;">
      <h2 style="font-size:1.5rem; font-weight:bold; margin-bottom:1rem;">Jam Operasional</h2>
      <p style="color:#6b7280; margin-bottom:0.5rem;">Senin &mdash; Minggu</p>
      <p style="font-weight:600;">08.00 &mdash; 16.00 WIB</p>
    </div>
    <div style="background:white; border:1px solid #e5e7eb; border-radius:1rem; padding:2rem;">
      <h2 style="font-size:1.5rem; font-weight:bold; margin-bottom:1rem;">Tiket Masuk</h2>
      <p style="color:#6b7280; margin-bottom:0.5rem;">Dewasa &amp; Anak-anak</p>
      <p style="font-weight:600;">Gratis</p>
    </div>
  </div>
</section>

<section style="padding:4rem 1rem; background:#FFE8D9; border-top:1px solid #e5e7eb;">
  <div style="max-width:720px; margin:0 auto;">
    <h2 style="font-size:1.875rem; font-weight:bold; margin-bottom:1.5rem;">Lokasi</h2>
    <p style="color:#6b7280; line-height:1.75; margin-bottom:2rem;">Jl. Pugung Raharjo, Kecamatan Sekampung Udik, Kabupaten Lampung Timur, Provinsi Lampung 34192</p>

    <h2 style="font-size:1.5rem; font-weight:bold; margin-bottom:1rem;">Call to Action</h2>
    <p style="color:#6b7280; line-height:1.75; margin-bottom:1.5rem;">Kepakan sayap kupu-kupu di Pugung Raharjo adalah tanda alam yang sehat. Mari ambil peran nyata untuk menjaga kelestarian mereka hari ini!</p>
    <ol style="list-style:none; padding:0; color:#6b7280;">
      <li style="margin-bottom:1rem; display:flex; gap:0.75rem;">
        <span style="width:1.5rem; height:1.5rem; border-radius:50%; background:#F97316; color:white; font-size:0.75rem; font-weight:bold; display:flex; align-items:center; justify-content:center; flex-shrink:0;">1</span>
        <div><p style="font-weight:600; color:#111;">Tanam Masa Depan</p><p style="font-size:0.875rem;">Jangan petik tanaman liar di sekitar situs. Tanpa ulat yang memakan daun inang, tidak akan ada kupu-kupu.</p></div>
      </li>
      <li style="margin-bottom:1rem; display:flex; gap:0.75rem;">
        <span style="width:1.5rem; height:1.5rem; border-radius:50%; background:#F97316; color:white; font-size:0.75rem; font-weight:bold; display:flex; align-items:center; justify-content:center; flex-shrink:0;">2</span>
        <div><p style="font-weight:600; color:#111;">Stop Pestisida</p><p style="font-size:0.875rem;">Hindari penggunaan pestisida dan racun kimia di area situs.</p></div>
      </li>
      <li style="margin-bottom:1rem; display:flex; gap:0.75rem;">
        <span style="width:1.5rem; height:1.5rem; border-radius:50%; background:#F97316; color:white; font-size:0.75rem; font-weight:bold; display:flex; align-items:center; justify-content:center; flex-shrink:0;">3</span>
        <div><p style="font-weight:600; color:#111;">Amati, Foto, Jangan Tangkap!</p><p style="font-size:0.875rem;">Abadikan keindahan kupu-kupu dengan kamera, jangan pernah menangkapnya.</p></div>
      </li>
      <li style="margin-bottom:1rem; display:flex; gap:0.75rem;">
        <span style="width:1.5rem; height:1.5rem; border-radius:50%; background:#F97316; color:white; font-size:0.75rem; font-weight:bold; display:flex; align-items:center; justify-content:center; flex-shrink:0;">4</span>
        <div><p style="font-weight:600; color:#111;">Jaga Kolam, Jaga Kupu-Kupu</p><p style="font-size:0.875rem;">Jangan membuang sampah atau mencuci tangan di Kolam Megalitik.</p></div>
      </li>
      <li style="margin-bottom:1rem; display:flex; gap:0.75rem;">
        <span style="width:1.5rem; height:1.5rem; border-radius:50%; background:#F97316; color:white; font-size:0.75rem; font-weight:bold; display:flex; align-items:center; justify-content:center; flex-shrink:0;">5</span>
        <div><p style="font-weight:600; color:#111;">Scan &amp; Learn</p><p style="font-size:0.875rem;">Pindai QR Code di papan informasi untuk mempelajari spesies.</p></div>
      </li>
    </ol>
  </div>
</section>`,
  },
  {
    title: 'Kontak',
    slug: 'kontak',
    navOrder: 3,
    isActive: true,
    metaTitle: 'Kontak - Situs Purbakala Pugung Raharjo',
    metaDescription: 'Hubungi kami untuk informasi lebih lanjut tentang Situs Purbakala Pugung Raharjo.',
    content: `<section style="text-align:center; padding:4rem 1rem; background:#431407; color:white;">
  <h1 style="font-size:2.5rem; font-weight:bold; margin-bottom:1rem;">Kontak Kami</h1>
  <p style="max-width:600px; margin:0 auto; font-size:1.1rem; color:rgba(255,255,255,0.6);">Hubungi kami untuk informasi lebih lanjut tentang Situs Purbakala Pugung Raharjo.</p>
</section>

<section style="padding:4rem 1rem;">
  <div style="max-width:720px; margin:0 auto;">
    <div style="background:white; border:1px solid #e5e7eb; border-radius:1rem; padding:2rem; margin-bottom:2rem;">
      <h2 style="font-size:1.5rem; font-weight:bold; margin-bottom:1rem;">Alamat</h2>
      <p style="color:#6b7280; line-height:1.75;">Jl. Pugung Raharjo, Kecamatan Sekampung Udik, Kabupaten Lampung Timur, Provinsi Lampung 34192</p>
    </div>
    <div style="background:white; border:1px solid #e5e7eb; border-radius:1rem; padding:2rem; margin-bottom:2rem;">
      <h2 style="font-size:1.5rem; font-weight:bold; margin-bottom:1rem;">Telepon &amp; Email</h2>
      <p style="color:#6b7280; margin-bottom:0.5rem;">Telepon: (0725) 123456</p>
      <p style="color:#6b7280;">Email: info@pugungraharjo.go.id</p>
    </div>
    <div style="background:white; border:1px solid #e5e7eb; border-radius:1rem; padding:2rem;">
      <h2 style="font-size:1.5rem; font-weight:bold; margin-bottom:1rem;">Jam Operasional</h2>
      <p style="color:#6b7280; margin-bottom:0.5rem;">Senin &mdash; Minggu</p>
      <p style="font-weight:600;">08.00 &mdash; 16.00 WIB</p>
    </div>
  </div>
</section>`,
  },
  {
    title: 'Tiket & Jam Operasional',
    slug: 'tiket',
    navOrder: 4,
    isActive: true,
    metaTitle: 'Tiket & Jam Operasional - Situs Purbakala Pugung Raharjo',
    metaDescription: 'Informasi tiket masuk dan jam operasional Situs Purbakala Pugung Raharjo.',
    content: `<section style="text-align:center; padding:4rem 1rem; background:#431407; color:white;">
  <h1 style="font-size:2.5rem; font-weight:bold; margin-bottom:1rem;">Tiket &amp; Jam Operasional</h1>
  <p style="max-width:600px; margin:0 auto; font-size:1.1rem; color:rgba(255,255,255,0.6);">Informasi harga tiket masuk dan jam operasional Situs Purbakala Pugung Raharjo.</p>
</section>

<section style="padding:4rem 1rem;">
  <div style="max-width:1100px; margin:0 auto; display:grid; grid-template-columns:repeat(2,1fr); gap:2rem;">
    <div style="background:white; border:1px solid #e5e7eb; border-radius:1rem; padding:2rem;">
      <h2 style="font-size:1.5rem; font-weight:bold; margin-bottom:1rem;">Jam Operasional</h2>
      <div style="color:#6b7280;">
        <p style="margin-bottom:0.5rem;"><strong style="color:#111;">Senin &mdash; Jumat</strong></p>
        <p style="margin-bottom:1rem;">08.00 &mdash; 16.00 WIB</p>
        <p style="margin-bottom:0.5rem;"><strong style="color:#111;">Sabtu &mdash; Minggu</strong></p>
        <p>08.00 &mdash; 17.00 WIB</p>
      </div>
    </div>
    <div style="background:white; border:1px solid #e5e7eb; border-radius:1rem; padding:2rem;">
      <h2 style="font-size:1.5rem; font-weight:bold; margin-bottom:1rem;">Harga Tiket</h2>
      <div style="color:#6b7280;">
        <p style="margin-bottom:0.5rem;"><strong style="color:#111;">Dewasa</strong></p>
        <p style="margin-bottom:1rem; font-weight:600;">Gratis</p>
        <p style="margin-bottom:0.5rem;"><strong style="color:#111;">Anak-anak (di bawah 12 tahun)</strong></p>
        <p style="margin-bottom:1rem; font-weight:600;">Gratis</p>
        <p style="margin-bottom:0.5rem;"><strong style="color:#111;">Kelompok (10+ orang)</strong></p>
        <p style="font-weight:600;">Gratis</p>
      </div>
    </div>
  </div>
</section>

<section style="padding:4rem 1rem; border-top:1px solid #e5e7eb;">
  <div style="max-width:720px; margin:0 auto; text-align:center;">
    <h2 style="font-size:1.875rem; font-weight:bold; margin-bottom:1rem;">Catatan Penting</h2>
    <ul style="list-style:none; padding:0; color:#6b7280; text-align:left;">
      <li style="margin-bottom:0.75rem; padding-left:1.5rem; position:relative;">
        <span style="position:absolute; left:0; color:#F97316;">&bull;</span>
        Tiket dapat dibeli langsung di lokasi pada hari kunjungan.
      </li>
      <li style="margin-bottom:0.75rem; padding-left:1.5rem; position:relative;">
        <span style="position:absolute; left:0; color:#F97316;">&bull;</span>
        Harap menjaga kebersihan dan tidak mengganggu satwa liar di area situs.
      </li>
      <li style="margin-bottom:0.75rem; padding-left:1.5rem; position:relative;">
        <span style="position:absolute; left:0; color:#F97316;">&bull;</span>
        Dilarang memetik bunga atau menangkap kupu-kupu.
      </li>
      <li style="padding-left:1.5rem; position:relative;">
        <span style="position:absolute; left:0; color:#F97316;">&bull;</span>
        Untuk kunjungan grup besar, silakan hubungi kami terlebih dahulu.
      </li>
    </ul>
  </div>
</section>`,
  },
];

export async function seedPages() {
  for (const page of PAGES) {
    const existing = await db.select().from(staticPages).where(eq(staticPages.slug, page.slug)).limit(1);
    if (existing.length === 0) {
      await db.insert(staticPages).values(page);
      console.log(`Seeded page: ${page.slug}`);
    } else {
      await db.update(staticPages).set(page).where(eq(staticPages.slug, page.slug));
      console.log(`Updated page: ${page.slug}`);
    }
  }
  console.log('Static pages seeding complete.');
}

seedPages()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });