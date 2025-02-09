import { navItems } from './components/nav/items';
import Nav from './components/nav/nav';

export default function PlatformLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="size-full">
      <div className="px-16 pt-8">
        <Nav items={navItems} />
      </div>
      <main className="py-12 px-4 md:px-0">{children}</main>
    </div>
  );
}
