import prisma from "@/lib/prisma";
import {
  Users, Home, Building2, AlertTriangle, MessageSquare,
  Heart, Star, Mail, TrendingUp, BarChart3, MapPin,
  DollarSign, ChevronRight, BellRing,
} from "lucide-react";
import Link from "next/link";
import { StatCard } from "@/components/admin/stat-card";
import { RoleBadge } from "@/components/admin/role-badge";
import { PageHeader, pageHeaderPresets } from "@/components/admin/page-header";
import { ChartCard } from "@/components/admin/charts/chart-card";
import { LineChart } from "@/components/admin/charts/line-chart";
import { BarChart } from "@/components/admin/charts/bar-chart";
import { DonutChart } from "@/components/admin/charts/donut-chart";
import { HorizontalBar } from "@/components/admin/charts/horizontal-bar";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/page-transition";
import { PeriodSelect } from "@/components/admin/period-select";
import { getDashboardData } from "./actions";

function TrendBadge({ value }: { value: number }) {
  if (value === 0) return null;
  const isUp = value > 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${isUp ? "text-green-600" : "text-red-500"}`}>
      <span className="text-[10px]">{isUp ? "▲" : "▼"}</span>
      {Math.abs(value)}%
    </span>
  );
}

export default async function AdminOverviewPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const { period } = await searchParams;
  const data = await getDashboardData(period || "30d");
  const { stats, timeSeries, breakdowns, topLists } = data;

  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  const recentListings = await prisma.unit.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      property: { select: { title: true, city: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <PageHeader
          {...pageHeaderPresets.dashboard}
          title="Admin Dashboard"
          description={data.period.label + ` - ${data.stats.listings.total} total listings`}
        />
        <PeriodSelect />
      </div>

      {/* Stat Cards */}
      <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        <StaggerItem>
          <StatCard
            label="Total Users"
            value={stats.users.total}
            icon={<Users className="h-5 w-5" />}
            color="text-primary"
            bg="bg-primary/10"
            trend={stats.users.trend !== 0 ? { value: Math.abs(stats.users.trend), positive: stats.users.trend > 0 } : undefined}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            label="Landlords"
            value={stats.landlords.total}
            icon={<Building2 className="h-5 w-5" />}
            color="text-violet-600"
            bg="bg-violet-500/10"
            trend={stats.landlords.trend !== 0 ? { value: Math.abs(stats.landlords.trend), positive: stats.landlords.trend > 0 } : undefined}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            label="Properties"
            value={stats.properties.total}
            icon={<Home className="h-5 w-5" />}
            color="text-emerald-600"
            bg="bg-emerald-500/10"
            trend={stats.properties.trend !== 0 ? { value: Math.abs(stats.properties.trend), positive: stats.properties.trend > 0 } : undefined}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            label="Total Listings"
            value={stats.listings.total}
            icon={<BarChart3 className="h-5 w-5" />}
            color="text-blue-600"
            bg="bg-blue-500/10"
            trend={stats.listings.trend !== 0 ? { value: Math.abs(stats.listings.trend), positive: stats.listings.trend > 0 } : undefined}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            label="Pending"
            value={stats.pendingListings}
            icon={<AlertTriangle className="h-5 w-5" />}
            color="text-amber-600"
            bg="bg-amber-500/10"
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            label="Inquiries"
            value={stats.inquiries.total}
            icon={<MessageSquare className="h-5 w-5" />}
            color="text-cyan-600"
            bg="bg-cyan-500/10"
            trend={stats.inquiries.trend !== 0 ? { value: Math.abs(stats.inquiries.trend), positive: stats.inquiries.trend > 0 } : undefined}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            label="Favorites"
            value={stats.favorites.total}
            icon={<Heart className="h-5 w-5" />}
            color="text-rose-600"
            bg="bg-rose-500/10"
            trend={stats.favorites.trend !== 0 ? { value: Math.abs(stats.favorites.trend), positive: stats.favorites.trend > 0 } : undefined}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            label="Reviews"
            value={stats.reviews.total}
            icon={<Star className="h-5 w-5" />}
            color="text-amber-600"
            bg="bg-amber-500/10"
            trend={stats.reviews.trend !== 0 ? { value: Math.abs(stats.reviews.trend), positive: stats.reviews.trend > 0 } : undefined}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            label="Avg Rating"
            value={stats.avgRating.toFixed(1)}
            icon={<Star className="h-5 w-5" />}
            color="text-yellow-600"
            bg="bg-yellow-500/10"
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            label="Active Subs"
            value={stats.newsletterActive}
            icon={<Mail className="h-5 w-5" />}
            color="text-indigo-600"
            bg="bg-indigo-500/10"
          />
        </StaggerItem>
      </StaggerChildren>

      {/* Time Series Line Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <ChartCard
          title="New Users"
          subtitle={data.period.label}
          icon={<Users className="h-4 w-4" />}
          delay={0.05}
          action={stats.users.new > 0 ? <TrendBadge value={stats.users.trend} /> : undefined}
        >
          <LineChart
            labels={timeSeries.dates}
            series={[{
              label: "Users",
              values: timeSeries.users,
              color: "text-primary",
              gradientColor: "text-primary/8",
            }]}
            height={180}
          />
        </ChartCard>
        <ChartCard
          title="New Listings"
          subtitle={data.period.label}
          icon={<Home className="h-4 w-4" />}
          delay={0.1}
          action={stats.listings.new > 0 ? <TrendBadge value={stats.listings.trend} /> : undefined}
        >
          <LineChart
            labels={timeSeries.dates}
            series={[{
              label: "Listings",
              values: timeSeries.listings,
              color: "text-blue-500",
              gradientColor: "text-blue-500/8",
            }]}
            height={180}
          />
        </ChartCard>
        <ChartCard
          title="Inquiries"
          subtitle={data.period.label}
          icon={<MessageSquare className="h-4 w-4" />}
          delay={0.15}
          action={stats.inquiries.new > 0 ? <TrendBadge value={stats.inquiries.trend} /> : undefined}
        >
          <LineChart
            labels={timeSeries.dates}
            series={[{
              label: "Inquiries",
              values: timeSeries.inquiries,
              color: "text-cyan-500",
              gradientColor: "text-cyan-500/8",
            }]}
            height={180}
          />
        </ChartCard>
      </div>

      {/* Reviews & Favorites time series */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard
          title="Reviews Over Time"
          subtitle={data.period.label}
          icon={<Star className="h-4 w-4" />}
          delay={0.2}
        >
          <LineChart
            labels={timeSeries.dates}
            series={[{
              label: "Reviews",
              values: timeSeries.reviews,
              color: "text-amber-500",
              gradientColor: "text-amber-500/8",
            }]}
            height={160}
          />
        </ChartCard>
        <ChartCard
          title="Favorites Over Time"
          subtitle={data.period.label}
          icon={<Heart className="h-4 w-4" />}
          delay={0.25}
        >
          <LineChart
            labels={timeSeries.dates}
            series={[{
              label: "Favorites",
              values: timeSeries.favorites,
              color: "text-rose-500",
              gradientColor: "text-rose-500/8",
            }]}
            height={160}
          />
        </ChartCard>
      </div>

      {/* Stats + Breakdowns */}
      <div className="grid gap-6 lg:grid-cols-6">
        {/* Listings by Status (Donut) */}
        <div className="lg:col-span-2">
          <ChartCard
            title="Listings by Status"
            icon={<BarChart3 className="h-4 w-4" />}
            delay={0.3}
          >
            <DonutChart
              data={breakdowns.listingsByStatus}
              size={160}
            />
          </ChartCard>
        </div>

        {/* Listings by Type (Bar) */}
        <div className="lg:col-span-2">
          <ChartCard
            title="Listings by Type"
            icon={<Home className="h-4 w-4" />}
            delay={0.35}
          >
            {breakdowns.listingsByType.length > 0 ? (
              <BarChart
                data={breakdowns.listingsByType}
                color="text-violet-500"
                height={200}
              />
            ) : (
              <div className="flex items-center justify-center h-[200px] text-sm text-muted-foreground/50">
                No listings yet
              </div>
            )}
          </ChartCard>
        </div>

        {/* Price Distribution (Bar) */}
        <div className="lg:col-span-2">
          <ChartCard
            title="Price Distribution"
            subtitle={`Avg ₹${breakdowns.priceStats.avg.toLocaleString("en-IN")}`}
            icon={<DollarSign className="h-4 w-4" />}
            delay={0.4}
          >
            {breakdowns.priceRanges.some((r) => r.value > 0) ? (
              <BarChart
                data={breakdowns.priceRanges}
                color="text-emerald-500"
                height={200}
              />
            ) : (
              <div className="flex items-center justify-center h-[200px] text-sm text-muted-foreground/50">
                No data
              </div>
            )}
          </ChartCard>
        </div>
      </div>

      {/* City + Amenities + Ratings */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top Cities */}
        <ChartCard
          title="Listings by City"
          icon={<MapPin className="h-4 w-4" />}
          delay={0.45}
        >
          {breakdowns.listingsByCity.length > 0 ? (
            <HorizontalBar
              data={breakdowns.listingsByCity.map((c, i) => ({
                ...c,
                color: i === 0 ? "bg-primary" : i === 1 ? "bg-violet-500" : i === 2 ? "bg-amber-500" : "bg-blue-400",
              }))}
              showRank
            />
          ) : (
            <div className="flex items-center justify-center h-[200px] text-sm text-muted-foreground/50">
              No data
            </div>
          )}
        </ChartCard>

        {/* Amenities Popularity */}
        <ChartCard
          title="Amenities Popularity"
          subtitle={`% of ${stats.listings.total} listings`}
          icon={<Home className="h-4 w-4" />}
          delay={0.5}
        >
          {breakdowns.amenitiesPopularity.length > 0 ? (
            <HorizontalBar
              data={breakdowns.amenitiesPopularity.map((a) => ({
                label: a.label,
                value: Math.round((a.value / a.total) * 100),
                color: "bg-cyan-500",
              }))}
            />
          ) : (
            <div className="flex items-center justify-center h-[200px] text-sm text-muted-foreground/50">
              No data
            </div>
          )}
        </ChartCard>

        {/* Rating Distribution */}
        <ChartCard
          title="Rating Distribution"
          subtitle={`Avg ${stats.avgRating.toFixed(1)} / 5`}
          icon={<Star className="h-4 w-4" />}
          delay={0.55}
        >
          {breakdowns.ratingDistribution.some((r) => r.value > 0) ? (
            <BarChart
              data={breakdowns.ratingDistribution}
              color="text-yellow-500"
              height={200}
              showValues
            />
          ) : (
            <div className="flex items-center justify-center h-[200px] text-sm text-muted-foreground/50">
              No reviews yet
            </div>
          )}
        </ChartCard>
      </div>

      {/* Top Lists Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard
          title="Most Favorited"
          icon={<Heart className="h-4 w-4" />}
          delay={0.6}
        >
          {topLists.topFavorited.length > 0 ? (
            <HorizontalBar
              data={topLists.topFavorited.map((f, i) => ({
                label: f.label,
                value: f.value,
                color: i === 0 ? "bg-rose-500" : "bg-rose-400/70",
              }))}
              showRank
            />
          ) : (
            <div className="flex items-center justify-center h-[150px] text-sm text-muted-foreground/50">
              No favorites yet
            </div>
          )}
        </ChartCard>
        <ChartCard
          title="Most Inquired"
          icon={<MessageSquare className="h-4 w-4" />}
          delay={0.65}
        >
          {topLists.topInquired.length > 0 ? (
            <HorizontalBar
              data={topLists.topInquired.map((f, i) => ({
                label: f.label,
                value: f.value,
                color: i === 0 ? "bg-cyan-500" : "bg-cyan-400/70",
              }))}
              showRank
            />
          ) : (
            <div className="flex items-center justify-center h-[150px] text-sm text-muted-foreground/50">
              No inquiries yet
            </div>
          )}
        </ChartCard>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        <FadeIn delay={0.7}>
          <div className="rounded-2xl border border-border/40 bg-card shadow-sm transition-all duration-200 hover:shadow-md overflow-hidden">
            <div className="border-b border-border/40 px-6 py-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-foreground tracking-tight">Recent Users</h2>
              <Link
                href="/admin/users"
                className="text-xs font-medium text-primary transition-colors duration-200 hover:text-primary/80 flex items-center gap-1"
              >
                View all
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="divide-y divide-border/30">
              {recentUsers.map((user) => (
                <Link
                  key={user.id}
                  href={`/admin/users/${user.id}`}
                  className="flex items-center justify-between px-6 py-3.5 transition-all duration-200 hover:bg-secondary/40 active:scale-[0.995]"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-sm font-bold text-primary ring-1 ring-primary/20">
                      {user.name[0]?.toUpperCase()}
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <p className="text-sm font-semibold text-foreground truncate leading-tight">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground/60 truncate leading-tight">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <RoleBadge role={user.role} />
                    <span className="text-xs text-muted-foreground/50 font-medium">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Recent Listings */}
        <FadeIn delay={0.75}>
          <div className="rounded-2xl border border-border/40 bg-card shadow-sm transition-all duration-200 hover:shadow-md overflow-hidden">
            <div className="border-b border-border/40 px-6 py-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-foreground tracking-tight">Recent Listings</h2>
              <Link
                href="/admin/listings"
                className="text-xs font-medium text-primary transition-colors duration-200 hover:text-primary/80 flex items-center gap-1"
              >
                View all
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="divide-y divide-border/30">
              {recentListings.map((unit) => (
                <Link
                  key={unit.id}
                  href={`/admin/listings/${unit.id}`}
                  className="flex items-center justify-between px-6 py-3.5 transition-all duration-200 hover:bg-secondary/40 active:scale-[0.995]"
                >
                  <div className="min-w-0 space-y-0.5">
                    <p className="text-sm font-semibold text-foreground truncate leading-tight">
                      {unit.title}
                    </p>
                    <p className="text-xs text-muted-foreground/60 truncate leading-tight">
                      {unit.property.title} &middot; {unit.property.city}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-sm font-semibold text-foreground tabular-nums">
                      {"₹" + unit.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-muted-foreground/50 font-medium">
                      {new Date(unit.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
