'use server';

import ky from 'ky';

import { NullableSession, NullableUser } from '@/lib/auth/session/types';

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
        cache: 'force-cache',
        next: { revalidate: 360000 },
        headers: linkedInHeaders(token ?? ''),
        credentials: 'include'
    }).json() as Promise<Me>;
}

export async function getLinkedInBasicProfile(
    session: NullableSession,
    user: NullableUser
) {
    try {
        // Cache this and revalidate after login only, it fails a lot
        const me = await getLinkedInMe(session);

        return {
            name: `${me.localizedFirstName} ${me.localizedLastName}`,
            headline: me.localizedHeadline,
            image: await extractLinkedInProfileImage(user)
        };
    } catch (error: unknown) {
        console.warn('Me call failed', (error as Error).message);

        return {
            name: 'John Doe',
            headline: 'This is an example headline',
            image: '/favicon.ico'
        };
    }
}
