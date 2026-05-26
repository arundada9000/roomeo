import Link from "next/link";
import { Plus, MapPin, Edit, Eye, ArrowLeft } from "lucide-react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function PropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/");

  const property = await prisma.property.findUnique({
    where: { id: params.id, landlordId: session.user.id },
    include: {
      units: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!property) redirect("/landlord/properties");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/landlord/properties"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{property.title}</h1>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{property.address}, {property.city}, {property.state}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Units</h2>
        <Link
          href={`/landlord/properties/${property.id}/new-unit`}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Unit
        </Link>
      </div>

      <div className="grid gap-4">
        {property.units.map((unit) => (
          <div key={unit.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-foreground">{unit.title}</h3>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${unit.isAvailable ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'}`}>
                  {unit.isAvailable ? 'Available' : 'Rented'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{unit.type.replace('_', ' ')} • Rs. {unit.price.toLocaleString()}/month</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Link
                href={`/units/${unit.id}`}
                target="_blank"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                title="View Public Listing"
              >
                <Eye className="h-4 w-4" />
              </Link>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                title="Edit Unit"
              >
                <Edit className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {property.units.length === 0 && (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <h3 className="text-lg font-semibold text-foreground">No units in this property</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Add rooms, flats, or PGs to start finding tenants.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
