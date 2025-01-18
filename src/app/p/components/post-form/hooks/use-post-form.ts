'use client';

import { UTCDate } from '@date-fns/utc';
import { add, format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { z } from 'zod';

import { schedulePost } from '@/lib/posts/actions/schedule';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const formSchema = z
  .object({
    content: z.string().nonempty(),
    schedule: z.string().nonempty(),
    reshare: z.string().optional(),
    comment: z.string().nonempty()
  })
  .required();

export default function usePostForm() {
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });
  const [scheduleValidation, setScheduleValidation] = useState({ min: '', max: '' });

  useEffect(() => {
    const now = new Date();
    const formatForInput = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm");

    setScheduleValidation(() => ({
      min: formatForInput(now),
      max: formatForInput(add(now, { days: 7 }))
    }));
  }, []);

  const submitPost = useCallback(
    async ({ content, schedule, reshare, comment }: z.infer<typeof formSchema>) => {
      try {
        const result = await schedulePost({
          content,
          scheduleUtc: new UTCDate(schedule).toISOString(),
          reshareScheduleUtc: reshare ? new UTCDate(reshare).toISOString() : undefined,
          comment
        });
        form.reset();
        console.log('---> Action result', result);
      } catch (error) {
        console.error('---> Action error', error);
      }
    },
    [form.reset]
  );

  return { submitPost, scheduleValidation, form };
}
