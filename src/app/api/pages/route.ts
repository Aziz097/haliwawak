import { db } from '@/db';
import { staticPages } from '@/db/schema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const data = await db.select().from(staticPages);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await db.insert(staticPages).values({
    title: body.title,
    slug: body.slug,
    content: body.content,
    navOrder: body.navOrder ?? 0,
    isActive: body.isActive ?? true,
    metaTitle: body.metaTitle ?? null,
    metaDescription: body.metaDescription ?? null,
  }).returning();
  return NextResponse.json(result[0], { status: 201 });
}
