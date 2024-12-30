'use server'; // don't forget to add this!

import { z } from 'zod';

import { actionClient } from '@/lib/safe-action/client';

// This schema is used to validate input from client.
const schema = z.object({
    token: z.string(),
    urn: z.string()
});

export const scheduleComment = actionClient
    .schema(schema)
    .action(async ({ parsedInput: { token, urn } }) => {
        try {
            const result = await Promise.all([
                fetch(`https://api.linkedin.com/rest/posts?author=${urn}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'LinkedIn-Version': '202411',
                        'X-Restli-Protocol-Version': '2.0.0'
                    }
                }),
                fetch('https://api.linkedin.com/v2/me', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
            ]);
            console.log('---> result', result);
        } catch (error) {
            console.error('---> error', error);
        }
    });
