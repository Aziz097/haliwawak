import { db } from '../src/db';
import { accounts, species } from '../src/db/schema';
import { CORRECTED_SPECIES } from '../src/db/seed-species-corrected';
import { seedPages } from '../src/db/seed-pages';
import bcrypt from 'bcryptjs';
import { sql } from 'drizzle-orm';

function slugify(s: string): string {
  return s.toLowerCase().replace(/[\s()]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

async function seedAccounts() {
  const users = [
    { name: 'Super Admin', email: 'superadmin@eduwisata.id', password: 'admin123', role: 'super_admin' },
    { name: 'Admin', email: 'admin@eduwisata.id', password: 'admin123', role: 'admin' },
    { name: 'Editor', email: 'editor@eduwisata.id', password: 'editor123', role: 'editor' },
  ];

  for (const u of users) {
    const passwordHash = await bcrypt.hash(u.password, 10);
    await db.insert(accounts).values({
      name: u.name,
      email: u.email,
      passwordHash,
      role: u.role,
      isActive: true,
    }).onConflictDoNothing({ target: accounts.email });
  }
  console.log('Seeded accounts.');
}

async function seedSpecies() {
  const result = await db.select({ count: sql<number>`count(*)` }).from(species);
  if (result[0].count > 0) {
    console.log('Species table not empty, skipping.');
    return;
  }

  const entries = CORRECTED_SPECIES.map((s) => ({
    commonName: s.commonName,
    scientificName: s.scientificName,
    family: s.family,
    order: 'Lepidoptera',
    slug: slugify(s.scientificName),
    isPublished: true,
    iucnStatus: 'Least Concern',
  }));

  await db.insert(species).values(entries);
  console.log(`Seeded ${entries.length} species.`);
}

async function main() {
  await seedAccounts();
  await seedPages();
  await seedSpecies();
  console.log('Supabase seed complete.');
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
