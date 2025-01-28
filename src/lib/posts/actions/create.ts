'use server';

import { actionClient } from '@/lib/server-actions/client';

import { flattenValidationErrors } from 'next-safe-action';
import { createPost } from '../database/create';
import { postSchema } from '../schemas/post';
import { validateSession } from './validation';

export const createPostAction = actionClient
  .schema(postSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: post }) => {
    const {
      author: { id }
    } = await validateSession();

    return createPost({ authorId: id, post });
  });
