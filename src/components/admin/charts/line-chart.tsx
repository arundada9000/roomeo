"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Series {
  label: string
  values: number[]
  color: string
  gradientColor?: string
}

interface LineChartProps {
  labels: string[]
  series: Series[]
  height?: number
  className?: string
  showGrid?: boolean
  showLabels?: boolean
  formatValue?: (v: number) => string
}

function LineChart({
  labels,
  series,
  height = 200,
  className,
  showGrid = true,
  showLabels = true,
  formatValue,
}: LineChartProps) {
  const allValues = series.flatMap((s) => s.values)
  const maxVal = Math.max(...allValues, 1)
  const padding = { top: 20, bottom: 24, left: showLabels ? 36 : 12, right: 12 }
  const chartW = 1000
  const chartH = height
  const plotW = chartW - padding.left - padding.right
  const plotH = chartH - padding.top - padding.bottom

  const xScale = (i: number) => padding.left + (i / Math.max(labels.length - 1, 1)) * plotW
  const yScale = (v: number) => padding.top + plotH - (v / maxVal) * plotH

  const makePath = (values: number[]) =>
    values
      .map((v, i) => `${xScale(i)},${yScale(v)}`)
      .join(" ")

  const makeArea = (values: number[]) => {
    const line = values
      .map((v, i) => `${xScale(i)},${yScale(v)}`)
      .join(" ")
    const lastX = xScale(values.length - 1)
    const firstX = xScale(0)
    return `${line} ${lastX},${chartH - padding.bottom} ${firstX},${chartH - padding.bottom}`
  }

  const yTicks = [0, Math.round(maxVal / 2), maxVal]

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox={`0 0 ${chartW} ${chartH}`}
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
        style={{ height }}
      >
        {showGrid && yTicks.map((tick) => {
          const y = yScale(tick)
          return (
            <g key={tick}>
              <line
                x1={padding.left}
                y1={y}
                x2={chartW - padding.right}
                y2={y}
                stroke="currentColor"
                className="text-border/20"
                strokeWidth="1"
                strokeDasharray={tick > 0 && tick < maxVal ? "4 4" : undefined}
              />
              {showLabels && (
                <text
                  x={padding.left - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="fill-muted-foreground/50 text-[10px] font-medium"
                >
                  {formatValue ? formatValue(tick) : tick}
                </text>
              )}
            </g>
          )
        })}

        {series.map((s, i) => (
          <g key={`series-${i}`}>
            {s.gradientColor && (
              <motion.path
                d={makeArea(s.values)}
                fill="currentColor"
                className={s.gradientColor}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
            )}
            <motion.polyline
              fill="none"
              stroke="currentColor"
              className={s.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={makePath(s.values)}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.08))" }}
            />
            {s.values.map((v, i) => (
              <motion.circle
                key={i}
                cx={xScale(i)}
                cy={yScale(v)}
                r="3"
                className={s.color}
                fill="currentColor"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.02 }}
              />
            ))}
          </g>
        ))}

        {showLabels && labels.length > 0 && (
          <>
            <text
              x={xScale(0)}
              y={chartH - 4}
              textAnchor="start"
              className="fill-muted-foreground/50 text-[10px] font-medium"
            >
              {labels[0]}
            </text>
            {labels.length > 2 && (
              <text
                x={xScale(Math.floor(labels.length / 2))}
                y={chartH - 4}
                textAnchor="middle"
                className="fill-muted-foreground/50 text-[10px] font-medium"
              >
                {labels[Math.floor(labels.length / 2)]}
              </text>
            )}
            <text
              x={xScale(labels.length - 1)}
              y={chartH - 4}
              textAnchor="end"
              className="fill-muted-foreground/50 text-[10px] font-medium"
            >
              {labels[labels.length - 1]}
            </text>
          </>
        )}
      </svg>
    </div>
  )
}

export { LineChart }
export type { LineChartProps, Series }
