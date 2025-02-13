import { pageContainerBgColor, pageContainerWidthDesktop } from '@/lib/constants/containers';

export default function PreviewPostLoading() {
  return (
    <article
      className={`${pageContainerWidthDesktop} animate-pulse mx-auto rounded-xl ${pageContainerBgColor} px-4 pb-6`}
    >
      <section className="w-full pt-3 pb-2 max-w-full justify-between items-center flex font-light">
        <div className="mr-2 h-4 bg-neutral-700 rounded w-1/8" />

        <div className="hidden sm:flex items-center gap-1">
          <div className="h-5 w-5 bg-neutral-700 rounded" />
          <div className="h-5 w-5 bg-neutral-700 rounded" />
        </div>
      </section>

      <section className="mb-2 pr-9 h-10 bg-neutral-700 rounded" />

      <section className="text-sm relative h-20 bg-neutral-700 rounded" />

      <section className="flex items-center justify-between py-2">
        <div className="flex items-center gap-1">
          <div className="flex">
            <div className="h-4 w-4 bg-neutral-700 rounded mr-1" />
            <div className="h-4 w-4 bg-neutral-700 rounded mr-1" />
            <div className="h-4 w-4 bg-neutral-700 rounded" />
          </div>
          <div className="text-xs font-light text-linkedin-low-emphasis h-4 bg-neutral-700 rounded w-1/4" />
        </div>
        <div className="text-xs font-light text-linkedin-low-emphasis h-4 bg-neutral-700 rounded w-1/4" />
      </section>

      <div className="h-0.5 bg-neutral-700 rounded w-full my-2" />

      <section className="w-full pr-4">
        <div className="mb-2 flex items-start justify-between">
          <div className="h-10 bg-neutral-700 rounded w-1/3" />
          <div className="flex items-center gap-2 text-xs font-light text-linkedin-low-emphasis">
            <span className="h-4 bg-neutral-700 rounded w-1/4" />
            <span className="text-sm h-4 bg-neutral-700 rounded w-1/4" />
          </div>
        </div>
        <div className="pl-9 h-20 bg-neutral-700 rounded" />
      </section>
    </article>
  );
}
