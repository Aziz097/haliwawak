import { db } from '@/db';
import { species, articles, activityLogs, accounts } from '@/db/schema';
import { count, desc, eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  const [speciesCount, articlesCount, activeArticlesCount, draftCount, usersCount] = await Promise.all([
    db.select({ value: count() }).from(species).then(r => r[0].value),
    db.select({ value: count() }).from(articles).then(r => r[0].value),
    db.select({ value: count() }).from(articles).where(eq(articles.status, 'active')).then(r => r[0].value),
    db.select({ value: count() }).from(articles).where(eq(articles.status, 'draft')).then(r => r[0].value),
    db.select({ value: count() }).from(accounts).then(r => r[0].value),
  ]);

  const recentActivity = await db.select().from(activityLogs).orderBy(desc(activityLogs.createdAt)).limit(15);

  const recentSpecies = await db.select({
    id: species.id,
    commonName: species.commonName,
    scientificName: species.scientificName,
    family: species.family,
    iucnStatus: species.iucnStatus,
    primaryPhotoUrl: species.primaryPhotoUrl,
  }).from(species).orderBy(desc(species.createdAt)).limit(5);

  return NextResponse.json({
    speciesCount,
    articlesCount,
    activeArticlesCount,
    draftCount,
    usersCount,
    recentActivity,
    recentSpecies,
  });
}