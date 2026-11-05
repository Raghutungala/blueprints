# Sentinel-Auth - Zero-Trust & Playful Interactive Auth Suite

[![Built with Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-CSS%20v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animations-purple)](https://www.framer.com/motion/)

An ultra-premium authentication showcase featuring dual modes: an **Enterprise Zero-Trust Command Center** and an interactive **Playful Runaway Mode** powered by real-time spring physics and a reactive cursor-tracking mascot.

Built with Next.js 16 (Turbopack), React 19, Tailwind CSS v4, and Framer Motion.

---

## Highlights

### 1. Dual Authentication Architecture
- **Enterprise Glass Mode:**
  - Layered multi-ring orbital radar with counter-rotating dashed rings and continuous sweep scanner.
  - 3 live interactive telemetry cards: `256-bit AES-GCM` with live-randomizing hex stream, `Passkey & WebAuthn` with biometric pulse effect, and `Zero-Trust Verified` with `99.99% SLA` badge.
  - Auto-rotating glass customer testimonial carousel (Sarah Chen, Marcus Johnson, Elena Rodriguez) with manual dot indicators.
- **Playful Evasion Mode:**
  - **Interactive Guardian Mascot:** Features twin ocular sensor nodes that dynamically calculate angles and track the user's cursor across the screen in real-time.
  - **Runaway Button Physics:** Smooth spring evasion (`stiffness: 400, damping: 22`) safely clamped inside the card container when credentials are unmet.
  - **Contextual Tooltips:** Dynamic warnings ("Need an UPPERCASE letter!", "Add a number!", etc.) guide users to fix form criteria.
  - **Mascot Reactivity:** When the button evades, the mascot's eyes widen, alert status trips, and an evasion counter ticks up. When criteria pass, the mascot celebrates with smiling arc eyes and emerald shield lock.

### 2. 4-Tone Dynamic Accent Theming
Switch instantly across the entire interface:
- **Electric Cyan** (`#06B6D4` / `#8B5CF6`)
- **Matrix Emerald** (`#10B981` / `#06B6D4`)
- **Cyber Violet** (`#8B5CF6` / `#EC4899`)
- **Solar Amber** (`#F59E0B` / `#EF4444`)

The theme switch dynamically updates ambient aurora spotlights, the orbital shield core, telemetry accents, sliding active mode pills, tab indicators, input focus rings, and submit button gradients without Tailwind purging bugs.

### 3. Linear / Clerk Grade Auth Features
- **One-Click Demo Credentials:** Instant `Fill Demo` pill (`sarah.chen@techflow.dev` / `Passw0rd!2026`) + reset button for instant evaluation without typing.
- **Authentic Social OAuth Grid:** 3-column grid (`grid grid-cols-3 gap-3`) featuring clean inline SVGs for GitHub, Google, and Apple with tactile Framer Motion hover feedback.
- **Multi-Flow Auth Tabs:**
  - **Sign In:** Email + password with remember-me checkbox, forgot password link, and live validation criteria.
  - **Sign Up:** Name, email, password with live 4-rule entropy strength meter (length, uppercase, number, symbol), and Terms checkbox.
  - **Magic Link / OTP:** Passwordless magic link dispatch toggleable with a 6-digit auto-advancing OTP verification input with paste support.

---

## Project Structure

```
templates/auth/sentinel-auth/
├── src/
│   ├── app/
│   │   ├── globals.css         # Tailwind v4 import, custom scrollbar & CSS variables
│   │   ├── layout.tsx          # Root layout with suppressHydrationWarning
│   │   └── page.tsx            # Floating header + responsive two-column grid
│   ├── components/
│   │   ├── AuthCard.tsx        # Sign In, Sign Up, Magic Link & Evasion Physics
│   │   ├── Header.tsx          # Floating brand mark, mode switcher & theme orbs
│   │   ├── LeftPane.tsx        # Enterprise orbital radar & Playful mascot core
│   │   ├── OTPInput.tsx        # 6-digit auto-advancing verification code input
│   │   ├── PasswordStrength.tsx# Live entropy meter with 4-rule checklist
│   │   └── SocialButtons.tsx   # Authentic inline SVGs for GitHub, Google, Apple
│   └── lib/
│       ├── AuthContext.tsx     # Centralized state (theme, mode, form, cursor tracking)
│       └── theme.ts            # Theme definitions & static THEME_CONFIG dictionary
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Quick Start

```bash
# Navigate to the template directory
cd templates/auth/sentinel-auth

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build

```bash
npm run build
npm run start
```

---

## License

MIT License. Designed and engineered for high-craft SaaS and developer platforms.
