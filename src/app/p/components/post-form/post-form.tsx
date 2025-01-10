'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { IconDeviceDesktop, IconDeviceMobile } from '@tabler/icons-react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { BottomGradient } from '@/components/ui/bottom-gradient';
import { FormSeparator } from '@/components/ui/form-separator';
import { Input } from '@/components/ui/input';
import { LabelInputContainer } from '@/components/ui/label-input-container';
import { Textarea } from '@/components/ui/textarea';
import { getLinkedInBasicProfile } from '@/lib/linkedin/user/server';

import Author from './author';
import usePostForm, { formSchema } from './hooks/use-post-form';
import Timezone from './timezone';

interface Props {
    profile: Awaited<ReturnType<typeof getLinkedInBasicProfile>>;
}

export default function PostForm({ profile }: Props) {
    const {
        formStyle,
        viewportStyle,
        submitPost,
        selectedViewport,
        setSelectedViewport,
        scheduleValidation
    } = usePostForm();

    const {
        register,
        handleSubmit,
        watch,
        formState: { isSubmitting }
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });

    return (
        <form onSubmit={handleSubmit(submitPost)} className={formStyle}>
            <section className="absolute right-4 top-2 flex gap-1 font-light text-linkedin-low-emphasis">
                <span className={viewportStyle('mobile')} onClick={() => setSelectedViewport('mobile')}>
                    <IconDeviceMobile size={20} />
                </span>
                <span className={viewportStyle('desktop')} onClick={() => setSelectedViewport('desktop')}>
                    <IconDeviceDesktop size={20} />
                </span>
            </section>

            <section className="mb-2 pr-9">
                <Author profile={profile} />
            </section>

            <section className="text-sm">
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
                <div className="text-xs font-light text-linkedin-low-emphasis">215 comments • 19 reposts</div>
            </section>

            <FormSeparator size="sm" />

            <section className="w-full pr-4">
                <div className="mb-2 flex items-start justify-between">
                    <div className={`transition-all ${selectedViewport === 'desktop' ? 'max-w-[485px]' : 'max-w-[339px]'}`}>
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

            <section className={`${selectedViewport === 'desktop' ? 'flex-row gap-8' : 'flex-col'} flex transition-all`}>
                <LabelInputContainer className="mb-4 w-full">
                    <Label htmlFor="schedule" className="text-sm">Publish post at</Label>
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
                    <Label htmlFor="repost" className="text-sm text-linkedin-low-emphasis">Repost at (optional)</Label>
                    <Input
                        id="repost"
                        {...register('reshare')}
                        type="datetime-local"
                        disabled={isSubmitting}
                        min={scheduleValidation.min || undefined}
                        max={scheduleValidation.max || undefined}
                    />
                </LabelInputContainer>
            </section>

            <FormSeparator size="lg" />

            <section>
                <div className="mx-auto mb-4 w-fit">
                    <Timezone schedule={watch('schedule')} viewport={selectedViewport} />
                </div>
                <button
                    className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                    disabled={isSubmitting}
                >
                    <strong>{isSubmitting ? 'Scheduling...' : 'Schedule post and be #1'}</strong>
                    <BottomGradient />
                </button>
            </section>
        </form>
    );
}
