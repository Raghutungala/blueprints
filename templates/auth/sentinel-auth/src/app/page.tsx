'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import LeftPane from '@/components/LeftPane'
import AuthCard from '@/components/AuthCard'
import { Sparkles, Shield } from 'lucide-react'

export default function Home() {
  const [mode, setMode] = useState<'enterprise' | 'playful'>('enterprise')

  return (
    <main className="min-h-screen flex">
      <LeftPane />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-6 flex items-center gap-2 p-1 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10"
        >
          <button
            onClick={() => setMode('enterprise')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
            style={{
              backgroundColor: mode === 'enterprise' ? 'rgba(6, 182, 212, 0.3)' : 'transparent',
              color: mode === 'enterprise' ? 'white' : 'rgb(156 163 175)'
            }}
          >
            <Shield className="w-4 h-4" />
            <span className="text-sm">Enterprise Glass</span>
          </button>
          <button
            onClick={() => setMode('playful')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
            style={{
              backgroundColor: mode === 'playful' ? 'rgba(245, 158, 11, 0.3)' : 'transparent',
              color: mode === 'playful' ? 'white' : 'rgb(156 163 175)'
            }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Playful Evasion</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full mt-20 lg:mt-0"
        >
          <AuthCard mode={mode} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-xs text-gray-500 text-center"
        >
          {mode === 'playful' ? 'Try to click Sign In with invalid credentials!' : 'Production-ready authentication experience'}
        </motion.p>
      </div>
    </main>
  )
}
