'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (error.message.includes('401 Unauthorized')) {
      redirect('/');
    }
  }, [error.message]);

  return (
    // global-error must include html and body tags
    <html lang="en">
      <body>
        <h2>Something went really wrong</h2>
        <button type="button" onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  );
}
