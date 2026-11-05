'use client'

import { motion } from 'framer-motion'
import { Mail, ArrowUpRight } from 'lucide-react'
import { portfolioConfig } from '@/data/portfolio-config'
import SpotlightCard from './SpotlightCard'

const socialIcons = {
  github: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  linkedin: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  ),
  twitter: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  email: <Mail className="w-4 h-4" />
}

export default function SocialCard({ className }: { className?: string }) {
  const socials = [
    { key: 'github', label: 'GitHub', handle: '@alexchen', badge: '2.8k', href: portfolioConfig.socials.github },
    { key: 'linkedin', label: 'LinkedIn', handle: '@alexchen', badge: '1.2k', href: portfolioConfig.socials.linkedin },
    { key: 'twitter', label: 'X/Twitter', handle: '@alexchen', badge: '890', href: portfolioConfig.socials.twitter },
    { key: 'email', label: 'Email', handle: portfolioConfig.email, badge: 'Direct', href: portfolioConfig.socials.email },
  ]

  return (
    <SpotlightCard className={`p-5 shrink-0 h-auto bg-[#101014] border border-white/10 rounded-2xl ${className || ''}`}>
      <div className="flex flex-col">
        {/* Header with mb-3.5 */}
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-sm font-semibold text-white">Quick Connect</h3>
          <span className="text-[10px] font-mono text-zinc-500">Direct Network</span>
        </div>

        {/* 2x2 Grid with gap-3 */}
        <div className="grid grid-cols-2 gap-3">
          {socials.map((social) => (
            <motion.a
              key={social.key}
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/20 transition-all overflow-hidden cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div style={{ color: 'var(--accent)' }}>
                  {socialIcons[social.key as keyof typeof socialIcons]}
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <div className="text-xs font-semibold text-white leading-tight">{social.label}</div>
              <div className="text-[10px] text-zinc-400 font-mono truncate mt-0.5">{social.handle}</div>
              <div className="absolute top-2.5 right-2 px-1.5 py-0.5 text-[8px] font-mono rounded bg-white/5 border border-white/10 text-zinc-400">
                {social.badge}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </SpotlightCard>
  )
}
