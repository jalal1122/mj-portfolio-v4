"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function WelcomeSplash() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the splash this session
    const hasSeenSplash = sessionStorage.getItem("mj-welcomed");
    if (!hasSeenSplash) {
      // Small delay to allow the page to mount first
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Auto-dismiss after 10 seconds
  useEffect(() => {
    if (isVisible) {
      const autoDismiss = setTimeout(() => {
        handleDismiss();
      }, 10000);
      return () => clearTimeout(autoDismiss);
    }
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("mj-welcomed", "true");
  };

  // Allow closing via Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={handleDismiss}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-[oklch(0.06_0_0)] rounded-xl border border-[oklch(1_0_0/0.15)] shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Subtle top glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />

            <div className="p-8 md:p-10">
              {/* Monospace Header */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-6 flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                SYSTEM INITIALIZED
              </motion.div>

              {/* Tagline / Intro */}
              <div className="space-y-4 mb-8">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-xl md:text-2xl font-bold leading-tight"
                >
                  Welcome to the engineering terminal of Muhammad Jalal.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="text-muted-foreground"
                >
                  Full-Stack Developer. Builder of digital realities.
                </motion.p>
              </div>

              {/* Terminal Hint Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="bg-background/50 border border-[oklch(1_0_0/0.08)] rounded-lg p-5 mb-8"
              >
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                  Pro tip: Launch the interactive CLI to explore this portfolio like a developer.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="text-muted-foreground">Press</span>
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 rounded bg-card border border-[oklch(1_0_0/0.1)] font-mono text-xs shadow-sm">Ctrl</kbd>
                    <span className="text-muted-foreground">+</span>
                    <kbd className="px-2 py-1 rounded bg-card border border-[oklch(1_0_0/0.1)] font-mono text-xs shadow-sm">K</kbd>
                  </div>
                  <span className="text-muted-foreground">or click</span>
                  <kbd className="px-2 py-1 rounded bg-card border border-[oklch(1_0_0/0.1)] font-mono text-xs shadow-sm">⌘K</kbd>
                  <span className="text-muted-foreground">in the navbar.</span>
                </div>
              </motion.div>

              {/* Action Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0, duration: 0.4 }}
                className="flex justify-end"
              >
                <button
                  onClick={handleDismiss}
                  className="group flex items-center gap-2 px-5 py-2.5 bg-foreground text-background font-medium rounded-md hover:bg-foreground/90 transition-colors"
                >
                  PROCEED
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
