import { cn } from "@/lib/utils";

function Bone({ className }: { className?: string }) {
  return <div aria-hidden className={cn("animate-pulse rounded-md bg-muted", className)} />;
}

/** Instant shell shown while the product streams in. Mirrors the real layout to avoid layout shift. */
export function ProductPageSkeleton() {
  return (
    <div role="status" aria-label="Loading product" className="mx-auto max-w-7xl px-4 py-6 md:py-8">
      <Bone className="mb-5 h-4 w-64 max-w-full" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
        <div className="space-y-3">
          <Bone className="aspect-square w-full rounded-2xl" />
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {Array.from({ length: 4 }, (_, i) => <Bone key={i} className="aspect-square rounded-lg" />)}
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-3">
            <Bone className="h-4 w-20" />
            <Bone className="h-8 w-full" />
            <Bone className="h-8 w-2/3" />
            <Bone className="h-4 w-40" />
            <Bone className="h-9 w-32" />
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 4 }, (_, i) => <Bone key={i} className="size-10 rounded-full" />)}
          </div>
          <Bone className="h-10 w-36" />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Bone className="h-11 flex-1" />
            <Bone className="h-11 flex-1" />
          </div>
          <Bone className="h-28 w-full rounded-xl" />
        </div>
      </div>
      <span className="sr-only">Loading product</span>
    </div>
  );
}