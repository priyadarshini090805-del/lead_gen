"use client";

import { motion } from "framer-motion";
import { Topbar } from "@/components/layout/topbar";
import { PageTransition } from "@/components/layout/page-transition";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, RadialBarChart, RadialBar, Legend } from "recharts";
import { mockTimeseries, mockKpis } from "@/lib/mock-data";

const radialData = [
  { name: "Replied", value: 49, fill: "#a78bfa" },
  { name: "Qualified", value: 19, fill: "#f5a623" },
  { name: "Converted", value: 7, fill: "#34d399" },
];

export default function AnalyticsPage() {
  return (
    <PageTransition>
      <Topbar title="Analytics" subtitle="Track leads, messages, and conversions" />

      <div className="px-6 py-6 space-y-4">
        {/* Big numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Avg. reply time", value: 4.2, suffix: "h", note: "↓ 22% vs last month" },
            { label: "Cost per lead", value: 1.84, prefix: "$", decimals: 2, note: "↓ 11% vs last month" },
            { label: "AI accuracy score", value: 94, suffix: "%", note: "Personalization quality" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <GlassCard padding="lg" hoverable>
                <div className="text-xs uppercase tracking-wider text-ink-500">{s.label}</div>
                <div className="text-4xl font-bold text-ink-900 mt-2 tabular-nums">
                  <AnimatedCounter value={s.value} decimals={s.decimals ?? 1} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="text-xs text-emerald-600 mt-2">{s.note}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Line + radial */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <GlassCard padding="md" className="lg:col-span-2">
            <h3 className="font-semibold text-ink-900 mb-1">Conversion trend</h3>
            <p className="text-xs text-ink-500 mb-4">Last 30 days</p>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={mockTimeseries}>
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#71717a" }} tickFormatter={(v) => v.slice(5)} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#71717a" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid #e8e8ec", borderRadius: 12, fontSize: 12 }} />
                <Line type="monotone" dataKey="leads" stroke="#18181b" strokeWidth={2.5} dot={false} animationDuration={1500} />
                <Line type="monotone" dataKey="replies" stroke="#f5a623" strokeWidth={2.5} dot={false} animationDuration={1700} />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>

          <GlassCard padding="md">
            <h3 className="font-semibold text-ink-900 mb-1">Conversion mix</h3>
            <p className="text-xs text-ink-500 mb-4">Status breakdown</p>
            <ResponsiveContainer width="100%" height={240}>
              <RadialBarChart innerRadius="35%" outerRadius="95%" data={radialData} startAngle={90} endAngle={-270}>
                <RadialBar background dataKey="value" cornerRadius={8} animationDuration={1500} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        {/* Bottom KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total leads", value: mockKpis.leads },
            { label: "Messages sent", value: mockKpis.messagesSent },
            { label: "Replies", value: mockKpis.replies },
            { label: "Conversions", value: mockKpis.conversions },
          ].map((s) => (
            <GlassCard key={s.label} padding="md">
              <div className="text-xs text-ink-500">{s.label}</div>
              <div className="text-2xl font-bold text-ink-900 mt-1 tabular-nums">
                <AnimatedCounter value={s.value} />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
