import Nav from './components/nav';

export default function PlatformLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-dot-white/[0.2] size-full">
      <div className="px-16 pt-8">
        <Nav />
      </div>
      <main className="py-12">{children}</main>
    </div>
  );
}
