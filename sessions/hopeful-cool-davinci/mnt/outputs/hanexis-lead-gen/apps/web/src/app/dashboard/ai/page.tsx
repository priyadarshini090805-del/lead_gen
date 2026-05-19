"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wand2, Copy, RefreshCw, Send } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { PageTransition } from "@/components/layout/page-transition";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

const kinds = [
  { id: "CONNECTION", label: "Connection request", desc: "Short, warm opener" },
  { id: "FOLLOW_UP", label: "Follow-up", desc: "Re-engage after no reply" },
  { id: "SALES_PITCH", label: "Sales pitch", desc: "Pitch your offer with proof" },
];

const tones = ["PROFESSIONAL", "CASUAL", "FRIENDLY"] as const;

const sampleOutput = `Hi Sarah — saw your post on Acme's positioning relaunch. The way you tied messaging to retention metrics really stood out — most teams skip that link entirely.

We've helped 30+ SaaS marketers run the same play with their outbound. Open to a 15-min walkthrough next week?`;

export default function AIStudioPage() {
  const [kind, setKind] = useState("CONNECTION");
  const [tone, setTone] = useState<typeof tones[number]>("PROFESSIONAL");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  function generate() {
    setLoading(true);
    setOutput(null);
    setTimeout(() => {
      setOutput(sampleOutput);
      setLoading(false);
    }, 1400);
  }

  return (
    <PageTransition>
      <Topbar title="AI Studio" subtitle="Generate personalized outreach in seconds" />

      <div className="px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: form */}
        <GlassCard padding="md" className="space-y-5">
          <div>
            <h3 className="font-semibold text-ink-900 mb-3">Message type</h3>
            <div className="grid grid-cols-1 gap-2">
              {kinds.map((k) => (
                <motion.button
                  key={k.id}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setKind(k.id)}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    kind === k.id ? "bg-white/80 border-accent/40 shadow-soft" : "bg-white/30 border-white/50 hover:bg-white/60"
                  }`}
                >
                  <div className="font-medium text-ink-900 text-sm">{k.label}</div>
                  <div className="text-xs text-ink-500 mt-0.5">{k.desc}</div>
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-ink-900 mb-3">Tone</h3>
            <div className="flex gap-2">
              {tones.map((t) => (
                <motion.button
                  key={t}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTone(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    tone === t ? "bg-ink-900 text-white" : "bg-white/40 text-ink-600 hover:bg-white/70"
                  }`}
                >
                  {t.toLowerCase()}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-ink-900 mb-3">Lead context</h3>
            <select className="w-full bg-white/60 border border-white/70 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30">
              <option>Sarah Chen — VP Marketing, Acme Corp</option>
              <option>Marcus Johnson — CTO, Loop Studios</option>
              <option>Priya Patel — Head of Growth, Northstar Health</option>
            </select>
            <textarea
              placeholder="Extra context (e.g. their recent post, mutual connection)..."
              rows={3}
              className="w-full mt-2 bg-white/60 border border-white/70 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none"
            />
          </div>

          <Button onClick={generate} className="w-full" disabled={loading}>
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Generating…
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" /> Generate message
              </>
            )}
          </Button>
        </GlassCard>

        {/* Right: output */}
        <GlassCard padding="md" className="min-h-[400px]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <h3 className="font-semibold text-ink-900">Generated message</h3>
            </div>
            {output && (
              <div className="flex gap-1">
                <button className="p-1.5 rounded-lg hover:bg-ink-100/50 transition" title="Copy"><Copy className="w-4 h-4 text-ink-600" /></button>
                <button className="p-1.5 rounded-lg hover:bg-ink-100/50 transition" title="Regenerate" onClick={generate}><RefreshCw className="w-4 h-4 text-ink-600" /></button>
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <div className="skeleton h-3 w-3/4 rounded" />
                <div className="skeleton h-3 w-full rounded" />
                <div className="skeleton h-3 w-5/6 rounded" />
                <div className="skeleton h-3 w-2/3 rounded" />
                <div className="skeleton h-3 w-4/5 rounded mt-4" />
                <div className="skeleton h-3 w-3/4 rounded" />
              </motion.div>
            )}

            {output && !loading && (
              <motion.div
                key="output"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-white/50 border border-white/60 rounded-xl p-4 text-sm text-ink-800 leading-relaxed whitespace-pre-line">
                  {output}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-xs text-ink-500">~{output.split(/\s+/).length} words · GPT-4o-mini · 412 tokens</div>
                  <Button size="sm" variant="primary">
                    <Send className="w-3.5 h-3.5" /> Approve & schedule
                  </Button>
                </div>
              </motion.div>
            )}

            {!output && !loading && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-64 text-center"
              >
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                  <Sparkles className="w-10 h-10 text-ink-300" />
                </motion.div>
                <p className="text-sm text-ink-500 mt-3">Configure your message above and click generate.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>
    </PageTransition>
  );
}
