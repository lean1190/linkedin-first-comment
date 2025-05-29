'use client';
import { add } from 'date-fns';
import { useCallback, useContext, useState } from 'react';

import { formatDateForInput } from '@/lib/date/format';
import { schedulePostAction } from '@/lib/posts/actions/schedule';
import { handleServerActionResult } from '@/lib/server-actions/errors';
import { FormContext } from '../../context/form';
import type { FormPost, ScheduledPost } from '../../types';
import { PostFormActionError } from '../lib/errors';
import { mapFormToAction } from '../lib/map';

export default function usePostForm({
  onPostScheduled
}: {
  onPostScheduled: (post: ScheduledPost) => void;
}) {
  const form = useContext(FormContext);
  if (!form) throw new Error('The form cannot be null');

  const [submitPostError, setSubmitPostError] = useState<string>('');
  const now = new Date();
  const scheduleValidation = {
    min: formatDateForInput(now),
    max: formatDateForInput(add(now, { days: 7 }))
  };

  const submitPost = useCallback(
    async (formData: FormPost) => {
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
