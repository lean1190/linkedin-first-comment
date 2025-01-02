'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

import { supabaseClient } from '@/lib/supabase/client';

export default function useRedirectIfAuthenticated() {
    useEffect(() => {
        async function redirectIfAuthenticated() {
            const { data, error } = await supabaseClient.auth.getUser();
            if (error || !data?.user) {
                redirect('/');
            }

            if (!error && data?.user) {
                redirect('/p');
            }
        }

        redirectIfAuthenticated();
    }, []);
}
