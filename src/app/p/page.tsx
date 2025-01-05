import { getServerSession, getServerUser } from '@/lib/auth/session/server';
import { getLinkedInBasicProfile } from '@/lib/linkedin/user/server';

import PostForm from './components/post-form/post-form';

export default async function Platform() {
    const session = await getServerSession();
    const user = await getServerUser();
    const profile = await getLinkedInBasicProfile(session, user);

    return (
        <article className="size-full">
            <PostForm profile={profile} />
        </article>
    );
}
