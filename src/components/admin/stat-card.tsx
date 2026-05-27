import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  label: string
  value: string | number
  icon: React.ReactNode
  color: string
  bg: string
  trend?: { value: number; positive: boolean }
  className?: string
}

function StatCard({ label, value, icon, color, bg, trend, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border/40 bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 group",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-muted-foreground">
          {label}
        </span>
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl transition-transform group-hover:scale-110", bg)}>
          <div className={color}>{icon}</div>
        </div>
      </div>
      <div className="flex items-end gap-3">
        <p className="text-4xl font-extrabold text-foreground tracking-tight">
          {value}
        </p>
        {trend && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-xs font-medium mb-1.5",
              trend.positive ? "text-green-600" : "text-red-500"
            )}
          >
            {trend.positive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </div>
  )
}

function StatCardSkeleton() {
  return (
    <div className="rounded-3xl border border-border/40 bg-card p-6 shadow-sm animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 w-24 rounded bg-muted" />
        <div className="h-11 w-11 rounded-2xl bg-muted" />
      </div>
      <div className="h-9 w-20 rounded bg-muted" />
    </div>
  )
}

export { StatCard, StatCardSkeleton }
