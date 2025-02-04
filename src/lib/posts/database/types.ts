import type { Tables } from '@/lib/supabase/types';
import type { WithRequired } from '@/lib/types';
import type { z } from 'zod';
import type { postSchema } from '../schemas/post';

export type Post = Tables<'Posts'>;
export type PostDetail = WithRequired<
  Partial<Post>,
  'id' | 'content' | 'comment' | 'post_at_utc' | 'status'
> & {
  post_at_utc: string;
};
export type PostWithId = WithRequired<Partial<Post>, 'id'>;
export type PostUpdate = WithRequired<Partial<z.infer<typeof postSchema>>, 'id' | 'content'>;

export interface CompletePost extends Post {
  content: string;
  comment: string;
  post_at_utc: string;
}
