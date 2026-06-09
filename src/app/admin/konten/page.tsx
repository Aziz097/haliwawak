'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search, FileText } from 'lucide-react';

const statusBadge: Record<string, string> = {
  active: 'text-[#059669] bg-[#D1FAE5] border-[#A7F3D0]',
  review: 'text-[#D97706] bg-[#FEF3C7] border-[#FDE68A]',
  draft: 'text-[#6B7280] bg-[#E5E7EB]',
  archived: 'text-[#374151] bg-[#F3F4F6]',
};

export default function AdminKontenPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchArticles = () => {
    fetch('/api/articles').then(r => r.json()).then(data => {
      setArticles(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  };

  useEffect(() => { fetchArticles(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus artikel ini?')) return;
    await fetch(`/api/articles/${id}`, { method: 'DELETE' });
    fetchArticles();
  };

  const filtered = articles.filter(a =>
    !search || a.title?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="text-[#6B7280] py-12 text-center">Memuat...</p>;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold text-[#059669] uppercase tracking-wider">Ringkasan Sistem</p>
        <h1 className="text-2xl font-bold text-[#111827] mt-1">Konten</h1>
        <p className="text-sm text-[#6B7280] mt-1">{filtered.length} artikel</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Cari artikel..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-[#111827] placeholder-[#9CA3AF] text-sm focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-colors"
          />
        </div>
        <Link
          href="/admin/konten/new"
          className="flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" /> Tambah Artikel
        </Link>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Judul</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Kategori</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Tanggal</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {filtered.map((a: any) => (
              <tr key={a.id} className="hover:bg-[#F9FAFB]">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center">
                      <FileText className="w-4 h-4 text-[#059669]" />
                    </div>
                    <span className="font-medium text-[#111827]">{a.title}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#F3F4F6] text-[#374151] border border-[#E5E7EB]">
                    {a.category}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-md border ${statusBadge[a.status] || statusBadge.draft}`}>
                    {a.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-[#6B7280]">
                  {a.createdAt ? new Date(a.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link href={`/admin/konten/${a.id}/edit`}
                      className="p-2 border border-[#E5E7EB] rounded-md text-[#6B7280] hover:text-[#059669] hover:border-[#059669]/50 transition-colors">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button onClick={() => handleDelete(a.id)}
                      className="p-2 border border-[#E5E7EB] rounded-md text-[#6B7280] hover:text-red-600 hover:border-red-300 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <FileText className="w-10 h-10 text-[#D1D5DB] mx-auto mb-2" />
            <p className="text-[#6B7280]">Tidak ada artikel ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}