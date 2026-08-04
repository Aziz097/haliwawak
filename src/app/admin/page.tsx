'use client';

import { useState, useEffect } from 'react';
import { Bug, FileText, Clock, Users, Activity, ExternalLink, Wifi, Database, ChevronRight } from 'lucide-react';

function timeAgo(dateStr: string): string {
  if (!dateStr) return '';
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'hari ini';
  if (diffDays === 1) return 'kemarin';
  if (diffDays < 30) return `${diffDays} hari lalu`;
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths} bulan lalu`;
}

function getActionIcon(action: string) {
  const a = (action || '').toUpperCase();
  if (a.includes('CREATE')) return { bg: 'bg-success/10 text-success', icon: '✚' };
  if (a.includes('UPDATE')) return { bg: 'bg-kiosk-orange-100 text-kiosk-orange-700', icon: '✎' };
  if (a.includes('DELETE')) return { bg: 'bg-danger/10 text-danger', icon: '✕' };
  if (a.includes('LOGIN')) return { bg: 'bg-warning/10 text-warning', icon: '🔑' };
  return { bg: 'bg-kiosk-orange-50 text-kiosk-ink-muted', icon: '●' };
}

// Mirrors the kiosk-iucn-* token mapping used in app/kiosk/components/SpeciesCard.tsx.
function getIucnBadge(status: string | null) {
  if (!status) return { label: 'NE', cls: 'text-kiosk-on-green bg-kiosk-iucn-na' };
  const s = status.toUpperCase();
  if (s === 'LC') return { label: 'LC', cls: 'text-kiosk-on-green bg-kiosk-iucn-lc' };
  if (s === 'NT') return { label: 'NT', cls: 'text-kiosk-on-green bg-kiosk-iucn-nt' };
  if (s === 'VU') return { label: 'VU', cls: 'text-kiosk-on-green bg-kiosk-iucn-vu' };
  if (s === 'EN') return { label: 'EN', cls: 'text-kiosk-on-green bg-kiosk-iucn-en' };
  if (s === 'CR') return { label: 'CR', cls: 'text-kiosk-on-green bg-kiosk-iucn-cr' };
  return { label: s, cls: 'text-kiosk-on-green bg-kiosk-iucn-na' };
}

interface DashboardData {
  speciesCount: number;
  articlesCount: number;
  activeArticlesCount: number;
  draftCount: number;
  usersCount: number;
  recentActivity: Array<{
    id: number;
    action: string;
    entity: string;
    entityId: number | null;
    userName: string | null;
    createdAt: string;
  }>;
  recentSpecies: Array<{
    id: number;
    commonName: string;
    scientificName: string;
    family: string;
    iucnStatus: string | null;
    primaryPhotoUrl: string | null;
  }>;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-kiosk-orange-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-kiosk-orange-600 uppercase tracking-wider">Memuat Dashboard</p>
        </div>
      </div>
    );
  }

  const statsCards = [
    { icon: Bug, label: 'Total Spesies', value: data?.speciesCount ?? 0 },
    { icon: FileText, label: 'Artikel Aktif', value: data?.activeArticlesCount ?? 0 },
    { icon: Clock, label: 'Draft', value: data?.draftCount ?? 0 },
    { icon: Users, label: 'Pengguna', value: data?.usersCount ?? 0 },
  ];

  const activityItems = data?.recentActivity ?? [];
  const recentSpeciesList = data?.recentSpecies ?? [];

  return (
    <div className="min-h-screen bg-kiosk-bg">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-kiosk-ink-muted uppercase text-xs font-bold tracking-wider mb-1">Ringkasan Sistem</p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-kiosk-ink">Dashboard</h1>
          </div>
          <div className="flex items-center gap-2 text-success bg-success/10 border border-success/30 px-3 py-1.5 rounded-full text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
            </span>
            Sistem Aktif
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statsCards.map((card) => (
          <div
            key={card.label}
            className="relative bg-white border border-kiosk-orange-100 rounded-[1.618rem] p-5 hover:border-kiosk-orange-600/50 transition-all group overflow-hidden"
          >
            <card.icon
              className="absolute top-3 right-4 w-16 h-16 text-kiosk-orange-600 opacity-[0.06] group-hover:opacity-20 transition-opacity pointer-events-none"
              strokeWidth={1.5}
            />
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-[1rem] bg-kiosk-orange-50 text-kiosk-orange-600 flex items-center justify-center shrink-0">
                <card.icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-3xl font-bold text-kiosk-ink leading-none">{card.value}</p>
                <p className="text-xs text-kiosk-orange-600 font-medium mt-1">{card.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left: Aktivitas Terbaru */}
        <div className="lg:col-span-2 bg-white border border-kiosk-orange-100 rounded-[1.618rem] p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-kiosk-orange-600" />
              <h2 className="text-sm font-bold text-kiosk-ink">Aktivitas Terbaru</h2>
            </div>
            <span className="text-[10px] font-bold text-kiosk-orange-600 uppercase tracking-wider">
              {activityItems.length} entri
            </span>
          </div>

          {activityItems.length > 0 ? (
            <div className="space-y-1">
              {activityItems.map((log) => {
                const iconInfo = getActionIcon(log.action);
                return (
                  <div key={log.id} className="flex items-center gap-3 px-3 py-2.5 rounded-[1rem] hover:bg-kiosk-bg transition-colors">
                    <div className={`w-8 h-8 rounded-full ${iconInfo.bg} flex items-center justify-center text-xs font-bold shrink-0`}>
                      {iconInfo.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-kiosk-ink font-medium truncate">
                        {log.action}
                        {log.entity && (
                          <span className="text-kiosk-ink-muted font-normal ml-1">• {log.entity}{log.entityId ? ` #${log.entityId}` : ''}</span>
                        )}
                      </p>
                      {log.userName && (
                        <p className="text-xs text-kiosk-ink-muted">{log.userName}</p>
                      )}
                    </div>
                    <span className="text-xs text-kiosk-ink-muted whitespace-nowrap">
                      {timeAgo(log.createdAt)}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-kiosk-ink-muted text-sm py-8 text-center">Belum ada aktivitas.</p>
          )}
        </div>

        {/* Right: Status Integrasi */}
        <div className="bg-white border border-kiosk-orange-100 rounded-[1.618rem] p-6">
          <div className="flex items-center gap-2 mb-5">
            <Wifi className="w-4 h-4 text-kiosk-orange-600" />
            <h2 className="text-sm font-bold text-kiosk-ink">Status Integrasi</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-kiosk-bg rounded-[1rem] px-4 py-3">
              <span className="w-2.5 h-2.5 rounded-full bg-success shadow-[0_0_8px_rgba(43,122,75,0.5)] shrink-0" />
              <div>
                <p className="text-sm font-medium text-kiosk-ink">Kiosk Online</p>
                <p className="text-xs text-kiosk-ink-muted">Terhubung ke jaringan</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-kiosk-bg rounded-[1rem] px-4 py-3">
              <span className="w-2.5 h-2.5 rounded-full bg-success shrink-0" />
              <div>
                <p className="text-sm font-medium text-kiosk-ink">Database Terhubung</p>
                <p className="text-xs text-kiosk-ink-muted">PostgreSQL aktif</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-kiosk-bg rounded-[1rem] px-4 py-3">
              <div className="w-2.5 h-2.5 rounded-full bg-success shrink-0 flex items-center justify-center">
                <Database className="w-1.5 h-1.5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-kiosk-ink">Storage Aktif</p>
                <p className="text-xs text-kiosk-ink-muted">Media tersedia</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spesies Terbaru */}
      <div className="bg-white border border-kiosk-orange-100 rounded-[1.618rem] p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-bold text-kiosk-orange-600 uppercase tracking-wider mb-1">Spesies Terbaru</p>
            <h2 className="text-sm font-bold text-kiosk-ink">5 spesies terakhir ditambahkan</h2>
          </div>
          <a
            href="/admin/posts"
            className="flex items-center gap-1 text-xs font-medium text-kiosk-orange-600 hover:text-kiosk-orange-700 transition-colors"
          >
            Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {recentSpeciesList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {recentSpeciesList.map((sp) => {
              const badge = getIucnBadge(sp.iucnStatus);
              return (
                <div key={sp.id} className="group relative bg-kiosk-bg rounded-[1rem] p-4 border border-transparent hover:border-kiosk-orange-200 transition-all">
                  <div className="w-full aspect-square rounded-[1rem] bg-kiosk-orange-100 mb-3 overflow-hidden">
                    {sp.primaryPhotoUrl ? (
                      <img
                        src={sp.primaryPhotoUrl}
                        alt={sp.commonName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Bug className="w-8 h-8 text-kiosk-ink-muted" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-kiosk-ink truncate">{sp.commonName}</p>
                  <p className="text-xs text-kiosk-ink-muted italic truncate">{sp.scientificName}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-kiosk-ink-muted">{sp.family}</span>
                    <span className={`inline-flex text-[10px] font-bold px-1.5 py-0.5 rounded ${badge.cls}`}>
                      {badge.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-kiosk-ink-muted text-sm py-8 text-center">Belum ada spesies.</p>
        )}
      </div>
    </div>
  );
}