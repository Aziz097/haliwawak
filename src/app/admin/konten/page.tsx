'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search, FileText } from 'lucide-react';

const statusBadge: Record<string, string> = {
  active: 'text-success bg-success/10 border-success/30',
  review: 'text-warning bg-warning/10 border-warning/30',
  draft: 'text-kiosk-ink-muted bg-kiosk-orange-100',
  archived: 'text-kiosk-ink bg-kiosk-orange-100',
};

interface ArticleListItem {
  id: number;
  title: string;
  category: string;
  status: string;
  createdAt: string | null;
}

export default function AdminKontenPage() {
  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchArticles = () => {
    fetch('/api/articles')
      .then((r) => r.json())
      .then((data) => {
        setArticles(Array.isArray(data) ? (data as ArticleListItem[]) : []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus artikel ini?')) return;
    await fetch(`/api/articles/${id}`, { method: 'DELETE' });
    fetchArticles();
  };

  const filtered = articles.filter(
    (a) => !search || a.title?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <p className="text-kiosk-ink-muted py-12 text-center">Memuat...</p>;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold text-kiosk-orange-600 uppercase tracking-wider">
          Ringkasan Sistem
        </p>
        <h1 className="font-heading text-2xl font-bold text-kiosk-ink mt-1">Konten</h1>
        <p className="text-sm text-kiosk-ink-muted mt-1">{filtered.length} artikel</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-kiosk-ink-muted" />
          <input
            type="text"
            placeholder="Cari artikel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-[1rem] border border-kiosk-orange-100 bg-kiosk-bg text-kiosk-ink placeholder-kiosk-ink-muted text-sm focus:outline-none focus:border-kiosk-orange-600 focus:ring-1 focus:ring-kiosk-orange-600 transition-colors"
          />
        </div>
        <Link
          href="/admin/konten/new"
          className="flex items-center gap-2 bg-kiosk-orange-600 hover:bg-kiosk-orange-700 text-white px-4 py-2.5 rounded-[1rem] text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" /> Tambah Artikel
        </Link>
      </div>

      <div className="bg-white border border-kiosk-orange-100 rounded-[1.618rem] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-kiosk-bg border-b border-kiosk-orange-100">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-semibold text-kiosk-ink-muted uppercase tracking-wider">
                Judul
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-kiosk-ink-muted uppercase tracking-wider">
                Kategori
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-kiosk-ink-muted uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-kiosk-ink-muted uppercase tracking-wider">
                Tanggal
              </th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-kiosk-ink-muted uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-kiosk-orange-100">
            {filtered.map((a) => (
              <tr key={a.id} className="hover:bg-kiosk-bg">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[1rem] bg-kiosk-orange-50 border border-kiosk-orange-200 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-kiosk-orange-600" />
                    </div>
                    <span className="font-medium text-kiosk-ink">{a.title}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-[0.618rem] bg-kiosk-orange-100 text-kiosk-ink border border-kiosk-orange-100">
                    {a.category}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-[0.618rem] border ${statusBadge[a.status] || statusBadge.draft}`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-kiosk-ink-muted">
                  {a.createdAt
                    ? new Date(a.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })
                    : '-'}
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link
                      href={`/admin/konten/${a.id}/edit`}
                      className="p-2 border border-kiosk-orange-100 rounded-[0.618rem] text-kiosk-ink-muted hover:text-kiosk-orange-600 hover:border-kiosk-orange-600/50 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="p-2 border border-kiosk-orange-100 rounded-[0.618rem] text-kiosk-ink-muted hover:text-danger hover:border-danger/40 transition-colors"
                    >
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
            <FileText className="w-10 h-10 text-kiosk-orange-200 mx-auto mb-2" />
            <p className="text-kiosk-ink-muted">Tidak ada artikel ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
