import { RetryAfterError } from 'inngest';

import { inngest } from '../../inngest/client';
import { PostEvent } from '../events/types';

export const writePost = inngest.createFunction(
    { id: 'write-post' },
    { event: PostEvent.Scheduled },
    async ({ event, step }) => {
    // You can also sleep until a timestamp within the event data.
    // This lets you pass in a time for you to run the job:
        await step.sleepUntil('wait-for-post', event.data.post.scheduleUtc);

        await step.run('write-comment', async () => {
            // This runs at the specified time.

            // Write post to linkedin

            // If failed to write the comment
            const success = false;
            if (!success) {
                throw new RetryAfterError('Writing comment failed, retrying in 1 minute', 60000);
            }
        });
    },
);
