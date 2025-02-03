import { pageContainerWidthDesktop, pageContainerWidthMobile } from '@/app/constants/containers';
import { ArrowButton } from '@/components/ui/arrow-button';
import { getServerUser } from '@/lib/auth/session/server';
import { findPostsByAuthor } from '@/lib/posts/database/find';
import { hasId } from '@/lib/supabase/id';
import type { Tables } from '@/lib/supabase/types';
import clsx from 'clsx';
import { formatRelative } from 'date-fns';
import Link from 'next/link';
import { NavLink } from '../components/nav/items';

const statusBadgeStyles = (status: Tables<'Posts'>['status']) =>
  clsx(
    'border py-1 px-2 capitalize text-xs rounded-full',
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
    <article
      className={`size-full mx-auto rounded-xl bg-[#1b1f23] p-8 w-full ${pageContainerWidthMobile} ${pageContainerWidthDesktop}`}
    >
      <h2 className="text-3xl mb-8">{!posts?.length ? 'No posts yet' : 'Your posts'}</h2>
      <section>
        {posts?.length ? (
          <ul className="divide-y divide-gray-700">
            {posts.map((post) => (
              <li key={post.id} className="py-4">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <div className="flex flex-col items-start gap-y-2 min-w-0 text-sm">
                    <div className="text-linkedin-low-emphasis">
                      Created {formatRelative(post.created_at, new Date())}{' '}
                    </div>
                    <div className="truncate max-w-full">{post.content}</div>
                  </div>

                  <div className={`w-fit ${statusBadgeStyles(post.status)}`}>{post.status}</div>
                </div>

                {post.status === 'draft' ? (
                  <Link href={`${NavLink.Platform}?id=${post.id}`}>
                    <ArrowButton text="Continue writing" />
                  </Link>
                ) : (
                  <Link href={`${NavLink.Posts}/${post.id}`}>
                    <ArrowButton text="Read" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <Link href="/p">
            <ArrowButton text="Start writing" />
          </Link>
        )}
      </section>
    </article>
  );
}
