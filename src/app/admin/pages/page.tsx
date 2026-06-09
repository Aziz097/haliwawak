'use client';

import { useState, useEffect } from 'react';
import { Edit, Check, X, LayoutList } from 'lucide-react';

interface StaticPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  navOrder: number;
  isActive: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
}

export default function AdminPagesPage() {
  const [pages, setPages] = useState<StaticPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<StaticPage>>({});
  const [saving, setSaving] = useState(false);

  const fetchPages = () => {
    fetch('/api/pages')
      .then(r => r.json())
      .then(data => {
        setPages(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  };

  useEffect(() => { fetchPages(); }, []);

  const startEdit = (page: StaticPage) => {
    setEditingSlug(page.slug);
    setEditForm({
      title: page.title,
      slug: page.slug,
      content: page.content,
      navOrder: page.navOrder,
      isActive: page.isActive,
      metaTitle: page.metaTitle ?? '',
      metaDescription: page.metaDescription ?? '',
    });
  };

  const cancelEdit = () => {
    setEditingSlug(null);
    setEditForm({});
  };

  const handleSave = async (slug: string) => {
    setSaving(true);
    const res = await fetch(`/api/pages/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });
    if (res.ok) {
      setEditingSlug(null);
      setEditForm({});
      fetchPages();
    } else {
      const err = await res.json();
      alert(err.error || 'Gagal menyimpan');
    }
    setSaving(false);
  };

  if (loading) return <p className="text-[#6B7280]">Memuat...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-[#111827]">Halaman Statis</h1>
      </div>

      <div className="space-y-4">
        {pages.map(page => {
          const isEditing = editingSlug === page.slug;
          return (
            <div key={page.id} className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <LayoutList className="w-4 h-4 text-[#059669]" />
                  <div>
                    <h3 className="font-semibold text-[#111827]">{isEditing ? (editForm.title ?? page.title) : page.title}</h3>
                    <p className="text-xs text-[#6B7280]">/{page.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleSave(page.slug)} disabled={saving}
                        className="flex items-center gap-1.5 bg-[#059669] hover:bg-[#047857] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-50">
                        <Check className="w-3.5 h-3.5" /> {saving ? 'Menyimpan...' : 'Simpan'}
                      </button>
                      <button onClick={cancelEdit}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#6B7280] hover:bg-[#F9FAFB] transition-colors">
                        <X className="w-3.5 h-3.5" /> Batal
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${page.isActive ? 'text-[#059669] bg-[#D1FAE5] border border-[#A7F3D0]' : 'text-[#6B7280] bg-[#E5E7EB]'}`}>
                        {page.isActive ? 'Aktif' : 'Nonaktif'}
                      </span>
                      <span className="text-xs text-[#6B7280]">Urutan: {page.navOrder}</span>
                      <button onClick={() => startEdit(page)}
                        className="p-2 rounded-lg hover:bg-[#F9FAFB] text-[#6B7280] hover:text-[#059669] transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-1.5">Judul</label>
                      <input value={editForm.title ?? ''} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-1.5">Slug</label>
                      <input value={editForm.slug ?? ''} onChange={e => setEditForm(f => ({ ...f, slug: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-1.5">Konten (HTML)</label>
                    <textarea value={editForm.content ?? ''} onChange={e => setEditForm(f => ({ ...f, content: e.target.value }))}
                      rows={10}
                      className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm font-mono focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-1.5">Urutan Navigasi</label>
                      <input type="number" value={editForm.navOrder ?? 0} onChange={e => setEditForm(f => ({ ...f, navOrder: parseInt(e.target.value) || 0 }))}
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]" />
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                      <button
                        onClick={() => setEditForm(f => ({ ...f, isActive: !f.isActive }))}
                        className={`relative w-11 h-6 rounded-full transition-colors ${editForm.isActive ? 'bg-[#059669]' : 'bg-gray-300'}`}>
                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${editForm.isActive ? 'translate-x-5' : ''}`} />
                      </button>
                      <span className="text-sm font-medium text-[#111827]">{editForm.isActive ? 'Aktif' : 'Nonaktif'}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-1.5">Meta Title</label>
                      <input value={editForm.metaTitle ?? ''} onChange={e => setEditForm(f => ({ ...f, metaTitle: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-1.5">Meta Description</label>
                      <input value={editForm.metaDescription ?? ''} onChange={e => setEditForm(f => ({ ...f, metaDescription: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {pages.length === 0 && (
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 text-center">
            <p className="text-[#6B7280]">Belum ada halaman statis.</p>
          </div>
        )}
      </div>
    </div>
  );
}