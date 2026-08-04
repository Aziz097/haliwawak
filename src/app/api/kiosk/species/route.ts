import { db } from '@/db';
import { species } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { withWebpPhotos } from '@/lib/kiosk-assets';

export async function GET() {
  const data = await db.select().from(species).where(eq(species.isPublished, true));
  // Rows written before the WebP conversion still name the deleted originals.
  return NextResponse.json(data.map(withWebpPhotos));
}
