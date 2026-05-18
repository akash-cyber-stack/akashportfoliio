"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaPaperPlane, FaRobot, FaTimes } from "react-icons/fa";
import { AI_QUICK_PROMPTS, getPortfolioAIReply, type ChatMessage } from "@/lib/portfolioAI";
import { notifyAIChat } from "@/lib/web3formsClient";

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Hi — I'm Akash's AI assistant. Ask about skills, cybersecurity (Kali Linux), projects, or how to collaborate.",
};

export default function PortfolioAIChat() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("portfolio-ai-open", onOpen);
    return () => window.removeEventListener("portfolio-ai-open", onOpen);
  }, []);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const notifyOwner = (message: string) => {
    notifyAIChat(message, typeof window !== "undefined" ? window.location.href : undefined).catch(
      () => {}
    );
  };

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    setMessages((m) => [...m, { role: "user", content: trimmed }]);
    setInput("");
    setTyping(true);
    notifyOwner(trimmed);

    window.setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: getPortfolioAIReply(trimmed) }]);
      setTyping(false);
    }, 450 + Math.min(trimmed.length * 8, 600));
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 z-[70] flex h-[min(520px,72vh)] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-cyan-500/25 bg-zinc-950/95 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl sm:right-6"
          >
            <header className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-cyan-950/80 to-purple-950/60 px-4 py-3">
              <motion.div
                className="flex items-center gap-2"
                animate={{ opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 text-white">
                  <FaRobot />
                </span>
                <div>
                  <p className="text-sm font-bold text-white">Akash AI</p>
                  <p className="text-xs text-cyan-300/90">Portfolio assistant · online</p>
                </div>
              </motion.div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close chat"
              >
                <FaTimes />
              </button>
            </header>

            <motion.div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={`${msg.role}-${i}-${msg.content.slice(0, 12)}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                        : "border border-white/10 bg-white/5 text-zinc-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <motion.div
                    className="flex gap-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  </motion.div>
                </div>
              )}
            </motion.div>

            <div className="border-t border-white/10 px-3 py-2">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {AI_QUICK_PROMPTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => send(p)}
                    className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-medium text-cyan-200 transition-colors hover:bg-cyan-500/20 sm:text-xs"
                  >
                    {p}
                  </button>
                ))}
              </div>
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about skills, projects, security…"
                  className="flex-1 rounded-xl border border-white/10 bg-black/50 px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-cyan-500/50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white disabled:opacity-40"
                  aria-label="Send message"
                >
                  <FaPaperPlane className="text-sm" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-4 z-[70] flex items-center gap-2 rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 sm:right-6 sm:px-5"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-cyan-400/30"
          animate={{ scale: [1, 1.35, 1], opacity: [0.45, 0, 0.45] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        <FaRobot className="relative z-10 text-lg" />
        <span className="relative z-10 hidden sm:inline">{open ? "Close AI" : "Ask AI"}</span>
      </motion.button>
    </>
  );
}
