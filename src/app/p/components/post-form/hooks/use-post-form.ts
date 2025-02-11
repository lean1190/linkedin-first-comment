'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { add } from 'date-fns';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { formatDateForInput } from '@/lib/date/format';
import { schedulePostAction } from '@/lib/posts/actions/schedule';
import { handleServerActionResult } from '@/lib/server-actions/errors';
import { redirect } from 'next/navigation';
import type { z } from 'zod';
import { NavLink } from '../../nav/items';
import { PostFormActionError } from '../lib/errors';
import { mapFormToAction } from '../lib/map';
import { formSchema } from '../schemas';

export default function usePostForm() {
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });
  const [submitPostError, setSubmitPostError] = useState<string>('');

  const now = new Date();
  const scheduleValidation = {
    min: formatDateForInput(now),
    max: formatDateForInput(add(now, { days: 7 }))
  };

  const resetForm = useCallback(() => {
    redirect(`${NavLink.Posts}/${form.getValues().id}`);
  }, [form.getValues]);

  const submitPost = useCallback(async (formData: z.infer<typeof formSchema>) => {
    try {
      handleServerActionResult(
        await schedulePostAction({
          ...mapFormToAction(formData),
          status: 'scheduled'
        })
      );
    } catch (_) {
      const error = new PostFormActionError();
      setSubmitPostError(error.message);
      throw error;
    }
  }, []);

  return {
    submitPost,
    resetForm,
    form,
    scheduleValidation,
    submitPostError
  };
}
