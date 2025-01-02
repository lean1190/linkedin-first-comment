// import { UTCDate } from '@date-fns/utc';
// import Form from 'next/form';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { schedulePost } from '@/lib/posts/actions/schedule';

import { PostForm } from './components/post-form/post-form';

export default async function Platform() {
    // const schedule = async () => {
    //     // const time = form.get('time') as string;
    //     // const comment = form.get('comment') as string;
    //     // const runAt = new UTCDate(time);

    //     // await schedulePost({ urn, token });
    // };

    return (
        <article className="size-full">
            <PostForm />
            {/* <Form
                action={schedule}
                className="flex h-full flex-col items-center justify-center gap-6"
            >
                <Label htmlFor="time">Date and time</Label>
                <Input type="datetime-local" id="time" name="time" placeholder="Enter the time" />

                <Label htmlFor="comment">Comment</Label>
                <Textarea name="comment" id="comment" placeholder="📌 Your comment here" />

                <Button type="submit">Schedule</Button>
            </Form> */}
        </article>
    );
}
