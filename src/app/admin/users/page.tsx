import prisma from "@/lib/prisma";
import { RoleBadge } from "@/components/admin/role-badge";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { Search } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { UsersRoleActions } from "./user-actions";
import { FadeIn } from "@/components/page-transition";
import { SearchInput, FilterChip, ClearFilters } from "@/components/admin/admin-filters";
import { PageHeader, pageHeaderPresets } from "@/components/admin/page-header";

const PAGE_SIZE = 20;

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; role?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params.query?.toLowerCase();
  const roleFilter = params.role;
  const currentPage = Math.max(1, Number(params.page) || 1);

  const where: Record<string, unknown> = {};
  if (roleFilter && ["ADMIN", "LANDLORD", "USER"].includes(roleFilter)) {
    where.role = roleFilter;
  }

  const [totalUsers, users] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        _count: { select: { properties: true, reviews: true, inquiries: true } },
      },
    }),
  ]);

  const totalPages = Math.ceil(totalUsers / PAGE_SIZE);
  const countAll = totalUsers;
  const [countAdmins, countLandlords, countUsers] = roleFilter
    ? [0, 0, 0]
    : await Promise.all([
        prisma.user.count({ where: { role: "ADMIN" } }),
        prisma.user.count({ where: { role: "LANDLORD" } }),
        prisma.user.count({ where: { role: "USER" } }),
      ]);

  const filteredUsers = query
    ? users.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query),
      )
    : users;

  return (
    <div className="space-y-6">
      <PageHeader title="Users" description={`${totalUsers} registered user${totalUsers !== 1 ? "s" : ""} on the platform.`} icon={pageHeaderPresets.users.icon} gradient={pageHeaderPresets.users.gradient} iconColor={pageHeaderPresets.users.iconColor} iconBg={pageHeaderPresets.users.iconBg} />

      <FadeIn delay={0.05}>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <FilterChip label="All" param="role" value="" isActive={!roleFilter} count={countAll || totalUsers} />
            <FilterChip label="Admins" param="role" value="ADMIN" isActive={roleFilter === "ADMIN"} count={countAdmins} />
            <FilterChip label="Landlords" param="role" value="LANDLORD" isActive={roleFilter === "LANDLORD"} count={countLandlords} />
            <FilterChip label="Users" param="role" value="USER" isActive={roleFilter === "USER"} count={countUsers} />
            <ClearFilters params={["role", "query"]} />
          </div>
          <div className="w-full sm:w-64">
            <SearchInput placeholder="Search name or email..." />
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm transition-all duration-200 hover:shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-border/40 bg-secondary/30">
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">User</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Email</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Role</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Properties</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Activity</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Joined</th>
                  <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="transition-colors duration-150 hover:bg-secondary/20">
                    <td className="whitespace-nowrap px-6 py-4">
                      <Link href={`/admin/users/${user.id}`} className="flex items-center gap-3">
                        <Avatar name={user.name} image={user.image} size="sm" />
                        <span className="text-sm font-medium text-foreground">{user.name}</span>
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground/70">{user.email}</td>
                    <td className="whitespace-nowrap px-6 py-4"><RoleBadge role={user.role} /></td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground/70">{user._count.properties}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground/60">
                        <span>{user._count.reviews} reviews</span>
                        <span>{user._count.inquiries} inquiries</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground/60">
                      {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <UsersRoleActions userId={user.id} currentRole={user.role} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border/30 px-6 py-4 bg-card">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/admin/users"
              searchParams={{ role: roleFilter, query: params.query }}
            />
          </div>
        </div>
      </FadeIn>

      {filteredUsers.length === 0 && (
        <FadeIn>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-card p-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground">No users found</h3>
            <p className="mt-1 text-sm text-muted-foreground/70">
              {query ? `No users matching "${query}"` : "No users registered yet."}
            </p>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
