'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bug } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push('/admin');
    } else {
      const data = await res.json();
      setError(data.error || 'Login gagal');
    }
  };

  return (
    <div className="min-h-screen bg-[#1A3A2A] flex items-center justify-center px-4">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-[#059669] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Bug className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-white">CMS Pugung</h1>
          <p className="text-white/50 text-sm mt-2">Masuk ke panel administrasi</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-5">
          {error && (
            <div className="text-sm text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] px-4 py-3 rounded-lg">{error}</div>
          )}
          <div>
            <label className="block text-sm font-semibold text-[#374151] mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F9FAFB] px-4 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all placeholder:text-[#9CA3AF]"
              placeholder="admin@eduwisata.id"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#374151] mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F9FAFB] px-4 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all placeholder:text-[#9CA3AF]"
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="w-full bg-[#059669] hover:bg-[#047857] text-white font-bold py-3 rounded-lg transition-all text-sm">
            Masuk
          </button>
        </form>
        <p className="text-center text-white/30 text-xs mt-6">Sistem Informasi Eduwisata Polinator &mdash; ITERA</p>
      </div>
    </div>
  );
}