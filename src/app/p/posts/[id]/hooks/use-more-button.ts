'use client';

import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';

const threeLinesHeight = 'max-h-[4.5em]';

export default function useMoreButton() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowMore, setShouldShowMore] = useState(false);

  const contentStyles = clsx(
    'relative overflow-hidden transition-all text-sm break-words whitespace-pre-wrap',
    { 'max-h-none': isExpanded },
    { [threeLinesHeight]: !isExpanded }
  );

  const expandContent = useCallback(() => setIsExpanded(true), []);

  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = Number.parseInt(getComputedStyle(contentRef.current).lineHeight, 10);
      const maxHeight = lineHeight * 3;

      if (contentRef.current.scrollHeight > maxHeight) {
        setShouldShowMore(true);
      }
    }
  }, []);

  return {
    expandContent,
    contentStyles,
    shouldShowMore,
    isExpanded,
    contentRef
  };
}
