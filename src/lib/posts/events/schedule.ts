import type { LiteralZodEventSchema } from 'inngest';
import { z } from 'zod';

import { authorSchema } from './author';
import { postSchema } from './post';
import { PostEvent } from './types';

const postScheduledEvent = z.object({
  name: z.literal(PostEvent.Scheduled),
  data: z.object({
    post: postSchema,
    author: authorSchema
  })
}) satisfies LiteralZodEventSchema;

export { postScheduledEvent, postSchema };
