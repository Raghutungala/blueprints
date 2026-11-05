'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useAuth } from '@/lib/AuthContext'

export const PASSWORD_RULES = [
  { id: 'length', label: '8+ characters', check: (pwd: string) => pwd.length >= 8 },
  { id: 'upper', label: 'Uppercase letter', check: (pwd: string) => /[A-Z]/.test(pwd) },
  { id: 'number', label: 'Number included', check: (pwd: string) => /[0-9]/.test(pwd) },
  { id: 'symbol', label: 'Special symbol (!@#)', check: (pwd: string) => /[^A-Za-z0-9]/.test(pwd) },
]

export function getPasswordStrength(password: string) {
  return PASSWORD_RULES.filter((rule) => rule.check(password)).length
}

export default function PasswordStrength({ password }: { password: string }) {
  const { themeConfig } = useAuth()
  const strength = getPasswordStrength(password)

  const getStrengthLabel = () => {
    if (!password) return { label: 'Empty', color: 'text-zinc-500' }
    if (strength <= 1) return { label: 'Weak', color: 'text-rose-400' }
    if (strength <= 3) return { label: 'Good', color: 'text-amber-400' }
    return { label: 'Ultra Secure', color: 'text-emerald-400' }
  }

  const { label, color } = getStrengthLabel()

  return (
    <div className="space-y-2 mt-3 pt-2 border-t border-white/[0.06]">
      {/* 4-bar indicator */}
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-zinc-400">Entropy Strength:</span>
        <span className={`font-medium ${color}`}>{label}</span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 h-1.5">
        {[0, 1, 2, 3].map((idx) => {
          const active = strength > idx
          let barBg = 'bg-white/10'
          if (active) {
            if (strength <= 1) barBg = 'bg-rose-500'
            else if (strength <= 3) barBg = 'bg-amber-400'
            else barBg = 'bg-emerald-400'
          }
          return (
            <div
              key={idx}
              className={`h-full rounded-full transition-all duration-300 ${barBg}`}
              style={{
                boxShadow: active && strength === 4 ? `0 0 8px rgba(16, 185, 129, 0.5)` : undefined,
              }}
            />
          )
        })}
      </div>

      {/* 2x2 grid of micro-check rules */}
      <div className="grid grid-cols-2 gap-1.5 pt-1">
        {PASSWORD_RULES.map((rule) => {
          const passed = rule.check(password)
          return (
            <div key={rule.id} className="flex items-center gap-1.5">
              <div
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                  passed
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-white/[0.04] text-zinc-500 border border-white/10'
                }`}
              >
                {passed ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5 opacity-40" />}
              </div>
              <span className={`text-[11px] truncate transition-colors ${passed ? 'text-zinc-200' : 'text-zinc-500'}`}>
                {rule.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
