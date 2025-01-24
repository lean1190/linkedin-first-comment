import { IconCircleCheck, IconRefresh } from '@tabler/icons-react';
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
      clsx('mx-auto rounded-xl bg-[#1b1f23] px-4 pb-6 transition-all', {
        'max-w-[555px]': viewport === 'desktop',
        'max-w-[409px]': viewport === 'mobile'
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
          <span className="text-xs">Ready</span>
        </span>
      );
    },
    []
  );

  return { viewportStyle, statusLine, formStyle };
}
