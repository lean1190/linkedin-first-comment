import { serve } from 'inngest/next';

import { inngest } from '@/lib/inngest/client';
import { writeComment } from '@/lib/inngest/functions/comment';
import { helloWorld } from '@/lib/inngest/functions/hello';

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        helloWorld,
        writeComment
    ]
});
