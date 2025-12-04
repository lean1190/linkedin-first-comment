'use server';

import { revalidatePath } from 'next/cache';
import { flattenValidationErrors } from 'next-safe-action';
import { z } from 'zod';
import { NavLink } from '@/app/p/components/nav/items';
import { actionClient } from '@/lib/server-actions/client';
import { deletePost } from '../database/delete';
import { validateSession } from './validation';

export const deletePostAction = actionClient
  .schema(z.string(), {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: postId }) => {
    const {
      author: { id: authorId }
    } = await validateSession();

    await deletePost({ authorId, postId });

    revalidatePath(NavLink.Posts);
  });
