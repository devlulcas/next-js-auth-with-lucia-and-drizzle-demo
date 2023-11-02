import sqlite from 'better-sqlite3';
import { BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3';

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite://:memory:';

export const sqliteDatabase = sqlite(DATABASE_URL);

export const db: BetterSQLite3Database = drizzle(sqliteDatabase);
