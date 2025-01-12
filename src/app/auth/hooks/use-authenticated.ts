'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

import { extractLinkedInAccessToken } from '@/lib/linkedin/user/extract';
import { supabaseClient } from '@/lib/supabase/client';

export default function useRedirectIfAuthenticated() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function redirectIfAuthenticated() {
      const supabaseUser = await supabaseClient.auth.getUser();
      const supabaseSession = await supabaseClient.auth.getSession();

      const anyError = !!supabaseUser.error || !!supabaseSession.error;
      const hasUser = !!supabaseUser.data?.user;
      const token = extractLinkedInAccessToken(supabaseSession?.data?.session);

      // TODO
      console.log('---> this check needs to be added to the auth middleware');
      if (anyError || !hasUser || !token) {
        setLoading(false);
        redirect('/');
      }

      if (!anyError && hasUser && token) {
        redirect('/p');
      }
    }

    redirectIfAuthenticated();
  }, []);

  return loading;
}
