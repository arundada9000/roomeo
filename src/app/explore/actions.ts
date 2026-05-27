"use server";

import prisma from "@/lib/prisma";
import type { RoomType } from "@prisma/client";

export interface ExploreFilters {
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
  searchQuery?: string;
  bounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  center?: {
    lat: number;
    lng: number;
  };
  radius?: number; // in km
}

export async function getExploreListings(filters: ExploreFilters = {}) {
  try {
    const where: any = { status: "APPROVED" };

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
    
    if (filters.availableNow) {
      where.isAvailable = true;
    }

    if (filters.searchQuery) {
      const q = filters.searchQuery;
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { property: { city: { contains: q, mode: "insensitive" } } },
        { property: { address: { contains: q, mode: "insensitive" } } },
      ];
    }

    if (filters.bounds) {
      where.property = {
        ...where.property,
        lat: { gte: filters.bounds.south, lte: filters.bounds.north },
        lng: { gte: filters.bounds.west, lte: filters.bounds.east },
      };
    }

    let propertyOrderIds: string[] = [];
    
    // If center is provided, use PostGIS to sort by distance
    // If radius is provided, filter by distance (ST_DWithin)
    if (filters.center) {
      try {
        let props: { id: string }[] = [];
        if (filters.radius) {
          // Radius based search
          props = await prisma.$queryRaw`
            SELECT id 
            FROM "Property"
            WHERE ST_DWithin(
              ST_MakePoint(lng, lat)::geography, 
              ST_MakePoint(${filters.center.lng}, ${filters.center.lat})::geography, 
              ${filters.radius * 1000}
            )
            ORDER BY ST_DistanceSphere(
              ST_MakePoint(lng, lat), 
              ST_MakePoint(${filters.center.lng}, ${filters.center.lat})
            ) ASC
            LIMIT 50
          `;
        } else if (filters.bounds) {
          // Bounds based search + distance sorting
          props = await prisma.$queryRaw`
            SELECT id 
            FROM "Property"
            WHERE lat >= ${filters.bounds.south} 
              AND lat <= ${filters.bounds.north}
              AND lng >= ${filters.bounds.west} 
              AND lng <= ${filters.bounds.east}
            ORDER BY ST_DistanceSphere(
              ST_MakePoint(lng, lat), 
              ST_MakePoint(${filters.center.lng}, ${filters.center.lat})
            ) ASC
            LIMIT 50
          `;
        }
        
        propertyOrderIds = props.map((p) => p.id);
        
        // Update where clause to only include these properties in distance order
        if (propertyOrderIds.length > 0) {
          where.propertyId = { in: propertyOrderIds };
          if (where.property) {
            delete where.property.lat;
            delete where.property.lng;
          }
        }
      } catch (e) {
        console.warn("PostGIS sorting failed, falling back to standard bounds", e);
      }
    }

    const units = await prisma.unit.findMany({
      where,
      include: {
        property: true,
        media: true,
      },
      take: 50,
    });

    // Sort units manually by the property distance order if PostGIS succeeded
    if (propertyOrderIds.length > 0) {
      units.sort((a, b) => {
        const aIndex = propertyOrderIds.indexOf(a.propertyId);
        const bIndex = propertyOrderIds.indexOf(b.propertyId);
        return aIndex - bIndex;
      });
    } else {
      units.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    return units;
  } catch (error) {
    console.error("Error fetching explore listings:", error);
    return [];
  }
}
