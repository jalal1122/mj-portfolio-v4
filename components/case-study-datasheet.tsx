import React from 'react'

interface DataSheetProps {
  client: string
  role: string
  timeframe: string
  stack: string[]
}

export default function CaseStudyDataSheet({
  client,
  role,
  timeframe,
  stack,
}: DataSheetProps) {
  return (
    <div className="w-full bg-background py-16 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-px border border-white/10">
        {/* CLIENT */}
        <div className="border-r border-b border-white/10 p-6 md:p-8">
          <div className="font-mono text-xs tracking-widest text-muted-foreground mb-4">
            CLIENT //
          </div>
          <div className="text-lg md:text-xl font-medium text-foreground">
            {client}
          </div>
        </div>

        {/* ROLE */}
        <div className="border-r border-b border-white/10 p-6 md:p-8">
          <div className="font-mono text-xs tracking-widest text-muted-foreground mb-4">
            ROLE //
          </div>
          <div className="text-lg md:text-xl font-medium text-foreground">
            {role}
          </div>
        </div>

        {/* TIMEFRAME */}
        <div className="border-r border-b border-white/10 p-6 md:p-8">
          <div className="font-mono text-xs tracking-widest text-muted-foreground mb-4">
            TIMEFRAME //
          </div>
          <div className="text-lg md:text-xl font-medium text-foreground">
            {timeframe}
          </div>
        </div>

        {/* CORE STACK */}
        <div className="border-b border-white/10 p-6 md:p-8">
          <div className="font-mono text-xs tracking-widest text-muted-foreground mb-4">
            CORE STACK //
          </div>
          <div className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-foreground hover:bg-white/10 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
