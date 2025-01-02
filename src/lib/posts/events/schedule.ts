import { type LiteralZodEventSchema } from 'inngest';
import { z } from 'zod';

import { PostEvents } from './types';

const postScheduledEvent = z.object({
    name: z.literal(PostEvents.Scheduled),
    data: z.object({
        author: z.object({
            urn: z.string(),
            token: z.string()
        }),
        post: z.object({
            content: z.string(),
            scheduleUtc: z.string().datetime()
        }),
        comment: z.object({
            content: z.string()
        })
    })
}) satisfies LiteralZodEventSchema;

export { postScheduledEvent };
