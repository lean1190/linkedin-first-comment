'use server';

import { actionClient } from '@/lib/server-actions/client';

import { flattenValidationErrors } from 'next-safe-action';
import { createOrUpdatePost } from '../database/create';
import { draftPostSchema } from '../events/post';
import { validate } from './validation';

export const createOrUpdateDraftAction = actionClient
  .schema(draftPostSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: post }) => {
    const {
      author: { id }
    } = await validate();

    return createOrUpdatePost({
      authorId: id,
      post,
      status: 'draft'
    });
  });
