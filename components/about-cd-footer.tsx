"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site-content";

export function AboutCDFooter() {
  return (
    <section className="relative w-full py-20 px-4 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">
            {site.aboutFooter.eyebrow}
          </p>
          <h2 className="text-5xl lg:text-7xl font-extrabold text-foreground">
            {site.aboutFooter.heading}
          </h2>
        </motion.div>

        {/* Marquee ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative overflow-hidden py-12"
        >
          <div className="flex whitespace-nowrap animate-marquee">
            <span className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-muted-foreground/40 mr-8 inline-block">
              {site.aboutFooter.marquee}
            </span>
            <span className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-muted-foreground/40 inline-block">
              {site.aboutFooter.marquee}
            </span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center pt-12"
        >
          <p className="text-muted-foreground mb-8">
            {site.aboutFooter.ctaCopy}
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-foreground text-sm font-mono uppercase tracking-wider transition-all duration-300"
          >
            BACK TO HOME
          </a>
        </motion.div>
      </div>
    </section>
  );
}
