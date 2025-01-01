import { EventSchemas, Inngest } from 'inngest';
import { encryptionMiddleware } from "@inngest/middleware-encryption";
import { postScheduledEvent } from './events';

const encryption = encryptionMiddleware({
    key: process.env.INNGEST_ENCRIPTION_KEY!,
});

export const inngest = new Inngest({
    id: 'first-comment',
    schemas: new EventSchemas().fromZod([
        postScheduledEvent
    ]),
    middleware: [encryption]
});
