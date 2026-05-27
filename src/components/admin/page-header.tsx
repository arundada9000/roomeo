import { FadeIn } from "@/components/page-transition";

interface PageHeaderProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient?: string;
  iconColor?: string;
  iconBg?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  icon: Icon,
  gradient = "from-primary/10 to-primary/[0.03]",
  iconColor = "text-primary",
  iconBg = "bg-primary/10",
  badge,
  actions,
}: PageHeaderProps) {
  return (
    <FadeIn>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBg} shadow-sm ring-1 ring-inset ring-black/[0.02]`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                {title}
              </h1>
              {badge}
            </div>
            <p className="mt-1 text-sm text-muted-foreground/70">
              {description}
            </p>
          </div>
        </div>
        {actions && (
          <div className="shrink-0">{actions}</div>
        )}
      </div>
    </FadeIn>
  );
}

// Predefined presets for each admin section
export const pageHeaderPresets = {
  dashboard: {
    icon: LayoutDashboardIcon,
    gradient: "from-blue-500/10 to-violet-500/[0.03]",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-500/10",
  },
  users: {
    icon: UsersIcon,
    gradient: "from-emerald-500/10 to-emerald-500/[0.03]",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-500/10",
  },
  landlords: {
    icon: Building2Icon,
    gradient: "from-violet-500/10 to-violet-500/[0.03]",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-500/10",
  },
  listings: {
    icon: ListChecksIcon,
    gradient: "from-amber-500/10 to-amber-500/[0.03]",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-500/10",
  },
  contact: {
    icon: MailIcon,
    gradient: "from-rose-500/10 to-rose-500/[0.03]",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-500/10",
  },
  newsletter: {
    icon: MailCheckIcon,
    gradient: "from-cyan-500/10 to-cyan-500/[0.03]",
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-500/10",
  },
  admins: {
    icon: ShieldCheckIcon,
    gradient: "from-orange-500/10 to-orange-500/[0.03]",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-500/10",
  },
  engagement: {
    icon: HeartIcon,
    gradient: "from-pink-500/10 to-pink-500/[0.03]",
    iconColor: "text-pink-600",
    iconBg: "bg-pink-500/10",
  },
};

// Inline to avoid importing from lucide in server components
function LayoutDashboardIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function Building2Icon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  );
}

function ListChecksIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m3 12 3 3 6-6" />
      <path d="M21 6h-8" />
      <path d="M21 12h-8" />
      <path d="M21 18h-8" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MailCheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      <path d="m16 19 2 2 4-4" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
