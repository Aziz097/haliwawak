'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, X, Check } from 'lucide-react';

type TabGroup = 'umum' | 'seo' | 'kiosk' | 'backup';

const TABS: { key: TabGroup; label: string }[] = [
  { key: 'umum', label: 'Umum' },
  { key: 'seo', label: 'SEO' },
  { key: 'kiosk', label: 'Kiosk' },
  { key: 'backup', label: 'Backup' },
];

const KEY_DESCRIPTIONS: Record<string, string> = {
  site_name: 'Nama situs yang ditampilkan di browser dan header',
  site_description: 'Deskripsi singkat situs untuk mesin pencari',
  contact_email: 'Email kontak utama',
  contact_phone: 'Nomor telepon kontak',
  address: 'Alamat lokasi situs konservasi',
  google_analytics_id: 'ID Google Analytics (contoh: G-XXXXXXXXXX)',
  meta_title_suffix: 'Suffix judul halaman (ditambahkan di akiri judul halaman)',
  meta_description_default: 'Deskripsi meta default untuk halaman tanpa deskripsi khusus',
  og_image_url: 'URL gambar default untuk share media sosial',
  kiosk_mode_enabled: 'Aktifkan mode kiosk (tampilan layar penuh)',
  kiosk_idle_timeout: 'Waktu idle sebelum kembali ke halaman utama (detik)',
  kiosk_home_url: 'URL halaman utama kiosk',
  kiosk_allowed_urls: 'Daftar URL yang diizinkan (pisahkan dengan koma)',
  backup_frequency: 'Frekuensi backup otomatis',
  backup_retention_days: 'Jumlah hari menyimpan backup',
};

function isLongField(key: string): boolean {
  return /description|content|bio|about|address|allowed_urls/i.test(key);
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabGroup>('umum');
  const [toast, setToast] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const fetchSettings = () => {
    fetch('/api/settings').then(r => r.json()).then(data => {
      setSettings(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  };

  useEffect(() => { fetchSettings(); }, []);

  const updateSetting = (id: number, value: string) => {
    setSettings(prev => prev.map(s => s.id === id ? { ...s, value } : s));
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  const handleAdd = async () => {
    if (!newKey.trim()) return;
    const newSetting = { key: newKey.trim(), value: newValue, group: activeTab };
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([newSetting]),
    });
    const data = await res.json();
    if (Array.isArray(data)) {
      setSettings(prev => [...prev, data[0]]);
    }
    setNewKey('');
    setNewValue('');
    setShowAddForm(false);
  };

  if (loading) return <p className="text-[#6B7280]">Memuat...</p>;

  const tabSettings = settings.filter(s => s.group === activeTab);

  return (
    <div className="relative">
      {toast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-[fadeIn_0.2s_ease-out]">
          <Check className="w-4 h-4" />
          Pengaturan disimpan
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-[#111827]">Pengaturan</h1>
      </div>

      <div className="flex gap-1 bg-white border border-[#E5E7EB] rounded-xl p-1 mb-6">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-[#059669] text-white shadow-sm'
                : 'text-[#6B7280] hover:bg-[#F9FAFB]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
        {tabSettings.length === 0 && !showAddForm ? (
          <p className="text-[#6B7280] text-center py-8">Belum ada pengaturan untuk tab ini.</p>
        ) : (
          <div className="space-y-5">
            {tabSettings.map(s => (
              <div key={s.id || s.key}>
                <label className="block text-sm font-medium text-[#111827] mb-1.5">
                  {s.key.replace(/_/g, ' ')}
                </label>
                {KEY_DESCRIPTIONS[s.key] && (
                  <p className="text-xs text-[#6B7280] mb-1.5">{KEY_DESCRIPTIONS[s.key]}</p>
                )}
                {isLongField(s.key) ? (
                  <textarea
                    value={s.value || ''}
                    onChange={e => updateSetting(s.id, e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] resize-y"
                  />
                ) : (
                  <input
                    value={s.value || ''}
                    onChange={e => updateSetting(s.id, e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {showAddForm && (
          <div className="mt-5 pt-5 border-t border-[#E5E7EB]">
            <h3 className="text-xs font-bold text-[#059669] uppercase tracking-wider mb-3">Tambah Pengaturan Baru</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#6B7280] mb-1">Key</label>
                <input
                  value={newKey}
                  onChange={e => setNewKey(e.target.value)}
                  placeholder="contoh: site_tagline"
                  className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#6B7280] mb-1">Value</label>
                {isLongField(newKey) ? (
                  <textarea
                    value={newValue}
                    onChange={e => setNewValue(e.target.value)}
                    rows={3}
                    placeholder="Nilai pengaturan"
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] resize-y"
                  />
                ) : (
                  <input
                    value={newValue}
                    onChange={e => setNewValue(e.target.value)}
                    placeholder="Nilai pengaturan"
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                  />
                )}
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => { setShowAddForm(false); setNewKey(''); setNewValue(''); }} className="px-4 py-2 rounded-lg text-sm text-[#6B7280] hover:bg-[#F9FAFB] transition-colors">
                  Batal
                </button>
                <button onClick={handleAdd} className="flex items-center gap-1.5 bg-[#059669] hover:bg-[#047857] text-white px-4 py-2 rounded-lg text-sm font-bold transition-all">
                  <Plus className="w-3.5 h-3.5" />
                  Tambah
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-1.5 text-sm font-medium text-[#059669] hover:underline"
        >
          <Plus className="w-4 h-4" />
          Tambah Pengaturan
        </button>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white px-6 py-3 rounded-lg font-bold text-sm transition-all disabled:opacity-50">
          <Save className="w-4 h-4" />
          {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
        </button>
      </div>
    </div>
  );
}