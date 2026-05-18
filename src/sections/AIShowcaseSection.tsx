"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaBrain, FaComments, FaShieldAlt, FaRocket } from "react-icons/fa";
import { AI_QUICK_PROMPTS } from "@/lib/portfolioAI";

const features = [
  {
    icon: <FaBrain className="text-2xl text-cyan-400" />,
    title: "Smart answers",
    text: "Instant replies about skills, DevOps, cybersecurity, and projects.",
  },
  {
    icon: <FaShieldAlt className="text-2xl text-red-400" />,
    title: "Security-aware",
    text: "Highlights Kali Linux, pentesting, and OWASP-focused experience.",
  },
  {
    icon: <FaRocket className="text-2xl text-purple-400" />,
    title: "Hire-ready",
    text: "Guides visitors to contact, demos, and collaboration options.",
  },
];

export default function AIShowcaseSection() {
  const openAI = () => {
    window.dispatchEvent(new CustomEvent("portfolio-ai-open"));
  };

  return (
    <section
      id="ai"
      className="relative scroll-mt-28 overflow-hidden bg-black px-4 py-20 sm:px-8 sm:py-24"
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[100px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-[10%] top-[20%] h-48 w-48 rounded-full bg-purple-500/15 blur-[80px]"
        animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300">
            <FaComments /> AI-powered portfolio
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Talk to{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Akash AI
            </span>
          </h2>
          <p className="max-w-2xl text-base text-zinc-400 sm:text-lg">
            An interactive assistant built into this portfolio — ask about web development, DevOps,
            cybersecurity, or how to work together. No signup required.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid w-full gap-4 sm:grid-cols-3"
        >
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors hover:border-cyan-500/25 hover:bg-white/[0.06]"
            >
              <motion.div className="mb-3">{f.icon}</motion.div>
              <h3 className="mb-2 font-semibold text-white">{f.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{f.text}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="w-full max-w-2xl rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-zinc-900/90 to-black/90 p-6 shadow-xl shadow-cyan-500/5"
        >
          <p className="mb-4 text-center text-sm text-zinc-400">Try a quick prompt</p>
          <div className="flex flex-wrap justify-center gap-2">
            {AI_QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={openAI}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 transition-all hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-200"
              >
                {p}
              </button>
            ))}
          </div>
          <motion.button
            type="button"
            onClick={openAI}
            className="mx-auto mt-6 flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-cyan-500/20"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaComments />
            Start AI Chat
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
