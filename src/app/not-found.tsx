import { redirect } from 'next/navigation';
import { NavLink } from './p/components/nav/items';

export default function NotFound() {
  redirect(NavLink.Platform);
}
