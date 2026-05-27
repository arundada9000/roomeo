"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Building2, ListChecks,
  Mail, MailCheck, ShieldCheck, Heart, Gauge,
  ChevronRight, Home, LogOut,
} from "lucide-react";

const sidebarLinks = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Landlords", href: "/admin/landlords", icon: Building2 },
  { label: "Listings", href: "/admin/listings", icon: ListChecks },
  { label: "Contact", href: "/admin/contact", icon: Mail },
  { label: "Newsletter", href: "/admin/newsletter", icon: MailCheck },
  { label: "Admins", href: "/admin/admins", icon: ShieldCheck },
  { label: "Engagement", href: "/admin/engagement", icon: Heart },
];

export default function AdminSidebar({
  user,
}: {
  user: { name: string; email: string };
}) {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden w-64 flex-shrink-0 border-r border-border/60 bg-card md:flex md:flex-col">
        <div className="sticky top-0 flex h-screen flex-col">
          <Link href="/" className="flex h-16 items-center gap-3 border-b border-border/40 px-6 hover:bg-secondary/20 transition-colors">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 text-amber-600 ring-1 ring-amber-500/20">
              <Gauge className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground tracking-tight">
                Admin Panel
              </p>
              <p className="text-[11px] text-muted-foreground/70 font-medium">
                Roomeo Platform
              </p>
            </div>
          </Link>

          <nav className="flex-1 space-y-0.5 p-3 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const isActive =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground hover:shadow-sm"
                  }`}
                >
                  <link.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : ""}`} />
                  <span>{link.label}</span>
                  {isActive && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                  {!isActive && (
                    <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:opacity-40 group-hover:translate-x-0.5" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-border/40 p-4">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 bg-secondary/30">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-[11px] font-bold text-white shadow-sm">
                {user.name[0]?.toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-foreground truncate leading-tight">
                  {user.name}
                </p>
                <p className="text-[10px] text-muted-foreground/60 truncate leading-tight">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="flex h-16 items-center gap-3 border-b border-border/40 bg-card/95 backdrop-blur-sm px-4 md:hidden sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 text-amber-600 ring-1 ring-amber-500/20">
            <Gauge className="h-5 w-5" />
          </div>
          <span className="text-sm font-bold text-foreground tracking-tight">Admin</span>
        </Link>
        <nav className="ml-auto flex items-center gap-1 overflow-x-auto">
          {sidebarLinks.map((link) => {
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 active:scale-95 ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4" />
              </Link>
            );
          })}
        </nav>
      </header>
    </>
  );
}
