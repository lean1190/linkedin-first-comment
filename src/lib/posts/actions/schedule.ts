'use server';

import { inngest } from '@/lib/inngest/client';
import { getEventUser } from '@/lib/inngest/user';
import { actionClient } from '@/lib/safe-action/client';

import { postScheduledEvent } from '../events/schedule';
import { PostEvents } from '../events/types';

export const schedulePost = actionClient
    .schema(postScheduledEvent)
    .action(async ({ parsedInput: { data: { author, post, comment } } }) => {
        try {
            await inngest.send({
                name: PostEvents.Scheduled,
                data: { author, post, comment },
                user: getEventUser()
            });
            console.warn('---> result');
        } catch (error) {
            console.error('---> error', error);
        }
    });
