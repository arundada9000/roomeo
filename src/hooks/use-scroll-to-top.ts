"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // We use behavior 'instant' to ensure instantaneous reset, 
    // overriding any smooth scrolling applied globally via CSS.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
}
