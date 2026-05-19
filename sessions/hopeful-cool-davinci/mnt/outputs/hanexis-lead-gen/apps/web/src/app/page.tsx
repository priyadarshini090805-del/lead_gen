"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      {/* Floating glass orbs */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-gradient-to-br from-accent/20 to-transparent blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-[10%] w-80 h-80 rounded-full bg-gradient-to-br from-blue-200/30 to-transparent blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl text-center"
      >
        <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-sm text-ink-600 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          AI-driven lead generation
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-ink-900">
          Hanexis<span className="text-accent">.</span>
        </h1>
        <p className="mt-5 text-lg text-ink-600 leading-relaxed">
          Generate, personalize and automate social outreach on LinkedIn and Instagram — powered by GPT, scheduled by you.
        </p>
        <div className="mt-10 flex gap-3 justify-center">
          <Link href="/dashboard">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="bg-ink-900 text-white rounded-xl px-6 py-3 font-medium shadow-soft inline-flex items-center gap-2"
            >
              Open Dashboard <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
          <Link href="/dashboard/leads">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="glass-strong rounded-xl px-6 py-3 font-medium text-ink-800"
            >
              View Leads
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
