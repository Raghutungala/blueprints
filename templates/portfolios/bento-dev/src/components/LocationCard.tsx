'use client'

import { useEffect, useState } from 'react'
import { MapPin, Cloud, Activity } from 'lucide-react'
import { portfolioConfig } from '@/data/portfolio-config'
import SpotlightCard from './SpotlightCard'

export default function LocationCard({ className }: { className?: string }) {
  const [time, setTime] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTime(new Date())
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  return (
    <SpotlightCard className={`p-5 flex-1 flex flex-col justify-between bg-[#101014] border border-white/10 rounded-2xl ${className || ''}`}>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
            <span className="text-xs font-semibold text-white">{portfolioConfig.location}</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">37.7749° N, 122.4194° W</span>
        </div>

        {/* Sleek Horizontal Telemetry Radar Bar (strict h-14) */}
        <div className="relative h-14 rounded-xl overflow-hidden bg-gradient-to-r from-emerald-500/5 via-cyan-500/10 to-transparent border border-white/[0.06] flex items-center px-3">
          <svg viewBox="0 0 300 40" className="w-full h-full opacity-60">
            <defs>
              <linearGradient id="loc-bar" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path d="M 0 20 Q 75 5, 150 20 T 300 20" fill="none" stroke="url(#loc-bar)" strokeWidth="1.5" />
            <circle cx="150" cy="20" r="3" fill="var(--accent)">
              <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </div>

      {/* Grouped Clock & Status Pill */}
      <div className="space-y-2 mt-auto pt-2">
        <div className="flex items-center justify-between">
          <div className="text-xl font-mono font-bold text-white tracking-wider">
            {mounted && time ? formatTime(time) : '--:--:--'}
          </div>
          <div className="text-[11px] font-mono text-zinc-400">{portfolioConfig.timezone}</div>
        </div>

        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
          <Cloud className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[10px] text-zinc-300 font-mono">68°F Clear &bull; Deep Work Mode</span>
          <Activity className="w-3 h-3 ml-auto animate-pulse" style={{ color: 'var(--accent)' }} />
        </div>
      </div>
    </SpotlightCard>
  )
}
