'use client';

import { ButtonBorderGradient } from '@/components/ui/button-border-gradient';
import type { getLinkedInBasicProfile } from '@/lib/linkedin/user/server';
import { redirect } from 'next/navigation';
import React from 'react';
import type { z } from 'zod';
import type { formSchema } from '../components/post-form/hooks/use-post-form';
import { BackgroundGradient } from './background-gradient';

interface Props {
  profile: Awaited<ReturnType<typeof getLinkedInBasicProfile>>;
  post: z.infer<typeof formSchema>;
}

export default function Success({ profile, post }: Props) {
  return (
    <article className="max-w-full sm:max-w-lg mx-auto">
      <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <p className="text-base sm:text-xl font-bold text-black mt-4 mb-2 dark:text-neutral-200">
          Your post has been scheduled
        </p>
        <p>You can relax now</p>

        <p className="mb-8 text-sm text-linkedin-low-emphasis">
          The Air Jordan 4 Retro Reimagined Bred will release on Saturday, February 17, 2024. Your
          best opportunity to get these right now is by entering raffles and waiting for the
          official releases.
        </p>

        <ButtonBorderGradient type="button" onClick={() => redirect('/p')}>
          Cool! Let's write another one
        </ButtonBorderGradient>
      </BackgroundGradient>
    </article>
  );
}
