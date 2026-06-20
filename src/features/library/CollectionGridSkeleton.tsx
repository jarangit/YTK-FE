export default function CollectionGridSkeleton({ label }: { label: string }) {
  return (
    <div role="status" aria-label={label} className="grid animate-pulse grid-cols-1 gap-inline-lg motion-reduce:animate-none sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[0, 1, 2, 3].map((item) => (
        <div key={item} className="overflow-hidden rounded-card border border-[var(--color-border-subtle)] bg-surface">
          <div className="aspect-video bg-border/60" />
          <div className="space-y-3 p-inset-lg">
            <div className="h-4 w-24 rounded bg-border/60" />
            <div className="h-6 w-4/5 rounded bg-border/70" />
            <div className="h-4 w-full rounded bg-border/50" />
          </div>
        </div>
      ))}
    </div>
  );
}
