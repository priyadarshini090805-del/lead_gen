"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { PageTransition } from "@/components/layout/page-transition";
import { GlassCard } from "@/components/ui/glass-card";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Mock scheduled items - keyed by day-of-month (current month)
const scheduledItems: Record<number, { title: string; time: string; type: string; color: string }[]> = {
  3: [{ title: "Hiring post", time: "9:00 AM", type: "POST", color: "bg-emerald-100 text-emerald-800 border-emerald-200" }],
  7: [
    { title: "Sarah Chen follow-up", time: "10:30 AM", type: "MSG", color: "bg-blue-100 text-blue-800 border-blue-200" },
    { title: "Q2 video script", time: "2:00 PM", type: "VIDEO", color: "bg-amber-100 text-amber-800 border-amber-200" },
  ],
  12: [{ title: "Case study post", time: "11:00 AM", type: "POST", color: "bg-emerald-100 text-emerald-800 border-emerald-200" }],
  15: [{ title: "Northstar pitch", time: "3:00 PM", type: "MSG", color: "bg-blue-100 text-blue-800 border-blue-200" }],
  19: [
    { title: "Weekly insights", time: "8:00 AM", type: "POST", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
    { title: "Acme follow-up", time: "1:00 PM", type: "MSG", color: "bg-blue-100 text-blue-800 border-blue-200" },
  ],
  22: [{ title: "Product Hunt teaser", time: "9:30 AM", type: "POST", color: "bg-emerald-100 text-emerald-800 border-emerald-200" }],
  27: [{ title: "Marcus follow-up", time: "11:30 AM", type: "MSG", color: "bg-blue-100 text-blue-800 border-blue-200" }],
};

export default function SchedulingPage() {
  const [monthOffset, setMonthOffset] = useState(0);
  const now = new Date();
  const viewDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
  const monthName = viewDate.toLocaleString(undefined, { month: "long", year: "numeric" });

  const firstDay = (viewDate.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const today = now.getDate();
  const isCurrentMonth = monthOffset === 0;

  return (
    <PageTransition>
      <Topbar title="Calendar" subtitle="Schedule content and outreach with full timezone support" />

      <div className="px-6 py-6 space-y-4">
        <GlassCard padding="md">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-5 h-5 text-ink-700" />
              <h2 className="font-semibold text-ink-900 text-lg">{monthName}</h2>
            </div>
            <div className="flex items-center gap-1">
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMonthOffset((o) => o - 1)} className="p-2 rounded-lg hover:bg-ink-100/50">
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => setMonthOffset(0)} className="px-3 py-1.5 text-xs font-medium text-ink-700 hover:bg-ink-100/50 rounded-lg">
                Today
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMonthOffset((o) => o + 1)} className="p-2 rounded-lg hover:bg-ink-100/50">
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Day-of-week header */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {daysOfWeek.map((d) => (
              <div key={d} className="text-xs font-medium text-ink-400 text-center uppercase tracking-wider">{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const items = scheduledItems[day] ?? [];
              const isToday = isCurrentMonth && day === today;
              return (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.005 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className={`aspect-square p-1.5 rounded-xl text-xs cursor-pointer transition-colors ${
                    isToday ? "bg-accent/10 border-2 border-accent" : "bg-white/40 border border-white/60 hover:bg-white/70"
                  }`}
                >
                  <div className={`text-[11px] font-semibold ${isToday ? "text-accent-600" : "text-ink-700"}`}>{day}</div>
                  <div className="mt-1 space-y-1 overflow-hidden">
                    {items.slice(0, 2).map((it, idx) => (
                      <div key={idx} className={`text-[10px] px-1.5 py-0.5 rounded border truncate ${it.color}`}>
                        {it.title}
                      </div>
                    ))}
                    {items.length > 2 && <div className="text-[10px] text-ink-500">+{items.length - 2} more</div>}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-5 pt-4 border-t border-ink-100/60 text-xs text-ink-500">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-emerald-300" />Content</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-blue-300" />Messages</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-amber-300" />Video</span>
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  );
}
