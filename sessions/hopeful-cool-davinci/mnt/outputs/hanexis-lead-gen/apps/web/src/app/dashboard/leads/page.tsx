"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Filter, Download, Upload, Linkedin, Instagram } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { PageTransition } from "@/components/layout/page-transition";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/ui/status-chip";
import { mockLeads } from "@/lib/mock-data";
import { relativeTime } from "@/lib/utils";

const statuses = ["ALL", "NEW", "CONTACTED", "REPLIED", "QUALIFIED", "CONVERTED"];

export default function LeadsPage() {
  const [filter, setFilter] = useState("ALL");

  const filtered = filter === "ALL" ? mockLeads : mockLeads.filter((l) => l.status === filter);

  return (
    <PageTransition>
      <Topbar title="Leads" subtitle={`${mockLeads.length} prospects across LinkedIn and Instagram`} />

      <div className="px-6 py-6 space-y-4">
        {/* Filters bar */}
        <GlassCard padding="sm">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {statuses.map((s) => (
                <motion.button
                  key={s}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(s)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    filter === s ? "text-ink-900" : "text-ink-500 hover:text-ink-800"
                  }`}
                >
                  {filter === s && (
                    <motion.span
                      layoutId="leads-filter"
                      className="absolute inset-0 bg-white/80 rounded-lg shadow-soft border border-white/70"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{s}</span>
                </motion.button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm"><Filter className="w-4 h-4" /> Filters</Button>
              <Button variant="ghost" size="sm"><Upload className="w-4 h-4" /> Import</Button>
              <Button variant="ghost" size="sm"><Download className="w-4 h-4" /> Export</Button>
            </div>
          </div>
        </GlassCard>

        {/* Table */}
        <GlassCard padding="md">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-ink-400 border-b border-ink-200/40">
                  <th className="py-3 px-2 font-medium">Lead</th>
                  <th className="py-3 px-2 font-medium">Company</th>
                  <th className="py-3 px-2 font-medium">Platform</th>
                  <th className="py-3 px-2 font-medium">Status</th>
                  <th className="py-3 px-2 font-medium">Score</th>
                  <th className="py-3 px-2 font-medium">Tags</th>
                  <th className="py-3 px-2 font-medium">Updated</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.5)" }}
                    className="border-b border-ink-100/40 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ink-300 to-ink-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                          {lead.fullName.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-ink-900 truncate">{lead.fullName}</div>
                          <div className="text-xs text-ink-500 truncate">{lead.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-ink-700">{lead.company}</td>
                    <td className="py-3 px-2">
                      {lead.platform === "LINKEDIN" ? (
                        <Linkedin className="w-4 h-4 text-[#0a66c2]" />
                      ) : (
                        <Instagram className="w-4 h-4 text-[#e1306c]" />
                      )}
                    </td>
                    <td className="py-3 px-2"><StatusChip status={lead.status} /></td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-ink-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${lead.score}%` }}
                            transition={{ duration: 1, delay: 0.3 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full bg-gradient-to-r from-accent to-accent-600 rounded-full"
                          />
                        </div>
                        <span className="text-xs font-semibold text-ink-700 tabular-nums">{lead.score}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex gap-1 flex-wrap">
                        {lead.tags.map((t) => <span key={t} className="chip-grey">{t}</span>)}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-xs text-ink-500 whitespace-nowrap">{relativeTime(lead.updatedAt)}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  );
}
