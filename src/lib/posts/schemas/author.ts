import { z } from 'zod';

export const authorSchema = z.object({
  id: z.string(),
  urn: z.string(),
  token: z.string()
});

export const authorIdSchema = z.object({
  id: z.string()
});
