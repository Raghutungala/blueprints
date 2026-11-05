'use client'

import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Zap,
  RotateCcw,
  Check,
  ArrowRight,
  ShieldCheck,
  KeyRound,
  AlertCircle,
  HelpCircle,
} from 'lucide-react'
import { useAuth } from '@/lib/AuthContext'
import PasswordStrength from './PasswordStrength'
import SocialButtons from './SocialButtons'
import OTPInput from './OTPInput'

export default function AuthCard() {
  const {
    themeConfig,
    mode,
    activeTab,
    setActiveTab,
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    emailValid,
    passwordChecks,
    passwordStrength,
    formValid,
    isButtonEvading,
    setIsButtonEvading,
    incrementEvasion,
    fillDemoCredentials,
    clearCredentials,
  } = useAuth()

  // Password visibility toggle
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(true)

  // Magic link sub-mode: 'email' or 'otp'
  const [magicMode, setMagicMode] = useState<'email' | 'otp'>('email')
  const [magicSent, setMagicSent] = useState(false)

  // Submission success animation state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Evasive Button State
  const cardRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 })
  const [tooltip, setTooltip] = useState('')

  // Determine dynamic witty tooltip for runaway button
  const getWittyTooltip = () => {
    if (!email) return 'Enter an email first! ⚡'
    if (!emailValid) return 'Enter a valid email format! 📧'
    if (!password) return 'Password cannot be blank! 🔒'
    if (!passwordChecks.length) return 'Password needs 8+ characters! 📏'
    if (!passwordChecks.upper) return 'Need an UPPERCASE letter! 🔠'
    if (!passwordChecks.number) return 'Add a number (0-9)! 🔢'
    if (!passwordChecks.symbol) return 'Add a special symbol (!@#$)! 💥'
    return 'Almost there! 🏃💨'
  }

  // Handle Playful Evasion physics
  useEffect(() => {
    if (mode !== 'playful' || activeTab !== 'signin' || formValid) {
      setButtonPos({ x: 0, y: 0 })
      setIsButtonEvading(false)
      setTooltip('')
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current || !cardRef.current) return

      const btnRect = buttonRef.current.getBoundingClientRect()
      const cardRect = cardRef.current.getBoundingClientRect()

      const btnCenterX = btnRect.left + btnRect.width / 2
      const btnCenterY = btnRect.top + btnRect.height / 2
      const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY)

      // When cursor comes within 85px of button
      if (dist < 85) {
        setIsButtonEvading(true)
        incrementEvasion()
        setTooltip(getWittyTooltip())

        // Calculate maximum allowable offsets to strictly stay inside the card container
        const maxDeltaX = (cardRect.width - btnRect.width) / 2 - 24
        const maxDeltaY = 55 // Keep inside the action row vertical zone

        // Push away from cursor with random lateral jitter
        const angle = Math.atan2(btnCenterY - e.clientY, btnCenterX - e.clientX)
        const jumpDistance = 90 + Math.random() * 40
        const rawTargetX = Math.cos(angle) * jumpDistance + (Math.random() - 0.5) * 50
        const rawTargetY = Math.sin(angle) * jumpDistance + (Math.random() - 0.5) * 30

        const clampedX = Math.max(-maxDeltaX, Math.min(maxDeltaX, rawTargetX))
        const clampedY = Math.max(-maxDeltaY, Math.min(maxDeltaY, rawTargetY))

        setButtonPos({ x: clampedX, y: clampedY })
      } else if (dist > 160 && isButtonEvading) {
        setIsButtonEvading(false)
        setTooltip('')
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mode, activeTab, formValid, email, emailValid, passwordChecks, isButtonEvading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (activeTab === 'signin' && mode === 'playful' && !formValid) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => setIsSuccess(false), 3500)
    }, 1000)
  }

  const handleSendMagic = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailValid) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setMagicSent(true)
      setMagicMode('otp')
    }, 800)
  }

  return (
    <div
      ref={cardRef}
      className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-zinc-950/70 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden"
    >
      {/* Top radial ambient glow */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-32 rounded-full blur-[80px] pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: themeConfig.glow }}
      />

      {/* Header Bar inside Auth Card: Quick Action Demo Pills */}
      <div className="relative z-10 flex items-center justify-between pb-5 mb-5 border-b border-white/[0.08]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {activeTab === 'signin'
              ? 'Access Portal'
              : activeTab === 'signup'
              ? 'Create Identity'
              : 'Passwordless'}
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            {mode === 'enterprise' ? 'Zero-Trust Protocol Active' : 'Interactive Playground Mode'}
          </p>
        </div>

        {/* Demo Credentials Action Pill */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 transition-all text-zinc-300 hover:text-white cursor-pointer shadow-sm group"
            title="Auto-fill verified demo credentials"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Fill Demo</span>
          </button>

          {(email || password) && (
            <button
              type="button"
              onClick={clearCredentials}
              className="p-1.5 rounded-lg text-xs bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Clear credentials"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Auth Mode Tabs with Animated Sliding Pill */}
      <div className="relative z-10 grid grid-cols-3 gap-1 p-1 rounded-2xl bg-white/[0.04] border border-white/[0.08] mb-6">
        {(['signin', 'signup', 'magic'] as const).map((tab) => {
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab)
                setIsSuccess(false)
              }}
              className="relative py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer z-10 flex items-center justify-center gap-1.5"
              style={{
                color: isActive ? '#FFFFFF' : 'rgb(161 161 170)',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeAuthTab"
                  className="absolute inset-0 rounded-xl shadow-md border"
                  style={{
                    backgroundColor: themeConfig.badgeBg,
                    borderColor: `${themeConfig.hex}40`,
                    boxShadow: `0 0 14px ${themeConfig.glow}`,
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">
                {tab === 'signin' ? 'Sign In' : tab === 'signup' ? 'Sign Up' : 'Magic Link'}
              </span>
            </button>
          )
        })}
      </div>

      {/* Success Banner Overlay when Authenticated */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mb-5 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Zero-Trust Handshake Successful!</p>
              <p className="text-[11px] text-emerald-300/80">
                Session token issued with TLS 1.3 encryption.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TAB CONTENT */}
      {activeTab === 'magic' ? (
        /* MAGIC LINK / PASSWORDLESS TAB */
        <div className="relative z-10 space-y-5">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5" style={{ color: themeConfig.hex }} />
              <span>Passwordless Security</span>
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMagicMode('email')}
                className={`px-2 py-0.5 rounded text-[11px] cursor-pointer transition-colors ${
                  magicMode === 'email' ? 'bg-white/10 text-white font-medium' : 'hover:text-white'
                }`}
              >
                Link
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setMagicMode('otp')}
                className={`px-2 py-0.5 rounded text-[11px] cursor-pointer transition-colors ${
                  magicMode === 'otp' ? 'bg-white/10 text-white font-medium' : 'hover:text-white'
                }`}
              >
                6-Digit OTP
              </button>
            </div>
          </div>

          {magicMode === 'email' ? (
            <form onSubmit={handleSendMagic} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-zinc-300 mb-1.5 block">
                  Work Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="sarah.chen@techflow.dev"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:outline-none transition-all text-sm text-white placeholder:text-zinc-600"
                    style={{
                      borderColor: email ? (emailValid ? '#10B981' : '#F43F5E') : undefined,
                    }}
                  />
                  {emailValid && (
                    <Check className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                  )}
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || !emailValid}
                whileHover={{ scale: emailValid ? 1.01 : 1 }}
                whileTap={{ scale: emailValid ? 0.98 : 1 }}
                className="w-full py-2.5 px-4 rounded-xl font-medium text-sm text-white transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
                style={{
                  background: emailValid
                    ? `linear-gradient(135deg, ${themeConfig.hex}, ${themeConfig.toHex})`
                    : 'rgba(255,255,255,0.06)',
                  boxShadow: emailValid ? `0 0 20px ${themeConfig.glow}` : undefined,
                  opacity: emailValid ? 1 : 0.6,
                }}
              >
                {isSubmitting ? (
                  <span>Dispatching Token...</span>
                ) : (
                  <>
                    <span>Send Magic Auth Link</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          ) : (
            <div className="space-y-4">
              <OTPInput onComplete={() => setIsSuccess(true)} />
            </div>
          )}

          {/* Social Auth Separator */}
          <div className="relative pt-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.08]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-zinc-950 text-zinc-400 font-medium">Or continue with</span>
            </div>
          </div>

          <SocialButtons />
        </div>
      ) : (
        /* SIGN IN & SIGN UP FORMS */
        <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
          {/* Sign Up: Full Name */}
          {activeTab === 'signup' && (
            <div>
              <label className="text-xs font-medium text-zinc-300 mb-1.5 block">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sarah Chen"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:outline-none transition-all text-sm text-white placeholder:text-zinc-600"
              />
            </div>
          )}

          {/* Email Address */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-zinc-300">Email Address</label>
              {email && (
                <span
                  className={`text-[11px] font-mono ${
                    emailValid ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {emailValid ? '✓ Valid Format' : 'Invalid email'}
                </span>
              )}
            </div>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="sarah.chen@techflow.dev"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:outline-none transition-all text-sm text-white placeholder:text-zinc-600"
                style={{
                  borderColor: email ? (emailValid ? '#10B981' : '#F43F5E') : undefined,
                }}
              />
              {emailValid && (
                <Check className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-zinc-300">Password</label>
              {activeTab === 'signin' && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('magic')
                    setMagicMode('email')
                  }}
                  className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Passw0rd!2026"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:outline-none transition-all text-sm text-white placeholder:text-zinc-600"
                style={{
                  borderColor:
                    password && activeTab === 'signin'
                      ? formValid
                        ? '#10B981'
                        : undefined
                      : undefined,
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password Entropy Meter on Sign Up */}
            {activeTab === 'signup' && <PasswordStrength password={password} />}
          </div>

          {/* PLAYFUL MODE LIVE VALIDATION CRITERIA BADGES (Sign In) */}
          {mode === 'playful' && activeTab === 'signin' && (
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Zap className="w-3 h-3" />
                  <span>PLAYFUL RUNAWAY LOCK:</span>
                </span>
                <span className={formValid ? 'text-emerald-400' : 'text-amber-400'}>
                  {formValid ? 'UNLOCKED' : `${passwordStrength}/4 MET`}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <div
                  className={`flex items-center gap-1.5 text-[11px] ${
                    emailValid ? 'text-emerald-400' : 'text-zinc-400'
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] ${
                      emailValid ? 'bg-emerald-500/20 border border-emerald-500/40' : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    {emailValid ? '✓' : '•'}
                  </span>
                  <span>Valid Email</span>
                </div>

                <div
                  className={`flex items-center gap-1.5 text-[11px] ${
                    passwordChecks.length ? 'text-emerald-400' : 'text-zinc-400'
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] ${
                      passwordChecks.length ? 'bg-emerald-500/20 border border-emerald-500/40' : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    {passwordChecks.length ? '✓' : '•'}
                  </span>
                  <span>8+ Chars</span>
                </div>

                <div
                  className={`flex items-center gap-1.5 text-[11px] ${
                    passwordChecks.upper ? 'text-emerald-400' : 'text-zinc-400'
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] ${
                      passwordChecks.upper ? 'bg-emerald-500/20 border border-emerald-500/40' : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    {passwordChecks.upper ? '✓' : '•'}
                  </span>
                  <span>Uppercase</span>
                </div>

                <div
                  className={`flex items-center gap-1.5 text-[11px] ${
                    passwordChecks.number && passwordChecks.symbol ? 'text-emerald-400' : 'text-zinc-400'
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] ${
                      passwordChecks.number && passwordChecks.symbol
                        ? 'bg-emerald-500/20 border border-emerald-500/40'
                        : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    {passwordChecks.number && passwordChecks.symbol ? '✓' : '•'}
                  </span>
                  <span>Number & Symbol</span>
                </div>
              </div>
            </div>
          )}

          {/* Remember Me / Terms Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={activeTab === 'signin' ? rememberMe : agreeTerms}
                onChange={(e) => {
                  if (activeTab === 'signin') setRememberMe(e.target.checked)
                  else setAgreeTerms(e.target.checked)
                }}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-md flex items-center justify-center transition-colors border ${
                  (activeTab === 'signin' ? rememberMe : agreeTerms)
                    ? 'bg-white text-black border-white'
                    : 'bg-white/5 border-white/20'
                }`}
              >
                {(activeTab === 'signin' ? rememberMe : agreeTerms) && (
                  <Check className="w-3 h-3 stroke-[3]" />
                )}
              </div>
              <span className="text-xs text-zinc-400">
                {activeTab === 'signin'
                  ? 'Remember this device for 30 days'
                  : 'I agree to the Terms of Service & Privacy Policy'}
              </span>
            </label>
          </div>

          {/* SUBMIT BUTTON ROW WITH EVASIVE PHYSICS IN PLAYFUL MODE */}
          <div className="relative pt-2 min-h-[50px] flex items-center justify-center">
            {activeTab === 'signin' ? (
              <div className="w-full relative">
                {/* Dynamic Witty Tooltip above Evasive Button */}
                <AnimatePresence>
                  {mode === 'playful' && !formValid && isButtonEvading && tooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.95 }}
                      animate={{ opacity: 1, y: -36, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.95 }}
                      className="absolute left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-xs font-medium bg-rose-500 text-white shadow-xl whitespace-nowrap z-20 flex items-center gap-1.5 pointer-events-none"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{tooltip}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  ref={buttonRef}
                  type="submit"
                  disabled={isSubmitting || (mode === 'playful' && !formValid)}
                  animate={
                    mode === 'playful' && !formValid
                      ? { x: buttonPos.x, y: buttonPos.y }
                      : { x: 0, y: 0 }
                  }
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 22,
                  }}
                  whileHover={
                    mode === 'enterprise' || formValid ? { scale: 1.01 } : undefined
                  }
                  whileTap={
                    mode === 'enterprise' || formValid ? { scale: 0.98 } : undefined
                  }
                  className="w-full py-2.5 px-4 rounded-xl font-medium text-sm text-white transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2 relative z-10"
                  style={{
                    background:
                      formValid
                        ? 'linear-gradient(135deg, #10B981, #059669)'
                        : mode === 'playful'
                        ? 'rgba(255,255,255,0.08)'
                        : `linear-gradient(135deg, ${themeConfig.hex}, ${themeConfig.toHex})`,
                    boxShadow:
                      formValid
                        ? '0 0 25px rgba(16, 185, 129, 0.4)'
                        : mode === 'enterprise'
                        ? `0 0 20px ${themeConfig.glow}`
                        : undefined,
                    color: mode === 'playful' && !formValid ? '#A1A1AA' : '#FFFFFF',
                  }}
                >
                  {isSubmitting ? (
                    <span>Verifying Token...</span>
                  ) : formValid ? (
                    <>
                      <span>Sign In to Sentinel 🚀</span>
                      <Check className="w-4 h-4" />
                    </>
                  ) : mode === 'playful' ? (
                    <>
                      <span>Catch Me If You Can 🏃💨</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In with Sentinel</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>
            ) : (
              /* Create Account Button */
              <motion.button
                type="submit"
                disabled={isSubmitting || !formValid || !agreeTerms}
                whileHover={{ scale: formValid && agreeTerms ? 1.01 : 1 }}
                whileTap={{ scale: formValid && agreeTerms ? 0.98 : 1 }}
                className="w-full py-2.5 px-4 rounded-xl font-medium text-sm text-white transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
                style={{
                  background:
                    formValid && agreeTerms
                      ? `linear-gradient(135deg, ${themeConfig.hex}, ${themeConfig.toHex})`
                      : 'rgba(255,255,255,0.06)',
                  boxShadow:
                    formValid && agreeTerms ? `0 0 20px ${themeConfig.glow}` : undefined,
                  opacity: formValid && agreeTerms ? 1 : 0.6,
                }}
              >
                {isSubmitting ? (
                  <span>Generating Keys...</span>
                ) : (
                  <>
                    <span>Create Enterprise Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            )}
          </div>

          {/* Social Auth Separator */}
          <div className="relative pt-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.08]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-zinc-950 text-zinc-400 font-medium">Or continue with</span>
            </div>
          </div>

          {/* 3-Column Social Auth Grid */}
          <SocialButtons />
        </form>
      )}
    </div>
  )
}
