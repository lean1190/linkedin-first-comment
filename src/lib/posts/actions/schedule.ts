'use server';

import { NavLink } from '@/app/p/components/nav/items';
import { inngest } from '@/lib/inngest/client';
import { getEventUser } from '@/lib/inngest/user';
import { extractLinkedInAccessToken } from '@/lib/linkedin/user/extract';
import { actionClient } from '@/lib/server-actions/client';
import { hasId } from '@/lib/supabase/id';
import { flattenValidationErrors, returnValidationErrors } from 'next-safe-action';
import { revalidatePath } from 'next/cache';
import { updatePost } from '../database/update';
import { PostEvent } from '../events';
import { postSchema } from '../schemas/post';
import { validateSession } from './validation';

export const schedulePostAction = actionClient
  .schema(postSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: post }) => {
    const {
      user,
      author: { urn, id },
      session
    } = await validateSession();

    if (!hasId(post)) {
      returnValidationErrors(postSchema, { id: { _errors: ['Id is required'] } });
    }

    await inngest.send({
      name: PostEvent.Scheduled,
      user: await getEventUser(user),
      data: {
        post,
        author: { id, urn, token: extractLinkedInAccessToken(session) as string }
      }
    });

    await updatePost({
      authorId: id,
      post: { ...post, status: 'scheduled' }
    });

    revalidatePath(NavLink.Platform);
  });
