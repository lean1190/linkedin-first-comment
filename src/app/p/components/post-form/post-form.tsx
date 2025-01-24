'use client';

import { Label } from '@radix-ui/react-label';
import {
  type Icon,
  IconCircleCheck,
  IconDeviceDesktop,
  IconDeviceMobile,
  type IconProps,
  IconRefresh
} from '@tabler/icons-react';
import Image from 'next/image';

import { FormSeparator } from '@/components/ui/form-separator';
import { Input } from '@/components/ui/input';
import { LabelInputContainer } from '@/components/ui/label-input-container';
import { Textarea } from '@/components/ui/textarea';
import type { getLinkedInBasicProfile } from '@/lib/linkedin/user/server';

import { ButtonBorderGradient } from '@/components/ui/button-border-gradient';
import { createOrUpdateDraftAction } from '@/lib/posts/actions/create';
import { type ForwardRefExoticComponent, type RefAttributes, useEffect, useState } from 'react';
import Author from './components/author';
import Success from './components/success/success';
import Timezone from './components/timezone';
import usePostForm from './hooks/use-post-form';
import useStyles from './hooks/use-styles';
import type { FormViewport } from './types';

interface Props {
  profile: Awaited<ReturnType<typeof getLinkedInBasicProfile>>;
}

export default function PostForm({ profile }: Props) {
  const [selectedViewport, setSelectedViewport] = useState<FormViewport>('desktop');
  const { formStyle, viewportStyle, statusLine } = useStyles(selectedViewport);
  const { submitPost, resetForm, mapFormToAction, updateDraft, scheduleValidation, form } =
    usePostForm();

  const {
    watch,
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, isValid }
  } = form;

  const formData = watch();

  useEffect(() => {
    if (isValid && !isSubmitting && !isSubmitSuccessful && updateDraft.isIdle) {
      console.log('---> running effect');
      // updateDraft.execute(mapFormToAction(formData));
    }
  }, [
    // formData,
    isValid,
    isSubmitting,
    isSubmitSuccessful,
    // updateDraft.execute,
    updateDraft.isIdle
    // mapFormToAction
  ]);

  return (
    <>
      <form onSubmit={handleSubmit(submitPost)} className={formStyle}>
        <section className="w-full pt-3 pb-2 max-w-full justify-between items-center flex font-light text-linkedin-low-emphasis">
          <div className="mr-2">{statusLine(updateDraft)}</div>

          <div className="flex items-center gap-1">
            <div className={viewportStyle('mobile')} onClick={() => setSelectedViewport('mobile')}>
              <IconDeviceMobile size={20} />
            </div>
            <div
              className={viewportStyle('desktop')}
              onClick={() => setSelectedViewport('desktop')}
            >
              <IconDeviceDesktop size={20} />
            </div>
          </div>
        </section>

        <section className="mb-2 pr-9">
          <Author profile={profile} />
        </section>

        <section className="text-sm relative">
          <Textarea
            {...register('content')}
            placeholder="Write your post here"
            required
            disabled={isSubmitting}
          />
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
              className={`transition-all ${selectedViewport === 'desktop' ? 'max-w-[485px]' : 'max-w-[339px]'}`}
            >
              <Author profile={profile} size="sm" showTime={false} />
            </div>
            <div className="flex items-center gap-2 text-xs font-light text-linkedin-low-emphasis">
              <span>1s</span>
              <span className="text-sm">•••</span>
            </div>
          </div>
          <LabelInputContainer className="pl-9">
            <Textarea
              {...register('comment')}
              placeholder="📌 Your 1st comment goes here"
              required
              disabled={isSubmitting}
            />
          </LabelInputContainer>
        </section>

        <FormSeparator size="lg" />

        <section
          className={`${selectedViewport === 'desktop' ? 'flex-row gap-8' : 'flex-col'} flex transition-all`}
        >
          <LabelInputContainer className="mb-4 w-full">
            <Label htmlFor="schedule" className="text-sm">
              Publish post at
            </Label>
            <Input
              id="schedule"
              {...register('schedule')}
              type="datetime-local"
              required
              disabled={isSubmitting}
              min={scheduleValidation.min || undefined}
              max={scheduleValidation.max || undefined}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4 w-full">
            <Label htmlFor="repost" className="text-sm text-linkedin-low-emphasis">
              Repost at (optional)
            </Label>
            <Input
              id="repost"
              {...register('reshare')}
              type="datetime-local"
              disabled={isSubmitting}
              min={formData.schedule || undefined}
              max={scheduleValidation.max || undefined}
            />
          </LabelInputContainer>
        </section>

        <FormSeparator size="lg" />

        <section className="flex flex-col items-center">
          <div className="mx-auto mb-4 w-fit">
            <Timezone schedule={formData.schedule} viewport={selectedViewport} />
          </div>

          <ButtonBorderGradient type="submit" disabled={isSubmitting || !isValid}>
            {isSubmitting ? 'Scheduling...' : 'Schedule post and be #1'}
          </ButtonBorderGradient>
        </section>
      </form>

      <Success profile={profile} post={formData} show={isSubmitSuccessful} onClose={resetForm} />
    </>
  );
}
