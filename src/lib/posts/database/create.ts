'use server';

import { createClient } from '@/lib/supabase/server';
import type { Tables } from '@/lib/supabase/types';
import type { z } from 'zod';
import type { draftPostSchema, postSchema } from '../events/post';

type ConditionalPost<Status extends Tables<'Posts'>['status']> = Status extends 'draft'
  ? z.infer<typeof draftPostSchema>
  : z.infer<typeof postSchema>;

export async function createOrUpdatePost<Status extends Tables<'Posts'>['status']>({
  authorId,
  post,
  status
}: {
  authorId: string;
  post: ConditionalPost<Status>;
  status: Status;
}) {
  const { data, error } = await (await createClient())
    .from('Posts')
    .upsert({
      author: authorId,
      content: post.content,
      comment: post.comment ?? null,
      post_at_utc: post.scheduleUtc ?? null,
      repost_at_utc: post.reshareScheduleUtc ?? null,
      status
    })
    .select();

  if (error) {
    throw error;
  }

  return data;
}
