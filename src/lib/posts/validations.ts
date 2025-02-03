import type { Tables } from '../supabase/types';
import type { CompletePost } from './database/types';

export function isCompletePost(post?: Tables<'Posts'>): post is CompletePost {
  return (
    !!post && !!post.content && !!post.comment && !!post.post_at_utc && post.status !== 'draft'
  );
}
