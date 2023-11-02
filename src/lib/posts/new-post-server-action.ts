'use server';

import { revalidatePath } from 'next/cache';
import { handleActionAuthRequest } from '../auth/handle-auth-request';
import { db } from '../database/db';
import { posts } from '../database/schema';

export async function newPostServerAction(formData: FormData) {
  const authRequest = handleActionAuthRequest();

  const session = await authRequest.validate();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const content = formData.get('content');

  if (typeof content !== 'string') {
    throw new Error('Content is required');
  }

  await db
    .insert(posts)
    .values({
      content: content || 'empty content',
      userId: session.userId,
    })
    .execute();

  revalidatePath('/');
}
