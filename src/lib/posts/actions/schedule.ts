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
    .action(async ({ parsedInput: { data: { author, post, comment } } }) => {
        try {
            const user = await getServerUser();
            const session = await getServerSession();
            const urn = getLinkedInUrn(await extractLinkedInId(user));
            const token = extractLinkedInAccessToken(session);

            console.log('---> urn', urn, token);

            await inngest.send({
                name: PostEvent.Scheduled,
                data: { author, post, comment },
                user: getEventUser()
            });
            console.warn('---> result');
        } catch (error) {
            console.error('---> error', error);
        }
    });
