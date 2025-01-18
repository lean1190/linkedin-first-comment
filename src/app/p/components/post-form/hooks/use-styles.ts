import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import type { FormViewport } from '../types';

export default function useStyles(viewport: FormViewport) {
  const viewportStyle = useCallback(
    (v: FormViewport) =>
      clsx('cursor-pointer rounded p-1 transition', 'hover:bg-neutral-600', {
        'bg-black': v === viewport
      }),
    [viewport]
  );

  const formStyle = useMemo(
    () =>
      clsx('relative mx-auto rounded-xl bg-[#1b1f23] px-4 py-6 transition-all', {
        'max-w-[555px]': viewport === 'desktop',
        'max-w-[409px]': viewport === 'mobile'
      }),
    [viewport]
  );

  return { viewportStyle, formStyle };
}
