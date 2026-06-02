"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ImageReveal } from "@/components/image-reveal";
import Link from "next/link";
import { site } from "@/lib/site-content";

const projects = site.projectsArchive;

export default function ProjectsPage() {
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);
  const hoveredProject = projects.find((p) => p.id === hoveredProjectId);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Image Reveal */}
      <ImageReveal
        imageSrc={hoveredProject?.image || ""}
        isVisible={hoveredProjectId !== null}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-32 lg:px-16">
        {/* Header */}
        <div className="mb-32">
          {/* Eyebrow */}
          <div className="mb-8 font-mono text-xs tracking-widest text-muted-foreground">
            [ INDEX // 01 ] &nbsp;&nbsp;SYSTEM: ONLINE
          </div>

          {/* Title */}
          <h1 className="text-8xl lg:text-9xl font-bold tracking-tight leading-none font-sans">
            SELECTED
            <br />
            ARCHIVES
          </h1>
        </div>

        {/* Projects List */}
        <div className="space-y-24">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              onMouseEnter={() => setHoveredProjectId(project.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.6 }}
              className="group cursor-pointer"
            >
              {/* Project Row */}
              <div className="flex items-baseline justify-between gap-12">
                {/* Left: Title */}
                <motion.h2
                  animate={{
                    color:
                      hoveredProjectId === project.id
                        ? "rgba(255, 255, 255, 1)"
                        : hoveredProjectId !== null
                          ? "rgba(64, 64, 64, 1)"
                          : "rgba(255, 255, 255, 1)",
                    x: hoveredProjectId === project.id ? 12 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-7xl lg:text-8xl font-bold tracking-tight leading-none flex-1 font-sans"
                >
                  {project.title}
                </motion.h2>

                {/* Right: Metadata */}
                <div className="flex-shrink-0 font-mono text-xs text-muted-foreground space-y-2 text-right min-w-max">
                  <div className="text-neutral-600">YEAR: {project.year}</div>
                  <div className="text-neutral-600">ROLE: {project.role}</div>
                  <div className="text-neutral-600">
                    STACK: [{project.stack.join(", ")}]
                  </div>
                </div>
              </div>

              {/* Description */}
              <motion.p
                animate={{
                  color:
                    hoveredProjectId === project.id
                      ? "rgba(255, 255, 255, 1)"
                      : hoveredProjectId !== null
                        ? "rgba(64, 64, 64, 0.5)"
                        : "rgba(255, 255, 255, 0.5)",
                }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-lg text-muted-foreground font-sans"
              >
                {project.description}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Footer Line */}
        <div className="mt-32 pt-24 border-t border-neutral-900">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs text-muted-foreground tracking-widest">
              END OF ARCHIVE // SCROLL UP
            </p>
            <Link
              href="/"
              className="text-xs font-mono tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              BACK TO HOME
            </Link>
          </div>
        </div>
      </div>

      {/* Noise Overlay */}
      <div className="noise-overlay" />
    </div>
  );
}
