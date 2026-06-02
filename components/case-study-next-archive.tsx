'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface NextArchiveProps {
  nextProjectSlug: string
  nextProjectName: string
}

export default function NextArchive({
  nextProjectSlug,
  nextProjectName,
}: NextArchiveProps) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <Link href={`/work/${nextProjectSlug}`}>
      <motion.div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="relative w-full min-h-screen bg-background flex items-center justify-center overflow-hidden cursor-pointer group border-t border-white/10"
      >
        {/* Background shift on hover */}
        <motion.div
          animate={{
            backgroundColor: isHovering
              ? 'rgba(255, 255, 255, 0.02)'
              : 'rgba(0, 0, 0, 0)',
          }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        />

        {/* Gradient glow on hover */}
        <motion.div
          animate={{
            opacity: isHovering ? 0.3 : 0,
            scale: isHovering ? 1 : 0.8,
          }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent pointer-events-none"
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6 md:px-16 max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            animate={{
              opacity: isHovering ? 1 : 0.6,
            }}
            className="font-mono text-xs tracking-widest text-muted-foreground mb-6 md:mb-8 uppercase"
          >
            Next Archive
          </motion.div>

          {/* Main heading */}
          <motion.h2
            animate={{
              scale: isHovering ? 1.05 : 1,
            }}
            transition={{ duration: 0.4 }}
            className="text-5xl md:text-7xl xl:text-8xl font-bold uppercase tracking-tighter text-foreground mb-8 leading-none"
          >
            {nextProjectName}
          </motion.h2>

          {/* CTA indicator */}
          <motion.div
            animate={{
              opacity: isHovering ? 1 : 0.4,
              y: isHovering ? 0 : 8,
            }}
            transition={{ duration: 0.4 }}
            className="font-mono text-xs tracking-widest text-accent flex items-center justify-center gap-2"
          >
            <span>EXPLORE CASE STUDY</span>
            <span className="text-base">↗</span>
          </motion.div>
        </div>

        {/* Subtle border animation */}
        <motion.div
          animate={{
            opacity: isHovering ? 0.3 : 0,
          }}
          className="absolute inset-0 border border-white/10 pointer-events-none"
        />
      </motion.div>
    </Link>
  )
}
