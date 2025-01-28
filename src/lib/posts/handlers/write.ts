import { NonRetriableError, RetryAfterError } from 'inngest';

import {
  reshareLinkedInPost,
  writeLinkedInFirstComment,
  writeLinkedInPost
} from '@/lib/linkedin/posts/write';

import { inngest } from '../../inngest/client';
import { PostEvent } from '../events';

export const writePostEventHandler = inngest.createFunction(
  { id: 'write-post', retries: 3 },
  { event: PostEvent.Scheduled },
  async ({ event, step }) => {
    if (!event.data.post.scheduleUtc) {
      throw new NonRetriableError('There is no schedule');
    }

    await step.sleepUntil('wait-for-post-schedule', event.data.post.scheduleUtc);

    const postResponse = await step.run('write-post', async () => {
      try {
        return writeLinkedInPost({
          post: event.data.post,
          token: event.data.author.token,
          authorUrn: event.data.author.urn
        });
      } catch (error) {
        console.error('step:write-post error', error);
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

    await step.run('write-first-comment', async () => {
      try {
        await writeLinkedInFirstComment({
          comment: event.data.post.comment ?? '',
          token: event.data.author.token,
          authorUrn: event.data.author.urn,
          postUrn
        });
      } catch (error) {
        console.error('step:write-first-comment error', error);
        throw error;
      }
    });

    if (!event.data.post.reshareScheduleUtc) {
      return;
    }

    await step.sleepUntil('wait-for-post-reshare', event.data.post.reshareScheduleUtc);

    await step.run('reshare-post', async () => {
      try {
        await reshareLinkedInPost({
          token: event.data.author.token,
          authorUrn: event.data.author.urn,
          postUrn
        });
      } catch (error) {
        console.error('step:reshare-post error', error);
        throw error;
      }
    });
  }
);
