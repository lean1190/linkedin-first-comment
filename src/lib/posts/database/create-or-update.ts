'use server';

import { handleDatabaseResponse } from '@/lib/supabase/response-handler';
import { createClient } from '@/lib/supabase/server';
import { mapPostToUpdate } from './map';
import type { PostUpdate } from './types';

export async function createOrUpdatePost({
  authorId,
  post
}: {
  authorId: string;
  post: PostUpdate;
}) {
  const result = await (await createClient())
    .from('Posts')
    .upsert(
      {
        ...mapPostToUpdate(post),
        id: post.id,
        author: authorId
      },
      {
        onConflict: 'id',
        ignoreDuplicates: false
      }
    )
    .eq('author', authorId)
    .eq('id', post.id)
    .select();

  return handleDatabaseResponse(result);
}
