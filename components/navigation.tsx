"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site-content";
import { ChevronLeft } from "lucide-react";

const navLinks = site.navigation;

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isCaseStudyPage = pathname?.startsWith("/work/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isCaseStudyPage) {
    return (
      <motion.nav
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-6 z-50"
      >
        <Link
          href="/"
          className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 hover:scale-105 ${
            isScrolled
              ? "bg-[oklch(0.08_0_0/0.9)] backdrop-blur-xl border-[oklch(1_0_0/0.1)] text-foreground"
              : "bg-[oklch(0.1_0_0/0.6)] backdrop-blur-md border-[oklch(1_0_0/0.08)] text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Back to home"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      </motion.nav>
    );
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled ? "top-4" : "top-6"
      }`}
    >
      <div
        className={`flex items-center gap-1 px-2 py-2 rounded-full border transition-all duration-300 ${
          isScrolled
            ? "bg-[oklch(0.08_0_0/0.9)] backdrop-blur-xl border-[oklch(1_0_0/0.1)]"
            : "bg-[oklch(0.1_0_0/0.6)] backdrop-blur-md border-[oklch(1_0_0/0.08)]"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="px-4 py-2 text-sm font-bold text-foreground tracking-tight"
        >
          MJ<span className="text-accent">.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Command Menu Trigger */}
        <button
          className="hidden md:flex items-center gap-2 px-3 py-1.5 ml-2 text-xs text-muted-foreground bg-secondary/50 rounded-md border border-[oklch(1_0_0/0.08)] hover:bg-secondary hover:text-foreground transition-all duration-200"
          onClick={() => window.dispatchEvent(new CustomEvent("open-terminal"))}
          aria-label="Open command menu"
        >
          <span className="font-mono">⌘K</span>
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden px-3 py-2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {isMobileMenuOpen ? (
              <path d="M5 5L15 15M15 5L5 15" />
            ) : (
              <>
                <path d="M3 6H17" />
                <path d="M3 10H17" />
                <path d="M3 14H17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 mt-2 p-4 bg-[oklch(0.08_0_0/0.95)] backdrop-blur-xl rounded-2xl border border-[oklch(1_0_0/0.1)]"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
