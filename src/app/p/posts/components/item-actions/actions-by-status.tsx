'use client';

import { NavLink } from '@/app/p/components/nav/items';
import { deletePostAction } from '@/lib/posts/actions/delete';
import type { Post } from '@/lib/posts/database/types';
import { IconBook, IconPencil, IconTrashX } from '@tabler/icons-react';
import { useAction } from 'next-safe-action/hooks';
import Link from 'next/link';
import useActionStyles from './hooks/use-styles';

interface Props {
  post: Post;
}

export default function ActionsByStatus({ post }: Props) {
  const { actionStyles, onlyActionStyles, linkStyles } = useActionStyles();
  const { execute: deletePost } = useAction(deletePostAction);

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
        <li onClick={() => deletePost(post.id)} className={onlyActionStyles}>
          <IconTrashX size={18} /> Cancel post
        </li>
      </>
    );
  }

  return (
    <>
      <li className={actionStyles}>
        <Link href={`${NavLink.Posts}/${post.id}`} className={linkStyles}>
          <IconBook size={18} /> Read
        </Link>
      </li>
    </>
  );
}
