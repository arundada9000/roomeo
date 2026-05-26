"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

export default function ScrollToTopButton() {
  // Always trigger scroll to top on route change
  useScrollToTop();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_8px_30px_rgb(var(--primary)/0.4)] backdrop-blur-md transition-shadow hover:shadow-[0_8px_40px_rgb(var(--primary)/0.6)]"
          aria-label="Scroll to top"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 to-white/20 opacity-0 transition-opacity hover:opacity-100 pointer-events-none" />
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
