import { getServerSession, getServerUser } from '@/lib/auth/session/server';
import { getLinkedInBasicProfile } from '@/lib/linkedin/user/server';

import PostForm from './components/post-form/post-form';

export default async function Platform() {
    const profile = await getLinkedInBasicProfile(await getServerSession(), await getServerUser());

    return (
        <article className="size-full">
            <PostForm profile={profile} />
        </article>
    );
}
