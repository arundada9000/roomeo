"use client";

import { motion } from "framer-motion";

// This file wraps every page/route in the app.
// Unlike layout.tsx which persists state, template.tsx creates a new instance on navigation,
// making it perfect for entry/exit animations.

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className="flex flex-col min-h-screen"
    >
      {children}
    </motion.div>
  );
}
