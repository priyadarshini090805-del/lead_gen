"use client";

import { motion } from "framer-motion";
import { FileText, Image as ImageIcon, Video, Briefcase, Plus } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { PageTransition } from "@/components/layout/page-transition";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/ui/status-chip";
import { mockContent } from "@/lib/mock-data";
import { relativeTime } from "@/lib/utils";

const kindIcons = {
  POST: FileText,
  POSTER: ImageIcon,
  VIDEO_SCRIPT: Video,
  JOB_POST: Briefcase,
} as const;

const generators = [
  { kind: "POST", label: "Social post", desc: "Engaging post for LinkedIn or Instagram", color: "from-blue-100 to-blue-50" },
  { kind: "POSTER", label: "Poster", desc: "Visual content with copy", color: "from-purple-100 to-purple-50" },
  { kind: "VIDEO_SCRIPT", label: "Video script", desc: "Short-form video script", color: "from-amber-100 to-amber-50" },
  { kind: "JOB_POST", label: "Job post", desc: "Recruiting copy for open roles", color: "from-emerald-100 to-emerald-50" },
] as const;

export default function ContentPage() {
  return (
    <PageTransition>
      <Topbar title="Content Studio" subtitle="Create, store, and publish AI-generated content" />

      <div className="px-6 py-6 space-y-4">
        {/* Generator tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {generators.map((g, i) => {
            const Icon = kindIcons[g.kind];
            return (
              <motion.button
                key={g.kind}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`text-left glass-card p-5 bg-gradient-to-br ${g.color}`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center shadow-soft mb-3">
                  <Icon className="w-5 h-5 text-ink-800" />
                </div>
                <div className="font-semibold text-ink-900 text-sm">{g.label}</div>
                <div className="text-xs text-ink-600 mt-1">{g.desc}</div>
              </motion.button>
            );
          })}
        </div>

        {/* Content list */}
        <GlassCard padding="md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-ink-900">Your content</h3>
            <Button size="sm" variant="primary"><Plus className="w-3.5 h-3.5" /> New content</Button>
          </div>

          <div className="space-y-2">
            {mockContent.map((c, i) => {
              const Icon = kindIcons[c.kind as keyof typeof kindIcons];
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/50 cursor-pointer transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center shadow-soft shrink-0">
                    <Icon className="w-4 h-4 text-ink-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-ink-900 truncate text-sm">{c.title}</div>
                    <div className="text-xs text-ink-500 mt-0.5">{c.kind.replace("_", " ").toLowerCase()} · {c.platform}</div>
                  </div>
                  <StatusChip status={c.status} />
                  <div className="text-xs text-ink-500 whitespace-nowrap w-24 text-right">
                    {c.scheduledAt ? new Date(c.scheduledAt).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : relativeTime(c.updatedAt)}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  );
}
