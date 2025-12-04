import type { z } from 'zod';
import type { postSchema } from '@/lib/posts/schemas/post';
import type { formSchema } from './post-form/schemas';

export type ScheduledPost = z.infer<typeof postSchema>;
export type FormPost = z.infer<typeof formSchema>;
