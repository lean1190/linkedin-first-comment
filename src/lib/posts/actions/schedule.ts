'use server';

import { inngest } from '@/lib/inngest/client';
import { getEventUser } from '@/lib/inngest/user';
import { extractLinkedInAccessToken } from '@/lib/linkedin/user/extract';
import { actionClient } from '@/lib/server-actions/client';
import { flattenValidationErrors } from 'next-safe-action';
import { createOrUpdatePost } from '../database/create';
import { postSchema } from '../events/post';
import { PostEvent } from '../events/types';
import { validate } from './validation';

export const schedulePostAction = actionClient
  .schema(postSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: post }) => {
    const {
      user,
      author: { urn, id },
      session
    } = await validate();

    await createOrUpdatePost({ authorId: id, post, status: 'draft' });

    await inngest.send({
      name: PostEvent.Scheduled,
      user: await getEventUser(user),
      data: {
        post,
        author: { id, urn, token: extractLinkedInAccessToken(session) as string }
      }
    });
  });
