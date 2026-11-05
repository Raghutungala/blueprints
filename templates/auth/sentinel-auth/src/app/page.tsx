'use client'

import { motion } from 'framer-motion'
import { AuthProvider, useAuth } from '@/lib/AuthContext'
import Header from '@/components/Header'
import LeftPane from '@/components/LeftPane'
import AuthCard from '@/components/AuthCard'

function SentinelAuthContent() {
  const { themeConfig, mode } = useAuth()

  return (
    <div className="min-h-screen flex flex-col justify-between relative overflow-x-hidden bg-[#050508] text-white selection:bg-white/20 selection:text-white">
      {/* Dynamic Ambient Aurora Spotlights */}
      <div
        className="fixed top-0 left-1/4 -translate-x-1/2 w-[600px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-30 transition-colors duration-1000"
        style={{ backgroundColor: themeConfig.hex }}
      />
      <div
        className="fixed bottom-0 right-1/4 translate-x-1/2 w-[550px] h-[450px] rounded-full blur-[140px] pointer-events-none opacity-25 transition-colors duration-1000"
        style={{ backgroundColor: themeConfig.toHex }}
      />

      {/* Background Subtle Grid Texture */}
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Sleek Floating Header */}
      <Header />

      {/* Main Two-Column Showcase Area */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 my-auto py-6 sm:py-8 lg:py-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column (Showcase: Enterprise Radar vs Playful Mascot) */}
          <div className="lg:col-span-6 flex flex-col">
            <LeftPane />
          </div>

          {/* Right Column (Auth Portal) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <AuthCard />
          </div>
        </div>
      </main>

      {/* Footer Info Line */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 text-center relative z-10">
        <motion.p
          key={mode}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xs text-zinc-500 font-mono"
        >
          {mode === 'playful'
            ? '💡 Interactive Sandbox: Hover near the "Sign In" button with invalid input to watch it evade, or click "Fill Demo" to unlock!'
            : '🔒 Enterprise Protocol: 256-bit AES-GCM Encrypted • Hardware Passkey & WebAuthn Ready • TLS 1.3 Certified'}
        </motion.p>
      </footer>
    </div>
  )
}

export default function Home() {
  return (
    <AuthProvider>
      <SentinelAuthContent />
    </AuthProvider>
  )
}
