'use client'

import { motion } from 'framer-motion'
import { useState, useRef, KeyboardEvent, ClipboardEvent } from 'react'
import { CheckCircle2, RotateCcw } from 'lucide-react'
import { useAuth } from '@/lib/AuthContext'

export default function OTPInput({ onComplete }: { onComplete: () => void }) {
  const { themeConfig } = useAuth()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [verified, setVerified] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    // Handle paste inside single field
    if (value.length > 1) {
      const pastedData = value.replace(/\D/g, '').slice(0, 6).split('')
      const newOtp = [...otp]
      pastedData.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char
      })
      setOtp(newOtp)
      const nextIndex = Math.min(index + pastedData.length, 5)
      inputRefs.current[nextIndex]?.focus()
      if (newOtp.every((d) => d !== '')) {
        setTimeout(() => setVerified(true), 300)
        onComplete()
      }
      return
    }

    const cleanChar = value.replace(/\D/g, '')
    const newOtp = [...otp]
    newOtp[index] = cleanChar
    setOtp(newOtp)

    if (cleanChar && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    if (newOtp.every((d) => d !== '')) {
      setTimeout(() => setVerified(true), 300)
      onComplete()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('')
    if (pastedData.length === 0) return
    const newOtp = [...otp]
    pastedData.forEach((char, i) => {
      if (i < 6) newOtp[i] = char
    })
    setOtp(newOtp)
    const nextIndex = Math.min(pastedData.length, 5)
    inputRefs.current[nextIndex]?.focus()
    if (newOtp.every((d) => d !== '')) {
      setTimeout(() => setVerified(true), 300)
      onComplete()
    }
  }

  const handleReset = () => {
    setOtp(['', '', '', '', '', ''])
    setVerified(false)
    setTimeout(() => {
      inputRefs.current[0]?.focus()
    }, 50)
  }

  if (verified) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center gap-3 py-6 px-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400"
        >
          <CheckCircle2 className="w-7 h-7" />
        </motion.div>
        <div>
          <p className="text-sm font-semibold text-white">One-Time Code Verified!</p>
          <p className="text-xs text-zinc-400 mt-0.5">Zero-trust handshake established securely.</p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="mt-1 inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Test another code</span>
        </button>
      </motion.div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span>Enter 6-digit verification code:</span>
        <button
          type="button"
          onClick={() => {
            const demoOtp = ['4', '8', '2', '9', '0', '1']
            setOtp(demoOtp)
            setTimeout(() => setVerified(true), 300)
            onComplete()
          }}
          className="text-[11px] underline hover:text-white transition-colors cursor-pointer"
          style={{ color: themeConfig.hex }}
        >
          Fill Demo OTP
        </button>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            className="w-full h-12 text-center text-lg font-mono font-semibold text-white rounded-xl bg-white/[0.04] border border-white/10 focus:outline-none transition-all placeholder:text-zinc-600"
            style={{
              borderColor: digit ? themeConfig.hex : undefined,
              boxShadow: digit ? `0 0 10px ${themeConfig.glow}` : undefined,
            }}
          />
        ))}
      </div>
    </div>
  )
}
