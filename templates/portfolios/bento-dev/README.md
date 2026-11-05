# Bento-OS Developer Portfolio

Ultra-premium developer portfolio template built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. Features a stunning Bento grid layout with spotlight hover effects, interactive terminal, command palette, and dynamic accent theming.

## Features

- **Bento Grid Layout** - Modern 12-column responsive grid showcasing all portfolio sections
- **Spotlight Card Effect** - Custom cards that follow your cursor with a beautiful radial glow
- **Dynamic Accent Themes** - Switch between Emerald, Cyber Violet, Electric Cyan, and Sunset Amber
- **Interactive Terminal** - Simulated macOS-style terminal with command pills
- **Featured Projects Carousel** - Showcase projects with screenshots, tech tags, and GitHub stats
- **Tech Stack Matrix** - Filterable tech stack by category (Frontend, Backend, Cloud/DevOps, AI)
- **Engineering Impact** - Simulated GitHub contribution heatmap with career metrics
- **Live Clock** - Real-time clock with location display
- **Command Palette** (?K / Ctrl+K) - Quick navigation, theme switching, and actions
- **Fully Customizable** - Edit a single config file to personalize everything

## Quick Start

`ash
npm install
npm run dev
`

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

## Customization

All personal details can be customized in a single file: **src/data/portfolio-config.ts**

Edit this file to update:
- Personal info (name, title, bio, status, location)
- Contact details (email, resume URL)
- Interactive terminal commands
- Tech stack by category
- Featured projects (up to 3)
- Career metrics
- Social media links

## Folder Structure

`
bento-dev/
+-- src/
¦   +-- app/              # Next.js App Router
¦   +-- components/       # React components
¦   ¦   +-- SpotlightCard.tsx
¦   ¦   +-- CommandPalette.tsx
¦   ¦   +-- ... (all card components)
¦   +-- data/
¦   ¦   +-- portfolio-config.ts  # Single-file customization
¦   +-- hooks/            # Custom React hooks
¦   +-- lib/
¦       +-- utils.ts      # Utility functions
+-- public/               # Static assets
+-- package.json
`

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide React](https://lucide.dev/) - Icons

## Build & Deploy

`ash
npm run build
npm run start
`

Deploy easily to [Vercel](https://vercel.com/), [Netlify](https://netlify.com/), or any platform that supports Next.js.

## License

MIT License - feel free to use this template for your portfolio!
