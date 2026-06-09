import { db } from '@/db';
import { media } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const category = url.searchParams.get('category');
  let query = db.select().from(media).orderBy(desc(media.createdAt));
  const data = await query;
  return NextResponse.json(category ? data.filter(m => m.category === category) : data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await db.insert(media).values(body).returning();
  return NextResponse.json(result[0], { status: 201 });
}
