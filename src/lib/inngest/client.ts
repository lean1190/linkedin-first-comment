import { encryptionMiddleware } from '@inngest/middleware-encryption';
import { EventSchemas, Inngest } from 'inngest';

import { postActivatedEvent } from '../posts/schemas/activated';
import { postCanceledEvent } from '../posts/schemas/canceled';
import { postScheduledEvent } from '../posts/schemas/scheduled';

const encryption = encryptionMiddleware({
  key: process.env.INNGEST_ENCRIPTION_KEY ?? ''
});

export const inngest = new Inngest({
  id: 'first-comment',
  schemas: new EventSchemas().fromZod([postScheduledEvent, postCanceledEvent, postActivatedEvent]),
  middleware: [encryption]
});
