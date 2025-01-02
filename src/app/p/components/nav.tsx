'use client';

import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth/signout';

export default function Nav() {
    return (
        <nav className="p-4 text-right">
            <Button type="button" onClick={signOut}>Sign out</Button>
        </nav>
    );
}
