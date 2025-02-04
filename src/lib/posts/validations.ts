import type { CompletePost, Post } from './database/types';

export function isCompletePost(post?: Post): post is CompletePost {
  return (
    !!post && !!post.content && !!post.comment && !!post.post_at_utc && post.status !== 'draft'
  );
}
