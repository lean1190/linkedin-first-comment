import { z } from 'zod';

export const formSchema = z
  .object({
    content: z.string().nonempty(),
    schedule: z.string().nonempty(),
    reshare: z.string().optional(),
    comment: z.string().nonempty()
  })
  .required();
