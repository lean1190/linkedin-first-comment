import { cn } from '@/lib/styles/merge';

export const LabelInputContainer = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn('flex flex-col space-y-2 w-full', className)}>{children}</div>;
