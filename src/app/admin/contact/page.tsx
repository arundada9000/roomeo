import prisma from "@/lib/prisma";
import { Mail, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { ContactActions } from "./contact-actions";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/page-transition";
import { SearchInput, FilterChip, ClearFilters } from "@/components/admin/admin-filters";
import { PageHeader, pageHeaderPresets } from "@/components/admin/page-header";

const PAGE_SIZE = 15;

export default async function AdminContactPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string; read?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const query = params.query?.toLowerCase();
  const readFilter = params.read;

  const where: Record<string, unknown> = {};
  if (readFilter === "unread") where.isRead = false;
  else if (readFilter === "read") where.isRead = true;

  const [totalSubmissions, submissions, unreadCount] = await Promise.all([
    prisma.contactSubmission.count({ where }),
    prisma.contactSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.contactSubmission.count({ where: { isRead: false } }),
  ]);

  const totalPages = Math.ceil(totalSubmissions / PAGE_SIZE);

  const filteredSubmissions = query
    ? submissions.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.email.toLowerCase().includes(query) ||
          s.subject.toLowerCase().includes(query) ||
          s.message.toLowerCase().includes(query),
      )
    : submissions;

  return (
    <div className="space-y-6">
      <PageHeader title="Contact Submissions" description={`${totalSubmissions} message${totalSubmissions !== 1 ? "s" : ""} from the contact form.`} icon={pageHeaderPresets.contact.icon} gradient={pageHeaderPresets.contact.gradient} iconColor={pageHeaderPresets.contact.iconColor} iconBg={pageHeaderPresets.contact.iconBg} badge={unreadCount > 0 ? <Badge variant="warning" size="lg">{unreadCount} unread</Badge> : undefined} />

      <FadeIn delay={0.05}>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <FilterChip label="All" param="read" value="" isActive={!readFilter} />
            <FilterChip label="Unread" param="read" value="unread" isActive={readFilter === "unread"} count={unreadCount} />
            <FilterChip label="Read" param="read" value="read" isActive={readFilter === "read"} />
            <ClearFilters params={["read", "query"]} />
          </div>
          <div className="w-full sm:w-64">
            <SearchInput placeholder="Search name, email, subject..." />
          </div>
        </div>
      </FadeIn>

      {filteredSubmissions.length === 0 ? (
        <FadeIn>
          <EmptyState
            title={query ? "No results found" : "No submissions yet"}
            description={query ? `No messages matching "${query}"` : "Messages from the contact form will appear here."}
            icon={<Mail className="h-8 w-8 text-muted-foreground" />}
          />
        </FadeIn>
      ) : (
        <StaggerChildren className="space-y-4">
          {filteredSubmissions.map((sub) => (
            <StaggerItem key={sub.id}>
              <div
                className={`rounded-2xl border bg-card shadow-sm transition-all duration-200 hover:shadow-md ${
                  !sub.isRead ? "border-primary/25 bg-primary/[0.015]" : "border-border/30"
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 min-w-0 flex-1">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                          !sub.isRead ? "bg-primary/10 text-primary" : "bg-secondary/60 text-muted-foreground"
                        }`}
                      >
                        <Mail className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1 space-y-1.5">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-sm font-bold text-foreground">{sub.name}</h3>
                          {!sub.isRead && <span className="h-2 w-2 rounded-full bg-primary animate-pulse shrink-0" />}
                          <Badge variant="secondary" size="sm">{sub.subject}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground/60">{sub.email}</p>
                        <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">{sub.message}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground/50">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3 w-3" />
                            {new Date(sub.createdAt).toLocaleString("en-US", {
                              month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ContactActions id={sub.id} isRead={sub.isRead} name={sub.name} />
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
          <FadeIn>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/admin/contact"
              searchParams={{ read: params.read, query: params.query }}
            />
          </FadeIn>
        </StaggerChildren>
      )}
    </div>
  );
}
