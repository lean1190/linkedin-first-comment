'use client';
import { cn } from '@/lib/styles/merge';
import { IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import type React from 'react';
import {
  type ReactNode,
  type RefObject,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';

interface ModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return <ModalContext.Provider value={{ open, setOpen }}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export function Modal({ children }: { children: ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>;
}

export const ModalTrigger = ({
  children,
  className,
  forceOpen = false
}: {
  children: ReactNode;
  className?: string;
  forceOpen?: boolean;
}) => {
  const { setOpen } = useModal();

  useEffect(() => {
    if (forceOpen) {
      setOpen(true);
    }
  }, [forceOpen, setOpen]);

  return (
    <button
      type="button"
      className={cn(
        'px-4 py-2 rounded-md text-black dark:text-white text-center relative overflow-hidden',
        className
      )}
      onClick={() => setOpen(true)}
    >
      {children}
    </button>
  );
};

export const ModalBody = ({
  children,
  className,
  onClose = () => {}
}: {
  children: ReactNode;
  className?: string;
  onClose?: VoidFunction;
}) => {
  const { open, setOpen } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef as RefObject<HTMLDivElement | null>, () => {
    onClose();
    setOpen(false);
  });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1,
            backdropFilter: 'blur(10px)'
          }}
          exit={{
            opacity: 0,
            backdropFilter: 'blur(0px)'
          }}
          className="fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full flex items-center justify-center z-50"
        >
          <Overlay />

          <motion.div
            ref={modalRef}
            className={cn(
              'min-h-[30%] max-h-[90%] max-w-full md:max-w-3xl bg-white dark:bg-neutral-950 border border-transparent dark:border-neutral-800 rounded-3xl relative z-50 flex flex-col flex-1 overflow-hidden',
              className
            )}
            initial={{
              opacity: 0,
              scale: 0.5
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.8
            }}
            transition={{
              type: 'tween',
              stiffness: 260,
              damping: 30
            }}
          >
            <CloseIcon />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ModalContent = ({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={cn('flex flex-col flex-1 p-8 md:p-10', className)}>{children}</div>;
};

export const ModalFooter = ({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex justify-end p-4 bg-gray-100 dark:bg-neutral-900', className)}>
      {children}
    </div>
  );
};

const Overlay = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1,
        backdropFilter: 'blur(10px)'
      }}
      exit={{
        opacity: 0,
        backdropFilter: 'blur(0px)'
      }}
      className={`fixed inset-0 h-full w-full bg-black bg-opacity-50 z-50 ${className}`}
    />
  );
};

const CloseIcon = () => {
  const { setOpen } = useModal();
  return (
    <button
      type="button"
      onClick={() => setOpen(false)}
      className="z-20 text-slate-500 cursor-pointer hover:text-white transition-colors absolute top-4 right-4"
    >
      <IconX size={20} />
    </button>
  );
};

// Hook to detect clicks outside of a component.
// Add it in a separate file, I've added here for simplicity
export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  callback: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      // DO NOTHING if the element being clicked is the target element or their children
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback]);
};
