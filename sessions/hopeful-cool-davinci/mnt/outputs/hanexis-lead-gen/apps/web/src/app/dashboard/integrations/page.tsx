"use client";

import { motion } from "framer-motion";
import { Linkedin, Instagram, Check, Plug } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { PageTransition } from "@/components/layout/page-transition";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

const integrations = [
  {
    name: "LinkedIn",
    description: "Connect, message, and engage with leads on LinkedIn.",
    Icon: Linkedin,
    color: "#0a66c2",
    connected: true,
    permissions: ["Read profile", "Send connections", "Send messages"],
  },
  {
    name: "Instagram",
    description: "DM leads, publish posts, and track engagement on Instagram.",
    Icon: Instagram,
    color: "#e1306c",
    connected: false,
    permissions: ["Send DMs", "Publish posts", "Read insights"],
  },
];

export default function IntegrationsPage() {
  return (
    <PageTransition>
      <Topbar title="Integrations" subtitle="Connect your social accounts to start outreach" />

      <div className="px-6 py-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((it, i) => {
            const Icon = it.Icon;
            return (
              <motion.div
                key={it.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <GlassCard padding="lg" hoverable className="h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.05 }}
                        className="w-12 h-12 rounded-2xl bg-white/70 flex items-center justify-center shadow-soft"
                      >
                        <Icon className="w-6 h-6" style={{ color: it.color }} />
                      </motion.div>
                      <div>
                        <div className="font-semibold text-ink-900">{it.name}</div>
                        {it.connected ? (
                          <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
                            Connected
                          </div>
                        ) : (
                          <div className="text-xs text-ink-400 mt-1">Not connected</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-ink-600 leading-relaxed mb-4">{it.description}</p>

                  <div className="space-y-1.5 mb-5">
                    {it.permissions.map((p) => (
                      <div key={p} className="flex items-center gap-2 text-xs text-ink-600">
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        {p}
                      </div>
                    ))}
                  </div>

                  <Button variant={it.connected ? "secondary" : "primary"} size="md" className="w-full">
                    {it.connected ? "Manage" : (<><Plug className="w-4 h-4" /> Connect {it.name}</>)}
                  </Button>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        <GlassCard padding="md">
          <h3 className="font-semibold text-ink-900 mb-2">More integrations coming soon</h3>
          <p className="text-sm text-ink-600">Twitter/X, Facebook, TikTok, and HubSpot are on the roadmap.</p>
        </GlassCard>
      </div>
    </PageTransition>
  );
}
