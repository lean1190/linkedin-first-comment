'use client';

import { IconBrandLinkedin } from '@tabler/icons-react';

import { BottomGradient } from '@/components/ui/bottom-gradient';
import { signInWithLinkedIn } from '@/lib/auth/signin';

export default function SigninButton() {
    return (
        <form onSubmit={signInWithLinkedIn}>
            <button
                className="group/btn relative flex h-12 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-10 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="submit"
            >
                <IconBrandLinkedin className="size-6 text-neutral-800 dark:text-neutral-300" />
                <span className="text-lg font-extralight text-neutral-700 dark:text-neutral-300">
                    Sign in with LinkedIn
                </span>
                <BottomGradient />
            </button>
        </form>
    );
}
