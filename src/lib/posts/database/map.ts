import type { PostUpdate } from './types';

export function mapPostToUpdate(post: PostUpdate) {
  return {
    content: post.content,
    ...(post.comment ? { comment: post.comment } : {}),
    ...(post.scheduleUtc ? { post_at_utc: post.scheduleUtc } : {}),
    ...(post.reshareScheduleUtc ? { repost_at_utc: post.reshareScheduleUtc } : {}),
    ...(post.status ? { status: post.status } : {})
  };
}
