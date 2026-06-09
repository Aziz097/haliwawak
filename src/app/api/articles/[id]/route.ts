import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await db.select().from(articles).where(eq(articles.id, Number(id))).limit(1).then(r => r[0]);
  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(article);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const result = await db.update(articles).set(body).where(eq(articles.id, Number(id))).returning();
  return NextResponse.json(result[0]);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await db.delete(articles).where(eq(articles.id, Number(id)));
  return NextResponse.json({ success: true });
}
