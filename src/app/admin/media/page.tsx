'use client';

import { useState, useEffect, useCallback } from 'react';
import { Trash2, X, Save } from 'lucide-react';

const CATEGORIES = ['Spesies', 'Kegiatan', 'Fasilitas Situs', 'Artefak', 'Umum'];

export default function AdminMediaPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const [editForm, setEditForm] = useState<any>(null);

  const fetchMedia = useCallback(() => {
    fetch('/api/media').then(r => r.json()).then(data => {
      setMedia(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  useEffect(() => { fetchMedia(); }, [fetchMedia]);

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!confirm('Hapus media ini?')) return;
    await fetch(`/api/media/${id}`, { method: 'DELETE' });
    if (selected?.id === id) { setSelected(null); setEditForm(null); }
    fetchMedia();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (data.url) {
      await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: data.filename, originalName: file.name, url: data.url, mimeType: file.type, sizeBytes: file.size }),
      });
      fetchMedia();
    }
    e.target.value = '';
  };

  const openDetail = (m: any) => {
    setSelected(m);
    setEditForm({
      title: m.title || '',
      altText: m.altText || '',
      photographer: m.photographer || '',
      category: m.category || 'Umum',
      tags: Array.isArray(m.tags) ? m.tags.join(', ') : '',
    });
  };

  const handleSave = async () => {
    if (!selected) return;
    const tagsArray = editForm.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
    const res = await fetch(`/api/media/${selected.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editForm.title,
        altText: editForm.altText,
        photographer: editForm.photographer,
        category: editForm.category,
        tags: tagsArray,
      }),
    });
    const updated = await res.json();
    setMedia(prev => prev.map(m => m.id === selected.id ? { ...m, ...updated } : m));
    setSelected(null);
    setEditForm(null);
  };

  if (loading) return <p className="text-[#6B7280]">Memuat...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-[#111827]">Media</h1>
        <label className="flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer">
          Upload Media
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      {media.length === 0 ? (
        <p className="text-[#6B7280] text-center py-12">Belum ada media. Upload gambar untuk digunakan pada spesies dan artikel.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {media.map((m: any) => (
            <div
              key={m.id}
              onClick={() => openDetail(m)}
              className="group relative bg-white border border-[#E5E7EB] rounded-xl overflow-hidden cursor-pointer hover:shadow-md hover:border-[#059669]/30 transition-all"
            >
              <div className="aspect-square overflow-hidden">
                {m.url ? (
                  <img src={m.url} alt={m.altText || m.originalName || ''} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#6B7280] text-xs">No preview</div>
                )}
              </div>
              <p className="text-[11px] text-[#111827] px-2 py-1.5 truncate font-medium">{m.originalName || m.filename}</p>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  onClick={(e) => handleDelete(e, m.id)}
                  className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {m.category && m.category !== 'Umum' && (
                <span className="absolute top-2 left-2 text-[10px] bg-[#059669] text-white px-2 py-0.5 rounded-lg font-medium">
                  {m.category}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {selected && editForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => { setSelected(null); setEditForm(null); }}>
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-[#E5E7EB]">
              <h2 className="font-heading font-bold text-[#111827] text-lg">Detail Media</h2>
              <button onClick={() => { setSelected(null); setEditForm(null); }} className="p-1 text-[#6B7280] hover:text-[#111827] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5">
              <div className="mb-5 rounded-xl overflow-hidden bg-[#F9FAFB] border border-[#E5E7EB]">
                {selected.url ? (
                  <img src={selected.url} alt={editForm.altText || selected.originalName} className="w-full max-h-80 object-contain" />
                ) : (
                  <div className="h-48 flex items-center justify-center text-[#6B7280]">No preview</div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">Judul</label>
                  <input
                    value={editForm.title}
                    onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                    placeholder="Judul media"
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">Fotografer</label>
                  <input
                    value={editForm.photographer}
                    onChange={e => setEditForm({ ...editForm, photographer: e.target.value })}
                    placeholder="Nama fotografer"
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[#111827] mb-1.5">Alt Text</label>
                <input
                  value={editForm.altText}
                  onChange={e => setEditForm({ ...editForm, altText: e.target.value })}
                  placeholder="Deskripsi alternatif gambar"
                  className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">Kategori</label>
                  <select
                    value={editForm.category}
                    onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">Tag</label>
                  <input
                    value={editForm.tags}
                    onChange={e => setEditForm({ ...editForm, tags: e.target.value })}
                    placeholder="Pisahkan dengan koma"
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                  />
                </div>
              </div>

              <div className="bg-[#F9FAFB] rounded-xl p-4 text-xs text-[#6B7280] space-y-1 mb-5 border border-[#E5E7EB]">
                <p><span className="font-medium text-[#111827]">File:</span> {selected.originalName}</p>
                <p><span className="font-medium text-[#111827]">Tipe:</span> {selected.mimeType}</p>
                <p><span className="font-medium text-[#111827]">Ukuran:</span> {selected.sizeBytes ? `${(selected.sizeBytes / 1024).toFixed(1)} KB` : '-'}</p>
                {selected.width && selected.height && <p><span className="font-medium text-[#111827]">Dimensi:</span> {selected.width} × {selected.height}</p>}
              </div>

              <div className="flex justify-end gap-3">
                <button onClick={() => { setSelected(null); setEditForm(null); }} className="px-5 py-2.5 rounded-lg text-sm font-medium text-[#6B7280] hover:bg-[#F9FAFB] transition-colors">
                  Batal
                </button>
                <button onClick={handleSave} className="flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all">
                  <Save className="w-4 h-4" />
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}