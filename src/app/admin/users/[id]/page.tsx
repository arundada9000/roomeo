import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Calendar, Shield, Home, MessageSquare, Star, Trash, Edit } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { RoleBadge } from "@/components/admin/role-badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserDetailActions } from "./user-detail-actions";

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      _count: { select: { properties: true, reviews: true, inquiries: true, favorites: true } },
      properties: {
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { units: true } } },
      },
    },
  });

  if (!user) notFound();

  return (
    <div className="space-y-8">
      {/* Back button */}
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Users
      </Link>

      {/* User Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Avatar name={user.name} image={user.image} size="xl" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-extrabold text-foreground">
              {user.name}
            </h1>
            <RoleBadge role={user.role} />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              {user.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <UserDetailActions userId={user.id} currentRole={user.role} userName={user.name} />
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
              {user._count.properties}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Properties</p>
          </div>
        </Card>
        <Card>
          <div className="p-5 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-600">
              <Star className="h-5 w-5" />
            </div>
            <p className="text-2xl font-extrabold text-foreground">
              {user._count.reviews}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Reviews</p>
          </div>
        </Card>
        <Card>
          <div className="p-5 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
              <MessageSquare className="h-5 w-5" />
            </div>
            <p className="text-2xl font-extrabold text-foreground">
              {user._count.inquiries}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Inquiries</p>
          </div>
        </Card>
        <Card>
          <div className="p-5 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600">
              <Shield className="h-5 w-5" />
            </div>
            <p className="text-2xl font-extrabold text-foreground">
              {user._count.favorites}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Favorites</p>
          </div>
        </Card>
      </div>

      {/* Properties */}
      {user.properties.length > 0 && (
        <div className="rounded-3xl border border-border/40 bg-card shadow-sm overflow-hidden">
          <div className="border-b border-border/40 px-7 py-5">
            <h2 className="text-lg font-bold text-foreground">
              Properties ({user._count.properties})
            </h2>
          </div>
          <div className="divide-y divide-border/40">
            {user.properties.map((property) => (
              <div
                key={property.id}
                className="px-7 py-4 transition-colors hover:bg-secondary/20"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {property.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {property.address}, {property.city}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{property._count.units} units</span>
                    <span>
                      {new Date(property.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Account Info */}
      <div className="rounded-3xl border border-border/40 bg-card shadow-sm">
        <div className="border-b border-border/40 px-7 py-5">
          <h2 className="text-lg font-bold text-foreground">
            Account Information
          </h2>
        </div>
        <div className="px-7 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                User ID
              </p>
              <p className="text-sm font-mono text-foreground mt-1 break-all">
                {user.id}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Role
              </p>
              <p className="mt-1">
                <RoleBadge role={user.role} />
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Email Verified
              </p>
              <p className="text-sm text-foreground mt-1">
                {user.emailVerified ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Member Since
              </p>
              <p className="text-sm text-foreground mt-1">
                {new Date(user.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
