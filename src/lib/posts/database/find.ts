'use server';

import { handleDatabaseResponse } from '@/lib/supabase/response-handler';
import { createClient } from '@/lib/supabase/server';

export async function findPostById(id: string) {
  const result = await (await createClient()).from('Posts').select().eq('id', id);

  const posts = handleDatabaseResponse(result);

  return posts?.[0];
}
