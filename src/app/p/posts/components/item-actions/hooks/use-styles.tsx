import clsx from 'clsx';
import { useMemo } from 'react';

export default function useActionStyles() {
  const actionStyles = useMemo(
    () => clsx('w-32 cursor-pointer rounded', 'hover:bg-neutral-800'),
    []
  );

  const onlyActionStyles = useMemo(
    () => clsx(actionStyles, 'flex items-center gap-1 px-3 py-2'),
    [actionStyles]
  );

  const linkStyles = useMemo(() => clsx('flex items-center gap-1 w-full h-full px-3 py-2'), []);

  return { actionStyles, onlyActionStyles, linkStyles };
}
