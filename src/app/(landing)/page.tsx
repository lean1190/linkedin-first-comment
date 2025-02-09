'use client';

import Link from 'next/link';
import { SigninForm } from './components/signin-form/signin-form';
import Title from './components/signin-form/title';
import useRedirectIfAuthenticated from './hooks/use-authenticated';

export default function HomePage() {
  const loading = useRedirectIfAuthenticated();

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <h1 className="text-xl sm:text-3xl font-light tracking-tighter">
        Schedule your <span className="text-yellow-500">#1 comment</span> on LinkedIn
      </h1>
      <p className="text-sm sm:text-xl text-linkedin-low-emphasis tracking-tight mb-8">
        Without the complexity of tools like{' '}
        <Link className="text-blue-300 hover:underline" href="https://buffer.com/">
          Buffer
        </Link>{' '}
        or{' '}
        <Link className="text-blue-300 hover:underline" href="https://hootsuite.com/">
          Hootsuite
        </Link>
      </p>
      <Title />
      <SigninForm loading={loading} />
    </div>
  );
}
