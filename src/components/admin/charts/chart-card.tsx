import { cn } from "@/lib/utils"
import { FadeIn } from "@/components/page-transition"

interface ChartCardProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  className?: string
  delay?: number
  children: React.ReactNode
  action?: React.ReactNode
}

function ChartCard({ title, subtitle, icon, className, delay = 0, children, action }: ChartCardProps) {
  return (
    <FadeIn delay={delay}>
      <div className={cn("rounded-2xl border border-border/40 bg-card shadow-sm transition-all duration-200 hover:shadow-md overflow-hidden", className)}>
        <div className="border-b border-border/40 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            {icon && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {icon}
              </div>
            )}
            <div className="min-w-0">
              <h3 className="text-base font-bold text-foreground tracking-tight truncate">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-muted-foreground/60 truncate">{subtitle}</p>
              )}
            </div>
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
        <div className="p-5">
          {children}
        </div>
      </div>
    </FadeIn>
  )
}

export { ChartCard }
