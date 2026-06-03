"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { about } from "@/lib/site-content";

interface Era {
  year: string;
  position: "left" | "right";
  role: string;
  company: string;
  description: string;
  highlights: string[];
  tags: string[];
}

const eras: Era[] = about.eras as Era[];

interface EraCardProps {
  era: Era;
  index: number;
}

function EraCard({ era, index }: EraCardProps) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const isLeft = era.position === "left";
  const yearWords = era.year.split(/\s+/);
  const yearLabel =
    yearWords.length > 8
      ? [yearWords.slice(0, 8).join(" "), yearWords.slice(8).join(" ")]
      : [era.year];
  const contentAlignment = isLeft
    ? "mr-auto items-start text-left"
    : "ml-auto items-end text-right";
  const highlightAlignment = isLeft
    ? "flex-row"
    : "flex-row-reverse justify-end text-right";
  const tagAlignment = isLeft ? "justify-start" : "justify-end";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[70vh] flex items-center py-24"
    >
      {/* Year watermark */}
      <div className="absolute inset-0 flex items-center pointer-events-none">
        <div
          className={`text-[15vw] font-extrabold text-neutral-900/40 leading-none whitespace-nowrap max-sm:whitespace-normal max-sm:break-all ${
            isLeft ? "ml-0" : "ml-auto mr-0"
          }`}
        >
          {yearLabel.map((line, lineIndex) => (
            <span key={lineIndex} className="block">
              {line}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 flex max-w-2xl flex-col ${contentAlignment}`}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-2">
            ERA {String(index + 1).padStart(2, "0")}
          </p>
          <h2 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-2">
            {era.role}
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            @ {era.company}
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 max-w-xl text-base text-justify leading-relaxed text-foreground/80 lg:text-lg"
        >
          {era.description}
        </motion.p>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 space-y-2"
        >
          {era.highlights.map((highlight, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${highlightAlignment}`}
            >
              <span className="text-accent mt-1">✦</span>
              <p className="text-sm text-muted-foreground">{highlight}</p>
            </div>
          ))}
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`flex flex-wrap gap-2 ${tagAlignment}`}
        >
          {era.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-muted-foreground font-light"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export function AboutEras() {
  return (
    <section className="relative w-full py-20 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">
            {about.timelineTitle}
          </p>
          <h2 className="text-5xl lg:text-7xl font-extrabold text-foreground">
            {about.timelineHeading}
          </h2>
        </motion.div>

        {/* Eras */}
        {eras.map((era, index) => (
          <EraCard key={index} era={era} index={index} />
        ))}
      </div>
    </section>
  );
}
