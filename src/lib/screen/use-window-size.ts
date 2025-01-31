import { useCallback, useEffect, useState } from 'react';

const valueIfWidthOrFalse = (width: number, value: boolean) => (width === 0 ? false : value);

export default function useWindowSize(): {
  width: number;
  isTiny: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2Xl: boolean;
} {
  const [width, setWidth] = useState<number>(0);

  const handleWindowSizeChange = useCallback(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
    }
  }, []);

  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, [handleWindowSizeChange]);

  return {
    width,
    isTiny: valueIfWidthOrFalse(width, width < 640),
    isSm: valueIfWidthOrFalse(width, width >= 640 && width < 768),
    isMd: valueIfWidthOrFalse(width, width >= 768 && width < 1024),
    isLg: valueIfWidthOrFalse(width, width >= 1024 && width < 1280),
    isXl: valueIfWidthOrFalse(width, width >= 1280 && width < 1536),
    is2Xl: valueIfWidthOrFalse(width, width >= 1536)
  };
}
