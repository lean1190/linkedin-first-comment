import { getServerSession, getServerUser } from '@/lib/auth/session/server';
import { getLinkedInBasicProfile } from '@/lib/linkedin/user/server';

import type { ServerSearchParams } from '@/lib/types';
import PostForm from './components/post-form/post-form';

export default async function PlatformPage({
  searchParams
}: {
  searchParams: Promise<ServerSearchParams>;
}) {
  const profile = await getLinkedInBasicProfile(await getServerSession(), await getServerUser());
  // const postId = (await searchParams).postId;
  // Get post from database and pass it to the form

  return (
    <article className="size-full">
      <PostForm profile={profile} />
    </article>
  );
}
