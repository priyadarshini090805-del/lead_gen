"use client";

import { motion } from "framer-motion";
import { Users, Send, MessageCircle, TrendingUp, ArrowUpRight, Sparkles } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { PageTransition } from "@/components/layout/page-transition";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { StatusChip } from "@/components/ui/status-chip";
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip,
  BarChart, Bar, Cell, PieChart, Pie,
} from "recharts";
import { mockKpis, mockTimeseries, mockFunnel, mockPlatformBreakdown, mockActivities } from "@/lib/mock-data";

const kpiCards = [
  { label: "Total Leads", value: mockKpis.leads, icon: Users, change: "+12.4%" },
  { label: "Messages Sent", value: mockKpis.messagesSent, icon: Send, change: "+8.1%" },
  { label: "Replies", value: mockKpis.replies, icon: MessageCircle, change: "+22.0%" },
  { label: "Conversions", value: mockKpis.conversions, icon: TrendingUp, change: "+5.4%" },
];

export default function DashboardHome() {
  return (
    <PageTransition>
      <Topbar title="Dashboard" subtitle="Welcome back, Priya — here's what's moving today." />

      <div className="px-6 py-6 space-y-6">
        {/* KPI grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlassCard hoverable padding="md">
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-xl bg-white/60">
                    <card.icon className="w-5 h-5 text-ink-700" />
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" />
                    {card.change}
                  </span>
                </div>
                <div className="mt-5">
                  <div className="text-3xl font-bold text-ink-900 tabular-nums">
                    <AnimatedCounter value={card.value} />
                  </div>
                  <div className="text-sm text-ink-500 mt-1">{card.label}</div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <GlassCard padding="md" className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-ink-900">Outreach activity</h3>
                <p className="text-xs text-ink-500">Last 30 days</p>
              </div>
              <div className="flex gap-4 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-ink-900" />Leads</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent" />Messages</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-ink-400" />Replies</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={mockTimeseries}>
                <defs>
                  <linearGradient id="gradLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#18181b" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#18181b" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradMsg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f5a623" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#f5a623" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#71717a" }} tickFormatter={(v) => v.slice(5)} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#71717a" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid #e8e8ec", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="messages" stroke="#f5a623" strokeWidth={2} fill="url(#gradMsg)" animationDuration={1200} />
                <Area type="monotone" dataKey="leads" stroke="#18181b" strokeWidth={2} fill="url(#gradLeads)" animationDuration={1400} />
                <Area type="monotone" dataKey="replies" stroke="#a1a1aa" strokeWidth={2} fill="none" strokeDasharray="4 4" animationDuration={1600} />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>

          <GlassCard padding="md">
            <h3 className="font-semibold text-ink-900 mb-1">Platform mix</h3>
            <p className="text-xs text-ink-500 mb-4">Leads by source</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={mockPlatformBreakdown}
                  dataKey="count"
                  nameKey="platform"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  animationBegin={200}
                  animationDuration={1200}
                >
                  {mockPlatformBreakdown.map((p) => <Cell key={p.platform} fill={p.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid #e8e8ec", borderRadius: 12, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {mockPlatformBreakdown.map((p) => (
                <div key={p.platform} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: p.color }} />{p.platform}</span>
                  <span className="font-semibold text-ink-900 tabular-nums">{p.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Funnel + activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <GlassCard padding="md" className="lg:col-span-2">
            <h3 className="font-semibold text-ink-900 mb-1">Pipeline funnel</h3>
            <p className="text-xs text-ink-500 mb-4">Leads by status</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={mockFunnel} barCategoryGap="20%">
                <XAxis dataKey="status" tick={{ fontSize: 11, fill: "#71717a" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#71717a" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid #e8e8ec", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} animationDuration={1200}>
                  {mockFunnel.map((f) => <Cell key={f.status} fill={f.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>

          <GlassCard padding="md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-ink-900">Recent activity</h3>
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <div className="space-y-3">
              {mockActivities.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-ink-800 leading-snug">{a.text}</div>
                    <div className="text-[11px] text-ink-400 mt-0.5">{a.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Conversion stat */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard padding="lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-ink-500 uppercase tracking-wider">Reply rate</p>
                <div className="text-4xl font-bold text-ink-900 mt-2 tabular-nums">
                  <AnimatedCounter value={mockKpis.replyRate} decimals={1} suffix="%" />
                </div>
              </div>
              <StatusChip status="QUALIFIED" />
            </div>
            <p className="text-sm text-ink-500 mt-3">Above industry average (12%). Personalization is paying off.</p>
          </GlassCard>
          <GlassCard padding="lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-ink-500 uppercase tracking-wider">Conversion rate</p>
                <div className="text-4xl font-bold text-ink-900 mt-2 tabular-nums">
                  <AnimatedCounter value={mockKpis.conversionRate} decimals={1} suffix="%" />
                </div>
              </div>
              <StatusChip status="CONVERTED" />
            </div>
            <p className="text-sm text-ink-500 mt-3">84 conversions this quarter. Best month yet.</p>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  );
}
