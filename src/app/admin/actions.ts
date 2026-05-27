"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });
  if (user?.role !== "ADMIN") throw new Error("Forbidden");

  return session;
}

function getPeriodDates(period: string) {
  const now = new Date();
  const end = new Date(now);
  let start: Date;
  let priorStart: Date;

  switch (period) {
    case "7d":
      start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      priorStart = new Date(start.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "90d":
      start = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      priorStart = new Date(start.getTime() - 90 * 24 * 60 * 60 * 1000);
      break;
    case "all":
      start = new Date(0);
      priorStart = new Date(0);
      break;
    default: // 30d
      start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      priorStart = new Date(start.getTime() - 30 * 24 * 60 * 60 * 1000);
  }

  return { start, priorStart, end };
}

function computeTrend(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

function buildTimeSeries<T extends { createdAt: Date }>(
  items: T[],
  periodStart: Date,
  periodEnd: Date,
): { dates: string[]; counts: number[] } {
  const dates: string[] = [];
  const counts: number[] = [];
  const diffDays = Math.ceil(
    (periodEnd.getTime() - periodStart.getTime()) / (24 * 60 * 60 * 1000),
  );

  for (let i = diffDays; i >= 0; i--) {
    const date = new Date(periodEnd.getTime() - i * 24 * 60 * 60 * 1000);
    const dayStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    dates.push(dayStr);
    const dateStr = date.toLocaleDateString();
    counts.push(
      items.filter(
        (item) =>
          new Date(item.createdAt).toLocaleDateString() === dateStr,
      ).length,
    );
  }

  return { dates, counts };
}

export async function getStats() {
  await requireAdmin();

  const [userCount, landlordCount, propertyCount, unitCount, pendingCount, recentUsers] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "LANDLORD" } }),
      prisma.property.count(),
      prisma.unit.count(),
      prisma.unit.count({ where: { status: "PENDING" } }),
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, name: true, email: true, role: true, createdAt: true },
      }),
    ]);

  return { userCount, landlordCount, propertyCount, unitCount, pendingCount, recentUsers };
}

export async function getDashboardData(period: string = "30d") {
  await requireAdmin();

  const { start, priorStart, end } = getPeriodDates(period);

  const periodIsAll = period === "all";

  // Parallel data fetching
  const [
    allUsers,
    usersInPeriod,
    usersInPrior,
    allLandlords,
    landlordsInPeriod,
    landlordsInPrior,
    allProperties,
    propertiesInPeriod,
    propertiesInPrior,
    allUnits,
    unitsInPeriod,
    unitsInPrior,
    pendingUnits,
    allInquiries,
    inquiriesInPeriod,
    inquiriesInPrior,
    allFavorites,
    favoritesInPeriod,
    favoritesInPrior,
    allReviews,
    reviewsInPeriod,
    reviewsInPrior,
    ratings,
    allContacts,
    unreadContacts,
    allNewsletter,
    activeNewsletter,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: start, lte: end } } }),
    periodIsAll ? Promise.resolve(0) : prisma.user.count({ where: { createdAt: { gte: priorStart, lt: start } } }),
    prisma.user.count({ where: { role: "LANDLORD" } }),
    prisma.user.count({ where: { role: "LANDLORD", createdAt: { gte: start, lte: end } } }),
    periodIsAll ? Promise.resolve(0) : prisma.user.count({ where: { role: "LANDLORD", createdAt: { gte: priorStart, lt: start } } }),
    prisma.property.count(),
    prisma.property.count({ where: { createdAt: { gte: start, lte: end } } }),
    periodIsAll ? Promise.resolve(0) : prisma.property.count({ where: { createdAt: { gte: priorStart, lt: start } } }),
    prisma.unit.count(),
    prisma.unit.count({ where: { createdAt: { gte: start, lte: end } } }),
    periodIsAll ? Promise.resolve(0) : prisma.unit.count({ where: { createdAt: { gte: priorStart, lt: start } } }),
    prisma.unit.count({ where: { status: "PENDING" } }),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { createdAt: { gte: start, lte: end } } }),
    periodIsAll ? Promise.resolve(0) : prisma.inquiry.count({ where: { createdAt: { gte: priorStart, lt: start } } }),
    prisma.favorite.count(),
    prisma.favorite.count({ where: { createdAt: { gte: start, lte: end } } }),
    periodIsAll ? Promise.resolve(0) : prisma.favorite.count({ where: { createdAt: { gte: priorStart, lt: start } } }),
    prisma.review.count(),
    prisma.review.count({ where: { createdAt: { gte: start, lte: end } } }),
    periodIsAll ? Promise.resolve(0) : prisma.review.count({ where: { createdAt: { gte: priorStart, lt: start } } }),
    prisma.review.aggregate({ _avg: { rating: true } }),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { isRead: false } }),
    prisma.newsletterSubscription.count(),
    prisma.newsletterSubscription.count({ where: { subscribed: true } }),
  ]);

  // Time series (for period only)
  const [usersByDay, listingsByDay, inquiriesByDay, reviewsByDay, favoritesByDay] =
    await Promise.all([
      prisma.user.findMany({ where: { createdAt: { gte: start, lte: end } }, select: { createdAt: true }, orderBy: { createdAt: "asc" } }),
      prisma.unit.findMany({ where: { createdAt: { gte: start, lte: end } }, select: { createdAt: true }, orderBy: { createdAt: "asc" } }),
      prisma.inquiry.findMany({ where: { createdAt: { gte: start, lte: end } }, select: { createdAt: true }, orderBy: { createdAt: "asc" } }),
      prisma.review.findMany({ where: { createdAt: { gte: start, lte: end } }, select: { createdAt: true }, orderBy: { createdAt: "asc" } }),
      prisma.favorite.findMany({ where: { createdAt: { gte: start, lte: end } }, select: { createdAt: true }, orderBy: { createdAt: "asc" } }),
    ]);

  const timeSeriesUsers = buildTimeSeries(usersByDay, start, end);
  const timeSeriesListings = buildTimeSeries(listingsByDay, start, end);
  const timeSeriesInquiries = buildTimeSeries(inquiriesByDay, start, end);
  const timeSeriesReviews = buildTimeSeries(reviewsByDay, start, end);
  const timeSeriesFavorites = buildTimeSeries(favoritesByDay, start, end);

  // Listings by status
  const [approvedCount, rejectedCount] = await Promise.all([
    prisma.unit.count({ where: { status: "APPROVED" } }),
    prisma.unit.count({ where: { status: "REJECTED" } }),
  ]);

  const listingsByStatus = [
    { label: "Approved", value: approvedCount, color: "#22c55e" },
    { label: "Pending", value: pendingUnits, color: "#f59e0b" },
    { label: "Rejected", value: rejectedCount, color: "#ef4444" },
  ];

  // Listings by type
  const unitsByType = await prisma.unit.groupBy({
    by: ["type"],
    _count: { type: true },
    orderBy: { _count: { type: "desc" } },
  });

  const typeLabels: Record<string, string> = {
    SINGLE_ROOM: "Single Room",
    DOUBLE_ROOM: "Double Room",
    SHARED_ROOM: "Shared Room",
    FLAT: "Flat",
    STUDIO: "Studio",
    PG: "PG",
  };

  const listingsByType = unitsByType.map((u) => ({
    label: typeLabels[u.type] ?? u.type,
    value: u._count.type,
  }));

  // Listings by city (via property)
  const allUnitsWithCity = await prisma.unit.findMany({
    select: { property: { select: { city: true } } },
  });
  const cityMap = new Map<string, number>();
  for (const u of allUnitsWithCity) {
    const city = u.property.city;
    cityMap.set(city, (cityMap.get(city) || 0) + 1);
  }
  const listingsByCity = Array.from(cityMap.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);

  // Price ranges
  const priceData = await prisma.unit.aggregate({
    _min: { price: true },
    _max: { price: true },
    _avg: { price: true },
  });

  const allPrices = await prisma.unit.findMany({
    where: { status: "APPROVED" },
    select: { price: true },
  });

  const ranges = [
    { min: 0, max: 5000, label: "< ₹5K" },
    { min: 5000, max: 10000, label: "₹5K-10K" },
    { min: 10000, max: 20000, label: "₹10K-20K" },
    { min: 20000, max: 50000, label: "₹20K-50K" },
    { min: 50000, max: Infinity, label: "₹50K+" },
  ];
  const priceRanges = ranges.map((r) => ({
    label: r.label,
    value: allPrices.filter((p) => p.price >= r.min && p.price < r.max).length,
  }));

  // Amenities popularity
  const allUnitsForAmenities = await prisma.unit.findMany({
    select: {
      furnished: true,
      attachedBath: true,
      wifi: true,
      waterIncluded: true,
      powerIncluded: true,
      parking: true,
      petFriendly: true,
      balcony: true,
      kitchenAccess: true,
    },
  });
  const totalUnits = allUnitsForAmenities.length || 1;
  const amenitiesList = [
    { key: "furnished" as const, label: "Furnished" },
    { key: "attachedBath" as const, label: "Attached Bath" },
    { key: "wifi" as const, label: "Wi-Fi" },
    { key: "waterIncluded" as const, label: "Water Included" },
    { key: "powerIncluded" as const, label: "Power Included" },
    { key: "parking" as const, label: "Parking" },
    { key: "petFriendly" as const, label: "Pet Friendly" },
    { key: "balcony" as const, label: "Balcony" },
    { key: "kitchenAccess" as const, label: "Kitchen Access" },
  ];
  const amenitiesPopularity = amenitiesList.map((a) => ({
    label: a.label,
    value: allUnitsForAmenities.filter((u) => u[a.key]).length,
    total: totalUnits,
  }));

  // Rating distribution
  const ratingDist = await prisma.review.groupBy({
    by: ["rating"],
    _count: { rating: true },
    orderBy: { rating: "asc" },
  });
  const ratingDistribution = [];
  for (let i = 1; i <= 5; i++) {
    const found = ratingDist.find((r) => r.rating === i);
    ratingDistribution.push({
      label: `${i} Star${i > 1 ? "s" : ""}`,
      value: found?._count.rating ?? 0,
    });
  }

  const avgRating = ratings._avg.rating ?? 0;

  // Favorites per listing (top)
  const topFavorited = await prisma.favorite.groupBy({
    by: ["unitId"],
    _count: { unitId: true },
    orderBy: { _count: { unitId: "desc" } },
    take: 5,
  });
  const topFavUnitIds = topFavorited.map((f) => f.unitId);
  const topFavUnits = topFavUnitIds.length > 0
    ? await prisma.unit.findMany({
        where: { id: { in: topFavUnitIds } },
        select: { id: true, title: true, property: { select: { city: true } } },
      })
    : [];
  const topFavMap = new Map(topFavUnits.map((u) => [u.id, u]));
  const topFavoritedList = topFavorited.map((f) => ({
    label: topFavMap.get(f.unitId)?.title ?? f.unitId.slice(0, 8),
    value: f._count.unitId,
    subtitle: topFavMap.get(f.unitId)?.property.city,
  }));

  // Inquiries per listing
  const inquiriesByUnit = await prisma.inquiry.groupBy({
    by: ["unitId"],
    _count: { unitId: true },
    orderBy: { _count: { unitId: "desc" } },
    take: 5,
  });
  const inqUnitIds = inquiriesByUnit.map((i) => i.unitId);
  const inqUnits = inqUnitIds.length > 0
    ? await prisma.unit.findMany({
        where: { id: { in: inqUnitIds } },
        select: { id: true, title: true, property: { select: { city: true } } },
      })
    : [];
  const inqMap = new Map(inqUnits.map((u) => [u.id, u]));
  const inquiriesTopList = inquiriesByUnit.map((i) => ({
    label: inqMap.get(i.unitId)?.title ?? i.unitId.slice(0, 8),
    value: i._count.unitId,
    subtitle: inqMap.get(i.unitId)?.property.city,
  }));

  return {
    period: {
      start: start.toISOString(),
      end: end.toISOString(),
      label: period === "all" ? "All Time" : period === "7d" ? "Last 7 days" : period === "90d" ? "Last 90 days" : "Last 30 days",
    },
    stats: {
      users: { total: allUsers, new: usersInPeriod, prevNew: usersInPrior, trend: computeTrend(usersInPeriod, usersInPrior) },
      landlords: { total: allLandlords, new: landlordsInPeriod, prevNew: landlordsInPrior, trend: computeTrend(landlordsInPeriod, landlordsInPrior) },
      properties: { total: allProperties, new: propertiesInPeriod, prevNew: propertiesInPrior, trend: computeTrend(propertiesInPeriod, propertiesInPrior) },
      listings: { total: allUnits, new: unitsInPeriod, prevNew: unitsInPrior, trend: computeTrend(unitsInPeriod, unitsInPrior) },
      pendingListings: pendingUnits,
      inquiries: { total: allInquiries, new: inquiriesInPeriod, prevNew: inquiriesInPrior, trend: computeTrend(inquiriesInPeriod, inquiriesInPrior) },
      favorites: { total: allFavorites, new: favoritesInPeriod, prevNew: favoritesInPrior, trend: computeTrend(favoritesInPeriod, favoritesInPrior) },
      reviews: { total: allReviews, new: reviewsInPeriod, prevNew: reviewsInPrior, trend: computeTrend(reviewsInPeriod, reviewsInPrior) },
      avgRating: Math.round(avgRating * 10) / 10,
      contactUnread: unreadContacts,
      newsletterActive: activeNewsletter,
    },
    timeSeries: {
      dates: timeSeriesUsers.dates,
      users: timeSeriesUsers.counts,
      listings: timeSeriesListings.counts,
      inquiries: timeSeriesInquiries.counts,
      reviews: timeSeriesReviews.counts,
      favorites: timeSeriesFavorites.counts,
    },
    breakdowns: {
      listingsByStatus,
      listingsByType,
      listingsByCity,
      priceRanges,
      amenitiesPopularity,
      ratingDistribution,
      priceStats: {
        min: priceData._min.price ?? 0,
        max: priceData._max.price ?? 0,
        avg: Math.round((priceData._avg.price ?? 0) * 100) / 100,
      },
    },
    topLists: {
      topFavorited: topFavoritedList,
      topInquired: inquiriesTopList,
    },
  };
}

export async function approveUnit(unitId: string) {
  await requireAdmin();

  await prisma.unit.update({
    where: { id: unitId },
    data: { status: "APPROVED" },
  });

  revalidatePath("/admin/listings");
}

export async function rejectUnit(unitId: string) {
  await requireAdmin();

  await prisma.unit.update({
    where: { id: unitId },
    data: { status: "REJECTED" },
  });

  revalidatePath("/admin/listings");
}

export async function updateUserRole(userId: string, role: "ADMIN" | "LANDLORD" | "USER") {
  await requireAdmin();

  await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  revalidatePath("/admin/users");
  revalidatePath("/admin/admins");
  revalidatePath("/admin/landlords");
}

export async function deleteUser(userId: string) {
  await requireAdmin();

  await prisma.user.delete({
    where: { id: userId },
  });

  revalidatePath("/admin/users");
  revalidatePath("/admin/admins");
  revalidatePath("/admin/landlords");
}

export async function updateUser(
  userId: string,
  data: { name?: string; email?: string; role?: "ADMIN" | "LANDLORD" | "USER" }
) {
  await requireAdmin();

  await prisma.user.update({
    where: { id: userId },
    data,
  });

  revalidatePath("/admin/users");
  revalidatePath("/admin/users/" + userId);
}

export async function deleteUnit(unitId: string) {
  await requireAdmin();

  await prisma.unit.delete({
    where: { id: unitId },
  });

  revalidatePath("/admin/listings");
}

export async function deleteProperty(propertyId: string) {
  await requireAdmin();

  await prisma.property.delete({
    where: { id: propertyId },
  });

  revalidatePath("/admin/listings");
}

export async function getAdminUsers() {
  await requireAdmin();

  return prisma.user.findMany({
    where: { role: "ADMIN" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
      _count: { select: { properties: true } },
    },
  });
}

export async function getLandlordUsers() {
  await requireAdmin();

  return prisma.user.findMany({
    where: { role: "LANDLORD" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
      _count: { select: { properties: true } },
    },
  });
}

