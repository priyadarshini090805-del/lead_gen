"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Linkedin, Instagram } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { PageTransition } from "@/components/layout/page-transition";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { mockConversations } from "@/lib/mock-data";
import { relativeTime } from "@/lib/utils";

const sampleThread = [
  { from: "them", body: "Hey — thanks for the connect! I saw your post on outbound personalization.", time: "10:24 AM" },
  { from: "me", body: "Of course! Loved your thread on growth experiments last week — the bit on cold-list segmentation was spot on.", time: "10:31 AM" },
  { from: "them", body: "Appreciate it. What does Hanexis actually do? Saw the website but want the short version.", time: "10:45 AM" },
  { from: "me", body: "Short version: we use AI to draft personalized LinkedIn + IG outreach for your team and handle scheduling. Most users see ~3x reply rates in the first month.", time: "10:48 AM" },
  { from: "them", body: "Thanks for the context — could we hop on a quick call Thursday?", time: "Just now" },
];

export default function ConversationsPage() {
  const [active, setActive] = useState(mockConversations[0].id);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function suggestReply() {
    setLoading(true);
    setAiSuggestion(null);
    setTimeout(() => {
      setAiSuggestion("Absolutely — Thursday works. I can do 11 AM or 2 PM your time. Sending a Calendly so you can grab whichever fits.");
      setLoading(false);
    }, 1100);
  }

  return (
    <PageTransition>
      <Topbar title="Inbox" subtitle="AI-assisted conversation management" />

      <div className="px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-180px)]">
        {/* Conversation list */}
        <GlassCard padding="sm" className="lg:col-span-1 overflow-y-auto">
          <h3 className="font-semibold text-ink-900 text-sm px-2 py-2">Conversations</h3>
          <div className="space-y-1">
            {mockConversations.map((c, i) => (
              <motion.button
                key={c.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setActive(c.id)}
                className={`w-full text-left p-3 rounded-xl transition-colors ${
                  active === c.id ? "bg-white/80 shadow-soft" : "hover:bg-white/40"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-ink-300 to-ink-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                    {c.leadName.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-ink-900 text-sm truncate">{c.leadName}</span>
                      {c.platform === "LINKEDIN" ? <Linkedin className="w-3 h-3 text-[#0a66c2] shrink-0" /> : <Instagram className="w-3 h-3 text-[#e1306c] shrink-0" />}
                    </div>
                    <div className="text-xs text-ink-500 mt-0.5 truncate">{c.lastMessage}</div>
                    <div className="text-[11px] text-ink-400 mt-1">{relativeTime(c.lastMessageAt)}</div>
                  </div>
                  {c.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-accent text-white text-[10px] font-semibold flex items-center justify-center">
                      {c.unread}
                    </span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </GlassCard>

        {/* Thread */}
        <GlassCard padding="md" className="lg:col-span-2 flex flex-col">
          <div className="flex items-center gap-3 pb-4 border-b border-ink-100/60">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ink-300 to-ink-500 flex items-center justify-center text-white text-sm font-semibold">PP</div>
            <div>
              <div className="font-semibold text-ink-900">Priya Patel</div>
              <div className="text-xs text-ink-500">Head of Growth · Northstar Health</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {sampleThread.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`flex ${t.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-md px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    t.from === "me"
                      ? "bg-ink-900 text-white rounded-br-sm"
                      : "bg-white/70 text-ink-800 border border-white/80 rounded-bl-sm"
                  }`}
                >
                  {t.body}
                  <div className={`text-[10px] mt-1 ${t.from === "me" ? "text-white/60" : "text-ink-400"}`}>{t.time}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* AI suggestion */}
          <AnimatePresence>
            {(loading || aiSuggestion) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-3"
              >
                <div className="bg-accent/5 border border-accent/20 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-xs text-accent-600 font-medium mb-2">
                    <Sparkles className="w-3.5 h-3.5" /> AI suggestion
                  </div>
                  {loading ? (
                    <div className="space-y-2">
                      <div className="skeleton h-3 w-full rounded" />
                      <div className="skeleton h-3 w-2/3 rounded" />
                    </div>
                  ) : (
                    <p className="text-sm text-ink-800 leading-relaxed">{aiSuggestion}</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Composer */}
          <div className="flex gap-2">
            <input
              placeholder="Type a reply…"
              className="flex-1 bg-white/60 border border-white/70 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
            <Button variant="secondary" size="md" onClick={suggestReply}>
              <Sparkles className="w-4 h-4" /> AI
            </Button>
            <Button size="md">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  );
}
