import { NullableSession } from '@/lib/auth/session/types';

export async function extractLinkedInId(session: NullableSession) {
    return session?.user?.identities?.[0].id;
}

export async function extractLinkedInAccessToken(session: NullableSession) {
    return session?.provider_token;
}

export async function extractLinkedInProfileImage(session: NullableSession) {
    return session?.user?.user_metadata?.picture as string;
}

export function getLinkedInUrn(id: string) {
    return `urn:li:person:${id}`;
}

export async function getEncodedLinkedInUrn(id: string) {
    return encodeURI(getLinkedInUrn(id));
}
