'use server';

import { getServerSession, getServerUser } from '@/lib/auth/session/server';
import { inngest } from '@/lib/inngest/client';
import { getEventUser } from '@/lib/inngest/user';
import { extractLinkedInAccessToken, extractLinkedInId, getLinkedInUrn } from '@/lib/linkedin/user/extract';
import { actionClient } from '@/lib/safe-action/client';

import { postSchema } from '../events/schedule';
import { PostEvent } from '../events/types';

export const schedulePost = actionClient
    .schema(postSchema)
    .action(async ({ parsedInput: post }) => {
        try {
            const user = await getServerUser();
            const author = {
                urn: getLinkedInUrn(await extractLinkedInId(user)) as string,
                token: await extractLinkedInAccessToken(await getServerSession()) as string
            };

            if (!author.urn || !author.token) {
                throw Error('Authentication failed');
            }

            console.log('---> sending event');
            await inngest.send({
                name: PostEvent.Scheduled,
                data: { post, author },
                user: await getEventUser(user)
            });
            console.warn('---> result');
        } catch (error) {
            console.error('---> error', error);
        }
    });
