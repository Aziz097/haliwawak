import { db } from '@/db';
import { species } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await db.select().from(species).where(eq(species.id, Number(id))).limit(1).then(r => r[0]);
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const result = await db.update(species).set(body).where(eq(species.id, Number(id))).returning();
  return NextResponse.json(result[0]);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await db.delete(species).where(eq(species.id, Number(id)));
  return NextResponse.json({ success: true });
}
