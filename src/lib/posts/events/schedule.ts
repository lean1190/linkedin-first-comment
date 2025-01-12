import type { LiteralZodEventSchema } from 'inngest';
import { z } from 'zod';

import { PostEvent } from './types';

const postSchema = z.object({
  content: z.string(),
  scheduleUtc: z.string().datetime(),
  reshareScheduleUtc: z.string().datetime().optional(),
  comment: z.string()
});

const authorSchema = z.object({
  urn: z.string(),
  token: z.string()
});

const postScheduledEvent = z.object({
  name: z.literal(PostEvent.Scheduled),
  data: z.object({
    post: postSchema,
    author: authorSchema
  })
}) satisfies LiteralZodEventSchema;

export { postScheduledEvent, postSchema };
