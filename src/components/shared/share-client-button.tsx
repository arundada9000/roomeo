"use client";

import { Share } from "lucide-react";
import { useShare } from "@/hooks/use-share";

export default function ShareClientButton({ url, title, isMobile = false }: { url: string, title: string, isMobile?: boolean }) {
  const { openShare, ShareComponent } = useShare();
  return (
    <>
      <button 
        onClick={(e) => { e.preventDefault(); openShare(url, title); }}
        className={isMobile 
          ? "h-10 w-10 flex items-center justify-center rounded-full bg-background/50 backdrop-blur-md text-foreground hover:bg-background/90 transition-colors"
          : "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium"}
      >
        <Share className="h-5 w-5" /> {isMobile ? null : "Share"}
      </button>
      <ShareComponent />
    </>
  );
}
