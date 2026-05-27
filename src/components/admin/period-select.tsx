"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

const PERIODS = [
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "90d", label: "90 Days" },
  { value: "all", label: "All Time" },
]

function PeriodSelect() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const current = searchParams.get("period") || "30d"

  return (
    <div className="flex items-center gap-1 rounded-xl bg-muted/50 p-1 border border-border/30">
      {PERIODS.map((p) => (
        <button
          key={p.value}
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString())
            if (p.value === "30d") {
              params.delete("period")
            } else {
              params.set("period", p.value)
            }
            const qs = params.toString()
            router.push(qs ? `?${qs}` : "")
          }}
          className={cn(
            "px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200",
            current === p.value
              ? "bg-card text-foreground shadow-sm border border-border/40"
              : "text-muted-foreground/70 hover:text-foreground"
          )}
        >
          {p.label}
        </button>
      ))}
    </div>
  )
}

export { PeriodSelect }
