'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, X, User } from 'lucide-react';

const roleBadge: Record<string, string> = {
  super_admin: 'text-kiosk-orange-700 bg-kiosk-orange-100',
  admin: 'text-success bg-success/10',
  editor: 'text-warning bg-warning/10',
};

const statusBadge: Record<string, string> = {
  active: 'text-success bg-success/10 border-success/30',
  inactive: 'text-kiosk-ink-muted bg-kiosk-orange-100 border-kiosk-orange-100',
};

interface UserItem {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

interface UserForm {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState<UserItem | null>(null);
  const [form, setForm] = useState<UserForm>({ name: '', email: '', password: '', role: 'editor' });
  const [saving, setSaving] = useState(false);

  const fetchUsers = () => {
    fetch('/api/users')
      .then((r) => r.json())
      .then((data) => {
        setUsers(Array.isArray(data) ? (data as UserItem[]) : []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleActive = async (id: number, current: boolean) => {
    await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !current }),
    });
    fetchUsers();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus pengguna ini?')) return;
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    fetchUsers();
  };

  const openAdd = () => {
    setEditUser(null);
    setForm({ name: '', email: '', password: '', role: 'editor' });
    setShowModal(true);
  };

  const openEdit = (u: UserItem) => {
    setEditUser(u);
    setForm({ name: u.name || '', email: u.email || '', password: '', role: u.role || 'editor' });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const url = editUser ? `/api/users/${editUser.id}` : '/api/users';
    const method = editUser ? 'PUT' : 'POST';
    const body: { name: string; email: string; role: string; password?: string } = {
      name: form.name,
      email: form.email,
      role: form.role,
    };
    if (form.password) body.password = form.password;
    if (editUser && !form.password) delete body.password;
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    setShowModal(false);
    setSaving(false);
    fetchUsers();
  };

  if (loading) return <p className="text-kiosk-ink-muted py-12 text-center">Memuat...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold text-kiosk-orange-600 uppercase tracking-wider">
            Ringkasan Sistem
          </p>
          <h1 className="font-heading text-2xl font-bold text-kiosk-ink mt-1">Pengguna</h1>
          <p className="text-sm text-kiosk-ink-muted mt-1">{users.length} pengguna</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-kiosk-orange-600 hover:bg-kiosk-orange-700 text-white px-4 py-2.5 rounded-[1rem] text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" /> Tambah Pengguna
        </button>
      </div>

      <div className="bg-white border border-kiosk-orange-100 rounded-[1.618rem] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-kiosk-bg border-b border-kiosk-orange-100">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-semibold text-kiosk-ink-muted uppercase tracking-wider">
                Pengguna
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-kiosk-ink-muted uppercase tracking-wider">
                Role
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-kiosk-ink-muted uppercase tracking-wider">
                Status
              </th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-kiosk-ink-muted uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-kiosk-orange-100">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-kiosk-bg">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-kiosk-orange-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {(u.name || '?')[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-kiosk-ink">{u.name}</p>
                      <p className="text-xs text-kiosk-ink-muted">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-[0.618rem] border ${roleBadge[u.role] || 'text-kiosk-ink-muted bg-kiosk-orange-100'}`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => toggleActive(u.id, u.isActive)}
                    className={`text-xs font-medium px-2.5 py-1 rounded-[0.618rem] border cursor-pointer transition-colors ${u.isActive ? statusBadge.active : statusBadge.inactive}`}
                  >
                    {u.isActive ? 'Aktif' : 'Nonaktif'}
                  </button>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => openEdit(u)}
                      className="p-2 border border-kiosk-orange-100 rounded-[0.618rem] text-kiosk-ink-muted hover:text-kiosk-orange-600 hover:border-kiosk-orange-600/50 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
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
        {users.length === 0 && (
          <div className="py-12 text-center">
            <User className="w-10 h-10 text-kiosk-orange-200 mx-auto mb-2" />
            <p className="text-kiosk-ink-muted">Tidak ada pengguna ditemukan.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />
          <div className="relative bg-white border border-kiosk-orange-100 rounded-[1.618rem] shadow-xl w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading text-lg font-bold text-kiosk-ink">
                {editUser ? 'Edit Pengguna' : 'Tambah Pengguna'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 text-kiosk-ink-muted hover:text-kiosk-ink transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-kiosk-ink-muted uppercase tracking-wider mb-1.5">
                  Nama
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-[1rem] border border-kiosk-orange-100 bg-kiosk-bg text-kiosk-ink text-sm placeholder-kiosk-ink-muted focus:outline-none focus:border-kiosk-orange-600 focus:ring-1 focus:ring-kiosk-orange-600 transition-colors"
                  placeholder="Nama lengkap"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-kiosk-ink-muted uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-[1rem] border border-kiosk-orange-100 bg-kiosk-bg text-kiosk-ink text-sm placeholder-kiosk-ink-muted focus:outline-none focus:border-kiosk-orange-600 focus:ring-1 focus:ring-kiosk-orange-600 transition-colors"
                  placeholder="email@contoh.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-kiosk-ink-muted uppercase tracking-wider mb-1.5">
                  Password{' '}
                  {editUser && (
                    <span className="normal-case font-normal">(kosongkan jika tidak diubah)</span>
                  )}
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-[1rem] border border-kiosk-orange-100 bg-kiosk-bg text-kiosk-ink text-sm placeholder-kiosk-ink-muted focus:outline-none focus:border-kiosk-orange-600 focus:ring-1 focus:ring-kiosk-orange-600 transition-colors"
                  placeholder={editUser ? '••••••••' : 'Password'}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-kiosk-ink-muted uppercase tracking-wider mb-1.5">
                  Role
                </label>
                <select
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-[1rem] border border-kiosk-orange-100 bg-kiosk-bg text-kiosk-ink text-sm focus:outline-none focus:border-kiosk-orange-600 focus:ring-1 focus:ring-kiosk-orange-600 transition-colors"
                >
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-[1rem] border border-kiosk-orange-100 text-sm font-medium text-kiosk-ink-muted hover:bg-kiosk-bg transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 rounded-[1rem] bg-kiosk-orange-600 hover:bg-kiosk-orange-700 text-white text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {saving ? 'Menyimpan...' : editUser ? 'Simpan' : 'Tambah'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
