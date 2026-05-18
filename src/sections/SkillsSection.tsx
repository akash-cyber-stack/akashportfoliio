"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaAws,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaDatabase,
  FaLinux,
  FaShopify,
  FaWordpress,
  FaShieldAlt,
  FaUserSecret,
  FaNetworkWired,
  FaBug,
  FaLock,
  FaSearch,
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiDocker,
  SiMongodb,
  SiKubernetes,
  SiGithubactions,
  SiNginx,
  SiFlutter,
  SiAngular,
  SiKalilinux,
} from "react-icons/si";

const easeOut = [0.22, 1, 0.36, 1] as const;

const typingPhrases = [
  "Web, App, DevOps & Cybersecurity",
  "Kali Linux · Pentesting · React · Next.js",
  "AI-powered portfolio — ask the assistant",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut, delay: i * 0.1 },
  }),
};

function TypingSubheading() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: true });
  const [display, setDisplay] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    if (!inView) return;
    let timeout: ReturnType<typeof setTimeout>;
    if (typing) {
      if (charIdx < typingPhrases[phraseIdx].length) {
        timeout = setTimeout(() => {
          setDisplay((d) => d + typingPhrases[phraseIdx][charIdx]);
          setCharIdx((i) => i + 1);
        }, 55);
      } else {
        timeout = setTimeout(() => setTyping(false), 1400);
      }
    } else {
      timeout = setTimeout(() => {
        setDisplay("");
        setCharIdx(0);
        setTyping(true);
        setPhraseIdx((idx) => (idx + 1) % typingPhrases.length);
      }, 600);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, typing, inView, phraseIdx]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: easeOut }}
      className="mt-4 flex min-h-[2.75rem] w-full justify-center px-2"
    >
      <span className="inline-flex max-w-full items-center rounded-lg border border-cyan-900/30 bg-black/40 px-4 py-1.5 font-mono text-sm text-cyan-300 sm:text-base">
        <span className="truncate">{inView ? display : "\u00a0"}</span>
        <span
          className="ml-1 inline-block h-4 w-0.5 shrink-0 rounded-sm bg-cyan-400"
          style={{ animation: inView ? "skills-cursor-blink 1s step-end infinite" : "none" }}
        />
      </span>
    </motion.div>
  );
}

type Skill = { name: string; icon: React.ReactNode; level: string };
type SkillCategory = { title: string; color: string; skills: Skill[] };

const skillCategories: SkillCategory[] = [
  {
    title: "Web Development",
    color: "from-cyan-500 to-blue-500",
    skills: [
      { name: "React", icon: <FaReact className="text-cyan-400" />, level: "Expert" },
      { name: "Next.js", icon: <SiNextdotjs className="text-zinc-200" />, level: "Advanced" },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-400" />, level: "Intermediate" },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-300" />, level: "Advanced" },
      { name: "HTML5", icon: <FaHtml5 className="text-orange-400" />, level: "Expert" },
      { name: "CSS3", icon: <FaCss3Alt className="text-blue-300" />, level: "Expert" },
      { name: "JavaScript", icon: <FaJs className="text-yellow-300" />, level: "Expert" },
      { name: "MongoDB", icon: <SiMongodb className="text-green-500" />, level: "Advanced" },
      { name: "Express.js", icon: <SiNginx className="text-gray-200" />, level: "Advanced" },
      { name: "Node.js", icon: <FaNodeJs className="text-green-400" />, level: "Intermediate" },
      { name: "Database", icon: <FaDatabase className="text-blue-200" />, level: "Advanced" },
      { name: "Shopify", icon: <FaShopify className="text-green-400" />, level: "Expert" },
      { name: "WordPress", icon: <FaWordpress className="text-blue-400" />, level: "Expert" },
    ],
  },
  {
    title: "App Development",
    color: "from-pink-500 to-purple-500",
    skills: [
      { name: "Node.js", icon: <FaNodeJs className="text-green-400" />, level: "Intermediate" },
      { name: "Flutter (Dart)", icon: <SiFlutter className="text-blue-400" />, level: "Expert" },
      { name: "API Integration", icon: <FaAws className="text-yellow-400" />, level: "Advanced" },
      { name: "Angular", icon: <SiAngular className="text-red-500" />, level: "Intermediate" },
      { name: "React Native", icon: <FaReact className="text-cyan-400" />, level: "Intermediate" },
    ],
  },
  {
    title: "DevOps",
    color: "from-yellow-400 via-green-400 to-blue-400",
    skills: [
      { name: "AWS", icon: <FaAws className="text-yellow-400" />, level: "Advanced" },
      { name: "Docker", icon: <SiDocker className="text-blue-400" />, level: "Advanced" },
      { name: "Kubernetes", icon: <SiKubernetes className="text-blue-300" />, level: "Intermediate" },
      { name: "GitHub Actions", icon: <SiGithubactions className="text-gray-200" />, level: "Advanced" },
      { name: "Linux", icon: <FaLinux className="text-gray-300" />, level: "Expert" },
    ],
  },
  {
    title: "Cybersecurity",
    color: "from-red-500 via-orange-500 to-amber-400",
    skills: [
      { name: "Kali Linux", icon: <SiKalilinux className="text-blue-400" />, level: "Advanced" },
      { name: "Penetration Testing", icon: <FaUserSecret className="text-red-400" />, level: "Intermediate" },
      { name: "Network Security", icon: <FaNetworkWired className="text-green-400" />, level: "Advanced" },
      { name: "OWASP Top 10", icon: <FaShieldAlt className="text-orange-400" />, level: "Intermediate" },
      { name: "Burp Suite", icon: <FaBug className="text-amber-300" />, level: "Intermediate" },
      { name: "Nmap / Wireshark", icon: <FaSearch className="text-cyan-300" />, level: "Advanced" },
      { name: "Metasploit", icon: <FaLinux className="text-red-300" />, level: "Intermediate" },
      { name: "Security Auditing", icon: <FaLock className="text-yellow-400" />, level: "Advanced" },
    ],
  },
];

type SkillCardProps = { cat: SkillCategory; i: number };

function SkillCard({ cat, i }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { amount: 0.2, once: true, margin: "0px 0px -80px 0px" });

  return (
    <motion.article
      ref={cardRef}
      custom={i}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="w-full overflow-hidden rounded-3xl border border-white/10 bg-[#18181c]/95 shadow-2xl"
      style={{ boxShadow: "0 8px 48px 0 #000a, 0 1.5px 0 #222" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.45, ease: easeOut, delay: 0.08 + i * 0.1 }}
        className="flex w-full flex-col items-center justify-between px-4 py-8 md:flex-row md:px-12 md:py-10"
      >
        <motion.div
          className="mb-8 flex flex-1 items-center justify-center md:mb-0"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.04, delayChildren: 0.15 + i * 0.1 } },
          }}
        >
          <motion.div
            className="grid grid-cols-3 gap-4 sm:gap-6"
            variants={{
              hidden: {},
              visible: {},
            }}
          >
            {cat.skills.map((skill: Skill) => (
              <motion.div
                key={skill.name}
                variants={{
                  hidden: { opacity: 0, scale: 0.92 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: easeOut } },
                }}
                className="flex flex-col items-center gap-2 rounded-xl bg-black/40 p-3 shadow transition-colors duration-300 hover:bg-black/55"
              >
                <span className="mb-1 text-3xl drop-shadow-lg md:text-4xl">{skill.icon}</span>
                <span className="text-center text-sm font-medium text-zinc-100 md:text-base">{skill.name}</span>
                <span className="font-mono text-xs text-cyan-200">{skill.level}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-1 flex-col items-start justify-center md:pl-12"
          initial={{ opacity: 0, x: 16 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.2 + i * 0.1 }}
        >
          <h3
            className={`mb-4 bg-gradient-to-r ${cat.color} bg-clip-text text-2xl font-bold text-transparent sm:text-3xl`}
          >
            {cat.title}
          </h3>
          <ul className="mb-6 max-h-48 space-y-2 overflow-y-auto pr-1 sm:max-h-none">
            {cat.skills.map((skill: Skill) => (
              <li key={skill.name} className="flex items-center gap-2 text-base sm:text-lg">
                <span className="inline-block shrink-0">{skill.icon}</span>
                <span className="font-semibold text-zinc-100">{skill.name}</span>
                <span className="ml-auto text-xs text-cyan-300 sm:ml-2">{skill.level}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="group relative mt-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 px-7 py-3 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98]"
            onClick={() => {
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            <span className="relative z-10">Learn More</span>
            <span className="absolute inset-x-0 bottom-0 z-0 h-0 rounded-b-full bg-black/60 transition-all duration-300 group-hover:h-full" />
          </button>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

export default function SkillsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { amount: 0.6, once: true });

  return (
    <section
      id="skills"
      className="relative flex w-full scroll-mt-28 flex-col items-center bg-gradient-to-br from-[#050509] via-[#0a0a0a] to-[#050509] px-4 py-24 text-white sm:px-8 sm:py-28"
    >
      <motion.header
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.55, ease: easeOut }}
        className="z-10 mb-14 flex w-full max-w-3xl flex-col items-center text-center"
      >
        <div className="rounded-xl bg-[#18181c] px-5 py-2 shadow-lg">
          <h2
            className="m-0 text-2xl font-bold tracking-tight text-white sm:text-3xl"
            style={{ fontFamily: "Montserrat, Poppins, sans-serif", fontWeight: 700, letterSpacing: "0.01em" }}
          >
            My Skills
          </h2>
        </div>
        <TypingSubheading />
      </motion.header>

      <motion.div
        className="relative flex w-full max-w-3xl flex-col items-center gap-12 sm:gap-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05, margin: "0px 0px -60px 0px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {skillCategories.map((cat, i) => (
          <SkillCard key={cat.title} cat={cat} i={i} />
        ))}
      </motion.div>

      <style jsx global>{`
        @keyframes skills-cursor-blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
