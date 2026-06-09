'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Bug, FileText, Image, Users, Settings, LogOut, LayoutList, ChevronLeft, ChevronRight } from 'lucide-react';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, group: 'Menu Utama' },
  { href: '/admin/posts', label: 'Spesies', icon: Bug, group: 'Menu Utama' },
  { href: '/admin/konten', label: 'Konten', icon: FileText, group: 'Menu Utama' },
  { href: '/admin/pages', label: 'Halaman Statis', icon: LayoutList, group: 'Menu Utama' },
  { href: '/admin/media', label: 'Media', icon: Image, group: 'Menu Utama' },
  { href: '/admin/users', label: 'Pengguna', icon: Users, group: 'Sistem' },
  { href: '/admin/settings', label: 'Pengaturan', icon: Settings, group: 'Sistem' },
];

const GROUPS = ['Menu Utama', 'Sistem'];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <aside className={`fixed left-0 top-0 bottom-0 ${collapsed ? 'w-[72px]' : 'w-[260px]'} bg-[#1A3A2A] text-white flex flex-col z-50 transition-all duration-300`}>
      <div className={`p-5 border-b border-white/10 flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <div className="w-9 h-9 rounded-full bg-[#059669] flex items-center justify-center shrink-0">
          <Bug className="w-5 h-5 text-white" />
        </div>
        {!collapsed && <span className="font-heading font-bold text-lg tracking-tight">CMS Pugung</span>}
      </div>

      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
        {GROUPS.map(group => {
          const items = NAV.filter(n => n.group === group);
          if (items.length === 0) return null;
          return (
            <div key={group} className="mb-4">
              {!collapsed && <p className="px-5 mb-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">{group}</p>}
              {items.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href || (href !== '/admin' && pathname.startsWith(href));
                return (
                  <Link key={href} href={href} title={collapsed ? label : undefined}
                    className={`flex items-center gap-3 ${collapsed ? 'justify-center px-3' : 'px-5'} py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#059669] !text-white font-semibold'
                        : 'text-white/60 hover:bg-white/10 hover:text-white'
                    }`}>
                    <Icon className="w-[18px] h-[18px] shrink-0" />
                    {!collapsed && <span>{label}</span>}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        {!collapsed && (
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-[#059669] flex items-center justify-center text-xs font-bold shrink-0">A</div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin</p>
              <p className="text-[11px] text-white/40 truncate">Super Admin</p>
            </div>
          </div>
        )}
        <button onClick={handleLogout} title={collapsed ? 'Keluar' : undefined}
          className={`flex items-center gap-3 ${collapsed ? 'justify-center px-3' : 'px-4'} py-2.5 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/10 w-full transition-colors`}>
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          {!collapsed && <span>Keluar</span>}
        </button>
      </div>

      <button onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-[#059669] rounded-full flex items-center justify-center shadow-lg hover:bg-[#047857] transition-colors cursor-pointer z-10">
        {collapsed ? <ChevronRight className="w-3.5 h-3.5 text-white" /> : <ChevronLeft className="w-3.5 h-3.5 text-white" />}
      </button>
    </aside>
  );
}