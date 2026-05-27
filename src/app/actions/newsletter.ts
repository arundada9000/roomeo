"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { checkRateLimit, getRateLimitKey } from "@/lib/rate-limiter";

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

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export async function subscribeNewsletter(formData: FormData) {
  const h = await headers();
  const { allowed } = await checkRateLimit(
    getRateLimitKey(h, "newsletter"),
  );
  if (!allowed) {
    return { error: "Too many requests. Try again in 60 seconds." };
  }

  const email = formData.get("email");

  const parsed = newsletterSchema.safeParse({ email });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid email" };
  }

  const existing = await prisma.newsletterSubscription.findUnique({
    where: { email: parsed.data.email },
  });

  if (existing) {
    if (!existing.subscribed) {
      await prisma.newsletterSubscription.update({
        where: { id: existing.id },
        data: { subscribed: true },
      });
      return { success: true, message: "You're resubscribed!" };
    }
    return { error: "This email is already subscribed." };
  }

  await prisma.newsletterSubscription.create({
    data: { email: parsed.data.email },
  });

  return { success: true, message: "Subscribed successfully!" };
}

export async function getNewsletterSubscriptions() {
  await requireAdmin();
  return prisma.newsletterSubscription.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function unsubscribeNewsletter(id: string) {
  await requireAdmin();
  await prisma.newsletterSubscription.update({
    where: { id },
    data: { subscribed: false },
  });
  revalidatePath("/admin/newsletter");
}

export async function deleteNewsletterSubscription(id: string) {
  await requireAdmin();
  await prisma.newsletterSubscription.delete({ where: { id } });
  revalidatePath("/admin/newsletter");
}
