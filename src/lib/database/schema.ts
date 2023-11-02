import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey().notNull(),
  content: text('content'),
  userId: text('user_id').references(() => user.id),
});

export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  username: text('username').unique().notNull(),
});

export const session = sqliteTable('user_session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  activeExpires: blob('active_expires', {
    mode: 'bigint',
  }).notNull(),
  idleExpires: blob('idle_expires', {
    mode: 'bigint',
  }).notNull(),
});

export const key = sqliteTable('user_key', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  hashedPassword: text('hashed_password'),
});
