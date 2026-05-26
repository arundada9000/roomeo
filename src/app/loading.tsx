"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative flex flex-col items-center justify-center"
      >
        {/* Glowing background orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute h-32 w-32 rounded-full bg-primary/20 blur-[40px]"
        />

        {/* Logo Container */}
        <div className="relative z-10 flex h-40 w-40 items-center justify-center rounded-3xl bg-white shadow-xl shadow-primary/10 overflow-hidden border border-border/50 p-3">
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative h-full w-full"
          >
            <Image
              src="/icons/icon-192x192.png"
              alt="Loading..."
              fill
              className="object-contain"
            />
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
