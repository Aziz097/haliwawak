import { db } from '@/db';
import { accounts } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const data = await db.select({
    id: accounts.id, name: accounts.name, email: accounts.email,
    role: accounts.role, isActive: accounts.isActive, createdAt: accounts.createdAt
  }).from(accounts).orderBy(desc(accounts.createdAt));
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const passwordHash = await bcrypt.hash(body.password, 10);
  const result = await db.insert(accounts).values({
    name: body.name, email: body.email, passwordHash, role: body.role || 'editor', isActive: true,
  }).returning();
  return NextResponse.json(result[0], { status: 201 });
}
