import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    // Use DIRECT_URL for migrations; fall back to DATABASE_URL for compatibility.
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL!,
  },
});
