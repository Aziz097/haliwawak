'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search, Bug, ChevronLeft, ChevronRight } from 'lucide-react';

// Mirrors the kiosk-iucn-* token mapping used in app/kiosk/components/SpeciesCard.tsx.
const IUCN_BADGE: Record<string, string> = {
  'Least Concern': 'text-kiosk-on-green bg-kiosk-iucn-lc',
  'Near Threatened': 'text-kiosk-on-green bg-kiosk-iucn-nt',
  'Vulnerable': 'text-kiosk-on-green bg-kiosk-iucn-vu',
  'Endangered': 'text-kiosk-on-green bg-kiosk-iucn-en',
  'Critically Endangered': 'text-kiosk-on-green bg-kiosk-iucn-cr',
  'Extinct': 'text-kiosk-on-green bg-kiosk-iucn-na',
};

const IUCN_ABBR: Record<string, string> = {
  'Least Concern': 'LC',
  'Near Threatened': 'NT',
  'Vulnerable': 'VU',
  'Endangered': 'EN',
  'Critically Endangered': 'CR',
  'Extinct': 'EX',
};

const PAGE_SIZE = 20;

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchPosts = () => {
    fetch('/api/posts').then(r => r.json()).then(data => {
      setPosts(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus spesies ini?')) return;
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    fetchPosts();
  };

  const filtered = posts.filter(p =>
    !search || p.commonName?.toLowerCase().includes(search.toLowerCase()) || p.scientificName?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => { setPage(1); }, [search]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-3 text-kiosk-ink-muted">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm font-medium">Memuat data spesies...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-xs font-bold text-kiosk-orange-600 uppercase tracking-wider mb-1">Ringkasan Sistem</p>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-kiosk-ink">Spesies</h1>
            <p className="text-sm text-kiosk-ink-muted mt-1">{filtered.length} spesies terdaftar</p>
          </div>
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 bg-kiosk-orange-600 hover:bg-kiosk-orange-700 text-white px-4 py-2.5 rounded-[1rem] text-sm font-semibold transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Tambah Spesies
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-kiosk-ink-muted" />
        <input
          type="text"
          placeholder="Cari berdasarkan nama umum atau nama ilmiah..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-[1rem] border border-kiosk-orange-100 bg-kiosk-bg text-kiosk-ink text-sm placeholder:text-kiosk-ink-muted focus:outline-none focus:border-kiosk-orange-600 focus:ring-1 focus:ring-kiosk-orange-600 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-kiosk-orange-100 rounded-[1.618rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-kiosk-bg border-b border-kiosk-orange-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-kiosk-ink-muted uppercase tracking-wider">Foto</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-kiosk-ink-muted uppercase tracking-wider">Nama Umum</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-kiosk-ink-muted uppercase tracking-wider">Nama Ilmiah</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-kiosk-ink-muted uppercase tracking-wider">Famili</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-kiosk-ink-muted uppercase tracking-wider">Status IUCN</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-kiosk-ink-muted uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-kiosk-ink-muted uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-kiosk-orange-100">
              {paginated.map((p: any) => (
                <tr key={p.id} className="hover:bg-kiosk-bg transition-colors">
                  <td className="px-4 py-3">
                    {p.primaryPhotoUrl ? (
                      <img src={p.primaryPhotoUrl} alt={p.commonName} className="w-8 h-8 rounded-full object-cover border border-kiosk-orange-100" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-kiosk-bg border border-kiosk-orange-100 flex items-center justify-center">
                        <Bug className="w-4 h-4 text-kiosk-ink-muted" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-kiosk-ink">{p.commonName}</td>
                  <td className="px-4 py-3 text-kiosk-ink-muted italic">{p.scientificName}</td>
                  <td className="px-4 py-3 text-kiosk-ink-muted">{p.family}</td>
                  <td className="px-4 py-3">
                    {p.iucnStatus ? (
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${IUCN_BADGE[p.iucnStatus] || 'text-kiosk-ink-muted bg-kiosk-orange-100'}`}>
                        {IUCN_ABBR[p.iucnStatus] || p.iucnStatus}
                      </span>
                    ) : (
                      <span className="text-kiosk-ink-muted">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {p.isPublished ? (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-success bg-success/10 border border-success/30">
                        Published
                      </span>
                    ) : (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-kiosk-ink-muted bg-kiosk-orange-100">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/posts/${p.id}/edit`}
                        className="p-2 border border-kiosk-orange-100 rounded-[0.618rem] text-kiosk-ink-muted hover:text-kiosk-orange-600 hover:border-kiosk-orange-600/50 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-2 border border-kiosk-orange-100 rounded-[0.618rem] text-kiosk-ink-muted hover:text-danger hover:border-danger/50 hover:bg-danger/10 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-kiosk-ink-muted">
            <Bug className="w-10 h-10 mb-3" />
            <p className="text-sm font-medium">Tidak ada data ditemukan</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-kiosk-orange-100 bg-kiosk-bg">
            <p className="text-xs text-kiosk-ink-muted">
              Menampilkan {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} dari {filtered.length} spesies
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 border border-kiosk-orange-100 rounded-[0.618rem] text-kiosk-ink-muted hover:text-kiosk-orange-600 hover:border-kiosk-orange-600/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-8 h-8 rounded-[0.618rem] text-xs font-semibold transition-colors ${
                    n === page
                      ? 'bg-kiosk-orange-600 text-white'
                      : 'text-kiosk-ink-muted hover:bg-kiosk-orange-50 hover:text-kiosk-orange-600'
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 border border-kiosk-orange-100 rounded-[0.618rem] text-kiosk-ink-muted hover:text-kiosk-orange-600 hover:border-kiosk-orange-600/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}