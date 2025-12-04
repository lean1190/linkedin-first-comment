'use server';

import { flattenValidationErrors, returnValidationErrors } from 'next-safe-action';
import { actionClient } from '@/lib/server-actions/client';
import { hasId } from '@/lib/supabase/id';
import { createOrUpdatePost } from '../database/create-or-update';
import { postSchema } from '../schemas/post';
import { mapFormPostToDatabase } from './map';
import { validateSession } from './validation';

export const createOrUpdatePostAction = actionClient
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

    return createOrUpdatePost({
      authorId: id,
      post: mapFormPostToDatabase(post)
    });
  });
