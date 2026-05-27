"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { RoomType } from "@prisma/client";

export async function createProperty(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const address = formData.get("address") as string;
  const city = formData.get("city") as string;
  const state = formData.get("state") as string;
  
  const latStr = formData.get("lat") as string;
  const lngStr = formData.get("lng") as string;
  const lat = latStr ? parseFloat(latStr) : 27.7172;
  const lng = lngStr ? parseFloat(lngStr) : 85.3240;

  const contactPhone = (formData.get("contactPhone") as string) || null;
  const contactEmail = (formData.get("contactEmail") as string) || null;

  // Unit fields
  const type = formData.get("type") as RoomType;
  const price = parseInt(formData.get("price") as string, 10);
  
  const furnished = formData.get("furnished") === "on";
  const attachedBath = formData.get("attachedBath") === "on";
  const wifi = formData.get("wifi") === "on";
  const parking = formData.get("parking") === "on";
  const petFriendly = formData.get("petFriendly") === "on";
  const balcony = formData.get("balcony") === "on";
  const kitchenAccess = formData.get("kitchenAccess") === "on";
  const waterIncluded = formData.get("waterIncluded") === "on";
  const powerIncluded = formData.get("powerIncluded") === "on";

  const bachelorFriendly = formData.get("bachelorFriendly") === "on";
  const familyFriendly = formData.get("familyFriendly") === "on";
  const boysOnly = formData.get("boysOnly") === "on";
  const girlsOnly = formData.get("girlsOnly") === "on";
  const smokingAllowed = formData.get("smokingAllowed") === "on";

  const mediaUrlsStr = formData.get("mediaUrls") as string;
  let mediaUrls: string[] = [];
  if (mediaUrlsStr) {
    try {
      mediaUrls = JSON.parse(mediaUrlsStr);
    } catch (e) {
      console.error(e);
    }
  }

  const property = await prisma.property.create({
    data: {
      title,
      description,
      address,
      city,
      state,
      lat,
      lng,
      contactPhone,
      contactEmail,
      landlordId: session.user.id,
      units: {
        create: [
          {
            title,
            description,
            type,
            price,
            currency: "NPR",
            isAvailable: true,
            status: "APPROVED",
            furnished,
            attachedBath,
            wifi,
            parking,
            petFriendly,
            balcony,
            kitchenAccess,
            waterIncluded,
            powerIncluded,
            bachelorFriendly,
            familyFriendly,
            boysOnly,
            girlsOnly,
            smokingAllowed,
            media: {
              create: mediaUrls.map((url) => ({
                url,
                type: "IMAGE",
              })),
            },
          },
        ],
      },
    },
  });

  redirect(`/landlord`);
}

export async function createUnit(propertyId: string, formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  // Ensure user owns property
  const property = await prisma.property.findUnique({
    where: { id: propertyId }
  });
  if (!property || property.landlordId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as RoomType;
  const price = parseInt(formData.get("price") as string, 10);
  
  const furnished = formData.get("furnished") === "on";
  const attachedBath = formData.get("attachedBath") === "on";
  const wifi = formData.get("wifi") === "on";
  const parking = formData.get("parking") === "on";
  const petFriendly = formData.get("petFriendly") === "on";
  const balcony = formData.get("balcony") === "on";
  const kitchenAccess = formData.get("kitchenAccess") === "on";
  const waterIncluded = formData.get("waterIncluded") === "on";
  const powerIncluded = formData.get("powerIncluded") === "on";

  const mediaUrlsStr = formData.get("mediaUrls") as string;
  let mediaUrls: string[] = [];
  if (mediaUrlsStr) {
    try {
      mediaUrls = JSON.parse(mediaUrlsStr);
    } catch (e) {
      console.error(e);
    }
  }

  const unit = await prisma.unit.create({
    data: {
      propertyId,
      title,
      description,
      type,
      price,
      currency: "NPR",
      isAvailable: true,
      status: "APPROVED", // Auto-approve for demo
      furnished,
      attachedBath,
      wifi,
      parking,
      petFriendly,
      balcony,
      kitchenAccess,
      waterIncluded,
      powerIncluded,
      media: {
        create: mediaUrls.map((url) => ({
          url,
          type: "IMAGE",
        })),
      },
    },
  });

  redirect(`/landlord/properties/${propertyId}`);
}

export async function updateUnit(unitId: string, formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const unit = await prisma.unit.findUnique({
    where: { id: unitId },
    include: { property: { select: { landlordId: true } } },
  });

  if (!unit || unit.property.landlordId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as RoomType;
  const price = parseInt(formData.get("price") as string, 10);

  const furnished = formData.get("furnished") === "on";
  const attachedBath = formData.get("attachedBath") === "on";
  const wifi = formData.get("wifi") === "on";
  const parking = formData.get("parking") === "on";
  const petFriendly = formData.get("petFriendly") === "on";
  const balcony = formData.get("balcony") === "on";
  const kitchenAccess = formData.get("kitchenAccess") === "on";
  const waterIncluded = formData.get("waterIncluded") === "on";
  const powerIncluded = formData.get("powerIncluded") === "on";

  await prisma.unit.update({
    where: { id: unitId },
    data: {
      title,
      description,
      type,
      price,
      furnished,
      attachedBath,
      wifi,
      parking,
      petFriendly,
      balcony,
      kitchenAccess,
      waterIncluded,
      powerIncluded,
    },
  });

  redirect(`/landlord/properties/${unit.propertyId}`);
}
