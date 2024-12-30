'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

import { signInWithLinkedIn } from '@/lib/auth/signin';
import { supabaseClient } from '@/lib/supabase/client';

export default function Home() {
    useEffect(() => {
        async function something() {
            const { data, error } = await supabaseClient.auth.getUser();
            console.log('---> effect', { data, error });
            if (error || !data?.user) {
                redirect('/');
            }
            if (!error && data?.user) {
                redirect('/p');
            }
        }
        something();
    }, []);

    return (
        <>
            <nav>
                <button type="button" onClick={() => signInWithLinkedIn()}>Sign in</button>
            </nav>
            <main>
        Hello content
            </main>
        </>
    );
}
