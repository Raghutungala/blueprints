'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import SpotlightCard from './SpotlightCard'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO, TechFlow Inc.',
    initials: 'SC',
    gradient: 'from-cyan-400 to-purple-500',
    quote:
      'Alex is an exceptional engineer who consistently delivers high-quality solutions. His architectural insights and engineering discipline have been invaluable to our organization.',
  },
  {
    name: 'Marcus Vance',
    role: 'VP of Engineering, DataScale',
    initials: 'MV',
    gradient: 'from-emerald-400 to-blue-500',
    quote:
      "Alex's distributed systems architecture scaled seamlessly from day one. One of the sharpest systems architects and technical leaders I've ever collaborated with.",
  },
  {
    name: 'Elena Rostova',
    role: 'Principal Architect, CloudForge',
    initials: 'ER',
    gradient: 'from-violet-400 to-fuchsia-500',
    quote:
      'Incredible attention to UI precision, latency budgeting, and developer tooling. Sets the gold standard for senior full-stack craft and design engineering.',
  },
]

export default function EndorsementsCard() {
  const [index, setIndex] = useState(0)
  const current = testimonials[index]

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIndex((i) => (i + 1) % testimonials.length)

  return (
    <SpotlightCard className="p-5 h-full flex flex-col justify-between bg-[#101014] border border-white/10 rounded-2xl">
      {/* Top Bar with Carousel Controls */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
          <Quote className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
          <span>Executive Endorsements</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-zinc-500 mr-1">
            0{index + 1} / 0{testimonials.length}
          </span>
          <button
            type="button"
            onClick={prev}
            className="p-1 rounded-md border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Previous endorsement"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="p-1 rounded-md border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Next endorsement"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Testimonial Quote with Animation */}
      <div className="my-auto py-2">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="text-xs text-zinc-300 italic leading-relaxed"
          >
            &ldquo;{current.quote}&rdquo;
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Author Details */}
      <div className="flex items-center gap-2.5 pt-3 border-t border-white/[0.06] mt-auto">
        <div
          className={`w-7 h-7 rounded-full bg-gradient-to-br ${current.gradient} flex items-center justify-center text-[10px] font-bold text-white shadow-sm shrink-0`}
        >
          {current.initials}
        </div>
        <div>
          <div className="text-xs font-semibold text-white leading-tight">{current.name}</div>
          <div className="text-[10px] text-zinc-400 font-mono">{current.role}</div>
        </div>
      </div>
    </SpotlightCard>
  )
}

