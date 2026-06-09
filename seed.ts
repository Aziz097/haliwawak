import { db } from './src/db';
import { accounts } from './src/db/schema';
import bcrypt from 'bcryptjs';

async function main() {
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
    console.log(`User ${u.email} created.`);
  }
  console.log('Seed complete!');
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
