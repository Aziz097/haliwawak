import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const directUrl = process.env.DIRECT_URL ?? process.env.DATABASE_URL!;

const migrationClient = postgres(directUrl, {
  prepare: false,
  ssl: directUrl.includes('supabase') ? 'require' : false,
  max: 1,
});

export const migrationDb = drizzle(migrationClient);
