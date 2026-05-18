"use client";



import React, { useState } from "react";

import Image from "next/image";

import { motion } from "framer-motion";

import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";



function ProjectImageWithFallback({
  src,
  alt,
  priority,
  contain,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  contain?: boolean;
}) {

  const [imgSrc, setImgSrc] = useState(src);

  const [failed, setFailed] = useState(false);



  if (failed) {

    return (

      <motion.div

        initial={{ opacity: 0 }}

        animate={{ opacity: 1 }}

        className="flex aspect-[5/3] w-full items-center justify-center rounded-2xl border border-white/10 bg-zinc-800/80 text-zinc-500"

      >

        <span className="text-sm font-medium">Preview unavailable</span>

      </motion.div>

    );

  }



  return (

    <div
      className={`relative aspect-[5/3] w-full overflow-hidden rounded-2xl border border-white/10 ${contain ? "bg-white" : "bg-zinc-900"}`}
    >

      <Image

        src={imgSrc}

        alt={alt}

        fill

        sizes="(max-width: 768px) 100vw, 50vw"

        className={contain ? "object-contain p-8" : "object-cover"}

        priority={priority}

        onError={() => {

          if (imgSrc !== "/AK.png") setImgSrc("/AK.png");

          else setFailed(true);

        }}

      />

    </div>

  );

}



const projects = [

  {

    title: "Modern Portfolio Website",

    image: "/AK.png",

    description:

      "A highly animated, responsive portfolio site built with Next.js, Framer Motion, and Tailwind CSS, featuring glassmorphism and dark mode.",

    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "AI Assistant"],

    github: "https://github.com/akashpandey-dev/portfolio",

    demo: "https://akashpandey.dev/",

  },

  {

    title: "IPARX MEDIA",

    image: "/IPARX.jpg",

    description:

      "IPARX MEDIA is a fast-growing digital solutions startup focused on transforming brands into powerful digital leaders.",

    tech: ["React", "Next.js", "Framer Motion", "TypeScript", "GitHub", "Vercel"],

    github: "https://github.com/Akash12876/client-project",

    demo: "https://iparx-media-akashpandeyweconnect-6582s-projects.vercel.app/",

  },

  {

    title: "App Random Quote Generator",

    image: "/random.jpg",

    description:

      "Random Quote Generator delivers inspirational quotes instantly — one click to motivate, inspire, and spark creativity.",

    tech: ["Flutter (DART)", "Database", "API Integration"],

    github: "https://github.com/Akash12876/random_quote_generator",

    demo: "#",

  },

  {

    title: "AR Group of Education",

    image: "/A group.webp",

    description:

      "AR Group of Education has supported aspiring MBBS doctors since 2005, providing expert guidance and exceptional service.",

    tech: ["WordPress", "Plugins", "API Integration"],

    demo: "https://argroupofeducation.com/",

  },

  {

    title: "College Dunias",

    image: "/college.png",

    description:

      "Collegedunias helps aspirants identify the best private B.Tech. colleges and assists through the application process for admission.",

    tech: ["WordPress", "Plugins", "API Integration"],

    demo: "https://collegedunias.com/",

  },

  {

    title: "Movatobags",

    image: "/movatobags.png",

    imageContain: true,

    description:

      "Movatobags offers stylish, durable bags for all occasions — functionality meets modern design.",

    tech: ["Shopify", "Liquid", "PHP", "Payment Integration"],

    demo: "https://movatobags.com/",

  },

];



const ease = [0.22, 1, 0.36, 1] as const;



function ProjectCard({

  project,

  index,

}: {

  project: (typeof projects)[number];

  index: number;

}) {

  const reverse = index % 2 === 1;



  return (

    <motion.article

      className="group relative w-full"

      initial={{ opacity: 0, y: 32 }}

      whileInView={{ opacity: 1, y: 0 }}

      viewport={{ once: true, amount: 0.12, margin: "0px 0px -40px 0px" }}

      transition={{ duration: 0.5, ease, delay: index * 0.06 }}

    >

      <motion.div

        className={`relative flex w-full flex-col gap-8 overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-zinc-900/95 to-zinc-950/95 p-6 shadow-xl shadow-black/40 backdrop-blur-sm md:flex-row md:items-center md:p-8 ${

          reverse ? "md:flex-row-reverse" : ""

        }`}

        whileHover={{ y: -4 }}

        transition={{ duration: 0.25, ease: "easeOut" }}

      >

        <div

          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"

          style={{

            background:

              "linear-gradient(135deg, rgba(34,211,238,0.15), transparent 40%, rgba(168,85,247,0.1))",

          }}

        />



        <motion.div

          className="relative z-10 w-full shrink-0 md:w-[46%]"

          initial={{ opacity: 0, scale: 0.98 }}

          whileInView={{ opacity: 1, scale: 1 }}

          viewport={{ once: true, amount: 0.2 }}

          transition={{ duration: 0.45, ease }}

        >

          <ProjectImageWithFallback
            src={project.image}
            alt={project.title}
            priority={index === 0}
            contain={"imageContain" in project && project.imageContain}
          />

        </motion.div>



        <div className="relative z-10 flex w-full flex-col gap-4 md:w-[54%]">

          <span className="w-fit rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-cyan-300">

            Project {String(index + 1).padStart(2, "0")}

          </span>

          <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{project.title}</h3>

          <p className="text-base leading-relaxed text-zinc-400">{project.description}</p>

          <motion.div

            className="flex flex-wrap gap-2"

            initial="hidden"

            whileInView="visible"

            viewport={{ once: true, amount: 0.2 }}

            variants={{

              hidden: {},

              visible: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } },

            }}

          >

            {project.tech.map((tech) => (

              <motion.span

                key={tech}

                variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}

                className="rounded-full border border-cyan-500/15 bg-cyan-950/50 px-3 py-1 font-mono text-xs text-cyan-200/90"

              >

                {tech}

              </motion.span>

            ))}

          </motion.div>

          <div className="mt-2 flex flex-wrap gap-3">

            {"github" in project && project.github && (

              <a

                href={project.github}

                target="_blank"

                rel="noopener noreferrer"

                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition-colors hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300"

              >

                <FaGithub className="text-base" />

                GitHub

              </a>

            )}

            {project.demo !== "#" && (

              <a

                href={project.demo}

                target="_blank"

                rel="noopener noreferrer"

                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-transform hover:scale-[1.02] active:scale-[0.98]"

              >

                <FaExternalLinkAlt className="text-xs" />

                Live Demo

              </a>

            )}

          </div>

        </div>

      </motion.div>

    </motion.article>

  );

}



export default function ProjectsScrollCards() {

  return (

    <motion.div

      className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-14 py-8 md:gap-16"

      initial={{ opacity: 0, y: 16 }}

      whileInView={{ opacity: 1, y: 0 }}

      viewport={{ once: true, amount: 0.08 }}

      transition={{ duration: 0.5, ease }}

    >

      <header className="flex max-w-2xl flex-col items-center gap-4 text-center">

        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-zinc-300">

          Portfolio

        </span>

        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">

          My <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Projects</span>

        </h2>

        <p className="text-base text-zinc-400 md:text-lg">

          Selected work across web, mobile, and e-commerce — built for performance and polish.

        </p>

      </header>



      <motion.div className="flex w-full flex-col gap-10 md:gap-14">

        {projects.map((project, idx) => (

          <ProjectCard key={project.title} project={project} index={idx} />

        ))}

      </motion.div>

    </motion.div>

  );

}

