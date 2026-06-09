import { db } from '@/db';
import { species } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await db.select().from(species).where(eq(species.isPublished, true));
  return NextResponse.json(data);
}
