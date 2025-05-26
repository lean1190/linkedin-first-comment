'use client';

import type { getLinkedInBasicProfile } from '@/lib/linkedin/user/server';
import type { PostWithId } from '@/lib/posts/database/types';
import type { postSchema } from '@/lib/posts/schemas/post';
import { IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { redirect } from 'next/navigation';
import { useCallback, useState } from 'react';
import type { z } from 'zod';
import { NavLink } from './nav/items';
import PostForm from './post-form/post-form';
import Success from './success/success';

interface Props {
  post: Awaited<PostWithId>;
  profile: Awaited<ReturnType<typeof getLinkedInBasicProfile>>;
}

type ScheduledPost = z.infer<typeof postSchema>;

export default function PlatformPageClient({ post, profile }: Props) {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [scheduledPost, setScheduledPost] = useState<ScheduledPost | null>(null);

  const previewPost = useCallback((post: ScheduledPost | null) => {
    if (post?.id) redirect(`${NavLink.Posts}/${post.id}`);
  }, []);

  return (
    <>
      <PostForm
        profile={profile}
        post={post}
        onPostScheduled={(post) => setScheduledPost(post)}
        onFocusModeChanged={(value: boolean) => setIsFocusMode(value)}
      />

      <Success
        profile={profile}
        post={scheduledPost}
        show={!!scheduledPost}
        onClose={() => previewPost(scheduledPost)}
      />

      <AnimatePresence>
        {isFocusMode ? (
          <motion.article
            className="absolute top-0 bottom-0 right-0 left-0 h-screen w-screen transition-opacity bg-slate-900 p-4 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-right">
              <button
                type="button"
                className="text-slate-500 cursor-pointer"
                onClick={() => setIsFocusMode(false)}
              >
                <IconX size={20} />
              </button>
            </div>
            <div className="w-full h-full md:w-6xl mx-auto">
              <textarea
                onChange={() => {}}
                placeholder="Distraction free typing here"
                className="text-xl md:text-2xl md:p-6 bg-slate-900 border-none field-sizing-content resize-none outline-none w-full text-slate-300"
              />
            </div>
          </motion.article>
        ) : null}
      </AnimatePresence>
    </>
  );
}
