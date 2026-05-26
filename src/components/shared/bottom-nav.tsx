"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, User, Home } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import AuthModal from "@/components/auth/auth-modal";

export default function BottomNav() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Hide bottom nav on specific pages if needed (like the map explore view where we want full screen, though usually it's fine)
  // For Roomeo, keeping it on explore is good.

  const tabs = [
    { name: "Explore", href: "/explore", icon: Search },
    { name: "Favorites", href: "/favorites", icon: Heart },
    { name: "Landlord", href: "/landlord", icon: Home },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const handleProfileClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault();
      setAuthModalOpen(true);
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 z-50 w-full border-t border-border/60 bg-background/90 pb-safe pt-2 backdrop-blur-xl md:hidden">
        <div className="flex h-14 items-center justify-around px-2">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
            return (
              <Link
                key={tab.name}
                href={tab.href}
                onClick={tab.name === "Profile" ? handleProfileClick : undefined}
                className={`flex w-16 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className={`h-6 w-6 ${isActive ? "fill-primary/20" : ""}`} />
                <span>{tab.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Padding element so content doesn't get hidden behind the nav */}
      <div className="h-16 md:hidden" />

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
