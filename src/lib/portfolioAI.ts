export type ChatMessage = { role: "user" | "assistant"; content: string };

export const AI_QUICK_PROMPTS = [
  "What are your top skills?",
  "Tell me about your projects",
  "Do you know cybersecurity?",
  "How can I hire you?",
] as const;

const profile = {
  name: "Akash Pandey",
  role: "Full Stack Developer · DevOps · Cybersecurity",
  email: "pandeyakash85296@gmail.com",
  education: "BCA (2025)",
  highlights: [
    "Web: React, Next.js, TypeScript, Tailwind",
    "Mobile: Flutter, React Native",
    "DevOps: AWS, Docker, Kubernetes, GitHub Actions",
    "Cybersecurity: Kali Linux, penetration testing, network security",
  ],
  projects: [
    "Modern Portfolio (Next.js + Framer Motion)",
    "IPARX MEDIA — digital solutions startup site",
    "AR Group of Education, College Dunias, Movatobags",
    "Random Quote Generator (Flutter)",
  ],
};

function includesAny(text: string, words: string[]) {
  return words.some((w) => text.includes(w));
}

export function getPortfolioAIReply(input: string): string {
  const q = input.trim().toLowerCase();
  if (!q) return "Ask me anything about Akash's skills, projects, or how to collaborate.";

  if (includesAny(q, ["hi", "hello", "hey", "namaste"])) {
    return `Hi! I'm Akash's AI guide. I can walk you through his ${profile.role} work, projects, and how to get in touch. What would you like to know?`;
  }

  if (includesAny(q, ["skill", "stack", "tech", "expert", "know"])) {
    return `Akash specializes in:\n\n• ${profile.highlights.join("\n• ")}\n\nScroll to **My Skills** for detailed levels, including a dedicated **Cybersecurity** card with Kali Linux and related tools.`;
  }

  if (includesAny(q, ["cyber", "security", "kali", "pentest", "hack", "owasp", "burp", "nmap"])) {
    return "Yes — Akash has hands-on cybersecurity experience including **Kali Linux**, penetration testing, network security, OWASP awareness, Burp Suite, Nmap/Wireshark, and security auditing. Check the **Cybersecurity** section under My Skills.";
  }

  if (includesAny(q, ["project", "portfolio", "work", "built", "demo"])) {
    return `Featured projects:\n\n• ${profile.projects.join("\n• ")}\n\nOpen the **Projects** section below Skills for live demos and GitHub links.`;
  }

  if (includesAny(q, ["devops", "aws", "docker", "kubernetes", "deploy", "ci"])) {
    return "DevOps is a core strength: AWS, Docker, Kubernetes, GitHub Actions, Linux, and Nginx. Akash builds pipelines and deploys production-ready apps on modern cloud stacks.";
  }

  if (includesAny(q, ["react", "next", "web", "frontend", "tailwind"])) {
    return "For web, Akash ships polished UIs with React, Next.js, TypeScript, Tailwind CSS, and Framer Motion — exactly what powers this portfolio's animations and performance.";
  }

  if (includesAny(q, ["flutter", "app", "mobile", "android", "ios"])) {
    return "On mobile, Akash works with Flutter (Dart), React Native, and API integrations — including a published Random Quote Generator app.";
  }

  if (includesAny(q, ["hire", "contact", "collaborate", "email", "reach", "job", "freelance"])) {
    return `Ready to collaborate? Email **${profile.email}** or use the **Contact** section. You can also connect on LinkedIn and Instagram from the footer.`;
  }

  if (includesAny(q, ["ai", "assistant", "bot", "chat"])) {
    return "You're already using it! This portfolio includes an AI assistant trained on Akash's profile — ask about skills, cybersecurity, projects, or hiring anytime.";
  }

  if (includesAny(q, ["who", "about", "akash", "you", "introduce"])) {
    return `${profile.name} is a ${profile.role} (${profile.education}). He delivers real-world web, app, and DevOps solutions with clean code, strong UX, and security-aware practices.`;
  }

  return `Great question! Akash is a ${profile.role}. Try asking about **skills**, **cybersecurity**, **projects**, or **how to hire**. Or tap a quick prompt below.`;
}
