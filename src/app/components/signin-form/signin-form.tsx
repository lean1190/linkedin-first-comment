import Title from './title';
import SigninButton from './signin-button';

export function SigninForm() {
  return (
    <article className="z-10 w-full h-full flex flex-col justify-center items-center">
        <div className="mb-8"><Title /></div>
        <SigninButton />
    </article>
  );
}
