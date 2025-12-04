import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import {
  pageContainerBgColor,
  pageContainerWidthDesktop,
  pageContainerWidthMobile
} from '@/lib/constants/containers';
import type { ContainerViewport } from '../types';

export default function usePostStyles(viewport: ContainerViewport) {
  const actionButtonStyle = clsx(
    'cursor-pointer rounded p-1 transition text-xs',
    'hover:bg-neutral-600'
  );

  const viewportStyle = useCallback(
    (v: ContainerViewport) => clsx(actionButtonStyle, { 'bg-black': v === viewport }),
    [viewport, actionButtonStyle]
  );

  const containerStyle = useMemo(
    () =>
      clsx('mx-auto rounded-xl px-4 pb-6 transition-all', pageContainerBgColor, {
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

  return { viewportStyle, statusLine, containerStyle, actionButtonStyle };
}
