'use client'

import { motion } from 'framer-motion'
import { Shield, Sparkles } from 'lucide-react'
import { useAuth } from '@/lib/AuthContext'
import { THEME_CONFIG, ThemeAccent } from '@/lib/theme'

export default function Header() {
  const { theme, setTheme, mode, setMode, themeConfig } = useAuth()

  const accents: ThemeAccent[] = ['cyan', 'emerald', 'violet', 'amber']

  return (
    <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-3 flex flex-wrap items-center justify-between gap-4 relative z-30">
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center border shadow-md transition-all duration-500"
          style={{
            backgroundColor: themeConfig.badgeBg,
            borderColor: `${themeConfig.hex}40`,
            boxShadow: `0 0 16px ${themeConfig.glow}`,
          }}
        >
          <Shield className="w-4 h-4 transition-colors duration-500" style={{ color: themeConfig.hex }} />
        </div>
        <div className="flex items-center gap-2.5">
          <span className="font-bold text-white text-base sm:text-lg tracking-tight">Sentinel-Auth</span>
          <span className="hidden sm:inline-flex text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-zinc-400">
            v2.4 Zero-Trust Suite
          </span>
        </div>
      </div>

      {/* Segmented Glass Mode Switcher */}
      <div className="order-3 sm:order-2 flex items-center p-1 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 relative shadow-inner">
        <button
          type="button"
          onClick={() => setMode('enterprise')}
          className="relative px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer z-10"
          style={{ color: mode === 'enterprise' ? '#FFFFFF' : 'rgb(161 161 170)' }}
        >
          {mode === 'enterprise' && (
            <motion.div
              layoutId="activeAuthMode"
              className="absolute inset-0 rounded-xl border shadow-sm"
              style={{
                backgroundColor: themeConfig.badgeBg,
                borderColor: `${themeConfig.hex}40`,
                boxShadow: `0 0 14px ${themeConfig.glow}`,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
          <Shield
            className="w-3.5 h-3.5 relative z-10 transition-colors"
            style={{ color: mode === 'enterprise' ? themeConfig.hex : undefined }}
          />
          <span className="relative z-10">Enterprise Glass</span>
        </button>

        <button
          type="button"
          onClick={() => setMode('playful')}
          className="relative px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer z-10"
          style={{ color: mode === 'playful' ? '#FFFFFF' : 'rgb(161 161 170)' }}
        >
          {mode === 'playful' && (
            <motion.div
              layoutId="activeAuthMode"
              className="absolute inset-0 rounded-xl border shadow-sm"
              style={{
                backgroundColor: 'rgba(245, 158, 11, 0.18)',
                borderColor: 'rgba(245, 158, 11, 0.4)',
                boxShadow: '0 0 14px rgba(245, 158, 11, 0.3)',
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
          <Sparkles
            className="w-3.5 h-3.5 relative z-10 transition-colors"
            style={{ color: mode === 'playful' ? '#F59E0B' : undefined }}
          />
          <span className="relative z-10">Playful Evasion</span>
        </button>
      </div>

      {/* Theme Accent Switcher Capsule */}
      <div className="order-2 sm:order-3 flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10">
        <span className="text-[11px] text-zinc-400 font-mono hidden md:inline">Theme:</span>
        <div className="flex items-center gap-2">
          {accents.map((accent) => {
            const cfg = THEME_CONFIG[accent]
            const isActive = theme === accent
            return (
              <button
                key={accent}
                type="button"
                onClick={() => setTheme(accent)}
                className="relative w-5 h-5 rounded-full transition-transform cursor-pointer group flex items-center justify-center"
                title={`${cfg.label} Theme`}
                aria-label={`Select ${cfg.label} theme`}
              >
                <span
                  className="block w-4 h-4 rounded-full transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: cfg.hex,
                    boxShadow: isActive ? `0 0 10px ${cfg.hex}` : undefined,
                  }}
                />
                {isActive && (
                  <motion.span
                    layoutId="activeThemeRing"
                    className="absolute -inset-0.5 rounded-full border-2 pointer-events-none"
                    style={{ borderColor: cfg.hex }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </header>
  )
}

