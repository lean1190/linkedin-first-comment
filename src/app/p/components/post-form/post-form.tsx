'use client';

import { UTCDate } from '@date-fns/utc';
import { Label } from '@radix-ui/react-label';
import { IconDeviceDesktop, IconDeviceMobile } from '@tabler/icons-react';
import clsx from 'clsx';
import Image from 'next/image';
import { useActionState, useCallback, useMemo, useState } from 'react';

import { BottomGradient } from '@/components/ui/bottom-gradient';
import { FormSeparator } from '@/components/ui/form-separator';
import { Input } from '@/components/ui/input';
import { LabelInputContainer } from '@/components/ui/label-input-container';
import { Textarea } from '@/components/ui/textarea';
import { getLinkedInBasicProfile } from '@/lib/linkedin/user/server';
import { schedulePost } from '@/lib/posts/actions/schedule';
import { PostEvent } from '@/lib/posts/events/types';

import Author from './author';

interface Props {
    profile: Awaited<ReturnType<typeof getLinkedInBasicProfile>>;
}
type Viewport = 'mobile' | 'desktop';

export default function PostForm({ profile }: Props) {
    const [selectedViewport, setSelectedViewport] = useState<Viewport>('desktop');

    const viewportStyle = useCallback((viewport: Viewport) => clsx(
        'cursor-pointer rounded p-1 transition',
        'hover:bg-neutral-600',
        { 'bg-black': viewport === selectedViewport }
    ), [selectedViewport]);

    const formStyle = useMemo(() => clsx(
        'relative mx-auto rounded-xl bg-[#1b1f23] px-4 py-6 transition-all',
        {
            'max-w-[555px]': selectedViewport === 'desktop',
            'max-w-[409px]': selectedViewport === 'mobile'
        }
    ), [selectedViewport]);

    const submitPost = useCallback(async (_: void | null, form: FormData) => {
        const schedule = {
            name: PostEvent.Scheduled,
            data: {
                author: {},
                post: {
                    content: form.get('content') as string,
                    scheduleUtc: new UTCDate(form.get('schedule') as string).toISOString(),
                    repostScheduleUtc: new UTCDate(form.get('repost') as string).toISOString()
                },
                comment: {
                    content: form.get('comment') as string
                }
            }
        };

        console.log('----> form', _, form, schedule);

        schedulePost(schedule);
    }, []);

    const [, formAction, pending] = useActionState(submitPost, null);

    return (
        <form action={formAction} className={formStyle}>
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
                <Textarea name="content" placeholder="Write your post here" required disabled={pending} />
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
                    <Textarea name="comment" placeholder="📌 Your 1st comment goes here" required disabled={pending} />
                </LabelInputContainer>
            </section>

            <FormSeparator size="lg" />

            <section className={`${selectedViewport === 'desktop' ? 'flex-row gap-8' : 'flex-col'} flex transition-all`}>
                <LabelInputContainer className="mb-4 w-full">
                    <Label htmlFor="schedule" className="text-sm">Publish post at</Label>
                    <Input id="schedule" name="schedule" type="datetime-local" required disabled={pending} />
                </LabelInputContainer>

                <LabelInputContainer className="mb-4 w-full">
                    <Label htmlFor="repost" className="text-sm text-linkedin-low-emphasis">Repost at (optional)</Label>
                    <Input id="repost" name="repost" type="datetime-local" disabled={pending} />
                </LabelInputContainer>
            </section>

            <FormSeparator size="lg" />

            <section>
                <button
                    className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                    disabled={pending}
                >
                    <strong>{pending ? 'Scheduling...' : 'Schedule post and be #1'}</strong>
                    <BottomGradient />
                </button>
            </section>
        </form>
    );
}
