'use client'

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react'
import { ThemeAccent, AuthMode, ThemeConfig, THEME_CONFIG } from './theme'

export interface PasswordChecks {
  length: boolean
  upper: boolean
  number: boolean
  symbol: boolean
}

interface AuthContextType {
  theme: ThemeAccent
  setTheme: (theme: ThemeAccent) => void
  themeConfig: ThemeConfig
  mode: AuthMode
  setMode: (mode: AuthMode) => void
  activeTab: 'signin' | 'signup' | 'magic'
  setActiveTab: (tab: 'signin' | 'signup' | 'magic') => void
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  rememberMe: boolean
  setRememberMe: (val: boolean) => void
  emailValid: boolean
  passwordChecks: PasswordChecks
  passwordStrength: number
  formValid: boolean
  isButtonEvading: boolean
  setIsButtonEvading: (v: boolean) => void
  evasionCount: number
  mousePos: { x: number; y: number }
  fillDemoCredentials: () => void
  clearCredentials: () => void
  incrementEvasion: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeAccent>('cyan')
  const [mode, setMode] = useState<AuthMode>('enterprise')
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'magic'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [isButtonEvading, setIsButtonEvading] = useState(false)
  const [evasionCount, setEvasionCount] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const themeConfig = useMemo(() => THEME_CONFIG[theme], [theme])

  // Track global mouse position for mascot eye-tracking & playful reaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Update CSS variables on document root whenever theme changes
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--accent-hex', themeConfig.hex)
    root.style.setProperty('--accent-to-hex', themeConfig.toHex)
    root.style.setProperty('--accent-rgb', themeConfig.rgb)
    root.style.setProperty('--accent-to-rgb', themeConfig.toRgb)
    root.style.setProperty('--accent-glow', themeConfig.glow)
    root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${themeConfig.hex}, ${themeConfig.toHex})`)
  }, [themeConfig])

  const emailValid = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }, [email])

  const passwordChecks = useMemo<PasswordChecks>(() => {
    return {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[^A-Za-z0-9]/.test(password),
    }
  }, [password])

  const passwordStrength = useMemo(() => {
    const checks = [
      passwordChecks.length,
      passwordChecks.upper,
      passwordChecks.number,
      passwordChecks.symbol,
    ]
    return checks.filter(Boolean).length
  }, [passwordChecks])

  const formValid = useMemo(() => {
    return emailValid && passwordStrength === 4
  }, [emailValid, passwordStrength])

  const fillDemoCredentials = () => {
    setEmail('sarah.chen@techflow.dev')
    setPassword('Passw0rd!2026')
    setIsButtonEvading(false)
  }

  const clearCredentials = () => {
    setEmail('')
    setPassword('')
    setIsButtonEvading(false)
    setEvasionCount(0)
  }

  const incrementEvasion = () => {
    setEvasionCount((c) => c + 1)
  }

  return (
    <AuthContext.Provider
      value={{
        theme,
        setTheme,
        themeConfig,
        mode,
        setMode,
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
        evasionCount,
        mousePos,
        fillDemoCredentials,
        clearCredentials,
        incrementEvasion,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

