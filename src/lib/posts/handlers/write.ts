import { RetryAfterError } from 'inngest';

import { writeLinkedInPost } from '@/lib/linkedin/posts/write';

import { inngest } from '../../inngest/client';
import { PostEvent } from '../events/types';

export const writePostEventHandler = inngest.createFunction(
    { id: 'write-post', retries: 5 },
    { event: PostEvent.Scheduled },
    async ({ event, step }) => {
        await step.sleepUntil('wait-for-post-schedule', event.data.post.scheduleUtc);

        await step.run('write-comment', async () => {
            // This runs at the specified time.
            try {
                console.log('---> write', {
                    post: event.data.post,
                    token: event.data.author.token,
                    urn: event.data.author.urn
                });
                // Write post to linkedin
                await writeLinkedInPost({
                    post: event.data.post,
                    token: event.data.author.token,
                    urn: event.data.author.urn
                });
            } catch (error) {
                console.error('---> event handler', error);
                throw new RetryAfterError('Writing comment failed, retrying in 1 minute', 60000);
            }
        });
    },
);
