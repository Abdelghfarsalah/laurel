export const SHIMMER_SURFACE =
  "relative overflow-hidden bg-neutral-silver dark:bg-white/10";

export const SHIMMER_SWEEP =
  "pointer-events-none absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/15";

function ShimmerBlock({ className }: { className?: string }) {
  return (
    <div className={`${SHIMMER_SURFACE} ${className}`}>
      <div className={SHIMMER_SWEEP} />
    </div>
  );
}

export default function ProductCardSkeleton() {
  return (
    <div
      aria-hidden
      className="flex flex-col overflow-hidden rounded-2xl border border-neutral-l-grey/20 bg-background shadow-sm"
    >
      <ShimmerBlock className="aspect-square rounded-none" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <ShimmerBlock className="h-4 w-3/4 rounded-md" />
        <ShimmerBlock className="h-3 w-1/2 rounded-md" />
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <ShimmerBlock className="h-5 w-16 rounded-md" />
          <ShimmerBlock className="size-10 shrink-0 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductCardSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
