import { cn } from "@/lib/utils";

function Bone({ className }: { className?: string }) {
  return <div aria-hidden className={cn("animate-pulse rounded-md bg-muted", className)} />;
}

export function CategorySkeleton() {
  return (
    <div role="status" aria-label="Loading products" className="mx-auto max-w-7xl px-4 py-6 md:py-8">
      <Bone className="mb-5 h-4 w-48" />
      <Bone className="mb-6 h-9 w-56" />
      <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <div className="hidden space-y-4 lg:block">
          {Array.from({ length: 5 }, (_, i) => <Bone key={i} className="h-24 w-full" />)}
        </div>
        <div>
          <div className="mb-4 flex justify-between"><Bone className="h-5 w-40" /><Bone className="h-9 w-44" /></div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => <Bone key={i} className="aspect-3/4 rounded-xl" />)}
          </div>
        </div>
      </div>
      <span className="sr-only">Loading products</span>
    </div>
  );
}
