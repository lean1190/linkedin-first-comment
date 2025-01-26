'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { add, format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { schedulePostAction } from '@/lib/posts/actions/schedule';
import type { z } from 'zod';
import { mapFormToAction } from '../map';
import { formSchema } from '../schemas';

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

  const resetForm = useCallback(() => form.reset(), [form.reset]);

  const submitPost = useCallback(async (formData: z.infer<typeof formSchema>) => {
    const result = await schedulePostAction({
      ...mapFormToAction(formData),
      status: 'scheduled'
    });

    if (result?.serverError) {
      console.error(result?.serverError);
    }
  }, []);

  return {
    submitPost,
    resetForm,
    form,
    scheduleValidation
  };
}
