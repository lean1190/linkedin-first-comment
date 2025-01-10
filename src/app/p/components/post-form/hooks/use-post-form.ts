'use client';

import { UTCDate } from '@date-fns/utc';
import clsx from 'clsx';
import { add, format } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { z } from 'zod';

import { schedulePost } from '@/lib/posts/actions/schedule';

import { FormViewport } from '../types';

export const formSchema = z.object({
    content: z.string(),
    schedule: z.string(),
    reshare: z.string().optional(),
    comment: z.string()
}).required();

export default function usePostForm() {
    const [scheduleLimits, setScheduleLimits] = useState({ min: '', max: '' });

    useEffect(() => {
        const now = new Date();
        const formatForInput = (date: Date) => format(date, 'yyyy-MM-dd\'T\'HH:mm');
        setScheduleLimits(() => ({
            min: formatForInput(now),
            max: formatForInput(add(now, { days: 7 }))
        }));
    }, []);

    const [selectedViewport, setSelectedViewport] = useState<FormViewport>('desktop');

    const submitPost = useCallback(({
        content,
        schedule,
        reshare,
        comment
    }: z.infer<typeof formSchema>) => schedulePost({
        content,
        scheduleUtc: new UTCDate(schedule).toISOString(),
        reshareScheduleUtc: reshare ? new UTCDate(reshare).toISOString() : undefined,
        comment
    }), []);

    const viewportStyle = useCallback((viewport: FormViewport) => clsx(
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

    return {
        formStyle,
        submitPost,
        viewportStyle,
        selectedViewport,
        setSelectedViewport,
        scheduleValidation: scheduleLimits
    };
}
