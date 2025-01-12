import Nav from './components/nav';

export default function PlatformLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative size-full bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_80%,black)] dark:bg-black" />
      <div className="px-16 pt-8">
        <Nav />
      </div>
      <main className="py-12">{children}</main>
    </div>
  );
}
