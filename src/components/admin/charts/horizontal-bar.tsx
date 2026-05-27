"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HorizontalBarProps {
  data: { label: string; value: number; color?: string; bg?: string }[]
  className?: string
  maxValue?: number
  formatValue?: (v: number) => string
  showRank?: boolean
}

function HorizontalBar({
  data,
  className,
  maxValue: maxOverride,
  formatValue,
  showRank = false,
}: HorizontalBarProps) {
  if (data.length === 0) return null

  const maxVal = maxOverride ?? Math.max(...data.map((d) => d.value), 1)

  return (
    <div className={cn("space-y-3", className)}>
      {data.slice(0, 10).map((d, i) => {
        const pct = (d.value / maxVal) * 100
        return (
          <motion.div
            key={`${d.label}-${i}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="group"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2 min-w-0">
                {showRank && (
                  <span className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-bold",
                    i === 0 ? "bg-amber-100 text-amber-700" :
                    i === 1 ? "bg-slate-100 text-slate-600" :
                    i === 2 ? "bg-orange-100 text-orange-700" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {i + 1}
                  </span>
                )}
                <span className="text-sm font-medium text-foreground truncate">
                  {d.label}
                </span>
              </div>
              <span className="text-xs font-semibold text-muted-foreground tabular-nums shrink-0 ml-2">
                {formatValue ? formatValue(d.value) : d.value}
              </span>
            </div>
            <div className="relative h-2 w-full rounded-full bg-muted/50 overflow-hidden">
              <motion.div
                className={cn(
                  "absolute inset-y-0 left-0 rounded-full",
                  d.color ?? "bg-primary"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export { HorizontalBar }
