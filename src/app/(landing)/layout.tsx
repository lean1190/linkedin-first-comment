import Footer from './components/footer';

export default function LandingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* The markup for regions and roles is redundant, but this is a transition period, and this markup is the most robust.
      biome-ignore lint/a11y/useSemanticElements:
      biome-ignore lint/a11y/noRedundantRoles: https://dequeuniversity.com/rules/axe/4.9/landmark-one-main?application=Vercel%20Toolbar*/}
      <main className="size-full" role="main">
        {children}
      </main>
      <Footer />
    </>
  );
}
