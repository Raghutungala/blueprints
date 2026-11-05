import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Custom smooth scroll helper with easeInOutQuint easing (750ms duration)
 * and URL hash synchronization.
 */
export function scrollToSection(id: string) {
  if (typeof window === 'undefined') return
  const target = document.getElementById(id)
  if (!target) return

  const startY = window.scrollY
  // Offset by sticky navbar height (64px)
  const targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 64)
  const diff = targetY - startY
  if (Math.abs(diff) < 1) return

  const duration = 750
  let startTime: number | null = null

  // easeInOutQuint
  const easeInOutQuint = (t: number) => {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2
  }

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1)
    const ease = easeInOutQuint(progress)

    window.scrollTo(0, startY + diff * ease)

    if (progress < 1) {
      window.requestAnimationFrame(step)
    } else {
      window.history.replaceState(null, '', '#' + id)
    }
  }

  window.requestAnimationFrame(step)
}
