import { db } from '@/db';
import { accounts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function GET() {
  const userId = await getSession();
  if (!userId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const user = await db.select({ id: accounts.id, name: accounts.name, email: accounts.email, role: accounts.role })
    .from(accounts).where(eq(accounts.id, Number(userId))).limit(1).then(r => r[0]);

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  return NextResponse.json(user);
}
