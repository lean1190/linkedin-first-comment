import { getServerSession, getServerUser } from '@/lib/auth/session/server';
import { getLinkedInBasicProfile } from '@/lib/linkedin/user/server';
import { findPostById } from '@/lib/posts/database/find';
import { isDraftPost, isReadyPost } from '@/lib/posts/validations';
import { redirect } from 'next/navigation';
import { NavLink } from '../../components/nav/items';
import Post from './components/post';

export default async function ReadPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const profile = await getLinkedInBasicProfile(await getServerSession(), await getServerUser());
  const postId = (await params).id as string;
  const post = await findPostById(postId);

  if (!isReadyPost(post) && !isDraftPost(post)) {
    redirect(NavLink.Posts);
  }

  return <Post post={post} profile={profile} />;
}
