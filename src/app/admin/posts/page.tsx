'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search, Bug, ChevronLeft, ChevronRight } from 'lucide-react';

const IUCN_BADGE: Record<string, string> = {
  'Least Concern': 'text-[#059669] bg-[#D1FAE5]',
  'Near Threatened': 'text-[#D97706] bg-[#FEF3C7]',
  'Vulnerable': 'text-[#EA580C] bg-[#FED7AA]',
  'Endangered': 'text-[#DC2626] bg-[#FEE2E2]',
  'Critically Endangered': 'text-[#9B1C1C] bg-[#FECACA]',
  'Extinct': 'text-white bg-[#6B7280]',
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
        <div className="flex items-center gap-3 text-[#6B7280]">
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
        <p className="text-xs font-bold text-[#059669] uppercase tracking-wider mb-1">Ringkasan Sistem</p>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">Spesies</h1>
            <p className="text-sm text-[#6B7280] mt-1">{filtered.length} spesies terdaftar</p>
          </div>
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Tambah Spesies
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
        <input
          type="text"
          placeholder="Cari berdasarkan nama umum atau nama ilmiah..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-[#111827] text-sm placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Foto</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Nama Umum</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Nama Ilmiah</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Famili</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Status IUCN</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {paginated.map((p: any) => (
                <tr key={p.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="px-4 py-3">
                    {p.primaryPhotoUrl ? (
                      <img src={p.primaryPhotoUrl} alt={p.commonName} className="w-8 h-8 rounded-full object-cover border border-[#E5E7EB]" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center">
                        <Bug className="w-4 h-4 text-[#9CA3AF]" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-[#111827]">{p.commonName}</td>
                  <td className="px-4 py-3 text-[#6B7280] italic">{p.scientificName}</td>
                  <td className="px-4 py-3 text-[#6B7280]">{p.family}</td>
                  <td className="px-4 py-3">
                    {p.iucnStatus ? (
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${IUCN_BADGE[p.iucnStatus] || 'text-[#6B7280] bg-[#E5E7EB]'}`}>
                        {IUCN_ABBR[p.iucnStatus] || p.iucnStatus}
                      </span>
                    ) : (
                      <span className="text-[#9CA3AF]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {p.isPublished ? (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-[#059669] bg-[#D1FAE5] border border-[#A7F3D0]">
                        Published
                      </span>
                    ) : (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-[#6B7280] bg-[#E5E7EB]">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/posts/${p.id}/edit`}
                        className="p-2 border border-[#E5E7EB] rounded-md text-[#6B7280] hover:text-[#059669] hover:border-[#059669]/50 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-2 border border-[#E5E7EB] rounded-md text-[#6B7280] hover:text-[#DC2626] hover:border-[#DC2626]/50 hover:bg-[#FEF2F2] transition-colors"
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
          <div className="flex flex-col items-center justify-center py-16 text-[#9CA3AF]">
            <Bug className="w-10 h-10 mb-3" />
            <p className="text-sm font-medium">Tidak ada data ditemukan</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#E5E7EB] bg-[#F9FAFB]">
            <p className="text-xs text-[#6B7280]">
              Menampilkan {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} dari {filtered.length} spesies
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 border border-[#E5E7EB] rounded-md text-[#6B7280] hover:text-[#059669] hover:border-[#059669]/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-8 h-8 rounded-md text-xs font-semibold transition-colors ${
                    n === page
                      ? 'bg-[#059669] text-white'
                      : 'text-[#6B7280] hover:bg-[#ECFDF5] hover:text-[#059669]'
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 border border-[#E5E7EB] rounded-md text-[#6B7280] hover:text-[#059669] hover:border-[#059669]/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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