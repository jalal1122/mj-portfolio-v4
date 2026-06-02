"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site-content";

const socialLinks = site.footer.socials;

const navLinks = site.footer.navigation;

export function FooterSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(site.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="pt-20 md:pt-32 pb-8 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground block mb-6">
            {site.footer.cta}
          </span>

          {/* Kinetic Typography */}
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tight leading-none">
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="block"
            >
              {site.footer.titleLineOne}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="block text-accent"
            >
              {site.footer.titleLineTwo}
              <span className="text-foreground">.</span>
            </motion.span>
          </h2>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10"
          >
            <a
              href={`mailto:${site.contact.email}`}
              className="group inline-flex items-center gap-4 px-8 py-4 bg-foreground text-background font-semibold text-lg rounded-full hover:bg-foreground/90 transition-all duration-300"
            >
              {site.footer.buttonLabel}
              <span className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center group-hover:bg-background/20 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-[oklch(1_0_0/0.08)]">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold">
              {site.initials}
              <span className="text-accent">.</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              {site.footer.brandDescription}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Navigation
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Connect
            </p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="w-10 h-10 rounded-lg bg-secondary/50 border border-[oklch(1_0_0/0.08)] flex items-center justify-center text-xs font-bold text-muted-foreground hover:text-foreground hover:border-accent/30 transition-all"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Contact
            </p>
            <button
              onClick={copyEmail}
              className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="font-mono">{site.contact.email}</span>
              <span className="px-2 py-1 text-[10px] uppercase tracking-wider bg-secondary/50 rounded border border-[oklch(1_0_0/0.08)] group-hover:bg-accent group-hover:text-background group-hover:border-accent transition-all">
                {copied ? "Copied!" : "Copy"}
              </span>
            </button>
            <p className="text-sm text-muted-foreground mt-2">
              {site.location}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-12 mt-12 border-t border-[oklch(1_0_0/0.08)]">
          <p className="text-xs text-muted-foreground">
            {site.footer.bottomLeft.replace(
              "{year}",
              String(new Date().getFullYear()),
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            {site.footer.bottomRight}
          </p>
        </div>
      </div>
    </footer>
  );
}
