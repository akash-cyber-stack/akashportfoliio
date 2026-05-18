"use client";
import React from "react";

import ProjectsScrollCards from "./ProjectsScrollCards";



export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 w-full scroll-mt-28 overflow-x-hidden bg-black px-4 py-16 text-white sm:px-8 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cyan-500/5 to-transparent"
        aria-hidden
      />
      <ProjectsScrollCards />
    </section>
  );
}
