import { z } from 'zod';

export const authorSchema = z.object({
  urn: z.string(),
  token: z.string()
});
