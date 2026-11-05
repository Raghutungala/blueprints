import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sentinel-Auth | Zero-Trust & Playful Authentication Showcase',
  description:
    'Ultra-premium glassmorphic authentication experience featuring dual Enterprise Zero-Trust telemetry and Playful runaway physics with an interactive tracking mascot.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body suppressHydrationWarning className="bg-[#050508] antialiased selection:bg-white/20 selection:text-white">
        {children}
      </body>
    </html>
  )
}
