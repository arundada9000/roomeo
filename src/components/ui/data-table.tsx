"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, ChevronsUpDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "./input"
import { SkeletonTable } from "./skeleton"
import { EmptyState } from "./empty-state"

type SortDirection = "asc" | "desc" | null

interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  render?: (item: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyField: keyof T
  loading?: boolean
  searchable?: boolean
  searchPlaceholder?: string
  onSearch?: (query: string) => void
  emptyTitle?: string
  emptyDescription?: string
  emptyIcon?: React.ReactNode
  className?: string
}

function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  keyField,
  loading = false,
  searchable = false,
  searchPlaceholder = "Search...",
  onSearch,
  emptyTitle = "No data found",
  emptyDescription,
  emptyIcon,
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<SortDirection>(null)

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDir === "asc") {
        setSortDir("desc")
      } else if (sortDir === "desc") {
        setSortKey(null)
        setSortDir(null)
      }
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey || !sortDir) return 0
    const aVal = a[sortKey]
    const bVal = b[sortKey]
    if (aVal == null) return 1
    if (bVal == null) return -1
    const cmp = String(aVal).localeCompare(String(bVal))
    return sortDir === "asc" ? cmp : -cmp
  })

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortKey !== columnKey) return <ChevronsUpDown className="ml-1 h-3 w-3 inline opacity-40" />
    return sortDir === "asc" ? (
      <ChevronUp className="ml-1 h-3 w-3 inline" />
    ) : (
      <ChevronDown className="ml-1 h-3 w-3 inline" />
    )
  }

  if (loading) {
    return <SkeletonTable rows={5} cols={columns.length} />
  }

  return (
    <div className={cn("space-y-4", className)}>
      {searchable && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            className="pl-9"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
      )}

      {sortedData.length === 0 ? (
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          icon={emptyIcon}
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border/60 bg-secondary/30">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={cn(
                        "px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                        col.sortable && "cursor-pointer select-none hover:text-foreground",
                        col.className
                      )}
                      onClick={() => col.sortable && handleSort(col.key)}
                    >
                      {col.label}
                      {col.sortable && <SortIcon columnKey={col.key} />}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {sortedData.map((item) => (
                  <tr
                    key={String(item[keyField])}
                    className="transition-colors hover:bg-secondary/20"
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          "whitespace-nowrap px-6 py-4 text-sm",
                          col.className
                        )}
                      >
                        {col.render
                          ? col.render(item)
                          : String(item[col.key] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export { DataTable }
export type { Column }
