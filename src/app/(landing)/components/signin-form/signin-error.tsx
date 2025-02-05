'use client';

import { AuthenticationErrorType } from '@/lib/auth/errors/unauthorized';
import { useSearchParams } from 'next/navigation';

const errorStyle =
  'text-xs sm:text-sm text-red-300 mt-8 border-red-300 px-4 py-1 rounded-full text-center';

export default function SigninError() {
  const error = useSearchParams()?.get('error');

  return error === AuthenticationErrorType.SessionExpired ? (
    <div className={errorStyle}>
      <p>Your LinkedIn session expired, you will have to sign in again.</p>
      <p>
        No worries, <strong>your draft was saved</strong>. Sorry for the trouble.
      </p>
    </div>
  ) : error === AuthenticationErrorType.Unauthorized ? (
    <div className={errorStyle}>
      <p>Looks like you cannot access this page.</p>
      <p>Have you tried to sign in first?</p>
    </div>
  ) : null;
}
