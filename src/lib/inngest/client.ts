import { encryptionMiddleware } from '@inngest/middleware-encryption';
import { EventSchemas, Inngest } from 'inngest';
import { PostEvent } from '../posts/events';
import { postActivatedEvent } from '../posts/schemas/activated';
import { postCanceledEvent } from '../posts/schemas/canceled';
import { postScheduledEvent } from '../posts/schemas/scheduled';

const encryption = encryptionMiddleware({
  key: process.env.INNGEST_ENCRIPTION_KEY ?? ''
});

export const inngest = new Inngest({
  id: 'first-comment',
  schemas: new EventSchemas().fromSchema({
    [PostEvent.Scheduled]: postScheduledEvent,
    [PostEvent.Canceled]: postCanceledEvent,
    [PostEvent.Activated]: postActivatedEvent
  }),
  middleware: [encryption]
});
