"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { submitWeb3Form } from "@/lib/web3formsClient";

export default function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [showThankYou, setShowThankYou] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", agree: false });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let checked: boolean | undefined;
    if (type === "checkbox" && "checked" in e.target) {
      checked = (e.target as HTMLInputElement).checked;
    }
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  };

  const isValid = form.name && form.phone && form.email && form.agree;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || sending) return;

    setSending(true);
    setError("");

    try {
      const result = await submitWeb3Form({
        subject: `Portfolio contact: ${form.name}`,
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message || "(no message)",
      });

      if (!result.ok) {
        setError(result.error);
        return;
      }

      setShowThankYou(true);
      setForm({ name: "", phone: "", email: "", message: "", agree: false });
      setTouched({});
      window.setTimeout(() => {
        setShowThankYou(false);
        onClose();
      }, 2200);
    } catch {
      setError("Network error. Please try again or email pandeyakash85296@gmail.com.");
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100vw", opacity: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative max-w-md w-full rounded-2xl border border-purple-400 bg-zinc-900 p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 text-2xl font-bold text-white/70 hover:text-purple-400 focus:outline-none"
              aria-label="Close"
            >
              &times;
            </button>
            <AnimatePresence>
              {showThankYou ? (
                <motion.div
                  key="thankyou"
                  initial={{ y: -80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -80, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 90, damping: 16 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl bg-zinc-900/95"
                >
                  <h2 className="mb-2 text-2xl font-extrabold text-purple-400">Thank You!</h2>
                  <p className="text-white/80">Message sent — Akash will be notified instantly.</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
            <motion.div className={showThankYou ? "pointer-events-none opacity-40" : ""}>
              <h2 className="mb-4 text-2xl font-extrabold text-purple-400">Let&apos;s Collaborate!</h2>
              <p className="mb-6 text-white/80">Fill out the form below and I&apos;ll get back to you soon.</p>
              {error ? (
                <p className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                  {error}
                </p>
              ) : null}
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`rounded-lg border bg-zinc-800 px-4 py-2 text-white placeholder-white/60 outline-none focus:border-purple-400 ${touched.name && !form.name ? "border-red-500" : "border-zinc-700"}`}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Contact Number"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`rounded-lg border bg-zinc-800 px-4 py-2 text-white placeholder-white/60 outline-none focus:border-purple-400 ${touched.phone && !form.phone ? "border-red-500" : "border-zinc-700"}`}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`rounded-lg border bg-zinc-800 px-4 py-2 text-white placeholder-white/60 outline-none focus:border-purple-400 ${touched.email && !form.email ? "border-red-500" : "border-zinc-700"}`}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="min-h-[80px] resize-none rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-white/60 outline-none focus:border-purple-400"
                />
                <label className="flex select-none items-center gap-2 text-sm text-white/80">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    className="h-5 w-5 rounded border border-zinc-700 accent-purple-400 focus:ring-2 focus:ring-purple-400"
                    required
                  />
                  <span>
                    I confirm all details are correct <span className="text-purple-400">&#10003;</span>
                  </span>
                </label>
                <button
                  type="submit"
                  className="mt-2 rounded-full bg-purple-400 py-3 font-bold text-white transition-all hover:bg-purple-500 disabled:opacity-60"
                  disabled={!isValid || sending}
                >
                  {sending ? "Sending…" : "Send Message"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
