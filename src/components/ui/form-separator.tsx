export const FormSeparator = ({ size }: { size: 'lg' | 'sm' }) => (
  <div
    className={`${size === 'lg' ? 'my-8' : 'my-4'} h-px w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700`}
  />
);
