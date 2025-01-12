import { serve } from 'inngest/next';

import { inngest } from '@/lib/inngest/client';
import { writePostEventHandler } from '@/lib/posts/handlers/write';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [writePostEventHandler]
});
