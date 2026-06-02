'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface Metric {
  value: string
  label: string
}

interface MetricsTerminalProps {
  metrics: Metric[]
}

export default function MetricsTerminal({ metrics }: MetricsTerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <div
      ref={containerRef}
      className="w-full bg-black/50 py-32 md:py-48 border-t border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Terminal header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-widest text-muted-foreground mb-12 md:mb-20"
        >
          [SYSTEM:METRICS] — PERFORMANCE DASHBOARD
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="space-y-4"
            >
              {/* Animated number value */}
              <div className="font-mono text-4xl md:text-5xl xl:text-6xl font-bold text-accent leading-none">
                {metric.value}
              </div>

              {/* Label */}
              <div className="font-mono text-xs tracking-widest text-muted-foreground">
                {metric.label}
              </div>

              {/* Decorative bar */}
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : { width: 0 }}
                transition={{ delay: index * 0.15 + 0.3, duration: 0.8 }}
                className="h-px bg-gradient-to-r from-accent/50 to-transparent"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
