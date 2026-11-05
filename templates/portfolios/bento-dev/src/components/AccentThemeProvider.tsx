'use client'

import { useEffect, useState } from 'react'

const themes = {
  emerald: '#10B981',
  violet: '#8B5CF6',
  cyan: '#06B6D4',
  amber: '#F59E0B',
}

export type ThemeName = keyof typeof themes

export default function AccentThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>('emerald')

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--accent', themes[theme])
    root.style.setProperty('--accent-glow', themes[theme] + '33')
  }, [theme])

  useEffect(() => {
    (window as any).setAccentTheme = setTheme
    ;(window as any).getAccentTheme = () => theme
  }, [theme])

  return <>{children}</>
}
