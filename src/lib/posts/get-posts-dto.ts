import { db } from '@/lib/database/db';
import { posts } from '@/lib/database/schema';

export function getPostsDto() {
  const results = db.select().from(posts).all();

  return results.map((result) => ({
    id: result.id,
    content: result.content,
  }));
}
