'use server';

import { actionClient } from '@/lib/server-actions/client';
import { hasId } from '@/lib/supabase/id';
import { flattenValidationErrors, returnValidationErrors } from 'next-safe-action';
import { updatePost } from '../database/update';
import { postSchema } from '../schemas/post';
import { validateSession } from './validation';

export const updatePostAction = actionClient
  .schema(postSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: post }) => {
    const {
      author: { id }
    } = await validateSession();

    if (!hasId(post)) {
      returnValidationErrors(postSchema, { id: { _errors: ['Id is required'] } });
    }

    return updatePost({ authorId: id, post });
  });
