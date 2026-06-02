"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { about } from "@/lib/site-content";

interface Skill {
  name: string;
  level: "primary" | "secondary";
}

const skills: Skill[] = about.skills as Skill[];

export function AboutSkillsMatrix() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section className="relative w-full py-32 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">
            {about.skillsTitle}
          </p>
          <h2 className="text-5xl lg:text-7xl font-extrabold text-foreground mb-6">
            {about.skillsHeading}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {about.skillsDescription}
          </p>
        </motion.div>

        {/* Skills grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
          onMouseLeave={() => setHoveredSkill(null)}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <motion.div
                  animate={{
                    opacity:
                      hoveredSkill === null
                        ? 1
                        : hoveredSkill === skill.name
                          ? 1
                          : 0.3,
                    color:
                      hoveredSkill === skill.name && skill.level === "primary"
                        ? "rgb(var(--color-accent) / 1)"
                        : undefined,
                    textShadow:
                      hoveredSkill === skill.name && skill.level === "primary"
                        ? "0 0 20px rgb(var(--color-accent) / 0.5)"
                        : undefined,
                    transform:
                      hoveredSkill === skill.name
                        ? "scale(1.05) translateX(4px)"
                        : "scale(1)",
                  }}
                  transition={{ duration: 0.2 }}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    skill.level === "primary"
                      ? "border-white/20 bg-white/5 font-extrabold text-foreground"
                      : "border-white/5 bg-transparent font-light text-muted-foreground"
                  }`}
                >
                  <div className="text-sm md:text-base">{skill.name}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Background glow effect when hovering */}
          {hoveredSkill && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-accent blur-3xl pointer-events-none -z-10"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
