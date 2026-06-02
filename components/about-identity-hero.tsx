"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { site } from "@/lib/site-content";

export function AboutIdentityHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      const cards = containerRef.current.querySelectorAll("[data-tilt]");
      cards.forEach((card) => {
        const element = card as HTMLElement;
        const rotateX = y * 5;
        const rotateY = x * -5;
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-20 lg:px-8">
      {/* Main title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-7xl mb-20"
      >
        <h1 className="text-7xl lg:text-[12rem] font-extrabold leading-[0.9] text-foreground text-balance">
          {site.aboutHeadline.split("\n").map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </h1>
      </motion.div>

      {/* Two-column bento setup */}
      <div
        ref={containerRef}
        className="w-full max-w-7xl grid lg:grid-cols-2 gap-6 lg:gap-8"
      >
        {/* Left box - Introduction */}
        <motion.div
          data-tilt
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="p-8 lg:p-10 rounded-lg border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-300"
        >
          <p className="text-lg lg:text-xl font-light leading-relaxed text-foreground/90">
            {site.aboutIntro}
          </p>
        </motion.div>

        {/* Right box - The Vibe Check */}
        <motion.div
          data-tilt
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="p-8 lg:p-10 rounded-lg border border-white/10 bg-white/[0.02] backdrop-blur-sm"
        >
          <div className="space-y-4">
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              {site.aboutVibeTitle}
            </div>

            {/* Animated equalizer */}
            <div className="flex items-end justify-center gap-2 py-6 h-16">
              {[0.3, 0.7, 0.5].map((height, i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [height, 1, height] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                  className="w-1.5 bg-accent rounded-full origin-bottom"
                  style={{ height: "24px" }}
                />
              ))}
            </div>

            <p className="text-sm text-muted-foreground font-light">
              {site.aboutVibeText}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
