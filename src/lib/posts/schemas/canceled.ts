import { z } from 'zod';

import { authorIdSchema } from './author';
import { postIdSchema } from './post';

export const postCanceledEvent = z.object({
  post: postIdSchema,
  author: authorIdSchema
});
