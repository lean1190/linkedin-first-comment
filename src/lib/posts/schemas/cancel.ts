import type { LiteralZodEventSchema } from 'inngest';
import { z } from 'zod';

import { PostEvent } from '../events';
import { postCanceledAuthorSchema } from './author';
import { postCanceledSchema } from './post';

export const postCanceledEvent = z.object({
  name: z.literal(PostEvent.Canceled),
  data: z.object({
    post: postCanceledSchema,
    author: postCanceledAuthorSchema
  })
}) satisfies LiteralZodEventSchema;
