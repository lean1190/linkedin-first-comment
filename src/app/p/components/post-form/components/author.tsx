import Image from 'next/image';

import type { getLinkedInBasicProfile } from '@/lib/linkedin/user/server';

interface Props {
  profile: Awaited<ReturnType<typeof getLinkedInBasicProfile>>;
  size?: 'lg' | 'sm';
  showTime?: boolean;
}

const imageSize = {
  lg: 48,
  sm: 32
};

export default function Author({ profile, size = 'lg', showTime = true }: Props) {
  return (
    <figure className="flex min-w-0 items-center gap-x-2">
      <Image
        src={profile.image}
        alt={profile.name}
        width={imageSize[size]}
        height={imageSize[size]}
        className="rounded-full"
      />
      <figcaption className="overflow-hidden">
        <div className={`font-bold ${size === 'sm' ? 'text-sm' : ''}`}>{profile.name}</div>
        <div className="truncate text-xs font-light text-linkedin-low-emphasis">
          {profile.headline}
        </div>
        {showTime ? (
          <div className="flex gap-1 text-xs font-light text-linkedin-low-emphasis">
            <span>3w</span>
            <span>•</span>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              data-supported-dps="16x16"
              fill="currentColor"
              width="16"
              height="16"
              focusable="false"
            >
              <path d="M8 1a7 7 0 107 7 7 7 0 00-7-7zM3 8a5 5 0 011-3l.55.55A1.5 1.5 0 015 6.62v1.07a.75.75 0 00.22.53l.56.56a.75.75 0 00.53.22H7v.69a.75.75 0 00.22.53l.56.56a.75.75 0 01.22.53V13a5 5 0 01-5-5zm6.24 4.83l2-2.46a.75.75 0 00.09-.8l-.58-1.16A.76.76 0 0010 8H7v-.19a.51.51 0 01.28-.45l.38-.19a.74.74 0 01.68 0L9 7.5l.38-.7a1 1 0 00.12-.48v-.85a.78.78 0 01.21-.53l1.07-1.09a5 5 0 01-1.54 9z" />
            </svg>
          </div>
        ) : null}
      </figcaption>
    </figure>
  );
}
