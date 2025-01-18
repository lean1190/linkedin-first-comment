'use server';

import { getServerSession, getServerUser } from '@/lib/auth/session/server';
import { inngest } from '@/lib/inngest/client';
import { getEventUser } from '@/lib/inngest/user';
import { getLinkedInAuthorUrn } from '@/lib/linkedin/urn';
import { extractLinkedInAccessToken, extractLinkedInId } from '@/lib/linkedin/user/extract';
import { actionClient } from '@/lib/server-actions/client';

import { checkUnauthorized } from '@/lib/auth/errors/unauthorized';
import { flattenValidationErrors } from 'next-safe-action';
import { postSchema } from '../events/schedule';
import { PostEvent } from '../events/types';

export const schedulePost = actionClient
  .schema(postSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: post }) => {
    const user = await getServerUser();
    const session = await getServerSession();
    const unauthorized = checkUnauthorized({ user, session });

    if (unauthorized) {
      throw unauthorized;
    }

    const urn = getLinkedInAuthorUrn(extractLinkedInId(user)) as string;

    if (!urn) {
      throw Error('The author urn could not be retrieved');
    }

    await inngest.send({
      name: PostEvent.Scheduled,
      data: {
        post,
        author: { urn, token: extractLinkedInAccessToken(session) as string }
      },
      user: await getEventUser(user)
    });
  });
