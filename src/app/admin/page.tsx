import prisma from "@/lib/prisma";
import { Users, Home, Layers, AlertTriangle } from "lucide-react";

export default async function AdminOverviewPage() {
  const [userCount, propertyCount, unitCount, pendingCount] = await Promise.all(
    [
      prisma.user.count(),
      prisma.property.count(),
      prisma.unit.count(),
      prisma.unit.count({ where: { status: "PENDING" } }),
    ]
  );

  const stats = [
    {
      label: "Total Users",
      value: userCount,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Properties",
      value: propertyCount,
      icon: Home,
      color: "text-teal-500",
      bg: "bg-teal-500/10",
    },
    {
      label: "Total Units",
      value: unitCount,
      icon: Layers,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      label: "Pending Approval",
      value: pendingCount,
      icon: AlertTriangle,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  // Recent users
  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          Platform overview and quick stats.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </span>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}
              >
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Users */}
      <div className="rounded-2xl border border-border bg-card shadow-sm">
        <div className="border-b border-border/60 px-6 py-4">
          <h2 className="text-lg font-semibold text-foreground">
            Recent Users
          </h2>
        </div>
        <div className="divide-y divide-border/60">
          {recentUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between px-6 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {user.name[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  user.role === "ADMIN"
                    ? "bg-amber-500/10 text-amber-600"
                    : user.role === "LANDLORD"
                    ? "bg-primary/10 text-primary"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {user.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
