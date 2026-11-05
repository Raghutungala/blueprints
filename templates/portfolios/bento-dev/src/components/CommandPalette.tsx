'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Mail, Palette, ExternalLink } from 'lucide-react'
import { portfolioConfig } from '@/data/portfolio-config'

const themes = [
  { name: 'emerald', label: 'Emerald', color: '#10B981' },
  { name: 'violet', label: 'Cyber Violet', color: '#8B5CF6' },
  { name: 'cyan', label: 'Electric Cyan', color: '#06B6D4' },
  { name: 'amber', label: 'Sunset Amber', color: '#F59E0B' },
]

export default function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [search, setSearch] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const actions = [
    {
      id: 'email',
      label: 'Copy Email',
      icon: Mail,
      action: async () => {
        await navigator.clipboard.writeText(portfolioConfig.email)
        onClose()
      }
    },
    ...themes.map((theme) => ({
      id: theme.name,
      label: 'Switch to ' + theme.label + ' theme',
      icon: Palette,
      action: () => {
        if ((window as any).setAccentTheme) {
          (window as any).setAccentTheme(theme.name)
        }
        onClose()
      }
    })),
    {
      id: 'github',
      label: 'Open GitHub',
      icon: ExternalLink,
      action: () => {
        window.open(portfolioConfig.socials.github, '_blank')
        onClose()
      }
    },
    {
      id: 'linkedin',
      label: 'Open LinkedIn',
      icon: ExternalLink,
      action: () => {
        window.open(portfolioConfig.socials.linkedin, '_blank')
        onClose()
      }
    }
  ]

  const filtered = actions.filter((action) =>
    action.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50'
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className='fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50 px-4'
          >
            <div className='bg-[#121215] border border-white/10 rounded-xl overflow-hidden shadow-2xl'>
              <div className='flex items-center gap-3 px-4 py-3 border-b border-white/10'>
                <Search className='w-4 h-4 text-gray-400' />
                <input
                  type='text'
                  placeholder='Search commands...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className='flex-1 bg-transparent outline-none text-sm'
                  autoFocus
                />
                <kbd className='px-2 py-1 text-xs bg-white/5 rounded border border-white/10'>ESC</kbd>
              </div>
              <div className='max-h-80 overflow-auto p-2'>
                {filtered.map((action) => (
                  <button
                    key={action.id}
                    onClick={action.action}
                    className='w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-left'
                  >
                    <action.icon className='w-4 h-4 text-gray-400' />
                    <span className='text-sm'>{action.label}</span>
                  </button>
                ))}
                {filtered.length === 0 && (
                  <div className='px-3 py-8 text-center text-sm text-gray-500'>
                    No results found
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
