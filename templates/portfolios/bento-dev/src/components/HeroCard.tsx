'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Download, ArrowDown } from 'lucide-react'
import { portfolioConfig } from '@/data/portfolio-config'
import { scrollToSection } from '@/lib/utils'
import TerminalCard from './TerminalCard'

export default function HeroSection() {
  const [copied, setCopied] = useState(false)
  const [time, setTime] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTime(new Date())
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const copyEmail = async () => {
    await navigator.clipboard.writeText(portfolioConfig.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  return (
    <section
      id="about"
      className="min-h-[calc(100dvh-4rem)] lg:h-[calc(100dvh-4rem)] flex flex-col justify-between py-6 lg:py-8 scroll-mt-16 relative overflow-hidden"
    >
      {/* Dynamic atmospheric radial background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="w-full max-w-[1140px] mx-auto px-6 relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Intro & Call-to-Actions */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: 'var(--accent)' }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: 'var(--accent)' }}
                />
              </div>
              <span className="text-xs font-mono text-zinc-400 tracking-wide uppercase">
                {portfolioConfig.status}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[1.08] text-white"
            >
              {portfolioConfig.name}
              <br />
              <span style={{ color: 'var(--accent)' }}>{portfolioConfig.title}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="text-base lg:text-lg text-zinc-400 max-w-2xl mb-6 leading-relaxed"
            >
              {portfolioConfig.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-3"
            >
              <motion.button
                type="button"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={copyEmail}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 hover:border-white/20 transition-colors bg-white/5 cursor-pointer font-medium text-xs sm:text-sm text-white"
              >
                {copied ? (
                  <Check className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                ) : (
                  <Copy className="w-4 h-4 text-zinc-400" />
                )}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Email'}</span>
              </motion.button>

              <motion.a
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                href={portfolioConfig.resumeUrl}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 hover:border-white/20 transition-colors bg-white/5 cursor-pointer font-medium text-xs sm:text-sm text-zinc-300 hover:text-white"
              >
                <Download className="w-4 h-4 text-zinc-400" />
                <span>Download Resume</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column: Fixed-Height Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <TerminalCard />
          </motion.div>
        </div>
      </div>

      {/* Slim 1-Line Status & Bottom Navigation Bar */}
      <div className="w-full max-w-[1140px] mx-auto px-6 mt-4 shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-4 py-3.5 border-t border-white/[0.08]">
          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400 font-mono">
            <span className="text-zinc-300">7+ Yrs Exp</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300">99.9% Uptime</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300">40+ Systems</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">
              {portfolioConfig.location} • {mounted && time ? formatTime(time) : '--:--:--'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => scrollToSection('projects')}
            className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors animate-bounce cursor-pointer"
          >
            <span>Scroll to Explore</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  )
}
