import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { Post } from '@/lib/posts/database/types';
import { IconDotsVertical } from '@tabler/icons-react';
import ActionsByStatus from './actions-by-status';

interface Props {
  post: Post;
}

export default function Actions({ post }: Props) {
  return (
    <Popover>
      <PopoverTrigger>
        <IconDotsVertical size={18} className="cursor-pointer text-linkedin-low-emphasis" />
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={8} className="text-sm">
        <ul className="bg-neutral-900 rounded border-neutral-600 shadow-2xl border text-linkedin-low-emphasis">
          <ActionsByStatus post={post} />
        </ul>
      </PopoverContent>
    </Popover>
  );
}
