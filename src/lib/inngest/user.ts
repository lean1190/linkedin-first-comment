import { getClientUser } from '../auth/session/client';
import { extractUserEmail, extractUserId } from '../auth/session/extract';

export async function getEventUser() {
    return {
        external_id: extractUserId(await getClientUser()),
        email: extractUserEmail(await getClientUser())
    };
}
