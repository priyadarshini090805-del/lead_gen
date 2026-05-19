"use client";

import { motion } from "framer-motion";
import { User, Lock, Bell, CreditCard } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { PageTransition } from "@/components/layout/page-transition";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

const sections = [
  { icon: User, title: "Profile", desc: "Name, email, avatar" },
  { icon: Lock, title: "Security", desc: "Password, 2FA, sessions" },
  { icon: Bell, title: "Notifications", desc: "Email, in-app alerts" },
  { icon: CreditCard, title: "Billing", desc: "Plan, payment method" },
];

export default function SettingsPage() {
  return (
    <PageTransition>
      <Topbar title="Settings" />

      <div className="px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <GlassCard padding="sm" className="lg:col-span-1">
          <div className="space-y-1">
            {sections.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.button
                  key={s.title}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 4 }}
                  className="w-full flex items-start gap-3 p-3 rounded-xl text-left hover:bg-white/50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/70 flex items-center justify-center shadow-soft">
                    <Icon className="w-4 h-4 text-ink-700" />
                  </div>
                  <div>
                    <div className="font-medium text-ink-900 text-sm">{s.title}</div>
                    <div className="text-xs text-ink-500 mt-0.5">{s.desc}</div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard padding="lg" className="lg:col-span-2 space-y-5">
          <div>
            <h3 className="font-semibold text-ink-900">Profile</h3>
            <p className="text-xs text-ink-500 mt-1">Personal information visible to your team.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ink-300 to-ink-500 flex items-center justify-center text-white text-xl font-semibold">HA</div>
            <div>
              <Button variant="secondary" size="sm">Change avatar</Button>
              <p className="text-xs text-ink-500 mt-1">PNG or JPG, max 2MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-ink-600">Full name</label>
              <input defaultValue="Hanexis Admin" className="w-full mt-1 bg-white/60 border border-white/70 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-600">Email</label>
              <input defaultValue="admin@hanexis.com" className="w-full mt-1 bg-white/60 border border-white/70 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-600">Role</label>
              <input defaultValue="Admin" disabled className="w-full mt-1 bg-white/30 border border-white/60 rounded-xl px-3 py-2 text-sm text-ink-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-600">Timezone</label>
              <select className="w-full mt-1 bg-white/60 border border-white/70 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30">
                <option>America/New_York</option>
                <option>Europe/London</option>
                <option>Asia/Singapore</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button>Save changes</Button>
            <Button variant="ghost">Cancel</Button>
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  );
}
