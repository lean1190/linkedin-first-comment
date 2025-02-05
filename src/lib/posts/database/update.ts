'use server';

import { handleDatabaseResponse } from '@/lib/supabase/response-handler';
import { createClient } from '@/lib/supabase/server';
import type { WithRequired } from '@/lib/types';
import type { z } from 'zod';
import type { postSchema } from '../schemas/post';
import { mapPostToUpdate } from './map';

export async function updatePost({
  authorId,
  post
}: {
  authorId: string;
  post: WithRequired<Partial<z.infer<typeof postSchema>>, 'id' | 'content'>;
}) {
  const result = await (await createClient())
    .from('Posts')
    .update(mapPostToUpdate(post))
    .eq('author', authorId)
    .eq('id', post.id)
    .select();

  return handleDatabaseResponse(result);
}

export async function updatePostStatus({
  authorId,
  post
}: {
  authorId: string;
  post: WithRequired<Partial<z.infer<typeof postSchema>>, 'id' | 'status'>;
}) {
  const result = await (await createClient())
    .from('Posts')
    .update({ status: post.status })
    .eq('author', authorId)
    .eq('id', post.id)
    .select();

  return handleDatabaseResponse(result);
}
