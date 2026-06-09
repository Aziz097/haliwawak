import { db } from '@/db';
import { staticPages } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await db.select().from(staticPages).where(eq(staticPages.slug, slug)).limit(1).then(r => r[0]);
  if (!page) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(page);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await req.json();
  const { title, content, navOrder, isActive, metaTitle, metaDescription } = body;
  const result = await db.update(staticPages).set({
    ...(title !== undefined && { title }),
    ...(content !== undefined && { content }),
    ...(navOrder !== undefined && { navOrder }),
    ...(isActive !== undefined && { isActive }),
    ...(metaTitle !== undefined && { metaTitle }),
    ...(metaDescription !== undefined && { metaDescription }),
    updatedAt: new Date(),
  }).where(eq(staticPages.slug, slug)).returning();
  if (!result.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(result[0]);
}
