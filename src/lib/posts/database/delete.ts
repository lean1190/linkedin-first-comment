'use server';

import { handleDatabaseResponse } from '@/lib/supabase/response-handler';
import { createClient } from '@/lib/supabase/server';

export async function deletePost({
  authorId,
  postId
}: {
  authorId: string;
  postId: string;
}) {
  const result = await (await createClient())
    .from('Posts')
    .delete()
    .eq('author', authorId)
    .eq('id', postId);

  return handleDatabaseResponse(result);
}
