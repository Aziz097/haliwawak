import { writeFileSync } from 'node:fs';
import * as path from 'path';

const OUTPUT = path.join(__dirname, '..', 'docs', 'LOGBOOK-PROYEK.csv');

const data = [
  ['LOGBOOK PENGEMBANGAN PROYEK'],
  ['Website Eduwisata Polinator - Pugung Raharjo, Lampung Timur'],
  [''],
  ['No', 'Tanggal', 'Kegiatan', 'Foto / Screenshoot'],
  [
    1,
    '',
    'Pengumpulan data kebutuhan pengguna - wawancara mitra dan analisis kebutuhan fungsional serta non-fungsional',
    'docs/evidence/erd/ERD.jpeg',
  ],
  [
    2,
    '',
    'Analisis kebutuhan dan dokumentasi - penyusunan dokumen spesifikasi kebutuhan (SRS) dan ERD',
    'docs/schema.dbml, docs/evidence/erd/ERD.jpeg',
  ],
  [
    3,
    '',
    'Perancangan wireframe dan sketsa halaman',
    'docs/evidence/01-homepage.png, docs/evidence/02-katalog.png',
  ],
  [
    4,
    '',
    'Perencanaan arsitektur sistem - penentuan tech stack (Next.js 15, Drizzle ORM, Supabase PostgreSQL)',
    'docs/diagrams/01-flowchart.md, docs/diagrams/08-sitemap.md',
  ],
  [
    5,
    '',
    'Setup environment pengembangan - inisialisasi project, konfigurasi Drizzle ORM, dan koneksi database',
    'docs/schema.dbml',
  ],
  [
    6,
    '',
    'Pembuatan database schema dan migration - mendefinisikan 7 tabel menggunakan Drizzle ORM',
    'docs/schema.dbml, docs/evidence/erd/ERD.jpeg',
  ],
  [
    7,
    '',
    'Pemaparan desain awal kepada ketua tim dan jajarannya',
    'docs/evidence/01-homepage.png, docs/evidence/05-admin-dashboard.png',
  ],
  [
    8,
    '',
    'Pengembangan backend - pembuatan API routes, authentication, dan seed data',
    'docs/schema.dbml',
  ],
  [
    9,
    '',
    'Pengembangan frontend - pembuatan halaman public (landing, katalog, edukasi) dan admin CMS',
    'docs/evidence/01-homepage.png, docs/evidence/02-katalog.png, docs/evidence/05-admin-dashboard.png',
  ],
  [
    10,
    '',
    'Pengembangan fitur kiosk mode dan integrasi seluruh modul',
    'docs/evidence/11-kiosk.png',
  ],
  [
    11,
    '',
    'Pemaparan ke mitra pengabdian',
    'docs/evidence/01-homepage.png, docs/evidence/11-kiosk.png',
  ],
  [
    12,
    '',
    'Revisi atau pengembangan lebih lanjut berdasarkan saran dan masukan dari mitra (perbaikan konten, desain, dan fitur)',
    'docs/evidence/01-homepage.png',
  ],
  [
    13,
    '',
    'Deployment ke production dan serah terima akses admin kepada mitra',
    'docs/evidence/01-homepage.png',
  ],
  [''],
  ['Keterangan:'],
  ['1. Isi kolom Tanggal dengan format DD-MM-YYYY'],
  ['2. Semua file screenshot ada di folder cms-nextjs/docs/evidence/'],
  ['3. Diagram: cms-nextjs/docs/diagrams/'],
  ['4. ERD: cms-nextjs/docs/schema.dbml (paste ke dbdiagram.io)'],
];

const csv = data
  .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(','))
  .join('\n');

writeFileSync(OUTPUT, `\uFEFF${csv}\n`, 'utf8');
console.log('Done:', OUTPUT);
