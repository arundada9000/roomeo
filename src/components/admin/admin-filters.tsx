"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

function useDebouncedCallback(fn: (value: string) => void, delay: number) {
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  return useCallback(
    (value: string) => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => fn(value), delay);
    },
    [fn, delay],
  );
}

function SearchInput({
  placeholder = "Search...",
  param = "query",
}: {
  placeholder?: string;
  param?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentValue = searchParams.get(param) || "";
  const [value, setValue] = useState(currentValue);

  const debouncedSearch = useDebouncedCallback((val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val) params.set(param, val);
    else params.delete(param);
    params.delete("page");
    router.push(`?${params.toString()}`);
  }, 300);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          debouncedSearch(e.target.value);
        }}
        placeholder={placeholder}
        className="h-10 w-full rounded-xl border border-border/40 bg-card pl-10 pr-9 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-200"
      />
      {value && (
        <button
          onClick={() => {
            setValue("");
            const params = new URLSearchParams(searchParams.toString());
            params.delete(param);
            params.delete("page");
            router.push(`?${params.toString()}`);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function FilterChip({
  label,
  param,
  value,
  isActive,
  count,
}: {
  label: string;
  param: string;
  value: string;
  isActive: boolean;
  count?: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (isActive) {
      params.delete(param);
    } else {
      params.set(param, value);
    }
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 active:scale-95 ${
        isActive
          ? "bg-primary text-primary-foreground shadow-sm"
          : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
      }`}
    >
      {label}
      {count !== undefined && ` (${count})`}
    </button>
  );
}

function ClearFilters({ params }: { params: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasFilters = params.some((p) => searchParams.has(p));

  if (!hasFilters) return null;

  return (
    <button
      onClick={() => {
        const p = new URLSearchParams();
        const q = searchParams.get("query");
        if (q) p.set("query", q);
        router.push(`?${p.toString()}`);
      }}
      className="text-xs text-muted-foreground/60 hover:text-foreground transition-colors font-medium underline-offset-2 hover:underline"
    >
      Clear filters
    </button>
  );
}

function CitySelect({
  cities,
  param = "city",
  placeholder = "All Cities",
}: {
  cities: string[];
  param?: string;
  placeholder?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get(param) || "";

  return (
    <select
      value={current}
      onChange={(e) => {
        const params = new URLSearchParams(searchParams.toString());
        if (e.target.value) params.set(param, e.target.value);
        else params.delete(param);
        params.delete("page");
        router.push(`?${params.toString()}`);
      }}
      className="h-9 rounded-xl border border-border/40 bg-card px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-200"
    >
      <option value="">{placeholder}</option>
      {cities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
}

export { SearchInput, FilterChip, ClearFilters, CitySelect, useDebouncedCallback };
