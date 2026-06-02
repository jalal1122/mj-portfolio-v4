'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface HeatmapSquare {
  date: string
  count: number
  weekday: string
}

export function KineticHeatmap() {
  const [hoveredSquare, setHoveredSquare] = useState<HeatmapSquare | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  // Generate 52 weeks of mock data
  const generateHeatmapData = () => {
    const data: HeatmapSquare[] = []
    const now = new Date()

    for (let i = 0; i < 364; i++) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const dayOfWeek = date.getDay()
      
      // More commits on weekdays
      const isWeekday = dayOfWeek !== 0 && dayOfWeek !== 6
      const baseCommits = isWeekday ? Math.random() * 25 : Math.random() * 10
      
      data.push({
        date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        count: Math.floor(baseCommits),
        weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
      })
    }
    return data.reverse()
  }

  const heatmapData = generateHeatmapData()
  const weeks = Array.from({ length: 53 }, (_, i) =>
    heatmapData.slice(i * 7, (i + 1) * 7)
  )

  const getHeatmapColor = (count: number) => {
    if (count === 0) return 'bg-white/5 hover:bg-white/10'
    if (count < 5) return 'bg-white/15 hover:bg-white/25'
    if (count < 10) return 'bg-white/25 hover:bg-white/35'
    if (count < 15) return 'bg-white/35 hover:bg-white/45'
    return 'bg-white/45 hover:bg-white/60'
  }

  const handleMouseMove = (e: React.MouseEvent, square: HeatmapSquare) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top - 10 })
    setHoveredSquare(square)
  }

  return (
    <div className="border border-white/10 p-8 mb-8 bg-black/40 overflow-x-auto">
      <div className="mb-4">
        <h2 className="font-sans font-black text-2xl text-white mb-1">MONOCHROMATIC PULSE GRID</h2>
        <p className="font-mono text-xs text-muted-foreground">52-week contribution heatmap</p>
      </div>

      <div className="min-w-max">
        {/* Day labels */}
        <div className="flex gap-1 mb-2">
          <div className="w-6" />
          <div className="flex gap-1">
            {['Mon', 'Wed', 'Fri', 'Sun'].map((day) => (
              <div
                key={day}
                className="w-2 h-2 text-muted-foreground text-xs font-mono flex items-center justify-center"
                style={{ width: '14px' }}
              >
                {day.charAt(0)}
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap grid */}
        <div className="flex gap-1">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {week.map((square, dayIdx) => (
                <motion.div
                  key={`${weekIdx}-${dayIdx}`}
                  onMouseMove={(e) => handleMouseMove(e, square)}
                  onMouseLeave={() => setHoveredSquare(null)}
                  className={`w-3.5 h-3.5 rounded-xs border border-white/5 cursor-pointer transition-all ${getHeatmapColor(
                    square.count
                  )}`}
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredSquare && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="fixed bg-black border border-white/20 px-3 py-2 rounded z-50 pointer-events-none"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="font-mono text-xs text-white whitespace-nowrap">
              {hoveredSquare.count} commits
            </div>
            <div className="font-mono text-xs text-muted-foreground whitespace-nowrap">
              {hoveredSquare.date}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
