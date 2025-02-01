import { Suspense } from 'react';
import SigninButton from './signin-button';
import SigninError from './signin-error';
import Terms from './terms';
import Title from './title';

interface Props {
  loading: boolean;
}

export function SigninForm({ loading }: Props) {
  return (
    <article className="z-10 flex size-full flex-col items-center justify-center">
      <Title />
      <SigninButton loading={loading} />
      <Terms />
      <Suspense fallback={null}>
        <SigninError />
      </Suspense>
    </article>
  );
}
