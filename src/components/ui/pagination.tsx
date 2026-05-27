import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
}

function Pagination({ currentPage, totalPages, basePath, searchParams }: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildHref = (page: number) => {
    const params = new URLSearchParams();
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, val]) => {
        if (val && key !== "page") params.set(key, val);
      });
    }
    if (page > 1) params.set("page", String(page));
    return `${basePath}?${params.toString()}`;
  };

  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex items-center justify-between">
      <p className="text-xs text-muted-foreground/60 font-medium">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center gap-1">
        <Link
          href={buildHref(currentPage - 1)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-all duration-200",
            currentPage <= 1
              ? "pointer-events-none text-muted-foreground/20"
              : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground active:scale-95"
          )}
          aria-disabled={currentPage <= 1}
          tabIndex={currentPage <= 1 ? -1 : 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>

        {pages.map((page, i) =>
          page === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="flex h-8 w-8 items-center justify-center text-xs text-muted-foreground/40"
            >
              &hellip;
            </span>
          ) : (
            <Link
              key={page}
              href={buildHref(page)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200",
                page === currentPage
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground active:scale-95"
              )}
            >
              {page}
            </Link>
          )
        )}

        <Link
          href={buildHref(currentPage + 1)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-all duration-200",
            currentPage >= totalPages
              ? "pointer-events-none text-muted-foreground/20"
              : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground active:scale-95"
          )}
          aria-disabled={currentPage >= totalPages}
          tabIndex={currentPage >= totalPages ? -1 : 0}
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export { Pagination };
