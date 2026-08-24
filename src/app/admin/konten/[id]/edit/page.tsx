'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Upload, X, FileText, Send, Sparkles } from 'lucide-react';
import RichTextEditor from '@/components/shared/rich-text-editor';

const INPUT_CLS =
  'bg-kiosk-bg px-4 py-2.5 border border-kiosk-orange-100 rounded-[1rem] text-sm text-kiosk-ink focus:outline-none focus:border-kiosk-orange-600 focus:ring-1 focus:ring-kiosk-orange-600 transition-all placeholder:text-kiosk-ink-muted';
const LABEL_CLS = 'text-sm font-semibold text-kiosk-ink';
const SECTION_CLS = 'bg-white border border-kiosk-orange-100 rounded-[1.618rem] p-6';
const SECTION_TITLE_CLS =
  'text-xs font-bold text-kiosk-orange-600 uppercase tracking-wider border-b border-kiosk-orange-100 pb-3 mb-5';

const CATEGORIES = ['Edukasi', 'Penelitian', 'Konservasi', 'Berita'];

interface ArticleForm {
  title?: string;
  slug?: string;
  category?: string;
  thumbnailUrl?: string;
  summary?: string;
  content?: string;
  status?: string;
}

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const [form, setForm] = useState<ArticleForm>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    fetch(`/api/articles/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
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
      setForm((f) => ({ ...f, thumbnailUrl: data.url }));
    } catch (err) {
      console.error('Thumbnail upload failed:', err);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith('image/')) handleThumbnailUpload(file);
    },
    [handleThumbnailUpload],
  );

  const handleSubmit = async (status: string) => {
    setSaving(true);
    await fetch(`/api/articles/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, status }),
    });
    router.push('/admin/konten');
  };

  if (loading)
    return (
      <div className="min-h-screen bg-kiosk-bg flex items-center justify-center">
        <p className="text-kiosk-ink-muted">Memuat...</p>
      </div>
    );
  if (!form)
    return (
      <div className="min-h-screen bg-kiosk-bg flex items-center justify-center">
        <p className="text-danger">Data tidak ditemukan</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-kiosk-bg">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link
          href="/admin/konten"
          className="inline-flex items-center gap-2 text-kiosk-ink-muted hover:text-kiosk-ink mb-6 text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Kembali ke Daftar Artikel
        </Link>
        <h1 className="font-heading text-2xl font-bold text-kiosk-ink mb-8">Edit Artikel</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(form.status ?? 'draft');
          }}
          className="space-y-6"
        >
          {/* Section: Informasi Dasar */}
          <section className={SECTION_CLS}>
            <h2 className={SECTION_TITLE_CLS}>Informasi Dasar</h2>
            <div className="space-y-5">
              <div>
                <label className={`block ${LABEL_CLS} mb-1.5`}>Judul Artikel</label>
                <input
                  value={form.title || ''}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className={`w-full ${INPUT_CLS}`}
                  placeholder="Masukkan judul artikel..."
                  required
                />
              </div>
              <div>
                <label className={`block ${LABEL_CLS} mb-1.5`}>Slug</label>
                <input
                  value={form.slug || ''}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  className={`w-full ${INPUT_CLS}`}
                  placeholder="auto-generated-jika-dikosongkan"
                />
              </div>
              <div>
                <label className={`block ${LABEL_CLS} mb-1.5`}>Kategori</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, category: cat }))}
                      className={`px-4 py-2 rounded-[1rem] text-sm font-medium transition-all border ${
                        form.category === cat
                          ? 'bg-kiosk-orange-50 border-kiosk-orange-600 text-kiosk-orange-600'
                          : 'bg-kiosk-bg border-kiosk-orange-100 text-kiosk-ink-muted hover:border-kiosk-orange-200 hover:text-kiosk-ink'
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
              <div className="relative group rounded-[1.618rem] overflow-hidden">
                <img
                  src={form.thumbnailUrl}
                  alt="Thumbnail"
                  className="w-full h-48 object-cover rounded-[1.618rem]"
                />
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, thumbnailUrl: '' }))}
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-[1rem] p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-kiosk-ink-muted" />
                </button>
              </div>
            ) : (
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center h-48 rounded-[1.618rem] cursor-pointer transition-all border-2 border-dashed ${
                  dragOver
                    ? 'border-kiosk-orange-600 bg-kiosk-orange-50'
                    : 'border-kiosk-orange-200 hover:border-kiosk-orange-600 hover:bg-kiosk-orange-50'
                }`}
              >
                <Upload className="w-8 h-8 text-kiosk-ink-muted mb-2" />
                <span className="text-sm text-kiosk-ink-muted">
                  Drag & drop atau klik untuk upload
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleThumbnailUpload(file);
                  }}
                />
              </label>
            )}
          </section>

          {/* Section: Konten */}
          <section className={SECTION_CLS}>
            <h2 className={SECTION_TITLE_CLS}>Konten Artikel</h2>
            <div className="space-y-5">
              <div>
                <label className={`block ${LABEL_CLS} mb-1.5`}>Ringkasan</label>
                <textarea
                  value={form.summary || ''}
                  onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
                  rows={2}
                  className={`w-full ${INPUT_CLS} resize-none`}
                  placeholder="Ringkasan singkat artikel..."
                />
              </div>
              <div>
                <label className={`block ${LABEL_CLS} mb-1.5`}>Isi Konten</label>
                <RichTextEditor
                  content={form.content || ''}
                  onChange={(html) => setForm((f) => ({ ...f, content: html }))}
                />
              </div>
            </div>
          </section>

          {/* Publish Actions */}
          <section className={SECTION_CLS}>
            <h2 className={SECTION_TITLE_CLS}>Publikasi</h2>
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={() => handleSubmit('draft')}
                disabled={saving}
                className="px-5 py-2.5 border-2 border-kiosk-orange-100 text-kiosk-ink-muted rounded-[1.618rem] font-bold text-sm hover:bg-kiosk-bg transition-all disabled:opacity-50 flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                {saving ? 'Menyimpan...' : 'Simpan sebagai Draft'}
              </button>
              <button
                type="button"
                onClick={() => handleSubmit('review')}
                disabled={saving}
                className="px-5 py-2.5 border-2 border-warning text-warning rounded-[1.618rem] font-bold text-sm hover:bg-warning/10 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Kirim Review
              </button>
              <button
                type="button"
                onClick={() => handleSubmit('active')}
                disabled={saving}
                className="px-5 py-2.5 bg-kiosk-orange-600 hover:bg-kiosk-orange-700 text-white rounded-[1.618rem] font-bold text-sm transition-all disabled:opacity-50 flex items-center gap-2"
              >
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
