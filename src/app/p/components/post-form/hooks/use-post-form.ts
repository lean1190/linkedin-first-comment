'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { add, format } from 'date-fns';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { schedulePostAction } from '@/lib/posts/actions/schedule';
import type { z } from 'zod';
import { mapFormToAction } from '../lib/map';
import { formSchema } from '../schemas';

const formatForInput = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm");

export default function usePostForm() {
  const now = new Date();
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });
  const [scheduleValidation] = useState({
    min: formatForInput(now),
    max: formatForInput(add(now, { days: 7 }))
  });

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
