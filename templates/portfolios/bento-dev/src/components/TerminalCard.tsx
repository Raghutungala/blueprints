'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { portfolioConfig } from '@/data/portfolio-config'
import SpotlightCard from './SpotlightCard'

export default function TerminalCard() {
  const [history, setHistory] = useState<Array<{ cmd: string; output: string[] }>>([
    {
      cmd: 'welcome',
      output: [
        'Bento-OS Terminal v2.1.0 [x86_64-darwin]',
        'Type a command or click a quick-action pill below.',
      ],
    },
  ])
  const [input, setInput] = useState('')
  const outputContainerRef = useRef<HTMLDivElement>(null)
  const outputEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const commands = ['whoami', 'stack', 'experience', 'contact', 'clear']

  const scrollToBottom = () => {
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [history])

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    if (trimmed === '') return

    if (trimmed === 'clear') {
      setHistory([
        {
          cmd: 'clear',
          output: ['Terminal output cleared. Ready for next command.'],
        },
      ])
      setInput('')
      return
    }

    const output =
      portfolioConfig.terminal.commands[trimmed] || [
        `zsh: command not found: ${trimmed}. Try 'whoami', 'stack', 'experience', 'contact'`,
      ]
    setHistory((prev) => [...prev, { cmd: trimmed, output }])
    setInput('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input)
    }
  }

  return (
    <SpotlightCard className="h-[340px] lg:h-[360px] flex flex-col justify-between overflow-hidden p-0 border border-white/10 bg-[#0d0d10] shadow-2xl">
      {/* Fixed Top Bar */}
      <div className="h-9 shrink-0 px-4 flex items-center justify-between border-b border-white/[0.08] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
        </div>

        <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5 select-none">
          <span className="text-zinc-600">bash —</span>
          <span className="text-zinc-300">80x24</span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">active</span>
        </div>
      </div>

      {/* Middle Scrollable Output Container with Ref & Auto-scroll */}
      <div
        ref={outputContainerRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 font-mono text-xs sm:text-sm custom-scrollbar"
      >
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-zinc-300">
              <span style={{ color: 'var(--accent)' }} className="font-bold">➜</span>
              <span className="text-zinc-500">~</span>
              <span className="font-semibold text-white">{item.cmd}</span>
            </div>
            {item.output.map((line, i) => (
              <div key={i} className="text-zinc-400 pl-4 border-l border-white/[0.06] text-xs leading-relaxed">
                {line}
              </div>
            ))}
          </div>
        ))}
        <div ref={outputEndRef} />
      </div>

      {/* Bottom Pinned Command Bar */}
      <div className="shrink-0 border-t border-white/[0.08] bg-black/40 p-3 space-y-2.5">
        {/* Quick Action Pills */}
        <div className="flex flex-wrap gap-1.5">
          {commands.map((cmd) => (
            <motion.button
              key={cmd}
              type="button"
              whileHover={{ y: -1, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => runCommand(cmd)}
              className="px-2.5 py-1 text-[11px] rounded-md border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.08] transition-colors font-mono text-zinc-300 cursor-pointer"
            >
              {cmd}
            </motion.button>
          ))}
        </div>

        {/* Input Line */}
        <div className="flex items-center gap-2 font-mono text-xs sm:text-sm pt-0.5">
          <span style={{ color: 'var(--accent)' }} className="font-bold">➜</span>
          <span className="text-zinc-500">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type command (e.g. stack, whoami)..."
            className="flex-1 bg-transparent outline-none text-zinc-100 placeholder:text-zinc-600 text-xs sm:text-sm font-mono"
          />
        </div>
      </div>
    </SpotlightCard>
  )
}
