'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Star, Globe, Activity, Layers, Cpu, Database, Network, ShieldCheck } from 'lucide-react'
import { portfolioConfig } from '@/data/portfolio-config'

export default function ProjectsCard() {
  const [active, setActive] = useState(0)
  const project = portfolioConfig.projects[active]

  const metricsData = [
    {
      throughput: '54 Components',
      throughputSub: 'Zero Layout Shift',
      latency: '0.4 kb',
      latencySub: 'Tree-Shaken Core',
      uptime: '100%',
      uptimeSub: 'WCAG AAA Primitives',
      problemSummary: 'Fragmented frontend implementations and inconsistent UI behaviors across 15+ engineering teams.',
      solutionSummary: 'Architected a headless token-driven component system with strict accessibility primitives and zero runtime overhead.',
    },
    {
      throughput: '24.8k req/s',
      throughputSub: 'Sub-millisecond p99',
      latency: '4.2 ms',
      latencySub: 'Distributed Edge Cache',
      uptime: '99.99%',
      uptimeSub: 'Multi-Region Failover',
      problemSummary: 'Monolithic API bottlenecks causing cascading latency spikes and unpredictable downstream service failures.',
      solutionSummary: 'Engineered an event-driven Go/Rust gateway with distributed rate limiting and Redis edge routing.',
    },
    {
      throughput: '1.2M events/s',
      throughputSub: 'Real-Time Ingestion',
      latency: '8 ms',
      latencySub: 'WebSocket Stream Ping',
      uptime: '99.95%',
      uptimeSub: 'Zero Data Loss Pipeline',
      problemSummary: 'Delayed business telemetry and unindexed time-series datasets choking standard relational databases.',
      solutionSummary: 'Deployed a custom stream-processing pipeline with partitioned ClickHouse storage and live visual dashboards.',
    },
  ]

  const currentMetrics = metricsData[active]

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Top Control Bar: 3 Sleek Project Tabs + Action Links */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/[0.02] border border-white/[0.08] p-1.5 rounded-xl backdrop-blur-md">
        {/* Project Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar">
          {portfolioConfig.projects.map((p, idx) => {
            const isSelected = active === idx
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActive(idx)}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                  isSelected ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeProjectTab"
                    className="absolute inset-0 rounded-lg bg-white/10 border border-white/15"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 font-mono text-[11px]" style={{ color: isSelected ? 'var(--accent)' : 'rgb(113 113 122)' }}>
                  0{idx + 1}
                </span>
                <span className="relative z-10 font-medium">{p.name}</span>
              </button>
            )
          })}
        </div>

        {/* Action Links on Right */}
        <div className="flex items-center gap-2 px-1">
          <motion.a
            whileHover={{ y: -1, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all shadow-sm cursor-pointer"
            style={{ backgroundColor: 'var(--accent-glow)', border: '1px solid var(--accent)' }}
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </motion.a>

          <motion.a
            whileHover={{ y: -1, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 border border-white/10 hover:border-white/20 hover:text-white transition-colors bg-white/5 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Source Code</span>
          </motion.a>
        </div>
      </div>

      {/* Main Stage: 2-Column High-Craft Frame with AnimatePresence */}
      <div className="rounded-2xl border border-white/10 bg-[#0D0D11] overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, filter: 'blur(6px)', y: 6 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(6px)', y: -6 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            {/* Left 7 cols: Interactive Visual Telemetry Mockup */}
            <div className="lg:col-span-7 p-6 bg-gradient-to-br from-white/[0.03] to-transparent border-b lg:border-b-0 lg:border-r border-white/[0.07] flex flex-col justify-between min-h-[360px]">
              {/* Telemetry Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-xs font-mono text-zinc-400 ml-2">
                    {project.id}.telemetry.internal
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>ONLINE &bull; PROD</span>
                </div>
              </div>

              {/* Dynamic Telemetry Graph Area */}
              <div className="my-4 space-y-4">
                {/* Visual Architecture Nodes */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex flex-col justify-between">
                    <div className="flex items-center justify-between text-zinc-400 mb-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider">Gateway</span>
                      {active === 0 ? <Layers className="w-3.5 h-3.5 text-emerald-400" /> : active === 1 ? <Cpu className="w-3.5 h-3.5 text-violet-400" /> : <Database className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <div className="text-sm font-bold text-white font-mono">{currentMetrics.throughput}</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{currentMetrics.throughputSub}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex flex-col justify-between">
                    <div className="flex items-center justify-between text-zinc-400 mb-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider">Latency</span>
                      <Network className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div className="text-sm font-bold text-emerald-400 font-mono">{currentMetrics.latency}</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{currentMetrics.latencySub}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex flex-col justify-between">
                    <div className="flex items-center justify-between text-zinc-400 mb-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider">Health</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <div className="text-sm font-bold text-cyan-400 font-mono">{currentMetrics.uptime}</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{currentMetrics.uptimeSub}</div>
                  </div>
                </div>

                {/* Animated SVG Sparkline & Latency Stream */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] relative overflow-hidden">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-2">
                    <span>Traffic Ingestion Curve</span>
                    <span className="text-emerald-400">Stable &bull; Jitter &lt; 0.5ms</span>
                  </div>
                  <svg viewBox="0 0 400 70" className="w-full h-16 overflow-visible">
                    <defs>
                      <linearGradient id={`grad-${project.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {active === 0 ? (
                      <>
                        <path d="M0 50 Q 50 15, 100 35 T 200 20 T 300 40 T 400 15 L 400 70 L 0 70 Z" fill={`url(#grad-${project.id})`} />
                        <path d="M0 50 Q 50 15, 100 35 T 200 20 T 300 40 T 400 15" fill="none" stroke="var(--accent)" strokeWidth="2" />
                      </>
                    ) : active === 1 ? (
                      <>
                        <path d="M0 55 Q 60 10, 120 40 T 240 15 T 320 30 T 400 10 L 400 70 L 0 70 Z" fill={`url(#grad-${project.id})`} />
                        <path d="M0 55 Q 60 10, 120 40 T 240 15 T 320 30 T 400 10" fill="none" stroke="#8B5CF6" strokeWidth="2" />
                      </>
                    ) : (
                      <>
                        <path d="M0 45 Q 40 30, 90 10 T 180 35 T 280 20 T 400 25 L 400 70 L 0 70 Z" fill={`url(#grad-${project.id})`} />
                        <path d="M0 45 Q 40 30, 90 10 T 180 35 T 280 20 T 400 25" fill="none" stroke="#06B6D4" strokeWidth="2" />
                      </>
                    )}
                  </svg>
                </div>
              </div>

              {/* Bottom Telemetry Status Pill */}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[11px] font-mono text-zinc-500">
                <span>Cluster: us-west-2 (Oregon)</span>
                <span>Automated Canary Rollouts</span>
              </div>
            </div>

            {/* Right 5 cols: Project Overview & Specs */}
            <div className="lg:col-span-5 p-7 flex flex-col justify-between bg-[#0e0e13]">
              <div>
                {/* Star Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-amber-300 w-fit mb-3">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{project.stars.toLocaleString()} GitHub stars</span>
                </div>

                {/* Project Title */}
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  {project.name}
                </h3>

                {/* Problem & Solution Summary */}
                <div className="space-y-2.5 my-3.5">
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-0.5">Problem</span>
                    <p className="text-xs text-zinc-300 leading-relaxed">{currentMetrics.problemSummary}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 block mb-0.5">Architecture Solution</span>
                    <p className="text-xs text-zinc-300 leading-relaxed">{currentMetrics.solutionSummary}</p>
                  </div>
                </div>
              </div>

              {/* Bottom: Tech Stack Pills */}
              <div className="pt-4 border-t border-white/[0.08]">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-2">Technologies Used</div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs rounded-md bg-white/[0.04] border border-white/[0.08] text-zinc-300 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
