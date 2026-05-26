import Link from "next/link";
import { Plus, Home, MapPin } from "lucide-react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function LandlordPropertiesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/");

  const properties = await prisma.property.findMany({
    where: { landlordId: session.user.id },
    include: {
      _count: {
        select: { units: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">My Properties</h1>
        <Link
          href="/landlord/new-property"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Property
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <Link
            key={property.id}
            href={`/landlord/properties/${property.id}`}
            className="group block rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
              <Home className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-foreground line-clamp-1">{property.title}</h3>
            <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span className="line-clamp-1">{property.address}, {property.city}</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
              <span className="text-sm font-medium text-muted-foreground">
                {property._count.units} {property._count.units === 1 ? "Unit" : "Units"}
              </span>
              <span className="text-sm font-medium text-primary group-hover:underline">Manage &rarr;</span>
            </div>
          </Link>
        ))}

        {properties.length === 0 && (
          <div className="col-span-full rounded-xl border border-border bg-card p-12 text-center">
            <Home className="mx-auto h-12 w-12 text-muted-foreground/30" />
            <h3 className="mt-4 text-lg font-semibold text-foreground">No properties yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Get started by adding your first property to manage rooms and flats.
            </p>
            <Link
              href="/landlord/new-property"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              Add Property
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
