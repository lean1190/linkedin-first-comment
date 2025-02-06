import { z } from 'zod';

const postStatus = ['draft', 'scheduled', 'posted', 'reposted'] as const;

export const postSchema = z.object({
  id: z.string().optional(),
  content: z.string(),
  scheduleUtc: z.string().datetime().nullable(),
  reshareScheduleUtc: z.string().datetime().nullable(),
  comment: z.string().nullable(),
  urn: z.string().nullable(),
  status: z.enum(postStatus)
});

export const postIdSchema = z.object({
  id: z.string()
});

export const activatePostSchema = z.object({
  id: z.string(),
  content: z.string(),
  comment: z.string()
});
