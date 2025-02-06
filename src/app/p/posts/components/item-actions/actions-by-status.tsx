'use client';

import { NavLink } from '@/app/p/components/nav/items';
import { cancelPostAction } from '@/lib/posts/actions/cancel';
import { deletePostAction } from '@/lib/posts/actions/delete';
import { postNowAction } from '@/lib/posts/actions/post-now';
import type { Post } from '@/lib/posts/database/types';
import {
  IconBook,
  IconBrandLinkedin,
  IconLoader,
  IconPencil,
  IconSend2,
  IconTrashX
} from '@tabler/icons-react';
import { useAction } from 'next-safe-action/hooks';
import Link from 'next/link';
import { useMemo } from 'react';
import useActionStyles from './hooks/use-styles';

interface Props {
  post: Post;
}

export default function ActionsByStatus({ post }: Props) {
  const { actionStyles, onlyActionStyles, linkStyles } = useActionStyles();
  const { execute: deletePost } = useAction(deletePostAction);
  const { execute: cancelPost } = useAction(cancelPostAction);
  const { execute: postNow, isExecuting: postNowIsExecuting } = useAction(postNowAction);

  const readItem = useMemo(
    () => (
      <li className={actionStyles}>
        <Link href={`${NavLink.Posts}/${post.id}`} className={linkStyles}>
          <IconBook size={18} /> Read
        </Link>
      </li>
    ),
    [post, actionStyles, linkStyles]
  );

  const postNowItem = useMemo(
    () => (
      <li onClick={() => postNow(post.id)} className={onlyActionStyles}>
        {postNowIsExecuting ? (
          <IconLoader size={18} className="animate-spin" />
        ) : (
          <IconSend2 size={18} />
        )}{' '}
        Post now
      </li>
    ),
    [post, postNow, postNowIsExecuting, onlyActionStyles]
  );

  if (post.status === 'draft') {
    return (
      <>
        <li className={actionStyles}>
          <Link href={`${NavLink.Platform}?id=${post.id}`} className={linkStyles}>
            <IconPencil size={18} /> Edit draft
          </Link>
        </li>
        {postNowItem}
        <li onClick={() => deletePost(post.id)} className={onlyActionStyles}>
          <IconTrashX size={18} /> Delete draft
        </li>
      </>
    );
  }

  if (post.status === 'scheduled') {
    return (
      <>
        {readItem}
        {postNowItem}
        <li onClick={() => cancelPost(post.id)} className={onlyActionStyles}>
          <IconTrashX size={18} /> Cancel post
        </li>
      </>
    );
  }

  return (
    <>
      {readItem}
      {post.urn ? (
        <li>
          <Link
            target="_blank"
            href={`https://www.linkedin.com/feed/update/${post.urn}`}
            className={linkStyles}
          >
            <IconBrandLinkedin size={18} /> On LinkedIn
          </Link>
        </li>
      ) : null}
    </>
  );
}
