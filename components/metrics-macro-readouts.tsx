"use client";

import { useMemo } from "react";
import type { GitHubMetrics } from "@/lib/github";

interface MacroReadoutsProps {
  githubMetrics?: GitHubMetrics;
  totalCommits?: number;
  openSourceRepos?: number;
  totalStars?: number;
}

export function MacroReadouts({
  githubMetrics,
  totalCommits = 2847,
  openSourceRepos = 12,
  totalStars = 348,
}: MacroReadoutsProps) {
  const resolvedTotalCommits = githubMetrics?.totalCommits ?? totalCommits;
  const resolvedOpenSourceRepos =
    githubMetrics?.openSourceRepos ?? openSourceRepos;
  const resolvedTotalStars = githubMetrics?.totalStars ?? totalStars;

  // Generate simple sparkline data
  const generateSparkline = () => {
    const points = Array.from({ length: 20 }, () => Math.random() * 100);
    const max = Math.max(...points);
    return points.map((p) => (p / max) * 100);
  };

  const commitSparkline = useMemo(() => generateSparkline(), []);
  const repoSparkline = useMemo(() => generateSparkline(), []);
  const starSparkline = useMemo(() => generateSparkline(), []);

  const metrics = [
    {
      label: "TOTAL COMMITS",
      value: resolvedTotalCommits,
      sparkline: commitSparkline,
    },
    {
      label: "OPEN SOURCE REPOS",
      value: resolvedOpenSourceRepos,
      sparkline: repoSparkline,
    },
    {
      label: "GITHUB STARS",
      value: resolvedTotalStars,
      sparkline: starSparkline,
    },
  ];

  return (
    <div className="border border-white/10 p-8 mb-8 bg-black/40">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex flex-col">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="font-mono text-6xl md:text-7xl font-black text-white tracking-tighter">
                {metric.value.toLocaleString()}
              </span>
            </div>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">
              {metric.label}
            </span>
            {/* Minimalist sparkline */}
            <div className="flex items-end gap-0.5 h-12">
              {metric.sparkline.map((point, i) => (
                <div
                  key={i}
                  className="flex-1 bg-white/20 rounded-sm hover:bg-white/40 transition-colors"
                  style={{
                    height: `${Math.max(point, 5)}%`,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
