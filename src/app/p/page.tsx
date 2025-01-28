import { getServerSession, getServerUser } from '@/lib/auth/session/server';
import { getLinkedInBasicProfile } from '@/lib/linkedin/user/server';

import { findPostById } from '@/lib/posts/database/find';
import { newId } from '@/lib/supabase/id';
import type { ServerSearchParams } from '@/lib/types';
import PostForm from './components/post-form/post-form';

export default async function PlatformPage({
  searchParams
}: {
  searchParams: Promise<ServerSearchParams>;
}) {
  const profile = await getLinkedInBasicProfile(await getServerSession(), await getServerUser());
  const postId = (await searchParams).id as string;

  const post = {
    id: postId ?? newId(),
    ...(postId ? await findPostById(postId) : {})
  };

  return (
    <article className="size-full">
      <PostForm profile={profile} post={post} />
    </article>
  );
}
