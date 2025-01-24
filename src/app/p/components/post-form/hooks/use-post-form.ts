'use client';

import { UTCDate } from '@date-fns/utc';
import { zodResolver } from '@hookform/resolvers/zod';
import { add, format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createOrUpdateDraftAction } from '@/lib/posts/actions/create';
import { schedulePostAction } from '@/lib/posts/actions/schedule';
import { useAction } from 'next-safe-action/hooks';

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

  const updateDraft = useAction(createOrUpdateDraftAction);

  useEffect(() => {
    const now = new Date();
    const formatForInput = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm");

    setScheduleValidation(() => ({
      min: formatForInput(now),
      max: formatForInput(add(now, { days: 7 }))
    }));
  }, []);

  const mapFormToAction = useCallback(
    ({ content, schedule, reshare, comment }: z.infer<typeof formSchema>) => ({
      content,
      scheduleUtc: new UTCDate(schedule).toISOString(),
      reshareScheduleUtc: reshare ? new UTCDate(reshare).toISOString() : undefined,
      comment
    }),
    []
  );

  const resetForm = useCallback(() => form.reset(), [form.reset]);

  const submitPost = useCallback(
    async (formData: z.infer<typeof formSchema>) => {
      const result = await schedulePostAction(mapFormToAction(formData));

      if (result?.serverError) {
        console.error(result?.serverError);
      }
    },
    [mapFormToAction]
  );

  return {
    submitPost,
    resetForm,
    mapFormToAction,
    updateDraft,
    scheduleValidation,
    form
  };
}
