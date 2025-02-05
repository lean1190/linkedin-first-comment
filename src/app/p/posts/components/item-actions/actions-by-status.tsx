'use client';

import { NavLink } from '@/app/p/components/nav/items';
import { cancelPostAction } from '@/lib/posts/actions/cancel';
import { deletePostAction } from '@/lib/posts/actions/delete';
import { postNowAction } from '@/lib/posts/actions/post-now';
import type { Post } from '@/lib/posts/database/types';
import { IconBook, IconPencil, IconSend2, IconTrashX } from '@tabler/icons-react';
import { useAction } from 'next-safe-action/hooks';
import Link from 'next/link';
import useActionStyles from './hooks/use-styles';

interface Props {
  post: Post;
}

export default function ActionsByStatus({ post }: Props) {
  const { actionStyles, onlyActionStyles, linkStyles } = useActionStyles();
  const { execute: deletePost } = useAction(deletePostAction);
  const { execute: cancelPost } = useAction(cancelPostAction);
  const { execute: postNow } = useAction(postNowAction);

  if (post.status === 'draft') {
    return (
      <>
        <li className={actionStyles}>
          <Link href={`${NavLink.Platform}?id=${post.id}`} className={linkStyles}>
            <IconPencil size={18} /> Edit draft
          </Link>
        </li>
        <li onClick={() => deletePost(post.id)} className={onlyActionStyles}>
          <IconTrashX size={18} /> Delete draft
        </li>
      </>
    );
  }

  if (post.status === 'scheduled') {
    return (
      <>
        <li className={actionStyles}>
          <Link href={`${NavLink.Posts}/${post.id}`} className={linkStyles}>
            <IconBook size={18} /> Read
          </Link>
        </li>
        <li onClick={() => cancelPost(post.id)} className={onlyActionStyles}>
          <IconSend2 size={18} /> Post now
        </li>
        <li onClick={() => postNow(post.id)} className={onlyActionStyles}>
          <IconTrashX size={18} /> Cancel post
        </li>
      </>
    );
  }

  return (
    <>
      {/* https://www.linkedin.com/feed/update/urn:li:activity:7289552774831181825 */}
      <li className={actionStyles}>
        <Link href={`${NavLink.Posts}/${post.id}`} className={linkStyles}>
          <IconBook size={18} /> Read on LinkedIn
        </Link>
      </li>
    </>
  );
}
