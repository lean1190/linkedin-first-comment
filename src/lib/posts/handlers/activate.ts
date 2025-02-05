import { NonRetriableError, RetryAfterError } from 'inngest';

import { publishLinkedInFirstComment, publishLinkedInPost } from '@/lib/linkedin/posts/write';

import { inngest } from '../../inngest/client';
import { updatePostStatus } from '../database/update';
import { PostEvent } from '../events';

export const activatePostEventHandler = inngest.createFunction(
  { id: 'activate-post' },
  { event: PostEvent.Activated },
  async ({ event, step }) => {
    const postResponse = await step.run('publish-post', async () => {
      try {
        const response = await publishLinkedInPost({
          post: event.data.post,
          token: event.data.author.token,
          authorUrn: event.data.author.urn
        });

        await updatePostStatus({
          authorId: event.data.author.id,
          post: { id: event.data.post.id, status: 'posted' }
        });

        return response;
      } catch (error) {
        console.error('step:activate-post error', error);
        throw new RetryAfterError('Writing post failed, retrying in 1 minute', 60000);
      }
    });

    const postUrn = postResponse?.postUrn;
    if (!postUrn) {
      throw new NonRetriableError(
        'The scheduled post was created but its URN could not be retrieved'
      );
    }

    if (!event.data.post.comment) {
      throw new NonRetriableError('There is no comment');
    }

    await step.run('activate-first-comment', async () => {
      try {
        await publishLinkedInFirstComment({
          comment: event.data.post.comment ?? '',
          token: event.data.author.token,
          authorUrn: event.data.author.urn,
          postUrn
        });
      } catch (error) {
        console.error('step:activate-first-comment error', error);
        throw error;
      }
    });
  }
);
