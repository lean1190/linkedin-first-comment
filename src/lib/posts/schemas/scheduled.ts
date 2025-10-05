import { z } from 'zod';

import { authorSchema } from './author';
import { postSchema } from './post';

export const postScheduledEvent = z.object({
  post: postSchema,
  author: authorSchema
});
