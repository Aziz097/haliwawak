'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, X, User } from 'lucide-react';

const roleBadge: Record<string, string> = {
  super_admin: 'text-[#7C3AED] bg-[#EDE9FE]',
  admin: 'text-[#059669] bg-[#D1FAE5]',
  editor: 'text-[#D97706] bg-[#FEF3C7]',
};

const statusBadge: Record<string, string> = {
  active: 'text-[#059669] bg-[#D1FAE5] border-[#A7F3D0]',
  inactive: 'text-[#6B7280] bg-[#F3F4F6] border-[#E5E7EB]',
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState<any>(null);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'editor' });
  const [saving, setSaving] = useState(false);

  const fetchUsers = () => {
    fetch('/api/users').then(r => r.json()).then(data => {
      setUsers(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  };

  useEffect(() => { fetchUsers(); }, []);

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

  const openEdit = (u: any) => {
    setEditUser(u);
    setForm({ name: u.name || '', email: u.email || '', password: '', role: u.role || 'editor' });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const url = editUser ? `/api/users/${editUser.id}` : '/api/users';
    const method = editUser ? 'PUT' : 'POST';
    const body: any = { name: form.name, email: form.email, role: form.role };
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

  if (loading) return <p className="text-[#6B7280] py-12 text-center">Memuat...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold text-[#059669] uppercase tracking-wider">Ringkasan Sistem</p>
          <h1 className="text-2xl font-bold text-[#111827] mt-1">Pengguna</h1>
          <p className="text-sm text-[#6B7280] mt-1">{users.length} pengguna</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" /> Tambah Pengguna
        </button>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Pengguna</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Role</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Status</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {users.map((u: any) => (
              <tr key={u.id} className="hover:bg-[#F9FAFB]">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#059669] flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {(u.name || '?')[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-[#111827]">{u.name}</p>
                      <p className="text-xs text-[#6B7280]">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-md border ${roleBadge[u.role] || 'text-[#6B7280] bg-[#F3F4F6]'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => toggleActive(u.id, u.isActive)}
                    className={`text-xs font-medium px-2.5 py-1 rounded-md border cursor-pointer transition-colors ${u.isActive ? statusBadge.active : statusBadge.inactive}`}
                  >
                    {u.isActive ? 'Aktif' : 'Nonaktif'}
                  </button>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button onClick={() => openEdit(u)}
                      className="p-2 border border-[#E5E7EB] rounded-md text-[#6B7280] hover:text-[#059669] hover:border-[#059669]/50 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(u.id)}
                      className="p-2 border border-[#E5E7EB] rounded-md text-[#6B7280] hover:text-red-600 hover:border-red-300 transition-colors">
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
            <User className="w-10 h-10 text-[#D1D5DB] mx-auto mb-2" />
            <p className="text-[#6B7280]">Tidak ada pengguna ditemukan.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />
          <div className="relative bg-white border border-[#E5E7EB] rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-[#111827]">{editUser ? 'Edit Pengguna' : 'Tambah Pengguna'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 text-[#6B7280] hover:text-[#111827] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">Nama</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-[#111827] text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-colors"
                  placeholder="Nama lengkap"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-[#111827] text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-colors"
                  placeholder="email@contoh.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">
                  Password {editUser && <span className="normal-case font-normal">(kosongkan jika tidak diubah)</span>}
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-[#111827] text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-colors"
                  placeholder={editUser ? '••••••••' : 'Password'}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">Role</label>
                <select
                  value={form.role}
                  onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-[#111827] text-sm focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-colors"
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
                className="px-4 py-2 rounded-lg border border-[#E5E7EB] text-sm font-medium text-[#6B7280] hover:bg-[#F9FAFB] transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-sm font-semibold transition-colors disabled:opacity-50"
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