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
