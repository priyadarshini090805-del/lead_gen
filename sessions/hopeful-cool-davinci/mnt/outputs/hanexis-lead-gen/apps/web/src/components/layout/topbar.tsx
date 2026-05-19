"use client";

import { motion } from "framer-motion";
import { Search, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-strong sticky top-0 z-20 mx-6 mt-6 px-6 py-4 rounded-2xl flex items-center justify-between gap-4"
    >
      <div>
        <h1 className="text-xl font-semibold text-ink-900 leading-none">{title}</h1>
        {subtitle && <p className="text-sm text-ink-500 mt-1">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            placeholder="Search leads, content, conversations…"
            className="w-full bg-white/60 border border-white/70 rounded-xl pl-10 pr-3 py-2 text-sm placeholder:text-ink-400 focus:bg-white/90 focus:outline-none focus:ring-2 focus:ring-accent/30 transition"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 rounded-xl hover:bg-ink-100/50 transition"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-ink-700" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
        </motion.button>
        <Button size="md">
          <Plus className="w-4 h-4" /> New lead
        </Button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-ink-300 to-ink-500 flex items-center justify-center text-white text-sm font-semibold">
          HA
        </div>
      </div>
    </motion.header>
  );
}
