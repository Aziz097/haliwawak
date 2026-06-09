import { db } from '@/db';
import { accounts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { setSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email dan password harus diisi' }, { status: 400 });
    }

    const user = await db.select().from(accounts).where(eq(accounts.email, email)).limit(1).then(r => r[0]);
    if (!user) {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
    }

    if (!user.isActive) {
      return NextResponse.json({ error: 'Akun tidak aktif' }, { status: 403 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
    }

    await setSession(String(user.id));
    return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch {
    return NextResponse.json({ error: 'Terjadi kesalahan' }, { status: 500 });
  }
}
