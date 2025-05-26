'use client';

import { Modal, ModalBody, ModalContent, ModalTrigger } from '@/components/ui/animated-modal';
import type { getLinkedInBasicProfile } from '@/lib/linkedin/user/server';
import type { postSchema } from '@/lib/posts/schemas/post';
import { random } from '@/lib/random/number';
import Image from 'next/image';
import type { z } from 'zod';
import Author from '../author';
import { TimezoneLine } from '../timezone';
import { BackgroundGradient } from './background-gradient';

interface Props {
  profile: Awaited<ReturnType<typeof getLinkedInBasicProfile>>;
  post: z.infer<typeof postSchema> | null;
  show: boolean;
  onClose: VoidFunction;
}

const gif = random(1, 3);

export default function Success({ profile, post, show, onClose }: Props) {
  return (
    <article className="max-w-full sm:max-w-lg mx-auto">
      <Modal>
        <ModalTrigger forceOpen={show} className="pointer-events-none cursor-auto">
          <span />
        </ModalTrigger>
        <ModalBody onClose={onClose}>
          <BackgroundGradient className="rounded-3xl bg-white dark:bg-zinc-900">
            <ModalContent>
              <Author profile={profile} />

              <p className="mt-8 font-light text-base sm:text-xl text-black mb-2 dark:text-neutral-200">
                Your post and 🥇 comment have been scheduled 🥳🎉
              </p>

              {post?.scheduleUtc ? (
                <div className="text-sm text-linkedin-low-emphasis">
                  <span className="mr-1">It will be posted on</span>
                  <TimezoneLine schedule={post.scheduleUtc} className="inline" />
                </div>
              ) : null}

              {post?.reshareScheduleUtc ? (
                <div className="text-sm text-linkedin-low-emphasis">
                  <span className="mr-1">And reposted on</span>
                  <TimezoneLine schedule={post.reshareScheduleUtc} className="inline" />
                </div>
              ) : null}

              <div className="w-full max-h-96 h-80 relative mt-8">
                <Image
                  alt="Celebration Gif"
                  src={`/gifs/celebration${gif}.gif`}
                  fill={true}
                  sizes="(max-width: 640px) 295px, (min-width: 641px) 670px"
                />
              </div>
            </ModalContent>
          </BackgroundGradient>
        </ModalBody>
      </Modal>
    </article>
  );
}
