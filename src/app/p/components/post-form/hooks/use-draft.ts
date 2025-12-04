'use client';

import { useAction } from 'next-safe-action/hooks';
import { useDebouncedCallback } from 'use-debounce';
import type { z } from 'zod';
import { createOrUpdatePostAction } from '@/lib/posts/actions/create-or-update';
import { mapFormToAction } from '../lib/map';
import { draftFormIsValid } from '../lib/validation';
import type { formSchema } from '../schemas';

export default function useDraft() {
  const createOrUpdateDraftAction = useAction(createOrUpdatePostAction);

  const createOrUpdateDraft = useDebouncedCallback(
    ({
      formData,
      formState
    }: {
      formData: Partial<z.infer<typeof formSchema>>;
      formState: { isSubmitting: boolean; isSubmitSuccessful: boolean };
    }) => {
      const userIsNotActive = !formState.isSubmitting && !formState.isSubmitSuccessful;

      if (draftFormIsValid(formData) && userIsNotActive) {
        return createOrUpdateDraftAction.execute({
          ...mapFormToAction(formData),
          status: 'draft'
        });
      }
    },
    1000,
    { maxWait: 2000, leading: false }
  );

  return {
    createOrUpdateDraft,
    isPending: createOrUpdateDraftAction.isPending,
    hasSucceeded: createOrUpdateDraftAction.hasSucceeded,
    hasErrored: createOrUpdateDraftAction.hasErrored
  };
}
