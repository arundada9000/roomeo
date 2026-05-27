import prisma from "@/lib/prisma";
import {
  CheckCircle, XCircle, Clock, MapPin, Home, Building2,
} from "lucide-react";
import Link from "next/link";
import { StatusBadge } from "@/components/admin/role-badge";
import { Pagination } from "@/components/ui/pagination";
import { ListingsActions } from "./listings-actions";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/page-transition";
import { CitySelect, FilterChip, ClearFilters, SearchInput } from "@/components/admin/admin-filters";
import { PageHeader, pageHeaderPresets } from "@/components/admin/page-header";

const PAGE_SIZE = 20;

const ROOM_TYPES = ["SINGLE_ROOM", "DOUBLE_ROOM", "SHARED_ROOM", "FLAT", "STUDIO", "PG"];

export default async function AdminListingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    query?: string;
    status?: string;
    city?: string;
    type?: string;
  }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const query = params.query?.toLowerCase();
  const statusFilter = params.status;
  const cityFilter = params.city;
  const typeFilter = params.type;

  const where: Record<string, unknown> = {};
  if (statusFilter && ["PENDING", "APPROVED", "REJECTED"].includes(statusFilter)) {
    where.status = statusFilter;
  }
  if (typeFilter && ROOM_TYPES.includes(typeFilter)) {
    where.type = typeFilter;
  }

  const [totalUnits, units, statusCounts, cities] = await Promise.all([
    prisma.unit.count({ where }),
    prisma.unit.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        property: {
          include: { landlord: { select: { name: true, email: true } } },
        },
        _count: { select: { favorites: true, inquiries: true } },
      },
    }),
    Promise.all([
      prisma.unit.count(),
      prisma.unit.count({ where: { status: "PENDING" } }),
      prisma.unit.count({ where: { status: "APPROVED" } }),
      prisma.unit.count({ where: { status: "REJECTED" } }),
    ]),
    prisma.property.findMany({ select: { city: true }, distinct: ["city"] }),
  ]);

  const [totalCount, pendingCount, approvedCount, rejectedCount] = statusCounts;
  const totalPages = Math.ceil(totalUnits / PAGE_SIZE);
  const pending = units.filter((u) => u.status === "PENDING");
  const uniqueCities = [...new Set(cities.map((c) => c.city))].sort();

  const filteredUnits = query
    ? units.filter(
        (u) =>
          u.title.toLowerCase().includes(query) ||
          u.property.title.toLowerCase().includes(query) ||
          u.property.city.toLowerCase().includes(query) ||
          u.property.landlord.name.toLowerCase().includes(query),
      )
    : units;

  return (
    <div className="space-y-8">
      <PageHeader title="Listings Moderation" description={`${totalCount} listing${totalCount !== 1 ? "s" : ""} on the platform.`} icon={pageHeaderPresets.listings.icon} gradient={pageHeaderPresets.listings.gradient} iconColor={pageHeaderPresets.listings.iconColor} iconBg={pageHeaderPresets.listings.iconBg} />

      {/* Stats Bar */}
      <StaggerChildren className="grid gap-4 sm:grid-cols-4">
        <StaggerItem>
          <div className="rounded-2xl border border-border/40 bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-2xl font-extrabold text-foreground tracking-tight">{totalCount}</p>
                <p className="text-xs text-muted-foreground/70 font-medium">Total Listings</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Building2 className="h-5 w-5" />
              </div>
            </div>
          </div>
        </StaggerItem>
        <StaggerItem>
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] p-5 shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-2xl font-extrabold text-amber-600 tracking-tight">{pendingCount}</p>
                <p className="text-xs text-amber-600/70 font-medium">Pending</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                <Clock className="h-5 w-5" />
              </div>
            </div>
          </div>
        </StaggerItem>
        <StaggerItem>
          <div className="rounded-2xl border border-green-500/20 bg-green-500/[0.03] p-5 shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-2xl font-extrabold text-green-600 tracking-tight">{approvedCount}</p>
                <p className="text-xs text-green-600/70 font-medium">Approved</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-600">
                <CheckCircle className="h-5 w-5" />
              </div>
            </div>
          </div>
        </StaggerItem>
        <StaggerItem>
          <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-5 shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-2xl font-extrabold text-red-500 tracking-tight">{rejectedCount}</p>
                <p className="text-xs text-red-500/70 font-medium">Rejected</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                <XCircle className="h-5 w-5" />
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerChildren>

      {/* Filters */}
      <FadeIn delay={0.05}>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <FilterChip label="All" param="status" value="" isActive={!statusFilter} />
            <FilterChip label="Pending" param="status" value="PENDING" isActive={statusFilter === "PENDING"} count={pendingCount} />
            <FilterChip label="Approved" param="status" value="APPROVED" isActive={statusFilter === "APPROVED"} count={approvedCount} />
            <FilterChip label="Rejected" param="status" value="REJECTED" isActive={statusFilter === "REJECTED"} count={rejectedCount} />
            <div className="h-4 w-px bg-border/40 mx-1" />
            <CitySelect cities={uniqueCities} />
            <ClearFilters params={["status", "city", "type", "query"]} />
          </div>
          <div className="w-full sm:w-56">
            <SearchInput placeholder="Search listings..." />
          </div>
        </div>
      </FadeIn>

      {/* Pending Section */}
      {pending.length > 0 && !statusFilter && (
        <FadeIn delay={0.1}>
          <div>
            <h2 className="mb-4 text-base font-bold text-amber-600 flex items-center gap-2 tracking-tight">
              <Clock className="h-4 w-4" />
              Pending Approval ({pendingCount})
            </h2>
            <StaggerChildren className="grid gap-4">
              {pending.map((unit) => (
                <StaggerItem key={unit.id}>
                  <div className="rounded-xl border border-amber-500/15 bg-amber-500/[0.02] p-5 transition-all duration-200 hover:shadow-md">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/listings/${unit.id}`} className="font-semibold text-foreground transition-colors hover:text-primary">{unit.title}</Link>
                          <StatusBadge status={unit.status} />
                        </div>
                        <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed">{unit.description}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground/60">
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{unit.property.address}, {unit.property.city}</span>
                          <span className="flex items-center gap-1"><Home className="h-3 w-3" />{unit.property.title}</span>
                          <span className="font-medium">{unit.type.replace(/_/g, " ")}</span>
                        </div>
                        <p className="text-xs text-muted-foreground/50">By {unit.property.landlord.name}</p>
                        <div className="flex items-center gap-3">
                          <p className="text-lg font-bold text-foreground tracking-tight">Rs. {unit.price.toLocaleString("en-IN")}/mo</p>
                          <span className="text-xs text-muted-foreground/50">
                            {new Date(unit.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                        </div>
                      </div>
                      <ListingsActions unitId={unit.id} status={unit.status} />
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </FadeIn>
      )}

      {/* All Listings Table */}
      <FadeIn delay={0.15}>
        <div>
          <h2 className="mb-4 text-base font-bold text-foreground tracking-tight">
            All Listings {currentPage > 1 && `(Page ${currentPage})`}
            {filteredUnits.length !== totalUnits && ` (${filteredUnits.length} filtered)`}
          </h2>
          <div className="overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-border/40 bg-secondary/30">
                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Unit</th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Property</th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Landlord</th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Type</th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Price</th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Status</th>
                    <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {filteredUnits.map((unit) => (
                    <tr key={unit.id} className="transition-colors duration-150 hover:bg-secondary/20">
                      <td className="whitespace-nowrap px-6 py-4">
                        <Link href={`/admin/listings/${unit.id}`} className="text-sm font-medium text-foreground transition-colors duration-200 hover:text-primary">
                          {unit.title}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground/70">{unit.property.title}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground/70">{unit.property.landlord.name}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground/70">{unit.type.replace(/_/g, " ")}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-foreground tabular-nums">Rs. {unit.price.toLocaleString("en-IN")}</td>
                      <td className="whitespace-nowrap px-6 py-4"><StatusBadge status={unit.status} /></td>
                      <td className="whitespace-nowrap px-6 py-4 text-right"><ListingsActions unitId={unit.id} status={unit.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-border/30 px-6 py-4 bg-card">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/admin/listings"
                searchParams={{ status: statusFilter, city: cityFilter, type: typeFilter, query: params.query }}
              />
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
