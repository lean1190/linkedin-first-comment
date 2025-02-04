import { getServerUser } from '@/lib/auth/session/server';
import { pageContainerWidthDesktop, pageContainerWidthMobile } from '@/lib/constants/containers';
import { findPostsByAuthor } from '@/lib/posts/database/find';
import { hasId } from '@/lib/supabase/id';
import NoPosts from './components/no-posts';
import PostItem from './components/post-item';

export default async function PostsPage() {
  const user = await getServerUser();
  if (!hasId(user)) {
    throw Error('User needs an id');
  }

  const posts = await findPostsByAuthor(user.id);

  return (
    <article
      className={`size-full mx-auto rounded-xl bg-[#1b1f23] p-8 w-full ${pageContainerWidthMobile} ${pageContainerWidthDesktop}`}
    >
      <h2 className="text-3xl mb-8">{!posts?.length ? 'No posts yet' : 'Your posts'}</h2>
      <section>
        {posts?.length ? (
          <ul className="divide-y divide-gray-700">
            {posts.map((post) => (
              <li key={post.id} className="py-4">
                <PostItem post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <NoPosts />
        )}
      </section>
    </article>
  );
}
