import type { Tables } from '@/lib/supabase/types';
import type { WithRequired } from '@/lib/types';

export type Post = Tables<'Posts'>;
export type PartialPost = Partial<Post>;
export type PostDetail = WithRequired<PartialPost, 'id' | 'content' | 'status'>;
export type PostWithId = WithRequired<PartialPost, 'id'>;
export type PostUpdate = WithRequired<PartialPost, 'id' | 'content'>;

export interface ReadyPost extends Post {
  content: string;
  comment: string;
  post_at_utc: string;
}
export interface DraftPost extends Post {
  id: string;
  content: string;
  status: 'draft';
}
