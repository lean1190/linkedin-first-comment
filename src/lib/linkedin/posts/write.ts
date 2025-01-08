import ky, { ResponsePromise } from 'ky';
import { z } from 'zod';

import { postScheduledEvent } from '@/lib/posts/events/schedule';

import { linkedInHeaders } from '../headers';

type Post = z.infer<typeof postScheduledEvent>['data']['post'];

export async function writeLinkedInPost({ post, token, urn }: {
    post: Post,
    token: string,
    urn: string
}) {
    console.log('---> writing...', { post, token, urn });

    return ky.post('https://api.linkedin.com/rest/posts', {
        headers: linkedInHeaders(token ?? ''),
        credentials: 'include',
        json: {
            author: urn,
            commentary: post.content,
            visibility: 'PUBLIC',
            distribution: {
                feedDistribution: 'MAIN_FEED',
                targetEntities: [],
                thirdPartyDistributionChannels: []
            },
            lifecycleState: 'PUBLISHED',
            isReshareDisabledByAuthor: false
        }
    }).json() as ResponsePromise<void>;
}
