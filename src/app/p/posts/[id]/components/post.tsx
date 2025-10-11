'use client';

import { IconDeviceDesktop, IconDeviceMobile } from '@tabler/icons-react';
import { isPast } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Author from '@/app/p/components/author';
import { NavLink } from '@/app/p/components/nav/items';
import usePostStyles from '@/app/p/components/post-form/hooks/use-post-styles';
import type { ContainerViewport } from '@/app/p/components/post-form/types';
import Timezone from '@/app/p/components/timezone';
import { ArrowButton } from '@/components/ui/arrow-button';
import { FormSeparator } from '@/components/ui/form-separator';
import { LabelInputContainer } from '@/components/ui/label-input-container';
import type { getLinkedInBasicProfile } from '@/lib/linkedin/user/server';
import type { PostDetail } from '@/lib/posts/database/types';
import useWindowSize from '@/lib/screen/use-window-size';
import useMoreButton from '../hooks/use-more-button';

interface Props {
  post: Awaited<PostDetail>;
  profile: Awaited<ReturnType<typeof getLinkedInBasicProfile>>;
}

const isPosted = (post: PostDetail) =>
  !post.post_at_utc
    ? false
    : isPast(post.post_at_utc) || post.status === 'posted' || post.status === 'reposted';

export default function Post({ post, profile }: Props) {
  const [selectedViewport, setSelectedViewport] = useState<ContainerViewport>('desktop');
  const { isTiny: isTinyDevice } = useWindowSize();
  const { containerStyle, viewportStyle } = usePostStyles(selectedViewport);

  const { expandContent, contentRef, isExpanded, contentStyles, shouldShowMore } = useMoreButton();

  useEffect(() => {
    if (isTinyDevice) {
      setSelectedViewport('mobile');
    }
  }, [isTinyDevice]);

  return (
    <article className={containerStyle}>
      <section className="w-full pt-3 pb-2 max-w-full justify-between items-center flex font-light text-linkedin-low-emphasis">
        <Link href={NavLink.Posts} className="text-sm">
          <ArrowButton text="Back" right={false} />
        </Link>
        <div className="hidden sm:flex items-center gap-1">
          <button
            type="button"
            className={viewportStyle('mobile')}
            onClick={() => setSelectedViewport('mobile')}
          >
            <IconDeviceMobile size={20} />
          </button>
          <button
            type="button"
            className={viewportStyle('desktop')}
            onClick={() => setSelectedViewport('desktop')}
          >
            <IconDeviceDesktop size={20} />
          </button>
        </div>
      </section>

      <section className="mb-2 pr-9">
        <Author profile={profile} />
      </section>

      <section className="max-w-full relative">
        <div ref={contentRef} className={contentStyles}>
          {post.content}
        </div>
        {shouldShowMore && !isExpanded ? (
          <button
            type="button"
            className="text-blue-300 pl-40 inline text-sm hover:underline absolute right-0 bottom-[2px] cursor-pointer bg-gradient-to-r from-transparent to-[#1b1f23]"
            onClick={expandContent}
          >
            ...more
          </button>
        ) : null}
      </section>

      <section className="flex items-center justify-between py-2">
        <div className="flex items-center gap-1">
          <div className="flex">
            <Image src="/like.svg" alt="Like" width={16} height={16} />
            <Image className="-ml-1" src="/heart.svg" alt="Insight" width={16} height={16} />
            <Image className="-ml-1" src="/insight.svg" alt="Heart" width={16} height={16} />
          </div>
          <div className="text-xs font-light text-linkedin-low-emphasis">You and 1830 others</div>
        </div>
        <div className="text-xs font-light text-linkedin-low-emphasis">
          215 comments • 19 reposts
        </div>
      </section>

      <FormSeparator size="sm" />

      <section className="w-full pr-4">
        <div className="mb-2 flex items-start justify-between">
          <div
            className={`transition-all min-w-0 ${selectedViewport === 'desktop' ? 'max-w-[485px]' : 'max-w-[339px]'}`}
          >
            <Author profile={profile} size="sm" showTime={false} />
          </div>
          <div className="flex items-center gap-2 text-xs font-light text-linkedin-low-emphasis">
            <span>1s</span>
            <span className="text-sm">•••</span>
          </div>
        </div>
        <LabelInputContainer className="pl-10 text-sm">{post.comment}</LabelInputContainer>
      </section>

      <FormSeparator size="lg" />

      {post.post_at_utc ? (
        <section>
          <div className="text-sm">{isPosted(post) ? 'Posted on' : 'Will be posted on'}</div>
          <div>
            <Timezone schedule={post.post_at_utc} />
          </div>
        </section>
      ) : null}
    </article>
  );
}
