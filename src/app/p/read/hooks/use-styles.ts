import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import type { ContainerViewport } from '../../components/post-form/types';

export default function useStyles(viewport: ContainerViewport) {
  const viewportStyle = useCallback(
    (v: ContainerViewport) =>
      clsx('cursor-pointer rounded p-1 transition', 'hover:bg-neutral-600', {
        'bg-black': v === viewport
      }),
    [viewport]
  );

  const containerStyle = useMemo(
    () =>
      clsx('mx-auto rounded-xl bg-[#1b1f23] px-4 pb-6 transition-all', {
        'max-w-[555px]': viewport === 'desktop',
        'max-w-[409px]': viewport === 'mobile'
      }),
    [viewport]
  );

  return { viewportStyle, containerStyle };
}
