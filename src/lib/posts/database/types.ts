import type { Tables } from '@/lib/supabase/types';
import type { WithRequired } from '@/lib/types';
import type { z } from 'zod';
import type { postSchema } from '../events/post';

export type PostWithId = WithRequired<Partial<Tables<'Posts'>>, 'id'>;
export type PostUpdate = WithRequired<Partial<z.infer<typeof postSchema>>, 'id' | 'content'>;
