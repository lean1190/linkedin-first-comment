import { SparklesCore } from '@/components/ui/sparkles';

export default function Title() {
  return (
    <div className="flex w-full flex-col items-center justify-center overflow-hidden rounded-md">
      <h2 className="relative z-20 text-center text-6xl font-bold tracking-tighter md:text-7xl lg:text-9xl">
        Be always #1
      </h2>
      <div className="relative h-40 w-[40rem]">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-linear-to-r from-transparent via-indigo-500 to-transparent blur-xs" />
        <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-linear-to-r from-transparent via-indigo-500 to-transparent" />
        <div className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-linear-to-r from-transparent via-sky-500 to-transparent blur-xs" />
        <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-linear-to-r from-transparent via-sky-500 to-transparent" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="size-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 size-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
      </div>
    </div>
  );
}
