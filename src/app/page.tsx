'use client';

import { SigninForm } from './auth/components/signin-form/signin-form';
import useRedirectIfAuthenticated from './auth/hooks/use-authenticated';

export default function HomePage() {
  const loading = useRedirectIfAuthenticated();

  return (
    <main className="size-full">
      <SigninForm loading={loading} />
    </main>
  );
}
