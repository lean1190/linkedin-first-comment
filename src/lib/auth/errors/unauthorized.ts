import { extractLinkedInAccessToken } from '@/lib/linkedin/user/extract';
import type { CurrentUserSession, NullableSession, NullableUser } from '../session/types';

export class AuthenticationError extends Error {
  reason: string;

  constructor(message: string, reason: string) {
    super(message);
    this.reason = reason;
  }

  public get redirectPath() {
    const errorPath = `/?error=${this.reason}`;
    const url = new URL(errorPath, 'http://placeholder');

    return {
      errorPath,
      pathname: url.pathname,
      queryParams: new URLSearchParams(url.search)
    };
  }
}

export function checkUnauthorized({
  user,
  session
}: CurrentUserSession): AuthenticationError | null {
  const hasToken = extractLinkedInAccessToken(session);

  if (user && hasToken) {
    return null;
  }

  return new AuthenticationError(
    'User is not properly authenticated',
    !user ? 'Unauthorized' : 'SessionExpired'
  );
}
