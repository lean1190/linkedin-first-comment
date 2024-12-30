'use client';

// import { UTCDate } from '@date-fns/utc';
import Form from 'next/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { scheduleComment } from '@/lib/comments/schedule';
// import { inngest } from '@/lib/inngest/client';
import { supabaseClient } from '@/lib/supabase/client';

export default function Platform() {
    const schedule = async () => {
        // const time = form.get('time') as string;
        // const comment = form.get('comment') as string;
        // const runAt = new UTCDate(time);

        const { data } = await supabaseClient.auth.getSession();
        const authorId = data.session?.user?.identities?.[0].id ?? '';
        const urn = encodeURI(`urn:li:person:${authorId}`);
        const token = data?.session?.provider_token ?? '';
        console.log('---> user', { data, urn, token });
        await scheduleComment({ urn, token });

        // await inngest.send({
        //     name: "app/comment.triggered",
        //     data: {
        //         session: data,
        //         comment,
        //         runAt
        //     },
        //     user: {
        //         external_id: data.session?.user?.id,
        //         email: data.session?.user?.email,
        //     }
        // })
    };

    return (
        <article className="size-full">
            <Form
                action={schedule}
                className="flex h-full flex-col items-center justify-center gap-6"
            >
                <Label htmlFor="time">Date and time</Label>
                <Input type="datetime-local" id="time" name="time" placeholder="Enter the time" />

                <Label htmlFor="comment">Comment</Label>
                <Textarea name="comment" id="comment" placeholder="📌 Your comment here" />

                <Button type="submit">Schedule</Button>
            </Form>
        </article>
    );
}
