import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import DashboardShell from "./dashboard-shell";

export default async function LandlordDashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/");

  const properties = await prisma.property.findMany({
    where: { landlordId: session.user.id },
    include: {
      _count: { select: { units: true } },
      units: { select: { isAvailable: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const totalProperties = properties.length;
  const totalUnits = properties.reduce((sum, p) => sum + p._count.units, 0);
  const activeUnits = properties.reduce(
    (sum, p) => sum + p.units.filter((u) => u.isAvailable).length,
    0,
  );

  return (
    <DashboardShell
      totalProperties={totalProperties}
      totalUnits={totalUnits}
      activeUnits={activeUnits}
      properties={properties.map((p) => ({
        id: p.id,
        title: p.title,
        address: p.address,
        city: p.city,
        unitCount: p._count.units,
      }))}
    />
  );
}
