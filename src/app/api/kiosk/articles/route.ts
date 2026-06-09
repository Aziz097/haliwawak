import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await db
    .select()
    .from(articles)
    .where(eq(articles.status, 'active'))
    .orderBy(desc(articles.publishedAt));
  return NextResponse.json(data);
}
