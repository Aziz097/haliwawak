import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;

const client = postgres(connectionString, {
  prepare: false,
  ssl: connectionString.includes('supabase') ? 'require' : false,
  max: 10,
});

export const db = drizzle(client);
