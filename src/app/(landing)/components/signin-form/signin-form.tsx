import { Suspense } from 'react';
import SigninButton from './signin-button';
import SigninError from './signin-error';
import Terms from './terms';

interface Props {
  loading: boolean;
}

export function SigninForm({ loading }: Props) {
  return (
    <article className="z-10 flex flex-col items-center">
      <SigninButton loading={loading} />
      <Terms />
      <Suspense fallback={null}>
        <SigninError />
      </Suspense>
    </article>
  );
}
