'use client';

import { SigninForm } from './components/signin-form/signin-form';
import Title from './components/signin-form/title';
import useRedirectIfAuthenticated from './hooks/use-authenticated';

export default function HomePage() {
  const loading = useRedirectIfAuthenticated();

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <Title />
      <SigninForm loading={loading} />
    </div>
  );
}
