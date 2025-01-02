'use client';

import { SigninForm } from './auth/components/signin-form/signin-form';
import useRedirectIfAuthenticated from './auth/hooks/use-authenticated';

export default function Home() {
    useRedirectIfAuthenticated();

    return (
        <main className="size-full">
            <SigninForm />
        </main>
    );
}
