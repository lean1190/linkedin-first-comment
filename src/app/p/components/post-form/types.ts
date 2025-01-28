import type { WithRequired } from '@/lib/types';
import type { z } from 'zod';
import type { formSchema } from './schemas';

export type FormViewport = 'mobile' | 'desktop';
export type FormDraftPost = WithRequired<Partial<z.infer<typeof formSchema>>, 'id' | 'content'>;
