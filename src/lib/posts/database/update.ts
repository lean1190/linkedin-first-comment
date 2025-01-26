'use server';

import { createClient } from '@/lib/supabase/server';
import type { WithRequired } from '@/lib/types';
import type { z } from 'zod';
import type { postSchema } from '../events/post';

export async function updatePost({
  authorId,
  post
}: {
  authorId: string;
  post: WithRequired<Partial<z.infer<typeof postSchema>>, 'id'>;
}) {
  const { data, error } = await (await createClient())
    .from('Posts')
    .update({
      ...(post.content ? { content: post.content } : {}),
      ...(post.comment ? { comment: post.comment } : {}),
      ...(post.scheduleUtc ? { post_at_utc: post.scheduleUtc } : {}),
      ...(post.reshareScheduleUtc ? { repost_at_utc_at_utc: post.reshareScheduleUtc } : {}),
      ...(post.status ? { status: post.status } : {})
    })
    .eq('author', authorId)
    .eq('id', post.id)
    .select();

  if (error) {
    throw error;
  }

  return data;
}
