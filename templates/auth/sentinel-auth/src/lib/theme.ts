export type ThemeAccent = 'cyan' | 'emerald' | 'violet' | 'amber'
export type AuthMode = 'enterprise' | 'playful'

export interface ThemeConfig {
  name: ThemeAccent
  label: string
  hex: string
  toHex: string
  rgb: string
  toRgb: string
  glow: string
  gradient: string
  border: string
  text: string
  bgSubtle: string
  badgeBg: string
}

export const THEME_CONFIG: Record<ThemeAccent, ThemeConfig> = {
  cyan: {
    name: 'cyan',
    label: 'Electric Cyan',
    hex: '#06B6D4',
    toHex: '#8B5CF6',
    rgb: '6, 182, 212',
    toRgb: '139, 92, 246',
    glow: 'rgba(6, 182, 212, 0.35)',
    gradient: 'from-cyan-500 to-violet-500',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    bgSubtle: 'bg-cyan-500/10',
    badgeBg: 'rgba(6, 182, 212, 0.15)',
  },
  emerald: {
    name: 'emerald',
    label: 'Matrix Emerald',
    hex: '#10B981',
    toHex: '#06B6D4',
    rgb: '16, 185, 129',
    toRgb: '6, 182, 212',
    glow: 'rgba(16, 185, 129, 0.35)',
    gradient: 'from-emerald-500 to-cyan-500',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    bgSubtle: 'bg-emerald-500/10',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
  },
  violet: {
    name: 'violet',
    label: 'Cyber Violet',
    hex: '#8B5CF6',
    toHex: '#EC4899',
    rgb: '139, 92, 246',
    toRgb: '236, 72, 153',
    glow: 'rgba(139, 92, 246, 0.35)',
    gradient: 'from-violet-500 to-pink-500',
    border: 'border-violet-500/30',
    text: 'text-violet-400',
    bgSubtle: 'bg-violet-500/10',
    badgeBg: 'rgba(139, 92, 246, 0.15)',
  },
  amber: {
    name: 'amber',
    label: 'Solar Amber',
    hex: '#F59E0B',
    toHex: '#EF4444',
    rgb: '245, 158, 11',
    toRgb: '239, 68, 68',
    glow: 'rgba(245, 158, 11, 0.35)',
    gradient: 'from-amber-500 to-rose-500',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    bgSubtle: 'bg-amber-500/10',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
  },
}

