import { serve } from 'inngest/next';

import { inngest } from '@/lib/inngest/client';
import { publishPostEventHandler } from '@/lib/posts/handlers/publish';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [publishPostEventHandler]
});
