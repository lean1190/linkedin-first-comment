import { signInWithLinkedIn } from '@/lib/auth/signin';
import { IconBrandLinkedin } from '@tabler/icons-react';

export default function SigninButton() {
    return (
        <form onSubmit={signInWithLinkedIn}>
            <button
            className="relative group/btn flex space-x-2 items-center justify-start px-10 w-full text-black rounded-md h-12 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
            >
            <IconBrandLinkedin className="h-6 w-6 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-xl font-extralight">
                Sign in with LinkedIn
            </span>
            <BottomGradient />
            </button>
        </form>
    );
}

const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };
