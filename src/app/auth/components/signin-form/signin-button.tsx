'use client';

import { IconBrandLinkedin, IconLoader } from '@tabler/icons-react';
import clsx from 'clsx';
import { useFormStatus } from 'react-dom';

import { BottomGradient } from '@/components/ui/bottom-gradient';
import { signInWithLinkedIn } from '@/lib/auth/signin';

interface Props {
  loading: boolean;
}

const buttonStyles = clsx(
  'group/btn relative flex h-12 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-10 font-medium text-black shadow-input',
  'dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]',
  'disabled:opacity-50'
);

export default function SigninButton({ loading }: Props) {
  const { pending } = useFormStatus();

  return (
    <form onSubmit={signInWithLinkedIn}>
      <button type="submit" disabled={loading || pending} className={buttonStyles}>
        {loading || pending ? (
          <IconLoader className="size-6 animate-spin text-neutral-800 dark:text-neutral-300" />
        ) : (
          <IconBrandLinkedin className="size-6 text-neutral-800 dark:text-neutral-300" />
        )}

        <span className="text-lg font-extralight text-neutral-700 dark:text-neutral-300">
          {loading || pending ? 'Loading...' : 'Sign in with LinkedIn'}
        </span>
        {loading || pending ? null : <BottomGradient />}
      </button>
    </form>
  );
}
