"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { site, stack } from "@/lib/site-content";
import type { GitHubMetrics } from "@/lib/github";
import { useTerminal } from "@/hooks/use-terminal";

const techStack = stack;

interface BentoGridProps {
  githubMetrics?: GitHubMetrics;
}

function PhilosophyCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="col-span-2 row-span-2 p-8 md:p-10 bg-card rounded-2xl border border-[oklch(1_0_0/0.08)] flex flex-col justify-between group hover:border-[oklch(1_0_0/0.15)] transition-colors duration-300"
    >
      <div>
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Philosophy
        </span>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-4 leading-tight text-balance">
          Code should be
          <br />
          <span className="text-accent">
            {site.philosophy.title.replace("Code should be ", "")}
          </span>
        </h3>
      </div>
      <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md">
        {site.philosophy.description}
      </p>
    </motion.div>
  );
}

function GitHubCard({ metrics }: { metrics: GitHubMetrics }) {
  const weeklyContributions =
    metrics.weeklyContributions.length > 0
      ? [3, 5, 2, 8, 4, 6, 1, 7, 3, 9, 4, 2, 6, 5]
      : metrics.weeklyContributions;
  const maxWeeklyContribution = Math.max(...weeklyContributions, 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="col-span-2 p-6 md:p-8 bg-card rounded-2xl border border-[oklch(1_0_0/0.08)] hover:border-[oklch(1_0_0/0.15)] transition-colors duration-300"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            GitHub Impact{" "}
            {metrics.source === "live" ? "// LIVE" : "// FALLBACK"}
          </span>
          <p className="text-3xl md:text-4xl font-bold mt-2">
            {Number(metrics.contributions) != 0
              ? metrics.contributions
              : site.githubImpact.contributions}
          </p>
          <p className="text-sm text-muted-foreground">
            {metrics.contributionLabel}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">{metrics.repositories}</p>
          <p className="text-xs text-muted-foreground">
            {metrics.repositoriesLabel}
          </p>
        </div>
      </div>

      <div className="flex items-end gap-1 h-20">
        {weeklyContributions.map((count, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{
              height: `${(count / maxWeeklyContribution) * 100}%`,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="flex-1 rounded-sm bg-accent/20 hover:bg-accent/40 transition-colors"
            style={{ minHeight: 4 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function StackCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="col-span-2 row-span-2 p-6 bg-card rounded-2xl border border-[oklch(1_0_0/0.08)] hover:border-[oklch(1_0_0/0.15)] transition-colors duration-300 overflow-hidden"
    >
      <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        The Stack
      </span>

      <div className="mt-6 space-y-4">
        {Object.entries(techStack).map(([category, items]) => (
          <div key={category}>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
              {category}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {items.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-[10px] md:text-xs font-medium bg-secondary/50 text-foreground/80 rounded border border-[oklch(1_0_0/0.08)] hover:border-accent/50 hover:text-accent transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function TerminalCard() {
  const { input, setInput, output, onKeyDown, bottomRef } = useTerminal({
    initialOutput: [
      "$ whoami",
      site.terminal.whoami,
      "$ cat skills.txt",
      ...site.terminal.skills,
      "$"
    ]
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="col-span-1 p-4 bg-[oklch(0.03_0_0)] rounded-2xl border border-[oklch(1_0_0/0.08)] hover:border-accent/30 transition-colors duration-300 font-mono text-xs flex flex-col h-full min-h-[200px]"
    >
      <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-[oklch(1_0_0/0.08)]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-muted-foreground text-[10px]">terminal</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 text-[10px] md:text-xs">
        {output.map((line, i) => (
          <p
            key={i}
            className={
              line.startsWith("$") ? "text-accent" : "text-muted-foreground whitespace-pre-wrap"
            }
          >
            {line === "$" ? (
              <span>
                $ <span className="animate-blink">▌</span>
              </span>
            ) : (
              line
            )}
          </p>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="mt-2 pt-2 border-t border-[oklch(1_0_0/0.08)]">
        <div className="flex items-center gap-1">
          <span className="text-accent">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim()) {
                window.dispatchEvent(
                  new CustomEvent("open-terminal-with-cmd", { detail: input })
                );
                setInput("");
              } else {
                onKeyDown(e);
              }
            }}
            placeholder="type 'help'"
            className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground/50"
          />
        </div>
      </div>
    </motion.div>
  );
}

function CurrentFocusCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="col-span-1 p-6 bg-card rounded-2xl border border-[oklch(1_0_0/0.08)] hover:border-[oklch(1_0_0/0.15)] transition-colors duration-300"
    >
      <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Currently
      </span>
      <p className="text-lg md:text-xl font-semibold mt-3 leading-snug">
        {site.currentFocus.title}
      </p>
      <div className="mt-4 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
        </span>
        <span className="text-xs text-muted-foreground">
          {site.currentFocus.status}
        </span>
      </div>
    </motion.div>
  );
}

export function BentoGrid({ githubMetrics }: BentoGridProps) {
  return (
    <section id="about" className="py-20 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            About
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">The DNA</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <PhilosophyCard />
          <StackCard />
          <GitHubCard
            metrics={
              githubMetrics ?? {
                contributions: site.githubImpact.contributions,
                contributionLabel: site.githubImpact.contributionLabel,
                repositories: site.githubImpact.repositories,
                repositoriesLabel: site.githubImpact.repositoriesLabel,
                totalCommits: 2847,
                openSourceRepos: 12,
                totalStars: 348,
                weeklyContributions: [3, 5, 2, 8, 4, 6, 1, 7, 3, 9, 4, 2, 6, 5],
                source: "fallback",
              }
            }
          />
          <TerminalCard />
          <CurrentFocusCard />
        </div>
      </div>
    </section>
  );
}
