'use server';

import { actionClient } from '@/lib/server-actions/client';

import { ServerActionError } from '@/lib/server-actions/errors';
import { hasId } from '@/lib/supabase/id';
import { flattenValidationErrors } from 'next-safe-action';
import { updatePost } from '../database/update';
import { postSchema } from '../events/post';
import { validate } from './validation';

export const updatePostAction = actionClient
  .schema(postSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: post }) => {
    const {
      author: { id }
    } = await validate();

    if (!hasId(post)) {
      throw new ServerActionError('Post Id is not set', 'IdMissing');
    }

    return updatePost({ authorId: id, post });
  });
