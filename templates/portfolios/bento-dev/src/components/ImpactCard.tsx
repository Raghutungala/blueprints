'use client'

import { useMemo } from 'react'
import SpotlightCard from './SpotlightCard'

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

const stats = [
  { number: '7+', label: 'Yrs Exp' },
  { number: '99.9%', label: 'Uptime' },
  { number: '40+', label: 'Systems' },
]

export default function ImpactCard() {
  const contributions = useMemo(() => {
    // 64 contributions for a clean 16x4 grid
    return Array.from({ length: 64 }).map((_, i) => {
      const intensity = seededRandom(i * 12345) > 0.7 ? 1 : seededRandom(i * 54321) > 0.4 ? 0.5 : 0.2
      return { intensity, count: Math.floor(seededRandom(i * 98765) * 15) + 1 }
    })
  }, [])

  // 4 rows of 16 squares = 64 contributions
  const rows = useMemo(() => {
    const r = []
    for (let i = 0; i < 4; i++) {
      r.push(contributions.slice(i * 16, (i + 1) * 16))
    }
    return r
  }, [contributions])

  return (
    <SpotlightCard className="p-5 h-auto bg-[#101014] border border-white/10 rounded-2xl">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <h3 className="text-sm font-semibold text-white">GitHub Open-Source Activity</h3>
        </div>
        <span className="px-2 py-0.5 text-[10px] font-mono font-medium rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          1,420+ Contribs
        </span>
      </div>

      {/* Heatmap Container: 4 rows x 16 cols with strict gap-1.5 */}
      <div className="mt-3 p-2.5 rounded-xl bg-black/40 border border-white/[0.06] flex flex-col gap-1.5">
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="grid grid-cols-16 gap-1.5"
            style={{ gridTemplateColumns: 'repeat(16, minmax(0, 1fr))' }}
          >
            {row.map((item, colIdx) => (
              <div
                key={colIdx}
                className="aspect-square rounded-[2px] cursor-pointer hover:ring-1 hover:ring-white/50 transition-all"
                title={`${item.count} contributions`}
                style={{
                  backgroundColor: `rgba(16, 185, 129, ${item.intensity * 0.85})`,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Bottom KPI Row: 3 compact stat pills */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center"
          >
            <div className="text-sm font-bold text-emerald-400 font-mono leading-tight">
              {stat.number}
            </div>
            <div className="text-[10px] text-zinc-400 whitespace-nowrap mt-0.5">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </SpotlightCard>
  )
}
