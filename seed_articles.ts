import { db } from './src/db';
import { articles, accounts } from './src/db/schema';

async function main() {
  const users = await db.select({ id: accounts.id, email: accounts.email }).from(accounts);
  const find = (email: string) => users.find((u) => u.email === email)?.id ?? 1;

  const articlesData = [
    {
      title: 'Menjaga Kolam Megalitik: Mata Air Kehidupan Kupu-Kupu',
      slug: 'menjaga-kolam-megalitik-mata-air-kehidupan-kupu-kupu',
      category: 'Edukasi Ekosistem',
      summary: 'Kolam purba di Pugung Raharjo bukan sekadar peninggalan sejarah—ia adalah jantung ekosistem yang memberi kehidupan bagi kupu-kupu. Pelajari tentang puddling, bioindikator, dan harmoni leluhur.',
      content: `<h2>Kolam Purba yang Hidup</h2>
<p>Kolam Purba di Pugung Raharjo bukan sekadar peninggalan sejarah yang mati. Hingga hari ini, ia adalah jantung ekosistem yang berdenyut, memberi kehidupan bagi ratusan kepakan sayap kupu-kupu.</p>
<h3>Mengapa satu tetes air di kolam ini begitu berarti?</h3>
<h4>Puddling: Rahasia Cinta Kupu-Kupu Jantan</h4>
<p>Pernahkah Anda melihat kupu-kupu berkumpul di tepi kolam yang basah? Mereka tidak hanya minum. Kupu-kupu jantan sedang melakukan proses <em>puddling</em> (mengasin)—menyerap mineral esensial dari tanah basah di sekitar kolam untuk modal energi dan kesuksesan proses reproduksi mereka. Tanpa kolam ini, generasi baru kupu-kupu indah di sini akan terancam.</p>
<h4>Penjaga Alami Kualitas Air (Bioindikator)</h4>
<p>Kupu-kupu adalah mahluk yang sangat sensitif. Kehadiran mereka yang melimpah di sekitar kolam adalah sertifikat alami dari alam: bukti bahwa air di Situs Pugung Raharjo masih murni, bersih, dan bebas dari polutan kimia berbahaya.</p>
<h4>Harmoni Leluhur: Titik Keseimbangan Alam</h4>
<p>Masyarakat megalitik masa lalu membangun situs ini dengan kecerdasan ekologis yang luar biasa. Dalam lanskap spiritual mereka, kolam ini adalah titik harmoni yang menyatukan elemen Bumi (punden berundak), Udara (ruang terbuka), dan Air. Menjaga kolam ini berarti menghormati warisan spiritual dan ekologis para leluhur kita.</p>`,
      status: 'active',
      publishedAt: new Date(),
      authorId: find('superadmin@eduwisata.id'),
    },
    {
      title: 'Metamorfosis Kupu-Kupu',
      slug: 'metamorfosis-kupu-kupu',
      category: 'Ensiklopedia Spesies',
      summary: 'Proses metamorfosis sempurna kupu-kupu dari telur, ulat, kepompong, hingga menjadi imago yang indah.',
      content: `<h2>Siklus Metamorfosis Sempurna</h2>
<p>Kupu-kupu mengalami metamorfosis sempurna (holometabola) dalam empat tahap kehidupan yang menakjubkan:</p>
<h3>1. Fase Telur</h3>
<p>Telur diletakkan secara tunggal atau berkelompok pada daun muda tanaman inang. Setiap spesies memiliki bentuk dan warna telur yang khas. Telur biasanya menetas dalam 5–7 hari.</p>
<h3>2. Fase Ulat (Larva)</h3>
<p>Ulat memakan daun inangnya tanpa henti untuk mengumpulkan energi. Fase ini sangat krusial karena energi yang diserap digunakan untuk seluruh hidupnya kelak. Ulat mengalami beberapa kali pergantian kulit (instar) sebelum memasuki fase berikutnya.</p>
<h3>3. Fase Kepompong (Pupa)</h3>
<p>Ulat berubah menjadi kepompong yang diam dan tampak tidak bergerak. Di dalam kepompong, terjadi transformasi luar biasa—jaringan tubuh ulat hancur dan terbentuk kembali menjadi struktur tubuh kupu-kupu dewasa. Fase ini berlangsung selama 10–20 hari tergantung spesies.</p>
<h3>4. Fase Dewasa (Imago)</h3>
<p>Kupu-kupu dewasa keluar dari kepompong dengan sayap yang masih basah dan lembek. Dalam beberapa jam, sayap mengering dan mengeras, siap untuk terbang mencari nektar dan memulai siklus reproduksi.</p>`,
      status: 'active',
      publishedAt: new Date(),
      authorId: find('editor@eduwisata.id'),
    },
    {
      title: 'Ekosistem Kupu-Kupu di Pugung Raharjo',
      slug: 'ekosistem-kupu-kupu-di-pugung-raharjo',
      category: 'Laporan Konservasi',
      summary: 'Penilaian ekologis menunjukkan Situs Megalitik Pugung Raharjo adalah habitat yang stabil dan seimbang bagi populasi kupu-kupu.',
      content: `<h2>Penilaian Ekologis Situs Megalitik Pugung Raharjo</h2>
<p>Penilaian ekologis kami menunjukkan bahwa Situs Megalitik Pugung Raharjo jauh lebih dari sekadar jendela ke masa lalu—ini adalah tempat perlindungan alam yang berkembang dan tangguh. Data yang dikumpulkan menggambarkan habitat yang sangat stabil dan seimbang di mana populasi kupu-kupu lokal berkembang dalam harmoni yang sempurna.</p>
<p>Dari keragaman spesies yang kaya hingga distribusi yang sangat merata di seluruh ekosistem, metrik ini menyoroti lingkungan sehat yang tetap tidak terganggu oleh kerusakan ekologis.</p>
<h3>Indeks Keanekaragaman (H')</h3>
<p><strong>2,77</strong> — Kategori: Sedang. Menunjukkan kekayaan spesies kupu-kupu yang melimpah dan terjaga di habitatnya.</p>
<h3>Indeks Kemerataan (E)</h3>
<p><strong>0,91</strong> — Kategori: Tinggi. Populasi antar-spesies tersebar merata, menandakan tidak adanya kesenjangan ekologis.</p>
<h3>Indeks Dominansi (D)</h3>
<p><strong>0,00 – 0,13</strong> — Kategori: Rendah. Lingkungan yang sehat, di mana tidak ada spesies tunggal yang mendominasi habitat.</p>
<p>Temuan ini menegaskan bahwa Pugung Raharjo bukan hanya warisan budaya, tetapi juga kawasan konservasi keanekaragaman hayati yang perlu dijaga keberlanjutannya.</p>`,
      status: 'active',
      publishedAt: new Date(),
      authorId: find('admin@eduwisata.id'),
    },
    {
      title: 'Call to Action: Melindungi Kupu-Kupu',
      slug: 'call-to-action-melindungi-kupu-kupu',
      category: 'Edukasi Ekosistem',
      summary: 'Lima aksi nyata yang dapat Anda lakukan untuk membantu menjaga kelestarian kupu-kupu di Situs Pugung Raharjo.',
      content: `<h2>5 Aksi Nyata Menjaga Kupu-Kupu</h2>
<p>Kepakan sayap kupu-kupu di Pugung Raharjo adalah tanda alam yang sehat—mari ambil peran nyata untuk menjaga kelestarian mereka hari ini!</p>
<h3>1. Tanam Masa Depan: Satu Bibit untuk Seribu Sayap</h3>
<p><strong>Aksi Nyata:</strong> Jangan petik tanaman liar di sekitar situs.</p>
<p><strong>Mengapa Penting?</strong> Tanpa ulat yang memakan daun inang ini, tidak akan pernah ada kupu-kupu yang terbang indah.</p>
<h3>2. Stop Pestisida: Lindungi Penjaga Alami Kita</h3>
<p><strong>Aksi Nyata:</strong> Hindari penggunaan pestisida dan racun kimia di area situs maupun lingkungan sekitar.</p>
<p><strong>Mengapa Penting?</strong> Kupu-kupu adalah bioindikator; kehadiran mereka membuktikan udara dan air Pugung Raharjo masih murni.</p>
<h3>3. Amati, Foto, Jangan Tangkap!</h3>
<p><strong>Aksi Nyata:</strong> Abadikan keindahan kupu-kupu dengan kamera ponsel Anda, jangan pernah menangkapnya.</p>
<p><strong>Mengapa Penting?</strong> Spesies langka seperti Kupu-Kupu Raja (<em>Troides helena</em>) dilindungi hukum. Biarkan mereka tetap merdeka di alam.</p>
<h3>4. Jaga Kolam, Jaga Kupu-Kupu</h3>
<p><strong>Aksi Nyata:</strong> Jangan membuang sampah atau mencuci tangan pakai sabun langsung di air Kolam Megalitik.</p>
<p><strong>Mengapa Penting?</strong> Kupu-kupu jantan butuh mineral dari tepian kolam bersih (<em>puddling</em>) untuk bereproduksi.</p>
<h3>5. Scan &amp; Learn: Jadilah Ilmuwan Warga</h3>
<p><strong>Aksi Nyata:</strong> Pindai QR Code di papan informasi untuk mempelajari spesies dan laporkan temuan Anda.</p>
<p><strong>Mengapa Penting?</strong> Kontribusi data foto dari Anda membantu tim peneliti ITERA memantau kelestarian ekosistem digital ini.</p>`,
      status: 'active',
      publishedAt: new Date(),
      authorId: find('editor@eduwisata.id'),
    },
  ];

  for (const a of articlesData) {
    await db.insert(articles).values({
      title: a.title,
      slug: a.slug,
      category: a.category,
      content: a.content,
      summary: a.summary,
      status: a.status,
      publishedAt: a.publishedAt,
      authorId: a.authorId,
    }).onConflictDoNothing({ target: articles.slug });
    console.log(`Article "${a.title}" created.`);
  }

  console.log('Article seeding complete!');
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
