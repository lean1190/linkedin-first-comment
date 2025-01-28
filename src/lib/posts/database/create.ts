'use server';

import { handleDatabaseResponse } from '@/lib/supabase/response-handler';
import { createClient } from '@/lib/supabase/server';
import type { z } from 'zod';
import type { postSchema } from '../events/post';

export async function createPost({
  authorId,
  post
}: {
  authorId: string;
  post: z.infer<typeof postSchema>;
}) {
  const result = await (await createClient())
    .from('Posts')
    .insert({
      author: authorId,
      content: post.content,
      comment: post.comment,
      post_at_utc: post.scheduleUtc,
      repost_at_utc: post.reshareScheduleUtc,
      status: post.status
    })
    .select();

  return handleDatabaseResponse(result);
}
