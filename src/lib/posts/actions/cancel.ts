'use server';

import { revalidatePath } from 'next/cache';
import { flattenValidationErrors } from 'next-safe-action';
import { z } from 'zod';
import { NavLink } from '@/app/p/components/nav/items';
import { inngest } from '@/lib/inngest/client';
import { getEventUser } from '@/lib/inngest/user';
import { actionClient } from '@/lib/server-actions/client';
import { updatePost } from '../database/update';
import { PostEvent } from '../events';
import { validateSession } from './validation';

export const cancelPostAction = actionClient
  .schema(z.string(), {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: postId }) => {
    const {
      user,
      author: { id: authorId }
    } = await validateSession();

    await inngest.send({
      name: PostEvent.Canceled,
      user: await getEventUser(user),
      data: {
        post: { id: postId },
        author: { id: authorId }
      }
    });

    await updatePost({
      authorId,
      post: { id: postId, status: 'draft' }
    });

    revalidatePath(NavLink.Posts);
  });
