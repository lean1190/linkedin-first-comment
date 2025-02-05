import type { LiteralZodEventSchema } from 'inngest';
import { z } from 'zod';

import { PostEvent } from '../events';
import { authorIdSchema } from './author';
import { postIdSchema } from './post';

export const postCanceledEvent = z.object({
  name: z.literal(PostEvent.Canceled),
  data: z.object({
    post: postIdSchema,
    author: authorIdSchema
  })
}) satisfies LiteralZodEventSchema;
