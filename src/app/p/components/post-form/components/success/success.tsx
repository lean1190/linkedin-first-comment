'use client';

import { Modal, ModalBody, ModalContent, ModalTrigger } from '@/components/ui/animated-modal';
import type { getLinkedInBasicProfile } from '@/lib/linkedin/user/server';
import { random } from '@/lib/random/number';
import Image from 'next/image';
import React from 'react';
import type { z } from 'zod';
import type { formSchema } from '../../hooks/use-post-form';
import Author from '../author';
import { TimezoneLine } from '../timezone';
import { BackgroundGradient } from './background-gradient';

interface Props {
  profile: Awaited<ReturnType<typeof getLinkedInBasicProfile>>;
  post: z.infer<typeof formSchema>;
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

              {post?.schedule ? (
                <div className="text-sm text-linkedin-low-emphasis flex items-center gap-1">
                  It will be posted on
                  <TimezoneLine schedule={post.schedule} showLocation={false} />
                </div>
              ) : null}

              {post?.reshare ? (
                <div className="text-sm text-linkedin-low-emphasis flex items-center gap-1">
                  And reposted on
                  <TimezoneLine schedule={post.reshare} showLocation={false} />
                </div>
              ) : null}

              <div className="w-full max-h-96 h-80 relative mt-8">
                <Image alt="Celebration Gif" src={`/gifs/celebration${gif}.gif`} fill={true} />
              </div>
            </ModalContent>
          </BackgroundGradient>
        </ModalBody>
      </Modal>
    </article>
  );
}
