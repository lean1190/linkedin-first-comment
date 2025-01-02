import { serve } from 'inngest/next';

import { inngest } from '@/lib/inngest/client';
import { writePost } from '@/lib/posts/handlers/write';

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        writePost
    ]
});
