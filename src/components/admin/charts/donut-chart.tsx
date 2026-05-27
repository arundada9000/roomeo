"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

interface DonutChartProps {
  data: { label: string; value: number; color: string }[]
  size?: number
  className?: string
  formatValue?: (v: number) => string
  showLegend?: boolean
}

function DonutChart({
  data,
  size = 160,
  className,
  formatValue,
  showLegend = true,
}: DonutChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1
  const strokeWidth = 28
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  const arcs = useMemo(() => {
    const totalPct = data.reduce((s, d) => s + d.value, 0) || 1
    return data.map((d, i) => {
      const prevPcts = data.slice(0, i).reduce((s, item) => s + item.value / totalPct, 0)
      const pct = d.value / totalPct
      const offset = prevPcts * circumference
      const length = pct * circumference
      return { ...d, offset, length }
    })
  }, [data, circumference])

  if (data.length === 0) return null

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {arcs.map((d, i) => (
              <motion.circle
                key={`slice-${i}`}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={d.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${d.length} ${circumference - d.length}`}
                strokeDashoffset={circumference - d.offset}
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference - d.offset - d.length }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            ))}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-border/20"
            strokeWidth={strokeWidth}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-extrabold text-foreground tracking-tight">
              {total}
            </p>
            <p className="text-[10px] font-medium text-muted-foreground/60">Total</p>
          </div>
        </div>
      </div>

      {showLegend && (
        <div className="mt-4 w-full space-y-1.5">
          {data.map((d, i) => {
            const pct = ((d.value / total) * 100).toFixed(0)
            return (
              <div key={`legend-${i}`} className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: d.color }}
                  />
                  <span className="text-xs text-muted-foreground truncate">
                    {d.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-semibold text-foreground tabular-nums">
                    {formatValue ? formatValue(d.value) : d.value}
                  </span>
                  <span className="text-[10px] text-muted-foreground/50 font-medium">
                    ({pct}%)
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export { DonutChart }
