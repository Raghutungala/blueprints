'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const rules = [
  { id: 'length', label: '8+ characters', check: (pwd: string) => pwd.length >= 8 },
  { id: 'upper', label: 'Uppercase letter', check: (pwd: string) => /[A-Z]/.test(pwd) },
  { id: 'number', label: 'Number', check: (pwd: string) => /[0-9]/.test(pwd) },
  { id: 'symbol', label: 'Special symbol', check: (pwd: string) => /[^A-Za-z0-9]/.test(pwd) },
]

export default function PasswordStrength({ password }: { password: string }) {
  return (
    <div className="space-y-2 mt-3">
      {rules.map((rule) => {
        const passed = rule.check(password)
        return (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center transition-all"
              style={{
                backgroundColor: passed ? '#10B981' : 'rgba(255,255,255,0.1)',
                border: passed ? '1px solid #10B981' : '1px solid rgba(255,255,255,0.2)'
              }}
            >
              {passed && <Check className="w-2.5 h-2.5" />}
            </div>
            <span className={`text-xs transition-colors ${passed ? 'text-emerald-400' : 'text-gray-400'}`}>
              {rule.label}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}

export function getPasswordStrength(password: string) {
  return rules.filter(rule => rule.check(password)).length
}
