"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Sparkles,
  Send,
  FileText,
  Calendar,
  MessagesSquare,
  Plug,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/leads", label: "Leads", icon: Users },
  { href: "/dashboard/ai", label: "AI Studio", icon: Sparkles },
  { href: "/dashboard/outreach", label: "Outreach", icon: Send },
  { href: "/dashboard/content", label: "Content", icon: FileText },
  { href: "/dashboard/scheduling", label: "Calendar", icon: Calendar },
  { href: "/dashboard/conversations", label: "Inbox", icon: MessagesSquare },
  { href: "/dashboard/integrations", label: "Integrations", icon: Plug },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass-strong sticky top-0 h-screen w-64 shrink-0 flex flex-col z-10 rounded-r-3xl">
      <div className="px-6 pt-7 pb-6 flex items-center gap-2">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-9 h-9 rounded-xl bg-ink-900 flex items-center justify-center text-white font-bold"
        >
          H
        </motion.div>
        <div>
          <div className="font-semibold text-ink-900 leading-none">Hanexis</div>
          <div className="text-[11px] text-ink-500 mt-0.5">Lead Gen Suite</div>
        </div>
      </div>

      <nav className="px-3 flex-1 space-y-1">
        {nav.map((item, idx) => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 * idx }}
            >
              <Link
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  active ? "text-ink-900" : "text-ink-600 hover:text-ink-900 hover:bg-ink-100/40",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-white/80 rounded-xl shadow-soft border border-white/70"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="p-3">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink-600 hover:text-ink-900 hover:bg-ink-100/40"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
