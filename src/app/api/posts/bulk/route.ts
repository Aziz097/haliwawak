import { db } from '@/db';
import { species } from '@/db/schema';
import { inArray } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { invalidateSpeciesCache } from '@/lib/public-cache';

export async function POST(req: NextRequest) {
  const { action, ids } = await req.json();
  if (!Array.isArray(ids) || ids.length === 0) return NextResponse.json({ error: 'No IDs' }, { status: 400 });

  if (action === 'publish') {
    await db.update(species).set({ isPublished: true }).where(inArray(species.id, ids));
  } else if (action === 'archive') {
    await db.update(species).set({ isPublished: false }).where(inArray(species.id, ids));
  } else if (action === 'delete') {
    await db.delete(species).where(inArray(species.id, ids));
  }

  invalidateSpeciesCache();
  return NextResponse.json({ success: true });
}
