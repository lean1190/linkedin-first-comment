'use client';

import { Label } from '@radix-ui/react-label';
import { IconDeviceDesktop, IconDeviceMobile, IconFocusCentered } from '@tabler/icons-react';
import Image from 'next/image';
import { useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { ButtonBorderGradient } from '@/components/ui/button-border-gradient';
import { FormSeparator } from '@/components/ui/form-separator';
import { Input } from '@/components/ui/input';
import { LabelInputContainer } from '@/components/ui/label-input-container';
import { Textarea } from '@/components/ui/textarea';
import { formatDateForInput } from '@/lib/date/format';
import type { getLinkedInBasicProfile } from '@/lib/linkedin/user/server';
import type { PostWithId } from '@/lib/posts/database/types';
import type { postSchema } from '@/lib/posts/schemas/post';
import useWindowSize from '@/lib/screen/use-window-size';
import { useEffect, useState } from 'react';
import type { z } from 'zod';
import Author from '../author';
import Timezone from '../timezone';
import useDraft from './hooks/use-draft';
import usePostForm from './hooks/use-post-form';
import usePostStyles from './hooks/use-post-styles';
import type { ContainerViewport } from './types';

const focusEnabled = false;

interface Props {
  post: Awaited<PostWithId>;
  profile: Awaited<ReturnType<typeof getLinkedInBasicProfile>>;
  onPostScheduled: (post: z.infer<typeof postSchema>) => void;
  onFocusModeChanged: (value: boolean) => void;
}

export default function PostForm({ post, profile, onPostScheduled, onFocusModeChanged }: Props) {
  const [selectedViewport, setSelectedViewport] = useState<ContainerViewport>('desktop');

  const { isTiny: isTinyDevice } = useWindowSize();
  const { containerStyle, viewportStyle, statusLine } = usePostStyles(selectedViewport);
  const { createOrUpdateDraft, isPending, hasSucceeded, hasErrored } = useDraft();
  const { submitPost, scheduleValidation, submitPostError, form } = usePostForm({
    onPostScheduled
  });

  const {
    register,
    handleSubmit,
    setValue,
    trigger: validateForm,
    formState: { isSubmitting, isSubmitSuccessful, isValid }
  } = form;

  const formData = useWatch(form);

  useEffect(() => {
    if (isTinyDevice) {
      setSelectedViewport('mobile');
    }
  }, [isTinyDevice]);

  useEffect(() => {
    if (!post.id) {
      return;
    }

    setValue('id', post.id);
    if (post.content) setValue('content', post.content);
    if (post.comment) setValue('comment', post.comment);
    if (post.post_at_utc) setValue('schedule', formatDateForInput(post.post_at_utc));
    if (post.repost_at_utc) setValue('reshare', formatDateForInput(post.repost_at_utc));
    validateForm();
  }, [post, setValue, validateForm]);

  useEffect(() => {
    createOrUpdateDraft({
      formData,
      formState: { isSubmitting, isSubmitSuccessful }
    });
  }, [formData, isSubmitting, isSubmitSuccessful, createOrUpdateDraft]);

  return (
    <form onSubmit={handleSubmit(submitPost)} className={containerStyle}>
      <section className="w-full pt-3 pb-2 max-w-full justify-between items-center flex font-light text-linkedin-low-emphasis">
        <div className="mr-2">{statusLine({ isPending, hasSucceeded, hasErrored })}</div>

        <div className="hidden sm:flex items-center gap-1">
          {!focusEnabled ? null : (
            <Button size="xs" onClick={() => onFocusModeChanged(true)}>
              <IconFocusCentered size={20} />
              Focus
            </Button>
          )}
          <div
            className={viewportStyle('mobile')}
            onClick={() => setSelectedViewport('mobile')}
            onKeyDown={() => setSelectedViewport('mobile')}
          >
            <IconDeviceMobile size={20} />
          </div>
          <div
            className={viewportStyle('desktop')}
            onClick={() => setSelectedViewport('desktop')}
            onKeyDown={() => setSelectedViewport('desktop')}
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
            className={`transition-all min-w-0 ${selectedViewport === 'desktop' ? 'max-w-[485px]' : 'max-w-[339px]'}`}
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
        className={`${selectedViewport === 'desktop' ? 'flex-row gap-8' : 'flex-col gap-4'} flex transition-all`}
      >
        <LabelInputContainer className="w-full">
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

        <LabelInputContainer className="w-full">
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
          <Timezone schedule={formData.schedule} />
        </div>

        <ButtonBorderGradient type="submit" disabled={isSubmitting || !isValid}>
          {isSubmitting ? 'Scheduling...' : 'Schedule post and be #1'}
        </ButtonBorderGradient>
      </section>

      {submitPostError ? (
        <section className="mt-2 text-center w-full text-sm text-red-300">
          {submitPostError}
        </section>
      ) : null}
    </form>
  );
}
