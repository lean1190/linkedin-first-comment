import { type LiteralZodEventSchema } from 'inngest';
import { z } from 'zod';

import { PostEvent } from './types';

const postScheduledEvent = z.object({
    name: z.literal(PostEvent.Scheduled),
    data: z.object({
        author: z.object({
            // urn: z.string(),
            // token: z.string()
        }),
        post: z.object({
            content: z.string(),
            scheduleUtc: z.string().datetime(),
            repostScheduleUtc: z.string().datetime().optional()
        }),
        comment: z.object({
            content: z.string()
        })
    })
}) satisfies LiteralZodEventSchema;

export { postScheduledEvent };
