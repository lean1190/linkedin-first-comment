'use client';

import {signInWithLinkedIn} from '@/lib/auth/signin';
import { supabaseClient } from '@/lib/supabase/client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    async function something() {
      const { data, error } = await supabaseClient.auth.getUser()
      console.log('---> effect', { data, error });
      if (error || !data?.user) {
        redirect('/')
      }
      if (!error && data?.user) {
        redirect('/p')
      }
    }
    something();
  }, []);
  
  return (
    <main>
      <button onClick={() => signInWithLinkedIn()}>Sign in</button>
    </main>
  );
}
