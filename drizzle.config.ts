import { config } from 'dotenv';
import type { Config } from 'drizzle-kit';

config({
  path:
    process.env.NODE_ENV === 'production' ? '.env.local' : '.env.development',
});

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

export default {
  schema: './src/lib/database/schema.ts',
  out: './drizzle',
  driver: 'better-sqlite',
  dbCredentials: {
    url: DATABASE_URL,
  },
} satisfies Config;
