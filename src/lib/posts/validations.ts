import type { DraftPost, Post, ReadyPost } from './database/types';

export function isReadyPost(post?: Post): post is ReadyPost {
  return !!post && !!post.content && !!post.comment && !!post.post_at_utc;
}

export function isDraftPost(post?: Post): post is DraftPost {
  return !!post && post.status === 'draft' && !!post.id && !!post.content;
}
