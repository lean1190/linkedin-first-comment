'use server';

import { handleDatabaseResponse } from '@/lib/supabase/response-handler';
import { createClient } from '@/lib/supabase/server';
import type { WithRequired } from '@/lib/types';
import type { PartialPost } from './types';

export async function updatePost({
  authorId,
  post
}: {
  authorId: string;
  post: WithRequired<PartialPost, 'id'>;
}) {
  const result = await (await createClient())
    .from('Posts')
    .update(post)
    .eq('author', authorId)
    .eq('id', post.id)
    .select();

  return handleDatabaseResponse(result);
}
