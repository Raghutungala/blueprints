# Sentinel-Auth — Interactive Glassmorphic Auth & Playful Guard Suite

An interactive authentication showcase featuring dual modes: sleek enterprise glassmorphism and playful evasive button physics. Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Features

### Mode 1: Enterprise Glass (Production SaaS Mode)
- **Split-Screen Layout** - Luxury Clerk/Linear-inspired design with animated security visual
- **Glassmorphic Design** - Premium backdrop blur effects throughout
- **Multi-Flow Auth** - Sign In, Create Account, and Magic Link/OTP verification
- **Live Password Validation** - Real-time checklist for password strength requirements
- **Social OAuth** - GitHub, Google, and Apple sign-in buttons
- **Interactive Elements** - Rotating testimonials, theme accent switcher, live telemetry cards

### Mode 2: Playful Evasion (Interactive Runaway Mode)
- **Physics-Based Dodge Button** - Sign In button flees from cursor when form is invalid
- **Smart Warnings** - Contextual tooltips guide users to fix validation errors
- **Locks on Success** - Button glows emerald and stays put when validation passes
- **Reactive Experience** - Engaging gamified authentication flow

### Additional Features
- **6-Digit OTP Input** - Auto-advancing boxes with paste support and success animation
- **Password Strength Matrix** - Animated checklist (8+ chars, uppercase, number, symbol)
- **Security Showcase** - Animated shield, encryption badges, zero-trust indicators
- **Fully Responsive** - Optimized for desktop and mobile experiences

## Quick Start

`ash
npm install
npm run dev
`

Open [http://localhost:3000](http://localhost:3000) to explore both modes.

## Usage

1. **Enterprise Glass Mode** - Clean, production-ready auth flows
2. **Playful Evasion Mode** - Try entering invalid credentials and watch the Sign In button dodge your cursor!
3. Switch between Sign In, Create Account, and Magic Link tabs
4. Test the password strength validator in Create Account mode
5. Try the OTP flow in Magic Link mode

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling
- [Framer Motion](https://www.framer.com/motion/) - Animations and physics
- [Lucide React](https://lucide.dev/) - Icon library

## Build & Deploy

`ash
npm run build
npm run start
`

Deploy to [Vercel](https://vercel.com/), [Netlify](https://netlify.com/), or any platform supporting Next.js.

## License

MIT License
