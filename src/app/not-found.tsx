import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-fg-muted text-lg mb-8">Halaman tidak ditemukan</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:brightness-110 transition-all"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
