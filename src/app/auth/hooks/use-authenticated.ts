'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getAuthErrorPath, isUnauthorized } from '@/lib/auth/functions/unauthorized';
import { supabaseClient } from '@/lib/supabase/client';

export default function useRedirectIfAuthenticated() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function redirectIfAuthenticated() {
      const supabaseUser = await supabaseClient.auth.getUser();
      const supabaseSession = await supabaseClient.auth.getSession();

      const anyError = !!supabaseUser.error || !!supabaseSession.error;
      const errorPath = getAuthErrorPath(
        isUnauthorized({
          user: supabaseUser?.data?.user,
          session: supabaseSession?.data?.session
        })
      );

      if (anyError || errorPath) {
        setLoading(false);
        redirect(errorPath ?? '/');
      }

      if (!anyError && !errorPath) {
        redirect('/p');
      }
    }

    redirectIfAuthenticated();
  }, []);

  return loading;
}
