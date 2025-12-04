import type { z } from 'zod';
import type { WithRequired } from '@/lib/types';
import type { formSchema } from './schemas';

export type ContainerViewport = 'mobile' | 'desktop';
export type FormDraftPost = WithRequired<Partial<z.infer<typeof formSchema>>, 'id' | 'content'>;
