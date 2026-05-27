import Link from "next/link";
import { ShieldCheck, Globe, Heart } from "lucide-react";

const footerLinks = [
  { label: "Dashboard", href: "/admin" },
  { label: "Users", href: "/admin/users" },
  { label: "Listings", href: "/admin/listings" },
  { label: "Contact", href: "/admin/contact" },
  { label: "Engagement", href: "/admin/engagement" },
];

function AdminFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/30 bg-card/50 backdrop-blur-sm">
      <div className="px-6 md:px-10 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground/60">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>
              Roomeo Admin Panel &copy; {year}
            </span>
            <span className="hidden sm:inline mx-1.5">&middot;</span>
            <span className="hidden sm:inline text-xs">
              Built with{" "}
              <Heart className="h-3 w-3 inline-block text-red-400 fill-red-400/60" />{" "}
              in Nepal
            </span>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 text-xs text-muted-foreground/50">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-foreground/70"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="https://roomeo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground/50 transition-colors hover:text-foreground hover:bg-secondary"
              >
                <Globe className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Server info bar */}
        <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-muted-foreground/30">
          <span>Node {process.version}</span>
          <span>&middot;</span>
          <span>Next.js 16</span>
          <span>&middot;</span>
          <span className="hidden sm:inline">PostgreSQL</span>
          <span className="hidden sm:inline">&middot;</span>
          <span className="hidden sm:inline">Better Auth</span>
        </div>
      </div>
    </footer>
  );
}

export { AdminFooter };
