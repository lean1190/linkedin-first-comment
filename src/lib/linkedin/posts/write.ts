import ky from 'ky';
import type { z } from 'zod';

import type { postScheduledEvent } from '@/lib/posts/schemas/scheduled';

import { linkedInHeaders } from '../headers';

type Post = z.infer<typeof postScheduledEvent>['post'];

export async function publishLinkedInPost({
  post,
  token,
  authorUrn
}: {
  post: Pick<Post, 'content'>;
  token: string;
  authorUrn: string;
}) {
  return ky('https://api.linkedin.com/rest/posts', {
    method: 'post',
    headers: linkedInHeaders(token ?? ''),
    credentials: 'include',
    json: {
      author: authorUrn,
      commentary: post.content,
      visibility: 'PUBLIC',
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [],
        thirdPartyDistributionChannels: []
      },
      lifecycleState: 'PUBLISHED',
      isReshareDisabledByAuthor: false
    },
    hooks: {
      afterResponse: [
        (_request, _options, hookresponse) => {
          if (hookresponse.ok) {
            const postUrn = hookresponse.headers.get('x-restli-id');

            return Response.json({ postUrn }, { status: 200, statusText: 'Created' });
          }
        }
      ]
    }
  }).json() as Promise<{ postUrn: string }>;
}

export async function publishLinkedInFirstComment({
  comment,
  token,
  postUrn,
  authorUrn
}: {
  comment: string;
  token: string;
  postUrn: string;
  authorUrn: string;
}) {
  return fetch(
    `https://api.linkedin.com/v2/socialActions/${encodeURIComponent(postUrn)}/comments`,
    {
      method: 'POST',
      body: JSON.stringify({
        actor: authorUrn,
        object: postUrn,
        message: { text: comment },
        content: []
      }),
      headers: linkedInHeaders(token ?? '')
    }
  );
}

export function reshareLinkedInPost({
  token,
  postUrn,
  authorUrn
}: {
  token: string;
  postUrn: string;
  authorUrn: string;
}) {
  return ky.post('https://api.linkedin.com/rest/posts', {
    headers: linkedInHeaders(token ?? ''),
    credentials: 'include',
    json: {
      author: authorUrn,
      commentary: '',
      visibility: 'PUBLIC',
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [],
        thirdPartyDistributionChannels: []
      },
      lifecycleState: 'PUBLISHED',
      isReshareDisabledByAuthor: false,
      reshareContext: {
        parent: postUrn
      }
    }
  });
}
