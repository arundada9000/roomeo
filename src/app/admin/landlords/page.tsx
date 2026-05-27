import prisma from "@/lib/prisma";
import Link from "next/link";
import { Building2, Home, MapPin, ArrowRight } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { StatCard } from "@/components/admin/stat-card";
import { Pagination } from "@/components/ui/pagination";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/page-transition";
import { SearchInput, ClearFilters } from "@/components/admin/admin-filters";
import { PageHeader, pageHeaderPresets } from "@/components/admin/page-header";

const PAGE_SIZE = 18;

export default async function AdminLandlordsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const query = params.query?.toLowerCase();

  const where = { role: "LANDLORD" as const };

  const [totalLandlords, landlords] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        _count: { select: { properties: true, reviews: true } },
        properties: {
          select: { id: true, title: true, city: true, _count: { select: { units: true } } },
        },
      },
    }),
  ]);

  const totalPages = Math.ceil(totalLandlords / PAGE_SIZE);
  const totalProperties = landlords.reduce((s, l) => s + l._count.properties, 0);
  const totalUnits = landlords.reduce((s, l) => s + l.properties.reduce((s2, p) => s2 + p._count.units, 0), 0);

  const filteredLandlords = query
    ? landlords.filter(
        (l) =>
          l.name.toLowerCase().includes(query) ||
          l.email.toLowerCase().includes(query) ||
          l.properties.some((p) => p.city.toLowerCase().includes(query)),
      )
    : landlords;

  return (
    <div className="space-y-6">
      <PageHeader title="Landlords" description={`${totalLandlords} landlord${totalLandlords !== 1 ? "s" : ""} managing properties.`} icon={pageHeaderPresets.landlords.icon} gradient={pageHeaderPresets.landlords.gradient} iconColor={pageHeaderPresets.landlords.iconColor} iconBg={pageHeaderPresets.landlords.iconBg} />

      <StaggerChildren className="grid gap-5 sm:grid-cols-3">
        <StaggerItem>
          <StatCard label="Total Landlords" value={totalLandlords} icon={<Building2 className="h-5 w-5" />} color="text-violet-600" bg="bg-violet-500/10" />
        </StaggerItem>
        <StaggerItem>
          <StatCard label="Total Properties" value={totalProperties} icon={<Home className="h-5 w-5" />} color="text-primary" bg="bg-primary/10" />
        </StaggerItem>
        <StaggerItem>
          <StatCard label="Total Units" value={totalUnits} icon={<MapPin className="h-5 w-5" />} color="text-green-600" bg="bg-green-500/10" />
        </StaggerItem>
      </StaggerChildren>

      <FadeIn delay={0.05}>
        <div className="flex items-center justify-between">
          <ClearFilters params={["query"]} />
          <div className="w-full sm:w-64">
            <SearchInput placeholder="Search name, email, city..." />
          </div>
        </div>
      </FadeIn>

      {filteredLandlords.length === 0 ? (
        <FadeIn>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-card p-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground">No landlords found</h3>
            <p className="mt-1 text-sm text-muted-foreground/70">
              {query ? `No landlords matching "${query}"` : "No landlords registered yet."}
            </p>
          </div>
        </FadeIn>
      ) : (
        <>
          <StaggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredLandlords.map((landlord) => (
              <StaggerItem key={landlord.id}>
                <Link
                  href={`/admin/landlords/${landlord.id}`}
                  className="group block rounded-2xl border border-border/40 bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.995]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3.5">
                      <Avatar name={landlord.name} image={landlord.image} size="lg" />
                      <div className="min-w-0 space-y-0.5">
                        <p className="text-sm font-bold text-foreground truncate leading-tight transition-colors duration-200 group-hover:text-primary">{landlord.name}</p>
                        <p className="text-xs text-muted-foreground/60 truncate">{landlord.email}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/30 transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 shrink-0" />
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground/60">
                    <span className="flex items-center gap-1.5"><Home className="h-3 w-3" />{landlord._count.properties} properties</span>
                    <span className="font-medium">{landlord.properties.reduce((s, p) => s + p._count.units, 0)} units</span>
                  </div>
                  {landlord.properties.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {landlord.properties.slice(0, 3).map((p) => (
                        <span key={p.id} className="rounded-lg bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground/70">
                          {p.city} ({p._count.units})
                        </span>
                      ))}
                      {landlord.properties.length > 3 && (
                        <span className="rounded-lg bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground/70">
                          +{landlord.properties.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                  <div className="mt-4 text-[10px] text-muted-foreground/40 font-medium">
                    Joined {new Date(landlord.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
          <FadeIn><Pagination currentPage={currentPage} totalPages={totalPages} basePath="/admin/landlords" searchParams={{ query: params.query }} /></FadeIn>
        </>
      )}
    </div>
  );
}
