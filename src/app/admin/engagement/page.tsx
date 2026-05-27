import prisma from "@/lib/prisma";
import {
  Heart, TrendingUp, Building2, MapPin, Home,
  ArrowUp, ArrowDown, Minus,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/page-transition";
import { PageHeader, pageHeaderPresets } from "@/components/admin/page-header";

export default async function AdminEngagementPage() {
  const [
    totalFavorites,
    totalUsers,
    totalUnits,
    favPerUnit,
    topFavorited,
    favsByType,
    favsByCity,
    recentFavs,
    favTimeline,
  ] = await Promise.all([
    prisma.favorite.count(),
    prisma.user.count({ where: { role: { not: "ADMIN" } } }),
    prisma.unit.count({ where: { status: "APPROVED" } }),
    prisma.favorite.groupBy({ by: ["unitId"], _count: { unitId: true }, orderBy: { _count: { unitId: "desc" } }, take: 1 }),
    prisma.favorite.groupBy({
      by: ["unitId"],
      _count: { unitId: true },
      orderBy: { _count: { unitId: "desc" } },
      take: 10,
    }),
    prisma.favorite.findMany({
      include: { unit: { select: { type: true } } },
    }).then((favs) => {
      const map = new Map<string, number>();
      for (const f of favs) {
        const t = f.unit.type;
        map.set(t, (map.get(t) || 0) + 1);
      }
      return Array.from(map.entries())
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count);
    }),
    prisma.favorite.findMany({
      include: { unit: { select: { property: { select: { city: true } } } } },
    }).then((favs) => {
      const map = new Map<string, number>();
      for (const f of favs) {
        const city = f.unit.property.city;
        map.set(city, (map.get(city) || 0) + 1);
      }
      return Array.from(map.entries())
        .map(([city, count]) => ({ city, count }))
        .sort((a, b) => b.count - a.count);
    }),
    prisma.favorite.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        user: { select: { name: true, email: true } },
        unit: { select: { id: true, title: true, type: true } },
      },
    }),
    prisma.favorite.findMany({ select: { createdAt: true } })
      .then((favs) => {
        const map = new Map<string, number>();
        for (const f of favs) {
          const day = f.createdAt.toISOString().slice(0, 10);
          map.set(day, (map.get(day) || 0) + 1);
        }
        return Array.from(map.entries())
          .map(([date, count]) => ({ date, count }))
          .sort((a, b) => a.date.localeCompare(b.date));
      }),
  ]);

  // Resolve top favorited unit details
  const topUnitIds = topFavorited.map((f) => f.unitId);
  const units = topUnitIds.length > 0
    ? await prisma.unit.findMany({
        where: { id: { in: topUnitIds } },
        select: { id: true, title: true, price: true, type: true, property: { select: { city: true } } },
      })
    : [];
  const unitMap = new Map(units.map((u) => [u.id, u]));

  const topList = topFavorited.map((f) => ({
    ...f,
    unit: unitMap.get(f.unitId) ?? null,
  }));

  const maxFav = favPerUnit[0]?._count.unitId ?? 0;
  const favRate = totalUsers > 0 ? (totalFavorites / totalUsers).toFixed(1) : "0";

  // Trend arrow
  const recent7 = favTimeline.filter((d) => {
    const dt = new Date(d.date);
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return dt >= weekAgo;
  }).reduce((sum, d) => sum + d.count, 0);

  const prior7 = favTimeline.filter((d) => {
    const dt = new Date(d.date);
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
    return dt >= twoWeeksAgo && dt < weekAgo;
  }).reduce((sum, d) => sum + d.count, 0);

  const trend = prior7 > 0 ? ((recent7 - prior7) / prior7 * 100).toFixed(0) : null;

  return (
    <div className="space-y-8">
      <PageHeader title="Engagement" description="How users interact with listings - favorites, trends, and popular content." icon={pageHeaderPresets.engagement.icon} gradient={pageHeaderPresets.engagement.gradient} iconColor={pageHeaderPresets.engagement.iconColor} iconBg={pageHeaderPresets.engagement.iconBg} />

      {/* Stats Grid */}
      <StaggerChildren className="grid gap-4 sm:grid-cols-4">
        <StaggerItem>
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.03] p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-2xl font-extrabold text-rose-600 tracking-tight">{totalFavorites}</p>
                <p className="text-xs text-rose-600/70 font-medium">Total Favorites</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600">
                <Heart className="h-5 w-5" />
              </div>
            </div>
          </div>
        </StaggerItem>
        <StaggerItem>
          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.03] p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-2xl font-extrabold text-blue-600 tracking-tight">{favRate}</p>
                <p className="text-xs text-blue-600/70 font-medium">Favs per User</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
          </div>
        </StaggerItem>
        <StaggerItem>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-2xl font-extrabold text-emerald-600 tracking-tight">{totalUnits}</p>
                <p className="text-xs text-emerald-600/70 font-medium">Approved Listings</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <Home className="h-5 w-5" />
              </div>
            </div>
          </div>
        </StaggerItem>
        <StaggerItem>
          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.03] p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-2xl font-extrabold text-violet-600 tracking-tight">{maxFav}</p>
                <p className="text-xs text-violet-600/70 font-medium">Most Fav'd (1 listing)</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600">
                <ArrowUp className="h-5 w-5" />
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerChildren>

      {/* Trend + Type Distribution */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Trend indicator */}
        <FadeIn delay={0.05}>
          <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              7-Day Trend
            </h3>
            <div className="flex items-end gap-4">
              <div className="flex items-center gap-2">
                {trend !== null ? (
                  <>
                    {Number(trend) > 0 ? (
                      <ArrowUp className="h-6 w-6 text-green-500" />
                    ) : Number(trend) < 0 ? (
                      <ArrowDown className="h-6 w-6 text-red-500" />
                    ) : (
                      <Minus className="h-6 w-6 text-muted-foreground" />
                    )}
                    <span className={`text-2xl font-extrabold ${Number(trend) >= 0 ? "text-green-600" : "text-red-500"}`}>
                      {Number(trend) > 0 ? "+" : ""}{trend}%
                    </span>
                  </>
                ) : (
                  <span className="text-sm text-muted-foreground/50">Not enough data</span>
                )}
              </div>
              <div className="text-xs text-muted-foreground/60">
                {recent7} favs this week vs {prior7} last week
              </div>
            </div>
            {/* Mini sparkline */}
            {favTimeline.length > 0 && (
              <div className="mt-4 flex items-end gap-[2px] h-16">
                {favTimeline.slice(-14).map((d, i) => {
                  const h = Math.max(4, (d.count / Math.max(...favTimeline.map((x) => x.count))) * 56);
                  return (
                    <div
                      key={d.date}
                      className="flex-1 rounded-t-sm bg-primary/20 transition-all hover:bg-primary/40"
                      style={{ height: h }}
                      title={`${d.date}: ${d.count}`}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </FadeIn>

        {/* Favorites by room type */}
        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-bold text-foreground flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              Favorites by Room Type
            </h3>
            <div className="space-y-3">
              {favsByType.map((item) => {
                const pct = totalFavorites > 0 ? ((item.count / totalFavorites) * 100).toFixed(1) : "0";
                return (
                  <div key={item.type}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium text-foreground">{item.type.replace(/_/g, " ")}</span>
                      <span className="text-xs text-muted-foreground/60">{item.count} ({pct}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary/60 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Favorites by City */}
      <FadeIn delay={0.15}>
        <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold text-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Favorites by City
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {favsByCity.map((item) => {
              const pct = totalFavorites > 0 ? ((item.count / totalFavorites) * 100).toFixed(1) : "0";
              return (
                <div key={item.city} className="rounded-xl border border-border/30 bg-secondary/20 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground">{item.city}</span>
                    <Badge variant="secondary" size="sm">{item.count}</Badge>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="mt-1.5 text-[10px] text-muted-foreground/50">{pct}% of all favorites</p>
                </div>
              );
            })}
          </div>
        </div>
      </FadeIn>

      {/* Top Favorited Listings */}
      <FadeIn delay={0.2}>
        <div className="rounded-2xl border border-border/40 bg-card shadow-sm">
          <div className="border-b border-border/30 px-6 py-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-500" />
              Most Favorited Listings
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border/30 bg-secondary/20">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">#</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Listing</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">City</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Favorites</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {topList.map((item, i) => (
                  <tr key={item.unitId} className="transition-colors hover:bg-secondary/10">
                    <td className="px-6 py-3.5 text-sm font-bold text-muted-foreground/40">{i + 1}</td>
                    <td className="px-6 py-3.5">
                      <Link
                        href={`/admin/listings/${item.unitId}`}
                        className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {item.unit?.title ?? "Unknown"}
                      </Link>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-muted-foreground/70">
                      {item.unit?.type.replace(/_/g, " ") ?? "-"}
                    </td>
                    <td className="px-6 py-3.5 text-sm text-muted-foreground/70">
                      {item.unit?.property?.city ?? "-"}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <Badge variant="default" size="sm">{item._count.unitId}</Badge>
                    </td>
                  </tr>
                ))}
                {topList.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-sm text-muted-foreground/50">
                      No favorites yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>

      {/* Recent Favorites */}
      <FadeIn delay={0.25}>
        <div className="rounded-2xl border border-border/40 bg-card shadow-sm">
          <div className="border-b border-border/30 px-6 py-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Heart className="h-4 w-4 text-muted-foreground" />
              Recent Favorites
            </h3>
          </div>
          <div className="divide-y divide-border/20">
            {recentFavs.map((fav) => (
              <div key={`${fav.userId}-${fav.unitId}`} className="flex items-center gap-4 px-6 py-3.5 text-sm transition-colors hover:bg-secondary/10">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/10 text-xs font-bold text-rose-600 shrink-0">
                  {fav.user.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground truncate">{fav.user.name}</p>
                  <p className="text-xs text-muted-foreground/60 truncate">{fav.user.email}</p>
                </div>
                <Link href={`/admin/listings/${fav.unit.id}`} className="text-xs font-medium text-primary hover:underline truncate max-w-[200px]">
                  {fav.unit.title}
                </Link>
                <span className="text-[10px] text-muted-foreground/40 whitespace-nowrap shrink-0">
                  {new Date(fav.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
            ))}
            {recentFavs.length === 0 && (
              <div className="px-6 py-10 text-center text-sm text-muted-foreground/50">
                No favorites yet.
              </div>
            )}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
