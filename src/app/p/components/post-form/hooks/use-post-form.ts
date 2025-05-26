'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { add } from 'date-fns';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { formatDateForInput } from '@/lib/date/format';
import { schedulePostAction } from '@/lib/posts/actions/schedule';
import type { postSchema } from '@/lib/posts/schemas/post';
import { handleServerActionResult } from '@/lib/server-actions/errors';
import type { z } from 'zod';
import { PostFormActionError } from '../lib/errors';
import { mapFormToAction } from '../lib/map';
import { formSchema } from '../schemas';

export default function usePostForm({
  onPostScheduled
}: {
  onPostScheduled: (post: z.infer<typeof postSchema>) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });
  const [submitPostError, setSubmitPostError] = useState<string>('');

  const now = new Date();
  const scheduleValidation = {
    min: formatDateForInput(now),
    max: formatDateForInput(add(now, { days: 7 }))
  };

  const submitPost = useCallback(
    async (formData: z.infer<typeof formSchema>) => {
      try {
        const post = {
          ...mapFormToAction(formData),
          status: 'scheduled' as const
        };
        handleServerActionResult(await schedulePostAction(post));
        onPostScheduled(post);
      } catch (_) {
        const error = new PostFormActionError();
        setSubmitPostError(error.message);
        throw error;
      }
    },
    [onPostScheduled]
  );

  return {
    submitPost,
    form,
    scheduleValidation,
    submitPostError
  };
}
