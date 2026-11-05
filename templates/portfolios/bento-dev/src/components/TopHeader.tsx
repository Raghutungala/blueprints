'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { Command, Menu, X } from 'lucide-react'
import { portfolioConfig } from '@/data/portfolio-config'
import { scrollToSection } from '@/lib/utils'

const themes = [
  { name: 'emerald', color: '#10B981' },
  { name: 'violet', color: '#8B5CF6' },
  { name: 'cyan', color: '#06B6D4' },
  { name: 'amber', color: '#F59E0B' },
]

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export default function TopHeader({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [activeSection, setActiveSection] = useState('about')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const monogram = portfolioConfig.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  // IntersectionObserver scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140
      for (const item of navItems) {
        const el = document.getElementById(item.id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const setTheme = (themeName: string) => {
    if (typeof window !== 'undefined' && (window as any).setAccentTheme) {
      (window as any).setAccentTheme(themeName)
    }
  }

  const handleNavClick = (id: string) => {
    setActiveSection(id)
    setMobileMenuOpen(false)
    scrollToSection(id)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#09090B] border-b border-white/10 h-16 flex items-center relative">
      <div className="w-full max-w-[1140px] mx-auto px-6 flex items-center justify-between">
        {/* Monogram Brand */}
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('about')
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white transition-transform group-hover:scale-105"
            style={{ backgroundColor: 'var(--accent-glow)', border: '1px solid var(--accent)' }}
          >
            {monogram}
          </div>
          <span className="text-sm font-semibold tracking-wide text-white group-hover:text-zinc-200 transition-colors">
            {portfolioConfig.name}
          </span>
        </a>

        {/* Desktop Navigation Pill Dock with Framer Motion Sliding Pill */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] rounded-full p-1 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.id)
                }}
                className={`relative px-3.5 py-1.5 text-xs font-medium transition-colors rounded-full flex items-center gap-1.5 cursor-pointer ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundColor: 'var(--accent-glow)',
                      border: '1px solid var(--accent)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {isActive && (
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                  )}
                  {item.label}
                </span>
              </a>
            )
          })}
        </nav>

        {/* Actions: Theme Switcher + Command Palette */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            {themes.map((theme) => (
              <button
                key={theme.name}
                type="button"
                onClick={() => setTheme(theme.name)}
                className="w-4 h-4 rounded-full border border-white/20 hover:border-white/50 transition-all hover:scale-110 cursor-pointer"
                style={{ backgroundColor: theme.color }}
                title={`Switch to ${theme.name} theme`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={onOpenPalette}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-colors bg-white/5 cursor-pointer"
            title="Open Command Palette (Ctrl+K)"
          >
            <Command className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-[11px] font-mono text-zinc-400 hidden sm:block">Ctrl+K</span>
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white bg-white/5 cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2px Top Scroll Progress Laser Bar right along the bottom edge */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left z-20 pointer-events-none"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, var(--accent) 0%, #38bdf8 50%, var(--accent) 100%)',
          boxShadow: '0 0 10px var(--accent)',
        }}
      />

      {/* Responsive Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-16 left-0 right-0 bg-[#09090B] border-b border-white/10 px-6 py-5 shadow-2xl z-50 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400 mr-1 font-mono">Accent:</span>
                {themes.map((theme) => (
                  <button
                    key={theme.name}
                    type="button"
                    onClick={() => setTheme(theme.name)}
                    className="w-5 h-5 rounded-full border border-white/20 hover:border-white/50 transition-all hover:scale-110 cursor-pointer"
                    style={{ backgroundColor: theme.color }}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenPalette()
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-zinc-300 font-mono"
              >
                <Command className="w-3.5 h-3.5" />
                <span>Command Palette</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
