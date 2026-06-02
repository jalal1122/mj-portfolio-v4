'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

interface Section {
  number: string
  title: string
  content: string
  highlights?: string[]
}

interface CaseStudyNarrativeProps {
  sections: Section[]
}

export default function CaseStudyNarrative({ sections }: CaseStudyNarrativeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  // Update active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const { top } = containerRef.current.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -top / window.innerHeight))
      const sectionIndex = Math.min(
        sections.length - 1,
        Math.floor(progress * sections.length)
      )
      setActiveSection(sectionIndex)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections.length])

  return (
    <div ref={containerRef} className="relative w-full bg-background py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Grid layout: 30% sticky left, 70% scrolling right */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          {/* LEFT: Sticky Section Numbers */}
          <div className="md:sticky md:top-32 md:h-fit">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Section indicator */}
              <div className="space-y-4 md:space-y-8">
                {sections.map((section, index) => (
                  <div
                    key={index}
                    className="space-y-2 cursor-pointer"
                    onClick={() => {
                      const element = document.getElementById(`section-${index}`)
                      element?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    <motion.div
                      animate={{
                        opacity: activeSection === index ? 1 : 0.3,
                        scale: activeSection === index ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-6xl md:text-7xl font-bold text-muted-foreground/30 tabular-nums"
                    >
                      {section.number}
                    </motion.div>
                    <motion.h3
                      animate={{
                        color:
                          activeSection === index
                            ? 'rgb(250, 250, 250)'
                            : 'rgb(136, 136, 136)',
                      }}
                      className="text-sm md:text-base font-medium tracking-wider uppercase"
                    >
                      {section.title}
                    </motion.h3>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Scrolling Content */}
          <div className="md:col-span-2 space-y-24 md:space-y-32">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                id={`section-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: '-100px' }}
                className="space-y-6 md:space-y-8"
              >
                <p className="text-base md:text-lg leading-relaxed text-foreground/80 max-w-2xl">
                  {section.content}
                </p>

                {section.highlights && section.highlights.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {section.highlights.map((highlight, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="p-4 md:p-6 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                      >
                        <div className="font-mono text-xs tracking-widest text-accent mb-2">
                          FEATURE
                        </div>
                        <div className="text-sm md:text-base font-medium text-foreground">
                          {highlight}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
