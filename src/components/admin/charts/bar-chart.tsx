"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface BarChartProps {
  data: { label: string; value: number }[]
  color?: string
  height?: number
  className?: string
  maxValue?: number
  formatValue?: (v: number) => string
  showValues?: boolean
}

function BarChart({
  data,
  color = "text-primary",
  height = 200,
  className,
  maxValue: maxOverride,
  formatValue,
  showValues = false,
}: BarChartProps) {
  if (data.length === 0) return null

  const maxVal = maxOverride ?? Math.max(...data.map((d) => d.value), 1)
  const barCount = data.length
  const padding = { top: showValues ? 20 : 8, bottom: 40, left: 8, right: 8 }
  const chartW = 1000
  const chartH = height
  const plotW = chartW - padding.left - padding.right
  const plotH = chartH - padding.top - padding.bottom
  const barWidth = Math.min(plotW / barCount * 0.7, 48)
  const gap = (plotW - barWidth * barCount) / (barCount + 1)

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <svg
        viewBox={`0 0 ${chartW} ${chartH}`}
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
        style={{ height }}
      >
        {data.map((d, i) => {
          const barH = (d.value / maxVal) * plotH
          const x = padding.left + gap + i * (barWidth + gap)
          const y = padding.top + plotH - barH
          return (
            <motion.g
              key={`${d.label}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <motion.rect
                x={x}
                y={chartH - padding.bottom}
                width={barWidth}
                height={0}
                rx={4}
                className={color}
                fill="currentColor"
                initial={false}
                animate={{ y, height: barH }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              />
              {showValues && (
                <text
                  x={x + barWidth / 2}
                  y={y - 6}
                  textAnchor="middle"
                  className="fill-muted-foreground/60 text-[10px] font-semibold"
                >
                  {formatValue ? formatValue(d.value) : d.value}
                </text>
              )}
              <text
                x={x + barWidth / 2}
                y={chartH - 6}
                textAnchor="middle"
                className="fill-muted-foreground/50 text-[9px] font-medium"
                style={{ transform: "rotate(-45deg)", transformOrigin: `${x + barWidth / 2}px ${chartH - 6}px` }}
              >
                {d.label.length > 12 ? d.label.slice(0, 10) + "…" : d.label}
              </text>
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}

export { BarChart }
