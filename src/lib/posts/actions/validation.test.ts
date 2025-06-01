import { getFakeSupabaseUser } from '@/lib/__mocks__/supabase';
import * as unauthorizedModule from '@/lib/auth/errors/unauthorized';
import * as serverModule from '@/lib/auth/session/server';
import { ServerActionError } from '@/lib/server-actions/errors';
import { createClient } from '@/lib/supabase/server';
import type { User } from '@supabase/supabase-js';
import { describe, expect, it, vi } from 'vitest';
import { validateSession } from './validation';

describe('validateSession', () => {
  it('should return user, session, and author urn if all is valid', async () => {
    (await createClient()).auth.signInWithOAuth({ provider: 'linkedin' });

    const result = await validateSession();
    expect(result).toEqual({
      author: {
        id: '123',
        urn: 'urn:li:person:fake-linkedin-id'
      },
      session: {
        access_token: 'fake-token',
        provider_token: 'fake-linkedin-token',
        user: getFakeSupabaseUser()
      },
      user: getFakeSupabaseUser()
    });
  });

  it('should throw AuthenticationError if authentication check fails', async () => {
    const expectedError = new unauthorizedModule.AuthenticationError('Auth failed', 'Failed');
    vi.spyOn(unauthorizedModule, 'checkUnauthorized').mockReturnValue(expectedError);

    await expect(validateSession()).rejects.toStrictEqual(expectedError);
  });

  it('should throw ServerActionError if urn is missing', async () => {
    const userWithoutLinkedIn = getFakeSupabaseUser({ identities: [] }) as User;
    vi.spyOn(serverModule, 'getServerUser').mockResolvedValue(userWithoutLinkedIn);

    const expectedError = new ServerActionError(
      'The author urn could not be retrieved',
      'UrnNotFound'
    );

    await expect(validateSession()).rejects.toStrictEqual(expectedError);
  });
});
