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
  
  // Dummy coordinates for now, usually you'd geocode the address
  const lat = 27.7172 + (Math.random() - 0.5) * 0.05;
  const lng = 85.3240 + (Math.random() - 0.5) * 0.05;

  const property = await prisma.property.create({
    data: {
      title,
      description,
      address,
      city,
      state,
      lat,
      lng,
      landlordId: session.user.id,
    },
  });

  redirect(`/landlord/properties/${property.id}`);
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
