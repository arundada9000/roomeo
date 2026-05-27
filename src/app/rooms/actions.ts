"use server";

import prisma from "@/lib/prisma";
import { Prisma, type RoomType } from "@prisma/client";

export interface RoomsFilters {
  query?: string;
  priceMin?: number;
  priceMax?: number;
  roomType?: RoomType[];
  furnished?: boolean;
  attachedBath?: boolean;
  wifi?: boolean;
  parking?: boolean;
  petFriendly?: boolean;
  balcony?: boolean;
  kitchenAccess?: boolean;
  bachelorFriendly?: boolean;
  familyFriendly?: boolean;
  boysOnly?: boolean;
  girlsOnly?: boolean;
  availableNow?: boolean;
  sort?: "newest" | "price_asc" | "price_desc";
  page?: number;
}

export interface RoomsResult {
  units: Array<{
    id: string;
    title: string;
    description: string | null;
    type: string;
    price: number;
    currency: string;
    isAvailable: boolean;
    furnished: boolean;
    attachedBath: boolean;
    wifi: boolean;
    parking: boolean;
    petFriendly: boolean;
    balcony: boolean;
    kitchenAccess: boolean;
    createdAt: Date;
    property: {
      id: string;
      title: string;
      address: string;
      city: string;
      state: string;
      lat: number;
      lng: number;
    };
    media: { id: string; url: string; type: string }[];
  }>;
  total: number;
  totalPages: number;
  currentPage: number;
}

export async function getRooms(filters: RoomsFilters = {}): Promise<RoomsResult> {
  const page = Math.max(1, filters.page ?? 1);
  const sort = filters.sort ?? "newest";

  const where: Prisma.UnitWhereInput = { status: "APPROVED" };

  if (filters.priceMin || filters.priceMax) {
    where.price = {};
    if (filters.priceMin) where.price.gte = filters.priceMin;
    if (filters.priceMax) where.price.lte = filters.priceMax;
  }

  if (filters.roomType && filters.roomType.length > 0) {
    where.type = { in: filters.roomType };
  }

  if (filters.furnished) where.furnished = true;
  if (filters.attachedBath) where.attachedBath = true;
  if (filters.wifi) where.wifi = true;
  if (filters.parking) where.parking = true;
  if (filters.petFriendly) where.petFriendly = true;
  if (filters.balcony) where.balcony = true;
  if (filters.kitchenAccess) where.kitchenAccess = true;
  if (filters.bachelorFriendly) where.bachelorFriendly = true;
  if (filters.familyFriendly) where.familyFriendly = true;
  if (filters.boysOnly) where.boysOnly = true;
  if (filters.girlsOnly) where.girlsOnly = true;
  if (filters.availableNow) where.isAvailable = true;

  if (filters.query) {
    const q = filters.query;
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
      { property: { city: { contains: q, mode: "insensitive" } } },
      { property: { address: { contains: q, mode: "insensitive" } } },
    ];
  }

  let orderBy: Prisma.UnitOrderByWithRelationInput = { createdAt: "desc" };
  if (sort === "price_asc") orderBy = { price: "asc" };
  else if (sort === "price_desc") orderBy = { price: "desc" };

  const [units, total] = await Promise.all([
    prisma.unit.findMany({
      where,
      include: {
        property: {
          select: { id: true, title: true, address: true, city: true, state: true, lat: true, lng: true },
        },
        media: { take: 1 },
      },
      orderBy,
      skip: (page - 1) * 12,
      take: 12,
    }),
    prisma.unit.count({ where }),
  ]);

  return {
    units,
    total,
    totalPages: Math.ceil(total / 12),
    currentPage: page,
  };
}
