'use client';

import { createPostAction } from '@/lib/posts/actions/create';
import { updatePostAction } from '@/lib/posts/actions/update';
import { useAction } from 'next-safe-action/hooks';
import { useDebouncedCallback } from 'use-debounce';
import type { z } from 'zod';
import { mapFormToAction } from '../map';
import type { formSchema } from '../schemas';

export default function useDraft() {
  const createDraftAction = useAction(createPostAction);
  const updateDraftAction = useAction(updatePostAction);

  const createDraft = useDebouncedCallback(
    ({
      postId,
      formData
    }: {
      postId?: string;
      formData: z.infer<typeof formSchema>;
    }) => {
      if (
        postId ||
        !formData.content ||
        createDraftAction.isPending ||
        createDraftAction.isExecuting
      ) {
        return;
      }

      console.log('---> Executing create...');
      return createDraftAction.execute({
        ...mapFormToAction(formData),
        status: 'draft'
      });
    },
    1000,
    { maxWait: 3000, leading: false }
  );

  const updateDraft = useDebouncedCallback(
    ({
      postId,
      formData,
      formState
    }: {
      postId?: string;
      formData: z.infer<typeof formSchema>;
      formState: { isSubmitting: boolean; isSubmitSuccessful: boolean };
    }) => {
      const formHasContent = !!formData.content;
      const userIsNotActive = !formState.isSubmitting && !formState.isSubmitSuccessful;
      console.log('---> Update callback', {
        postId,
        formHasContent,
        userIsNotActive,
        content: !!formData.content,
        sub: !formState.isSubmitting,
        subs: !formState.isSubmitSuccessful
      });
      if (postId && formHasContent && userIsNotActive) {
        console.log('---> Executing update...');
        return updateDraftAction.execute({
          ...mapFormToAction(formData),
          id: postId,
          status: 'draft'
        });
      }
    },
    4000,
    { maxWait: 6000, leading: false }
  );

  return {
    createDraft: { action: createDraftAction, func: createDraft },
    updateDraft: { action: updateDraftAction, func: updateDraft },
    isPending: createDraftAction.isPending || updateDraftAction.isPending,
    hasSucceeded: createDraftAction.hasSucceeded || updateDraftAction.hasSucceeded
  };
}
