# Bento-OS Developer Portfolio

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-black?style=for-the-badge&logo=vercel)](https://blueprints-raghu-7da6.vercel.app/)
[![Built with Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)]()
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white)]()
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animations-purple)]()

An ultra-premium, viewport-optimized developer portfolio template inspired by Linear, Raycast, and Vercel aesthetics. Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Live Demo

Explore the live preview: [Live Demo](https://blueprints-raghu-7da6.vercel.app/)

## Features

- **Viewport-Fit Architecture** - Symmetrical, single-screen desktop fit (`100dvh`) with zero clipping and responsive mobile/tablet flow
- **Interactive Terminal** - Fixed-height scrollable terminal with macOS traffic lights, quick-action command pills, and auto-scrolling output
- **Sliding Pill Navbar & Scroll Spy** - Framer Motion spring indicator (`layoutId`), scroll spy observer, top laser progress bar, and mobile drawer menu
- **Tabbed Project Showcase Deck** - Raycast-style 3-tab deck with live telemetry mockups, animated SVG sparkline charts, and problem/solution summaries
- **4-Column Domain Bento Grid** - Structured technical ecosystem matrix for Frontend, Distributed Backend, Cloud/Infra, and AI/Agentic systems
- **Interactive Career Timeline** - Role highlight effects, impact metrics, open-source activity heatmap, and executive endorsement carousel
- **Symmetrical Contact Suite** - Direct messaging form paired with a live San Francisco telemetry card (real-time clock, timezone, and radar line)
- **Spotlight Card Engine** - Cursor-tracking radial accent glow across cards
- **Command Palette (⌘K / Ctrl+K)** - Quick search, theme switching, and actions
- **Single-File Personalization** - Customize all content via `src/data/portfolio-config.ts`

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio in the browser.

## Customization

All portfolio data is isolated in a single configuration file: **`src/data/portfolio-config.ts`**

Edit this file to customize:
- **Personal Information:** Name, role title, bio, status indicator, and location
- **Contact Details:** Direct email address and resume link
- **Terminal Responses:** Commands and terminal output text
- **Tech Stack Domains:** Frontend, Backend, Cloud & DevOps, AI & ML technologies
- **Featured Projects:** Project IDs, descriptions, GitHub links, demo URLs, and tags
- **Social Media:** GitHub, LinkedIn, X/Twitter, and email links

## Project Structure

```text
bento-dev/
|-- src/
|   |-- app/
|   |   |-- globals.css         # Global styles & custom scrollbars
|   |   |-- layout.tsx          # Root layout & theme wrapper
|   |   |-- page.tsx            # Main single-page portfolio layout
|   |-- components/
|   |   |-- AccentThemeProvider.tsx  # Dynamic CSS variable theme switcher
|   |   |-- CommandPalette.tsx       # ⌘K / Ctrl+K modal palette
|   |   |-- EndorsementsCard.tsx     # Executive testimonials carousel
|   |   |-- HeroCard.tsx             # Hero intro, metrics & terminal
|   |   |-- ImpactCard.tsx           # GitHub contribution heatmap
|   |   |-- LocationCard.tsx         # Real-time clock & radar telemetry
|   |   |-- ProjectsCard.tsx         # Raycast-style tabbed project deck
|   |   |-- SocialCard.tsx           # 2x2 social channels grid
|   |   |-- SpotlightCard.tsx        # Cursor-following glow card wrapper
|   |   |-- TechStackCard.tsx        # 4-column domain bento matrix
|   |   |-- TerminalCard.tsx         # Fixed-height scrollable terminal
|   |   |-- TopHeader.tsx            # Sticky navbar with laser progress & scroll spy
|   |-- data/
|   |   |-- portfolio-config.ts      # Single configuration file
|   |-- lib/
|       |-- utils.ts                 # Smooth scroll & styling helpers
|-- public/
|-- package.json
|-- tsconfig.json
```

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Strict type safety
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first styling
- [Framer Motion](https://www.framer.com/motion/) - Cinematic spring transitions & gestures
- [Lucide React](https://lucide.dev/) - Modern icon set

## Build & Deploy

```bash
# Create an optimized production build
npm run build

# Start the production server
npm run start
```

Deploy in 1 click to [Vercel](https://vercel.com/) or any hosting platform supporting Next.js.

## License

This project is licensed under the [MIT License](LICENSE).

