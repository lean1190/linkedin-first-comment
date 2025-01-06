'use server';

import { getServerSession, getServerUser } from '@/lib/auth/session/server';
import { inngest } from '@/lib/inngest/client';
import { getEventUser } from '@/lib/inngest/user';
import { extractLinkedInAccessToken, extractLinkedInId, getLinkedInUrn } from '@/lib/linkedin/user/extract';
import { actionClient } from '@/lib/safe-action/client';

import { postScheduledEvent } from '../events/schedule';
import { PostEvent } from '../events/types';

export const schedulePost = actionClient
    .schema(postScheduledEvent)
    .action(async ({ parsedInput: { data: { post, comment } } }) => {
        try {
            const user = await getServerUser();
            const urn = getLinkedInUrn(await extractLinkedInId(user));
            const token = await extractLinkedInAccessToken(await getServerSession());

            console.log('---> urn', { urn, token, post, comment });

            await inngest.send({
                name: PostEvent.Scheduled,
                data: { post, comment },
                user: await getEventUser(user)
            });
            console.warn('---> result');
        } catch (error) {
            console.error('---> error', error);
        }
    });
