import prisma from "@/lib/prisma";
import { Mail, CheckCircle, XCircle, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/admin/stat-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { NewsletterActions } from "./newsletter-actions";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/page-transition";
import { SearchInput, FilterChip, ClearFilters } from "@/components/admin/admin-filters";
import { PageHeader, pageHeaderPresets } from "@/components/admin/page-header";

const PAGE_SIZE = 25;

export default async function AdminNewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string; status?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const query = params.query?.toLowerCase();
  const statusFilter = params.status;

  const where: Record<string, unknown> = {};
  if (statusFilter === "active") where.subscribed = true;
  else if (statusFilter === "unsubscribed") where.subscribed = false;

  const [totalSubscriptions, subscriptions, activeCount, unsubscribedCount] =
    await Promise.all([
      prisma.newsletterSubscription.count({ where }),
      prisma.newsletterSubscription.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (currentPage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      }),
      prisma.newsletterSubscription.count({ where: { subscribed: true } }),
      prisma.newsletterSubscription.count({ where: { subscribed: false } }),
    ]);

  const totalPages = Math.ceil(totalSubscriptions / PAGE_SIZE);

  const filteredSubscriptions = query
    ? subscriptions.filter((s) => s.email.toLowerCase().includes(query))
    : subscriptions;

  return (
    <div className="space-y-6">
      <PageHeader title="Newsletter Subscribers" description={`${totalSubscriptions} subscriber${totalSubscriptions !== 1 ? "s" : ""} on the newsletter.`} icon={pageHeaderPresets.newsletter.icon} gradient={pageHeaderPresets.newsletter.gradient} iconColor={pageHeaderPresets.newsletter.iconColor} iconBg={pageHeaderPresets.newsletter.iconBg} />

      <StaggerChildren className="grid gap-5 sm:grid-cols-3">
        <StaggerItem>
          <StatCard
            label="Total Subscribers"
            value={totalSubscriptions}
            icon={<Users className="h-5 w-5" />}
            color="text-primary"
            bg="bg-primary/10"
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            label="Active"
            value={activeCount}
            icon={<CheckCircle className="h-5 w-5" />}
            color="text-green-600"
            bg="bg-green-500/10"
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            label="Unsubscribed"
            value={unsubscribedCount}
            icon={<XCircle className="h-5 w-5" />}
            color="text-muted-foreground"
            bg="bg-secondary"
          />
        </StaggerItem>
      </StaggerChildren>

      <FadeIn delay={0.05}>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <FilterChip label="All" param="status" value="" isActive={!statusFilter} />
            <FilterChip label="Active" param="status" value="active" isActive={statusFilter === "active"} count={activeCount} />
            <FilterChip label="Unsubscribed" param="status" value="unsubscribed" isActive={statusFilter === "unsubscribed"} count={unsubscribedCount} />
            <ClearFilters params={["status", "query"]} />
          </div>
          <div className="w-full sm:w-64">
            <SearchInput placeholder="Search email..." />
          </div>
        </div>
      </FadeIn>

      {filteredSubscriptions.length === 0 ? (
        <FadeIn>
          <EmptyState
            title="No subscribers found"
            description={query ? `No subscribers matching "${query}"` : "Newsletter signups from the footer will appear here."}
            icon={<Mail className="h-8 w-8 text-muted-foreground" />}
          />
        </FadeIn>
      ) : (
        <FadeIn>
          <div className="overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-border/40 bg-secondary/30">
                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                      Email
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                      Status
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                      Subscribed
                    </th>
                    <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {filteredSubscriptions.map((sub) => (
                    <tr
                      key={sub.id}
                      className={`transition-colors duration-150 hover:bg-secondary/20 ${
                        !sub.subscribed ? "opacity-50" : ""
                      }`}
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {sub.email[0].toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {sub.email}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {sub.subscribed ? (
                          <Badge variant="success">Active</Badge>
                        ) : (
                          <Badge variant="secondary">Unsubscribed</Badge>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground/60">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(sub.createdAt).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric",
                          })}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <NewsletterActions
                          id={sub.id}
                          email={sub.email}
                          subscribed={sub.subscribed}
                        />
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
                basePath="/admin/newsletter"
                searchParams={{ status: params.status, query: params.query }}
              />
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
