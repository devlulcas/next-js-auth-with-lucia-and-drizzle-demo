import { betterSqlite3 } from '@lucia-auth/adapter-sqlite';
import { lucia } from 'lucia';
import { nextjs_future } from 'lucia/middleware';
import { sqliteDatabase } from '../database/db';

export const auth = lucia({
  env: process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV',
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  adapter: betterSqlite3(sqliteDatabase, {
    user: 'user', // import { user } from '../database/schema' -> user._.name
    key: 'user_key', // import { key } from '../database/schema' -> key._.name
    session: 'user_session', // import { name } from '../database/schema' -> session._.name
  }),
  getUserAttributes: (data) => {
    return {
      username: data.username,
    };
  },
});

export type Auth = typeof auth;
