import { z } from 'zod';

export const postSchema = z.object({
  content: z.string(),
  scheduleUtc: z.string().datetime(),
  reshareScheduleUtc: z.string().datetime().optional(),
  comment: z.string()
});
