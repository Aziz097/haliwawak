'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Bug, Upload, X, Star, ImagePlus } from 'lucide-react';
import { toast } from './toast';

const FAMILIES = ['Nymphalidae', 'Papilionidae', 'Pieridae', 'Lycaenidae', 'Hesperiidae', 'Riodinidae'];
const IUCN_STATUSES = ['Least Concern', 'Near Threatened', 'Vulnerable', 'Endangered', 'Critically Endangered', 'Extinct'];
const SITE_STATUSES = ['Sangat Umum', 'Umum', 'Jarang', 'Sangat Jarang'];
const ECOSYSTEM_ROLES = ['Polinator Utama', 'Polinator Sekunder', 'Polinator Oportunistik'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const LOCATIONS = ['Zona A - Area Megalitik', 'Zona B - Hutan Penyangga', 'Zona C - Area Koleksi', 'Zona D - Taman Terbuka'];

interface SpeciesFormProps {
  initialData?: any;
  isEdit?: boolean;
  speciesId?: string;
}

function MultiCheckbox({ label, options, selected, onChange }: {
  label: string; options: string[]; selected: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) =>
    onChange(selected.includes(opt) ? selected.filter((x) => x !== opt) : [...selected, opt]);
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-[#374151]">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button key={opt} type="button" onClick={() => toggle(opt)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${selected.includes(opt) ? 'bg-[#059669] text-white border-[#059669]' : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#059669]/50'}`}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function CommaInput({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-[#374151]">{label}</label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder ?? 'Pisahkan dengan koma, contoh: Mangga, Jambu'}
        className="w-full bg-[#F9FAFB] px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all placeholder:text-[#9CA3AF]" />
    </div>
  );
}

export default function SpeciesForm({ initialData, isEdit, speciesId }: SpeciesFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const primaryInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    commonName: initialData?.commonName ?? '',
    scientificName: initialData?.scientificName ?? '',
    family: initialData?.family ?? '',
    slug: initialData?.slug ?? '',
    description: initialData?.description ?? '',
    characteristics: initialData?.characteristics ?? '',
    iucnStatus: initialData?.iucnStatus ?? 'Least Concern',
    ecosystemRole: initialData?.ecosystemRole ?? '',
    ecologyNotes: initialData?.ecologyNotes ?? '',
    wingspan: initialData?.wingspan ?? '',
    siteStatus: initialData?.siteStatus ?? '',
    isPublished: initialData?.isPublished ?? true,
    featuredOnHome: initialData?.featuredOnHome ?? false,
    homeOrder: initialData?.homeOrder ?? 0,
    primaryPhotoUrl: initialData?.primaryPhotoUrl ?? '',
    galleryUrls: (Array.isArray(initialData?.galleryUrls) ? initialData.galleryUrls : []) as string[],
    hostPlants: initialData?.hostPlants ? (Array.isArray(initialData.hostPlants) ? initialData.hostPlants.join(', ') : initialData.hostPlants) : '',
    pollinatedPlants: initialData?.pollinatedPlants ? (Array.isArray(initialData.pollinatedPlants) ? initialData.pollinatedPlants.join(', ') : initialData.pollinatedPlants) : '',
    activeMonths: initialData?.activeMonths ?? [],
    foundLocations: initialData?.foundLocations ?? [],
  });

  const set = (key: string) => (value: any) => setForm(prev => ({ ...prev, [key]: value }));

  const handlePrimaryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        set('primaryPhotoUrl')(data.url);
        toast.success('Foto utama berhasil diunggah');
      }
    } catch { toast.error('Gagal mengunggah foto'); }
    finally { setUploading(false); }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploadingGallery(true);
    try {
      const newUrls: string[] = [...form.galleryUrls];
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('file', files[i]);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.url) newUrls.push(data.url);
      }
      set('galleryUrls')(newUrls);
      toast.success(`${files.length} foto galeri berhasil diunggah`);
    } catch { toast.error('Gagal mengunggah foto galeri'); }
    finally { setUploadingGallery(false); }
  };

  const handleAddGalleryUrl = () => {
    const url = prompt('Masukkan URL foto galeri:');
    if (url?.trim()) {
      set('galleryUrls')([...form.galleryUrls, url.trim()]);
    }
  };

  const handleRemoveGalleryUrl = (idx: number) => {
    set('galleryUrls')(form.galleryUrls.filter((_: string, i: number) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const slug = form.slug || form.commonName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const hostPlantsArray = String(form.hostPlants).split(',').map(s => s.trim()).filter(Boolean);
    const pollinatedPlantsArray = String(form.pollinatedPlants).split(',').map(s => s.trim()).filter(Boolean);

    const payload = {
      ...form,
      slug,
      hostPlants: hostPlantsArray,
      pollinatedPlants: pollinatedPlantsArray,
    };

    try {
      const url = isEdit ? `/api/posts/${speciesId}` : '/api/posts';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());
      toast.success(isEdit ? 'Spesies berhasil diperbarui' : 'Spesies berhasil ditambahkan');
      router.push('/admin/posts');
    } catch (err: any) {
      toast.error(err.message ?? 'Gagal menyimpan spesies');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Link href="/admin/posts" className="inline-flex items-center gap-2 text-[#6B7280] hover:text-gray-700 mb-6 text-sm">
        <ChevronLeft className="w-4 h-4" /> Kembali
      </Link>
      <div className="flex items-center gap-3 mb-6">
        <Bug className="w-6 h-6 text-[#059669]" />
        <h1 className="font-heading text-2xl font-bold text-[#111827]">
          {isEdit ? 'Edit Spesies' : 'Tambah Spesies'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - 2/3 */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Identitas */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 flex flex-col gap-5">
            <p className="text-sm font-bold text-[#059669] uppercase tracking-wider border-b border-[#E5E7EB] pb-3 -mb-1">
              Identitas Spesies
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#374151]">Nama Umum *</label>
                <input required type="text" value={form.commonName} onChange={e => set('commonName')(e.target.value)}
                  placeholder="Contoh: Peacock Pansy"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#374151]">Nama Ilmiah *</label>
                <input required type="text" value={form.scientificName} onChange={e => set('scientificName')(e.target.value)}
                  placeholder="Contoh: Junonia almana"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#374151]">Famili *</label>
                <select required value={form.family} onChange={e => set('family')(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all">
                  <option value="">Pilih famili...</option>
                  {FAMILIES.map(f => <option key={f}>{f}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#374151]">Slug</label>
                <input type="text" value={form.slug} onChange={e => set('slug')(e.target.value)}
                  placeholder="Otomatis dari nama umum"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#374151]">Rentang Sayap</label>
                <input type="text" value={form.wingspan} onChange={e => set('wingspan')(e.target.value)}
                  placeholder="Contoh: 45-55 mm"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 flex flex-col gap-5">
            <p className="text-sm font-bold text-[#059669] uppercase tracking-wider border-b border-[#E5E7EB] pb-3 -mb-1">
              Deskripsi
            </p>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#374151]">Deskripsi Umum</label>
              <textarea rows={6} value={form.description} onChange={e => set('description')(e.target.value)}
                placeholder="Deskripsi lengkap tentang spesies ini..."
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#374151]">Karakteristik</label>
              <textarea rows={4} value={form.characteristics} onChange={e => set('characteristics')(e.target.value)}
                placeholder="Ciri-ciri fisik dan perilaku spesies ini..."
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all" />
            </div>
          </div>

          {/* Ekologi */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 flex flex-col gap-5">
            <p className="text-sm font-bold text-[#059669] uppercase tracking-wider border-b border-[#E5E7EB] pb-3 -mb-1">
              Peran Ekosistem
            </p>
            <CommaInput label="Tanaman Inang" value={form.hostPlants} onChange={set('hostPlants')}
              placeholder="Pisahkan dengan koma, contoh: Mangga, Jambu biji" />
            <CommaInput label="Tanaman yang Diserbuki" value={form.pollinatedPlants} onChange={set('pollinatedPlants')}
              placeholder="Pisahkan dengan koma, contoh: Pisang, Pepaya" />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#374151]">Peran dalam Ekosistem</label>
              <select value={form.ecosystemRole} onChange={e => set('ecosystemRole')(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all">
                <option value="">Pilih peran...</option>
                {ECOSYSTEM_ROLES.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#374151]">Catatan Ekologi</label>
              <textarea rows={3} value={form.ecologyNotes} onChange={e => set('ecologyNotes')(e.target.value)}
                placeholder="Catatan tambahan tentang ekologi spesies..."
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all" />
            </div>
          </div>

          {/* Distribusi */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 flex flex-col gap-5">
            <p className="text-sm font-bold text-[#059669] uppercase tracking-wider border-b border-[#E5E7EB] pb-3 -mb-1">
              Distribusi & Musim
            </p>
            <MultiCheckbox label="Musim Aktif" options={MONTHS}
              selected={form.activeMonths} onChange={set('activeMonths')} />
            <MultiCheckbox label="Lokasi Temuan" options={LOCATIONS}
              selected={form.foundLocations} onChange={set('foundLocations')} />
          </div>

          {/* Galeri Foto */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-amber-200 pb-3 -mb-1">
              <p className="text-sm font-bold text-[#059669] uppercase tracking-wider">Galeri Foto</p>
              <div className="flex gap-2">
                <button type="button" onClick={handleAddGalleryUrl}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#059669] border border-[#059669]/30 rounded-lg hover:bg-[#ECFDF5] transition-colors cursor-pointer">
                  <ImagePlus className="w-3.5 h-3.5" /> Tambah URL
                </button>
                <label className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#059669] rounded-lg hover:bg-[#047857] transition-all cursor-pointer">
                  <Upload className="w-3.5 h-3.5" /> Upload
                  <input ref={galleryInputRef} type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
                </label>
              </div>
            </div>
            {uploadingGallery && <p className="text-sm text-[#6B7280] animate-pulse">Mengunggah foto galeri...</p>}
            {form.galleryUrls.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {form.galleryUrls.map((url: string, idx: number) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-amber-200 group">
                    <img src={url} alt={`Galeri ${idx + 1}`} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => handleRemoveGalleryUrl(idx)}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#9CA3AF] text-center py-4">Belum ada foto galeri. Upload atau tambahkan URL.</p>
            )}
          </div>
        </div>

        {/* Sidebar - 1/3 */}
        <div className="flex flex-col gap-6">
          {/* Foto Utama */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 flex flex-col gap-5">
            <p className="text-sm font-bold text-[#059669] uppercase tracking-wider border-b border-[#E5E7EB] pb-3 -mb-1">
              Foto Utama
            </p>
            {form.primaryPhotoUrl ? (
              <div className="relative aspect-video rounded-lg overflow-hidden border border-amber-200">
                <img src={form.primaryPhotoUrl} alt="Foto utama" className="w-full h-full object-cover" />
                <button type="button" onClick={() => set('primaryPhotoUrl')('')}
                  className="absolute top-2 right-2 w-7 h-7 bg-red-500/90 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer shadow-md">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-2 aspect-video rounded-lg border-2 border-dashed border-[#D1D5DB] hover:border-[#059669] hover:bg-[#ECFDF5] cursor-pointer transition-colors">
                {uploading ? (
                  <p className="text-sm text-[#9CA3AF] animate-pulse">Mengunggah...</p>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-300" />
                    <p className="text-sm text-[#9CA3AF] font-medium">Upload foto atau masukkan URL</p>
                  </>
                )}
                <input ref={primaryInputRef} type="file" accept="image/*" onChange={handlePrimaryUpload} className="hidden" />
              </label>
            )}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#374151]">atau masukkan URL</label>
              <input type="text" value={form.primaryPhotoUrl} onChange={e => set('primaryPhotoUrl')(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all" />
            </div>
          </div>

          {/* Status */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 flex flex-col gap-5">
            <p className="text-sm font-bold text-[#059669] uppercase tracking-wider border-b border-[#E5E7EB] pb-3 -mb-1">
              Status Konservasi
            </p>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#374151]">Status IUCN</label>
              <select value={form.iucnStatus} onChange={e => set('iucnStatus')(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all">
                {IUCN_STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#374151]">Status di Situs</label>
              <select value={form.siteStatus} onChange={e => set('siteStatus')(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all">
                <option value="">Pilih status...</option>
                {SITE_STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Publikasi */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 flex flex-col gap-5">
            <p className="text-sm font-bold text-[#059669] uppercase tracking-wider border-b border-[#E5E7EB] pb-3 -mb-1">
              Publikasi
            </p>
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div>
                <p className="text-sm font-bold text-[#111827]">{form.isPublished ? 'Aktif / Publik' : 'Draft'}</p>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  {form.isPublished ? 'Tampil di website dan kiosk' : 'Hanya bisa dilihat pengelola'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={form.isPublished}
                  onChange={e => set('isPublished')(e.target.checked)} />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#059669]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#059669]" />
              </label>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center gap-3">
                <Star className={`w-5 h-5 ${form.featuredOnHome ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} />
                <div>
                  <p className="text-sm font-bold text-[#111827]">Spesies Unggulan</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">Tampil di halaman utama</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={form.featuredOnHome}
                  onChange={e => set('featuredOnHome')(e.target.checked)} />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500" />
              </label>
            </div>
            {form.featuredOnHome && (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#374151]">Urutan di Halaman Utama</label>
                <input type="number" value={form.homeOrder} onChange={e => set('homeOrder')(parseInt(e.target.value) || 0)}
                  min={0} className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#111827] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all" />
                <p className="text-xs text-[#9CA3AF]">Angka lebih kecil = tampil lebih dulu</p>
              </div>
            )}
            <button type="submit" disabled={saving}
              className="bg-[#059669] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#047857] transition-all disabled:opacity-50 w-full">
              {saving ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Simpan')}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}