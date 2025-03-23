import { pageContainerBgColor, pageContainerWidthDesktop } from '@/lib/constants/containers';

export default function PlatformLoading() {
  return (
    <article
      className={`${pageContainerWidthDesktop} animate-pulse mx-auto rounded-xl ${pageContainerBgColor} px-4 pb-6`}
    >
      <section className="w-full pt-3 pb-2 max-w-full justify-end items-center flex">
        <div className="hidden sm:flex items-center gap-1">
          <div className="h-5 w-5 bg-neutral-700 rounded" />
          <div className="h-5 w-5 bg-neutral-700 rounded" />
        </div>
      </section>

      <section className="mb-2 flex items-center gap-2">
        <div className="h-12 w-12 rounded-full bg-neutral-700" />
        <div>
          <div className="h-3 mb-1 w-32 max-w-full bg-neutral-700 rounded-lg" />
          <div className="h-2 mb-1 w-32 max-w-full bg-neutral-700 rounded-lg" />
          <div className="h-2 mb-1 w-12 max-w-full bg-neutral-700 rounded-lg" />
        </div>
      </section>

      <section>
        <div className="h-4 mb-1 w-62 max-w-full bg-neutral-700 rounded-lg" />
        <div className="h-4 mb-1 w-72 max-w-full bg-neutral-700 rounded-lg" />
        <div className="h-4 w-72 max-w-full bg-neutral-700 rounded-lg" />
      </section>

      <section className="flex items-center justify-between py-4">
        <div className="flex items-center gap-1">
          <div className="flex">
            <div className="h-4 w-4 bg-neutral-700 rounded-xl" />
            <div className="h-4 w-4 bg-neutral-700 rounded-xl" />
            <div className="h-4 w-4 bg-neutral-700 rounded-xl" />
          </div>
          <div className="h-4 bg-neutral-700 rounded-lg w-1/4" />
        </div>
        <div className="h-4 bg-neutral-700 rounded-lg w-1/4" />
      </section>

      <div className="h-0.5 bg-neutral-700 rounded-xl w-full my-4" />

      <section className="mb-2 flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-neutral-700" />
        <div>
          <div className="h-2 mb-1 w-32 max-w-full bg-neutral-700 rounded-lg" />
          <div className="h-2 mb-1 w-32 max-w-full bg-neutral-700 rounded-lg" />
        </div>
      </section>

      <section className="pl-10">
        <div className="h-2 mb-1 w-62 max-w-full bg-neutral-700 rounded-lg" />
        <div className="h-2 mb-1 w-72 max-w-full bg-neutral-700 rounded-lg" />
        <div className="h-2 w-72 max-w-full bg-neutral-700 rounded-lg" />
      </section>
    </article>
  );
}
