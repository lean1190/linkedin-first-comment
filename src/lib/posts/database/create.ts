import type { z } from 'zod';
import type { postSchema } from '../events/post';

export async function createPost({
  post,
  authorId
}: {
  post: z.infer<typeof postSchema>;
  authorId: string;
}) {}
