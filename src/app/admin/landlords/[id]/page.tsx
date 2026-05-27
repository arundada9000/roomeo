import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Calendar,
  Home,
  MapPin,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { RoleBadge, StatusBadge } from "@/components/admin/role-badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default async function AdminLandlordDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const landlord = await prisma.user.findUnique({
    where: { id },
    include: {
      _count: { select: { properties: true, reviews: true } },
      properties: {
        orderBy: { createdAt: "desc" },
        include: {
          _count: { select: { units: true } },
          units: {
            select: {
              id: true,
              title: true,
              price: true,
              status: true,
              type: true,
              isAvailable: true,
            },
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  });

  if (!landlord || landlord.role !== "LANDLORD") notFound();

  const allUnits = landlord.properties.flatMap((p) => p.units);
  const approvedUnits = allUnits.filter((u) => u.status === "APPROVED");
  const pendingUnits = allUnits.filter((u) => u.status === "PENDING");

  return (
    <div className="space-y-8">
      <Link
        href="/admin/landlords"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Landlords
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Avatar name={landlord.name} image={landlord.image} size="xl" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-extrabold text-foreground">
              {landlord.name}
            </h1>
            <RoleBadge role="LANDLORD" />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              {landlord.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Joined {new Date(landlord.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <Link href={`/admin/users/${landlord.id}`}>
          <Button variant="outline" size="sm">
            Full Profile
          </Button>
        </Link>
      </div>

      <Separator />

      {/* Stats */}
      <div className="grid gap-5 grid-cols-2 sm:grid-cols-4">
        <Card>
          <div className="p-5 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Home className="h-5 w-5" />
            </div>
            <p className="text-2xl font-extrabold text-foreground">
              {landlord._count.properties}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Properties</p>
          </div>
        </Card>
        <Card>
          <div className="p-5 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-600">
              <CheckCircle className="h-5 w-5" />
            </div>
            <p className="text-2xl font-extrabold text-foreground">
              {approvedUnits.length}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Active Listings
            </p>
          </div>
        </Card>
        <Card>
          <div className="p-5 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
            <p className="text-2xl font-extrabold text-foreground">
              {pendingUnits.length}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Pending</p>
          </div>
        </Card>
        <Card>
          <div className="p-5 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600">
              <MapPin className="h-5 w-5" />
            </div>
            <p className="text-2xl font-extrabold text-foreground">
              {allUnits.length}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Total Units</p>
          </div>
        </Card>
      </div>

      {/* Properties & Units */}
      {landlord.properties.map((property) => (
        <div
          key={property.id}
          className="rounded-3xl border border-border/40 bg-card shadow-sm overflow-hidden"
        >
          <div className="border-b border-border/40 px-7 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  {property.title}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {property._count.units} units
                </p>
              </div>
            </div>
          </div>

          {property.units.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-border/60 bg-secondary/30">
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Unit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Available
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {property.units.map((unit) => (
                    <tr
                      key={unit.id}
                      className="transition-colors hover:bg-secondary/20"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground">
                        {unit.title}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                        {unit.type.replace(/_/g, " ")}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground">
                        Rs. {unit.price.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <StatusBadge status={unit.status} />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {unit.isAvailable ? (
                          <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                            <CheckCircle className="h-3 w-3" />
                            Yes
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                            <XCircle className="h-3 w-3" />
                            No
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-7 py-6 text-center text-sm text-muted-foreground">
              No units listed for this property.
            </div>
          )}
        </div>
      ))}

      {landlord.properties.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-border/40 bg-card p-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
            <Home className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold text-foreground">No properties</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            This landlord hasn&apos;t added any properties yet.
          </p>
        </div>
      )}
    </div>
  );
}
