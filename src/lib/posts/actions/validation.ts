import { checkUnauthorized } from '@/lib/auth/errors/unauthorized';
import { getServerSession, getServerUser } from '@/lib/auth/session/server';
import { getLinkedInAuthorUrn } from '@/lib/linkedin/urn';
import { extractLinkedInId } from '@/lib/linkedin/user/extract';
import { ServerActionError } from '@/lib/server-actions/errors';
import type { User } from '@supabase/supabase-js';

export async function validateSession() {
  const user = await getServerUser();
  const session = await getServerSession();
  const unauthorized = checkUnauthorized({ user, session });

  if (unauthorized) {
    throw unauthorized;
  }

  const urn = getLinkedInAuthorUrn(extractLinkedInId(user)) as string;

  if (!urn) {
    throw new ServerActionError('The author urn could not be retrieved', 'UrnNotFound');
  }

  return {
    user,
    session,
    unauthorized,
    author: { urn, id: (user as User).id }
  };
}
