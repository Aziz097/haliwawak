import { db } from '@/db';
import { settings } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const data = await db.select().from(settings);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const results = [];
  for (const item of body) {
    if (item.id) {
      const result = await db.update(settings).set({ value: item.value }).where(eq(settings.id, item.id)).returning();
      results.push(result[0]);
    } else {
      const result = await db.insert(settings).values({ key: item.key, value: item.value, group: item.group }).returning();
      results.push(result[0]);
    }
  }
  return NextResponse.json(results);
}
