import { z } from 'zod';

export const postSchema = z.object({
  content: z.string(),
  scheduleUtc: z.string().datetime(),
  reshareScheduleUtc: z.string().datetime().optional(),
  comment: z.string()
});

export const draftPostSchema = z.object({
  content: z.string(),
  scheduleUtc: z.string().datetime().optional(),
  reshareScheduleUtc: z.string().datetime().optional(),
  comment: z.string().optional()
});
