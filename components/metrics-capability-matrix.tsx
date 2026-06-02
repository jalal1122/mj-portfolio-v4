'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Capability {
  system: string
  name: string
  proficiency: number
  status: 'active' | 'training' | 'research'
}

export function CapabilityMatrix() {
  const [hoveredCapability, setHoveredCapability] = useState<string | null>(null)

  const capabilities: Capability[] = [
    { system: 'SYS.FRONTEND', name: 'Frontend Engineering', proficiency: 95, status: 'active' },
    { system: 'SYS.BACKEND', name: 'Backend Architecture', proficiency: 88, status: 'active' },
    { system: 'SYS.FULLSTACK', name: 'Full-Stack Integration', proficiency: 92, status: 'active' },
    { system: 'SYS.MOBILE', name: 'Mobile Development', proficiency: 65, status: 'training' },
    { system: 'SYS.DEVOPS', name: 'DevOps & Infrastructure', proficiency: 70, status: 'training' },
    { system: 'SYS.AI_INTEGRATION', name: 'AI/ML Integration', proficiency: 60, status: 'research' },
    { system: 'SYS.DESIGN_SYSTEMS', name: 'Design Systems', proficiency: 85, status: 'active' },
    { system: 'SYS.PERFORMANCE', name: 'Performance Optimization', proficiency: 90, status: 'active' },
  ]

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'active':
        return '● '
      case 'training':
        return '◐ '
      case 'research':
        return '○ '
      default:
        return '○ '
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-accent'
      case 'training':
        return 'text-yellow-500'
      case 'research':
        return 'text-blue-400'
      default:
        return 'text-muted-foreground'
    }
  }

  const renderProgressBar = (proficiency: number) => {
    const filled = Math.ceil(proficiency / 10)
    const empty = 10 - filled
    return `[${'█'.repeat(filled)}${'░'.repeat(empty)}]`
  }

  return (
    <div className="border border-white/10 p-8 bg-black/40">
      <div className="mb-6">
        <h2 className="font-sans font-black text-2xl text-white mb-1">CAPABILITY MATRIX</h2>
        <p className="font-mono text-xs text-muted-foreground">Terminal status registry</p>
      </div>

      <div className="space-y-3">
        {capabilities.map((capability) => (
          <motion.div
            key={capability.system}
            className="border border-white/10 p-4 bg-black/20 rounded-sm cursor-pointer"
            onMouseEnter={() => setHoveredCapability(capability.system)}
            onMouseLeave={() => setHoveredCapability(null)}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
          >
            <div className="flex flex-col gap-2">
              {/* Header with status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-xs font-black tracking-widest ${getStatusColor(capability.status)}`}>
                    {getStatusDot(capability.status)}
                  </span>
                  <span className="font-mono text-xs font-bold text-white">
                    {capability.system}
                  </span>
                  <span className="font-sans text-xs text-muted-foreground">
                    {capability.name}
                  </span>
                </div>
                <motion.span
                  className="font-mono text-xs font-black text-accent"
                  animate={{
                    opacity: hoveredCapability === capability.system ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {capability.proficiency}%
                </motion.span>
              </div>

              {/* Progress bar */}
              <motion.div
                className="font-mono text-xs text-accent/60 tracking-widest"
                animate={{
                  color: hoveredCapability === capability.system ? '#4ade80' : 'rgba(255, 255, 255, 0.4)',
                }}
                transition={{ duration: 0.2 }}
              >
                {renderProgressBar(capability.proficiency)}
              </motion.div>

              {/* Status text */}
              <div className="flex gap-2 text-xs font-mono">
                <span className={`${getStatusColor(capability.status)}`}>
                  [{capability.status.toUpperCase()}]
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-white/10 font-mono text-xs text-muted-foreground space-y-1">
        <div>● Active • ◐ Training • ○ Research</div>
        <div>Last Updated: {new Date().toLocaleDateString()}</div>
      </div>
    </div>
  )
}
