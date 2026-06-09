'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Upload, X, FileText, Send, Sparkles } from 'lucide-react';
import RichTextEditor from '@/components/shared/rich-text-editor';

const INPUT_CLS = 'bg-[#F9FAFB] px-4 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all placeholder:text-[#9CA3AF]';
const LABEL_CLS = 'text-sm font-semibold text-[#374151]';
const SECTION_CLS = 'bg-white border border-[#E5E7EB] rounded-xl p-6';
const SECTION_TITLE_CLS = 'text-xs font-bold text-[#059669] uppercase tracking-wider border-b border-[#E5E7EB] pb-3 mb-5';

const CATEGORIES = ['Edukasi', 'Penelitian', 'Konservasi', 'Berita'];

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const [form, setForm] = useState<Record<string, any>>({} as any);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    fetch(`/api/articles/${params.id}`).then(r => r.json()).then(data => {
      setForm(data);
      setLoading(false);
    });
  }, [params.id]);

  const handleThumbnailUpload = useCallback(async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setForm(f => ({ ...f, thumbnailUrl: data.url }));
    } catch (err) {
      console.error('Thumbnail upload failed:', err);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) handleThumbnailUpload(file);
  }, [handleThumbnailUpload]);

  const handleSubmit = async (status: string) => {
    setSaving(true);
    await fetch(`/api/articles/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, status }),
    });
    router.push('/admin/konten');
  };

  if (loading) return <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center"><p className="text-[#6B7280]">Memuat...</p></div>;
  if (!form) return <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center"><p className="text-[#DC2626]">Data tidak ditemukan</p></div>;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/admin/konten" className="inline-flex items-center gap-2 text-[#6B7280] hover:text-[#111827] mb-6 text-sm transition-colors">
          <ChevronLeft className="w-4 h-4" /> Kembali ke Daftar Artikel
        </Link>
        <h1 className="text-2xl font-bold text-[#111827] mb-8">Edit Artikel</h1>

        <form onSubmit={e => { e.preventDefault(); handleSubmit(form.status); }} className="space-y-6">
          {/* Section: Informasi Dasar */}
          <section className={SECTION_CLS}>
            <h2 className={SECTION_TITLE_CLS}>Informasi Dasar</h2>
            <div className="space-y-5">
              <div>
                <label className={`block ${LABEL_CLS} mb-1.5`}>Judul Artikel</label>
                <input value={form.title || ''} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className={`w-full ${INPUT_CLS}`} placeholder="Masukkan judul artikel..." required />
              </div>
              <div>
                <label className={`block ${LABEL_CLS} mb-1.5`}>Slug</label>
                <input value={form.slug || ''} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                  className={`w-full ${INPUT_CLS}`} placeholder="auto-generated-jika-dikosongkan" />
              </div>
              <div>
                <label className={`block ${LABEL_CLS} mb-1.5`}>Kategori</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button key={cat} type="button" onClick={() => setForm(f => ({ ...f, category: cat }))}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                        form.category === cat
                          ? 'bg-[#ECFDF5] border-[#059669] text-[#059669]'
                          : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#6B7280] hover:border-[#A7F3D0] hover:text-[#111827]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section: Thumbnail */}
          <section className={SECTION_CLS}>
            <h2 className={SECTION_TITLE_CLS}>Thumbnail</h2>
            {form.thumbnailUrl ? (
              <div className="relative group rounded-xl overflow-hidden">
                <img src={form.thumbnailUrl} alt="Thumbnail" className="w-full h-48 object-cover rounded-xl" />
                <button type="button" onClick={() => setForm(f => ({ ...f, thumbnailUrl: '' }))}
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-lg p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="w-4 h-4 text-[#6B7280]" />
                </button>
              </div>
            ) : (
              <label
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center h-48 rounded-xl cursor-pointer transition-all border-2 border-dashed ${
                  dragOver
                    ? 'border-[#059669] bg-[#ECFDF5]'
                    : 'border-[#D1D5DB] hover:border-[#059669] hover:bg-[#ECFDF5]'
                }`}
              >
                <Upload className="w-8 h-8 text-[#9CA3AF] mb-2" />
                <span className="text-sm text-[#6B7280]">Drag & drop atau klik untuk upload</span>
                <input type="file" accept="image/*" className="hidden"
                  onChange={e => { const file = e.target.files?.[0]; if (file) handleThumbnailUpload(file); }} />
              </label>
            )}
          </section>

          {/* Section: Konten */}
          <section className={SECTION_CLS}>
            <h2 className={SECTION_TITLE_CLS}>Konten Artikel</h2>
            <div className="space-y-5">
              <div>
                <label className={`block ${LABEL_CLS} mb-1.5`}>Ringkasan</label>
                <textarea value={form.summary || ''} onChange={e => setForm(f => ({ ...f, summary: e.target.value }))} rows={2}
                  className={`w-full ${INPUT_CLS} resize-none`} placeholder="Ringkasan singkat artikel..." />
              </div>
              <div>
                <label className={`block ${LABEL_CLS} mb-1.5`}>Isi Konten</label>
                <RichTextEditor content={form.content || ''} onChange={html => setForm(f => ({ ...f, content: html }))} />
              </div>
            </div>
          </section>

          {/* Publish Actions */}
          <section className={SECTION_CLS}>
            <h2 className={SECTION_TITLE_CLS}>Publikasi</h2>
            <div className="flex flex-wrap gap-3 pt-1">
              <button type="button" onClick={() => handleSubmit('draft')} disabled={saving}
                className="px-5 py-2.5 border-2 border-[#E5E7EB] text-[#6B7280] rounded-xl font-bold text-sm hover:bg-[#F9FAFB] transition-all disabled:opacity-50 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {saving ? 'Menyimpan...' : 'Simpan sebagai Draft'}
              </button>
              <button type="button" onClick={() => handleSubmit('review')} disabled={saving}
                className="px-5 py-2.5 border-2 border-[#D97706] text-[#D97706] rounded-xl font-bold text-sm hover:bg-[#FEF3C7] transition-all disabled:opacity-50 flex items-center gap-2">
                <Send className="w-4 h-4" />
                Kirim Review
              </button>
              <button type="button" onClick={() => handleSubmit('active')} disabled={saving}
                className="px-5 py-2.5 bg-[#059669] hover:bg-[#047857] text-white rounded-xl font-bold text-sm transition-all disabled:opacity-50 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Publikasikan
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}