"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHome, FaUser, FaCode, FaProjectDiagram, FaEnvelope, FaBars, FaTimes, FaRobot } from "react-icons/fa";

const navLinks = [
  { label: "Home", href: "#hero", icon: <FaHome /> },
  { label: "AI", href: "#ai", icon: <FaRobot /> },
  { label: "Features", href: "#features", icon: <FaUser /> },
  { label: "Skills", href: "#skills", icon: <FaCode /> },
  { label: "Projects", href: "#projects", icon: <FaProjectDiagram /> },
  { label: "Contact", href: "#contact", icon: <FaEnvelope /> },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 z-50 -translate-x-1/2 w-full max-w-5xl rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg flex items-center justify-center px-4 sm:px-8 py-3 transition-all">
      <div className="flex items-center gap-6 sm:gap-8 min-w-0 w-full justify-center">
        <a
          href="https://iparx-media-akashpandeyweconnect-6582s-projects.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center px-6 py-2 rounded-lg border-2 border-cyan-400 text-cyan-400 font-extrabold text-base sm:text-lg tracking-wide transition-colors duration-300 hover:border-red-500"
          style={{ fontFamily: 'Poppins, sans-serif', background: 'none', boxShadow: 'none', whiteSpace: 'nowrap' }}
        >
          <motion.span
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.13, 1], color: ['#22d3ee', '#06b6d4', '#22d3ee'] }}
            transition={{ duration: 1.1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="inline-block w-full text-center"
            style={{ letterSpacing: '0.08em' }}
          >
            OUR BRAND
          </motion.span>
        </a>
        <div className="hidden md:flex gap-4 sm:gap-6 flex-wrap min-w-0">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-2 text-lg font-medium text-white/90 hover:text-cyan-400 transition-colors"
              onClick={e => {
                if (link.href.startsWith('#')) {
                  e.preventDefault();
                  const el = document.querySelector(link.href);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }
              }}
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <button
        className="md:hidden text-2xl text-cyan-300"
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu"
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>
      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={open ? { x: 0 } : { x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 right-0 h-full w-64 bg-black/90 backdrop-blur-lg z-50 flex flex-col gap-8 pt-24 px-8 md:hidden`}
      >
        <button
          className="absolute top-6 right-6 text-3xl text-white/80 hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 bg-black/30 rounded-full p-2 backdrop-blur"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <FaTimes />
        </button>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="flex items-center gap-3 text-xl font-semibold text-white/90 hover:text-cyan-400 transition-colors"
            onClick={e => {
              setOpen(false);
              if (link.href.startsWith('#')) {
                e.preventDefault();
                const el = document.querySelector(link.href);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }
            }}
          >
            {link.icon}
            {link.label}
          </a>
        ))}
      </motion.div>
      {/* Overlay for mobile menu */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </nav>
  );
}
