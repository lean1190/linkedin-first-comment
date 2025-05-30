'use client';

import type { getLinkedInBasicProfile } from '@/lib/linkedin/user/server';
import type { PostWithId } from '@/lib/posts/database/types';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { redirect } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormContext } from './context/form';
import Focus from './focus/focus';
import { NavLink } from './nav/items';
import PostForm from './post-form/post-form';
import { formSchema } from './post-form/schemas';
import Success from './success/success';
import type { FormPost, ScheduledPost } from './types';

interface Props {
  post: Awaited<PostWithId>;
  profile: Awaited<ReturnType<typeof getLinkedInBasicProfile>>;
}

export default function PlatformPageClient({ post, profile }: Props) {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [scheduledPost, setScheduledPost] = useState<ScheduledPost | null>(null);
  const form = useForm<FormPost>({ resolver: zodResolver(formSchema) });

  const previewPost = useCallback((post: ScheduledPost | null) => {
    if (post?.id) redirect(`${NavLink.Posts}/${post.id}`);
  }, []);

  return (
    <FormContext.Provider value={form}>
      <div className={clsx('transition', { block: !isFocusMode, hidden: isFocusMode })}>
        <PostForm
          profile={profile}
          post={post}
          onPostScheduled={(post) => setScheduledPost(post)}
          onFocusOpened={() => setIsFocusMode(true)}
        />
      </div>

      <Success
        profile={profile}
        post={scheduledPost}
        show={!!scheduledPost}
        onClose={() => previewPost(scheduledPost)}
      />

      <AnimatePresence>
        {isFocusMode ? (
          <Focus initialContent={form.getValues('content')} onClose={() => setIsFocusMode(false)} />
        ) : null}
      </AnimatePresence>
    </FormContext.Provider>
  );
}
