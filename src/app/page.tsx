'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

import { supabaseClient } from '@/lib/supabase/client';
import { SigninForm } from './components/signin-form/signin-form';

export default function Home() {
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

    return (
        <main className="w-full h-full">
            <SigninForm />
        </main>
    );
}
