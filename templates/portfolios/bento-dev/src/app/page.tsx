'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import HeroSection from '@/components/HeroCard'
import ProjectsCard from '@/components/ProjectsCard'
import TechStackCard from '@/components/TechStackCard'
import ImpactCard from '@/components/ImpactCard'
import EndorsementsCard from '@/components/EndorsementsCard'
import LocationCard from '@/components/LocationCard'
import SocialCard from '@/components/SocialCard'
import CommandPalette from '@/components/CommandPalette'
import TopHeader from '@/components/TopHeader'
import { ArrowUp, Check, Send, Sparkles } from 'lucide-react'
import { scrollToSection } from '@/lib/utils'

export default function Home() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [messageSent, setMessageSent] = useState(false)
  const [selectedScope, setSelectedScope] = useState('Full Project')
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [hoveredRole, setHoveredRole] = useState<number | null>(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setPaletteOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    setMessageSent(true)
    setTimeout(() => setMessageSent(false), 3000)
    setContactForm({ name: '', email: '', message: '' })
  }

  return (
    <>
      {/* Subtle Fixed Linear/Raycast Grid Background */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] z-0" />

      <TopHeader onOpenPalette={() => setPaletteOpen(true)} />

      <main className="w-full relative z-10">
        {/* Section 0 // Hero */}
        <HeroSection />

        {/* Section 1 // Projects */}
        <section
          id="projects"
          className="min-h-[calc(100dvh-4rem)] lg:h-[calc(100dvh-4rem)] flex flex-col justify-center py-6 lg:py-8 scroll-mt-16 border-t border-white/[0.06] relative overflow-hidden"
        >
          <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.97, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, amount: 0.25 }}
            className="w-full max-w-[1140px] mx-auto px-6 flex flex-col justify-center h-full"
          >
            {/* Architectural Section Header with Divider */}
            <div className="flex items-center justify-between mb-5 shrink-0">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 text-[11px] font-mono rounded-full bg-white/5 border border-white/10 text-zinc-300">
                    01 // SELECTED WORKS
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Featured Engineering Works
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Production-grade component systems, high-concurrency API gateways, and real-time streaming architectures.
                </p>
              </div>
              <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-white/15 to-transparent ml-8 self-end mb-2" />
            </div>

            <ProjectsCard />
          </motion.div>
        </section>

        {/* Section 2 // Technical Ecosystem */}
        <section
          id="stack"
          className="min-h-[calc(100dvh-4rem)] lg:h-[calc(100dvh-4rem)] flex flex-col justify-center py-6 lg:py-8 scroll-mt-16 border-t border-white/[0.06] relative overflow-hidden"
        >
          <div className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.97, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, amount: 0.25 }}
            className="w-full max-w-[1140px] mx-auto px-6 flex flex-col justify-center h-full"
          >
            {/* Architectural Section Header with Divider */}
            <div className="flex items-center justify-between mb-5 shrink-0">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 text-[11px] font-mono rounded-full bg-white/5 border border-white/10 text-zinc-300">
                    02 // TECHNICAL ECOSYSTEM
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Full-Stack & Systems Mastery
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  End-to-end expertise across modern web primitives, high-throughput distributed backends, and cloud infrastructure.
                </p>
              </div>
              <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-white/15 to-transparent ml-8 self-end mb-2" />
            </div>

            <TechStackCard />
          </motion.div>
        </section>

        {/* Section 3 // Career Trajectory */}
        <section
          id="experience"
          className="min-h-[calc(100dvh-4rem)] lg:h-[calc(100dvh-4rem)] flex flex-col justify-center py-6 lg:py-8 scroll-mt-16 border-t border-white/[0.06] relative overflow-hidden"
        >
          <div className="absolute top-1/4 -right-16 w-72 h-72 rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.97, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, amount: 0.25 }}
            className="w-full max-w-[1140px] mx-auto px-6 flex flex-col justify-center h-full"
          >
            {/* Architectural Section Header with Divider */}
            <div className="flex items-center justify-between mb-5 shrink-0">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 text-[11px] font-mono rounded-full bg-white/5 border border-white/10 text-zinc-300">
                    03 // CAREER TRAJECTORY
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Experience & Open-Source Impact
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Proven history of leading engineering teams, reducing latency, and delivering bulletproof distributed platforms.
                </p>
              </div>
              <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-white/15 to-transparent ml-8 self-end mb-2" />
            </div>

            {/* Symmetrical Height-Matched Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left 7 cols: Interactive Career Timeline */}
              <div className="lg:col-span-7">
                <div className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#101014] shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-white">Career Trajectory & Leadership</h3>
                    <span className="text-[11px] font-mono text-zinc-500">2018 — Present</span>
                  </div>

                  <div className="space-y-3.5 my-auto">
                    {[
                      {
                        role: 'Principal Systems Architect',
                        company: 'TechFlow Inc.',
                        period: '2022 - Present',
                        type: 'Full-Time',
                        achievements: [
                          'Led migration to microservices architecture, reducing p99 latency by 65%.',
                          'Authored company-wide design system used across 15+ production products and mentored 12+ engineers.',
                        ],
                      },
                      {
                        role: 'Senior Full-Stack Engineer',
                        company: 'DataScale',
                        period: '2020 - 2022',
                        type: 'High Growth',
                        achievements: [
                          'Architected real-time analytics streaming engine serving 1M+ active enterprise users.',
                          'Implemented GraphQL federation across 20+ microservices maintaining strict 99.99% uptime SLA.',
                        ],
                      },
                      {
                        role: 'Founding Frontend Engineer',
                        company: 'StartupLab',
                        period: '2018 - 2020',
                        type: 'Series A',
                        achievements: [
                          'Built flagship MVP platform from inception to $2M ARR with zero architectural regressions.',
                          'Established CI/CD testing pipelines, engineering RFC culture, and scaled team from 1 to 15.',
                        ],
                      },
                    ].map((job, idx) => {
                      const isHovered = hoveredRole === idx
                      return (
                        <div
                          key={idx}
                          onMouseEnter={() => setHoveredRole(idx)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                            isHovered
                              ? 'bg-white/[0.04] border-white/20 shadow-md'
                              : 'bg-white/[0.015] border-white/[0.06] hover:bg-white/[0.03]'
                          }`}
                        >
                          {/* Accent left highlight indicator */}
                          <div
                            className="absolute left-0 top-0 bottom-0 w-1 transition-all"
                            style={{
                              backgroundColor: isHovered ? 'var(--accent)' : 'transparent',
                            }}
                          />

                          <div className="flex items-center justify-between mb-1 pl-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-white">{job.role}</h4>
                              <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-white/5 border border-white/10 text-zinc-400">
                                {job.type}
                              </span>
                            </div>
                            <span className="text-[11px] font-mono text-zinc-400">{job.period}</span>
                          </div>

                          <div className="text-xs text-zinc-300 font-mono pl-1 mb-2">
                            {job.company}
                          </div>

                          <ul className="space-y-1 pl-1">
                            {job.achievements.map((item, i) => (
                              <li key={i} className="text-xs text-zinc-400 flex items-start gap-1.5 leading-relaxed">
                                <span className="text-zinc-600 select-none font-bold">&rsaquo;</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Right 5 cols: Impact Card + Executive Endorsements Carousel */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-6 h-full">
                <ImpactCard />
                <EndorsementsCard />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section 4 // Initiate Connection */}
        <section
          id="contact"
          className="min-h-[calc(100dvh-4rem)] lg:h-[calc(100dvh-4rem)] flex flex-col justify-center py-6 lg:py-8 scroll-mt-16 border-t border-white/[0.06] relative overflow-hidden"
        >
          <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.97, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, amount: 0.25 }}
            className="w-full max-w-[1140px] mx-auto px-6 flex flex-col justify-center h-full"
          >
            {/* Architectural Section Header with Divider */}
            <div className="flex items-center justify-between mb-5 shrink-0">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 text-[11px] font-mono rounded-full bg-white/5 border border-white/10 text-zinc-300">
                    04 // INITIATE CONNECTION
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Let&apos;s Architect Something Extraordinary
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Available for select systems engineering leadership, architecture design review, and consulting engagements.
                </p>
              </div>
              <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-white/15 to-transparent ml-8 self-end mb-2" />
            </div>

            {/* Symmetrical Height-Matched Grid: Left 7 Form, Right 5 Quick Connect + Location */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Column (7 cols): Send Direct Message form card */}
              <div className="lg:col-span-7">
                <div className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#101014] shadow-xl">
                  <div className="flex items-center justify-between mb-3.5">
                    <h3 className="text-base font-semibold text-white">Send Direct Message</h3>
                    <span className="text-[11px] font-mono text-zinc-400">Response &lt; 24h guaranteed</span>
                  </div>

                  <form onSubmit={handleSendMessage} className="space-y-3 my-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Full Name</label>
                        <input
                          type="text"
                          placeholder="Sarah Jenkins"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          required
                          className="w-full h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 text-xs focus:border-white/20 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Email Address</label>
                        <input
                          type="email"
                          placeholder="sarah@company.com"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          required
                          className="w-full h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 text-xs focus:border-white/20 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">Engagement Scope</label>
                      <div className="flex flex-wrap gap-1.5">
                        {['Advisory & RFC', 'Full Architecture', 'Code Review', 'Consulting'].map((scope) => (
                          <button
                            key={scope}
                            type="button"
                            onClick={() => setSelectedScope(scope)}
                            className={`px-2.5 py-1 text-xs rounded-lg border transition-all cursor-pointer font-medium ${
                              selectedScope === scope
                                ? 'bg-white/15 border-white/30 text-white shadow-sm'
                                : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/20 hover:text-white'
                            }`}
                          >
                            {scope}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">Project Brief</label>
                      <textarea
                        placeholder="Tell me about your product requirements, infrastructure stack, and timeline..."
                        rows={3}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 text-xs focus:border-white/20 focus:outline-none resize-none transition-colors"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ y: -1, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full h-10 flex items-center justify-center gap-2 px-5 rounded-lg text-xs font-semibold text-white transition-all cursor-pointer shadow-md"
                      style={{
                        backgroundColor: messageSent ? '#10B981' : 'var(--accent-glow)',
                        border: messageSent ? '1px solid #10B981' : '1px solid var(--accent)',
                      }}
                    >
                      {messageSent ? (
                        <>
                          <Check className="w-4 h-4" /> Message Sent Successfully!
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Dispatch Message
                        </>
                      )}
                    </motion.button>
                  </form>

                  <div className="pt-2.5 border-t border-white/[0.06] text-[11px] font-mono text-zinc-500 flex items-center justify-between">
                    <span>Direct: alex@bento-os.dev</span>
                    <span>PGP Key Available</span>
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): Quick Connect on top + Location below */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-4 h-full">
                <SocialCard />
                <LocationCard />
              </div>
            </div>

            {/* Slim 1-Line Footer */}
            <footer className="mt-4 pt-3 border-t border-white/[0.08] shrink-0">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 font-mono">
                <div className="flex items-center gap-4">
                  <span>© 2026 Alex Chen</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    All systems operational
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToSection('about')}
                  className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Back to Top <ArrowUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </footer>
          </motion.div>
        </section>
      </main>

      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  )
}
