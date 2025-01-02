import { NullableSession } from './types';

export function extractUserEmail(session: NullableSession) {
    return session?.user?.email;
}

export function extractUserId(session: NullableSession) {
    return session?.user?.id;
}
