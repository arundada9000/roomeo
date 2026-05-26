"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map as MapIcon, Heart, LayoutGrid, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function BottomNav() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const tabs = [
    { name: "Search", href: "/explore", icon: MapIcon },
    { name: "Saved", href: "/favorites", icon: Heart },
    { name: "Dashboard", href: "/landlord", icon: LayoutGrid },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 z-50 w-full bg-surface-dim/80 pb-safe pt-2 backdrop-blur-xl md:hidden border-t border-border/40">
        <div className="flex h-16 items-center justify-around px-2">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`flex w-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-all ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className={`flex h-8 w-14 items-center justify-center rounded-full transition-colors ${isActive ? "bg-primary/15" : "bg-transparent"}`}>
                  <tab.icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span>{tab.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
      
      <div className="h-[72px] md:hidden" />
    </>
  );
}
