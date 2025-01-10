'use server';

import { getServerSession, getServerUser } from '@/lib/auth/session/server';
import { inngest } from '@/lib/inngest/client';
import { getEventUser } from '@/lib/inngest/user';
import { getLinkedInAuthorUrn } from '@/lib/linkedin/urn';
import { extractLinkedInAccessToken, extractLinkedInId } from '@/lib/linkedin/user/extract';
import { actionClient } from '@/lib/safe-action/client';

import { postSchema } from '../events/schedule';
import { PostEvent } from '../events/types';

export const schedulePost = actionClient
    .schema(postSchema)
    .action(async ({ parsedInput: post }) => {
        const user = await getServerUser();
        const session = await getServerSession();
        const author = {
            urn: getLinkedInAuthorUrn(await extractLinkedInId(user)) as string,
            token: extractLinkedInAccessToken(session) as string
        };

        if (!author.urn || !author.token) {
            throw Error('Authentication failed');
        }

        await inngest.send({
            name: PostEvent.Scheduled,
            data: { post, author },
            user: await getEventUser(user)
        });
    });
