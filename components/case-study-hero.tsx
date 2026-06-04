'use client'

import { motion } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

interface CaseStudyHeroProps {
  title: string
  image: string
  viewLiveUrl?: string
  sourceCodeUrl?: string
}

export default function CaseStudyHero({
  title,
  image,
  viewLiveUrl = '#',
  sourceCodeUrl = '#',
}: CaseStudyHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  const y = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-background"
    >
      {/* Parallax Background Image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
        {/* Dark tint overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-between p-8 md:p-16">
        {/* Top spacing */}
        <div className="flex-1" />

        {/* Bottom section with title and action bar */}
        <div className="flex items-end justify-between gap-8">
          {/* Left: Massive Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex-1 pb-8"
          >
            <h1 className="text-7xl md:text-8xl xl:text-[10rem] font-bold uppercase tracking-tighter leading-none text-foreground">
              {title}
            </h1>
          </motion.div>


          {/* Right: Command Bar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col gap-3 pb-8"
          >
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-6 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors">
              <Link
                href={viewLiveUrl}
                target="_blank"
                className="text-xs md:text-sm font-medium text-foreground flex items-center gap-2 whitespace-nowrap"
              >
                VIEW LIVE <span className="text-lg">↗</span>
              </Link>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-6 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors">
              <Link
                href={sourceCodeUrl}
                target="_blank"
                className="text-xs md:text-sm font-medium text-foreground flex items-center gap-2 whitespace-nowrap"
              >
                SOURCE CODE <span className="text-lg">↗</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <div className="text-xs text-muted-foreground font-mono tracking-widest">
          SCROLL TO EXPLORE
        </div>
      </motion.div>
    </div>
  )
}
