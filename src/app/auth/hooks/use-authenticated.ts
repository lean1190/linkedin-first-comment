'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

import { NavLink } from '@/app/p/components/nav/items';
import { checkUnauthorized } from '@/lib/auth/errors/unauthorized';
import { supabaseClient } from '@/lib/supabase/client';

export default function useRedirectIfAuthenticated() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function redirectIfAuthenticated() {
      const supabaseUser = await supabaseClient.auth.getUser();
      const supabaseSession = await supabaseClient.auth.getSession();

      const anyError = !!supabaseUser.error || !!supabaseSession.error;
      const unauthorized = checkUnauthorized({
        user: supabaseUser?.data?.user,
        session: supabaseSession?.data?.session
      });

      if (anyError || unauthorized) {
        setLoading(false);
        redirect(unauthorized?.redirectPath.errorPath ?? NavLink.Root);
      }

      if (!anyError && !unauthorized) {
        redirect(NavLink.Platform);
      }
    }

    redirectIfAuthenticated();
  }, []);

  return loading;
}
