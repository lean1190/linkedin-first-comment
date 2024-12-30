'use client';

import { signOut } from '@/lib/auth/signout';

export default function PlatformLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <nav>
                <button type="button" onClick={signOut}>Sign out</button>
            </nav>
            <main>{children}</main>
        </>
    );
}
