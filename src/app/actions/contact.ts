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

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(1, "Message is required").max(5000),
});

export async function submitContact(formData: FormData) {
  const h = await headers();
  const { allowed, remaining } = await checkRateLimit(
    getRateLimitKey(h, "contact"),
  );
  if (!allowed) {
    return { error: `Too many requests. Try again in 60 seconds.` };
  }

  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid input" };
  }

  await prisma.contactSubmission.create({ data: parsed.data });

  return { success: true, remaining };
}

export async function getContactSubmissions() {
  await requireAdmin();
  return prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function markContactRead(id: string) {
  await requireAdmin();
  await prisma.contactSubmission.update({
    where: { id },
    data: { isRead: true },
  });
  revalidatePath("/admin/contact");
}

export async function markContactUnread(id: string) {
  await requireAdmin();
  await prisma.contactSubmission.update({
    where: { id },
    data: { isRead: false },
  });
  revalidatePath("/admin/contact");
}

export async function deleteContactSubmission(id: string) {
  await requireAdmin();
  await prisma.contactSubmission.delete({ where: { id } });
  revalidatePath("/admin/contact");
}
