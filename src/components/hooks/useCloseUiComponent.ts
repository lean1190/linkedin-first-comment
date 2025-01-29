import { useCallback, useState } from 'react';

export function useOpenUiComponent(): [boolean, () => void] {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(() => true);
    setTimeout(() => setIsOpen(() => false), 100);
  }, []);

  return [isOpen, open];
}
