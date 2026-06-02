"use client";

import { site } from "@/lib/site-content";

export function MetricsHeader() {
  return (
    <div className="border-b border-white/10 pb-8 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-accent rounded-full animate-pulse-dot" />
        <span className="font-mono text-xs text-muted-foreground tracking-widest">
          {site.headerBadge}
        </span>
      </div>
      <h1 className="font-sans font-black text-7xl md:text-8xl lg:text-[10rem] leading-[0.9] text-white mb-2">
        {site.headerTitle.split("\n").map((line: string) => (
          <span key={line}>
            {line}
            <br />
          </span>
        ))}
      </h1>
      <p className="font-mono text-sm text-muted-foreground mt-4">
        {site.headerSubtitle}
      </p>
    </div>
  );
}
