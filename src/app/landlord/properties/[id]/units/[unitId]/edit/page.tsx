import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import EditUnitForm from "./form";

export default async function EditUnitPage({
  params,
}: {
  params: Promise<{ id: string; unitId: string }>;
}) {
  const { id, unitId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/");

  const property = await prisma.property.findUnique({
    where: { id },
    select: { landlordId: true, title: true },
  });

  if (!property || property.landlordId !== session.user.id) {
    redirect("/landlord/properties");
  }

  const unit = await prisma.unit.findUnique({
    where: { id: unitId },
    include: { media: true },
  });

  if (!unit || unit.propertyId !== id) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href={`/landlord/properties/${id}`}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Edit Unit</h1>
          <p className="mt-1 text-muted-foreground">{property.title}</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <EditUnitForm unit={JSON.parse(JSON.stringify(unit))} />
      </div>
    </div>
  );
}
