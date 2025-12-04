import type { z } from 'zod';
import type { WithRequired } from '@/lib/types';
import type { postSchema } from '../schemas/post';

function isValueOrNull<T>(value: T) {
  return !!value || value === null;
}

export function mapFormPostToDatabase(
  post: WithRequired<Partial<z.infer<typeof postSchema>>, 'id' | 'content'>
) {
  return {
    id: post.id,
    content: post.content,
    ...(isValueOrNull(post.comment) ? { comment: post.comment } : {}),
    ...(isValueOrNull(post.scheduleUtc) ? { post_at_utc: post.scheduleUtc } : {}),
    ...(isValueOrNull(post.reshareScheduleUtc) ? { repost_at_utc: post.reshareScheduleUtc } : {}),
    ...(isValueOrNull(post.status) ? { status: post.status } : {}),
    ...(isValueOrNull(post.urn) ? { urn: post.urn } : {})
  };
}
