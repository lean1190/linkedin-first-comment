import { pageContainerWidthDesktop, pageContainerWidthMobile } from '@/lib/constants/containers';
import { IconCircleCheck, IconRefresh } from '@tabler/icons-react';
import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import type { ContainerViewport } from '../types';

export default function usePostStyles(viewport: ContainerViewport) {
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
        [pageContainerWidthDesktop]: viewport === 'desktop',
        [pageContainerWidthMobile]: viewport === 'mobile'
      }),
    [viewport]
  );

  const statusLine = useCallback(
    ({
      isPending,
      hasSucceeded
    }: {
      isPending: boolean;
      hasSucceeded: boolean;
    }) => {
      if (hasSucceeded) {
        return (
          <span className="flex items-center gap-1">
            <IconCircleCheck size={18} />
            <span className="text-xs">Draft saved</span>
          </span>
        );
      }

      if (isPending) {
        return (
          <span className="flex items-center gap-1">
            <IconRefresh size={18} className="animate-spin" />
            <span className="text-xs">Saving...</span>
          </span>
        );
      }

      return (
        <span className="flex items-center gap-1">
          <IconCircleCheck size={18} />
          <span className="text-xs">Ready to write</span>
        </span>
      );
    },
    []
  );

  return { viewportStyle, statusLine, containerStyle };
}
