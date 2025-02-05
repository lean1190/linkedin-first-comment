import { serve } from 'inngest/next';

import { inngest } from '@/lib/inngest/client';
import { activatePostEventHandler } from '@/lib/posts/handlers/activate';
import { schedulePostEventHandler } from '@/lib/posts/handlers/schedule';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [schedulePostEventHandler, activatePostEventHandler]
});
