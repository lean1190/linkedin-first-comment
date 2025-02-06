'use server';

import { NavLink } from '@/app/p/components/nav/items';
import { inngest } from '@/lib/inngest/client';
import { getEventUser } from '@/lib/inngest/user';
import { extractLinkedInAccessToken } from '@/lib/linkedin/user/extract';
import { actionClient } from '@/lib/server-actions/client';
import { createServerActionError } from '@/lib/server-actions/errors';
import { flattenValidationErrors } from 'next-safe-action';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { findPostById } from '../database/find';
import { updatePost } from '../database/update';
import { PostEvent } from '../events';
import { isReadyPost } from '../validations';
import { validateSession } from './validation';

export const postNowAction = actionClient
  .schema(z.string(), {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: postId }) => {
    const {
      user,
      session,
      author: { id, urn }
    } = await validateSession();

    const post = await findPostById(postId);

    if (!isReadyPost(post)) {
      throw createServerActionError({
        type: 'IncompletePost',
        message: 'The post misses required properties'
      });
    }

    await inngest.send({
      name: PostEvent.Activated,
      user: await getEventUser(user),
      data: {
        post,
        author: { id, urn, token: extractLinkedInAccessToken(session) as string }
      }
    });

    await updatePost({
      authorId: id,
      post: { id: postId, status: 'posted' }
    });

    revalidatePath(NavLink.Posts);
  });
