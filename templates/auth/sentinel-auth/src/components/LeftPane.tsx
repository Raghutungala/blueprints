'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield,
  Lock,
  Fingerprint,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Sparkles,
  Zap,
  Activity,
  Quote,
  Eye,
} from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { useAuth } from '@/lib/AuthContext'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO at TechFlow',
    avatar: 'SC',
    text: 'Sentinel-Auth reduced our onboarding friction to zero while elevating our zero-trust security architecture to enterprise standards.',
  },
  {
    name: 'Marcus Johnson',
    role: 'Head of InfoSec at Axiom',
    avatar: 'MJ',
    text: 'The cryptographic hardware passkey support and dynamic challenge verification give our infosec team 100% confidence.',
  },
  {
    name: 'Elena Rodriguez',
    role: 'VP Product at Hyperion',
    avatar: 'ER',
    text: 'A rare authentication experience that combines Linear-level visual craft with uncompromising cryptographic protection.',
  },
]

export default function LeftPane() {
  const {
    themeConfig,
    mode,
    mousePos,
    isButtonEvading,
    formValid,
    evasionCount,
  } = useAuth()

  // Testimonial auto-rotation
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false)

  // Live hex stream for AES-GCM card
  const [hexStream, setHexStream] = useState('0x7F2A...9C1D')

  // Ref for Mascot eye tracking calculations
  const mascotRef = useRef<HTMLDivElement>(null)
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 })

  // Hex stream randomizer
  useEffect(() => {
    const interval = setInterval(() => {
      const chars = '0123456789ABCDEF'
      let p1 = ''
      let p2 = ''
      for (let i = 0; i < 4; i++) p1 += chars[Math.floor(Math.random() * chars.length)]
      for (let i = 0; i < 4; i++) p2 += chars[Math.floor(Math.random() * chars.length)]
      setHexStream(`0x${p1}...${p2}`)
    }, 750)
    return () => clearInterval(interval)
  }, [])

  // Auto-advance testimonials
  useEffect(() => {
    if (isTestimonialHovered) return
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [isTestimonialHovered])

  // Mascot eye-tracking calculation
  useEffect(() => {
    if (mode !== 'playful' || !mascotRef.current) return

    const rect = mascotRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const dx = mousePos.x - centerX
    const dy = mousePos.y - centerY
    const angle = Math.atan2(dy, dx)
    const dist = Math.hypot(dx, dy)

    const maxRadius = isButtonEvading ? 8 : 6
    const clampedDist = Math.min(dist / 25, maxRadius)

    setPupilOffset({
      x: Math.cos(angle) * clampedDist,
      y: Math.sin(angle) * clampedDist,
    })
  }, [mousePos, mode, isButtonEvading])

  return (
    <div className="flex flex-col justify-between h-full p-6 sm:p-8 lg:p-10 rounded-3xl bg-zinc-950/40 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Dynamic ambient spotlight */}
      <div
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: themeConfig.glow }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-40 transition-colors duration-700"
        style={{ backgroundColor: themeConfig.hex }}
      />

      {/* Top Banner / Identity */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 shadow-lg"
              style={{
                backgroundColor: themeConfig.badgeBg,
                borderColor: `${themeConfig.hex}40`,
                boxShadow: `0 0 20px ${themeConfig.glow}`,
              }}
            >
              {mode === 'enterprise' ? (
                <Shield className="w-5 h-5" style={{ color: themeConfig.hex }} />
              ) : (
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white tracking-tight">Sentinel Command</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                  {mode === 'enterprise' ? 'Enterprise Core' : 'Interactive Mascot'}
                </span>
              </div>
              <p className="text-xs text-zinc-400">Zero-Trust Authentication Gateway</p>
            </div>
          </div>

          {/* Mode Badge indicator */}
          <div
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono transition-colors"
            style={{
              backgroundColor: mode === 'enterprise' ? `${themeConfig.hex}15` : 'rgba(245, 158, 11, 0.15)',
              borderColor: mode === 'enterprise' ? `${themeConfig.hex}30` : 'rgba(245, 158, 11, 0.3)',
              color: mode === 'enterprise' ? themeConfig.hex : '#F59E0B',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-ping bg-current" />
            <span>{mode === 'enterprise' ? 'TELEMETRY LIVE' : 'MASCOT TRACKING'}</span>
          </div>
        </div>

        {/* Centerpiece Showcase: Enterprise Radar Core vs Playful Mascot */}
        <div
          ref={mascotRef}
          className="relative my-4 flex flex-col items-center justify-center min-h-[220px] sm:min-h-[260px] rounded-2xl bg-black/40 border border-white/[0.06] p-4 overflow-hidden"
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {mode === 'enterprise' ? (
            /* ENTERPRISE MODE: Multi-ring orbital radar & biometric shield */
            <div className="relative flex flex-col items-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                {/* Outer counter-rotating dashed ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border border-dashed border-white/15"
                />

                {/* Inner rotating orbital ring with satellite nodes */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-4 rounded-full border border-white/10"
                >
                  <div
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full shadow-lg"
                    style={{
                      backgroundColor: themeConfig.hex,
                      boxShadow: `0 0 10px ${themeConfig.hex}`,
                    }}
                  />
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/40" />
                </motion.div>

                {/* Sweeping radar scanner line */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-6 rounded-full overflow-hidden pointer-events-none"
                  style={{
                    background: `conic-gradient(from 0deg, transparent 0deg, transparent 300deg, ${themeConfig.glow} 360deg)`,
                  }}
                />

                {/* Biometric Shield Core SVG */}
                <svg viewBox="0 0 200 200" className="w-32 h-32 sm:w-36 sm:h-36 relative z-10">
                  <defs>
                    <linearGradient id="shieldFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={themeConfig.hex} stopOpacity="0.3" />
                      <stop offset="100%" stopColor={themeConfig.toHex} stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="shieldStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={themeConfig.hex} />
                      <stop offset="100%" stopColor={themeConfig.toHex} />
                    </linearGradient>
                  </defs>

                  {/* Shield Path */}
                  <motion.path
                    d="M100 24 L164 52 L164 104 Q164 148 100 176 Q36 148 36 104 L36 52 Z"
                    fill="url(#shieldFillGrad)"
                    stroke="url(#shieldStrokeGrad)"
                    strokeWidth="2.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                  />

                  {/* Inner cryptographic geometric lock icon */}
                  <circle
                    cx="100"
                    cy="96"
                    r="24"
                    fill="none"
                    stroke={themeConfig.hex}
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <path
                    d="M93 96 L98 101 L108 91"
                    fill="none"
                    stroke={themeConfig.hex}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Status Pill */}
              <div
                className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border"
                style={{
                  backgroundColor: `${themeConfig.hex}10`,
                  borderColor: `${themeConfig.hex}30`,
                  color: themeConfig.hex,
                }}
              >
                <span className="w-2 h-2 rounded-full animate-ping bg-emerald-400" />
                <span className="font-semibold text-white">STATUS:</span>
                <span>ENCRYPTED • TLS 1.3</span>
              </div>
            </div>
          ) : (
            /* PLAYFUL MODE: Interactive Guardian Mascot Core with Eye Tracking */
            <div className="relative flex flex-col items-center">
              <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
                {/* Mascot floating animation wrapper */}
                <motion.div
                  animate={{
                    y: isButtonEvading ? [-4, 4, -4] : [-2, 2, -2],
                    rotate: isButtonEvading ? [-2, 2, -2] : 0,
                  }}
                  transition={{ duration: isButtonEvading ? 0.8 : 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10 flex flex-col items-center"
                >
                  <svg viewBox="0 0 200 200" className="w-36 h-36 sm:w-40 sm:h-40">
                    <defs>
                      <linearGradient id="mascotBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#27272A" />
                        <stop offset="100%" stopColor="#09090B" />
                      </linearGradient>
                      <linearGradient id="visorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#18181B" />
                        <stop offset="100%" stopColor="#09090B" />
                      </linearGradient>
                    </defs>

                    {/* Antennae */}
                    <line x1="70" y1="45" x2="60" y2="25" stroke="#71717A" strokeWidth="3" strokeLinecap="round" />
                    <circle
                      cx="60"
                      cy="25"
                      r="4"
                      fill={isButtonEvading ? '#F59E0B' : formValid ? '#10B981' : themeConfig.hex}
                      className={isButtonEvading ? 'animate-ping' : ''}
                    />
                    <line x1="130" y1="45" x2="140" y2="25" stroke="#71717A" strokeWidth="3" strokeLinecap="round" />
                    <circle
                      cx="140"
                      cy="25"
                      r="4"
                      fill={isButtonEvading ? '#F59E0B' : formValid ? '#10B981' : themeConfig.hex}
                      className={isButtonEvading ? 'animate-ping' : ''}
                    />

                    {/* Robot Head Outer Shell */}
                    <rect
                      x="35"
                      y="45"
                      width="130"
                      height="115"
                      rx="32"
                      fill="url(#mascotBodyGrad)"
                      stroke={formValid ? '#10B981' : isButtonEvading ? '#F59E0B' : themeConfig.hex}
                      strokeWidth="2.5"
                    />

                    {/* Visor Screen */}
                    <rect
                      x="50"
                      y="65"
                      width="100"
                      height="65"
                      rx="18"
                      fill="url(#visorGrad)"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1.5"
                    />

                    {/* EYES / OCULAR SENSORS */}
                    {formValid ? (
                      /* Happy Smiling Arc Eyes when Form is Valid! */
                      <g stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" fill="none">
                        <path d="M68 98 Q78 86 88 98" />
                        <path d="M112 98 Q122 86 132 98" />
                      </g>
                    ) : (
                      /* Tracking Ocular Sensors */
                      <>
                        {/* Left Eye */}
                        <g transform={`translate(${78 + pupilOffset.x}, ${95 + pupilOffset.y})`}>
                          <circle
                            r={isButtonEvading ? 13 : 10}
                            fill={isButtonEvading ? 'rgba(245, 158, 11, 0.25)' : themeConfig.badgeBg}
                            stroke={isButtonEvading ? '#F59E0B' : themeConfig.hex}
                            strokeWidth="2"
                          />
                          <circle r={isButtonEvading ? 6 : 4} fill={isButtonEvading ? '#F59E0B' : '#FFFFFF'} />
                          {/* Pupil highlight */}
                          <circle cx="-2" cy="-2" r="1.5" fill="#FFFFFF" opacity="0.8" />
                        </g>

                        {/* Right Eye */}
                        <g transform={`translate(${122 + pupilOffset.x}, ${95 + pupilOffset.y})`}>
                          <circle
                            r={isButtonEvading ? 13 : 10}
                            fill={isButtonEvading ? 'rgba(245, 158, 11, 0.25)' : themeConfig.badgeBg}
                            stroke={isButtonEvading ? '#F59E0B' : themeConfig.hex}
                            strokeWidth="2"
                          />
                          <circle r={isButtonEvading ? 6 : 4} fill={isButtonEvading ? '#F59E0B' : '#FFFFFF'} />
                          {/* Pupil highlight */}
                          <circle cx="-2" cy="-2" r="1.5" fill="#FFFFFF" opacity="0.8" />
                        </g>
                      </>
                    )}

                    {/* Mouth / Audio Waveform */}
                    {formValid ? (
                      /* Happy Smile Mouth */
                      <path
                        d="M90 142 Q100 150 110 142"
                        stroke="#10B981"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                      />
                    ) : isButtonEvading ? (
                      /* Surprised :O Mouth */
                      <ellipse
                        cx="100"
                        cy="142"
                        rx="5"
                        ry="4"
                        stroke="#F59E0B"
                        strokeWidth="2"
                        fill="none"
                      />
                    ) : (
                      /* Calm Cyber Sensor Line */
                      <line
                        x1="92"
                        y1="142"
                        x2="108"
                        y2="142"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    )}
                  </svg>
                </motion.div>
              </div>

              {/* Dynamic Mascot Status Pill */}
              <div
                className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border transition-all duration-300"
                style={{
                  backgroundColor: formValid
                    ? 'rgba(16, 185, 129, 0.15)'
                    : isButtonEvading
                    ? 'rgba(245, 158, 11, 0.15)'
                    : `${themeConfig.hex}15`,
                  borderColor: formValid
                    ? 'rgba(16, 185, 129, 0.4)'
                    : isButtonEvading
                    ? 'rgba(245, 158, 11, 0.4)'
                    : `${themeConfig.hex}30`,
                  color: formValid ? '#10B981' : isButtonEvading ? '#F59E0B' : themeConfig.hex,
                }}
              >
                <span className="w-2 h-2 rounded-full animate-ping bg-current" />
                <span className="font-semibold text-white">
                  {formValid
                    ? 'PASSED:'
                    : isButtonEvading
                    ? 'EVADING:'
                    : 'TRACKING:'}
                </span>
                <span>
                  {formValid
                    ? 'ACCESS GRANTED • LOCK ENGAGED 🛡️'
                    : isButtonEvading
                    ? `RUNAWAY BOT (${evasionCount} EVASIONS) 🏃`
                    : 'EYES LOCKED ON CURSOR 👁️'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 3 Interactive Telemetry Cards */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 my-5">
          {/* Card 1: 256-bit AES-GCM */}
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <ShieldCheck className="w-4 h-4" style={{ color: themeConfig.hex }} />
              <span className="text-[10px] font-mono text-zinc-400">GCM</span>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-white">256-bit AES</p>
              <p className="text-[10px] font-mono text-zinc-400 truncate mt-0.5" title={hexStream}>
                {hexStream}
              </p>
            </div>
          </div>

          {/* Card 2: Passkey & WebAuthn */}
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <div className="relative">
                <Fingerprint className="w-4 h-4 text-emerald-400" />
                <span className="absolute -inset-1 rounded-full bg-emerald-400/20 animate-ping" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400">FIDO2</span>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-white">Passkey Ready</p>
              <p className="text-[10px] text-zinc-400 truncate mt-0.5">Biometric Pulse</p>
            </div>
          </div>

          {/* Card 3: Zero-Trust Verified */}
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <Lock className="w-4 h-4 text-violet-400" />
              <span className="text-[10px] font-mono text-violet-400">99.99%</span>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-white">Zero-Trust</p>
              <p className="text-[10px] text-zinc-400 truncate mt-0.5">Live Handshake</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Testimonial Carousel */}
      <div
        className="relative z-10 mt-2 p-5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10"
        onMouseEnter={() => setIsTestimonialHovered(true)}
        onMouseLeave={() => setIsTestimonialHovered(false)}
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Quote className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-[11px] font-mono uppercase tracking-wider">Verified Review</span>
          </div>
          {/* Manual dot selectors */}
          <div className="flex items-center gap-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTestimonial(idx)}
                className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: idx === activeTestimonial ? '20px' : '6px',
                  backgroundColor: idx === activeTestimonial ? themeConfig.hex : 'rgba(255,255,255,0.2)',
                  boxShadow: idx === activeTestimonial ? `0 0 8px ${themeConfig.glow}` : undefined,
                }}
                aria-label={`Show testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
              &ldquo;{testimonials[activeTestimonial].text}&rdquo;
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white border"
                style={{
                  backgroundColor: `${themeConfig.hex}25`,
                  borderColor: `${themeConfig.hex}40`,
                }}
              >
                {testimonials[activeTestimonial].avatar}
              </div>
              <div>
                <p className="text-xs font-semibold text-white">{testimonials[activeTestimonial].name}</p>
                <p className="text-[11px] text-zinc-400">{testimonials[activeTestimonial].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
