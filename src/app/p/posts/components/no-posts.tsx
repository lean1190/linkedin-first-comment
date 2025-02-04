import { ArrowButton } from '@/components/ui/arrow-button';
import Link from 'next/link';
import { NavLink } from '../../components/nav/items';

export default function NoPosts() {
  return (
    <Link href={NavLink.Platform}>
      <ArrowButton text="Start writing" />
    </Link>
  );
}
