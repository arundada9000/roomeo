import prisma from "@/lib/prisma";
import { ShieldCheck, Calendar, Shield, Users, BadgePercent } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/admin/stat-card";
import { EmptyState } from "@/components/ui/empty-state";
import { AdminActions } from "./admin-actions";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/page-transition";
import { PageHeader, pageHeaderPresets } from "@/components/admin/page-header";

export default async function AdminAdminsPage() {
  const admins = await prisma.user.findMany({
    where: { role: "ADMIN" },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
      _count: { select: { properties: true, reviews: true } },
    },
  });

  const totalUsers = await prisma.user.count();
  const adminRatio = admins.length > 0
    ? ((admins.length / totalUsers) * 100).toFixed(1)
    : "0";

  return (
    <div className="space-y-6">
      <PageHeader title="Admin Management" description="Manage platform administrators." icon={pageHeaderPresets.admins.icon} gradient={pageHeaderPresets.admins.gradient} iconColor={pageHeaderPresets.admins.iconColor} iconBg={pageHeaderPresets.admins.iconBg} />

      <StaggerChildren className="grid gap-5 sm:grid-cols-3">
        <StaggerItem>
          <StatCard
            label="Total Admins"
            value={admins.length}
            icon={<ShieldCheck className="h-5 w-5" />}
            color="text-amber-600"
            bg="bg-amber-500/10"
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            label="Total Users"
            value={totalUsers}
            icon={<Users className="h-5 w-5" />}
            color="text-primary"
            bg="bg-primary/10"
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            label="Admin Ratio"
            value={`${adminRatio}%`}
            icon={<BadgePercent className="h-5 w-5" />}
            color="text-violet-600"
            bg="bg-violet-500/10"
          />
        </StaggerItem>
      </StaggerChildren>

      {admins.length === 0 ? (
        <FadeIn>
          <EmptyState
            title="No admins found"
            description="There are no administrators configured for the platform."
            icon={<ShieldCheck className="h-8 w-8 text-muted-foreground" />}
          />
        </FadeIn>
      ) : (
        <StaggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {admins.map((admin) => (
            <StaggerItem key={admin.id}>
              <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3.5">
                      <Avatar
                        name={admin.name}
                        image={admin.image}
                        size="lg"
                      />
                      <div className="min-w-0 space-y-0.5">
                        <p className="text-sm font-bold text-foreground truncate leading-tight">
                          {admin.name}
                        </p>
                        <p className="text-xs text-muted-foreground/60 truncate leading-tight">
                          {admin.email}
                        </p>
                      </div>
                    </div>
                    <Badge variant="admin" size="sm">ADMIN</Badge>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground/60">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" />
                      {new Date(admin.createdAt).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric",
                      })}
                    </span>
                    <span className="font-medium">
                      {admin._count.properties} properties
                    </span>
                    <span>{admin._count.reviews} reviews</span>
                  </div>

                  <div className="pt-4 border-t border-border/30">
                    <AdminActions
                      adminId={admin.id}
                      adminName={admin.name}
                    />
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      )}
    </div>
  );
}
