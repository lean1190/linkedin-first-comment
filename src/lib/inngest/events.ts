import { type LiteralZodEventSchema } from "inngest";
import { z } from "zod";

const postScheduledEvent = z.object({
  name: z.literal("app/post.scheduled"),
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
}),
}) satisfies LiteralZodEventSchema;

export { postScheduledEvent };
