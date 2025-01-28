import { hasId } from '@/lib/supabase/id';
import type { z } from 'zod';
import type { formSchema } from '../schemas';
import type { FormDraftPost } from '../types';

export function draftFormIsValid(
  formData: Partial<z.infer<typeof formSchema>>
): formData is FormDraftPost {
  return hasId(formData) && !!formData.content;
}
