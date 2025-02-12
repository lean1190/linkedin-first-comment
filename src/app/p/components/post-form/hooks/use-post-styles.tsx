import { pageContainerWidthDesktop, pageContainerWidthMobile } from '@/lib/constants/containers';
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
      hasSucceeded,
      hasErrored
    }: {
      isPending: boolean;
      hasSucceeded: boolean;
      hasErrored: boolean;
    }) => {
      const Line = ({ text, dotColor }: { text: string; dotColor: string }) => (
        <span className="flex items-center gap-1">
          <span className={`rounded-full h-2 w-2 ${dotColor}`}>{''}</span>
          <span className="text-xs">{text}</span>
        </span>
      );

      if (hasErrored) {
        return <Line text="Try again" dotColor="bg-red-300" />;
      }

      if (hasSucceeded) {
        return <Line text="Draft saved" dotColor="bg-green-300" />;
      }

      if (isPending) {
        return <Line text="Draft saved..." dotColor="bg-green-300" />;
      }

      return <Line text="Ready to write" dotColor="bg-green-300" />;
    },
    []
  );

  return { viewportStyle, statusLine, containerStyle };
}
