'use server';

import ky from 'ky';
import { redirect } from 'next/navigation';

import { NullableSession } from '@/lib/auth/session/types';

import { extractLinkedInProfileImage } from './extract';
import { Me } from './types';

const linkedInHeaders = (token: string) => ({
    Authorization: `Bearer ${token}`,
    Accept: '*/*',
    'Content-Type': 'application/json',
    'LinkedIn-Version': '202411',
    'X-Restli-Protocol-Version': '2.0.0',
    'Access-Control-Allow-Origin': '*'
});

export async function getLinkedInMe(session: NullableSession) {
    const token = session?.provider_token;

    return ky.get('https://api.linkedin.com/v2/me', {
        headers: linkedInHeaders(token ?? ''),
        credentials: 'include'
    }).json() as Promise<Me>;
}

export async function getLinkedInBasicProfile(session: NullableSession) {
    try {
        const me = await getLinkedInMe(session);

        return {
            name: `${me.localizedFirstName} ${me.localizedLastName}`,
            headline: me.localizedHeadline,
            image: await extractLinkedInProfileImage(session)
        };
    } catch (error: unknown) {
        if ((error as Error)?.message.includes('401 Unauthorized')) {
            redirect('/');
        }

        return {
            name: 'Error',
            headline: 'Error',
            image: 'http://error'
        };
    }
}
