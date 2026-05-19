"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  hoverable?: boolean;
  padding?: "sm" | "md" | "lg";
}

const pads = { sm: "p-4", md: "p-6", lg: "p-8" } as const;

export function GlassCard({ className, hoverable, padding = "md", children, ...rest }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hoverable ? { y: -4, boxShadow: "0 12px 48px 0 rgba(31, 38, 135, 0.12)" } : undefined}
      className={cn("glass-card", pads[padding], hoverable && "cursor-pointer transition-shadow", className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
