"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTerminal } from "@/hooks/use-terminal";
import { site } from "@/lib/site-content";

export function CommandTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { input, setInput, output, onKeyDown, handleCommand, bottomRef } = useTerminal({
    onClose: () => setIsOpen(false),
    initialOutput: [
      "  __  __   _   _____               _             _ ",
      " |  \\/  | | | |_   _|___ _ _ _ __ (_)_ _  __ _| |",
      " | |\\/| | | |   | | / -_) '_| '  \\| | ' \\/ _` | |",
      " |_|  |_|_| |   |_| \\___|_| |_|_|_|_|_||_\\__,_|_|",
      "        |__/                                     ",
      "",
      "Welcome to MJ Terminal v1.0.0",
      "Type 'help' to see available commands.",
      "Press Esc or type 'exit' to close.",
      "$"
    ]
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleOpenEvent = () => setIsOpen(true);
    
    const handleCommandEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsOpen(true);
      // Execute the command passed from bento-grid
      setTimeout(() => {
        handleCommand(customEvent.detail);
      }, 100);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-terminal", handleOpenEvent);
    window.addEventListener("open-terminal-with-cmd", handleCommandEvent);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-terminal", handleOpenEvent);
      window.removeEventListener("open-terminal-with-cmd", handleCommandEvent);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Focus after a short delay to allow animation to start
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleModalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-background/60 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl h-[80vh] bg-[oklch(0.04_0_0)] rounded-xl border border-[oklch(1_0_0/0.15)] shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/5"
            onClick={handleModalClick}
          >
            {/* Window Chrome */}
            <div className="h-12 bg-card border-b border-[oklch(1_0_0/0.1)] flex items-center px-4 justify-between select-none">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] cursor-pointer hover:bg-[#ff5f57]/80" 
                  onClick={() => setIsOpen(false)}
                />
                <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                <span className="font-mono text-[11px] text-muted-foreground font-medium tracking-wide">
                  mj@portfolio:~
                </span>
              </div>
              <div className="w-16" /> {/* Spacer for centering */}
            </div>

            {/* Terminal Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 font-mono text-xs sm:text-sm md:text-base leading-relaxed">
              {output.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.startsWith("$") 
                      ? "text-accent mt-1" 
                      : "text-muted-foreground whitespace-pre-wrap ml-0 sm:ml-4"
                  }
                >
                  {line === "$" ? (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-accent shrink-0">$</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={onKeyDown}
                        className="flex-1 bg-transparent text-foreground outline-none border-none ring-0 p-0 m-0 w-full"
                        spellCheck={false}
                        autoComplete="off"
                        autoCapitalize="off"
                      />
                    </div>
                  ) : (
                    line
                  )}
                </div>
              ))}
              <div ref={bottomRef} className="h-4" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
