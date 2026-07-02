"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/lib/site-content";

export default function ContactLeftPane() {
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const peshawarTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Karachi" }),
      );
      const hours = String(peshawarTime.getHours()).padStart(2, "0");
      const minutes = String(peshawarTime.getMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-white/10 p-8 md:p-16 flex flex-col justify-between bg-background/80 backdrop-blur-sm">
        <div />
      </div>
    );
  }

  return (
    <div className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-white/10 p-8 md:p-16 flex flex-col justify-between bg-background/80 backdrop-blur-sm">
      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-2"
      >
        <div className="text-5xl md:text-7xl font-black leading-none tracking-tighter">
          {site.contact.headline[0]}
        </div>
        <div className="text-5xl md:text-7xl font-black leading-none tracking-tighter text-white/80">
          {site.contact.headline[1]}
        </div>
        <div className="text-5xl md:text-7xl font-black leading-none tracking-tighter text-white/60">
          {site.contact.headline[2]}
        </div>
        <div className="text-5xl md:text-7xl font-black leading-none tracking-tighter text-white/40">
          {site.contact.headline[3]}
        </div>
      </motion.div>

      {/* Status Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-2 gap-4"
      >
        {/* Local Time Card */}
        <div className="border border-white/10 p-4 hover:border-white/20 transition-colors duration-300">
          <div className="font-mono text-xs text-white/50 mb-2">LOCAL TIME</div>
          <div className="text-2xl font-bold text-white font-mono">{time}</div>
          <div className="font-mono text-xs text-white/40 mt-1">
            {site.location}
          </div>
        </div>

        {/* Status Card */}
        <div className="border border-white/10 p-4 hover:border-white/20 transition-colors duration-300">
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-cyan-400"
            />
            <div className="font-mono text-xs text-white/50">STATUS</div>
          </div>
          <div className="font-mono text-sm text-white font-bold">
            ACCEPTING
          </div>
          <div className="font-mono text-xs text-white/60">NEW PROJECTS</div>
        </div>

        {/* Audio Vibe Card */}
        <div className="border border-white/10 p-4 hover:border-white/20 transition-colors duration-300">
          <div className="font-mono text-xs text-white/50 mb-3">AUDIO</div>
          <div className="flex items-end gap-1 h-6">
            {[0.4, 0.8, 0.5].map((scale, i) => (
              <motion.div
                key={i}
                animate={{ scaleY: [scale * 0.5, scale, scale * 0.5] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                className="w-1 bg-cyan-400/60 origin-bottom"
                style={{ height: `${scale * 24}px` }}
              />
            ))}
          </div>
          <div className="font-mono text-xs text-white/60 mt-2">
            {site.contact.audioLabel}
          </div>
        </div>

        {/* Email Card */}
        <motion.div
          className="border border-white/10 p-4 hover:border-white/20 transition-colors duration-300 cursor-pointer group overflow-hidden relative"
          onClick={() => {
            navigator.clipboard.writeText(site.contact.email);
          }}
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
        >
          <div className="font-mono text-xs text-white/50 mb-2 group-hover:text-cyan-400 transition-colors">
            {site.contact.emailLabel}
          </div>
          <div className="font-mono text-sm text-white font-bold break-all">
            {site.contact.email.split("@")[0]}
          </div>
          <div className="font-mono text-xs text-white/60 group-hover:text-cyan-400/60 transition-colors">
            {site.contact.emailHint}
          </div>
        </motion.div>
      </motion.div>

      {/* Footer text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="font-mono text-xs text-white/40"
      >
        {site.contact.systemReady}
      </motion.div>
    </div>
  );
}
