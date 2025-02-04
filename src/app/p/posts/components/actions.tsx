import type { Post } from '@/lib/posts/database/types';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { IconDotsVertical, IconPencil, IconTrashX } from '@tabler/icons-react';
import Link from 'next/link';
import { NavLink } from '../../components/nav/items';

interface Props {
  post: Post;
}

const actionStyle = 'flex items-center gap-1 px-3 py-2 hover:bg-neutral-800 rounded';

const ActionsByStatus = ({ post }: Props) => {
  if (post.status === 'draft') {
    return (
      <>
        <li>
          <Link href={`${NavLink.Platform}?id=${post.id}`} className={actionStyle}>
            <IconPencil size={18} /> Edit post
          </Link>
        </li>
        <li>
          <Link href={`${NavLink.Platform}?id=${post.id}`} className={actionStyle}>
            <IconTrashX size={18} /> Delete draft
          </Link>
        </li>
      </>
    );
  }

  return (
    <>
      <li>
        <Link href={`${NavLink.Posts}/${post.id}`}>Read</Link>
      </li>
      <li>
        <Link href={`${NavLink.Platform}?id=${post.id}`}>Delete</Link>
      </li>
    </>
  );
};

export default function Actions({ post }: Props) {
  return (
    <Popover>
      <PopoverTrigger>
        <IconDotsVertical size={18} className="text-linkedin-low-emphasis" />
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={5} className="text-sm">
        <ul className="divide-y-2 bg-neutral-900 rounded border-linkedin-low-emphasis border text-linkedin-low-emphasis">
          <ActionsByStatus post={post} />
        </ul>
      </PopoverContent>
    </Popover>
  );
}
