'use client'

import { motion } from 'framer-motion'
import { Layout, Server, Cloud, Cpu, Sparkles, Terminal } from 'lucide-react'
import SpotlightCard from './SpotlightCard'

const stackDomains = [
  {
    num: '01',
    title: 'Frontend & UI Craft',
    icon: Layout,
    accentColor: '#10B981',
    focus: 'Ultra-responsive reactive architectures, accessible headless primitives, and zero-layout-shift design systems.',
    techs: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind', 'Framer Motion'],
  },
  {
    num: '02',
    title: 'Distributed Backend',
    icon: Server,
    accentColor: '#8B5CF6',
    focus: 'High-throughput event pipelines, CQRS patterns, distributed locking, and sub-millisecond cache topologies.',
    techs: ['Node.js', 'Go', 'GraphQL', 'gRPC', 'PostgreSQL', 'Redis'],
  },
  {
    num: '03',
    title: 'Cloud & Infra',
    icon: Cloud,
    accentColor: '#06B6D4',
    focus: 'Zero-trust Kubernetes clusters, multi-region edge orchestration, and automated declarative IaC pipelines.',
    techs: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Edge'],
  },
  {
    num: '04',
    title: 'AI & Agentic Systems',
    icon: Cpu,
    accentColor: '#F59E0B',
    focus: 'Production RAG architectures, low-latency streaming inference, autonomous agent workflows, and vector stores.',
    techs: ['LLM Orchestration', 'RAG', 'Vector DBs', 'WebGPU', 'Rust'],
  },
]

const architecturePillars = [
  'System Architecture',
  'High-Concurrency APIs',
  'Design Systems',
  'Performance Engineering',
  'Security & Compliance',
]

const exploringTechs = ['Rust', 'WebGPU', 'Multi-Agent Systems']

export default function TechStackCard() {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* 4-Column Domain Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {stackDomains.map((domain) => {
          const Icon = domain.icon
          return (
            <SpotlightCard
              key={domain.num}
              className="p-5 flex flex-col justify-between h-full bg-[#101014] border border-white/10 hover:border-white/20 transition-all rounded-2xl"
            >
              <div>
                {/* Header with Number & Domain Icon */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-zinc-500 font-semibold">
                    {domain.num} //
                  </span>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10"
                    style={{ backgroundColor: `${domain.accentColor}15` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: domain.accentColor }} />
                  </div>
                </div>

                {/* Domain Title */}
                <h3 className="text-base font-bold text-white mb-2 tracking-tight">
                  {domain.title}
                </h3>

                {/* Focus Description */}
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  {domain.focus}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5 mt-auto">
                {domain.techs.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ y: -1, scale: 1.02 }}
                    className="px-2 py-0.5 text-[11px] font-mono rounded-md bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-white hover:border-white/20 transition-colors cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </SpotlightCard>
          )
        })}
      </div>

      {/* Full-Width Horizontal Telemetry Strip */}
      <div className="p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] flex flex-col lg:flex-row lg:items-center justify-between gap-4 backdrop-blur-md">
        {/* Left: 5 Core Architecture Pillars */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mr-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>Pillars:</span>
          </span>
          {architecturePillars.map((pillar) => (
            <span
              key={pillar}
              className="px-2.5 py-1 text-xs rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-300 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
              <span>{pillar}</span>
            </span>
          ))}
        </div>

        {/* Right: Currently Exploring */}
        <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/[0.06]">
          <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-500">Exploring:</span>
          </span>
          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
            {exploringTechs.join(' • ')}
          </div>
        </div>
      </div>
    </div>
  )
}
