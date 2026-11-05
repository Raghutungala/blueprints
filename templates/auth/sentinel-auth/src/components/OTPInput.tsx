'use client'

import { motion } from 'framer-motion'
import { useState, useRef, KeyboardEvent, ClipboardEvent } from 'react'
import { CheckCircle } from 'lucide-react'

export default function OTPInput({ onComplete }: { onComplete: () => void }) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [verified, setVerified] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      const pastedData = value.slice(0, 6).split('')
      const newOtp = [...otp]
      pastedData.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char
      })
      setOtp(newOtp)
      const nextIndex = Math.min(index + pastedData.length, 5)
      inputRefs.current[nextIndex]?.focus()
      if (newOtp.every(d => d !== '')) {
        setTimeout(() => setVerified(true), 300)
        onComplete()
      }
      return
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    if (newOtp.every(d => d !== '')) {
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
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('')
    const newOtp = [...otp]
    pastedData.forEach((char, i) => {
      if (i < 6) newOtp[i] = char
    })
    setOtp(newOtp)
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus()
    if (newOtp.every(d => d !== '')) {
      setTimeout(() => setVerified(true), 300)
      onComplete()
    }
  }

  if (verified) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center gap-3 py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
        >
          <CheckCircle className="w-16 h-16 text-emerald-400" />
        </motion.div>
        <p className="text-lg font-semibold">Verified Successfully!</p>
        <p className="text-sm text-gray-400">Welcome to Sentinel-Auth</p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-400 text-center">Enter the 6-digit code sent to your email</p>
      <div className="flex gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el }}
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            className="w-full h-12 text-center text-lg font-mono rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none transition-all"
          />
        ))}
      </div>
    </div>
  )
}
