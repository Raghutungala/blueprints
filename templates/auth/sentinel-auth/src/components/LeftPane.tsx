'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Fingerprint, CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

const testimonials = [
  { name: "Sarah Chen", role: "CTO at TechFlow", text: "Sentinel-Auth provides enterprise-grade security." },
  { name: "Marcus Johnson", role: "Security Lead", text: "The zero-trust architecture gives us complete confidence." },
  { name: "Elena Rodriguez", role: "Product Manager", text: "Seamless authentication flows that users actually love." },
]

const telemetry = [
  { icon: Shield, label: "256-bit Encryption", color: "#06B6D4" },
  { icon: Fingerprint, label: "Passkey Ready", color: "#10B981" },
  { icon: Lock, label: "Zero-Trust Verified", color: "#8B5CF6" },
]

export default function LeftPane() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [accent, setAccent] = useState('#06B6D4')

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const accents = ['#06B6D4', '#10B981', '#8B5CF6', '#F59E0B']

  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 rounded-full bg-cyan-400/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-purple-400/20 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative z-10 flex flex-col justify-between p-12 w-full">
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Sentinel-Auth</h1>
              <p className="text-sm text-gray-400">Interactive Auth Showcase</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative mb-8 flex justify-center"
          >
            <svg viewBox="0 0 200 200" className="w-48 h-48">
              <defs>
                <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              <motion.path
                d="M100 20 L170 50 L170 110 Q170 150 100 180 Q30 150 30 110 L30 50 Z"
                fill="url(#shieldGrad)"
                opacity="0.3"
                stroke="url(#shieldGrad)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
              />
              <motion.circle
                cx="100"
                cy="100"
                r="30"
                fill="none"
                stroke="#06B6D4"
                strokeWidth="2"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "100px 100px" }}
              />
              <CheckCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-cyan-400" />
            </svg>
          </motion.div>

          <div className="grid grid-cols-3 gap-3 mb-8">
            {telemetry.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-center"
              >
                <item.icon className="w-5 h-5 mx-auto mb-1" style={{ color: item.color }} />
                <p className="text-[10px] text-gray-300">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2 justify-center">
            <span className="text-xs text-gray-400">Theme Accent:</span>
            {accents.map((c) => (
              <button
                key={c}
                onClick={() => setAccent(c)}
                className="w-6 h-6 rounded-full border-2 border-white/20 hover:border-white/40 transition-all"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <p className="text-sm text-gray-300 mb-4 italic">"{testimonials[activeTestimonial].text}"</p>
            <div>
              <p className="font-semibold text-sm">{testimonials[activeTestimonial].name}</p>
              <p className="text-xs text-gray-400">{testimonials[activeTestimonial].role}</p>
            </div>
            <div className="flex gap-1 mt-3">
              {testimonials.map((_, idx) => (
                <div
                  key={idx}
                  className="h-1 rounded-full transition-all"
                  style={{
                    width: idx === activeTestimonial ? '24px' : '8px',
                    backgroundColor: idx === activeTestimonial ? accent : 'rgba(255,255,255,0.3)'
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
