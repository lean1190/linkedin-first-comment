import ky from 'ky';
import { z } from 'zod';

import { postScheduledEvent } from '@/lib/posts/events/schedule';

import { linkedInHeaders } from '../headers';

type Post = z.infer<typeof postScheduledEvent>['data']['post'];

export async function writeLinkedInPost({ post, token, authorUrn }: {
    post: Post,
    token: string,
    authorUrn: string
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
    }).json();
}

export async function writeLinkedInFirstComment({
    comment,
    token,
    postUrn,
    authorUrn
}: {
    comment: string,
    token: string,
    postUrn: string,
    authorUrn: string
}) {
    return ky.post(`https://api.linkedin.com/v2/socialActions/${encodeURIComponent(postUrn)}/comments`, {
        headers: linkedInHeaders(token ?? ''),
        credentials: 'include',
        json: {
            actor: authorUrn,
            message: { text: comment }
        }
    });
}

export function reshareLinkedInPost({
    token,
    postUrn,
    authorUrn
}: {
    token: string,
    postUrn: string,
    authorUrn: string
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
