import { pageContainerBgColor, pageContainerWidthDesktop } from '@/lib/constants/containers';

export default function PostsLoading() {
  return (
    <article
      className={`${pageContainerWidthDesktop} ${pageContainerBgColor} animate-pulse mx-auto rounded-xl p-8`}
    >
      <div className="mb-8 h-10 bg-neutral-700 rounded w-1/2" />

      <div className="flex py-4 justify-between items-start gap-4 mb-2">
        <div className="flex flex-col items-start gap-y-2 min-w-0">
          <div className="h-4 w-32 bg-neutral-700 rounded" />
          <div className="h-4 w-80 bg-neutral-700 rounded" />
        </div>

        <div className="flex items-center gap-1">
          <div className="h-5 w-14 rounded-full bg-neutral-700" />
        </div>
      </div>

      <div className="flex py-4 justify-between items-start gap-4 mb-2">
        <div className="flex flex-col items-start gap-y-2 min-w-0">
          <div className="h-4 w-32 bg-neutral-700 rounded" />
          <div className="h-4 w-80 bg-neutral-700 rounded" />
        </div>

        <div className="flex items-center gap-1">
          <div className="h-5 w-14 rounded-full bg-neutral-700" />
        </div>
      </div>

      <div className="flex py-4 justify-between items-start gap-4 mb-2">
        <div className="flex flex-col items-start gap-y-2 min-w-0">
          <div className="h-4 w-32 bg-neutral-700 rounded" />
          <div className="h-4 w-80 bg-neutral-700 rounded" />
        </div>

        <div className="flex items-center gap-1">
          <div className="h-5 w-14 rounded-full bg-neutral-700" />
        </div>
      </div>
    </article>
  );
}
