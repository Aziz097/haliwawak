# Software Requirements Specification (SRS)

## Website Eduwisata Polinator

### Pugung Raharjo, Lampung Timur

**Versi:** 1.0  
**Tanggal:** Juli 2026  
**Standar:** IEEE 830-1998

---

## Daftar Isi

1. [Pendahuluan](#1-pendahuluan)
2. [Deskripsi Umum](#2-deskripsi-umum)
3. [Persyaratan Fungsional](#3-persyaratan-fungsional)
4. [Persyaratan Non-Fungsional](#4-persyaratan-non-fungsional)
5. [Antarmuka Eksternal](#5-antarmuka-eksternal)
6. [Kebutuhan Performa](#6-kebutuhan-performa)
7. [Batasan Desain](#7-batasan-desain)
8. [Persyaratan Keamanan](#8-persyaratan-keamanan)
9. [Persyaratan Lainnya](#9-persyaratan-lainnya)
10. [Lampiran](#10-lampiran)

---

## 1. Pendahuluan

### 1.1 Tujuan Dokumen

Dokumen ini menyajikan Spesifikasi Kebutuhan Perangkat Lunak (SRS) untuk Website Eduwisata Polinator yang dikembangkan oleh Tim Pengabdian Masyarakat Institut Teknologi Sumatera (ITERA). Dokumen ini disusun sesuai standar IEEE 830-1998 sebagai acuan pengembangan dan evaluasi sistem.

### 1.2 Ruang Lingkup

Sistem yang dikembangkan adalah platform edukasi digital berbasis web yang terdiri dari:

- **Website Publik** — Informasi spesies kupu-kupu, artikel edukasi, dan informasi kunjungan
- **Content Management System (CMS)** — Panel admin untuk mengelola konten, spesies, media, dan pengguna
- **Kiosk Mode** — Antarmuka interaktif layar sentuh 10 screen untuk display di lokasi situs

### 1.3 Definisi, Akronim, dan Singkatan

| Istilah | Definisi                                       |
| ------- | ---------------------------------------------- |
| CMS     | Content Management System                      |
| ERD     | Entity Relationship Diagram                    |
| CRUD    | Create, Read, Update, Delete                   |
| SRS     | Software Requirements Specification            |
| UI/UX   | User Interface / User Experience               |
| SSR     | Server-Side Rendering                          |
| ORM     | Object-Relational Mapping                      |
| API     | Application Programming Interface              |
| IUCN    | International Union for Conservation of Nature |
| JSON    | JavaScript Object Notation                     |

### 1.4 Referensi

| Dokumen             | Sumber                               |
| ------------------- | ------------------------------------ |
| IEEE 830-1998       | IEEE Recommended Practice for SRS    |
| PRD v1.1.0          | Product Requirements Document Proyek |
| Proposal Pengabdian | Dokumen proposal ITERA               |

### 1.5 Gambaran Dokumen

Bagian 2 menjelaskan deskripsi umum sistem. Bagian 3 berisi persyaratan fungsional. Bagian 4 berisi persyaratan non-fungsional. Bagian 5-9 mencakup antarmuka, performa, batasan, keamanan, dan persyaratan lainnya.

---

## 2. Deskripsi Umum

### 2.1 Gambaran Produk

Website Eduwisata Polinator adalah platform digital yang mendukung program pengabdian masyarakat ITERA di situs megalitik Pugung Raharjo. Sistem ini menyediakan informasi edukatif tentang keanekaragaman kupu-kupu sebagai polinator dan perannya dalam ketahanan pangan.

### 2.2 Fitur Utama

| No  | Fitur                                                   | Prioritas |
| --- | ------------------------------------------------------- | --------- |
| F1  | Katalog Spesies Kupu-kupu                               | Tinggi    |
| F2  | Artikel Edukasi                                         | Tinggi    |
| F3  | Halaman Informasi (Tentang, Kunjungi, Kontak)           | Tinggi    |
| F4  | Admin CMS (Manajemen Spesies, Artikel, Media, Pengguna) | Tinggi    |
| F5  | Kiosk Mode (10 Screen Interaktif)                       | Tinggi    |
| F6  | Autentikasi Admin                                       | Tinggi    |
| F7  | Media Library                                           | Sedang    |
| F8  | Pengaturan Sistem                                       | Sedang    |
| F9  | Activity Log                                            | Rendah    |

### 2.3 Karakteristik Pengguna

| Pengguna           | Deskripsi                                      | Level Keahlian |
| ------------------ | ---------------------------------------------- | -------------- |
| Pengunjung Website | Masyarakat umum yang mencari informasi         | Awam           |
| Pengunjung Kiosk   | Pengunjung situs yang menggunakan layar sentuh | Awam           |
| Admin/Editor       | Pengelola konten website                       | Menengah       |
| Super Admin        | Pengelola sistem dengan akses penuh            | Mahir          |

### 2.4 Asumsi dan Ketergantungan

- Pengguna memiliki akses internet (untuk website publik)
- Kiosk menggunakan jaringan lokal di lokasi situs
- Database Supabase PostgreSQL selalu tersedia (99.9% uptime)
- Vercel mendukung deployment Next.js

---

## 3. Persyaratan Fungsional

### 3.1 Modul Website Publik

#### 3.1.1 Homepage

| ID     | Persyaratan                                                                | Prioritas |
| ------ | -------------------------------------------------------------------------- | --------- |
| PF-001 | Sistem menampilkan hero section dengan judul, deskripsi, dan 2 tombol aksi | Wajib     |
| PF-002 | Sistem menampilkan statistik (jumlah spesies, famili, artikel)             | Wajib     |
| PF-003 | Sistem menampilkan 5 tema eksplorasi dalam grid 3 kolom                    | Wajib     |
| PF-004 | Sistem menampilkan spesies unggulan dalam grid asimetris                   | Wajib     |
| PF-005 | Sistem menampilkan 4 tahapan peran polinator                               | Wajib     |
| PF-006 | Sistem menampilkan artikel terbaru (1 featured + 2 sidebar)                | Wajib     |
| PF-007 | Sistem menampilkan CTA kunjungan dengan jam operasional dan tiket          | Wajib     |
| PF-008 | Sistem menampilkan footer dengan navigasi, kontak, dan kredit              | Wajib     |

#### 3.1.2 Katalog Spesies

| ID     | Persyaratan                                                                                    | Prioritas |
| ------ | ---------------------------------------------------------------------------------------------- | --------- |
| PF-010 | Sistem menampilkan daftar spesies dalam grid 4 kolom                                           | Wajib     |
| PF-011 | Sistem menyediakan pencarian berdasarkan nama spesies                                          | Wajib     |
| PF-012 | Sistem menyediakan filter berdasarkan famili (Papilionidae, Pieridae, Nymphalidae, Lycaenidae) | Wajib     |
| PF-013 | Sistem menampilkan badge status IUCN pada setiap kartu spesies                                 | Wajib     |
| PF-014 | Sistem menampilkan detail spesies (gambar, deskripsi, karakteristik, ekologi)                  | Wajib     |
| PF-015 | Hanya spesies dengan status `isPublished: true` yang ditampilkan                               | Wajib     |

#### 3.1.3 Artikel Edukasi

| ID     | Persyaratan                                                        | Prioritas |
| ------ | ------------------------------------------------------------------ | --------- |
| PF-020 | Sistem menampilkan daftar artikel dalam grid                       | Wajib     |
| PF-021 | Sistem menyediakan pencarian berdasarkan judul artikel             | Wajib     |
| PF-022 | Sistem menyediakan filter berdasarkan kategori                     | Wajib     |
| PF-023 | Sistem menampilkan detail artikel (judul, konten, ringkasan, tags) | Wajib     |
| PF-024 | Hanya artikel dengan status `active` yang ditampilkan              | Wajib     |

#### 3.1.4 Halaman Informasi

| ID     | Persyaratan                                                             | Prioritas |
| ------ | ----------------------------------------------------------------------- | --------- |
| PF-030 | Sistem menampilkan halaman "Tentang Kami" dari database static_pages    | Wajib     |
| PF-031 | Sistem menampilkan halaman "Cara Berkunjung" dari database static_pages | Wajib     |
| PF-032 | Sistem menampilkan halaman "Kontak" dengan informasi lokasi             | Wajib     |
| PF-033 | Sistem menampilkan halaman "Tiket & Jam Operasional"                    | Wajib     |

### 3.2 Modul Admin CMS

#### 3.2.1 Autentikasi

| ID     | Persyaratan                                                     | Prioritas |
| ------ | --------------------------------------------------------------- | --------- |
| PF-040 | Sistem menyediakan halaman login dengan email dan password      | Wajib     |
| PF-041 | Sistem memverifikasi password menggunakan bcrypt                | Wajib     |
| PF-042 | Sistem menyimpan session menggunakan cookie `auth_session`      | Wajib     |
| PF-043 | Sistem melindungi rute `/admin/*` dengan middleware autentikasi | Wajib     |
| PF-044 | Sistem menyediakan fungsi logout                                | Wajib     |

#### 3.2.2 Dashboard

| ID     | Persyaratan                                                                    | Prioritas |
| ------ | ------------------------------------------------------------------------------ | --------- |
| PF-050 | Sistem menampilkan 4 kartu statistik (spesies, artikel aktif, draft, pengguna) | Wajib     |
| PF-051 | Sistem menampilkan daftar aktivitas terbaru                                    | Wajib     |
| PF-052 | Sistem menampilkan status integrasi (kiosk, database, storage)                 | Wajib     |
| PF-053 | Sistem menampilkan 5 spesies terbaru                                           | Wajib     |

#### 3.2.3 Manajemen Spesies (CRUD)

| ID     | Persyaratan                                                                  | Prioritas |
| ------ | ---------------------------------------------------------------------------- | --------- |
| PF-060 | Sistem menampilkan daftar spesies dalam tabel                                | Wajib     |
| PF-061 | Sistem menyediakan form tambah spesies baru                                  | Wajib     |
| PF-062 | Sistem menyediakan form edit spesies                                         | Wajib     |
| PF-063 | Sistem menyediakan fitur hapus spesies                                       | Wajib     |
| PF-064 | Sistem mendukung 25+ field spesies (commonName, scientificName, family, dll) | Wajib     |
| PF-065 | Sistem mendukung field JSONB (dominantColors, hostPlants, galleryUrls)       | Wajib     |
| PF-066 | Sistem menampilkan status publikasi (draft/published)                        | Wajib     |

#### 3.2.4 Manajemen Artikel (CRUD)

| ID     | Persyaratan                                              | Prioritas |
| ------ | -------------------------------------------------------- | --------- |
| PF-070 | Sistem menampilkan daftar artikel dalam tabel            | Wajib     |
| PF-071 | Sistem menyediakan form tambah artikel baru              | Wajib     |
| PF-072 | Sistem menyediakan form edit artikel                     | Wajib     |
| PF-073 | Sistem menyediakan fitur hapus artikel                   | Wajib     |
| PF-074 | Sistem mendukung status: draft, review, active, archived | Wajib     |
| PF-075 | Sistem mendukung field JSONB (tags)                      | Wajib     |
| PF-076 | Sistem mendukung penjadwalan publikasi (scheduledAt)     | Wajib     |

#### 3.2.5 Manajemen Media

| ID     | Persyaratan                                                                         | Prioritas |
| ------ | ----------------------------------------------------------------------------------- | --------- |
| PF-080 | Sistem menampilkan grid media (gambar)                                              | Wajib     |
| PF-081 | Sistem menyediakan upload file                                                      | Wajib     |
| PF-082 | Sistem mendukung kategori media (Spesies, Kegiatan, Fasilitas Situs, Artefak, Umum) | Wajib     |
| PF-083 | Sistem menampilkan metadata media (ukuran, dimensi, mime type)                      | Wajib     |
| PF-084 | Sistem menampilkan penggunaan media di artikel dan spesies                          | Wajib     |

#### 3.2.6 Manajemen Pengguna

| ID     | Persyaratan                                       | Prioritas |
| ------ | ------------------------------------------------- | --------- |
| PF-090 | Sistem menampilkan daftar pengguna dalam tabel    | Wajib     |
| PF-091 | Sistem menyediakan form tambah pengguna baru      | Wajib     |
| PF-092 | Sistem mendukung role: super_admin, admin, editor | Wajib     |
| PF-093 | Sistem mendukung status aktif/non-aktif pengguna  | Wajib     |

#### 3.2.7 Pengaturan

| ID     | Persyaratan                                                 | Prioritas |
| ------ | ----------------------------------------------------------- | --------- |
| PF-100 | Sistem menyediakan pengaturan berbasis key-value            | Wajib     |
| PF-101 | Sistem mengelompokkan pengaturan (umum, seo, kiosk, backup) | Wajib     |
| PF-102 | Sistem menyediakan tab navigasi untuk setiap grup           | Wajib     |

### 3.3 Modul Kiosk Mode

| ID     | Persyaratan                                                       | Prioritas |
| ------ | ----------------------------------------------------------------- | --------- |
| PF-110 | Sistem menampilkan 10 screen kiosk dalam urutan navigasi          | Wajib     |
| PF-111 | Screen 0: Idle/Screensaver dengan jam dan foto spesies            | Wajib     |
| PF-112 | Screen 1: Living Heritage - pengenalan situs megalitik            | Wajib     |
| PF-113 | Screen 2: Site Map - hub navigasi ke semua screen                 | Wajib     |
| PF-114 | Screen 3: Virtual Insektarium - galeri berdasarkan famili         | Wajib     |
| PF-115 | Screen 4: Metamorfosis - 4 tahap perkembangan kupu-kupu           | Wajib     |
| PF-116 | Screen 5: Ekosistem - indeks keanekaragaman                       | Wajib     |
| PF-117 | Screen 6: Ketahanan Pangan - peran polinator                      | Wajib     |
| PF-118 | Screen 7: Kolam Megalitik - bioindikator                          | Wajib     |
| PF-119 | Screen 8: Call to Action - 5 aksi konservasi + QR survey          | Wajib     |
| PF-120 | Screen 9: Data Spesies - tabel data lengkap                       | Wajib     |
| PF-121 | Sistem kembali ke idle screen setelah 3 menit tidak ada interaksi | Wajib     |
| PF-122 | Sistem mendukung navigasi: berikutnya, sebelumnya, beranda        | Wajib     |
| PF-123 | Sistem mendukung transisi animasi antar screen                    | Wajib     |
| PF-124 | Sistem menampilkan modal detail spesies (tap to expand)           | Wajib     |

---

## 4. Persyaratan Non-Fungsional

### 4.1 Performa

| ID     | Persyaratan                   | Target    |
| ------ | ----------------------------- | --------- |
| NF-001 | Waktu loading halaman pertama | < 3 detik |
| NF-002 | Waktu respons API             | < 500ms   |
| NF-003 | Waktu transisi kiosk          | < 500ms   |
| NF-004 | Ukuran bundle JavaScript      | < 500KB   |
| NF-005 | Skor Lighthouse Performance   | > 80      |

### 4.2 Keandalan

| ID     | Persyaratan                    | Target    |
| ------ | ------------------------------ | --------- |
| NF-010 | Ketersediaan sistem (uptime)   | 99.9%     |
| NF-011 | Waktu pemulihan dari kegagalan | < 5 menit |
| NF-012 | Backup database otomatis       | Harian    |

### 4.3 Keamanan

| ID     | Persyaratan                          | Target |
| ------ | ------------------------------------ | ------ |
| NF-020 | Enkripsi password menggunakan bcrypt | Wajib  |
| NF-021 | Session cookie secure                | Wajib  |
| NF-022 | Proteksi terhadap SQL injection      | Wajib  |
| NF-023 | Proteksi terhadap XSS                | Wajib  |
| NF-024 | Rate limiting pada API               | Wajib  |

### 4.4 Dapat Digunakan (Usability)

| ID     | Persyaratan                                | Target |
| ------ | ------------------------------------------ | ------ |
| NF-030 | Desain responsif (mobile, tablet, desktop) | Wajib  |
| NF-031 | Navigasi intuitif tanpa pelatihan          | Wajib  |
| NF-032 | Kiosk mode fullscreen tanpa UI browser     | Wajib  |
| NF-033 | Dukungan bahasa Indonesia                  | Wajib  |

### 4.5 Dapat Dipelihara (Maintainability)

| ID     | Persyaratan                                    | Target |
| ------ | ---------------------------------------------- | ------ |
| NF-040 | Kode terstruktur dengan separation of concerns | Wajib  |
| NF-041 | Dokumentasi API tersedia                       | Wajib  |
| NF-042 | Kode dapat diuji dengan unit test              | Wajib  |
| NF-043 | Konfigurasi terpisah dari kode                 | Wajib  |

### 4.6 Dapat Dipindahkan (Portability)

| ID     | Persyaratan                                                | Target |
| ------ | ---------------------------------------------------------- | ------ |
| NF-050 | Berjalan di browser modern (Chrome, Firefox, Safari, Edge) | Wajib  |
| NF-051 | Berjalan di berbagai ukuran layar (320px - 4K)             | Wajib  |
| NF-052 | Kiosk mode berjalan di Chrome/Chromium                     | Wajib  |

---

## 5. Antarmuka Eksternal

### 5.1 Antarmuka Pengguna

| Komponen       | Deskripsi                              |
| -------------- | -------------------------------------- |
| Website Publik | React SSR dengan Tailwind CSS          |
| Admin CMS      | React SPA dengan sidebar navigasi      |
| Kiosk Mode     | React client-side dengan Framer Motion |

### 5.2 Antarmuka Perangkat Keras

| Perangkat     | Spesifikasi                                         |
| ------------- | --------------------------------------------------- |
| Kiosk Display | Layar sentuh 32-55 inch, resolusi minimal 1920x1080 |
| Server        | Vercel Edge Functions                               |
| Database      | Supabase PostgreSQL (managed)                       |

### 5.3 Antarmuka Perangkat Lunak

| Komponen           | Teknologi               |
| ------------------ | ----------------------- |
| Frontend Framework | Next.js 15 (App Router) |
| ORM                | Drizzle ORM v0.45       |
| Database           | PostgreSQL (Supabase)   |
| File Storage       | Supabase Storage        |
| Deployment         | Vercel                  |
| Version Control    | GitHub                  |

### 5.4 Antarmuka API

| Endpoint              | Method         | Deskripsi                |
| --------------------- | -------------- | ------------------------ |
| `/api/auth/login`     | POST           | Login admin              |
| `/api/auth/logout`    | POST           | Logout admin             |
| `/api/auth/me`        | GET            | Ambil data user login    |
| `/api/posts`          | GET/POST       | CRUD spesies             |
| `/api/posts/[id]`     | GET/PUT/DELETE | Operasi spesies per ID   |
| `/api/articles`       | GET/POST       | CRUD artikel             |
| `/api/articles/[id]`  | GET/PUT/DELETE | Operasi artikel per ID   |
| `/api/pages`          | GET/POST       | CRUD halaman statis      |
| `/api/pages/[slug]`   | GET/PUT/DELETE | Operasi halaman per slug |
| `/api/media`          | GET/POST       | CRUD media               |
| `/api/media/[id]`     | GET/PUT/DELETE | Operasi media per ID     |
| `/api/users`          | GET/POST       | CRUD pengguna            |
| `/api/users/[id]`     | GET/PUT/DELETE | Operasi pengguna per ID  |
| `/api/settings`       | GET/PUT        | Pengaturan sistem        |
| `/api/dashboard`      | GET            | Statistik dashboard      |
| `/api/kiosk/species`  | GET            | Spesies untuk kiosk      |
| `/api/kiosk/articles` | GET            | Artikel untuk kiosk      |

---

## 6. Kebutuhan Performa

### 6.1 Website Publik

| Metrik                         | Target      |
| ------------------------------ | ----------- |
| First Contentful Paint (FCP)   | < 1.5 detik |
| Largest Contentful Paint (LCP) | < 2.5 detik |
| Cumulative Layout Shift (CLS)  | < 0.1       |
| Time to Interactive (TTI)      | < 3.5 detik |
| Total Blocking Time (TBT)      | < 200ms     |

### 6.2 Admin CMS

| Metrik                    | Target                 |
| ------------------------- | ---------------------- |
| Waktu load dashboard      | < 2 detik              |
| Waktu load daftar spesies | < 1.5 detik            |
| Waktu upload media        | < 5 detik (file < 5MB) |
| Waktu save artikel        | < 1 detik              |

### 6.3 Kiosk Mode

| Metrik                   | Target    |
| ------------------------ | --------- |
| Waktu load screen        | < 1 detik |
| Transisi antar screen    | < 500ms   |
| Animasi idle screensaver | 60fps     |
| Response time sentuhan   | < 100ms   |

---

## 7. Batasan Desain

### 7.1 Batasan Teknis

| No  | Batasan                                                    |
| --- | ---------------------------------------------------------- |
| 1   | Menggunakan Next.js 15 App Router (bukan Pages Router)     |
| 2   | Menggunakan Drizzle ORM (bukan Prisma/Sequelize)           |
| 3   | Database PostgreSQL melalui Supabase                       |
| 4   | Deployment hanya di Vercel                                 |
| 5   | Tidak menggunakan state management library (Redux/Zustand) |

### 7.2 Batasan Organisasi

| No  | Batasan                                                    |
| --- | ---------------------------------------------------------- |
| 1   | Tim pengembangan terdiri dari mahasiswa dan dosen ITERA    |
| 2   | Waktu pengembangan terbatas (satu semester)                |
| 3   | Anggaran terbatas (menggunakan layanan gratis/gratis tier) |

### 7.3 Batasan Interface

| No  | Batasan                                     |
| --- | ------------------------------------------- |
| 1   | Kiosk hanya berjalan di Chrome/Chromium     |
| 2   | Layar kiosk harus berukuran minimal 32 inch |
| 3   | Upload file dibatasi 10MB per file          |

---

## 8. Persyaratan Keamanan

### 8.1 Autentikasi

| ID      | Persyaratan                                         |
| ------- | --------------------------------------------------- |
| SEC-001 | Password di-hash menggunakan bcrypt                 |
| SEC-002 | Session disimpan dalam cookie httpOnly              |
| SEC-003 | Cookie expiration: sesi browser                     |
| SEC-004 | Login rate limiting: maksimal 5 percobaan per menit |

### 8.2 Autorisasi

| ID      | Persyaratan                                                    |
| ------- | -------------------------------------------------------------- |
| SEC-010 | Rute `/admin/*` hanya dapat diakses oleh user yang sudah login |
| SEC-011 | Role super_admin dapat mengelola semua data dan pengguna       |
| SEC-012 | Role admin dapat mengelola konten dan spesies                  |
| SEC-013 | Role editor hanya dapat mengedit konten                        |

### 8.3 Proteksi Data

| ID      | Persyaratan                                                  |
| ------- | ------------------------------------------------------------ |
| SEC-020 | Password tidak pernah dikembalikan dalam response API        |
| SEC-021 | API endpoints memvalidasi input sebelum proses               |
| SEC-022 | Menggunakan parameterized query untuk mencegah SQL injection |
| SEC-023 | User input di-sanitize untuk mencegah XSS                    |
| SEC-024 | File upload divalidasi tipe dan ukurannya                    |

---

## 9. Persyaratan Lainnya

### 9.1 SEO

| ID      | Persyaratan                                             |
| ------- | ------------------------------------------------------- |
| SEO-001 | Setiap halaman memiliki meta title dan meta description |
| SEO-002 | URL bersih (clean URL) untuk semua halaman              |
| SEO-003 | Sitemap XML tersedia                                    |
| SEO-004 | Schema.org structured data untuk artikel dan spesies    |

### 9.2 Aksesibilitas

| ID      | Persyaratan                                |
| ------- | ------------------------------------------ |
| ACC-001 | Kontras warna memenuhi standar WCAG 2.1 AA |
| ACC-002 | Teks memiliki ukuran minimal 14px          |
| ACC-003 | Gambar memiliki alt text                   |
| ACC-004 | Navigasi keyboard tersedia                 |

### 9.3 Pemeliharaan

| ID      | Persyaratan                                                     |
| ------- | --------------------------------------------------------------- |
| MNT-001 | Kode menggunakan TypeScript untuk type safety                   |
| MNT-002 | Struktur folder terorganisir berdasarkan fitur                  |
| MNT-003 | Environment variables terpisah untuk development dan production |
| MNT-004 | Database migrations terdokumentasi                              |

---

## 10. Lampiran

### 10.1 Database Schema

Lihat file `docs/schema.dbml` untuk ERD lengkap.

### 10.2 Struktur Folder

```
cms-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (public)/          # Rute publik
│   │   ├── admin/             # Rute admin
│   │   ├── api/               # API routes
│   │   └── kiosk/             # Kiosk mode
│   ├── components/            # React components
│   │   ├── landing/           # Komponen landing page
│   │   └── ui/                # Komponen UI generik
│   ├── db/                    # Database connection & schema
│   └── server/                # Server-side logic
├── docs/                      # Dokumentasi
├── scripts/                   # Build & seed scripts
└── public/                    # Static assets
```

### 10.3 Tech Stack

| Komponen   | Teknologi     | Versi  |
| ---------- | ------------- | ------ |
| Runtime    | Node.js       | 22.x   |
| Framework  | Next.js       | 15.x   |
| Language   | TypeScript    | 5.x    |
| UI Library | React         | 19.x   |
| Styling    | Tailwind CSS  | 4.x    |
| ORM        | Drizzle ORM   | 0.45.x |
| Database   | PostgreSQL    | 15.x   |
| Animation  | Framer Motion | 12.x   |
| Rich Text  | TipTap        | 3.x    |
| Testing    | Vitest        | 2.x    |

---

**Dokumen ini disusun sesuai standar IEEE 830-1998**  
**Versi 1.0 — Juli 2026**
