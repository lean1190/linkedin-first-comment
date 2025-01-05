import { NullableSession, NullableUser } from '@/lib/auth/session/types';

export async function extractLinkedInAccessToken(session: NullableSession) {
    return session?.provider_token;
}

export async function extractLinkedInId(user: NullableUser) {
    return user?.identities?.[0].id;
}

export async function extractLinkedInProfileImage(user: NullableUser) {
    return user?.user_metadata?.picture as string;
}

export function getLinkedInUrn(id?: string) {
    return `urn:li:person:${id}`;
}

export async function getEncodedLinkedInUrn(id?: string) {
    return encodeURI(getLinkedInUrn(id));
}
