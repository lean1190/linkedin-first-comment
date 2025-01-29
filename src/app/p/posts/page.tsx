import { getServerUser } from '@/lib/auth/session/server';
import { findPostsByAuthor } from '@/lib/posts/database/find';
import { hasId } from '@/lib/supabase/id';
import type { Tables } from '@/lib/supabase/types';
import clsx from 'clsx';
import { formatRelative } from 'date-fns';
import Link from 'next/link';

const statusBadgeStyles = (status: Tables<'Posts'>['status']) =>
  clsx(
    'border py-1 px-2 capitalize text-xs rounded',
    { 'border-gray-700': status === 'draft' },
    { 'border-blue-700': status === 'scheduled' },
    { 'border-green-700': status === 'posted' },
    { 'border-green-900': status === 'reposted' }
  );

export default async function PostsPage() {
  const user = await getServerUser();
  if (!hasId(user)) {
    throw Error('User needs an id');
  }

  const posts = await findPostsByAuthor(user.id);

  return (
    <article className="size-full mx-auto rounded-xl bg-[#1b1f23] p-8 w-full sm:max-w-screen-md">
      <h2 className="text-3xl mb-8">Your posts</h2>
      <section>
        {posts ? (
          <ul className="divide-y divide-gray-700">
            {posts.map((post) => (
              <li key={post.id} className="py-4 flex justify-between items-center gap-4">
                <div className="flex flex-col items-start gap-y-2 min-w-0 text-sm">
                  <div className="text-linkedin-low-emphasis">
                    Created {formatRelative(post.created_at, new Date())}{' '}
                  </div>
                  <div className="truncate max-w-full">{post.content}</div>
                </div>

                <div className="flex flex-col items-end gap-y-2 min-w-32">
                  <div className={`w-fit ${statusBadgeStyles(post.status)}`}>{post.status}</div>
                  {post.status === 'draft' ? (
                    <Link
                      href={`/p?id=${post.id}`}
                      className="text-sm group text-gray-200 hover:text-sky-600 transition ease-in-out duration-200"
                    >
                      Continue writing{' '}
                      <span
                        aria-hidden="true"
                        className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform ease-in-out duration-200"
                      >
                        →
                      </span>
                    </Link>
                  ) : null}
                </div>
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
