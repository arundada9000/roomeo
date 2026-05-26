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
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Properties",
      value: propertyCount,
      icon: Home,
      color: "text-green-600",
      bg: "bg-green-500/10",
    },
    {
      label: "Total Units",
      value: unitCount,
      icon: Layers,
      color: "text-violet-600",
      bg: "bg-violet-500/10",
    },
    {
      label: "Pending Approval",
      value: pendingCount,
      icon: AlertTriangle,
      color: "text-amber-600",
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
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          Platform overview and quick stats.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-border/40 bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-muted-foreground">
                {stat.label}
              </span>
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl ${stat.bg}`}
              >
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-4xl font-extrabold text-foreground tracking-tight">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Users */}
      <div className="rounded-3xl border border-border/40 bg-card shadow-sm overflow-hidden">
        <div className="border-b border-border/40 px-7 py-5">
          <h2 className="text-lg font-bold text-foreground">
            Recent Users
          </h2>
        </div>
        <div className="divide-y divide-border/40">
          {recentUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between px-7 py-5 transition-colors hover:bg-secondary/30"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-sm font-bold text-primary">
                  {user.name[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <span
                className={`rounded-xl px-3 py-1 text-xs font-bold ${
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
