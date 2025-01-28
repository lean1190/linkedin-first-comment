import { getServerUser } from '@/lib/auth/session/server';
import { findPostsByAuthor } from '@/lib/posts/database/find';
import { hasId } from '@/lib/supabase/id';
import { formatRelative } from 'date-fns';
import Link from 'next/link';

export default async function PostsPage() {
  const user = await getServerUser();
  if (!hasId(user)) {
    throw Error('User needs an id');
  }

  const posts = await findPostsByAuthor(user?.id);

  return (
    <article className="size-full mx-auto rounded-xl bg-[#1b1f23] p-8 w-full sm:max-w-screen-md">
      <h2 className="text-3xl mb-8">Your posts</h2>
      <section>
        {posts ? (
          <ul className="divide-y divide-gray-700">
            {posts.map((post) => (
              <li key={post.id} className="py-4 flex justify-between items-center gap-4">
                <div>
                  <div className="text-linkedin-low-emphasis text-sm">
                    Created {formatRelative(post.created_at, new Date())} - {post.status}
                  </div>
                  <div className="truncate">{post.content}</div>
                </div>
                {post.status === 'draft' ? (
                  <Link href={`/p?id=${post.id}`} className="text-sm">
                    Continue writing
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          'No posts yet'
        )}
      </section>
    </article>
  );
}
