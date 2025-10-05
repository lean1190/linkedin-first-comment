import { IconBrandLinkedin, IconLoader } from '@tabler/icons-react';

import { ButtonBorderGradient } from '@/components/ui/button-border-gradient';
import { signInWithLinkedIn } from '@/lib/auth/signin';

interface Props {
  loading: boolean;
}

export default function SigninButton({ loading }: Props) {
  return (
    <form action={signInWithLinkedIn}>
      <ButtonBorderGradient type="submit" className="flex gap-2 items-center" disabled={loading}>
        <span>
          {loading ? (
            <IconLoader className="size-6 animate-spin text-neutral-800 dark:text-neutral-300" />
          ) : (
            <IconBrandLinkedin className="size-6 text-neutral-800 dark:text-neutral-300" />
          )}
        </span>
        <span className="sm:text-lg font-extralight text-neutral-700 dark:text-neutral-300">
          {loading ? 'Getting in...' : 'Sign in with LinkedIn'}
        </span>
      </ButtonBorderGradient>
    </form>
  );
}
