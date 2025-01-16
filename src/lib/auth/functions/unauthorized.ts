import { extractLinkedInAccessToken } from '@/lib/linkedin/user/extract';
import type { NullableSession, NullableUser } from '../session/types';

export interface AuthorizationCheck {
  unauthorized: boolean;
  reason: string | null;
}

export function isUnauthorized({
  user,
  session
}: {
  user: NullableUser;
  session: NullableSession;
}): AuthorizationCheck {
  const noToken = !extractLinkedInAccessToken(session);

  return {
    unauthorized: !user || noToken,
    reason: !user ? 'Unauthorized' : noToken ? 'SessionExpired' : null
  };
}

export function getAuthErrorPath(check: AuthorizationCheck): string | null {
  return check.unauthorized ? `/?error=${check.reason}` : null;
}
