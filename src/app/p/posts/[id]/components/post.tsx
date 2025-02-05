'use client';

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
import { IconDeviceDesktop, IconDeviceMobile } from '@tabler/icons-react';
import { isPast } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Props {
  post: Awaited<PostDetail>;
  profile: Awaited<ReturnType<typeof getLinkedInBasicProfile>>;
}

export default function Post({ post, profile }: Props) {
  const [selectedViewport, setSelectedViewport] = useState<ContainerViewport>('desktop');
  const { isTiny: isTinyDevice } = useWindowSize();
  const { containerStyle, viewportStyle } = usePostStyles(selectedViewport);

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
          <div className={viewportStyle('mobile')} onClick={() => setSelectedViewport('mobile')}>
            <IconDeviceMobile size={20} />
          </div>
          <div className={viewportStyle('desktop')} onClick={() => setSelectedViewport('desktop')}>
            <IconDeviceDesktop size={20} />
          </div>
        </div>
      </section>

      <section className="mb-2 pr-9">
        <Author profile={profile} />
      </section>

      <section className="text-sm">{post.content}</section>

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

      <section>
        <div className="text-sm">
          {isPast(post.post_at_utc) ? 'Posted on' : 'Will be posted on'}
        </div>
        <div>
          <Timezone schedule={post.post_at_utc} viewport={selectedViewport} />
        </div>
      </section>
    </article>
  );
}
