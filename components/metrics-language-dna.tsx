'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Language {
  name: string
  percentage: number
  color: string
}

export function LanguageDNA() {
  const [hoveredLang, setHoveredLang] = useState<string | null>(null)

  const languages: Language[] = [
    { name: 'TypeScript', percentage: 42, color: 'from-blue-500/50 to-blue-600/50' },
    { name: 'JavaScript', percentage: 28, color: 'from-yellow-500/50 to-yellow-600/50' },
    { name: 'Python', percentage: 15, color: 'from-green-500/50 to-green-600/50' },
    { name: 'CSS', percentage: 10, color: 'from-red-500/50 to-red-600/50' },
    { name: 'Other', percentage: 5, color: 'from-white/20 to-white/30' },
  ]

  return (
    <div className="border border-white/10 p-8 mb-8 bg-black/40">
      <div className="mb-6">
        <h2 className="font-sans font-black text-2xl text-white mb-1">LANGUAGE DNA</h2>
        <p className="font-mono text-xs text-muted-foreground">Brutalist code composition analysis</p>
      </div>

      {/* Language labels with percentages */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 pb-4 border-b border-white/10">
        {languages.map((lang, idx) => (
          <div
            key={lang.name}
            className="flex items-center gap-2 cursor-pointer group"
            onMouseEnter={() => setHoveredLang(lang.name)}
            onMouseLeave={() => setHoveredLang(null)}
          >
            <span className="font-mono text-sm font-bold text-white group-hover:text-accent transition-colors">
              {lang.name}
            </span>
            <span className="font-mono text-sm text-muted-foreground group-hover:text-accent/60 transition-colors">
              {lang.percentage}%
            </span>
            {idx < languages.length - 1 && <div className="w-px h-4 bg-white/10" />}
          </div>
        ))}
      </div>

      {/* Stacked bar */}
      <div className="h-12 flex gap-0 rounded-sm overflow-hidden border border-white/10">
        {languages.map((lang) => (
          <motion.div
            key={lang.name}
            className={`bg-gradient-to-r ${lang.color} backdrop-blur-sm border-r border-white/10 relative group`}
            style={{ flex: lang.percentage }}
            onMouseEnter={() => setHoveredLang(lang.name)}
            onMouseLeave={() => setHoveredLang(null)}
            animate={{
              opacity: hoveredLang === null || hoveredLang === lang.name ? 1 : 0.4,
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-xs font-black text-white opacity-0 group-hover:opacity-100 transition-opacity">
                {lang.percentage}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom legend */}
      <div className="mt-4 font-mono text-xs text-muted-foreground">
        Last 90 days • GitHub Analytics
      </div>
    </div>
  )
}
