import { z } from 'zod';

import { authorSchema } from './author';
import { activatePostSchema } from './post';

export const postActivatedEvent = z.object({
  post: activatePostSchema,
  author: authorSchema
});
