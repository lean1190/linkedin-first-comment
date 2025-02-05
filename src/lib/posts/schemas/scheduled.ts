import type { LiteralZodEventSchema } from 'inngest';
import { z } from 'zod';

import { PostEvent } from '../events';
import { authorSchema } from './author';
import { postSchema } from './post';

export const postScheduledEvent = z.object({
  name: z.literal(PostEvent.Scheduled),
  data: z.object({
    post: postSchema,
    author: authorSchema
  })
}) satisfies LiteralZodEventSchema;
