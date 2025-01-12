import { extractUserEmail, extractUserId } from '../auth/session/extract';
import type { NullableUser } from '../auth/session/types';

export async function getEventUser(user: NullableUser) {
  return {
    external_id: extractUserId(user),
    email: extractUserEmail(user)
  };
}
