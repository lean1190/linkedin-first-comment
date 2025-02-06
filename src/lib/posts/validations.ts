import type { CompletedPost, Post, ReadyPost } from './database/types';

export function isReadyPost(post?: Post): post is ReadyPost {
  return !!post && !!post.content && !!post.comment && !!post.post_at_utc;
}

export function isCompletedPost(post?: Post): post is CompletedPost {
  return isReadyPost(post) && post.status !== 'draft';
}
