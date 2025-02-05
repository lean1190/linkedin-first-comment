import type { Post } from '@/lib/posts/database/types';
import clsx from 'clsx';
import { formatRelative } from 'date-fns';
import Actions from './item-actions/actions';

const statusBadgeStyles = (status: Post['status']) =>
  clsx(
    'border py-1 px-2 capitalize text-xs rounded-full',
    { 'border-neutral-600': status === 'draft' },
    { 'border-blue-700': status === 'scheduled' },
    { 'border-green-700': status === 'posted' },
    { 'border-green-900': status === 'reposted' }
  );

interface Props {
  post: Post;
}

export default function PostItem({ post }: Props) {
  return (
    <div className="flex justify-between items-start gap-4 mb-2">
      <div className="flex flex-col items-start gap-y-2 min-w-0 text-sm">
        <div className="text-linkedin-low-emphasis">
          Created {formatRelative(post.created_at, new Date())}{' '}
        </div>
        <div className="truncate max-w-full">{post.content}</div>
      </div>

      <div className="flex items-center gap-1">
        <div className={`w-fit ${statusBadgeStyles(post.status)}`}>{post.status}</div>
        <Actions post={post} />
      </div>
    </div>
  );
}
