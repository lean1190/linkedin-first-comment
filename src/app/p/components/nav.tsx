'use client';

import { signOut } from '@/lib/auth/signout';
import { cn } from '@/lib/styles/merge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { JSX } from 'react';

interface NavItem {
  name: string;
  link: string;
  icon?: JSX.Element;
}

interface Props {
  items: NavItem[];
  className?: string;
}

const highlight = (
  <span className="absolute w-full mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-400 to-transparent h-[1.5px]" />
);

export default function Nav({ items, className }: Props) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'flex gap-4 max-w-fit mx-auto border border-white/[0.2] rounded-full bg-black pr-2 pl-8 py-2 items-center justify-center',
        className
      )}
    >
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.link}
          className={cn(
            'relative text-center text-neutral-50 items-center flex hover:text-neutral-300 transition-colors'
          )}
        >
          {item.icon ? <span>{item.icon}</span> : null}
          <span className="text-sm">{item.name}</span>
          {item.link === pathname ? highlight : null}
        </Link>
      ))}
      <button
        type="button"
        onClick={signOut}
        className="border text-sm font-medium relative hover:border-neutral-300 transition border-white/[0.2] text-white px-4 py-2 rounded-full"
      >
        <span>Sign out</span>
      </button>
    </nav>
  );
}
