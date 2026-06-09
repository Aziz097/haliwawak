import { db } from '@/db';
import { species } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '50');
  const offset = (page - 1) * limit;
  const data = await db.select().from(species).orderBy(desc(species.createdAt)).limit(limit).offset(offset);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await db.insert(species).values(body).returning();
  return NextResponse.json(result[0], { status: 201 });
}
