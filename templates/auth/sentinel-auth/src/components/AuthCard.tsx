'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import PasswordStrength, { getPasswordStrength } from './PasswordStrength'
import SocialButtons from './SocialButtons'
import OTPInput from './OTPInput'

export default function AuthCard({ mode }: { mode: 'enterprise' | 'playful' }) {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'magic'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [otpComplete, setOtpComplete] = useState(false)
  
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 })
  const [tooltip, setTooltip] = useState('')
  const [isNear, setIsNear] = useState(false)

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const passwordStrength = getPasswordStrength(password)
  const formValid = emailValid && passwordStrength === 4 && password.length >= 8

  useEffect(() => {
    if (mode !== 'playful' || activeTab !== 'signin' || formValid) {
      setButtonPos({ x: 0, y: 0 })
      setIsNear(false)
      setTooltip('')
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return
      const rect = buttonRef.current.getBoundingClientRect()
      const card = buttonRef.current.closest('.auth-card') as HTMLElement
      if (!card) return
      const cardRect = card.getBoundingClientRect()
      
      const btnCenterX = rect.left + rect.width / 2
      const btnCenterY = rect.top + rect.height / 2
      const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY)
      
      if (dist < 80) {
        setIsNear(true)
        if (!emailValid) setTooltip('Fix your email first!')
        else if (passwordStrength < 4) setTooltip('Password too weak to catch me!')
        else setTooltip('Almost there!')
        
        const maxX = (cardRect.width - rect.width) / 2 - 20
        const maxY = (cardRect.height - rect.height) / 2 - 40
        const newX = (Math.random() - 0.5) * maxX * 2
        const newY = (Math.random() - 0.5) * maxY * 2
        setButtonPos({ x: Math.max(-maxX, Math.min(maxX, newX)), y: Math.max(-maxY, Math.min(maxY, newY)) })
      } else {
        setIsNear(false)
        setTooltip('')
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mode, activeTab, formValid, emailValid, passwordStrength])

  return (
    <div className="auth-card w-full max-w-md mx-auto p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl relative">
      <div className="flex gap-1 p-1 rounded-xl bg-white/5 mb-6">
        {(['signin', 'signup', 'magic'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setOtpComplete(false) }}
            className="flex-1 px-3 py-2 rounded-lg text-sm transition-all"
            style={{
              backgroundColor: activeTab === tab ? 'rgba(6, 182, 212, 0.3)' : 'transparent',
              color: activeTab === tab ? 'white' : 'rgb(156 163 175)'
            }}
          >
            {tab === 'signin' ? 'Sign In' : tab === 'signup' ? 'Create Account' : 'Magic Link'}
          </button>
        ))}
      </div>

      {activeTab === 'magic' ? (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Verify with OTP</h2>
            <p className="text-sm text-gray-400">We'll send a code to your email</p>
          </div>
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 transition-opacity">
            Send Code
          </button>
          <OTPInput onComplete={() => setOtpComplete(true)} />
        </div>
      ) : (
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {activeTab === 'signin' ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="text-sm text-gray-400">
              {activeTab === 'signin' ? 'Sign in to continue' : 'Get started with Sentinel-Auth'}
            </p>
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>
            {email && !emailValid && <p className="text-xs text-red-400 mt-1">Invalid email</p>}
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none transition-all"
                placeholder="••••••••"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {activeTab === 'signup' && password && <PasswordStrength password={password} />}
          </div>

          {activeTab === 'signin' ? (
            <motion.button
              ref={buttonRef}
              animate={mode === 'playful' && !formValid ? { x: buttonPos.x, y: buttonPos.y } : { x: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-full py-2.5 rounded-lg font-medium transition-all relative"
              style={{
                background: formValid ? 'linear-gradient(to right, #10B981, #059669)' : 'linear-gradient(to right, #06B6D4, #8B5CF6)',
                boxShadow: formValid ? '0 0 20px rgba(16, 185, 129, 0.5)' : 'none'
              }}
              disabled={mode === 'enterprise' ? false : !formValid && mode === 'playful'}
            >
              {formValid ? 'Sign In ?' : 'Sign In'}
              {isNear && tooltip && mode === 'playful' && !formValid && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: -30 }}
                  className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-red-500/90 rounded text-xs whitespace-nowrap"
                >
                  {tooltip}
                </motion.div>
              )}
            </motion.button>
          ) : (
            <button
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 transition-opacity"
              disabled={!formValid}
              style={{ opacity: formValid ? 1 : 0.5 }}
            >
              Create Account
            </button>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-transparent text-gray-400">or continue with</span>
            </div>
          </div>

          <SocialButtons />
        </div>
      )}
    </div>
  )
}
