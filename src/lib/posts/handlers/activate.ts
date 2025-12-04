import { UTCDate } from '@date-fns/utc';
import { NonRetriableError, RetryAfterError } from 'inngest';
import { publishLinkedInFirstComment, publishLinkedInPost } from '@/lib/linkedin/posts/write';
import { inngest } from '../../inngest/client';
import { updatePost } from '../database/update';
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

        await updatePost({
          authorId: event.data.author.id,
          post: {
            id: event.data.post.id,
            status: 'posted',
            post_at_utc: new UTCDate().toISOString(),
            repost_at_utc: null
          }
        });

        return response;
      } catch (error) {
        console.error('step:publish-post error', error);
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

    await step.run('publish-first-comment', async () => {
      try {
        await publishLinkedInFirstComment({
          comment: event.data.post.comment ?? '',
          token: event.data.author.token,
          authorUrn: event.data.author.urn,
          postUrn
        });

        await updatePost({
          authorId: event.data.author.id,
          post: { id: event.data.post.id as string, urn: postUrn }
        });
      } catch (error) {
        console.error('step:publish-first-comment error', error);
        throw error;
      }
    });
  }
);
