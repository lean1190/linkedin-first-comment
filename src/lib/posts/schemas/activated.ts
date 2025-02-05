import type { LiteralZodEventSchema } from 'inngest';
import { z } from 'zod';

import { PostEvent } from '../events';
import { authorSchema } from './author';
import { activatePostSchema } from './post';

export const postActivatedEvent = z.object({
  name: z.literal(PostEvent.Activated),
  data: z.object({
    post: activatePostSchema,
    author: authorSchema
  })
}) satisfies LiteralZodEventSchema;
