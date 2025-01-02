import SigninButton from './signin-button';
import Title from './title';

export function SigninForm() {
    return (
        <article className="z-10 flex size-full flex-col items-center justify-center">
            <div className="mb-8"><Title /></div>
            <SigninButton />
        </article>
    );
}
