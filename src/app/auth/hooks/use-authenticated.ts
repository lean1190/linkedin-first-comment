'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

import { supabaseClient } from '@/lib/supabase/client';

export default function useRedirectIfAuthenticated() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function redirectIfAuthenticated() {
            const { data, error } = await supabaseClient.auth.getUser();
            if (error || !data?.user) {
                setLoading(false);
                redirect('/');
            }

            if (!error && data?.user) {
                redirect('/p');
            }
        }

        redirectIfAuthenticated();
    }, []);

    return loading;
}
