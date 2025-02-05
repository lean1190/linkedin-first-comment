import { encryptionMiddleware } from '@inngest/middleware-encryption';
import { EventSchemas, Inngest } from 'inngest';

import { postCanceledEvent } from '../posts/schemas/cancel';
import { postScheduledEvent } from '../posts/schemas/schedule';

const encryption = encryptionMiddleware({
  key: process.env.INNGEST_ENCRIPTION_KEY ?? ''
});

export const inngest = new Inngest({
  id: 'first-comment',
  schemas: new EventSchemas().fromZod([postScheduledEvent, postCanceledEvent]),
  middleware: [encryption]
});
