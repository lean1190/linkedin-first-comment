import { RetryAfterError } from 'inngest';

import { inngest } from '../client';

export const writeComment = inngest.createFunction(
    { id: 'write-comment' },
    { event: 'app/comment.triggered' },
    async ({ event, step }) => {
    // You can also sleep until a timestamp within the event data.
    // This lets you pass in a time for you to run the job:
        await step.sleepUntil('wait-for-post', event.data.runAt); // Assuming event.data.run_at is a timestamp.

        await step.run('write-comment', async () => {
            // This runs at the specified time.

            // Write post to linkedin
            console.log('---> Writing LinkedIn comment');
            // If failed to write the comment
            const success = false;
            if (!success) {
                throw new RetryAfterError('Writing comment failed, retrying in 1 minute', 60000);
            }
        });
    },
);
