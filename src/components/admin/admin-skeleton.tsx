import { SkeletonCard, SkeletonTable } from "@/components/ui/skeleton"

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="animate-pulse">
        <div className="h-9 w-56 rounded-xl bg-muted/60" />
        <div className="h-4 w-72 rounded-lg bg-muted/40 mt-2" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm animate-pulse"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 w-24 rounded-lg bg-muted/60" />
              <div className="h-11 w-11 rounded-2xl bg-muted/60" />
            </div>
            <div className="h-9 w-20 rounded-lg bg-muted/60" />
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-border/40 bg-card shadow-sm animate-pulse">
        <div className="border-b border-border/40 px-6 py-4">
          <div className="h-5 w-32 rounded-lg bg-muted/60" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-6 py-3.5 border-b border-border/20"
          >
            <div className="h-10 w-10 rounded-full bg-muted/60" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3.5 w-40 rounded bg-muted/50" />
              <div className="h-3 w-24 rounded bg-muted/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-8 w-48 rounded-xl bg-muted/60" />
        <div className="h-4 w-72 rounded-lg bg-muted/40 mt-2" />
      </div>
      <div className="rounded-2xl border border-border/40 bg-card shadow-sm">
        <div className="border-b border-border/40 px-6 py-4">
          <div className="h-4 w-full rounded-lg bg-muted/60" />
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-6 py-3 border-b border-border/20"
          >
            <div className="h-3 flex-1 rounded bg-muted/50" />
            <div className="h-3 w-20 rounded bg-muted/40" />
            <div className="h-3 w-16 rounded bg-muted/40" />
          </div>
        ))}
      </div>
    </div>
  )
}

export { DashboardSkeleton, PageSkeleton }
