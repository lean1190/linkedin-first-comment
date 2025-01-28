import type { PostgrestError } from '@supabase/supabase-js';

export function handleDatabaseResponse<T>({
  data,
  error
}: {
  data: T;
  error: PostgrestError | null;
}) {
  if (error) {
    console.error('---> ERROR:Database', error);
    throw error;
  }

  return data;
}
